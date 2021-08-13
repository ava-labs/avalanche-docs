# Utilisation de la truffe avec la chaîne C avalanche

## Introduction

[Truffle Suite](https://www.trufflesuite.com) est une boîte à outils pour le lancement d'applications décentralisées \(dapps\) sur l'EVM. Avec Truffle, vous pouvez écrire et compiler des contrats intelligents, construire des artefacts, exécuter des migrations et interagir avec des contrats déployés. Ce tutoriel illustre comment la Truffe peut être utilisée avec la chaîne C d'Avalanche, qui est une instance de l'EVM.

## Exigences minimales

Vous avez terminé [Run un nœud avalanche](../nodes-and-staking/run-avalanche-node.md) et vous êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/). Vous avez également effectué un swap interchaîne via le TUtoriel [Transfert AVAX entre la chaîne Xet la chaîne C](../platform/transfer-avax-between-x-chain-and-c-chain.md) pour obtenir des fonds à votre adresse C-Chain.

## Dépendances

* [Avash](https://github.com/ava-labs/avash) est un outil pour l'exécution d'un réseau local d'avalanche. C'est similaire à la [Truffle's](https://www.trufflesuite.com/ganache) Truffle.
* [NodeJS](https://nodejs.org/en) v8.9.4 ou ultérieure.
* Truffe que vous pouvez installer avec `npm install -g truffe`

## Démarrer un réseau local d'avalanche

[Avash](https://github.com/ava-labs/avash) vous permet de lancer des déploiements privés de réseau d'essais avec jusqu'à 15 noeuds AvalancheGo hors de la boîte. Avash supporte l'automatisation des tâches régulières via les scripts lua. Cela permet des tests rapides contre une grande variété de configurations. La première fois que vous utilisez avash vous aurez besoin de [l'installer et de la construire](https://github.com/ava-labs/avash#quick-setup).

Démarrer un réseau local de cinq noeuds Avalanches:

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

Un réseau de cinq noeuds Avalanche est en cours d'exécution sur votre machine. Lorsque vous voulez quitter Avash, exécutez la sortie, mais ne le faites pas `maintenant`, et ne pas fermer cet onglet terminal.

## Créer le répertoire truffe et installer dépendances

Ouvrez un nouvel onglet terminal pour que nous puissions créer un répertoire `truffle` et installer certaines dépendances.

Premièrement, naviguez dans le répertoire dans lequel vous avez l'intention de créer votre répertoire de travail `truffle`:

```text
cd /path/to/directory
```

Créer et entrer un nouveau répertoire nommé `truffe `:

```text
mkdir truffle; cd truffle
```

Utilisez `npm` pour installer [web3](https://web3js.readthedocs.io), qui est une bibliothèque par laquelle nous pouvons parler à l'EVM:

```text
npm install web3 -s
```

Nous allons utiliser web3 pour définir un fournisseur HTTP qui est la façon dont web3 parlera à l'EVM. Enfin, créer un projet de truffe de la place de chaudière :

```text
truffle init
```

## Mise à jour truffle-config.js

L'un des fichiers créés lorsque vous avez lancé `truffe init` est `truffle-config.js`. Ajoutez les éléments suivants à `truffle-config.js`.

```javascript
const Web3 = require('web3');
const protocol = "http";
const ip = "localhost";
const port = 9650;
module.exports = {
  networks: {
   development: {
     provider: function() {
      return new Web3.providers.HttpProvider(`${protocol}://${ip}:${port}/ext/bc/C/rpc`)
     },
     network_id: "*",
     gas: 3000000,
     gasPrice: 225000000000
   }
  }
};
```

Notez que vous pouvez modifier le `protocole`, l'`ip` et le `port` si vous voulez diriger les appels API vers un nœud AvalancheGo différent. Notez également que nous définissons le `gasPrice` et `le gaz` aux valeurs appropriées pour la chaîne C avalanche.

## Ajouter Storage.sol

Dans le répertoire `des` contrats, ajoutez un nouveau fichier appelé `Storage.sol` et ajoutez le bloc de code suivant:

```text
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

`Le stockage` est un contrat intelligent de solidité qui nous permet d'écrire un numéro à la blockchain via une fonction `de magasin` puis de lire le numéro de retour de la blockchain via une fonction `de` récupération.

## Ajouter une nouvelle migration

Créez un nouveau fichier dans le répertoire des `migrations` nommé `2_deploy_contracts.js`, et ajoutez le bloc de code suivant. Cette gestion gère le déploiement du contrat intelligent `Storage` dans la blockchain.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Compiler les contrats avec la truffe

Chaque fois que vous faites un changement à `Storage.sol` vous devez exécuter `la compilation truffe`.

```text
truffle compile
```

Vous devriez voir:

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## Créer, financer et débloquer un compte sur la chaîne C

Lors du déploiement `de` contrats intelligents vers la chaîne C, truffe sera par défaut au premier compte disponible fourni par votre client C-Chain comme l'adresse utilisée pendant les migrations.

### Créer un compte

