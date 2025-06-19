import { hideCursor, showCursor, cursorPosition, eraseLine } from '../core/ansi';
import { Style } from '../styles/style';

export type AnimationType = 'blink' | 'pulse' | 'slide' | 'typewriter' | 'fade';

export interface AnimationOptions {
  duration?: number;
  interval?: number;
  iterations?: number;
  onComplete?: () => void;
}

export class Animation {
  private intervalId?: NodeJS.Timeout;
  private running = false;

  constructor(
    private text: string,
    private type: AnimationType,
    private options: AnimationOptions = {}
  ) {
    this.options = {
      duration: 1000,
      interval: 100,
      iterations: Infinity,
      ...options
    };
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    
    process.stdout.write(hideCursor());
    
    let frame = 1;
    let iteration = 0;
    const totalFrames = Math.floor((this.options.duration || 1000) / (this.options.interval || 100));
    
    this.intervalId = setInterval(() => {
      const progress = (frame % totalFrames) / totalFrames;
      
      process.stdout.write(cursorPosition(0, 0) + eraseLine());
      
      switch (this.type) {
        case 'blink':
          this.renderBlink(progress);
          break;
        case 'pulse':
          this.renderPulse(progress);
          break;
        case 'slide':
          this.renderSlide(progress);
          break;
        case 'typewriter':
          this.renderTypewriter(progress);
          break;
        case 'fade':
          this.renderFade(progress);
          break;
      }
      
      frame++;
      
      if (frame > totalFrames) {
        iteration++;
        frame = 1;
        
        if (this.options.iterations !== Infinity && this.options.iterations !== undefined && iteration >= this.options.iterations) {
          this.stop();
          if (this.options.onComplete) {
            this.options.onComplete();
          }
        }
      }
    }, this.options.interval);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    this.running = false;
    process.stdout.write(showCursor());
  }

  private renderBlink(progress: number): void {
    if (progress <= 0.5) {
      process.stdout.write(this.text);
    } else {
      process.stdout.write(' '.repeat(this.text.length));
    }
  }

  private renderPulse(progress: number): void {
    const intensity = Math.sin(progress * Math.PI) * 128 + 127;
    const color: [number, number, number] = [intensity, intensity, intensity];
    const styled = new Style().color(color).apply(this.text);
    process.stdout.write(styled);
  }

  private renderSlide(progress: number): void {
    const offset = Math.floor(progress * this.text.length);
    const visible = this.text.slice(0, offset) + ' '.repeat(this.text.length - offset);
    process.stdout.write(visible);
  }

  private renderTypewriter(progress: number): void {
    const chars = Math.floor(progress * this.text.length);
    const visible = this.text.slice(0, chars);
    process.stdout.write(visible + '█');
  }

  private renderFade(progress: number): void {
    const opacity = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
    const intensity = Math.floor(opacity * 255);
    const color: [number, number, number] = [intensity, intensity, intensity];
    const styled = new Style().color(color).apply(this.text);
    process.stdout.write(styled);
  }
}

export function animate(
  text: string,
  type: AnimationType,
  options?: AnimationOptions
): Animation {
  const animation = new Animation(text, type, options);
  animation.start();
  return animation;
}

