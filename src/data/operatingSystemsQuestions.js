export const OPERATING_SYSTEMS_EXPECTED_COUNT = 60;

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

export const operatingSystemsQuestions = [
  // Unit I: Introduction to Operating System
  createQuestion(1, 'Unit I: Introduction to Operating System', 'What is an operating system?', ['Software that manages hardware', 'Application software', 'Programming language', 'Database system'], 'A'),
  createQuestion(2, 'Unit I: Introduction to Operating System', 'Which is a type of operating system?', ['Batch processing OS', 'Application OS', 'Database OS', 'Web OS'], 'A'),
  createQuestion(3, 'Unit I: Introduction to Operating System', 'What is a system call?', ['Request to OS for service', 'Function call in program', 'System restart', 'Hardware interrupt'], 'A'),
  createQuestion(4, 'Unit I: Introduction to Operating System', 'Which is not an OS service?', ['Memory management', 'File management', 'Web browsing', 'Process management'], 'C'),
  createQuestion(5, 'Unit I: Introduction to Operating System', 'What is a process?', ['Program in execution', 'Program on disk', 'Data file', 'Hardware device'], 'A'),
  createQuestion(6, 'Unit I: Introduction to Operating System', 'Which process state is NOT correct?', ['Running', 'Ready', 'Waiting', 'Sleeping'], 'D'),
  createQuestion(7, 'Unit I: Introduction to Operating System', 'What is the ready state?', ['Waiting for CPU', 'Waiting for I/O', 'Currently executing', 'Terminated'], 'A'),
  createQuestion(8, 'Unit I: Introduction to Operating System', 'What is the running state?', ['Currently executing', 'Waiting for CPU', 'Waiting for I/O', 'Terminated'], 'A'),
  createQuestion(9, 'Unit I: Introduction to Operating System', 'What is the waiting state?', ['Waiting for I/O or event', 'Currently executing', 'Waiting for CPU', 'Terminated'], 'A'),
  createQuestion(10, 'Unit I: Introduction to Operating System', 'What is process creation?', ['New process generated', 'Process terminated', 'Process suspended', 'Process resumed'], 'A'),

  // Unit II: Process Management
  createQuestion(11, 'Unit II: Process Management', 'What is PCB?', ['Process Control Block', 'Program Control Block', 'Process Control Buffer', 'Program Control Buffer'], 'A'),
  createQuestion(12, 'Unit II: Process Management', 'What is context switching?', ['Switching between processes', 'Switching between programs', 'Switching between computers', 'Switching between users'], 'A'),
  createQuestion(13, 'Unit II: Process Management', 'What is process scheduling?', ['Selecting processes for execution', 'Creating processes', 'Terminating processes', 'Suspending processes'], 'A'),
  createQuestion(14, 'Unit II: Process Management', 'What is a thread?', ['Lightweight process', 'Heavyweight process', 'Program', 'File'], 'A'),
  createQuestion(15, 'Unit II: Process Management', 'What is multithreading?', ['Multiple threads in one process', 'Multiple processes', 'Multiple programs', 'Multiple computers'], 'A'),
  createQuestion(16, 'Unit II: Process Management', 'What is interprocess communication?', ['Communication between processes', 'Communication between threads', 'Communication between programs', 'Communication between computers'], 'A'),
  createQuestion(17, 'Unit II: Process Management', 'Which is a method of IPC?', ['Pipes', 'Threads', 'Processes', 'Programs'], 'A'),
  createQuestion(18, 'Unit II: Process Management', 'What is a shared memory?', ['Memory shared between processes', 'Memory shared between threads', 'Memory shared between programs', 'Memory shared between computers'], 'A'),
  createQuestion(19, 'Unit II: Process Management', 'What is message passing?', ['Passing messages between processes', 'Passing messages between threads', 'Passing messages between programs', 'Passing messages between computers'], 'A'),
  createQuestion(20, 'Unit II: Process Management', 'Which OS supports multithreading?', ['Windows', 'Linux', 'Both A and B', 'None'], 'C'),

  // Unit III: CPU Scheduling
  createQuestion(21, 'Unit III: CPU Scheduling', 'What is CPU scheduling?', ['Selecting a process for CPU', 'Selecting a program', 'Selecting a thread', 'Selecting a computer'], 'A'),
  createQuestion(22, 'Unit III: CPU Scheduling', 'What is the scheduling criteria?', ['Criteria for selecting processes', 'Criteria for creating processes', 'Criteria for terminating processes', 'Criteria for suspending processes'], 'A'),
  createQuestion(23, 'Unit III: CPU Scheduling', 'Which is a scheduling algorithm?', ['FCFS', 'FIFO', 'LIFO', 'LILO'], 'A'),
  createQuestion(24, 'Unit III: CPU Scheduling', 'What is FCFS?', ['First Come First Serve', 'First Come First Schedule', 'First Come First Service', 'First Come First Search'], 'A'),
  createQuestion(25, 'Unit III: CPU Scheduling', 'What is SJF?', ['Shortest Job First', 'Shortest Job Fast', 'Smallest Job First', 'Shortest Job Find'], 'A'),
  createQuestion(26, 'Unit III: CPU Scheduling', 'What is Round Robin scheduling?', ['Time quantum based', 'Priority based', 'Shortest job first', 'First come first serve'], 'A'),
  createQuestion(27, 'Unit III: CPU Scheduling', 'What is the critical section?', ['Section of code accessing shared resources', 'Section of code not accessing shared resources', 'Entire program', 'Function call'], 'A'),
  createQuestion(28, 'Unit III: CPU Scheduling', 'What is a semaphore?', ['Synchronization tool', 'Scheduling tool', 'Memory tool', 'File tool'], 'A'),
  createQuestion(29, 'Unit III: CPU Scheduling', 'What is the purpose of semaphores?', ['Process synchronization', 'Process creation', 'Process termination', 'Process suspension'], 'A'),
  createQuestion(30, 'Unit III: CPU Scheduling', 'What is serializability?', ['Concurrent execution correctness', 'Sequential execution', 'Parallel execution', 'Random execution'], 'A'),

  // Unit IV: Deadlocks
  createQuestion(31, 'Unit IV: Deadlocks', 'What is a deadlock?', ['Processes waiting for each other', 'Process terminated', 'Process suspended', 'Process created'], 'A'),
  createQuestion(32, 'Unit IV: Deadlocks', 'What are the conditions for deadlock?', ['Mutual exclusion, Hold and Wait, No preemption, Circular wait', 'Mutual exclusion only', 'Hold and Wait only', 'Circular wait only'], 'A'),
  createQuestion(33, 'Unit IV: Deadlocks', 'What is mutual exclusion?', ['Resource cannot be shared', 'Resource can be shared', 'Resource preempted', 'Resource allocated'], 'A'),
  createQuestion(34, 'Unit IV: Deadlocks', 'What is hold and wait?', ['Holding resource while waiting', 'Releasing resource while waiting', 'Holding resource while executing', 'Releasing resource while executing'], 'A'),
  createQuestion(35, 'Unit IV: Deadlocks', 'What is no preemption?', ['Resource cannot be forcibly taken', 'Resource can be forcibly taken', 'Resource allocated', 'Resource released'], 'A'),
  createQuestion(36, 'Unit IV: Deadlocks', 'What is circular wait?', ['Circular chain of waiting processes', 'Linear chain of waiting processes', 'Star topology of waiting processes', 'Mesh topology of waiting processes'], 'A'),
  createQuestion(37, 'Unit IV: Deadlocks', 'How can deadlock be prevented?', ['Break one condition', 'Break all conditions', 'Ignore deadlock', 'Detect and recover'], 'A'),
  createQuestion(38, 'Unit IV: Deadlocks', 'What is deadlock avoidance?', ['Avoid deadlock before it occurs', 'Detect deadlock after it occurs', 'Recover from deadlock', 'Ignore deadlock'], 'A'),
  createQuestion(39, 'Unit IV: Deadlocks', 'What is deadlock detection?', ['Detecting deadlock after it occurs', 'Avoiding deadlock', 'Preventing deadlock', 'Recovering from deadlock'], 'A'),
  createQuestion(40, 'Unit IV: Deadlocks', 'What is deadlock recovery?', ['Recovering from deadlock', 'Avoiding deadlock', 'Preventing deadlock', 'Detecting deadlock'], 'A'),

  // Unit V: Memory Management
  createQuestion(41, 'Unit V: Memory Management', 'What is logical address?', ['Address generated by CPU', 'Physical address in memory', 'Virtual address', 'Real address'], 'A'),
  createQuestion(42, 'Unit V: Memory Management', 'What is physical address?', ['Address in memory', 'Address generated by CPU', 'Virtual address', 'Logical address'], 'A'),
  createQuestion(43, 'Unit V: Memory Management', 'What is address binding?', ['Mapping logical to physical', 'Mapping physical to logical', 'Mapping virtual to physical', 'Mapping physical to virtual'], 'A'),
  createQuestion(44, 'Unit V: Memory Management', 'What is swapping?', ['Moving process to disk', 'Moving process to memory', 'Moving process to CPU', 'Moving process to I/O'], 'A'),
  createQuestion(45, 'Unit V: Memory Management', 'What is contiguous allocation?', ['Process in contiguous memory', 'Process in non-contiguous memory', 'Process in disk', 'Process in cache'], 'A'),
  createQuestion(46, 'Unit V: Memory Management', 'What is paging?', ['Dividing memory into pages', 'Dividing memory into segments', 'Dividing memory into blocks', 'Dividing memory into frames'], 'A'),
  createQuestion(47, 'Unit V: Memory Management', 'What is segmentation?', ['Dividing memory into segments', 'Dividing memory into pages', 'Dividing memory into blocks', 'Dividing memory into frames'], 'A'),
  createQuestion(48, 'Unit V: Memory Management', 'What is a page replacement algorithm?', ['Selecting page to replace', 'Selecting page to load', 'Selecting page to execute', 'Selecting page to swap'], 'A'),
  createQuestion(49, 'Unit V: Memory Management', 'Which is a page replacement algorithm?', ['FIFO', 'FCFS', 'SJF', 'Round Robin'], 'A'),
  createQuestion(50, 'Unit V: Memory Management', 'What is thrashing?', ['Excessive page faults', 'Excessive CPU usage', 'Excessive memory usage', 'Excessive I/O usage'], 'A'),
  createQuestion(51, 'Unit V: Memory Management', 'What is the working set model?', ['Set of pages a process uses', 'Set of processes in memory', 'Set of programs in memory', 'Set of files in memory'], 'A'),

  // Unit VI: Protection and Disk Management
  createQuestion(52, 'Unit VI: Protection and Disk Management', 'What is file access method?', ['Method to access files', 'Method to create files', 'Method to delete files', 'Method to rename files'], 'A'),
  createQuestion(53, 'Unit VI: Protection and Disk Management', 'What is the access matrix?', ['Matrix of access rights', 'Matrix of processes', 'Matrix of files', 'Matrix of users'], 'A'),
  createQuestion(54, 'Unit VI: Protection and Disk Management', 'What is disk scheduling?', ['Selecting disk request order', 'Selecting disk to use', 'Selecting file to access', 'Selecting process to execute'], 'A'),
  createQuestion(55, 'Unit VI: Protection and Disk Management', 'What is FCFS disk scheduling?', ['First Come First Serve', 'First Come First Schedule', 'First Come First Search', 'First Come First Service'], 'A'),
  createQuestion(56, 'Unit VI: Protection and Disk Management', 'What is SSTF disk scheduling?', ['Shortest Seek Time First', 'Shortest Service Time First', 'Shortest Search Time First', 'Shortest Scheduling Time First'], 'A'),
  createQuestion(57, 'Unit VI: Protection and Disk Management', 'What is SCAN scheduling?', ['Moving arm back and forth', 'Moving arm in one direction', 'Moving arm randomly', 'Moving arm circularly'], 'A'),
  createQuestion(58, 'Unit VI: Protection and Disk Management', 'What is C-SCAN scheduling?', ['Circular SCAN', 'Continuous SCAN', 'Complete SCAN', 'Circular Search'], 'A'),
  createQuestion(59, 'Unit VI: Protection and Disk Management', 'What is disk structure?', ['Platters, tracks, sectors', 'Tracks, sectors, blocks', 'Cylinders, tracks, sectors', 'All of the above'], 'D'),
  createQuestion(60, 'Unit VI: Protection and Disk Management', 'What is the purpose of disk scheduling?', ['Optimize disk access', 'Optimize CPU usage', 'Optimize memory usage', 'Optimize network usage'], 'A'),
];
