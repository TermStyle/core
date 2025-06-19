const termstyle = require('../dist/index.js').default;

console.log('Testing EXAMPLES.md examples...\n');

// Basic Usage - Simple Colors
console.log('=== Basic Usage - Simple Colors ===');
console.log(termstyle.red('Error message'));
console.log(termstyle.green('Success message'));
console.log(termstyle.yellow('Warning message'));
console.log(termstyle.blue('Information'));
console.log(termstyle.bgRed.white('Alert'));
console.log(termstyle.bgGreen.black('Success'));

// Style Formatting
console.log('\n=== Style Formatting ===');
console.log(termstyle.bold('Bold text'));
console.log(termstyle.italic('Italic text'));
console.log(termstyle.underline('Underlined text'));
console.log(termstyle.strikethrough('Crossed out'));
console.log(termstyle.bold.underline.red('Important!'));

// RGB Colors
console.log('\n=== RGB Colors ===');
console.log(termstyle.rgb(255, 0, 0)('Pure red'));
console.log(termstyle.rgb(0, 255, 0)('Pure green'));
console.log(termstyle.rgb(0, 0, 255)('Pure blue'));
console.log(termstyle.rgb(255, 165, 0)('Orange text'));
console.log(termstyle.bgRgb(128, 0, 128).white('Purple background'));

// Hex Colors
console.log('\n=== Hex Colors ===');
console.log(termstyle.hex('#ff0000')('Red'));
console.log(termstyle.hex('#00ff00')('Green'));
console.log(termstyle.hex('#0000ff')('Blue'));
console.log(termstyle.hex('#f00')('Red'));
console.log(termstyle.hex('#0f0')('Green'));
console.log(termstyle.hex('#00f')('Blue'));
console.log(termstyle.hex('ff8000')('Orange'));
console.log(termstyle.bgHex('#1e90ff').white('Dodger blue bg'));

// ANSI 256 Colors
console.log('\n=== ANSI 256 Colors ===');
console.log(termstyle.color(196)('ANSI red'));
console.log(termstyle.color(46)('ANSI green'));
console.log(termstyle.color(21)('ANSI blue'));
console.log(termstyle.color(208)('ANSI orange'));
console.log(termstyle.bgColor(196)('Text on ANSI red'));
console.log(termstyle.bgColor(46)('Text on ANSI green'));
console.log(termstyle.color([255, 0, 0])('RGB red'));
console.log(termstyle.color([0, 255, 0])('RGB green'));

// Style Combinations - Chaining Styles
console.log('\n=== Style Combinations - Chaining Styles ===');
console.log(termstyle.red.bold.underline('Triple style'));
console.log(termstyle.bgBlue.white.italic('Background + style'));
console.log(termstyle.green.bold.bgYellow.black('Complex combo'));
console.log(termstyle.bold.red.underline('Same as above'));
console.log(termstyle.underline.bold.red('Same as above'));

// Nested Styling
console.log('\n=== Nested Styling ===');
const error = termstyle.red.bold;
const highlight = termstyle.yellow.bgBlack;
console.log(error(`Error: ${highlight('file.txt')} not found`));

// Advanced Features - Gradients
console.log('\n=== Advanced Features - Gradients ===');
console.log(termstyle.rainbow('Rainbow colored text'));
console.log(termstyle.gradient('Gradient text', ['red', 'yellow', 'green']));
console.log(termstyle.gradient('Smooth gradient', ['#ff0000', '#00ff00', '#0000ff']));
console.log(termstyle.gradient('RGB gradient', [[255,0,0], [0,255,0], [0,0,255]]));

// Animations - Spinners
console.log('\n=== Animations - Spinners ===');
const spinner = termstyle.spinner('Loading...');
// spinner.start(); // Not starting to avoid hanging
console.log('Basic spinner created');

const customSpinner = termstyle.spinner({
  text: 'Processing',
  spinner: 'dots2'
});
// customSpinner.start(); // Not starting to avoid hanging
console.log('Custom spinner created');

// Animations
console.log('\n=== Animations ===');
const blink = termstyle.animate('Blinking text', 'blink', {
  duration: 3000,
  interval: 500
});
// blink.start(); // Not starting to avoid hanging

const pulse = termstyle.animate('Pulsing text', 'pulse', {
  duration: 2000,
  interval: 100
});
// pulse.start(); // Not starting to avoid hanging
console.log('Animations created');

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

progressBar.tick(25);
console.log(progressBar.render());

console.log(termstyle.bar(50, 100, { width: 20 }));

progressBar.complete();

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

console.log(termstyle.box('Welcome to TermStyle!\\n\\nThis is a demo of the box drawing feature.\\nYou can customize borders, colors, and layout.', {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'blue',
  title: '🎨 TermStyle Demo',
  titleAlignment: 'center',
  width: 50,
  align: 'center'
}));

console.log(termstyle.box('⚠️  This action cannot be undone!', {
  padding: 1,
  borderStyle: 'bold',
  borderColor: 'yellow'
}));

// Template Literals
console.log('\n=== Template Literals ===');
const name = 'Alice';
const status = 'online';
console.log(termstyle.template`
User: ${termstyle.blue.bold(name)}
Status: ${termstyle.green(status)}
Last seen: ${termstyle.dim('2 minutes ago')}
`);

function userCard(user) {
  const statusColor = user.online ? termstyle.green : termstyle.red;
  const roleColor = user.role === 'admin' ? termstyle.yellow : termstyle.white;
  
  return termstyle.template`
${termstyle.bold('User Profile')}
────────────────
Name: ${termstyle.cyan(user.name)}
Role: ${roleColor(user.role)}
Status: ${statusColor(user.online ? 'Online' : 'Offline')}
${user.premium ? termstyle.yellow('⭐ Premium Member') : ''}
  `;
}

