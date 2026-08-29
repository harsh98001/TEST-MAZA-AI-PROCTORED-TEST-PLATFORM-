export const DSA_EXPECTED_COUNT = 80;

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

export const dsaQuestions = [
  // Unit I: Basic Concepts
  createQuestion(1, 'Unit I: Basic Concepts', 'What is a data structure?', ['A way to organize data in memory', 'A programming language', 'An operating system', 'A database'], 'A'),
  createQuestion(2, 'Unit I: Basic Concepts', 'Which of the following is a primitive data structure?', ['Array', 'Integer', 'Linked List', 'Stack'], 'B'),
  createQuestion(3, 'Unit I: Basic Concepts', 'What is an algorithm?', ['A programming language', 'Step-by-step procedure to solve a problem', 'A data type', 'A memory location'], 'B'),
  createQuestion(4, 'Unit I: Basic Concepts', 'What does time complexity measure?', ['Memory used by algorithm', 'Time taken by algorithm', 'Number of lines of code', 'Number of variables used'], 'B'),
  createQuestion(5, 'Unit I: Basic Concepts', 'What does space complexity measure?', ['Time taken by algorithm', 'Memory used by algorithm', 'Number of operations', 'Code length'], 'B'),
  createQuestion(6, 'Unit I: Basic Concepts', 'What is Big-O notation used for?', ['Exact time measurement', 'Asymptotic upper bound', 'Exact memory measurement', 'Lower bound'], 'B'),
  createQuestion(7, 'Unit I: Basic Concepts', 'What is the time complexity of O(1)?', ['Constant time', 'Linear time', 'Quadratic time', 'Logarithmic time'], 'A'),
  createQuestion(8, 'Unit I: Basic Concepts', 'Which notation represents the worst-case complexity?', ['Big-O', 'Omega', 'Theta', 'Little-o'], 'A'),
  createQuestion(9, 'Unit I: Basic Concepts', 'What is a pointer?', ['A variable that stores memory address', 'A data type', 'A function', 'A class'], 'A'),
  createQuestion(10, 'Unit I: Basic Concepts', 'What is self-referential structure?', ['Structure containing a pointer to itself', 'Structure with no members', 'Structure with arrays', 'Structure with functions'], 'A'),
  createQuestion(11, 'Unit I: Basic Concepts', 'What is the time complexity of Bubble Sort?', ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'], 'B'),
  createQuestion(12, 'Unit I: Basic Concepts', 'Which notation represents the average-case complexity?', ['Big-O', 'Omega', 'Theta', 'Little-o'], 'C'),
  createQuestion(13, 'Unit I: Basic Concepts', 'What is the purpose of asymptotic analysis?', ['To measure exact time', 'To analyze algorithm efficiency for large inputs', 'To debug programs', 'To write code'], 'B'),
  createQuestion(14, 'Unit I: Basic Concepts', 'What is the time complexity of binary search?', ['O(n)', 'O(log n)', 'O(n²)', 'O(n log n)'], 'B'),
  createQuestion(15, 'Unit I: Basic Concepts', 'Which control structure executes statements repeatedly?', ['If-else', 'Switch', 'Loop', 'Function'], 'C'),
  createQuestion(16, 'Unit I: Basic Concepts', 'What is the space complexity of an array?', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 'B'),
  createQuestion(17, 'Unit I: Basic Concepts', 'What is a doubly linked list?', ['List with two data fields', 'List with two pointers (prev, next)', 'List with two head nodes', 'List with two tail nodes'], 'B'),
  createQuestion(18, 'Unit I: Basic Concepts', 'What is the time complexity of accessing an element in an array?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'A'),
  createQuestion(19, 'Unit I: Basic Concepts', 'Which data structure uses LIFO principle?', ['Queue', 'Stack', 'Array', 'Linked List'], 'B'),
  createQuestion(20, 'Unit I: Basic Concepts', 'Which data structure uses FIFO principle?', ['Stack', 'Queue', 'Tree', 'Graph'], 'B'),

  // Unit II: Arrays
  createQuestion(21, 'Unit II: Arrays', 'What is an array?', ['A collection of similar data elements', 'A collection of different data types', 'A linked structure', 'A tree structure'], 'A'),
  createQuestion(22, 'Unit II: Arrays', 'What is the index of the first element in an array?', ['0', '1', '-1', 'Depends on language'], 'A'),
  createQuestion(23, 'Unit II: Arrays', 'How is a 2D array stored in memory?', ['Row-major or Column-major', 'Random', 'Sequential', 'Linked'], 'A'),
  createQuestion(24, 'Unit II: Arrays', 'What is array traversal?', ['Visiting each element', 'Deleting elements', 'Inserting elements', 'Sorting elements'], 'A'),
  createQuestion(25, 'Unit II: Arrays', 'What is the time complexity of array insertion at the end?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'A'),
  createQuestion(26, 'Unit II: Arrays', 'What is the time complexity of array insertion at the beginning?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'B'),
  createQuestion(27, 'Unit II: Arrays', 'What is array concatenation?', ['Joining two arrays', 'Splitting an array', 'Sorting an array', 'Reversing an array'], 'A'),
  createQuestion(28, 'Unit II: Arrays', 'What is array merging?', ['Combining two sorted arrays', 'Deleting from array', 'Searching in array', 'Traversing array'], 'A'),
  createQuestion(29, 'Unit II: Arrays', 'What is the memory representation of a 2D array?', ['Contiguous memory allocation', 'Non-contiguous', 'Linked', 'Random'], 'A'),
  createQuestion(30, 'Unit II: Arrays', 'What is the time complexity of linear search?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'B'),
  createQuestion(31, 'Unit II: Arrays', 'What is the space complexity of a 2D array of size m×n?', ['O(m+n)', 'O(mn)', 'O(m²)', 'O(n²)'], 'B'),
  createQuestion(32, 'Unit II: Arrays', 'Which operation is fastest in an array?', ['Insertion at beginning', 'Deletion at beginning', 'Access by index', 'Insertion at middle'], 'C'),
  createQuestion(33, 'Unit II: Arrays', 'What is the maximum size of an array?', ['100 elements', '1000 elements', '10000 elements', 'Depends on memory'], 'D'),
  createQuestion(34, 'Unit II: Arrays', 'What is the time complexity of array deletion at the end?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'A'),
  createQuestion(35, 'Unit II: Arrays', 'What is the time complexity of array deletion at the beginning?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'B'),

  // Unit III: Linked Lists
  createQuestion(36, 'Unit III: Linked Lists', 'What is a linked list?', ['A linear collection of nodes', 'A tree structure', 'A graph structure', 'An array'], 'A'),
  createQuestion(37, 'Unit III: Linked Lists', 'What does a node in a linked list contain?', ['Data and pointer to next node', 'Only data', 'Only pointer', 'Data and function'], 'A'),
  createQuestion(38, 'Unit III: Linked Lists', 'What is dynamic memory allocation?', ['Allocating memory at runtime', 'Allocating memory at compile time', 'Fixed memory allocation', 'Static memory allocation'], 'A'),
  createQuestion(39, 'Unit III: Linked Lists', 'Which function is used to allocate memory in C?', ['malloc()', 'new()', 'create()', 'alloc()'], 'A'),
  createQuestion(40, 'Unit III: Linked Lists', 'What is the time complexity of insertion in a singly linked list?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'A'),
  createQuestion(41, 'Unit III: Linked Lists', 'What is a doubly linked list?', ['Each node has two data fields', 'Each node has prev and next pointers', 'List has two heads', 'List has two tails'], 'B'),
  createQuestion(42, 'Unit III: Linked Lists', 'What is a circular linked list?', ['Last node points to first node', 'Nodes are circular', 'List is sorted', 'No head node'], 'A'),
  createQuestion(43, 'Unit III: Linked Lists', 'What is the time complexity of searching in a linked list?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'B'),
  createQuestion(44, 'Unit III: Linked Lists', 'What is the advantage of a linked list over an array?', ['Random access', 'Dynamic size', 'Cache efficiency', 'Less memory'], 'B'),
  createQuestion(45, 'Unit III: Linked Lists', 'What is the disadvantage of a linked list?', ['No random access', 'Fixed size', 'More cache efficiency', 'Simpler'], 'A'),
  createQuestion(46, 'Unit III: Linked Lists', 'What is the time complexity of deletion in a linked list?', ['O(1) if node known', 'O(n)', 'O(log n)', 'O(n²)'], 'A'),
  createQuestion(47, 'Unit III: Linked Lists', 'What is a header node?', ['Node before first data node', 'Last node', 'Middle node', 'Random node'], 'A'),
  createQuestion(48, 'Unit III: Linked Lists', 'What is the space complexity of a linked list?', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 'B'),
  createQuestion(49, 'Unit III: Linked Lists', 'Which operation is easier in a doubly linked list?', ['Forward traversal', 'Backward traversal', 'Sorting', 'Searching'], 'B'),
  createQuestion(50, 'Unit III: Linked Lists', 'What is the time complexity of inserting at the end of a linked list?', ['O(1) with tail pointer', 'O(n)', 'O(log n)', 'O(n²)'], 'A'),

  // Unit IV: Stacks and Queues
  createQuestion(51, 'Unit IV: Stacks and Queues', 'What is a stack?', ['LIFO data structure', 'FIFO data structure', 'Tree structure', 'Graph structure'], 'A'),
  createQuestion(52, 'Unit IV: Stacks and Queues', 'What operations are performed on a stack?', ['Push and Pop', 'Insert and Delete', 'Enqueue and Dequeue', 'Add and Remove'], 'A'),
  createQuestion(53, 'Unit IV: Stacks and Queues', 'What is a queue?', ['FIFO data structure', 'LIFO data structure', 'Tree', 'Graph'], 'A'),
  createQuestion(54, 'Unit IV: Stacks and Queues', 'What is the time complexity of stack operations?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 'A'),
  createQuestion(55, 'Unit IV: Stacks and Queues', 'What is a circular queue?', ['Queue with circular array', 'Queue with circular nodes', 'Queue with no end', 'Queue with two heads'], 'A'),
  createQuestion(56, 'Unit IV: Stacks and Queues', 'What is a deque?', ['Double-ended queue', 'Single-ended queue', 'Circular queue', 'Priority queue'], 'A'),
  createQuestion(57, 'Unit IV: Stacks and Queues', 'What is recursion?', ['Function calling itself', 'Loop', 'Iteration', 'Function calling another'], 'A'),
  createQuestion(58, 'Unit IV: Stacks and Queues', 'What is the base case in recursion?', ['Condition to stop recursion', 'First function call', 'Last function call', 'Error case'], 'A'),
  createQuestion(59, 'Unit IV: Stacks and Queues', 'Which data structure is used for recursion?', ['Stack', 'Queue', 'Array', 'Linked List'], 'A'),
  createQuestion(60, 'Unit IV: Stacks and Queues', 'What is the time complexity of recursion?', ['O(1)', 'Depends on problem', 'O(n)', 'O(log n)'], 'B'),

  // Unit V: Trees and Graphs
  createQuestion(61, 'Unit V: Trees and Graphs', 'What is a tree?', ['Hierarchical data structure', 'Linear data structure', 'Circular data structure', 'Random data structure'], 'A'),
  createQuestion(62, 'Unit V: Trees and Graphs', 'What is a binary tree?', ['Each node has at most 2 children', 'Each node has exactly 2 children', 'Each node has at most 1 child', 'Each node has 3 children'], 'A'),
  createQuestion(63, 'Unit V: Trees and Graphs', 'What is a binary search tree (BST)?', ['Left < root < right', 'Left > root > right', 'No order', 'Random order'], 'A'),
  createQuestion(64, 'Unit V: Trees and Graphs', 'What is tree traversal?', ['Visiting all nodes', 'Deleting all nodes', 'Inserting nodes', 'Searching nodes'], 'A'),
  createQuestion(65, 'Unit V: Trees and Graphs', 'What are the types of tree traversal?', ['Preorder, Inorder, Postorder', 'BFS, DFS', 'Left, Right', 'Top, Bottom'], 'A'),
  createQuestion(66, 'Unit V: Trees and Graphs', 'What is a graph?', ['Collection of vertices and edges', 'Collection of nodes only', 'Collection of edges only', 'Tree structure'], 'A'),
  createQuestion(67, 'Unit V: Trees and Graphs', 'What is DFS?', ['Depth-First Search', 'Data-First Search', 'Depth-Fast Search', 'Data-Fast Search'], 'A'),
  createQuestion(68, 'Unit V: Trees and Graphs', 'What is BFS?', ['Breadth-First Search', 'Best-First Search', 'Binary-First Search', 'Breadth-Fast Search'], 'A'),
  createQuestion(69, 'Unit V: Trees and Graphs', 'What is the time complexity of DFS?', ['O(V + E)', 'O(V²)', 'O(E²)', 'O(VE)'], 'A'),
  createQuestion(70, 'Unit V: Trees and Graphs', 'What is the time complexity of BFS?', ['O(V + E)', 'O(V²)', 'O(E²)', 'O(VE)'], 'A'),

  // Unit VI: Searching and Sorting
  createQuestion(71, 'Unit VI: Searching and Sorting', 'What is linear search?', ['Searching sequentially', 'Searching binary', 'Searching randomly', 'Searching recursively'], 'A'),
  createQuestion(72, 'Unit VI: Searching and Sorting', 'What is binary search?', ['Search in sorted array', 'Search in unsorted array', 'Search in linked list', 'Search in tree'], 'A'),
  createQuestion(73, 'Unit VI: Searching and Sorting', 'What is the time complexity of binary search?', ['O(log n)', 'O(n)', 'O(n²)', 'O(n log n)'], 'A'),
  createQuestion(74, 'Unit VI: Searching and Sorting', 'What is bubble sort?', ['Adjacent element swapping', 'Insertion sort', 'Selection sort', 'Merge sort'], 'A'),
  createQuestion(75, 'Unit VI: Searching and Sorting', 'What is insertion sort?', ['Insert elements in sorted order', 'Swap adjacent elements', 'Select minimum', 'Merge halves'], 'A'),
  createQuestion(76, 'Unit VI: Searching and Sorting', 'What is selection sort?', ['Select minimum and swap', 'Insert in order', 'Swap adjacent', 'Merge halves'], 'A'),
  createQuestion(77, 'Unit VI: Searching and Sorting', 'What is merge sort?', ['Divide and conquer', 'Insertion', 'Selection', 'Bubble'], 'A'),
  createQuestion(78, 'Unit VI: Searching and Sorting', 'What is the time complexity of merge sort?', ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], 'A'),
  createQuestion(79, 'Unit VI: Searching and Sorting', 'What is radix sort?', ['Digit-based sorting', 'Comparison-based sorting', 'Insertion sort', 'Selection sort'], 'A'),
  createQuestion(80, 'Unit VI: Searching and Sorting', 'Which sort is stable?', ['Merge Sort', 'Quick Sort', 'Selection Sort', 'Heap Sort'], 'A'),
];
