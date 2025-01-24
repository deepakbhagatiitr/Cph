# CodeCracker - A VS Code Extension for Competitive Programmers  

**CodeCracker** is a powerful Visual Studio Code extension tailored for competitive programmers. It bridges the gap between problem-solving and debugging by fetching LeetCode test cases, enabling local testing, and simplifying workflows for developers. Whether you code in Python or C++, CodeCracker streamlines the process of solving LeetCode problems by automating test case retrieval and validation.  

---

## Why CodeCracker?  

- No more manually copying inputs and outputs from LeetCode.  
- Test your code locally without worrying about online submissions.  
- Focus on solving problems while the extension handles test cases.  

---

## Features  

### 1. Fetch Problem Details  
- Input the name of a LeetCode problem to fetch its details directly.  
- Automatically extracts test cases, constraints, and expected outputs.  
- Supports multiple test case formats and organizes them for easy testing.  

### 2. Save Test Cases Locally  
- Stores inputs and outputs in structured `.txt` files for debugging:  
  - Inputs: `input_1.txt`, `input_2.txt`, etc.  
  - Outputs: `output_1.txt`, `output_2.txt`, etc.  

### 3. Run Code Locally  
- Write your solution in Python or C++.  
- Test your code against the saved cases using the `CPH: Run Test Cases` command.  
- Highlights mismatched results, making debugging faster and easier.  

### 4. Language Support  
- **C++**:  
  - Compile and run using `g++`.  
- **Python**:  
  - Execute directly with the `python` command.  
- Customizable build and run commands to suit your preferences.  

### 5. Offline Focus  
- The extension does not submit solutions to LeetCode, keeping the process local and efficient.  

---

## Installation  

### Prerequisites  
1. **Node.js**: Download it from the [official website](https://nodejs.org/).  
2. **Visual Studio Code**: Get it from [here](https://code.visualstudio.com/).  

### Steps  
1. Clone the repository:  
   ```bash  
   git clone 
https://github.com/deepakbhagatiitr/Cph  
   ```  
2. Navigate to the project folder:  
   ```bash  
   cd cph  
   ```  
3. Install dependencies:  
   ```bash  
   npm install  
   ```  
4. Open the project in VS Code:  
   ```bash  
   code .  
   ```  
5. Start the extension:  
   - Press `F5` to launch a new VS Code window with the extension activated.  

---

## Usage  

### Fetch Test Cases  
1. Open the Command Palette:  
   - **Windows/Linux:** `Ctrl+Shift+P`  
   - **MacOS:** `Cmd+Shift+P`  
2. Run the command `CPH: Fetch Test Cases`.  
3. Enter the LeetCode problem name (e.g., `two-sum`, `3sum`).  
4. Test cases will be saved locally for use.  

### Execute Test Cases  
1. Write your solution in **C++** or **Python**.  
2. Use the command `CPH: Run Test Cases` to test your solution.  
3. View the results and debug discrepancies directly in VS Code.  

---

## Technical Details  

### Fetching Data from LeetCode  
The extension utilizes LeetCode's public API to retrieve problem information.  

#### API Endpoint  
```
https://leetcode.com/api/problems/{problem_slug}/  
```  
Replace `{problem_slug}` with the problem's name (e.g., `two-sum`).  

#### Fetched Data  
- Problem description  
- Constraints  
- Sample test cases  

#### Test Case Organization  
- Inputs are stored in files like `input_1.txt`, `input_2.txt`, etc.  
- Outputs are stored in corresponding `output_1.txt`, `output_2.txt`, etc.  

---

## Supported Languages  

### C++  
- **Compilation Command**:  
  ```bash  
  g++ -std=c++17 -o $fileNameWithoutExt $fileName  
  ```  
- **Execution Command**:  
  ```bash  
  ./ $fileNameWithoutExt  
  ```  

### Python  
- **Execution Command**:  
  ```bash  
  python $fileName  
  ```  

### Customizable Commands  
Modify these commands in the extension's settings:  

#### Example for C++  
```json  
{  
  "cph.language.cpp.compile": "g++ -std=c++17 -o $fileNameWithoutExt $fileName",  
  "cph.language.cpp.run": "./$fileNameWithoutExt"  
}  
```  

#### Example for Python  
```json  
{  
  "cph.language.python.run": "python $fileName"  
}  
```  

---

## Contributing  

Contributions are highly appreciated!  

### Steps to Contribute  
1. Fork the repository.  
2. Create a new branch:  
   ```bash  
   git checkout -b feature-name  
   ```  
3. Commit your changes:  
   ```bash  
   git commit -m "Description of your changes"  
   ```  
4. Push your branch:  
   ```bash  
   git push origin feature-name  
   ```  
5. Submit a pull request.  

---

## Troubleshooting  

### Common Problems  

1. **Unable to Fetch Problem Details**  
   - Ensure the problem URL is correct.  
   - Verify your internet connection.  

2. **Test Cases Not Generated**  
   - Check if the problem contains publicly available test cases.  
   - Look for errors in the VS Code output panel.  

3. **Execution Errors**  
   - Verify the correct language configuration.  
   - Ensure your code is error-free.  

For additional help, open an issue on the repository.  

---

**CodeCracker**: Simplifying problem-solving for competitive programmers.