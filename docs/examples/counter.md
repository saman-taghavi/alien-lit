# Counter Showcase

A simple counter example demonstrating computed signals, multiple instances sharing state, and local reactive updates.

---

## Shared Global State

You can define your signals globally, allowing multiple components to share the same reactive state.

```typescript
import { signal, computed } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

// Shared signal state
export const count = signal(0)
export const doubleCount = computed(() => count() * 2)

@customElement('counter-display')
export class CounterDisplay extends SignalWatcher(LitElement) {
  override render() {
    return html`
      <div>
        <h3>Display Component</h3>
        <p>Current count: ${count()}</p>
        <p>Double count: ${doubleCount()}</p>
      </div>
    `
  }
}

@customElement('counter-actions')
export class CounterActions extends LitElement {
  override render() {
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

## Local Component State

Signals can also be localized to a class instance or lifecycle scope.

```typescript
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

@customElement('local-counter')
export class LocalCounter extends SignalWatcher(LitElement) {
  // Define instance-specific signal state
  private count = signal(0)

  override render() {
    return html`
      <fieldset>
        <legend>Local Counter</legend>
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

Both of the watcher components above update reactively when you click below:

<ClientOnly>
  <showcase-watcher-counter></showcase-watcher-counter>
</ClientOnly>

### 2. Local Component Counter

Each instance of this component maintains its own isolated reactive state:

<ClientOnly>
  <showcase-local-counter></showcase-local-counter>
</ClientOnly>

