---
description: >-
  Construire sur Avalanche. Construire sans limites. Les développeurs qui s'appuient sur Avalanche peuvent facilement créer des applications puissantes, fiables et sécurisées.
---

# Documentation du développeur

## Avalanche

[Avalanche](https://avax.network) est une plateforme open-source pour lancer [des applications décentralisées](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp) et des déploiements [blockchain](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain) d'entreprise dans un seul écosystème interopérable et hautement évolutif. Avalanche est la première plateforme de contrats intelligents décentralisés construite pour l'échelle de la finance mondiale, avec une finalité de transaction quasi instantanée. Les développeurs Ethereum peuvent rapidement s'appuyer sur Avalanche car Solidity est en train de fonctionner hors de la boîte.

Une différence importante entre Avalanche et d'autres réseaux décentralisés est le protocole de consensus. Au fil du temps, les gens sont venus à une fausse compréhension que les blockchains doivent être lentes et non évolutives. Le protocole d'Avalanche utilise une nouvelle approche au consensus pour atteindre ses solides garanties de sécurité, sa finalité rapide et son haut débit sans compromettre la décentralisation.

## AVAX

AVAX est le jeton natif d'Avalanche. C'est un actif rare et dur et dur et utilisé pour payer les frais, sécuriser la plateforme par le staking et fournir une unité de compte de base entre les multiples sous-réseaux créés sur Avalanche. `1 nAVAX`est égal à .`0.000000001 AVAX`

## Protocole de consensus Avalanche

![Comparaison par consensus](.gitbook/assets/image%20%2810%29%20%281%29%20%281%29%20%281%29.png)

Les protocoles dans la famille Avalanche sont utilisés par le vote répété sous échantillon. Lorsqu'un [validateur](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) détermine si une transaction doit être acceptée ou rejetée, il demande [à](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) un petit sous-ensemble de validateurs aléatoires s'ils pensent que la transaction doit être acceptée ou rejetée. Si le validateur interrogé pense que la transaction est invalide, a déjà rejeté la transaction ou préfère une transaction en conflit, il répond qu'il pense que la transaction doit être rejetée. Sinon, elle répond qu'elle pense que la transaction devrait être acceptée.

Si une partie suffisamment grande _\(alpha _$α$\) des validateurs échantillonnés répond qu'ils pensent que la transaction doit être acceptée, le validateur préfère accepter la transaction. C'est-à-dire lorsqu'il sera interrogé sur la transaction à l'avenir, il répondra qu'il pense que la transaction devrait être acceptée. De même, le validateur préférera rejeter la transaction si une partie suffisamment grande des validateurs répond qu'ils pensent que la transaction devrait être rejetée.

Le validateur répète ce processus d'échantillonnage jusqu'à ce que _l'alpha des _validateurs interrogés réponde de la même manière \(accepter ou rejeter\) pour les séries consécutives _bêta $β _$$.

Dans le cas commun lorsqu'une transaction n'a pas de conflit, la finalisation se produit très rapidement. Lorsque des conflits existent, des validateurs honnêtes se claque rapidement sur les transactions en conflit, en entrant une boucle de rétroaction positive jusqu'à ce que tous les validateurs corrects préfèrent cette transaction. Cela conduit à l'acceptation des transactions non conflictuelles et au rejet des transactions en conflit.

![Le consensus d'Avalanche](.gitbook/assets/howavalancheconsensusworks.png)

Il est garanti \(avec une forte probabilité sur la base de paramètres du système\) que si un validateur honnête accepte ou rejette une transaction, tous les validateurs honnêtes acceptent ou rejettent cette transaction.

En savoir plus sur les composantes techniques du protocole de consensus d'Avalanche en lisant le [whitepaper](https://arxiv.org/pdf/1906.08936.pdf).

## Protocole de consensus Snowman

Snowman est un protocole de consensus optimisé par la chaîne – un débit élevé, entièrement ordonné et grand nombre de contrats intelligents. Snowman est alimenté par le [protocole](./#avalanche-consensus-protocol) de consensus d'Avalanche. [P-Chain](learn/platform-overview/#platform-chain-p-chain) et [C-Chain](learn/platform-overview/#contract-chain-c-chain) implémentent le protocole de consensus de Snowman.

## Principales caractéristiques

### Speed

Utilise un nouveau protocole de consensus, développé par une équipe d'informaticiens de Cornell, et est en mesure de confirmer de manière permanente les transactions en moins d'une seconde.

### Évolue

Capable de 4 500 transactions par seconde, un ordre de grandeur supérieur aux blockchains existantes.

### Sécurité

Assure des garanties de sécurité plus fortes bien au-dessus de la norme de 51 % des autres réseaux.

### Flexibilité

Créez facilement des blockchains personnalisées et des applications décentralisées qui contiennent presque toute logique arbitraire.

### Dur

Utilise un algorithme de consensus de preuve de jeu et non une preuve de travail.

### Support à contrat intelligent

Prend en charge la création de contrats intelligents Solidity et vos outils Ethereum préférés comme Remix, Metamask, Truffle, et plus encore.

### Blockchains privées et publiques

Créez vos propres blockchains publiques ou privées.

### Conçu pour la finance

Support autochtone pour créer et trader facilement des actifs intelligents numériques avec des règles complexes et personnalisées.

