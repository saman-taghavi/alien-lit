# Why alien-lit?

State management in web components can quickly get messy. Here is why `alien-lit` powered by `alien-signals` is a great choice.

---

## 🚀 Performance
`alien-signals` is built with raw performance in mind. It uses a high-performance reactivity algorithm that outperforms other popular signal libraries (like Preact Signals or Solid Signals) in core reactivity benchmarks while keeping memory overhead to an absolute minimum.

Integrating it with Lit lets you build complex, data-heavy web applications that remain incredibly responsive.

---

## 📦 Minimal Bundle Footprint
Both Lit and `alien-signals` are designed to be extremely lightweight. By avoiding a heavy framework runtime, `alien-lit` maintains a negligible bundle footprint, making it ideal for micro-frontends, design systems, and lightweight web apps.

---

## 🎯 Fine-Grained Localized Re-renders
With standard properties, mutating a value at a parent level causes the entire component and potentially its children to request updates.

With `alien-lit`:
1. You can declare state completely outside the component tree.
2. Only the specific components that read a signal during their render pass are subscribed to updates.
3. Component updates occur automatically and precisely.

---

## 🧹 Automatic Dependency Lifecycle
By leveraging Lit's native controller and reactive update cycles, `alien-lit` automatically manages its event listeners and subscriptions. When a component is disconnected from the DOM, all subscriptions are cleaned up to prevent memory leaks.
