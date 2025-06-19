# Examples

Comprehensive examples and usage patterns for @termstyle/core.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Color Examples](#color-examples)
- [Style Combinations](#style-combinations)
- [Advanced Features](#advanced-features)
- [Real-World Applications](#real-world-applications)
- [Performance Tips](#performance-tips)
- [Troubleshooting](#troubleshooting)

## Basic Usage

### Simple Colors

```javascript
import termstyle from '@termstyle/core';

// Basic foreground colors
console.log(termstyle.red('Error message'));
console.log(termstyle.green('Success message'));
console.log(termstyle.yellow('Warning message'));
console.log(termstyle.blue('Information'));

// Background colors
console.log(termstyle.bgRed.white('Alert'));
console.log(termstyle.bgGreen.black('Success'));
```

### Style Formatting

```javascript
// Text styles
console.log(termstyle.bold('Bold text'));
console.log(termstyle.italic('Italic text'));
console.log(termstyle.underline('Underlined text'));
console.log(termstyle.strikethrough('Crossed out'));

// Combined styles
console.log(termstyle.bold.underline.red('Important!'));
```

## Color Examples

### RGB Colors

```javascript
// RGB values (0-255)
console.log(termstyle.rgb(255, 0, 0)('Pure red'));
console.log(termstyle.rgb(0, 255, 0)('Pure green'));
console.log(termstyle.rgb(0, 0, 255)('Pure blue'));

// Orange color
console.log(termstyle.rgb(255, 165, 0)('Orange text'));

// Background RGB
console.log(termstyle.bgRgb(128, 0, 128).white('Purple background'));
```

### Hex Colors

```javascript
// Standard hex format
console.log(termstyle.hex('#ff0000')('Red'));
console.log(termstyle.hex('#00ff00')('Green'));
console.log(termstyle.hex('#0000ff')('Blue'));

// Short hex format
console.log(termstyle.hex('#f00')('Red'));
console.log(termstyle.hex('#0f0')('Green'));
console.log(termstyle.hex('#00f')('Blue'));

// Without hash
console.log(termstyle.hex('ff8000')('Orange'));

// Hex backgrounds
console.log(termstyle.bgHex('#1e90ff').white('Dodger blue bg'));
```

### HSL Colors

```javascript
// HSL format: Hue (0-360), Saturation (0-100), Lightness (0-100)
console.log(termstyle.hsl(0, 100, 50)('Red'));      // Pure red
console.log(termstyle.hsl(120, 100, 50)('Green'));  // Pure green
console.log(termstyle.hsl(240, 100, 50)('Blue'));   // Pure blue

// Pastel colors (high lightness, medium saturation)
console.log(termstyle.hsl(0, 70, 80)('Pastel red'));
console.log(termstyle.hsl(120, 70, 80)('Pastel green'));
console.log(termstyle.hsl(240, 70, 80)('Pastel blue'));

// Dark colors (low lightness)
console.log(termstyle.hsl(0, 100, 25)('Dark red'));
console.log(termstyle.hsl(120, 100, 25)('Dark green'));
```

## Style Combinations

### Chaining Styles

```javascript
// Multiple style chaining
console.log(termstyle.red.bold.underline('Triple style'));
console.log(termstyle.bgBlue.white.italic('Background + style'));
console.log(termstyle.green.bold.bgYellow.black('Complex combo'));

// Order doesn't matter for most styles
console.log(termstyle.bold.red.underline('Same as above'));
console.log(termstyle.underline.bold.red('Same as above'));
```

### Nested Styling

```javascript
// Styles can be nested
const error = termstyle.red.bold;
const highlight = termstyle.yellow.bgBlack;

console.log(error(`Error: ${highlight('file.txt')} not found`));
```

## Advanced Features

### Gradients

```javascript
// Simple two-color gradient
console.log(termstyle.gradient(['red', 'blue'], 'Gradient text'));

// Multi-color gradient
console.log(termstyle.gradient([
  '#ff0000', '#ff8000', '#ffff00', '#00ff00', '#0000ff', '#8000ff'
], 'Rainbow gradient'));

// RGB array gradient
console.log(termstyle.gradientRgb([
  [255, 0, 0],    // Red
  [255, 255, 0],  // Yellow
  [0, 255, 0]     // Green
], 'Traffic light colors'));

// Gradient function
const fireGradient = termstyle.gradient(['#ff0000', '#ff8000', '#ffff00']);
console.log(fireGradient('Fire colors'));
```

### Animations

#### Spinners

```javascript
// Basic spinner
const spinner = termstyle.spinner('dots');
spinner.start('Loading...');
setTimeout(() => spinner.stop(), 3000);

// Different spinner types
const lineSpinner = termstyle.spinner('line');
lineSpinner.start('Processing');
setTimeout(() => lineSpinner.succeed('Complete!'), 2000);

// Custom completion
const taskSpinner = termstyle.spinner('arrow');
taskSpinner.start('Downloading file...');
setTimeout(() => {
  try {
    // Simulate task
    taskSpinner.succeed('File downloaded successfully');
  } catch (error) {
    taskSpinner.fail('Download failed');
  }
}, 3000);
```

#### Typewriter Effect

```javascript
// Basic typewriter
await termstyle.typewriter('Hello, World!');

// Custom speed
await termstyle.typewriter('Slow typing...', { speed: 200 });
await termstyle.typewriter('Fast typing!', { speed: 30 });

// Custom cursor
await termstyle.typewriter('Custom cursor', { 
  cursor: '_',
  cursorBlink: false 
});

// Chain with other effects
const text = termstyle.green.bold('Success message');
await termstyle.typewriter(text, { speed: 50 });
```

### Progress Bars

```javascript
// Basic progress bar
const progress = termstyle.progressBar();
for (let i = 0; i <= 100; i += 5) {
  progress.update(i);
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Custom progress bar
const customProgress = termstyle.progressBar({
  width: 50,
  complete: '●',
  incomplete: '○',
  format: ':bar :percent (:current/:total)'
});

// File download simulation
for (let downloaded = 0; downloaded <= 1000; downloaded += 50) {
  const percent = (downloaded / 1000) * 100;
  customProgress.update(percent);
  await new Promise(resolve => setTimeout(resolve, 100));
}
customProgress.complete();
```

### Box Drawing

```javascript
// Simple box
console.log(termstyle.box('Hello World!'));

// Styled box
console.log(termstyle.box('Important Notice', {
  padding: 1,
  borderStyle: 'double',
  borderColor: 'red'
}));

// Complex box with title
console.log(termstyle.box(`
Welcome to TermStyle!

This is a demo of the box drawing feature.
You can customize borders, colors, and layout.
`, {
  padding: [1, 2],
  margin: 1,
  borderStyle: 'round',
  borderColor: 'blue',
  title: '🎨 TermStyle Demo',
  titleAlignment: 'center',
  width: 50,
  textAlignment: 'center'
}));

// Warning box
console.log(termstyle.box('⚠️  This action cannot be undone!', {
  padding: 1,
  borderStyle: 'bold',
  borderColor: 'yellow',
  backgroundColor: 'bgBlack'
}));
```

### Template Literals

```javascript
// Basic template usage
const name = 'Alice';
const status = 'online';
const message = termstyle`
User: ${termstyle.blue.bold(name)}
Status: ${termstyle.green(status)}
Last seen: ${termstyle.dim('2 minutes ago')}
`;
console.log(message);

// Complex template with conditions
function userCard(user) {
  const statusColor = user.online ? termstyle.green : termstyle.red;
  const roleColor = user.role === 'admin' ? termstyle.yellow : termstyle.white;
  
  return termstyle`
${termstyle.bold('User Profile')}
────────────────
Name: ${termstyle.cyan(user.name)}
Role: ${roleColor(user.role)}
Status: ${statusColor(user.online ? 'Online' : 'Offline')}
${user.premium ? termstyle.gold('⭐ Premium Member') : ''}
  `;
}

console.log(userCard({
  name: 'John Doe',
  role: 'admin',
  online: true,
  premium: true
}));
```

### Conditional Formatting

```javascript
// Log level formatting
function logMessage(level, message) {
  const formatter = termstyle.conditional(level, {
    error: termstyle.red.bold,
    warn: termstyle.yellow,
    info: termstyle.blue,
    debug: termstyle.gray,
    success: termstyle.green
  }, termstyle.white);
  
  const timestamp = termstyle.dim(new Date().toISOString());
  const levelText = formatter(level.toUpperCase().padEnd(7));
  
  console.log(`${timestamp} ${levelText} ${message}`);
}

logMessage('error', 'Database connection failed');
logMessage('warn', 'Deprecated API usage detected');
logMessage('info', 'Server started on port 3000');
logMessage('success', 'All tests passed');

// Status-based formatting
function displayStatus(status, message) {
  const styles = {
    pending: termstyle.yellow,
    running: termstyle.blue.bold,
    success: termstyle.green.bold,
    failed: termstyle.red.bold,
    cancelled: termstyle.gray
  };
  
  const icon = {
    pending: '⏳',
    running: '🔄',
    success: '✅',
    failed: '❌',
    cancelled: '🚫'
  };
  
  const formatter = termstyle.conditional(status, styles, termstyle.white);
  console.log(`${icon[status]} ${formatter(message)}`);
}

displayStatus('pending', 'Task queued');
displayStatus('running', 'Processing data...');
displayStatus('success', 'Task completed');
displayStatus('failed', 'Task failed with errors');
```

## Real-World Applications

### CLI Application

```javascript
#!/usr/bin/env node
import termstyle from '@termstyle/core';

class CLIApp {
  constructor() {
    this.name = 'MyApp';
    this.version = '1.0.0';
  }
  
  showHeader() {
    console.log(termstyle.box(termstyle`
${termstyle.bold.blue(this.name)} ${termstyle.dim(`v${this.version}`)}
${termstyle.italic('A powerful CLI tool')}
    `, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'blue'
    }));
  }
  
  showMenu() {
    console.log(termstyle`
${termstyle.bold('Available Commands:')}

  ${termstyle.green('start')}     Start the application
  ${termstyle.yellow('config')}    Configure settings
  ${termstyle.blue('status')}    Show current status
  ${termstyle.red('stop')}      Stop the application
  ${termstyle.gray('help')}      Show this help message
    `);
  }
  
  async processCommand(command) {
    const spinner = termstyle.spinner('dots');
    
    switch (command) {
      case 'start':
        spinner.start('Starting application...');
        await this.simulateTask(2000);
        spinner.succeed('Application started successfully');
        break;
        
      case 'stop':
        spinner.start('Stopping application...');
        await this.simulateTask(1000);
        spinner.succeed('Application stopped');
        break;
        
      case 'config':
        this.showConfig();
        break;
        
      case 'status':
        this.showStatus();
        break;
        
      default:
        console.log(termstyle.red(`Unknown command: ${command}`));
        this.showMenu();
    }
  }
  
  showConfig() {
    console.log(termstyle.box(termstyle`
${termstyle.bold('Configuration')}

Database: ${termstyle.green('Connected')}
Cache: ${termstyle.yellow('Enabled')}
Debug: ${termstyle.red('Disabled')}
Port: ${termstyle.blue('3000')}
    `, {
      padding: 1,
      borderStyle: 'single',
      title: '⚙️ Settings'
    }));
  }
  
  showStatus() {
    const uptime = '2h 34m';
    const memory = '145 MB';
    const cpu = '12%';
    
    console.log(termstyle`
${termstyle.bold('System Status')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${termstyle.green('●')} Status:     ${termstyle.green('Running')}
⏱️  Uptime:     ${termstyle.blue(uptime)}
🧠 Memory:     ${termstyle.yellow(memory)}
⚡ CPU:        ${termstyle.cyan(cpu)}

${termstyle.dim('Last updated: ' + new Date().toLocaleTimeString())}
    `);
  }
  
  simulateTask(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }
}

// Usage
const app = new CLIApp();
app.showHeader();
app.showMenu();
```

### Logger System

```javascript
class Logger {
  constructor(options = {}) {
    this.showTimestamp = options.timestamp !== false;
    this.colorize = options.color !== false;
  }
  
  log(level, message, data = null) {
    const timestamp = this.showTimestamp 
      ? termstyle.dim(`[${new Date().toISOString()}]`)
      : '';
    
    const formattedLevel = this.formatLevel(level);
    const formattedMessage = this.colorize ? message : termstyle.strip(message);
    
    let output = `${timestamp} ${formattedLevel} ${formattedMessage}`;
    
    if (data) {
      output += '\n' + termstyle.dim(JSON.stringify(data, null, 2));
    }
    
    console.log(output);
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
  
  error(message, data) { this.log('ERROR', message, data); }
  warn(message, data) { this.log('WARN', message, data); }
  info(message, data) { this.log('INFO', message, data); }
  debug(message, data) { this.log('DEBUG', message, data); }
  trace(message, data) { this.log('TRACE', message, data); }
}

// Usage
const logger = new Logger();
logger.error('Database connection failed', { host: 'localhost', port: 5432 });
logger.warn('API rate limit approaching');
logger.info('Server started successfully');
logger.debug('Processing user request', { userId: 123, action: 'login' });
```

### Test Runner Output

```javascript
class TestRunner {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
  }
  
  async runTest(testName, testFn) {
    const spinner = termstyle.spinner('dots');
    spinner.start(`Running ${testName}`);
    
    try {
      await testFn();
      this.passed++;
      spinner.succeed(termstyle.green(`✓ ${testName}`));
    } catch (error) {
      this.failed++;
      spinner.fail(termstyle.red(`✗ ${testName}`));
      console.log(termstyle.dim(`  ${error.message}`));
    }
  }
  
  skip(testName, reason) {
    this.skipped++;
    console.log(termstyle.yellow(`⊝ ${testName} ${termstyle.dim(`(${reason})`)}`));
  }
  
  showSummary() {
    const total = this.passed + this.failed + this.skipped;
    
    console.log('\n' + termstyle.box(termstyle`
${termstyle.bold('Test Results')}

${termstyle.green('Passed:')}  ${this.passed}/${total}
${termstyle.red('Failed:')}  ${this.failed}/${total}
${termstyle.yellow('Skipped:')} ${this.skipped}/${total}

${this.failed === 0 
  ? termstyle.green.bold('All tests passed! 🎉') 
  : termstyle.red.bold(`${this.failed} test(s) failed`)
}
    `, {
      padding: 1,
      borderStyle: this.failed === 0 ? 'round' : 'single',
      borderColor: this.failed === 0 ? 'green' : 'red'
    }));
  }
}

// Usage
const runner = new TestRunner();

await runner.runTest('User authentication', async () => {
  // Test implementation
  await new Promise(resolve => setTimeout(resolve, 500));
});

await runner.runTest('Database operations', async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
});

runner.skip('Integration tests', 'Database not available');

runner.showSummary();
```

## Performance Tips

### Efficient Color Usage

```javascript
// ✅ Good: Create style functions once and reuse
const errorStyle = termstyle.red.bold;
const successStyle = termstyle.green;

for (let i = 0; i < 1000; i++) {
  console.log(errorStyle('Error message'));
  console.log(successStyle('Success message'));
}

// ❌ Avoid: Creating styles repeatedly
for (let i = 0; i < 1000; i++) {
  console.log(termstyle.red.bold('Error message'));
  console.log(termstyle.green('Success message'));
}
```

### Caching for Performance

```javascript
// Enable caching for repeated operations
termstyle.configure({ cache: true });

// Cache style combinations
const styleCache = new Map();

function getStyle(type) {
  if (!styleCache.has(type)) {
    const styles = {
      error: termstyle.red.bold,
      warning: termstyle.yellow,
      info: termstyle.blue,
      success: termstyle.green
    };
    styleCache.set(type, styles[type] || termstyle.white);
  }
  return styleCache.get(type);
}

// Use cached styles
console.log(getStyle('error')('Error message'));
console.log(getStyle('success')('Success message'));
```

### Memory Management

```javascript
// For high-frequency operations, consider manual cleanup
const styles = [];

// Create many styles
for (let i = 0; i < 10000; i++) {
  styles.push(termstyle.rgb(i % 255, 100, 200));
}

// Clear when done
styles.length = 0;

// Or use the built-in memory management
termstyle.configure({
  performance: {
    enableCaching: true,
    cacheSize: 1000  // Limit cache size
  }
});
```

## Troubleshooting

### Color Support Issues

```javascript
// Check color support
console.log('Color support:', termstyle.supports.level);
console.log('True color:', termstyle.supports.trueColor);

// Force color mode if needed
termstyle.configure({ colorMode: 'force' });

// Disable colors for piping
if (!process.stdout.isTTY) {
  termstyle.configure({ colorMode: 'disable' });
}
```

### Environment Detection

```javascript
// Debug environment information
console.log('Environment info:', termstyle.env);

// Platform-specific handling
if (termstyle.env.platform === 'win32') {
  // Windows-specific code
} else {
  // Unix-like systems
}

// Terminal-specific features
if (termstyle.env.terminal.includes('iTerm')) {
  // iTerm2-specific features
}
```

### Performance Debugging

```javascript
// Enable performance profiling
termstyle.configure({
  performance: {
    enableProfiling: true
  }
});

// Measure performance
console.time('styling');
for (let i = 0; i < 1000; i++) {
  termstyle.gradient(['red', 'blue'], 'Gradient text');
}
console.timeEnd('styling');
```

### Common Patterns

```javascript
// Pattern: Conditional styling based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const logStyle = isDevelopment ? termstyle.dim : termstyle.white;

// Pattern: Graceful degradation
function safeStyle(style, text) {
  try {
    return style(text);
  } catch (error) {
    return text; // Fallback to plain text
  }
}

// Pattern: Style composition
const compose = (...styles) => (text) => {
  return styles.reduce((result, style) => style(result), text);
};

const errorHighlight = compose(
  termstyle.red,
  termstyle.bold,
  termstyle.underline
);

console.log(errorHighlight('Critical Error'));
```

---

For more advanced usage and API details, see [API.md](./API.md).