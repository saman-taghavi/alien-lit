# SignalTrackingController

A Lit `ReactiveController` that allows you to explicitly track specific signals and trigger updates on the host component when those signals mutate.

---

## API Signature

```typescript
export class SignalTrackingController implements ReactiveController {
  constructor(
    host: ReactiveElement,
    track: () => void
  )
}
```

* **Parameters**:
  * `host`: The Lit host element (usually `this` inside your component class).
  * `track`: A tracking callback function. Any signal read inside this function is registered as a dependency.

---

## Why use the Controller instead of the Mixin?

While `SignalWatcher` is the easiest way to handle reactivity automatically, the `SignalTrackingController` is preferred in the following scenarios:

1. **Explicit Dependencies**: If you want to explicitly declare what signals a component is watching, rather than tracking everything read in the `render()` template.
2. **Outside the Render Cycle**: If you need to trigger updates based on signals read in custom controllers, side-effects, or lifecycle methods (e.g. tracking inside a custom animation loop).
3. **Third-Party Integrations**: If you are writing custom Lit controllers or integrations that need to handle their own signal-based reactivity.

---

## How it works (Under the Hood)

1. The controller registers itself to the host Lit element using `host.addController(this)`.
2. When the host connects to the DOM (`hostConnected`), the controller spawns an `effectScope` and registers an `effect` around the provided `track` function.
3. When any signal accessed inside `track()` changes, the effect is triggered, which in turn calls `this.host.requestUpdate()`.
4. When the host disconnects (`hostDisconnected`), the effect scope is destroyed and all subscription handlers are disposed.

---

## Detailed Example

```typescript
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalTrackingController } from 'alien-lit'

const userRole = signal('guest')

@customElement('admin-panel')
export class AdminPanel extends LitElement {
  // Explicitly subscribe to changes in the 'userRole' signal
  private roleTracker = new SignalTrackingController(this, () => {
    userRole() // Accessing the signal registers it as a dependency
  })

  override render() {
    return html`
      <div>
        <p>Current Role: ${userRole()}</p>
        ${userRole() === 'admin' 
          ? html`<button>Manage Users</button>` 
          : html`<span>Access Denied</span>`}
      </div>
    `
  }
}
```

---

## Live Interactive Preview

Below is a live instance of a component using `SignalTrackingController` (observing the shared count signal):

<ClientOnly>
  <showcase-controller-counter></showcase-controller-counter>
</ClientOnly>
