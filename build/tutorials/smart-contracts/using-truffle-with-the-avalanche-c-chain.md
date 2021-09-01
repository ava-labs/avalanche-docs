# Utilisation de Truffle avec la chaîne de Avalanche

## Introduction

[Truffle Suite](https://www.trufflesuite.com) est une boîte à outils pour lancer des applications décentralisées \(dapps\) sur l'EVM. Avec Truffle, vous pouvez écrire et compiler des contrats intelligents, construire des artefacts, exécuter des migrations et interagir avec des contrats déployés. Ce tutoriel illustre comment Truffle peut être utilisé avec la C-Chain d'Avalanche, qui est une instance de l'EVM.

## Exigences

Vous avez terminé [Exécuter un nœud Avalanche](../nodes-and-staking/run-avalanche-node.md) et êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/). Vous avez également effectué un échange de fonds en interchaîne via le tutoriel [AVAX de transfert entre X-Chain et C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) pour obtenir des fonds à votre adresse C-Chain.

## Dépendances

* [Avash](https://github.com/ava-labs/avash) est un outil pour l'exécution d'un réseau d'Avalanche local. Il est similaire à la [Ganache](https://www.trufflesuite.com/ganache) de Truffle.
* [NodeJS](https://nodejs.org/en) v8.9.4 ou plus tard.
* Truffle, que vous pouvez installer avec`npm install -g truffle`

## Démarrez un réseau d'Avalanche local

[Avash](https://github.com/ava-labs/avash) vous permet de lancer des déploiements de réseaux de test privés avec jusqu'à 15 nœuds AvalancheGo en dehors de la boîte. Avash prend en charge l'automatisation des tâches régulières via les scripts lua. Cela permet des tests rapides contre une grande variété de configurations. La première fois que vous utilisez Avash, vous aurez besoin de [l'installer et de la construire](https://github.com/ava-labs/avash#quick-setup).

Démarrez un réseau d'Avalanche local à cinq nœuds :

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

Un réseau Avalanche de cinq nœuds est en cours d'exécution sur votre machine. `exit`Lorsque vous voulez quitter Avash, exécutez , mais ne le faites pas maintenant et ne fermez pas cet onglet de terminal.

## Créer un répertoire truffle et installer des dépendances

Ouvrez un nouvel onglet terminal pour que nous puissions créer un `truffle`répertoire et installer d'autres dépendances.

Tout d'abord, accédez au répertoire dans lequel vous comptez créer votre répertoire de `truffle`travail :

```text
cd /path/to/directory
```

Créer et entrer un nouveau répertoire nommé `truffle`:

```text
mkdir truffle; cd truffle
```

Utilisez `npm`pour installer w[eb3,](https://web3js.readthedocs.io) qui est une bibliothèque par laquelle nous pouvons parler au MVE :

```text
npm install web3 -s
```

Nous utiliserons web3 pour configurer un fournisseur de HTTP qui est la façon dont web3 parlera à l'EVM. Enfin, créez un projet de truffe de chaudronnier :

```text
truffle init
```

Le réseau de développement \(local\) dans Avash pre-funds certaines adresses statiques lorsqu'elles sont créées. Nous utiliserons [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) pour utiliser ces adresses préfinancées comme nos comptes.

```text
npm install @truffle/hdwallet-provider
```

## Mettre à jour truffle-config.js

L'un des fichiers créés lorsque vous avez été lancé `truffle init`est .`truffle-config.js` Ajouter les informations suivantes à `truffle-config.js`.

```javascript
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const protocol = "http";
const ip = "localhost";
const port = 9650;
const provider = new Web3.providers.HttpProvider(
  `${protocol}://${ip}:${port}/ext/bc/C/rpc`
);

const privateKeys = [
  "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
  "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07",
  "0x15614556be13730e9e8d6eacc1603143e7b96987429df8726384c2ec4502ef6e",
  "0x31b571bf6894a248831ff937bb49f7754509fe93bbd2517c9c73c4144c0e97dc",
  "0x6934bef917e01692b789da754a0eae31a8536eb465e7bff752ea291dad88c675",
  "0xe700bdbdbc279b808b1ec45f8c2370e4616d3a02c336e68d85d4668e08f53cff",
  "0xbbc2865b76ba28016bc2255c7504d000e046ae01934b04c694592a6276988630",
  "0xcdbfd34f687ced8c6968854f8a99ae47712c4f4183b78dcc4a903d1bfe8cbf60",
  "0x86f78c5416151fe3546dece84fda4b4b1e36089f2dbc48496faf3a950f16157c",
  "0x750839e9dbbd2a0910efe40f50b2f3b2f2f59f5580bb4b83bd8c1201cf9a010a",
];

module.exports = {
  networks: {
    development: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: privateKeys,
          providerOrUrl: provider,
        });
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 225000000000,
    },
  },
};

