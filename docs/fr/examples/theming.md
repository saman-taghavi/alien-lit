# Démo Thème Dynamique

Cette démo montre comment construire un store de thème global réactif et le consommer dans des composants Lit. Nous utiliserons `SignalWatcher` pour les mises à jour de style UI et `SignalTrackingController` pour les effets de bord (comme la synchronisation du thème sur la liste de classes du `document.body`).

---

## 🎨 1. Le Store de Thème

Nous déclarons un signal typé `currentTheme` et une fonction mutatrice `toggleTheme()` dans un fichier store séparé :

```typescript
import { signal } from 'alien-signals'

export type Theme = 'light' | 'dark' | 'synthwave'

export const currentTheme = signal<Theme>('dark')

export function toggleTheme() {
  const nextTheme: Record<Theme, Theme> = {
    light: 'dark',
    dark: 'synthwave',
    synthwave: 'light',
  }
  currentTheme(nextTheme[currentTheme()])
}
```

---

## 🖥️ 2. Composant UI (SignalWatcher)

Le composant `ThemedPanel` utilise le mixin `SignalWatcher` pour réévaluer automatiquement ses classes CSS à chaque changement de thème, garantissant des mises à jour de style instantanées :

```typescript
import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'
import { currentTheme, toggleTheme } from './themeStore'

@customElement('themed-panel')
export class ThemedPanel extends SignalWatcher(LitElement) {
  static styles = css`
    .panel {
      padding: 1.5rem;
      border-radius: 12px;
      transition: background-color 0.3s, color 0.3s;
      border: 1px solid var(--vp-c-divider);
    }
    .dark      { background: #1e1e24; color: #f5f5f7; }
    .light     { background: #fafafa; color: #1a1a1a; }
    .synthwave { background: #2b0f54; color: #ff7df9; }
  `

  override render() {
    const theme = currentTheme()
    return html`
      <div class="panel ${theme}">
        <h2>Thème Actif : ${theme.toUpperCase()}</h2>
        <p>Le style du panneau réagit instantanément aux changements du signal de thème.</p>
        <button @click=${toggleTheme}>Changer de Thème</button>
      </div>
    `
  }
}
```

---

## 🔄 3. Effets de Bord (SignalTrackingController)

Si vous devez effectuer des effets de bord en dehors des templates de rendu (ex : synchronisation avec des API DOM externes, stockage local ou télémétrie), `SignalTrackingController` est l'outil parfait :

```typescript
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalTrackingController } from 'alien-lit'
import { currentTheme } from './themeStore'

@customElement('theme-body-sync')
export class ThemeBodySync extends LitElement {
  // Synchronise le thème sur la classe du <body>
  private themeSync = new SignalTrackingController(this, () => {
    const theme = currentTheme()
    document.body.className = `theme-${theme}`
  })

  override render() {
    return html`<p>Synchronisation du thème actif sur le body...</p>`
  }
}
```

---

## Aperçu Interactif

Essayez de changer le store de thème global ci-dessous pour voir le style CSS s'adapter immédiatement en temps réel :

<ClientOnly>
  <showcase-theme-panel></showcase-theme-panel>
</ClientOnly>
