# Comparaison Performance & Taille

Les moteurs de réactivité ne sont utiles que dans la mesure de leurs intégrations de rendu. Cette page présente une comparaison des performances et de la taille évaluant :
1. **`alien-lit`** (Réactivité à grain fin avec `alien-signals`)
2. **`@lit-labs/signals`** (Intégration officielle Lit Labs utilisant le polyfill TC39)
3. **Lit Element Standard** (Mises à jour au niveau du composant)

---

## 📦 Comparaison de Taille

La taille du bundle affecte directement la vitesse de chargement, surtout lors de la création de composants de design system partageables ou de micro-frontends.

Voici une comparaison vérifiée des deux approches (mesurée avec `esbuild` et compressée avec `gzip`) :

| Bibliothèque + Dépendance | Taille Minifiée | Taille Gzippée | Impact Total |
| :--- | :--- | :--- | :--- |
| **`alien-lit`** (notre intégration) | **0,73 KB** | **0,36 KB** | |
| `alien-signals` (dépendance) | 3,60 KB | 1,27 KB | **1,63 KB** 🚀 |
| **`@lit-labs/signals`** (officiel) | 3,00 KB | 1,31 KB | |
| `signal-polyfill` (dépendance) | 10,00 KB | 3,21 KB | **4,52 KB** |

> [!TIP]
> `alien-lit` (incluant le moteur `alien-signals`) est **~2,8x plus petit** en taille gzippée que `@lit-labs/signals` (avec `signal-polyfill`).

---

## 🛠️ Syntaxe & Expérience Développeur

`alien-lit` offre une expérience propre et sans boilerplate. Voici une comparaison côte à côte :

### 1. Déclarer un Signal
* **`alien-lit`** : `const count = signal(0)`
* **`@lit-labs/signals`** : `const count = signal(0)`

### 2. Lire un Signal dans les Templates
* **`alien-lit`** : Il suffit d'invoquer la fonction signal. Pas besoin de directives spéciales :
  ```typescript
  render() {
    return html`<p>Le compteur est à ${count()}</p>`
  }
  ```
* **`@lit-labs/signals`** : Vous devez soit utiliser `.get()`, une directive `watch()`, ou leur tag `html` surchargé :
  ```typescript
  // Option A : get() explicite
  render() {
    return html`<p>Le compteur est à ${count.get()}</p>`
  }

  // Option B : Tag html surchargé
  import { html } from '@lit-labs/signals'
  render() {
    return html`<p>Le compteur est à ${count}</p>`
  }
  ```

### 3. Écrire dans un Signal
* **`alien-lit`** : Appelez la fonction signal avec la nouvelle valeur :
  ```typescript
  count(count() + 1)
  ```
* **`@lit-labs/signals`** : Vous devez utiliser `.set()` et `.get()` :
  ```typescript
  count.set(count.get() + 1)
  ```

### Résumé
`alien-lit` offre une expérience **aussi facile, sinon plus, à utiliser** que `@lit-labs/signals`, tout en étant beaucoup plus léger et significativement plus rapide. Il évite les parseurs de template personnalisés et exploite l'invocation de fonction standard pour lire/écrire l'état.
