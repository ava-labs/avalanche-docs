# Exécuter un nœud Avalanche avec OVH

Le protocole de consensus Avalanche a suscité beaucoup d’attention. Le protocole décentralisé permet de récompenser les preuves d’enjeu d’une manière que les détenteurs de jetons \(stakers\) n’ont jamais vue auparavant. Le réseau étant écologique, il ne nécessite que très peu de calculs pour faire fonctionner votre nœud, et le nombre de stakers sur le réseau n’étant pas limité, de nombreux nouveaux venus souhaitent démarrer leur nœud avec une haute disponibilité.

Nous allons passer par le processus de mise en place de paires de clés SSH, de mise en place de règles de sécurité et le lancement d’un nœud sur OVH. Ensuite, nous nous connecterons à ce nœud et configurons Avalanche en tant que service afin de garantir que notre nœud fonctionne aussi longtemps que la machine est en marche.

## La logistique de l’hébergement cloud d’un nœud <a id="cd35"></a>

Les fournisseurs de cloud tels que OVH, DigitalOcean, Contabo ou AWS fournissent des environnements à haute disponibilité. Alors que les nœuds à domicile sont une option solide, ces services sont un bon candidat pour exécuter un nœud qui est garanti pour atteindre les exigences de disponibilité minimales \(60% au moment de la rédaction\).

La meilleure partie ? Vous n’avez pas besoin de mettre vos clés privées sur un nœud pour commencer à valider sur ce nœud. Même si quelqu’un pénètre dans votre environnement et accède au nœud, le pire qu’il puisse faire est de désactiver le nœud. Il est toutefois conseillé de sauvegarder tous les certificats de votre noeud au cas où une reconstruction complète du nœud serait nécessaire. Cela n’aura un impact sur les récompenses que lorsque la machine elle-même est dans une telle détresse \(ou entièrement arrêtée\) qu’une reconstruction complète est nécessaire.

Pour commencer, nous avons besoin :

* une connection Internet
* un compte OVH \(un KYC peut être demandé lors de la commande du VPS\)
* la possibilité de faire du SSH dans une machine \(ce tutoriel utilise Openssh et la ligne de commande, mais PuTTy sous Windows pourrait tout aussi bien fonctionner\)
* un bon endroit pour stocker et sauvegarder les certificats et les fichiers de paires de clés \*.pem

## Step 1 — Choisir votre VPS <a id="7214"></a>

