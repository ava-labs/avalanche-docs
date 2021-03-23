---
description: 'Tutoriel crée par le membre de la communauté: Seq'
---

# Exécuter un nœud Avalanche avec Microsoft Azure

L'exécution d'un validateur et la mise en jeu avec Avalanche offrent des récompenses extrêmement compétitives comprises entre 9,69% et 11,54% en fonction de la durée pour laquelle vous misez. Le taux maximum est gagné en mettant en jeu pendant un an, tandis que le taux le plus bas pendant 14 jours. Il n'y a pas non plus de slash, vous n'avez donc pas à vous soucier d'une panne matérielle ou d'un bogue dans le client qui vous ferait perdre une partie ou la totalité de votre mise. Au lieu de cela, avec Avalanche, il vous suffit de maintenir actuellement au moins 60% de disponibilité pour recevoir des récompenses. Si vous ne répondez pas à cette exigence, vous n’obtenez pas de punition, mais vous ne recevez pas les récompenses. **Vous n'avez pas non plus besoin de placer vos clés privées sur un nœud pour commencer la validation sur ce nœud**. Même si quelqu'un pénètre dans votre environnement cloud et accède au nœud, le pire qu'il puisse faire est de désactiver le nœud.

Non seulement l'exécution d'un nœud de validation vous permet de recevoir des récompenses en AVAX, mais plus tard, vous pourrez également valider d'autres sous-réseaux de l'écosystème et recevoir des récompenses dans le jeton natif de leurs sous-réseaux.

Vous n'avez besoin que d'une configuration matérielle modeste \(2 cœurs de processeur, 4 Go de mémoire et un disque SSD de 40 Go\) pour exécuter un validateur et il n'utilise pas d'énormes quantités d'énergie.[ Le mécanisme de consensus révolutionnaire d’Avalanche](https://medium.com/avalanche-fr/avalanche-consensus-101-815b15753874) peut s’étendre à des millions de validateurs participant à un consensus à la fois, offrant une décentralisation sans précédent.

