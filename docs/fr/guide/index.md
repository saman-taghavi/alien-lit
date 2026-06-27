# Démarrage

`alien-lit` est une intégration légère qui fait le pont entre la hyper-performance d'[alien-signals](https://github.com/stackblitz/alien-signals) et la flexibilité des composants Web [Lit](https://lit.dev/).

Elle permet une réactivité à grain fin : vos composants s'abonnent automatiquement aux changements d'état et ne se réaffichent que lorsque les signaux qu'ils consomment sont mis à jour.

---

## Le Problème

Dans un composant Lit traditionnel :
1. **Rendu complet du composant** : Modifier une propriété force la réévaluation de l'ensemble du template, même si seul un petit nœud du DOM a changé.
2. **Partage d'état** : Partager un état entre composants est complexe : cela nécessite des événements, des contextes globaux ou des gestionnaires d'état lourds.

## La Solution

`alien-lit` extrait votre état dans des primitives réactives indépendantes et hautement optimisées appelées **Signaux**. Les composants lisent ces signaux pendant leur phase de rendu, s'abonnant automatiquement aux mises à jour. Quand un signal est modifié :
* Le signal notifie ses observateurs.
* Une mise à jour est planifiée.
* **Seuls** les composants affectés sont mis à jour.

---

## Installation

Installez `alien-lit` ainsi que ses dépendances :

::: code-group

```bash [pnpm]
pnpm add alien-lit alien-signals lit
```

```bash [npm]
npm install alien-lit alien-signals lit
```

```bash [yarn]
yarn add alien-lit alien-signals lit
```

:::

---

## Démarrage Rapide (Zéro Boilerplate)

La façon la plus simple d'utiliser `alien-lit` est avec le mixin `SignalWatcher`. Tout signal lu pendant le cycle de rendu synchrone est automatiquement suivi, et le cycle de vie est géré pour vous.

```typescript
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

// 1. Déclarez votre état sous forme de signal (hors de l'arbre UI)
const count = signal(0)

// 2. Enveloppez votre composant avec SignalWatcher
@customElement('simple-counter')
export class SimpleCounter extends SignalWatcher(LitElement) {
  render() {
    return html`
      <div>
        <p>Compteur : ${count()}</p>
        <button @click=${() => count(count() + 1)}>Incrémenter</button>
      </div>
    `
  }
}
```

---

## Prochaines Étapes

Maintenant que vous avez les bases, explorez :
* **[Pourquoi alien-lit ?](/fr/guide/why)** : Plongée dans les bénéfices de performance et l'architecture.
* **[Benchmark Performance](/fr/benchmark)** : Comparez alien-lit, @lit-labs/signals et Lit standard.
* **[Mixin SignalWatcher](/fr/reference/watcher)** : Apprenez le traçage automatique sans boilerplate.
* **[SignalTrackingController](/fr/reference/controller)** : Traquez explicitement les dépendances hors du rendu.
