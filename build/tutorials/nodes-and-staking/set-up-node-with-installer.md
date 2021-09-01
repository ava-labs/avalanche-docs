# Exécuter un nœud Avalanche en utilisant le script d'installation

Nous avons un script en shell \(bash\) qui installe AvalancheGo sur votre ordinateur. Ce script met en place un nœud complet et exécutant en quelques minutes avec une entrée minimale requise par l'utilisateur.

## Avant de commencer

Ce script d'installation suppose :

* OS : Ubuntu 18.04 ou 20.04 \(désolé, MacOS et Windows qui ne sont pas encore pris en charge\)
* AvalancheGo n'est pas en cours d'exécution et n'est pas déjà installé comme service
* L'utilisateur qui exécute le script a des privilèges de super-utilisateur \(peut s'exécuter `sudo`\)

### Considérations sur l'environnement

Si vous exécutez une saveur différente de Linux, le script ne fonctionne pas comme prévu. Il suppose que l'utilisation `systemd`est faite pour exécuter les services du système. D'autres saveurs Linux peuvent utiliser autre chose, ou peuvent avoir des fichiers dans des endroits différents que ce qui est supposé par le script.

Si vous avez un nœud qui fonctionne déjà sur l'ordinateur, arrêtez-le avant d'exécuter le script.

#### Nœud qui fonctionne depuis le terminal

Si votre nœud est en cours d'exécution dans un terminal arrêtez-le en appuyant sur `ctrl+C`.

#### Nœud fonctionnant comme service

Si votre nœud est déjà en cours d'exécution comme un service, alors vous n'avez probablement pas besoin de ce script. Vous êtes content d'y aller.

#### Nœud en arrière-plan

Si votre nœud est en cours d'exécution en arrière-plan \(en s'exécutant avec `nohup`, par exemple\) , trouvez le processus en exécutant le nœud en exécutant `ps aux | grep avalanche`. Cela produira une sortie comme:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Recherchez une ligne qui n'a pas `grep`sur elle. Dans cet exemple, c'est la deuxième ligne. Il montre des informations sur votre nœud. Notez le processus id, dans ce cas, `2630`. Arrêtez le nœud en s'exécutant `kill -2 2630`.

#### Fichiers de travail des nœuds

Si vous avez précédemment lancé un nœud AvalancheGo sur cet ordinateur, vous aurez des fichiers de nœuds locaux stockés dans le `$HOME/.avalanchego`répertoire. Ces fichiers ne seront pas dérangés, et le nœud configuré par le script continuera à fonctionner avec la même identité et l'état qu'il avait auparavant. Cela dit, pour la sécurité, la sauvegarde et `staker.crt`les fichiers de votre nœud, trouvés et `staker.key`stockés dans `$HOME/.avalanchego/staking`un endroit sûr. Vous pouvez utiliser ces fichiers pour recréer votre nœud sur un ordinateur différent si vous le devez jamais. Consultez ce [tutoriel](node-backup-and-restore.md) pour la procédure de sauvegarde et de restauration.

### Considérations de réseau

Pour fonctionner avec succès, AvalancheGo doit accepter les connexions de l'Internet sur le port réseau `9651`. Avant de procéder à l'installation, vous devez déterminer l'environnement de réseau que votre nœud s'exécutera.

#### Exécuter sur un fournisseur de cloud

Si votre nœud s'exécute sur une instance informatique de fournisseur de cloud, il aura une IP statique. Découvrez ce que est cette IP statique, ou configurez-la si vous ne l'avez pas déjà fait. Le script tentera de trouver la IP par lui-même, mais qui ne fonctionne pas dans tous les environnements, vous devrez donc vérifier la IP ou l'entrer vous-même.

#### Exécuter sur une connexion à domicile

Si vous exécutez un nœud sur un ordinateur qui est sur une connexion Internet résidentielle, vous avez une IP dynamique, c'est-à-dire que votre IP changera périodiquement. Le script d'installation configurera le nœud de manière appropriée pour cette situation. Mais, pour une connexion à la maison, vous devrez configurer l'expédition de port en entrée de port `9651`de l'internet à l'ordinateur sur lequel le nœud est installé.

Comme il y a trop de modèles et de configurations de routeurs, nous ne pouvons pas fournir des instructions sur ce que nous devons faire, mais il y a des guides en ligne à trouver \(comme [ceci](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), ou [cela\),](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) et le support de votre fournisseur de services peut aider aussi.

## Exécuter le script

Donc, maintenant que vous avez préparé votre système et que vous avez les informations prêtes, let's à elle.

Pour télécharger et exécuter le script, entrez les suivants dans le terminal :

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

Et nous sommes en dehors ! La sortie devrait ressembler à quelque chose de ce genre :

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

Et puis le script vous invitera à obtenir des informations sur l'environnement du réseau :

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

entrez `1`si vous avez une IP dynamique et `2`si vous avez une IP statique. Si vous êtes sur une IP statique, il essaiera de détecter automatiquement la IP et de demander une confirmation.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

`y`Confirmez avec , ou `n`si la IP détectée est fausse \(ou vide\) et entrez ensuite la bonne IP à la prochaine invitée.

Le script continuera ensuite avec la création de service système et se terminera avec le démarrage du service.

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

Le script est terminé, et vous devez voir le système s'invite à nouveau.

## Après installation

AvalancheGo devrait être en arrière-plan en tant que service. Vous pouvez vérifier qu'il est en cours de fonctionnement avec :

```bash
sudo systemctl status avalanchego
```

