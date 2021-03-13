# Transférer de l'AVAX entre la X-Chain et  la C-Chain

## Introduction

Les jetons AVAX existent sur la X-Chain, où ils peuvent être échangés, sur la P-Chain, où ils peuvent être fournis comme enjeu lors de la validation du réseau primaire, et sur la C-Chain, où ils peuvent être utilisés dans des contrats intelligents, ou pour payer le gaz. Dans ce didacticiel, nous enverrons des jetons AVAX entre la X-Chain et la C-Chain.

## Condition

Vous avez terminé l'[exécution d'un nœud Avalanche](../../commencer.md) et vous connaissez l'[architecture d'Avalanche](../../apprendre/presentation-du-systeme/).

Pour envoyer de l'AVAX, vous devez avoir du AVAX! Vous pouvez obtenir le vrai AVAX en l'achetant sur un échange, ou vous pouvez obtenir le AVAX du tesnet depuis le [Faucet testnet](https://faucet.avax-test.network/), qui est un moyen gratuit et facile de jouer avec Avalanche.

## Transférer de l'AVAX à l'aide du portefeuille Web

Le moyen le plus simple de transférer de l'AVAX entre les chaînes est d'utiliser le [portefeuille Avalanche](https://wallet.avax.network/), qui est un moyen non custodial et sécurisé d'accéder et de déplacer de l'AVAX.

### Étape 1 - Ouvrez le portefeuille Avalanche

![](../../.gitbook/assets/image%20%2830%29.png)

Sélectionnez **"Acces Wallet"** pour accéder à votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal d'Avalanche, sélectionnez **"Mainnet"** et choisissez le réseau auquel vous connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase clé mnémonique, le fichier keystore ou Ledger Nano S. Les transferts C-Chain via Ledger ne sont pas encore pris en charge.

![](../../.gitbook/assets/image%20%2829%29.png)

Après une connexion réussie, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Accédez à l'onglet Cross Chain



![](../../.gitbook/assets/image%20%2831%29.png)

La fonctionnalité de transfert de jetons entre les chaînes se trouve sur l'onglet **Cross Chain**.

### Étape 4 - Entrez le montant à transférer

Vous serez présenté avec un choix pour la chaîne **source** et la chaîne de **destination**. Sélectionnez respectivement X-Chain et C-Chain. Vous verrez vos soldes X et C et un champ de saisie pour saisir le montant à transférer de la chaîne source à la chaîne de destination.

![](../../.gitbook/assets/image%20%2828%29.png)

Entrez le montant \(amount\) que vous souhaitez transférer de la X-Chain vers la C-Chain.

### Étape 5 - Confirmer la transaction

![](../../.gitbook/assets/image%20%2827%29.png)

Appuyez sur **Confirm,** puis sur **Transfer** pour lancer le transfert.

### Étape 6 - C'est fait!

Un transfert inter-chaîne est un processus en deux étapes: d'abord une transaction pour exporter les fonds de la X-Chain, et une autre pour les importer dans la C-Chain. Le portefeuille fera les deux et montrera sa progression tout en le faisant.

![](../../.gitbook/assets/image%20%2832%29.png)

C'est tout! Vous avez transféré de l'AVAX de la X-Chain vers la C-Chain! Vous pouvez désormais les utiliser pour déployer des contrats intelligents sur C-Chain.

{% hint style="info" %}
En cas de blocage de la transation depuis la X-Chain vers la C-Chain utiliser la fonction **"Import"** dans votre portefeuille en sélectionnant la X-Chain
{% endhint %}

### Transfert de la C-Chain à la X-Chain

Pour renvoyer l'AVAX à la X-Chain, vous devez effectuer le transfert dans la direction opposée.

Permutez la chaîne source et la chaîne de destination en les sélectionnant dans le menu déroulant **Source** et **Destination**. Le reste du processus est le même: entrez le montant \(amount\), puis appuyez sur **Confirm,** et ensuite sur **Transfer** pour lancer le transfert.

## Transfert de la X-Chain à la C-Chain avec des appels d'API





