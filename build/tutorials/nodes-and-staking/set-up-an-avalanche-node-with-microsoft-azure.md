---
description: 'Tutoriel généré par la communauté Membre: Seq'
---

# Exécuter un nœud Avalanche avec Microsoft Azure

L'exécution d'un validateur et la jalonnement avec Avalanche fournit des récompenses extrêmement compétitives de entre 9,69 % et 11,54 % en fonction de la longueur que vous avez à faire. Le taux maximum est gagné en staking pendant un an, tandis que le taux le plus bas pendant 14 jours. Il n'y a pas de slashing, vous n'avez donc pas besoin de vous inquiéter d'une défaillance matérielle ou d'un bogue dans le client qui vous fait perdre une partie de votre enjeu. Au lieu de la part d'Avalanche, vous n'avez besoin que de maintenir actuellement au moins 60 % de temps à l'heure d'application pour recevoir des récompenses. Si vous ne répondez pas à cette exigence, vous ne vous laissez pas slasher, mais vous ne recevez pas les récompenses.** Vous n'avez pas besoin de mettre vos clés privées sur un nœud pour commencer à valider sur ce nœud.** Même si quelqu'un pénètre dans votre environnement cloud et qu'il obtient l'accès au nœud, le pire qu'il peut faire est d'éteindre le nœud.

Non seulement l'exécution d'un nœud de validateur vous permet de recevoir des récompenses dans AVAX, mais plus tard, vous pourrez également valider d'autres sous-réseaux dans l'écosystème et recevoir des récompenses dans le jeton natif de leurs sous-réseaux.

Vous n'avez besoin que de modestes exigences matérielles de 2 cœurs de CPU, de 4 Go de mémoire et de 200 Go de SSD pour exécuter un validateur et il n'utilise pas d'énormes quantités d'énergie. Le [mécanisme](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656) de consensus révolutionnaire d'Avalanche est en mesure de s'étendre à des millions de validateurs participant à un consensus en la même occasion, offrant une décentralisation sans pareille.

