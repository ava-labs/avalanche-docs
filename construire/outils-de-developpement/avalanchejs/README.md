---
description: AvalancheJS est une bibliothèque JavaScript écrite en TypesScript
---

# AvalancheJS

AvalancheJS est une bibliothèque JavaScript pour l'interfaçage avec la plateforme Avalanche. Il est construit à l'aide de TypeScript et destiné à prendre en charge à la fois le navigateur et Node.js. La bibliothèque AvalancheJS permet d'émettre des commandes aux API du nœud Avalanche.

Les API actuellement prises en charge par défaut sont:

* Admin API
* AVM API \(X-Chain\)
* Health API
* Info API
* Keystore API
* Metrics API
* PlatformVM API

Nous avons construit AvalancheJS avec la facilité d'utilisation à l'esprit. Avec cette bibliothèque, tout développeur Javascript est capable d'interagir avec un nœud sur la plate-forme Avalanche qui a activé ses points de terminaison API pour la consommation du développeur. Nous maintenons la bibliothèque à jour avec les dernières modifications de la spécification de la [plateforme Avalanche](../../../apprendre/presentation-du-systeme/).

En utilisant AvalancheJS, les développeurs peuvent :

* Locally manage private keys
* Retrieve balances on addresses
* Get UTXOs for addresses
* Build and sign transactions
* Issue signed transactions to the X-Chain
* Create a Subnetwork
* Administer a local node
* Retrieve Avalanche network information from a node

## **Exigences**

AvalancheJS nécessite Node.js LTS version 12.14.1 ou supérieure pour la compilation.

## Installation

Avalanche est disponible pour installation via `npm`:

`npm install --save avalanche`

Vous pouvez également retirer le repo directement et le créer à partir de zéro :

`npm run build`

Cela générera une bibliothèque Javascript pure et la placera dans un dossier nommé «web» à la racine du projet. Le fichier «avalanchejs» peut ensuite être déposé dans n'importe quel projet en tant que pure implémentation javascript d'Avalanche.

La bibliothèque AvalancheJS peut être importée dans votre projet Node.js existant comme suit:

```cpp
const avalanche = require("avalanche");
```

Ou dans votre projet TypeScript comme ceci :

```cpp
import { Avalanche } from "avalanche"
```

### Importer des éléments essentiels <a id="importing-essentials"></a>

```cpp
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

Les lignes ci-dessus importent les bibliothèques utilisées dans les tutoriels. Les bibliothèques comprennent:

* avalanche: Notre module javascript.
* bn.js: Un module bignumber utilisé par AvalancheJS.
* buffer: une bibliothèque Buffer.
* BinTools: Un singleton intégré à AvalancheJS qui est utilisé pour traiter les données binaires.

