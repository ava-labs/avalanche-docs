# Collection Postman

## Qu'est-ce que Postman ?

Postman est un outil gratuit utilisé par les développeurs pour envoyer rapidement et facilement et facilement les demandes et les API de REST, SOAP et GraphQL. Il est disponible en tant qu'outil en ligne et une application pour Linux, MacOS et Windows. Postman vous permet de délivrer rapidement des appels API et de voir les réponses dans un formulaire de recherche bien formaté.

Nous avons fait une collection Postman pour [Avalanche](https://docs.avax.network)[](../release-notes/avalanchego.md), qui inclut tous les appels API publics qui sont disponibles sur l'instance AvalancheGo, vous permettant d'émettre rapidement des commandes à votre nœud et de voir la réponse, sans avoir à copier et à coller des commandes longues et `curl`compliquées.

En plus de la collection de l'API, il y a également l'exemple d'environnement Avalanche pour Postman, qui définit des variables communes telles que l'adresse IP du nœud, vos adresses Avalanche et des éléments communs similaires des requêtes, de sorte que vous n'avez pas à les saisir plusieurs fois.

Combinés, ils vous permettront de garder facilement des onglets sur votre nœud, de vérifier son état et de faire des requêtes rapides pour trouver des détails sur son fonctionnement.

## Configuration

### Installation

Postman peut être installé localement ou utilisé comme une application web. Nous recommandons d'installer l'application, car elle simplifie l'opération. Vous pouvez télécharger Postman depuis son [site Web](https://www.postman.com/downloads/). Il est recommandé de vous inscrire en utilisant votre adresse e-mail car votre espace de travail peut être facilement sauvegardé et partagé entre l'application web et l'application installée sur votre ordinateur.

![Télécharger Postman](../../.gitbook/assets/postman_01_download.png)

Après que vous avez installé l'application, exécutez-la . Il vous invite à créer un compte ou à vous connecter. Fais-le. Encore une fois, il n'est pas nécessaire, mais recommandé.

### Import

Sélectionnez `New workspace`l'onglet Workspaces et suivez les instructions pour créer un nouvel espace de travail. Cela sera là où le reste du travail sera fait.

![Nouvel espace de travail](../../.gitbook/assets/postman_02_workspace.png)

Nous sommes prêts à importer la collection. Sur l'en-tête de l'onglet Worskspaces, sélectionnez `New`et passez à `Link`l'onglet.

![Collection d'importation](../../.gitbook/assets/postman_03_import.png)

Là, dans le champ d'entrée de l'URL coller le lien vers la collection :

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postman reconnaîtra le format du contenu du fichier et offrira d'importer le fichier en tant que collection. Remplissez l'importation. Maintenant vous aurez la collection Avalanche dans votre espace de travail.

![Contenu de la collection](../../.gitbook/assets/postman_04_collection.png)

### Import de l'environnement

Ensuite, nous devons importer les variables d'environnement. Encore une fois, l'en-tête de l'onglet Worskspaces sélectionnez `New`et passez à `Link`l'onglet. cette fois, collez le lien vers l'environnement JSON :

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postman reconnaîtra le format du fichier :

![Import de l'environnement](../../.gitbook/assets/postman_05_environment.png)

Importez-la sur votre espace de travail. Maintenant, nous devrons modifier cet environnement pour convenir aux paramètres réels de votre installation particulière. Ce sont les paramètres qui diffèrent des défauts de paiement du fichier importé.

Cliquez sur l'icône des yeux à côté de la chute d'environnement :

![Contenu de l'environnement](../../.gitbook/assets/postman_06_variables.png)

Sélectionnez le `Edit`bouton pour changer les défauts. Au minimum, vous devrez changer l'adresse IP de votre nœud, qui est la valeur de la `host`variable. Modifiez-la sur l'IP de votre nœud \(modifiez les valeurs et `initial`les `current`valeurs\). De plus, si votre nœud ne fonctionne pas sur la même machine où vous avez installé Postman, assurez-vous que votre nœud accepte les connexions sur le port API depuis l'extérieur en vérifiant l'option de [ligne](../references/command-line-interface.md#http-server) de commande appropriée.

Maintenant nous avons tout trié, et nous sommes prêts à interroger le nœud.

## En effet, les appels API

Ouvrez l'un des groupes d'appels de l'API , par exemple `Health`. Appel en double-cliquer sur `getLiveness`:

![Appel API](../../.gitbook/assets/postman_07_making_calls.png)

`http`Vous verrez que le format de l'appel utilise les variables et les variables `host``port`d'environnement. Cliquez sur `Send`. La demande sera envoyée, et bientôt vous verrez la réponse, dans `Body`l'onglet de la :`Response`

![Réponse](../../.gitbook/assets/postman_08_response.png)

Pour voir l'appel réel et les variables qui sont envoyées au nœud, passez à `Body`l'onglet dans les onglets d'appel d'API. Là, vous pouvez changer rapidement les variables pour voir la réponse à différentes requêtes.

## Conclusion

Si vous avez complété le tutoriel, vous êtes maintenant en mesure de délivrer rapidement des appels API à votre nœud sans en faire de la messagerie avec les commandes de curl dans le terminal. Cela vous permet de voir rapidement l'état de votre nœud, de suivre les changements ou de vérifier la santé ou la vésicule biliaire de votre nœud.

## Contribuer

Nous espérons continuer à tenir continuellement cette collection à jour avec les [API](https://docs.avax.network/build/avalanchego-apis) d'Avalanche, et à ajouter des [visualisations de données](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data). Si vous êtes en mesure d'améliorer la collection d'Avalanche Postman, créez d'abord une branche de fonctionnalité en you're de `master`, puis faites ensuite les améliorations sur votre branche de fonctionnalité et enfin créez une [demande](https://github.com/ava-labs/avalanche-docs/pulls) de pull pour fusionner votre travail vers `master`.

Si vous avez d'autres questions ou suggestions, venez [nous parler](https://chat.avalabs.org/).

