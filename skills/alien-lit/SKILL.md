---
name: alien-lit
description: Add fine-grained reactive signals to Lit web components using alien-lit. Use when building LitElement components that need reactive state, replacing @lit-labs/signals, wiring alien-signals into Lit's update lifecycle, auto-tracking signal reads during render, or explicitly declaring signal dependencies outside render. Always load this skill before writing any alien-lit code — it contains critical gotchas about where signals may and may not be mutated.
license: MIT
metadata:
  author: Saman Taghavi
  version: "1.1.3"
  homepage: https://saman-taghavi.github.io/alien-lit/
  source: https://github.com/saman-taghavi/alien-lit
---

# alien-lit

Fine-grained reactivity for Lit web components via alien-signals.

## Installation

```bash
npm install alien-lit alien-signals lit
# pnpm add alien-lit alien-signals lit
```

Peer deps: `alien-signals ^3.0.0`, `lit ^2.0.0 || ^3.0.0`

## Exports

| Export | Kind | When to use |
|--------|------|-------------|
| `SignalWatcher(Base)` | Mixin (function) | Auto-tracks any signal read during the full update cycle |
| `SignalTrackingController` | Class (ReactiveController) | Explicit dependency list; tracks signals outside render |

Single entry point — ESM only:

```ts
import { SignalWatcher, SignalTrackingController } from 'alien-lit'
```

## SignalWatcher — auto-tracking mixin

Wraps `performUpdate()` in an `effect()`. Every signal read during `willUpdate`, `update`, `render`, or `updated` is auto-tracked. Component re-renders when any tracked signal changes.

```ts
import { signal, computed } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

const count = signal(0)
const doubled = computed(() => count() * 2)

@customElement('my-counter')
class MyCounter extends SignalWatcher(LitElement) {
  render() {
    return html`
      <p>${count()} / ${doubled()}</p>
      <button @click=${() => count(count() + 1)}>+1</button>
    `
  }
}
```

## SignalTrackingController — explicit tracking

A `ReactiveController` that runs a `track` callback inside `effect()`. Calls `host.requestUpdate()` whenever tracked signals change. Use when tracking signals outside render (side-effects, animations, derived DOM writes).

```ts
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalTrackingController } from 'alien-lit'

const theme = signal<'light' | 'dark'>('light')

@customElement('my-themed')
class MyThemed extends LitElement {
  #tracker = new SignalTrackingController(this, () => {
    theme() // read = register dependency; no return value needed
  })

  render() {
    return html`<div class="theme-${theme()}">…</div>`
  }
}
```

Constructor: `new SignalTrackingController(host: ReactiveElement, track: () => void)`
- `track` is called immediately on `hostConnected` (triggers one `requestUpdate`) and re-runs whenever tracked signals change.
- Disposed on `hostDisconnected`; re-subscribed on re-connection.

## Decision Guide

| Need | Use |
|------|-----|
| Signals only consumed in render/update lifecycle | `SignalWatcher` |
| Track signals outside render (side-effects, controllers, non-render logic) | `SignalTrackingController` |
| Mix: auto-track in render + explicit track elsewhere | Both — compose freely |
| Fine-grained control over which signals trigger updates | `SignalTrackingController` |

## Instance vs Module Signals

```ts
// Module-level — shared across all instances
const sharedCount = signal(0)

// Instance-level — each component has its own
class MyEl extends SignalWatcher(LitElement) {
  #count = signal(0)   // private instance signal — fully supported

  render() {
    return html`<p>${this.#count()}</p>`
  }
}
```

## Gotchas

| Issue | Detail |
|-------|--------|
| ❌ Mutate signal in `render()` | Infinite loop: mutation → re-render → mutation … Never write signals in any lifecycle called during `performUpdate` (`willUpdate`, `update`, `render`, `updated`). |
| ❌ Mutate signal in `SignalTrackingController` `track` callback | Same infinite loop: `track` runs inside an `effect`; writing a signal re-triggers `track`. |
| ⚠️ `track` callback fires on `hostConnected` | First call registers deps AND calls `requestUpdate()` immediately — don't put heavy compute directly in `track`. |
| ⚠️ `SignalWatcher` tracks the full update cycle | Signals read in `willUpdate`/`updated` are also tracked — not only `render()`. |
| ✅ `render()` must be pure | Read signals freely; never write them. Put writes in event handlers or `@property` setters. |
| ✅ Disconnect/reconnect is safe | Both APIs null their dispose ref on disconnect and re-subscribe on reconnect. |

## Syntax vs @lit-labs/signals

| Operation | alien-lit (alien-signals) | @lit-labs/signals |
|-----------|---------------------------|-------------------|
| Read | `count()` | `count.get()` |
| Write | `count(newVal)` | `count.set(newVal)` |
| Computed | `computed(() => count() * 2)` | `new Signal.Computed(…)` |
| Auto-track | `SignalWatcher(Base)` | custom `html` tag or explicit `watch()` |

## Troubleshooting

- Component not re-rendering on signal change → verify the class extends `SignalWatcher(LitElement)`, not bare `LitElement`. Check signal is read (called) during render, not just imported.
- Infinite update loop → find the signal write inside a lifecycle method (`render`, `willUpdate`, `update`, `updated`) and move it to an event handler.
- `SignalTrackingController` triggers update but component shows stale value → the tracked signal drives `requestUpdate`, but `render()` must also read the signal to reflect new value.
- Memory leak after many connect/disconnect cycles → should not happen; both APIs dispose on `disconnectedCallback`. If observed, check for signals held in closures that outlive the component.
- TypeScript: `Property '__dispose' does not exist` → ensure `tsconfig.json` targets ES2022+ or uses `useDefineForClassFields: true` for private class fields.

## Agent Usage

Typical requests:
- "add signal state to this LitElement"
- "replace @lit-labs/signals with alien-lit"
- "component doesn't re-render when signal changes"
- "track a signal outside of render"

Response style:
- Confirm which API to use (mixin vs controller) before writing code.
- When fixing an infinite loop, identify the exact lifecycle method containing the write.
- Never suggest reading signals outside the component (e.g. in module scope) as a reactivity trigger — that won't schedule an update.

## Resources

- Docs: https://saman-taghavi.github.io/alien-lit/
- npm: https://www.npmjs.com/package/alien-lit
- Repo: https://github.com/saman-taghavi/alien-lit
