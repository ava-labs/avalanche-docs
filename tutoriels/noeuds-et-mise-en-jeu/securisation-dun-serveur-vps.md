---
description: >-
  Vous trouverez dans ce document les éléments essentiels à mettre en place dans
  le cadre de la sécurisation d’un serveur Ubuntu.
---

# Sécurisation d'un serveur VPS

![](https://miro.medium.com/max/943/1*Esgs413IPfYOVC1I-gN6ww.png)

## Sommaire

#### [Introduction](../../#introduction)

#### [I - Éléments essentiels à la sécurisation d’un serveur Ubuntu](../../#i-elements-essentiels-a-la-securisation-dun-serveur-ubuntu)

1. [Mise à jour du système d'exploitation](../../#1-mise-a-jour-du-systeme-dexploitation)
2. [Administration des utilisateurs du système](securisation-dun-serveur-vps.md#2-administration-des-utilisateurs-du-systeme)
3. [Sécurisation du protocole SSH](securisation-dun-serveur-vps.md#4-securisation-du-protocole-ssh)
   1. [Introduction](securisation-dun-serveur-vps.md#1-introduction)
   2. [Changement du port de communication](securisation-dun-serveur-vps.md#2-changement-du-port-de-communication)
   3. [Configuration des clés SSH](securisation-dun-serveur-vps.md#3-configuration-des-cles-ssh)
4. [Ajout sur Ubuntu de l'authentification à partir d'une clé privée ainsi que l'ajout de la double authentification Google](securisation-dun-serveur-vps.md#4-ajout-sur-ubuntu-de-lauthentification-a-partir-dune-cle-privee-ainsi-que-lajout-de-la-double-authentification-google)
5. [Installation d'un pare-feu](securisation-dun-serveur-vps.md#5-installation-dun-pare-feu)



**II - Pour aller plus loin**

1. [Mettre à jour mon noeud](securisation-dun-serveur-vps.md#1-mettre-a-jour-mon-noeud)
2. [Faire un Backup du Node iD](securisation-dun-serveur-vps.md#2-faire-un-backup-du-node-id)
3. [Monitorer son node avec htop](securisation-dun-serveur-vps.md#6f6b)
4. [Historique du terminal](securisation-dun-serveur-vps.md#4a14)

   [  
   ](securisation-dun-serveur-vps.md#2-faire-un-backup-du-node-id)

## Introduction

Lorsque vous recevez votre serveur \(VPS/serveur dédié\), il est important d’effectuer quelques actions afin de disposer d’un minimum de sécurité. Par conséquent nous avons décidé de rédiger une procédure traitant des points essentiels à mettre en place au sein d’un système.

Cette procédure a été rédigée par des membres volontaires de la **communauté Avalanche**. Pour toutes suggestions, merci de nous contacter via Telegram : [https://t.me/Avalanche\_fr](https://t.me/Avalanche_fr)

Cette procédure est rédigée pour un système d’exploitation **Ubuntu &gt;=18.04**.

## I. Éléments essentiels à la sécurisation d’un serveur Ubuntu

### 1. Mise à jour du système d’exploitation

Vous avez installé votre système d’exploitation sur un serveur virtuel privé. Félicitations !

Celui-ci doit être protégé afin d’éviter que des personnes malveillantes puissent s’introduire au sein de votre serveur et ainsi voler vos données.

La première mesure de sécurité à appliquer est la **mise à jour du système**.

Cette étape est primordiale car régulièrement des mises à jour sont publiées pour corriger des vulnérabilités découvertes au sein du système d’exploitation. L’installation de ces mises à jour vous permet donc de déployer les protections nécessaires afin de corriger ces vulnérabilités.

Pour ce faire, il vous suffit de vous rendre au sein du terminal de votre serveur :

* Si vous accéder à votre serveur à l’aide d’une interface graphique, il vous suffit de cliquer sur la touche du clavier ci-dessous :

![](../../.gitbook/assets/image%20%2816%29.png)

* Ensuite il va falloir saisir la commande **terminal** dans la barre de recherche.
* Vous aurez ensuite une fenêtre comme celle-ci qui devrait apparaître :

![](../../.gitbook/assets/image%20%2813%29.png)

Parfait, le terminal est ouvert. Souvenez-vous de ces manipulations car tout au long de la procédure nous allons utiliser ce terminal.

Bien maintenant que le terminal est ouvert nous allons saisir les commandes suivantes afin de mettre à jour le système :

```text
apt-get update
```

```text
apt-get upgrade
```

Une fois les commandes saisies, le système vous demandera de confirmer l’installation des mises à jour \(s’il y’en a\), vous aurez juste à appuyer sur la touche Y \(yes\) de votre clavier pour confirmer.

Cette manipulation peut prendre un peu de temps selon le nombre de mises à jour à installer.

Si vous avez des erreurs du type **permission denied** c’est que vous n’etes pas root, utilisez cette commande puis recommencez

```text
 sudo su -
```



### 2. Administration des utilisateurs du système

En matière de système d’exploitation, le root est le nom donné à l’utilisateur qui possède toutes les permissions sur le système et bénéficie d’accès privilégiés.

Se connecter directement en root est dangereux, ce compte peut en effet exécuter des opérations irréversibles sur votre serveur. C’est pour cela que nous allons créer un second utilisateur dans lequel vous pourrez installer votre nœud Avalanche, Cet utilisateur sera autorisé à se connecter à votre système en SSH avec le mot de passe indiqué lors de la création du compte.

**Modifier le mot de passe associé à l’utilisateur « root »**

À l’installation d’une distribution, un mot de passe est créé automatiquement pour l’accès principal \(root\). Il est très fortement recommandé de le personnaliser en le modifiant. Pour ce faire, une fois connecté, il vous suffit d’entrer la commande suivante :

![](https://miro.medium.com/max/1669/1*k7YTt-1XAy4YKbW1n9Mq-Q.png)

```text
passwd root
```

Votre système vous demandera ensuite d’entrer votre nouveau mot de passe deux fois pour le valider. Attention, pour des raisons de sécurité, **le mot de passe ne sera pas affiché lors de l’écriture**. Vous ne pourrez donc pas voir les caractères saisis.

Une fois cette opération effectuée, vous devez renseigner le nouveau mot de passe dès votre prochaine connexion au système.

Pour créer un utilisateur:

![Image for post](https://miro.medium.com/max/1481/1*thqNFwYor8kqxSnLR7bxPQ.png)

```text
adduser Nom_Utitilisateur_Personnalisé
```

 Remplacez **Nom\_Utitilisateur\_Personnalisé** par le nom d’utilisateur que vous souhaitez, confirmez en appuyant sur entrée.

![](../../.gitbook/assets/image%20%2814%29.png)

Pour le reste des informations affichées nous allons garder les paramètres par défaut, donc confirmez avec entrée et appuyez sur la touche `Y`

Vous avez créé votre user \(utilisateur\) qui dans notre exemple se nomme ‘avalanche-user’, et dans lequel nous installerons le noeud Avalanche, Il faut maintenant donner la capacité à l’utilisateur ‘avalanche-user’ de pouvoir lancer la commande sudo, cette commande permet à un administrateur système de donner à un utilisateur la possibilité d’exécuter une ou plusieurs commandes en tant que super utilisateur, tout en gardant une trace des commandes tapées et en demandant un mot de passe à l’utilisateur avant d’exécuter sa commande. Ainsi, sudo peut empêcher l’exécution libre de commandes critiques pouvant gravement affecter le système.

```text
adduser ‘avalanche-user’ sudo
```

![](../../.gitbook/assets/image%20%283%29.png)

Lancez la commande ‘sudo’, si vous voyez le résultat affiché ci-dessous c’est que la commande est déjà installée

```text
sudo
```

![](../../.gitbook/assets/image%20%285%29.png)

Dans le cas échéant, lancez la commande suivante : 

```text
apt-get install sudo -y
```

![](../../.gitbook/assets/image%20%2826%29.png)

Pour tester le changement d’utilisateur lancez la commande:

```text
sudo su - avalanche-user
```

Pour revenir à l’utilisateur qui était précédemment lancé \(ici root\). Lancez la commande exit

```text
exit
```

![Image for post](https://miro.medium.com/max/1498/1*oTzj9coEEQbftEhYFn1tnA.png)

### 3. Sécurisation du protocole SSH

####     1. Introduction

SSH est un protocole de communication permettant de communiquer avec un serveur distant et sans avoir besoin de se connecter à une interface graphique. C’est littéralement un terminal distant.

Tout protocole étant amené à communiquer avec le réseau externe \(Internet\) utilise un port de communication. Dans le cas de SSH le port par défaut est 22.



####     2. Changement du port de communication

Il est **fortement** conseillé de changer le port de communication par défaut de SSH, pour la simple raison que ce port de communication est par défaut, une personne malveillante peut ainsi tenter de réaliser une attaque de type Brute Force, ce type d’attaque consiste à trouver un mot de passe ou une clé en testant successivement toutes les combinaisons possibles, afin de trouver le couple identifiant, et cela passe par le port de communication 22.

Si nous changeons le port de communication par défaut de SSH, ces tentatives de Brute Force se réaliseront sur un port qui n’est pas actif par SSH.

Pour ce faire, nous allons accéder au fichier de configuration de SSH avec l’utilisateur root, car il le est seul utilisateur capable d’apporter des modifications sur les fichiers système.

**Important** : Pour réaliser les manipulations qui vont suivre il est impératif de les exécuter à l’aide de l’interface graphique.

Voici la commande à saisir afin d’accéder au fichier de configuration :

```text
sudo vi /etc/ssh/sshd_config
```

Vi est un éditeur de texte natif au système, il va vous permettre de réaliser des modifications sur un fichier système, dans notre cas le fichier sshd\_config

Pour se déplacer sur le fichier avec l’éditeur de texte vi, il va falloir utiliser les flèches de votre clavier.

On devra donc naviguer vers l’emplacement du fichier qui nous intéresse afin d’éditer la valeur par défaut. Il faut donc dans notre cas identifier la ligne où se situe la phrase suivante :

![Image for post](https://miro.medium.com/max/1953/1*VBlfbaWC1Xqll9vlzT0BwQ.png)

« Port 22 »

Une fois que votre curseur est positionné sur cette ligne, il va falloir saisir la touche « i » de votre clavier afin d’entrer dans le mode d’édition de vi.

Vous verrez en bas de votre fichier que le mot « INSERTION » apparait. Cela signifie que vous êtes prêt à saisir une valeur et ou supprimer une valeur.

Nous allons donc supprimer la valeur 22, et la remplacer par une autre valeur. Vous pouvez saisir par exemple le port 2221.  
Veillez toutefois à ne pas renseigner un numéro de port déjà utilisé sur votre système.  
Nous allons également apporter une autre modification au niveau de ce fichier afin de ne permettre l’authentification en SSH uniquement aux utilisateurs **non root**.  
Pour ce faire il faut appuyer sur la touche « ECHAP » de votre clavier afin de pouvoir de nouveau naviguer sur le fichier à l’aide des flèches de votre clavier, et se rendre au niveau de la phrase :

« PermitRootLogin » il va falloir saisir à cette ligne « no » , ce qui donne ça :

```text
« PermitRootLogin no »
```

Une fois les modifications apportées, vous devez les enregistrer, pour ce faire, vous allez dans un premier temps appuyer sur la touche « ECHAP » de votre clavier afin d’arrêter la saisie, et par la suite saisir les commandes suivantes :

```text
:wq
```

Cette commande permet d’enregistrer et quitter l’éditeur vi.

Si vous souhaitez uniquement enregistrer votre modification sans quitter le fichier vous pouvez faire :

```text
:w
```

Une fois le fichier enregistré et quitté, vous retournez à l’emplacement dans lequel vous aurez lancé la commande.

Il est maintenant nécessaire d’appliquer les modifications au niveau du système, il nous faut pour cela redémarrer le service SSH.

Pour ce faire, vous devez saisir la commande suivante :

```text
sudo systemctl restart ssh
```

Une fois cette commande, pour vérifier que le service SSH est bien actif vous devez saisir la commande suivante:

```text
sudo systemctl status ssh
```



####    3. Configuration des clés SSH

Nous allons monter d’un cran en sécurisation du protocole SSH, en autorisant la connexion via SSH uniquement à l’aide de clé publique/privé, et ce dans le but d’autoriser les authentifications au protocole SSH uniquement à l’aide de la clé privée. Cela permet d’être totalement protégé des attaques de type Brute Force.

**Pour MacOS / Linux :**

ouvrez un nouveau terminal en local \(changer $USER et $VPS\_IP\):

```text
cd ~ && mkdir -p .ssh
chmod 700 .ssh
ssh-keygen -t dsa -f ~/.ssh/id_server
ssh-copy-id $USER@VPS_IP
```

* Parfait vous avez généré vos clés SSH dans le dossier .ssh Vous trouverez dans le dossier .ssh deux clés : La première ‘id\_server’ correspond à la clé privée. La seconde clé ‘id\_serveur.pub’ correspond à la clé publique.
* La clé publique va être renseignée au niveau du fichier **sshd\_config** afin de communiquer au service SSH que vous devez utiliser les éléments dans ce fichier uniquement, pour autoriser une connexion provenant d’une clé privée. La clé privée va être la clé permettant la connexion. La paire de clés fonctionne donc en binôme. La clé privée doit être gardée très précieusement car elle sera la seule manière de vous authentifier à votre serveur en SSH.

**Pour Windows :**

* téléchargez et installez [PuttyGen](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* Générez vos clefs ssh, ouvrez PuttyGen et configurez les paramètres comme ci dessous :

![](https://miro.medium.com/max/405/0*aKY3nLWsjm7vBuZf.png)

* Appuyez sur Générer puis rentrez un mot de passe

![](https://miro.medium.com/max/405/0*XHa5VuFfSt1ndNrO.png)

* Enregistrez votre clef privée sur votre ordinateur, ainsi que votre clef publique.
* ouvrez le fichier de clé publique \(fichier.pub\) que vous avez généré et copiez son contenu.
* reconnectez vous à votre vps avec Putty et tapez cette comande :

```text
sudo vi /etc/ssh/sshd_config
```

* modifiez les permissions :

```text
chmod 0700 ~/.ssh; touch ~/.ssh/authorized_keys; chmod 0644 ~/.ssh/authorized_keys
```

```text
nano ~/.ssh/authorized_keys
```

* coller votre clef publique avec un clique droit
* faites Ctrl + X, tapez yes, puis appuyez sur Entrée pour sauvegarder

**MacOS, Linux, Windows :**

* Reconnectez-vous à votre vps si vous ne l’êtes pas
* Nous devons maintenant renseigner au fichier **sshd\_config** le chemin vers lequel se trouve la nouvelle clé publique :

```text
sudo vi /etc/ssh/sshd_config
```

* On édite les éléments suivants de manière à ce qu’ils correspondent explicitement aux éléments ci-dessous, n’oubliez pas de modifier $USER par votre propre nom d’utilisateur.

![](https://miro.medium.com/max/517/1*XtIFITXlBuWY7jWPjmUVNw.png)

* On désactive les méthodes d’authentification autres que la paire clé publique/privé :

![](https://miro.medium.com/max/705/0*JQspPOT3P-H59IJu.png)

_Pour certains provider pour aurez l'erreur "**Deprecated option error**" à la ligne GSSAPIAuthentification no, il n'est donc pas nécessaire de remplir cette ligne._

* On enregistre le fichier et on redémarre le service SSH avec la commande suivante :

```text
sudo systemctl restart ssh
```

* Vous êtes maintenant prêts à vous connecter avec votre clé privée en SSH sur votre serveur. Pour ce faire, si vous utilisez Putty vous devez renseigner l’emplacement de votre clé privé, il suffit d’aller sur l’onglet de gauche “Auth” et ensuite cliquer sur “Browse” sur la fenêtre de droite, il ne vous restera plus qu’a choisir l’endroit où est stocké votre clé privée.

![](https://miro.medium.com/max/405/0*pVX-4kdlvUxkLSVm.png)

pour se connecter en ssh avec une clef privée et un port différent avec MacOS/Linux :

```text
ssh avalanche-username@VPS_IP -p PORT -i <chemin_d’accès_clef_privé>
```

{% hint style="warning" %}
Si vous avez cette erreur "Server refused our key", veuillez suivre ce tutoriel [https://blog.juansorroche.com/cles-ssh-server-refused-our-key](https://blog.juansorroche.com/cles-ssh-server-refused-our-key)
{% endhint %}

### 

### 4. Ajout sur Ubuntu de l'authentification à partir d'une clé privée ainsi que l'ajout de la double authentification Google

{% hint style="danger" %}
Utilisateurs Linux et Mac
{% endhint %}

Afin d’avoir un accès ssh **avec clé privée**, **SANS** passer par **Putty** \( pour les utilisateurs Mac \)**,** et ainsi augmenter sa sécurité nous pouvons établir sur notre système linux la désactivation de la connexion sans clé privée et y ajouter Google Auth.

Nous vous recommandons de ne **jamais** laisser votre clé privée sur votre pc. Créez la spécifiquement pour votre Node et et utilisez une clé USB sécurisée lorsque vous souhaitez vous connecter a votre VPS.

Ouvrez deux fenêtres, une ayant accès au VPS et l’autre en local.

**ETAPE 1 :** depuis votre VPS , vous devez copier votre fichier ssh dans le fichier authorized\_keys qui se trouve dans le dossier .ssh de votre VPS

Entrez les commandes suivantes dans votre VPS :

```text
cd && mkdir -p .ssh
```

```text
chmod 700 .ssh && cd .ssh && touch authorized_keys && sudo vim authorized_keys
```

**ETAPE 2 :** En local :

```text
cd && cd .ssh && cat <nom de votre clef ssh>
```

Copiez **L’intégralité** dans le fichier authorized\_keys de votre fenêtre ouverte sur le VPS, Sauvegardez et quittez.

**ETAPE 3 :** En VPS, ouvrir le fichier et mettez les valeurs présente ci dessous

```text
sudo vi/etc/ssh/sshd_config
```

![](https://miro.medium.com/max/988/1*GOcqZqKSDzKYmqKVF1GzHg.png)

Sauvegardez puis quittez \(échap, tapez :wq et enfin touche Entrée\)

**Pour installer Google Auth**

```text
sudo apt-get install libpam-google-authenticator
```

En plus d’avoir un accès uniquement via clé privée, on peut aussi utiliser en plus de cela, la méthode 2FA via Google Auth, ce dernier est un logiciel de génération de mots de passe à usage unique permettant l’authentification à deux facteurs, développé par Google. Le logiciel fournit un nombre de 6 chiffres que l’utilisateur doit donner lors de son authentification, en plus de son pseudo et de son mot de passe.

**Installer Google Auth**

```text
sudo apt-get install libpam-google-authenticator
```

![](https://miro.medium.com/max/1141/1*EifR9g5coK0IwJX_AVS6Gg.png)

Pour obtenir votre QR code, lancez la commande depuis l’utilisateur \(non root\).

```text
google-authenticator
```

![](https://miro.medium.com/max/1143/1*jEIXQhiEjfal6vmVP4tG0w.png)

Une fois la commande exécutée, appuyez sur la touche ‘Y’ de votre clavier et validez, le QR Code devrait s’afficher comme ci-dessous. Vous devez ensuite télécharger l’application google Authenticator sur mobile depuis l’App Store ou le Play Store. Une fois l’application téléchargée suivez les indications et scannez le QR code. **ATTENTION**, veuillez stocker la clé secrète, le code diversification et les lignes où il y a marqué ‘emergency’.  
Nous vous conseillons de stocker ces informations dans un support sécurisé et non connecté a internet , car en cas de perte de votre téléphone, ces informations seront le seul moyen de retrouver vos accès a Google Auth.

![](https://miro.medium.com/max/851/1*_ccopoGPPNndh3ZwqqllMA.png)

Veuillez ensuite appuyer sur le bouton Y \(yes\) de votre clavier pour toutes les questions suivantes.

**Activer l’option 2FA:**

Il faudra par la suite modifier le fichier suivant :

```text
sudo vim/etc/pam.d/sshd
```

Et Ajouter cette ligne tout en haut du fichier :

```text
auth [success=done new_authtok_reqd=done default=die] pam_google_authenticator.so nullok
```

Nous terminons comme d’habitude par enregistrer les modifications apportées, et en relançant le ssh, afin que tout soit mis a jour au niveau du système, pour cela entrez la commande :

```text
service ssh restart
```

A partir de maintenant pour vous connecter sur votre VPS vous devez non pas lancer la commande `ssh avalanche-username@10.10.10.10 -p`  mais :

```text
ssh avalanche-username@10.10.10.10 -p  -i <chemin_d'accès_clef_privé>
```

### 

### 5. Installation d'un pare-feu

Un pare-feu est un programme qui vous permet d'activer et/ou de désactiver le trafic entrant et sortant de votre serveur. Vous pouvez utiliser ufw comme pare-feu.

Installez ufw :

```text
sudo apt install ufw
```

Vous trouverez ci-dessous les ports sur lesquels le trafic entrant doit être activé : 

* trafic http sur le port 80
* trafic https sur le port 443 
* le trafic ssh sur le port que vous avez configuré précédemment, donc le 2221
*  le trafic sur les deux ports utilisés par le nœud de validation pour se connecter au réseau Avalanche, 9650 et 9651. Ce sont les ports standard utilisés par le nœud lorsqu'il est lancé ; ces ports peuvent être modifiés \(voir X\), si vous vous souvenez de les remplacer dans les commandes suivantes.

Si vous commencez tout juste à utiliser votre pare-feu, les premières règles à définir sont vos politiques par défaut. Ces règles traitent le trafic qui ne correspond pas explicitement à d'autres règles. Par défaut, l'UFW est réglé pour refuser toutes les connexions entrantes et autoriser toutes les connexions sortantes. Cela signifie que toute personne essayant d'atteindre votre serveur ne pourra pas se connecter, tandis que toute application à l'intérieur du serveur pourra atteindre le monde extérieur.

```text
sudo ufw default deny incoming
```

```text
sudo ufw default allow outgoing
```

Exécutez les commandes suivantes l'une après l'autre pour appliquer les règles dont vous avez besoin :

```text
sudo ufw allow 80
```

```text
sudo ufw allow 443
```

```text
sudo ufw allow 9650
```

```text
sudo ufw allow 9651
```

{% hint style="danger" %}
Attention penser à changer avec le port SSH que vous avez choisi pour ne pas perdre l’accès à votre vps !
{% endhint %}

```text
sudo ufw allow 2221
```

Pour activer le par-feu, utilisez cette commande :

```text
sudo ufw enable
```

Vous recevrez un avertissement indiquant que la commande peut perturber les connexions SSH existantes. Nous avons déjà mis en place une règle de pare-feu qui autorise les connexions SSH, il devrait donc être possible de continuer. Répondez à l'invite avec y et appuyez sur ENTRÉE.

Vous pouvez vérifiez vos règles du par-feu avec cette commande :

```text
sudo ufw status verbose
```

{% hint style="danger" %}
Pour vous connectez en ssh rajouter ceci à la fin de votre commande : -p 2221
{% endhint %}

## **II - Pour aller plus loin**

### 1. Mettre à jour mon noeud

**Deux possibilités:**

_**Depuis le code source:**_  
\(le plus rapide et permet l’utilisation d’**un service** pour gérer son noeud\) -- voir plus bas dans la partie **'Bonus'** 

```text
sudo systemctl stop avalanchenode
```

```text
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

```text
git pull
```

```text
./scripts/build.sh
```

```text
sudo systemctl start avalanchenode
```

Pour vérfifier la version sur laquelle se trouve votre node \(attendre quelques minutes avant ça\) :

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Pour vérifier que tout fonctionne \(attendre quelques minutes avant ça\) :

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

Si vous avez une réponse : `"isBootstrapped":true},"id":1` alors tout fonctionne !

_**Depuis l’exécutable:**_

* récupérer le lien du dernier exécutable pour Linux ici \(lien: [https://github.com/ava-labs/avalanchego/releases/](https://github.com/ava-labs/avalanchego/releases/)\)

```text
wget LIEN_DE_LA_DERNIERE_VERSION
```

* relancer votre noeud \(ex: ./avalanche-&lt;VERSION&gt;/avalanchego\)

  _\*\*\*\*_

_**Bonus :**_

Création d’un service qui permet de gérer son noeud Avalanche \(auto redémarrage si crash, etc\)

Pensez à changer $USER avec votre nom d’utilisateur

```text
sudo nano /etc/systemd/system/avalanchenode.service
```

```text
[Unit]
Description=Avalanche Node service
After=network.target

[Service]
User=$USER
Group=$USER

WorkingDirectory=/home/$USER/go/src/github.com/ava-labs/avalanchego
ExecStart=/home/$USER/go/src/github.com/ava-labs/avalanchego/build/avalanchego

Restart=always
PrivateTmp=true
TimeoutStopSec=60s
TimeoutStartSec=10s
StartLimitInterval=120s
StartLimitBurst=5

[Install]
WantedBy=multi-user.target
```

```text
sudo systemctl [ enable | start | status | stop ] avalanchenode
```



### 2. Faire un Backup du Node ID

Pour faire un backup de votre Node il nous faudra copier le dossier ‘staking’ présent dans votre VPS et ensuite le coller en local \(clé USB ou autre \), nous vous conseillons de ne surtout pas stocker le dossier dans un support qui serait souvent connecté a internet et/ou facilement piratable.

Lancer la commande :

```text
$GOPATH
```

Si une ligne vide apparait \(voir image ci dessous \). il faut configurer la valeur qui permet d'accéder au dossier go, qui contient le dossier staking.

```text
export GOPATH=/home/avalanche-user/go
```

Pour se rendre dans le dossier staking, il faut lancer les commandes suivantes pour faire afficher une information qui nous servira à nous rendre dans le dossier staking

Pour se rendre à la racine de votre session utilisateur et faire afficher dans quel dossier ou vous vous trouvez dans votre VPS \(cd veut dire change directory et pwd print working directory :

```text
cd
```

```text
pwd
```

pwd indique le chemin qui mène à l'endroit où vous vous trouvez actuellement. Par exemple, dans la photo ci dessous "cd" et "pwd" indiquent que nous rendons à la racine et ensuite nous affichons ou ou nous situons, dans la photo nous nous trouvons session utilisateur avalanche-user.

Lancez la commande "ls" pour afficher les dossiers. Vous pouvez voir sur l'image ci dessous qu'il y a un dossier go, dans lequel a été installé le dossier avalanche go.

![](../../.gitbook/assets/image%20%2825%29.png)

Pour copier en local avec les restrictions de private key et de port ssh, entrez la commande ci dessous, n’oubliez pas de rédiger la valeur du port ssh précédemment désigné par **vous**, dans notre cas il s’agit du port 2221.  
Il faudra également modifier ‘avalanche-user’ par votre nom d’utilisateur, ainsi que le chemin local à partir de ‘localMachine’. Il faut donc que vous connaissiez le chemin d'accès de votre bureau.

```text
scp -r -P 2221 -i <Chemins_private_key> avalanche-user@XX.XX.XX.XX:/home/avalanche-user/go/src/github.com/ava-labs/.avalanchego/staking/ Users/localMachine/Desktop
```

**exemple :** scp -r -P 2221 -i /Users/UserLocal/.ssh/id\_rsa avalanche-user@10.10.10.10:/home/avalanche-user/.avalanchego/staking/ Users/myComputer/Desktop

Une fois la commande entrée, **si** vous avez configuré une connexion via une clé privée, le mot de passe associé sera demandé et **si** y a la double authentification Google qui est activé, il faudra la renseigner aussi.

Dans le cas ou vous n'avez pas configuré un accès via clé privée il faut supprimer la partie `-i <Chemins_private_key>`

Une fois cela réalisé, Il suffit maintenant d'aller dans votre bureau et un dossier nommé staking qui sera votre dossier de sauvegarde en cas de probleme àvec votre VPS.



### **3. Monitorer son node avec htop** <a id="6f6b"></a>

```text
sudo apt-get install htop
```

Lancer ensuite la commande `htop`



### **4. Historique du terminal** <a id="4a14"></a>

Il est **vivement** conseillé d’effacer l’historique des commandes de votre terminal, cela effacera toutes les lignes rédigées sur ce dernier, pour cela il suffit d’exécuter ces deux commandes :

```text
history -c
```

```text
history -w
```

\*\*\*\*

