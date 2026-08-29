export const FULL_STACK_WEB_DEV_EXPECTED_COUNT = 70;

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

export const fullStackWebDevQuestions = [
  // Unit I: Web Foundations and Responsive Front-End Development
  createQuestion(1, 'Unit I: Web Foundations', 'What is client-server architecture?', ['Client requests, server responds', 'Server requests, client responds', 'Both request', 'Neither requests'], 'A'),
  createQuestion(2, 'Unit I: Web Foundations', 'What is HTML5?', ['Latest version of HTML', 'Programming language', 'Database system', 'Operating system'], 'A'),
  createQuestion(3, 'Unit I: Web Foundations', 'What are semantic elements in HTML5?', ['Elements with meaning', 'Elements without meaning', 'Random elements', 'No elements'], 'A'),
  createQuestion(4, 'Unit I: Web Foundations', 'Which is a semantic element?', ['<article>', '<div>', '<span>', '<p>'], 'A'),
  createQuestion(5, 'Unit I: Web Foundations', 'What is ARIA?', ['Accessibility for web applications', 'Programming language', 'Database system', 'Operating system'], 'A'),
  createQuestion(6, 'Unit I: Web Foundations', 'What is SEO?', ['Search Engine Optimization', 'Search Engine Operation', 'Search Engine Organization', 'Search Engine Object'], 'A'),
  createQuestion(7, 'Unit I: Web Foundations', 'What are CSS selectors?', ['Patterns to select elements', 'Patterns to style elements', 'Patterns to delete elements', 'Patterns to create elements'], 'A'),
  createQuestion(8, 'Unit I: Web Foundations', 'What is the CSS Box Model?', ['Margin, Border, Padding, Content', 'Margin, Padding, Content', 'Border, Padding, Content', 'Margin, Border, Content'], 'A'),
  createQuestion(9, 'Unit I: Web Foundations', 'What is Flexbox?', ['One-dimensional layout', 'Two-dimensional layout', 'Three-dimensional layout', 'No layout'], 'A'),
  createQuestion(10, 'Unit I: Web Foundations', 'What is CSS Grid?', ['Two-dimensional layout', 'One-dimensional layout', 'Three-dimensional layout', 'No layout'], 'A'),
  createQuestion(11, 'Unit I: Web Foundations', 'What is responsive web design?', ['Adapting to different devices', 'Fixed design', 'Random design', 'No design'], 'A'),
  createQuestion(12, 'Unit I: Web Foundations', 'What are media queries?', ['Apply styles based on device', 'Apply styles always', 'Apply styles never', 'Apply styles randomly'], 'A'),
  createQuestion(13, 'Unit I: Web Foundations', 'What are CSS variables?', ['Reusable CSS values', 'Fixed CSS values', 'Random CSS values', 'No CSS values'], 'A'),
  createQuestion(14, 'Unit I: Web Foundations', 'What is Tailwind CSS?', ['Utility-first CSS framework', 'Component-first CSS', 'No CSS', 'Random CSS'], 'A'),
  createQuestion(15, 'Unit I: Web Foundations', 'What is Bootstrap?', ['CSS framework with components', 'CSS framework without components', 'No CSS', 'Random CSS'], 'A'),

  // Unit II: Modern JavaScript (ES6+) and DOM Programming
  createQuestion(16, 'Unit II: Modern JavaScript (ES6+)', 'What is ES6?', ['ECMAScript 6 (Modern JavaScript)', 'HTML6', 'CSS6', 'XML6'], 'A'),
  createQuestion(17, 'Unit II: Modern JavaScript (ES6+)', 'What is destructuring in JavaScript?', ['Extracting values from arrays/objects', 'Deleting values', 'Creating values', 'No extraction'], 'A'),
  createQuestion(18, 'Unit II: Modern JavaScript (ES6+)', 'What are arrow functions?', ['() => {} syntax', 'function() {} syntax', 'Both A and B', 'Neither'], 'C'),
  createQuestion(19, 'Unit II: Modern JavaScript (ES6+)', 'What is the spread operator?', ['... to spread elements', '.. to combine elements', '... to delete elements', '.. to copy elements'], 'A'),
  createQuestion(20, 'Unit II: Modern JavaScript (ES6+)', 'What is the rest operator?', ['... to collect remaining elements', '.. to collect remaining elements', '... to delete elements', '.. to copy elements'], 'A'),
  createQuestion(21, 'Unit II: Modern JavaScript (ES6+)', 'What are template literals?', ['Strings with ${}', 'Strings with quotes', 'Strings with commas', 'Strings with spaces'], 'A'),
  createQuestion(22, 'Unit II: Modern JavaScript (ES6+)', 'What are JavaScript modules?', ['Import/export functionality', 'No functionality', 'Random functionality', 'Western functionality'], 'A'),
  createQuestion(23, 'Unit II: Modern JavaScript (ES6+)', 'What is optional chaining?', ['?. for safe property access', '. for property access', '-> for property access', '=> for property access'], 'A'),
  createQuestion(24, 'Unit II: Modern JavaScript (ES6+)', 'What is nullish coalescing?', ['?? for null/undefined check', '|| for falsy check', '&& for truthy check', '!! for boolean check'], 'A'),
  createQuestion(25, 'Unit II: Modern JavaScript (ES6+)', 'What are higher-order functions?', ['Functions that take/return functions', 'Functions that take values', 'Functions that return values', 'Functions that do nothing'], 'A'),
  createQuestion(26, 'Unit II: Modern JavaScript (ES6+)', 'What is the Fetch API?', ['API for HTTP requests', 'API for data storage', 'API for file system', 'API for graphics'], 'A'),
  createQuestion(27, 'Unit II: Modern JavaScript (ES6+)', 'What is JSON?', ['JavaScript Object Notation', 'JavaScript Object Name', 'JavaScript Object Number', 'JavaScript Object Null'], 'A'),

  // Unit III: React Front-End Development
  createQuestion(28, 'Unit III: React Front-End Development', 'What is React?', ['Front-end library for UI', 'Back-end library', 'Database system', 'Operating system'], 'A'),
  createQuestion(29, 'Unit III: React Front-End Development', 'What is JSX?', ['JavaScript XML syntax', 'JavaScript XHTML', 'JavaScript XR', 'JavaScript XSS'], 'A'),
  createQuestion(30, 'Unit III: React Front-End Development', 'What are React components?', ['Reusable UI pieces', 'Non-reusable pieces', 'Random pieces', 'No pieces'], 'A'),
  createQuestion(31, 'Unit III: React Front-End Development', 'What are props in React?', ['Properties passed to components', 'Properties of components', 'State of components', 'No properties'], 'A'),
  createQuestion(32, 'Unit III: React Front-End Development', 'What is state in React?', ['Mutable data in component', 'Immutable data', 'No data', 'Random data'], 'A'),
  createQuestion(33, 'Unit III: React Front-End Development', 'What is React Router?', ['Library for routing', 'Library for state', 'Library for data', 'Library for styles'], 'A'),
  createQuestion(34, 'Unit III: React Front-End Development', 'What are React Hooks?', ['Functions for state and side effects', 'Functions for no purpose', 'Random functions', 'No functions'], 'A'),
  createQuestion(35, 'Unit III: React Front-End Development', 'What is useState hook?', ['Hook for state management', 'Hook for effects', 'Hook for context', 'Hook for reducers'], 'A'),
  createQuestion(36, 'Unit III: React Front-End Development', 'What is useEffect hook?', ['Hook for side effects', 'Hook for state', 'Hook for context', 'Hook for reducers'], 'A'),
  createQuestion(37, 'Unit III: React Front-End Development', 'What is the Context API?', ['For global state management', 'For local state', 'For no state', 'For random state'], 'A'),
  createQuestion(38, 'Unit III: React Front-End Development', 'What is a protected route?', ['Route requiring authentication', 'Route without authentication', 'Route with no access', 'Route with random access'], 'A'),
  createQuestion(39, 'Unit III: React Front-End Development', 'What is lazy loading?', ['Loading components on demand', 'Loading all components', 'Loading no components', 'Loading random components'], 'A'),
  createQuestion(40, 'Unit III: React Front-End Development', 'What is Redux Toolkit?', ['State management library', 'UI library', 'Routing library', 'Styling library'], 'A'),

  // Unit IV: Server-Side Development using Node.js and Express.js
  createQuestion(41, 'Unit IV: Node.js & Express.js', 'What is Node.js?', ['JavaScript runtime for server', 'JavaScript runtime for browser', 'Database system', 'Operating system'], 'A'),
  createQuestion(42, 'Unit IV: Node.js & Express.js', 'What is npm?', ['Node Package Manager', 'Node Program Manager', 'Node Process Manager', 'Node Project Manager'], 'A'),
  createQuestion(43, 'Unit IV: Node.js & Express.js', 'What is package.json?', ['Configuration file for npm', 'Configuration file for React', 'Configuration file for CSS', 'Configuration file for HTML'], 'A'),
  createQuestion(44, 'Unit IV: Node.js & Express.js', 'What is Express.js?', ['Web framework for Node.js', 'Database for Node.js', 'UI library for Node.js', 'Testing framework for Node.js'], 'A'),
  createQuestion(45, 'Unit IV: Node.js & Express.js', 'What is MVC architecture?', ['Model-View-Controller', 'Model-View-Component', 'Model-View-Content', 'Model-View-Context'], 'A'),
  createQuestion(46, 'Unit IV: Node.js & Express.js', 'What is middleware in Express?', ['Functions in request-response cycle', 'Functions outside cycle', 'Functions for data', 'Functions for views'], 'A'),
  createQuestion(47, 'Unit IV: Node.js & Express.js', 'What is a controller?', ['Handles requests and responses', 'Handles data', 'Handles views', 'Handles models'], 'A'),
  createQuestion(48, 'Unit IV: Node.js & Express.js', 'What is REST API?', ['API following REST principles', 'API not following REST', 'Random API', 'No API'], 'A'),
  createQuestion(49, 'Unit IV: Node.js & Express.js', 'What is environment variables?', ['Variables for configuration', 'Variables for code', 'Variables for data', 'Variables for views'], 'A'),
  createQuestion(50, 'Unit IV: Node.js & Express.js', 'What is Nodemailer?', ['Library for sending emails', 'Library for receiving emails', 'Library for files', 'Library for data'], 'A'),
  createQuestion(51, 'Unit IV: Node.js & Express.js', 'What is Swagger?', ['API documentation tool', 'API testing tool', 'API creation tool', 'API deletion tool'], 'A'),

  // Unit V: MongoDB, Mongoose and Full Stack Integration
  createQuestion(52, 'Unit V: MongoDB & Mongoose', 'What is MongoDB?', ['NoSQL database', 'SQL database', 'File system', 'Operating system'], 'A'),
  createQuestion(53, 'Unit V: MongoDB & Mongoose', 'What is MongoDB Atlas?', ['Cloud MongoDB service', 'Local MongoDB', 'MongoDB server', 'MongoDB client'], 'A'),
  createQuestion(54, 'Unit V: MongoDB & Mongoose', 'What is MongoDB Compass?', ['MongoDB GUI', 'MongoDB CLI', 'MongoDB server', 'MongoDB client'], 'A'),
  createQuestion(55, 'Unit V: MongoDB & Mongoose', 'What are CRUD operations?', ['Create, Read, Update, Delete', 'Create, Read, Update, Drop', 'Create, Remove, Update, Delete', 'Create, Read, Upload, Delete'], 'A'),
  createQuestion(56, 'Unit V: MongoDB & Mongoose', 'What is an aggregation pipeline?', ['Data processing pipeline', 'Data storage', 'Data deletion', 'Data creation'], 'A'),
  createQuestion(57, 'Unit V: MongoDB & Mongoose', 'What is Mongoose?', ['MongoDB ODM', 'MongoDB ORM', 'MongoDB driver', 'MongoDB client'], 'A'),
  createQuestion(58, 'Unit V: MongoDB & Mongoose', 'What is a schema in Mongoose?', ['Structure of documents', 'Structure of collections', 'Structure of databases', 'Structure of servers'], 'A'),
  createQuestion(59, 'Unit V: MongoDB & Mongoose', 'What is a model in Mongoose?', ['Representation of collection', 'Representation of document', 'Representation of database', 'Representation of server'], 'A'),
  createQuestion(60, 'Unit V: MongoDB & Mongoose', 'What is pagination in MongoDB?', ['Dividing results into pages', 'Combining results', 'Deleting results', 'Creating results'], 'A'),

  // Unit VI: RESTful APIs, Authentication, Security and Deployment
  createQuestion(61, 'Unit VI: Security & Deployment', 'What is REST?', ['Representational State Transfer', 'Representational State Request', 'Representational State Response', 'Representational State Resource'], 'A'),
  createQuestion(62, 'Unit VI: Security & Deployment', 'What are HTTP methods?', ['GET, POST, PUT, DELETE', 'GET, SEND, PUT, DELETE', 'GET, POST, UPDATE, DELETE', 'GET, POST, PUT, REMOVE'], 'A'),
  createQuestion(63, 'Unit VI: Security & Deployment', 'What is JWT?', ['JSON Web Token', 'JavaScript Web Token', 'Java Web Token', 'JSON Web Transfer'], 'A'),
  createQuestion(64, 'Unit VI: Security & Deployment', 'What is authentication?', ['Verifying identity', 'Verifying permissions', 'Verifying data', 'Verifying code'], 'A'),
  createQuestion(65, 'Unit VI: Security & Deployment', 'What is authorization?', ['Verifying permissions', 'Verifying identity', 'Verifying data', 'Verifying code'], 'A'),
  createQuestion(66, 'Unit VI: Security & Deployment', 'What is bcrypt?', ['Library for password hashing', 'Library for encryption', 'Library for encoding', 'Library for decoding'], 'A'),
  createQuestion(67, 'Unit VI: Security & Deployment', 'What is CORS?', ['Cross-Origin Resource Sharing', 'Cross-Origin Request Sharing', 'Cross-Origin Response Sharing', 'Cross-Origin Resource Server'], 'A'),
  createQuestion(68, 'Unit VI: Security & Deployment', 'What is Helmet?', ['Security middleware', 'Authentication middleware', 'Authorization middleware', 'Data middleware'], 'A'),
  createQuestion(69, 'Unit VI: Security & Deployment', 'What is rate limiting?', ['Limiting request rate', 'Limiting response rate', 'Limiting data rate', 'Limiting code rate'], 'A'),
  createQuestion(70, 'Unit VI: Security & Deployment', 'What is Docker?', ['Containerization platform', 'Operating system', 'Programming language', 'Database system'], 'A'),
];
