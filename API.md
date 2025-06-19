# API Reference

Complete API documentation for @termstyle/core.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Color Methods](#color-methods)
- [Style Methods](#style-methods)
- [Advanced Features](#advanced-features)
- [Utility Methods](#utility-methods)
- [Configuration](#configuration)
- [Types](#types)

## Installation

```bash
npm install @termstyle/core
```

## Basic Usage

```typescript
import termstyle from '@termstyle/core';

// Default import provides the main formatter
const styled = termstyle.red('Hello World');
console.log(styled);
```

## Color Methods

### Basic Colors

#### Foreground Colors

| Method | Description | Example |
|--------|-------------|---------|
| `black(text)` | Apply black color | `termstyle.black('text')` |
| `red(text)` | Apply red color | `termstyle.red('text')` |
| `green(text)` | Apply green color | `termstyle.green('text')` |
| `yellow(text)` | Apply yellow color | `termstyle.yellow('text')` |
| `blue(text)` | Apply blue color | `termstyle.blue('text')` |
| `magenta(text)` | Apply magenta color | `termstyle.magenta('text')` |
| `cyan(text)` | Apply cyan color | `termstyle.cyan('text')` |
| `white(text)` | Apply white color | `termstyle.white('text')` |
| `gray(text)` | Apply gray color | `termstyle.gray('text')` |
| `grey(text)` | Apply grey color (alias) | `termstyle.grey('text')` |

#### Background Colors

| Method | Description | Example |
|--------|-------------|---------|
| `bgBlack(text)` | Apply black background | `termstyle.bgBlack('text')` |
| `bgRed(text)` | Apply red background | `termstyle.bgRed('text')` |
| `bgGreen(text)` | Apply green background | `termstyle.bgGreen('text')` |
| `bgYellow(text)` | Apply yellow background | `termstyle.bgYellow('text')` |
| `bgBlue(text)` | Apply blue background | `termstyle.bgBlue('text')` |
| `bgMagenta(text)` | Apply magenta background | `termstyle.bgMagenta('text')` |
| `bgCyan(text)` | Apply cyan background | `termstyle.bgCyan('text')` |
| `bgWhite(text)` | Apply white background | `termstyle.bgWhite('text')` |

### Advanced Colors

#### RGB Colors

```typescript
termstyle.rgb(r: number, g: number, b: number): StyleFunction
termstyle.bgRgb(r: number, g: number, b: number): StyleFunction
```

**Parameters:**
- `r` (number): Red component (0-255)
- `g` (number): Green component (0-255)  
- `b` (number): Blue component (0-255)

**Example:**
```typescript
termstyle.rgb(255, 128, 0)('Orange text')
termstyle.bgRgb(255, 0, 255)('Purple background')
```

#### Hex Colors

```typescript
termstyle.hex(color: string): StyleFunction
termstyle.bgHex(color: string): StyleFunction
```

**Parameters:**
- `color` (string): Hex color code (e.g., '#ff0000', '#f00', 'ff0000')

**Example:**
```typescript
termstyle.hex('#ff8000')('Orange text')
termstyle.bgHex('#00ff00')('Green background')
```

#### HSL Colors

```typescript
termstyle.hsl(h: number, s: number, l: number): StyleFunction
termstyle.bgHsl(h: number, s: number, l: number): StyleFunction
```

**Parameters:**
- `h` (number): Hue (0-360)
- `s` (number): Saturation (0-100)
- `l` (number): Lightness (0-100)

**Example:**
```typescript
termstyle.hsl(120, 100, 50)('Pure green')
termstyle.bgHsl(240, 100, 50)('Blue background')
```

## Style Methods

| Method | Description | ANSI Code | Example |
|--------|-------------|-----------|---------|
| `bold(text)` | Bold text | `1` | `termstyle.bold('text')` |
| `dim(text)` | Dimmed text | `2` | `termstyle.dim('text')` |
| `italic(text)` | Italic text | `3` | `termstyle.italic('text')` |
| `underline(text)` | Underlined text | `4` | `termstyle.underline('text')` |
| `blink(text)` | Blinking text | `5` | `termstyle.blink('text')` |
| `inverse(text)` | Inverted colors | `7` | `termstyle.inverse('text')` |
| `hidden(text)` | Hidden text | `8` | `termstyle.hidden('text')` |
| `strikethrough(text)` | Strikethrough text | `9` | `termstyle.strikethrough('text')` |

## Advanced Features

### Gradients

#### Linear Gradients

```typescript
termstyle.gradient(colors: string[], text?: string): StyleFunction | string
```

**Parameters:**
- `colors` (string[]): Array of color values (hex, rgb, color names)
- `text` (string, optional): Text to apply gradient to

**Example:**
```typescript
// Function form
const gradientFn = termstyle.gradient(['#ff0000', '#00ff00', '#0000ff']);
console.log(gradientFn('Rainbow text'));

// Direct form
console.log(termstyle.gradient(['red', 'yellow', 'green'], 'Gradient text'));
```

#### RGB Gradients

```typescript
termstyle.gradientRgb(colors: RGB[], text?: string): StyleFunction | string
```

**Parameters:**
- `colors` (RGB[]): Array of RGB color arrays `[r, g, b]`
- `text` (string, optional): Text to apply gradient to

**Example:**
```typescript
termstyle.gradientRgb([[255,0,0], [0,255,0], [0,0,255]], 'RGB gradient');
```

### Animations

#### Spinner

```typescript
termstyle.spinner(type?: SpinnerType): Spinner
```

**Spinner Types:**
- `'dots'` (default)
- `'line'`
- `'arrow'`
- `'bounce'`
- `'clock'`

**Example:**
```typescript
const spinner = termstyle.spinner('dots');
spinner.start('Loading...');
setTimeout(() => spinner.stop(), 3000);
```

**Spinner Methods:**
- `start(text?: string): void` - Start the spinner
- `stop(): void` - Stop the spinner
- `succeed(text?: string): void` - Stop with success symbol
- `fail(text?: string): void` - Stop with error symbol
- `warn(text?: string): void` - Stop with warning symbol
- `info(text?: string): void` - Stop with info symbol

#### Typewriter Effect

```typescript
termstyle.typewriter(text: string, options?: TypewriterOptions): Promise<void>
```

**Options:**
```typescript
interface TypewriterOptions {
  speed?: number; // Typing speed in ms (default: 50)
  cursor?: string; // Cursor character (default: '|')
  cursorBlink?: boolean; // Whether cursor blinks (default: true)
}
```

**Example:**
```typescript
await termstyle.typewriter('Hello World!', { speed: 100 });
```

### Progress Bars

```typescript
termstyle.progressBar(options?: ProgressBarOptions): ProgressBar
```

**Options:**
```typescript
interface ProgressBarOptions {
  width?: number; // Bar width in characters (default: 40)
  complete?: string; // Complete character (default: '█')
  incomplete?: string; // Incomplete character (default: '░')
  format?: string; // Format string (default: ':bar :percent')
  clear?: boolean; // Clear bar on completion (default: false)
}
```

**Progress Bar Methods:**
- `update(percent: number): void` - Update progress (0-100)
- `tick(amount?: number): void` - Increment progress
- `complete(): void` - Mark as complete
- `clear(): void` - Clear the progress bar

**Example:**
```typescript
const progress = termstyle.progressBar({ width: 50 });
for (let i = 0; i <= 100; i += 10) {
  progress.update(i);
  await new Promise(resolve => setTimeout(resolve, 100));
}
```

### Box Drawing

```typescript
termstyle.box(content: string, options?: BoxOptions): string
```

**Options:**
```typescript
interface BoxOptions {
  padding?: number | [number, number] | [number, number, number, number];
  margin?: number | [number, number] | [number, number, number, number];
  borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'singleDouble' | 'doubleSingle';
  borderColor?: string;
  backgroundColor?: string;
  title?: string;
  titleAlignment?: 'left' | 'center' | 'right';
  width?: number;
  height?: number;
  textAlignment?: 'left' | 'center' | 'right';
}
```

**Example:**
```typescript
console.log(termstyle.box('Hello World!', {
  padding: 1,
  borderStyle: 'double',
  borderColor: 'blue',
  title: 'Greeting'
}));
```

### Template Literals

```typescript
// Tagged template literal
termstyle`Template string with ${styled} content`
```

**Example:**
```typescript
const name = 'World';
const greeting = termstyle`Hello ${termstyle.blue.bold(name)}!`;
console.log(greeting);
```

### Conditional Formatting

```typescript
termstyle.conditional<T>(
  value: T,
  conditions: Record<string, StyleFunction>,
  defaultStyle?: StyleFunction
): StyleFunction
```

**Example:**
```typescript
const status = 'error';
const styled = termstyle.conditional(status, {
  error: termstyle.red.bold,
  warning: termstyle.yellow,
  success: termstyle.green,
  info: termstyle.blue
}, termstyle.gray);

console.log(styled('Status message'));
```

## Utility Methods

### Strip ANSI Codes

```typescript
termstyle.strip(text: string): string
```

Remove all ANSI escape codes from a string.

**Example:**
```typescript
const styled = termstyle.red('Hello');
const plain = termstyle.strip(styled); // 'Hello'
```

### Text Length

```typescript
termstyle.length(text: string): number
```

Get the actual text length excluding ANSI codes.

**Example:**
```typescript
const styled = termstyle.red.bold('Hello');
const length = termstyle.length(styled); // 5
```

### Color Support Detection

```typescript
termstyle.supports: {
  color: boolean;
  trueColor: boolean;
  level: 0 | 1 | 2 | 3;
}
```

**Levels:**
- `0`: No color support
- `1`: Basic 16 colors
- `2`: 256 colors
- `3`: True color (16 million)

**Example:**
```typescript
if (termstyle.supports.trueColor) {
  // Use RGB/hex colors
} else if (termstyle.supports.color) {
  // Use basic colors
}
```

### Environment Detection

```typescript
termstyle.env: {
  isTTY: boolean;
  platform: string;
  terminal: string;
  columns: number;
  rows: number;
}
```

## Configuration

### Global Configuration

```typescript
termstyle.configure(options: ConfigOptions): void
```

**Options:**
```typescript
interface ConfigOptions {
  level?: 0 | 1 | 2 | 3; // Force color support level
  colorMode?: 'auto' | 'force' | 'disable'; // Color mode
  theme?: string; // Default theme
  cache?: boolean; // Enable/disable caching
  performance?: {
    enableCaching?: boolean;
    cacheSize?: number;
    enableProfiling?: boolean;
  };
}
```

**Example:**
```typescript
termstyle.configure({
  level: 3,
  colorMode: 'auto',
  cache: true,
  performance: {
    enableCaching: true,
    cacheSize: 1000
  }
});
```

### Theme Management

#### Apply Theme

```typescript
termstyle.theme(name: string): void
```

**Built-in Themes:**
- `'default'`
- `'dark'`
- `'light'`
- `'cyberpunk'`
- `'pastel'`
- `'high-contrast'`

#### Create Custom Theme

```typescript
termstyle.createTheme(name: string, theme: ThemeDefinition): void
```

**Theme Definition:**
```typescript
interface ThemeDefinition {
  primary?: string;
  secondary?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  muted?: string;
  accent?: string;
}
```

**Example:**
```typescript
termstyle.createTheme('myTheme', {
  primary: '#3498db',
  secondary: '#2ecc71',
  error: '#e74c3c',
  warning: '#f39c12',
  success: '#27ae60',
  info: '#34495e'
});

termstyle.theme('myTheme');
```

## Types

### Core Types

```typescript
// Style function that can be called with text
type StyleFunction = (text: string) => string;

// RGB color array
type RGB = [number, number, number];

// HSL color object
interface HSL {
  h: number; // Hue (0-360)
  s: number; // Saturation (0-100)
  l: number; // Lightness (0-100)
}

// Color value union
type ColorValue = string | number | RGB | HSL;

// Style object with chaining capabilities
interface Style {
  // Style properties
  (...args: any[]): string;
  
  // Color methods
  black: Style;
  red: Style;
  green: Style;
  // ... other colors
  
  // Style methods  
  bold: Style;
  italic: Style;
  underline: Style;
  // ... other styles
  
  // Advanced methods
  rgb(r: number, g: number, b: number): Style;
  hex(color: string): Style;
  hsl(h: number, s: number, l: number): Style;
}
```

### Animation Types

```typescript
type SpinnerType = 'dots' | 'line' | 'arrow' | 'bounce' | 'clock';

interface Spinner {
  start(text?: string): void;
  stop(): void;
  succeed(text?: string): void;
  fail(text?: string): void;
  warn(text?: string): void;
  info(text?: string): void;
}

interface TypewriterOptions {
  speed?: number;
  cursor?: string;
  cursorBlink?: boolean;
}
```

### Layout Types

```typescript
type BorderStyle = 'single' | 'double' | 'round' | 'bold' | 'singleDouble' | 'doubleSingle';

type Alignment = 'left' | 'center' | 'right';

type Padding = number | [number, number] | [number, number, number, number];

interface BoxOptions {
  padding?: Padding;
  margin?: Padding;
  borderStyle?: BorderStyle;
  borderColor?: string;
  backgroundColor?: string;
  title?: string;
  titleAlignment?: Alignment;
  width?: number;
  height?: number;
  textAlignment?: Alignment;
}

interface ProgressBarOptions {
  width?: number;
  complete?: string;
  incomplete?: string;
  format?: string;
  clear?: boolean;
}

interface ProgressBar {
  update(percent: number): void;
  tick(amount?: number): void;
  complete(): void;
  clear(): void;
}
```

## Error Handling

The library throws specific errors for different scenarios:

```typescript
// Invalid color values
try {
  termstyle.rgb(300, 0, 0)('text'); // Throws RangeError
} catch (error) {
  console.error('Invalid RGB values');
}

// Invalid hex colors
try {
  termstyle.hex('invalid')('text'); // Throws TypeError
} catch (error) {
  console.error('Invalid hex color');
}
```

## Performance Considerations

- **Caching**: Enable caching for repeated style operations
- **Memory**: Use memory pooling for high-frequency operations
- **Bundle Size**: Import only needed features when possible
- **Terminal Detection**: Results are cached automatically

## Browser Compatibility

While primarily designed for Node.js terminals, basic functionality works in browsers:

```typescript
// Browser detection
if (typeof window !== 'undefined') {
  // Browser environment - limited color support
} else {
  // Node.js environment - full feature support
}
```

---

For more examples and advanced usage patterns, see [EXAMPLES.md](./EXAMPLES.md).