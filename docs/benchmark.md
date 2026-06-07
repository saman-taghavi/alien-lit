# Performance Benchmark

Reactivity libraries are only as fast as their rendering integrations. This page showcases a live performance comparison comparing:
1. **`alien-lit`** (Fine-grained reactivity using `alien-signals`)
2. **`@lit-labs/signals`** (Official Lit Labs signals integration using the TC39 signals proposal polyfill)
3. **Standard Lit Element** (Component-wide updates)

---

## Why alien-lit is faster

Both `alien-lit` and `@lit-labs/signals` provide fine-grained reactivity, meaning they avoid the bottleneck of standard Lit (re-rendering the entire parent component and evaluating templates for all 1,000 items).

However, `alien-lit` goes a step further by leveraging **`alien-signals`**, which is optimized for minimal memory allocation and faster dependency resolution compared to the standard TC39 proposal polyfill used by `@lit-labs/signals`. This results in a cleaner, faster reactive update loop.

---

<ClientOnly>
  <showcase-benchmark></showcase-benchmark>
</ClientOnly>
