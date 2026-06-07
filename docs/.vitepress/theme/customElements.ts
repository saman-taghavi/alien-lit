import { signal, computed } from 'alien-signals'
import { LitElement, html, css } from 'lit'
import { SignalWatcher } from '../../../src/watcher'
import { SignalTrackingController } from '../../../src/controller'

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
// (Removed)
