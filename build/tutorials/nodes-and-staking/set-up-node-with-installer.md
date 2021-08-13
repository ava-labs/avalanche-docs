# Exécuter un nœud avalanche à l'aide du Script d'installation

Nous avons un script shell \(bash\) qui installe AvalancheGo sur votre ordinateur. Ce script configure plein, noeud d'exécution en quelques minutes avec une entrée minimale de l'utilisateur requise.

## Avant de commencer

Ce script d'installation suppose:

* OS: Ubuntu 18.04 ou 20.04 \(désolé, MacOS et Windows pas encore supporté\)
* AvalancheGo n'est pas en cours d'exécution et pas déjà installé comme service
* L'utilisateur exécutant le script a des privilèges de superutilisateur \(peut exécuter `sudo`\)

### Considérations environnementales

Si vous exécutez une saveur différente de Linux, le script pourrait ne pas fonctionner comme prévu. Il suppose que `systemd` est utilisé pour exécuter les services système. D'autres saveurs Linux pourraient utiliser autre chose, ou avoir des fichiers dans des endroits différents que ce qui est supposé par le scénario.

Si vous avez un noeud déjà courant sur l'ordinateur, arrêtez-le avant d'exécuter le script.

#### Node courant du terminal

Si votre noeud fonctionne dans un terminal l'arrêter en appuyant sur `ctrl+C`.

#### Node courant comme service

Si votre noeud fonctionne déjà comme un service, vous n'avez probablement pas besoin de ce script. Vous êtes bon d'y aller.

#### Node courant dans l'arrière-plan

Si votre noeud fonctionne dans l'arrière-plan \(en exécutant avec `nohup`, par exemple\) puis trouvez le processus exécutant le noeud en exécutant `ps aux | grep avalanche`. Cela produira la sortie comme:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Recherchez la ligne qui n'a pas `grep` dessus. Dans cet exemple, c'est la deuxième ligne. Il montre des informations sur votre nœud. Notez le processus id, dans ce cas, `2630`. Arrêtez le nœud en exécutant `tuer -2 2630`.

#### Fichiers de travail des noeuds

Si vous avez précédemment lancé un noeud AvalancheGo sur cet ordinateur, vous aurez des fichiers noeud locaux stockés dans `AvalancheGo` répertoire. Ces fichiers ne seront pas perturbés, et le noeud configuré par le script continuera l'opération avec la même identité et l'état qu'il avait auparavant. Cela étant dit, pour la sécurité de votre node's sauvegardez `les` fichiers `staker.crt` et security, trouvés dans `staker.crt` et les stockez quelque part sûr. Vous pouvez utiliser ces fichiers pour recréer votre noeud sur un ordinateur différent si vous avez besoin de le faire. Consultez ce [tutoriel](node-backup-and-restore.md) pour la procédure de sauvegarde et de restauration.

### Considérations de réseautage

Pour fonctionner avec succès, AvalancheGo doit accepter les connexions à partir d'Internet sur le port réseau `9651`. Avant de procéder à l'installation, vous devez déterminer l'environnement de réseautage que votre noeud fonctionnera.

#### Exécuter sur un fournisseur de nuages

Si votre noeud fonctionne sur une instance informatique de fournisseur de cloud, il aura une IP statique. Découvrez ce que cette IP statique, ou configurez-la si vous n'avez pas déjà fait. Le script va essayer de trouver l'IP par lui-même, mais cela pourrait ne pas fonctionner dans tous les environnements, vous aurez donc besoin de vérifier l'IP ou de l'entrer vous-même.

#### Exécuter sur une connexion à la maison

Si vous exécutez un noeud sur un ordinateur qui se trouve sur une connexion Internet résidentielle, vous avez une IP dynamique; c'est-à-dire que votre IP changera périodiquement. Le script d'installation configurera le noeud de manière appropriée pour cette situation. Mais, pour une connexion à domicile, vous aurez besoin de configurer le transfert du port entrée du port `9651` de l'internet à l'ordinateur que le noeud est installé sur.

Comme il y a trop de modèles et configurations de routeur, nous ne pouvons pas fournir des instructions sur ce que vous devez faire, mais il y a des guides en ligne à trouver \(comme [ceci](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), ou [ceci](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) \), et votre soutien fournisseur de services pourrait vous aider trop.

## Exécuter le script

Donc, maintenant que vous avez préparé votre système et que l'information est prête, nous allons à elle.

Pour télécharger et exécuter le script, entrez les éléments suivants dans le terminal :

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

Et nous sommes partis ! La sortie devrait ressembler à quelque chose comme ceci:

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

Et puis le script vous invite à obtenir des informations sur l'environnement réseau:

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

entrez `1` si vous avez une IP dynamique, et `2` si vous avez une IP statique. Si vous êtes sur une IP statique, il va essayer de détecter l'IP et demander la confirmation.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

Confirmez avec `y`, ou `n` si l'IP détectée est erronée \(ou vide\), puis entrez la bonne IP à l'invite suivante.

Le script continuera ensuite avec la création du service système et terminera avec le démarrage du service.

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

Le script est terminé, et vous devriez voir le système invite à nouveau.

## Post installation

AvalancheGo devrait être en cours de fonctionnement en arrière-plan comme un service. Vous pouvez vérifier qu'il fonctionne avec:

```bash
sudo systemctl status avalanchego
```

Cela va imprimer les derniers logs, qui devraient ressembler à ceci:

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

