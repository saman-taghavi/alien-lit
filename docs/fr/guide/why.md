# Pourquoi alien-lit ?

Pour construire des applications web évolutives et réactives, vous avez besoin d'une solution de gestion d'état rapide à exécuter, facile à lire et légère pour le réseau. Voici comment `alien-lit` relève ces défis.

---

## 🚀 Réactivité Push vs Pull

Traditionnellement, Lit repose sur un modèle **push** :
* Une propriété est modifiée → le composant est marqué comme sale → l'intégralité du template est planifié pour ré-affichage.
* Si un parent transmet des données, tous les enfants réévaluent leurs templates — même si leurs valeurs pertinentes n'ont pas changé.

`alien-lit` introduit un modèle réactif à grain fin basé sur les signaux, de type **pull** :
* **Calcul Paresseux** : Les valeurs calculées ne sont réévaluées que lorsqu'elles sont lues et que leurs dépendances changent.
* **Abonnements Granulaires** : Les abonnements sont liés à des instances de composants individuelles. Seuls les composants qui lisent réellement le signal mis à jour sont notifiés.

---

## ⚡ Le Moteur alien-signals

`alien-signals` est une bibliothèque de réactivité à la pointe de la technologie, conçue pour une vitesse extrême et une empreinte mémoire minimale :
1. **Traçage des Dépendances en O(1)** : Elle maintient un graphe réactif extrêmement rapide qui propage les changements avec un surcoût minimal.
2. **Faibles Allocations Mémoire** : Elle évite les instanciations lourdes d'objets pendant les cycles de traçage, minimisant les pauses du ramasse-miettes (GC).
3. **Benchmarks** : Dans les benchmarks de réactivité brute, elle surpasse constamment les autres implémentations de signaux, ce qui en fait l'intégration la plus rapide pour les composants web.

---

## 📦 Empaquetage pour l'Échelle

Dans le développement web moderne, la taille du bundle affecte directement la vitesse de chargement des pages et les Core Web Vitals.
* **Lit Labs Signals officiel** : Ajoute **~5,7 KB** (gzippé) à votre bundle à cause du lourd polyfill de la proposition TC39.
* **`alien-lit`** : Ajoute seulement **~1,6 KB** (gzippé) pour l'intégration *complète* et le moteur de signaux.

Cela fait d'`alien-lit` le choix idéal pour les systèmes de design, les bibliothèques de composants web, les micro-frontends et les sites mobile-first où chaque kilooctet compte.

---

## 🧹 Gestion du Cycle de Vie Sans Fuites

La gestion manuelle des événements et des souscriptions dans les composants web entraîne souvent des fuites mémoire si les composants sont attachés et détachés fréquemment.

`alien-lit` gère cela automatiquement :
* Quand un composant est connecté au DOM, il met en place son contexte de traçage.
* Quand un composant est déconnecté, il libère immédiatement ses effets réactifs et se désabonne de tous les signaux.
* Si le composant est reconnecté plus tard, il observe à nouveau ses dépendances lors de son prochain rendu automatiquement.
