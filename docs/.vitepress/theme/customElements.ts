import { signal, computed } from 'alien-signals'
import { LitElement, html, css } from 'lit'
import { property, state } from 'lit/decorators.js'
import { SignalWatcher } from '../../../src/watcher'
import { SignalTrackingController } from '../../../src/controller'

// Official Lit Signals Labs package
import { Signal as LitLabSignal, SignalWatcher as LitLabSignalWatcher } from '@lit-labs/signals'

// --- 1. SHARED STATE FOR COUNTER SHOWCASE ---
const globalCount = signal(0)
const globalDoubleCount = computed(() => globalCount() * 2)

// --- Watcher Counter ---
class ShowcaseWatcherCounter extends SignalWatcher(LitElement) {
  static styles = css`
    .card {
      padding: 1.5rem;
      border: 1px solid var(--vp-c-divider);
      border-radius: 12px;
      background: var(--vp-c-bg-soft);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      margin: 1rem 0;
    }
    .value {
      font-size: 1.25rem;
      font-family: monospace;
    }
    button {
      background: var(--vp-c-brand-1);
      color: var(--vp-c-neutral-inverse);
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.2s, transform 0.1s;
    }
    button:hover {
      background: var(--vp-c-brand-2);
    }
    button:active {
      transform: scale(0.98);
    }
  `

  render() {
    return html`
      <div class="card">
        <div class="value">
          Count: <strong>${globalCount()}</strong> | Double: <strong>${globalDoubleCount()}</strong>
        </div>
        <button @click=${() => globalCount(globalCount() + 1)}>
          Increment Shared Count (Watcher)
        </button>
      </div>
    `
  }
}
customElements.define('showcase-watcher-counter', ShowcaseWatcherCounter)


// --- Controller Counter ---
class ShowcaseControllerCounter extends LitElement {
  static styles = ShowcaseWatcherCounter.styles

  private tracker = new SignalTrackingController(this, () => {
    globalCount() // Explicitly list dependency
  })

  render() {
    return html`
      <div class="card">
        <div class="value">
          [Controller] Count: <strong>${globalCount()}</strong>
        </div>
        <button @click=${() => globalCount(globalCount() + 1)}>
          Increment Shared Count (Controller)
        </button>
      </div>
    `
  }
}
customElements.define('showcase-controller-counter', ShowcaseControllerCounter)


// --- Local Counter ---
class ShowcaseLocalCounter extends SignalWatcher(LitElement) {
  static styles = ShowcaseWatcherCounter.styles

  private localCount = signal(0)

  render() {
    return html`
      <div class="card">
        <div class="value">
          Local Count: <strong>${this.localCount()}</strong>
        </div>
        <button @click=${() => this.localCount(this.localCount() + 1)}>
          Increment Local Count
        </button>
      </div>
    `
  }
}
customElements.define('showcase-local-counter', ShowcaseLocalCounter)


// --- 2. THEME SHOWCASE ---
type Theme = 'light' | 'dark' | 'synthwave'
const currentTheme = signal<Theme>('dark')

class ShowcaseThemePanel extends SignalWatcher(LitElement) {
  static styles = css`
    .container {
      padding: 1.5rem;
      border-radius: 12px;
      margin: 1rem 0;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      border: 1px solid var(--vp-c-divider);
    }
    .dark {
      background: #1e1e24;
      color: #f5f5f7;
    }
    .light {
      background: #fafafa;
      color: #1a1a1a;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .synthwave {
      background: #2b0f54;
      color: #ff7df9;
      border-color: #ff007f;
      text-shadow: 0 0 5px #ff7df9;
    }
    button {
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      border: 1px solid currentColor;
      background: transparent;
      color: inherit;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.1s;
    }
    button:hover {
      opacity: 0.9;
    }
    button:active {
      transform: scale(0.98);
    }
  `

  private cycle() {
    const next: Record<Theme, Theme> = {
      light: 'dark',
      dark: 'synthwave',
      synthwave: 'light',
    }
    currentTheme(next[currentTheme()])
  }

  render() {
    const theme = currentTheme()
    return html`
      <div class="container ${theme}">
        <h3>Active Theme: <span style="text-transform: uppercase;">${theme}</span></h3>
        <button @click=${this.cycle}>Cycle Theme Store</button>
      </div>
    `
  }
}
customElements.define('showcase-theme-panel', ShowcaseThemePanel)


// --- 3. BENCHMARK SHOWCASE ---
const gridSignals = Array.from({ length: 1000 }, () => signal(0))
const litLabSignals = Array.from({ length: 1000 }, () => new LitLabSignal.State(0))

