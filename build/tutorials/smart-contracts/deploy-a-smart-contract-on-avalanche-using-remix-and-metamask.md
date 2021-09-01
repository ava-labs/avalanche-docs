# Déployez un contrat intelligent sur Avalanche en utilisant Remix et MetaMask

## Introduction

![Réseau primaire](../../../.gitbook/assets/image%20%2821%29.png)

Le réseau primaire d'Avalanche est un sous-réseau qui a trois chaînes : P-Chain, X-Chain et C-Chain. La C-Chain est une instance de la machine virtuelle Ethereum alimentée par le protocole de consensus d'Avalanche sur les snowman. Le [RPC C-Chain](../../avalanchego-apis/contract-chain-c-chain-api.md) peut faire tout ce qu'un client Ethereum peut faire en utilisant les appels RPC standard Ethereum . Les avantages immédiats d'utiliser la C-Chain plutôt que Ethereum sont tous les avantages d'utiliser Avalanche. Ces propriétés qui pourraient améliorer considérablement la performance des DApps et l'expérience utilisateur.

Aujourd'hui, nous déploierons et testerons un contrat intelligent sur Avalanche en utilisant Remix et MetaMask.

## Étape 1: Configuration de MetaMask

Connectez-vous à MetaMask -> Cliquez sur la liste déroulante du réseau -> Sélectionner un RPC personnalisé

![déroulant le réseau de metamask](../../../.gitbook/assets/image%20%2860%29.png)

#### **Paramètres du réseau principal d'Avalanche :**

* **Nom du réseau **: Avalanche Mainnet C-Chain
* **Nouvelle URL **RPC: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**:`43114`
* **Symbole **:`AVAX`
* **Explorer : **[Explorer:](https://cchain.explorer.avax.network/)

#### **FUJI Testnet**

* **Nom du réseau **: Avalanche FUJI C-Chain
* **Nouvelle URL **RPC: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**:`43113`
* **Symbole **:`AVAX`
* **Explorer : **[Explorer:](https://cchain.explorer.avax-test.network/)

#### ****Paramètres locaux de [Testnet](../../tools/avash.md) \(AVASH\)

* **Nom du réseau **: Avalanche Local
* **Nouvelle URL **RPC:[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**:`43112`
* **Symbole **:`AVAX`
* **Explorer **: N/A

## Étape 2 : Financer votre adresse C-Chain

### **Utilisation d'Avalanche Wallet**

Sur le réseau principal, vous pouvez utiliser le [portefeuille](https://wallet.avax.network/) d'Avalanche pour transférer des fonds de la X-Chain à votre adresse C-Chain. Le processus est simple, comme expliqué dans ce [tutoriel](../platform/transfer-avax-between-x-chain-and-c-chain.md). Le portefeuille peut également être utilisé sur les réseaux de test et local.

### **Utilisation du faucer de réseau de test**

Pour le financement sur le réseau de tests, vous pouvez utiliser le faucet de réseau de tests. Naviguez sur [https://faucet.avax-test.network/](https://faucet.avax-test.network/) et collez votre adresse C-Chain. Faucet saura automatiquement qu'il doit envoyer le test AVAX à C-Chain. Cliquez sur la case à cocher Captcha et sélectionnez le bouton 'Demander AVAX'. Votre adresse recevra le test AVAX en quelques secondes.

### Financement sur test local

Sur un réseau local, vous pouvez facilement financer vos adresses en suivant [cela](../platform/create-a-local-test-network.md#getting-avax).

## Étape 3 : Connectez MetaMask et déployez un contrat intelligent en utilisant Remix

Open [Remix](https://remix.ethereum.org/) -> Sélectionner la solidité

![explorateur de fichier de remix](../../../.gitbook/assets/remix-file-explorer.png)

Chargez ou créez les contrats intelligents que nous voulons compiler et déployer en utilisant l'explorateur de fichiers Remix.

Par cet exemple, nous déploierons un contrat ERC20 [example,](https://openzeppelin.com/contracts)

![Contrat ERC20](../../../.gitbook/assets/erc20-contract.png)

Naviguer pour déployer l'onglet -> Ouvrir le processus de -> L'environnement et sélectionner le Web3 injecté \(assurez-vous que MetaMask est chargé\)

![Déployer et exécuter des transactions](../../../.gitbook/assets/deploy-and-run-transactions.png)

Une fois que nous avons injecté le web3-> Retourner au compilateur et compiler le contrat sélectionné -> Naviguer pour déployer l'onglet

![compilateur de solidité](../../../.gitbook/assets/solidity-compiler.png)

Maintenant, le contrat intelligent est compilé, MetaMask est injecté, et nous sommes prêts à déployer notre ERC20. Cliquez sur "Deploy."

![Déployer erc20](../../../.gitbook/assets/deploy-erc20.png)

Confirmez la transaction sur le MetaMask pop up.

![Confirmer ERC20](../../../.gitbook/assets/confirm-erc20.png)

Notre contrat est déployé avec succès !

![métadonnées publiées](../../../.gitbook/assets/published-metadata.png)

Maintenant, nous pouvons l'étendre en le sélectionnant dans l'onglet "Contrats déployés" et en le tester.

![Interagir avec le contrat](../../../.gitbook/assets/interact-with-contract.png)

Le contrat ABI et Bytecode sont disponibles sur l'onglet du compilateur.

![ABI bytecode](../../../.gitbook/assets/abi-bytecode.png)

Si vous avez eu des difficultés à la suite de ce tutoriel ou si vous voulez simplement discuter d'Avalanche avec nous, vous pouvez rejoindre notre communauté chez [Discord](https://chat.avalabs.org/) !