```

Notez que vous pouvez changer le `protocol`, `ip`et `port`si vous voulez directement diriger des appels API vers un nœud AvalancheGo `gas`Notez également que nous définissons les valeurs et `gasPrice`les valeurs appropriées pour l'Avalanche C-Chain.

## Ajouter Storage.sol

Dans le `contracts`répertoire ajoutez un nouveau fichier appelé `Storage.sol`et ajoutez le bloc de code suivant:

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

`Storage`est un contrat intelligent de solidité qui nous permet d'écrire un numéro sur la blockchain via une `store`fonction et de lire ensuite le numéro de la blockchain via une `retrieve`fonction.

## Ajouter une nouvelle migration

Créez un nouveau fichier dans le `migrations`répertoire nommé , `2_deploy_contracts.js`et ajoutez le bloc de code suivant. Cela s'occupe du déploiement du contrat `Storage`intelligent sur la blockchain.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Compiler des contrats avec Truffe

Chaque fois que vous faites un changement à `Storage.sol`vous devez courir .`truffle compile`

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

## Comptes sur C-

Lors du déploiement de contrats intelligents sur la C-Chain, truffle sera par défaut sur le premier compte disponible fourni par votre client C-Chain en tant `from`qu'adresse utilisée lors des migrations. Nous avons ajouté quelques clés privées prédéfinies en tant que nos comptes dans le `truffle-config.json`. Le premier compte et le compte par défaut devraient avoir un certain AVAX.

### Comptes de truffes

Vous pouvez visualiser les comptes importés avec une console de truffe.

Pour ouvrir la console de truffe :
```bash
$ truffle console --network development
```

Remarque : Si vous voyez , `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`vous devez attendre que le réseau soit bootstrapped et prêt à l'emploi. Il ne devrait pas prendre trop de temps.

Console de truffe intérieure :
```bash
truffle(development)> accounts
[
  '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  '0x9632a79656af553F58738B0FB750320158495942',
  '0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430',
  '0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4',
  '0x0B891dB1901D4875056896f28B6665083935C7A8',
  '0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2',
  '0x78A23300E04FB5d5D2820E23cc679738982e1fd5',
  '0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293',
  '0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB',
  '0x0Fa8EA536Be85F32724D57A37758761B86416123'
]
```

Vous pouvez voir des soldes avec:
```bash
truffle(development)> await web3.eth.getBalance(accounts[0])
'50000000000000000000000000'

truffle(development)> await web3.eth.getBalance(accounts[1])
'0'
```
Notez que \(compte de `accounts[0]`défaut\) a un certain équilibre, mais `accounts[1]`n'a pas de solde.



### Financement du compte de scripting
Il y a un script pratique qui finance la `accounts`liste . Vous pouvez la trouver [ici](https://github.com/ava-labs/avalanche-docs/blob/master/scripts/fund-cchain-addresses.js). Vous pouvez également le télécharger en utilisant cette commande :

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js;
```

Vous pouvez exécuter le script avec :

```text
truffle exec fund-cchain-addresses.js --network development
```

Script financera 1000 AVAX sur chaque compte dans la `accounts`liste ci-dessus. Après avoir exécuté le script de manière succesfully vous pouvez vérifier les soldes avec :
```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### Financer votre compte

Si vous souhaitez financer les comptes de votre propre, suivez les étapes du didacticiel [de transfert AVAX entre X-Chain et](../platform/transfer-avax-between-x-chain-and-c-chain.md) C-Chain. Vous devrez envoyer au moins `135422040`nAVAX pour couvrir le coût des déploiements de contrats.

### API personnelles

Les API personnelles interagissent avec les comptes de nœuds. `web3`a certaines fonctions qui l'utilisent, par exemple : , `web3.eth.personal.newAccount``web3.eth.personal.unlockAccount`etc... Cependant cette API est désactivé par défaut. Il peut être activé avec `C-chain`/ `Coreth`config. Avash ne prend actuellement pas en charge l'activation de cette API . Donc, si vous voulez utiliser ces fonctionnalités, vous devez exécuter votre propre réseau manuellement avec `personal-api-enabled`. Voir [Créer un réseau de test local/manuellement](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#manually) et des [configurations de C-Chain](https://docs.avax.network/build/references/command-line-interface#c-chain-configs).


## Exécuter les migrations

Maintenant tout est en place pour exécuter les migrations et déployer le contrat `Storage`:

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

Si vous n'avez pas créé de compte sur la C-Chain, vous verrez cette erreur :

```text
Error: Expected parameter 'from' not passed to function.
```

Si vous n'avez pas financé le compte, vous verrez cette erreur :

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```


## Interagissant avec votre contrat

Maintenant le `Storage`contrat a été déployé. Écrivons un numéro à la blockchain et le lisons-le de suite. Ouvrez de nouveau la console de truffe :

Obtenez une instance du contrat déployé `Storage`:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Ceci revient:

```text
undefined
```

### Écrire un numéro à la blockchain

Maintenant que vous avez une instance du `Storage`contrat, appelez c'est la `store`méthode et passez dans un certain nombre d'écrire à la blockchain.

```javascript
truffle(development)> instance.store(1234)
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

### Lecture d'un numéro de blockhain

Pour lire le numéro de la blockchain, appelez la `retrieve`méthode de l'instance du `Storage`contrat.

```javascript
truffle(development)> let i = await instance.retrieve()
```

Cela devrait revenir :

```javascript
undefined
```

Le résultat de l'appel à `retrieve`est un `BN`\(grand nombre\). Appelez sa `.toNumber`méthode pour voir la valeur :

```javascript
truffle(development)> i.toNumber()
```

Vous devriez voir le numéro que vous avez stocké.

```javascript
1234
```

## Résumé

Maintenant vous avez les outils que vous devez lancer un réseau d'Avalanche local, créer un projet de truffes, ainsi que créer, compiler, déployer et interagir avec les contrats de Solidity.

