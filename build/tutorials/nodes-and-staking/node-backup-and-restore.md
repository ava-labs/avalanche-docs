# Sauvegarde des nœuds et restauration

Une fois que vous avez votre noeud en cours d'exécution, il est temps de vous préparer à la reprise après sinistre. Si votre machine a jamais eu une défaillance catastrophique due à des problèmes matériels ou logiciels, ou même un cas de catastrophe naturelle, il est préférable d'être préparé pour une telle situation en faisant une sauvegarde.

Lors de la mise en marche, une installation complète de noeud avec la base de données peut croître pour être de plusieurs gigaoctets de taille. Devoir sauvegarder et restaurer un volume aussi important de données peut être coûteux, compliqué et long. Heureusement, il y a une meilleure façon.

Au lieu de devoir sauvegarder et restaurer tout, nous devons sauvegarder uniquement ce qui est essentiel, c'est-à-dire ces fichiers qui ne peuvent pas être reconstruits parce qu'ils sont uniques à votre nœud. Pour le noeud Avalanchego, les fichiers uniques sont ceux qui identifient votre noeud sur le réseau, en d'autres termes, les fichiers qui définissent votre NodeID. L'installation elle-même peut être facilement recréée en installant le noeud sur une nouvelle machine, et tous les gigaoctets restants des données blockchain peuvent être facilement recréés par le processus de démarrage, qui copie les données sur d'autres pairs réseau.

Même si votre noeud est un validateur sur le réseau et a plusieurs délégations dessus, vous n'avez pas besoin de vous inquiéter de la sauvegarde de quoi que ce soit d'autre, parce que les transactions de validation et de délégation sont également stockées sur la blockchain et seront restaurées pendant le bootstrapping, ainsi que le reste des données de la blockchain.

## NodeID

NodeID est un identifiant unique qui différencie votre noeud de tous les autres pairs du réseau. Il est une chaîne formatée comme `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD`. Vous pouvez rechercher l'arrière-plan technique de la façon dont le NodeID est construit [ici](../../references/cryptographic-primitives.md#tls-addresses). Essentiellement, NodeID est défini par deux fichiers:

* `staker.crt`
* `staker.key`

Dans l'installation par défaut, ils peuvent être trouvés dans le répertoire de travail, spécifiquement dans `~/.avalanchego/staking/`. Tout ce que nous avons à faire pour recréer le noeud sur une autre machine est d'exécuter une nouvelle installation avec ces deux mêmes fichiers.

{% allusion style="warning" %} Si vous avez des utilisateurs définis dans la frappe de votre nœud, vous devez alors sauvegarder et restaurer ceux-ci également. [Keystore API](../../avalanchego-apis/keystore-api.md) a des méthodes qui peuvent être utilisées pour exporter et importer les clés utilisateur. Notez que Keystore API est utilisé uniquement par les développeurs et non destiné à l'utilisation dans les nœuds de production. Si vous ne savez pas quelle est une API de keystore et ne l'avez pas utilisé, vous n'avez pas besoin de vous inquiéter à ce sujet. {% endhint %}

## Sauvegarde

Pour sauvegarder votre nœud, nous avons besoin de stocker les fichiers `staker.crt` et `staker.key` quelque part sûr et privé, de préférence sur un ordinateur différent, à votre stockage privé dans le cloud, une clé USB ou similaire. Les stocker à quelques endroits différents, sécurisés augmente la sécurité.

{% allusion style="warning" %} Si quelqu'un obtient une prise de vos fichiers staker, il ne peut toujours pas accéder à vos fonds, car ils sont contrôlés par le portefeuille clés privées, pas par le nœud. Mais, ils pourraient recréer votre noeud ailleurs, et selon les But, faire perdre les récompenses de jalonnement. Assurez-vous donc que vos fichiers de jalons sont sécurisés. {% endhint %}

Allons récupérer les fichiers de la machine en exécutant le nœud.

### Depuis le noeud local

Si vous exécutez le noeud localement, sur votre ordinateur de bureau, il suffit de naviguer vers où sont les fichiers et de les copier quelque part en sécurité.

Lors d'une installation Linux par défaut, le chemin vers eux sera `/home/USERNAME/.avalanchego/staking/`, où `USERNAME` doit être remplacé par le nom d'utilisateur réel qui exécute le nœud. Sélectionnez et copiez les fichiers à partir de là à un emplacement de sauvegarde. Vous n'avez pas besoin d'arrêter le noeud pour faire ça.

### Depuis le noeud distant utilisant `scp`

