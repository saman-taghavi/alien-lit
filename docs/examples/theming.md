# Dynamic Theming Showcase

This showcase demonstrates how to build a global, reactive theme toggle store and consume it in Lit components. We will use `SignalWatcher` for UI styling updates and `SignalTrackingController` for side-effects (like syncing the theme to the `document.body` class list).

---

## 🎨 1. The Theme Store

We declare a typed `currentTheme` signal and a `toggleTheme()` mutator function in a separate store file:

```typescript
import { signal } from 'alien-signals'

export type Theme = 'light' | 'dark' | 'synthwave'

export const currentTheme = signal<Theme>('dark')

export function toggleTheme() {
  const nextTheme: Record<Theme, Theme> = {
    light: 'dark',
    dark: 'synthwave',
    synthwave: 'light',
  }
  currentTheme(nextTheme[currentTheme()])
}
```

---

## 🖥️ 2. UI Component (SignalWatcher)

The `ThemedPanel` component uses the `SignalWatcher` mixin to automatically re-evaluate its CSS classes whenever the theme changes, ensuring styling updates are rendered instantly:

```typescript
import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'
import { currentTheme, toggleTheme } from './themeStore'

@customElement('themed-panel')
export class ThemedPanel extends SignalWatcher(LitElement) {
  static styles = css`
    .panel {
      padding: 1.5rem;
      border-radius: 12px;
      transition: background-color 0.3s, color 0.3s;
      border: 1px solid var(--vp-c-divider);
    }
    .dark      { background: #1e1e24; color: #f5f5f7; }
    .light     { background: #fafafa; color: #1a1a1a; }
    .synthwave { background: #2b0f54; color: #ff7df9; }
  `

  override render() {
    const theme = currentTheme()
    return html`
      <div class="panel ${theme}">
        <h2>Active Theme: ${theme.toUpperCase()}</h2>
        <p>The panel styles react instantly to changes in the theme signal.</p>
        <button @click=${toggleTheme}>Cycle Theme</button>
      </div>
    `
  }
}
```

---

## 🔄 3. Side-Effects (SignalTrackingController)

If you need to perform side-effects outside of rendering templates (e.g. syncing state to external DOM APIs, local storage, or telemetry), `SignalTrackingController` is the perfect tool:

```typescript
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalTrackingController } from 'alien-lit'
import { currentTheme } from './themeStore'

@customElement('theme-body-sync')
export class ThemeBodySync extends LitElement {
  // Sync the theme to the <body> class name
  private themeSync = new SignalTrackingController(this, () => {
    const theme = currentTheme()
    document.body.className = `theme-${theme}`
  })

  override render() {
    return html`<p>Syncing active theme to document body class...</p>`
  }
}
```

---

## Live Interactive Preview

Try toggling the global theme store below to see the CSS styling adapt immediately in real-time:

<ClientOnly>
  <showcase-theme-panel></showcase-theme-panel>
</ClientOnly>
