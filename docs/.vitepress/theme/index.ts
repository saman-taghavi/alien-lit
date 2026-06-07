import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      import('./customElements')
    }
  },
}
