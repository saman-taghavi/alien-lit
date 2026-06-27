# Mixin SignalWatcher

Un mixin TypeScript qui ajoute des mises à jour réactives automatiques et à grain fin à tout `ReactiveElement` Lit (comme `LitElement`) en interceptant son cycle de vie de rendu.

---

## Signature API

```typescript
export function SignalWatcher<T extends Constructor<ReactiveElement>>(Base: T): T
```

* **Paramètres** :
  * `Base` : Un constructeur de classe étendant `ReactiveElement` de Lit (comme `LitElement`).
* **Retourne** :
  * Un constructeur de classe amélioré avec des fonctionnalités de traçage automatique.

---

## Fonctionnement (Sous le Capot)

Le mixin enveloppe le processus de mise à jour interne de Lit en interceptant trois méthodes de cycle de vie principales :

1. **`performUpdate()`** :
   Quand Lit planifie une mise à jour, `SignalWatcher` intercepte l'appel et exécute `super.performUpdate()` à l'intérieur d'un `effect` d'`alien-signals`. Tout signal lu lors de l'exécution synchrone de `render()` est automatiquement enregistré comme dépendance.
2. **`requestUpdate()`** :
   Si l'un des signaux traqués mute ultérieurement, le callback de l'effet est déclenché, ce qui planifie automatiquement une nouvelle mise à jour sur l'élément Lit.
3. **`connectedCallback()` & `disconnectedCallback()`** :
   L'effet de traçage actif est lié au cycle de vie de connexion de l'élément. Quand le composant est déconnecté du DOM, l'effet est immédiatement libéré pour éviter les fuites mémoire. À la reconnexion, une nouvelle mise à jour est demandée pour re-traquer les dépendances.

---

## Exemple Détaillé

```typescript
import { signal, computed } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalWatcher } from 'alien-lit'

// Créez l'état
const firstName = signal('Jean')
const lastName = signal('Dupont')
const fullName = computed(() => `${firstName()} ${lastName()}`)

@customElement('user-profile')
export class UserProfile extends SignalWatcher(LitElement) {
  render() {
    return html`
      <div>
        <p>Utilisateur : <strong>${fullName()}</strong></p>
        <button @click=${() => firstName('Jeanne')}>Changer le Prénom</button>
      </div>
    `
  }
}
```

---

## Bonnes Pratiques

::: warning ⚠️ Évitez les Boucles de Mise à Jour Infinies
N'écrivez **pas** et ne mutez **pas** les signaux à l'intérieur de `render()`, `willUpdate()`, `update()` ou d'autres méthodes de cycle de vie synchrones. Cela muterait les dépendances que le cycle de rendu est en train de traquer, entraînant une boucle de ré-affichage infinie.
:::

::: tip Gardez le Rendu Pur
Assurez-vous que votre fonction `render()` reste une représentation pure de votre état. N'effectuez pas d'effets de bord à l'intérieur.
:::

---

## Aperçu Interactif

Ci-dessous un exemple live d'un composant utilisant `SignalWatcher` (écoutant un signal de compteur partagé) :

<ClientOnly>
  <showcase-watcher-counter></showcase-watcher-counter>
</ClientOnly>
