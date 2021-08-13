---
description: 'Tutoriel généré par la communauté Membre: Seq'

---

# Exécuter un nœud d'avalanche avec Microsoft Azure

Exécuter un validateur et la mise en marche avec Avalanche fournit des récompenses extrêmement compétitives entre 9,69% et 11,54% selon la longueur que vous avez jeu. Le taux maximal est gagné par la mise en place pendant un an, tandis que le taux le plus bas pendant 14 jours. Il n'y a pas de claquage, vous n'avez donc pas besoin de vous inquiéter d'une défaillance matérielle ou d'un bogue dans le client qui vous fait perdre une partie ou tout votre jeu. Au lieu de l'Avalanche, vous avez seulement besoin de maintenir actuellement au moins 60% de temps de mise à jour pour recevoir des récompenses. Si vous ne répondez pas à cette exigence, vous ne vous laissez pas slashed, mais vous ne recevez pas les récompenses. **Vous n'avez pas également besoin de mettre vos clés privées sur un noeud pour commencer à valider sur ce noeud.** Même si quelqu'un casse dans votre environnement cloud et obtient l'accès au nœud, le pire qu'il puisse faire est d'éteindre le nœud.

Non seulement l'exécution d'un noeud validateur vous permet de recevoir des récompenses dans AVAX, mais plus tard, vous serez également en mesure de valider d'autres sous-réseaux de l'écosystème et de recevoir des récompenses dans le jeton natif de leurs sous-réseaux.

Vous avez seulement besoin d'exigences matérielles modestes de 2 noyaux, 4 Go de mémoire et 200 Go de SSD pour exécuter un validateur et il n'utilise pas d'énormes quantités d'énergie. Le [mécanisme de](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656) consensus révolutionnaire d'Avalanche est capable d'étendre à des millions de validateurs participant à un consensus en la même occasion, offrant une décentralisation inégalée.