[Allez sur cette page pour commander votre VPS](https://www.ovhcloud.com/fr/vps/compare/)

![](https://miro.medium.com/max/1451/1*EYu2ymWS1JTjH5-t2OK7-A.png)

Pour un noeud Avalanche, nous vous recommandons le VPS **ESSENTIAL**

_Pour le tutoriel nous prendrons sans engagement mais nous vous recommandons de prendre 12 ou 24 mois._

Après avoir choisi votre durée d’engagement, reséléctionnez le vps **ESSENTIAL**, avec une **distribution uniquement**, et choissiez **Ubuntu** comme système d’exploitation. Pour la localisation choisissez **Gravelines** ou **Strasbourg.**

![](https://miro.medium.com/max/888/1*e22gpO6ItFinyOUgG18P2w.png)

Les options suivantes ne sont pas nécessaires pour l’installation et la configuration d’un noeud Avalanche.

![](https://miro.medium.com/max/895/1*IfWoVKPhRqvdd0f3Bc8m6A.png)

Acceptez les différentes conditions puis payez.

![](https://miro.medium.com/max/1381/1*erfbBzVzE3CPd3i5W9bQpw.png)

> Dans un délai de 24 heures, vous devriez recevoir un e-mail confirmant la bonne livraison de votre VPS, accompagné de votre facture mais surtout de vos **identifiants** !

En attendant la livraison de votre VPS, installez le client SSH intégré à Windows 10 \(**déjà installé sur MacOs/Linux**\).

Ouvrez les **réglages**, puis **Applications** et enfin appuyez sur **Fonctionnalités facultatives.**

![](https://miro.medium.com/max/905/1*HqzG-Rwn0ZQKSRsdulY9hw.png)

Cherchez **ssh**, installez la fonctionnalité et **redémarrez** votre ordinateur.![Image for post](https://miro.medium.com/max/60/1*XEg8RkQsBH-K1DRhi0-oaQ.png?q=20)

![](https://miro.medium.com/max/1139/1*XEg8RkQsBH-K1DRhi0-oaQ.png)

Dès la bonne reception du mail d’OVH communiquant l’IP de votre VPS ainsi que vos identifiants vous pouvez continuer la suite :

Ouvrez un **terminal de commande** \(cmd pour Windows\) puis connectez vous à votre vps avec la commande suivante, puis rentrez le mot de passe associé.

```cpp
ssh USER@IP_VPS
```

![](https://miro.medium.com/max/940/1*mnDRlRzhQTDNv-iaS-WUAQ.png)

Vous devriez arriver à cette interface :

![](https://miro.medium.com/max/940/1*D_4GPNU21uyLSGMiQO3piw.png)

Maintenant que vous êtes connecté , passons à la **sécurisation** de votre vps.

## Éléments essentiels à la sécurisation d’un serveur Ubuntu <a id="673e"></a>

### 1-Mise à jour du système d’exploitation <a id="e028"></a>

Vous avez installé votre système d’exploitation sur un serveur virtuel privé. Félicitations !

Celui-ci doit être protégé afin d’éviter que des personnes malveillantes puissent s’introduire au sein de votre serveur et ainsi voler vos données.

La première mesure de sécurité à appliquer est la **mise à jour du système**.

Cette étape est primordiale car régulièrement des mises à jour sont publiées pour corriger des vulnérabilités découvertes au sein du système d’exploitation. L’installation de ces mises à jour vous permet donc de déployer les protections nécessaires afin de corriger ces vulnérabilités.

Connectez-vous avec l’utilisateur **root** :

```text
sudo su -
```

![](https://miro.medium.com/max/940/1*8N3rIN0uTDh2QL0fpdt8aA.png)

Puis installez les mises à jour du VPS :

```cpp
apt update
```

```cpp
apt full-upgrade -y
```

```cpp
sudo apt install git gcc -y
```

### 2-Administration des utilisateurs du système <a id="15ae"></a>

En matière de système d’exploitation, le root est le nom donné à l’utilisateur qui possède toutes les permissions sur le système et bénéficie d’accès privilégiés.

Se connecter directement en root est dangereux, ce compte peut en effet exécuter des opérations irréversibles sur votre serveur. C’est pour cela que nous allons créer un second utilisateur dans lequel vous pourrez installer votre nœud Avalanche, Cet utilisateur sera autorisé à se connecter à votre système en SSH avec le mot de passe indiqué lors de la création du compte

**Modifier le mot de passe associé à l’utilisateur « root » :**

```cpp
passwd root
```

Votre système vous demandera ensuite d’entrer votre nouveau mot de passe deux fois pour le valider. Attention, pour des raisons de sécurité, **le mot de passe ne sera pas affiché lors de l’écriture**. Vous ne pourrez donc pas voir les caractères saisis.

Modifiez également le mot de passe par défaut de votre utilisateur communiqué par mail \(dans notre cas ubuntu\) :

```cpp
passwd ubuntu
```

**Créer un nouvel utilisateur :**

dans le cadre du tutoriel nous choisirons **avalanche-user**, mais libre à vous de choisir le votre.

```cpp
adduser avalanche-user
```

Pour le reste des informations affichées nous allons garder les paramètres par défaut en appuyant sur **Entrée**, puis appuyez sur la touche **Y.**

![](https://miro.medium.com/max/619/1*ttoAGKF8uEnjscJH1EG9EA.png)

Vous avez créé votre utilisateur qui dans notre tutoriel se nomme **avalanche-user.** Il faut maintenant donner la capacité à l’utilisateur **avalanche-user** de pouvoir lancer la commande sudo, cette commande permet à un administrateur système de donner à un utilisateur la possibilité d’exécuter une ou plusieurs commandes en tant que super utilisateur, tout en gardant une trace des commandes tapées et en demandant un mot de passe à l’utilisateur avant d’exécuter sa commande. Ainsi, sudo peut empêcher l’exécution libre de commandes critiques pouvant gravement affecter le système.

```cpp
adduser 'avalanche-user' sudo
```

Maintenant que notre utilisateur a été créé, connectons nous avec :

```cpp
su - avalanche-user
```

![](https://miro.medium.com/max/580/1*mDHd7-Qj2CYalZYrIDWYGg.png)

### 3. Sécurisation du protocole SSH <a id="3eb4"></a>

**1-Introduction**

SSH est un protocole de communication permettant de communiquer avec un serveur distant et sans avoir besoin de se connecter à une interface graphique. C’est littéralement un terminal distant.

Tout protocole étant amené à communiquer avec le réseau externe \(Internet\) utilise un port de communication. Dans le cas de SSH le port par défaut est 22.

**2-Changement du port de communication**

Il est **fortement** conseillé de changer le port de communication par défaut de SSH, pour la simple raison que ce port de communication est le même pour tout le monde par défaut, une personne malveillante peut ainsi tenter de réaliser une attaque de type \[Force Brute\]\([https://fr.wikipedia.org/wiki/Attaque\_par\_force\_brute\#:~:text=L'attaque par force brute est une m%C3%A9thode utilis%C3%A9e en,comme la plus simple concevable](https://fr.wikipedia.org/wiki/Attaque_par_force_brute#:~:text=L'attaque%20par%20force%20brute%20est%20une%20m%C3%A9thode%20utilis%C3%A9e%20en,comme%20la%20plus%20simple%20concevable).\), ce type d’attaque consiste à trouver un mot de passe ou une clé en testant successivement toutes les combinaisons possibles, afin de trouver le couple identifiant, et cela passe par le port de communication 22.

Si nous changeons le port de communication par défaut de SSH, ces tentatives de Force Brute se réaliseront sur un port qui n’est pas actif par SSH.

Voici la commande à saisir afin d’accéder au fichier de configuration :

```cpp
sudo nano /etc/ssh/sshd_config
```

{% hint style="danger" %}
Assurez-vous d'avoir bien supprimé les **\#** devant les lignes concernées, sinon cela ne fonctionnera pas !
{% endhint %}

Nous allons donc remplacer la valeur 22 par un autre port. Vous pouvez saisir par exemple le port 2221. Veillez toutefois à ne pas renseigner un numéro de port déjà utilisé sur votre système. Nous allons également apporter une autre modification au niveau de ce fichier afin de ne permettre l’authentification en SSH uniquement aux utilisateurs **non root**.

![](https://miro.medium.com/max/758/1*O8ASMEfIMOBvp0Y8rlWXKQ.png)

Pour enregistrer vos modifications, faites **Ctrl + X**, tapez sur la touche **Y**, puis appuyer sur **Entrée**.

Il est maintenant nécessaire d’appliquer les modifications au niveau du système, il nous faut pour cela redémarrer le service SSH.

Pour ce faire, vous devez saisir la commande suivante :

```cpp
sudo systemctl restart ssh
```

Une fois cette commande, pour vérifier que le service SSH est bien actif vous devez saisir la commande suivante:

```cpp
sudo systemctl status ssh
```

![](https://miro.medium.com/max/731/1*N3y3E_R4bssmBNbcri9dpA.png)

**3. Configuration des clés SSH**

Nous allons monter d’un cran en sécurisation du protocole SSH, en autorisant la connexion via SSH uniquement à l’aide de clé publique/privé, et ce dans le but d’autoriser les authentifications au protocole SSH uniquement à l’aide de la clé privée. Cela permet d’être totalement protégé des attaques de type Froce Brute.

Pour le reste des informations affichées nous allons garder les paramètres par défaut, donc confirmez avec entrée et appuyez sur la touche

Déconnectez vous avec **`exit`**\(plusieurs fois jusqu’à obtenir ce message : **Connection to IP\_VPS closed**\), puis tapez cette commande pour créer une paire de clés SSH :

```cpp
ssh-keygen -t rsa
```

Pour la première option tapez sur la touche **Entrée**, pour la deuxième et la troisième **entrez un mot de passe**, vous devriez avoir un résultat similitaire à celui ci :

![](https://miro.medium.com/max/994/1*pqF0MXdvnj9yUdDnL0Eqtw.png)

Parfait vous avez généré vos clés SSH dans le dossier .ssh. Vous y trouverez deux clés : La première **id\_rsa** correspond à la clé privée. La seconde clé **id\_rsa.pub** correspond à la clé publique.

![](https://miro.medium.com/max/969/1*Dh-IaDlH2HPAuhP7-j9BxA.png)

La clé publique va être renseignée au niveau du fichier **sshd\_config** afin de communiquer au service SSH que vous devez utiliser les éléments dans ce fichier uniquement, pour autoriser une connexion provenant d’une clé privée. La clé privée va être la clé permettant la connexion. La paire de clés fonctionne donc en binôme. **La clé privée doit être gardée très précieusement car elle sera la seule manière de vous authentifier à votre serveur en SSH.**

**Envoyer la clé publique sur votre VPS :**

pensez à modifier le nom d’utilisateur,l’IP de votre VPS et aussi le port SSH, puis rentrez le mot de passe de l’utilisateur **avalanche-user**

pour Windows et Linux :

```cpp
type .ssh\id_rsa.pub | ssh avalanche-user@VPS_IP -p 2221 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

pour MacOS :

```cpp
cat .ssh\id_rsa.pub | ssh avalanche-user@VPS_IP -p 2221 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

![](https://miro.medium.com/max/1238/1*CpOR-NeAE2LmA_fili4PLg.png)

Maintenenant que vos clés SSH ont été créé, reconnectez-vous à votre VPS avec cette commande, puis entrez le mot de passe associé à votre clé SSH

```cpp
ssh avalanche-user@VPS_IP -p 2221
```

![](https://miro.medium.com/max/591/1*dpWH86GfAlvYvMd2pbTKRA.png)

Modifions la configuration SSH pour **désactiver la connexion sans clé SSH** :

```cpp
sudo nano /etc/ssh/sshd_config
```

Modifiez les lignes **PubkeyAuthentication**, **AuthorizedKeysFile** et **PasswordAuthentication**

![](https://miro.medium.com/max/790/1*bMhS3d2VAX3HaZDqh-7c1w.png)

Enregistrez le fichier \(**Ctrl + X**, **Y**, **touche Entrée**\) puis redémarrez le service SSH :

```cpp
sudo systemctl restart ssh
```

Et voilà! Pas si dur finalement 😉

### 4-Installation d’un pare-feu <a id="ccb4"></a>

Un pare-feu est un programme qui vous permet d’activer et/ou de désactiver le trafic entrant et sortant de votre serveur.

Installez ufw avec cette commande :

```cpp
sudo apt install ufw -y
```

Vous trouverez ci-dessous les ports sur lesquels le trafic entrant doit être activé :

* trafic http sur le port 80
* trafic https sur le port 443
* le trafic ssh sur le port que vous avez configuré précédemment, donc le 2221 \(pour notre tutoriel\)
* le trafic sur les deux ports utilisés par le nœud de validation pour se connecter au réseau Avalanche, 9650 et 9651. Ce sont les ports standard utilisés par le nœud lorsqu’il est lancé.

Si vous commencez tout juste à utiliser votre pare-feu, les premières règles à définir sont vos politiques par défaut. Ces règles traitent le trafic qui ne correspond pas explicitement à d’autres règles. Par défaut, l’ufw est réglé pour refuser toutes les connexions entrantes et autoriser toutes les connexions sortantes. Cela signifie que toute personne essayant d’atteindre votre serveur ne pourra pas se connecter, tandis que toute application à l’intérieur du serveur pourra atteindre le monde extérieur.

```cpp
sudo ufw default deny incoming
```

```cpp
sudo ufw default allow outgoing
```

Exécutez les commandes suivantes l’une après l’autre pour appliquer les règles dont vous avez besoin :

```cpp
sudo ufw allow 9651
```

Attention penser à changer avec le port SSH que vous avez choisi **pour ne pas perdre l’accès à votre VPS**! \(pour notre tutoriel 2221\)

```cpp
sudo ufw allow 2221
```

Pour activer le par-feu, utilisez cette commande :

```cpp
sudo ufw enable
```

![Image for post](https://miro.medium.com/max/655/1*SgQg-0YWl3Ttnr6_FSTAZg.png)

Vous pouvez vérifiez vos règles du par-feu avec cette commande :

```cpp
sudo ufw status verbose
```

![](https://miro.medium.com/max/676/1*2tka3aeWedzbQroFDrDbgw.png)

## Installation et configuration de votre noeud Avalanche <a id="46d9"></a>

Installons AvalancheGo, l’implémentation Go d’un nœud Avalanche, et connectons nous au mainnet public Avalanche.

Pour cela, installons **Go**

```cpp
wget https://golang.org/dl/go1.15.2.linux-amd64.tar.gz
```

```cpp
sudo sudo tar -C /usr/local -xzf go1.15.2.linux-amd64.tar.gz
```

```cpp
echo 'export PATH=$PATH:/usr/local/go/bin' >> .bashrc
```

```cpp
source .bashrc
```

Vérifiez que Go est bien installé :

```cpp
go version
```

![](https://miro.medium.com/max/748/1*IMJC5iJXGe6U-a-T2z2yww.png)

Téléchargez le dépôt AvalancheGo :

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Configurez quelques variables globales sur votre VPS :

```cpp
echo 'export GOPATH=$HOME/go' >> .bashrc
```

```cpp
echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin'  >> .bashrc
```

```cpp
source ~/.bashrc
```

Allez dans le répértoire **avalanchego** :

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Compilez le binaire **avalanchego** :

```cpp
./scripts/build.sh
```

Créez un service pour gérer plus facilement votre noeud :

```cpp
sudo nano /etc/systemd/system/avalanchenode.service
```

copier coller le code ci-dessous, en modifiant le nom d’utilisateur si besoin \(4 fois\), surtout l’**IP de votre VPS** :

```cpp
[Unit]
Description=Avalanche Node service
After=network.target

[Service]
User=avalanche-user
Group=avalanche-user

WorkingDirectory=/home/avalanche-user/go/src/github.com/ava-labs/avalanchego
ExecStart=/home/avalanche-user/go/src/github.com/ava-labs/avalanchego/build/avalanchego --public-ip=VPS_IP

Restart=always
PrivateTmp=true
TimeoutStopSec=60s
TimeoutStartSec=10s
StartLimitInterval=120s
StartLimitBurst=5

[Install]
WantedBy=multi-user.target
```

Puis enregistrez avec **Ctrl+X**, **Y**, touche **Entrée**.

Activez le service :

```cpp
sudo systemctl enable avalanchenode
```

Lancez votre noeud :

```cpp
sudo systemctl start avalanchenode
```

Vérifiez que votre noeud s’est correctement initialisé :

```cpp
sudo systemctl status avalanchenode
```

![](https://miro.medium.com/max/1032/1*v--z6oiuTcbiZQ7yffmw3Q.png)

Lorsque le nœud démarre, il doit s’amorcer \(to bootstrap, rattraper le reste du réseau.\) Vous verrez des logs sur l’amorçage. Lorsqu’une chaîne donnée est amorcée, elle affiche des informations comme ça :

![](https://miro.medium.com/max/1637/1*2PDrSfoY1bzTk4S4nhFbJA.png)

Pour voir les logs en entier tapez \(touche **q** pour quitter\):

```cpp
sudo journalctl -u avalanchenode
```

Pour vérifier si une chaîne donnée est bootstrappée, appelez info.isBootstrappé de cette manière :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

si c’est la commande vous retourne **“isBootstrapped”:true** ,votre noeud est synchronizé avec le réseau Avalanche, sinon attendez quelques minutes

```cpp
{"jsonrpc":"2.0","result":{"isBootstrapped":true},"id":1}
```

Enfin! Vous voilà avec un noeud effective sur le réseau Avalanche!

![](https://miro.medium.com/max/448/0*0POowgcNwLvb48No.gif)

**Faites un backup de votre noeud pour pouvoir le réinstaller si nécessaire**

déconnectez-vous ou ouvrez un nouveau terminal et tapez cette commande \(en modifiant votre nom d’utilisateur et l’IP de votre VPS\) :

```cpp
scp -P 2221 avalanche-user@IP_VPS:".avalanchego/staking/staker.crt .avalanchego/staking/staker.key" .
```

Les fichiers **staker.crt** et **staker.key** se trouve désormais sur votre PC dans le répertoire de votre utilisateur.

La clé TLS \(staker.key\) détermine l’ID de votre nœud. Vous devez sauvegarder ce fichier \(et staker.crt\) dans un endroit sûr. La perte de votre clé de staking pourrait compromettre votre récompense de validation, car votre nœud aura un nouvel identifiant.

## Devenez validateur <a id="9c8d"></a>

Le réseau primaire est inhérent au réseau Avalanche et valide les chaînes [des blockchains intégrées d’Avalanche](../../../apprendre/presentation-du-systeme/).

Nous allons ajouter un nœud au réseau primaire Avalanche.

La Plateform-Chain \(P-Chain\) gère les métadonnées relatives au réseau Avalanche. Elle permet notamment de savoir quels nœuds sont dans quels sous-réseaux, quelles blockchains existent et quels sous-réseaux valident quelles blockchains. Pour ajouter un validateur, nous émettons des transactions à la chaîne P.

Notez qu’une fois que vous avez émis la transaction pour ajouter un nœud comme validateur, il n’est pas possible de modifier les paramètres. Vous ne pouvez pas vous retirer plus tôt ou modifier le montant de la mise, l’ID du nœud ou l’adresse de la récompense. Veuillez vous assurer que vous utilisez les valeurs correctes dans les appels API ci-dessous. Si vous n’êtes pas sûr, demandez de l’aide sur le [Telegram FR](https://t.me/Avalanche_fr).

### Ajouter un validateur avec le portefeuille <a id="181d"></a>

Tout d’abord, nous vous montrons comment ajouter votre nœud en tant que validateur en utilisant le portefeuille Web d’Avalanche.

Obtenez l’ID de votre nœud en appelant **info.getNodeID** :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

![](https://miro.medium.com/max/990/1*SSNOW5qMrKmLZNkHS-BDgQ.png)

Ouvrez le [portefeuille](https://wallet.avax.network/) et passez à l’onglet **Earns**.

Deux options s'offrent à vous, soit vous posséder au minimum 2000 AVAX sur la P-Chain \(locked\) et dans ce cas là passer directement à l'étape suivante \(**Add Validator**\). Soit vous possédez au minimum 2000 AVAX sur la X-Chain et vous avez besoin de les transférer sur la P-Chain afin de les staker.

**Transférer mes avax sur de la X-Chain à la P-Chain :**

![](../../../.gitbook/assets/image%20%2815%29.png)

Appuyez sur MAX ou choisissez le montant que vous souhaitez staker \(minimum 2000\) puis appuyer sur **CONFIRM** :

![](../../../.gitbook/assets/image%20%2811%29.png)

Si vous ne pouvez toujours pas stake vos jetons la transaction est peut-être bloquée pour cela aller dans l'onglet advanced de votre portefeuille et cliquez sur import P:

![](../../../.gitbook/assets/screenshot_71.png)

**Pour ajouter un validateur choisissez l'option Add Validator \(Validate\) dans l'onget Earn :**

![](https://miro.medium.com/max/1800/0*nLBBwxpufBQdQghu.png)

Remplissez les paramètres de staking, lorsque vous les avez vérifiés, cliquez sur **Confirmer**. Assurez-vous que la période de staking est d’au moins 2 semaines, que le taux des frais de délégation est d’au moins 2 % et que vous possédez au moins 2 000 AVAX.

Attention, veuillez rajouter une dizaine de minutes à la partie **Start Date & Time** pour être sûr ne pas être rattrapé par le temps.

![](https://miro.medium.com/max/1474/0*_wDE-AjmjgfqwtaH.png)

Vous devriez voir ce message de réussite et votre solde devrait être mis à jour.

![](https://miro.medium.com/max/1795/0*oRmh74o-tU78Glbo.png)

Une fois la transaction passée, vous verrez les récompenses que vous devriez gagner, ainsi que son heure de début, son heure de fin et le pourcentage de sa période de validation qui s’est écoulé.

![](https://miro.medium.com/max/1800/0*86Z5nFw51nPGoCSR.png)

Et voilà! Vous êtes désormais validateur du réseau Avalanche, félicitations !

![](https://miro.medium.com/max/198/0*L8yOQf6K41yh9c-W.gif)

## Pour aller plus loin / BONUS <a id="c218"></a>

### Mettre à jour son noeud <a id="49a2"></a>

Durant votre période de staking vous aurez certainement besoin de mettre à jour votre noeud, rien de plus simple grâce au service créé précédemment :

```cpp
sudo systemctl stop avalanchenode
```

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

```cpp
git pull
```

{% hint style="danger" %}
Si vous rencontrez cette erreur :

```text
error: Your local changes to the following files would be overwritten by merge: go.sum`
```

Tapez ces commandes :

```text
rm go.sum
git pull
```
{% endhint %}

```cpp
./scripts/build.sh
```

```cpp
sudo systemctl start avalanchenode
```

Vérifiez que vous avez la bonne version avec cet appel :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

cette commande vous retournera un message comme celui-ci, vérifier si tout est correct :

```cpp
{"jsonrpc":"2.0","result":{"version":"avalanche/1.0.1"},"id":1}
```

{% hint style="warning" %}
Si vous rencontrez cette erreur : **`-bash: cd: /src/github.com/ava-labs/avalanchego: No such file or directory`**

`Faites les commandes suivantes :`

```cpp
echo 'export GOPATH=$HOME/go' >> .bashrc
```

```cpp
echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin'  >> .bashrc
```

```cpp
source ~/.bashrc
```

Si vous rencontrez cette erreur :  
**./scripts/build.sh: line 9: go: command not found**

`Faites les commandes suivantes :`

```cpp
echo 'export PATH=$PATH:/usr/local/go/bin' >> .bashrc
```

```cpp
source .bashrc
```

puis reprendre à `./scripts/build.sh`

Si vous rencontrez cette erreur :  
**AvalancheGo requires Go &gt;= 1.15.5, Go 1.15.2 found.**

```cpp
cd /tmp
```

```cpp
wget https://golang.org/dl/go1.16.4.linux-amd64.tar.gz
```

```cpp
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.16.4.linux-amd64.tar.gz
```

```cpp
go version
```

puis reprendre à ****`cd $GOPATH/src/github.com/ava-labs/avalanchego`
{% endhint %}

Afin de monitorer votre noeud vous avez la possibilité d'installer htop ou bpytop, selon votre préférence graphique.

**Pour htop :**

```cpp
sudo apt install htop
```

```cpp
htop
```

![Interface graphique de htop](https://miro.medium.com/max/993/1*H4TU1LMZ9XExcxwRB4gMfQ.png)

**Pour bytop :**

```cpp
cd
```

```cpp
sudo apt install python3-pip make -y
```

```cpp
pip3 install psutil
```

```cpp
git clone https://github.com/aristocratos/bpytop.git
```

```cpp
cd bpytop
```

```cpp
sudo make install
```

```cpp
bpytop
```

![Interface graphique de bpytop](../../../.gitbook/assets/main.png)

### Installation et configuration du 2FA sur son VPS <a id="0cb7"></a>

En plus d’avoir un accès uniquement via clé privée, on peut aussi utiliser en plus de cela, la méthode 2FA via Google Auth, ce dernier est un logiciel de génération de mots de passe à usage unique permettant l’authentification à deux facteurs, développé par Google. Le logiciel fournit un nombre de 6 chiffres que l’utilisateur doit donner lors de son authentification, en plus de son pseudo et de son mot de passe.

```cpp
sudo apt install libpam-google-authenticator -y
```

Pour obtenir votre QR code, tapez la commande :

```cpp
google-authenticator
```

Une fois la commande exécutée, appuyez sur la touche **Y** de votre clavier et validez, le QR Code devrait s’afficher comme ci-dessous. Vous devez ensuite télécharger l’application Authy ou Google Authenticator sur mobile depuis l’App Store ou le Play Store. Une fois l’application téléchargée suivez les indications et scannez le QR code.

**ATTENTION**, veuillez stocker la clé secrète, le code diversification et les lignes où il y a marqué **emergency**. Nous vous conseillons de stocker ces informations dans un support sécurisé et non connecté a internet , car en cas de perte de votre téléphone, ces informations seront le seul moyen de retrouver vos accès.

Activer l’option 2FA **:**

```cpp
sudo nano /etc/pam.d/sshd
```

Ajoutez cette ligne tout en haut du fichier :

```cpp
auth [success=done new_authtok_reqd=done default=die] pam_google_authenticator.so nullok
```

Nous terminons comme d’habitude par enregistrer les modifications apportées, et en relançant le ssh, afin que tout soit mis a jour au niveau du système, pour cela entrez la commande :

```cpp
sudo systemctl restart ssh
```