`scp` est un programme de ligne de commande 'secure copy', disponible intégré sur les ordinateurs Linux et MacOS. Il y a également une version Windows, `pscp` dans le cadre du paquet [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html). Si vous utilisez `pscp`, dans les commandes suivantes, remplacer chaque utilisation de `scp` par `pscp -scp`.

Pour copier les fichiers du nœud, vous aurez besoin de pouvoir vous connecter à distance dans la machine. Vous pouvez utiliser le mot de passe de compte, mais la manière sûre et recommandée est d'utiliser les touches SSH. La procédure d'acquisition et de configuration des clés SSH est fortement dépendante de votre fournisseur de cloud et de la configuration de la machine. Vous pouvez vous référer à nos guides de configuration [Amazon Web Services](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) et [Microsoft Azure](set-up-an-avalanche-node-with-microsoft-azure.md) pour ces fournisseurs. D'autres fournisseurs auront des procédures similaires.

Lorsque vous avez des moyens de connexion à distance dans la machine, vous pouvez copier les fichiers avec la commande suivante:

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Cela suppose que le nom d'utilisateur sur la machine est `ubuntu`, remplacer par un nom d'utilisateur correct dans les deux endroits si il est différent. Aussi, remplacer `PUBLICIP` par la propriété intellectuelle publique réelle de la machine. Si `scp` n'utilise pas automatiquement votre clé SSH téléchargée, vous pouvez la pointer manuellement:

```text
scp -i /path/to/the/key.pem -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Une fois exécuté, cette commande créera le répertoire `avalanche_backup` dans vous répertoire maison et placera les fichiers staker dans celui-ci. Vous devez les stocker quelque part en sécurité.

## Restauration

Pour restaurer votre noeud d'une sauvegarde, nous devons faire l'inverse: restaurer `staker.key` et `staker.crt` de la sauvegarde au répertoire de travail du noeud.

Premièrement, nous devons faire l'[installation](set-up-node-with-installer.md) habituelle du nœud. Cela créera un nouveau NodeID, que nous avons besoin de remplacer. Lorsque le noeud est installé correctement, connectez-vous à la machine où le noeud est en cours de fonctionnement et arrêtez-le:

```text
sudo systemctl stop avalanchego
```

Nous sommes prêts à restaurer le nœud.

### Vers le noeud local

Si vous exécutez le noeud localement, il suffit de copier les fichiers `staker.key``` et `staker.crt` de l'emplacement de sauvegarde dans le répertoire de travail, qui sur l'installation Linux par défaut sera staker.key Remplacez `USERNAME` par le nom d'utilisateur réel utilisé pour exécuter le nœud.

### Vers le noeud distant utilisant `scp`

Encore une fois, le processus est juste l'opération inverse. En utilisant `scp` nous devons copier les fichiers `staker.key` et `staker.crt` de l'emplacement de sauvegarde dans le répertoire de travail distant. En supposant que les fichiers sauvegardés sont situés dans le répertoire où la procédure de sauvegarde ci-dessus les a placés:

```text
scp ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Ou si vous devez spécifier le chemin vers la clé SSH :

```text
scp -i /path/to/the/key.pem ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Et encore, remplacer `ubuntu` par un nom d'utilisateur correct si différent, et `PUBLICIP` avec la propriété intellectuelle publique réelle de la machine exécutant le nœud, ainsi que le chemin vers la clé SSH si utilisée.

### Redémarrez le noeud et vérifier

Une fois les fichiers remplacés, connectez-vous à la machine et démarrez le nœud en utilisant :

```text
sudo systemctl start avalanchego
```

Vous pouvez maintenant vérifier que le noeud est restauré avec le code NodeID correct en délivrant l'appel de l'API [getNodeID](https://docs.avax.network/build/avalanchego-apis/info-api#info-getnodeid) dans la même console que vous avez lancé la commande précédente:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Vous devriez voir votre NodeID original. Le processus de restauration est effectué.

## Résumé

La partie essentielle de la sécurisation de votre noeud est la sauvegarde qui permet la restauration complète et sans douleur de votre noeud. Suite à ce tutoriel, vous pouvez rester facile en sachant que si vous vous trouvez jamais dans une situation où vous avez besoin de restaurer votre noeud de zéro, vous pouvez facilement et rapidement le faire.

Si vous avez des problèmes à la suite de ce tutoriel, commentaires que vous souhaitez partager avec nous ou simplement vouloir chatter, vous pouvez nous rejoindre sur notre serveur [Discord](https://chat.avalabs.org/).

