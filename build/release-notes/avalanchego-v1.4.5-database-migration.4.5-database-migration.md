# AvalancheGo v1.4.5 : Migration de la base de données

Cet article est applicable lorsque vous mettez à niveau votre nœud you're < v1.4.5 vers AvalancheGo >= v1.4.5. Bien que cet article soit écrit pour v1.4.5 et que la version ci-dessous, par exemple, elle s'applique encore si vous mettez à niveau you're v1.4.4 vers AvalancheGo v1.4.6, v1.4.7, etc.. Lors de la lecture de ce document, remplacez v1.4.5 par la version à laquelle vous mettez à jour \(sauf en référence au sous-répertoire de la base de données v1.4.5, qui ne changera pas.\)

## Résumé

* [AvalancheGo v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) apporte d'importantes optimisations de la base de données.
* Il doublera temporairement la quantité d'espace disque utilisé par AvalancheGo, et augmentera temporairement l'utilisation de la mémoire et des CPU.
* Veuillez lire ce document entier pour vous assurer que votre nœud migrera et reste en bonne santé pendant la migration. Si elle ne répond pas à votre question, accédez à notre service [Discord](https://chat.avalabs.org/), lisez les messages épinglés et recherchez votre question. Si vous avez encore besoin d'aide, veuillez poster sur le canal de dépannage #de

## Contexte

Nous sommes heureux d'annoncer la publication de [v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) of qui apporte d'importantes optimisations de base de données et des améliorations de stabilité à AvalancheGo.

Lors des tests, nous avons observé une réduction d'~90 % du d'E/S lu sur un validateur Mainnet, comme le montre le graphique ci-dessous :

![](../../.gitbook/assets/0%20%281%29%20%282%29%20%283%29.png)

Les améliorations sont dues à un refactoring important de la gestion d'État dans le P-Chain, ainsi qu'à d'autres optimisations de bases de données.

Nous prévoyons que les nœuds mis à >= v1.4.5 consommeront moins de CPU et qu'ils exécuteront beaucoup moins de lectures de disque une fois la migration terminée. Ces modifications amélioreront également de manière significative la latence de décision de P-Chain.

Cette mise à jour raccourcit également de manière significative le temps qu'il faut pour bootstrap.

## Le processus de mise à jour

Si vous avez une base de données existante sur votre ordinateur, alors lorsque vous exécutez AvalancheGo v1.4.5, il démarrera en fait 2 nœuds. Un sera en cours d'exécution v1.4.4, qui utilise la version de la base de données "ancienne" \(v1.0.0\). L'autre sera en cours d'exécution v1.4.5, qui utilise le "nouveau" format de base de données \(v1.4.5 qui restera le même pour tout AvalancheGo <=1.4.5\).

Le nœud v1.4.4 fonctionnera comme normal, et vous verrez ses journaux comme avant. Le nœud se connectera au réseau en utilisant le même identifiant de nœud qu'auparavant et, si c'est un validateur, participera à un consensus comme auparavant. En bref, les choses devraient être les mêmes que lors de l'exécution de v1.4.4.

Le nœud v1.4.5 sera exécuté en arrière-plan et bootstrap à partir du nœud v1.4.4 qui s'exécute sur le même ordinateur. Ceci est plus rapide et utilise moins de bande passante que la procédure de bootstrap normale, qui exige que les données soient envoyées sur Internet. Au cours du processus de bootstrapping, le nœud v1.4.5 remplira la "nouvelle" base de données.

Lorsque le nœud v1.4.5 est fait le bootstrapping, le nœud v1.4.4 s'arrêtera et le nœud v1.4.5 redémarrer. Lorsque le nœud v1.4.5, il s'exécutera normalement, en utilisant la « nouvelle » base de données, et en terminant la migration. Votre nœud aura le même identifiant de nœud qu'auparavant.

Vous ne devez pas fournir le `--plugin-dir`drapeau. Si vous avez utilisé le script d'installation pour installer AvalancheGo, vous devez supprimer ce drapeau de votre fichier de service AvalancheGo. Voir cette [note](avalanchego-v1.4.5-database-migration.md#note-for-the-nodes-installed-with-installer-script).

## Utilisation de ressources

Pendant la migration, lorsque les deux nœuds sont en cours, AvalancheGo consommera plus de ressources système que d'habitude.

Lorsque la migration sera terminée, il y aura 2 bases de données bootstrapped sur votre ordinateur. Assurez-vous que la quantité d'espace disque gratuit sur votre ordinateur dépasse la taille d'une base de données entièrement bootstrapped \(~38 Go\). Nous vous recommandons de consacrer au moins 200 Go d'espace disque sur votre ordinateur à AvalancheGo. Alors AvalancheGo n'utilise actuellement qu'une fraction de ce montant, nous prévoyons que l'utilisation du disque augmentera avant de mettre en place une solution de taille

L'utilisation de la mémoire et de la processeur sera également élevée pendant que les deux nœuds sont en cours d'exécution. Nous prévoyons que tout ordinateur avec CPU >= 2GHz et >= 6 Go de RAM disponible pour AvalancheGo n'aura pas de problème. Cela dit, vous devez surveiller votre nœud particulièrement attentivement pendant les premiers jours pour vous assurer qu'il est en bonne santé.

Consultez la [FAQ](https://app.gitbook.com/@avalanche/s/avalanche/build/release-notes/avalanchego-v1.4.5-database-migration#faq) pour vérifier que votre ordinateur a un espace disque adéquat et que faire si votre ordinateur a des spécifications inférieures aux spécifications recommandées.

## Instructions de mise à jour étape

* **Votre nœud n'aura pas de temps d'arrêt en suivant ces instructions.**
* **La base de données, plus les données de keystore et les temps de mise en œuvre du validateur, sont automatiquement migrated**

### Vérifier les exigences

Vérifiez que votre ordinateur répond aux exigences suivantes:

* CPU >= 2GHz
* RAM >= 6 GB
* _`$HOME/.avalanchego/db/mainnet/v1.0.0`_Disque dur : vous devez avoir au moins 1,3 fois de l'espace disque actuellement occupé , qui est d'environ 38 Go. Cela signifie que vous devriez avoir environ 50 Go d'espace libre. Sinon, le programme ne pourra pas procéder à la mise à niveau de la base de données. Nous vous recommandons de consacrer au moins 200 Go d'espace disque sur votre ordinateur à AvalancheGo. Pour vérifier combien d'espace vous avez, voir [Combien d'espace disque est disponible en ce moment](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#how-much-disk-space-is-available-right-now)
* Pour remédier, voir
   * [Que dois-je faire si mon ordinateur n'a pas assez d'espace disque ?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-should-i-do-if-my-computer-doesnt-have-enough-disk-space)
   * [Et si mon ordinateur ne peut pas exécuter 2 nœuds en la même temps que l'on ne peut pas utiliser mon ordinateur ?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-if-my-computer-cant-run-2-nodes-at-once)

### Données de sauvegarde

Sauvegardez les données de votre nœud en suivant [cela](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore).

Votre clé de voûte / certificat ne sont pas dans la base de données et ne **doit pas être affecté du tout **par la migration de la base de données. Même ainsi, il est une bonne pratique [d'avoir une sauvegarde](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) de votre clé de jalonnement/certificat.

### Télécharger la nouvelle version

Une nouvelle version peut être téléchargée avec **l'une des approches suivantes en fonction **de vos pratiques :

* Avec [les scripts d'installation](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#node-upgrade), exécutez_`./avalanchego-installer.sh`_
* Avec le téléchargement binaire, voir [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#binary)
* Avec la construction de code source, voir [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#source-code)

### Exécuter la nouvelle version

Pour démarrer la nouvelle version

* Si vous exécutez AvalancheGo en tant que service, que nous recommandons fortement que le _`--plugin-dir`_drapeau n'est pas présent dans le _`avalanchego.service`_fichier. Si elle n'est pas présente, vous pouvez sauter le paragraphe suivant. Si elle est présente, suivez les instructions ci-dessous pour la supprimer.

   Dans la console, entrez la commande :_`sudo nano /etc/systemd/system/avalanchego.service`_   Dans l'éditeur, localisez la ligne qui commence par _`ExecStart=`_et sur elle supprimer la partie suivante: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_Puis enregistrez les modifications en appuyant sur ctrl-x et y.

   Pour appliquer les modifications, exécutez la commande :  _`sudo systemctl daemon-reload`_   Enfin, redémarrez le nœud avec :  _`sudo systemctl restart avalanchego`_

* Avec le téléchargement binaire ou la construction à partir du code source, voir [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#start-a-node-and-connect-to-avalanche).

### Surveiller les progrès

Surveiller et assurez-vous que la migration complète avec succès :

Vous pouvez vérifier les progrès en faisant les choses comme suit :

* Vérifiez l'utilisation de l'espace disque en utilisant la commande

   _`du -h $HOME/.avalanchego/db/mainnet`_

   qui devrait produire des résultats montrant la taille des deux bases de données sous v1.0.0 et v1.4.5, respectivement.

* Les logs pour le nœud qui peuplent la nouvelle base de données peuvent être trouvés sous_`$HOME/.avalanchego/logs/fetch-only`_
* Ces messages indiquent l'achèvement de la migration de la base de données :
   * _`"starting latest node version in normal execution mode"`_Une fois imprimé, puis la nouvelle base de **données **a été bootstrapped, et le nœud a redémarré.
   * Lorsque _`"finished migrating keystore from database version v1.0.0 to v1.4.5"`_sont imprimés, les **données de **Keystore sont finies de migrer.
   * _`"finished migrating platform vm from database version v1.0.0 to v1.4.5"`_Une fois imprimé, les durées **de validateur **sont terminées de migrer.

En fonction de votre ordinateur, le processus de mise à niveau pourrait prendre un certain nombre de temps. Certains validateurs ont signalé plus de 30 heures avec des ordinateurs moins puissants. Il dépend principalement du type de stockage sur l'ordinateur. Si le stockage est basé sur SSD, il devrait être complété en 12 heures ou moins. Sur les systèmes basés sur les HDD, il peut prendre quelques jours \(la migration est presque exclusivement des lectures et des écrits aléatoires et les HDD sont assez lents sur ces types de charges de travail\). Cependant, votre nœud continuera à travailler pendant la migration sans temps d'arrêt.

Vous pouvez vérifier la version de votre nœud en délivrant `info.getNodeVersion`l'API \(voir le tutoriel sur P[ostman\)](https://docs.avax.network/build/tools/postman-avalanche-collection) et vous devez obtenir la réponse comme suit, où le numéro de version devrait être >=1.4.7 en fonction de la version à laquelle vous mettez à jour après la fin de la migration.

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.7"
    },
    "id": 1
}
```

Plus d'informations sur la mise à jour d'un nœud peut être trouvé [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/upgrade-your-avalanchego-node).

## FAQ

### Pourquoi [explorer] dit-il que mon nœud soit toujours sur v1.4.4 ?

Pendant la migration, un nœud v1.4.4 sera en cours d'exécution sur votre ordinateur, comme expliqué ci-dessus. D'autres nœuds sur le réseau verront la vôtre comme exécutant v1.4.4 jusqu'à la fin de la migration.

### La migration de la base de données est-elle obligatoire ?

Oui, Les nœuds qui exécutent AvalancheGo < v1.4.5 ne fonctionnent plus.

### Puis-je mettre à jour vers AvalancheGo 1.4.5 depuis une version autre que v1.4.4 ?

Oui, il devrait fonctionner à partir de toute version < 1.4.5.

### Et si mon ordinateur ne peut pas exécuter 2 nœuds en la même temps que l'on ne peut pas utiliser mon ordinateur ?

Si votre ordinateur \(ordinateur 1\) a moins de 6 Go de RAM, il peut ne pas être en mesure d'exécuter la migration parce qu'il n'a pas assez de mémoire pour exécuter 2 nœuds à la fois. Pour rappel, nous vous conseillons que votre nœud a au moins 6 Go de RAM.

Si vous ne pouvez pas exécuter la migration et que vous souhaitez minimiser le temps que votre nœud est hors ligne, vous pouvez faire ce qui suit :

* Sur un autre ordinateur \(ordinateur 2\), exécutez AvalancheGo v1.4.5, attendez qu'il bootstraps, puis arrêtez AvalancheGo .
* Sur l'ordinateur 1, arrêtez AvalancheGo. Déplacer le répertoire de la base de données de l'ordinateur 2 \(qui vient _`$HOME/.avalanchego/db/`_de démarrer la version de la base de données v1.4.5\) vers le même emplacement sur l'ordinateur 1. Puis mettre à niveau vers AvalancheGo v1.4.5 et l'exécuter.

Notez que **ce n'est pas l'approche conseillée **et que vous ne devriez le faire que si votre nœud a moins de 6 Go de RAM ou un espace disque insuffisant. Encore une fois, nous vous conseillons que votre nœud a au moins 6 Go de RAM et au moins 200 Go d'espace disque. Notez que cette approche ne migre pas de données sur les stages et les validateurs de l'heure.

### Combien d'espace disque ai-je besoin ?

Nous vous recommandons de consacrer au moins 200 Go d'espace disque sur votre ordinateur à AvalancheGo. Alors AvalancheGo n'utilise actuellement qu'une fraction de ce montant \(~38 Go\), nous prévoyons que l'utilisation du disque augmentera avant de mettre en place une solution de taille

### Combien d'espace disque est disponible en ce moment ?

Pour voir la quantité d'espace disque disponible dans votre répertoire de bases de données sur Mac OS ou Linux, faites :

_`df -h $HOME/.avalanchego/db`_

Cette sortie, par exemple, indique que 609 Go d'espace disque est disponible :

_`Filesystem Size Used Avail Use% Mounted on`_

_`/dev/nvme0n1p2 916G 261G 609G 30% /`_

### Combien de temps faut-il pour que la nouvelle base de données puisse bootstrap ?

Il peut prendre environ 30 heures. Cependant, il peut prendre plus ou moins de temps en fonction de votre ordinateur.

### Comment puis-je savoir que la migration de la base de données est terminée?

_`"starting to run node in normal execution mode"`_Une fois imprimé, puis la nouvelle base de données a été bootstrapped, et le nœud a redémarré.

Lorsque _`"finished migrating keystore from database version v1.0.0 to v1.4.5"`_sont imprimés, les données de Keystore sont finies de migrer.

_`"finished migrating platformvm from database version v1.0.0 to v1.4.5"`_Une fois imprimé, les durées de validateur sont terminées de migrer.

### Puis-je supprimer la vieille base de données ?

Une fois que la nouvelle version de la base de données est bootstrapped, le nœud v1.4.5 redémarre et complète la migration de la base de données. Après que cela soit arrivé, vous pouvez supprimer l'ancien répertoire de base de données, qui par défaut est à :

_`$HOME/.avalanchego/db/mainnet/v1.0.0`_

Il n'est pas nécessaire pour vous de supprimer la vieille base de données \(v1.0.0\).

### Cette migration va-t-elle changer quelque chose dans la vieille base de données ?

Non \*\* ! \*\* La vieille base de données \(v1.0.0\) ne sera pas modifiée.

**Cependant, vous ne devriez jamais modifier la base de données pendant que le nœud est en cours d'exécution.**

Pour être clair, si vous voulez supprimer la vieille base de données après les nouvelles bootstraps de la base de données:

* Exécuter v1.4.5 jusqu'à ce que la nouvelle base de données bootstraps et le nœud redémarre
* Arrêter le nœud
* Supprimer le sous-répertoire v1.0.0 de la base de données \(et seulement ce sous-répertoire !\)
* Commencer le nœud

**Vous devez également vérifier que vos données de frappe ont été migrées avec succès avant de supprimer la vieille base de données.**

### Les temps de validateurs et les données de frappes seront-elles migrer ?

Oui, mais par précaution, vous devez [sauvegarder](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) vos clés de jalonnement/certificat et vos données sur les frappes avant d'exécuter AvalancheGo v1.4.5.

### Comment puis-je voir les journaux pour le nœud v1.4.5 en arrière-plan ?

Par défaut, ces journaux sont en _`$HOME/.avalanchego/logs/fetch-only`_.

### Que dois-je faire si mon ordinateur n'a pas assez d'espace disque ?

Si votre nœud ne fonctionne pas sur le cloud, vous devez [sauvegarder les données](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) de votre nœud, le déplacer sur une machine avec plus d'espace disque et exécuter AvalancheGo sur cette machine.

Si votre nœud fonctionne sur le cloud, obtenez des instructions pour augmenter la quantité d'espace disque disponible de votre fournisseur de cloud. Voir leur documentation.

### Si un problème se passe, comment puis-je revenir à la version précédente ?

Voir [ici](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#using-a-previous-version). Cette migration ne modifie pas de données dans la base de données existante. Si vous rencontrez un problème et que vous avez échoué à partir is v1.4.5 à v1.4.4, vous ne devriez pas avoir de problème de dégradation puisque la base de données existante est inchangée. \(Cela suppose que vous n'avez pas supprimé la base de données existante\).

### La mise à jour de mon validateur va-t-il diminuer la mise à jour de mon validateur ?

Si vous suivez les instructions du présent document, non. Votre nœud continuera de participer à un consensus pendant que la nouvelle base de données s'amorce en arrière-plan. Si vous re-bootstrap votre validateur d'une base de données vide, il sera marqué comme hors connexion pendant qu'il bootstraps parce qu'il ne sera pas sensible aux requêtes. Par conséquent, vous ne devez pas re-bootstrap d'une base de données vide si vous pouvez l'éviter.

### Devrais-je juste re-bootstrap de zéro ?

Probablement pas. Si votre nœud est un validateur, cela entraînera une diminution de son temps d'application. \(Voir la réponse ci-dessus\) Si votre nœud n'est pas un validateur, mais qu'il a déjà bootstrapé, il sera plus rapide de migrer votre base de données que de re-bootstrap à partir d'une base de données vide. Dans l'un ou l'autre cas, vous êtes mieux placé pour exécuter la migration comme expliqué ci-dessus plutôt que de supprimer votre base de données v1.0.0.

### **Mon nœud s'est fermé pendant la migration / le bootstrapping. Que dois-je faire ?**

Redémarrez simplement votre nœud. La migration va s'emparer de la place qu'elle a laissée tomber. Nous vous recommandons fortement de configurer AvalancheGo pour fonctionner comme un service afin qu'il redémarre automatiquement lors de l'arrêt.

### Je pense qu'un problème est mauvais. Que dois-je faire ?

Tout d'abord, **assurez-vous que vous avez lu ce document de manière **approfondie. Il pourrait répondre à votre question quelque part Si vous ne voyez pas la réponse, accédez à notre serveur [Discord](https://chat.avalabs.org/) et recherchez votre question. Si elle n'a pas été demandé, postez dans le canal de dépannage #de

### J'utilise Ortelius, comment la mettre à jour ?

Si vous utilisez Ortelius, suivez ces étapes pour la mettre à niveau :

* Gardez votre ancienne instance d'Ortelius en cours de fonctionnement.
* Installez une nouvelle instance d'Ortelius qui exécute la dernière version sur un ordinateur différent.
* Après que la nouvelle instance d'Ortelius ait terminé le bootstrapping, passez à la nouvelle instance.
* Arrêtez l'ancienne instance d'Ortelius.

Les instructions pour le déploiement d'Ortelius peuvent être trouvées sur [https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md](https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md)

Un changement dans cette publication d'Ortelius est que Ortelius utilisera maintenant l'indexeur intégré du nœud. Cela améliore la stabilité et garantit qu'Ortelius n'a pas de transactions manquantes, même si elle est redémarrée.

### Note pour les nœuds installés avec le script d'installateur

Si votre nœud a été installé avec le [script d'installation](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer), vous devez réparer le fichier de définition du service après la mise à jour vers 1.4.5. Dans la console, entrez la commande :_`sudo nano /etc/systemd/system/avalanchego.service`_   Dans l'éditeur, localisez la ligne qui commence par _`ExecStart=`_et sur elle supprimer la partie suivante: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_Puis enregistrez les modifications en appuyant sur ctrl-x et y.

Pour appliquer les modifications exécutent la commande :  _`sudo systemctl daemon-reload`_   Enfin, redémarrez le nœud avec :  _`sudo systemctl restart avalanchego`_

