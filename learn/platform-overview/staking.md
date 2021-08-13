---
description: Apprenez à prendre la participation sur Avalanche en validant ou en déléguant

---

# Stagnation

Le blocage est le processus de verrouillage des jetons pour soutenir un réseau tout en recevant une récompense en retour \(les récompenses peuvent être augmentées utilitaire réseau, compensation monétaire, etc.\). Le concept de jalonnement a [été officiellement introduit](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) par Sunny King et Scott Nadal de Peercoin.

### Comment fonctionne la preuve de la pieu ?

Pour résister aux [attaques sybil](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack), un réseau décentralisé doit exiger que l'influence du réseau soit payée avec une ressource rare. Cela rend impossible qu'un attaquant ait suffisamment d'influence sur le réseau pour compromettre sa sécurité. Dans les systèmes de démonstration de travail, la ressource rare est la puissance de calcul. Sur Avalanche, la ressource rare est le jeton natif, [AVAX](../../#avalanche-avax-token). Pour qu'un noeud puisse [valider](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) une blockchain sur Avalanche, il doit piquer AVAX.

## Paramètres de freinage sur l'avalanche

Lorsqu'un validateur est fait la validation [du réseau primaire](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), il reçoit les jetons is a empilés. Il peut recevoir une récompense pour aider à sécuriser le réseau. Un validateur ne reçoit une [récompense de validation](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) que s'il est suffisamment sensible et correct pendant la période qu'il valide. Lisez le [jeton Avalanche pour](https://files.avalabs.org/papers/token.pdf) en savoir plus sur AVAX, et la mécanique de la staking.

{% allusion style="warning" %} Les récompenses de freinage sont envoyées à votre adresse de portefeuille à la fin du terme de mise en ligne **tant que tous ces paramètres sont atteints**. {% endhint %}

* Le montant minimum qu'un validateur doit détenir est 2000 AVAX.
* Le montant minimum qu'un délégué doit déléguer est 25 AVAX.
* Le montant minimum de temps qu'on peut mettre des fonds pour la validation est de 2 semaines
* Le montant maximal de la période qu'on peut prendre des fonds pour la validation est 1 an
* Le montant minimum de temps qu'on peut prendre des fonds pour la délégation est de 2 semaines
* Le montant maximal de la participation des fonds pour la délégation est de 1 an
* Le tarif minimal de la délégation est de 2%
* Le poids maximal d'un validator \(leur propre pieu + jeu délégué à eux\) est le minimum de 3e6 AVAX et 5 fois le montant que le validant a empilé. Par exemple, si vous avez staked 2000 AVAX pour devenir un validant, seulement 8000 AVAX peut être délégué à votre noeud total \(pas par délégué\)
* Le pourcentage minimum de temps qu'un validant doit être correct et en ligne afin de recevoir une récompense est 60%

## Validators

**Les validateurs** sécurisent l'avalanche, créent de nouveaux blocs/sommets, et traitent les transactions. Pour parvenir à un consensus, les validateurs se échantillonnent à plusieurs reprises. La probabilité qu'un validateur donné soit échantillonné est proportionnelle à son enjeu.

Lorsque vous ajoutez un noeud au jeu de validation, vous spécifiez:

* ID de votre noeud
* Lorsque vous voulez commencer et cesser de valider
* Combien AVAX vous empilez
* L'adresse pour envoyer des récompenses à
* Tarif de votre délégation \(voir ci-dessous\)

{% allusion style="info" %} Le montant minimum qu'un validateur doit détenir est 2000 AVAX. {% endhint %}

