# Intégrez un échange avec la chaîne C avalanche

## Aperçu général

L'objectif de ce document est de fournir un bref aperçu de la façon d'intégrer avec la chaîne Avalanche compatible EVM. Pour les équipes qui soutiennent déjà ETH, le support de la chaîne C est aussi simple que la rotation d'un nœud avalanche \(qui a la [même API](https://eth.wiki/json-rpc/API) que [C-Chain \)](https://geth.ethereum.org/docs/rpc/server) et la configuration de la chaîne Avalanche \(43114\) lors de la construction des transactions.

En outre, Ava Labs maintient une implémentation de [l'API Rosetta](https://www.rosetta-api.org/) pour la chaîne C appelée [avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta). Vous pouvez en savoir plus sur ce chemin d'intégration normalisé sur le site Web de l'API Rosetta jointe.

## Intégration utilisant EVM Endpoints

### Exécuter un nœud avalanche

Si vous souhaitez construire votre source de forme noeud ou l'inclure dans une image d'acker, référez le [dépôt AvalancheGo GitHub](https://github.com/ava-labs/avalanchego). Pour rapidement se mettre en marche et exécuter, vous pouvez utiliser le [script d'installation des](../nodes-and-staking/set-up-node-with-installer.md) noeuds qui automatise l'installation et la mise à jour des noeuds avalanchego comme service systemd sur Linux, en utilisant les binaires préconstruits.

### Configuration d'un noeud avalanche

Toutes les options de configuration et leurs valeurs par défaut sont décrites [ici](../../references/command-line-interface.md).

Vous pouvez fournir les options de configuration sur la ligne de commande, ou utiliser un fichier de config, qui peut être plus facile à travailler avec la fourniture de nombreuses options. Vous pouvez spécifier l'emplacement du fichier de `configuration` avec `—config-file=config.json`, où config.json est un fichier JSON dont les clés et les valeurs sont des noms et des valeurs d'options.

Les chaînes individuelles, y compris la chaîne C, ont leurs propres options de configuration qui sont séparées des options de niveau nœuds. Ceux-ci peuvent également être spécifiés dans un fichier de configuration. Pour plus de détails, voir [ici](../../references/command-line-interface.md#chain-configs).

Le fichier de config C-Chain devrait être à `$HOME/.avalanchego/configs/chains/C/config.json`. Vous pouvez également dire à AvalancheGo de rechercher ailleurs le fichier de configuration C-Chain avec l'option `--chain-config-dir`. Exemple fichier de configuration C-Chain :

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

{% allusion style="warning" %} Si vous avez besoin de fonctionnalités [du nœud](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node) d'Archive Ethereum vous devez désactiver you C-Chain qui a été activé par défaut depuis AvalancheGo v1.4.10. Pour désactiver pruning, incluez `pruning, faux` dans le fichier de configuration C-Chain. {% endhint %}

### Interagissant avec la chaîne C

Interagir avec la chaîne C est identique à interagir avec [the](https://geth.ethereum.org/) Vous pouvez trouver le matériel de référence pour l'API C-Chain [ici](../../avalanchego-apis/contract-chain-c-chain-api.md).

Veuillez noter que l'espace `personal_` namespace est désactivé par défaut. Pour l'allumer, vous devez passer le commutateur approprié de ligne de commande à votre nœud, comme dans l'exemple de configuration ci-dessus.

## Intégration avec Rosetta

[Rosetta](https://www.rosetta-api.org/) est une spécification open-source et un ensemble d'outils qui facilitent l'intégration avec différents réseaux blockchain en présentant le même ensemble d'API pour chaque réseau. L'API Rosetta est composée de 2 composants principaux, [l'API de données](https://www.rosetta-api.org/docs/data_api_introduction.html) et [l'API de construction](https://www.rosetta-api.org/docs/construction_api_introduction.html). Ensemble, ces API permettent à quiconque de lire et d'écrire à blockchains dans un format standard sur un protocole de communication standard. Les spécifications de ces API peuvent être trouvées dans le référentiel [specifications](https://github.com/coinbase/rosetta-specifications)

Vous pouvez trouver la mise en œuvre du serveur Rosetta pour Avalanche C-Chain [ici](https://github.com/ava-labs/avalanche-rosetta), tout ce que vous devez faire est d'installer et d'exécuter le serveur avec une configuration appropriée. Il est livré avec un fichier Dockerfile qui package à la fois le serveur et le client Avalanche. Des instructions détaillées peuvent être trouvées dans le dépôt lié.

## Construction de transactions

Les transactions avalanches C-Chain sont identiques aux transactions EVM standard, à 2 exceptions près:

* Ils doivent être signés avec la chaîne d'Avalanche \(43114\).
* Le prix du gaz est fixé à 225 Gwei.

Aux fins du développement, Avalanche supporte tous les outillages populaires pour Ethereum, de sorte que les développeurs familiers avec Ethereum et Solidité peuvent se sentir à la maison. Nous avons des tutoriels et des dépôts pour plusieurs environnements de développement populaires:

* [MetaMask et Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffe](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardcore](https://github.com/ava-labs/avalanche-smart-contract-quickstart)

## Ingestion des données sur la chaîne

Vous pouvez utiliser n'importe quelle manière standard d'ingérer les données sur la chaîne que vous utilisez pour le réseau Ethereum.

### Détermination de la finalité

Le consensus avalanche fournit une finalité rapide et irréversible avec 1-2 secondes. Pour interroger le bloc finalisé le plus à jour, interroger n'importe quelle valeur \(c'est-à-dire bloc, balance, état, etc) avec le `dernier` paramètre. Si vous demandez au-dessus du dernier bloc finalisé \(c.à.d. eth\_blockNumber retourne 10 et vous interrogez 11\), une erreur sera lancée indiquant que les données non finalisées ne peuvent pas être interrogées \(comme avalanchego@v1.3.2\).

### \(Facultatif \) Golang personnalisé SDK

Si vous prévoyez d'extraire des données de la chaîne C dans vos propres systèmes en utilisant golang, nous vous recommandons d'utiliser notre [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient) personnalisé. Le client standard go-ethereum Ethereum ne calcule pas correctement les hachages de blocs \(lorsque vous appelez `block.Hash()`\) parce qu'il ne prend pas en compte le champ d'en-tête ajouté `[ExtDataHash](https://github.com/ava-Labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)` dans les blocs avalanche C-Chain qui est utilisé déplacer AVAX entre les chaînes \(X-Chain et go-ethereum Vous pouvez en savoir plus sur notre abstraction multichaîne [ici](../../../learn/platform-overview/) \(hors de portée pour une intégration C-Chain normale\).

Si vous planifiez la lecture des réponses JSON directement ou utilisez web3.js \(ne pas reconception du hachage reçu sur le fil\) pour extraire les données/logs/reçus, vous ne devriez pas avoir de problèmes !

## Soutien

Si vous avez des problèmes ou des questions, contactez soit directement nos développeurs, soit sur notre serveur [Discord](https://chat.avalabs.org/) public.

