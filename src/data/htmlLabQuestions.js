export const HTML_LAB_EXPECTED_COUNT = 80;

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

export const htmlLabQuestions = [
  // Basics of HTML
  createQuestion(1, 'Basics of HTML', 'What does HTML stand for?', ['Hyper Text Markup Language', 'High Tech Markup Language', 'Hyper Text Management Language', 'High Text Markup Language'], 'A'),
  createQuestion(2, 'Basics of HTML', 'What is the latest version of HTML?', ['HTML 4.01', 'HTML5', 'HTML6', 'XHTML'], 'B'),
  createQuestion(3, 'Basics of HTML', 'Which tag is used for the largest heading?', ['<h1>', '<h6>', '<heading>', '<head>'], 'A'),
  createQuestion(4, 'Basics of HTML', 'Which tag is used for paragraphs?', ['<p>', '<para>', '<paragraph>', '<text>'], 'A'),
  createQuestion(5, 'Basics of HTML', 'Which tag creates a line break?', ['<br>', '<lb>', '<break>', '<line>'], 'A'),
  createQuestion(6, 'Basics of HTML', 'Which tag creates a horizontal line?', ['<hr>', '<line>', '<hline>', '<hrline>'], 'A'),
  createQuestion(7, 'Basics of HTML', 'What is the correct HTML for a link?', ['<a href="url">', '<link href="url">', '<a src="url">', '<link src="url">'], 'A'),
  createQuestion(8, 'Basics of HTML', 'What is the correct HTML for an image?', ['<img src="image.jpg">', '<image src="image.jpg">', '<img href="image.jpg">', '<image href="image.jpg">'], 'A'),
  createQuestion(9, 'Basics of HTML', 'What is the correct HTML for a comment?', ['<!-- comment -->', '// comment', '/* comment */', '# comment'], 'A'),
  createQuestion(10, 'Basics of HTML', 'Which tag is used for the title?', ['<title>', '<head>', '<heading>', '<header>'], 'A'),

  // Web Page Layout Using HTML
  createQuestion(11, 'Web Page Layout Using HTML', 'Which tag creates an unordered list?', ['<ul>', '<ol>', '<li>', '<list>'], 'A'),
  createQuestion(12, 'Web Page Layout Using HTML', 'Which tag creates an ordered list?', ['<ol>', '<ul>', '<li>', '<list>'], 'A'),
  createQuestion(13, 'Web Page Layout Using HTML', 'Which tag creates a table?', ['<table>', '<tab>', '<tr>', '<td>'], 'A'),
  createQuestion(14, 'Web Page Layout Using HTML', 'Which tag defines a table row?', ['<tr>', '<td>', '<th>', '<table>'], 'A'),
  createQuestion(15, 'Web Page Layout Using HTML', 'Which tag defines a table header?', ['<th>', '<td>', '<tr>', '<thead>'], 'A'),
  createQuestion(16, 'Web Page Layout Using HTML', 'Which tag defines a form?', ['<form>', '<input>', '<field>', '<formbody>'], 'A'),
  createQuestion(17, 'Web Page Layout Using HTML', 'Which attribute is used for the form action?', ['action', 'method', 'target', 'submit'], 'A'),
  createQuestion(18, 'Web Page Layout Using HTML', 'What is XHTML?', ['Extensible Hypertext Markup Language', 'eXtreme HTML', 'XML HTML', 'Extended HTML'], 'A'),
  createQuestion(19, 'Web Page Layout Using HTML', 'Which tag defines frames?', ['<frameset>', '<frame>', '<iframe>', '<framecontainer>'], 'A'),
  createQuestion(20, 'Web Page Layout Using HTML', 'Which tag is used for bold text?', ['<b>', '<strong>', '<bold>', '<em>'], 'A'),

  // Overview of HTML5
  createQuestion(21, 'Overview of HTML5', 'Which element is new in HTML5?', ['<section>', '<div>', '<span>', '<p>'], 'A'),
  createQuestion(22, 'Overview of HTML5', 'Which element is used for audio?', ['<audio>', '<sound>', '<media>', '<music>'], 'A'),
  createQuestion(23, 'Overview of HTML5', 'Which element is used for video?', ['<video>', '<vid>', '<media>', '<movie>'], 'A'),
  createQuestion(24, 'Overview of HTML5', 'Which element is used for canvas?', ['<canvas>', '<draw>', '<graphic>', '<paint>'], 'A'),
  createQuestion(25, 'Overview of HTML5', 'Which element is used for navigation?', ['<nav>', '<navigation>', '<menu>', '<navbar>'], 'A'),
  createQuestion(26, 'Overview of HTML5', 'Which element is used for article?', ['<article>', '<section>', '<div>', '<content>'], 'A'),
  createQuestion(27, 'Overview of HTML5', 'Which element is used for header?', ['<header>', '<head>', '<top>', '<heading>'], 'A'),
  createQuestion(28, 'Overview of HTML5', 'Which element is used for footer?', ['<footer>', '<foot>', '<bottom>', '<ending>'], 'A'),
  createQuestion(29, 'Overview of HTML5', 'Which element is used for main content?', ['<main>', '<content>', '<body>', '<section>'], 'A'),
  createQuestion(30, 'Overview of HTML5', 'Which attribute supports multimedia in HTML5?', ['src', 'href', 'alt', 'type'], 'A'),

  // CSS
  createQuestion(31, 'CSS', 'What does CSS stand for?', ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], 'A'),
  createQuestion(32, 'CSS', 'Which CSS property changes text color?', ['color', 'font-color', 'text-color', 'background'], 'A'),
  createQuestion(33, 'CSS', 'Which CSS property changes background color?', ['background-color', 'bgcolor', 'background', 'color'], 'A'),
  createQuestion(34, 'CSS', 'Which CSS property adds margin?', ['margin', 'padding', 'space', 'border'], 'A'),
  createQuestion(35, 'CSS', 'Which CSS property adds padding?', ['padding', 'margin', 'space', 'border'], 'A'),
  createQuestion(36, 'CSS', 'Which CSS property adds a border?', ['border', 'outline', 'frame', 'edge'], 'A'),
  createQuestion(37, 'CSS', 'How do you add inline CSS?', ['style attribute', 'class attribute', 'id attribute', 'css attribute'], 'A'),
  createQuestion(38, 'CSS', 'How do you link an external CSS file?', ['<link rel="stylesheet" href="style.css">', '<style src="style.css">', '<css href="style.css">', '<link rel="css" href="style.css">'], 'A'),
  createQuestion(39, 'CSS', 'How do you add embedded CSS?', ['<style> tag in head', '<css> tag', 'style attribute', 'external file'], 'A'),
  createQuestion(40, 'CSS', 'Which selector selects by id?', ['#id', '.id', '*id', '&id'], 'A'),
  createQuestion(41, 'CSS', 'Which selector selects by class?', ['.class', '#class', '*class', '&class'], 'A'),
  createQuestion(42, 'CSS', 'Which property controls font size?', ['font-size', 'size', 'text-size', 'font'], 'A'),
  createQuestion(43, 'CSS', 'Which property controls text alignment?', ['text-align', 'align', 'text', 'alignment'], 'A'),
  createQuestion(44, 'CSS', 'Which property controls display type?', ['display', 'type', 'show', 'visibility'], 'A'),
  createQuestion(45, 'CSS', 'Which value makes an element block?', ['display: block', 'display: inline', 'display: none', 'display: flex'], 'A'),
  createQuestion(46, 'CSS', 'Which value makes an element inline?', ['display: inline', 'display: block', 'display: none', 'display: flex'], 'A'),
  createQuestion(47, 'CSS', 'Which property adds rounded corners?', ['border-radius', 'radius', 'round', 'corner-radius'], 'A'),
  createQuestion(48, 'CSS', 'Which property adds shadow?', ['box-shadow', 'shadow', 'text-shadow', 'glow'], 'A'),

  // JavaScript
  createQuestion(49, 'JavaScript', 'What is JavaScript?', ['Scripting language for web pages', 'Programming language for servers', 'Markup language', 'Database language'], 'A'),
  createQuestion(50, 'JavaScript', 'Which tag is used for JavaScript?', ['<script>', '<js>', '<javascript>', '<code>'], 'A'),
  createQuestion(51, 'JavaScript', 'Which keyword declares a variable?', ['var', 'let', 'const', 'All of the above'], 'D'),
  createQuestion(52, 'JavaScript', 'What is the correct syntax for a function?', ['function name() {}', 'function: name() {}', 'def name() {}', 'func name() {}'], 'A'),
  createQuestion(53, 'JavaScript', 'Which operator is used for equality?', ['==', '=', '===', '!='], 'A'),
  createQuestion(54, 'JavaScript', 'Which operator is used for strict equality?', ['===', '==', '=', '!=='], 'A'),
  createQuestion(55, 'JavaScript', 'Which loop executes at least once?', ['do-while', 'while', 'for', 'for-in'], 'A'),
  createQuestion(56, 'JavaScript', 'Which statement creates an array?', ['var arr = []', 'var arr = {}', 'var arr = ()', 'var arr = <>'], 'A'),
  createQuestion(57, 'JavaScript', 'Which event occurs on button click?', ['onclick', 'onmouseover', 'onchange', 'onsubmit'], 'A'),
  createQuestion(58, 'JavaScript', 'Which method writes to document?', ['document.write()', 'console.log()', 'alert()', 'prompt()'], 'A'),
  createQuestion(59, 'JavaScript', 'Which method shows an alert box?', ['alert()', 'confirm()', 'prompt()', 'console.log()'], 'A'),
  createQuestion(60, 'JavaScript', 'Which method gets an element by id?', ['document.getElementById()', 'document.getElement()', 'document.getElementById()', 'document.query()'], 'A'),
  createQuestion(61, 'JavaScript', 'Which method gets elements by class?', ['document.getElementsByClassName()', 'document.getElementsByClass()', 'document.querySelector()', 'document.getElements()'], 'A'),
  createQuestion(62, 'JavaScript', 'Which property changes HTML content?', ['innerHTML', 'textContent', 'value', 'html'], 'A'),
  createQuestion(63, 'JavaScript', 'Which property changes input value?', ['value', 'innerHTML', 'textContent', 'html'], 'A'),
  createQuestion(64, 'JavaScript', 'Which statement handles errors?', ['try-catch', 'if-else', 'switch', 'for'], 'A'),

  // DOM Using JavaScript
  createQuestion(65, 'DOM Using JavaScript', 'What does DOM stand for?', ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Data Oriented Model'], 'A'),
  createQuestion(66, 'DOM Using JavaScript', 'What is the top-level object in DOM?', ['window', 'document', 'navigator', 'screen'], 'A'),
  createQuestion(67, 'DOM Using JavaScript', 'Which object represents the browser window?', ['window', 'document', 'navigator', 'location'], 'A'),
  createQuestion(68, 'DOM Using JavaScript', 'Which object contains browser information?', ['navigator', 'window', 'document', 'location'], 'A'),
  createQuestion(69, 'DOM Using JavaScript', 'Which object represents the URL?', ['location', 'window', 'document', 'navigator'], 'A'),
  createQuestion(70, 'DOM Using JavaScript', 'Which method reloads the page?', ['location.reload()', 'window.reload()', 'document.reload()', 'page.reload()'], 'A'),

  // Basics of jQuery
  createQuestion(71, 'Basics of jQuery', 'What is jQuery?', ['JavaScript library', 'JavaScript framework', 'CSS library', 'HTML framework'], 'A'),
  createQuestion(72, 'Basics of jQuery', 'Which symbol is used for jQuery?', ['$', '#', '.', '@'], 'A'),
  createQuestion(73, 'Basics of jQuery', 'Which function waits for DOM ready?', ['$(document).ready()', '$(window).load()', '$(document).load()', '$(window).ready()'], 'A'),
  createQuestion(74, 'Basics of jQuery', 'Which jQuery method hides an element?', ['hide()', 'show()', 'toggle()', 'slide()'], 'A'),
  createQuestion(75, 'Basics of jQuery', 'Which jQuery method shows an element?', ['show()', 'hide()', 'toggle()', 'slide()'], 'A'),
  createQuestion(76, 'Basics of jQuery', 'Which jQuery method toggles visibility?', ['toggle()', 'show()', 'hide()', 'slide()'], 'A'),
  createQuestion(77, 'Basics of jQuery', 'Which jQuery method adds an animation?', ['animate()', 'effect()', 'move()', 'transition()'], 'A'),
  createQuestion(78, 'Basics of jQuery', 'Which jQuery method fades an element?', ['fadeOut()', 'fadeIn()', 'slideUp()', 'slideDown()'], 'A'),
  createQuestion(79, 'Basics of jQuery', 'Which jQuery method slides an element?', ['slideDown()', 'slideUp()', 'slideToggle()', 'All of the above'], 'D'),
  createQuestion(80, 'Basics of jQuery', 'Which jQuery method adds a class?', ['addClass()', 'removeClass()', 'toggleClass()', 'css()'], 'A'),
];
