const vscode = require('vscode');
const LeetcodeHandler = require('./LeetcodeHandler');

function activate(context) {
    console.log('CPH LeetCode extension is now active!');

    const leetcodeHandler = new LeetcodeHandler();

    let fetchTestCasesCommand = vscode.commands.registerCommand(
        'cph.fetchLeetCodeTestCases',
        async () => {
            // First, prompt for the language selection
            const language = await vscode.window.showQuickPick(['cpp', 'py'], {
                placeHolder: 'Select the programming language you are using'
            });
            if (!language) {
                vscode.window.showErrorMessage('Programming language selection is required.');
                return;
            }

            // Then, prompt for the title slug
            const titleSlug = await vscode.window.showInputBox({ prompt: 'Enter the title slug of the LeetCode problem' });
            if (titleSlug) {
                leetcodeHandler.fetchTestCases(titleSlug, language); // Pass the selected language
            } else {
                vscode.window.showErrorMessage('Title slug is required to fetch test cases.');
            }
        }
    );

    let runTestCasesCommand = vscode.commands.registerCommand(
        'cph.runTestCases',
        async () => {
            // First, prompt for the language selection
            const language = await vscode.window.showQuickPick(['cpp', 'py'], {
                placeHolder: 'Select the programming language you are using'
            });
            if (!language) {
                vscode.window.showErrorMessage('Programming language selection is required.');
                return;
            }

            // Then, prompt for the title slug
            const titleSlug = await vscode.window.showInputBox({ prompt: 'Enter the title slug of the LeetCode problem' });
            if (titleSlug) {
                leetcodeHandler.runTestCases(titleSlug, language); // Pass the selected language
            } else {
                vscode.window.showErrorMessage('Title slug is required to run test cases.');
            }
        }
    );

    let helloWorldCommand = vscode.commands.registerCommand('cod.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from cph!');
    });

    context.subscriptions.push(fetchTestCasesCommand, runTestCasesCommand, helloWorldCommand);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
