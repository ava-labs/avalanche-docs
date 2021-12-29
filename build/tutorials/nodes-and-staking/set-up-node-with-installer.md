# Exécuter un nœud Avalanche à l'aide du Script d'installation

Nous avons un script shell (bash) qui installe AvalancheGo sur votre ordinateur. Ce script met en place un nœud complet et fonctionnel en quelques minutes, avec un minimum de saisie de la part de l'utilisateur.

## Avant de commencer

Avalanche est un protocole incroyablement léger, donc les nœuds peuvent fonctionner sur le matériel standard. Notez qu'à mesure que l'utilisation du réseau augmente, les exigences matérielles peuvent changer.

* UC : Équivalent de 8 AWS vCPU
* RAM : 16 Go
* Stockage : 200 Go
* SE : Ubuntu 18.04/20.04 ou MacOS >= Catalina

Ce script d'installation suppose :

* AvalancheGo n'est pas en cours d'exécution et n'est pas déjà installé en tant que service.
* L'utilisateur exécutant le script a des privilèges superutilisateur (peut exécuter `sudo`)

### Considérations sur l'environnement

Si vous exécutez une autre version de Linux, le script peut ne pas fonctionner comme prévu. Cela suppose que `systemd` est utilisé pour exécuter les services du système. D'autres versions de Linux peuvent utiliser quelque chose d'autre, ou peuvent avoir des fichiers dans des endroits différents de ceux supposés par le script.

Si vous avez déjà un nœud en cours d'exécution sur l'ordinateur, arrêtez-le avant d'exécuter le script.

#### Nœud en cours d'exécution du terminal

Si votre nœud fonctionne dans un terminal, arrêtez-le en appuyant sur `ctrl+C`.

#### Nœud en cours d'exécution comme un service

Si votre nœud fonctionne déjà comme un service, vous n'avez probablement pas besoin de ce script. Vous pouvez y aller.

#### Nœud en cours d'exécution en arrière-plan

Si votre nœud fonctionne en arrière-plan (en exécutant avec `nohup`, par exemple) , trouvez le processus en exécutant le nœud en exécutant `ps aux | grep avalanche`. Cela produira un résultat comme :

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Recherchez la ligne qui n'a pas de `grep`. Dans cet exemple, c'est la deuxième ligne. Elle montre des informations sur votre nœud. Notez l'ID du processus, dans ce cas, `2630`. Arrêtez le nœud en exécutant `kill -2 2630`.

#### Fichiers de travail du nœud

Si vous avez précédemment exécuté un nœud AvalancheGo sur cet ordinateur, vous aurez des fichiers de nœud locaux stockés dans le répertoire `$HOME/.avalanchego`. Ces fichiers ne seront pas dérangés, et le nœud mis en place par le script continuera à fonctionner avec la même identité et le même état qu'auparavant. Ceci étant dit, pour la sécurité de votre nœud, sauvegardez les fichiers `staker.crt` et `staker.key` files, trouvés dans `$HOME/.avalanchego/staking` et stockez-les dans un endroit sûr. Vous pouvez utiliser ces fichiers pour recréer votre nœud sur un autre ordinateur si vous en avez besoin. Consultez ce [tutoriel](node-backup-and-restore.md) pour obtenir la procédure de sauvegarde et de restauration.

### Considérations sur le réseau

Pour fonctionner correctement, AvalancheGo doit accepter les connexions d'Internet sur le port du réseau `9651`. Avant de procéder à l'installation, vous devez déterminer l'environnement réseau dans lequel votre nœud fonctionnera.

#### Exécuter sur un fournisseur de cloud

Si votre nœud fonctionne sur une instance d'ordinateur du fournisseur de cloud, il aura une IP statique. Découvrez ce qu'est cette IP statique, ou configurez-la si vous ne l'avez pas déjà fait. Le script essaiera de trouver l'IP par lui-même, mais cela peut ne pas fonctionner dans tous les environnements, donc vous devez vérifier l'IP ou la saisir vous-même.

#### Exécuter sur une connexion à domicile

Si vous exécutez un nœud sur un ordinateur qui est sur une connexion Internet résidentielle, vous avez une IP dynamique ; c'est-à-dire que votre IP changera périodiquement. Le script d'installation configurera le nœud de manière appropriée pour cette situation. Mais, pour une connexion à domicile, vous devrez configurer le transfert de port entrant du port `9651` d'Internet à l'ordinateur sur lequel le nœud est installé.

Comme il y a trop de modèles et de configurations de routeurs, nous ne pouvons pas fournir d'instructions sur ce qu'il faut faire exactement, mais il existe des guides en ligne (comme [ce](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), ou [ce](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) ), et l'assistance de votre fournisseur de services pourrait également vous aider.

## Exécuter le script

Maintenant que vous avez préparé votre système et que les informations sont prêtes, passons à l'action.

