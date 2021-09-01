---
description: Apprendre à s'intéresser à Avalanche en validant ou en déléguant
---

# staking

Le staking est le processus de verrouillage des jetons pour soutenir un réseau tout en recevant une récompense en échange de la récompensé \(les récompenses peuvent être augmentées d'utilité du réseau, une compensation monétaire, etc.\). Le concept de jalonnement a [été officiellement introduit](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) par Sunny King et Scott Nadal de Peercoin.

### Comment fonctionne la preuve de pieu ?

Pour résister aux [attaques](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack) de sybil, un réseau décentralisé doit exiger que l'influence du réseau soit payée avec une ressource rare. Cela rend impossible à un attaquant de gagner suffisamment d'influence sur le réseau pour compromettre sa sécurité. Dans les systèmes de preuve de travail, la ressource rare est la puissance de calcul. Sur Avalanche, la ressource rare est le jeton natif, [AVAX](../../#avalanche-avax-token). Pour un nœud pour [valider](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) une blockchain sur Avalanche, il doit piquer AVAX.

## Paramètres de staking sur Avalanche

Lorsqu'un validateur est fait en validant le [réseau primaire](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), il reçoit les jetons AVAX qu'il a staké. Il peut recevoir une récompense pour avoir aidé à sécuriser le réseau. Un validateur ne reçoit une [récompense de validation](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) que s'il est suffisamment sensible et correct pendant la validation. Lisez le [whitepaper de jetons](https://files.avalabs.org/papers/token.pdf) d'Avalanche pour en savoir plus sur AVAX et les mécanismes de staking.

{% hint style="warning" %}Les récompenses de staking sont envoyées à votre adresse de portefeuille à la fin du terme de staking **tant que tous ces paramètres sont satisfaits.**{% endhint %}

* Le montant minimum qu'un validateur doit détenir est de 2 000 AVAX
* Le montant minimum qu'un délégué doit déléguer est de 25 AVAX
* Le montant minimum de temps qu'on peut piquer des fonds pour la validation est de 2 semaines
* Le montant maximal de temps qu'on peut piquer des fonds pour la validation est de 1 an
* Le montant minimum de temps qu'on peut piquer des fonds pour la délégation est de 2 semaines
* Le montant maximal de temps qu'on peut piquer des fonds pour la délégation est de 1 an
* Le taux de frais de délégation minimum est de 2 %
* Le poids maximum d'un validateur \(leur propre jeu \+ la participation qui leur est déléguée\) est le minimum de 3e6 AVAX et 5 fois le montant que le validateur a staké. Par exemple, si vous avez jalonné 2 000 AVAX pour devenir un validateur, seul 8 000 AVAX peut être délégué à votre nœud total \(et non pas par délégué\)
* Le pourcentage minimum de temps qu'un validateur doit être correct et en ligne pour recevoir une récompense est de 60 %

## Validateurs

**Les validateurs **sécurisent Avalanche, créent de nouveaux blocs/sommets, et traitent les transactions. Pour parvenir à un consensus, les validateurs se font de multiples échantillons les uns les autres. La probabilité qu'un validateur donné soit échantillonné est proportionnelle à son enjeu.

Lorsque vous ajoutez un nœud au jeu de validateur, vous spécifiez :

* ID de votre nœud
* Lorsque vous voulez démarrer et cesser de valider
* Combien d'AVAX que vous stake
* L'adresse pour envoyer des récompenses à
* Votre tarif de frais de délégation \(voir ci-dessous\)

{% hint style="info" %}Le montant minimum qu'un validateur doit détenir est de 2 000 AVAX.{% endhint %}

{% hint style="danger" %}Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que validateur, il n'y a pas moyen de changer les paramètres.** Vous ne pouvez pas supprimer rapidement votre pieu ou modifier le montant de la pique, l'ID de nœud ou l'adresse de récompense.** Assurez-vous que vous utilisez les valeurs correctes des appels API ci-dessous. Si vous n'êtes pas sûr, demandez de l'aide sur [Discord](https://chat.avax.network) ou consultez nos [FAQ](http://support.avalabs.org/en/collections/2618154-developer-faq) pour les développeurs.{% endhint %}

### Exécuter un validateur<a id="running-a-validator"></a>

Si vous exécutez un validateur, il est important que votre nœud soit bien connecté pour vous assurer que vous recevez une récompense. Voir [ici](http://support.avalabs.org/en/articles/4594192-networking-setup).

Lorsque vous émettez la transaction pour ajouter un validateur, les jetons et les frais de transaction sont déduits des adresses que vous contrôlez. Lorsque vous avez terminé la validation, les fonds staked sont renvoyés aux adresses d'où ils provenaient. Si vous avez gagné une récompense, elle est envoyée à l'adresse que vous avez spécifiée lorsque vous vous êtes ajouté comme validateur.

#### Permettre les appels API<a id="allow-api-calls"></a>

Pour faire des appels API vers votre nœud depuis des machines distantes, autoriser le trafic sur le port API \( `9650`par défaut\) et exécuter votre nœud avec des arguments`--http-host=`

Vous devez désactiver toutes les API que vous ne l'utiliserez pas via les arguments en ligne de commande. Vous devez configurer votre réseau pour permettre l'accès au port API des machines de confiance \(par exemple, votre ordinateur personnel\).

#### Pourquoi mon temps de travail est bas ?<a id="why-is-my-uptime-low"></a>

Chaque validateur sur Avalanche conserve une trace de la mise à jour d'autres validateurs. Vous pouvez voir les connexions qu'un nœud a en appelant `info.peers`, ainsi que l'heure à jour de chaque connexion.** Ce n'est qu'un seul point de vue d'un **nœud. D'autres nœuds peuvent percevoir l'heure de mise à jour de votre nœud différemment. Juste parce qu'un nœud perçoit votre temps de travail comme étant bas ne signifie pas que vous ne recevrez pas de récompenses de jalonnement.

La raison probable que votre nœud n'est pas connecté à un autre nœud est que la traversée de NAT a échoué, et que vous n'avez pas démarré votre nœud avec `--public-ip=[NODE'S PUBLIC IP]`. À l'avenir, nous ajouterons une meilleure surveillance pour faciliter la vérification de votre nœud de well-connected.

#### Gestion secrète<a id="secret-management"></a>

Le seul secret dont vous avez besoin sur votre nœud de validation est sa clé de staking, la clé TLS qui détermine l'ID de votre nœud. La première fois que vous démarrez un nœud, la clé de staking est créée et mise en `$HOME/.avalanchego/staking/staker.key`. Vous devez sauvegarder ce fichier \(et `staker.crt`\) quelque part sécurisé. Perdre votre clé de staking pourrait compromettre votre récompense de validation, car votre nœud aura une nouvelle identité.

Vous n'avez pas besoin d'avoir des fonds AVAX sur votre nœud de validation. En fait, il est la meilleure pratique de ne **pas **avoir beaucoup de fonds sur votre nœud. La quasi-totalité de vos fonds devraient être dans des adresses "froides" dont la clé privée n'est pas sur un ordinateur.

#### Surveillance<a id="monitoring"></a>

Suivez ce tutoriel pour apprendre à surveiller les mises à jour de votre nœud, la santé générale, etc.

{% page-ref page="../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Délégués

Un délégué est un détenteur de jetons, qui veut participer à la staking, mais choisit de faire confiance à un nœud de validation existant par la délégation.

Lorsque vous déléguez des piquets de choses à un validateur, vous spécifiez :

* L'ID du nœud que vous déléguez à
* Lorsque vous souhaitez démarrer/arrêter de déléguer des piquets \(doit être pendant que le validateur est en train de valider\)
* Combien d'AVAX que vous stake
* L'adresse pour envoyer des récompenses à

{% hint style="info" %}Le montant minimum qu'un délégué doit déléguer est de 25 AVAX.{% endhint %}

{% hint style="danger" %}Notez qu'une fois que vous émettez la transaction pour ajouter votre participation à un délégué, il n'y a pas moyen de changer les paramètres.** Vous ne pouvez pas supprimer rapidement votre pieu ou modifier le montant de la pique, l'ID de nœud ou l'adresse de récompense.** Si vous n'êtes pas sûr, demandez de l'aide sur [Discord](https://chat.avax.network) ou consultez nos [FAQ](http://support.avalabs.org/en/collections/2618154-developer-faq) pour les développeurs.{% endhint %}

### récompenses du délégué<a id="delegator-rewards"></a>

Si le validateur que vous déléguez des jetons pour lequel vous êtes suffisamment correct et réactif, vous recevrez une récompense lorsque vous aurez fini de déléguer. Les délégués sont récompensés selon la même fonction que les validateurs. Cependant, le validateur que vous déléguez pour conserver une partie de votre récompense, spécifié par le taux de frais de délégation du validateur.

Lorsque vous délivrez la transaction pour déléguer les jetons, les jetons et les frais de transaction sont déduits des adresses que vous contrôlez. Lorsque vous avez fait la déléguer, les jetons jalonnés sont renvoyés à votre adresse. Si vous avez gagné une récompense, elle est envoyée à l'adresse que vous avez spécifiée lorsque vous avez délégué les jetons.

