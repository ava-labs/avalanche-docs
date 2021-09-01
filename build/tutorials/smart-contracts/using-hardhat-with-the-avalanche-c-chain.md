# Utilisation de Hardhat avec la chaîne de Avalanche

## Introduction

Avalanche est une plateforme open-source pour lancer des applications décentralisées et des déploiements blockchain d'entreprise dans un seul écosystème interopérable et hautement évolutif. Avalanche vous donne un contrôle complet sur les couches de réseau et you vous aidant à construire tout ce que vous pouvez imaginer.

Le réseau Avalanche est composé de nombreuses blockchains. L'une de ces blockchains est la C-Chain \(Contract Chain\), qui est une instance de machine virtuelle Ethereum. L'API de C-Chain est presque identique à l'API d'un nœud Ethereum node. Avalanche offre la même interface que Ethereum mais avec une vitesse plus élevée, un débit plus élevé, des frais plus faibles et des temps de confirmation de transaction. Ces propriétés améliorent considérablement la performance de DApps et l'expérience utilisateur des contrats intelligents.

L'objectif de ce guide est de présenter les meilleures pratiques en matière d'écriture, de test et de déploiement de contrats intelligents à la C-Chain d'Avalanche. Nous construirons des contrats intelligents avec l'environnement de développement [Hardhat](https://hardhat.org).

## Préalables

### NodeJS et Fils de

D'abord, installez la version LTS \(prise en charge à long terme\) des [nodejs](https://nodejs.org/en). Ceci est `14.17.0`au moment de la rédaction de la loi. `npm`NodeJS .

Ensuite, installez [le fil ](https://yarnpkg.com):

```zsh
npm install -g yarn
```

### AvalancheGo et Avash

[AvalancheGo](https://github.com/ava-labs/avalanchego) est une implémentation de nœuds d'Avalanche écrite en Go. [Avash](https://docs.avax.network/build/tools/avash) est un outil pour déployer rapidement les réseaux de test locaux. Ensemble, vous pouvez déployer des réseaux de test locaux et exécuter des tests sur eux.

### Solidité et Avalanche

Il est également utile d'avoir une compréhension de base de [la solidité](https://docs.soliditylang.org) et de l'[Avalanche](https://docs.avax.network).

## Dépendances

Cliquer le [dépôt de démarrage rapide](https://github.com/ava-labs/avalanche-smart-contract-quickstart) et installer les paquets nécessaires via `yarn`.

```zsh
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## Écrire des contrats

Modifier le `Coin.sol`contrat dans . `contracts/``Coin.sol`est un [contrat](https://eips.ethereum.org/EIPS/eip-20) [ouvert Zeppelin](https://openzeppelin.com) ERC20. ERC20 est une interface de contrat intelligente populaire. Vous pouvez également ajouter vos propres contrats.

## Hardhat Config

Hardhat utilise `hardhat.config.js`comme fichier de configuration. Vous pouvez définir des tâches, des réseaux, des compilateurs et plus encore dans ce fichier. Pour plus d'informations, voir [ici](https://hardhat.org/config/).

Dans notre dépôt, nous utilisons un fichier [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts). Ce fichier configure les informations réseau nécessaires pour fournir une interaction fluide avec Avalanche. Il y a également quelques clés privées prédéfinies pour les tests sur un réseau de test local.

## Tâches Hardhat

Vous pouvez définir des tâches hardhat personnalisées dans [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts). Deux tâches sont incluses dans les exemples : `accounts`et .`balances` Les deux ont des scripts dans [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json).

```json
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts``yarn balances`imprime la liste des comptes. Comme avec d'autres `yarn`scripts, vous pouvez passer dans un `--network`drapeau aux tâches de hardhat.

### Comptes

L'imprimante fait imprimer une liste de comptes sur le réseau Avash local.

```zsh
$ yarn accounts --network local
yarn run v1.22.4
npx hardhat accounts --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
0x9632a79656af553F58738B0FB750320158495942
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4
0x0B891dB1901D4875056896f28B6665083935C7A8
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2
0x78A23300E04FB5d5D2820E23cc679738982e1fd5
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB
0x0Fa8EA536Be85F32724D57A37758761B86416123
```

### Soldes

Imprime une liste de comptes et leurs soldes AVAX correspondants sur le réseau Avash local.

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000000000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 0
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 0
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 0
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 0
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 0
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 0
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 0
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 0
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 0
```

Notez que le premier compte est déjà financé. En effet, cette adresse est pre-funded dans le fichier de genèse du réseau local.


## Aide Hardhat

Exécuter `yarn hardhat`pour répertorier la version de Hardhat, les instructions d'utilisation, les options mondiales et les tâches disponibles.

## Flux de travail Avash typique

### Exécuter Avash

Confirmez d'abord que vous avez construit la dernière AvalancheGo.

```zsh
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

\(Notez que vous pouvez également [télécharger les binaires](https://github.com/ava-labs/avalanchego/releases) that pré-compilés plutôt que de construire à partir de la source.\)

Démarrez Avash et exécutez un script pour démarrer un nouveau réseau local.

```zsh
$ cd /path/to/avash
$ git fetch -p
$ git checkout master
$ go build
$ ./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
$ avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua
```

Maintenant vous exécutez un réseau d'Avalanche local avec 5 nœuds.

### Comptes de fonds

`hardhat.config.ts`Transférez 1 000 AVAX de la X-Chain à chacun des 10 comptes avec le script .[`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js) Le financement de ces comptes est une condition préalable au déploiement et à l'interaction avec les contrats intelligents.

Remarque : Si vous voyez `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`, vous devez attendre que le réseau soit bootstrapped et prêt à l'emploi. Il ne devrait pas prendre trop de temps.


```zsh
$ cd /path/to/avalanche-smart-contract-quickstart
$ yarn fund-cchain-addresses
yarn run v1.22.4
npx hardhat run scripts/fund-cchain-addresses.js --network local
Exporting 1000 AVAX to each address on the C-Chain...
2b75ae74ScLkWe5GVFTYJoP2EniMywkcZySQUoFGN2EJLiPDgp
Importing AVAX to the C-Chain...
2dyXcQGiCk1ckCX4Fs8nLgL8GJgsM72f9Ga13rX5v9TAguVJYM
✨  Done in 5.03s.
```

Confirmer que chacun des comptes est financé avec 1 000 AVAX.

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000001000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000000000000000000
✨  Done in 0.72s.
```

Envoyez chacun des comptes un certain AVAX du premier compte.

```zsh
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

Confirmer que les soldes sont mis à jour

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 49999999995275000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000010000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000010000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000010000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000010000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000010000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000010000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000010000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000010000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000010000000000000000
```

### Compiler des contrats intelligents

Dans il y [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)a un `compile`script.

```json
"compile": "npx hardhat compile",
```

Exécutez `yarn compile`pour s'assurer que votre projet se compile.

Compiler le contrat intelligent.

```zsh
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## Déployer des contrats intelligents

Hardhat permet de déployer sur de multiples environnements. Dans [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) il y a un script pour le déploiement.

Modifier le script de déploiement dans`scripts/deploy.ts`

```json
"deploy": "npx hardhat run scripts/deploy.ts",
```

Vous pouvez choisir l'environnement auquel vous souhaitez se déployer en passant dans le `--network`drapeau avec \(par exemple un réseau local créé avec Avash\), `fuji`ou `mainnet`pour chaque environnement `local`respectif. Si vous ne passez pas dans ce `--network`cas, il sera par défaut au réseau de hardhat. Par exemple, si vous voulez déployer sur le réseau :

```zsh
yarn deploy --network mainnet
```

Déployez le contrat sur votre réseau local

```zsh
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

Nous avons maintenant un jeton déployé à `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`.

### Interagir avec un contrat intelligent

Hardhat a une console de développeurs pour interagir avec les contrats et le réseau. Pour plus d'informations sur la console de Hardhat, consultez [ici](https://hardhat.org/guides/hardhat-console.html). La console Hardhat est une NodeJS-REPL, et vous pouvez utiliser différents outils dans elle. [ethers](https://docs.ethers.io/v5/) est la bibliothèque que nous utiliserons pour interagir avec notre réseau.

Vous pouvez ouvrir la console avec :

```zsh
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

Obtenez l'instance du contrat avec l'adresse d'usine et du contrat pour interagir avec notre contrat :

```js
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

La première ligne récupère l'usine de contrat avec ABI et bytecode. La deuxième ligne récupère une instance de cette usine de contrat avec une adresse du contrat donnée. Rappelez-vous que notre contrat a été déjà déployé `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`dans l'étape précédente.

Fetch les comptes:

```js
> let accounts = await ethers.provider.listAccounts()
undefined
> accounts
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
Ceci est exactement la même liste de compte que dans `yarn accounts`.

Maintenant nous pouvons interagir avec notre `ERC-20`contrat:

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'0'
```

`account[0]`dispose d'un solde parce que `account[0]`le compte par défaut. Le contrat est déployé avec ce compte. Le constructeur d'[ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol) `TOTAL_SUPPLY`de 123456789 jettent le jeton au déploiement du contrat.

`accounts[1]`actuellement n'a pas d'équilibre. Envoyez quelques jetons à `accounts[1]`, qui est `0x9632a79656af553F58738B0FB750320158495942`.

```js
> let result = await coin.transfer(accounts[1], 100)
undefined
> result
{
  hash: '0x35eec91011f9089ba7689479617a90baaf8590395b5c80bb209fa7000e4848a5',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 3,
  data: '0xa9059cbb0000000000000000000000009632a79656af553f58738b0fb7503201584959420000000000000000000000000000000000000000000000000000000000000064',
  r: '0xc2b9680771c092a106eadb2887e5bff41fcda166c8e00f36ae79b196bbc53d36',
  s: '0x355138cb5e2b9f20c15626638750775cfc9423881db374d732a8549d05ebf601',
  v: 86260,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

Note: puisque c'est un réseau local, nous n'avons pas besoin d'attendre que la transaction soit acceptée. `fuji``mainnet`Cependant pour d'autres réseaux comme ou vous devez attendre que la transaction soit acceptée avec : .`await result.wait()`

Maintenant nous pouvons nous assurer que les jetons sont transférés :

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456689'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'100'
```

Comme vous pouvez le constater, il n'y avait pas d'informations "d'expéditeur" `await coin.transfer(accounts[1], 100)`; c'est parce que `ethers`utilise le premier signataire comme le signataire par défaut. Dans le cas d'espèce, ceci est `account[0]`. Si nous voulons utiliser un autre compte, nous devons d'abord le connecter avec lui.

```js
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

Maintenant nous pouvons appeler le contrat avec `signer1`, qui est `account[1]`.

```js
> await contractAsSigner1.transfer(accounts[0], 5)
{
  hash: '0x807947f1c40bb723ac312739d238b62764ae3c3387c6cdbbb6534501577382dd',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x9632a79656af553F58738B0FB750320158495942',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 2,
  data: '0xa9059cbb0000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000005',
  r: '0xcbf126dd0b109491d037c5f3af754ef2d0d7d06149082b13d0e27e502d3adc5b',
  s: '0x5978521804dd15674147cc6b532b8801c4d3a0e94f41f5d7ffaced14b9262504',
  v: 86259,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

Vérifions les soldes maintenant :

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456694'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'95'
```

Nous avons successivement transféré 5 tokes de `accounts[1]`à`accounts[0]`

## Résumé

Maintenant vous avez les outils que vous devez lancer un réseau d'Avalanche local, créer un projet Hardhat, ainsi que créer, compiler, déployer et interagir avec les contrats de Solidity.

Rejoignez notre [serveur Discord](https://chat.avax.network) pour en savoir plus et posez toutes les questions que vous pourriez avoir.