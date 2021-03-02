---
description: Apprenez à faire un enjeu sur Avalanche en validant ou en déléguant
---

# Staking

Le staking \(ou mise en jeu\) est le processus de verrouillage des jetons pour soutenir un réseau tout en recevant une récompense en retour \(les récompenses peuvent être une utilité du réseau accrue, une compensation monétaire, etc.\). Le concept de staking a été [formellement introduit](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) pour la première fois par Sunny King et Scott Nadal de Peercoin.

### Comment fonctionne la preuve d'enjeu?

Pour résister aux [attaques Sybil](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack), un réseau décentralisé doit exiger que l'influence du réseau soit payée avec une ressource rare. Cela rend infaisable pour un attaquant d'avoir suffisamment d'influence sur le réseau pour compromettre sa sécurité. Dans les systèmes de preuve de travail, la ressource rare est la puissance de calcul. Sur Avalanche, la ressource rare est le jeton natif, [AVAX](../../#avalanche-avax-jeton). Pour qu'un nœud [valide](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) une blockchain sur Avalanche, il doit miser AVAX.

### Paramètres de staking sur Avalanche

Lorsqu'un validateur a terminé de valider le [réseau primaire](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), il reçoit en retour les jetons AVAX qu'il a mis en jeu. Il peut recevoir une récompense pour avoir aidé à sécuriser le réseau. Un validateur ne reçoit une [récompense de validation](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) que s'il est suffisamment réactif et correct pendant le temps qu'il valide. Lisez le livre blanc sur le jeton Avalanche pour en savoir plus sur AVAX et les mécanismes du jalonnement.

* Le montant minimum qu'un validateur doit miser est de 2000 AVAX.
* Le montant minimum qu'un délégant doit miser est de 25 AVAX.
* La durée minimale de mise des fonds pour la validation est de 2 semaines.
* La durée maximale pendant laquelle on peut stake des fonds pour la validation est d'un an.
* La durée minimale de mise des fonds pour la délégation est de 2 semaines.
* La durée maximale pendant laquelle on peut miser des fonds pour la délégation est de 1 an.
* Le taux minimum des frais de délégation est de 2%.
* Le poids maximum d'un validateur \(sa propre mise + mise qui lui a été déléguée\) est le minimum de 3 x 106 AVAX et 5 fois le montant mis par le validateur. Par exemple, si vous avez misé 2000 AVAX pour devenir un validateur, seuls 8000 AVAX peuvent être délégués au total de votre nœud \(pas par délégant\). Le maximum cap sur un validateur est de 3,000,000 AVAX stake ou stake et délégué.
* Le pourcentage minimum du temps où un validateur doit être correct et en ligne pour recevoir une récompense est de 60%.

## Validateurs

Les **validateurs** sécurisent Avalanche, créent de nouveaux blocs / sommets et traitent les transactions. Pour parvenir à un consensus, les validateurs s'échantillonnent à plusieurs reprises. La probabilité qu'un validateur donné soit échantillonné est proportionnelle à sa mise.

Lorsque vous ajoutez un nœud au groupe de validateurs, vous devez spécifier:

* L'ID de votre nœud.
* La date de début et de fin de la période de validation.
* Combien d'AVAX vous stakez.
* L'adresse à laquelle envoyer les récompenses.
* Votre tarif de déléguation \(voir ci-dessous\).

{% hint style="info" %}
Vous devez avoir au minimum 2,000 AVAX pour pouvoir stake.
{% endhint %}

{% hint style="danger" %}
Notez qu'une fois que vous émettez la transaction pour ajouter un nœud en tant que validateur, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas annuler la mise plus tôt ni modifier le montant de la mise, l'ID du nœud ou l'adresse de récompense.** Veuillez vous assurer que vous utilisez les valeurs correctes dans les appels API ci-dessous. Si vous n’êtes pas sûr, demandez de l’aide sur [Telegram](https://t.me/Avalanche_fr), [Discord ](https://chat.avax.network/)où la [FAQ du développeur](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

### Lancer un validateur

