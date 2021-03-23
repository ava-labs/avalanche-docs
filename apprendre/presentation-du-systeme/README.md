---
description: Apprenez les concepts de base et l'architecture d'Avalanche
---

# Aperçu de la plateforme

Avalanche dispose de 3 blockchains intégrées : ****[**Chaîne d'échange \(X-Chain\)**](./#chaine-dechange-x-chain), ****[**Chaîne de plateforme \(P-Chain**](./#chaine-de-plateforme-p-chain)**\)**, ****[**Chaîne de contrat \(C-Chain\)**](./#chaine-de-contrat-c-chain)**.** Les 3 blockchains sont validées et sécurisées par le [réseau primaire](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Le réseau principal est un sous-réseau \([subnet](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet)\) spécial et tous les membres de tous les sous-réseaux personnalisés doivent également être membres du réseau principal en mettant en jeu au moins 2 000 AVAX.

Voici des tutoriels sur la [création d'un sous-réseau](../../construire/tutoriels/plateforme/creer-un-sous-reseau-subnet.md) et l'[ajout de validateurs](../../construire/tutoriels/noeuds-et-mise-en-jeu/ajouter-un-validateur.md) à un sous-réseau.

![](../../.gitbook/assets/image%20%281%29.png)

## Sous-réseaux \(Subnets\)

Un sous-réseau, ou subnet, est un ensemble dynamique de validateurs travaillant ensemble pour parvenir à un consensus sur l'état d'un ensemble de blockchains. Chaque blockchain est validée par exactement un sous-réseau. Un sous-réseau peut valider de nombreuses blockchains. Un nœud peut être membre de plusieurs sous-réseaux.

Un sous-réseau gère sa propre appartenance, et il peut exiger que ses validateurs le constituant aient certaines propriétés. Ceci est très utile, et nous explorons ses ramifications plus en profondeur ci-dessous :

### Conformité

L’architecture de sous-réseau d’Avalanche rend la conformité réglementaire maniable. Comme mentionné ci-dessus, un sous-réseau peut nécessiter des validateurs pour répondre à un ensemble arbitraire d'exigences. Cela peut inclure des exigences de conformité, telles que :

* Les validateurs doivent être situés dans un pays donné.
* Les validateurs doivent passer un contrôle KYC.
* Les validateurs doivent détenir une certaine licence.

### Prise en charge des blockchains privées

On peut créer un sous-réseau auquel seuls certains validateurs prédéfinis peuvent se joindre. De cette façon, on pourrait créer un sous-réseau privé où le contenu des blockchains ne serait visible que par ces validateurs.

### Séparation des préoccupations

Dans un réseau hétérogène de blockchains, certains validateurs ne voudront pas valider certaines blockchains car ils n'ont tout simplement aucun intérêt pour ces blockchains. Le modèle de sous-réseau permet aux validateurs de se préoccuper uniquement des blockchains qui leur tiennent à cœur, plutôt que de forcer les validateurs à se préoccuper de l'état de chaque blockchain. Cela réduit le fardeau des validateurs.

### Exigences spécifiques à l'application

Différentes applications basées sur la blockchain peuvent exiger que les validateurs aient certaines propriétés. Par exemple, supposons qu'une application nécessite de grandes quantités de RAM ou de puissance CPU. Un sous-réseau peut exiger que les validateurs satisfassent à [certaines exigences matérielles](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) afin que l'application ne souffre pas de performances faibles en raison de la lenteur des validateurs.

## Machine Virtuelle \(VM\) ?

Une **machine virtuelle \(VM\)** définit la logique au niveau de l'application d'une blockchain. En termes techniques, il définit une machine à états. Il spécifie l'état de la blockchain, la fonction de transition d'état, les transactions et l'API via laquelle les utilisateurs peuvent interagir avec la blockchain. Chaque blockchain sur le réseau Avalanche est une instance d'une machine virtuelle.

Lorsqu'un développeur écrit une machine virtuelle, il n'a pas besoin de se préoccuper de la logique de niveau inférieur comme la mise en réseau, le consensus et la structure de la blockchain. Avalanche fait tout cela dans les coulisses afin que les développeurs puissent se concentrer sur ce qu'ils aimeraient construire.

Pensez à une machine virtuelle comme un modèle pour une blockchain; on peut utiliser la même machine virtuelle pour créer arbitrairement plusieurs blockchains, dont chacune suit le même jeu de règles mais est logiquement indépendante des autres blockchains.

### L'intérêt des machines virtuelles

Au début, les réseaux blockchain avaient une machine virtuelle avec un ensemble de fonctionnalités statiques prédéfinies. Cette conception rigide et monolithique limitait les applications basées sur la blockchain que l'on pouvait exécuter sur de tels réseaux.

Les personnes qui voulaient des applications décentralisées personnalisées devaient créer leur propre réseau de blockchain entièrement nouveau à partir de zéro. Cela demandait beaucoup de temps et d'efforts, offrait une sécurité limitée et aboutissait généralement à une blockchain sur mesure et fragile qui n'a jamais démarré.

Ethereum a fait un pas en avant pour résoudre ce problème avec les contrats intelligents. Les développeurs n'avaient pas à se soucier de la mise en réseau et du consensus, mais la création d'applications décentralisées était encore difficile. La machine virtuelle Ethereum a de faibles performances et impose des restrictions aux développeurs de contrats intelligents. Solidity et les quelques autres langages pour écrire des contrats intelligents Ethereum ne sont pas familiers à la plupart des programmeurs.

Les machines virtuelles d'Avalanche facilitent la définition d'une application décentralisée basée sur la blockchain. Plutôt que des langages peu utilisés et mal compris comme Solidity, les développeurs peuvent écrire des machines virtuelles dans Go. \(Avalanche prendra en charge la création de VM dans d'autres langues populaires à l'avenir.\)

### Créer votre blockchain et votre machine virtuelle

Avalanche ne prend pas encore en charge la création de nouvelles machines virtuelles \(VM\). Actuellement, Avalanche ne prend en charge que la création de nouvelles instances de la VM Avalanche.

{% page-ref page="../../construire/tutoriels/plateforme/creer-une-nouvelle-blockchain.md" %}

À l'avenir, Avalanche vous permettra de définir et de lancer des blockchains personnalisées, et nous publierons des SDK pour vous aider à le faire.

{% page-ref page="../../construire/tutoriels/plateforme/creer-une-machine-virtuelle.md" %}

## Chaîne d'échange **\(X-Chain\)**

La **X-Chain** agit comme une plateforme décentralisée pour créer et échanger des actifs numériques intelligents, une représentation d'une ressource du monde réel \(par exemple, des actions, des obligations\) avec un ensemble de règles qui régissent son comportement, comme «ne peut pas être échangé jusqu'à ce que demain »ou« ne peut être envoyé qu'aux citoyens américains. »

Un actif négocié sur la X-Chain est AVAX. Lorsque vous émettez une transaction vers une blockchain sur Avalanche, vous payez des frais libellés en AVAX.

La X-Chain est une instance de la machine virtuelle Avalanche \(AVM\). L'[API X-Chain](../../construire/apis/avm-api-x-chain.md) permet aux clients de créer et d'échanger des actifs sur la X-Chain et d'autres instances de l'AVM.

{% page-ref page="../../construire/tutoriels/actifs-numeriques-intelligents/creer-un-actif-a-capitalisation-fixe.md" %}

## Chaîne de plateforme **\(P-Chain\)**

La **P-Chain** est la blockchain de métadonnées sur Avalanche et coordonne les validateurs, garde la trace des sous-réseaux actifs et permet la création de nouveaux sous-réseaux. La P-Chain _\*\*_implémente le protocole de consensus Snowman.

L'[API P-Chain](../../construire/apis/platform-api-p-chain.md) permet aux clients de créer des sous-réseaux, d'ajouter des validateurs aux sous-réseaux et de créer des blockchains.

## Chaîne de contrat \(C-Chain\)

La C-Chain permet la création de contrats intelligents à l'aide de l'[API de la C-Chain](../../construire/apis/evm-api-c-chain.md).

La C-Chain est une instance de la machine virtuelle Ethereum alimentée par Avalanche.

