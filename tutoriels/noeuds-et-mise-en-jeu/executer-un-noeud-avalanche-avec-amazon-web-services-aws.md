# Exécuter un nœud Avalanche avec Amazon Web Services \(AWS\)

## Introduction

Ce tutoriel vous guidera tout au long de la configuration d'un nœud Avalanche sur [Amazon Web Services \(AWS\)](https://aws.amazon.com/). Les services cloud comme AWS sont un bon moyen de garantir que votre nœud est hautement sécurisé, disponible et accessible.

Pour commencer, vous aurez besoin de:

* Un compte AWS
* Un terminal avec lequel SSH dans votre machine AWS
* Un endroit pour stocker et sauvegarder des fichiers en toute sécurité

Ce tutoriel suppose que votre machine locale a un terminal de style Unix. Si vous êtes sous Windows, vous devrez adapter certaines des commandes utilisées ici.

## Connectez-vous à AWS

L'inscription à AWS n'entre pas dans le cadre de cet article, mais Amazon a des instructions [ici.](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account)

Il est fortement recommandé de configurer l'authentification multifacteur sur votre compte d'utilisateur racine AWS pour le protéger. Amazon a une documentation à ce sujet [ici.](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root)

Une fois votre compte configuré, vous devez créer une nouvelle instance EC2. Un EC2 est une instance de machine virtuelle dans le cloud d'AWS. Accédez à [AWS Management Console](https://console.aws.amazon.com/) et accédez au tableau de bord EC2.

![](../../.gitbook/assets/image%20%2835%29.png)

Pour vous connecter à l'instance EC2, vous aurez besoin d'une clé sur votre machine locale qui autorise l'accès à l'instance. Tout d'abord, créez cette clé afin qu'elle puisse être affectée ultérieurement à l'instance EC2. Dans la barre sur le côté gauche, sous **Network & Security**, sélectionnez **Key Pairs.**

![](../../.gitbook/assets/image%20%2838%29.png)

Sélectionnez **Create key pair** pour lancer l'assistant de création de paires de clés.

