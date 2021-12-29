---
description: Apprenez à faire un enjeu sur Avalanche en validant ou en déléguant
---

# Staking

Le staking est le processus de verrouillage des jetons pour soutenir un réseau tout en recevant une récompense en retour \(les récompenses peuvent être une utilité du réseau accrue, une compensation monétaire, etc.\). Le concept de staking a été [formellement introduit pour la première fois](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) par Sunny King et Scott Nadal de Peercoin.

## Comment fonctionne la preuve d'enjeu ?

Pour résister aux [attaques Sybil](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack), un réseau décentralisé doit exiger que l'influence du réseau soit payée avec une ressource rare. Cela rend infaisable pour un attaquant d'avoir suffisamment d'influence sur le réseau pour compromettre sa sécurité. Dans les systèmes de preuve de travail, la ressource rare est la puissance de calcul. Sur Avalanche, la ressource rare est le jeton natif, [AVAX](../../#avalanche-avax-token). Pour qu'un nœud [valide](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) une blockchain sur Avalanche, il doit miser AVAX.

## Paramètres de staking sur Avalanche

Lorsqu'un validateur a terminé de valider le [réseau primaire](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), il reçoit en retour les jetons AVAX qu'il a mis en jeu. Il peut recevoir une récompense pour avoir aidé à sécuriser le réseau. Un validateur ne reçoit une [récompense de validation](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) que s'il est suffisamment réactif et correct pendant le temps qu'il valide. Lisez le [livre blanc sur le jeton Avalanche](https://files.avalabs.org/papers/token.pdf) pour en savoir plus sur AVAX et les mécanismes du jalonnement.

{% hint style="warning" %}
Les récompenses de Staking sont envoyées à l'adresse de votre portefeuille à la fin de la durée de Staking  **tant que tous ces paramètres sont respectés**.
{% endhint %}

* Le montant minimum qu'un validateur doit miser est de 2000 AVAX
* Le montant minimum qu'un délégant doit miser est de 25 AVAX
* La durée minimale de mise des fonds pour la validation est de 2 semaines
* La durée maximale pendant laquelle on peut stake des fonds pour la validation est d'un an
* La durée minimale de mise des fonds pour la délégation est de 2 semaines
* La durée maximale pendant laquelle on peut miser des fonds pour la délégation est de 1 an
* Le taux minimum des frais de délégation est de 2 %
* Le poids maximum d'un validateur \(sa propre mise \+ mise qui lui a été déléguée\) est le minimum de 3 x 6 AVAX et 5 fois le montant mis par le validateur. Par exemple, si vous avez misé 2000 AVAX pour devenir un validateur, seuls 8000 AVAX peuvent être délégués au total de votre nœud \(pas par délégant\).

Un validateur recevra une récompense de staking s'il est en ligne et la réponse pour plus de 80 % de sa période de validation, comme mesuré par une majorité de validateurs, pondéré par le stake. **Vous devez faire en sorte que votre validateur soit en ligne et réactif 100 % du temps.**

Vous pouvez appeler la méthode API  `info.uptime`sur votre nœud pour connaître son temps de fonctionnement pondéré et le pourcentage du réseau qui pense actuellement que votre nœud a un temps de fonctionnement suffisamment élevé pour mériter une récompense de staking. Voir [ici.](../../build/avalanchego-apis/info-api.md#info-uptime) Vous pouvez obtenir une autre opinion sur le temps de fonctionnement de votre nœud depuis le tableau de [bord de staking](https://stats.avax.network/dashboard/staking/) d'Avalanche. Si votre temps de fonctionnement n'est pas proche de 100 %, il peut y avoir un problème avec la configuration de votre nœud, qui peut compromettre votre récompense de staking. Si c'est le cas, veuillez voir [ici](#why-is-my-uptime-low) ou nous contacter sur [Discord](https://chat.avax.network) pour que nous puissions vous aider à trouver le problème. Notez que le fait de ne vérifier que le temps de fonctionnement de votre validateur tel qu'il est mesuré par des nœuds sans staking, des validateurs à faible stake ou des validateurs qui n'ont pas été en ligne pendant toute la durée de votre période de validation peut fournir une vue inexacte du temps de fonctionnement réel de votre nœud.

## Validateurs

**Les validateurs** sécurisent Avalanche, créent de nouveaux blocs / sommets et traitent les transactions Pour parvenir à un consensus, les validateurs s'échantillonnent à plusieurs reprises. La probabilité qu'un validateur donné soit échantillonné est proportionnelle à sa mise.

Lorsque vous ajoutez un nœud au groupe de validateurs, vous devez spécifier :

* L'ID de votre nœud
* La date de début et de fin de la période de validation
* Combien d'AVAX vous stakez
* L'adresse à laquelle envoyer les récompenses
* Votre tarif de délégation \(voir ci-dessous\)

{% hint style="info" %}Le montant minimum qu'un validateur doit miser est de 2 000 AVAX.{% endhint %}

{% hint style="danger" %}
Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que validateur, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas annuler la mise plus tôt ni modifier le montant de la mise, l'ID du nœud ou l'adresse de récompense.** Veuillez vous assurer que vous utilisez les valeurs correctes dans les appels API ci-dessous. Si vous n’êtes pas sûr, demandez de l’aide sur [Discord](https://chat.avax.network) ou la FAQ du [développeur](http://support.avalabs.org/en/collections/2618154-developer-faq). Si vous voulez ajouter plus de jetons à votre propre validateur, vous pouvez déléguer les jetons à ce nœud, mais vous ne pouvez pas augmenter le montant de la validation de base \(donc déléguer à vous-même va à l'encontre de votre plafond de délégation\).
{% endhint %}

### Lancer un validateur <a id="running-a-validator"></a>

Si vous utilisez un validateur, il est important que votre nœud soit bien connecté pour vous assurer de recevoir une récompense et de protéger vos fonds. Voir [ici](http://support.avalabs.org/en/articles/4594192-networking-setup).

Lorsque vous émettez la transaction pour ajouter un validateur, les jetons mis en jeu et les frais de transaction sont déduits des adresses que vous contrôlez. Lorsque vous avez terminé la validation, les fonds mis en jeu sont renvoyés à leurs adresses d'origine. Si vous avez gagné une récompense, elle est envoyée à l'adresse que vous avez indiquée lorsque vous vous êtes ajouté en tant que validateur.

#### Autoriser les appels API<a id="allow-api-calls"></a>

Pour effectuer des appels API vers votre nœud à partir de machines distantes, autorisez le trafic sur le port API \(`9650`par défaut\) et exécutez votre nœud avec l'argument `--http-host=`

Vous devez désactiver toutes les API que vous n'utiliserez pas via des arguments de ligne de commande. Vous devez configurer votre réseau pour n'autoriser l'accès au port API qu'à partir de machines de confiance \(par exemple, votre ordinateur personnel\).

#### Pourquoi ma disponibilité est-elle faible ?<a id="why-is-my-uptime-low"></a>

Chaque validateur sur le réseau Avalanche garde une trace de la disponibilité des autres validateurs. Chaque validateur a un poids \(c'est-à-dire le montant staké\) Plus le poids d'un validateur est élevé, plus il a d'influence lorsque les validateurs votent pour déterminer si votre nœud doit recevoir une récompense de staking. Vous pouvez appeler la méthode API  `info.uptime`sur votre nœud pour connaître son temps de fonctionnement pondéré et le pourcentage du réseau qui pense actuellement que votre nœud a un temps de fonctionnement suffisamment élevé pour mériter une récompense de staking.

Vous pouvez également voir les connexions d'un nœud en appelant `info.peers`, ainsi que le temps de fonctionnement de chaque connexion. **Ce n’est que le point de vue d’un nœud**. D'autres nœuds peuvent percevoir la disponibilité de votre nœud différemment. Ce n'est pas parce qu'un nœud perçoit votre temps de disponibilité comme étant faible que vous ne recevrez pas de récompense de mise.

Si le temps de fonctionnement de votre nœud est faible, assurez-vous que vous configurez l'option  `--public-ip=[NODE'S PUBLIC IP]`et que votre nœud peut recevoir du trafic TCP entrant sur le port 9651.

#### Gestion des secrets<a id="secret-management"></a>

Le seul secret dont vous avez besoin sur votre nœud de validation est sa clé d'implantation, la clé TLS qui détermine l'ID de votre nœud. La première fois que vous démarrez un nœud, la clé d'implantation est créée et placée dans `$HOME/.avalanchego/staking/staker.key`. Vous devez sauvegarder ce fichier \(et `staker.crt`\) dans un endroit sûr. La perte de votre clé de jalonnement pourrait compromettre votre récompense de validation, car votre nœud aura un nouvel identifiant.

Vous n'avez pas besoin de fonds AVAX sur votre nœud de validation. En fait, sa meilleure pratique est de **ne pas** avoir beaucoup de fonds sur votre nœud. La quasi-totalité de vos fonds doivent être à des adresses « froides », dont la clé privée ne se trouve sur aucun ordinateur.

#### Surveillance<a id="monitoring"></a>

Consultez ce tutoriel pour apprendre comment surveiller la disponibilité, l'état général, etc. de votre nœud.

{% page-ref page="../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

#### Validation dans Fuji

La validation dans Fuji nécessite `1 AVAX`. Donc, vous pouvez facilement configurer votre nœud validateur et en apprendre plus sur la validation.

## Délégateurs

Un délégateur est un détenteur de jetons qui souhaite participer au staking, mais choisit de faire confiance à un nœud de validation existant via la délégation.

Lorsque vous déléguez la participation à un validateur, vous spécifiez :

* L'ID du nœud auquel vous déléguez
* La date de début et de fin de la période de délégation \(qui doit se trouver dans l'intervalle de la période de la validation du validateur\).
* Combien d'AVAX vous stakez
* L'adresse à laquelle envoyer les récompenses

{% hint style="info" %}Le montant minimum qu'un délégant doit miser est de 25 AVAX.{% endhint %}

{% hint style="danger" %}Notez qu'une fois que vous émettez la transaction pour ajouter votre stake à un délégateur, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas annuler la mise plus tôt ni modifier le montant de la mise, l'ID du nœud ou l'adresse de récompense.** Si vous n’êtes pas sûr, demandez de l’aide sur [Discord](https://chat.avax.network) ou la [FAQ du développeur](http://support.avalabs.org/en/collections/2618154-developer-faq).{% endhint %}

### Récompenses de délégation <a id="delegator-rewards"></a>

Si le validateur à qui vous déléguez des AVAX est suffisamment correct et réactif pendant la durée de la délégation, vous recevez une récompense une fois que votre période de délégation est finie. Les délégateurs sont récompensés selon la même fonction que les validateurs. Cependant, le validateur auquel vous déléguez garde une partie de votre récompense, spécifiée par le taux des frais de délégation du validateur.

Lorsque vous émettez la transaction pour déléguer des jetons, les jetons mis en jeu et les frais de transaction sont déduits des adresses que vous contrôlez. Lorsque vous avez terminé la délégation, les jetons mis en jeu sont renvoyés à votre adresse. Si vous avez gagné une récompense, elle est envoyée à l'adresse que vous avez spécifiée lorsque vous avez délégué des jetons.

## FAQ

### Y a-t-il un outil pour vérifier la santé d'un validateur ?

Oui, entrez votre ID de nœud [ici](https://stats.avax.network/dashboard/validator-health-check).

### Comment détermine-t-on si un valideur reçoit une récompense de staking ?

Lorsqu'un nœud quitte l'ensemble des validateurs, les validateurs votent pour déterminer si le nœud sortant doit recevoir une récompense de staking ou non. Si un validateur pense que le nœud était en ligne et réactif pendant plus longtemps que la durée requise \(actuellement 80 %\), il votera pour que le nœud reçoive une récompense de staking. Dans le cas contraire, le validateur votera pour que le nœud ne reçoive pas de récompense de staking. Le résultat de ce vote, qui est pondéré par le stake, détermine si le nœud reçoit une récompense ou non.

Chaque validateur ne vote que « oui » ou « non ». Ils ne partagent pas leur opinion sur le temps de fonctionnement du nœud pour ensuite faire la moyenne des réponses, par exemple.

Chaque période de validation est considérée séparément. En d'autres termes, supposons qu'un nœud rejoigne l'ensemble des validateurs, puis en sorte. Puis il rejoint et quitte à nouveau. Le temps de fonctionnement du nœud pendant sa première période dans l'ensemble de validateurs n'a pas d'incidence sur le fait qu'il reçoive ou non une récompense de staking pour sa deuxième période dans l'ensemble de validateurs.

