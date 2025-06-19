const termstyle = require('../dist/index.js').default;

console.log('Testing API.md examples...\n');

// Import examples
console.log('=== Import Examples ===');
// CommonJS is already imported above
// ES Modules would be: import termstyle from '@termstyle/core';

// Basic Colors
console.log('\n=== Basic Colors ===');
console.log(termstyle.red('Error message'));
console.log(termstyle.green('Success message'));
console.log(termstyle.blue('Info message'));
console.log(termstyle.yellow('Warning message'));
console.log(termstyle.magenta('Magenta text'));
console.log(termstyle.cyan('Cyan text'));
console.log(termstyle.white('White text'));
console.log(termstyle.black('Black text'));
console.log(termstyle.gray('Gray text'));
console.log(termstyle.grey('Grey text')); // Alias

// Background Colors
console.log('\n=== Background Colors ===');
console.log(termstyle.bgRed('Text on red background'));
console.log(termstyle.bgGreen('Text on green background'));
console.log(termstyle.bgBlue('Text on blue background'));
console.log(termstyle.bgYellow('Text on yellow background'));
console.log(termstyle.bgMagenta('Text on magenta background'));
console.log(termstyle.bgCyan('Text on cyan background'));
console.log(termstyle.bgWhite('Text on white background'));
console.log(termstyle.bgBlack('Text on black background'));
console.log(termstyle.bgGray('Text on gray background'));
console.log(termstyle.bgGrey('Text on grey background')); // Alias

// Text Styles
console.log('\n=== Text Styles ===');
console.log(termstyle.bold('Bold text'));
console.log(termstyle.dim('Dimmed text'));
console.log(termstyle.italic('Italic text'));
console.log(termstyle.underline('Underlined text'));
console.log(termstyle.inverse('Inverted text'));
console.log(termstyle.hidden('Hidden text'));
console.log(termstyle.strikethrough('Strikethrough text'));

// Advanced Colors
console.log('\n=== Advanced Colors ===');
console.log(termstyle.hex('#ff6b35')('Orange text'));
console.log(termstyle.hex('4ecdc4')('Teal text'));
console.log(termstyle.bgHex('#4ecdc4')('Text on teal background'));
console.log(termstyle.rgb(255, 107, 53)('RGB orange text'));
console.log(termstyle.bgRgb(78, 205, 196)('Text on RGB teal background'));
console.log(termstyle.color(196)('ANSI 256 red'));
console.log(termstyle.color([255, 0, 0])('RGB red'));
console.log(termstyle.color('red')('Named color'));
console.log(termstyle.bgColor(46)('Text on ANSI 256 green'));
console.log(termstyle.bgColor([0, 255, 0])('Text on RGB green'));

// Gradient Effects
console.log('\n=== Gradient Effects ===');
// Color names
console.log(termstyle.gradient('Gradient text', ['red', 'yellow', 'green']));

// Hex colors
console.log(termstyle.gradient('Hex gradient', ['#ff0000', '#00ff00', '#0000ff']));

// RGB arrays
console.log(termstyle.gradient('RGB gradient', [[255,0,0], [0,255,0], [0,0,255]]));

// Rainbow
console.log('\n=== Rainbow ===');
console.log(termstyle.rainbow('Rainbow colored text'));

// Box
console.log('\n=== Box ===');
console.log(termstyle.box('Hello World'));
// Output:
// ┌───────────┐
// │Hello World│
// └───────────┘

console.log(termstyle.box('Important Message', {
  padding: 1,
  margin: 1,
  borderStyle: 'double',
  borderColor: 'blue',
  align: 'center',
  title: 'Notice'
}));

// Progress Bar
console.log('\n=== Progress Bar ===');
const progressBar = termstyle.progressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

progressBar.update(50);
console.log(progressBar.render());
// ████████████████████░░░░░░░░░░░░░░░░░░░░ 50%

// Simple bar
console.log('\n=== Simple Bar ===');
console.log(termstyle.bar(50, 100, { width: 20 }));
// ██████████░░░░░░░░░░

