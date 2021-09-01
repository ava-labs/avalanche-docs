---
description: En savoir plus sur les frais de transaction d'Avalanche
---

# Frais de transaction

Afin d'empêcher les spam, les transactions sur Avalanche nécessitent le paiement d'une taxe de transaction. La taxe est payée en [AVAX](../../#avalanche-avax-token).** La taxe de transaction est brûlée \(détruite pour toujours\).**

Lorsque vous émettez une transaction par l'intermédiaire de l'API d'Avalanche, les frais de transaction sont automatiquement déduits de l'une des adresses que vous contrôlez.

## Calendrier des frais

Différents types de transactions nécessitent le paiement d'une redevance de transaction différente. Ce tableau montre le calendrier des frais de transaction :

{% hint style="warning" %}Le prix du gaz [C-Chain](./#contract-chain-c-chain) est de 225 nAVAX \(GWei\) avant la phase 3 d'Apricot. La limite de gaz C-Chain est de 8 \* 10e6 \(8 000 000\). La phase 3 d'Apricot introduit des frais dynamiques à la C-Chain qui permettra au prix du gaz de fluctuer entre 75 nAVAX \(GWei\) et 225 nAVAX \(GWei\) \(dépendant de l'activité du réseau\). Voir ci-dessous pour des informations plus détaillées sur les frais dynamiques dans la phase 3 d'Apricot.{% endhint %}

```cpp
+----------+-------------------+------------------------+
| Chain    : Transaction Type  | Transaction Fee (AVAX) |
+----------+-------------------+------------------------+
| P        : Create Blockchain |                   0.01 |
+----------+-------------------+------------------------+
| P        : Add Validator     |                      0 |
+----------+-------------------+------------------------+
| P        : Add Delegator     |                      0 |
+----------+-------------------+------------------------+
| P        : Create Subnet     |                   0.01 |
+----------+-------------------+------------------------+
| P        : Import AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| P        : Export AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| X        : Send              |                  0.001 |
+----------+-------------------+------------------------+
| X        : Create Asset      |                   0.01 |
+----------+-------------------+------------------------+
| X        : Mint Asset        |                  0.001 |
+----------+-------------------+------------------------+
| X        : Import AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| X        : Export AVAX       |                  0.001 |
+----------+-------------------+------------------------+
| C        : Simple send       |   0.001575 - 0.004725* |
+----------+-------------------+------------------------+

(*) C-Chain gas price varies. See below.
```

## Frais de C-Chain

L'Avalanche C-Chain utilise un algorithme pour déterminer les frais de base pour une transaction. Les frais de base augmentent lorsque l'utilisation du réseau est supérieure à l'utilisation des cibles et diminue lorsque l'utilisation du réseau est inférieure à la cible.

### Frais de base

Les frais de base peuvent être aussi bas que 75 nAVAX \(GWei\) et aussi élevés que 225 nAVAX \(GWei\). Auparavant, le prix du gaz était fixé à 225 nAVAX. Toute transaction délivrée avec l'ancien prix constant de gaz de 225 nAVAX \(GWei\) sera considérée comme valide et incluse dans un bloc. Nous recommandons que les utilisateurs passent à l'utilisation des méthodes `eth_baseFee`et de `eth_maxPriorityFeePerGas`l'API pour estimer les frais à utiliser dans leurs transactions.

### Transactions dynamiques des frais

Les frais de transaction sont basés sur les transactions dynamiques de style Ethereum EIP-1559, qui se compose d'un plafond de frais pour le gaz et d'un plafond de tuyau pour le gaz. Pour toutes les transactions existantes, qui ne spécifient qu'un seul prix de gaz, le prix du gaz sert à la fois le plafond de frais pour le gaz et le plafond de la pointe pour le gaz. Le plafond de frais pour le gaz spécifie le prix maximal que la transaction est prêt à payer par unité de gaz. Le plafond de la pointe spécifie le montant maximal au-dessus des frais de base que la transaction est prête à payer pour être incluse dans un bloc \(ce qui est également appelé les frais de priorité\). Par conséquent, le prix du gaz effectif payé par une transaction sera `min(gasFeeCap, baseFee + gasTipCap)`. Contrairement à Ethereum, où la taxe de priorité est payée au mineur qui produit le bloc, dans Avalanche, les frais de base et les frais de priorité sont brûlés.

### Metamask

MetaMask va commencer automatiquement à utiliser les transactions de frais dynamiques une fois que la phase 3 d'Apricot sera entrée en vigueur. Si vous utilisez MetaMask, vous commencerez automatiquement à profiter des frais dynamiques dès que la phase 3 d'Apricot sera en ligne.

### Comment devriez-vous profiter des frais dynamiques ?

Si vous voulez commencer à profiter des frais dynamiques, vous devrez commencer à utiliser le `DynamicFeeTx`type. Ce type de transaction permet à votre transaction de spécifier un `gasFeeCap`et un .`gasTipCap`

* `gasFeeCap`- prix maximum par unité de gaz que la transaction est prête à payer
* `gasTipCap`- montant maximal au-dessus `baseFee`d'un bloc que la transaction est prête à payer pour être inclus

Utilisez l'appel `eth_baseFee`API pour estimer les frais de base pour le prochain bloc. Si d'autres blocs sont produits entre le moment où vous construisez votre transaction et qu'elle est incluse dans un bloc, les frais de base pourraient être différents des frais de base estimés par l'appel de l'API et il est donc important de traiter cette valeur comme une estimation.

Ensuite, utilisez l'appel `eth_maxPriorityFeePerGas`API pour estimer les frais de priorité nécessaires à être inclus dans un bloc. Cet appel API examinera les blocs les plus récents et verrez les conseils qui ont été payés par les transactions récentes afin d'être inclus dans le block.

En vous basant sur ces informations, vous pouvez spécifier le et `gasTipCap`votre goût en fonction de la manière dont vous priorisez votre transaction `gasFeeCap`d'inclure le plus rapidement possible et en réduisant au minimum le prix payé par unité de gaz.