console.log(userCard({
  name: 'John Doe',
  role: 'admin',
  online: true,
  premium: true
}));

// Conditional Formatting
console.log('\n=== Conditional Formatting ===');
const isError = true;
console.log(
  termstyle.conditional(isError).red('Error occurred')
);

const status2 = termstyle.createStatusFormatter();
console.log(status2.success('Operation completed'));
console.log(status2.error('Operation failed'));
console.log(status2.warning('Please review'));
console.log(status2.info('For your information'));

const logger = termstyle.createLogFormatter({
  timestamp: true,
  usePrefix: true
});

console.log(logger.info('Server started'));
console.log(logger.warn('Low memory'));
console.log(logger.error('Connection failed'));
console.log(logger.debug('Debug info'));

// Real-World Applications - CLI Application
console.log('\n=== Real-World Applications - CLI Application ===');
class CLIApp {
  constructor() {
    this.name = 'MyApp';
    this.version = '1.0.0';
  }
  
  showHeader() {
    console.log(termstyle.box(`${termstyle.bold.blue(this.name)} ${termstyle.dim(`v${this.version}`)}\\n${termstyle.italic('A powerful CLI tool')}`, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'blue'
    }));
  }
  
  showMenu() {
    console.log(`
${termstyle.bold('Available Commands:')}

  ${termstyle.green('start')}     Start the application
  ${termstyle.yellow('config')}    Configure settings
  ${termstyle.blue('status')}    Show current status
  ${termstyle.red('stop')}      Stop the application
  ${termstyle.gray('help')}      Show this help message
    `);
  }
  
  showConfig() {
    console.log(termstyle.box(`${termstyle.bold('Configuration')}\\n\\nDatabase: ${termstyle.green('Connected')}\\nCache: ${termstyle.yellow('Enabled')}\\nDebug: ${termstyle.red('Disabled')}\\nPort: ${termstyle.blue('3000')}`, {
      padding: 1,
      borderStyle: 'single',
      title: '⚙️ Settings'
    }));
  }
  
  showStatus() {
    const uptime = '2h 34m';
    const memory = '145 MB';
    const cpu = '12%';
    
    console.log(`
${termstyle.bold('System Status')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${termstyle.green('●')} Status:     ${termstyle.green('Running')}
⏱️  Uptime:     ${termstyle.blue(uptime)}
🧠 Memory:     ${termstyle.yellow(memory)}
⚡ CPU:        ${termstyle.cyan(cpu)}

${termstyle.dim('Last updated: ' + new Date().toLocaleTimeString())}
    `);
  }
}

const app = new CLIApp();
app.showHeader();
app.showMenu();

// Logger System (abbreviated)
console.log('\n=== Logger System ===');
class Logger {
  constructor(options = {}) {
    this.showTimestamp = options.timestamp !== false;
    this.colorize = options.color !== false;
  }
  
  formatLevel(level) {
    const styles = {
      ERROR: termstyle.red.bold.bgWhite,
      WARN:  termstyle.black.bold.bgYellow,
      INFO:  termstyle.white.bold.bgBlue,
      DEBUG: termstyle.gray,
      TRACE: termstyle.dim
    };
    
    const style = styles[level] || termstyle.white;
    return style(` ${level.padEnd(5)} `);
  }
  
  log(level, message, data = null) {
    const timestamp = this.showTimestamp 
      ? termstyle.dim(`[${new Date().toISOString()}]`)
      : '';
    
    const formattedLevel = this.formatLevel(level);
    const formattedMessage = this.colorize ? message : termstyle.strip(message);
    
    let output = `${timestamp} ${formattedLevel} ${formattedMessage}`;
    
    if (data) {
      output += '\\n' + termstyle.dim(JSON.stringify(data, null, 2));
    }
    
    console.log(output);
  }
  
  error(message, data) { this.log('ERROR', message, data); }
  warn(message, data) { this.log('WARN', message, data); }
  info(message, data) { this.log('INFO', message, data); }
  debug(message, data) { this.log('DEBUG', message, data); }
  trace(message, data) { this.log('TRACE', message, data); }
}

const logger2 = new Logger();
logger2.error('Database connection failed', { host: 'localhost', port: 5432 });
logger2.warn('API rate limit approaching');
logger2.info('Server started successfully');

// Performance Tips
console.log('\n=== Performance Tips ===');
const errorStyle = termstyle.red.bold;
const successStyle = termstyle.green;

for (let i = 0; i < 3; i++) {
  console.log(errorStyle('Error message'));
  console.log(successStyle('Success message'));
}

// Using Themes
console.log('\n=== Using Themes ===');
const themeManager = new termstyle.ThemeManager();
themeManager.setTheme('dark');
themeManager.registerTheme('custom', {
  colors: {
    primary: '#007acc',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800'
  }
});

const themed = themeManager.applyTheme();
console.log(themed.primary('Primary text'));
console.log(themed.success('Success message'));

// Terminal Information
console.log('\n=== Terminal Information ===');
console.log('Color support:', termstyle.supportsColor);
console.log('Color level:', termstyle.level);

const info = termstyle.getTerminalInfo();
console.log('Terminal info:', info);

const styled = termstyle.red.bold('Styled text');
const plain = termstyle.strip(styled);
console.log('Styled:', styled);
console.log('Plain:', plain);

console.log('\nAll EXAMPLES.md examples tested!');