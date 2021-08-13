# AvalancheJS

AvalancheJS est une bibliothèque JavaScript pour l'interface avec la plateforme [Avalanche.](../../../#avalanche) Il est construit en utilisant TypeScript et destiné à soutenir à la fois le navigateur et Node.js. La bibliothèque AvalancheJS permet de délivrer des commandes aux API noeud Avalanche.

Les API actuellement supportées par défaut sont:

* API administratrice
* API Auth
* API AVM \(X-Chain\)
* API EVM \(C-Chain\)
* API de santé
* API
* API Keystore
* API de métriques
* API PlatformVM

Nous avons construit AvalancheJS avec la facilité d'utilisation à l'esprit. Avec cette bibliothèque, n'importe quel développeur Javascript est capable d'interagir avec un noeud sur la Plateforme Avalanche qui a activé leurs paramètres API pour la consommation du développeur. Nous tenons la bibliothèque à jour avec les derniers changements dans la [spécification de la plate-forme Avalanche](https://docs.avax.network).

Utilisant AvalancheJS, les développeurs peuvent:

* Gérer localement clés privées
* Récupérer les soldes sur les adresses
* Obtenez UTXOs pour les adresses
* Construire et signer les transactions
* Émission des transactions signées à la chaîne X, à la chaîne P et à la chaîne C sur le réseau primaire
* Créer un sous-réseau
* Swap AVAX et les actifs entre la chaîne X, la chaîne P et la chaîne C
* Ajouter un Validator au réseau primaire
* Ajouter un délégué au réseau primaire
* Administrer un noeud local
* Récupérer les informations réseau Avalanche d'un noeud

## Exigences minimales

AvalancheJS nécessite Node.js version 12.14.1 ou plus pour compiler.

## Installation

Avalanche est disponible à l'installation via `npm`:

`npm install --save avalanche`

Vous pouvez également retirer le repo directement et la construire à partir de zéro:

`npn run build`

Cela va générer une bibliothèque Javascript pure et la placer dans un dossier nommé "web" dans la racine du projet. Le fichier "avalanchejs" peut ensuite être abandonné dans n'importe quel projet comme une implémentation pur javascript d'Avalanche.

La bibliothèque AvalancheJS peut être importée dans votre projet Node.js existant comme suit:

```text
const avalanche = require("avalanche");
```

Ou dans votre projet TypeScript comme ceci:

```text
import { Avalanche } from "avalanche"
```

## Importation de produits essentiels

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

Les lignes ci-dessus importent les bibliothèques utilisées dans les tutoriels. Les bibliothèques incluent:

* avalanche : Notre module javascript .
* bn.js: Un module grand nombre utilisé par AvalancheJS.
* buffer : Une bibliothèque tampon.
* BinTools: Un singleton intégré dans AvalancheJS qui est utilisé pour traiter les données binaires.

