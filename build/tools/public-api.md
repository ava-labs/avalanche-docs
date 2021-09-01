# API publique

Il existe un serveur API public qui permet aux développeurs d'accéder au réseau Avalanche sans avoir à exécuter un nœud eux-mêmes. Le serveur API public est en fait plusieurs nœuds [AvalancheGo](https://github.com/ava-labs/avalanchego) derrière un AvalancheGo pour garantir une haute disponibilité et un débit de demandes élevées.

## Utiliser les nœuds d'API publique

Le serveur API public est à l'adresse `https://api.avax.network/`d'Avalanche Mainnet et `https://api.avax-test.network/`d'Avalanche Testnet. Pour accéder à un API particulier, il suffit d'annexer le paramètre API pertinent, comme il est [documenté ici](../avalanchego-apis/issuing-api-calls.md). Par exemple, l'URL pour envoyer des appels sur l'API X-Chain est `https://api.avax.network/ext/bc/X`.

## API prises en charge

Le serveur API public prend en charge tous les paramètres d'API qui ont un sens pour être disponibles sur un service en face au public, y compris les API pour les [X-Chain](../avalanchego-apis/exchange-chain-x-chain-api.md), [P-Chain](../avalanchego-apis/platform-chain-p-chain-api.md) et [C-Chain](../avalanchego-apis/contract-chain-c-chain-api.md). Pour une liste complète des API disponibles, voir [ici](../avalanchego-apis/).

## Sessions Sticky

Les demandes au serveur d'API publique sont distribuées par un balanceur de charges sur un nœud individuel. En conséquence, les demandes consécutives peuvent être adressées à différents nœuds. Cela peut causer des problèmes pour certains cas d'utilisation. Par exemple, un nœud peut penser qu'une transaction donnée est acceptée, tandis que pour un autre nœud la transaction est encore en train de traiter. Pour [travailler](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) sur ce point, vous pouvez utiliser des « sessions collantes », comme il est documenté ici. Cela permet d'acheminer les appels API consécutifs vers le même nœud.

Si vous utilisez [AvalancheJS](avalanchejs/) pour accéder à l'API publique, configurez simplement les éléments suivants dans votre code :

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## Disponibilité

L'utilisation des nœuds API publics est gratuite et disponible pour tout le monde sans aucune authentification ou autorisation. La limitation des taux est présente, mais beaucoup d'appels API sont cachés, et les limites de taux sont assez élevées. Si votre application est en cours de mise en œuvre contre les limites, veuillez [nous contacter](https://chat.avalabs.org).

## Support

Si vous avez des questions, des problèmes ou des suggestions, venez [nous parler](https://chat.avalabs.org/).

