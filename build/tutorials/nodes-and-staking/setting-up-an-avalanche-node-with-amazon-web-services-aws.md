# Exécuter un nœud Avalanche avec les services Web d'Amazon \(AWS\)

## Introduction

Ce tutoriel vous guidera par la création d'un nœud Avalanche sur les [services Web d'Amazon \(AWS\)](https://aws.amazon.com/). Les services Cloud comme les AWS sont un bon moyen de garantir que votre nœud est hautement sécurisé, disponible et accessible.

Pour commencer, vous aurez besoin :

* Un compte AWS
* Un terminal avec lequel SSH dans votre machine AWS
* Un endroit pour stocker et sauvegarder en toute sécurité les fichiers

Ce tutoriel suppose que votre machine locale dispose d'un terminal de style Unix. Si vous êtes sur Windows, vous devrez adapter certaines des commandes utilisées ici.

## Connecter à AWS<a id="ff31"></a>

L'inscription à l'AWS ne s'applique pas à la portée de cet article, mais Amazon a des instructions [ici](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account).

Il est _fortement _recommandé que vous configurez l'authentification multi-facteur sur votre compte d'utilisateur racine AWS pour la protéger. Amazon a la documentation pour ce qui est [de](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root) ce document.

Une fois que votre compte est configuré, vous devez créer une nouvelle instance EC2. Un EC2 est une instance de machine virtuelle dans le cloud d'AWS. Accédez à la [console de gestion AWS](https://console.aws.amazon.com/) et entrez le tableau de bord EC2.

![Gestion AWS](../../../.gitbook/assets/image%20%2835%29.png)

Pour vous connecter à l'instance EC2, vous aurez besoin d'une clé sur votre machine locale qui permet l'accès à l'instance. Tout d'abord, créez cette clé de sorte qu'elle puisse être assignée à l'instance EC2 plus tard. Sur la barre du côté gauche, sous **Réseau et **sécurité, sélectionnez les paires de **clés.**

![Sélectionnez &quot ; les paires et quot ; sous &quot ;le réseau et amp; la &quot;Key ; la mise en déroulement.](../../../.gitbook/assets/image%20%2838%29.png)

Sélectionnez **Créer une paire de clés pour lancer l'assistant de création de la paire **de clés.

![Sélectionnez &quot ;Créer une paire de key](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

Nommez votre clé `avalanche`. Si votre machine locale a des MacOS ou Linux, sélectionnez le format de `pem`fichier. Si c'est Windows, utilisez le format de `ppk`fichier. De manière facultative, vous pouvez ajouter des balises pour la paire de clés pour aider au suivi.

![Créez une paire de clés qui sera plus tard affectée à votre instance EC2.](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

Cliquez sur `Create key pair`. Vous devez voir un message de succès et le fichier de clé doit être téléchargé sur votre machine locale. Sans ce fichier, vous ne pourrez pas accéder à votre instance EC2.** Faites une copie de ce fichier et le mettre sur un support de stockage séparé comme un disque dur externe. Gardez ce fichier secret; ne le partagez pas avec d'autres.**

![Message de succès après avoir créé une paire de clés.](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Créer un groupe de sécurité<a id="f8df"></a>

Un groupe de sécurité AWS définit ce que le trafic internet peut entrer et quitter votre instance EC2. Pensez-y comme un pare-feu. Créez un nouveau groupe de sécurité en sélectionnant les groupes de sécurité **sous la liste des groupes de **sécurité et la liste déroulante **Réseau et **sécurité.

![Sélectionnez &cit ;Groupes de &quot;Security sous &cit; et ; Réseau et amp; &amp; ;](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Cela ouvre le panel des groupes de sécurité. Cliquez sur **Créer un groupe de sécurité **en haut à droite du panel des groupes de sécurité.

![Sélectionnez &quot ;Créer un groupe de security](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Vous devez spécifier le trafic entrant est autorisé. Autorisez le trafic SSH de votre adresse IP de sorte que vous puissiez vous connecter à votre instance EC2. \(Chaque fois que votre FAI modifie votre adresse IP, vous devrez modifier cette règle. Si votre FAI change régulièrement, vous pouvez autoriser le trafic SSH de n'importe où pour éviter de devoir modifier fréquemment cette règle.\) Autorisez le trafic TCP sur le port 9651 de sorte que votre nœud puisse communiquer avec d'autres nœuds sur le réseau. Autorisez le trafic TCP sur le port 9650 de votre IP afin que vous puissiez faire des appels API sur votre nœud.** Il est important que vous ne permettiez le trafic sur ce port de votre IP.** Si vous autorisez le trafic entrant de n'importe où, cela pourrait être utilisé comme un vecteur d'attaque par déni de service. Enfin, permettez tout le trafic sortant.

![Vos règles d'entrée et de sortie devraient ressembler à ceci.](../../../.gitbook/assets/inbound-rules.png)

Ajoutez une étiquette au nouveau groupe de sécurité avec une clé `Name`et une valeur.`Avalanche Security Group` Cela nous permettra de savoir ce que est ce groupe de sécurité lorsque nous le voyons dans la liste des groupes de sécurité.

![Tag le groupe de sécurité de sorte que vous puissiez l'identifier plus tard.](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

Cliquez sur `Create security group`. Vous devez voir le nouveau groupe de sécurité dans la liste des groupes de sécurité.

## Lancez une instance EC2<a id="0682"></a>

Maintenant vous êtes prêt à lancer une instance EC2. Accédez au tableau de bord EC2 et sélectionnez l'instance de ****lancement.

![Sélectionnez &quot ;Lancer Instance.&quot;](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

Sélectionnez **Ubuntu 20.04 LTS \(HVM\), Type de volume SSD **pour le système d'exploitation.

![Sélectionnez Ubuntu 20.04 LTS.](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

Ensuite, choisissez votre type d'instance. Ceci définit les spécifications matérielles de l'instance en cloud. Dans ce tutoriel, nous avons créé un ****c5.large. Cela devrait être plus que assez puissant car Avalanche est un protocole de consensus léger. Pour créer une instance c5.large, sélectionnez **l'option optimisée par le **calcul dans le menu déroulant du filtre.

![Filtrer par calcul optimisé.](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

Sélectionnez la case à cocher à côté de l'instance c5.large dans la table.

![Sélectionnez c5.large.](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

Cliquez sur le suivant **: Configurer le **bouton de détail d'instance dans le coin inférieur droit.

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

Les détails d'instance peuvent rester en tant que leurs défauts.

### Facultatif : Utilisation d'Instances de spot ou d'Instances réservées<a id="c99a"></a>

Par défaut, vous serez facturé à l'heure pour l'exécution de votre instance EC2. Il existe deux façons que vous pourriez être en mesure de payer moins pour votre EC2.

La première est en lançant votre EC2 en tant qu'instance de ****spot. Les instances de spot sont des instances qui ne sont pas garanties pour être toujours à la hauteur, mais qui coûtent moins en moyenne que les instances persistantes. Les instances Spot utilisent une structure de prix du marché de l'offre et de la demande. Au fur et à mesure que la demande d'instances augmente, le prix d'une instance spot augmente. Vous pouvez définir un prix maximal que vous êtes prêt à payer pour l'exemple de la place. Vous pouvez être en mesure d'économiser une quantité importante d'argent, avec la caveat que votre instance EC2 peut s'arrêter si le prix augmente. Faites votre propre recherche avant de sélectionner cette option pour déterminer si la fréquence d'interruption à votre prix maximal justifie les économies de coûts. Si vous choisissez d'utiliser une instance de spot, assurez-vous de configurer le comportement d'interruption pour ****arrêter, et non pour **terminer **et vérifier l'option de demande ****persistante.

L'autre moyen que vous pourriez économiser de l'argent est en utilisant un système d'enregistrement ****réservé. Avec un exemple réservé, vous payez à l'avance pour une année entière d'utilisation de EC2, et vous recevez un taux inférieur par heure en échange de of Si vous avez l'intention de faire fonctionner un nœud pendant un long temps et que vous ne voulez pas risquer les interruptions de service, c'est une bonne option pour économiser de l'argent. Encore une fois, faites vos propres recherches avant de sélectionner cette option.

### Ajouter le stockage, les Tags, Groupe de sécurité<a id="dbf5"></a>

Cliquez sur le suivant **: Ajouter le **bouton de stockage dans le coin inférieur droit de l'écran.

Vous devez ajouter de l'espace au disque de votre instance. Nous utilisons 100 Go dans cet exemple. La base de données Avalanche se développera continuellement jusqu'à la mise en place de l'élagage , de sorte qu'il est plus sûr d'avoir une allocation de disque dur plus grande pour l'instant.

![Sélectionnez 100 Go pour la taille du disque.](../../../.gitbook/assets/add-storage.png)

Cliquez sur **Suivant: Ajouter des étiquettes **dans le coin inférieur droit de l'écran pour ajouter des balises à l'instance. Les étiquettes nous permettent d'associer les métadonnées à notre instance. Ajouter une étiquette avec une clé `Name`et une valeur .`My Avalanche Node` Cela permettra de préciser quelle est cette instance sur votre liste d'instances EC2.

![Ajouter une étiquette avec la clé &quot &quot;Name&quot; ; et la valeur &quot ;My Avalanche &quot;Name&quot;](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Affectez maintenant le groupe de sécurité créé plus tôt à l'instance. Choisissez **Sélectionnez un groupe de sécurité existant **et choisissez le groupe de sécurité créé plus tôt.

![Choisissez le groupe de sécurité créé plus tôt.](../../../.gitbook/assets/configure-security-group.png)

Enfin, cliquez sur Examiner et **lancez en bas **à droite. Une page d'examen montrera les détails de l'instance que vous êtes sur le point de lancer. Examinez ces derniers, et si tout semble bon, cliquez sur le **bouton de **lancement bleu dans le coin inférieur droit de l'écran.

Vous serez invité à sélectionner une paire de clés pour cette instance. Sélectionnez **Choisissez une paire de clés existante et sélectionnez ensuite la paire **de `avalanche`clés que vous avez faite plus tôt dans le tutoriel. Cochez la case en reconnaissant que vous avez accès au fichier `.pem`ou au `.ppk`fichier créé plus tôt \(assurez-vous que vous l'avez sauvegardé !\) et puis cliquez sur **Lancer les **Instagram.

![Utilisez la paire de clés créée plus tôt.](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

Vous devriez voir une nouvelle pop up qui confirme que l'instance est en train de lancer !

![Votre instance est en train de lancer !](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Assigner une IP élastique

Par défaut, votre instance ne disposera pas d'IP fixe. Donnons-lui une IP fixe via le service de IP élastique d'AWS. Retourner au tableau de bord EC2. Sous **Réseau et sécurité, **sélectionnez les API ****élastiques.

![Sélectionnez &quot &quot;Elastic élastique; sous &quot ;Network &amp; &quot;Network ;](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

Sélectionnez **Attribuer une adresse IP **élastique.

![Sélectionnez &quot ;Allouer une adresse IP Elastic](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Sélectionnez la région que votre instance s'exécute et choisissez d'utiliser la piscine d'adresses IPv4 d'Amazon. Cliquez sur ****Allocate.

![Paramètres pour la IP élastique.](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Sélectionnez la IP élastique que vous venez de créer à partir du gestionnaire d'IP Elastic. Dans le menu déroulant sur les ****actions, choisissez une adresse IP élastique ****associée.

![Sous &quota &quot;Actions&quot;, select &quota;;; Associer une adresse IP &quot;Actions&quot;,](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Sélectionnez l'instance que vous venez de créer. Cela associera la nouvelle IP Elastic à l'instance et lui donnera une adresse IP publique qui ne changera pas.

![Assignez la IP élastique à votre instance EC2.](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## Définir AvalancheGo<a id="829e"></a>

Retourner au tableau de bord EC2 et sélectionnez `Running Instances`.

![Accédez à vos instances de fonctionnement.](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Sélectionnez l'instance EC2 nouvellement créée. Cela ouvre un panneau de détail avec des informations sur l'instance.

![Détails sur votre nouvelle instance.](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

Copier le `IPv4 Public IP`champ pour être utilisé plus tard. À partir de maintenant nous appelons cette valeur `PUBLICIP`.

**Rappelez-vous : les commandes de terminal ci-dessous supposent que vous exécutez Linux. Les commandes peuvent différer pour les Mac OS ou d'autres systèmes d'exploitation. Lorsque vous copiez une commande depuis un bloc de code, copiez et collez l'intégralité du texte dans le block.**

Connectez-vous à l'instance AWS de votre machine locale. Ouvrez un terminal \(essayer un raccourci `CTRL + ALT + T`\) et naviguez vers le répertoire contenant le `.pem`fichier que vous avez téléchargé plus tôt.

Déplacer le `.pem`fichier vers `$HOME/.ssh`\(où les `.pem`fichiers sont en général des fichiers\) avec :

```bash
mv avalanche.pem ~/.ssh
```

Ajoutez-le à l'agent SSH de sorte que nous puissions l'utiliser dans SSH dans votre instance EC2 et le marquer comme en lecture seule.

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

SSH dans l'instance. \(N'oubliez pas de remplacer `PUBLICIP`par le champ de propriété intellectuelle public de plus tôt.\)

```text
ssh ubuntu@PUBLICIP
```

Si les permissions ne sont pas correctement **définies, vous verrez **l'erreur suivante.

![Assurez-vous de configurer correctement les permissions.](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

Vous êtes maintenant connecté à l'instance EC2.

![You&apos;re sur l'instance EC2.](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Si vous ne l'avez pas déjà fait, mettez à jour l'instance pour vous assurer qu'elle a les dernières mises à jour sur le système d'exploitation et la sécurité :

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

Cela redémarre également l'instance. Attendez 5 minutes, puis connectez-vous à nouveau en exécutant cette commande sur votre machine locale :

```bash
ssh ubuntu@PUBLICIP
```

Vous êtes de nouveau connecté à l'instance EC2. Maintenant nous allons devoir configurer notre nœud Avalanche. Pour ce faire, suivez le tutoriel [d'Avalanche configuré avec](set-up-node-with-installer.md) l'installateur, qui automatise le processus d'installation. Vous aurez besoin de la création que nous `PUBLICIP`avons créée plus tôt.

Votre nœud AvalancheGo doit maintenant être en cours de fonctionnement et en cours de bootstrapping, qui peut prendre quelques heures. Pour vérifier si elle est faite, vous pouvez délivrer un appel API en utilisant `curl`. Si vous faites la demande de l'instance EC2, la demande est :

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

Une fois le nœud terminé, la réponse sera :

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Vous pouvez continuer sur le terrain, même si AvalancheGo n'a pas fait le bootstrapping.

Afin de faire de votre nœud un validateur, vous aurez besoin de son identifiant de nœud. Pour l'obtenir, exécutez:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La réponse contient l'ID de nœud.

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

Dans l'exemple ci-dessus, l'ID de nœud `NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`est Copiez votre identifiant de nœud pour plus tard. Votre identifiant de nœud n'est pas un secret, vous pouvez donc simplement le coller dans un éditeur de texte.

AvalancheGo a d'autres API comme [l'API de](../../avalanchego-apis/health-api.md) santé, qui peuvent être utilisées pour interagir avec le nœud. Certaines API sont désactivé par défaut. Pour activer ces API , modifiez la section ExecStart de `/etc/systemd/system/avalanchego.service`\(créée au cours du processus d'installation\) pour inclure des drapeaux qui permettent ces endpoints. Ne activez pas manuellement d'API si vous n'avez pas une raison de faire.

![Certaines API sont désactivé par défaut.](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

Sauvegardez la clé de jalonnement et le certificat du nœud au cas où l'instance EC2 est corrompu ou autrement indisponible. L'ID du nœud est dérivé de sa clé de jalonnement et de son certificat. Si vous perdez votre clé de jalonnement ou votre certificat, alors votre nœud obtiendra un nouvel identifiant de nœud, qui pourrait vous faire perdre de l'être pour une récompense de jalonnement si votre nœud est un validateur.** Il est très fortement recommandé que vous copiez la clé de jalonnement et le certificat de votre **nœud. La première fois que vous exécutez un nœud, il va générer une nouvelle paire de clés et de certificats de jalonnement et les stocker dans le répertoire `/home/ubuntu/.avalanchego/staking`.

Sortir de l'instance SSH en exécutant :

```bash
exit
```

Maintenant vous n'êtes plus connecté à l'instance EC2 ; vous êtes de retour sur votre machine locale.

Pour copier la clé de jalonnement et le certificat sur votre machine, exécutez la commande suivante. Comme toujours, remplacez `PUBLICIP`.

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

Maintenant votre clé de jalonnement et votre certificat sont dans le répertoire `~/aws_avalanche_backup`.** Le contenu de ce répertoire est secret.** Vous devez conserver ce répertoire sur le stockage non connecté à Internet \(comme un disque dur externe.\)

### Mise à jour de votre nœud<a id="9ac7"></a>

AvalancheGo est un projet en cours et des mises à jour régulières de version. La plupart des mises à jour sont recommandées, mais pas nécessaires. Un préavis est donné pour les mises à niveau qui ne sont pas compatibles en arrière. Pour mettre à jour votre nœud vers la dernière version, SSH dans votre instance AWS comme avant et exécuter le script d'installation de nouveau.

```text
./avalanchego-installer.sh
```

Votre machine exécute maintenant la plus récente version AvalancheGo Pour voir l'état du service AvalancheGo, exécutez`sudo systemctl status avalanchego.`

## Wrap

C'est tout ! Vous avez maintenant un nœud AvalancheGo qui fonctionne sur une instance de l'AWS EC2. Nous vous recommandons de créer [une surveillance des nœuds pour](setting-up-node-monitoring.md) votre nœud AvalancheGo Nous recommandons également de configurer des alertes de facturation AWS pour que vous n'soyez pas surpris lorsque la facture arrive. Si vous avez des commentaires sur ce tutoriel, ou autre chose, envoyez-nous un message sur [Discord](https://chat.avalabs.org).

