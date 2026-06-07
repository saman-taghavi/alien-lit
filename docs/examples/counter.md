# Counter Showcase

This showcase demonstrates how to manage reactive counter states in Lit using `alien-lit`. It covers both **Shared Global State** (multi-component communication) and **Local Component State** (isolated widget reactivity).

---

## 🌐 1. Shared Global State

Shared global signals are defined outside of your web components, allowing multiple independent components to read and write to the same source of truth.

### The Code

We define a shared `count` signal and a derived `doubleCount` computation:

```typescript
import { signal, computed } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

// 1. Declare shared signals
export const count = signal(0)
export const doubleCount = computed(() => count() * 2)

// 2. Read state in a watcher display component
@customElement('counter-display')
export class CounterDisplay extends SignalWatcher(LitElement) {
  render() {
    return html`
      <div>
        <h3>Display Component</h3>
        <p>Current count: ${count()}</p>
        <p>Double count: ${doubleCount()}</p>
      </div>
    `
  }
}

// 3. Mutate state in a separate controller component
@customElement('counter-actions')
export class CounterActions extends LitElement {
  render() {
    return html`
      <div>
        <h3>Actions Component</h3>
        <button @click=${() => count(count() + 1)}>Increment</button>
        <button @click=${() => count(count() - 1)}>Decrement</button>
        <button @click=${() => count(0)}>Reset</button>
      </div>
    `
  }
}
```

---

## 🔒 2. Local Component State

If you want your component to own its state (so that multiple instances of the same component remain isolated), you can declare signals as private properties inside the class.

### The Code

```typescript
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

@customElement('local-counter')
export class LocalCounter extends SignalWatcher(LitElement) {
  // Instance-specific signal state
  private count = signal(0)

  render() {
    return html`
      <fieldset>
        <legend>Local Instance Counter</legend>
        <p>Count: ${this.count()}</p>
        <button @click=${() => this.count(this.count() + 1)}>Increment Local</button>
      </fieldset>
    `
  }
}
```

---

## Live Interactive Previews

### 1. Shared Global Counter
Both display components and custom renderers listening to the global `count` signal will update reactively and synchronously in real-time when you click below:

<ClientOnly>
  <showcase-watcher-counter></showcase-watcher-counter>
</ClientOnly>

### 2. Local Component Counter
Each instance of this component maintains its own isolated reactive state. Clicking below will only update its local context:

<ClientOnly>
  <showcase-local-counter></showcase-local-counter>
</ClientOnly>
