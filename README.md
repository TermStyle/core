# @termstyle/core

<p align="center">
  <img src="https://img.shields.io/npm/v/@termstyle/core" alt="npm version">
  <img src="https://img.shields.io/npm/dm/@termstyle/core" alt="npm downloads">
  <img src="https://img.shields.io/github/license/termstyle/core" alt="license">
  <img src="https://img.shields.io/bundlephobia/minzip/@termstyle/core" alt="bundle size">
  <img src="https://img.shields.io/github/stars/termstyle/core" alt="github stars">
</p>

A powerful, feature-rich CLI text formatting library that surpasses existing solutions with advanced styling capabilities, zero dependencies, and blazing performance.

## ✨ Features

- 🎨 **Full Color Support** - 16 colors, 256 colors, and true color (16 million colors)
- 🔗 **Chainable API** - Intuitive method chaining for combining styles
- 🌈 **Gradients & Rainbow** - Beautiful gradient effects and rainbow text
- 📦 **Box Drawing** - Create stunning boxes with various border styles
- 📊 **Progress Bars** - Built-in progress indicators with customization
- ✨ **Animations** - Spinners, blinking, pulsing, and typewriter effects
- 🎯 **Template Literals** - Tagged template support for clean syntax
- 🎨 **Themes** - Predefined themes and custom theme creation
- 🔧 **Conditional Formatting** - Apply styles based on conditions
- 🚀 **Zero Dependencies** - Lightweight and fast
- 📝 **TypeScript Support** - Full type definitions included
- 🖥️ **Cross-Platform** - Works on Windows, macOS, and Linux
- ⚡ **High Performance** - Optimized for speed with intelligent caching
- 🛡️ **Memory Safe** - Built-in memory management and garbage collection

## 🚀 Installation

```bash
npm install @termstyle/core
```

```bash
yarn add @termstyle/core
```

```bash
pnpm add @termstyle/core
```

## 📖 Quick Start

```javascript
import termstyle from '@termstyle/core';

// Basic colors
console.log(termstyle.red('Error!'));
console.log(termstyle.green.bold('Success!'));
console.log(termstyle.blue.underline('Information'));

// Chaining styles
console.log(termstyle.red.bold.underline('Important Error'));
console.log(termstyle.bgYellow.black('Warning'));

// RGB and Hex colors
console.log(termstyle.rgb(255, 128, 0)('Orange'));
console.log(termstyle.hex('#ff00ff')('Magenta'));
console.log(termstyle.bgHex('#1e90ff').white('Blue Background'));
```

## 🎨 Color Support

### Basic Colors
```javascript
// Foreground colors
termstyle.black('text')
termstyle.red('text')
termstyle.green('text')
termstyle.yellow('text')
termstyle.blue('text')
termstyle.magenta('text')
termstyle.cyan('text')
termstyle.white('text')

// Background colors
termstyle.bgBlack('text')
termstyle.bgRed('text')
termstyle.bgGreen('text')
// ... and more
```

### Advanced Colors
```javascript
// RGB colors (0-255)
termstyle.rgb(255, 128, 0)('Orange text')
termstyle.bgRgb(255, 0, 255)('Magenta background')

// Hex colors
termstyle.hex('#ff8000')('Orange text')
termstyle.bgHex('#ff00ff')('Magenta background')

// HSL colors
termstyle.hsl(120, 100, 50)('Pure green')
```

## 🎭 Text Styles

```javascript
termstyle.bold('Bold text')
termstyle.dim('Dimmed text')
termstyle.italic('Italic text')
termstyle.underline('Underlined text')
termstyle.strikethrough('Strikethrough text')
termstyle.inverse('Inverted colors')
termstyle.hidden('Hidden text')
```

## 🌈 Advanced Features

### Gradients
```javascript
termstyle.gradient(['#ff0000', '#00ff00', '#0000ff'])('Rainbow text')
termstyle.gradientRgb([[255,0,0], [0,255,0], [0,0,255]])('RGB gradient')
```

### Animations
```javascript
// Spinner animation
const spinner = termstyle.spinner('dots');
spinner.start('Loading...');
setTimeout(() => spinner.stop(), 3000);

// Blinking text
console.log(termstyle.blink('Attention!'));

// Typewriter effect
termstyle.typewriter('Hello World!', { speed: 100 });
```

