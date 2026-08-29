export const IKS_EXPECTED_COUNT = 65;

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

export const iksQuestions = [
  // Unit I: History, Indian Epistemology & Logic
  createQuestion(1, 'Unit I: Epistemology & Logic', 'What is Indigenous Knowledge Systems (IKS)?', ['Traditional knowledge systems of India', 'Modern knowledge systems', 'Western knowledge systems', 'Artificial knowledge systems'], 'A'),
  createQuestion(2, 'Unit I: Epistemology & Logic', 'What is Pramana theory?', ['Theory of valid knowledge', 'Theory of invalid knowledge', 'Theory of creation', 'Theory of destruction'], 'A'),
  createQuestion(3, 'Unit I: Epistemology & Logic', 'How many pramanas are accepted in Nyaya philosophy?', ['4', '2', '6', '8'], 'A'),
  createQuestion(4, 'Unit I: Epistemology & Logic', 'What is Nyaya logic?', ['Indian system of logic', 'Western system of logic', 'Chinese system of logic', 'Modern system of logic'], 'A'),
  createQuestion(5, 'Unit I: Epistemology & Logic', 'What is Vaisheshika categories?', ['Categories of reality', 'Categories of logic', 'Categories of knowledge', 'Categories of language'], 'A'),
  createQuestion(6, 'Unit I: Epistemology & Logic', 'How many categories are in Vaisheshika philosophy?', ['7', '6', '8', '10'], 'A'),
  createQuestion(7, 'Unit I: Epistemology & Logic', 'What is systems thinking?', ['Understanding interconnected parts', 'Understanding isolated parts', 'Understanding random parts', 'Understanding no parts'], 'A'),
  createQuestion(8, 'Unit I: Epistemology & Logic', 'What is the historical evolution of IKS?', ['Development over time', 'Sudden development', 'No development', 'Random development'], 'A'),
  createQuestion(9, 'Unit I: Epistemology & Logic', 'What is the role of IKS in community life?', ['Traditional knowledge application', 'Modern application', 'No application', 'Random application'], 'A'),
  createQuestion(10, 'Unit I: Epistemology & Logic', 'What is traditional knowledge?', ['Knowledge passed through generations', 'Knowledge created now', 'Knowledge from future', 'Knowledge from nowhere'], 'A'),

  // Unit II: Indian Algorithms & Computation
  createQuestion(11, 'Unit II: Indian Algorithms & Computation', "What is Aryabhata's square root method?", ['Ancient algorithm for square root', 'Modern algorithm', 'Western algorithm', 'Random algorithm'], 'A'),
  createQuestion(12, 'Unit II: Indian Algorithms & Computation', "What is Pingala's binary system?", ['Ancient binary system', 'Modern binary system', 'Western binary system', 'Random binary system'], 'A'),
  createQuestion(13, 'Unit II: Indian Algorithms & Computation', 'What is recursion in Indian context?', ['Self-referential algorithms', 'Non-self-referential algorithms', 'Random algorithms', 'No algorithms'], 'A'),
  createQuestion(14, 'Unit II: Indian Algorithms & Computation', 'What are Vedic texts?', ['Ancient Indian scriptures', 'Modern Indian texts', 'Western texts', 'Random texts'], 'A'),
  createQuestion(15, 'Unit II: Indian Algorithms & Computation', 'How do Vedic texts represent knowledge?', ['As categories like modern databases', 'As random knowledge', 'As no knowledge', 'As western knowledge'], 'A'),
  createQuestion(16, 'Unit II: Indian Algorithms & Computation', 'What is knowledge representation?', ['Organizing knowledge', 'Deleting knowledge', 'Creating knowledge', 'Destroying knowledge'], 'A'),
  createQuestion(17, 'Unit II: Indian Algorithms & Computation', 'What is a knowledge graph?', ['Graph representing knowledge', 'Graph representing data', 'Graph representing code', 'Graph representing hardware'], 'A'),
  createQuestion(18, 'Unit II: Indian Algorithms & Computation', 'What is the significance of Indian algorithms?', ['Foundation for computation', 'Modern computation', 'Western computation', 'Random computation'], 'A'),
  createQuestion(19, 'Unit II: Indian Algorithms & Computation', 'What is an early version of coding loops?', ['Ancient iteration techniques', 'Modern iteration', 'Western iteration', 'Random iteration'], 'A'),
  createQuestion(20, 'Unit II: Indian Algorithms & Computation', 'What is the purpose of knowledge representation?', ['Store and organize knowledge', 'Delete knowledge', 'Create knowledge randomly', 'Destroy knowledge'], 'A'),

  // Unit III: Integration of AI into IKS Initiatives
  createQuestion(21, 'Unit III: Integration of AI into IKS', 'What is symbolic AI?', ['AI using symbols and rules', 'AI using data', 'AI using no rules', 'AI using random methods'], 'A'),
  createQuestion(22, 'Unit III: Integration of AI into IKS', 'What is knowledge-based systems?', ['Systems using knowledge', 'Systems using data', 'Systems using no knowledge', 'Systems using random methods'], 'A'),
  createQuestion(23, 'Unit III: Integration of AI into IKS', 'What is hybrid AI?', ['Combination of AI approaches', 'Single AI approach', 'No AI approach', 'Random AI approach'], 'A'),
  createQuestion(24, 'Unit III: Integration of AI into IKS', 'What is digitization of IKS?', ['Converting IKS to digital', 'Deleting IKS', 'Creating new IKS', 'Destroying IKS'], 'A'),
  createQuestion(25, 'Unit III: Integration of AI into IKS', 'What are knowledge graphs?', ['Graph structure for knowledge', 'Random structure', 'No structure', 'Western structure'], 'A'),
  createQuestion(26, 'Unit III: Integration of AI into IKS', 'What is heritage analytics?', ['Analyzing heritage data', 'Deleting heritage data', 'Creating heritage data', 'Random analysis'], 'A'),
  createQuestion(27, 'Unit III: Integration of AI into IKS', 'What is AI-enabled IKS research?', ['Using AI for IKS research', 'Using no AI', 'Using random methods', 'Using western methods'], 'A'),
  createQuestion(28, 'Unit III: Integration of AI into IKS', 'What is the mapping of Indian logic to AI?', ['Applying Indian logic in AI', 'Applying no logic', 'Applying random logic', 'Applying western logic'], 'A'),
  createQuestion(29, 'Unit III: Integration of AI into IKS', 'What is AI reasoning architecture?', ['Structure for AI reasoning', 'No structure', 'Random structure', 'Western structure'], 'A'),
  createQuestion(30, 'Unit III: Integration of AI into IKS', 'What is the purpose of AI for IKS?', ['Enhance IKS research', 'Delete IKS', 'Create new IKS', 'Destroy IKS'], 'A'),

  // Unit IV: Integration of ML and Cognitive Systems with IKS
  createQuestion(31, 'Unit IV: ML & Cognitive Systems with IKS', 'What is Machine Learning?', ['Learning from data', 'Learning from rules', 'Learning from no data', 'Random learning'], 'A'),
  createQuestion(32, 'Unit IV: ML & Cognitive Systems with IKS', 'What is learning theory?', ['Theory of learning', 'Theory of no learning', 'Theory of random learning', 'Theory of western learning'], 'A'),
  createQuestion(33, 'Unit IV: ML & Cognitive Systems with IKS', 'What are cognitive architectures?', ['Structures for cognition', 'No structures', 'Random structures', 'Western structures'], 'A'),
  createQuestion(34, 'Unit IV: ML & Cognitive Systems with IKS', 'What is Manas in Indian cognition?', ['Mind in Indian philosophy', 'Memory in Indian philosophy', 'Logic in Indian philosophy', 'Knowledge in Indian philosophy'], 'A'),
  createQuestion(35, 'Unit IV: ML & Cognitive Systems with IKS', 'What is Buddha in Indian cognition?', ['Intelligence in Indian philosophy', 'Mind in Indian philosophy', 'Memory in Indian philosophy', 'Logic in Indian philosophy'], 'A'),
  createQuestion(36, 'Unit IV: ML & Cognitive Systems with IKS', 'What is Ahamkara in Indian cognition?', ['Ego in Indian philosophy', 'Mind in Indian philosophy', 'Intelligence in Indian philosophy', 'Memory in Indian philosophy'], 'A'),
  createQuestion(37, 'Unit IV: ML & Cognitive Systems with IKS', 'What is Chitta in Indian cognition?', ['Consciousness in Indian philosophy', 'Mind in Indian philosophy', 'Intelligence in Indian philosophy', 'Memory in Indian philosophy'], 'A'),
  createQuestion(38, 'Unit IV: ML & Cognitive Systems with IKS', 'What is Sanskrit-based NLP?', ['Natural Language Processing for Sanskrit', 'NLP for English', 'NLP for Hindi', 'No NLP'], 'A'),
  createQuestion(39, 'Unit IV: ML & Cognitive Systems with IKS', 'What is computational linguistics?', ['Using computers for language', 'Using no computers', 'Using random methods', 'Using western methods'], 'A'),
  createQuestion(40, 'Unit IV: ML & Cognitive Systems with IKS', 'What is Explainable AI (XAI)?', ['AI that explains decisions', 'AI that does not explain', 'AI with no decisions', 'Random AI'], 'A'),

  // Unit V: Ethical, Sustainable, and Responsible AI in IKS Framework
  createQuestion(41, 'Unit V: Ethical & Sustainable AI in IKS', 'What is ethical AI?', ['AI with ethical considerations', 'AI with no ethics', 'Random AI', 'Western AI'], 'A'),
  createQuestion(42, 'Unit V: Ethical & Sustainable AI in IKS', 'What is human-centric AI?', ['AI focused on humans', 'AI not focused on humans', 'Random AI', 'Western AI'], 'A'),
  createQuestion(43, 'Unit V: Ethical & Sustainable AI in IKS', 'What is collective well-being?', ['Well-being of all', 'Well-being of one', 'No well-being', 'Random well-being'], 'A'),
  createQuestion(44, 'Unit V: Ethical & Sustainable AI in IKS', 'What is sustainability in IKS?', ['Sustainable practices', 'Unsustainable practices', 'Random practices', 'Western practices'], 'A'),
  createQuestion(45, 'Unit V: Ethical & Sustainable AI in IKS', 'What is responsible AI?', ['AI with responsibility', 'AI with no responsibility', 'Random AI', 'Western AI'], 'A'),
  createQuestion(46, 'Unit V: Ethical & Sustainable AI in IKS', 'What is the Indian ethical framework?', ['Ethical guidelines from Indian philosophy', 'Western ethical guidelines', 'Random guidelines', 'No guidelines'], 'A'),
  createQuestion(47, 'Unit V: Ethical & Sustainable AI in IKS', 'What is the ecology in IKS?', ['Environmental knowledge', 'No environmental knowledge', 'Random knowledge', 'Western knowledge'], 'A'),
  createQuestion(48, 'Unit V: Ethical & Sustainable AI in IKS', 'What is technology in IKS?', ['Technology with IKS principles', 'Technology without IKS', 'Random technology', 'Western technology'], 'A'),
  createQuestion(49, 'Unit V: Ethical & Sustainable AI in IKS', 'What is a case study in IKS?', ['Research on IKS applications', 'Research without IKS', 'Random research', 'Western research'], 'A'),
  createQuestion(50, 'Unit V: Ethical & Sustainable AI in IKS', 'What is design consideration in IKS?', ['Design with IKS principles', 'Design without IKS', 'Random design', 'Western design'], 'A'),

  // Unit VI: Applied IKS-AI Systems and Research Orientation
  createQuestion(51, 'Unit VI: Applied IKS-AI Systems', 'What is IKS-inspired AI systems?', ['AI with IKS principles', 'AI without IKS', 'Random AI', 'Western AI'], 'A'),
  createQuestion(52, 'Unit VI: Applied IKS-AI Systems', 'What is decision-making in IKS-AI?', ['Decisions with IKS principles', 'Decisions without IKS', 'Random decisions', 'Western decisions'], 'A'),
  createQuestion(53, 'Unit VI: Applied IKS-AI Systems', 'What is reasoning in IKS-AI?', ['Reasoning with IKS principles', 'Reasoning without IKS', 'Random reasoning', 'Western reasoning'], 'A'),
  createQuestion(54, 'Unit VI: Applied IKS-AI Systems', 'What is prediction in IKS-AI?', ['Predictions with IKS principles', 'Predictions without IKS', 'Random predictions', 'Western predictions'], 'A'),
  createQuestion(55, 'Unit VI: Applied IKS-AI Systems', 'What is domain-specific IKS-AI?', ['IKS-AI in specific domains', 'IKS-AI in no domains', 'Random domains', 'Western domains'], 'A'),
  createQuestion(56, 'Unit VI: Applied IKS-AI Systems', 'What is education in IKS-AI?', ['IKS-AI in education', 'IKS-AI not in education', 'Random education', 'Western education'], 'A'),
  createQuestion(57, 'Unit VI: Applied IKS-AI Systems', 'What is healthcare in IKS-AI?', ['IKS-AI in healthcare', 'IKS-AI not in healthcare', 'Random healthcare', 'Western healthcare'], 'A'),
  createQuestion(58, 'Unit VI: Applied IKS-AI Systems', 'What is agriculture in IKS-AI?', ['IKS-AI in agriculture', 'IKS-AI not in agriculture', 'Random agriculture', 'Western agriculture'], 'A'),
  createQuestion(59, 'Unit VI: Applied IKS-AI Systems', 'What is governance in IKS-AI?', ['IKS-AI in governance', 'IKS-AI not in governance', 'Random governance', 'Western governance'], 'A'),
  createQuestion(60, 'Unit VI: Applied IKS-AI Systems', 'What are research methodologies for IKS-AI?', ['Methods for IKS-AI research', 'Methods without IKS', 'Random methods', 'Western methods'], 'A'),
  createQuestion(61, 'Unit VI: Applied IKS-AI Systems', 'What are research gaps in IKS and AI?', ['Unanswered research questions', 'No research questions', 'Random questions', 'Western questions'], 'A'),
  createQuestion(62, 'Unit VI: Applied IKS-AI Systems', 'What are emerging trends in IKS-AI?', ['New developments in IKS-AI', 'No developments', 'Random developments', 'Western developments'], 'A'),
  createQuestion(63, 'Unit VI: Applied IKS-AI Systems', 'What is the future direction of IKS-AI?', ['Future of IKS-AI integration', 'No future', 'Random future', 'Western future'], 'A'),
  createQuestion(64, 'Unit VI: Applied IKS-AI Systems', 'What is IKS-driven intelligent systems?', ['Intelligent systems with IKS', 'Systems without IKS', 'Random systems', 'Western systems'], 'A'),
  createQuestion(65, 'Unit VI: Applied IKS-AI Systems', 'What is the application of IKS principles?', ['Applying IKS in modern systems', 'Not applying IKS', 'Random application', 'Western application'], 'A'),
];
