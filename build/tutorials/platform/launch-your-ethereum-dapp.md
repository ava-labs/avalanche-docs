# Lancez votre Dapp Ethereum

## Aperçu

L'objectif de ce document est de vous aider à lancer votre dapp existante sur Avalanche. Il contient une série de ressources conçues pour vous aider à obtenir les bases d'Avalanche Platform et son fonctionnement, à montrer comment vous connecter au réseau, à utiliser vos outils et environnements existants pour développer et déployer sur Avalanche, ainsi que quelques pièges communs que vous devez considérer lors de l'exécution de votre dapp sur Avalanche.

## Bases de la plateforme

Avalanche est un [réseau de réseaux](../../../learn/platform-overview/). Cela signifie qu'il ne s'agit pas d'une seule chaîne qui exécute un type de blocs unique et uniforme. Il contient de multiples sous-réseaux, chacune d'elles exécutant une des chaînes plus hétérogènes. Mais, pour exécuter un dapp Ethereum sur un réseau rapide et peu onéreux, avec une finalité instantanée, nous n'avons pas besoin de nous préoccuper de ce problème en ce moment. En utilisant le lien ci-dessus, vous pouvez en trouver plus si vous le souhaitez, mais tout ce que vous devez savoir en ce moment est que l'une des chaînes qui s'exécute sur le réseau primaire d'Avalanche est la C-Chain \(chaîne de contrats\).