Si vous utilisez un validateur, il est important que vous suiviez certaines bonnes pratiques pour vous assurer de recevoir une récompense et de protéger vos fonds. Voir [ici](http://support.avalabs.org/en/articles/4594192-networking-setup).

Lorsque vous émettez la transaction pour ajouter un validateur, les jetons mis en jeu et les frais de transaction sont déduits des adresses que vous contrôlez. Lorsque vous avez terminé la validation, les fonds mis en jeu sont renvoyés à leurs adresses d'origine. Si vous avez gagné une récompense, elle est envoyée à l'adresse que vous avez indiquée lorsque vous vous êtes ajouté en tant que validateur.

**Autoriser les appels API**

Pour effectuer des appels API vers votre nœud à partir de machines distantes, autorisez le trafic sur le port API \(`9650` par défaut\) et exécutez votre nœud avec l'argument `--http-host =`

Vous devez désactiver toutes les API que vous n'utiliserez pas via des arguments de ligne de commande. Vous devez configurer votre réseau pour n'autoriser l'accès au port API qu'à partir de machines de confiance \(par exemple, votre ordinateur personnel\).

#### Pourquoi ma disponibilité est-elle faible?

Chaque validateur sur le réseau Avalanche garde une trace de la disponibilité des autres validateurs. Vous pouvez voir les connexions d'un nœud en appelant `info.peers`, ainsi que le temps de disponibilité de chaque connexion. **Ce n’est que le point de vue d’un nœud**. D'autres nœuds peuvent percevoir la disponibilité de votre nœud différemment. Ce n'est pas parce qu'un nœud perçoit votre temps de disponibilité comme étant faible que vous ne recevrez pas de récompense de mise.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La raison probable pour laquelle votre nœud n'est pas connecté à un autre nœud est que le NAT traversal a échoué et que vous n'avez pas démarré votre nœud avec `--public-ip = [IP PUBLIC DU NODE]`. À l'avenir, nous ajouterons une meilleure surveillance pour faciliter la vérification que votre nœud est bien connecté.

### Gestion des secrets

Le seul secret dont vous avez besoin sur votre nœud de validation est sa clé d'implantation, la clé TLS qui détermine l'ID de votre nœud. La première fois que vous démarrez un nœud, la clé d'implantation est créée et placée dans `$HOME/.avalanchego/staking/staker.key`. Vous devez sauvegarder ce fichier \(et `staker.crt`\) dans un endroit sûr. La perte de votre clé de jalonnement pourrait compromettre votre récompense de validation, car votre nœud aura un nouvel identifiant

Vous n'avez pas besoin de fonds AVAX sur votre nœud de validation. En fait, sa meilleure pratique est de ne pas avoir beaucoup de fonds sur votre nœud. La quasi-totalité de vos fonds doivent être à des adresses «froides» \(cold wallet\), dont la clé privée ne se trouve sur aucun ordinateur.

### Monitoring

Consultez ce tutoriel sur la configuration de la surveillance des nœuds.

{% page-ref page="../../tutoriels/plateforme/configuration-du-monitoring-des-noeuds.md" %}

## Délégateurs

Vous pouvez miser vos propres jetons afin d'augmenter le poids d'échantillonnage d'un autre validateur. C'est ce qu'on appelle la délégation.

Lorsque vous déléguez la participation à un validateur, vous spécifiez :

* L'ID du nœud auquel vous déléguez.
* La date de début et de fin de la période de délégation \(qui soit se trouver dans l'intervale de la période de la validation du nœud choisit\).
* Le montant d'AVAX que vous déléguez.
* L'adresse à laquelle envoyer les récompenses.

{% hint style="info" %}
Vous devez avoir au minimum 25 AVAX pour pouvoir déléguer à un nœud.
{% endhint %}

{% hint style="danger" %}
Notez qu'une fois que vous émettez la transaction pour déléguer à un nœud, il n'y a aucun moyen de modifier les paramètres. **Vous ne pouvez pas annuler la mise plus tôt ni modifier le montant de la mise, le nœud auquel vous déléguez ou l'adresse de récompense.** 

Si vous n’êtes pas sûr, demandez de l’aide sur [Telegram](https://t.me/Avalanche_fr), [Discord ](https://chat.avax.network/)où la [FAQ du développeur](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

#### Récompenses de délégation

Si le validateur à qui vous déléguez des AVAX est suffisamment correct et réactif pendant la durée de la délégation, vous recevez une récompense une fois que votre période de délégation est finie. Les délégués sont récompensés selon la même fonction que les validateurs. Cependant, le validateur auquel vous déléguez garde une partie de votre récompense

Lorsque vous émettez la transaction pour déléguer des jetons, les jetons mis en jeu et les frais de transaction sont déduits des adresses que vous contrôlez. Lorsque vous avez terminé la délégation, les jetons mis en jeu sont renvoyés à votre adresse. Si vous avez gagné une récompense, elle est envoyée à l'adresse que vous avez spécifiée lorsque vous avez délégué des jetons.