// Spinner
console.log('\n=== Spinner ===');
// Simple spinner
const spinner = termstyle.spinner('Loading...');
// spinner.start(); // Not starting to avoid hanging

// Custom spinner
const customSpinner = termstyle.spinner({
  text: 'Processing',
  spinner: 'dots2'
});
console.log('Spinners created (not started)');

// Animation
console.log('\n=== Animation ===');
// Note: animate returns an Animation instance
console.log('Animation feature available');

// Utilities
console.log('\n=== Utilities ===');
const styled = termstyle.red.bold('Styled text');
const plain = termstyle.strip(styled);
console.log('Original:', styled);
console.log('Stripped:', plain); // 'Styled text'

if (termstyle.supportsColor) {
  console.log(termstyle.green('Color supported!'));
}

console.log(`Color level: ${termstyle.level}`);

const info = termstyle.getTerminalInfo();
console.log('Terminal info:', info);

const myStyle = termstyle.create({ force: true });
console.log(myStyle.red('Forced red'));

// Conditional Formatting
console.log('\n=== Conditional Formatting ===');
const isError = true;
console.log(
  termstyle.conditional(isError).red('Error!')
);

// Chain with other methods
termstyle.conditional(process.env.DEBUG).gray('Debug info');

const logger = termstyle.createLogFormatter({
  timestamp: true,
  usePrefix: true
});

console.log(logger.info('Server started'));
console.log(logger.warn('Low memory'));
console.log(logger.error('Connection failed'));
console.log(logger.debug('Debug info'));

const status = termstyle.createStatusFormatter();
console.log(status.success('Tests passed'));
console.log(status.error('Build failed'));
console.log(status.warning('Deprecated'));
console.log(status.info('Version 1.0.0'));

// Templates
console.log('\n=== Templates ===');
const name = 'World';
console.log(termstyle.template`Hello ${name}!`);

// Template with styled values
const user = 'John';
const score = 95;
console.log(
  termstyle.template`User ${termstyle.green(user)} scored ${
    termstyle.yellow.bold(`${score}%`)
  }!`
);

// Themes
console.log('\n=== Themes ===');
const manager = new termstyle.ThemeManager();

// Set theme
manager.setTheme('dark');

// Register custom theme
manager.registerTheme('custom', {
  colors: {
    primary: '#007acc',
    success: '#4caf50',
    error: '#f44336'
  }
});

// Apply theme
const themed = manager.applyTheme();
console.log(themed.primary('Primary text'));

// Built-in themes
const themes = termstyle.themes;
console.log('Available themes:', Object.keys(themes));

// Method Chaining
console.log('\n=== Method Chaining ===');
// Chain styles
console.log(termstyle.red.bold('Bold red'));
console.log(termstyle.blue.underline.italic('Blue underlined italic'));

// Chain colors and backgrounds
console.log(termstyle.white.bgRed.bold('Alert!'));

// Chain with advanced colors
console.log(termstyle.hex('#ff6b35').bgHex('#4ecdc4').bold('Styled'));

// Complex chains
console.log(termstyle
  .red
  .bgYellow
  .bold
  .underline
  .italic('Complex styling'));

// Error Handling
console.log('\n=== Error Handling ===');
// Invalid inputs return original text or empty string
console.log(termstyle.hex('invalid')('text')); // Returns: 'text'
console.log(termstyle.rgb(-10, 300, 128)('text')); // Clamps values
console.log(termstyle.red(null)); // Returns styled 'null'
console.log(termstyle.red(undefined)); // Returns styled 'undefined'

// Performance Tips
console.log('\n=== Performance Tips ===');
const error = termstyle.red.bold;
for (let i = 0; i < 3; i++) {
  console.log(error(`Error ${i}`));
}

const debug = termstyle.conditional(process.env.DEBUG).gray;
debug('Debug message'); // Only styled if DEBUG is true

const styled2 = termstyle.red.bold('Hello');
const length = termstyle.strip(styled2).length; // 5
console.log('String length:', length);

console.log('\nAll API examples tested!');