export const SOFTWARE_ENGINEERING_EXPECTED_COUNT = 60;

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

export const softwareEngineeringQuestions = [
  // Unit I: Introduction to Software Engineering
  createQuestion(1, 'Unit I: Introduction to Software Engineering', 'What is software engineering?', ['Systematic approach to software development', 'Coding only', 'Testing only', 'Documentation only'], 'A'),
  createQuestion(2, 'Unit I: Introduction to Software Engineering', 'What is the problem domain?', ['Area of problem being solved', 'Software code', 'Hardware system', 'Network infrastructure'], 'A'),
  createQuestion(3, 'Unit I: Introduction to Software Engineering', 'What is a software process model?', ['Framework for software development', 'Programming language', 'Database system', 'Hardware device'], 'A'),
  createQuestion(4, 'Unit I: Introduction to Software Engineering', 'What is the waterfall model?', ['Sequential development model', 'Iterative development model', 'Spiral development model', 'Agile development model'], 'A'),
  createQuestion(5, 'Unit I: Introduction to Software Engineering', 'What is prototyping?', ['Creating a working model', 'Creating final software', 'Creating documentation', 'Creating test cases'], 'A'),
  createQuestion(6, 'Unit I: Introduction to Software Engineering', 'What is iterative development?', ['Developing in iterations', 'Developing in one iteration', 'Developing without iterations', 'Developing randomly'], 'A'),
  createQuestion(7, 'Unit I: Introduction to Software Engineering', 'What is the first phase of the waterfall model?', ['Requirements analysis', 'Design', 'Implementation', 'Testing'], 'A'),
  createQuestion(8, 'Unit I: Introduction to Software Engineering', 'What is the second phase of the waterfall model?', ['Design', 'Requirements analysis', 'Implementation', 'Testing'], 'A'),
  createQuestion(9, 'Unit I: Introduction to Software Engineering', 'What is the third phase of the waterfall model?', ['Implementation', 'Design', 'Requirements analysis', 'Testing'], 'A'),
  createQuestion(10, 'Unit I: Introduction to Software Engineering', 'What is the final phase of the waterfall model?', ['Maintenance', 'Testing', 'Implementation', 'Design'], 'A'),

  // Unit II: Software Requirements Analysis and Specification
  createQuestion(11, 'Unit II: Software Requirements Analysis and Specification', 'What is SRS?', ['Software Requirements Specification', 'Software Requirements System', 'Software Requirements Standard', 'Software Requirements Solution'], 'A'),
  createQuestion(12, 'Unit II: Software Requirements Analysis and Specification', 'What is the purpose of SRS?', ['Document requirements', 'Design software', 'Code software', 'Test software'], 'A'),
  createQuestion(13, 'Unit II: Software Requirements Analysis and Specification', 'What is requirements gathering?', ['Collecting requirements', 'Designing software', 'Coding software', 'Testing software'], 'A'),
  createQuestion(14, 'Unit II: Software Requirements Analysis and Specification', 'What is problem analysis?', ['Analyzing the problem', 'Designing the solution', 'Coding the solution', 'Testing the solution'], 'A'),
  createQuestion(15, 'Unit II: Software Requirements Analysis and Specification', 'What is a functional requirement?', ['What the system should do', 'How the system should do it', 'System performance', 'System security'], 'A'),
  createQuestion(16, 'Unit II: Software Requirements Analysis and Specification', 'What is a non-functional requirement?', ['How the system performs', 'What the system should do', 'System functions', 'System features'], 'A'),
  createQuestion(17, 'Unit II: Software Requirements Analysis and Specification', 'What are the characteristics of SRS?', ['Correct, Complete, Consistent', 'Correct only', 'Complete only', 'Consistent only'], 'A'),
  createQuestion(18, 'Unit II: Software Requirements Analysis and Specification', 'What are the components of SRS?', ['Introduction, Requirements, Appendices', 'Introduction only', 'Requirements only', 'Appendices only'], 'A'),
  createQuestion(19, 'Unit II: Software Requirements Analysis and Specification', 'What is the structure of a requirements document?', ['Organized document', 'Unorganized document', 'Random document', 'No structure'], 'A'),
  createQuestion(20, 'Unit II: Software Requirements Analysis and Specification', 'What is a use case?', ['Interaction between actor and system', 'System design', 'System code', 'System test'], 'A'),

  // Unit III: Software Design
  createQuestion(21, 'Unit III: Software Design', 'What is software design?', ['Creating a design for software', 'Coding software', 'Testing software', 'Documenting software'], 'A'),
  createQuestion(22, 'Unit III: Software Design', 'What is modularity?', ['Dividing system into modules', 'Combining modules', 'Creating one module', 'Creating no modules'], 'A'),
  createQuestion(23, 'Unit III: Software Design', 'What is top-down design?', ['Design from high level to low level', 'Design from low level to high level', 'Design randomly', 'No design'], 'A'),
  createQuestion(24, 'Unit III: Software Design', 'What is bottom-up design?', ['Design from low level to high level', 'Design from high level to low level', 'Design randomly', 'No design'], 'A'),
  createQuestion(25, 'Unit III: Software Design', 'What is coupling?', ['Dependence between modules', 'Independence of modules', 'Communication between modules', 'Integration of modules'], 'A'),
  createQuestion(26, 'Unit III: Software Design', 'What is cohesion?', ['Internal consistency of module', 'External consistency of module', 'Communication between modules', 'Integration of modules'], 'A'),
  createQuestion(27, 'Unit III: Software Design', 'What is a structure chart?', ['Diagram showing module structure', 'Diagram showing code structure', 'Diagram showing data structure', 'Diagram showing test structure'], 'A'),
  createQuestion(28, 'Unit III: Software Design', 'What is DFD?', ['Data Flow Diagram', 'Data Flow Design', 'Data Flow Documentation', 'Data Flow Development'], 'A'),
  createQuestion(29, 'Unit III: Software Design', 'What is the purpose of DFD?', ['Show data flow', 'Show code flow', 'Show control flow', 'Show test flow'], 'A'),
  createQuestion(30, 'Unit III: Software Design', 'What is data flow?', ['Movement of data', 'Movement of control', 'Movement of code', 'Movement of test'], 'A'),

  // Unit IV: Coding
  createQuestion(31, 'Unit IV: Coding', 'What is programming principles?', ['Guidelines for programming', 'Rules for testing', 'Rules for designing', 'Rules for documenting'], 'A'),
  createQuestion(32, 'Unit IV: Coding', 'What is structured programming?', ['Programming with structures', 'Programming without structures', 'Random programming', 'Unstructured programming'], 'A'),
  createQuestion(33, 'Unit IV: Coding', 'What is information hiding?', ['Hiding implementation details', 'Hiding data', 'Hiding code', 'Hiding design'], 'A'),
  createQuestion(34, 'Unit IV: Coding', 'What is a coding standard?', ['Standard for writing code', 'Standard for testing', 'Standard for designing', 'Standard for documenting'], 'A'),
  createQuestion(35, 'Unit IV: Coding', 'What is a coding error?', ['Error in code', 'Error in design', 'Error in testing', 'Error in documentation'], 'A'),
  createQuestion(36, 'Unit IV: Coding', 'What is a common coding error?', ['Syntax error', 'Design error', 'Test error', 'Document error'], 'A'),
  createQuestion(37, 'Unit IV: Coding', 'What is programming practice?', ['Good programming habits', 'Bad programming habits', 'Random programming', 'No programming'], 'A'),
  createQuestion(38, 'Unit IV: Coding', 'What is coding process?', ['Process of writing code', 'Process of testing', 'Process of designing', 'Process of documenting'], 'A'),
  createQuestion(39, 'Unit IV: Coding', 'What is a programming guideline?', ['Recommendation for programming', 'Requirement for programming', 'Rule for programming', 'Law for programming'], 'A'),
  createQuestion(40, 'Unit IV: Coding', 'What is a programming principle?', ['Fundamental rule for programming', 'Recommendation for programming', 'Requirement for programming', 'Law for programming'], 'A'),

  // Unit V: Testing
  createQuestion(41, 'Unit V: Testing', 'What is software testing?', ['Verifying software works', 'Designing software', 'Coding software', 'Documenting software'], 'A'),
  createQuestion(42, 'Unit V: Testing', 'What is an error?', ['Mistake in software', 'Correct behavior', 'Desired behavior', 'Expected behavior'], 'A'),
  createQuestion(43, 'Unit V: Testing', 'What is a fault?', ['Defect in software', 'Correct behavior', 'Desired behavior', 'Expected behavior'], 'A'),
  createQuestion(44, 'Unit V: Testing', 'What is a failure?', ['Software not working', 'Software working', 'Correct behavior', 'Desired behavior'], 'A'),
  createQuestion(45, 'Unit V: Testing', 'What is a test case?', ['Set of test inputs and expected results', 'Test execution', 'Test planning', 'Test documentation'], 'A'),
  createQuestion(46, 'Unit V: Testing', 'What is a test oracle?', ['Source of expected results', 'Test execution', 'Test planning', 'Test documentation'], 'A'),
  createQuestion(47, 'Unit V: Testing', 'What is black-box testing?', ['Testing without knowing internal code', 'Testing with knowing internal code', 'Testing design', 'Testing documentation'], 'A'),
  createQuestion(48, 'Unit V: Testing', 'What is white-box testing?', ['Testing with knowing internal code', 'Testing without knowing internal code', 'Testing design', 'Testing documentation'], 'A'),
  createQuestion(49, 'Unit V: Testing', 'What is unit testing?', ['Testing individual units', 'Testing entire system', 'Testing design', 'Testing documentation'], 'A'),
  createQuestion(50, 'Unit V: Testing', 'What is integration testing?', ['Testing integrated units', 'Testing individual units', 'Testing design', 'Testing documentation'], 'A'),

  // Unit VI: Software Testing Process and Maintenance
  createQuestion(51, 'Unit VI: Software Testing Process and Maintenance', 'What is a test plan?', ['Plan for testing', 'Test execution', 'Test case', 'Test result'], 'A'),
  createQuestion(52, 'Unit VI: Software Testing Process and Maintenance', 'What is test case specification?', ['Documenting test cases', 'Executing test cases', 'Planning test cases', 'Analyzing test cases'], 'A'),
  createQuestion(53, 'Unit VI: Software Testing Process and Maintenance', 'What is test case execution?', ['Running test cases', 'Planning test cases', 'Documenting test cases', 'Analyzing test cases'], 'A'),
  createQuestion(54, 'Unit VI: Software Testing Process and Maintenance', 'What is defect logging?', ['Recording defects', 'Fixing defects', 'Testing defects', 'Analyzing defects'], 'A'),
  createQuestion(55, 'Unit VI: Software Testing Process and Maintenance', 'What is software maintenance?', ['Maintaining software after deployment', 'Developing software', 'Testing software', 'Designing software'], 'A'),
  createQuestion(56, 'Unit VI: Software Testing Process and Maintenance', 'What is corrective maintenance?', ['Fixing defects', 'Adding features', 'Improving performance', 'Adapting to environment'], 'A'),
  createQuestion(57, 'Unit VI: Software Testing Process and Maintenance', 'What is adaptive maintenance?', ['Adapting to environment', 'Fixing defects', 'Adding features', 'Improving performance'], 'A'),
  createQuestion(58, 'Unit VI: Software Testing Process and Maintenance', 'What is perfective maintenance?', ['Improving performance', 'Fixing defects', 'Adding features', 'Adapting to environment'], 'A'),
  createQuestion(59, 'Unit VI: Software Testing Process and Maintenance', 'What is preventive maintenance?', ['Preventing future problems', 'Fixing defects', 'Adding features', 'Adapting to environment'], 'A'),
  createQuestion(60, 'Unit VI: Software Testing Process and Maintenance', 'What is the purpose of software maintenance?', ['Keep software useful', 'Develop new software', 'Test software', 'Design software'], 'A'),
];
