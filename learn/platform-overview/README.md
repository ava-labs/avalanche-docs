---
description: Apprenez les concepts et l'architecture de base d'Avalanche

---

# Aperçu de la plate-forme

Avalanche dispose de 3 blocs intégrés: [**Chaîne d'échange \(X-Chain\)**](./#exchange-chain-x-chain), [**chaîne de la**](./#platform-chain-p-chain) plate-forme \(X-Chain\), et [**chaîne de contrat**](./#contract-chain-c-chain) \(X-Chain\), Les 3 chaînes de blocs sont [validées](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) et sécurisées par le [**réseau primaire**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Le réseau primaire est un [sous-réseau](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet) spécial, et tous les membres de tous les sous-réseaux personnalisés doivent également être membres du réseau primaire en étalant au moins 2000 AVAX.

Voici des tutoriels sur [la création d'un sous-réseau](../../build/tutorials/platform/create-a-subnet.md) et l'ajout de [validateurs](../../build/tutorials/nodes-and-staking/add-a-validator.md) à un sous-réseau.

![Réseau primaire](../../.gitbook/assets/image%20%2821%29.png)

## Sous-marins

Un **sous-réseau**, ou sous-réseau, est un ensemble dynamique de validateurs travaillant ensemble pour parvenir à un consensus sur l'état d'un ensemble de blockchains. Chaque blockchain est validé par exactement un sous-réseau. Un sous-réseau peut valider de nombreuses chaînes de blocs. Un noeud peut être membre de nombreux sous-réseaux.

Un sous-réseau gère sa propre adhésion, et il peut exiger que ses validateurs constitutifs aient certaines propriétés. Ceci est très utile, et nous explorons ses ramifications plus en profondeur ci-dessous:

### Conformité

L'architecture sous-réseau d'Avalanche rend la conformité réglementaire gérable. Comme mentionné ci-dessus, un sous-réseau peut exiger des validateurs qu'ils répondent à un ensemble d'exigences.

Quelques exemples incluent :

* Les validateurs doivent être situés dans un pays donné
* Les validateurs doivent passer des vérifications KYC/AML
* Les validateurs doivent détenir une certaine licence

### Soutien aux chaînes privées

Vous pouvez créer un sous-réseau où seuls certains validateurs prédéfinis peuvent rejoindre et créer un sous-réseau privé où le contenu des chaînes de blocs serait visible uniquement par ces validateurs. Ceci est idéal pour les organisations intéressées à garder leurs informations privées.

### Séparation des préoccupations

Dans un réseau hétérogène de blockchains, certains validateurs ne voudront pas valider certaines chaînes de blockchains, car ils n'ont tout simplement aucun intérêt dans ces blockchains. Le modèle sous-réseau permet aux validateurs de ne se préoccuper que des chaînes de blocs qu'ils ont souciées. Cela réduit la charge des validateurs.

### Exigences spécifiques à l'application

Différentes applications basées sur la blockchain peuvent exiger des validateurs qu'ils aient certaines propriétés. Supposons qu'il y ait une application qui nécessite de grandes quantités de puissance RAM ou CPU. Un Subnet pourrait exiger que les validateurs répondent à certaines [exigences matérielles](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) de sorte que l'application ne souffre pas de faible performance en raison de l'utilisation des validateurs lents.

## Machines virtuelles

Une **machine virtuelle** \(VM\) définit la logique du niveau d'application d'une blockchain. En termes techniques, il spécifie l'état de la blockchain, la fonction de transition d'état, les transactions et l'API par laquelle les utilisateurs peuvent interagir avec la blockchain. Chaque blockchain sur Avalanche est une instance d'une VM.

Lorsque vous écrivez un VM, vous n'avez pas besoin de vous préoccuper de la logique de niveau inférieur comme le réseautage, le consensus et la structure de la blockchain. Avalanche fait cela dans les coulisses afin que vous puissiez vous concentrer sur la chose que vous souhaitez construire.

Pensez à un VM comme un plan pour une chaîne de blocage; vous pouvez utiliser la même VM pour créer de nombreuses chaînes de blocage, chacune suivant la même règle mais est logiquement indépendante des autres chaînes de blocage.

### Pourquoi les machines virtuelles?

Au début, les réseaux blockchain avaient une machine virtuelle \(VM\) avec un ensemble de fonctionnalités prédéfini, statique. Ce design rigide et monolithique limitait quelles applications basées sur la blockchain on pourrait fonctionner sur ces réseaux.

Les personnes qui voulaient des applications décentralisées personnalisées devaient créer leur propre réseau blockchain entièrement nouveau à partir de zéro. Ce faisant, il a fallu beaucoup de temps et d'efforts, offert une sécurité limitée, et généralement résulté d'une blockchain sur mesure et fragile qui n'a jamais décollé du sol.

Ethereum a fait un pas vers la résolution de ce problème avec des contrats intelligents. Les développeurs n'avaient pas besoin de s'inquiéter de la mise en réseau et du consensus, mais la création d'applications décentralisées était toujours difficile. The VM a une faible performance et impose des restrictions aux développeurs de contrats intelligents. Solidité et les quelques langues pour l'écriture des contrats intelligents Ethereum ne sont pas familières à la plupart des programmeurs.

Avalanche VM \(AVM\) permet de définir facilement une application décentralisée basée sur la chaîne de blocs. Plutôt que de nouvelles langues limitées comme Solidité, les développeurs peuvent écrire des VM dans Go \(les autres langues seront prises en charge dans le futur\).

### Création de votre Blockchain et machine virtuelle

Avalanche soutient la création de nouvelles instances de l'Avalanche VM.

{% page-ref page=".. /../build/tutorials/platform/create-avm-blockchain.md" %}

Avalanche supporte également la création de chaînes de blocs personnalisées avec des machines virtuelles.

{% page-ref page=".. /../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

{% page-ref page=".. /../build/tutorials/platform/create-custom-blockchain.md" %}

## Chaîne d'échange \(X-Chain\)

La chaîne **X-Chain** comme une plate-forme décentralisée pour la création et la négociation d'actifs intelligents numériques, une représentation d'une ressource réelle \(par exemple, équité, obligations\) avec un ensemble de règles qui régissent son comportement, comme "ne peut être échangé qu'à demain" ou "ne peut être envoyé qu'aux citoyens américains."

Un actif échangé sur la chaîne Xest AVAX. Lorsque vous émettez une transaction à une blockchain sur Avalanche, vous payez un montant déterminé dans AVAX.

La chaîne Xest une instance de la machine virtuelle avalanche \(AVM\). [L'API](../../build/avalanchego-apis/exchange-chain-x-chain-api.md) X-Chain permet aux clients de créer et de commercialiser des actifs sur la chaîne X-X et d'autres instances de l'AVM.

{% page-ref page=".. /../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## Chaîne de la plate-forme \(P-Chain\)

La chaîne **P-Chain** est la chaîne de métadonnées sur Avalanche et les validateurs de coordonnées, garde la trace des sous-réseaux actifs, et permet la création de nouveaux sous-réseaux. La chaîne P implémente le [protocole de consensus Snowman](../../#snowman-consensus-protocol).

[L'API P-Chain](../../build/avalanchego-apis/platform-chain-p-chain-api.md) permet aux clients de créer des sous-réseaux, d'ajouter des validateurs aux sous-réseaux et de créer des blockchains.

## Chaîne du contrat \(C-Chain\)

La **chaîne C** permet la création de contrats intelligents à [l'aide de l'API de la chaîne C](../../build/avalanchego-apis/contract-chain-c-chain-api.md).

La chaîne C est une instance de la machine virtuelle Ethereum alimentée par [Avalanche](../../).

