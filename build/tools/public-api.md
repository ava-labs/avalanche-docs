# API publique

Il existe un serveur API public qui permet aux développeurs d'accéder au réseau Avalanche sans avoir à exécuter un nœud eux-mêmes. Le serveur public API est en fait plusieurs nœuds [AvalancheGo](https://github.com/ava-labs/avalanchego) derrière un balanceur de charge pour assurer une haute disponibilité et un débit élevé de requête.

## Utilisation des nœuds API publics

Le serveur public API est sur `https://api.avax.network/` pour Avalanche Mainnet et https://api.avax.network/ pour Avalanche `https://api.avax-test.network/` Pour accéder à une API particulière, il suffit d'ajouter le paramètre de l'API pertinent, comme indiqué [ici](../avalanchego-apis/issuing-api-calls.md). Par exemple, l'URL pour envoyer les appels API de chaîne Xest `https://api.avax.network/ext/bc/X`.

## APIs supportées

Le serveur API public prend en charge tous les paramètres API qui ont un sens à être disponibles sur un service orienté public, y compris les API pour la chaîne [X](../avalanchego-apis/exchange-chain-x-chain-api.md), [la chaîne P](../avalanchego-apis/platform-chain-p-chain-api.md) et la [chaîne C](../avalanchego-apis/contract-chain-c-chain-api.md). Pour une liste complète des API disponibles, voir [ici](../avalanchego-apis/).

## Sessions collants

Les demandes de l'API serveur public sont distribuées par un balanceur de charge à un nœud individuel. Par conséquent, les demandes consécutives peuvent aller à différents nœuds. Cela peut causer des problèmes pour certains cas d'utilisation. Par exemple, un noeud peut penser qu'une transaction donnée est acceptée, tandis que pour un autre noeud la transaction est toujours en cours. Pour travailler autour de cela, vous pouvez utiliser les "sessions collantes", comme documentées [ici](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials). Cela permet l'acheminement des appels API consécutifs vers le même nœud.

Si vous utilisez [AvalancheJS](avalanchejs/) pour accéder à l'API publique, il vous suffit de définir les éléments suivants dans votre code:

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## Disponibilité

L'utilisation des nœuds publics API est gratuite et disponible à tout le monde sans aucune authentification ou autorisation. La limitation des taux est présente, mais nombre des appels API sont cachés, et les limites de taux sont assez élevées. Si votre application fonctionne contre les limites, veuillez [nous contacter](https://chat.avalabs.org).

## Soutien

Si vous avez des questions, des problèmes ou des suggestions, venez [nous parler](https://chat.avalabs.org/).

