import { cursorPosition, eraseLine, hideCursor, showCursor } from '../core/ansi';
import { Style } from '../styles/style';

export interface ProgressBarOptions {
  total?: number;
  width?: number;
  complete?: string;
  incomplete?: string;
  head?: string;
  clear?: boolean;
  renderThrottle?: number;
  format?: string;
  stream?: NodeJS.WriteStream;
  barColor?: string | [number, number, number];
  completeColor?: string | [number, number, number];
}

export class ProgressBar {
  private current = 0;
  private startTime = Date.now();
  private lastRender = 0;
  private options: Required<ProgressBarOptions>;

  constructor(options: ProgressBarOptions = {}) {
    this.options = {
      total: 100,
      width: 40,
      complete: '█',
      incomplete: '░',
      head: '',
      clear: false,
      renderThrottle: 16,
      format: ':bar :percent :etas',
      stream: process.stdout,
      barColor: '',
      completeColor: '',
      ...options
    };
  }

  tick(delta = 1, tokens?: Record<string, string>): void {
    const oldCurrent = this.current;
    this.current = Math.min(this.current + delta, this.options.total);
    this.render(tokens, oldCurrent !== this.current);
  }

  update(current: number, tokens?: Record<string, string>): void {
    this.current = Math.min(current, this.options.total);
    this.render(tokens);
  }

  private render(tokens?: Record<string, string>, forceRender = false): void {
    const now = Date.now();
    if (!forceRender && this.options.renderThrottle > 0 && now - this.lastRender < this.options.renderThrottle && this.current < this.options.total) {
      return;
    }
    this.lastRender = now;

    const percent = this.current / this.options.total;
    const filledLength = Math.floor(this.options.width * percent);
    const emptyLength = this.options.width - filledLength;

    let filled = this.options.complete.repeat(filledLength);
    const empty = this.options.incomplete.repeat(emptyLength);

    if (this.options.head && filledLength > 0 && filledLength < this.options.width) {
      filled = filled.slice(0, -1) + this.options.head;
    }

    if (this.options.barColor) {
      const style = new Style();
      filled = typeof this.options.barColor === 'string'
        ? style.color(this.options.barColor).apply(filled)
        : style.color(this.options.barColor).apply(filled);
    }

    const bar = filled + empty;
    const elapsed = (now - this.startTime) / 1000;
    const eta = percent > 0 ? (elapsed / percent - elapsed) : 0;

    let output = this.options.format
      .replace(':bar', bar)
      .replace(':percent', `${Math.floor(percent * 100)}%`)
      .replace(':current', String(this.current))
      .replace(':total', String(this.options.total))
      .replace(':elapsed', this.formatTime(elapsed))
      .replace(':etas', eta > 0 ? this.formatTime(eta) : '')
      .replace(':eta', this.formatTime(eta));

    if (tokens) {
      Object.entries(tokens).forEach(([key, value]) => {
        output = output.replace(`:${key}`, value);
      });
    }

    if (this.options.completeColor && percent === 1) {
      const style = new Style();
      output = typeof this.options.completeColor === 'string'
        ? style.color(this.options.completeColor).apply(output)
        : style.color(this.options.completeColor).apply(output);
    }

    this.options.stream.write('\r' + eraseLine() + output);

    if (percent === 1) {
      if (this.options.clear) {
        this.options.stream.write('\r' + eraseLine());
      } else {
        this.options.stream.write('\n');
      }
    }
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}h${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  complete(): void {
    this.update(this.options.total);
  }
}

export function progressBar(options?: ProgressBarOptions): ProgressBar {
  return new ProgressBar(options);
}

// Add bar method for backward compatibility
export function bar(current: number, total: number, options?: ProgressBarOptions): string {
  const barOptions = { ...options, total };
  
  // Create the bar string
  const percent = current / total;
  const width = barOptions.width || 40;
  const filledLength = Math.floor(width * percent);
  const emptyLength = width - filledLength;
  
  const complete = barOptions.complete || '█';
  const incomplete = barOptions.incomplete || '░';
  
  return complete.repeat(filledLength) + incomplete.repeat(emptyLength);
}

export interface MultiProgressOptions {
  stream?: NodeJS.WriteStream;
  clearOnComplete?: boolean;
}

export class MultiProgress {
  private bars: Map<string, { bar: ProgressBar; line: number }> = new Map();
  private currentLine = 0;
  private options: MultiProgressOptions;

  constructor(options: MultiProgressOptions = {}) {
    this.options = {
      stream: process.stdout,
      clearOnComplete: false,
      ...options
    };
    
    this.options.stream?.write(hideCursor());
  }

  create(id: string, options: ProgressBarOptions): ProgressBar {
    const bar = new ProgressBar({
      ...options,
      stream: this.options.stream
    });
    
    this.bars.set(id, { bar, line: this.currentLine++ });
    return bar;
  }

  newBar(label: string, options: ProgressBarOptions): ProgressBar {
    return this.create(label, options);
  }

  remove(id: string): void {
    this.bars.delete(id);
  }

  terminate(): void {
    if (this.options.clearOnComplete) {
      for (let i = 0; i < this.currentLine; i++) {
        this.options.stream?.write(cursorPosition(0, i) + eraseLine());
      }
    }
    this.options.stream?.write(showCursor());
  }
}

export function multiProgress(options?: MultiProgressOptions): MultiProgress {
  return new MultiProgress(options);
}

// Export default for CommonJS compatibility
export default Object.assign(progressBar, {
  progressBar,
  bar,
  ProgressBar,
  multiProgress,
  MultiProgress
});