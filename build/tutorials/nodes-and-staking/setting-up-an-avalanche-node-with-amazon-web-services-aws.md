# Exécuter un nœud Avalanche avec Amazon Web Services \(AWS\)

## Introduction

Ce tutoriel vous guidera en configurant un noeud Avalanche sur [Amazon Web Services \(AWS\)](https://aws.amazon.com/). Les services Cloud comme AWS sont une bonne façon de garantir que votre noeud est hautement sécurisé, disponible et accessible.

Pour commencer, vous aurez besoin:

* Un compte AWS
* Un terminal avec lequel SSH dans votre machine AWS
* Un endroit pour stocker et sauvegarder les fichiers en toute sécurité

Ce tutoriel suppose que votre machine locale a un terminal de style Unix. Si vous êtes sous Windows, vous devrez adapter certaines des commandes utilisées ici.

## Connectez-vous à AWS<a id="ff31"></a>

Inscription à l'AWS est en dehors de la portée de cet article, mais Amazon a des instructions [ici](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account).

Il est _fortement_ recommandé que vous configurez l'authentification multi-facteurs sur votre compte utilisateur AWS racine pour la protéger. Amazon a la documentation pour cela [ici](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root).

Une fois que votre compte est configuré, vous devriez créer une nouvelle instance EC2. Une EC2 est une instance de machine virtuelle dans le cloud d'AWS. Allez dans la [console de gestion AWS](https://console.aws.amazon.com/) et entrez le tableau de bord EC2.

![Gestion AWS Console.png](../../../.gitbook/assets/image%20%2835%29.png)

Pour vous connecter à l'instance EC2, vous aurez besoin d'une clé sur votre machine locale qui permet l'accès à l'instance. Premièrement, créez cette clé de manière qu'elle puisse être assignée à l'instance EC2 plus tard. Sur la barre du côté gauche, sous **Réseau &** Sécurité, sélectionnez **paires clés.**

![Sélectionnez &quot ; Key Pairs&quot; ; sous &quot ;Network &amp; Security&quot ; déroulement.](../../../.gitbook/assets/image%20%2838%29.png)

Sélectionnez **Créer une paire de clés** pour lancer l'assistant de création de la paire de clés.

![Sélectionnez &quot ; Créer la paire de key ;](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

Nommez votre `avalanche` clé. Si votre machine locale a MacOS ou Linux, sélectionnez le format de fichier `pem`. Si c'est Windows, utilisez le format de fichier `ppk`. Optionellement, vous pouvez ajouter des balises pour la paire de clés pour aider à la traction.

![Créez une paire de clés qui sera plus tard affectée à votre instance EC2.](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

Cliquez `Créer la paire de clés`. Vous devriez voir un message de réussite, et le fichier clé devrait être téléchargé sur votre machine locale. Sans ce fichier, vous ne serez pas en mesure d'accéder à votre instance EC2. **Faites une copie de ce fichier et le mettre sur un support de stockage séparé tel qu'un disque dur externe. Gardez ce fichier secret; ne le partagez pas avec les autres.**

![Message de succès après la création d'une paire de clés.](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Créer un groupe de sécurité<a id="f8df"></a>

Un groupe de sécurité AWS définit ce que le trafic internet peut entrer et quitter votre instance EC2. Pensez-y comme un pare-feu. Créez un nouveau groupe de sécurité en sélectionnant **Groupes de sécurité** sous le menu déroulant **Réseau et** sécurité.

![Sélectionnez &quot ; Groupes de &quot;Security ; sous &quot ; Réseau &amp ; &quot;Security ;](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Cela ouvre le panneau Groupes de sécurité. Cliquez **sur Créer un groupe de sécurité** en haut à droite du panneau Groupes de sécurité.

![Sélectionnez &quot ; Créer groupe de security ;](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Vous aurez besoin de préciser quel trafic entrant est autorisé. Autoriser le trafic SSH à partir de votre adresse IP de sorte que vous puissiez vous connecter à votre instance EC2. \(Chaque fois que votre FAI change votre adresse IP, vous aurez besoin de modifier cette règle. Si votre FAI change régulièrement, vous pouvez autoriser le trafic SSH de n'importe où pour éviter de devoir modifier cette règle fréquemment. \) Permettre le trafic TCP sur le port 9651 de sorte que votre noeud puisse communiquer avec d'autres noeuds sur le réseau. Autoriser le trafic TCP sur le port 9650 de votre IP afin que vous puissiez effectuer des appels API à votre nœud. **Il est important que vous autorisez uniquement le trafic sur ce port depuis votre IP.** Si vous autorisez le trafic entrant depuis n'importe où, cela pourrait être utilisé comme vecteur d'attaque par déni de service. Enfin, permettre tout le trafic sortant.

![Vos règles d'entrée et de sortie devraient ressembler à ceci.](../../../.gitbook/assets/inbound-rules.png)

Ajoutez une étiquette au nouveau groupe de sécurité avec la clé `Nom` et value`Avalanche Security Group`. Cela nous permettra de savoir ce que ce groupe de sécurité est lorsque nous le voyons dans la liste des groupes de sécurité.

![Tag le groupe de sécurité afin que vous puissiez l'identifier plus tard.](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

Cliquez `sur Créer groupe de sécurité`. Vous devriez voir le nouveau groupe de sécurité dans la liste des groupes de sécurité.

## Lancer une instance EC2<a id="0682"></a>

Maintenant, vous êtes prêt à lancer une instance EC2. Allez dans le tableau de bord EC2 et sélectionnez **Lance**.

![Sélectionnez &quot ;Launch Instance.&quot; ;](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

Sélectionnez **Ubuntu 20.04 LTS \(HVM\), Type de volume SSD** pour le système d'exploitation.

![Sélectionnez Ubuntu 20.04 LTS.](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

Ensuite, choisissez votre type d'instance. Ceci définit les spécifications matérielles de l'instance cloud. Dans ce tutoriel, nous avons mis en place un **c5.large**. Cela devrait être plus que suffisamment puissant puisque l'Avalanche est un protocole de consensus léger. Pour créer une instance c5.large, sélectionnez l'option **Computer optimised** dans le menu déroulant filtre.

![Filtrer par calcul optimisé.](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

Sélectionnez la case à cocher à côté de l'instance c5.large dans la table.

![Sélectionnez c5.grange.](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

Cliquez sur le Suivant: Configurez le bouton **Détails de l'instance** dans le coin inférieur droit.

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

Les détails d'instance peuvent rester comme leurs défauts.

### Facultatif : Utilisation des Instances de l'endroit ou des Instances réservées<a id="c99a"></a>

Par défaut, vous serez chargé horaire pour l'exécution de votre instance EC2. Il y a deux façons que vous pourriez être en mesure de payer moins pour votre EC2.

La première est le lancement de votre EC2 comme un **système de localisation **. Les instances de localisation sont des instances qui ne sont pas garanties d'être toujours montantes, mais qui coûtent moins en moyenne que les instances persistantes. Les instances de localisation utilisent une structure de prix du marché de l'offre et de la demande. À mesure que la demande d'instances augmente, le prix d'une instance spot augmente. Vous pouvez définir un prix maximal que vous êtes prêt à payer pour l'instance de spot. Vous pouvez être en mesure d'économiser une quantité significative d'argent, avec la caveat que votre instance EC2 peut arrêter si le prix augmente. Faites vos propres recherches avant de choisir cette option pour déterminer si la fréquence d'interruption à votre prix maximal justifie les économies de coûts. Si vous choisissez d'utiliser une instance de spot, assurez-vous de définir le comportement d'interruption pour **Stop**, pas **Terminer,** et vérifier l'option **Demande** persistante.

L'autre façon que vous pourriez économiser de l'argent est en utilisant un **système d'instance réservé**. Avec une instance réservée, vous payez à l'avance pendant une année entière d'utilisation EC2, et recevez un tarif inférieur par heure en échange de of Si vous avez l'intention de lancer un noeud pendant longtemps et ne voulez pas risquer les interruptions de service, c'est une bonne option pour économiser de l'argent. Encore une fois, faites vos propres recherches avant de sélectionner cette option.

### Ajouter stockage, Tags, Groupe de sécurité<a id="dbf5"></a>

Cliquez sur le **Suivant: Ajouter** le bouton de stockage dans le coin inférieur droit de l'écran.

Vous devez ajouter de l'espace au disque de votre instance. Nous utilisons 100 GB dans cet exemple. La base de données Avalanche va continuellement croître jusqu'à la mise en œuvre de la taille , il est donc plus sûr d'avoir une allocation de disque dur plus grande pour l'instant.

![Sélectionnez 100 GB pour la taille du disque.](../../../.gitbook/assets/add-storage.png)

Cliquez **sur Suivant: Ajouter des balises** dans le coin inférieur droit de l'écran pour ajouter des balises à l'instance. Les balises nous permettent d'associer les métadonnées à notre instance. Ajoutez une étiquette avec la clé `Nom` et valeur `My Avalanche Node`. Cela permettra de préciser quelle est cette instance sur votre liste d'instances EC2.

![Ajoutez une étiquette avec la clé &quot;Name&quot; et la valeur &quot;Name&quot; Avalanche &quot;Name&quot;](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Maintenant, assigner le groupe de sécurité créé plus tôt à l'instance. Choisissez **Sélectionnez un groupe de** sécurité existant et choisissez le groupe de sécurité créé précédemment.

![Choisissez le groupe de sécurité créé précédemment.](../../../.gitbook/assets/configure-security-group.png)

Enfin, cliquez **sur Examen et Lancer** dans le bas à droite. Une page d'évaluation montrera les détails de l'instance que vous êtes sur le point de lancer. Examinez ceux, et si tout semble bon, cliquez sur le bouton **Launch** bleu dans le coin inférieur droit de l'écran.

Vous serez invité à sélectionner une paire de clés pour cette instance. Sélectionnez **Choisissez une** paire de clés existante puis sélectionnez la paire de clés `avalanche` que vous avez faite plus tôt dans le tutoriel. Cochez la case reconnaissant que vous avez accès au fichier `.pem` ou `.ppk` créé antérieurement \(assurez-vous que vous l'avez sauvegardé! \) puis cliquez **sur Lancer les instances**.

![Utilisez la paire de clés créée plus tôt.](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

Vous devriez voir une nouvelle pop-up qui confirme l'instance est lancée!

![Votre instance est lancée!](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Attribuer une IP élastique

Par défaut, votre instance n'aura pas une IP fixe. Donnons-lui une IP fixe via le service IP élastique de AWS. Retournez au tableau de bord EC2. Sous **Réseau & sécurité,** sélectionnez **IP élastiques**.

![Sélectionnez &quot ; IPs&quot élastiques; under &quot ;Network &amp; &quot;Elastic ;](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

Sélectionnez **Attribuer l'adresse IP élastique**.

![Sélectionnez &quot ; Allouer l'adresse IP Elastic ;](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Sélectionnez la région que votre instance est exécutée, et choisissez d'utiliser la piscine d'Amazon des adresses IPv4. Cliquez sur **Allocate**.

![Paramètres de l'IP.](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Sélectionnez l'IP élastique que vous venez de créer à partir du gestionnaire IP élastique. Dans le déroutement **Actions** sélectionnez **l'adresse IP élastique associée**.

![Sous &quot;Actions&quot;, &quot;Actions&quot;, adresse IP Elastic](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Sélectionnez l'instance que vous venez de créer. Cela associera la nouvelle IP élastique à l'instance et lui donnera une adresse IP publique qui ne changera pas.

![Attribuez l'IP élastique à votre instance EC2.](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## Configuration AvalancheGo<a id="829e"></a>

Retournez au tableau de bord EC2 et sélectionnez `Instances de fonctionnement`.

![Allez dans vos instances de fonctionnement.](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Sélectionnez l'instance EC2 nouvellement créée. Cela ouvre un panneau de détails avec des informations sur l'instance.

![Détails sur votre nouvelle instance.](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

Copiez le champ `IP public IPv4` à utiliser ultérieurement. À partir de maintenant, nous appelons cette valeur `PUBLICIP`.

**Rappelez-vous : les commandes terminales ci-dessous supposent que vous exécutez Linux. Les commandes peuvent différer pour MacOS ou d'autres systèmes d'exploitation. Lorsque la copie collant une commande à partir d'un bloc de code, copiez et collez l'intégralité du texte dans le bloc.**

Connectez-vous à l'instance AWS depuis votre machine locale. Ouvrez un terminal \(essayer raccourci `CTRL + ALT + T`\) et naviguez dans le répertoire contenant le fichier `.pem` que vous avez téléchargé précédemment.

Déplacer le fichier `.pem``` vers `.pem` \(où les fichiers .pem généralement live\) avec:

```bash
mv avalanche.pem ~/.ssh
```

Ajoutez-le à l'agent SSH afin que nous puissions l'utiliser dans SSH dans votre instance EC2, et la marquer comme étant en lecture seule.

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

SSH dans l'instance. \(N'oubliez pas de remplacer `PUBLICIP` par le champ IP public à partir de antérieurement. \)

```text
ssh ubuntu@PUBLICIP
```

Si les autorisations ne sont **pas** configurées correctement, vous verrez l'erreur suivante.

![Assurez-vous de définir les autorisations correctement.](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

Vous êtes maintenant connecté à l'instance EC2.

![You&apos;re sur l'instance EC2.](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Si vous ne l'avez pas déjà fait, mettez à jour l'instance pour vous assurer qu'il a les dernières mises à jour du système d'exploitation et de sécurité:

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

Cela redémarre également l'instance. Attendez 5 minutes, puis connectez-vous en exécutant cette commande sur votre machine locale:

```bash
ssh ubuntu@PUBLICIP
```

Vous êtes connecté à l'instance EC2. Maintenant, nous allons devoir configurer notre nœud Avalanche. Pour ce faire, suivez le [tutoriel Configuration d'Avalanche avec](set-up-node-with-installer.md) l'installateur qui automatise le processus d'installation. Vous aurez besoin du `PUBLICIP` que nous avons créé plus tôt.

Votre noeud AvalancheGo devrait maintenant être en cours de fonctionnement et dans le processus de bootstrapping, qui peut prendre quelques heures. Pour vérifier si c'est fait, vous pouvez délivrer un appel API en utilisant `curl`. Si vous faites la demande de l'instance EC2, la demande est:

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

Une fois le noeud terminé, la réponse sera:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Vous pouvez continuer sur, même si AvalancheGo n'est pas fait bootstrapping.

Afin de faire de votre noeud un validant, vous aurez besoin de son ID noeud. Pour l'obtenir, cours:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La réponse contient l'ID du noeud.

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

Dans l'exemple ci-dessus l'ID du noeud is`NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`. Copiez votre ID de noeud pour plus tard. Votre ID noeud n'est pas un secret, vous pouvez donc simplement le coller dans un éditeur de texte.

AvalancheGo a d'autres API, telles que [l'API](../../avalanchego-apis/health-api.md) santé, qui peuvent être utilisées pour interagir avec le nœud. Certaines API sont désactivées par défaut. Pour activer ces API, modifiez la section ExecStart de `/etc/systemd/system/avalanchego.service` \(créée pendant le processus d'installation\) afin d'inclure les drapeaux qui permettent ces endpoints. Ne activez pas manuellement les API à moins que vous ayez une raison.

![Certaines API sont désactivées par défaut.](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

Sauvegardez la clé de rupture et le certificat du nœud au cas où l'instance EC2 est corrompu ou autrement indisponible. L'ID du noeud est dérivé de sa clé de rupture et de son certificat. Si vous perdez votre clé de jalonnement ou votre certificat, votre noeud aura un nouvel ID de noeud, qui pourrait vous faire devenir inadmissible à une récompense de jalonnement si votre noeud est un validant. **Il est très fortement conseillé que vous copiez la clé de jalonnement et le certificat de votre noeud** La première fois que vous exécutez un nœud, il va générer une nouvelle paire de clés / certificat de `jalonnement` et les stocker dans le répertoire key/certificate

Sortir de l'instance SSH en exécutant :

```bash
exit
```

Maintenant, vous n'êtes plus connecté à l'instance EC2; vous êtes de retour sur votre machine locale.

Pour copier la clé de jalonnement et le certificat à votre machine, lancez la commande suivante. Comme toujours, remplacer `PUBLICIP`.

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

Maintenant, votre clé de rupture et votre certificat sont dans le répertoire `~/aws_avalanche_backup` . **Le contenu de ce répertoire est secret.** Vous devriez conserver ce répertoire sur le stockage non connecté à l'internet \(comme un disque dur externe. \)

### Modernisation de votre nœud<a id="9ac7"></a>

AvalancheGo est un projet en cours et il y a des mises à jour régulières de version. La plupart des mises à niveau sont recommandées, mais pas requis. Un préavis sera donné pour les mises à niveau qui ne sont pas compatibles vers l'arrière. Pour mettre votre noeud à la dernière version, SSH dans votre instance AWS comme avant et lancez le script d'installation.

```text
./avalanchego-installer.sh
```

Votre machine exécute maintenant la dernière version AvalancheGo. Pour voir le statut du service AvalancheGo, lancez `sudo systemctl statu avalanchego.`

## Réalisations

C'est ça! Vous avez maintenant un noeud AvalancheGo courant sur une instance AWS EC2. Nous vous recommandons de configurer [la surveillance des nœuds pour](setting-up-node-monitoring.md) votre nœud AvalancheGo. Nous vous recommandons également de configurer les alertes de facturation AWS afin que vous n'êtes pas surpris lorsque la facture arrive. Si vous avez des commentaires sur ce tutoriel, ou quoi que ce soit d'autre, envoyez-nous un message sur [Discord](https://chat.avalabs.org).