Pour télécharger et exécuter le script, entrez ce qui suit dans le terminal :

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

Et c'est parti ! Le résultat devrait ressembler à ceci :

```text
AvalancheGo installer
---------------------
Preparing environment...
Found arm64 architecture...
Looking for the latest arm64 build...
Will attempt to download:
 https://github.com/ava-labs/avalanchego/releases/download/v1.1.1/avalanchego-linux-arm64-v1.1.1.tar.gz
avalanchego-linux-arm64-v1.1.1.tar.gz 100%[=========================================================================>]  29.83M  75.8MB/s    in 0.4s
2020-12-28 14:57:47 URL:https://github-production-release-asset-2e65be.s3.amazonaws.com/246387644/f4d27b00-4161-11eb-8fb2-156a992fd2c8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201228%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201228T145747Z&X-Amz-Expires=300&X-Amz-Signature=ea838877f39ae940a37a076137c4c2689494c7e683cb95a5a4714c062e6ba018&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=246387644&response-content-disposition=attachment%3B%20filename%3Davalanchego-linux-arm64-v1.1.1.tar.gz&response-content-type=application%2Foctet-stream [31283052/31283052] -> "avalanchego-linux-arm64-v1.1.1.tar.gz" [1]
Unpacking node files...
avalanchego-v1.1.1/plugins/
avalanchego-v1.1.1/plugins/evm
avalanchego-v1.1.1/avalanchego
Node files unpacked into /home/ubuntu/avalanche-node
```

Ensuite, le script vous demandera des informations sur l'environnement du réseau :

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

entrez `1` si vous avez une IP dynamique et `2` si vous avez une IP statique. Si vous êtes sur une IP statique, il essaiera de détecter automatiquement l'IP et demandera une confirmation.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

Confirmez avec `y`, ou `n` si l'IP détectée est fausse (ou vide), puis entrez l'IP correcte à l'invite suivante.

Le script continuera ensuite avec la création du service du système et terminera avec le démarrage du service.

```text
Installing service with public IP: 3.15.152.14
Created symlink /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

Done!

Your node should now be bootstrapping on the main net.
Node configuration file is /home/ubuntu/.avalanchego/configs/node.json
To check that the service is running use the following command (q to exit):
sudo systemctl status avalanchego
To follow the log use (ctrl+C to stop):
sudo journalctl -u avalanchego -f

Reach us over on https://chat.avax.network if you're having problems.
```

Le script est terminé, et vous devriez revoir l'invite du système.

## Publier une installation

AvalancheGo devrait fonctionner en arrière-plan comme un service. Vous pouvez vérifier qu'il fonctionne avec :

```bash
sudo systemctl status avalanchego
```

Cela imprimera les derniers journaux du nœud, ce qui devrait ressembler à ceci :

```text
● avalanchego.service - AvalancheGo systemd service
Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2021-01-05 10:38:21 UTC; 51s ago
Main PID: 2142 (avalanchego)
Tasks: 8 (limit: 4495)
Memory: 223.0M
CGroup: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --dynamic-public-ip=opendns --http-host=

Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/vms/platformvm/vm.go#322: initializing last accepted block as 2FUFPVPxbTpKNn39moGSzsmGroYES4NZRdw3mJgNvMkMiMHJ9e
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/snow/engine/snowman/transitive.go#58: initializing consensus engine
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#143: adding route /ext/bc/11111111111111111111111111111111LpoYY
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#88: HTTP API server listening on ":9650"
Jan 05 10:38:58 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:58] <P Chain> avalanchego/snow/engine/common/bootstrapper.go#185: Bootstrapping started syncing with 1 vertices in the accepted frontier
Jan 05 10:39:02 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:02] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 2500 blocks
Jan 05 10:39:04 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:04] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 5000 blocks
Jan 05 10:39:06 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:06] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 7500 blocks
Jan 05 10:39:09 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:09] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 10000 blocks
Jan 05 10:39:11 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:11] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 12500 blocks
```

Remarquez le `active (running)` qui indique que le service fonctionne correctement. Vous devrez peut-être appuyer sur `q` pour revenir à l'invite de commande.

Pour connaître votre NodeID, qui est utilisé pour identifier votre nœud au réseau, exécutez la commande suivante :

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

Il produira des résultats comme :

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

Préfixez `NodeID-` à la valeur pour obtenir, par exemple, `NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`. Conservez-le ; vous en aurez besoin pour le staking ou la recherche de votre nœud.

Votre nœud devrait être en cours d'amorçage maintenant. Vous pouvez surveiller les progrès en émettant la commande suivante :

```bash
sudo journalctl -u avalanchego -f
```

Appuyez sur `ctrl+C` lorsque vous souhaitez arrêter de lire la sortie du nœud.

## Arrêter le nœud

Pour arrêter AvalancheGo, exécutez :

