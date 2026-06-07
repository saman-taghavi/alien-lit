import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'alien-lit',
  description: 'Fine-grained reactive state for Lit powered by alien-signals',
  base: '/alien-lit/',
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
