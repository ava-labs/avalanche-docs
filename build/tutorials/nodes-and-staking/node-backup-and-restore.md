# Sauvegarde et restauration des nœuds et des nœuds

Une fois que vous avez votre nœud en cours de fonctionnement, il est temps de se préparer à la reprise après une catastrophe. Si votre machine a jamais été en panne catastrophique en raison de problèmes matériels ou de logiciels, ou même d'un cas de catastrophe naturelle, il est préférable d'être préparé pour une telle situation en faisant une sauvegarde.

Lors de la mise en marche, une installation de nœuds complets avec la base de données peut se développer pour être de multiples gigabytes de taille. Avoir à sauvegarder et à restaurer un volume de données aussi important peut être coûteux, compliqué et prendre du temps. Heureusement, il y a un meilleur moyen.

Au lieu de devoir sauvegarder et de restaurer tout, nous devons sauvegarder seulement ce qui est essentiel, c'est-à-dire les fichiers qui ne peuvent pas être reconstruits parce qu'ils sont uniques à votre nœud. Pour le nœud Avalanchego les fichiers uniques sont ceux qui identifient votre nœud sur le réseau, en d'autres termes, les fichiers qui définissent votre nodeID. L'installation elle-même peut être facilement recréée en installant le nœud sur une nouvelle machine, et tous les gigabytes restants des données blockchain peuvent être facilement recréés par le processus de bootstrapping, qui copie les données sur d'autres pairs du réseau.

Même si votre nœud est un validateur sur le réseau et qu'il a plusieurs délégations sur elle, vous n'avez pas besoin de vous inquiéter pour la sauvegarde de n'importe quoi d'autre, parce que les transactions de validation et de délégation sont également stockées sur la blockchain et seront restaurées pendant le bootstrapping, ainsi que le reste des données blockchain.

## NodeID