Notez `l'active (exécution)` qui indique que le service est exécuté. Vous pourriez avoir besoin d'appuyer `sur q` pour retourner à l'invite de commande.

Pour connaître votre NodeID, qui est utilisé pour identifier votre noeud au réseau, lancez la commande suivante:

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

Il produira la sortie comme:

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

Prepend `NodeID-` à la valeur d'obtenir, par exemple, `NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`. Stockez cela; il sera nécessaire pour la mise en marche ou la recherche de votre nœud.

Votre noeud devrait être en cours de bootstrapping maintenant. Vous pouvez surveiller les progrès en délivrant la commande suivante:

```bash
sudo journalctl -u avalanchego -f
```

Appuyez sur `ctrl+C` lorsque vous souhaitez cesser la lecture de sortie du nœud.

## Arrêter le noeud

Pour arrêter AvalancheGo, cours:

```bash
sudo systemctl stop avalanchego
```

Pour recommencer:

```bash
sudo systemctl start avalanchego
```

## Mise à niveau de noeud

AvalancheGo est un projet en cours et il y a des mises à jour régulières de version. La plupart des mises à niveau sont recommandées, mais pas requis. Un préavis sera donné pour les mises à niveau qui ne sont pas compatibles vers l'arrière. Lorsqu'une nouvelle version du noeud est libérée, vous remarquerez les lignes logg comme:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Il est recommandé de toujours mettre à niveau la dernière version, parce que de nouvelles versions apportent des corrections de bugs, de nouvelles fonctionnalités et mises à niveau.

Pour mettre à niveau votre nœud, il suffit d'exécuter le script d'installation à nouveau:

```bash
./avalanchego-installer.sh
```

Il détectera que vous avez déjà AvalancheGo installé:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Il va ensuite mettre votre noeud à la dernière version, et après qu'il aura été fait, démarrez le noeud en arrière, et imprimer les informations sur la dernière version:

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Configuration des nœuds

Fichier qui configure l'opération des noeuds est `~/.avalanchego/configs/node.json`. Vous pouvez l'éditer pour ajouter ou modifier les options de configuration. La documentation des options de configuration peut être trouvée [ici](../../references/command-line-interface.md). La configuration par défaut peut ressembler à ceci :

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

Notez que le fichier de configuration doit être un fichier `properly` formaté, donc les commutateurs sont formatés différemment que pour la ligne de commande, donc n'entrez pas d'options comme `--dynamic-public-ip=opendns` mais comme dans l'exemple ci-dessus.

## Utilisation d'une version précédente

Le script d'installation peut également être utilisé pour installer une version of autre que la dernière version.

Pour voir une liste des versions disponibles pour l'installation, exécutez:

```bash
./avalanchego-installer.sh --list
```

Il imprimera une liste, quelque chose comme:

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

Pour installer une version spécifique, exécutez le script avec `--version` suivi par la balise de la version. Par exemple:

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% allusion style="danger,%} Notez que toutes les versions AvalancheGo ne sont pas compatibles. Vous devriez généralement exécuter la dernière version. Exécuter une version autre que la dernière peut conduire à votre noeud ne pas fonctionner correctement et, pour les validateurs, ne pas recevoir une récompense de jalonnement. {% endhint %}

Merci à [Jean Zundel](https://github.com/jzu) membre de la communauté pour l'inspiration et aider à la mise en œuvre du support pour l'installation des versions non-latest nœuds.

## Réinstaller et mise à jour de script

Le script d'installation est mis à jour de temps en temps, avec de nouvelles fonctionnalités et capacités ajoutées. Pour profiter des nouvelles fonctionnalités ou de récupérer des modifications qui ont fait le noeud échoué, vous pouvez vouloir réinstaller le noeud. Pour ce faire, récupérez la dernière version du script du web avec:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

Après que le script a mis à jour, lance-le à nouveau avec l'argument `--réinstaller` la ligne de commande :

```bash
./avalanchego-installer.sh --reinstall
```

Cela supprimera le fichier de service existant, et exécutera l'installateur à partir de zéro, comme il a été commencé pour la première fois. Notez que la base de données et NodeID seront laissés intacts.

## Et après?

C'est ça, vous dirigez un noeud AvalancheGo ! Félicitations! Faites-nous savoir que vous l'avez fait sur notre [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) ou [Reddit](https://t.me/avalancheavax)!

Si vous êtes sur un réseau résidentiel \(dynamic n'oubliez pas de configurer l'expédition portuaire. Si vous êtes sur un fournisseur de services cloud, vous êtes bon d'y aller.

Maintenant, vous pouvez [interagir avec votre nœud](../../avalanchego-apis/issuing-api-calls.md), [mettre vos](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md) jetons, ou mettre votre installation en niveau en configurant [la surveillance de](setting-up-node-monitoring.md) nœud pour obtenir une meilleure compréhension de ce que votre nœud fait. Aussi, vous pourriez vouloir utiliser notre [collection Postman](../../tools/postman-avalanche-collection.md) pour délivrer plus facilement des commandes à votre nœud.

Enfin, si vous n'avez pas déjà, il est une bonne idée de [sauvegarder](node-backup-and-restore.md) des fichiers importants au cas où vous avez jamais besoin de restaurer votre noeud à une autre machine.

Si vous avez des questions, ou avez besoin d'aide, n'hésitez pas à nous contacter sur notre serveur [Discord](https://chat.avalabs.org/).

