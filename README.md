---
description: >-
  Construisez sur Avalanche. Construisez sans limites. Les développeurs qui
  s'appuient sur Avalanche peuvent facilement créer des applications puissantes,
  fiables et sécurisées.
---

# Documentation du développeur

{% tabs %}
{% tab title="Vous venez d\'Ethereum?" %}


{% page-ref page="tutoriels/plateforme/deployer-un-contrat-intelligent.md" %}

{% page-ref page="./" %}
{% endtab %}

{% tab title="Portefeuille Avalanche" %}
{% page-ref page="./" %}
{% endtab %}

{% tab title="Mise en jeu" %}
{% page-ref page="commencer.md" %}

{% page-ref page="tutoriels/noeuds-et-mise-en-jeu.md" %}
{% endtab %}

{% tab title="Avancée" %}
{% page-ref page="tutoriels/plateforme/creer-un-sous-reseau-subnet.md" %}

{% page-ref page="tutoriels/plateforme/creer-une-nouvelle-blockchain.md" %}

{% page-ref page="tutoriels/actifs-numeriques-intelligents/creer-un-actif-a-capitalisation-fixe.md" %}

{% page-ref page="tutoriels/actifs-numeriques-intelligents/creer-un-actif-a-capitalisation-variable.md" %}

{% page-ref page="tutoriels/actifs-numeriques-intelligents/creation-dun-nft-partie-1.md" %}
{% endtab %}
{% endtabs %}

## Avalanche

[Avalanche](https://fr.avalabs.org/) est une plateforme open-source pour le lancement d'[applications décentralisées](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp) et de déploiements de [blockchains](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain) pour les entreprise dans un écosystème interopérable et hautement évolutif. Avalanche vous donne un contrôle complet sur les couches réseau et application, vous aidant à créer tout ce que vous pouvez imaginer.

Une différence clé entre Avalanche et d'autres réseaux décentralisés est son protocole de consensus. Au fil du temps, les gens ont compris à tort que les blockchains doivent être lentes et non évolutives. Le protocole Avalanche utilise une nouvelle approche du consensus pour atteindre ses solides garanties de sécurité, sa finalité rapide et son haut débit, sans compromettre la décentralisation.

## Avalanche Protocole de Consensus

![](.gitbook/assets/image%20%2810%29.png)

Les protocoles de la famille Avalanche fonctionnent par le biais de votes répétés sous-échantillonnés. Lorsqu'un [validateur](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) détermine si une transaction doit être acceptée ou rejetée, il demande à un petit sous-ensemble aléatoire de validateurs s'ils pensent que la transaction doit être acceptée ou rejetée. Si le validateur interrogé pense que la transaction est invalide, a déjà rejeté la transaction ou préfère une transaction en conflit, il répond qu'il pense que la transaction doit être rejetée. Sinon, il répond qu'il pense que la transaction doit être acceptée.

Si une partie suffisamment importante \(_alpha_ $$α $$\) des validateurs échantillonnés répond qu'ils pensent que la transaction devrait être acceptée, le validateur préfère accepter la transaction. Autrement dit, lorsqu'il sera interrogé sur la transaction à l'avenir, il répondra qu'il pense que la transaction devrait être acceptée. De même, le validateur préférera rejeter la transaction si une partie suffisamment importante des validateurs répond qu'ils pensent que la transaction devrait être rejetée.

Le validateur répète ce processus d'échantillonnage jusqu'à ce que l'_alpha_ des validateurs interrogés réponde de la même manière \(accepter ou rejeter\) pour les cycles _bêta_ $$β $$ consécutifs.

Dans le cas courant où une transaction n'a pas de conflit, la finalisation se produit très rapidement. En cas de conflit, les validateurs honnêtes se regroupent rapidement autour de transactions conflictuelles, entrant dans une boucle de rétroaction positive jusqu'à ce que tous les validateurs appropriés préfèrent cette transaction. Cela conduit à l'acceptation de transactions non conflictuelles et au rejet des transactions conflictuelles.

![](.gitbook/assets/image%20%286%29.png)

Il est garanti \(avec une probabilité élevée basée sur les paramètres du système\) que si un validateur honnête accepte ou rejette une transaction, tous les validateurs honnêtes accepteront ou rejetteront cette transaction.

Apprenez-en plus sur les composants techniques du protocole de consensus Avalanche en lisant le livre blanc.

## Snowman Protocole de Consensus

Snowman est un protocole de consensus optimisé pour une chaîne à haut débit, totalement ordonné et idéal pour les contrats intelligents. Snowman est alimenté par le [protocole de consensus Avalanche](./#avalanche-protocole-de-consensus). [P-Chain](apprendre/presentation-du-systeme/#chaine-de-plateformes-p-chain) et [C-Chain](apprendre/presentation-du-systeme/#chaine-de-contrats-c-chain) implémentent le protocole de consensus Snowman.

## Les principales caractéristiques

### Vitesse

Utilise un nouveau protocole de consensus, développé par une équipe d'informaticiens de Cornell, et est capable de confirmer de manière permanente les transactions en moins d'une seconde.

### Évolutivité

Capable de 4 500 transactions par seconde - un ordre de grandeur plus important que les blockchains existantes.

### Sécurité

Assure des garanties de sécurité plus solides, bien au-dessus de la norme de 51% des autres réseaux.

### Flexibilité

Créez facilement des blockchains personnalisées et des applications décentralisées contenant presque n'importe quelle logique arbitraire.

### Durabilité

Utilise un algorithme de consensus de preuve d'enjeu écoénergétique plutôt qu'une preuve de travail.

### Support de contrat intelligent

Prend en charge la création de contrats intelligents Solidity et de vos outils Ethereum préférés tels que Remix, Metamask, Truffle, etc.

### Blockchains privées et publiques

Créez vos propres blockchains publiques ou privées.

### Conçu pour la finance

Prise en charge native pour créer et échanger facilement des actifs numériques intelligents avec des ensembles de règles complexes et personnalisés

## Avalanche \(AVAX\) Jeton

Le jeton Avalanche \(AVAX\) est le jeton natif de la plate-forme Avalanche et est utilisé pour sécuriser le réseau via une mise en jeu, effectuer des transactions de pair-à-pair, payer des frais et fournir une unité de compte de base entre les multiples sous-réseaux créés sur la plateforme Avalanche. `1 nAVAX` est égal à `0.000000001 AVAX`.