NodeID est un identifiant unique qui différencie votre nœud de tous les autres pairs du réseau. C'est une chaîne de caractères formatée comme `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD`. Vous pouvez consulter l'arrière-plan technique de la manière dont le NodeID est construit [ici](../../references/cryptographic-primitives.md#tls-addresses). En substance, NodeID est défini par deux fichiers :

* `staker.crt`
* `staker.key`

Dans l'installation par défaut, ils peuvent être trouvés dans le répertoire de travail, en particulier dans `~/.avalanchego/staking/`. Tout ce que nous avons à faire pour recréer le nœud sur une autre machine est de lancer une nouvelle installation avec ces deux mêmes fichiers.

{% hint style="warning" %}Si vous avez des utilisateurs définis dans la frappe de votre nœud, vous devez alors sauvegarder et restaurer ces derniers. [L'API Keystore](../../avalanchego-apis/keystore-api.md) a des méthodes qui peuvent être utilisées pour exporter et importer les clés d'utilisateurs. Notez que l'API Keystore est utilisée par les développeurs uniquement et non pas destinée à être utilisée dans les nœuds de production. Si vous ne savez pas quelle est une API de frappe, et que vous ne l'avez pas utilisé, vous n'avez pas besoin de s'en inquiéter.{% endhint %}

## Sauvegarde

Pour sauvegarder votre nœud, nous devons stocker `staker.crt`et `staker.key`déposer quelque part en sécurité et privé, de préférence sur un ordinateur différent, sur votre stockage privé dans le cloud, une clé USB ou un semblable. La tenue de ces derniers sur un couple de emplacements différents et sécurisés augmente la sécurité.

{% hint style="warning" %}Si quelqu'un obtient une saisie de vos fichiers de staker, il ne peut toujours pas accéder à vos fonds, car ils sont contrôlés par les clés privées du portefeuille et non par le nœud. Mais, ils peuvent recréer votre nœud ailleurs et en fonction des circonstances vous font perdre les récompenses de jalonnement. Assurez-vous donc que vos fichiers de staker sont sécurisés.{% endhint %}

Faisons en sorte que les fichiers de jalon ne soient pas mis sur la machine à exécuter le nœud.

### À partir du nœud local

Si vous exécutez le nœud localement, sur votre ordinateur de bureau, il suffit de naviguer vers où les fichiers sont et de les copier quelque part en sécurité.

Lors d'une installation Linux par défaut, le chemin qui leur sera vers sera `/home/USERNAME/.avalanchego/staking/`, où il `USERNAME`faut être remplacé par le nom d'utilisateur réel qui exécute le nœud. Sélectionnez et copiez les fichiers de là à un emplacement de sauvegarde. Vous n'avez pas besoin d'arrêter le nœud pour le faire.

### Depuis le nœud distant en utilisant`scp`

`scp`est un programme de ligne de commande 'copy ', disponible intégré sur les ordinateurs Linux et MacOS. `pscp`Il y a également une version Windows, dans le cadre du paquet [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html). Si l'utilisation , dans les commandes suivantes `pscp`remplacent chaque utilisation de `scp`par .`pscp -scp`

Pour copier les fichiers du nœud, vous devrez être en mesure de vous connecter à la machine à distance. Vous pouvez utiliser le mot de passe de compte, mais la manière sécurisée et recommandée est d'utiliser les clés SSH. La procédure d'acquisition et de mise en place des clés SSH est fortement dépendante de votre fournisseur de cloud et de la configuration de la machine. Vous pouvez consulter nos guides de configuration de [Microsoft Azure](set-up-an-avalanche-node-with-microsoft-azure.md) et les services Web [Amazon Web Services](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) et services et services Microsoft Azure. D'autres fournisseurs auront des procédures similaires.

Lorsque vous avez des moyens de connexion à distance dans la machine, vous pouvez copier les fichiers avec la commande suivante :

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Cela suppose que le nom d'utilisateur sur la machine est `ubuntu`, le remplacer par un nom d'utilisateur correct dans les deux endroits si il est différent. En outre, remplacez `PUBLICIP`par la véritable IP publique de la machine. Si vous n'utilisez pas automatiquement votre clé SSH téléchargée, vous pouvez la `scp`pointer manuellement :

```text
scp -i /path/to/the/key.pem -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

`avalanche_backup`Une fois exécuté, cette commande créera un répertoire dans votre répertoire d'origine et placera des fichiers de staker dans elle. Vous devez les stocker quelque part en sécurité.

## Restaurer les

Pour restaurer votre nœud d'une sauvegarde, nous devons faire l'inverse : restaurer `staker.key`et `staker.crt`de la sauvegarde au répertoire de travail du nœud.

Premièrement, nous devons faire l'[installation](set-up-node-with-installer.md) habituelle du nœud. Cela créera un nouveau NodeID, que nous devons remplacer. Lorsque le nœud est installé correctement, connectez-vous à la machine où le nœud est en marche et l'arrête :

```text
sudo systemctl stop avalanchego
```

Nous sommes prêts à restaurer le nœud.

### Vers le nœud local

Si vous exécutez le nœud localement, il suffit de copier les et `staker.key`les `staker.crt`fichiers de l'emplacement de sauvegarde dans le répertoire de travail, qui sur l'installation Linux par défaut sera .`/home/USERNAME/.avalanchego/staking/` Remplacez `USERNAME`par le nom d'utilisateur actuel utilisé pour exécuter le nœud.

### Pour un nœud distant en utilisant`scp`

Encore une fois, le processus n'est que l'opération inversée. En utilisant `scp`nous devons copier les et `staker.key`les `staker.crt`fichiers de l'emplacement de sauvegarde dans le répertoire de travail à distance. En supposant que les fichiers sauvegardés sont situés dans le répertoire où la procédure de sauvegarde ci-dessus les a placés :

```text
scp ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Ou si vous devez spécifier le chemin vers la clé SSH :

```text
scp -i /path/to/the/key.pem ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Et de nouveau, remplacez par `ubuntu`un nom d'utilisateur correct si différent, et `PUBLICIP`par la IP publique réelle de la machine qui exécute le nœud, ainsi que le chemin vers la clé SSH si utilisé.

### Redémarrez le nœud et vérifier

Une fois les fichiers ont été remplacés, connectez-vous à la machine et démarrez le nœud en utilisant :

```text
sudo systemctl start avalanchego
```

Vous pouvez maintenant vérifier que le nœud est restauré avec le nœud correct en délivrant l'appel de l'API [getNodeID](https://docs.avax.network/build/avalanchego-apis/info-api#info-getnodeid) dans la même console que vous avez lancé la commande précédente :

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Vous devriez voir votre NodeID. d'origine. Le processus de restauration est fait.

## Résumé

La partie essentielle pour sécuriser votre nœud est la sauvegarde qui permet une restauration complète et sans douleur de votre nœud. Après ce tutoriel, vous pouvez vous reposer facilement en sachant que si vous ne vous trouvez jamais dans une situation où vous devez restaurer votre nœud de zéro, vous pouvez le faire facilement et rapidement.

Si vous avez des problèmes à la suite de ce tutoriel, des commentaires que vous souhaitez partager avec nous ou simplement discuter, vous pouvez nous rejoindre sur notre serveur [Discord](https://chat.avalabs.org/).

