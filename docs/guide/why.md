# Why alien-lit?

To build scalable, responsive web applications, you need a state management solution that is fast to execute, easy to read, and gentle on the network bundle size. Here is how `alien-lit` solves these challenges.

---

## 🚀 Push vs. Pull Reactivity

Traditionally, Lit relies on a **push-based** model:
* A property is changed → the component is marked dirty → the entire template is schedule to re-render.
* If a parent passes down data, all nested components evaluate their templates, even if the value they care about did not change.

`alien-lit` introduces a **pull-based** fine-grained reactive model using signals:
* **Lazy Computation**: Computed values are only re-evaluated when they are read and their dependencies have changed.
* **Granular Subscriptions**: Subscriptions are bound to individual component instances or templates. Only components that actually read the updated signal during render are notified.

---

## ⚡ The alien-signals Engine

`alien-signals` is a state-of-the-art reactivity library designed from scratch for extreme speed and minimal memory footprint:
1. **O(1) Dependency Tracking**: It maintains an incredibly fast reactive graph that resolves changes with minimal overhead.
2. **Low Memory Allocations**: It avoids heavy object instantiations during tracking cycles, keeping garbage collection (GC) pauses to a minimum.
3. **Benchmarks**: In raw reactivity benchmarks, it consistently outperforms other popular signal implementations, making it the fastest runtime integration for web components.

---

## 📦 Bundling for Scale

In modern web development, bundle size directly affects page load speeds and Core Web Vitals.
* **Official Lit Labs Signals**: Adds **~5.7 KB** (gzipped) to your bundle due to the heavy TC39 signal proposal polyfill.
* **`alien-lit`**: Adds just **~1.6 KB** (gzipped) for the *entire* integration and signal engine.

This makes `alien-lit` the clear choice for design systems, web component libraries, micro-frontends, and mobile-first websites where every kilobyte counts.

---

## 🧹 Leak-Free Lifecycle Management

Managing events and manual subscriptions in web components often leads to memory leaks if components are attached and detached frequently.

`alien-lit` handles this automatically:
* When a component is connected to the DOM, it sets up its tracking context.
* When a component is disconnected, it immediately disposes of its reactive effects and unsubscribes from all signals.
* If the component is re-connected later, it re-tracks dependencies on its next render pass automatically.
