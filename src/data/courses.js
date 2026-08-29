import {
  ANALYTICAL_SKILLS_EXPECTED_COUNT,
  analyticalSkillsQuestions,
} from './analyticalSkillsQuestions';
import {
  MACHINE_LEARNING_PYTHON_EXPECTED_COUNT,
  machineLearningPythonQuestions,
} from './machineLearningPythonQuestions';
import {
  DISCRETE_COMPUTATIONAL_MATH_EXPECTED_COUNT,
  discreteComputationalMathQuestions,
} from './discreteComputationalMathQuestions';
import { questions as phpQuestions } from './questions';
import {
  WEB_DEVELOPMENT_EXPECTED_COUNT,
  webDevelopmentQuestions,
} from './webDevelopmentQuestions';
import {
  DSA_EXPECTED_COUNT,
  dsaQuestions,
} from './dsaQuestions';
import {
  HTML_LAB_EXPECTED_COUNT,
  htmlLabQuestions,
} from './htmlLabQuestions';
import {
  NETWORKING_EXPECTED_COUNT,
  networkingQuestions,
} from './networkingQuestions';
import {
  OPERATING_SYSTEMS_EXPECTED_COUNT,
  operatingSystemsQuestions,
} from './operatingSystemsQuestions';
import {
  SOFTWARE_ENGINEERING_EXPECTED_COUNT,
  softwareEngineeringQuestions,
} from './softwareEngineeringQuestions';
import {
  ALGORITHM_DESIGN_EXPECTED_COUNT,
  algorithmDesignQuestions,
} from './algorithmDesignQuestions';
import {
  STYLING_AND_SCRIPTING_EXPECTED_COUNT,
  stylingAndScriptingQuestions,
} from './stylingAndScriptingQuestions';
import {
  IKS_EXPECTED_COUNT,
  iksQuestions,
} from './iksQuestions';
import {
  FULL_STACK_WEB_DEV_EXPECTED_COUNT,
  fullStackWebDevQuestions,
} from './fullStackWebDevQuestions';

function createPhases(questions, size = 50) {
  if (!questions || questions.length === 0) return [];

  return Array.from({ length: Math.ceil(questions.length / size) }, (_, index) => {
    const start = index * size;
    const end = Math.min(start + size, questions.length);
    return {
      id: `phase-${index + 1}`,
      title: `Phase ${index + 1}`,
      rangeLabel: `Questions ${start + 1}-${end}`,
      questions: questions.slice(start, end),
    };
  });
}

