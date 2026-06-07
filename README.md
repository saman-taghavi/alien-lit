# alien-lit 👽⚡

[![npm version](https://img.shields.io/npm/v/alien-lit.svg)](https://npmjs.org/package/alien-lit)
[![license](https://img.shields.io/npm/l/alien-lit.svg)](https://github.com/your-username/alien-lit)

Fine-grained reactive state for **Lit** powered by **alien-signals**.

`alien-lit` seamlessly binds the hyper-performance of `alien-signals` to Lit components, providing both automatic, boilerplate-free tracking and manual controller-based integrations.

---

## Features

- **⚡ Zero Boilerplate:** Automatically track signals read during your `render()` cycle via the `SignalWatcher` mixin.
- **🎯 Fine-Grained Reactivity:** Only re-render components when the specific signals they read change.
- **📦 Ultra-lightweight:** No extra heavy runtimes. Inherits the lightweight footprint of `alien-signals`.
- **🛠️ Flexible:** Choose between the automated `SignalWatcher` mixin or the explicit `SignalTrackingController`.

---

## Installation

```bash
# Using pnpm
pnpm add alien-lit alien-signals lit

# Using npm
npm install alien-lit alien-signals lit

# Using yarn
yarn add alien-lit alien-signals lit
```

---

## Usage

### 1. Automatic Tracking (`SignalWatcher`)

The `SignalWatcher` mixin automatically wraps Lit's update lifecycle. Any signal or computed value read during the synchronous render pass is tracked, and changes will schedule an update.

```typescript
import { computed, signal } from 'alien-signals'
import { html, LitElement } from 'lit'
import { SignalWatcher } from 'alien-lit'
import { customElement } from 'lit/decorators.js'

// 1. Define your signals
const count = signal(0)
const doubleCount = computed(() => count() * 2)

// 2. Wrap your component with the mixin
@customElement('my-counter')
export class MyCounter extends SignalWatcher(LitElement) {
  override render() {
    return html`
      <div>
        <p>Count: ${count()}</p>
        <p>Double: ${doubleCount()}</p>
        <button @click=${() => count(count() + 1)}>Increment</button>
      </div>
    `
  }
}
```

### 2. Manual Tracking (`SignalTrackingController`)

If you want to track signals outside of the `render` lifecycle (e.g. within a custom Lit controller or a side-effect), or if you prefer explicit declaration of dependencies, you can use the `SignalTrackingController`.

```typescript
import { signal } from 'alien-signals'
import { html, LitElement } from 'lit'
import { SignalTrackingController } from 'alien-lit'
import { customElement } from 'lit/decorators.js'

const theme = signal('light')

@customElement('my-themed-element')
export class MyThemedElement extends LitElement {
  // Explicitly list dependencies in the tracking function
  private signalController = new SignalTrackingController(this, () => {
    theme()
  })

  override render() {
    return html`
      <div class="theme-${theme()}">
        Current Theme: ${theme()}
      </div>
    `
  }
}
```

---

## Why alien-signals with Lit?

`alien-signals` is a high-performance reactive primitive designed to be faster than other popular signal libraries (like Preact Signals or Solid Signals) while maintaining a minimal bundle size.

Integrating it with Lit allows you to:
1. Move state completely out of the UI tree into a clean, testable store layer.
2. Avoid forwarding callbacks or deep prop drilling.
3. Keep render updates strictly localized to components that actually depend on the updated data.

---

## License

MIT License.
