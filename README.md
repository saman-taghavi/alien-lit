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

## Comparison with @lit-labs/signals

`alien-lit` is a high-performance, lightweight alternative to the official `@lit-labs/signals` package (which is built on the TC39 signals proposal polyfill).

### 1. Package Size comparison
By leveraging the ultra-lightweight `alien-signals` library, `alien-lit` is **~2.8x smaller** in gzipped bundle size than the official `@lit-labs/signals` + `signal-polyfill` stack (measured using `esbuild` and `gzip`):

| Library + Dependency | Minified Size | Gzipped Size | Total Footprint (Gzipped) |
| :--- | :--- | :--- | :--- |
| **`alien-lit`** (our integration) | **0.73 KB** | **0.36 KB** | |
| `alien-signals` (dependency) | 3.60 KB | 1.27 KB | **1.63 KB** 🚀 |
| **`@lit-labs/signals`** (official) | 3.00 KB | 1.31 KB | |
| `signal-polyfill` (dependency) | 10.00 KB | 3.21 KB | **4.52 KB** |

### 2. Syntax & Developer Experience
`alien-lit` offers a clean, boilerplate-free functional API:

* **Reading Signals**:
  * `alien-lit`: Invoke the function directly: `${count()}`.
  * `@lit-labs/signals`: Call `${count.get()}`, use a `watch()` directive, or use their custom overridden `html` template tag.
* **Writing Signals**:
  * `alien-lit`: Pass the new value to the function: `count(count() + 1)`.
  * `@lit-labs/signals`: Call `.set()`: `count.set(count.get() + 1)`.

---

## License

MIT License.