export const courses = [
  // 1. Primary CS Tracks
  {
    id: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms',
    subtitle: 'DSA (L:3 T:0 P:0 C:3)',
    category: 'Computer Science',
    isPrimary: true,
    arenaName: 'Test Maza',
    heroTitle: 'Sharpen computational reasoning, complexity, and algorithmic problem solving.',
    description:
      'Practice asymptotic analysis, Big-O notation, arrays, linked lists, stacks, queues, trees, BSTs, DFS/BFS graph traversals, and sorting algorithms.',
    questionNote: 'Complete 80 university exam questions covering Units I through VI.',
    questions: dsaQuestions,
    phases: createPhases(dsaQuestions, 40),
  },
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'WEB_DEB (L:1 T:0 P:4 C:4)',
    category: 'Web Technologies',
    isPrimary: true,
    arenaName: 'Test Maza',
    heroTitle: 'Master modern responsive web development & Bootstrap scaffolding.',
    description:
      'Practice Bootstrap scaffolding, 12-column flexbox grid systems, UI layout components, typography, JavaScript plugins, and utilities.',
    questionNote: 'Complete 100 university exam questions covering Units I through VI.',
    questions: webDevelopmentQuestions,
    phases: createPhases(webDevelopmentQuestions, 50),
  },
  {
    id: 'full-stack-web-dev',
    title: 'Full Stack Web Development',
    subtitle: 'MERN & REST (L:3 T:0 P:2 C:4)',
    category: 'Web Technologies',
    isPrimary: true,
    arenaName: 'Test Maza',
    heroTitle: 'Full stack React, Node.js, Express, MongoDB Atlas, and JWT authentication.',
    description:
      'Practice modern ES6+, React Hooks & Router, Node.js MVC architecture, MongoDB Mongoose pipelines, JWT auth, CORS, Docker, and deployment.',
    questionNote: 'Complete 70 university examination questions covering Units I through VI.',
    questions: fullStackWebDevQuestions,
    phases: createPhases(fullStackWebDevQuestions, 35),
  },
  {
    id: 'operating-systems',
    title: 'Operating Systems',
    subtitle: 'OS (L:4 T:0 P:0 C:4)',
    category: 'Core Engineering',
    isPrimary: true,
    arenaName: 'Test Maza',
    heroTitle: 'System calls, process scheduling, memory virtualization, and deadlocks.',
    description:
      'Practice process lifecycle & IPC, CPU scheduling (FCFS, SJF, RR), deadlock conditions & Banker algorithm, paging & segmentation, and disk scheduling.',
    questionNote: 'Complete 60 university exam questions covering Units I through VI.',
    questions: operatingSystemsQuestions,
    phases: createPhases(operatingSystemsQuestions, 30),
  },
  {
    id: 'algorithm-design-analysis',
    title: 'Algorithm Design & Analysis',
    subtitle: 'ADA (L:3 T:0 P:2 C:4)',
    category: 'Computer Science',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Divide & Conquer, Greedy, Dynamic Programming, Backtracking, and NP-Completeness.',
    description:
      'Practice recurrence relations, Master theorem, Dijkstra/Prim/Kruskal MST, Floyd/Warshall DP, KMP/Boyer-Moore pattern matching, N-Queens, and NP-hard reductions.',
    questionNote: 'Complete 65 university exam questions covering Units I through VI.',
    questions: algorithmDesignQuestions,
    phases: createPhases(algorithmDesignQuestions, 35),
  },
  {
    id: 'styling-and-scripting',
    title: 'Styling & Scripting',
    subtitle: 'CSS, JS & ASP.NET (L:3 T:0 P:2 C:4)',
    category: 'Web Technologies',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Advanced CSS Box Model, Async JavaScript Promises, DOM Trees, and ASP.NET.',
    description:
      'Practice CSS Flexbox & Grid, CSS pseudo-classes, async/await and Promises, DOM manipulation, Browser Object Model, and ASP.NET page lifecycles.',
    questionNote: 'Complete 70 university exam questions covering Units I through VI.',
    questions: stylingAndScriptingQuestions,
    phases: createPhases(stylingAndScriptingQuestions, 35),
  },
  {
    id: 'computer-networking',
    title: 'Computer Networks',
    subtitle: 'NETWORKING (L:3 T:0 P:0 C:3)',
    category: 'Core Engineering',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Master network architectures, OSI layers, routing, and security protocols.',
    description:
      'Practice OSI & TCP/IP models, physical media, framing & CSMA, IP addressing & subnetting, transport protocols, and application layer cryptography.',
    questionNote: 'Complete 70 university exam questions covering Units I through VI.',
    questions: networkingQuestions,
    phases: createPhases(networkingQuestions, 35),
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    subtitle: 'SE (L:3 T:0 P:0 C:3)',
    category: 'Core Engineering',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Software lifecycle models, SRS specifications, architectural design, and QA.',
    description:
      'Practice Waterfall & Agile models, functional/non-functional requirements, coupling & cohesion, structured coding, black/white-box testing, and maintenance.',
    questionNote: 'Complete 60 university exam questions covering Units I through VI.',
    questions: softwareEngineeringQuestions,
    phases: createPhases(softwareEngineeringQuestions, 30),
  },
  {
    id: 'indian-knowledge-system',
    title: 'Indian Knowledge System (IKS)',
    subtitle: 'IKS (L:2 T:0 P:0 C:2)',
    category: 'Foundations & Aptitude',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Ancient Indian epistemology, logic, computational algorithms, and ethical AI.',
    description:
      'Practice Nyaya logic & Pramana theory, Aryabhata square roots & Pingala binary, Vedic knowledge graphs, Sanskrit NLP, and human-centric AI ethics.',
    questionNote: 'Complete 65 university exam questions covering Units I through VI.',
    questions: iksQuestions,
    phases: createPhases(iksQuestions, 35),
  },
  {
    id: 'html-lab',
    title: 'HTML & Web Tech Lab',
    subtitle: 'HTML_LAB (L:1 T:0 P:2 C:1)',
    category: 'Web Technologies',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Core markup, CSS styling, JavaScript DOM, and jQuery animation.',
    description:
      'Practice HTML5 semantic tags, CSS layout, JavaScript syntax & DOM APIs, error handling, and jQuery animation methods.',
    questionNote: 'Complete 80 university lab examination questions.',
    questions: htmlLabQuestions,
    phases: createPhases(htmlLabQuestions, 40),
  },
  {
    id: 'machine-learning-python',
    title: 'Machine Learning using Python',
    subtitle: 'CAP555 exam preparation',
    category: 'Computer Science',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Master ML with Python one question at a time.',
    description:
      'Practice introduction to ML, supervised learning, unsupervised learning, feature engineering, neural networks, explainability, and generative AI.',
    questionNote: 'Complete 181 university examination questions with detailed keys.',
    questions: machineLearningPythonQuestions,
    phases: createPhases(machineLearningPythonQuestions, 50),
  },
  {
    id: 'discrete-computational-mathematics',
    title: 'Discrete & Computational Mathematics',
    subtitle: 'MTH404 exam preparation',
    category: 'Computer Science',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Master discrete mathematics and propositional logic.',
    description:
      'Practice propositional calculus, ordered sets, lattices, combinatorics, linear algebra, and probability with university-style MCQs.',
    questionNote: 'Complete 70 university examination questions.',
    questions: discreteComputationalMathQuestions,
    phases: createPhases(discreteComputationalMathQuestions, 35),
  },
  {
    id: 'php',
    title: 'PHP Backend Engineering',
    subtitle: 'CAP777 exam preparation',
    category: 'Web Technologies',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Master server-side PHP development and database integration.',
    description:
      'Practice server-side scripting, superglobals, sessions, MySQL PDO operations, object-oriented PHP, and security best practices.',
    questionNote: 'Complete 155 curated examination questions with instant evaluation.',
    questions: phpQuestions,
    phases: createPhases(phpQuestions, 40),
  },
  {
    id: 'analytical-skills-ii',
    title: 'Analytical Skills-II',
    subtitle: 'PEA516 practice preparation',
    category: 'Foundations & Aptitude',
    isPrimary: false,
    arenaName: 'Test Maza',
    heroTitle: 'Sharpen quantitative aptitude and logical reasoning.',
    description:
      'Practice sequence-series, coding-decoding, calendars, clocks, data sufficiency, syllogisms, and puzzles.',
    questionNote: 'Complete 70 curated reasoning examination questions.',
    questions: analyticalSkillsQuestions,
    phases: createPhases(analyticalSkillsQuestions, 35),
  },
];
