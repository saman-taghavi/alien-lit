# Theming Showcase

This showcase demonstrates how to implement a global app theme toggle using a simple signal store, and consume it using either `SignalWatcher` or `SignalTrackingController`.

---

## 1. Defining the Theme Store

Create a dedicated state file `themeStore.ts`:

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

## 2. Using SignalWatcher

With `SignalWatcher`, the component automatically re-renders whenever `currentTheme` changes:

```typescript
import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'
import { currentTheme, toggleTheme } from './themeStore'

@customElement('themed-panel')
export class ThemedPanel extends SignalWatcher(LitElement) {
  static styles = css`
    .panel {
      padding: 1rem;
      border-radius: 8px;
      transition: background-color 0.3s, color 0.3s;
    }
    .dark { background: #222; color: #fff; }
    .light { background: #f0f0f0; color: #000; }
    .synthwave { background: #2b1055; color: #ff007f; }
  `

  override render() {
    const theme = currentTheme()
    return html`
      <div class="panel ${theme}">
        <h2>Welcome to the ${theme} zone!</h2>
        <button @click=${toggleTheme}>Cycle Theme</button>
      </div>
    `
  }
}
```

---

## 3. Using SignalTrackingController

With `SignalTrackingController`, you explicitly subscribe to the theme change. This is useful for side effects, such as updating a body attribute or running custom animations:

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
    return html`<p>Syncing theme to document body...</p>`
  }
}
```

---

## Live Interactive Preview

Try toggling the global theme store below to see it change in real-time. Notice how the component styling reacts immediately:

<ClientOnly>
  <showcase-theme-panel></showcase-theme-panel>
</ClientOnly>

