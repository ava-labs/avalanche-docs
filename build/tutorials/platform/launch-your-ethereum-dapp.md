# Lancer votre Dapp Ethereum

## Aperçu général

Le but de ce document est de vous aider à lancer votre dapp existante sur Avalanche. Il contient une série de ressources conçues pour vous aider à obtenir les bases de la Plateforme Avalanche et comment il fonctionne, montrer comment vous connecter au réseau, comment utiliser vos outils et environnements existants dans le développement et le déploiement sur Avalanche, ainsi que certains pièges communs que vous devez considérer lors de l'exécution de votre dapp sur Avalanche.

## Bases de la plateforme

Avalanche est un [réseau de réseaux](../../../learn/platform-overview/). Cela signifie qu'il n'est pas une chaîne unique exécutant un type unique et uniforme de blocs. Il contient plusieurs sous-réseaux, chacune exécutant une chaîne plus hétérogène. Mais, pour exécuter un dapp Ethereum sur un réseau rapide à faible coût avec une finalité instantanée, nous n'avons pas besoin de nous préoccuper de ce moment. En utilisant le lien ci-dessus, vous pouvez en savoir plus si vous le souhaitez, mais tout ce que vous devez savoir maintenant, c'est que l'une des chaînes qui fonctionnent sur le réseau primaire Avalanche est la chaîne C-Chain contractuelle\).

