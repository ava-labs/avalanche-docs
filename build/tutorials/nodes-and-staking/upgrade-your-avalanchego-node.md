# Mettre à jour votre nœud AvalancheGo

{% embed url="https://youtu.be/o4Fww-sHoaQ" caption="" %}

## **Sauvegarde de votre nœud**

Avant de mettre à jour votre nœud, il est recommandé de sauvegarder vos fichiers de staker qui sont utilisés pour identifier votre nœud sur le réseau. Dans l'installation par défaut, vous pouvez les copier en exécutant les commandes suivantes :

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Puis téléchargez et `staker.crt`les `staker.key`fichiers et gardez-les quelque part en sécurité et en privé. Si quelque chose arrive à votre nœud ou si le nœud de machine s'allume, ces fichiers peuvent être utilisés pour recréer entièrement votre nœud.

Si vous utilisez votre nœud à des fins de développement et que vous avez des utilisateurs de frappes sur votre nœud, vous devriez les sauvegarder aussi.

## Nœud installé à l'aide du script d'installation

Si vous avez installé votre nœud en utilisant le script [d'installation](set-up-node-with-installer.md), pour mettre à jour votre nœud, il suffit de lancer le script d'installation de nouveau.

```text
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

Et c'est cela, votre nœud est mis à jour pour la dernière version.

Si vous avez installé votre nœud manuellement, procédez au reste du tutoriel.

## **Arrêter la version du nœud**

Une fois la sauvegarde est sécurisée, vous pouvez commencer à mettre à niveau votre nœud. Commencez par arrêter la version en cours d'exécution.

### Nœud qui fonctionne depuis le terminal

Si votre nœud est en cours d'exécution dans un terminal arrêtez-le en appuyant sur `ctrl+c`.

### Nœud fonctionnant comme service

Si votre nœud fonctionne comme un service, arrêtez-le en entrant :

`sudo systemctl stop avalanchego.service`

`avalanche.service`\(votre service peut être nommé différemment, ou similaire\)

### Nœud en arrière-plan

Si votre nœud est en cours d'exécution en arrière-plan \(en s'exécutant avec `nohup`, par exemple\) , trouvez le processus en exécutant le nœud en exécutant `ps aux | grep avalanche`. Cela produira une sortie comme:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Dans cet exemple, la deuxième ligne montre des informations sur votre nœud. Notez le processus id, dans ce cas, `2630`. Arrêtez le nœud en s'exécutant `kill -2 2630`.

Maintenant nous sommes prêts à télécharger la nouvelle version du nœud. Vous pouvez soit télécharger le code source et puis construire le programme binaire, soit vous pouvez télécharger le binaire, avant qu'il ne soit construit. Vous n'avez pas besoin de faire les deux.

Le téléchargement du binaire pré-construit est plus facile et recommandé si vous cherchez à exécuter votre propre nœud et à le piquer.

Construire le nœud [de la source](upgrade-your-avalanchego-node.md#build-from-source) est recommandé si vous êtes un développeur qui cherche à expérimenter et à construire sur Avalanche.

## **Télécharger Binaire préconstruit**

Si vous souhaitez télécharger un binaire pré-construit au lieu de la construire vous-même, accédez à notre [page](https://github.com/ava-labs/avalanchego/releases) de libérations, et sélectionnez la version que vous voulez \(probablement la dernière fois\).

Sous `Assets`, sélectionnez le fichier approprié.

Pour MacOS:   Télécharger:`avalanchego-macos-<VERSION>.zip`   Unzip :`unzip avalanchego-macos-<VERSION>.zip`   Le dossier résultant, `avalanchego-<VERSION>`contient les binaires.

Pour Linux sur les PC ou les fournisseurs de cloud:   Télécharger:`avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip :`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`   Le dossier résultant, `avalanchego-<VERSION>-linux`contient les binaires.

Pour Linux sur des ordinateurs basés sur RaspberryPi4 ou sur des ordinateurs basés sur Arm64 similaires :   Télécharger:`avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip :`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`   Le dossier résultant, `avalanchego-<VERSION>-linux`contient les binaires.

Vous êtes maintenant prêt à exécuter la nouvelle version du nœud.

### Exécuter le nœud depuis le terminal

Si vous utilisez les binaires pré-construits sur MacOS, si vous utilisez les binaires suivants :

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si vous utilisez les binaires pré-construits sur Linux :

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Ajoutez `nohup`au début de la commande si vous souhaitez exécuter le nœud en arrière-plan.

### Exécuter le nœud comme un service

Si vous exécutez le nœud en tant que service, vous devez remplacer les anciens binaires par les nouveaux.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

et puis redémarrer le service avec `sudo systemctl start avalanchego.service`.

## **Construire avec la source**

Premier cloner notre repo Github \(vous pouvez sauter cette étape si vous avez déjà fait cela\):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Passez ensuite au répertoire the :

```text
cd avalanchego
```

Tirez le dernier code :

```text
git pull
```

`<tag>`REMARQUE : si la branche principale n'a pas été mise à jour avec la dernière tag de libération, vous pouvez l'obtenir directement via la première course `git fetch --all --tags`et ensuite `git checkout --force tags/<tag>`\(où est la dernière tag de libération, par exemple\) au `v1.3.2`lieu de .`git pull` Notez que votre copie locale sera dans un État de '' Notez également que le `--force`drapeau ne tiendra pas compte de tout changement local que vous pourriez avoir.

Vérifiez que votre code local est à jour. Do: :

```text
git rev-parse HEAD
```

et vérifiez que les 7 premiers caractères imprimés correspondent au champ de validation le plus récent sur notre [Github.](https://github.com/ava-labs/avalanchego)

REMARQUE : si vous avez utilisé les 7 premiers caractères de `git checkout tags/<tag>`ces derniers doivent correspondre au hachage de commit de cette étiquette.

Maintenant construisez le binaire :

```text
./scripts/build.sh
```

Ceci devrait imprimer :

```text
Build Successful
```

Vous pouvez vérifier la version que vous exécutez en faisant :

```text
./build/avalanchego --version
```

Vous pouvez exécuter votre nœud avec :

```text
./build/avalanchego
```

