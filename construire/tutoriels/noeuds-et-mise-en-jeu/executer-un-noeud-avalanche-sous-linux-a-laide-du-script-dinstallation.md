# Exécuter un nœud Avalanche sous Linux à l'aide du script d'installation

Nous avons un script shell \(bash\) qui installe AvalancheGo sur votre ordinateur. Ce script configure un nœud complet et en cours d'exécution en quelques minutes avec une entrée utilisateur minimale requise.

## Avant de commencer

Ce script d'installation suppose: OS:

* Ubuntu 18.04 ou 20.04 \(désolé, MacOS et Windows ne sont pas encore pris en charge\)
* AvalancheGo n'est pas en cours d'exécution et n'est pas déjà installé en tant que service
* L'utilisateur exécutant le script a les privilèges de superutilisateur \(peut exécuter `sudo`\)

### Considérations environnementales

Si vous exécutez une autre version de Linux, le script risque de ne pas fonctionner comme prévu. Il suppose que `systemd` est utilisé pour exécuter les services système. D'autres versions de Linux peuvent utiliser autre chose ou peuvent avoir des fichiers à des endroits différents de ceux supposés par le script.

Si un nœud est déjà en cours d'exécution sur l'ordinateur, arrêtez-le avant d'exécuter le script.

#### Nœud s'exécutant à partir du terminal

Si votre nœud s'exécute dans un terminal, arrêtez-le en appuyant sur `ctrl + C`.

#### Nœud s'exécutant en tant que service

Si votre nœud s'exécute déjà en tant que service, vous n'avez probablement pas besoin de ce script. Vous êtes prêt à partir.

#### Nœud s'exécutant en arrière-plan

Si votre nœud s'exécute en arrière-plan \(en s'exécutant avec `nohup`, par exemple\), recherchez le processus exécutant le nœud en exécutant `ps aux | grep avalanche`. Cela produira une sortie comme:

```cpp
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Cherchez la ligne qui n'a pas `grep` dessus.Dans cet exemple, c'est la deuxième ligne. Il affiche des informations sur votre nœud. Notez l'ID de processus, dans ce cas, `2630`. Arrêtez le nœud en exécutant`kill -2 2630`.

#### Fichiers de travail du nœud

Si vous avez précédemment exécuté un nœud AvalancheGo sur cet ordinateur, vous aurez des fichiers de nœud local stockés dans le répertoire `$HOME/.avalanchego`. Ces fichiers ne seront pas perturbés et le nœud configuré par le script continuera à fonctionner avec la même identité et l'état qu'il avait auparavant. Cela étant dit, pour la sécurité de votre nœud, sauvegardez les fichiers `staker.crt` et `staker.key` trouvés dans `$HOME/.avalanchego/staking` et stockez-les dans un endroit sûr. Vous pouvez utiliser ces fichiers pour recréer votre nœud sur un autre ordinateur si vous en avez besoin.

### Considérations de mise en réseau

Pour fonctionner correctement, AvalancheGo doit accepter les connexions d'Internet sur le port réseau `9651`. Avant de procéder à l'installation, vous devez déterminer l'environnement réseau dans lequel votre nœud fonctionnera.

#### Exécution sur un fournisseur de cloud

Si votre nœud s'exécute sur une instance d'ordinateur de fournisseur de cloud, il aura une adresse IP statique. Découvrez ce qu'est cette adresse IP statique ou configurez-la si vous ne l'avez pas déjà fait. Le script essaiera de découvrir l'adresse IP par lui-même, mais cela peut ne pas fonctionner dans tous les environnements, vous devrez donc vérifier l'adresse IP ou la saisir vous-même.

#### Fonctionnement sur une connexion domestique

Si vous exécutez un nœud sur un ordinateur connecté à Internet, vous disposez d'une adresse IP dynamique; c'est-à-dire que votre adresse IP changera périodiquement. Le script d'installation configurera le nœud de manière appropriée pour cette situation. Mais, pour une connexion domestique, vous devrez configurer la redirection de port entrant du port `9651` d'Internet vers l'ordinateur sur lequel le nœud est installé.

Comme il y a trop de modèles et de configurations de routeur, nous ne pouvons pas fournir d'instructions sur ce qu'il faut faire exactement, mais il existe des guides en ligne \(comme [celui-ci](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/) ou [celui-ci](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)\), et l'assistance de votre fournisseur de services peut également vous aider.

## Lancer le script

Alors, maintenant que vous avez préparé votre système et que les informations sont prêtes, allons-y.

Pour télécharger et exécuter le script, saisissez ce qui suit dans le terminal:

```cpp
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

Et c'est parti! La sortie devrait ressembler à ceci:

```cpp
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

Et puis le script vous demandera des informations sur l'environnement réseau:

```cpp
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

Entrez `1` si vous avez une adresse IP dynamique et `2` si vous avez une adresse IP statique. Si vous êtes sur une adresse IP statique, il essaiera de détecter automatiquement l'adresse IP et demandera une confirmation.

