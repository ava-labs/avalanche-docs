---
description: >-
  Construisez sur Avalanche. Construire sans limites. Les développeurs qui construisent sur Avalanche peuvent facilement créer des applications puissantes, fiables et sécurisées.

---

# Documentation du développeur

## Avalanche

[Avalanche](https://avax.network) est une plate-forme open-source pour le lancement [d'applications décentralisées](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp) et de déploiements de [blockchain](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain) d'entreprise dans un écosystème interopérable et hautement évolutive. Avalanche est la première plate-forme de contrats intelligents décentralisés construite pour l'échelle de la finance mondiale, avec une finalité de transaction quasi instantanée. Les développeurs Ethereum peuvent rapidement construire sur Avalanche comme Solidité fonctionne out-of-the-box.

Une différence clé entre Avalanche et autres réseaux décentralisés est le protocole de consensus. Au fil du temps, les gens sont arrivés à une fausse compréhension que les chaînes de blocs doivent être lentes et pas évolutives. Le protocole Avalanche utilise une nouvelle approche du consensus pour obtenir ses solides garanties de sécurité, sa finalité rapide et son haut débit sans compromettre la décentralisation.

## AVAX

AVAX est le jeton natif d'Avalanche. C'est un actif difficile et rare qui est utilisé pour payer les frais, sécuriser la plateforme par le jalonnage, et fournir une unité de compte de base entre les multiples subnets créés sur Avalanche. `1 nAVAX` est égal à `0.001 AVAX`.

## Protocole de consensus sur l'avalanche

![Comparaison de consensus](.gitbook/assets/image%20%2810%29%20%281%29%20%281%29%20%281%29.png)

Les protocoles dans la famille Avalanche fonctionnent par le vote répété sous échantillon. Lorsqu'un [validateur](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) détermine si une [transaction](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) doit être acceptée ou rejetée, il demande à un sous-ensemble restreint et aléatoire de validateurs s'ils pensent que la transaction doit être acceptée ou rejetée. Si le validateur interrogé pense que la transaction est invalide, a déjà rejeté la transaction ou préfère une transaction conflictuelle, il répond qu'il pense que la transaction devrait être rejetée. Sinon, il répond qu'il pense que la transaction devrait être acceptée.

Si une partie suffisamment importante \(_alpha_ $$\) des validateurs échantillonnés répond qu'ils pensent que la transaction devrait être acceptée, le validateur préfère accepter la transaction. C'est-à-dire qu'il sera interrogé sur la transaction à l'avenir, il répondra qu'il pense que la transaction devrait être acceptée. De même, le validateur préférera rejeter la transaction si une partie suffisamment importante des validateurs répond qu'ils pensent que la transaction devrait être rejetée.

Le validateur répète ce processus d'échantillonnage jusqu'à ce que l'_alpha_ des validateurs interrogés répondent de la même manière \(accepter ou rejet) pour _les_ séries bêta $$β$$ consécutives.

Dans le cas commun lorsqu'une transaction n'a pas de conflits, la finalisation se produit très rapidement. Lorsque les conflits existent, les validateurs honnêtes se groupage rapidement autour des transactions conflictuelles, entrant une boucle de rétroaction positive jusqu'à ce que tous les validateurs corrects préfèrent cette transaction. Cela conduit à l'acceptation des transactions non conflictuelles et au rejet des transactions conflictuelles.

![Comment fonctionne le consensus avalanche](.gitbook/assets/howavalancheconsensusworks.png)

Il est garanti \(avec une grande probabilité basée sur les paramètres système\) que si un validateur honnête accepte ou rejette une transaction, tous les validateurs honnêtes acceptent ou rejettent cette transaction.

En savoir plus les composantes techniques du protocole de consensus Avalanche en lisant le [whitepaper](https://arxiv.org/pdf/1906.08936.pdf).

## Protocole de consensus snowman

Snowman est un protocole de consensus optimisé à la chaîne –haute débit, entièrement commandé et idéal pour les contrats intelligents. Snowman est alimenté par le [protocole de consensus Avalanche](./#avalanche-consensus-protocol). La [chaîne P](learn/platform-overview/#platform-chain-p-chain) et la [chaîne C](learn/platform-overview/#contract-chain-c-chain) implémentent le protocole de consensus Snowman.

## Caractéristiques clés

### Vitesse de la vitesse

Utilise un nouveau protocole de consensus, développé par une équipe d'informaticiens Cornell, et est en mesure de confirmer de façon permanente les transactions en moins de 1 seconde.

### Évolutivité

Capable de 4 500 transactions par second–an ordre de grandeur supérieur aux chaînes existantes.

### Sécurité

Assure des garanties de sécurité plus fortes bien au-dessus de la norme 51% des autres réseaux.

### Flexibilité

Créez facilement les chaînes de blocs personnalisées et les applications décentralisées qui contiennent presque n'importe quelle logique arbitraire.

### Durabilité

Utilise l'algorithme de consensus de la preuve de la mise en jeu économique plutôt que la preuve de travail.

### Soutien intelligent aux contrats

Supporte la création de contrats intelligents Solidité et vos outils préférés Ethereum comme Remix, Metamask, Truffle, et plus.

### Blockchaines privées et publiques

Créez vos propres blocs publics ou privés.

### Conçu pour la finance

Soutien autochtone pour la création et la négociation d'actifs numériques intelligents avec des règles complexes et personnalisées.