{% allusion style="danger,%} Notez qu'une fois que vous délivrez la transaction pour ajouter un noeud comme validant, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas supprimer votre participation tôt ou modifier le montant de la jeu, l'ID du noeud ou l'adresse de récompense.** Assurez-vous que vous utilisez les valeurs correctes dans les appels API ci-dessous. Si vous n'êtes pas sûr, demandez de l'aide sur [Discord](https://chat.avax.network) ou naviguez sur nos [FAQ du développeur](http://support.avalabs.org/en/collections/2618154-developer-faq). {% endhint %}

### Exécuter un Validator<a id="running-a-validator"></a>

Si vous exécutez un validant, il est important que votre noeud soit bien connecté pour vous assurer que vous recevez une récompense. Voir [ici](http://support.avalabs.org/en/articles/4594192-networking-setup).

Lorsque vous délivrez la transaction pour ajouter un validant, les jetons et les frais de transaction jalonnés sont déduits des adresses que vous contrôlez. Lorsque vous avez terminé la validation, les fonds mis en état sont retournés aux adresses d'où ils viennent. Si vous avez gagné une récompense, il est envoyé à l'adresse que vous avez spécifiée lorsque vous vous êtes ajouté comme validant.

#### Permettre les appels API<a id="allow-api-calls"></a>

Pour effectuer des appels API vers votre noeud depuis des machines distantes, autorisez le trafic sur le port API \(`9650` par défaut\), et lancez votre noeud avec l'argument `--http-host=`

Vous devriez désactiver toutes les API que vous n'utiliserez pas via les arguments de ligne de commande. Vous devez configurer votre réseau pour permettre l'accès au port API à partir de machines de confiance \(par exemple, votre ordinateur personnel. \)

#### Pourquoi mon temps de disponibilité est-il bas ?<a id="why-is-my-uptime-low"></a>

Chaque validateur sur Avalanche garde la trace de l'heure de mise à jour d'autres validateurs. Vous pouvez voir les connexions qu'un noeud a en appelant `info.peers`, ainsi que l'heure de chaque connexion. **Il s'agit d'un point de vue d'un nœud**. D'autres nœuds peuvent percevoir l'heure de votre nœud différemment. Juste parce qu'un noeud perçoit votre temps de travail comme étant bas ne signifie pas que vous ne recevrez pas de récompenses de jalonnement.

La raison probable que votre noeud n'est pas connecté à un autre noeud est que la traversée NAT a échoué, et vous n'avez pas démarré votre noeud avec `--public-ip=[NODE'S PUBLIQUE NODE]`. À l'avenir, nous ajouterons une meilleure surveillance pour faciliter la vérification que votre noeud est bien connecté.

#### Gestion secrète<a id="secret-management"></a>

Le seul secret dont vous avez besoin sur votre noeud de validation est sa clé de marche, la clé TLS qui détermine l'ID de votre noeud. La première fois que vous démarrez un nœud, la clé de freinage est créée et mise dans `$HOME/.avalanchego/staking/staker.key`. Vous devriez sauvegarder ce fichier \(et `staker.crt`\) quelque part sécurisé. Perdre votre clé de freinage pourrait compromettre votre récompense de validation, car votre noeud aura une nouvelle ID.

Vous n'avez pas besoin d'avoir des fonds AVAX votre nœud de validation. En fait, il est la meilleure pratique de **ne pas** avoir beaucoup de fonds sur votre nœud. Presque tous vos fonds devraient être dans les adresses "froides" dont la clé privée n'est pas sur aucun ordinateur.

#### Surveillance<a id="monitoring"></a>

Suivez ce tutoriel pour apprendre à surveiller l'heure de votre nœud, la santé générale, etc.

{% page-ref page=".. /../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Délégués

Un délégué est un détenteur de jetons, qui veut participer à la stage, mais choisit de faire confiance à un nœud de validation existant par délégation.

Lorsque vous déléguez la mise à un validateur, vous spécifiez:

* L'ID du noeud que vous déléguez à
* Lorsque vous voulez démarrer/arrêter la délégation de la pieu \(doit être pendant que le validateur est validant\)
* Combien AVAX vous empilez
* L'adresse pour envoyer des récompenses à

{% allusion style="info" %} Le montant minimum qu'un délégué doit déléguer est 25 AVAX. {% endhint %}

{% allusion style="danger,%} Notez qu'une fois que vous délivrez la transaction pour ajouter votre participation à un délégué, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas supprimer votre participation tôt ou modifier le montant de la jeu, l'ID du noeud ou l'adresse de récompense.** Si vous n'êtes pas sûr, demandez de l'aide sur [Discord](https://chat.avax.network) ou naviguez sur nos [FAQ du développeur](http://support.avalabs.org/en/collections/2618154-developer-faq). {% endhint %}

### récompenses du délégué<a id="delegator-rewards"></a>

Si le validateur que vous déléguez des jetons à est suffisamment correct et réactif, vous recevrez une récompense lorsque vous êtes fait déléguer. Les délégués sont récompensés selon la même fonction que les validateurs. Cependant, le validant que vous déléguez pour conserver une partie de votre reward–specified par le tarif de frais de délégation du validant.

Lorsque vous délivrez la transaction pour déléguer les jetons, les jetons jalonnés et les frais de transaction sont déduits des adresses que vous contrôlez. Lorsque vous avez terminé la délégation, les jetons empilés sont retournés à votre adresse. Si vous avez gagné une récompense, il est envoyé à l'adresse que vous avez spécifiée lorsque vous avez délégué les jetons.

