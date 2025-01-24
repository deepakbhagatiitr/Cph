# CodeCracker Extension (CPH - Competitive Programming Helper)

**CodeCracker** is a Visual Studio Code extension designed for competitive programmers to simplify testing and debugging of LeetCode problems locally. With automatic test case extraction and multi-language support, it enhances efficiency and accuracy during problem-solving.

---

## Features

### Simplified Problem and Test Case Management
- Automatically fetch problem details from LeetCode by specifying the problem name.
- Extracts and saves test cases locally in structured files:
  - Input files: `input_1.txt`, `input_2.txt`, etc.
  - Output files: `output_1.txt`, `output_2.txt`, etc.

### Streamlined Execution
- Write solutions in **C++** or **Python**.
- Run solutions locally with a single command (`CPH: Run Test Cases`).
- Compares outputs with expected results and highlights any mismatches.

### Multi-Language Flexibility
- Supports **C++** and **Python** with customizable compile and run configurations.
- Execute code seamlessly with optimized commands.

### Offline Test Case Storage
- Retain all test cases for offline debugging and practice.
- No need to manually copy or manage test case data.

---

## Setup and Installation

### Prerequisites
1. Install **Node.js**: [Get Node.js](https://nodejs.org/).
2. Install **Visual Studio Code**: [Get VS Code](https://code.visualstudio.com/).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/chandrakant1212/cph.git

2. Navigate to the project folder:

cd cph


3. Install dependencies:

npm install


4. Open the project in VS Code:

code .


5. Launch the extension by pressing F5.




---

How to Use

Fetch Problem Test Cases

1. Open the VS Code Command Palette:

Windows/Linux: Ctrl+Shift+P

MacOS: Cmd+Shift+P



2. Run the command: CPH: Fetch Test Cases.


3. Enter the LeetCode problem name (e.g., two-sum, 3sum).


4. The test cases are automatically saved for local use.



Run Test Cases Locally

1. Write your solution in C++ or Python.


2. Execute the command: CPH: Run Test Cases.


3. The extension runs your code, compares the outputs, and highlights errors.




---

Configuration

Language Settings

Customize compile and run commands as per your environment.

C++ Example:

{
  "cph.language.cpp.compile": "g++ -std=c++17 -o $fileNameWithoutExt $fileName",
  "cph.language.cpp.run": "./$fileNameWithoutExt"
}

Python Example:

{
  "cph.language.python.run": "python $fileName"
}


---

Key Highlights

No Code Submission: The extension does not submit solutions to LeetCode, ensuring complete local control over problem-solving.

Error Highlighting: Quickly spot and resolve discrepancies in outputs.

Customizable Workflow: Adapt the extension settings to suit your coding style and environment.



---

Contributing

We welcome contributions! Here's how you can get started:

1. Fork the repository.


2. Create a new branch for your feature:

git checkout -b new-feature


3. Commit your changes:

git commit -m "Add a new feature"


4. Push the branch:

git push origin new-feature


5. Submit a pull request.




---

Troubleshooting

Common Problems

1. Test Cases Not Fetched:

Verify the problem name or check your internet connection.



2. Execution Errors:

Ensure the correct language settings are configured.



3. Output Mismatch:

Verify the logic in your solution against the problem constraints.





---

License

This project is licensed under the MIT License.


---

Contact

For issues or suggestions, feel free to reach out:

GitHub Issues: Open an Issue


Elevate your competitive programming workflow with CodeCracker!