```bash
sudo systemctl stop avalanchego
```

Pour le redémarrer, exécutez :

```bash
sudo systemctl start avalanchego
```

## Mise à niveau du nœud

AvalancheGo est un projet en cours et il y a régulièrement des mises à jour de la version. La plupart des mises à niveau sont recommandées, mais pas requises. Un préavis sera donné pour les mises à niveau qui ne sont pas rétrocompatibles. Lorsqu'une nouvelle version du nœud est publiée, vous remarquerez des lignes de journal comme :

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Il est recommandé de toujours mettre à niveau à la dernière version, parce que de nouvelles versions apportent des corrections, de nouvelles fonctionnalités et des mises à jour.

Pour mettre à niveau votre nœud, il suffit d'exécuter à nouveau le script d'installation :

```bash
./avalanchego-installer.sh
```

Il détectera que vous avez déjà installé AvalancheGo :

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Il mettra ensuite votre nœud à niveau vers la dernière version, et après avoir terminé, il redémarrera le nœud et imprimera les informations sur la dernière version :

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Configuration du nœud

Le fichier qui configure l'opération du nœud est `~/.avalanchego/configs/node.json`. Vous pouvez le modifier pour ajouter ou modifier les options de configuration. La documentation des options de configuration se trouve [ici](../../references/command-line-interface.md). La configuration par défaut peut ressembler à ceci :

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

Notez que le fichier de configuration doit être un fichier correctement formaté `JSON`, les commutateurs sont formatés différemment de ceux de la ligne de commande, donc n'entrez pas d'options comme `--dynamic-public-ip=opendns`, mais comme dans l'exemple ci-dessus.

## Utilisation d'une version précédente

Le script d'installation peut également être utilisé pour installer une version d'AvalancheGo autre que la dernière version.

Pour voir une liste des versions disponibles pour l'installation, exécutez :

```bash
./avalanchego-installer.sh --list
```

Il imprimera une liste, quelque chose comme :

```text
AvalancheGo installer
---------------------
Available versions:
v1.3.2
v1.3.1
v1.3.0
v1.2.4-arm-fix
v1.2.4
v1.2.3-signed
v1.2.3
v1.2.2
v1.2.1
v1.2.0
```

Pour installer une version spécifique, exécutez le script avec `--version` suivi de l'étiquette de la version. Par exemple,

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% hint style="danger" %}
Notez que toutes les versions d'AvalancheGo ne sont pas compatibles. Vous devez généralement exécuter la dernière version. L'utilisation d'une version différente de la dernière peut entraîner un mauvais fonctionnement de votre nœud et, pour les validateurs, ne pas recevoir de récompense du staking.
{% endhint %}

Merci au membre de la communauté [Jean Zundel](https://github.com/jzu) pour l'inspiration et l'aide à la mise en place d'un support pour l'installation de versions de nœuds non récentes.

## Réinstaller et mettre à jour le script

Le script d'installation est mis à jour de temps en temps, avec l'ajout de nouvelles fonctionnalités et capacités. Pour profiter des nouvelles fonctionnalités ou pour récupérer des modifications qui ont fait échouer le nœud, vous voudrez peut-être réinstaller le nœud. Pour ce faire, récupérez la dernière version du script du web avec :

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

Après la mise à jour, réexécutez-le avec l'argument de la ligne de commande `--reinstall` :

```bash
./avalanchego-installer.sh --reinstall
```

Cela supprimera le fichier de service existant et exécutera le programme d'installation à partir de zéro, comme s'il avait été lancé pour la première fois. Notez que la base de données et le NodeID seront laissés intacts.

## Et ensuite ?

C'est tout, vous exécutez un nœud AvalancheGo ! Félicitations ! Faites-nous savoir que vous l'avez fait sur notre [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) ou [Reddit](https://t.me/avalancheavax) !

Si vous êtes sur un réseau résidentiel (IP dynamique), n'oubliez pas de configurer la redirection du port. Si vous êtes sur un fournisseur de services en nuage, vous pouvez y aller.

Maintenant vous pouvez [interagir avec votre nœud](../../avalanchego-apis/issuing-api-calls.md), [staker vos jetons](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md) ou mettre à niveau votre installation en configurant la [surveillance du nœud](setting-up-node-monitoring.md) pour avoir un meilleur aperçu de ce que fait votre nœud. En outre, vous pouvez utiliser notre [collection Postman](../../tools/postman-avalanche-collection.md) pour émettre plus facilement des commandes à votre nœud.

Enfin, si vous ne l'avez pas encore fait, c'est une bonne idée de [sauvegarder](node-backup-and-restore.md) les fichiers importants au cas où vous auriez besoin de restaurer votre nœud sur une autre machine.

Si vous avez des questions ou besoin d'aide, n'hésitez pas à nous contacter sur notre serveur [Discord](https://chat.avalabs.org/).

