# Performance Benchmark

Reactivity libraries are only as fast as their rendering integrations. This page showcases a live performance comparison of `alien-lit` (fine-grained updates) versus standard component-wide Lit rendering.

---

## The Bottleneck: Component-wide re-renders

In standard Lit, updating a component property triggers a full re-render of that component's template. If a component contains 1,000 sub-items or complex templates, Lit must re-evaluate all expressions in the template, even if only a single item changed.

## The Solution: Fine-grained reactivity

`alien-lit` bypasses component-wide template updates by setting up localized effects for each signal read. When a signal value changes, only the element that registered the dependency updates, completely leaving the parent component and other sibling elements untouched.

---

<ClientOnly>
  <showcase-benchmark></showcase-benchmark>
</ClientOnly>
