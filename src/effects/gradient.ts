import { hexToRgb } from '../core/ansi';
import { Style } from '../styles/style';

// Basic color name to hex mapping
const colorNames: Record<string, string> = {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  yellow: '#ffff00',
  magenta: '#ff00ff',
  cyan: '#00ffff',
  white: '#ffffff',
  black: '#000000',
  gray: '#808080',
  grey: '#808080',
  orange: '#ffa500',
  purple: '#800080',
  pink: '#ffc0cb',
  brown: '#a52a2a',
  violet: '#ee82ee',
  indigo: '#4b0082'
};

function convertColorInput(color: string | [number, number, number]): [number, number, number] {
  if (Array.isArray(color)) {
    return color;
  }
  
  // Check if it's a color name
  const hex = colorNames[color.toLowerCase()] || color;
  return hexToRgb(hex);
}

export interface GradientOptions {
  interpolation?: 'linear' | 'bezier';
  hsvSpin?: 'short' | 'long';
}

function interpolateLinear(start: number, end: number, factor: number): number {
  return Math.round(start + (end - start) * factor);
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / delta + 2) / 6;
    } else {
      h = ((r - g) / delta + 4) / 6;
    }
  }

  return [h * 360, s * 100, v * 100];
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  h /= 360;
  s /= 100;
  v /= 100;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r: number, g: number, b: number;

  switch (i % 6) {
    case 0: [r, g, b] = [v, t, p]; break;
    case 1: [r, g, b] = [q, v, p]; break;
    case 2: [r, g, b] = [p, v, t]; break;
    case 3: [r, g, b] = [p, q, v]; break;
    case 4: [r, g, b] = [t, p, v]; break;
    case 5: [r, g, b] = [v, p, q]; break;
    default: [r, g, b] = [0, 0, 0];
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function interpolateHsv(
  start: [number, number, number],
  end: [number, number, number],
  factor: number,
  spin: 'short' | 'long' = 'short'
): [number, number, number] {
  const [h1Start, s1, v1] = rgbToHsv(...start);
  const [h2Start, s2, v2] = rgbToHsv(...end);
  let h1 = h1Start;
  let h2 = h2Start;

  if (spin === 'long') {
    if (h2 > h1 && h2 - h1 > 180) {
      h1 += 360;
    } else if (h1 > h2 && h1 - h2 > 180) {
      h2 += 360;
    }
  } else {
    if (h2 > h1 && h2 - h1 > 180) {
      h2 -= 360;
    } else if (h1 > h2 && h1 - h2 > 180) {
      h1 -= 360;
    }
  }

  const h = interpolateLinear(h1, h2, factor) % 360;
  const s = interpolateLinear(s1, s2, factor);
  const v = interpolateLinear(v1, v2, factor);

  return hsvToRgb(h < 0 ? h + 360 : h, s, v);
}

function gradientBase(
  text: string,
  colors: (string | [number, number, number])[],
  options: GradientOptions = {}
): string {
  // Filter out null/undefined colors
  const validColors = colors.filter(color => color != null);
  
  if (validColors.length === 0) return text;
  if (validColors.length === 1) {
    const color = validColors[0];
    const rgb = convertColorInput(color);
    return new Style([], [], { force: true }).color(rgb).apply(text);
  }

  const chars = [...text];
  const segments = validColors.length - 1;
  const charsPerSegment = chars.length / segments;
  
  let result = '';
  
  chars.forEach((char, index) => {
    if (char === ' ' || char === '\n' || char === '\t') {
      result += char;
      return;
    }

    const segment = Math.min(Math.floor(index / charsPerSegment), segments - 1);
    const segmentProgress = (index % charsPerSegment) / charsPerSegment;
    
    const startColorInput = validColors[segment];
    const endColorInput = validColors[segment + 1];
    
    const startColor = convertColorInput(startColorInput);
    const endColor = convertColorInput(endColorInput);
    
    let color: [number, number, number];
    
    if (options.interpolation === 'bezier' || options.hsvSpin) {
      color = interpolateHsv(startColor, endColor, segmentProgress, options.hsvSpin);
    } else {
      color = [
        interpolateLinear(startColor[0], endColor[0], segmentProgress),
        interpolateLinear(startColor[1], endColor[1], segmentProgress),
        interpolateLinear(startColor[2], endColor[2], segmentProgress)
      ];
    }
    
    result += new Style([], [], { force: true }).color(color).apply(char);
  });
  
  return result;
}

// Export the basic gradient function
export function gradient(
  text: string,
  colors: (string | [number, number, number])[],
  options: GradientOptions = {}
): string {
  return gradientBase(text, colors, options);
}

// Add linear method for backward compatibility
export interface GradientAPI {
  (text: string, colors: (string | [number, number, number])[], options?: GradientOptions): string;
  linear: (text: string, options: { from: string | [number, number, number]; to: string | [number, number, number] }) => string;
}

// Create gradient object with linear method for the main index
const gradientWithLinear = Object.assign(
  (text: string, colors: (string | [number, number, number])[], options?: GradientOptions) => {
    return gradientBase(text, colors, options);
  },
  {
    linear: (text: string, options: { from: string | [number, number, number]; to: string | [number, number, number] }) => {
      return gradientBase(text, [options.from, options.to]);
    }
  }
) as GradientAPI;

// Export the enhanced gradient function for main index
export { gradientWithLinear as gradientEnhanced };

// Export linear function for direct imports
export const linear = (text: string, options: { from: string | [number, number, number]; to: string | [number, number, number] }) => {
  return gradientBase(text, [options.from, options.to]);
};

// Export default for CommonJS compatibility
export default {
  linear,
  gradient,
  rainbow
};

export function rainbow(text: string, options: GradientOptions = {}): string {
  const colors = [
    '#e81416',
    '#ffa500',
    '#faeb36',
    '#79c314',
    '#487de7',
    '#4b369d',
    '#70369d'
  ];
  
  return gradientBase(text, colors, options);
}