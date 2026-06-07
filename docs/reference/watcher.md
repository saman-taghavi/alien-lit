# SignalWatcher Mixin

The `SignalWatcher` mixin adds automatic fine-grained reactive updates to any Lit `ReactiveElement` (like `LitElement`).

It wraps the standard Lit update lifecycle, tracking any `alien-signals` read during the synchronous render pass and scheduling a component update when they change.

---

## API Signature

```typescript
export function SignalWatcher<T extends Constructor<ReactiveElement>>(Base: T): T
```

- **Arguments**: A base class extending `ReactiveElement` (e.g., `LitElement`).
- **Returns**: A new class that automatically registers/deregisters dependency effects.

---

## Detailed Example

```typescript
import { signal, computed } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

// 1. Declare signals
const count = signal(0)
const doubleCount = computed(() => count() * 2)

// 2. Wrap LitElement with the mixin
@customElement('reactive-counter')
export class ReactiveCounter extends SignalWatcher(LitElement) {
  override render() {
    return html`
      <div>
        <p>Current count: ${count()}</p>
        <p>Double count: ${doubleCount()}</p>
        <button @click=${() => count(count() + 1)}>Increment</button>
      </div>
    `
  }
}
```

---

## How it Works

1. During `performUpdate`, `SignalWatcher` sets up an `alien-signals` `effect`.
2. Any signal evaluated within this effect (e.g., inside your `render()` method) is registered as a dependency.
3. If any dependency changes, `this.requestUpdate()` is automatically called to trigger the next Lit update cycle.
4. When the component is disconnected (`disconnectedCallback`), the effect is disposed of automatically to avoid memory leaks.

---

## Live Interactive Preview

Below is a live instance of the `ReactiveCounter` element using `SignalWatcher`:

<ClientOnly>
  <showcase-watcher-counter></showcase-watcher-counter>
</ClientOnly>

