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