### Progress Bars
```javascript
const progress = termstyle.progressBar({
  width: 40,
  complete: '█',
  incomplete: '░'
});

for (let i = 0; i <= 100; i += 10) {
  progress.update(i);
  // Update progress
}
```

### Box Drawing
```javascript
console.log(termstyle.box('Hello World!', {
  padding: 1,
  margin: 1,
  borderStyle: 'double',
  borderColor: 'blue'
}));
```

### Template Literals
```javascript
const name = 'World';
const message = termstyle`Hello ${termstyle.blue.bold(name)}!`;
console.log(message);
```

### Conditional Formatting
```javascript
const status = 'error';
console.log(termstyle.conditional(status, {
  error: termstyle.red.bold,
  warning: termstyle.yellow,
  success: termstyle.green
})('Status message'));
```

## 🎨 Themes

```javascript
// Apply predefined themes
termstyle.theme('dark');
termstyle.theme('light');
termstyle.theme('cyberpunk');

// Create custom themes
termstyle.createTheme('myTheme', {
  primary: '#3498db',
  secondary: '#2ecc71',
  error: '#e74c3c',
  warning: '#f39c12'
});

termstyle.theme('myTheme');
```

## 🔧 API Reference

### Core Methods

| Method | Description | Example |
|--------|-------------|---------|
| `termstyle.red()` | Apply red color | `termstyle.red('text')` |
| `termstyle.bold()` | Apply bold style | `termstyle.bold('text')` |
| `termstyle.rgb()` | Apply RGB color | `termstyle.rgb(255, 0, 0)('text')` |
| `termstyle.hex()` | Apply hex color | `termstyle.hex('#ff0000')('text')` |
| `termstyle.gradient()` | Apply gradient | `termstyle.gradient(['red', 'blue'])('text')` |

### Utility Methods

| Method | Description | Example |
|--------|-------------|---------|
| `termstyle.strip()` | Remove ANSI codes | `termstyle.strip(styledText)` |
| `termstyle.length()` | Get text length without ANSI | `termstyle.length(styledText)` |
| `termstyle.supports()` | Check color support | `termstyle.supports.trueColor` |

## 🛠️ Configuration

```javascript
// Configure global settings
termstyle.configure({
  level: 3, // Color support level (0-3)
  colorMode: 'auto', // 'auto', 'force', 'disable'
  theme: 'default',
  cache: true // Enable/disable caching
});
```

## 📊 Performance

@termstyle/core is optimized for performance:

- **Intelligent Caching**: Reuses styled strings to avoid recomputation
- **Lazy Evaluation**: Styles are only applied when needed
- **Memory Management**: Automatic cleanup and garbage collection
- **Zero Dependencies**: No external dependencies for minimal bundle size

## 🌐 Browser Support

@termstyle/core primarily targets Node.js environments but includes browser compatibility:

- **Node.js**: Full feature support
- **Browsers**: Basic color support (depends on browser console)
- **Terminal Detection**: Automatic detection of color capabilities

## 🔍 Terminal Compatibility

| Terminal | Basic Colors | 256 Colors | True Color | Notes |
|----------|--------------|------------|------------|-------|
| Terminal.app | ✅ | ✅ | ✅ | macOS default |
| iTerm2 | ✅ | ✅ | ✅ | Recommended for macOS |
| Windows Terminal | ✅ | ✅ | ✅ | Windows 10/11 |
| Command Prompt | ✅ | ❌ | ❌ | Legacy Windows |
| VS Code Terminal | ✅ | ✅ | ✅ | All platforms |
| Hyper | ✅ | ✅ | ✅ | Cross-platform |

## 📚 Documentation

- [API Reference](./API.md) - Complete API documentation
- [Examples](./EXAMPLES.md) - Usage examples and recipes
- [Contributing](./CONTRIBUTING.md) - How to contribute
- [Changelog](./CHANGELOG.md) - Version history

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/termstyle/core.git
cd core

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run type checking
npm run typecheck
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by [chalk](https://github.com/chalk/chalk) and [colors.js](https://github.com/Marak/colors.js)
- Built with performance and developer experience in mind
- Thanks to all contributors and the open source community

## 📞 Support

- 🐛 [Report Issues](https://github.com/termstyle/core/issues)
- 💬 [Discussions](https://github.com/termstyle/core/discussions)

---

<p align="center">Made with ❤️ by the TermStyle team</p>