# Update votre nœud AvalancheGo

{% embêtent url="https://youtu.be/o4Fww-sHoaQ" caption="" %}

## **Sauvegardez votre noeud**

Avant de mettre à niveau votre nœud, il est recommandé que vous sauvegardez vos fichiers de staker qui sont utilisés pour identifier votre nœud sur le réseau. Dans l'installation par défaut, vous pouvez les copier en exécutant les commandes suivantes:

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Ensuite, télécharger les fichiers `staker.crt` et `staker.key` et les garder quelque part en sécurité et privé. Si quelque chose arrive à votre noeud ou que le noeud machine fonctionne sur, ces fichiers peuvent être utilisés pour recréer pleinement votre noeud.

Si vous utilisez votre noeud à des fins de développement et avez des utilisateurs de frappes sur votre noeud, vous devriez également les sauvegarder.

## Node installé à l'aide du script d'installation

Si vous avez installé votre noeud à l'aide du script [d'installation](set-up-node-with-installer.md), pour mettre à niveau votre noeud, il suffit de lancer le script d'installation à nouveau.

```text
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

Et c'est cela, votre noeud est mis à niveau vers la dernière version.

Si vous avez installé votre noeud manuellement, procédez avec le reste du tutoriel.

## **Arrêter la version ancienne noeud**

Après la sauvegarde est sécurisée, vous pouvez commencer à mettre à niveau votre nœud. Commencez par arrêter la version actuellement en cours.

### Node courant du terminal

Si votre noeud fonctionne dans un terminal l'arrêter en appuyant sur `ctrl+c`.

### Node courant comme service

Si votre noeud fonctionne comme un service, arrêtez-le en entrant:

`sudo systemctl stop avalanchego.service`

\(votre service peut être nommé différemment, `avalanche.service`, ou similaire\)

### Node courant en arrière-plan

Si votre noeud fonctionne dans l'arrière-plan \(en exécutant avec `nohup`, par exemple\) puis trouvez le processus exécutant le noeud en exécutant `ps aux | grep avalanche`. Cela produira la sortie comme:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Dans cet exemple, la deuxième ligne montre des informations sur votre nœud. Notez le processus id, dans ce cas, `2630`. Arrêtez le nœud en exécutant `tuer -2 2630`.

Maintenant, nous sommes prêts à télécharger la nouvelle version du nœud. Vous pouvez soit télécharger le code source puis construire le programme binaire, ou vous pouvez télécharger le binaire pré-construit. Vous n'avez pas besoin de faire les deux.

Téléchargement de la binaire pré-construit est plus facile et recommandé si vous cherchez juste à exécuter votre propre noeud et piquer dessus.

Construire le noeud [à partir de la source](upgrade-your-avalanchego-node.md#build-from-source) est recommandé si vous êtes un développeur qui cherche à expérimenter et à construire sur Avalanche.

## **Télécharger Binaire préconstruit**

Si vous voulez télécharger un binaire préconstruit au lieu de la construire vous-même, allez à notre [page de](https://github.com/ava-labs/avalanchego/releases) libérations, et sélectionnez la version que vous voulez \(probablement la dernière fois. \)

Sous `Assets`, sélectionnez le fichier approprié.

Pour MacOS:   Téléchargement: `avalanchego-macos-<VERSION>.zip`   Unzip : `unzip avalanchego-macos-<VERSION>.zip`   Le dossier résultant, `avalanchego-<VERSION>`, contient les binaires.

Pour Linux sur les PC ou les fournisseurs de cloud:   Téléchargement: `avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`   Le dossier résultant, `avalanchego-<VERSION>-linux`, contient les binaires.

Pour Linux sur les ordinateurs basés sur RaspberryPi4 ou Arm64 similaires:   Téléchargement: `avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip: `goudron -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`   Le dossier résultant, `avalanchego-<VERSION>-linux`, contient les binaires.

Vous êtes maintenant prêt à exécuter la nouvelle version du nœud.

### Exécuter le noeud depuis le terminal

Si vous utilisez les binaires préconstruits sur MacOS:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si vous utilisez les binaires préconstruits sur Linux:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Ajoutez le `nohup` au début de la commande si vous voulez exécuter le nœud en arrière-plan.

### Exécuter le noeud comme un service

Si vous exécutez le noeud comme service, vous devez remplacer les anciens binaires par les nouveaux.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

et puis redémarrer le service avec `sudo systemctl start avalanchego.service`.

## **Construire la source**

Premier clone notre our repo \(vous pouvez sauter cette étape si vous avez fait cela avant\):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Puis passer au répertoire avalanchego :

```text
cd avalanchego
```

Retirez le dernier code:

```text
git pull
```

REMARQUE: si la branche master n'a pas été mise à jour avec la dernière tag de libération, vous pouvez l'obtenir directement via la première exécution `git fetch --all --tags` puis git `checkout` --force tag, \(où `<tag>` est la dernière tag ; par exemple `v1.3.2`\) au lieu de `git pull`. Notez que votre copie locale sera dans un état 'TÊTE détachée', ce qui n'est pas un problème si vous ne modifiez pas la source que vous voulez repousser vers le dépôt \(auquel cas vous devriez vérifier vers une branche et les fusions ordinaires\). Notez également que le drapeau `--force` ne tiendra pas compte de tout changement local que vous pourriez avoir.

Vérifiez que votre code local est à jour. Do:

```text
git rev-parse HEAD
```

et vérifier que les 7 premiers caractères imprimés correspondent au champ de engagement Dernières sur notre [Github.](https://github.com/ava-labs/avalanchego)

REMARQUE: si vous avez utilisé les `balises de commande git` alors ces 7 premiers caractères devraient correspondre au hachage de la marque de départ.

Maintenant, construire le binaire:

```text
./scripts/build.sh
```

Ceci devrait être imprimé :

```text
Build Successful
```

Vous pouvez vérifier quelle version vous exécutez en faisant :

```text
./build/avalanchego --version
```

Vous pouvez exécuter votre noeud avec:

```text
./build/avalanchego
```