Truffle a une [console](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#console) très utile que nous pouvons utiliser pour interagir avec la blockchain et notre contrat. Ouvrez la console :

```text
truffle console --network development
```

Puis, dans la console, créez le compte :

```text
truffle(development)> let account = await web3.eth.personal.newAccount()
```

Ceci revient:

```text
undefined
```

Imprimer le compte:

```text
truffle(development)> account
```

Cela imprime le compte:

```text
'0x090172CD36e9f4906Af17B2C36D662E69f162282'
```

### Débloquer votre compte:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account)
```

Ceci revient:

```text
true
```

### Financer votre compte

Suivez les étapes du tutoriel [de transfert AVAX entre la chaîne Xet](../platform/transfer-avax-between-x-chain-and-c-chain.md) la chaîne C, afin de financer le compte nouvellement créé. Vous devrez envoyer au moins `135422040` nAVAX au compte pour couvrir le coût des déploiements contractuels.

### Création et financement de compte de scription

Membre de la communauté [Cinque McFarlane-Blake](https://github.com/cinquemb) a fait un script pratique qui automatise ce processus. Vous pouvez la trouver [ici](https://github.com/ava-labs/avalanche-docs/tree/1b06df86bb23632b5fa7bf5bd5b10e8378061929/scripts/make_accounts.js). Téléchargez cette commande en utilisant cette :

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/make_accounts.js;
```

**Note**: Si vous avez suivi les étapes au début de ce tutoriel lors de la configuration de votre `truffle-config.js`, vous devrez alors modifier le script `truffle-config.js,` pour utiliser le port 9650 au lieu de port 9545 \(la valeur par défaut utilisée par truffle\).

Vous pouvez exécuter le script avec:

```text
truffle exec make_accounts.js --network development
```

Script créera un compte et financera son adresse C-Chain. Vous pouvez personnaliser le nombre de comptes et le montant de AVAX déposé en éditant les variables `maxAccounts` et `montant` dans le script.

## Exécuter les migrations

Maintenant, tout est en place pour exécuter les migrations et déployer le contrat `de` stockage:

```text
truffle(development)> migrate --network development
```

Vous devriez voir:

```text
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Migrations dry-run (simulation)
===============================
> Network name:    'development-fork'
> Network id:      1
> Block gas limit: 99804786 (0x5f2e672)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        4
   > block timestamp:     1607734632
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.91683679
   > gas used:            176943 (0x2b32f)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.08316321 ETH

   -------------------------------------
   > Total cost:          0.08316321 ETH

2_deploy_contracts.js
=====================

   Deploying 'Storage'
   -------------------
   > block number:        6
   > block timestamp:     1607734633
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.8587791
   > gas used:            96189 (0x177bd)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.04520883 ETH

   -------------------------------------
   > Total cost:          0.04520883 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.13542204 ETH
```

Si vous n'avez pas créé de compte sur la chaîne C, vous verrez cette erreur :

```text
Error: Expected parameter 'from' not passed to function.
```

Si vous n'avez pas financé le compte, vous verrez cette erreur:

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

Si vous n'avez pas déverrouillé le compte, vous verrez cette erreur:

```text
Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

## Interagissant avec votre contrat

Maintenant, le contrat `de stockage` a été déployé. Écrivons un numéro à la blockchain et puis le lisons. Ouvrez de nouveau la console truffe:

Obtenez une instance du contrat `de stockage` déployé :

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Ceci revient:

```text
undefined
```

### Écrire un numéro à la blockchain

Maintenant que vous avez une instance du contrat `de` stockage, call la méthode `de stockage` et passez dans un numéro pour écrire à la blockchain.

```javascript
truffle(development)> instance.store(1234)
```

Si vous voyez cette erreur:

```text
Error: Returned error: authentication needed: password or unlock
```

Ensuite, lancez ceci à nouveau:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account[0])
```

Vous devriez voir quelque chose comme:

```javascript
{
  tx: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
  receipt: {
    blockHash: '0x8bacbce7c9d835db524bb856288e3a73a6afbe49ab34abd8cd8826db0240eb21',
    blockNumber: 9,
    contractAddress: null,
    cumulativeGasUsed: 26458,
    from: '0x34cb796d4d6a3e7f41c4465c65b9056fe2d3b8fd',
    gasUsed: 26458,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0x0d507b0467baef742f9cc0e671eddbdf6df41d33',
    transactionHash: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
    transactionIndex: 0,
    rawLogs: []
  },
  logs: []
}
```

### Lecture d'un numéro du blockhain

Pour lire le numéro de la chaîne de bloc, appelez la méthode `de récupération` de l'instance de contrat `de` stockage.

```javascript
truffle(development)> let i = await instance.retrieve()
```

Ceci devrait revenir:

```javascript
undefined
```

Le résultat de l'appel à `récupérer` est un `BN` \(grand nombre\). Appelez sa méthode `.toNumber` pour voir la valeur:

```javascript
truffle(development)> i.toNumber()
```

Vous devriez voir le numéro que vous avez stocké.

```javascript
1234
```

## Résumé

Maintenant, vous avez les outils dont vous avez besoin pour lancer un réseau local d'avalanche, créer un projet truffe, ainsi que créer, compiler, déployer et interagir avec les contrats Solidité.

