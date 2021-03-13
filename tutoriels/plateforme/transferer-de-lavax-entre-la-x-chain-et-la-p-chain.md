# Transférer de l'AVAX entre la X-Chain et la P-Chain

## Introduction

Les jetons AVAX existent sur la X-Chain, où ils peuvent être échangés, sur la P-Chain, où ils peuvent être fournis comme enjeu lors de la validation du réseau primaire, et sur la C-Chain, où ils peuvent être utilisés dans des contrats intelligents, ou pour payer le gaz. Dans ce didacticiel, nous enverrons des jetons AVAX entre la X-Chain et la C-Chain.

## Condition

Vous avez terminé l'[exécution d'un nœud Avalanche](../../commencer.md) et vous connaissez l'[architecture d'Avalanche](../../apprendre/presentation-du-systeme/).

Pour envoyer de l'AVAX, vous devez avoir du AVAX! Vous pouvez obtenir le vrai AVAX en l'achetant sur un échange, ou vous pouvez obtenir le AVAX du tesnet depuis le [Faucet testnet](https://faucet.avax-test.network/), qui est un moyen gratuit et facile de jouer avec Avalanche.

## Transférer de l'AVAX à l'aide du portefeuille Web

Le moyen le plus simple de transférer de l'AVAX entre les chaînes est d'utiliser le [portefeuille Avalanche](https://wallet.avax.network/), qui est un moyen non custodial et sécurisé d'accéder et de déplacer de l'AVAX.

Le code source du portefeuille Avalanche peut être trouvé [ici](https://github.com/ava-labs/avalanche-wallet).

### Étape 1 - Ouvrez le portefeuille Avalanche

![](../../.gitbook/assets/image%20%2831%29.png)

Sélectionnez **"Acces Wallet"** pour accéder à votre portefeuille. Pour connecter le portefeuille à un réseau autre que le réseau principal d'Avalanche, sélectionnez **"Mainnet"** et choisissez le réseau auquel vous connecter.

### Étape 2 - Connectez-vous à votre portefeuille

Vous pouvez accéder à votre portefeuille en utilisant la clé privée, la phrase clé mnémonique, le fichier keystore ou Ledger Nano S. Les transferts C-Chain via Ledger ne sont pas encore pris en charge.

![](../../.gitbook/assets/image%20%2830%29.png)

Après une connexion réussie, vous verrez votre solde, votre portefeuille d'actifs et diverses autres informations.

### Étape 3 - Accédez à l'onglet Cross Chain



![](../../.gitbook/assets/image%20%2833%29.png)

La fonctionnalité de transfert de jetons entre les chaînes se trouve sur l'onglet **Cross Chain**.

### Étape 4 - Entrez le montant à transférer

Vous serez présenté avec un choix pour la chaîne **source** et la chaîne de **destination**. Sélectionnez respectivement X-Chain et P-Chain. Vous verrez vos soldes X et P et un champ de saisie pour saisir le montant à transférer de la chaîne source à la chaîne de destination.

![](../../.gitbook/assets/image%20%2828%29.png)

Entrez le montant que vous souhaitez transférer de la X-Chain vers la P-Chain.

### Étape 5 - Confirmer la transaction <a id="etape-5-confirmer-la-transaction"></a>

![](../../.gitbook/assets/image%20%2832%29.png)

Appuyez sur **Confirm,** puis sur **Transfer** pour lancer le transfert.

### 