export const spinners = {
  dots: { frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'], interval: 80 },
  dots2: { frames: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'], interval: 80 },
  dots3: { frames: ['⠋', '⠙', '⠚', '⠞', '⠖', '⠦', '⠴', '⠲', '⠳', '⠓'], interval: 80 },
  line: { frames: ['-', '\\', '|', '/'], interval: 130 },
  line2: { frames: ['⠂', '-', '–', '—', '–', '-'], interval: 100 },
  pipe: { frames: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'], interval: 100 },
  star: { frames: ['✶', '✸', '✹', '✺', '✹', '✷'], interval: 70 },
  toggle: { frames: ['⊶', '⊷'], interval: 250 },
  box: { frames: ['◰', '◳', '◲', '◱'], interval: 120 },
  circle: { frames: ['◐', '◓', '◑', '◒'], interval: 120 },
  arrow: { frames: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'], interval: 100 },
  bounce: { frames: ['⠁', '⠂', '⠄', '⠂'], interval: 120 },
  bar: { frames: ['▁', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃'], interval: 80 },
  earth: { frames: ['🌍', '🌎', '🌏'], interval: 180 },
  moon: { frames: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'], interval: 80 },
  clock: { frames: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'], interval: 100 },
  balloon: { frames: [' ', '.', 'o', 'O', '@', '*', ' '], interval: 140 },
  noise: { frames: ['▓', '▒', '░'], interval: 100 },
  boxBounce: { frames: ['▖', '▘', '▝', '▗'], interval: 120 },
  triangle: { frames: ['◢', '◣', '◤', '◥'], interval: 50 },
  binary: { frames: ['010010', '101101', '010010', '101010'], interval: 120 },
  runner: { frames: ['🚶', '🏃'], interval: 140 },
  pong: { frames: ['▐⠂       ▌', '▐⠈       ▌', '▐ ⠂      ▌', '▐ ⠠      ▌', '▐  ⡀     ▌', '▐  ⠠     ▌', '▐   ⠂    ▌', '▐   ⠈    ▌', '▐    ⠂   ▌', '▐    ⠠   ▌', '▐     ⡀  ▌', '▐     ⠠  ▌', '▐      ⠂ ▌', '▐      ⠈ ▌', '▐       ⠂▌', '▐       ⠠▌', '▐       ⡀▌', '▐      ⠠ ▌', '▐      ⠂ ▌', '▐     ⠈  ▌', '▐     ⠂  ▌', '▐    ⠠   ▌', '▐    ⡀   ▌', '▐   ⠠    ▌', '▐   ⠂    ▌', '▐  ⠈     ▌', '▐  ⠂     ▌', '▐ ⠠      ▌', '▐ ⡀      ▌', '▐⠠       ▌'], interval: 80 },
  shark: { frames: ['▐|\\____________▌', '▐_|\\___________▌', '▐__|\\__________▌', '▐___|\\_________▌', '▐____|\\________▌', '▐_____|\\_______▌', '▐______|\\______▌', '▐_______|\\_____▌', '▐________|\\____▌', '▐_________|\\___▌', '▐__________|\\__▌', '▐___________|\\_▌', '▐____________|\\▌', '▐____________/|▌', '▐___________/|_▌', '▐__________/|__▌', '▐_________/|___▌', '▐________/|____▌', '▐_______/|_____▌', '▐______/|______▌', '▐_____/|_______▌', '▐____/|________▌', '▐___/|_________▌', '▐__/|__________▌', '▐_/|___________▌', '▐/|____________▌'], interval: 120 },
  dqpb: { frames: ['d', 'q', 'p', 'b'], interval: 100 },
  weather: { frames: ['☀️ ', '⛅ ', '🌤 ', '⛈ ', '🌧 ', '🌦 ', '☀️ '], interval: 100 },
  christmas: { frames: ['🌲', '🎄'], interval: 400 }
} as const;

export type SpinnerName = keyof typeof spinners;

export class Spinner {
  private frames: string[];
  private currentFrame = 0;
  private intervalId?: NodeJS.Timeout;
  private running = false;
  private interval: number;

  constructor(
    private text: string,
    spinnerOrOptions?: SpinnerName | { spinner?: SpinnerName | string; color?: string; interval?: number },
    interval?: number
  ) {
    let spinnerName: SpinnerName = 'dots';
    let finalInterval = 80;

    if (typeof spinnerOrOptions === 'string') {
      spinnerName = spinnerOrOptions;
      finalInterval = interval ?? spinners[spinnerName]?.interval ?? 80;
    } else if (spinnerOrOptions && typeof spinnerOrOptions === 'object') {
      spinnerName = (spinnerOrOptions.spinner as SpinnerName) ?? 'dots';
      finalInterval = spinnerOrOptions.interval ?? spinners[spinnerName]?.interval ?? 80;
    }

    // Handle invalid spinner names gracefully
    const spinner = spinners[spinnerName];
    if (spinner) {
      this.frames = [...spinner.frames];
      this.interval = finalInterval;
    } else {
      // Fallback to dots if spinner not found
      this.frames = [...spinners.dots.frames];
      this.interval = finalInterval;
    }
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    
    process.stdout.write(hideCursor());
    
    this.intervalId = setInterval(() => {
      const frame = this.frames[this.currentFrame];
      process.stdout.write(`\r${frame} ${this.text}`);
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, this.interval);
  }

  stop(finalText?: string): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    this.running = false;
    process.stdout.write('\r' + eraseLine());
    if (finalText) {
      process.stdout.write(finalText);
    }
    process.stdout.write(showCursor() + '\n');
  }

  update(text: string): void {
    this.text = text;
  }

  updateColor(_color: string): void {
    // Store color for future use - this is a placeholder for color functionality
  }

  succeed(text?: string): void {
    this.stop(`✓ ${text || this.text}`);
  }

  fail(text?: string): void {
    this.stop(`✗ ${text || this.text}`);
  }

  warn(text?: string): void {
    this.stop(`⚠ ${text || this.text}`);
  }

  info(text?: string): void {
    this.stop(`ℹ ${text || this.text}`);
  }

  clear(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    this.running = false;
    process.stdout.write('\r' + eraseLine());
    process.stdout.write(showCursor());
  }
}

export function spinner(
  text: string, 
  options?: SpinnerName | { spinner?: SpinnerName; color?: string; interval?: number }
): Spinner {
  const s = new Spinner(text, options);
  s.start();
  return s;
}

// Add pulse animation function for backward compatibility
export function pulse(text: string, options: { color?: string; duration?: number } = {}): string[] {
  const frames: string[] = [];
  const totalFrames = Math.floor((options.duration || 1000) / 100); // 100ms per frame
  
  for (let i = 0; i < totalFrames; i++) {
    let styledText = text;
    if (options.color) {
      const style = new Style([], [], { force: true });
      styledText = style.color(options.color).apply(text);
    }
    
    frames.push(styledText);
  }
  
  return frames;
}