export const STYLING_AND_SCRIPTING_EXPECTED_COUNT = 70;

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

export const stylingAndScriptingQuestions = [
  // Unit I: HTML Introduction
  createQuestion(1, 'Unit I: HTML Introduction', 'What does HTML stand for?', ['Hyper Text Markup Language', 'High Tech Markup Language', 'Hyper Text Management Language', 'High Text Markup Language'], 'A'),
  createQuestion(2, 'Unit I: HTML Introduction', 'What is the correct HTML tag for the largest heading?', ['<h1>', '<h6>', '<heading>', '<head>'], 'A'),
  createQuestion(3, 'Unit I: HTML Introduction', 'Which HTML tag is used for a hyperlink?', ['<a>', '<link>', '<href>', '<url>'], 'A'),
  createQuestion(4, 'Unit I: HTML Introduction', 'Which HTML tag is used for an image?', ['<img>', '<image>', '<src>', '<picture>'], 'A'),
  createQuestion(5, 'Unit I: HTML Introduction', 'Which HTML tag creates a table?', ['<table>', '<tab>', '<tr>', '<td>'], 'A'),
  createQuestion(6, 'Unit I: HTML Introduction', 'Which HTML tag creates an unordered list?', ['<ul>', '<ol>', '<li>', '<list>'], 'A'),
  createQuestion(7, 'Unit I: HTML Introduction', 'Which HTML tag creates an ordered list?', ['<ol>', '<ul>', '<li>', '<list>'], 'A'),
  createQuestion(8, 'Unit I: HTML Introduction', 'Which HTML tag is used for a form?', ['<form>', '<input>', '<field>', '<formbody>'], 'A'),
  createQuestion(9, 'Unit I: HTML Introduction', 'What is the purpose of the <canvas> element?', ['Drawing graphics', 'Displaying images', 'Playing videos', 'Creating forms'], 'A'),
  createQuestion(10, 'Unit I: HTML Introduction', 'What does SVG stand for?', ['Scalable Vector Graphics', 'Simple Vector Graphics', 'Standard Vector Graphics', 'Scalable Visual Graphics'], 'A'),

  // Unit II: Advanced CSS
  createQuestion(11, 'Unit II: Advanced CSS', 'What is the CSS Box Model?', ['Margin, Border, Padding, Content', 'Margin, Padding, Content', 'Border, Padding, Content', 'Margin, Border, Content'], 'A'),
  createQuestion(12, 'Unit II: Advanced CSS', 'Which CSS property controls spacing outside the border?', ['margin', 'padding', 'border', 'spacing'], 'A'),
  createQuestion(13, 'Unit II: Advanced CSS', 'Which CSS property controls spacing inside the border?', ['padding', 'margin', 'border', 'spacing'], 'A'),
  createQuestion(14, 'Unit II: Advanced CSS', 'What is Flexbox in CSS?', ['Flexible box layout module', 'Fixed box layout', 'Flexible grid layout', 'Fixed grid layout'], 'A'),
  createQuestion(15, 'Unit II: Advanced CSS', 'Which CSS property defines flex container?', ['display: flex', 'display: block', 'display: inline', 'display: grid'], 'A'),
  createQuestion(16, 'Unit II: Advanced CSS', 'What is CSS Grid?', ['Two-dimensional grid layout', 'One-dimensional layout', 'Three-dimensional layout', 'No layout'], 'A'),
  createQuestion(17, 'Unit II: Advanced CSS', 'Which CSS property defines grid container?', ['display: grid', 'display: flex', 'display: block', 'display: inline'], 'A'),
  createQuestion(18, 'Unit II: Advanced CSS', 'What is a pseudo-class in CSS?', ['Defines special state of element', 'Defines style of element', 'Defines content of element', 'Defines structure of element'], 'A'),
  createQuestion(19, 'Unit II: Advanced CSS', 'What is a pseudo-element in CSS?', ['Defines part of element', 'Defines whole element', 'Defines style of element', 'Defines content of element'], 'A'),
  createQuestion(20, 'Unit II: Advanced CSS', 'Which property creates a navigation bar?', ['nav bar properties', 'menu properties', 'link properties', 'anchor properties'], 'A'),
  createQuestion(21, 'Unit II: Advanced CSS', 'What is an image sprite?', ['Multiple images in one image', 'Single image', 'Animated image', 'No image'], 'A'),
  createQuestion(22, 'Unit II: Advanced CSS', 'What is media type in CSS?', ['Device type for styles', 'File type', 'Image type', 'Text type'], 'A'),
  createQuestion(23, 'Unit II: Advanced CSS', 'What is the purpose of @media rule?', ['Apply styles based on device', 'Apply styles always', 'Apply styles never', 'Apply styles randomly'], 'A'),

  // Unit III: JavaScript Introduction
  createQuestion(24, 'Unit III: JavaScript Introduction', 'What is JavaScript?', ['Scripting language for web', 'Programming language for servers', 'Markup language', 'Database language'], 'A'),
  createQuestion(25, 'Unit III: JavaScript Introduction', 'Which keyword declares a variable?', ['var', 'let', 'const', 'All of the above'], 'D'),
  createQuestion(26, 'Unit III: JavaScript Introduction', 'What is a constant in JavaScript?', ['Value cannot change', 'Value can change', 'Value is not defined', 'Value is null'], 'A'),
  createQuestion(27, 'Unit III: JavaScript Introduction', 'What is the correct syntax for if statement?', ['if (condition) {}', 'if condition {}', 'if {condition}', 'if (condition)'], 'A'),
  createQuestion(28, 'Unit III: JavaScript Introduction', 'Which loop checks condition first?', ['while', 'do-while', 'for', 'for-in'], 'A'),
  createQuestion(29, 'Unit III: JavaScript Introduction', 'Which loop executes at least once?', ['do-while', 'while', 'for', 'for-in'], 'A'),
  createQuestion(30, 'Unit III: JavaScript Introduction', 'What is a falsy value in JavaScript?', ['False, 0, "", null, undefined, NaN', 'True only', 'False only', 'All values'], 'A'),
  createQuestion(31, 'Unit III: JavaScript Introduction', 'What is the spread operator?', ['... to spread elements', '.. to combine elements', '... to delete elements', '.. to copy elements'], 'A'),
  createQuestion(32, 'Unit III: JavaScript Introduction', 'What is a template literal?', ['String with ${} for expressions', 'String with quotes', 'String with commas', 'String with spaces'], 'A'),
  createQuestion(33, 'Unit III: JavaScript Introduction', 'What is type coercion in JavaScript?', ['Automatic type conversion', 'Manual type conversion', 'Type checking', 'Type validation'], 'A'),

  // Unit IV: Asynchronous JavaScript
  createQuestion(34, 'Unit IV: Asynchronous JavaScript', 'What is a function declaration?', ['function name() {}', 'var name = function() {}', '() => {}', 'All of the above'], 'D'),
  createQuestion(35, 'Unit IV: Asynchronous JavaScript', 'What is an arrow function?', ['() => {}', 'function() {}', 'var name = function() {}', 'function name() {}'], 'A'),
  createQuestion(36, 'Unit IV: Asynchronous JavaScript', 'What is variable scope?', ['Where variable is accessible', 'Where variable is defined', 'Where variable is used', 'Where variable is deleted'], 'A'),
  createQuestion(37, 'Unit IV: Asynchronous JavaScript', 'What is hoisting in JavaScript?', ['Moving declarations to top', 'Moving definitions to top', 'Moving values to top', 'No moving'], 'A'),
  createQuestion(38, 'Unit IV: Asynchronous JavaScript', 'What is a callback in JavaScript?', ['Function passed as argument', 'Function returned', 'Function called directly', 'Function defined'], 'A'),
  createQuestion(39, 'Unit IV: Asynchronous JavaScript', 'What is a Promise in JavaScript?', ['Object representing future value', 'Object representing current value', 'Object representing past value', 'No object'], 'A'),
  createQuestion(40, 'Unit IV: Asynchronous JavaScript', 'What are the states of a Promise?', ['Pending, Fulfilled, Rejected', 'Pending, Completed, Failed', 'Waiting, Done, Error', 'Start, End, Error'], 'A'),
  createQuestion(41, 'Unit IV: Asynchronous JavaScript', 'What is async/await?', ['Syntactic sugar for Promises', 'New type of function', 'New type of variable', 'New type of loop'], 'A'),
  createQuestion(42, 'Unit IV: Asynchronous JavaScript', 'What does the async keyword do?', ['Makes function return Promise', 'Makes function return value', 'Makes function return null', 'Makes function return undefined'], 'A'),
  createQuestion(43, 'Unit IV: Asynchronous JavaScript', 'What does the await keyword do?', ['Waits for Promise to resolve', 'Waits for function to end', 'Waits for loop to end', 'Waits for variable to change'], 'A'),

  // Unit V: JavaScript Objects and DOM
  createQuestion(44, 'Unit V: JavaScript Objects and DOM', 'What is a JavaScript object?', ['Collection of key-value pairs', 'Collection of values', 'Collection of keys', 'Collection of functions'], 'A'),
  createQuestion(45, 'Unit V: JavaScript Objects and DOM', 'How do you create an object in JavaScript?', ['{} or new Object()', '[] or new Array()', '"" or new String()', '0 or new Number()'], 'A'),
  createQuestion(46, 'Unit V: JavaScript Objects and DOM', 'What is an array in JavaScript?', ['Collection of values', 'Collection of keys', 'Collection of functions', 'Collection of objects'], 'A'),
  createQuestion(47, 'Unit V: JavaScript Objects and DOM', 'How do you create an array in JavaScript?', ['[] or new Array()', '{} or new Object()', '"" or new String()', '0 or new Number()'], 'A'),
  createQuestion(48, 'Unit V: JavaScript Objects and DOM', 'What is the Browser Object Model (BOM)?', ['Objects representing browser', 'Objects representing document', 'Objects representing HTML', 'Objects representing CSS'], 'A'),
  createQuestion(49, 'Unit V: JavaScript Objects and DOM', 'What is the window object?', ['Top-level object in browser', 'Object for document', 'Object for HTML', 'Object for CSS'], 'A'),
  createQuestion(50, 'Unit V: JavaScript Objects and DOM', 'What is the document object?', ['Represents HTML document', 'Represents browser', 'Represents window', 'Represents CSS'], 'A'),
  createQuestion(51, 'Unit V: JavaScript Objects and DOM', 'What does getElementById() do?', ['Gets element by id', 'Gets element by class', 'Gets element by tag', 'Gets element by name'], 'A'),
  createQuestion(52, 'Unit V: JavaScript Objects and DOM', 'What does getElementsByName() do?', ['Gets elements by name', 'Gets elements by id', 'Gets elements by class', 'Gets elements by tag'], 'A'),
  createQuestion(53, 'Unit V: JavaScript Objects and DOM', 'What does innerHTML do?', ['Gets/sets HTML content', 'Gets/sets text content', 'Gets/sets CSS', 'Gets/sets attributes'], 'A'),
  createQuestion(54, 'Unit V: JavaScript Objects and DOM', 'What is the DOM Tree?', ['Hierarchical structure of document', 'Flat structure of document', 'Random structure of document', 'No structure'], 'A'),
  createQuestion(55, 'Unit V: JavaScript Objects and DOM', 'What is a node in DOM?', ['Any object in the tree', 'Only elements', 'Only text', 'Only attributes'], 'A'),
  createQuestion(56, 'Unit V: JavaScript Objects and DOM', 'What does appendChild() do?', ['Adds child to node', 'Removes child from node', 'Replaces child', 'Inserts child'], 'A'),
  createQuestion(57, 'Unit V: JavaScript Objects and DOM', 'What does removeChild() do?', ['Removes child from node', 'Adds child to node', 'Replaces child', 'Inserts child'], 'A'),

  // Unit VI: Introduction to ASP.NET
  createQuestion(58, 'Unit VI: Introduction to ASP.NET', 'What is .NET?', ['Framework for building applications', 'Programming language', 'Operating system', 'Database system'], 'A'),
  createQuestion(59, 'Unit VI: Introduction to ASP.NET', 'What is CLR?', ['Common Language Runtime', 'Common Language Resource', 'Common Language Registry', 'Common Language Repository'], 'A'),
  createQuestion(60, 'Unit VI: Introduction to ASP.NET', 'What is CTS?', ['Common Type System', 'Common Type Service', 'Common Type Structure', 'Common Type Standard'], 'A'),
  createQuestion(61, 'Unit VI: Introduction to ASP.NET', 'What is JIT compiler?', ['Just-In-Time compiler', 'Just-In-Time code', 'Just-In-Time runtime', 'Just-In-Time framework'], 'A'),
  createQuestion(62, 'Unit VI: Introduction to ASP.NET', 'What is ASP.NET?', ['Web development framework', 'Desktop development framework', 'Mobile development framework', 'Database development framework'], 'A'),
  createQuestion(63, 'Unit VI: Introduction to ASP.NET', 'What is an ASPX page?', ['ASP.NET web page', 'ASP.NET code file', 'ASP.NET configuration file', 'ASP.NET resource file'], 'A'),
  createQuestion(64, 'Unit VI: Introduction to ASP.NET', 'What is a code-behind file?', ['Separate file for code', 'Same file for code', 'Configuration file', 'Resource file'], 'A'),
  createQuestion(65, 'Unit VI: Introduction to ASP.NET', 'What is a web server control?', ['Server-side control', 'Client-side control', 'Browser control', 'User control'], 'A'),
  createQuestion(66, 'Unit VI: Introduction to ASP.NET', 'Which is a standard web server control?', ['Label', 'HTML', 'CSS', 'JavaScript'], 'A'),
  createQuestion(67, 'Unit VI: Introduction to ASP.NET', 'What is a validation control?', ['Validates user input', 'Validates code', 'Validates database', 'Validates file'], 'A'),
  createQuestion(68, 'Unit VI: Introduction to ASP.NET', 'What is event handling in ASP.NET?', ['Responding to events', 'Creating events', 'Deleting events', 'Modifying events'], 'A'),
  createQuestion(69, 'Unit VI: Introduction to ASP.NET', 'What is the page life cycle?', ['Stages of page processing', 'Stages of application', 'Stages of database', 'Stages of server'], 'A'),
  createQuestion(70, 'Unit VI: Introduction to ASP.NET', 'What is a page directive?', ['Instructions for page', 'Instructions for code', 'Instructions for database', 'Instructions for server'], 'A'),
];
