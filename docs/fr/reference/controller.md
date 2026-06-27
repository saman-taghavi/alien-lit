# SignalTrackingController

Un `ReactiveController` Lit qui permet de traquer explicitement des signaux spécifiques et de déclencher des mises à jour sur le composant hôte lorsque ces signaux muent.

---

## Signature API

```typescript
export class SignalTrackingController implements ReactiveController {
  constructor(
    host: ReactiveElement,
    track: () => void
  )
}
```

* **Paramètres** :
  * `host` : L'élément hôte Lit (généralement `this` dans votre classe de composant).
  * `track` : Une fonction de callback de traçage. Tout signal lu à l'intérieur de cette fonction est enregistré comme dépendance.

---

## Pourquoi utiliser le Controller plutôt que le Mixin ?

Bien que `SignalWatcher` soit le moyen le plus simple de gérer la réactivité automatiquement, `SignalTrackingController` est préférable dans les scénarios suivants :

1. **Dépendances Explicites** : Si vous voulez déclarer explicitement quels signaux un composant surveille, plutôt que de traquer tout ce qui est lu dans le template `render()`.
2. **Hors du Cycle de Rendu** : Si vous devez déclencher des mises à jour basées sur des signaux lus dans des contrôleurs personnalisés, des effets de bord ou des méthodes de cycle de vie (ex : traçage dans une boucle d'animation personnalisée).
3. **Intégrations Tierces** : Si vous écrivez des contrôleurs Lit personnalisés ou des intégrations qui doivent gérer leur propre réactivité basée sur les signaux.

---

## Fonctionnement (Sous le Capot)

1. Le contrôleur s'enregistre auprès de l'élément hôte Lit via `host.addController(this)`.
2. Quand l'hôte se connecte au DOM (`hostConnected`), le contrôleur crée un `effectScope` et enregistre un `effect` autour de la fonction `track` fournie.
3. Quand un signal accédé dans `track()` change, l'effet est déclenché, ce qui appelle `this.host.requestUpdate()`.
4. Quand l'hôte se déconnecte (`hostDisconnected`), le scope d'effet est détruit et tous les gestionnaires de souscription sont libérés.

---

## Exemple Détaillé

```typescript
import { signal } from 'alien-signals'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SignalTrackingController } from 'alien-lit'

const userRole = signal('invité')

@customElement('admin-panel')
export class AdminPanel extends LitElement {
  // Abonnement explicite aux changements du signal 'userRole'
  private roleTracker = new SignalTrackingController(this, () => {
    userRole() // L'accès au signal l'enregistre comme dépendance
  })

  override render() {
    return html`
      <div>
        <p>Rôle actuel : ${userRole()}</p>
        ${userRole() === 'admin'
          ? html`<button>Gérer les Utilisateurs</button>`
          : html`<span>Accès Refusé</span>`}
      </div>
    `
  }
}
```

---

## Aperçu Interactif

Ci-dessous un exemple live d'un composant utilisant `SignalTrackingController` (observant un signal de compteur partagé) :

<ClientOnly>
  <showcase-controller-counter></showcase-controller-counter>
</ClientOnly>
