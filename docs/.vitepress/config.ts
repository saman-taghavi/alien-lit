import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'alien-lit',
  titleTemplate: 'alien-lit — %s',
  description: 'Fine-grained reactive state for Lit powered by alien-signals. Ultra-lightweight, zero-boilerplate reactivity for Lit web components.',
  base: '/alien-lit/',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'canonical', href: 'https://saman-taghavi.github.io/alien-lit/' }],
    ['meta', { name: 'theme-color', content: '#33cd56' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'alien-lit — Reactive State for Lit' }],
    ['meta', { property: 'og:description', content: 'Fine-grained reactive state for Lit powered by alien-signals. Ultra-lightweight, zero-boilerplate reactivity for Lit web components.' }],
    ['meta', { property: 'og:url', content: 'https://saman-taghavi.github.io/alien-lit/' }],
    ['meta', { property: 'og:site_name', content: 'alien-lit' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image', content: 'https://saman-taghavi.github.io/alien-lit/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://saman-taghavi.github.io/alien-lit/og-image.png' }],
    ['meta', { name: 'twitter:title', content: 'alien-lit — Reactive State for Lit' }],
    ['meta', { name: 'twitter:description', content: 'Fine-grained reactive state for Lit powered by alien-signals. Ultra-lightweight, zero-boilerplate reactivity for Lit web components.' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: 'alien-lit',
      description: 'Fine-grained reactive state for Lit powered by alien-signals',
      url: 'https://saman-taghavi.github.io/alien-lit/',
      applicationCategory: 'Library',
      programmingLanguage: 'TypeScript',
      license: 'https://github.com/saman-taghavi/alien-lit/blob/main/LICENSE',
      author: { '@type': 'Person', name: 'Saman Taghavi', url: 'https://github.com/saman-taghavi' },
    })],
  ],
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Reference', link: '/reference/watcher' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Why alien-lit?', link: '/guide/why' },
          { text: 'Performance Benchmark', link: '/benchmark' },
        ],
      },
      {
        text: 'Core APIs',
        items: [
          { text: 'SignalWatcher', link: '/reference/watcher' },
          { text: 'SignalTrackingController', link: '/reference/controller' },
        ],
      },
      {
        text: 'Showcases',
        items: [
          { text: 'Counter Example', link: '/examples/counter' },
          { text: 'Theming Example', link: '/examples/theming' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/saman-taghavi/alien-lit' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present',
    },
  },
})
