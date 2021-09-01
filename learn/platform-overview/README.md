---
description: Apprendre les concepts de base et l'architecture d'Avalanche
---

# Survol de la plateforme

Avalanche propose 3 blockchains intégrées : [**Exchange Chain \(X-Chain\)**](./#exchange-chain-x-chain), [**Platform Chain \(P-Chain\)**](./#platform-chain-p-chain) et [**Contract Chain **\(C-Chain\)](./#contract-chain-c-chain). Les 3 blockchains sont [validées](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) et sécurisées par le [**réseau primaire**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Le réseau primaire est un [sous-réseau](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet) spécial et tous les membres de tous les sous-réseaux personnalisés doivent également être membres du réseau primaire en staking au moins 2 000 AVAX.

Voici des tutoriels sur [la création d'un](../../build/tutorials/platform/create-a-subnet.md) sous-réseau et l'ajout de [validateurs](../../build/tutorials/nodes-and-staking/add-a-validator.md) sur un sous-réseau.

![Réseau primaire](../../.gitbook/assets/image%20%2821%29.png)

## Sous-marins

Un sous-réseau, ou un ****sous-réseau, est un ensemble dynamique de validateurs qui travaillent ensemble pour parvenir à un consensus sur l'état d'un ensemble de blockchains. Chaque blockchain est validé par exactement un sous-réseau. Un sous-réseau peut valider de nombreuses blockchains. Un nœud peut être membre de nombreux sous-réseaux.

Un sous-réseau gère sa propre adhésion et il peut exiger que ses validateurs constitutifs aient certaines propriétés. Ceci est très utile et nous explorons ses ramifications en profondeur ci-dessous :

### Conformité

L'architecture de sous-réseau d'Avalanche rend la conformité réglementaire gérable. Comme mentionné plus haut, un sous-réseau peut exiger des validateurs qu'ils répondent à un ensemble d'exigences.

Quelques exemples sont :

* Les validateurs doivent être situés dans un pays donné
* Les validateurs doivent passer des vérifications KYC/AML
* Les validateurs doivent détenir une certaine licence

### Support pour les blockchains privées

Vous pouvez créer un sous-réseau où seuls certains validateurs prédéfinis peuvent rejoindre et créer un sous-réseau privé où le contenu des blockchains ne serait visible que pour ces validateurs. Ceci est idéal pour les organisations qui souhaitent garder leurs informations privées.

### Séparation des préoccupations

Dans un réseau hétérogène de blockchains, certains validateurs ne voudront pas valider certaines blockchains, car ils n'ont tout simplement pas d'intérêt pour ces blockchains. Le modèle de sous-réseau permet aux validateurs de ne s'intéresser qu'aux blockchains dont ils se soucient. Cela réduit le fardeau sur les validateurs.

### Exigences spécifiques à l'application

Différentes applications blockchain peuvent exiger que les validateurs aient certaines propriétés. Supposons qu'une application soit mise en place d'importantes quantités de RAM ou de puissance CPU. Un Subnet pourrait exiger que les validateurs répondent à certaines [exigences matérielles](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) de sorte que l'application ne souffre pas de faibles performances en raison de la lenteur des validateurs.

## Machines virtuelles

Une machine **virtuelle **\(VM\) définit la logique de niveau d'application d'une blockchain. En termes techniques, il spécifie l'état de la blockchain, la fonction de transition d'état, les transactions et l'API par laquelle les utilisateurs peuvent interagir avec la blockchain. Chaque blockchain sur Avalanche est une instance d'une VM.

Lorsque vous écrivez un VM, vous n'avez pas besoin de vous préoccuper d'une logique de bas niveau comme le réseautage, le consensus et la structure de la blockchain. Avalanche fait cela dans les coulisses afin que vous puissiez vous concentrer sur la chose que vous souhaitez construire.

Pensez à un VM comme un schéma d'une blockchain; vous pouvez utiliser la même VM pour créer de nombreuses blockchains, qui suivent chacune le même règlement mais est logiquement indépendant des autres blockchains.

### Pourquoi les machines virtuelles ?

Au début, les réseaux blockchain avaient une machine virtuelle \(VM\) avec un ensemble de fonctionnalités prédéfini et statique. Ce design rigide et monolithique limité les applications basées sur blockchain que l'on pourrait exécuter sur ces réseaux.

Les personnes qui voulaient des applications décentralisées personnalisées ont dû créer leur propre réseau blockchain entièrement nouveau depuis les rayures. Ce faisant, il a exigé beaucoup de temps et d'efforts, a offert une sécurité limitée et a généralement donné lieu à une blockchain sur mesure et fragiles qui n'a jamais été sorti du terrain.

Ethereum a fait un pas vers la résolution de ce problème avec des contrats intelligents. Les développeurs n'ont pas eu besoin de s'inquiéter du réseau et du consensus, mais la création d'applications décentralisées était encore difficile. La VM Ethereum a de faibles performances et impose des restrictions aux développeurs de contrats intelligents. Solidity et les quelques autres langues pour écrire des contrats intelligents Ethereum sont peu familières pour la plupart des programmeurs.

Avalanche VM \(AVM\) facilite la définition d'une application décentralisée basée sur la blockchain. Plutôt que de nouvelles langues limitées comme Solidity, les développeurs peuvent écrire des VM en Go \(d'autres langues seront prises en charge dans le futur\).

### Créer votre blockchain et votre machine virtuelle

Avalanche prend en charge la création de nouvelles instances de l'Avalanche VM.

{% page-ref page="../../build/tutorials/platform/create-avm-blockchain.md" %}

Avalanche prend également en charge la création de blockchains personnalisées avec des machines virtuelles.

{% page-ref page="../../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

{% page-ref page="../../build/tutorials/platform/create-custom-blockchain.md" %}

## Chaîne d'échange \(X-Chain\)

****La X-Chain agit comme une plateforme décentralisée pour créer et trader des actifs intelligents numériques, une représentation d'une ressource du monde réel \(par exemple, équité, obligations\) avec un ensemble de règles qui régissent son comportement, comme « ne peut être échangé avant demain » ou « ne peut être envoyé qu'aux citoyens américains ».

Un actif coté sur la X-Chain est AVAX. Lorsque vous émettez une transaction à une blockchain sur Avalanche, vous payez une redevance libellée en AVAX.

La X-Chain est une instance de la machine virtuelle d'Avalanche \(AVM\). [L'API](../../build/avalanchego-apis/exchange-chain-x-chain-api.md) X-Chain permet aux clients de créer et de trader des actifs sur la X-Chain et d'autres instances de l'AVM.

{% page-ref page="../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## Chaîne de la plateforme \(P-Chain\)

La P-Chain **est la blockchain de métadonnées sur Avalanche et coordonne les validateurs, maintient une trace des sous-réseaux actifs, et permet la création de nouveaux **sous-réseaux. La P-Chain met en œuvre le protocole de [consensus de Snowman](../../#snowman-consensus-protocol).

[L'API P-Chain](../../build/avalanchego-apis/platform-chain-p-chain-api.md) permet aux clients de créer des sous-réseaux, d'ajouter des validateurs aux sous-réseaux et de créer des blockchains.

## Chaîne de contrat \(C-Chain\)

La C-Chain **permet la création de contrats intelligents en utilisant [l'API de](../../build/avalanchego-apis/contract-chain-c-chain-api.md) **C-Chain.

La C-Chain est une instance de la machine virtuelle Ethereum alimentée par [Avalanche](../../).

