# Collection postman

## Qu'est-ce que Postman ?

Postman est un outil gratuit utilisé par les développeurs pour envoyer rapidement et facilement les demandes REST, SOAP et GraphQL et les API de test. Il est disponible en tant qu'outil en ligne et une application pour Linux, MacOS et Windows. Postman vous permet de délivrer rapidement des appels API et de voir les réponses dans une forme joliment formatée, consultable.

Nous avons fait une collection Postman pour [Avalanche](https://docs.avax.network), qui inclut tous les appels publics API qui sont disponibles sur [l'instance](../release-notes/avalanchego.md) AvalancheGo, vous permettant de délivrer rapidement des commandes à votre noeud et de voir la réponse, sans avoir à copier et coller les commandes longues et compliquées `curl`.

Avec la collection API, il y a également l'exemple environnement Avalanche pour Postman, qui définit des variables communes telles que l'adresse IP du nœud, vos adresses Avalanche et des éléments communs similaires des requêtes, vous n'avez donc pas à les saisir plusieurs fois.

Combinés, ils vous permettront de garder facilement des onglets sur votre nœud, vérifier son état et effectuer des requêtes rapides pour trouver les détails de son fonctionnement.

## Configuration

### Installation postman

Postman peut être installé localement ou utilisé comme une application web. Nous recommandons l'installation de l'application, car il simplifie l'opération. Vous pouvez télécharger Postman depuis son [site Web](https://www.postman.com/downloads/). Il est recommandé que vous vous inscrivez à l'aide de votre adresse e-mail car votre espace de travail peut être facilement sauvegardé et partagé entre l'application web et l'application installée sur votre ordinateur.

![Télécharger Postman](../../.gitbook/assets/postman_01_download.png)

Après que vous avez installé l'application, exécutez-la. Il vous invite à créer un compte ou vous connecter. Fais-le. Encore une fois, il n'est pas nécessaire, mais recommandé.

### Importation

Sélectionnez `Nouvel espace de travail` à partir de l'onglet Espaces de travail et suivez les instructions pour créer un nouvel espace de travail. Cela sera là où le reste du travail sera effectué.

![Nouvel espace de travail](../../.gitbook/assets/postman_02_workspace.png)

Nous sommes prêts à importer la collection. Sur l'en-tête de l'onglet Worskspaces, sélectionnez `Nouveau` et basculer vers l'onglet `Liaison.`

![Import](../../.gitbook/assets/postman_03_import.png)

Là, dans le champ d'entrée URL coller le lien vers la collection:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postman reconnaîtra le format du contenu du fichier et vous offrira d'importer le fichier comme une collection. Remplissez l'importation. Maintenant, vous aurez la collection Avalanche dans votre Workspace.

![Contenu de la collection](../../.gitbook/assets/postman_04_collection.png)

### importations/environnement

Ensuite, nous devons importer les variables environnementales. Encore une fois, l'en-tête de l'onglet Worskspaces sélectionnez `Nouveau` et basculer vers l'onglet `Liaison.` cette fois, coller le lien vers l'environnement JSON:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postman reconnaîtra le format du fichier :

![importations/environnement](../../.gitbook/assets/postman_05_environment.png)

Importez-le dans votre espace de travail. Maintenant, nous allons devoir modifier cet environnement en fonction des paramètres réels de votre installation particulière. Ce sont les paramètres qui diffèrent des défauts dans le fichier importé.

Cliquez sur l'icône de l'oeil à côté de l'environnement déroulant:

![Contenu de l'environnement](../../.gitbook/assets/postman_06_variables.png)

Sélectionnez le bouton `Modifier` pour changer les défauts. Au minimum, vous devrez modifier l'adresse IP de votre nœud, qui est la valeur de la variable `hôte.` Modifiez-le à l'IP de votre noeud \(modifiez les valeurs `initiales` et `actuelles\).` Aussi, si votre noeud n'est pas exécuté sur la même machine où vous avez installé Postman, assurez-vous que votre noeud accepte les connexions du port API depuis l'extérieur en vérifiant [l'option appropriée de la ligne de commande](../references/command-line-interface.md#http-server).

Maintenant, nous avons tout trié, et nous sommes prêts à interroger le nœud.

## Faisant appel API

Ouvrez l'un des groupes d'appels API par exemple `la santé`. Double-cliquez `getLiveness`

![Appel API](../../.gitbook/assets/postman_07_making_calls.png)

Vous verrez que le format de l'appel utilise les variables d'environnement `http`, `host` et `port`. Cliquez sur `Envoyer`. La demande sera envoyée, et bientôt vous verrez la réponse, dans l'onglet `Corps` dans la `réponse`:

![Réponse](../../.gitbook/assets/postman_08_response.png)

Pour voir l'appel réel et les variables qui sont envoyées au nœud, passez à l'onglet `Corps` dans les onglets d'appel API . Là, vous pouvez rapidement modifier les variables pour voir la réponse à différentes requêtes.

## Conclusion

Si vous avez terminé le tutoriel, vous êtes maintenant en mesure de délivrer rapidement des appels API à votre noeud sans désordre avec les commandes curl dans le terminal. Cela vous permet de voir rapidement l'état de votre nœud, de suivre les changements ou de vérifier la santé ou la liveness de votre nœud.

## Contribuer

Nous espérons continuer à tenir cette collection à jour avec les [API Avalanche](https://docs.avax.network/build/avalanchego-apis), et ajouter également des [visualisations de données](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data). Si vous êtes en mesure d'aider à améliorer la collection Avalanche Postman de quelque façon, créer d'abord une branche de fonctionnalité en branchant la fonction hors de `maître`, ensuite faire les améliorations sur votre branche de fonctionnalité et enfin créer une [demande de traction](https://github.com/ava-labs/avalanche-docs/pulls) pour fusionner votre travail dans la `fonction principale`.

Si vous avez d'autres questions ou suggestions, venez [nous parler](https://chat.avalabs.org/).

