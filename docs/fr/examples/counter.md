# Démo Compteur

Cette démo montre comment gérer des états de compteur réactifs dans Lit avec `alien-lit`. Elle couvre à la fois **l'État Global Partagé** (communication multi-composants) et **l'État Local** (réactivité de widget isolé).

---

## 🌐 1. État Global Partagé

Les signaux globaux partagés sont définis en dehors de vos composants web, permettant à plusieurs composants indépendants de lire et d'écrire la même source de vérité.

### Le Code

Nous définissons un signal `count` partagé et un calcul dérivé `doubleCount` :

```typescript
import { signal, computed } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

// 1. Déclarez les signaux partagés
export const count = signal(0)
export const doubleCount = computed(() => count() * 2)

// 2. Lisez l'état dans un composant d'affichage
@customElement('counter-display')
export class CounterDisplay extends SignalWatcher(LitElement) {
  render() {
    return html`
      <div>
        <h3>Composant d'Affichage</h3>
        <p>Compteur : ${count()}</p>
        <p>Double : ${doubleCount()}</p>
      </div>
    `
  }
}

// 3. Mutez l'état dans un composant de contrôle séparé
@customElement('counter-actions')
export class CounterActions extends LitElement {
  render() {
    return html`
      <div>
        <h3>Composant d'Actions</h3>
        <button @click=${() => count(count() + 1)}>Incrémenter</button>
        <button @click=${() => count(count() - 1)}>Décrémenter</button>
        <button @click=${() => count(0)}>Réinitialiser</button>
      </div>
    `
  }
}
```

---

## 🔒 2. État Local du Composant

Si vous voulez que votre composant possède son propre état (afin que plusieurs instances du même composant restent isolées), vous pouvez déclarer les signaux comme propriétés privées dans la classe.

### Le Code

```typescript
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

@customElement('local-counter')
export class LocalCounter extends SignalWatcher(LitElement) {
  // État signal propre à l'instance
  private count = signal(0)

  render() {
    return html`
      <fieldset>
        <legend>Compteur d'Instance Locale</legend>
        <p>Compteur : ${this.count()}</p>
        <button @click=${() => this.count(this.count() + 1)}>Incrémenter Local</button>
      </fieldset>
    `
  }
}
```

---

## Aperçus Interactifs

### 1. Compteur Global Partagé
Les composants observant le signal global `count` se mettront à jour immédiatement quand vous cliquerez ci-dessous :

<ClientOnly>
  <showcase-watcher-counter></showcase-watcher-counter>
</ClientOnly>

### 2. Compteur Local
Chaque instance de ce composant maintient son propre état réactif isolé. Cliquer ci-dessous ne mettra à jour que son contexte local :

<ClientOnly>
  <showcase-local-counter></showcase-local-counter>
</ClientOnly>