```cpp
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

Confirmez avec `y` ou `n` si l'adresse IP détectée est incorrecte \(ou vide\), puis entrez l'adresse IP correcte à l'invite suivante.

Le script continuera ensuite avec la création du service système et se terminera par le démarrage du service.

```cpp
Installing service with public IP: 3.15.152.14
Created symlink /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

Done!

Your node should now be bootstrapping on the main net.
To check that the service is running use the following command (q to exit):
sudo systemctl status avalanchego
To follow the log use (ctrl+C to stop):
sudo journalctl -u avalanchego -f

Reach us over on https://chat.avax.network if you're having problems.
```

Le script est terminé et vous devriez voir à nouveau l'invite système.

## Post-installation

AvalancheGo devrait fonctionner en arrière-plan en tant que service. Vous pouvez vérifier qu'il fonctionne avec:

```cpp
sudo systemctl status avalanchego
```

Cela imprimera les derniers journaux du nœud, qui devraient ressembler à ceci:

```cpp
● avalanchego.service - AvalancheGo systemd service
Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2021-01-05 10:38:21 UTC; 51s ago
Main PID: 2142 (avalanchego)
Tasks: 8 (limit: 4495)
Memory: 223.0M
CGroup: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --plugin-dir=/home/ubuntu/avalanche-node/plugins --dynamic-public-ip=opendns --http-host=

Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/vms/platformvm/vm.go#322: initializing last accepted block as 2FUFPVPxbTpKNn39moGSzsmGroYES4NZRdw3mJgNvMkMiMHJ9e
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/snow/engine/snowman/transitive.go#58: initializing consensus engine
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#143: adding route /ext/bc/11111111111111111111111111111111LpoYY
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#88: HTTP API server listening on ":9650"
Jan 05 10:38:58 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:58] <P Chain> avalanchego/snow/engine/common/bootstrapper.go#185: Bootstrapping started syncing with 1 vertices in the accepted frontier
Jan 05 10:39:02 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:02] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 2500 blocks
Jan 05 10:39:04 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:04] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 5000 blocks
Jan 05 10:39:06 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:06] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 7500 blocks
Jan 05 10:39:09 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:09] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 10000 blocks
Jan 05 10:39:11 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:11] <P Chain>
```

Notez `active (running)` qui indique que le service fonctionne correctement. Vous devrez peut-être appuyer sur `q` pour revenir à l'invite de commande.

Pour connaître votre NodeID, qui est utilisé pour identifier votre nœud sur le réseau, exécutez la commande suivante:

```cpp
sudo journalctl -u avalanchego | grep "node's ID"
```

Il produira une sortie comme:

```cpp
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

Ajoutez `NodeID-` à la valeur pour obtenir, par exemple, `NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`. Stockez cela; il sera nécessaire pour le jalonnement ou la recherche de votre nœud.

Votre nœud devrait être en cours de bootstrap maintenant. Vous pouvez surveiller la progression en exécutant la commande suivante:

```cpp
sudo journalctl -u avalanchego -f
```

Appuyez sur `ctrl + C` lorsque vous souhaitez arrêter la lecture de la sortie du nœud.

## Arrêter le nœud

Pour arrêter AvalancheGo, exécutez:

```cpp
sudo systemctl stop avalanchego
```

Pour le relancer, exécutez:

```cpp
sudo systemctl start avalanchego
```

## Mise à niveau du nœud

AvalancheGo est un projet en cours et il y a des mises à niveau de version régulières. La plupart des mises à niveau sont recommandées mais non obligatoires. Un préavis sera donné pour les mises à niveau qui ne sont pas rétrocompatibles. Lorsqu'une nouvelle version du nœud est publiée, vous remarquerez des lignes de journal comme:

```cpp
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Il est recommandé de toujours mettre à niveau vers la dernière version, car les nouvelles versions apportent des corrections de bogues, de nouvelles fonctionnalités et des mises à niveau.

Pour mettre à niveau votre nœud, exécutez simplement à nouveau le script du programme d'installation:

```cpp
./avalanchego-installer.sh
```

Il détectera que vous avez déjà installé AvalancheGo:

```cpp
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Il mettra ensuite à niveau votre nœud vers la dernière version, et une fois terminé, redémarrera le nœud et imprimera les informations sur la dernière version:

```cpp
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Et ensuite?

Voilà, vous exécutez un nœud AvalancheGo! Toutes nos félicitations! Faites-nous savoir que vous l'avez fait sur notre [Twitter](https://twitter.com/avalanche_fr), [Telegram](https://t.me/Avalanche_fr) ou [Reddit](https://www.reddit.com/r/Avax/)!

Si vous êtes sur un réseau résidentiel \(IP dynamique\), n'oubliez pas de configurer la redirection de port. Si vous êtes sur un fournisseur de services cloud, vous êtes prêt à partir.

Vous pouvez désormais [interagir avec votre nœud](../../apis/emettre-des-appels-dapi.md), [mettre en jeu vos jetons](deleguer-a-un-noeud.md) ou améliorer votre installation en configurant la [surveillance des nœuds](configuration-du-monitoring-des-noeuds.md) pour avoir un meilleur aperçu de ce que fait votre nœud.

Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter sur notre [Telegram](https://t.me/Avalanche_fr) !