Actuellement, le montant minimum requis pour miser pour devenir validateur est de 2000 AVAX \(qui peut être réduit au fil du temps à mesure que le prix augmente\). Alternativement, les validateurs peuvent également facturer une somme modique pour permettre aux utilisateurs de déléguer leur participation avec eux pour aider à couvrir les coûts de fonctionnement. Vous pouvez utiliser une calculatrice [ici](https://vscout.io/) pour voir combien de récompenses vous gagneriez lors de l'exécution d'un nœud, par rapport à la délégation.

J'encourage tout le monde à exécuter leurs propres validateurs dans la mesure du possible, mais pour ceux qui ne répondent pas aux exigences minimales de jalonnement et qui souhaitent déléguer, j'exécute actuellement un nœud que vous pouvez trouver [ici.](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb)

Dans cet article, nous allons suivre le processus de configuration d'un nœud sur Microsoft Azure. Ce didacticiel ne suppose aucune expérience préalable avec Microsoft Azure et passera par chaque étape avec le moins d'hypothèses possibles.

Au moment de cet article, le prix au comptant pour une machine virtuelle avec 2 cœurs et 8 Go de mémoire coûte aussi peu que 0,01060 $ par heure, ce qui équivaut à environ 113,44 $ par an, s**oit une économie de 83,76% par rapport aux prix normaux de paiement au fur et à mesure.** En comparaison, une machine virtuelle dans AWS avec 2 cœurs et 4 Go de mémoire avec un prix au comptant coûte environ 462 $ par an.

## Configuration d'abonnement initiale <a id="6e8d"></a>

### Configurer l'authentification à 2 facteurs <a id="b9d0"></a>

Vous aurez d'abord besoin d'un compte Microsoft, si vous n'en avez pas déjà, vous verrez une option pour en créer un via le lien suivant. Si vous en avez déjà un, assurez-vous de configurer l'authentification à 2 facteurs pour sécuriser votre nœud en allant sur le lien suivant, puis en sélectionnant “Two-step verification” et en suivant les étapes fournies.

​[https://account.microsoft.com/security](https://account.microsoft.com/security)

![](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

Une fois que deux facteurs ont été configurés, connectez-vous au portail Azure en accédant à [https://portal.azure.com](https://portal.azure.com) et en vous connectant avec votre compte Microsoft. Lorsque vous vous connectez, vous n'avez pas d'abonnement, nous devons donc en créer un au préalable. Sélectionnez “Subscriptions” comme indiqué ci-dessous:

![](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Sélectionnez ensuite “+ Add” pour ajouter un nouvel abonnement

![](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

Si vous souhaitez utiliser la tarification de VM Instance Spot \(qui sera considérablement moins chère\), vous ne pouvez pas utiliser un compte d'essai gratuit \(et vous recevrez une erreur lors de la validation\), alors assurez-vous **de sélectionner Pay-As-You-Go.**

![](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Entrez vos informations de facturation et confirmez votre identité dans le cadre du processus d'inscription, lorsque vous arrivez à Ajouter un support technique, sélectionnez l'option "no technical support" \(sauf si vous souhaitez payer un supplément pour l'assistance\) et appuyez sur Suivant.

![](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Créer une machine virtuelle <a id="41ac"></a>

Maintenant que nous avons un abonnement, nous pouvons créer la machine virtuelle Ubuntu pour notre nœud d'avalanche. Sélectionnez l'icône en haut à gauche du menu et choisissez “+ Create a resource”.

![](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Sélectionnez Ubuntu Server 18.04 LTS \(ce sera normalement dans la section "popular" ou recherchez-le sur le marché\)

![](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Cela vous mènera à la page Créer une machine virtuelle comme indiqué ci-dessous:

![](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

Tout d'abord, entrez un nom de machine virtuelle, cela peut être n'importe quoi, mais dans mon exemple, je l'ai appelé Avalanche \(cela changera également automatiquement le nom du groupe de ressources pour qu'il corresponde\)

Sélectionnez ensuite une région dans la liste déroulante. Sélectionnez l'une des recommandations recommandées dans la région que vous préférez, car elles ont tendance à être les plus grandes avec la plupart des fonctionnalités activées et des prix moins chers. Dans cet exemple, j'ai sélectionné l'Europe du Nord.

![](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

Vous avez la possibilité d'utiliser la tarification au comptant pour économiser des sommes importantes sur les coûts de fonctionnement. Les instances ponctuelles utilisent une structure de prix de marché offre et demande. À mesure que la demande d'instances augmente, le prix de l'instance spot augmente. Si la capacité est insuffisante, votre VM sera désactivée. Les chances que cela se produise sont cependant incroyablement faibles, surtout si vous sélectionnez l'option Capacité uniquement. Même dans le cas improbable où il serait désactivé temporairement, vous n'avez besoin que de maintenir au moins 60% de temps pour recevoir les récompenses de jalonnement et il n'y a pas de slash mis en œuvre dans Avalanche.

Sélectionnez Oui pour l'instance Azure Spot, sélectionnez l'Eviction type sur Capacity Only aet assurez-vous de définir la stratégie **eviction policy sur Stop / Deallocate — Ceci est très important sinon la machine virtuelle sera supprimée**

![](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Choisissez “Select size” pour modifier la taille de la machine virtuelle, et dans le menu, sélectionnez D2s\_v4 sous la sélection D-Series v4 \(cette taille a 2 cœurs, 8 Go de mémoire et active les SSD Premium\). Vous pouvez utiliser des instances F2s\_v2 à la place, avec 2 cœurs, 4 Go de mémoire et des disques SSD Premium\), mais le prix au comptant est en fait moins cher pour la machine virtuelle plus grande actuellement avec des prix d'instance au comptant. Vous pouvez utiliser [ce lien](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) pour afficher les prix dans les différentes régions.

![](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Une fois que vous avez sélectionné la taille de la machine virtuelle, sélectionnez“View pricing history and compare prices in nearby regions” pour voir comment le prix au comptant a changé au cours des 3 derniers mois et s'il est moins coûteux d'utiliser une région voisine qui peut en avoir plus. capacité de réserve.

![](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

Au moment de cet article, le prix au comptant pour D2s\_v4 en Europe du Nord coûte 0,07975 USD par heure, soit environ 698,61 USD par an. Avec les prix au comptant, le prix tombe à 0,01295 $ l'heure, ce qui équivaut à environ 113,44 $ par an, **soit une économie de 83,76%!**

Certaines régions sont encore moins chères, l'est des États-Unis par exemple coûte 0,01060 $ l'heure ou environ 92,86 $ par an!

![](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

Vous trouverez ci-dessous l'historique des prix de la VM au cours des 3 derniers mois pour l'Europe du Nord et les régions à proximité.​

![](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Moins cher qu'Amazon AWS <a id="45e9"></a>

À titre de comparaison, une instance c5.large coûte 0,085 USD par heure sur AWS. Cela représente environ 745 USD par an. Les instances ponctuelles peuvent économiser 62%, ce qui ramène ce total à 462 $.

L'étape suivante consiste à modifier le nom d'utilisateur de la machine virtuelle, à s'aligner sur les autres didacticiels d'Avalanche, à changer le nom d'utilisateur en ubuntu. Sinon, vous devrez modifier plusieurs commandes plus loin dans cet article et échanger ubuntu avec votre nouveau nom d'utilisateur.

![](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Disques <a id="ed2e"></a>

Sélectionnez ensuite : Disks our ensuite configurer les disques de l'instance. Il existe 2 choix pour les disques, soit le SSD Premium qui offre de meilleures performances avec un disque de 64 Go coûte environ 10 $ par mois, soit le SSD standard qui offre des performances inférieures et coûte environ 5 $ par mois. Vous devez également payer 0,002 USD pour 10000 unités de transaction \(lectures / écritures et suppressions\) avec le SSD Standard, alors qu'avec les SSD Premium, tout est inclus. Personnellement, j'ai choisi le SSD Premium pour de meilleures performances, mais aussi parce que les disques sont susceptibles d'être fortement utilisés et peuvent donc même être moins chers à long terme.

Sélectionnez ensuite: Networking pour passer à la configuration du réseau

![](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### Configuration du réseau <a id="bc5d"></a>

Vous souhaitez utiliser une adresse IP statique afin que l'adresse IP publique attribuée au nœud ne change pas en cas d'arrêt. Sous IP publique, sélectionnez “Create new”.

![](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

Sélectionnez ensuite “Static” comme type d'affectation

![](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

Ensuite, nous devons configurer le groupe de sécurité réseau pour contrôler l'accès entrant au nœud Avalanche. Sélectionnez “Advanced” comme type de groupe de sécurité du réseau NIC et sélectionnez “Create new”

![](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

Pour des raisons de sécurité, vous souhaitez restreindre les personnes autorisées à se connecter à distance à votre nœud. Pour ce faire, vous voudrez d'abord savoir quelle est votre adresse IP publique existante. Cela peut être fait en accédant à Google et en recherchant "quelle est mon adresse IP".

![](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

Il est probable que vous ayez reçu une adresse IP publique dynamique pour votre domicile, sauf si vous l'avez spécifiquement demandée, et votre adresse IP publique attribuée peut donc changer à l'avenir. Cependant, il est toujours recommandé de restreindre l'accès à votre adresse IP actuelle, puis dans le cas où votre adresse IP domestique change et que vous ne pouvez plus vous connecter à distance à la machine virtuelle, vous pouvez simplement mettre à jour les règles de sécurité réseau avec votre nouvelle adresse IP publique afin que vous soyez capable de se connecter à nouveau.

REMARQUE: Si vous devez modifier les règles du groupe de sécurité réseau après le déploiement si votre adresse IP domestique a changé, recherchez «avalanche-nsg» et vous pouvez modifier la règle pour SSH et le port 9650 avec la nouvelle adresse IP. **Le port 9651 doit rester ouvert à tous**, car c'est ainsi qu'il communique avec les autres nœuds Avalanche.

![](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

Maintenant que vous avez votre adresse IP publique, sélectionnez la règle Autoriser ssh par défaut sur la gauche sous les règles entrantes pour la modifier. Changez la source de “Any” à “IP Addresses”, puis entrez votre adresse IP publique que vous avez trouvée sur google dans le champ Adresse IP source. Modifiez la priorité vers le bas à 100, puis appuyez sur "Save".

![](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

Ensuite, sélectionnez “+ Add an inbound rule” pour ajouter une autre règle pour l'accès RPC, cela devrait également être limité à votre adresse IP uniquement. Remplacez la source par "Adresses IP" et entrez votre adresse IP publique renvoyée par Google dans le champ IP source. Cette fois, changez le champ “Destination port ranges” sur 9650 et sélectionnez “TCP” comme protocole. Changez la priorité à 110 et donnez-lui un nom de “Avalanche\_RPC” et appuyez sur "Add".

![](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

Sélectionnez “+ Add an inbound rule” our ajouter une règle finale pour le protocole Avalanche afin que d'autres nœuds puissent communiquer avec votre nœud. Cette règle doit être ouverte à tous, alors gardez «Source» sur “Any”. Changez la plage de ports de destination sur «9651» et changez le protocole sur «TCP». Entrez une priorité de 120 et un nom de Avalanche\_Protocol et appuyez sur "Add".

![](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

Le groupe de sécurité réseau doit ressembler à celui ci-dessous \(bien que votre adresse IP publique soit différente\) et appuyez sur OK.

![](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

Laissez les autres paramètres par défaut, puis appuyez sur “Review + create” pour créer la machine virtuelle.

![](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

Il effectuera d'abord un test de validation. Si vous recevez une erreur ici, assurez-vous d'avoir sélectionné le modèle d'abonnement Pay-As-You-Go et que vous n'utilisez pas l'abonnement d'essai gratuit car les instances Spot ne sont pas disponibles. Vérifiez que tout semble correct et appuyez sur “Create”

![](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

Vous devriez alors recevoir une invite vous demandant de générer une nouvelle paire de clés pour connecter votre machine virtuelle. Sélectionnez “Download private key and create resource” pour télécharger la clé privée sur votre PC.

![](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

Une fois votre déploiement terminé, sélectionnez “Go to resource”

![](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Modifier la taille du disque provisionné <a id="00dc"></a>

Par défaut, la VM Ubuntu sera provisionnée avec un SSD Premium de 30 Go, alors que cela devrait être suffisant, je ne voulais personnellement pas avoir à le prolonger plus tard dans la période de mise. J'ai inclus les étapes ci-dessous si vous souhaitez l'augmenter à 64 Go ou si vous devez l'augmenter ultérieurement.

![](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

Pour modifier la taille du disque, la machine virtuelle doit être arrêtée et désallouée. Sélectionnez “Stop” et attendez que l'état soit deallocated. Sélectionnez ensuite “Disks” sur la gauche.

![](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

Sélectionnez le nom du disque actuellement provisionné pour le modifier

![](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

Sélectionnez “Size + performance” sur la gauche en-dessous de settings et changez la taille à 64 Go et appuyez sur “Resize”.

![](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

Faire cela maintenant étendra également la partition automatiquement dans ubuntu. Pour revenir à la page de présentation de la machine virtuelle, sélectionnez Avalanche dans les paramètres de navigation.

![](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

Puis démarrez la VM

![](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Connectez-vous au nœud Avalanche <a id="8bb7"></a>

Les instructions suivantes montrent comment se connecter à la machine virtuelle à partir d'une machine Windows 10. Pour obtenir des instructions sur la connexion à partir d'une machine ubuntu, consultez le [didacticiel AWS](https://docs.avax.network/build/tutorials/nodes-and-staking/setting-up-an-avalanche-node-with-amazon-web-services-aws).

Sur votre PC local, créez un dossier à la racine du lecteur C: appelé Avalanche, puis déplacez le fichier Avalanche\_key.pem que vous avez téléchargé précédemment dans le dossier. Cliquez ensuite avec le bouton droit sur le fichier et sélectionnez Propriétés. Accédez à l'onglet de sécurité et sélectionnez «Avancé» en bas

![](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

Sélectionnez «Désactiver l'héritage», puis «Supprimer toutes les autorisations héritées de cet objet» pour supprimer toutes les autorisations existantes sur ce fichier.

![](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

Sélectionnez ensuite «Ajouter» pour ajouter une nouvelle autorisation et choisissez «Sélectionner un mandant» en haut. Dans la fenêtre contextuelle, entrez votre compte d'utilisateur que vous utilisez pour vous connecter à votre machine. Dans cet exemple, je me connecte avec un utilisateur local appelé Seq, vous pouvez avoir un compte Microsoft que vous utilisez pour vous connecter, alors utilisez le compte avec lequel vous vous connectez à votre PC et appuyez sur "Vérifier les noms" et il doit le souligner pour vérifier et appuyer sur OK.

![](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

Ensuite, dans la section des autorisations, assurez-vous que seuls «Lire et exécuter» et «Lire» sont sélectionnés et appuyez sur OK.

![](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

Cela devrait ressembler à quelque chose comme ci-dessous, sauf avec un nom de PC / un compte d'utilisateur différent. Cela signifie simplement que le fichier de clé ne peut être modifié ou accessible par aucun autre compte sur cette machine à des fins de sécurité afin qu'ils ne puissent pas accéder à votre nœud Avalanche.

![](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Trouvez l'adresse IP publique de votre nœud Avalanche <a id="4687"></a>

Depuis le portail Azure, notez votre adresse IP publique statique qui a été attribuée à votre nœud.

![](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Pour vous connecter au nœud Avalanche, ouvrez l'invite de commande en recherchant «cmd» et en sélectionnant «Invite de commandes» sur votre ordinateur Windows 10.

![](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

Ensuite, utilisez la commande suivante et remplacez EnterYourAzureIPHere par l'adresse IP statique indiquée sur le portail Azure.

`ssh -i C:\Avalanche\Avalanche_key.pem ubuntu@EnterYourAzureIPHere`

pour mon exemple c'est:

`ssh -i C:\Avalanche\Avalanche_key.pem ubuntu@13.74.10.81`

La première fois que vous vous connectez, vous recevrez une invite vous demandant de continuer, entrez oui.

![](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

Vous devriez maintenant être connecté à votre Node.

![](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

La section suivante est tirée de l'excellent tutoriel de Colin pour [configurer un nœud Avalanche sur AWS d'Amazon](executer-un-noeud-avalanche-avec-amazon-web-services-aws.md).

### Mettre à jour Linux avec des correctifs de sécurité <a id="8a1c"></a>

Maintenant que nous sommes sur notre nœud, il est judicieux de le mettre à jour avec les derniers packages. Pour ce faire, exécutez les commandes suivantes, une par une, dans l'ordre:

```cpp
sudo apt updatesudo apt upgrade -ysudo reboot
```

![](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

Cela mettra notre instance à jour avec les derniers correctifs de sécurité pour notre système d'exploitation. Cela redémarrera également le nœud. Nous donnerons au nœud une minute ou deux pour redémarrer, puis nous reconnecterons, comme auparavant.

### Configurer le nœud Avalanche <a id="5688"></a>

Nous devons maintenant configurer notre nœud Avalanche. Pour ce faire, suivez le [didacticiel Configurer le nœud d'avalanche avec le programme d'installation](executer-un-noeud-avalanche-sous-linux-a-laide-du-script-dinstallation.md) qui automatise le processus d'installation. Vous aurez besoin de «l'adresse IP publique IPv4» copiée à partir du portail Azure que nous avons configuré précédemment.

Une fois l'installation terminée, notre nœud devrait maintenant être bootstrap! Nous pouvons exécuter la commande suivante pour jeter un coup d'œil au dernier statut du nœud avalanchego:

```cpp
sudo systemctl status avalanchego
```

Pour vérifier l'état du bootstrap, nous devons adresser une requête au RPC local à l'aide de "curl". Cette demande est la suivante:

```cpp
curl -X POST --data '{    "jsonrpc":"2.0",    "id"     :1,    "method" :"info.isBootstrapped",    "params": {        "chain":"X"    }}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Le nœud peut prendre un certain temps \(plus d'une heure à ce moment d'écriture\) pour démarrer. Le boostrap signifie que le nœud télécharge et vérifie l'historique des chaînes. Donnez-lui un peu de temps. Une fois que le nœud a terminé l'amorçage, la réponse sera:

```cpp
{    "jsonrpc": "2.0",    "result": {        "isBootstrapped": true    },    "id": 1}
```

Nous pouvons toujours utiliser «`sudo systemctl status avalanchego`» pour consulter le dernier statut de notre service, comme auparavant.

### Obtenez votre NodeID <a id="20a7"></a>

Nous devons absolument obtenir notre NodeID si nous prévoyons de faire une validation sur ce nœud. Ceci est également récupéré à partir du RPC. Nous appelons la commande curl suivante pour obtenir notre NodeID.

```cpp
curl -X POST --data '{    "jsonrpc":"2.0",    "id"     :1,    "method" :"info.getNodeID"}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si tout va bien, la réponse devrait ressembler à quelque chose comme:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

Cette partie qui dit, "NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR" est notre NodeID, le tout. Copiez-le et conservez-le dans nos notes. Cette valeur n’a rien de confidentiel ou de sécurisé, mais c’est un must absolu lorsque nous soumettons ce nœud pour être un validateur.

### Sauvegardez vos clés de mise en jeu <a id="ef3e"></a>

La dernière chose à faire est de sauvegarder nos clés de mise en jeu dans le cas intempestif où notre instance est corrompue ou arrêtée. C’est simplement une bonne pratique pour nous de conserver ces clés. Pour les sauvegarder, nous utilisons la commande suivante:

```cpp
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Comme précédemment, nous devrons remplacer "EnterYourAzureIPHere" par la valeur appropriée que nous avons récupérée. Cela sauvegarde notre clé de mise en jeu et notre certificat de mise en jeu dans le dossier C:\Avalanche que nous avons créé auparavant.

![](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

