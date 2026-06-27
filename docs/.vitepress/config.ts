import { defineConfig } from 'vitepress'

const ogImage = 'https://saman-taghavi.github.io/alien-lit/og-image.png'
const ogUrl = 'https://saman-taghavi.github.io/alien-lit/'

export default defineConfig({
  lang: 'en-US',
  title: 'alien-lit',
  description: 'Fine-grained reactive state for Lit powered by alien-signals. Ultra-lightweight, zero-boilerplate reactivity for Lit web components.',
  base: '/alien-lit/',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'canonical', href: ogUrl }],
    ['meta', { name: 'theme-color', content: '#33cd56' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'alien-lit' }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:locale:alternate', content: 'fr_FR' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: 'alien-lit',
      description: 'Fine-grained reactive state for Lit powered by alien-signals',
      url: ogUrl,
      applicationCategory: 'Library',
      programmingLanguage: 'TypeScript',
      license: 'https://github.com/saman-taghavi/alien-lit/blob/main/LICENSE',
      author: { '@type': 'Person', name: 'Saman Taghavi', url: 'https://github.com/saman-taghavi' },
    })],
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: 'Fine-grained reactive state for Lit powered by alien-signals. Ultra-lightweight, zero-boilerplate reactivity for Lit web components.',
      head: [
        ['meta', { property: 'og:title', content: 'alien-lit — Reactive State for Lit' }],
        ['meta', { property: 'og:description', content: 'Fine-grained reactive state for Lit powered by alien-signals. Ultra-lightweight, zero-boilerplate reactivity for Lit web components.' }],
        ['meta', { property: 'og:locale', content: 'en_US' }],
        ['meta', { name: 'twitter:title', content: 'alien-lit — Reactive State for Lit' }],
        ['meta', { name: 'twitter:description', content: 'Fine-grained reactive state for Lit powered by alien-signals. Ultra-lightweight, zero-boilerplate reactivity for Lit web components.' }],
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
      },
    },
    fr: {
      label: 'Français',
      lang: 'fr-FR',
      link: '/fr/guide/',
      title: 'alien-lit',
      description: 'État réactif à grain fin pour Lit propulsé par alien-signals. Ultra-léger, réactivité sans boilerplate pour les composants Web Lit.',
      head: [
        ['meta', { property: 'og:title', content: 'alien-lit — État réactif pour Lit' }],
        ['meta', { property: 'og:description', content: 'État réactif à grain fin pour Lit propulsé par alien-signals. Ultra-léger, réactivité sans boilerplate pour les composants Web Lit.' }],
        ['meta', { property: 'og:locale', content: 'fr_FR' }],
        ['meta', { name: 'twitter:title', content: 'alien-lit — État réactif pour Lit' }],
        ['meta', { name: 'twitter:description', content: 'État réactif à grain fin pour Lit propulsé par alien-signals. Ultra-léger, réactivité sans boilerplate pour les composants Web Lit.' }],
      ],
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/fr/guide/' },
          { text: 'Référence', link: '/fr/reference/watcher' },
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Démarrage', link: '/fr/guide/' },
              { text: 'Pourquoi alien-lit?', link: '/fr/guide/why' },
              { text: 'Benchmark Performance', link: '/fr/benchmark' },
            ],
          },
          {
            text: 'API Principales',
            items: [
              { text: 'SignalWatcher', link: '/fr/reference/watcher' },
              { text: 'SignalTrackingController', link: '/fr/reference/controller' },
            ],
          },
          {
            text: 'Démos',
            items: [
              { text: 'Exemple Compteur', link: '/fr/examples/counter' },
              { text: 'Exemple Thème', link: '/fr/examples/theming' },
            ],
          },
        ],
      },
    },
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/saman-taghavi/alien-lit' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present',
    },
  },
})
