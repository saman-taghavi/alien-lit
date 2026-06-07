# Getting Started

`alien-lit` is a lightweight integration that bridges the hyper-performance of [alien-signals](https://github.com/stackblitz/alien-signals) with the flexibility of [Lit](https://lit.dev/) Web Components.

It enables fine-grained reactivity, meaning your components automatically subscribe to state changes and re-render only when the exact signals they consume are updated.

---

## The Problem

In a traditional Lit component:
1. **Component-wide re-renders**: Updating a property forces the entire component's template to re-evaluate, even if only a tiny node in the DOM changed.
2. **State Sharing**: Sharing state across components often requires event bubbles, global context providers, or heavy state managers which clutter your code with boilerplate.

## The Solution

`alien-lit` extracts your state into independent, highly optimized reactive primitives called **Signals**. Components read these signals during their render phase, automatically subscribing to updates. When a signal is mutated:
* The subscription is triggered.
* An update is scheduled.
* **Only** the affected components re-render.

---

## Installation

Install `alien-lit` along with its peer dependencies:

::: code-group

```bash [pnpm]
pnpm add alien-lit alien-signals lit
```

```bash [npm]
npm install alien-lit alien-signals lit
```

```bash [yarn]
yarn add alien-lit alien-signals lit
```

:::

---

## Quick Start (Zero Boilerplate)

The easiest way to use `alien-lit` is with the `SignalWatcher` mixin. Any signal read during the synchronous render cycle is automatically tracked, and the lifecycle is managed for you.

```typescript
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

// 1. Declare your signal state (outside the UI tree)
const count = signal(0)

// 2. Wrap your component with SignalWatcher
@customElement('simple-counter')
export class SimpleCounter extends SignalWatcher(LitElement) {
  render() {
    return html`
      <div>
        <p>Count: ${count()}</p>
        <button @click=${() => count(count() + 1)}>Increment</button>
      </div>
    `
  }
}
```

---

## Next Steps

Now that you've got the basics down, you can explore:
* **[Why alien-lit?](/guide/why)**: A deep dive into the performance benefits and architecture.
* **[Performance Benchmark](/benchmark)**: View the live comparison between alien-lit, @lit-labs/signals, and standard Lit.
* **[SignalWatcher Mixin](/reference/watcher)**: Learn about automatic, zero-boilerplate tracking.
* **[SignalTrackingController](/reference/controller)**: Learn how to explicitly track dependencies outside of rendering.