Cela imprimera les plus récents journaux du nœud, qui devraient ressembler à ce qui suit :

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

Notez que ce `active (running)`qui indique que le service est en cours d'exécution ok. Vous pouvez avoir besoin d'appuyer sur la presse `q`pour revenir à l'invite de commande.

Pour connaître votre NodeID, qui est utilisé pour identifier votre nœud au réseau, exécutez la commande suivante :

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

Il produira une sortie comme :

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

Préparez-vous `NodeID-`à la valeur d'obtenir, par exemple, .`NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY` Stockez ce qu'il faudra pour staker ou regarder votre nœud.

Votre nœud devrait être en train de bootstrapping maintenant. Vous pouvez surveiller les progrès en délivrant la commande suivante :

```bash
sudo journalctl -u avalanchego -f
```

Appuyez sur la question `ctrl+C`lorsque vous souhaitez arrêter de lire la sortie des nœuds.

## Arrêter le nœud

Pour arrêter AvalancheGo, cours :

```bash
sudo systemctl stop avalanchego
```

Pour le recommencer, exécutez:

```bash
sudo systemctl start avalanchego
```

## Mise à niveau des nœuds

AvalancheGo est un projet en cours et des mises à jour régulières de version. La plupart des mises à jour sont recommandées, mais pas nécessaires. Un préavis est donné pour les mises à niveau qui ne sont pas compatibles en arrière. Lorsqu'une nouvelle version du nœud est publiée, vous remarquerez des lignes de journal comme :

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Il est recommandé de toujours mettre à jour la dernière version, parce que les nouvelles versions apportent des corrections de bogues, de nouvelles fonctionnalités et des mises à jour.

Pour mettre à jour votre nœud, il suffit de lancer à nouveau le script d'installateur :

```bash
./avalanchego-installer.sh
```

Il détectera que vous avez déjà installé AvalancheGo

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Il mettra à jour votre nœud vers la dernière version, et après qu'il aura été fait, démarrez le nœud en sauvegarde, et imprimera les informations sur la dernière version :

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Configuration des nœuds

Fichier qui configure l'exploitation des nœuds est `~/.avalanchego/configs/node.json`. Vous pouvez l'éditer pour ajouter ou modifier les options de configuration. La documentation des options de configuration peut être trouvée [ici](../../references/command-line-interface.md). La configuration par défaut peut ressembler à ceci :

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

Notez que le fichier de configuration doit être un fichier formaté correctement, de sorte que les commutateurs sont formatés différemment que pour la ligne de `JSON`commande, de sorte que n'entrez pas d'options comme `--dynamic-public-ip=opendns`mais comme dans l'exemple ci-dessus.

## Utiliser une version précédente

Le script d'installation peut également être utilisé pour installer une version of autre que la dernière version.

Pour voir une liste des versions disponibles pour l'installation, exécuter :

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

Pour installer une version spécifique, exécutez le script avec `--version`suivi de la tag de la version. Par exemple:

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% hint style="danger" %}Notez que toutes les versions that ne sont pas compatibles. Vous devez généralement exécuter la dernière version. L'exécution d'une version autre que la dernière peut conduire à votre nœud à ne pas fonctionner correctement et, pour les validateurs, à ne pas recevoir de récompense en jalonnement.{% endhint %}

Merci à [Jean Zundel](https://github.com/jzu) pour l'inspiration et l'aide à la mise en œuvre du support pour l'installation des versions de nœuds non récentes.

## Réinstaller et mise à jour de script

Le script d'installation est mis à jour de temps à autre, avec de nouvelles fonctionnalités et de nouvelles capacités ajouté. Pour profiter des nouvelles fonctionnalités ou pour récupérer des modifications qui ont fait échouer le nœud, vous pouvez vouloir réinstaller le nœud. Pour ce faire, récupérez la dernière version du script du web avec :

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

Après la mise à jour du script, exécutez-le de nouveau avec l'argument de la ligne de `--reinstall`commande :

```bash
./avalanchego-installer.sh --reinstall
```

Cela supprimera le fichier de service existant et exécutera l'installateur de zéro, comme il a été démarré pour la première fois. Notez que la base de données et le NodeID seront laissés intacts.

## Et ensuite ?

C'est tout, vous exécutez un nœud AvalancheGo ! Félicitations ! Faites-nous savoir que vous l'avez fait sur notre [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) ou [Reddit](https://t.me/avalancheavax) !

Si vous êtes sur un réseau résidentiel \(IP dynamique\), n'oubliez pas de configurer l'expédition de port. Si vous êtes sur un fournisseur de services cloud, vous êtes heureux d'y aller.

Maintenant vous pouvez [interagir avec votre](../../avalanchego-apis/issuing-api-calls.md) nœud, [piquer vos jetons](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md) ou niveler votre installation en créant une [surveillance des nœuds](setting-up-node-monitoring.md) pour obtenir une meilleure compréhension de ce que votre nœud fait. En outre, vous pourriez vouloir utiliser notre [collection Postman](../../tools/postman-avalanche-collection.md) pour délivrer plus facilement des commandes à votre nœud.

Enfin, si vous n'avez pas déjà fait, il est une bonne idée de [sauvegarder](node-backup-and-restore.md) les fichiers importants au cas où vous avez besoin de restaurer votre nœud sur une machine différente.

Si vous avez des questions ou que vous avez besoin d'aide, n'hésitez pas à nous contacter sur notre serveur [Discord](https://chat.avalabs.org/).

