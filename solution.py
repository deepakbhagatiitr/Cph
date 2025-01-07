class Solution:
    def twoSum(self, nums, target):
        num_dict = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_dict:
                return [num_dict[complement], i]
            num_dict[num] = i
        return []

# Parse input array
input_str = input().strip()
array_str = input_str[input_str.find('['):input_str.find(']')+1]
nums = list(map(int, array_str.strip('[]').split(',')))

# Parse target value
target = int(input().strip())

# Get and print result
solution = Solution()
result = solution.twoSum(nums, target)
print(f"[{result[0]},{result[1]}]")
