# Utilisation de Truffle avec la C-Chain d'Avalanche

## Introduction

[Truffle Suite](https://www.trufflesuite.com/) est une boîte à outils pour lancer des applications décentralisées \(dapps\) sur l'EVM. Avec Truffle, vous pouvez écrire et compiler des contrats intelligents, créer des artefacts, exécuter des migrations et interagir avec les contrats déployés. Ce tutoriel illustre comment Truffle peut être utilisé avec la C-chain d'Avalanche, qui est une instance de l'EVM.

## Conditions

Vous avez terminé l'[exécution d'un nœud Avalanche](../../commencer.md) et vous connaissez l'[architecture d'Avalanche](../../apprendre/presentation-du-systeme/). Vous avez également effectué un swap cross-chain via le tutoriel Transférer AVAX entre la X-Chain et la C-Chain pour obtenir des fonds sur votre adresse C-Chain.

## Dépendances

* [Avash](https://github.com/ava-labs/avash) est un outil permettant de gérer un réseau local Avalanche. C'est similaire à [Ganache](https://www.trufflesuite.com/ganache) de Truffle.
* [NodeJS](https://nodejs.org/en) v8.9.4 ou plus tard
* Truffle, que vous pouvez installer avec `npm install -g truffle`

## Démarrez un réseau local Avalanche

[Avash](https://github.com/ava-labs/avash) vous permet de lancer des déploiements de réseaux de test privés avec jusqu'à 15 nœuds AvalancheGo prêts à l'emploi. Avash prend en charge l'automatisation des tâches régulières via des scripts lua. Cela permet des tests rapides sur une grande variété de configurations. La première fois que vous utilisez avash, vous devrez [installer et construire](https://github.com/ava-labs/avash#quick-setup)

Démarrez un réseau local Avalanche à cinq nœuds:

```cpp
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

Un réseau Avalanche à cinq nœuds est en cours d'exécution sur votre machine. Lorsque vous souhaitez quitter Avash, exécutez `exit`, ais ne le faites pas maintenant et ne fermez pas cet onglet de terminal.

## Créer un répertoire truffle et installer les dépendances

Ouvrez un nouvel onglet de terminal pour que nous puissions créer un répertoire `truffle` et installer d'autres dépendances.

Tout d'abord, accédez au répertoire dans lequel vous comptez créer votre répertoire de travail `truffle`:

```cpp
cd /path/to/directory
```

Créez et entrez un nouveau répertoire `truffle`:

```cpp
mkdir truffle; cd truffle
```

Utilisez `npm` pour installer [web3](https://web3js.readthedocs.io), qui est une bibliothèque à travers laquelle nous pouvons parler à l'EVM:

```cpp
npm install web3 -s
```

Nous utiliserons web3 pour définir un fournisseur HTTP, c'est ainsi que web3 parlera à l'EVM. Enfin, créez un projet boilerplace Truffle:

```text
truffle init
```

## Mettre à jour truffle-config.js

L'un des fichiers créés lors de l'exécution de `truffle init`est `truffle-config.js`. Ajoutez ce qui suit à `truffle-config.js`.

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
     gasPrice: 470000000000
   }
  }
};
```

Notez que vous pouvez modifier le `protocol`, `ip` et `port` si vous souhaitez diriger les appels d'API vers un autre nœud AvalancheGo. Notez également que nous définissons `gasPrice` et`gas` sur les valeurs appropriées pour la C-Chain d'Avalanche.

## Ajoutez Storage.sol

Dans le répertoire `contracts` ajouter un nouveau fichier appelé `Storage.sol` et ajoutez le bloc de code suivant:

```cpp
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

`Storage` est un contrat intelligent Solidity qui nous permet d'écrire un numéro dans la blockchain via une fonction `store` puis de relire le numéro de la blockchain via une fonction `retrieve`.

## Ajouter une nouvelle migration

Créez un nouveau fichier dans le répertoire `migrations` nommé `2_deploy_contracts.js`, et ajoutez le bloc de code suivant. Cela gère le déploiement du contrat intelligent de `Storage` sur la blockchain.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Compiler des contrats avec Truffle

Chaque fois que vous modifiez `Storage.sol` vous devez lancer `truffle compile`.

```cpp
truffle compile
```

Vous devriez voir:

```cpp
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## Créer, financer et déverrouiller un compte sur la C-Chain

Lors du déploiement de contrats intelligents sur la C-Chain, truffle utilisera par défaut le premier compte disponible fourni par votre client C-Chain en tant `from` adresse utilisée lors des migrations.

### Créer un compte

Truffle a une [console](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#console) très utile que nous pouvons utiliser pour interagir avec la blockchain et notre contrat. Ouvrez la console:

```cpp
truffle console --network development
```

Ensuite, dans la console, créez le compte:

```cpp
truffle(development)> let account = await web3.eth.personal.newAccount()
```

Cela renvoie:

```cpp
undefined
```

Imprimez le compte:

```text
truffle(development)> account
```

Cela imprime le compte:

```text
'0x090172CD36e9f4906Af17B2C36D662E69f162282'
```

### Déverrouillez votre compte:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account[0])
```

Cela renvoie:

```text
true
```

### Financer votre compte

Suivez les étapes du didacticiel [Transférer de l'AVAX entre la X-Chain et la C-Chain](../plateforme/transferer-de-lavax-entre-la-x-chain-et-la-c-chain.md) pour financer le compte nouvellement créé. Vous devrez envoyer au moins `135422040` nAVAX au compte pour couvrir le coût des déploiements de contrat.

### Scripting la création de compte et leur financement

[Cinque McFarlane-Blake](https://github.com/cinquemb) membre de la communauté, a créé un script pratique qui automatise ce processus. Vous pouvez le trouver[ ici](https://github.com/ava-labs/avalanche-docs/tree/1b06df86bb23632b5fa7bf5bd5b10e8378061929/scripts/make_accounts.js).[ ](https://github.com/ava-labs/avalanche-docs/tree/1b06df86bb23632b5fa7bf5bd5b10e8378061929/scripts/make_accounts.js)Téléchargez-le en utilisant cette commande:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/make_accounts.js;
```

Vous pouvez exécuter le script avec:

```text
truffle exec make_accounts.js --network development
```

Script créera un compte et financera son adresse C-Chain. Vous pouvez personnaliser le nombre de comptes et le montant d'AVAX déposé en éditant les variables `maxAccounts` et `amount` dans le script.

## Exécuter les migrations

Désormais, tout est en place pour exécuter les migrations et déployer le contrat de `Storage` :

```cpp
truffle(development)> migrate --network development
```

Vous devriez voir:

```cpp
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
   > gas price:           470 gwei
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
   > gas price:           470 gwei
   > value sent:          0 ETH
   > total cost:          0.04520883 ETH

   -------------------------------------
   > Total cost:          0.04520883 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.13542204 ETH
```

Si vous n'avez pas créé de compte sur la C-Chain, vous verrez cette erreur:

```cpp
Error: Expected parameter 'from' not passed to function.
```

Si vous n'avez pas financé le compte, vous verrez cette erreur:

```cpp
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

Si vous n'avez pas déverrouillé le compte, vous verrez cette erreur:

```cpp
Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

## Interagir avec votre contrat

Maintenant le contrat `Storage`contrat a été déployé. Écrivons un nombre dans la blockchain, puis relisons-le. Ouvrez à nouveau la console de truffle:

Obtenez une instance du contrat de`Storage` déployé:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Cela retourne:

```text
undefined
```

### Écrire un nombre dans la blockchain

Maintenant que vous avez une instance du contrat de `Storage`appelez sa méthode de`store` et transmettez un numéro à écrire dans la blockchain.

```javascript
truffle(development)> instance.store(1234)
```

Si vous voyez cette erreur:

```cpp
Error: Returned error: authentication needed: password or unlock
```

Alors réexécutez ceci:

```cpp
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

### Lire un nombre de la blockchain

Pour lire le numéro de la blockchain, appelez la méthode de `retrieve` de l'instance de contrat de`Storage`

```javascript
truffle(development)> let i = await instance.retrieve()
```

Cela devrait renvoyer:

```javascript
undefined
```

Le résultat de l'appel à `retrieve` est `BN` \(big number\). Appelez sa méthode`.toNumber` pour voir la valeur:

```javascript
truffle(development)> i.toNumber()
```

Vous devriez voir le numéro que vous avez enregistré.

```javascript
1234
```

## Résumé

Vous disposez désormais des outils nécessaires pour lancer un réseau local Avalanche, créer un projet truffe, ainsi que créer, compiler, déployer et interagir avec des contrats Solidity.

