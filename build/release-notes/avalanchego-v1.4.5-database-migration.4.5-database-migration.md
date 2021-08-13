# AvalancheGo v1.4.5: Migration de la base de données

Cet article est applicable lorsque vous mettez votre noeud depuis AvalancheGo < v1.4.5 vers AvalancheGo >= v1.4.5. Bien que cet article soit écrit pour v1.4.5 et les références que la version ci-dessous, par exemple, il s'applique quand même si vous êtes mise à niveau you're v1.4.4 à AvalancheGo v1.4.6, v1.4.7, etc.. Lors de la lecture de ce document, remplacez v1.4.5 par la version que vous mettez à jour vers \(sauf en référence au sous-répertoire de la base de données v1.4.5, qui ne changera pas. \)

## Résumé

* [AvalancheGo v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) apporte des optimisations significatives de la base de données.
* Il va temporairement doubler la quantité d'espace disque utilisé par AvalancheGo, et augmentera temporairement l'utilisation de la mémoire et CPU.
* Veuillez lire ce document entier pour vous assurer que votre noeud migrant avec succès et reste sain pendant la migration. Si elle ne répond pas à votre question, allez à notre service [Discord](https://chat.avalabs.org/), lisez les messages épinglés et recherchez votre question. Si vous avez toujours besoin d'aide, veuillez afficher dans le canal \#dépannage.

## Contexte

Nous sommes heureux d'annoncer la sortie de [v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) of qui apporte des optimisations significatives de la base de données et des améliorations de la stabilité à AvalancheGo.

Dans les tests, nous avons observé une réduction d'~90% de l'E/S lu sur un validateur Mainnet, comme indiqué dans le graphique ci-dessous:

![](../../.gitbook/assets/0%20%281%29%20%282%29%20%283%29.png)

Les améliorations sont dues à un refactoring important de la gestion de l'état dans la chaîne P, ainsi qu'à d'autres optimisations de bases de données.

Nous prévoyons que les noeuds mis à niveau >= v1.4.5 consommeront moins de processeur et effectuer beaucoup moins de lecture de disque une fois la migration terminée. Ces changements amélioreront également considérablement la latence de décision de la chaîne P.

Cette mise à niveau raccourcie également significativement la durée de la mise à niveau nécessaire à bootstrap.

## Le processus de mise à niveau

Si vous avez une base de données existante sur votre ordinateur, alors lorsque vous exécutez AvalancheGo v1.4.5, il démarrera effectivement 2 nœuds. On va exécuter v1.4.4, qui utilise la version "ancienne" de la base de données \(v1.0.0\). L'autre sera en cours d'exécution v1.4.5, qui utilise le "nouveau" format de base de données \(v1.4.5 qui restera le même pour n'importe quel AvalancheGo <=1.4.5\).

Le noeud v1.4.4 fonctionnera comme normal, et vous verrez ses journaux comme avant. Le noeud se connectera au réseau en utilisant le même ID de noeud qu'auparavant et, s'il est un validant, participer au consensus qu'auparavant. En bref, les choses devraient être les mêmes que lors de la course v1.4.4.

Le noeud v1.4.5 sera exécuté en arrière-plan et bootstrap depuis le noeud v1.4.4 fonctionnant sur le même ordinateur. Ceci est plus rapide et utilise moins de bande passante que la procédure normale bootstrap, qui nécessite l'envoi de données sur Internet. Pendant le processus de démarrage, le noeud v1.4.5 remplira la base de données "nouvelle".

Lorsque le noeud v1.4.5 est fait bootstrapping, le noeud v1.4.4 s'arrête et le noeud v1.4.5 redémarrer. Lorsque le noeud v1.4.5 redémarre, il fonctionnera normalement, en utilisant la base de données "nouvelle" et complètera la migration. Votre noeud aura le même ID de noeud qu'auparavant.

Vous ne devriez pas fournir le flag`--plugin-dir`. Si vous avez utilisé le script d'installation pour installer AvalancheGo, vous devez supprimer ce drapeau de votre fichier de service AvalancheGo. Voir cette [note](avalanchego-v1.4.5-database-migration.md#note-for-the-nodes-installed-with-installer-script).

## Utilisation de la ressource

Pendant la migration, lorsque les deux nœuds sont en cours, AvalancheGo consommera plus de ressources du système que d'habitude.

Lorsque la migration sera terminée, il y aura 2 bases de données bootstrapped sur votre ordinateur. Assurez-vous que la quantité d'espace disque gratuit sur votre ordinateur dépasse la taille d'une base de données entièrement bootstrapped \(~38 GB\). Nous vous recommandons de consacrer au moins 200 GB d'espace disque sur votre ordinateur à AvalancheGo. Alors AvalancheGo utilise actuellement seulement une fraction de cette quantité, nous prévoyons l'utilisation du disque augmentera avant que nous implémentons une solution de élaguage.

L'utilisation de la mémoire et du processeur sera également élevée pendant que les deux nœuds sont en cours d'exécution. Nous prévoyons que n'importe quel ordinateur avec CPU >= 2GHz et >= 6 Go de RAM disponible pour AvalancheGo n'aura aucun problème. Cela dit, vous devriez surveiller votre noeud particulièrement pendant les premiers jours pour vous assurer qu'il est sain.

Consultez la [FAQ](https://app.gitbook.com/@avalanche/s/avalanche/build/release-notes/avalanchego-v1.4.5-database-migration#faq) pour vérifier que votre ordinateur a l'espace disque adéquat, et que faire si votre ordinateur a des spécifications inférieures aux spécifications recommandées.

## Instructions de mise à niveau étape

* **Votre noeud n'aura pas de temps d'arrêt en suivant ces instructions.**
* **La base de données, plus les données Keystore et les temps de validation, sont migrés automatiquement.**

### Vérifier les exigences

Vérifier que votre ordinateur répond aux exigences suivantes:

* CPU >= 2GHz
* RAM >= 6 GB
* Disque dur: vous devriez avoir au moins 1.3 fois de l'espace disque actuellement occupé par _`$HOME/.avalanchego/db/mainnet/v1.0.0`_, qui est autour de 38GB. Cela signifie que vous devriez avoir environ 50 GB d'espace libre. Sinon, le programme ne sera pas en mesure de procéder à la mise à niveau de la base de données. Nous vous recommandons de consacrer au moins 200 GB d'espace disque sur votre ordinateur à AvalancheGo. Pour vérifier combien d'espace vous avez, voir [combien d'espace disque est disponible en ce moment](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#how-much-disk-space-is-available-right-now)
* Pour remédier à cette situation, voir la suite
   * [Que dois-je faire si mon ordinateur n'a pas assez d'espace disque ?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-should-i-do-if-my-computer-doesnt-have-enough-disk-space)
   * [Et si mon ordinateur ne peut pas exécuter 2 nœuds à la fois?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-if-my-computer-cant-run-2-nodes-at-once)

### Données de sauvegarde

Sauvegardez les données de votre noeud en suivant [ceci](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore).

Votre clé de jalonnement/certificat ne sont pas dans la base de données, et **ne doit pas être affecté du tout** par la migration de la base de données. Même ainsi, il est bonne pratique [d'avoir une sauvegarde](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) de votre clé de jalonnement/certificat.

### Télécharger la nouvelle version

Nouvelle version peut être téléchargée avec **l'une** des approches suivantes selon vos pratiques:

* Avec [les Scripts d'installation](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#node-upgrade), lancez _`./avalanchego-installer.sh`_
* Avec le téléchargement binaire, voir [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#binary)
* Avec la construction à partir du code source, voir [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#source-code)

### Exécuter la nouvelle version

Pour démarrer la nouvelle version

* Si vous exécutez AvalancheGo comme un service, que nous recommandons fortement que le drapeau _`--plugin-dir`_ n'est pas présent dans le fichier _`avalanchego.service`_. Si elle n'est pas présente, vous pouvez sauter le paragraphe suivant. S'il est présent, suivez les instructions ci-dessous pour la supprimer.

   Dans la console, entrez la commande: _`sudo nano /etc/systemd/system/avalanchego.service`_   Dans l'éditeur, localisez la ligne qui commence avec _`ExecStart=`_ et sur elle supprimer la partie suivante: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_ Ensuite, sauvegardez les changements en appuyant sur ctrl-x et y.

   Pour appliquer les modifications, lancez la commande :   _`sudo systemctl daemon-reload`_   Enfin, redémarrez le nœud avec:   _`sudo systemctl redémarrage avalanchego`_

* Avec le téléchargement ou la construction binaire, voir [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#start-a-node-and-connect-to-avalanche).

### Surveiller les progrès

Surveiller et assurez-vous que la migration complète avec succès:

Vous pouvez vérifier les progrès en faisant les mesures suivantes:

* Vérifier l'utilisation de l'espace disque en utilisant la commande

   _`du -h $HOME/.avalanchego/db/mainnet`_

   qui devraient produire des résultats montrant la taille des deux bases de données sous v1.0.0 et v1.4.5, respectivement.

* Les journaux pour le noeud peuplant la nouvelle base de données peuvent être trouvés sous _`$HOME/.avalanchego/logs/fetch-only`_
* Ces messages indiquent l'achèvement de la migration de la base de données:
   * Lorsque _`"démarrage de la dernière version du noeud en mode d'exécution`_ normal", la nouvelle **base** de données a été démarrée, et le noeud a redémarré.
   * Lorsque _`"la clé de migration finie de la version de la base de données v1.0.0 à v1.4.5"`_ est imprimée, les données **de la clé** est terminée la migration.
   * Lorsque _`"finis la plate-forme migratrice vm de la version de la base de données v1.0.0 à v1.4.5"`_ est imprimée, puis **les durées** de validation sont terminées la migration.

Selon votre ordinateur, le processus de mise à niveau pourrait prendre une quantité significative de temps. Certains validateurs ont rapporté 30+ heures avec des ordinateurs moins puissants. Il dépend principalement du type de stockage sur l'ordinateur. Si le stockage est basé sur SSD, il devrait être complété en 12 heures ou moins. Sur les systèmes basés sur le disque dur il peut prendre quelques jours \ (la migration est presque exclusivement des lecture/écritures aléatoires et les DDH sont assez lents sur ces types de charges de travail\). Cependant, votre noeud continuera à fonctionner pendant la migration sans temps d'arrêt.

Vous pouvez vérifier la version de votre noeud en délivrant `info.getNodeVersion` API \(voir tutoriel sur [Postman](https://docs.avax.network/build/tools/postman-avalanche-collection)\) et vous devriez obtenir la réponse comme suit, où le numéro de la version devrait être >=1.4.7 selon quelle version vous mettez à jour, après l'achèvement de la migration.

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.7"
    },
    "id": 1
}
```

Plus d'informations sur la mise à jour d'un noeud se trouvent [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/upgrade-your-avalanchego-node).

## FAQ

### Pourquoi \[explorer\] dit que mon noeud est toujours sur la v1.4.4?

Pendant la migration, un noeud v1.4.4 sera exécuté sur votre ordinateur, comme expliqué ci-dessus. D'autres nœuds sur le réseau verrez la vôtre comme exécutant v1.4.4 jusqu'à la fin de la migration.

### La migration de la base de données est-elle obligatoire?

Oui. Les nœuds exécutant AvalancheGo < v1.4.5 ne fonctionnent plus.

### Puis-je mettre à niveau vers AvalancheGo 1.4.5 à partir d'une version autre que v1.4.4?

Oui, il devrait fonctionner à partir de n'importe quelle version < 1.4.5.

### Et si mon ordinateur ne peut pas exécuter 2 nœuds à la fois?

Si votre ordinateur \(ordinateur 1\) a moins de 6 Go de RAM, il peut être incapable d'exécuter la migration parce qu'il n'a pas assez de mémoire pour exécuter 2 nœuds à la fois. Comme rappel, nous vous conseillons que votre noeud dispose d'au moins 6 Go de RAM.

Si vous êtes incapable d'exécuter la migration et que vous voulez minimiser la durée de votre noeud hors ligne, vous pouvez faire ce qui suit:

* Sur un autre ordinateur \(ordinateur 2\), exécuter AvalancheGo v1.4.5, attendre qu'il démarche, puis arrêter AvalancheGo .
* Sur l'ordinateur 1, arrêter AvalancheGo. Déplacer le répertoire de la base de données _`$HOME/.avalanchego/db/`_ de l'ordinateur 2 \(qui a juste la version de la base de données bootstrapped v1.4.5\) au même emplacement sur l'ordinateur 1. Puis upgrade vers AvalancheGo v1.4.5 et l'exécuter.

Notez que **ce n'est pas l'approche conseillée,** et vous devez le faire seulement si votre noeud a moins de 6 Go de RAM ou l'espace disque insuffisant. Encore une fois, nous vous conseillons que votre noeud dispose d'au moins 6 GB de RAM et d'au moins 200 GB d'espace disque. Notez que cette approche ne migrate pas les données de l'heure de frappe ou de validation.

### Combien d'espace disque dois-je faire?

Nous vous recommandons de consacrer au moins 200 GB d'espace disque sur votre ordinateur à AvalancheGo. Alors AvalancheGo utilise actuellement seulement une fraction de cette quantité \(~38 GB\), nous prévoyons que l'utilisation du disque augmentera avant de mettre en œuvre une solution de élaguage.

### Combien d'espace disque est disponible en ce moment?

Pour voir la quantité d'espace disque disponible dans votre répertoire de base de données sur Mac OS ou Linux, faites:

_`df -h $HOME/.avalanchego/db`_

Cette sortie, par exemple, indique que 609 Go d'espace disque est disponible:

_`Taille du système de fichiers utilisée Avail Use% monté sur le pont`_

_`/dev/nvme0n1p2 916G 261G 609G 30% /`_

### Combien de temps faut-il pour que la nouvelle base de données puisse bootstrap?

Il peut prendre environ 30 heures. Cependant, il peut prendre plus ou moins de temps selon votre ordinateur.

### Comment puis-je savoir que la migration de la base de données est terminée?

Lorsque _`"commencer à exécuter le noeud en mode d'exécution`_ normal", la nouvelle base de données a été démarrée, et le noeud a redémarré.

Lorsque _`"la clé de migration finie de la version de la base de données v1.0.0 à v1.4.5"`_ est imprimée, les données de la clé est terminée la migration.

Lorsque _`"finis la migration de la plate-forme v1.0.0 à v1.4.5"`_ est imprimée, puis les durées de validation sont terminées la migration.

### Puis-je supprimer l'ancienne base de données?

Une fois la nouvelle version de la base de données bootstrapped, le noeud v1.4.5 redémarre et complète la migration de la base de données. Après que cela s'est produit, vous pouvez supprimer l'ancien répertoire de base de données, qui par défaut est à:

_`$HOME/.avalanchego/db/mainnet/v1.0.0`_

Il n'est pas nécessaire que vous supprimiez l'ancienne base de données \(v1.0.0\).

### Est-ce que cette migration changera quelque chose dans l'ancienne base de données?

Non... ** L'ancienne base de données \(v1.0.0\) sera inchangée.

**Cependant, vous ne devriez jamais modifier la base de données pendant que le noeud est en cours d'exécution.**

Pour être clair, si vous voulez supprimer l'ancienne base de données après la nouvelle base de données bootstraps:

* Exécuter v1.4.5 jusqu'à la nouvelle base de données bootstraps et le noeud redémarre
* Arrêter le nœud
* Supprimer le sous-répertoire v1.0.0 de la base de données \(et seulement ce sous-répertoire! \)
* Démarrer le nœud

**Vous devez également vérifier que vos données de frappe ont été migrated avec succès avant de supprimer l'ancienne base de données.**

### Les temps de validation et les données de frappes seront-elles migrated?

Oui, mais par précaution, vous devriez [sauvegarder](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) votre clé / certificat de mise en évidence et vos données de frappe avant d'exécuter AvalancheGo v1.4.5.

### Comment puis-je voir les journaux du noeud v1.4.5 en arrière-plan ?

Par défaut, ces logs sont dans _`$HOME/.avalanchego/logs/fetch-only`_.

### Que dois-je faire si mon ordinateur n'a pas assez d'espace disque ?

Si votre noeud ne fonctionne pas sur le cloud, vous devriez [sauvegarder les données de votre](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) noeud, le déplacer vers une machine avec plus d'espace disque et exécuter AvalancheGo sur cette machine.

Si votre noeud fonctionne sur le cloud, obtenez des instructions pour augmenter la quantité d'espace disque disponible de votre fournisseur de cloud. Voir leur documentation.

### Si quelque chose se passe, comment puis-je revenir à la version précédente ?

Voir [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#using-a-previous-version). Cette migration ne modifie aucune donnée dans la base de données existante. Si vous rencontrez un problème et la dégradation de la base de données existante depuis AvalancheGo v1.4.5 à v1.4.4, vous ne devriez pas avoir de problèmes de dégradation puisque la base de données existante est inchangée. \(Cela suppose que vous n'avez pas supprimé la base de données existante\).

### La mise à jour diminuera-t-elle l'heure de mon validateur ?

Si vous suivez les instructions de ce document, non. Votre noeud continuera de participer au consensus pendant que la nouvelle base de données bootstraps en arrière-plan. Si vous redémarrez votre validateur à partir d'une base de données vide, il sera marqué comme hors ligne pendant qu'il démarre parce qu'il ne sera pas sensible aux requêtes. Par conséquent, vous ne devriez pas re-bootstrap à partir d'une base de données vide si vous pouvez l'éviter.

### Devrais-je juste re-bootstrap de zéro?

Probablement pas. Si votre noeud est validateur, cela causera sa diminution de son temps de fonctionnement. \(Voir la réponse ci-dessus\). Si votre noeud n'est pas un validant, mais il a déjà validator, il sera plus rapide de migrer votre base de données que de re-bootstrap à partir d'une base de données vide. Dans l'un ou l'autre cas, vous êtes préférable de lancer la migration comme expliqué ci-dessus plutôt que simplement supprimer votre base de données existante v1.0.0.

### **Mon noeud fermé pendant la migration / bootstrapping. Que dois-je faire?**

Redémarrez votre nœud. La migration va reprendre où elle a quitté l'endroit. Nous vous recommandons fortement de configurer AvalancheGo pour fonctionner comme un service afin qu'il redémarre automatiquement lors de l'arrêt.

### Je pense que quelque chose ne va pas. Que dois-je faire?

Premièrement, **assurez-vous que vous avez lu ce document en profondeur**. Il pourrait répondre à votre question quelque part. Si vous ne voyez pas la réponse, allez à notre serveur [Discord](https://chat.avalabs.org/) et recherchez votre question. Si elle n'a pas déjà été demandée, afficher dans le canal \#dépannage.

### J'utilise Ortelius, comment puis-je l'améliorer ?

Si vous utilisez Ortelius, suivez ces étapes pour la mettre à niveau:

* Gardez votre ancienne instance Ortelius en cours de fonctionnement.
* Installez une nouvelle instance Ortelius exécutant la dernière version sur un ordinateur différent.
* Après la nouvelle instance Ortelius a terminé le bootstrapping, basculez vers la nouvelle instance.
* Arrêtez l'ancienne instance Ortelius.

Les instructions pour le déploiement d'Ortelius peuvent être trouvées à [https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md](https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md)

Un changement dans cette sortie Ortelius est que Ortelius va maintenant utiliser l'indexeur intégré du noeud. Cela améliore la stabilité et garantit qu'Ortelius n'a aucune transaction manquante, même s'il est redémarré.

### Note pour les noeuds installés avec le script d'installation

Si votre noeud a été installé avec le [script](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer) d'installation, vous devez réparer le fichier de définition du service après la mise à niveau à 1.4.5. Dans la console, entrez la command:_`sudo nano /etc/systemd/system/avalanchego.service`_   Dans l'éditeur, localisez la ligne qui commence avec _`ExecStart=`_ et sur elle supprimer la partie suivante: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_ Ensuite, sauvegardez les changements en appuyant sur ctrl-x et y.

Pour appliquer les changements exécutez la commande:   _`sudo systemctl daemon-reload`_   Enfin, redémarrez le nœud avec:   _`sudo systemctl redémarrage avalanchego`_

