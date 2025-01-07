const axios = require('axios');
const cheerio = require('cheerio');
const BASE_URL = 'https://alfa-leetcode-api.onrender.com';

class LeetcodeService {
    async getProblemDetails(titleSlug) {
        try {
            const response = await axios.get(`${BASE_URL}/select?titleSlug=${titleSlug}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch problem details: ${error.message}`);
        }
    }

    extractTestCases(problemData) {
        const $ = cheerio.load(problemData.question);
        const examples = [];

        $('pre').each((index, element) => {
            const text = $(element).text().trim();
            const inputMatch = text.match(/Input:\s*(.*)/);
            const outputMatch = text.match(/Output:\s*(.*)/);
            const explanationMatch = text.match(/Explanation:\s*(.*)/);

            if (inputMatch && outputMatch) {
                examples.push({
                    input: inputMatch[1],
                    expectedOutput: outputMatch[1],
                    explanation: explanationMatch ? explanationMatch[1] : '',
                    testCaseNumber: (examples.length + 1)
                });
            }
        });

        return examples.map((example, index) => ({
            input: example.input,
            output: example.expectedOutput,
            explanation: example.explanation,
            testCaseNumber: index + 1
        }));
    }
}

module.exports = LeetcodeService;