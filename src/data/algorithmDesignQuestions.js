export const ALGORITHM_DESIGN_EXPECTED_COUNT = 65;

function createQuestion(id, unit, question, options, answer, solution = '') {
  return {
    id,
    unit,
    question,
    options: ['A', 'B', 'C', 'D'].map((label, index) => ({
      label,
      text: options[index],
    })),
    answer,
    solution: solution || `Correct answer is option (${answer}).`,
  };
}

export const algorithmDesignQuestions = [
  // Unit I: Introduction
  createQuestion(1, 'Unit I: Introduction', 'What is an algorithm?', ['Step-by-step procedure to solve a problem', 'A programming language', 'A data structure', 'A hardware device'], 'A'),
  createQuestion(2, 'Unit I: Introduction', 'What is the best-case time complexity?', ['Minimum time required', 'Maximum time required', 'Average time required', 'Exact time required'], 'A'),
  createQuestion(3, 'Unit I: Introduction', 'What is the worst-case time complexity?', ['Maximum time required', 'Minimum time required', 'Average time required', 'Exact time required'], 'A'),
  createQuestion(4, 'Unit I: Introduction', 'What is the average-case time complexity?', ['Average time required', 'Minimum time required', 'Maximum time required', 'Exact time required'], 'A'),
  createQuestion(5, 'Unit I: Introduction', 'What does Big O notation represent?', ['Upper bound of algorithm', 'Lower bound of algorithm', 'Exact bound of algorithm', 'Average bound of algorithm'], 'A'),
  createQuestion(6, 'Unit I: Introduction', 'What is recursion?', ['Function calling itself', 'Function calling another function', 'Loop', 'Iteration'], 'A'),
  createQuestion(7, 'Unit I: Introduction', 'What is a recurrence relation?', ['Equation defining function in terms of itself', 'Equation defining function in terms of others', 'Linear equation', 'Quadratic equation'], 'A'),
  createQuestion(8, 'Unit I: Introduction', 'What is the time complexity of O(n)?', ['Linear time', 'Constant time', 'Quadratic time', 'Logarithmic time'], 'A'),
  createQuestion(9, 'Unit I: Introduction', 'What is the time complexity of O(n²)?', ['Quadratic time', 'Linear time', 'Constant time', 'Logarithmic time'], 'A'),
  createQuestion(10, 'Unit I: Introduction', 'What is the time complexity of O(log n)?', ['Logarithmic time', 'Linear time', 'Quadratic time', 'Constant time'], 'A'),

  // Unit II: Divide and Conquer and Greedy Method
  createQuestion(11, 'Unit II: Divide and Conquer & Greedy', 'What is the divide and conquer approach?', ['Divide problem into subproblems', 'Solve problem directly', 'Use greedy method', 'Use dynamic programming'], 'A'),
  createQuestion(12, 'Unit II: Divide and Conquer & Greedy', 'What is binary search?', ['Search in sorted array by dividing', 'Search in unsorted array', 'Sequential search', 'Random search'], 'A'),
  createQuestion(13, 'Unit II: Divide and Conquer & Greedy', 'What is the time complexity of binary search?', ['O(log n)', 'O(n)', 'O(n²)', 'O(n log n)'], 'A'),
  createQuestion(14, 'Unit II: Divide and Conquer & Greedy', 'What is merge sort?', ['Divide and conquer sorting', 'Greedy sorting', 'Dynamic sorting', 'Simple sorting'], 'A'),
  createQuestion(15, 'Unit II: Divide and Conquer & Greedy', 'What is the time complexity of merge sort?', ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], 'A'),
  createQuestion(16, 'Unit II: Divide and Conquer & Greedy', 'What is quick sort?', ['Divide and conquer sorting with pivot', 'Greedy sorting', 'Dynamic sorting', 'Simple sorting'], 'A'),
  createQuestion(17, 'Unit II: Divide and Conquer & Greedy', 'What is the worst-case time complexity of quick sort?', ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], 'A'),
  createQuestion(18, 'Unit II: Divide and Conquer & Greedy', 'What is the greedy method?', ['Making locally optimal choice', 'Making globally optimal choice', 'Random choice', 'No choice'], 'A'),
  createQuestion(19, 'Unit II: Divide and Conquer & Greedy', 'What is the knapsack problem?', ['Maximize value within weight limit', 'Minimize weight', 'Maximize weight', 'Minimize value'], 'A'),
  createQuestion(20, 'Unit II: Divide and Conquer & Greedy', "What is Prim's algorithm?", ['Greedy algorithm for MST', 'Dynamic algorithm for MST', 'Divide and conquer for MST', 'Random algorithm for MST'], 'A'),
  createQuestion(21, 'Unit II: Divide and Conquer & Greedy', "What is Kruskal's algorithm?", ['Greedy algorithm for MST', 'Dynamic algorithm for MST', 'Divide and conquer for MST', 'Random algorithm for MST'], 'A'),
  createQuestion(22, 'Unit II: Divide and Conquer & Greedy', "What is the time complexity of Prim's algorithm?", ['O(V²)', 'O(E log V)', 'O(V log V)', 'O(E²)'], 'A'),
  createQuestion(23, 'Unit II: Divide and Conquer & Greedy', "What is the time complexity of Kruskal's algorithm?", ['O(E log E)', 'O(V²)', 'O(E²)', 'O(V log V)'], 'A'),
  createQuestion(24, 'Unit II: Divide and Conquer & Greedy', 'What is the single source shortest path problem?', ['Shortest path from one source', 'Shortest path between all pairs', 'Shortest path to all destinations', 'Shortest path in network'], 'A'),
  createQuestion(25, 'Unit II: Divide and Conquer & Greedy', "What is Dijkstra's algorithm?", ['Greedy algorithm for shortest path', 'Dynamic algorithm for shortest path', 'Divide and conquer for shortest path', 'Random algorithm for shortest path'], 'A'),

  // Unit III: Dynamic Programming
  createQuestion(26, 'Unit III: Dynamic Programming', 'What is dynamic programming?', ['Storing results of subproblems', 'Greedy approach', 'Divide and conquer', 'Random approach'], 'A'),
  createQuestion(27, 'Unit III: Dynamic Programming', 'What is the optimal substructure property?', ['Optimal solution contains optimal sub-solutions', 'Sub-solutions are not optimal', 'Solutions are random', 'No sub-solutions'], 'A'),
  createQuestion(28, 'Unit III: Dynamic Programming', 'What is overlapping subproblems?', ['Subproblems repeated', 'Subproblems unique', 'No subproblems', 'Random subproblems'], 'A'),
  createQuestion(29, 'Unit III: Dynamic Programming', 'What is chained matrix multiplication?', ['Multiplying matrices in optimal order', 'Multiplying matrices randomly', 'Multiplying matrices sequentially', 'Not a valid problem'], 'A'),
  createQuestion(30, 'Unit III: Dynamic Programming', 'What is the time complexity of matrix chain multiplication?', ['O(n³)', 'O(n²)', 'O(n log n)', 'O(n)'], 'A'),
  createQuestion(31, 'Unit III: Dynamic Programming', 'What is optimal binary search tree?', ['BST with optimal search cost', 'BST with random search cost', 'BST with no search cost', 'BST with maximum search cost'], 'A'),
  createQuestion(32, 'Unit III: Dynamic Programming', 'What is the all-pairs shortest path problem?', ['Shortest path between all pairs', 'Shortest path from one source', 'Shortest path to one destination', 'Shortest path in network'], 'A'),
  createQuestion(33, 'Unit III: Dynamic Programming', "What is Floyd's algorithm?", ['Dynamic programming for all-pairs shortest path', 'Greedy algorithm for all-pairs shortest path', 'Divide and conquer for all-pairs shortest path', 'Random algorithm for all-pairs shortest path'], 'A'),
  createQuestion(34, 'Unit III: Dynamic Programming', "What is the time complexity of Floyd's algorithm?", ['O(V³)', 'O(V²)', 'O(V log V)', 'O(E log V)'], 'A'),
  createQuestion(35, 'Unit III: Dynamic Programming', "What is Warshall's algorithm?", ['Dynamic programming for transitive closure', 'Greedy algorithm for transitive closure', 'Divide and conquer for transitive closure', 'Random algorithm for transitive closure'], 'A'),

  // Unit IV: Branch and Bound and Pattern Matching
  createQuestion(36, 'Unit IV: Branch and Bound & Pattern Matching', 'What is branch and bound?', ['Search technique with pruning', 'Greedy technique', 'Dynamic programming', 'Divide and conquer'], 'A'),
  createQuestion(37, 'Unit IV: Branch and Bound & Pattern Matching', 'What is the 0/1 knapsack problem?', ['Items cannot be divided', 'Items can be divided', 'Items can be repeated', 'Items are free'], 'A'),
  createQuestion(38, 'Unit IV: Branch and Bound & Pattern Matching', 'What is the brute force pattern matching?', ['Comparing each character', 'Using KMP algorithm', 'Using Boyer-Moore algorithm', 'Using hashing'], 'A'),
  createQuestion(39, 'Unit IV: Branch and Bound & Pattern Matching', 'What is the time complexity of brute force pattern matching?', ['O(mn)', 'O(m+n)', 'O(log n)', 'O(n²)'], 'A'),
  createQuestion(40, 'Unit IV: Branch and Bound & Pattern Matching', 'What is the KMP algorithm?', ['Pattern matching with prefix function', 'Pattern matching with suffix function', 'Pattern matching with hashing', 'Pattern matching with sorting'], 'A'),
  createQuestion(41, 'Unit IV: Branch and Bound & Pattern Matching', 'What is the time complexity of KMP algorithm?', ['O(m+n)', 'O(mn)', 'O(n²)', 'O(m²)'], 'A'),
  createQuestion(42, 'Unit IV: Branch and Bound & Pattern Matching', 'What is the Boyer-Moore algorithm?', ['Pattern matching with bad character rule', 'Pattern matching with good suffix rule', 'Both A and B', 'Neither'], 'C'),
  createQuestion(43, 'Unit IV: Branch and Bound & Pattern Matching', 'What is Huffman coding?', ['Data compression with variable-length codes', 'Data compression with fixed-length codes', 'Data encryption', 'Data decryption'], 'A'),
  createQuestion(44, 'Unit IV: Branch and Bound & Pattern Matching', 'What is the time complexity of Huffman coding?', ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], 'A'),
  createQuestion(45, 'Unit IV: Branch and Bound & Pattern Matching', 'What is the greedy property of Huffman coding?', ['Combine lowest frequency nodes', 'Combine highest frequency nodes', 'Combine random nodes', 'No combining'], 'A'),

  // Unit V: Lower Bound Theory and Backtracking
  createQuestion(46, 'Unit V: Lower Bound Theory & Backtracking', 'What is lower bound theory?', ['Minimum complexity of algorithm', 'Maximum complexity of algorithm', 'Average complexity of algorithm', 'Exact complexity of algorithm'], 'A'),
  createQuestion(47, 'Unit V: Lower Bound Theory & Backtracking', 'What is a comparison tree?', ['Tree representing comparisons', 'Tree representing data', 'Tree representing code', 'Tree representing memory'], 'A'),
  createQuestion(48, 'Unit V: Lower Bound Theory & Backtracking', 'What is the approximation algorithm?', ['Algorithm with near-optimal solution', 'Algorithm with exact solution', 'Algorithm with no solution', 'Algorithm with random solution'], 'A'),
  createQuestion(49, 'Unit V: Lower Bound Theory & Backtracking', 'What is task scheduling?', ['Assigning tasks to resources', 'Creating tasks', 'Deleting tasks', 'Modifying tasks'], 'A'),
  createQuestion(50, 'Unit V: Lower Bound Theory & Backtracking', 'What is bin packing?', ['Packing items into bins', 'Creating bins', 'Deleting bins', 'Sorting bins'], 'A'),
  createQuestion(51, 'Unit V: Lower Bound Theory & Backtracking', 'What is backtracking?', ['Trying all possibilities and backtracking', 'Greedy approach', 'Dynamic programming', 'Divide and conquer'], 'A'),
  createQuestion(52, 'Unit V: Lower Bound Theory & Backtracking', 'What is the N-Queens problem?', ['Placing N queens on N×N board', 'Placing N kings on N×N board', 'Placing N rooks on N×N board', 'Placing N bishops on N×N board'], 'A'),
  createQuestion(53, 'Unit V: Lower Bound Theory & Backtracking', 'What is graph coloring?', ['Assigning colors to vertices', 'Assigning colors to edges', 'Assigning colors to faces', 'Assigning colors to graphs'], 'A'),
  createQuestion(54, 'Unit V: Lower Bound Theory & Backtracking', 'What is the Hamiltonian cycle?', ['Cycle visiting all vertices once', 'Cycle visiting all edges once', 'Cycle visiting all faces once', 'Cycle visiting all graphs once'], 'A'),
  createQuestion(55, 'Unit V: Lower Bound Theory & Backtracking', 'What is the permutation of a string?', ['All arrangements of characters', 'Some arrangements of characters', 'No arrangements of characters', 'Random arrangements'], 'A'),

  // Unit VI: Intractable Problems
  createQuestion(56, 'Unit VI: Intractable Problems', 'What is a nondeterministic algorithm?', ['Algorithm with choices', 'Algorithm with fixed choices', 'Algorithm with no choices', 'Algorithm with random choices'], 'A'),
  createQuestion(57, 'Unit VI: Intractable Problems', 'What is NP completeness?', ['Class of hardest problems', 'Class of easiest problems', 'Class of solvable problems', 'Class of unsolvable problems'], 'A'),
  createQuestion(58, 'Unit VI: Intractable Problems', 'What is the traveling salesman problem?', ['Finding shortest tour visiting all cities', 'Finding longest tour visiting all cities', 'Finding random tour', 'Finding no tour'], 'A'),
  createQuestion(59, 'Unit VI: Intractable Problems', 'What is an NP-hard problem?', ['At least as hard as NP problems', 'Easier than NP problems', 'Solvable in polynomial time', 'Not solvable'], 'A'),
  createQuestion(60, 'Unit VI: Intractable Problems', 'What is an NP-complete problem?', ['NP-hard and in NP', 'NP-hard but not in NP', 'Not NP-hard but in NP', 'Neither'], 'A'),
  createQuestion(61, 'Unit VI: Intractable Problems', 'What is the decision problem?', ['Problem with yes/no answer', 'Problem with multiple answers', 'Problem with no answer', 'Problem with random answer'], 'A'),
  createQuestion(62, 'Unit VI: Intractable Problems', 'What is the optimization problem?', ['Problem with optimal solution', 'Problem with any solution', 'Problem with no solution', 'Problem with random solution'], 'A'),
  createQuestion(63, 'Unit VI: Intractable Problems', 'What is the time complexity of traveling salesman problem?', ['Exponential', 'Polynomial', 'Linear', 'Logarithmic'], 'A'),
  createQuestion(64, 'Unit VI: Intractable Problems', 'What is the reduction in complexity theory?', ['Transforming one problem to another', 'Solving one problem', 'Creating one problem', 'Deleting one problem'], 'A'),
  createQuestion(65, 'Unit VI: Intractable Problems', 'What is the purpose of NP-completeness?', ['Classify hard problems', 'Solve hard problems', 'Create hard problems', 'Delete hard problems'], 'A'),
];