Actuellement, le montant minimum nécessaire à la mise en jeu pour devenir validateur est de 2 000 AVAX \(qui peut être réduit au fil du temps à mesure que les prix augmentent\). Par ailleurs, les validateurs peuvent également facturer une petite redevance pour permettre aux utilisateurs de déléguer leurs parts avec eux pour aider à financer les frais de fonctionnement. Vous pouvez utiliser une calculatrice [ici](https://vscout.io/) pour voir combien de récompenses vous gagnerez lors de l'exécution d'un nœud, par rapport à la déléguée.

J'encourage tout le monde à exécuter leurs propres validateurs si possible, mais pour ceux qui ne satisfont pas aux exigences minimales de jalonnement et qui veulent déléguer je suis en train de lancer un nœud que vous pouvez trouver [ici](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb).

Dans cet article, nous passerons au processus de configuration d'un nœud sur Microsoft Azure. Ce tutoriel n'assume aucune expérience préalable avec Microsoft Azure et traversera chaque étape avec le plus petit nombre possible d'hypothèses

**Au moment de cet article, le prix au point pour une machine virtuelle avec 2 cœurs et 8 Go de mémoire coûte aussi peu que 0,01060 $ l'heure qui fonctionne à environ 113,44 $ par an, une économie de 83,76 % ! par rapport à la rémunération normale en tant que vous allez les prix.** En comparaison une machine virtuelle en AWS avec 2 cœurs et 4 Go de mémoire avec un prix au comptant est d'environ 462 $ par année.

## Configuration initiale d'abonnement<a id="6e8d"></a>

### Configuration de 2 facteur<a id="b9d0"></a>

D'abord, vous aurez besoin d'un compte Microsoft, si vous n'en avez pas déjà un vous verrez une option pour en créer un sur le lien suivant. Si vous en avez déjà un, assurez-vous de configurer l'authentification de 2 facteur pour sécuriser votre nœud en accédant au lien suivant, puis en sélectionnant "Vérification en deux étapes" et en suivant les étapes fournies.

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![Image pour post](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

Une fois que deux facteurs ont été configurés, se connecter au portail Azure en allant à [https://portal.azure.com](https://portal.azure.com/) et en vous connectant à votre compte Microsoft. Lorsque vous vous connectez, vous n'aurez pas d'abonnement, nous devons en créer un d'abord. Sélectionnez les "abonnements" comme souligné ci-dessous:

![Image pour post](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Sélectionnez ensuite "\+ Ajouter" pour ajouter un nouvel abonnement

![Image pour post](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

**Si vous souhaitez utiliser la tarification VM Spot Instance \(qui sera considérablement moins cher\), vous ne pouvez pas utiliser un compte d'essai gratuit \(et vous recevrez une erreur lors de la validation\), alors assurez-vous de sélectionner Pay-As-You-Go.**

![Image pour post](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Saisissez vos informations de facturation et confirmez votre identité dans le cadre du processus d'inscription, lorsque vous aurez à ajouter un support technique, sélectionnez l'option sans support \(à moins que vous ne souhaitez payer un supplément pour le support\) et appuyez sur Suivant.

![Image pour post](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Créer une machine virtuelle<a id="41ac"></a>

Maintenant que nous avons un abonnement, nous pouvons créer la machine virtuelle Ubuntu pour notre nœud Avalanche. Sélectionnez l'icône dans le haut à gauche pour le menu et choisissez "\+ Créer une ressource".

![Image pour post](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Sélectionnez Ubuntu Server 18.04 LTS \(ce sera normalement sous la section populaire ou la recherche alternativement sur le marché\)

![Image pour post](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Cela vous mènera à la page Créer une machine virtuelle comme montré ci-dessous :

![Image pour post](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

Tout d'abord, entrez un nom dans une machine virtuelle, cela peut être n'importe quoi, mais dans mon exemple, je l'ai appelé Avalanche \(cela changera automatiquement le nom de groupe de ressources pour corresponder\)

Sélectionnez ensuite une région dans la liste déroulante. Sélectionnez l'un des recommandés dans une région que vous préférez car celles-ci sont généralement les plus grandes avec la plupart des fonctionnalités et des prix moins chers. Dans cet exemple, j'ai sélectionné l'Europe du Nord.

![Image pour post](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

Vous avez la possibilité d'utiliser des prix au point pour enregistrer des montants importants sur les coûts de fonctionnement. Les instances Spot utilisent une structure de prix du marché de l'offre et de la demande. Au fur et à mesure que la demande d'instances augmente, le prix de l'instance spot augmente. En cas de capacité insuffisante, votre VM sera désactivée. Les chances de ce phénomène sont incroyablement basses, surtout si vous sélectionnez l'option Capacité. Même dans l'événement peu probable qu'il ne s'éteint temporairement vous n'avez besoin de maintenir au moins 60 % de temps pour recevoir les récompenses et il n'y a pas de slashing mis en œuvre dans Avalanche.

Sélectionnez Oui pour l'instance Azure Spot, sélectionnez Type d'Eviction à la capacité seulement et **assurez-vous de définir la politique d'expulsion pour arrêter / désaffecter — C'est très important sinon la VM sera supprimée.**

![Image pour post](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Choisissez "Sélectionnez la taille" pour changer la taille de la machine virtuelle, et dans le menu sélectionnez D2s\_v4 sous la sélection d'une série d'articles d'une série d'articles d'une série d'articles d'une série d'articles d'art \(cette taille a 2 cores, 8 Go de mémoire et permet des SSD premium\). Vous pouvez utiliser les instances F2s\_v2 à la place, avec 2 noyaux, 4 Go de mémoire et permet des SSD premium\), mais le prix au comptant s'affiche en fait moins cher pour la plus grande VM actuellement avec les prix au comptant des instances de sélection. Vous pouvez utiliser [ce lien](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) pour afficher les prix dans les différentes régions.

![Image pour post](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Une fois que vous avez sélectionné la taille de la machine virtuelle, sélectionnez "Visualisez l'historique des prix et comparez les prix dans les régions voisines" pour voir comment le prix au comptant a changé au cours des 3 derniers mois, et si c'est moins cher d'utiliser une région à proximité qui peut avoir plus de capacités de rechange.

![Image pour post](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

Au moment de cet article, le prix au comptant pour D2s\_v4 en Europe du Nord coûte 0,07975 $ l'heure, ou environ 698,61 $ par an. Avec les prix au poste, le prix tombe à 0,01295 $ l'heure, qui fonctionne à environ 113,44 $ par an, soit **une économie de 83,76 % !**

Il ya certaines régions qui sont encore moins chères, l'Est des États-Unis par exemple est de 0,01060 $ l'heure ou environ 92,86 $ par an !

![Image pour post](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

Ci-dessous, vous pouvez voir l'historique des prix du VM au cours des 3 derniers mois pour l'Europe du Nord et les régions ![à nearby.Image pour la post](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)

![Image pour post](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Moins cher que Amazon AWS<a id="45e9"></a>

En comparaison, un cas c5.large instance coûte 0,085 $ USD par heure sur AWS. Cela s'élève à environ 745 $ US par an. Les instances de spot peuvent enregistrer 62 %, ce qui porte ce total à 462 $.

La prochaine étape est de changer le nom d'utilisateur pour la VM, de s'aligner sur d'autres tutoriels d'Avalanche de changer le nom d'utilisateur pour ubuntu. Sinon, vous devrez changer plusieurs commandes plus tard dans cet article et déverser ubuntu avec votre nouveau nom d'utilisateur.

![Image pour post](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Disques<a id="ed2e"></a>

Sélectionnez le suivant : les disques pour configurer ensuite les disques pour l'instance. Il y a 2 choix pour les disques, soit un SSD Premium qui offre une plus grande performance avec un disque de 64 Go de coût autour de 10 $ par mois, soit il y a le SSD standard qui offre une performance inférieure et est d'environ 5 $ par mois. Vous devez également payer 0,002 $ pour 10 000 unités de transaction \(lis, écrit et supporte\) avec la SSD standard, tandis que avec les SSD premium, tout est inclus. Personnellement, j'ai choisi le SSD Premium pour une plus grande performance, mais aussi parce que les disques sont probablement fortement utilisés et peuvent donc même travailler moins cher à long terme.

Sélectionnez le suivant : Se connecter à la configuration du réseau

![Image pour post](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### Config de réseau de<a id="bc5d"></a>

Vous souhaitez utiliser une IP statique de sorte que la IP publique affectée au nœud ne change pas dans le cas où elle s'arrête. Sous IP publique, sélectionnez "Créer de nouvelles

![Image pour post](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

Sélectionnez ensuite "Statique" comme type d'attribution

![Image pour post](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

Ensuite, nous devons configurer le groupe de sécurité réseau pour contrôler l'accès au nœud Avalanche. Sélectionnez "Advanced" en tant que groupe de sécurité du réseau de NIC et sélectionnez "Créer de nouveau"

![Image pour post](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

À des fins de sécurité, vous souhaitez restreindre qui est en mesure de se connecter à distance à votre nœud. Pour ce faire, vous voudrez d'abord savoir ce que votre IP publique existante. Cela peut être fait en allant à Google et en cherchant "ce qui est mon ip".

![Image pour post](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

Il est probable que vous ayez reçu une IP publique dynamique pour votre maison, à moins que vous l'ayez demandé expressément, et que votre IP publique attribuée puisse changer à l'avenir. Il est encore recommandé de restreindre l'accès à votre IP actuelle, et ensuite dans le cas où votre IP domestique se modifie et que vous ne pouvez plus vous connecter à distance à la VM, vous pouvez simplement mettre à jour les règles de sécurité du réseau avec votre nouvelle IP publique afin de pouvoir vous connecter à nouveau.

NOTE : Si vous devez changer les règles du groupe de sécurité réseau après le déploiement si votre IP domestique a changé, recherchez "avalanche-nsg" et vous pouvez modifier la règle pour SSH et Port 9650 avec la nouvelle IP.** Port 9651 doit rester ouvert à tous **mais comme c'est comme cela qu'il communique avec d'autres nœuds d'Avalanche.

![Image pour post](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

Maintenant que vous avez votre IP publique sélectionnez la règle de sauvegarde de la gauche sous les règles d'entrée de la modifier. Changez la source de "Any" à "adresses IP" et entrez ensuite dans votre adresse IP publique que vous avez trouvée de google dans le champ d'adresse IP de la source. Changez la priorité vers le bas à 100 puis appuyez sur Économiser.

![Image pour post](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

Sélectionnez ensuite "\+ Ajouter une règle de entrée" pour ajouter une autre règle pour l'accès à RPC, ce qui devrait également être limité à votre IP. Modifiez la source pour les "adresses IP" et entrez dans votre IP publique retourné de google dans le champ IP de la source. Cette fois-ci modifiez le champ "port de destination" à 9650 et sélectionnez "TCP" comme protocole. Modifiez la priorité à 110 et donnez-lui un nom de "Avalanche\_RPC" et appuyez sur Add.

![Image pour post](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

Sélectionnez "\+ Ajouter une règle de entrée" pour ajouter une règle finale pour le protocole d'Avalanche afin que d'autres nœuds puissent communiquer avec votre nœud. Cette règle doit être ouverte à tous pour garder "Source" configuré sur "Any". Modifiez la gamme de port de destination en "9651" et changez le protocole en "TCP". Entrez une priorité de 120 et un nom of et appuyez sur Add.

![Image pour post](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

Le groupe de sécurité du réseau devrait ressembler à ce qui suit \(bien que votre adresse IP publique soit différente\) et appuyez sur OK.

![Image pour post](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

Laissez les autres paramètres comme par défaut et appuyez sur "Review \+ create" pour créer la machine virtuelle.

![Image pour post](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

D'abord, il effectuera un test de validation. Si vous recevez une erreur ici, assurez-vous que vous avez sélectionné le modèle d'abonnement Pay-As-You-Go et que vous n'utilisez pas l'abonnement à l'essai gratuit car les instances Spot ne sont pas disponibles. Vérifier tout semble correct et appuyez sur "Créer"

![Image pour post](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

Vous devez ensuite recevoir une invite vous demandant de générer une nouvelle paire de clés pour connecter votre machine virtuelle. Sélectionnez "Télécharger la clé privée et créer des ressources" pour télécharger la clé privée sur votre PC.

![Image pour post](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

Une fois votre déploiement terminé, sélectionnez "Aller à la ressource"

![Image pour post](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Changer la taille du disque provisionnée<a id="00dc"></a>

Par défaut, le VM Ubuntu sera fourni avec un SSD Premium de 30 Go Vous devez augmenter cette valeur à 250 Go, pour permettre la croissance des bases de données.

![Image pour post](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

Pour changer la taille du disque, la VM doit être arrêtée et désaffectée. Sélectionnez "Stop" et attendez que l'état soit affiché désaffecté. Sélectionnez ensuite "Disques" sur la gauche.

![Image pour post](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

Sélectionnez le nom de disque qui est actuellement provisionné pour le modifier

![Image pour post](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

Sélectionnez "Taille \+ performance" sur la gauche sous les paramètres et changez la taille à 250 Go et appuyez sur "Resize".

![Image pour post](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

Faire cela maintenant va également étendre automatiquement la partition au sein d'ubuntu. Pour revenir à la page d'aperçu de la machine virtuelle, sélectionnez Avalanche dans le cadre de la navigation.

![Image pour post](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

Puis démarrer la VM

![Image pour post](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Connectez-vous au nœud d'Avalanche<a id="8bb7"></a>

Les instructions suivantes montrent comment se connecter à la machine virtuelle depuis une machine Windows 10. Pour obtenir des instructions sur la façon de se connecter d'une machine ubuntu, consultez le [tutoriel AWS](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

Sur votre PC local, créez un dossier sur la racine du C : lecteur appelé Avalanche et déplacez ensuite le fichier Avalanche\_key.pem que vous avez téléchargé avant dans le dossier. Puis cliquez avec le bouton droit sur le fichier et sélectionnez Propriétés. Aller à l'onglet de sécurité et sélectionnez "Avancé" au bas

![Image pour post](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

Sélectionnez "Désactiver l'héritage" puis "Supprimer toutes les autorisations héritées de cet objet" pour supprimer toutes les autorisations existantes sur ce fichier.

![Image pour post](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

Sélectionnez ensuite "Ajouter" pour ajouter une nouvelle permission et choisissez "Sélectionner un principal" en haut. Depuis la boîte de dialogue et entrez dans votre compte d'utilisateur que vous utilisez pour vous connecter à votre machine. Dans cet exemple que je me connecte à un utilisateur local appelé Seq, vous pouvez avoir un compte Microsoft que vous utilisez pour vous connecter, donc utilisez tout compte que vous vous connectez à votre PC avec et appuyez sur "Check Names" et il devrait le souligner pour vérifier et appuyez sur OK.

![Image pour post](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

Puis à partir de la section des permissions, assurez-vous que seuls les mots "Read & exécuter" et "Lecture" sont sélectionnés et appuyez sur OK.

![Image pour post](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

Il devrait ressembler à quelque chose de ce qui précède, sauf avec un nom de PC / un compte d'utilisateur différent. Cela signifie juste que le fichier clé ne peut pas être modifié ou consulté par d'autres comptes sur cette machine à des fins de sécurité, de sorte qu'ils ne peuvent pas accéder à votre nœud Avalanche.

![Image pour post](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Trouvez votre IP publique sur le nœud d'Avalanche<a id="4687"></a>

Depuis le portail Azure, faites une note de votre adresse IP publique statique qui a été attribuée à votre nœud.

![Image pour post](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Pour vous connecter au nœud d'Avalanche, ouvrez l'invite de commande en recherchant "cmd" et en sélectionnant "Command Prompt " sur votre machine Windows 10.

![Image pour post](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

Utilisez ensuite la commande suivante et remplacez use par l'adresse IP statique indiquée sur le portail Azure.

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@EnterYourAzureIPHere

pour mon exemple :

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

La première fois que vous vous connectez, vous recevrez une invite à continuer de vous connecter, à entrer oui.

![Image pour post](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

Vous devez maintenant être connecté à votre nœud.

![Image pour post](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

La section suivante est tirée de l'excellent tutoriel de Colin pour [configurer un nœud Avalanche sur les AWS d'Amazon](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

### Mettre à jour Linux avec des patchs de sécurité<a id="8a1c"></a>

Maintenant que nous sommes sur notre nœud, c'est une bonne idée de la mettre à jour les derniers paquets. Pour ce faire, exécutez les commandes suivantes, un en un au même moment, dans l'ordre :

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![Image pour post](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

Cela rendra notre instance à jour avec les dernières correctifs de sécurité pour notre système d'exploitation. Cela redémarrera également le nœud. Nous donnerons au nœud une ou deux minutes pour booter et ensuite se connecter, puis se connecter, même qu'auparavant.

### Définir le nœud Avalanche<a id="5688"></a>

Maintenant nous allons devoir configurer notre nœud Avalanche. Pour ce faire, suivez le tutoriel [d'Avalanche configuré avec](set-up-node-with-installer.md) l'installateur, qui automatise le processus d'installation. Vous aurez besoin de la "IP publique IPv4" copié depuis le portail Azure que nous avons créé plus tôt.

Une fois l'installation terminée, notre nœud devrait maintenant être bootstrapping ! Nous pouvons exécuter la commande suivante pour jeter un coup d'œil sur le dernier statut du nœud of :

```text
sudo systemctl status avalanchego
```

Pour vérifier l'état du bootstrap, nous devrons faire une demande au RPC local en utilisant "curl". Cette demande est la suivante :

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Le nœud peut prendre un certain temps \(vers le haut d'une heure en ce moment d'écriture\) pour bootstrap. Le bootstrapping signifie que le nœud télécharge et vérifie l'histoire des chaînes. Donnez ça un peu de temps. Une fois le nœud terminé, la réponse sera :

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Nous pouvons toujours utiliser "sudo systemctl status avalanchego" pour jeter un coup d'œil sur le dernier statut de notre service comme auparavant, aussi.

### Obtenez votre nodeID<a id="20a7"></a>

Nous devons absolument obtenir notre NodeID si nous prévoyons faire une validation sur ce nœud. Ceci est également extrait du RPC. Nous appelons la commande curl suivante pour obtenir notre NodeID.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si tout est bien, la réponse devrait ressembler à :

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

Cette partie qui dit, "NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR" est notre NodeID, l'ensemble de la question. Copiez cela et gardez cela dans nos notes. Il n'y a rien de confidentiel ou de sécurité sur cette valeur, mais c'est un must absolu lorsque nous soumettons ce nœud pour être un validateur.

### Sauvegardez vos clés de staking<a id="ef3e"></a>

La dernière chose qui doit être fait est de sauvegarder nos clés de jalonnement dans l'événement non opportun que notre instance est corrompu ou résiliée. Il est juste une bonne pratique pour nous de garder ces clés. Pour les sauvegarder, nous utilisons la commande suivante :

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Comme auparavant, nous devrons remplacer "EnterYourAzureIPHere" par la valeur appropriée que nous avons récupérée. Cela sauvegarde notre clé de jalonnement et notre certificat de jalonnement dans le dossier C:\Avalanche que nous avons créé auparavant.

![Image pour post](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

