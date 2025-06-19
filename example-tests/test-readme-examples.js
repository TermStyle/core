const termstyle = require('../dist/index.js').default;

console.log('Testing README.md examples...\n');

// Basic colors
console.log('=== Basic Colors ===');
console.log(termstyle.red('Error message'));
console.log(termstyle.green('Success message'));
console.log(termstyle.blue('Info message'));

// Styles
console.log('\n=== Styles ===');
console.log(termstyle.bold('Bold text'));
console.log(termstyle.italic('Italic text'));
console.log(termstyle.underline('Underlined text'));

// Chaining
console.log('\n=== Chaining ===');
console.log(termstyle.red.bold('Bold red text'));
console.log(termstyle.blue.underline.italic('Blue underlined italic'));

// Background colors
console.log('\n=== Background Colors ===');
console.log(termstyle.bgRed.white('White text on red background'));
console.log(termstyle.bgGreen.black('Black text on green background'));

// Basic Colors section
console.log('\n=== Basic Colors (Full List) ===');
console.log(termstyle.black('Black text'));
console.log(termstyle.red('Red text'));
console.log(termstyle.green('Green text'));
console.log(termstyle.yellow('Yellow text'));
console.log(termstyle.blue('Blue text'));
console.log(termstyle.magenta('Magenta text'));
console.log(termstyle.cyan('Cyan text'));
console.log(termstyle.white('White text'));
console.log(termstyle.gray('Gray text'));

// Background colors (Full List)
console.log('\n=== Background Colors (Full List) ===');
console.log(termstyle.bgBlack('Text on black background'));
console.log(termstyle.bgRed('Text on red background'));
console.log(termstyle.bgGreen('Text on green background'));
console.log(termstyle.bgYellow('Text on yellow background'));
console.log(termstyle.bgBlue('Text on blue background'));
console.log(termstyle.bgMagenta('Text on magenta background'));
console.log(termstyle.bgCyan('Text on cyan background'));
console.log(termstyle.bgWhite('Text on white background'));
console.log(termstyle.bgGray('Text on gray background'));

// Advanced Colors
console.log('\n=== Advanced Colors ===');
console.log(termstyle.hex('#ff6b35')('Orange text'));
console.log(termstyle.bgHex('#4ecdc4')('Text on teal background'));
console.log(termstyle.rgb(255, 107, 53)('RGB orange text'));
console.log(termstyle.bgRgb(78, 205, 196)('Text on RGB teal background'));
console.log(termstyle.color(196)('ANSI 256 red'));
console.log(termstyle.bgColor(46)('Text on ANSI 256 green background'));

// Text Styles
console.log('\n=== Text Styles ===');
console.log(termstyle.bold('Bold text'));
console.log(termstyle.dim('Dim text'));
console.log(termstyle.italic('Italic text'));
console.log(termstyle.underline('Underlined text'));
console.log(termstyle.inverse('Inverse text'));
console.log(termstyle.hidden('Hidden text'));
console.log(termstyle.strikethrough('Strikethrough text'));
console.log(termstyle.bold.italic.underline('Bold, italic, and underlined'));
console.log(termstyle.red.bgYellow.bold('Bold red text on yellow background'));

// Special Effects
console.log('\n=== Special Effects ===');

// Rainbow gradient
console.log(termstyle.rainbow('Rainbow colored text'));

// Custom gradient
console.log(termstyle.gradient('Gradient text', ['red', 'yellow', 'green']));

// Hex gradient
console.log(termstyle.gradient('Smooth gradient', ['#ff0000', '#00ff00', '#0000ff']));

// Box Drawing
console.log('\n=== Box Drawing ===');
console.log(termstyle.box('Hello World'));

console.log(termstyle.box('Important Message', {
  padding: 1,
  margin: 1,
  borderStyle: 'double',
  borderColor: 'blue',
  align: 'center'
}));

// Progress Bars
console.log('\n=== Progress Bars ===');
const progressBar = termstyle.progressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

progressBar.update(25);
console.log(progressBar.render());

// Simple progress bar
console.log(termstyle.bar(50, 100, { width: 20 }));

// Spinners (just create, don't start to avoid hanging)
console.log('\n=== Spinners ===');
const spinner = termstyle.spinner('Loading...');
console.log('Spinner created (not started to avoid hanging)');

const customSpinner = termstyle.spinner({
  text: 'Loading',
  spinner: 'dots2'
});
console.log('Custom spinner created');

// Conditional Formatting
console.log('\n=== Conditional Formatting ===');
const isError = true;
console.log(
  termstyle.conditional(isError).red('Error occurred')
);

// Status formatters
const status = termstyle.createStatusFormatter();
console.log(status.success('Operation completed'));
console.log(status.error('Operation failed'));
console.log(status.warning('Please review'));
console.log(status.info('For your information'));

// Template Literals
console.log('\n=== Template Literals ===');
const name = 'World';
console.log(termstyle.template`Hello ${name}!`);

const user = 'John';
const score = 95;
console.log(
  termstyle.template`User ${termstyle.green(user)} achieved ${
    termstyle.yellow.bold(`${score}%`)
  } success rate!`
);

// Themes
console.log('\n=== Themes ===');
const themes = termstyle.themes;
console.log('Available themes:', themes);

const customTheme = new termstyle.ThemeManager();
// Note: Testing theme methods that actually exist

// Utilities
console.log('\n=== Utilities ===');
const styled = termstyle.red.bold('Styled text');
const plain = termstyle.strip(styled);
console.log('Original:', styled);
console.log('Stripped:', plain);

console.log('Supports color:', termstyle.supportsColor);
console.log('Color level:', termstyle.level);

const info = termstyle.getTerminalInfo();
console.log('Terminal info:', info);

// Advanced Usage
console.log('\n=== Advanced Usage ===');
const myStyle = termstyle.create({ force: true });
console.log('Created custom formatter');

const logger = termstyle.createLogFormatter({
  timestamp: true,
  usePrefix: true
});

console.log(logger.info('Information message'));
console.log(logger.warn('Warning message'));
console.log(logger.error('Error message'));
console.log(logger.debug('Debug message'));

// Method Chaining
console.log('\n=== Method Chaining ===');
console.log(termstyle
  .red
  .bgYellow
  .bold
  .underline
  .italic('Complex styled text'));

// Conditional returns a styled string, not a chainable object
const conditionalError = termstyle.conditional(true).red('Production error!');
console.log(conditionalError);

// Performance
console.log('\n=== Performance ===');
const styled2 = termstyle.red.bold;
for (let i = 0; i < 3; i++) {
  console.log(styled2(`Item ${i}`));
}

console.log('\nAll README examples tested!');