// 3.1. alien-lit Cell component
class AlienCell extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
    .cell {
      padding: 4px;
      font-size: 10px;
      text-align: center;
      background: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-divider);
      border-radius: 3px;
      font-family: monospace;
      transition: background 0.1s;
    }
    .cell.active {
      background: var(--vp-c-brand-1);
      color: var(--vp-c-neutral-inverse);
      font-weight: bold;
    }
  `
  @property({ type: Number }) index!: number

  render() {
    const val = gridSignals[this.index]()
    return html`
      <div class="cell ${val > 0 ? 'active' : ''}">
        ${val}
      </div>
    `
  }
}
customElements.define('alien-cell', AlienCell)


// 3.2. @lit-labs/signals Cell component
class LitLabCell extends LitLabSignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
    .cell {
      padding: 4px;
      font-size: 10px;
      text-align: center;
      background: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-divider);
      border-radius: 3px;
      font-family: monospace;
      transition: background 0.1s;
    }
    .cell.active {
      background: var(--vp-c-warning-1, #e6a23c);
      color: var(--vp-c-neutral-inverse, #fff);
      font-weight: bold;
    }
  `
  @property({ type: Number }) index!: number

  render() {
    const val = litLabSignals[this.index]().get()
    return html`
      <div class="cell ${val > 0 ? 'active' : ''}">
        ${val}
      </div>
    `
  }
}
customElements.define('lit-lab-cell', LitLabCell)


// 3.3. Main Benchmark showcase component
class ShowcaseBenchmark extends LitElement {
  static styles = css`
    .benchmark-container {
      border: 1px solid var(--vp-c-divider);
      border-radius: 12px;
      background: var(--vp-c-bg-soft);
      padding: 1.5rem;
      margin: 1.5rem 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .btn-run {
      background: var(--vp-c-brand-1);
      color: var(--vp-c-neutral-inverse);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: opacity 0.2s;
    }
    .btn-run:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .results {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .result-card {
      background: var(--vp-c-bg);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--vp-c-divider);
    }
    .result-card h4 {
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
    .time-val {
      font-size: 1.6rem;
      font-weight: bold;
      font-family: monospace;
      color: var(--vp-c-brand-1);
    }
    .grids-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 960px) {
      .grids-container {
        grid-template-columns: 1fr;
      }
    }
    .grid-title {
      font-weight: bold;
      margin-bottom: 0.5rem;
      text-align: center;
    }
    .grid-view {
      display: grid;
      grid-template-columns: repeat(20, 1fr);
      gap: 2px;
      max-height: 150px;
      overflow-y: auto;
      border: 1px solid var(--vp-c-divider);
      padding: 4px;
      border-radius: 6px;
      background: var(--vp-c-bg);
    }
    .cell-standard {
      padding: 4px;
      font-size: 10px;
      text-align: center;
      background: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-divider);
      border-radius: 3px;
      font-family: monospace;
    }
    .cell-standard.active {
      background: #e06666;
      color: white;
      font-weight: bold;
    }
    .bar-comparison {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--vp-c-divider);
    }
    .bar-wrapper {
      margin: 0.5rem 0;
    }
    .bar-label {
      font-size: 0.85rem;
      margin-bottom: 0.25rem;
      display: flex;
      justify-content: space-between;
    }
    .bar {
      height: 12px;
      background: var(--vp-c-brand-1);
      border-radius: 6px;
      width: 0%;
      transition: width 0.5s ease-out;
    }
    .bar.lit-labs {
      background: var(--vp-c-warning-1, #e6a23c);
    }
    .bar.standard {
      background: #e06666;
    }
  `

  @state() private running = false
  @state() private alienTime = 0
  @state() private litLabTime = 0
  @state() private standardTime = 0
  @state() private currentStep = ''
  
  // Standard grid local state
  @state() private standardValues = Array.from({ length: 1000 }, () => 0)

  private async runBenchmark() {
    this.running = true
    this.alienTime = 0
    this.litLabTime = 0
    this.standardTime = 0

    // Reset grid states
    gridSignals.forEach(s => s(0))
    litLabSignals.forEach(s => s.set(0))
    this.standardValues = Array.from({ length: 1000 }, () => 0)
    await this.updateComplete

    const iterations = 500
    const targetIndex = 500 // Middle element

    // 1. Benchmark alien-lit (fine-grained updates with alien-signals)
    this.currentStep = 'Benchmarking alien-lit...'
    const startAlien = performance.now()
    for (let i = 1; i <= iterations; i++) {
      gridSignals[targetIndex](i)
      await new Promise(resolve => requestAnimationFrame(resolve))
    }
    const endAlien = performance.now()
    this.alienTime = endAlien - startAlien

    // Reset before running the next benchmark
    gridSignals[targetIndex](0)
    await new Promise(resolve => requestAnimationFrame(resolve))

    // 2. Benchmark @lit-labs/signals (fine-grained updates with TC39 signal-polyfill)
    this.currentStep = 'Benchmarking @lit-labs/signals...'
    const startLitLab = performance.now()
    for (let i = 1; i <= iterations; i++) {
      litLabSignals[targetIndex].set(i)
      await new Promise(resolve => requestAnimationFrame(resolve))
    }
    const endLitLab = performance.now()
    this.litLabTime = endLitLab - startLitLab

    // Reset before running standard
    litLabSignals[targetIndex].set(0)
    await new Promise(resolve => requestAnimationFrame(resolve))

    // 3. Benchmark standard Lit (component-wide update)
    this.currentStep = 'Benchmarking standard Lit...'
    const startStandard = performance.now()
    for (let i = 1; i <= iterations; i++) {
      const nextArr = [...this.standardValues]
      nextArr[targetIndex] = i
      this.standardValues = nextArr
      await new Promise(resolve => requestAnimationFrame(resolve))
    }
    const endStandard = performance.now()
    this.standardTime = endStandard - startStandard

    this.currentStep = 'Benchmark complete!'
    this.running = false
  }

