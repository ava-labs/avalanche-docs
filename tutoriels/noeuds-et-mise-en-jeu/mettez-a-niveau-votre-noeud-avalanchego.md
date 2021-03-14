# Mettez à niveau votre nœud AvalancheGo

{% embed url="https://www.youtube.com/watch?v=o4Fww-sHoaQ&ab\_channel=Avalanche" %}

## Sauvegardez votre nœud

Avant de mettre à niveau votre nœud, il est recommandé de sauvegarder vos fichiers staker qui sont utilisés pour identifier votre nœud sur le réseau. Dans l'installation par défaut, vous pouvez les copier en exécutant les commandes suivantes:

```cpp
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Ensuite, téléchargez les fichiers `staker.crt` et `staker.key` et conservez-les dans un endroit sûr et privé. Si quelque chose arrive à votre nœud ou que le nœud de la machine s'exécute, ces fichiers peuvent être utilisés pour recréer complètement votre nœud.

Si vous utilisez votre nœud à des fins de développement et que vous avez des utilisateurs de keystore sur votre nœud, vous devez également les sauvegarder.

## Nœud installé à l'aide du script d'installation

Si vous avez installé votre nœud à l'aide [du script d'installation](executer-un-noeud-avalanche-sous-linux-a-laide-du-script-dinstallation.md), pour mettre à niveau votre nœud, exécutez simplement à nouveau le script d'installation.

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

Et voilà, votre nœud est mis à niveau vers la dernière version.

Si vous avez installé votre nœud manuellement, continuez avec le reste du didacticiel.

## Arrêtez l'ancienne version du nœud

Une fois la sauvegarde sécurisée, vous pouvez commencer à mettre à niveau votre nœud. Commencez par arrêter la version en cours d'exécution.

### Nœud s'exécutant à partir du terminal

Si votre nœud s'exécute dans un terminal, arrêtez-le en appuyant sur `ctrl+c`.

### Nœud s'exécutant à partir d'un service

Si votre nœud s'exécute en tant que service, arrêtez-le en entrant:

`sudo systemctl stop avalanchego.service`

\(votre service peut être nommé différemment, `avalanche.service` ou similaire\)

### Nœud s'exécutant en arrière-plan

Si votre nœud s'exécute en arrière-plan \(en s'exécutant avec `nohup`, par exemple\), recherchez le processus exécutant le nœud en exécutant `ps aux | grep avalanche`. Cela produira une sortie comme:

```cpp
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Dans cet exemple, la deuxième ligne affiche des informations sur votre nœud. Notez l'ID de processus, dans ce cas, `2630`. Arrêtez le nœud en exécutant`kill -2 2630`.

Nous sommes maintenant prêts à télécharger la nouvelle version du nœud. Vous pouvez soit télécharger le code source puis créer le programme binaire, soit télécharger le binaire pré-construit. Vous n’avez pas besoin de faire les deux.

Le téléchargement de binaires pré-construits est plus facile et recommandé si vous cherchez simplement à exécuter votre propre nœud et à vous y impliquer.

Construire le nœud à [partir de la source](mettez-a-niveau-votre-noeud-avalanchego.md#construire-a-partir-de-la-source) est recommandé si vous êtes un développeur qui souhaite expérimenter et construire sur Avalanche.

## Télécharger le binaire pré-construit

Si vous souhaitez télécharger un binaire pré-construit au lieu de le créer vous-même, accédez à notre [page de versions](https://github.com/ava-labs/avalanchego/releases) et sélectionnez la version de votre choix \(probablement la dernière\).

Sous `Assets`, sélectionnez le fichier approprié.

Pour MacOS:  
Download: `avalanchego-macos-<VERSION>.zip`  
Unzip: `unzip avalanchego-macos-<VERSION>.zip`  
The resulting folder, `avalanchego-<VERSION>`, contains the binaries.

Pour Linux sur PCs ou fournisseurs de cloud:  
Download: `avalanchego-linux-amd64-<VERSION>.tar.gz`  
Unzip: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  
The resulting folder, `avalanchego-<VERSION>-linux`, contains the binaries.

Pour Linux sur RaspberryPi4 ou des ordinateurs Arm64 similaires:  
Download: `avalanchego-linux-arm64-<VERSION>.tar.gz`  
Unzip: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  
The resulting folder, `avalanchego-<VERSION>-linux`, contains the binaries.

Vous êtes maintenant prêt à exécuter la nouvelle version du nœud.

### Exécution du nœud à partir du terminal

Si vous utilisez les binaires pré-construits sur MacOS:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si vous utilisez les binaires préconstruits sous Linux:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Ajoutez `nohup` au début de la commande si vous souhaitez exécuter le nœud en arrière-plan.

### Exécuter le nœud en tant que service

Si vous exécutez le nœud en tant que service, vous devez remplacer les anciens binaires par les nouveaux.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

puis redémarrez le service avec `sudo systemctl start avalanchego.service`.

## Construire à partir de la **source**

Commencez par cloner notre Github repo vous pouvez ignorer cette étape si vous l'avez déjà fait\):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Accédez ensuite au répertoire avalanchego:

```text
cd avalanchego
```

Pull le dernier code disponible:

```text
git pull
```

Vérifiez que votre code local est à jour. Faites:

```text
git rev-parse HEAD
```

et vérifiez que les 7 premiers caractères imprimés correspondent au champ Dernier commit sur notre [Github.](https://github.com/ava-labs/avalanchego)

Maintenant, construisez le binaire:

```text
./scripts/build.sh
```

Cela devrait imprimer:

```text
Build Successful
```

Vous pouvez vérifier la version que vous utilisez en procédant comme suit:

```text
./build/avalanchego --version
```

Vous pouvez exécuter votre nœud avec:

```text
./build/avalanchego
```

