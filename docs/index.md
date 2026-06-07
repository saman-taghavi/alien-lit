---
layout: home

hero:
  name: "alien-lit"
  text: "Reactivity, teleported to Lit"
  tagline: A hyper-performance, zero-overhead reactive state integration for Lit components, powered by alien-signals 👽⚡
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Performance Benchmark
      link: /benchmark
    - theme: alt
      text: View on GitHub
      link: https://github.com/saman-taghavi/alien-lit

features:
  - icon: 🛸
    title: Fine-Grained & Precise
    details: Bypass Lit's component-wide template evaluation. Components subscribe automatically and update only when the signals they read actually change.
  - icon: ⚡
    title: Zero-Boilerplate DX
    details: No decorators, custom template compilers, or lifecycle hooks required. Read your signals naturally in standard templates, and let alien-lit handle the rest.
  - icon: 📦
    title: Microscopic Footprint
    details: Combined footprint of alien-lit + alien-signals is under ~1.6 KB gzipped. Built specifically for lightweight design systems and micro-frontends.
  - icon: 🛠️
    title: Progressive API Styles
    details: Start with the automatic SignalWatcher mixin for effortless reactivity, or progress to the SignalTrackingController for explicit manual dependencies.
---
