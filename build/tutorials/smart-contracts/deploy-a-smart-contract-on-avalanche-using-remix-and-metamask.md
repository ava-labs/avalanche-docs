# Déployer un contrat intelligent sur Avalanche en utilisant Remix et MetaMask

## Introduction

![Réseau primaire](../../../.gitbook/assets/image%20%2821%29.png)

Le réseau primaire d'Avalanche est un sous-réseau qui a trois chaînes : P-Chain, P-Chain, et C-Chain. La chaîne C est une instance de la machine virtuelle Ethereum alimentée par le protocole de consensus d'Avalanche Snowman. Le [RPC chaîne C](../../avalanchego-apis/contract-chain-c-chain-api.md) peut faire n'importe quoi qu'un client Ethereum typique peut en utilisant les appels RPC standard Ethereum . Les avantages immédiats d'utiliser la chaîne C plutôt que Ethereum sont tous les avantages d'utiliser Avalanche. Ces propriétés qui pourraient considérablement améliorer les performances de DApps et l'expérience utilisateur.

Aujourd'hui, nous allons déployer et tester un contrat intelligent sur Avalanche en utilisant Remix et MetaMask.

## Étape 1: Configuration du MetaMask

Connectez-vous à MetaMask -> Cliquez sur le réseau déroulante -> Sélectionner RPC personnalisé

![metamask réseau abandonné](../../../.gitbook/assets/image%20%2860%29.png)

#### **Paramètres du réseau d'avalanche:**

* **Nom du réseau**: Avalanche Mainnet C-Chain
* **Nouvelle URL RPC**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Symbole **: `AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI Paramètres de testnet:**

* **Nom du réseau**: Avalanche FUJI C-Chain
* **Nouvelle URL RPC**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Symbole **: `AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

#### **Paramètres de test local:** [(Tutoriel](https://docs.avax.network/build/tools/avash) Avash)

* **Nom du réseau**: Avalanche locale
* **Nouvelle URL RPC:http://localhost:9650/ext/bc/C/rpc**[](http://localhost:9650/ext/bc/C/rpc)[](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**: `43112`
* **Symbole **: `AVAX`
* **Explorateur**: N/A

## Étape 2: Financement de votre adresse de chaîne C

### **Utilisation du Portefeuille Avalanche**

Sur le réseau principal, vous pouvez utiliser le [Portefeuille Avalanche](https://wallet.avax.network/) pour transférer des fonds de la chaîne Xà votre adresse C-Chain. Le processus est simple, comme expliqué dans ce [tutoriel](../platform/transfer-avax-between-x-chain-and-c-chain.md). Portefeuille peut être utilisé sur les réseaux de test et locaux, aussi.

### **Utilisation du robinet réseau de test**

Pour le financement sur le réseau de test, vous pouvez également utiliser le robinet de réseau de test. Naviguez vers [https://faucet.avax-test.network/](https://faucet.avax-test.network/) et collez votre adresse C-AVAX. Tout ce que vous devez faire est d'ajouter un préfixe "C-" et le robinet passera de AVAX.

### Financement sur test local

Sur un réseau local, vous pouvez facilement financer vos adresses en déployant votre propre robinet. [Tutoriel](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

## Étape 3: Connecter MetaMask et déployer un contrat intelligent à l'aide de Remix

Ouvrir [Remix](https://remix.ethereum.org/) -> Sélectionner la solidité

![explorateur de fichier remix](../../../.gitbook/assets/remix-file-explorer.png)

Chargez ou créez les contrats intelligents que nous voulons compiler et déployer à l'aide de l'explorateur de fichiers Remix.

Par cet exemple, nous allons déployer un contrat ERC20 depuis [OpenZeppelin](https://openzeppelin.com/contracts).

![Contrat ERC20](../../../.gitbook/assets/erc20-contract.png)

Naviguez pour Déployer l'onglet -> Ouvrir le déroutement "ENVIRONNEMENT" et sélectionnez Web3 injecté \(assurez-vous que MetaMask est chargé\)

![Déployer et exécuter des transactions](../../../.gitbook/assets/deploy-and-run-transactions.png)

Une fois que nous avons injecté le web3-> Retournez au compilateur et compilez le contrat sélectionné -> Naviguer pour Déployer l'onglet

![compilateur de solidité](../../../.gitbook/assets/solidity-compiler.png)

Maintenant, le contrat intelligent est compilé, MetaMask est injecté, et nous sommes prêts à déployer notre ERC20. Cliquez sur "Deploy."

![Déployer erc20](../../../.gitbook/assets/deploy-erc20.png)

Confirmez la transaction sur la pop up MetaMask.

![Confirmer ERC20](../../../.gitbook/assets/confirm-erc20.png)

Notre contrat est déployé avec succès!

![métadonnées publiées](../../../.gitbook/assets/published-metadata.png)

Maintenant, nous pouvons l'étendre en le sélectionnant dans l'onglet "Contrats déployés" et it dehors.

![Interagir avec contrat](../../../.gitbook/assets/interact-with-contract.png)

Le contrat ABI et Bytecode sont disponibles sur l'onglet compilateur.

![ABI bytecode](../../../.gitbook/assets/abi-bytecode.png)

Si vous avez eu des difficultés à la suite de ce tutoriel ou simplement vouloir discuter d'Avalanche avec nous, vous pouvez rejoindre notre communauté chez [Discord](https://chat.avalabs.org/)!

