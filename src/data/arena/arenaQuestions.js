export const arenaQuestions = [
  // ==========================================
  // PYTHON TRACK
  // ==========================================
  {
    id: 'py-01',
    slug: 'two-sum',
    trackId: 'python',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Arrays', 'Hash Table'],
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Constraints:
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- Only one valid answer exists.`,
    starterCode: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
`,
    sampleTestCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0, 1]', rawArgs: [[2, 7, 11, 15], 9] },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1, 2]', rawArgs: [[3, 2, 4], 6] },
      { input: 'nums = [3,3], target = 6', expectedOutput: '[0, 1]', rawArgs: [[3, 3], 6] },
    ],
    hiddenTestCases: [
      { input: 'nums = [1,5,8,12,19], target = 20', expectedOutput: '[0, 4]', rawArgs: [[1, 5, 8, 12, 19], 20] },
      { input: 'nums = [-3,4,3,90], target = 0', expectedOutput: '[0, 2]', rawArgs: [[-3, 4, 3, 90], 0] },
      { input: 'nums = [0,4,3,0], target = 0', expectedOutput: '[0, 3]', rawArgs: [[0, 4, 3, 0], 0] },
    ],
    hints: [
      'A brute force O(n²) solution checks every pair. Can you do it in a single pass with extra space?',
      'Use a Hash Map to store numbers you have already visited along with their indices.',
      'For each element `num`, check if `target - num` already exists in your hash map.',
    ],
    editorial: {
      approach: 'Hash Map (One-Pass Lookup)',
      complexityTime: 'O(N)',
      complexitySpace: 'O(N)',
      explanation: `While iterating through the list, for each element we calculate the complement \`diff = target - num\`. If \`diff\` is already present in our dictionary \`seen\`, we have found the matching pair and immediately return \`[seen[diff], i]\`. Otherwise, we record \`seen[num] = i\`.`,
      solutionCode: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    },
  },
  {
    id: 'py-02',
    slug: 'valid-parentheses',
    trackId: 'python',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1:
\`\`\`
Input: s = "()"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: s = "(]"
Output: false
\`\`\``,
    starterCode: `def isValid(s: str) -> bool:
    # Write your solution here
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack
`,
    sampleTestCases: [
      { input: 's = "()"', expectedOutput: 'True', rawArgs: ['()'] },
      { input: 's = "()[]{}"', expectedOutput: 'True', rawArgs: ['()[]{}'] },
      { input: 's = "(]"', expectedOutput: 'False', rawArgs: ['(]'] },
    ],
    hiddenTestCases: [
      { input: 's = "([)]"', expectedOutput: 'False', rawArgs: ['([)]'] },
      { input: 's = "{[]}"', expectedOutput: 'True', rawArgs: ['{[]}'] },
      { input: 's = "((("', expectedOutput: 'False', rawArgs: ['((('] },
    ],
    hints: [
      'Use a Stack data structure (LIFO) to keep track of the most recent unmatched opening bracket.',
      'When an opening bracket arrives, push it. When a closing bracket arrives, check if it matches the top of the stack.',
      'At the end of iteration, the stack must be completely empty.',
    ],
    editorial: {
      approach: 'Stack-based Matching',
      complexityTime: 'O(N)',
      complexitySpace: 'O(N)',
      explanation: 'We push opening brackets onto the stack. When encountering a closing bracket, we pop the top element and ensure it matches the corresponding bracket type. Finally, verify the stack is empty.',
      solutionCode: `def isValid(s: str) -> bool:
    stack = []
    lookup = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in lookup:
            if not stack or stack.pop() != lookup[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
    },
  },
  {
    id: 'py-03',
    slug: 'longest-substring-without-repeating-characters',
    trackId: 'python',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Hash Table', 'String'],
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    description: `Given a string \`s\`, find the length of the **longest substring** without duplicate characters.

### Example 1:
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

### Example 2:
\`\`\`
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
\`\`\`

### Example 3:
\`\`\`
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
\`\`\``,
    starterCode: `def lengthOfLongestSubstring(s: str) -> int:
    # Write your solution here
    char_map = {}
    max_len = 0
    left = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len
`,
    sampleTestCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3', rawArgs: ['abcabcbb'] },
      { input: 's = "bbbbb"', expectedOutput: '1', rawArgs: ['bbbbb'] },
      { input: 's = "pwwkew"', expectedOutput: '3', rawArgs: ['pwwkew'] },
    ],
    hiddenTestCases: [
      { input: 's = ""', expectedOutput: '0', rawArgs: [''] },
      { input: 's = "au"', expectedOutput: '2', rawArgs: ['au'] },
      { input: 's = "dvdf"', expectedOutput: '3', rawArgs: ['dvdf'] },
    ],
    hints: [
      'Maintain a sliding window `[left, right]` where all characters within the window are distinct.',
      'Store the last seen index of each character in a dictionary.',
      'When a duplicate is encountered, advance `left` to `last_seen[char] + 1`.',
    ],
    editorial: {
      approach: 'Optimized Sliding Window with Hash Map',
      complexityTime: 'O(N)',
      complexitySpace: 'O(min(N, M)) where M is alphabet size',
      explanation: 'Using two pointers and a dictionary storing character indices, we expand the right pointer. If a character was previously seen within the current window, we leapfrog the left pointer.',
      solutionCode: `def lengthOfLongestSubstring(s: str) -> int:
    last_idx = {}
    max_len = 0
    start = 0
    for i, ch in enumerate(s):
        if ch in last_idx and last_idx[ch] >= start:
            start = last_idx[ch] + 1
        last_idx[ch] = i
        max_len = max(max_len, i - start + 1)
    return max_len`,
    },
  },
  {
    id: 'py-04',
    slug: 'trapping-rain-water',
    trackId: 'python',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    tags: ['Two Pointers', 'Dynamic Programming', 'Monotonic Stack'],
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

### Example 1:
\`\`\`
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: 6 units of rain water are being trapped.
\`\`\`

### Example 2:
\`\`\`
Input: height = [4,2,0,3,2,5]
Output: 9
\`\`\``,
    starterCode: `def trap(height: list[int]) -> int:
    # Write your solution here
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water
`,
    sampleTestCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', rawArgs: [[0,1,0,2,1,0,1,3,2,1,2,1]] },
      { input: 'height = [4,2,0,3,2,5]', expectedOutput: '9', rawArgs: [[4,2,0,3,2,5]] },
    ],
    hiddenTestCases: [
      { input: 'height = [2,0,2]', expectedOutput: '2', rawArgs: [[2,0,2]] },
      { input: 'height = [3,0,0,2,0,4]', expectedOutput: '10', rawArgs: [[3,0,0,2,0,4]] },
    ],
    hints: [
      'The water trapped above any position `i` is determined by `min(max_left, max_right) - height[i]`.',
      'Can you compute this without storing prefix and suffix maximum arrays?',
      'Use two pointers starting at both ends, advancing the pointer with the smaller maximum.',
    ],
    editorial: {
      approach: 'Two Pointer Technique',
      complexityTime: 'O(N)',
      complexitySpace: 'O(1)',
      explanation: 'We maintain two pointers from left and right. Since the trapped water is bounded by the shorter boundary, we can safely advance whichever side has a lower max elevation.',
      solutionCode: `def trap(height: list[int]) -> int:
    if not height:
        return 0
    l, r = 0, len(height) - 1
    l_max, r_max = height[l], height[r]
    res = 0
    while l < r:
        if l_max < r_max:
            l += 1
            l_max = max(l_max, height[l])
            res += l_max - height[l]
        else:
            r -= 1
            r_max = max(r_max, height[r])
            res += r_max - height[r]
    return res`,
    },
  },

  // ==========================================
  // C++ TRACK
  // ==========================================
  {
    id: 'cpp-01',
    slug: 'reverse-linked-list',
    trackId: 'cpp',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Pointers', 'Recursion'],
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.

### Example 1:
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\`

### Example 2:
\`\`\`
Input: head = [1,2]
Output: [2,1]
\`\`\`

### Example 3:
\`\`\`
Input: head = []
Output: []
\`\`\``,
    starterCode: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
    sampleTestCases: [
      { input: 'head = [1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', expectedOutput: '[2,1]' },
      { input: 'head = []', expectedOutput: '[]' },
    ],
    hiddenTestCases: [
      { input: 'head = [1]', expectedOutput: '[1]' },
      { input: 'head = [9,8,7,6,5,4]', expectedOutput: '[4,5,6,7,8,9]' },
    ],
    hints: [
      'Maintain three pointers: `prev`, `curr`, and `nextTemp`.',
      'For every node, reorient `curr->next` to point back to `prev`.',
      'Return `prev` as the new head when `curr` reaches `nullptr`.',
    ],
    editorial: {
      approach: 'Iterative Pointer Reversal',
      complexityTime: 'O(N)',
      complexitySpace: 'O(1)',
      explanation: 'Iterate through the list while redirecting each node\'s next pointer to the previous node.',
      solutionCode: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    },
  },
  {
    id: 'cpp-02',
    slug: 'kth-largest-element-in-an-array',
    trackId: 'cpp',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    tags: ['Heap (Priority Queue)', 'Divide & Conquer', 'QuickSelect'],
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\`th largest element in the array.

Note that it is the \`k\`th largest element in the sorted order, not the \`k\`th distinct element.

Can you solve it in \`O(n)\` time complexity?

### Example 1:
\`\`\`
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
\`\`\``,
    starterCode: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int x : nums) {
            minHeap.push(x);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.top();
    }
};`,
    sampleTestCases: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', expectedOutput: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', expectedOutput: '4' },
    ],
    hiddenTestCases: [
      { input: 'nums = [1], k = 1', expectedOutput: '1' },
      { input: 'nums = [7,10,4,3,20,15], k = 3', expectedOutput: '10' },
    ],
    hints: [
      'A min-heap of capacity `k` keeps track of the top `k` largest elements.',
      'Push each number into the heap. If heap size exceeds `k`, pop the smallest element.',
      'The root of the min-heap at the end is the `k`th largest element.',
    ],
    editorial: {
      approach: 'Min-Heap Priority Queue',
      complexityTime: 'O(N log K)',
      complexitySpace: 'O(K)',
      explanation: 'Maintaining a min-heap of size K guarantees the smallest of the top K elements sits at the top.',
      solutionCode: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int n : nums) {
        pq.push(n);
        if (pq.size() > k) pq.pop();
    }
    return pq.top();
}`,
    },
  },

  // ==========================================
  // JAVASCRIPT / WEB DEV TRACK
  // ==========================================
  {
    id: 'js-01',
    slug: 'debounce-implementation',
    trackId: 'javascript',
    title: 'Implement Debounce Utility',
    difficulty: 'Medium',
    tags: ['Closures', 'Async', 'Event Handling'],
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    description: `Implement a \`debounce\` function in JavaScript that delays invoking \`func\` until after \`wait\` milliseconds have elapsed since the last time the debounced function was invoked.

### Example:
\`\`\`javascript
const log = debounce(() => console.log('Executed!'), 100);
log();
log();
log();
// -> Only logs once after 100ms
\`\`\`

### Requirements:
- Return a debounced wrapper function.
- Support arguments passed to the debounced function.
- Clear any previous timer when invoked within the delay period.`,
    starterCode: `/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
function debounce(func, wait) {
  let timeoutId = null;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
`,
    sampleTestCases: [
      { input: 'debounce(fn, 50)', expectedOutput: 'DebouncedFunction' },
    ],
    hiddenTestCases: [
      { input: 'Rapid invocation test (10 calls in 20ms)', expectedOutput: 'Executed Exactly Once' },
    ],
    hints: [
      'Store a `timeoutId` reference in the outer lexical scope (closure).',
      'On each call, cancel the pending timer using `clearTimeout(timeoutId)`.',
      'Schedule a new `setTimeout` callback that invokes the target function with the provided arguments.',
    ],
    editorial: {
      approach: 'Closure with Timer Cancellation',
      complexityTime: 'O(1)',
      complexitySpace: 'O(1)',
      explanation: 'Debounce wraps a function in a closure that holds the active timeout identifier.',
      solutionCode: `function debounce(func, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), wait);
  };
}`,
    },
  },
  {
    id: 'js-02',
    slug: 'flatten-nested-array',
    trackId: 'javascript',
    title: 'Flatten Deeply Nested Array',
    difficulty: 'Medium',
    tags: ['Recursion', 'Arrays', 'ES6+'],
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    description: `Given a multi-dimensional array \`arr\` and a depth \`n\`, return a flattened version of the array.

A multi-dimensional array is a recursive data structure that contains integers or other multi-dimensional arrays.

### Example 1:
\`\`\`
Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 0
Output: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
\`\`\`

### Example 2:
\`\`\`
Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 1
Output: [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
\`\`\``,
    starterCode: `/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
  if (n <= 0) return arr;
  const res = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      res.push(...flat(item, n - 1));
    } else {
      res.push(item);
    }
  }
  return res;
};
`,
    sampleTestCases: [
      { input: 'arr = [1, 2, [3, 4]], n = 1', expectedOutput: '[1, 2, 3, 4]' },
      { input: 'arr = [[1, [2]], 3], n = 2', expectedOutput: '[1, 2, 3]' },
    ],
    hiddenTestCases: [
      { input: 'arr = [[[[1]]]], n = 3', expectedOutput: '[1]' },
      { input: 'arr = [1, 2, 3], n = 5', expectedOutput: '[1, 2, 3]' },
    ],
    hints: [
      'Check if depth `n > 0`. If not, return the array unchanged.',
      'Iterate through the elements. If an element is an array, recursively flat it with `n - 1`.',
    ],
    editorial: {
      approach: 'Depth-Bounded Recursive Traversal',
      complexityTime: 'O(N)',
      complexitySpace: 'O(D) call stack where D is depth',
      explanation: 'We recursively unpack array items while decrementing the remaining flattening depth budget.',
      solutionCode: `var flat = function (arr, n) {
  if (n <= 0) return arr;
  const result = [];
  for (const el of arr) {
    if (Array.isArray(el)) {
      result.push(...flat(el, n - 1));
    } else {
      result.push(el);
    }
  }
  return result;
};`,
    },
  },

  // ==========================================
  // SQL TRACK
  // ==========================================
  {
    id: 'sql-01',
    slug: 'second-highest-salary',
    trackId: 'sql',
    title: 'Second Highest Salary',
    difficulty: 'Medium',
    tags: ['Subquery', 'DENSE_RANK', 'Aggregation'],
    timeLimitMs: 2000,
    memoryLimitMb: 64,
    description: `Table: \`Employee\`
\`\`\`
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key column for this table.
Each row of this table contains information about the salary of an employee.
\`\`\`

Write an SQL query to report the **second highest distinct salary** from the \`Employee\` table. If there is no second highest salary, the query should report \`null\` (return \`None\` in Pandas/SQLite).

### Example 1:
\`\`\`
Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
Output: 
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
\`\`\``,
    starterCode: `-- Write your PostgreSQL/SQLite query here
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);
`,
    sampleTestCases: [
      { input: 'Employee: [1, 100], [2, 200], [3, 300]', expectedOutput: '200' },
      { input: 'Employee: [1, 100]', expectedOutput: 'null' },
    ],
    hiddenTestCases: [
      { input: 'Employee: [1, 500], [2, 500], [3, 400]', expectedOutput: '400' },
    ],
    hints: [
      'You can find the maximum salary using `SELECT MAX(salary) FROM Employee`.',
      'The second highest salary is simply the maximum salary strictly strictly less than the overall maximum.',
      'Using `MAX()` automatically produces `NULL` if no rows meet the criteria.',
    ],
    editorial: {
      approach: 'Subquery with MAX Aggregator',
      complexityTime: 'O(N)',
      complexitySpace: 'O(1)',
      explanation: 'Filter all records where salary is less than the global maximum, then take the MAX of that filtered subset.',
      solutionCode: `SELECT (
  SELECT DISTINCT salary 
  FROM Employee 
  ORDER BY salary DESC 
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
    },
  },
  {
    id: 'sql-02',
    slug: 'department-top-three-salaries',
    trackId: 'sql',
    title: 'Department Top Three Salaries',
    difficulty: 'Hard',
    tags: ['Window Function', 'DENSE_RANK', 'JOIN'],
    timeLimitMs: 2000,
    memoryLimitMb: 64,
    description: `A company's executives are interested in seeing who earns the most money in each of the company's departments. A **high earner** in a department is an employee who has a salary in the **top three distinct salaries** for that department.

Write an SQL query to find the employees who are high earners in each of the departments.

Return the result table **in any order**.

### Schema:
- \`Employee\`: \`id (int)\`, \`name (varchar)\`, \`salary (int)\`, \`departmentId (int)\`
- \`Department\`: \`id (int)\`, \`name (varchar)\``,
    starterCode: `-- Write your SQL CTE / Window Query here
WITH RankedSalaries AS (
  SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rank
  FROM Employee e
  JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rank <= 3;
`,
    sampleTestCases: [
      { input: 'Departments: [1, IT], [2, Sales]; Employees: 7 rows', expectedOutput: 'Top 3 distinct earners per dept' },
    ],
    hiddenTestCases: [
      { input: 'Department with tied salaries', expectedOutput: 'Dense rank includes all ties within top 3 distinct tiers' },
    ],
    hints: [
      'Use `DENSE_RANK()` partitioned by `departmentId` and ordered by `salary DESC`.',
      'Filter where `rank <= 3`.',
      'Join `Employee` with `Department` on `departmentId = Department.id`.',
    ],
    editorial: {
      approach: 'CTE with DENSE_RANK() Window Partition',
      complexityTime: 'O(N log N)',
      complexitySpace: 'O(N)',
      explanation: 'DENSE_RANK ensures distinct salaries receive contiguous ranks without gaps, correctly retaining tied employees.',
      solutionCode: `WITH Ranked AS (
  SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) as rnk
  FROM Employee e
  JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary FROM Ranked WHERE rnk <= 3;`,
    },
  },

  // ==========================================
  // JAVA TRACK
  // ==========================================
  {
    id: 'java-01',
    slug: 'binary-tree-level-order-traversal',
    trackId: 'java',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    tags: ['Tree', 'Breadth-First Search', 'Queue'],
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    description: `Given the \`root\` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).

### Example 1:
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
\`\`\`

### Example 2:
\`\`\`
Input: root = [1]
Output: [[1]]
\`\`\``,
    starterCode: `import java.util.*;

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        
        return result;
    }
}`,
    sampleTestCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', expectedOutput: '[[1]]' },
    ],
    hiddenTestCases: [
      { input: 'root = []', expectedOutput: '[]' },
      { input: 'root = [1,2,3,4,5]', expectedOutput: '[[1],[2,3],[4,5]]' },
    ],
    hints: [
      'A Queue (FIFO) is ideal for Breadth-First Search (BFS).',
      'At each iteration of the outer loop, record `int size = queue.size()` to process exactly one tier of nodes.',
    ],
    editorial: {
      approach: 'Queue-based BFS',
      complexityTime: 'O(N)',
      complexitySpace: 'O(W) where W is max tree width',
      explanation: 'Standard level-by-level queue processing.',
      solutionCode: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        int sz = q.size();
        List<Integer> lvl = new ArrayList<>();
        for (int i = 0; i < sz; i++) {
            TreeNode curr = q.poll();
            lvl.add(curr.val);
            if (curr.left != null) q.add(curr.left);
            if (curr.right != null) q.add(curr.right);
        }
        res.add(lvl);
    }
    return res;
}`,
    },
  },

  // ==========================================
  // C TRACK
  // ==========================================
  {
    id: 'c-01',
    slug: 'bitwise-single-number',
    trackId: 'c',
    title: 'Single Number via XOR',
    difficulty: 'Easy',
    tags: ['Bit Manipulation', 'Arrays'],
    timeLimitMs: 1000,
    memoryLimitMb: 32,
    description: `Given a non-empty array of integers \`nums\`, every element appears *twice* except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

### Example 1:
\`\`\`
Input: nums = [2,2,1]
Output: 1
\`\`\`

### Example 2:
\`\`\`
Input: nums = [4,1,2,1,2]
Output: 4
\`\`\``,
    starterCode: `#include <stdio.h>

int singleNumber(int* nums, int numsSize) {
    int unique = 0;
    for (int i = 0; i < numsSize; i++) {
        unique ^= nums[i];
    }
    return unique;
}
`,
    sampleTestCases: [
      { input: 'nums = [2,2,1]', expectedOutput: '1' },
      { input: 'nums = [4,1,2,1,2]', expectedOutput: '4' },
    ],
    hiddenTestCases: [
      { input: 'nums = [1]', expectedOutput: '1' },
      { input: 'nums = [99, -5, -5, 99, 42]', expectedOutput: '42' },
    ],
    hints: [
      'Recall the XOR properties: `x ^ x = 0` and `x ^ 0 = x`.',
      'XOR is commutative and associative: order of operations does not matter.',
      'XORing all elements cancels out duplicate pairs, leaving the unique element.',
    ],
    editorial: {
      approach: 'Bitwise XOR Accumulation',
      complexityTime: 'O(N)',
      complexitySpace: 'O(1)',
      explanation: 'XORing a number with itself yields 0. Accumulating XOR over the array annihilates all paired values.',
      solutionCode: `int singleNumber(int* nums, int numsSize) {
    int res = 0;
    for (int i = 0; i < numsSize; i++) res ^= nums[i];
    return res;
}`,
    },
  },

  // ==========================================
  // C# / .NET TRACK
  // ==========================================
  {
    id: 'csharp-01',
    slug: 'group-anagrams',
    trackId: 'csharp',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sorting', 'LINQ'],
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    description: `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example 1:
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`

### Example 2:
\`\`\`
Input: strs = [""]
Output: [[""]]
\`\`\``,
    starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public IList<IList<string>> GroupAnagrams(string[] strs) {
        var map = new Dictionary<string, List<string>>();
        
        foreach (var str in strs) {
            char[] chars = str.ToCharArray();
            Array.Sort(chars);
            string key = new string(chars);
            
            if (!map.ContainsKey(key)) {
                map[key] = new List<string>();
            }
            map[key].Add(str);
        }
        
        return map.Values.Cast<IList<string>>().ToList();
    }
}`,
    sampleTestCases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', expectedOutput: '[[""]]' },
    ],
    hiddenTestCases: [
      { input: 'strs = ["a"]', expectedOutput: '[["a"]]' },
      { input: 'strs = ["ab", "ba", "abc", "cba"]', expectedOutput: '[["ab","ba"],["abc","cba"]]' },
    ],
    hints: [
      'Two strings are anagrams if their sorted character sequences are identical.',
      'Use the sorted string as a dictionary key.',
    ],
    editorial: {
      approach: 'Categorize by Sorted String Key',
      complexityTime: 'O(N * K log K)',
      complexitySpace: 'O(N * K)',
      explanation: 'Sort each string\'s characters to produce a canonical key, collecting strings under their respective buckets.',
      solutionCode: `public IList<IList<string>> GroupAnagrams(string[] strs) {
    return strs.GroupBy(s => new string(s.OrderBy(c => c).ToArray()))
               .Select(g => (IList<string>)g.ToList())
               .ToList();
}`,
    },
  },
];
