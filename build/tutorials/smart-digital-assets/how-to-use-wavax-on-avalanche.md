# Utiliser AVAX \(WAVAX\) sur Avalanche

## Qu'est-ce que WAVAX?

[AVAX](../../../#avalanche-avax-token) est le jeton natif sur la [plateforme Avalanche](../../../learn/platform-overview/). Beaucoup de contrats intelligents sur la [chaîne du contrat \(C-Chain\)](../../../learn/platform-overview/#contract-chain-c-chain), qui est une instance de la machine virtuelle Ethereum, sont conçus pour travailler avec les jetons ERC-20 d'Ethereum. Afin d'utiliser AVAX dans de tels contrats, vous devez utiliser AVAX \(WAVAX\), qui est compatible ERC-20.

## Aperçu

Pour convertir AVAX en WAVAX, vous déposez AVAX dans un contrat intelligent qui verrouillera AVAX et vous délivrera WAVAX. Pour convertir WAVAX en AVAX, vous retournez la WAVAX au contrat intelligent, qui brûlera la WAVAX et retournera votre AVAX.

Dans ce tutoriel, vous allez :

* Connecter Metamask à Avalanche
* Financer votre compte Metamask
* Charger le contrat WAVAX dans Remix
* Connectez-vous au contrat WAVAX pre-deployed
* Convertir AVAX en WAVAX et retour
* Ajouter WAVAX en tant que jeton personnalisé à Metamask

## Connect

[Metamask](https://metamask.io/) est une extension de navigateur web populaire qui facilite l'interaction avec les blockchains Ethereum et compatibles, comme la C-Chain d'Avalanche. La création de Metamask et la création d'un compte sur lui dépassent la portée de ce tutoriel, mais il y a un certain nombre de ressources sur Internet pour vous guider par cela.

Après vous être connecté à votre compte Metamask, connectez-le au réseau Avalanche. Cliquez sur la liste déroulante sur le réseau -> Sélectionner un RPC ****personnalisé:

![déroulant le réseau de metamask](../../../.gitbook/assets/image%20%2860%29.png)

Saisissez les informations pour le réseau de votre choix :

### Paramètres du réseau principal d'Avalanche :

* **Nom du réseau **: Avalanche Mainnet C-Chain
* **Nouvelle URL **RPC: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**:`43114`
* **Symbole **:`AVAX`
* **Explorer : **[Explorer:](https://cchain.explorer.avax.network/)

### Paramètres de Fuji :

* **Nom du réseau **: Avalanche Fuji C-Chain
* **Nouvelle URL **RPC: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**:`43113`
* **Symbole **:`AVAX`
* **Explorer : **[Explorer:](https://cchain.explorer.avax-test.network/)

Après avoir enregistré les modifications, sélectionnez le réseau d'Avalanche que vous venez de spécifier. Vous devriez voir votre solde AVAX, qui sera probablement 0.

## Financer votre compte C-Chain

Vous devez obtenir un certain AVAX sur votre compte.

### **Utilisation du portefeuille d'Avalanche**

Si vous avez déjà un certain AVAX, vous pouvez les transférer sur le compte Metamask en utilisant votre [portefeuille Avalanche](https://wallet.avax.network/). Vous pouvez voir où vos fonds sont en sélectionnant la ventilation de **l'affichage dans le panneau **de portefeuille indiquant votre solde. Si vous n'avez pas déjà les fonds sur la C-Chain, vous devez faire un [transfert de Cross](../platform/transfer-avax-between-x-chain-and-c-chain.md) Chain, pour déplacer votre AVAX de X-Chain à C-Chain.

**Après avoir des fonds sur la C-Chain, sélectionnez **Envoyer **sur le menu latérale gauche du portefeuille, puis passez la chaîne source au contrat **C. Dans le **champ **To Address collez votre adresse Metamask. **Saisissez le montant à envoyer et cliquez sur **Confirmer et ****envoyer.

![Envoyer à Metamask](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

Les fonds devraient bientôt être visibles sur votre compte Metamask.

### **Utiliser le faucet de réseau de test**

Si vous êtes connecté au réseau de tests, vous pouvez utiliser son faucet pour financer votre compte Metamask. Naviguez sur [le faucet](https://faucet.avax-test.network/) et collez votre adresse Ethereum, qui est indiquée sous le nom de compte en Metamask \(par `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`exemple\). Lorsque vous cliquez sur le nom du compte, il copiera le compte au presse-papiers.

![Financement du faucet](../../../.gitbook/assets/wavax2avax-02-faucet.png)

Coller cette adresse dans le faucet, prouvez que vous n'êtes pas un robot, puis demandez un test AVAX. Ils devraient apparaître dans votre Metamask sous peu.

## Charger le contrat WAVAX dans Remix

Remix est un outil populaire basé sur un navigateur pour écrire, déployer et interagir avec des contrats intelligents. Naviate sur [le site Web de Remix](https://remix.ethereum.org/). Faites défiler vers le bas jusqu'à ce que vous voyez des options pour importer des contrats.

![Importation de GitHub](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

Sélectionnez GitHub, et dans le champ d'entrée ****coller `https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol`et sélectionnez **OK.** Cela chargera le contrat dans Remix.

![Explorer de fichiers](../../../.gitbook/assets/wavax2avax-04-contract.png)

En passant à l'onglet Explorer de fichiers sur la gauche et sélectionnez `WAVAX.sol`, qui est le contrat que nous venons de charger.

Sur le menu du côté gauche, passez à l'onglet Compiler :

![Compiler](../../../.gitbook/assets/wavax2avax-05-compile.png)

Vérifiez que la version du compilateur est compatible avec le contrat, comme montré. Appuyez sur **Compiler WAVAX.sol et vérifiez que le contrat de **WAVAX a été publié sur le `CONTRACT`champ ci-dessous. Maintenant vous êtes prêt à vous connecter au contrat WAVAX, qui a déjà été déployé sur le réseau Avalanche.

## Connectez-vous au contrat WAVAX

Passer à **l'onglet **Deploy et exécuter les Tranasactions du côté gauche.

![Connect](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Assurez-vous que vous êtes connecté à votre Metamask. Dans le menu **déroulant sur **l'environnement, sélectionnez `Injected Web3`. Metamask s'ouvrira et vous demandera de sélectionner le compte. Choisissez celui qui est connecté à Avalanche et permettez-le de se connecter. Cela pré-remplissez le champ du ****compte. Assurez-vous que le **champ du **contrat est défini au `WAVAX`contrat. Maintenant nous pouvons nous connecter au contrat, qui a déjà publié sur Avalanche. Dans le champ de **modification **des adresses imprimées, copier :

* Pour Mainnet:`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Pour Fuji Testnet:`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Après avoir collé l'adresse, appuyez sur le bouton **At **Addresse.

Remix devrait trouver le contrat de déploiement :

![Connect](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

Nous sommes maintenant prêts à interagir avec le contrat. Ouvrez l'interface du contrat en appuyant sur la flèche en highlighted

## Émission des commandes vers le contrat WAVAX

Enveloppons un peu d'AVAX !

Puisque ETH est libellé en 10^18 unités plus petites \(wei\) et que AVAX est libellé en 10^9, passez de `wei`à `gwei`\(gigawei\). 1 gwei = 10^9 wei = 1 nAVAX.

![Interaction](../../../.gitbook/assets/wavax2avax-08-interact.png)

### Envelopper AVAX pour créer des WAVAX

Pour envelopper 10 AVAX, entrez `10000000000`\(10^10\) gwei dans le champ de ****valeur. Pour lancer l'emballage, cliquez sur ****Déposit. Vous serez présenté avec une invite par Remix pour confirmer la transaction. Lorsque vous appuyez sur **Confirmer que Metamask **s'affiche, demandant également une confirmation. Presse **Confirmer **dans Metamask, aussi. Vous devez remarquer votre solde AVAX abaissé de 10, plus le montant des frais. Passer à la section suivante pour voir votre WAVAX en Metamask.

## Ajouter WAVAX à Metamask

Pour voir votre solde WAVAX, vous devez ajouter WAVAX en tant que jeton personnalisé à Metamask. Dans Metamask, sélectionnez les trois points à côté de votre nom de compte et sélectionnez `Expand View`. ****Cela ouvre un nouvel onglet de navigateur. Passer à l'onglet Jetons ****personnalisés.

![Jeton personnalisé](../../../.gitbook/assets/wavax2avax-10-add-token.png)

Dans le contrat de **jeton, **collez la même adresse du contrat que nous avons utilisée avant :

* Pour le net principal:`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Pour le réseau de test de Fuji:`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Cliquez sur **Suivant **et **ajoutez des **jetons. Votre WAVAX devrait maintenant être visible dans votre compte sur Metmask.

### Débloquer WAVAX vers AVAX

Pour débloquer WAVAX, élargissez la flèche à côté du bouton de ****retrait:

![Retrait](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

Malheureusement, le champ de retrait est libellé en wei, de sorte que 10 AVAX est représenté comme `10000000000000000000`\(10^19\) pour le montant de retrait. La pressive **Transact **déclenchera la même confirmation d'abord dans Remix, puis dans Metamask. Votre AVAX devrait être de retour dans le compte, moins le montant des frais.

## Conclusion

Vous pouvez maintenant interagir avec des contrats intelligents sur la C-Chain d'Avalanche avec WAVAX, la version ERC-20 d'AVAX. Dans l'avenir, la conversion entre AVAX et WAVAX sera sensiblement plus simple, avec un support intégré du portefeuille et des échanges, mais en attendant, vous pouvez encore accéder à DEX, des ponts et d'autres contrats basés sur Solidity sur la plateforme Avalanche.