C-Chain exécute une fourche de [go-ethereum](https://geth.ethereum.org/docs/rpc/server) appelée [coreth](https://github.com/ava-labs/coreth) qui a remplacé les parties de réseau et de consensus par les équivalents d'Avalanche. Ce qui reste est What's VM, qui exécute des contrats intelligents Solidity et gère des structures de données et des blocs sur la chaîne. Par conséquent, vous obtenez une blockchain qui peut exécuter tous les contrats intelligents Solidity d'Ethereum, mais avec une bande passante de transaction beaucoup plus grande et une finalité instantanée que [le consensus révolutionnaire d'Avalanche](../../../learn/platform-overview/avalanche-consensus.md) s'accroche.

Coreth est chargé en tant que plugin dans [AvalancheGo](https://github.com/ava-labs/avalancheg), l'application de nœuds de client utilisée pour exécuter le réseau Avalanche.

En ce qui concerne votre dapp, il sera exécuté la même chose que sur Ethereum, juste plus rapide et moins cher. Voyons comment.

## Accéder à Avalanche C-Chain

C-Chain expose la [même API](../../avalanchego-apis/contract-chain-c-chain-api.md) que go-ethereum, de sorte que vous pouvez utiliser toutes les API familières qui sont disponibles sur Ethereum pour une interaction avec la plateforme.

Il existe de multiples façons de travailler avec la C-Chain.

### Par MetaMask

Vous pouvez accéder à la C-Chain via MetaMask, en définissant un réseau personnalisé. Accédez à MetaMask, connectez-vous, cliquez sur la liste d'utilisateurs du réseau, et sélectionnez 'Custom RPC'. Les données pour Avalanche sont les suivantes.

#### **Paramètres du réseau principal d'Avalanche :**

* **Nom du réseau **: Avalanche Mainnet C-Chain
* **Nouvelle URL **RPC: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**:`43114`
* **Symbole **:`AVAX`
* **Explorer : **[Explorer:](https://cchain.explorer.avax.network/)

#### **FUJI Testnet**

* **Nom du réseau **: Avalanche FUJI C-Chain
* **Nouvelle URL **RPC: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**:`43113`
* **Symbole **:`AVAX`
* **Explorer : **[Explorer:](https://cchain.explorer.avax-test.network/)

Dans l'interface web de votre application, vous pouvez [ajouter des programmes](../smart-contracts/add-avalanche-to-metamask-programmatically.md) d'Avalanche afin que vos utilisateurs n'aient pas à saisir manuellement les données du réseau. Pour voir l'ajout du flux de réseau personnalisé en action, consultez [Pangolin DEX](https://app.pangolin.exchange/).

### Utiliser les nœuds d'API publique

Au lieu de proxying les opérations du réseau via MetaMask, vous pouvez utiliser l'API publique, qui est composée d'un certain nombre de nœuds AvalancheGo derrière un balançoire de charge.

Le paramètre API C-Chain est [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) pour le réseau principal et [C-Chain](https://api.avax-test.network/ext/bc/C/rpc) pour le réseau test.

Pour plus d'informations, voir la documentation :

{% page-ref page="../../tools/public-api.md" %}

### Exécuter votre propre Node

Si vous ne voulez pas que votre dapp puisse dépendre d'un service centralisé que vous ne contrôlez pas, vous pouvez exécuter votre propre nœud et accéder au réseau de cette façon. L'exécution de votre propre nœud évite également les problèmes potentiels avec la congestion publique d'API et la limitation des taux.

Aux fins de développement, [voici](../nodes-and-staking/run-avalanche-node.md) un tutoriel pour le téléchargement, la construction et l'installation of Si vous allez exécuter un nœud de production sur une machine Linux, [voici](../nodes-and-staking/set-up-node-with-installer.md) un tutoriel qui montre comment utiliser le script d'installation pour installer rapidement et facilement le nœud en tant que `systemd`service. Script gère également la mise à niveau des nœuds. Si vous souhaitez exécuter un nœud dans un conteneur to il ya [des scripts](https://github.com/ava-labs/avalanchego/tree/master/scripts) de construction dans le repo AvalancheGo pour diverses configurations de Docker.

### Exécuter un réseau de test local

Si vous avez besoin d'un réseau de test privé pour tester votre dapp, [Avash](https://github.com/ava-labs/avash) est un client de shell pour lancer des réseaux d'Avalanche locaux, similaire à Ganache sur Ethereum.

Avash utilise Lua comme une langue de script pour orchestrer les réseaux locaux.

Pour plus d'informations, voir la documentation :

{% page-ref page="../../tools/avash.md" %}

## Développer et déployer des contrats

Étant une blockchain compatible avec Ethereum, tous les outils et environnements de développeurs Ethereum peuvent être utilisés pour développer et déployer des dapps pour la C-Chain d'Avalanche.

### Remix

Il existe un tutoriel pour utiliser Remix pour déployer des contrats intelligents sur Avalanche. Il s'appuie sur MetaMask pour accéder au réseau d'Avalanche.

{% page-ref page="../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

### Truffe

Vous pouvez également utiliser Truffle pour tester et déployer des contrats intelligents sur Avalanche. Découvrez comment dans ce tutoriel :

{% page-ref page="../smart-contracts/using-truffle-with-the-avalanche-c-chain.md" %}

### Hardhat

Hardhat est le plus récent environnement de développement et de test pour les contrats intelligents de Solidity, et celui que nos développeurs utilisent le plus. En raison de son superbe support de test, il est le moyen recommandé de développer pour Avalanche.

Pour plus d'informations, voir:{% page-ref page="../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md" %}

## Avalanche Explorer

Une partie essentielle de l'environnement de développement de contrats intelligents est [l'explorateur,](https://cchain.explorer.avax.network/) qui indexe et sert les données [blockchain](https://cchain.explorer.avax-test.network/). L'explorateur de C-Chain est disponible sur explorer, et l'explorateur de testnet chez explorer, En plus de l'interface web, il expose également [l'API RPC](https://eth.wiki/json-rpc/API) standard.

## Faucer Avalanche

Pour les besoins du développement, vous aurez besoin de jetons de test. Avalanche a un [faucet](https://faucet.avax-test.network/) qui dégage les jetons de test vers l'adresse de votre choix. Collez votre adresse C-Chain là.

Si vous avez besoin, vous pouvez également exécuter un robinet, localement, mais need, depuis le [dépôt](https://github.com/ava-labs/avalanche-faucet).

## Vérification des contrats

La vérification des contrats intelligents fournit la transparence aux utilisateurs qui interagissent avec les contrats intelligents en publiant le code source, permettant à tous d'attester qu'il fait vraiment ce qu'il prétend faire. Vous pouvez vérifier vos contrats intelligents en utilisant [l'explorateur C-Chain](https://cchain.explorer.avax.network/). La procédure est simple :

* naviguez sur votre adresse de contrat publiée sur l'explorateur
* sur `code`l'onglet sélectionnez`verify & publish`
* copier et coller le code source aplati et entrez tous les paramètres de construire exactement comme ils sont sur le contrat publié.
* cliquer`verify & publish`

Si un succès, `code`l'onglet aura maintenant un cocher vert, et vos utilisateurs pourront vérifier le contenu de votre contrat. Il s'agit d'un signal positif fort que vos utilisateurs peuvent faire confiance à vos contrats, et il est fortement recommandé pour tous les contrats de production.

## Contrôles de sécurité des contrats

En raison de la nature des applications distribuées, il est très difficile de réparer les bogues une fois que l'application est déployée. En raison de cela, assurez-vous que votre application fonctionne correctement et en toute sécurité avant que le déploiement ne soit d'une grande importance. Les examens de la sécurité des contrats sont effectués par des entreprises et des services spécialisés. Ils peuvent être très chers, qui peut être hors de portée pour les développeurs et les start-ups. Mais, il existe également des services et des programmes automatisés qui sont libres d'utiliser.

Les plus populaires sont :

* [Slither](https://github.com/crytic/slither), voici un [tutoriel](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

Nous recommandons fortement d'utiliser au moins un d'eux si l'examen de la sécurité des contrats professionnels n'est pas possible. Un examen plus complet des pratiques de développement sécurisées peut être trouvé [ici](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md).

## Gotchas et choses à voir pour

La C-Chain d'Avalanche Platform est compatible avec EVM, mais elle n'est pas identique. Il y a certaines différences que vous devez être conscient de sinon, vous pouvez créer des bogues subtils ou des incohérences dans le comportement de vos dapps.

Voici les principales différences que vous devez être conscient.

### Temps de mesure

Il est d'usage sur Ethereum d'utiliser les progrès en hauteur des block comme un proxy pour le temps. Vous ne devriez pas le faire sur Avalanche. Les chaînes sur Avalanche sont quiescent, ce qui signifie que s'il n'y a pas d'activité, il n'y a pas de blocs produits. L'inverse est également vrai, s'il y a une grande quantité d'activité, les blocs sont fabriqués très rapidement. En raison de cela, vous ne devez pas mesurer le passage du temps par le nombre de blocs produits. Les résultats ne seront pas exacts, et votre contrat peut être manipulé par des tiers.

Au lieu de la fréquence de blocs, vous devez mesurer le temps simplement en lisant l'attribut de l'horodatage des blocs produits. Les Timestamps sont garanties pour être monotoniquement en train de croître et pour être dans les 30 secondes du temps réel.

### Finalité

Sur Ethereum, la blockchain peut être réorganisée et les blocs peuvent être orphelins, de sorte que vous ne pouvez pas vous fier au fait qu'un bloc a été accepté tant qu'il ne se trouve pas dans plusieurs blocs plus loin de la pointe \(en général, il est présumé que les blocs 6 places sont en sécurité\). Ce n'est pas le cas sur Avalanche. Les blocs sont soit acceptés soit rejetés dans un deuxième ou deux. Et une fois le bloc accepté, il est définitif et ne peut être remplacé, abandonné ou modifié. Par conséquent, le concept de 'nombre de confirmations ' sur Avalanche n'est pas utilisé. Dès qu'un bloc est accepté et disponible dans l'explorateur, il est définitif.

### Prix du gaz

Le gaz sur Avalanche est brûlé. Les validateurs ne conservent pas le gaz pour eux-mêmes \(ils sont récompensés pour le staking\), de sorte que la dynamique des « guerres gazeuses » où les transactions à des prix plus élevés sont incluses d'abord n'est pas existante. Par conséquent, il n'est jamais nécessaire de mettre un prix plus élevé du gaz sur vos transactions. Vous ne brûlerez que du gaz en vain.

### Configuration de C-Chain

Les chaînes individuelles, y compris le C-Chain, ont leurs propres options de configuration qui peuvent être données dans un fichier de config. Vous pouvez utiliser une configuration de C-Chain autre que la défaut de défaut lors du développement des dapps. Pour plus de détails sur les configurations de chaînes, voir [ici.](../../references/command-line-interface.md#chain-configs)

Le fichier de config C-Chain doit être à `$HOME/.avalanchego/configs/chains/C/config.json`. Vous pouvez également dire à AvalancheGo de chercher ailleurs pour le fichier de config C-Chain avec option `--chain-config-dir`. Vous pouvez rechercher des options de configuration complètes pour [C-Chain](../../references/command-line-interface.md#coreth-config). Un exemple de fichier de config C-Chain :

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

### Utilisation `eth_newFilter`et appels connexes avec l'API publique

[`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter)Si vous utilisez la méthode API sur le serveur d'API publique, il se peut qu'elle ne se comporte pas comme vous l'attendez car l'API publique est en fait plusieurs nœuds derrière un balanceur de charge. Si vous faites un `eth_newFilter`appel, les appels ultérieurs à ne [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges)peuvent pas se retrouver sur le même nœud que le premier appel, et vous finirez par obtenir des résultats non définiés.

Si vous avez besoin de la fonctionnalité de filtrage de log, vous devez utiliser une connexion à la websocket, ce qui garantit que votre client parle toujours au même nœud derrière le balanceur de chargement. [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs)Vous pouvez également utiliser , ou exécuter votre propre nœud et y faire des appels d'API.

## Support

En utilisant ce tutoriel, vous devriez être en mesure de vous lever rapidement sur Avalanche, de déployer et de tester vos dapps. Si vous avez des questions, des problèmes ou que vous voulez simplement discuter avec nous, vous pouvez nous contacter sur notre serveur [Discord](https://chat.avalabs.org/). Nous aimerions entendre vos informations et découvrir ce que vous construisez sur Avalanche !

