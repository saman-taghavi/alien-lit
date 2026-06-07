# SignalWatcher Mixin

A TypeScript class mixin that adds automatic, fine-grained reactive updates to any Lit `ReactiveElement` (such as `LitElement`) by intercepting its render lifecycle.

---

## API Signature

```typescript
export function SignalWatcher<T extends Constructor<ReactiveElement>>(Base: T): T
```

* **Parameters**:
  * `Base`: A class constructor extending Lit's `ReactiveElement` (like `LitElement`).
* **Returns**:
  * An enhanced class constructor equipped with auto-tracking features.

---

## How it works (Under the Hood)

The mixin wraps Lit's internal update process by hooking into three primary lifecycle methods:

1. **`performUpdate()`**:
   When Lit schedules an update, `SignalWatcher` intercepts the call and executes `super.performUpdate()` inside an `alien-signals` `effect`. Any signal accessed during the synchronous execution of your `render()` method is automatically registered as a dependency.
2. **`requestUpdate()`**:
   If any of the tracked signals mutate in the future, the effect callback is fired, which automatically schedules a new update on the Lit element.
3. **`connectedCallback()` & `disconnectedCallback()`**:
   The active tracking effect is bound to the element's connection lifecycle. When the component is disconnected from the DOM, the effect is immediately disposed of to prevent memory leaks. Upon reconnection, a new update is requested to re-track dependencies.

---

## Detailed Example

```typescript
import { signal, computed } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

// Create state
const firstName = signal('John')
const lastName = signal('Doe')
const fullName = computed(() => `${firstName()} ${lastName()}`)

@customElement('user-profile')
export class UserProfile extends SignalWatcher(LitElement) {
  render() {
    return html`
      <div>
        <p>User: <strong>${fullName()}</strong></p>
        <button @click=${() => firstName('Jane')}>Change First Name</button>
      </div>
    `
  }
}
```

---

## Best Practices

::: warning ⚠️ Avoid Infinite Update Loops
Do **not** write to or mutate signals inside `render()`, `willUpdate()`, `update()`, or other synchronous lifecycle methods. Doing so will mutate dependencies that the render cycle is currently tracking, resulting in an infinite re-render loop.
:::

::: tip Keep Renders Pure
Ensure your `render()` function remains a pure representation of your state. Do not perform side-effects inside it.
:::

---

## Live Interactive Preview

Below is a live instance of a component using `SignalWatcher` (listening to a shared count signal):

<ClientOnly>
  <showcase-watcher-counter></showcase-watcher-counter>
</ClientOnly>
