#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
using namespace std;

class Solution
{
public:
    vector<int> twoSum(vector<int> &nums, int target)
    {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++)
        {
            int complement = target - nums[i];
            if (map.find(complement) != map.end())
            {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};

vector<int> parseInput(string input)
{
    vector<int> nums;
    string temp = "";
    bool readingNumber = false;

    for (size_t i = 0; i < input.length(); i++)
    {
        if (input[i] == '[')
        {
            continue;
        }
        else if (isdigit(input[i]) || input[i] == '-')
        {
            temp += input[i];
            readingNumber = true;
        }
        else if ((input[i] == ',' || input[i] == ']') && readingNumber)
        {
            nums.push_back(stoi(temp));
            temp = "";
            readingNumber = false;
        }
    }
    return nums;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string input;
    int target;

    getline(cin, input);
    cin >> target;

    vector<int> nums = parseInput(input);
    Solution solution;
    vector<int> result = solution.twoSum(nums, target);

    cout << "[" << result[0] << "," << result[1] << "]";

    return 0;
}