  render() {
    const maxTime = Math.max(this.alienTime, this.litLabTime, this.standardTime, 1)
    const alienPct = this.alienTime > 0 ? (this.alienTime / maxTime) * 100 : 0
    const litLabPct = this.litLabTime > 0 ? (this.litLabTime / maxTime) * 100 : 0
    const standardPct = this.standardTime > 0 ? (this.standardTime / maxTime) * 100 : 0

    return html`
      <div class="benchmark-container">
        <h3>⚡ Live Performance Showcase</h3>
        <p>
          This benchmark mutates a single cell in a grid of 1,000 cells <strong>500 times</strong>.
          We measure how long the browser takes to process the updates and render them to the screen.
        </p>

        <div class="controls">
          <button class="btn-run" ?disabled=${this.running} @click=${this.runBenchmark}>
            ${this.running ? 'Running...' : 'Run Benchmark'}
          </button>
          <span>${this.currentStep}</span>
        </div>

        <div class="results">
          <div class="result-card">
            <h4>alien-lit</h4>
            <div class="time-val">${this.alienTime.toFixed(1)} ms</div>
            <small>alien-signals</small>
          </div>
          <div class="result-card">
            <h4>@lit-labs/signals</h4>
            <div class="time-val" style="color: var(--vp-c-warning-1, #e6a23c);">${this.litLabTime.toFixed(1)} ms</div>
            <small>TC39 proposal polyfill</small>
          </div>
          <div class="result-card">
            <h4>Standard Lit</h4>
            <div class="time-val" style="color: #e06666;">${this.standardTime.toFixed(1)} ms</div>
            <small>Re-renders entire grid</small>
          </div>
        </div>

        ${(this.alienTime > 0 || this.litLabTime > 0 || this.standardTime > 0) ? html`
          <div class="bar-comparison">
            <h4>Rendering Overhead Comparison (Lower is better)</h4>
            
            <div class="bar-wrapper">
              <div class="bar-label">
                <span>alien-lit (alien-signals)</span>
                <span>${this.alienTime.toFixed(1)} ms</span>
              </div>
              <div class="bar" style="width: ${alienPct}%"></div>
            </div>

            <div class="bar-wrapper">
              <div class="bar-label">
                <span>@lit-labs/signals (TC39 Polyfill)</span>
                <span>${this.litLabTime.toFixed(1)} ms</span>
              </div>
              <div class="bar lit-labs" style="width: ${litLabPct}%"></div>
            </div>

            <div class="bar-wrapper">
              <div class="bar-label">
                <span>Standard Lit (Entire Grid)</span>
                <span>${this.standardTime.toFixed(1)} ms</span>
              </div>
              <div class="bar standard" style="width: ${standardPct}%"></div>
            </div>
            
            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.95;">
              ${this.litLabTime > this.alienTime ? html`
                🎉 <strong>alien-lit</strong> is <strong>${(this.litLabTime / this.alienTime).toFixed(1)}x faster</strong> than the official <strong>@lit-labs/signals</strong> package, owing to the high-performance update scheduling and minimized runtime overhead of <code>alien-signals</code>!
              ` : ''}
            </p>
          </div>
        ` : ''}

        <div class="grids-container">
          <div>
            <div class="grid-title">alien-lit Grid</div>
            <div class="grid-view">
              ${Array.from({ length: 1000 }).map((_, i) => html`
                <alien-cell .index=${i}></alien-cell>
              `)}
            </div>
          </div>
          <div>
            <div class="grid-title">@lit-labs/signals Grid</div>
            <div class="grid-view">
              ${Array.from({ length: 1000 }).map((_, i) => html`
                <lit-lab-cell .index=${i}></lit-lab-cell>
              `)}
            </div>
          </div>
          <div>
            <div class="grid-title">Standard Lit Grid</div>
            <div class="grid-view">
              ${this.standardValues.map((val) => html`
                <div class="cell-standard ${val > 0 ? 'active' : ''}">
                  ${val}
                </div>
              `)}
            </div>
          </div>
        </div>
      </div>
    `
  }
}
customElements.define('showcase-benchmark', ShowcaseBenchmark)
