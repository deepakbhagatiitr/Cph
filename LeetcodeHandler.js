const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { exec } = require('child_process');
const LeetcodeService = require('./LeetcodeService');
class LeetcodeHandler {
    constructor() {
        this.workspaceFolders = vscode.workspace.workspaceFolders;
        if (!this.workspaceFolders) {
            vscode.window.showErrorMessage('Failed to fetch test cases: No workspace folder found');
            return;
        }
        this.workspaceRoot = this.workspaceFolders[0].uri.fsPath;
    }
    async fetchTestCases(titleSlug, language) {
        if (!this.workspaceRoot) {
            return;
        }
        const leetcodeService = new LeetcodeService();
        try {
            const problemDetails = await leetcodeService.getProblemDetails(titleSlug);
            const testCases = leetcodeService.extractTestCases(problemDetails);
            const testCasesDir = path.join(this.workspaceRoot, `${titleSlug}_test_cases`);
            if (!fs.existsSync(testCasesDir)) {
                fs.mkdirSync(testCasesDir);
            }
            testCases.forEach((testCase, index) => {
                const inputFilePath = path.join(testCasesDir, `input_${index + 1}.txt`);
                const outputFilePath = path.join(testCasesDir, `output_${index + 1}.txt`);
                fs.writeFileSync(inputFilePath, testCase.input);
                fs.writeFileSync(outputFilePath, testCase.output);
            });
            const testCasesJsonPath = path.join(testCasesDir, `${titleSlug}_test_cases.json`);
            fs.writeFileSync(testCasesJsonPath, JSON.stringify(testCases, null, 2));
            vscode.window.showInformationMessage(`Test cases saved to ${testCasesDir}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to fetch test cases: ${error.message}`);
        }
    }
    async runTestCases(titleSlug, language) {
        if (!this.workspaceRoot) {
            console.log('No workspace root found');
            return;
        }
        console.log(`Running test cases for ${titleSlug} in ${language}`);
        console.log(`Workspace root: ${this.workspaceRoot}`);
        const solutionFilePath = path.join(this.workspaceRoot, `solution.${language === 'cpp' ? 'cpp' : 'py'}`);
        console.log(`Looking for solution file at: ${solutionFilePath}`);
        if (!fs.existsSync(solutionFilePath)) {
            console.log(`Solution file not found at: ${solutionFilePath}`);
            vscode.window.showErrorMessage(`Solution file not found: ${solutionFilePath}`);
            return;
        }
        const testCasesDir = path.join(this.workspaceRoot, `${titleSlug}_test_cases`);
        console.log(`Looking for test cases in: ${testCasesDir}`);
        if (!fs.existsSync(testCasesDir)) {
            console.log(`Test cases directory not found: ${testCasesDir}`);
            vscode.window.showErrorMessage(`Test cases directory not found: ${testCasesDir}`);
            return;
        }
        const solutionCode = fs.readFileSync(solutionFilePath, 'utf8');
        console.log('Solution code loaded successfully');
        const results = [];
        const inputFiles = fs.readdirSync(testCasesDir).filter(file => file.startsWith('input_'));
        for (const inputFile of inputFiles) {
            const testCaseNumber = inputFile.match(/input_(\d+)\.txt/)[1];
            const inputFilePath = path.join(testCasesDir, inputFile);
            const outputFilePath = path.join(testCasesDir, `output_${testCaseNumber}.txt`);
            try {
                const input = fs.readFileSync(inputFilePath, 'utf8');
                const expectedOutput = fs.readFileSync(outputFilePath, 'utf8').trim();
                const userOutput = await this.runUserCode(solutionCode, input, language);
                const passed = userOutput === expectedOutput;
                results.push({
                    testCaseNumber,
                    passed,
                    userOutput,
                    expectedOutput: expectedOutput
                });
            } catch (error) {
                const expectedOutput = fs.readFileSync(outputFilePath, 'utf8').trim();
                results.push({
                    testCaseNumber,
                    passed: false,
                    userOutput: error.toString(),
                    expectedOutput: expectedOutput
                });
            }
        }
        this.showTestResults(results);
    }
    async runUserCode(solutionCode, input, language) {
        const tempInputPath = path.join(this.workspaceRoot, 'temp_input.txt');
        const tempOutputPath = path.join(this.workspaceRoot, 'temp_output.txt');

        // Extract array and target
        const arrayMatch = input.match(/\[(.*?)\]/);
        const targetMatch = input.match(/\d+$/);
        
        // Format input based on language
        const formattedInput = `[${arrayMatch[1]}]\n${targetMatch[0]}`;
        
        fs.writeFileSync(tempInputPath, formattedInput);
        console.log(`Formatted input for ${language}: ${formattedInput}`);

        return new Promise((resolve, reject) => {
            if (language === 'cpp') {
                const tempCppFilePath = path.join(this.workspaceRoot, 'temp_solution.cpp');
                const tempExecutablePath = path.join(this.workspaceRoot, 'temp_solution.exe');

                fs.writeFileSync(tempCppFilePath, solutionCode);

                // Compile with enhanced error handling
                exec(`g++ "${tempCppFilePath}" -o "${tempExecutablePath}" -std=c++17`, (compileError, stdout, stderr) => {
                    if (compileError) {
                        console.error('C++ compilation error:', stderr);
                        reject(`Compilation error: ${stderr}`);
                        return;
                    }

                    // Execute with proper input handling
                    exec(`"${tempExecutablePath}" < "${tempInputPath}" > "${tempOutputPath}"`, (runError, stdout, stderr) => {
                        if (runError) {
                            console.error('C++ runtime error:', stderr);
                            reject(`Runtime error: ${stderr}`);
                            return;
                        }

                        try {
                            const userOutput = fs.readFileSync(tempOutputPath, 'utf8').trim();
                            console.log(`C++ output: ${userOutput}`);
                            resolve(userOutput);
                        } catch (error) {
                            reject(`Output reading error: ${error.message}`);
                        }
                    });
                });
            } else if (language === 'py') {
                const tempPyFilePath = path.join(this.workspaceRoot, 'temp_solution.py');
                fs.writeFileSync(tempPyFilePath, solutionCode);

                exec(`python "${tempPyFilePath}" < "${tempInputPath}" > "${tempOutputPath}"`, (runError, stdout, stderr) => {
                    if (runError) {
                        reject(`Runtime error: ${stderr}`);
                        return;
                    }
                    const userOutput = fs.readFileSync(tempOutputPath, 'utf8').trim();
                    resolve(userOutput);
                });
            }
        });
    } showTestResults(results) {
        const panel = vscode.window.createWebviewPanel(
            'testResults',
            'LeetCode Test Results',
            vscode.ViewColumn.Two,
            { enableScripts: true }
        );
        const totalTests = results.length;
        const passedTests = results.filter(r => r.passed).length;
        panel.webview.html = `
            <!DOCTYPE html>
            <html>
            <head>
<style>
        :root {
            --success-color: #155724;
            --error-color: #721c24;
            --border-color: #ced4da;
            --header-bg: #e2e3e5;
            --text-color: #343a40;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            color: var(--text-color);
        }
        .summary {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            background: var(--header-bg);
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }
        .summary-item {
            text-align: center;
        }
        .summary-label {
            font-size: 0.9em;
            color: #495057;
        }
        .summary-value {
            font-size: 1.5em;
            font-weight: 600;
            color: var(--text-color);
        }
        .test-case {
            margin-bottom: 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
        }
        .test-header {
            padding: 12px 15px;
            background: var(--header-bg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .test-status {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: 500;
        }
        .status-passed {
            background: rgba(21, 87, 36, 0.2);
            color: var(--success-color);
        }
        .status-failed {
            background: rgba(114, 28, 36, 0.2);
            color: var(--error-color);
        }
        .test-body {
            padding: 15px;
        }
        .output-section {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 0.9em;
            line-height: 1.5;
        }
        .output-label {
            color: #495057;
            font-size: 0.85em;
            margin-bottom: 4px;
        }
        .output-value {
            padding: 8px;
            background: #f8f9fa;
            border-radius: 4px;
            word-break: break-all;
        }
        .testcase {
            color: var(--text-color);
        }
    </style>
            </head>
            <body>
                <div class="summary">
                    <div class="summary-item">
                        <div class="summary-label">Total Tests</div>
                        <div class="summary-value">${totalTests}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Passed</div>
                        <div class="summary-value" style="color: var(--success-color)">${passedTests}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Failed</div>
                        <div class="summary-value" style="color: var(--error-color)">${totalTests - passedTests}</div>
                    </div>
                </div>
                ${results.map(result => `
                    <div class="test-case">
                        <div class="test-header">
                            <span class="testcase">Test Case ${result.testCaseNumber}</span>
                            <span class="test-status ${result.passed ? 'status-passed' : 'status-failed'}">
                                ${result.passed ? 'PASSED' : 'FAILED'}
                            </span>
                        </div>
                        <div class="test-body">
                            <div class="output-section">
                                <div class="output-label">Expected Output</div>
                                <div class="output-value">${result.expectedOutput}</div>
                                <div class="output-label" style="margin-top: 10px">Actual Output</div>
                                <div class="output-value">${result.userOutput}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </body>
            </html>
        `;
    }
}
module.exports = LeetcodeHandler;