Actuellement, le montant minimum nécessaire à la mise pour devenir un validateur est 2000 AVAX peut être réduit avec le temps à mesure que les prix augmentent\). Alternativement, les validateurs peuvent également facturer une petite redevance pour permettre aux utilisateurs de déléguer leur participation avec eux afin de contribuer à la gestion des coûts. Vous pouvez utiliser une calculatrice [ici](https://vscout.io/) pour voir combien vous gagneriez lors de l'exécution d'un noeud, par rapport à la déléguation.

J'encourage tout le monde à exécuter leurs propres validateurs lorsque possible, mais pour ceux qui ne satisfont pas aux exigences minimales de mise en place et veulent déléguer je suis actuellement en cours d'exécution un noeud que vous pouvez trouver [ici](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb).

Dans cet article, nous allons passer par le processus de configuration d'un noeud sur Microsoft Azure. Ce tutoriel n'assume aucune expérience antérieure avec Microsoft Azure et passera à chaque étape avec le moins peu d'hypothèses possible.

Au moment de cet article, les prix au point d'une machine virtuelle avec 2 noyaux et 8 Go de mémoire coûtent aussi peu que 0,01060 $ l'heure qui fonctionne à environ 113,44 $ par an, **une économie de** 83,76%! comparés à la rémunération normale que vous allez les prix. En comparaison une machine virtuelle dans AWS avec 2 noyaux et 4 GB Mémoire avec les prix au point est environ $462 par an.

## Configuration initiale de l'abonnement<a id="6e8d"></a>

### Configuration 2 facteur<a id="b9d0"></a>

D'abord, vous aurez besoin d'un compte Microsoft, si vous n'en avez pas déjà vous verrez une option pour en créer un sur le lien suivant. Si vous avez déjà un, assurez-vous de configurer l'authentification 2 facteur pour sécuriser votre noeud en allant au lien suivant puis en sélectionnant "vérification en deux étapes" et en suivant les étapes fournies.

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![Image pour post](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

Une fois que deux facteurs ont été configurés se connecter au portail Azure en allant à [https://portal.azure.com](https://portal.azure.com/) et en vous connectant avec votre compte Microsoft. Lorsque vous vous connectez, vous n'aurez pas d'abonnement, nous devons donc en créer un premier. Sélectionnez "Abonnements" comme indiqué ci-dessous:

![Image pour post](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Ensuite, sélectionnez "+ Ajouter" pour ajouter un nouvel abonnement

![Image pour post](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

Si vous souhaitez utiliser Spot Instance VM Pricing \(qui sera considérablement moins cher\), vous ne pouvez pas utiliser un compte d'essai gratuit \(et vous recevrez une erreur lors de la validation\), **assurez-vous de sélectionner Pay-As-You-Go.**

![Image pour post](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Entrez vos détails de facturation et confirmez l'identité dans le cadre du processus d'inscription, lorsque vous obtenez d'ajouter le support technique, sélectionnez l'option sans support \(sauf si vous voulez payer supplémentaire pour le support\) et appuyez sur Next.

![Image pour post](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Créer une machine virtuelle<a id="41ac"></a>

Maintenant que nous avons un abonnement, nous pouvons créer la machine virtuelle Ubuntu pour notre Node Avalanche. Sélectionnez l'icône dans le haut à gauche pour le menu et choisissez "+ Créer une ressource".

![Image pour post](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Sélectionnez Ubuntu Server 18.04 LTS \(ce sera normalement sous la section populaire ou alternativement la recherche dans le marché\)

![Image pour post](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Cela vous mènera à la page Créer une machine virtuelle comme indiqué ci-dessous:

![Image pour post](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

Premièrement, entrez une machine virtuelle un nom, cela peut être n'importe quoi, mais dans mon exemple, je l'ai appelé Avalanche \(Cela va également changer automatiquement le nom du groupe de ressources pour correspondance\)

Ensuite, sélectionnez une région dans la liste déroulante. Sélectionnez l'un des recommandés dans une région que vous préférez car ceux-ci tendent à être les plus grandes avec la plupart des fonctionnalités activé et des prix moins chers. Dans cet exemple, j'ai sélectionné l'Europe du Nord.

![Image pour post](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

Vous avez la possibilité d'utiliser les prix au comptant pour économiser des montants importants sur les coûts de fonctionnement. Les instances de localisation utilisent une structure de prix du marché de l'offre et de la demande. À mesure que la demande d'instances augmente, le prix de l'instance spot augmente. S'il y a une capacité insuffisante, votre VM sera désactivé. Les chances de ce phénomène sont incroyablement faibles, surtout si vous sélectionnez l'option Capacité seulement. Même dans le cas peu probable qu'il se désactivera temporairement, vous avez seulement besoin de maintenir au moins 60% de temps de repos pour recevoir les récompenses de jalonnement et il n'y a pas de mise en œuvre dans Avalanche.

Sélectionnez Oui pour l'instance Azure Spot, sélectionnez type d'expulsion à la capacité Seulement et **assurez-vous de définir la politique d'expulsion pour Stop / make — C'est très important sinon la VM sera supprimée**

![Image pour post](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Choisissez "Sélectionnez la taille" pour changer la taille de la machine virtuelle, et dans le menu sélectionnez D2s\_v4 sous la sélection D-Series v4 \(Cette taille a 2 noyaux, 8 Go de mémoire et permet les SSD premium\). Vous pouvez utiliser les instances F2s\_v2 à la place, avec sont 2 noyaux, 4 GB Mémoire et permet Premium SSDs\) mais le prix au comptant fonctionne effectivement moins cher pour la VM plus grande actuellement avec les prix des instances au besoin. Vous pouvez utiliser [ce lien](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) pour visualiser les prix dans les différentes régions.

![Image pour post](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Une fois que vous avez sélectionné la taille de la machine virtuelle, sélectionnez "Visualiser l'historique des prix et comparer les prix dans les régions voisines" pour voir comment le prix au comptant a changé au cours des 3 derniers mois, et s'il est moins cher d'utiliser une région voisine qui peut avoir plus de capacités de rechange.

![Image pour post](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

Au moment de cet article, les prix au comptant pour D2s\_v4 en Europe du Nord coûtent 0,07975 $ l'heure, ou environ 698,61 $ par an. Avec le prix au point, le prix tombe à 0,01295 $ l'heure, ce qui fonctionne à environ 113,44 $ par année, **une économie de** 83,76%!

Il ya certaines régions qui sont même moins cher, l'Est US par exemple est $0.01060 l'heure ou environ $92.86 par an!

![Image pour post](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

Ci-dessous, vous pouvez voir l'historique des prix de la VM au cours des 3 derniers mois pour l'Europe du Nord et les régions ![à nearby.Image pour la poste](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)

![Image pour post](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Moins cher que Amazon AWS<a id="45e9"></a>

En comparaison, un c5.large instance coûte $0.085 USD l'heure sur AWS. Cela totalise environ 745 USD par an. Les instances de localisation peuvent économiser 62%, ce qui porte ce total à 462$.

La prochaine étape est de changer le nom d'utilisateur du VM, afin d'aligner avec d'autres tutoriels avalanches changer le nom d'utilisateur vers ubuntu. Sinon, vous aurez besoin de modifier plusieurs commandes plus tard dans cet article et swap ubuntu avec votre nouveau nom d'utilisateur.

![Image pour post](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Disques<a id="ed2e"></a>

Sélectionnez Suivant: Disques pour ensuite configurer les disques pour l'instance. Il y a 2 choix pour les disques, soit Premium SSD qui offrent une plus grande performance avec un 64 Go de coûts de disque autour de 10 $ par mois, ou il ya la norme SSD qui offre une performance inférieure et est environ 5 $ par mois. Vous devez également payer 0,002 $ par 10,000 unités de transaction \(lit / écrit et supprimes\) avec le SSD standard, alors qu'avec les SSD Premium tout est inclus. Personnellement, j'ai choisi le SSD Premium pour une meilleure performance, mais aussi parce que les disques sont probablement fortement utilisés et donc peut même travailler moins cher à long terme.

Sélectionnez Suivant: Réseautage pour se déplacer sur la configuration du réseau

![Image pour post](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### Config réseau<a id="bc5d"></a>

Vous souhaitez utiliser une IP statique de sorte que l'IP publique assignée au noeud ne change pas dans l'éventualité qu'il s'arrête. Sous IP publique sélectionnez "Créer de nouveau"

![Image pour post](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

Ensuite, sélectionnez "Statique" comme type d'affectation

![Image pour post](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

Ensuite, nous devons configurer le groupe de sécurité réseau pour contrôler l'accès à l'entrée du nœud Avalanche. Sélectionnez "Avancé" comme type de groupe de sécurité réseau NIC et sélectionnez "Créer de nouveau"

![Image pour post](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

À des fins de sécurité, vous voulez restreindre qui est capable de se connecter à distance à votre nœud. Pour ce faire, vous voudrez d'abord savoir ce que votre IP publique existante est. Cela peut être fait en allant à google et la recherche de "quel est mon ip".

![Image pour post](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

Il est probable que vous avez reçu une IP publique dynamique pour votre maison, à moins que vous l'ayez expressément demandé, et donc votre IP publique assignée peut changer à l'avenir. Il est toujours recommandé de restreindre l'accès à votre IP actuelle, et dans le cas où votre IP domestique change et vous n'êtes plus en mesure de vous connecter à distance à la VM, vous pouvez simplement mettre à jour les règles de sécurité réseau avec votre nouvelle IP publique afin que vous soyez en mesure de vous connecter à nouveau.

REMARQUE: Si vous devez modifier les règles du groupe de sécurité réseau après déploiement si votre IP domestique a changé, recherchez "avalanche-nsg" et vous pouvez modifier la règle de SSH et Port 9650 avec la nouvelle IP. **Port 9651 doit rester ouvert à tout le** monde, mais comme c'est ainsi qu'il communique avec d'autres nœuds avalanches.

![Image pour post](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

Maintenant que vous avez votre IP publique sélectionnez la règle par défaut autoriser ssh à gauche sous les règles d'entrée pour la modifier. Changez la source de "Any" à "Adresses IP" puis entrez dans votre adresse IP publique que vous avez trouvée de google dans le champ d'adresse IP source. Changez la Priorité vers le bas à 100, puis appuyez sur Enregistrer.

![Image pour post](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

Sélectionnez ensuite "+ Ajouter une règle d'entrée" pour ajouter une autre règle pour l'accès RPC, cela devrait également être limité à votre IP. Modifiez la source pour "Adresses IP" et entrez dans votre IP publique retourné de google dans le champ IP source. Cette fois changer le champ "Destination portes" à 9650 et sélectionnez "TCP" comme protocole. Modifiez la priorité à 110 et lui donner un nom de "Avalanche\_RPC" et appuyez sur Ajouter.

![Image pour post](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

Sélectionnez "+ Ajouter une règle d'entrée" pour ajouter une règle finale pour le Protocole d'Avalanche afin que les autres nœuds puissent communiquer avec votre nœud. Cette règle doit être ouverte à tous alors gardez "Source" réglé sur "Any". Changez la plage de port de destination à "9651" et changez le protocole à "TCP". Entrez une priorité de 120 et un nom of et appuyez sur Ajouter.

![Image pour post](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

Le groupe de sécurité réseau devrait ressembler à la ligne suivante \(quoique votre adresse IP publique sera différente\) et appuyez sur OK.

![Image pour post](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

Laissez les autres paramètres comme défaut puis appuyez sur "Review + create" pour créer la machine virtuelle.

![Image pour post](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

D'abord, il effectuera un test de validation. Si vous recevez une erreur ici, assurez-vous que vous avez sélectionné le modèle d'abonnement Pay-As-You-Go et que vous n'utilisez pas l'abonnement d'essai gratuit puisque les instances Spot ne sont pas disponibles. Vérifier tout semble correct et appuyez sur "Créer"

![Image pour post](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

Vous devriez ensuite recevoir une invite vous demandant de générer une nouvelle paire de clés pour connecter votre machine virtuelle. Sélectionnez "Télécharger la clé privée et créer ressource" pour télécharger la clé privée sur votre PC.

![Image pour post](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

Une fois que votre déploiement aura terminé, sélectionnez "Aller à la ressource"

![Image pour post](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Changer la taille du disque prévu<a id="00dc"></a>

Par défaut, le Ubuntu VM sera fourni avec un SSD Premium de 30 GB. Vous devriez augmenter cette valeur à 250 Go, pour permettre la croissance de la base de données.

![Image pour post](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

Pour changer la taille du disque, la VM doit être arrêtée et désaffectée. Sélectionnez "Stop" et attendre que le statut soit affiché désaffecté. Sélectionnez ensuite "Disques" à gauche.

![Image pour post](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

Sélectionnez le nom du disque qui est actuellement fourni pour le modifier

![Image pour post](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

Sélectionnez "Taille + performance" à gauche sous les paramètres et changez la taille à 250 Go et appuyez sur "Redimensionner".

![Image pour post](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

Ce faisant, vous allez également prolonger la partition automatiquement dans ubuntu. Pour revenir à la page d'aperçu de la machine virtuelle, sélectionnez Avalanche dans le réglage de la navigation.

![Image pour post](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

Puis démarrer la VM

![Image pour post](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Connectez-vous au nœud avalanche<a id="8bb7"></a>

Les instructions suivantes montrent comment se connecter à la machine virtuelle depuis une machine Windows 10. Pour les instructions sur la façon de se connecter à partir d'une machine ubuntu consultez le [tutoriel AWS](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

Sur votre PC local, créez un dossier sur la racine du lecteur C : appelé Avalanche, puis déplacez le fichier Avalanche\_key.pem que vous avez téléchargé avant dans le dossier. Puis cliquez avec le bouton droit du fichier et sélectionnez Propriétés. Allez à l'onglet de sécurité et sélectionnez "Avancé" en bas

![Image pour post](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

Sélectionnez "Désactiver l'héritage" puis "Supprimer toutes les autorisations héritées de cet objet" pour supprimer toutes les autorisations existantes sur ce fichier.

![Image pour post](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

Ensuite, sélectionnez "Ajouter" pour ajouter une nouvelle autorisation et choisissez "Sélectionnez un principal" en haut. Depuis la boîte pop-up entrez dans votre compte utilisateur que vous utilisez pour vous connecter à votre machine. Dans cet exemple je vous connectez-vous avec un utilisateur local appelé Seq, vous pouvez avoir un compte Microsoft que vous utilisez pour vous connecter, donc utilisez quel que soit le compte que vous vous connectez à votre PC avec et appuyez sur "Check Names" et il devrait le souligner pour vérifier et appuyez sur OK.

![Image pour post](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

Ensuite, à partir de la section permissions assurez-vous que seulement "Lire & exécuter" et "Lire" sont sélectionnés et appuyez sur OK.

![Image pour post](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

Il devrait ressembler à quelque chose que ce soit, sauf avec un nom / compte d'utilisateur différent de PC. Cela signifie que le fichier clé ne peut pas être modifié ou consulté par n'importe quel autre compte sur cette machine à des fins de sécurité afin qu'ils ne puissent pas accéder à votre Node Avalanche.

![Image pour post](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Trouvez votre IP publique avec Node Avalanche<a id="4687"></a>

Depuis le portail Azure faites une note de votre adresse IP publique statique qui a été attribuée à votre nœud.

![Image pour post](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Pour vous connecter au nœud Avalanche, ouvrez l'invite de commande en recherchant "cmd" et en sélectionnant "Prompt de commande" sur votre machine Windows 10.

![Image pour post](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

Ensuite, utilisez la commande suivante et remplacez use par l'adresse IP statique indiquée sur le portail Azure.

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@EnterYourAzureIPHere

pour mon exemple :

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

La première fois que vous vous connectez, vous recevrez une invite demandant de continuer, entrez oui.

![Image pour post](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

Vous devriez maintenant être connecté à votre Node.

![Image pour post](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

La section suivante est tirée de l'excellent tutoriel de Colin pour [la configuration d'un nœud avalanche sur les AWS d'Amazon](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

### Mise à jour Linux avec des correctifs de sécurité<a id="8a1c"></a>

Maintenant que nous sommes sur notre nœud, il est une bonne idée de le mettre à jour aux derniers paquets. Pour ce faire, lancez les commandes suivantes, une en temps utile, dans l'ordre :

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![Image pour post](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

Cela rendra notre instance à jour avec les dernières correctifs de sécurité pour notre système d'exploitation. Cela redémarrera également le nœud. Nous donnerons au noeud une minute ou deux pour démarrer la sauvegarde, puis connectez-vous, la même qu'avant.

### Configuration du nœud Avalanche<a id="5688"></a>

Maintenant, nous allons devoir configurer notre nœud Avalanche. Pour ce faire, suivez le [tutoriel Configuration d'Avalanche avec](set-up-node-with-installer.md) l'installateur qui automatise le processus d'installation. Vous aurez besoin de la "IPv4 Public IP" copiée depuis le portail Azure que nous avons configuré précédemment.

Une fois l'installation terminée, notre noeud devrait maintenant être bootstrapping! Nous pouvons exécuter la commande suivante pour jeter un coup d'oeil au dernier statut du noeud avalanchego :

```text
sudo systemctl status avalanchego
```

Pour vérifier l'état du bootstrap, nous aurons besoin de faire une demande au RPC local en utilisant "curl". Cette demande est la suivante:

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

Le noeud peut prendre un certain temps \(vers le haut d'une heure à ce moment l'écriture \) pour bootstrap. Bootstrapping signifie que le noeud télécharger et vérifie l'historique des chaînes. Donnez ça un peu de temps. Une fois le noeud terminé, la réponse sera:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Nous pouvons toujours utiliser "sudo systemctl status avalanchego" pour jeter un coup d'oeil au dernier statut de notre service comme avant, aussi.

### Obtenez votre NodeID<a id="20a7"></a>

Nous devons absolument obtenir notre NodeID si nous prévoyons faire n'importe quelle validation sur ce nœud. Ceci est récupéré depuis le RPC également. Nous appelons la commande curl suivante pour obtenir notre NodeID.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si tout est bien, la réponse devrait ressembler à quelque chose comme:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

Cette portion qui dit, "NodeID-Lve2PzuCvXZrqn8Stqwy9vWux6VyGUCR" est notre NodeID, la chose entière. Copiez cela et gardez cela dans nos notes. Il n'y a rien de confidentiel ou sûr sur cette valeur, mais c'est un must absolu pour lorsque nous soumettons ce noeud pour être un validant.

### Sauvegardez vos clés de freinage<a id="ef3e"></a>

La dernière chose qui devrait être faite est de sauvegarder nos clés de rupture dans l'événement inopportun que notre instance est corrompu ou terminée. Il est juste une bonne pratique pour nous de garder ces clés. Pour les sauvegarder, nous utilisons la commande suivante:

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Comme auparavant, nous aurons besoin de remplacer "EnterYourAzureIPHere" par la valeur appropriée que nous avons récupérée. Cela sauvegarde notre clé de jalonnement et le certificat de jalonnement dans le dossier C:\Avalanche que nous avons créé avant.

![Image pour post](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

