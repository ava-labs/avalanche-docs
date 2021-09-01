# Intégrer une bourse avec Avalanche C-Chain

## Aperçu

L'objectif de ce document est de fournir un bref aperçu de la manière de s'intégrer à l'Avalanche C-Chain compatible EVM. Pour les équipes qui prennent déjà en charge l'ETH, qui prennent en charge la C-Chain est aussi simple que de faire tourner un nœud Avalanche \(qui a la [même API](https://eth.wiki/json-rpc/API) que [go-ethereum](https://geth.ethereum.org/docs/rpc/server)\) et de peupler le ChainID \(43114\) d'Avalanche lors de la construction des transactions.

En outre, Ava Labs maintient une implémentation de [l'API Rosetta](https://www.rosetta-api.org/) pour la C-Chain, appelée [avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta). Vous pouvez en apprendre davantage sur ce chemin d'intégration normalisé sur le site Web de l'API Rosetta.

## Intégration avec les Endpoints EVM

### Exécuter un nœud Avalanche

Si vous souhaitez construire votre source de formulaire de nœud ou l'inclure dans une image in référencer le [dépôt GitHub AvalancheGo](https://github.com/ava-labs/avalanchego) Pour se mettre rapidement en cours d'exécution, vous pouvez utiliser le [script](../nodes-and-staking/set-up-node-with-installer.md) d'installation du nœud qui automatise l'installation et la mise à jour du nœud avalanchego en tant que service systemd sur Linux, en utilisant des binaires préconstruits.

### Configuration d'un nœud Avalanche

Toutes les options de configuration et leurs valeurs par défaut sont décrites [ici](../../references/command-line-interface.md).

Vous pouvez fournir des options de configuration sur la ligne de commande, ou utiliser un fichier de config, qui peut être plus facile à travailler lors de la fourniture de nombreuses options. Vous pouvez spécifier l'emplacement du fichier de config avec `—config-file=config.json`, où `config.json`est un fichier JSON dont les clés et les valeurs sont des noms et des valeurs d'option.

Les chaînes individuelles, y compris le C-Chain, ont leurs propres options de configuration qui sont séparées des options de niveau des nœuds. Ceux-ci peuvent également être spécifiés dans un fichier de config. Pour plus de détails, voir [ici](../../references/command-line-interface.md#chain-configs).

Le fichier de config C-Chain doit être à `$HOME/.avalanchego/configs/chains/C/config.json`. Vous pouvez également dire à AvalancheGo de chercher ailleurs pour le fichier de config C-Chain avec option `--chain-config-dir`. Un exemple de fichier de config C-Chain :

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true,
  "local-txs-enabled": true
}
```

{% hint style="warning" %}Si vous avez besoin de fonctionnalités [de](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) nœud d'archive Ethereum, vous devez désactiver l'écaillement, qui a été activé par défaut depuis AvalancheGo v1.4.10. Pour désactiver l'élagage, inclure `"pruning-enabled": false`dans le fichier de config C-Chain.{% endhint %}

### Interagissant avec la C-Chain

En interagissant avec la C-Chain, il est identique à celui d'interagir avec [go-ethereum](https://geth.ethereum.org/). Vous pouvez trouver le matériel de référence pour [l'API](../../avalanchego-apis/contract-chain-c-chain-api.md) C-Chain.

Veuillez noter que l'espace de `personal_`noms est désactivé par défaut. Pour l'activer, vous devez passer le commutateur de ligne de commande approprié à votre nœud, comme dans l'exemple de configuration ci-dessus.

## Intégration avec Rosetta

[Rosetta](https://www.rosetta-api.org/) est une spécification open-source et un ensemble d'outils qui facilite l'intégration avec les différents réseaux blockchain en présentant le même ensemble d'API pour chaque réseau. L'API Rosetta est composée de 2 composants de base, l'API de [données](https://www.rosetta-api.org/docs/data_api_introduction.html) et l'API de [construction](https://www.rosetta-api.org/docs/construction_api_introduction.html). Ensemble, ces API permettent à quiconque de lire et d'écrire à des blockchains dans un format standard sur un protocole de communication standard. Les spécifications de ces API peuvent être trouvées dans le dépôt de [rosetta-specifications](https://github.com/coinbase/rosetta-specifications)

Vous pouvez trouver ici la mise en œuvre du serveur Rosetta pour Avalanche [C-Chain](https://github.com/ava-labs/avalanche-rosetta), tout ce que vous devez faire est d'installer et d'exécuter le serveur avec une configuration appropriée. Il est livré avec un fichier de Dockerfile qui package à la fois le serveur et le client d'Avalanche. Des instructions détaillées peuvent être trouvées dans le dépôt lié.

## Construire des transactions

Les transactions de Avalanche C-Chain sont identiques aux transactions EVM standard, à 2 exceptions près :

* Ils doivent être signés avec la ChainID d'Avalanche \(43114\).
* Le prix du gaz est fixé à 225 Gwei.

Pour le développement, Avalanche prend en charge tous les outils populaires pour Ethereum, de sorte que les développeurs familiers avec Ethereum et Solidity peuvent se sentir bien à la maison. Nous avons des tutoriels et des référentiels pour plusieurs environnements de développement populaires :

* [MetaMask et Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffe](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md)

## Ingérant les données sur la chaîne

Vous pouvez utiliser n'importe quelle manière standard d'ingérer les données sur la chaîne que vous utilisez pour le réseau Ethereum.

### Détermination de la Finalité

Le consensus d'Avalanche fournit une finalité rapide et irréversible avec 1 à 2 secondes. Pour interroger le bloc finalisé le plus à jour, interrogez toute valeur \(c'est-à-dire block, équilibre, état, etc.\) sur le `latest`paramètre. Si vous vous interrogez au dessus du dernier bloc finalisé \(eth\_blockNumber retourne 10 et que vous interrogez 11\), une erreur sera jetée indiquant que les données non finalisées ne peuvent pas être interrogées \(à partir de avalanchego@v1.3.2\).

### \(facultatif\) Custom Golang

Si vous prévoyez d'extraire des données de la C-Chain dans vos propres systèmes en utilisant du golang, nous vous recommandons d'utiliser notre [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient) personnalisé. Le client go-ethereum standard ne calcule pas correctement les hachages de bloc \(lorsque vous appelez `block.Hash()`\) parce qu'il ne prend pas en compte le champ `[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)`d'en-tête ajouté dans les blocs C-Chain, qui est utilisé pour déplacer AVAX entre les chaînes \(X-Chain et P-Chain\). Vous pouvez en lire plus sur notre abstraction multi-chaînes [ici](../../../learn/platform-overview/) \(hors de portée pour une intégration C-Chain normale\).

Si vous planifiez la lecture des réponses JSON directement ou si vous utilisez web3.js \(ne ne réprime pas le hachage reçu sur le fil\) pour extraire les données/logs/reçus, vous ne devriez pas avoir d'problèmes !

## Support

Si vous avez des problèmes ou des questions, contactez directement nos développeurs ou sur notre serveur [Discord](https://chat.avalabs.org/).

