# AvalancheJS

[AvalancheJS](../../../#avalanche) est une bibliothèque JavaScript pour l'interfaçage avec la plateforme Avalanche. Il est construit en utilisant TypeScript et est destiné à prendre en charge les deux navigateurs et Node.js. La bibliothèque AvalancheJS permet de délivrer des commandes aux API de nœuds Avalanche.

Les API actuellement prises en charge par défaut sont :

* API d'administration
* Auth
* API AVM \(X-Chain\)
* API EVM \(C-Chain\)
* API de santé
* API d'info
* API Keystore
* API de métriques
* API de PlatformVM

Nous avons construit AvalancheJS avec facilité d'utilisation en tête. Avec cette bibliothèque, tout développeur Javascript est en mesure d'interagir avec un nœud sur la plateforme Avalanche qui a activé ses paramètres API pour la consommation du développeur. Nous tenons la bibliothèque à jour avec les dernières modifications de la [spécification](https://docs.avax.network) de la plateforme d'Avalanche.

En utilisant AvalancheJS, les développeurs peuvent :

* Gérer localement des clés privées
* Récupérer des soldes sur les adresses
* Obtenez des UTXOs pour les adresses
* Construire et signer des transactions
* Émission des transactions signées à la X-Chain, à la P-Chain et à la C-Chain sur le réseau primaire
* Créer un sous-réseau
* Échangez AVAX et les actifs entre la X-Chain, la P-Chain et la C-Chain
* Ajouter un validateur au réseau primaire
* Ajouter un délégué au réseau primaire
* Administrer un nœud local
* Récupérer les informations du réseau Avalanche d'un nœud

## Exigences

AvalancheJS exige la version 12.14.1 de Node.js ou plus à compiler.

## Installation

Avalanche est disponible pour installer via `npm`:

`npm install --save avalanche`

Vous pouvez également retirer directement le repo et le construire à partir de zéro :

`npm run build`

Cela va générer une bibliothèque Javascript pure et la placer dans un dossier nommé "web" dans la racine du projet. Le fichier "avalanchejs" peut ensuite être déposé dans n'importe quel projet en tant que mise en œuvre pur javascript d'Avalanche.

La bibliothèque AvalancheJS peut être importées dans votre projet Node.js actuel comme suit :

```text
const avalanche = require("avalanche");
```

Ou dans votre projet TypeScript comme ceci :

```text
import { Avalanche } from "avalanche"
```

## Importer des éléments essentiels

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

Les lignes ci-dessus importent les bibliothèques utilisées dans les tutoriels. Les bibliothèques comprennent :

* avalanche : Notre module de javascript
* bn.js : Un module bignumber utilise par AvalancheJS.
* Tampon : une bibliothèque de buffer.
* BinTools: Un singleton intégré à AvalancheJS qui est utilisé pour traiter les données binaires.

