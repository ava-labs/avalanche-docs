---
description: Déployez un contrat intelligent sur Avalanche en utilisant Remix et MetaMask
---

# Déployer un contrat intelligent en utilisant Remix et MetaMask

## Introduction

![](../../../.gitbook/assets/image%20%2821%29.png)

Le réseau principal d'Avalanche est un sous-réseau qui a trois chaînes: P-Chain, X-Chain et C-Chain. La C-Chain est une instance de la machine virtuelle Ethereum alimentée par le protocole de consensus Snowman d'Avalanche. Le [C-Chain RPC](../../apis/evm-api-c-chain.md) peut faire tout ce qu'un client Ethereum typique peut faire en utilisant les appels RPC standard Ethereum. Les avantages immédiats de l'utilisation de la chaîne C plutôt que de l'Ethereum sont tous les avantages de l'utilisation d'Avalanche. Ces propriétés pourraient considérablement améliorer les performances des DApps et l'expérience utilisateur.

Aujourd'hui, nous allons déployer et tester un contrat intelligent sur Avalanche en utilisant Remix et MetaMask.

## Étape 1. Configuration de MetaMask

![](https://miro.medium.com/max/453/0*3wdArqew_oibq-V5)

Connectez-vous à MetaMask -&gt; Cliquez sur le menu déralnt "Network" -&gt; Sélectionnez Custom RPC

#### **FUJI Testnet Settings:**

* **Network Name**: Avalanche FUJI C-Chain
* **New RPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `0xa869`
* **Symbol**: `C-AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **Avalanche Mainnet Settings:**

* **Network Name**: Avalanche Mainnet C-Chain
* **New RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) 
* **ChainID**: `0xa86a`
* **Symbol**: `C-AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **Local Testnet \(AVASH\) Settings:**

* **Network Name**: Avalanche Local
* **New RPC URL**:[ ](http://localhost:9650/ext/bc/C/rpc)[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**: `0xa868`
* **Symbol**: `C-AVAX`
* **Explorer**: N/A

## Étape 2. Envoyer des fonds sur votre adresse C-Chain

### Financement de votre adresse C-Chain sur FUJI

Accédez à [https://faucet.avax.network](https://faucet.avax.network) et collez votre adresse C-AVAX. Tout ce que vous avez à faire est d'ajouter un préfixe «C-» et le faucet passera d'AVAX à C-AVAX.

### Financement de votre adresse C-Chain sur le Mainnet

Le financement de votre adresse C-chain sur le réseau principal se fait via un échange inter-chaîne de X-chain à C-chain.

### Financement de votre adresse C-Chain sur votre local Testnet

Déployer votre propre faucet : Suivez de [tutoriel](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

## Étape 3. Remix: connectez MetaMask et déployez un contrat intelligent.

![](https://miro.medium.com/max/1600/0*Z2yi7M6tKT0LDlUI)

Open [Remix](https://remix.ethereum.org/) -&gt; Select Solidity

![](https://miro.medium.com/max/1600/0*8Y30-AH9TnRDjLdU)

Chargez ou créez les contrats intelligents que nous voulons compiler et déployer à l'aide de l'explorateur de fichiers Remix.

Pour cet exemple, nous déploierons un contrat ERC20 d'[OpenZeppelin](https://openzeppelin.com/contracts/)

![](https://miro.medium.com/max/1600/0*iEYJ1S-aIPM-rHki)

Accédez à l'onglet **Deploy** -&gt; Ouvrez le menu déroulant «**ENVIRONMENT**» et sélectionnez **Injected Web3** \(assurez-vous que MetaMask est chargé\).

![](https://miro.medium.com/max/1600/0*DqQ4vmMkvT82sN1p)

Une fois que nous avons injecté le web3-&gt; Revenez au compilateur et compilez le contrat sélectionné -&gt; Accédez à l'onglet **Deploy.**

![](https://miro.medium.com/max/1600/0*DqQ4vmMkvT82sN1p)

Maintenant, le contrat intelligent est compilé, MetaMask est injecté et nous sommes prêts à déployer notre ERC20. Cliquez sur «**Deploy**».

![](https://miro.medium.com/max/1600/0*w_Srnio75USlvleO)

Confirmez la transaction sur le popup de MetaMask

![](https://miro.medium.com/max/1531/0*KCe7A0rsySJVNvQl)

Notre contrat est déployé avec succès !

![](https://miro.medium.com/max/1923/1*l30noG1as7LEVQWMVFolUg.png)

Nous pouvons maintenant le développer en le sélectionnant dans l'onglet «**Deployed Contracts**» et le tester.

![](https://miro.medium.com/max/455/0*7XIuWqBlzLEgeSzC)

Le contrat ABI et Bytecode sont disponibles sur l'onglet du compilateur.

Si vous avez eu des difficultés à suivre ce tutoriel ou si vous souhaitez simplement discuter de la technologie Avalanche avec nous, vous pouvez rejoindre notre communauté sur [Telegram ](https://t.me/Avalanche_fr)!

