# Getting Started

`alien-lit` provides a seamless integration between the hyper-performance [alien-signals](https://github.com/stackblitz/alien-signals) reactivity library and [Lit](https://lit.dev/) Web Components.

It offers fine-grained reactivity, allowing components to automatically update only when the signals they depend on are mutated.

---

## Installation

Install `alien-lit` along with its peer dependencies `alien-signals` and `lit`:

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

## Basic Concept

With standard LitElement, you manage state via properties/attributes or custom events. While clean, this can lead to prop-drilling or component-wide updates.

`alien-lit` lets you extract state into independent, lightweight reactive primitives called **Signals**. Components then observe these signals and update reactively.

We provide two integration methods depending on your preferences:

1. **[SignalWatcher](/reference/watcher)**: Automatic, zero-boilerplate tracking.
2. **[SignalTrackingController](/reference/controller)**: Explicit, manual dependency tracking.
