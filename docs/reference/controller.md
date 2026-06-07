# SignalTrackingController

`SignalTrackingController` is a Lit `ReactiveController` that allows you to manually track specific `alien-signals` and request a host update when they change.

This is highly useful when:
- You want to declare dependencies explicitly.
- You want to track signals outside the `render()` lifecycle (e.g., inside custom lifecycles, hooks, or side-effects).
- You are building other custom controllers.

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

### Parameters

- **`host`** (`ReactiveElement`): The host element (typically `this` in a Lit component). Registers the controller onto the element.
- **`track`** (`() => void`): A function where you read/access any signals that should trigger a host update upon mutation.

---

## Detailed Example

```typescript
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalTrackingController } from 'alien-lit'

const theme = signal('dark')

@customElement('themed-box')
export class ThemedBox extends LitElement {
  // Explicitly track the 'theme' signal
  private themeTracker = new SignalTrackingController(this, () => {
    theme() // Accessing the signal registers it as a dependency
  })

  override render() {
    return html`
      <div class="box box-${theme()}">
        <p>The current theme is ${theme()}</p>
        <button @click=${() => theme(theme() === 'dark' ? 'light' : 'dark')}>
          Toggle Theme
        </button>
      </div>
    `
  }
}
```

---

## How it Works

1. The controller attaches to the host element via `host.addController(this)`.
2. When the host connects to the DOM (`hostConnected`), the controller runs the `track` function inside an `effectScope` and `effect`.
3. Whenever a signal read inside the `track` function changes, the effect fires and calls `host.requestUpdate()`.
4. When the host disconnects (`hostDisconnected`), the effect scope is automatically disposed of, clean up all subscription handlers.

---

## Live Interactive Preview

Below is a live instance of the component using `SignalTrackingController` (observing the same shared count signal):

<ClientOnly>
  <showcase-controller-counter></showcase-controller-counter>
</ClientOnly>