C-Chain exécute une fourchette de [go-ethereum](https://geth.ethereum.org/docs/rpc/server) appelée [coreth](https://github.com/ava-labs/coreth) qui a les portions de réseautage et de consensus remplacées par les équivalents avalanches. Ce qui reste, c'est What's VM, qui exécute les contrats intelligents Solidité et gère les structures et les blocs de données sur la chaîne. Par conséquent, vous obtenez une chaîne de blocs qui peut exécuter tous les contrats intelligents Solidité depuis Ethereum, mais avec beaucoup plus grande bande passante de transaction et une finalité instantanée que [le consensus révolutionnaire d'Avalanche](../../../learn/platform-overview/avalanche-consensus.md) permet d'obtenir.

Coreth est chargé comme un plugin dans [AvalancheGo](https://github.com/ava-labs/avalancheg), l'application noeud client utilisée pour exécuter le réseau Avalanche.

En ce qui concerne votre dapp, il sera exécuté la même chose que sur Ethereum, juste plus rapide et moins cher. Trouvons comment.

## Accès à la chaîne C avalanche

C-Chain expose la [même API](../../avalanchego-apis/contract-chain-c-chain-api.md) que go-ethereum, vous pouvez donc utiliser toutes les API familières qui sont disponibles sur Ethereum pour l'interaction avec la plateforme.

Il existe plusieurs façons de travailler avec la chaîne C.

### Grâce à MetaMask

Vous pouvez accéder à la chaîne C via MetaMask, en définissant un réseau personnalisé. Allez dans MetaMask, connectez-vous, cliquez sur le plan du réseau déroulant, et sélectionnez 'RPC personnalisé'. Les données relatives à Avalanche sont les suivantes.

#### **Paramètres du réseau d'avalanche:**

* **Nom du réseau**: Avalanche Mainnet C-Chain
* **Nouvelle URL RPC**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Symbole **: `AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI Paramètres de testnet:**

* **Nom du réseau**: Avalanche FUJI C-Chain
* **Nouvelle URL RPC**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Symbole **: `AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

Dans l'interface web de votre application, vous pouvez [ajouter Avalanche programmatiquement](../smart-contracts/add-avalanche-to-metamask-programmatically.md) de sorte que vos utilisateurs n'ont pas à entrer les données réseau manuellement. Pour voir l'ajout du flux réseau personnalisé en action, consultez [Pangolin DEX](https://app.pangolin.exchange/).

### Utilisation des nœuds publics API

Au lieu de proxying opérations réseau via MetaMask, vous pouvez utiliser l'API publique, qui consiste en un certain nombre de nœuds AvalancheGo derrière un balanceur de charge.

The API de chaîne C est [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) pour le réseau principal et [C-Chain](https://api.avax-test.network/ext/bc/C/rpc) pour le réseau testnet.

Pour plus d'informations, reportez-vous à la [documentation](../../tools/public-api.md).

### Exécuter votre propre nœud

Si vous ne voulez pas que votre dapp dépend d'un service centralisé que vous ne contrôlez pas, vous pouvez exécuter votre propre noeud et accéder au réseau de cette façon. L'exécution de votre propre noeud évite également les problèmes potentiels avec la congestion publique de l'API et la limitation de taux.

Aux fins du développement, [voici](../nodes-and-staking/run-avalanche-node.md) un tutoriel pour le téléchargement, la construction et l'installation of Si vous allez exécuter un noeud de production sur une machine Linux, [voici](../nodes-and-staking/set-up-node-with-installer.md) un tutoriel qui montre comment utiliser le script d'installation pour installer rapidement et facilement le noeud comme un service `systemd`. Script gère également la mise à niveau des nœuds. Si vous souhaitez exécuter un noeud dans un conteneur d'acker, il ya [des scripts de construction](https://github.com/ava-labs/avalanchego/tree/master/scripts) dans le repo AvalancheGo pour diverses configurations Docker.

### Exécuter un réseau local d'essai

Si vous avez besoin d'un réseau de test privé pour tester votre dapp, [Avash](https://github.com/ava-labs/avash) est un client shell pour le lancement des réseaux locaux d'avalanche, similaire à Ganache sur Ethereum.

Avash utilise Lua comme langue de script pour orchestrer les réseaux locaux. Vous pouvez trouver un tutoriel pour Avash [ici](../../tools/avash.md).

## Développement et déploiement de contrats

Étant une blockchain compatible Ethereum, tous les outils et environnements de développeur Ethereum habituels peuvent être utilisés pour développer et déployer des applications pour la chaîne C d'Avalanche.

### Remix

[Voici](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md) un tutoriel pour l'utilisation de Remix pour déployer des contrats intelligents sur Avalanche. Il se fonde sur MetaMask pour l'accès au réseau Avalanche.

### Truffe

Vous pouvez également utiliser Truffle pour tester et déployer des contrats intelligents sur Avalanche. Découvrez comment dans [ce](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md) tutoriel.

### Hardcore

Hardhat est le dernier environnement de développement et de test pour les contrats intelligents Solidité, et celui que nos développeurs utilisent le plus. Grâce à son superbe soutien aux tests, il est le moyen recommandé de développer l'Avalanche.

[Voici](https://github.com/ava-labs/avalanche-smart-contract-quickstart) un dépôt quickstart que nos développeurs utilisent pour démarrer de nouveaux projets. Il est déjà configuré pour Avalanche de sorte qu'aucune configuration supplémentaire n'est nécessaire.

## Explorateur d'avalanche

Une partie essentielle de l'environnement de développement de contrats intelligent est l'explorateur, qui indexe et sert les données de [blockchain](https://cchain.explorer.avax-test.network/). L'explorateur C-Chain Mainnet est disponible sur [explorer,](https://cchain.explorer.avax.network/) et l'explorateur testnet sur explorer, Outre l'interface web, il expose également l'API standard [Ethereum JSON RPC](https://eth.wiki/json-rpc/API).

## Robinet d'avalanche

Aux fins du développement, vous aurez besoin de jetons de test. Avalanche dispose d'un [robinet](https://faucet.avax-test.network/) qui goutte les jetons de test à l'adresse de votre choix. Collez votre adresse C-Chain là.

Si vous avez besoin, vous pouvez également exécuter un robinet localement, mais la construire depuis le [dépôt](https://github.com/ava-labs/avalanche-faucet).

## Vérification du contrat

La vérification intelligente des contrats fournit la transparence aux utilisateurs agissant avec les contrats intelligents en publiant le code source, ce qui permet à chacun d'attester qu'il fait réellement ce qu'il prétend faire. Vous pouvez vérifier vos contrats intelligents à l'aide [de l'explorateur C-Chain](https://cchain.explorer.avax.network/). La procédure est simple:

* naviguer à votre adresse du contrat publié sur l'explorateur
* sur l'onglet `code` sélectionnez `vérifier et publier`
* copier et coller le code source aplati et entrer tous les paramètres de construction exactement comme ils sont sur le contrat publié
* cliquez sur `vérifier et publier`

Si le succès est effectué, l'onglet `code` aura désormais un point de contrôle vert, et vos utilisateurs seront en mesure de vérifier le contenu de votre contrat. Il s'agit d'un signal fort positif que vos utilisateurs peuvent faire confiance à vos contrats, et il est fortement recommandé pour tous les contrats de production.

## Contrôles de sécurité contractuels

En raison de la nature des applications distribuées, il est très difficile de réparer les bogues une fois que l'application est déployée. Par conséquent, assurez-vous que votre application fonctionne correctement et en toute sécurité avant le déploiement est d'une grande importance. Les examens de la sécurité des contrats sont effectués par des entreprises et des services spécialisés. Ils peuvent être très coûteux, qui pourrait être hors de portée pour les développeurs simples et les start-ups. Mais, il ya également des services et des programmes automatisés qui sont libres d'utiliser.

Les plus populaires sont:

* [Slither](https://github.com/crytic/slither), voici un [tutoriel](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
* [Mythologie](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

Nous recommandons fortement d'utiliser au moins l'un d'eux si l'examen professionnel de la sécurité du contrat n'est pas possible. Vous pouvez trouver [ici](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md) un aperçu plus complet des pratiques de développement sécuritaires.

## Gotchas et choses à regarder pour

La chaîne C de la plate-forme Avalanche est compatible EVM, mais elle n'est pas identique. Il ya certaines différences que vous devez être conscient, sinon, vous pouvez créer des bugs subtils ou des incohérences dans la façon dont vos apps se comportent.

Voici les principales différences que vous devriez être conscient.

### Temps de mesure

Il est coutumier sur Ethereum d'utiliser la progression de la hauteur de bloc comme mandataire pour le temps. Vous ne devriez pas faire cela sur Avalanche. Les chaînes sur Avalanche sont quiescent, ce qui signifie que s'il n'y a pas d'activité, il n'y a pas de blocs produits. L'opposé est également vrai, s'il y a une grande quantité d'activité, les blocs sont fabriqués très rapidement. Par conséquent, vous ne devriez pas mesurer le passage du temps par le nombre de blocs qui sont produits. Les résultats ne seront pas exacts, et votre contrat peut être manipulé par des tiers.

Au lieu du taux de bloc, vous devriez mesurer le temps simplement en lisant l'attribut timestamp des blocs produits. Les Timestamps sont garanties d'augmenter monotoniquement et d'être dans les 30 secondes du temps réel.

### Finalité

Sur Ethereum, la chaîne de blocs peut être réorganisée et les blocs peuvent être orphelins, vous ne pouvez donc pas compter sur le fait qu'un bloc a été accepté tant qu'il est plusieurs blocs plus loin de la pointe \(habituellement, il est présumé que les blocs 6 places profondes sont sûr\). Ce n'est pas le cas sur Avalanche. Les blocs sont soit acceptés soit rejetés dans une seconde ou deux. Et une fois que le bloc a été accepté, il est définitif et ne peut pas être remplacé, abandonné ou modifié. Ainsi, le concept de 'nombre de confirmation' sur Avalanche n'est pas utilisé. Dès qu'un bloc est accepté et disponible dans l'explorateur, il est définitif.

### Prix du gaz

Le gaz sur Avalanche est brûlé. Les validateurs ne gardent pas le gaz pour eux-mêmes \(ils sont récompensés pour le stacking\), de sorte que la dynamique des 'guerres de gaz' où les transactions à prix plus élevé sont incluses d'abord est inexistante. Par conséquent, il n'est jamais nécessaire de mettre un prix plus élevé de gaz sur vos transactions. Vous ne brûlerez que du gaz en vain.

### Configuration de la base

Par défaut, coreth est configuré d'une manière optimale pour l'exécution publique des nœuds utilisés comme validateurs. Pour le développement ou les dapps, vous pouvez vouloir modifier certains défauts en paramètres plus appropriés pour votre utilisation. Ceci est fait par les options de ligne de commande du nœud. Les options de ligne de commande pour coreth sont répertoriées [ici](../../references/command-line-interface.md#coreth-config), ainsi que leurs valeurs par défaut.

Vous pouvez fournir des options sur la ligne de commande, ou utiliser le fichier config, qui peut être plus facile à travailler avec lorsque beaucoup d'options personnalisées sont configurées. Utilisez l'option `—config-file=config.json``,` puis fournir une configuration complète dans le fichier config.json, par exemple :

```javascript
{
  "coreth-config": {
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
}
```

### Utilisation `eth_newFilter` et appels connexes avec l'API publique

Si vous utilisez la méthode [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter) API sur le serveur public API, il peut ne pas se comporter comme vous l'attendez, car l'API publique est en fait plusieurs nœuds derrière un balanceur de charge. Si vous effectuez un appel `eth_newFilter` les appels subséquents vers [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges) peuvent ne pas se retrouver sur le même noeud que le premier appel, et vous finirez avec des résultats non définis.

Si vous avez besoin de la fonctionnalité de filtrage de log, vous devriez utiliser une connexion websocket, ce qui vous assure que votre client parle toujours au même noeud derrière le balanceur de charge. Alternativement, vous pouvez utiliser [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs), ou exécuter votre propre noeud et faire des appels API à elle.

## Soutien

En utilisant ce tutoriel, vous devriez être en mesure de vous lever rapidement à la vitesse sur Avalanche, le déploiement et tester vos dapps. Si vous avez des questions, des problèmes, ou simplement vous voulez discuter avec nous, vous pouvez nous rejoindre sur notre serveur [Discord](https://chat.avalabs.org/) public. Nous aimerions vous entendre et savoir ce que vous construisez sur Avalanche!

