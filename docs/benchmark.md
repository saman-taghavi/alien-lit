# Performance & Size Comparison

Reactivity libraries are only as fast as their rendering integrations. This page showcases a live performance comparison comparing:
1. **`alien-lit`** (Fine-grained reactivity using `alien-signals`)
2. **`@lit-labs/signals`** (Official Lit Labs signals integration using the TC39 signals proposal polyfill)
3. **Standard Lit Element** (Component-wide updates)

---

## ⚡ Live Benchmark

Both `alien-lit` and `@lit-labs/signals` provide fine-grained reactivity, meaning they avoid the bottleneck of standard Lit (re-rendering the entire parent component and evaluating templates for all 1,000 items).

However, `alien-lit` goes a step further by leveraging **`alien-signals`**, which is optimized for minimal memory allocation and faster dependency resolution compared to the standard TC39 proposal polyfill used by `@lit-labs/signals`.

<ClientOnly>
  <showcase-benchmark></showcase-benchmark>
</ClientOnly>

---

## 📦 Package Size Comparison

Bundle size is critical for web components, especially when used in design systems or micro-frontends. Here is a size comparison of the two approaches:

| Library + Dependency | Library Size (Min+Gzip) | Dependency Size (Min+Gzip) | Total Bundle Impact |
| :--- | :--- | :--- | :--- |
| **`alien-lit`** + `alien-signals` | **0.65 KB** | **0.80 KB** | **~1.45 KB** 🚀 |
| **`@lit-labs/signals`** + `signal-polyfill` | ~1.20 KB | ~4.50 KB | **~5.70 KB** |

> [!TIP]
> `alien-lit` (including the `alien-signals` runtime) is **~4x smaller** in gzipped bundle size than `@lit-labs/signals` (with `signal-polyfill`).

---

## 🛠️ Ease of Use / Syntax Comparison

`alien-lit` offers a clean, boilerplate-free developer experience. Here is a head-to-head syntax comparison:

### 1. Declaring a Signal
Both libraries offer a simple functional declaration:
* **`alien-lit`**: `const count = signal(0)`
* **`@lit-labs/signals`**: `const count = signal(0)`

### 2. Reading a Signal in Templates
* **`alien-lit`**: Simply invoke the signal function. No special directives or custom HTML tags needed:
  ```typescript
  render() {
    return html`<p>The count is ${count()}</p>`
  }
  ```
* **`@lit-labs/signals`**: You must either explicitly call `.get()`, use a `watch()` directive, or use their custom overridden `html` template tag:
  ```typescript
  // Option A (Explicit get)
  render() {
    return html`<p>The count is ${count.get()}</p>`
  }

  // Option B (Overridden html tag)
  import { html } from '@lit-labs/signals'
  render() {
    return html`<p>The count is ${count}</p>`
  }
  ```

### 3. Writing to a Signal
* **`alien-lit`**: Call the signal function with the new value. Very clean:
  ```typescript
  count(count() + 1)
  ```
* **`@lit-labs/signals`**: You must call `.set()` and `.get()` on the state object:
  ```typescript
  count.set(count.get() + 1)
  ```

### Summary
`alien-lit` provides an experience that is **as easy, if not easier, to use** than `@lit-labs/signals`, while remaining much lighter and significantly faster. It avoids custom template parsers and leverages standard function invocation for reading/writing state.