![Select &quot;Create key pair.&quot;](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

Nommez votre clé `avalanche`. Si votre machine locale a MacOS ou Linux, sélectionnez le format de fichier `pem` . S'il s'agit de Windows, utilisez le format de fichier `ppk`. Vous pouvez éventuellement ajouter des balises pour la paire de clés pour faciliter le suivi.

![Create a key pair that will later be assigned to your EC2 instance.](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

Cliquez sur `Create key pair`. Vous devriez voir un message de réussite et le fichier de clé doit être téléchargé sur votre ordinateur local. Sans ce fichier, vous ne pourrez pas accéder à votre instance EC2. **Faites une copie de ce fichier et placez-le sur un support de stockage séparé tel qu'un disque dur externe. Gardez ce fichier secret; Ne pas partager avec d'autres personnes.**

![Success message after creating a key pair.](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Créer un groupe de sécurité <a id="f8df"></a>

Un groupe de sécurité AWS définit le trafic Internet qui peut entrer et sortir de votre instance EC2. Pensez-y comme un pare-feu. Créez un nouveau groupe de sécurité en sélectionnant **Security Groups** sous le menu déroulant **Network & Security**.

![Select &quot;Security Groups&quot; underneath &quot;Network &amp; Security.&quot;](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Cela ouvre le panneau Groupes de sécurité. Cliquez sur **Create security group** en haut à droite du panneau Groupes de sécurité.

![Select &quot;Create security group.&quot;](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Vous devrez spécifier le trafic entrant autorisé. Autorisez le trafic SSH à partir de votre adresse IP afin de pouvoir vous connecter à votre instance EC2. \(Chaque fois que votre FAI change votre adresse IP, vous devrez modifier cette règle. Si votre FAI change régulièrement, vous pouvez autoriser le trafic SSH de n'importe où pour éviter d'avoir à modifier cette règle fréquemment.\) Autoriser le trafic TCP sur le port 9651 afin que votre nœud peut communiquer avec d'autres nœuds du réseau. Autorisez le trafic TCP sur le port 9650 à partir de votre adresse IP afin de pouvoir effectuer des appels API vers votre nœud. **Il est important que vous autorisiez uniquement le trafic sur ce port à partir de votre adresse IP**. Si vous autorisez le trafic entrant de n'importe où, cela pourrait être utilisé comme un vecteur d'attaque par déni de service. Enfin, autorisez tout le trafic sortant..

![](../../.gitbook/assets/image%20%2840%29.png)

Ajouter une balise au nouveau groupe de sécurité avec la clé `Name` et value`Avalanche Security Group`. Cela nous permettra de savoir ce qu'est ce groupe de sécurité lorsque nous le verrons dans la liste des groupes de sécurité.

![Tag the security group so you can identify it later.](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

Cliquez sur `Create security group`. Vous devriez voir le nouveau groupe de sécurité dans la liste des groupes de sécurité.

## Lancer une instance EC2 <a id="0682"></a>

Vous êtes maintenant prêt à lancer une instance EC2. Accédez au tableau de bord EC2 et sélectionnez **Launch instance**.

![Select &quot;Launch Instance.&quot;](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

Sélectionnez **Ubuntu 20.04 LTS \(HVM\), SSD Volume Type** pour le système d'exploitation.

![Select Ubuntu 20.04 LTS.](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

Ensuite, choisissez votre type d'instance. Cela définit les spécifications matérielles de l'instance cloud. Dans ce tutoriel, nous avons mis en place un **c5.large**. Cela devrait être plus que suffisamment puissant car Avalanche est un protocole de consensus léger. Pour créer une instance c5.large, sélectionnez le **Compute-optimized** option dans le menu déroulant des filtres.

![Filter by compute optimized.](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

Cochez la case pour l'instance c5.large dans le tableau.

![Select c5.large.](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

Clique le boutton **Next: Configure Instance Details** dans le coin en bas à droite.

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

Les détails de l'instance peuvent rester comme leurs valeurs par défaut.

### Facultatif: utilisation d'instances Spot ou d'instances réservées <a id="c99a"></a>

Par défaut, vous serez facturé toutes les heures pour l'exécution de votre instance EC2. Vous pouvez payer moins cher votre EC2 de deux manières.

La première consiste à lancer votre EC2 en tant que **Spot Instance**. Les instances Spot sont des instances dont il n'est pas garanti qu'elles soient toujours actives, mais qui coûtent moins cher en moyenne que les instances persistantes. Les instances ponctuelles utilisent une structure de prix de marché offre et demande. À mesure que la demande d'instances augmente, le prix d'une instance spot augmente. Vous pouvez définir un prix maximum que vous êtes prêt à payer pour l'instance spot. Vous pourrez peut-être économiser beaucoup d'argent, avec la mise en garde que votre instance EC2 peut s'arrêter si le prix augmente. Faites vos propres recherches avant de sélectionner cette option pour déterminer si la fréquence d'interruption à votre prix maximum justifie les économies de coûts. Si vous choisissez d'utiliser une instance ponctuelle, assurez-vous de définir le comportement d'interruption sur **Stop**, et non sur **Terminate,** et cochez l'option **Persistent Request**.

L'autre façon d'économiser de l'argent consiste à utiliser une **Reserved Instance**. Avec une instance réservée, vous payez d'avance pour une année entière d'utilisation d'EC2 et recevez un tarif horaire inférieur en échange de votre verrouillage. Si vous avez l'intention d'exécuter un nœud pendant une longue période et que vous ne voulez pas risquer d'interruptions de service , c'est une bonne option pour économiser de l'argent. Encore une fois, faites vos propres recherches avant de sélectionner cette option.

### Ajouter du stockage, des balises et un groupe de sécurité <a id="dbf5"></a>

Cliquez sur le boutton **Next: Add Storage** dans le coin inférieur droit de l'écran.

Vous devez ajouter de l'espace sur le disque de votre instance. Nous utilisons 100 Go dans cet exemple. La base de données Avalanche augmentera continuellement jusqu'à ce que l'élagage soit mis en œuvre, il est donc plus sûr d'avoir une allocation de disque dur plus importante pour le moment.

![](../../.gitbook/assets/image%20%2837%29.png)

Cliquez sur **Next: Add Tags**dans le coin inférieur droit de l'écran pour ajouter des balises à l'instance. Les balises nous permettent d'associer des métadonnées à notre instance. Ajoutez une balise avec la clé `Name` et value `My Avalanche Node`. Cela indiquera clairement ce que cette instance est sur votre liste d'instances EC2.

![Add a tag with key &quot;Name&quot; and value &quot;My Avalanche Node.&quot;](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Attribuez maintenant le groupe de sécurité créé précédemment à l'instance. Choisissez **Select an existing security group** et choisissez le groupe de sécurité créé précédemment.

![](../../.gitbook/assets/image%20%2828%29.png)

Enfin, cliquez sur **Review and Launch** en bas à droite. Une page de révision affichera les détails de l'instance que vous êtes sur le point de lancer. Passez en revue ceux-ci, et si tout semble bon, cliquez sur le bouton bleu **Launch** dans le coin inférieur droit de l'écran.

Vous serez invité à sélectionner une paire de clés pour cette instance. Sélectionnez **Choose an existing key pair** puis sélectionnez la paire de clés `avalanche` ue vous avez créée précédemment dans le didacticiel. Cochez la case reconnaissant que vous avez accès au fichier `.pem` ou `.ppk` créé précédemment \(assurez-vous de l'avoir sauvegardé!\), Puis cliquez sur **Launch Instances**.

![Use the key pair created earlier.](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

Vous devriez voir une nouvelle fenêtre contextuelle confirmant le lancement de l'instance!

![Your instance is launching!](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Attribuer une adresse IP élastique

Par défaut, votre instance n'aura pas d'adresse IP fixe. Donnons-lui une adresse IP fixe via le service IP Elastic d'AWS. Revenez au tableau de bord EC2. Sous **Network & Security,** selectionnez **Elastic IPs**.

![Select &quot;Elastic IPs&quot; under &quot;Network &amp; Security.&quot;](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

Selectionnez **Allocate Elastic IP address**.

![Select &quot;Allocate Elastic IP address.&quot;](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Sélectionnez la région dans laquelle votre instance s'exécute et choisissez d'utiliser le pool d'adresses IPv4 d'Amazon. Cliquez sur **Allocate**.

![Settings for the Elastic IP.](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Sélectionnez l'adresse IP Elastic que vous venez de créer à partir du gestionnaire d'adresses IP Elastic. Du menu déroulant **Actions** choisisez **Associate Elastic IP address**.

![Under &quot;Actions&quot;, select &quot;Associate Elastic IP address.&quot;](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Sélectionnez l'instance que vous venez de créer. Cela associera la nouvelle adresse IP Elastic à l'instance et lui donnera une adresse IP publique qui ne changera pas.

![Assign the Elastic IP to your EC2 instance.](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## Configurer AvalancheGo <a id="829e"></a>

Revenez au tableau de bord EC2 et sélectionnez `Running Instances`.

![Go to your running instances.](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Sélectionnez l'instance EC2 nouvellement créée. Cela ouvre un panneau de détails avec des informations sur l'instance.

![Details about your new instance.](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

Copiez le champ à utiliser plus tard`IPv4 Public IP` field to use later.A partir de maintenant, nous appelons cette valeur `PUBLICIP`.

**N'oubliez pas: les commandes de terminal ci-dessous supposent que vous exécutez Linux. Les commandes peuvent différer pour MacOS ou d'autres systèmes d'exploitation. Lors du copier-coller d'une commande à partir d'un bloc de code, copiez et collez l'intégralité du texte dans le bloc.**

Connectez-vous à l'instance AWS depuis votre machine locale. Ouvrez un terminal \(essayez le raccourci `CTRL + ALT + T`\) et accédez au répertoire contenant le fichier `.pem` que vous avez téléchargé plus tôt

Bougez le fichier `.pem` vers `$HOME/.ssh` \(où `.pem` est généralement localisé\) avec:

```cpp
mv avalanche.pem ~/.ssh
```

Ajoutez-le à l'agent SSH afin que nous puissions l'utiliser pour SSH dans votre instance EC2 et marquez-le comme lecture seule.

```cpp
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

SSH dans l'instance. \(N'oubliez pas de remplacer `PUBLICIP` par le champ IP public antérieur.\)

```cpp
ssh ubuntu@PUBLICIP
```

Si les autorisations **ne sont pas** définies correctement, vous verrez l'erreur suivante.

![Make sure you set the permissions correctly.](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

Vous êtes maintenant connecté à l'instance EC2.

![You&apos;re on the EC2 instance.](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Si vous ne l'avez pas déjà fait, mettez à jour l'instance pour vous assurer qu'elle dispose du dernier système d'exploitation et des dernières mises à jour de sécurité:

```cpp
sudo apt update; sudo apt upgrade -y; sudo reboot
```

Cela redémarre également l'instance. Attendez 5 minutes, puis reconnectez-vous en exécutant cette commande sur votre machine locale:

```cpp
ssh ubuntu@PUBLICIP
```

Vous êtes à nouveau connecté à l'instance EC2. Nous devons maintenant configurer notre nœud Avalanche. Pour ce faire, suivez le didacticiel Configurer le nœud d'avalanche avec le programme d'installation qui automatise le processus d'installation. Vous aurez besoin du `PUBLICIP` que nous avons mis en place plus tôt.

Your AvalancheGo node should now be running and in the process of bootstrapping, which can take a few hours. To check if it's done, you can issue an API call using `curl`. If you're making the request from the EC2 instance, the request is:

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

Once the node is finished bootstrapping, the response will be:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

You can continue on, even if AvalancheGo isn't done bootstrapping.

In order to make your node a validator, you'll need its node ID. To get it, run:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

The response contains the node ID.

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

In the above example the node ID is`NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`. Copy your node ID for later. Your node ID is not a secret, so you can just paste it into a text editor.

AvalancheGo has other APIs, such as the [Health API](), that may be used to interact with the node. Some APIs are disabled by default. To enable such APIs, modify the ExecStart section of `/etc/systemd/system/avalanchego.service` \(created during the installation process\) to include flags that enable these endpoints. Don't manually enable any APIs unless you have a reason to.

![Some APIs are disabled by default.](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

Back up the node's staking key and certificate in case the EC2 instance is corrupted or otherwise unavailable. The node's ID is derived from its staking key and certificate. If you lose your staking key or certificate then your node will get a new node ID, which could cause you to become ineligible for a staking reward if your node is a validator. **It is very strongly advised that you copy your node's staking key and certificate**. The first time you run a node, it will generate a new staking key/certificate pair and store them in directory `/home/ubuntu/.avalanchego/staking`.

Exit out of the SSH instance by running:

```bash
exit
```

Now you're no longer connected to the EC2 instance; you're back on your local machine.

To copy the staking key and certificate to your machine, run the following command. As always, replace `PUBLICIP`.

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

Now your staking key and certificate are in directory `~/aws_avalanche_backup` . **The contents of this directory are secret.** You should hold this directory on storage not connected to the internet \(like an external hard drive.\)

### Upgrading Your Node <a id="9ac7"></a>

AvalancheGo is an ongoing project and there are regular version upgrades. Most upgrades are recommended but not required. Advance notice will be given for upgrades that are not backwards compatible. To update your node to the latest version, SSH into your AWS instance as before and run the installer script again.

```text
./avalanchego-installer.sh
```

Your machine is now running the newest AvalancheGo version. To see the status of the AvalancheGo service, run `sudo systemctl status avalanchego.`

## Wrap Up

That's it! You now have an AvalancheGo node running on an AWS EC2 instance. We recommend setting up [node monitoring ]()for your AvalancheGo node. We also recommend setting up AWS billing alerts so you're not surprised when the bill arrives. If you have feedback on this tutorial, or anything else, send us a message on [Discord](https://chat.avalabs.org).

