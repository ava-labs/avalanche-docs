# Utiliser AVAX \(WAVAX\) sur Avalanche

## Qu'est-ce que WAVAX?

[AVAX](../../../#avalanche-avax-token) est le jeton natif sur la [plate-forme Avalanche](../../../learn/platform-overview/). De nombreux contrats intelligents sur la [chaîne contractuelle \(C-Chain\)](../../../learn/platform-overview/#contract-chain-c-chain), qui est une instance de la machine virtuelle Ethereum sont conçus pour fonctionner avec les jetons ERC-20 d'Ethereum. Afin d'utiliser AVAX, vous devez utiliser AVAX qui est compatible ERC-20.

## Aperçu général

Pour convertir AVAX en WAVAX, vous aurez déposé AVAX dans un contrat intelligent qui verrouillera AVAX et vous délivrera WAVAX. Pour convertir WAVAX en AVAX, vous allez retourner la WAVAX au contrat intelligent, qui va brûler la WAVAX et retourner votre AVAX.

Dans ce tutoriel, vous allez :

* Connecter Metamask à Avalanche
* Financer votre compte Metamask
* Charger le contrat WAVAX dans Remix
* Connectez-vous au contrat WAVAX pre-deployed
* Convertir AVAX en WAVAX et le dos
* Ajouter WAVAX comme jeton personnalisé à Metamask

## Connectez-vous Metamask

[Metamask](https://metamask.io/) est une extension de navigateur web populaire qui le rend facile d'interagir avec Ethereum et les blockchains compatibles, tels que la chaîne C d'Avalanche. La mise en place de Metamask et la création d'un compte sur elle est au-delà de la portée de ce tutoriel, mais il ya un certain nombre de ressources sur l'internet pour vous guider à travers cela.

Après vous être connecté à votre compte Metamask connectez-le au réseau Avalanche. Cliquez sur le réseau déroulante -> Sélectionner **RPC personnalisé**:

![metamask réseau abandonné](../../../.gitbook/assets/image%20%2860%29.png)

Entrez les informations du réseau de votre choix:

### Paramètres du réseau d'avalanche:

* **Nom du réseau**: Avalanche Mainnet C-Chain
* **Nouvelle URL RPC**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Symbole **: `AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

### Paramètres Fuji Testnet:

* **Nom du réseau**: Avalanche Fuji C-Chain
* **Nouvelle URL RPC**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Symbole **: `AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

Après avoir enregistré les modifications, sélectionnez le réseau Avalanche que vous venez de spécifier. Vous devriez voir votre balance AVAX, qui sera probablement 0.

## Financer votre compte C-Chain

Vous devez obtenir un certain AVAX votre compte.

### **Utilisation du portefeuille Avalanche**

Si vous avez déjà un certain AVAX, vous pouvez les transférer sur le compte Metamask à l'aide de votre [portefeuille Avalanche](https://wallet.avax.network/). Vous pouvez voir où vos fonds sont en sélectionnant **la ventilation** de l'affichage dans le panneau du portefeuille montrant votre équilibre. Si vous n'avez pas les fonds sur la chaîne C, vous devez effectuer un [transfert de chaîne](../platform/transfer-avax-between-x-chain-and-c-chain.md) croisée, pour déplacer votre C-Chain de X-Chain à C-Chain.

Après avoir des fonds sur la chaîne C, sélectionnez **Envoyer** sur le menu latérale gauche dans le Portefeuille, puis basculez la chaîne source vers le **contrat** C. Dans le champ **To** Addresse, collez votre adresse Metamask. Entrez le montant à envoyer et cliquez **sur Confirmer** et **envoyer**.

![Envoyer à Metamask](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

Les fonds devraient bientôt être visibles dans votre compte Metamask.

### **Utilisation du robinet réseau de test**

Si vous êtes connecté au réseau de test, vous pouvez utiliser son robinet pour financer votre compte Metamask. Naviguez sur [le robinet](https://faucet.avax-test.network/) et collez votre adresse Ethereum qui est indiquée sous le nom de compte dans Metamask `\(ex.0xD1749831fbF70d88AB7bB07ef7CD9c53D054a57\).` Lorsque vous cliquez sur le nom du compte, il copiera le compte au presse-papiers.

![Financement du robinet](../../../.gitbook/assets/wavax2avax-02-faucet.png)

Coller cette adresse dans le robinet, prouver que vous n'êtes pas un robot, puis demander le test AVAX. Ils devraient apparaître dans votre Metamask rapidement.

## Charger le contrat WAVAX dans Remix

Remix est un outil populaire basé sur le navigateur pour l'écriture, le déploiement et l'interaction avec les contrats intelligents. Naviate sur [le site de Remix](https://remix.ethereum.org/). Faites défiler jusqu'à ce que vous voyez les options d'importation des contrats.

![Importation de GitHub](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

Sélectionnez **GitHub**, et dans le champ d'entrée pâte `https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol` et sélectionnez **OK**. Cela chargera le contrat dans Remix.

![Explorateur de fichiers](../../../.gitbook/assets/wavax2avax-04-contract.png)

Commutation à l'onglet Explorateur de fichiers à gauche et sélectionnez `WAVAX.sol`, qui est le contrat que nous venons de charger.

Sur le menu latéral gauche, basculez sur l'onglet Compiler:

![Compiler](../../../.gitbook/assets/wavax2avax-05-compile.png)

Vérifiez que la version du compilateur est compatible avec le contrat, comme indiqué. Appuyez sur **Compiler WAVAX.sol**, et vérifiez que le contrat WAVAX.sol, est apparu dans le champ `CONTRAT.` Maintenant, vous êtes prêt à vous connecter au contrat WAVAX, qui a déjà été déployé sur le réseau Avalanche.

## Connectez-vous au contrat WAVAX.

Passer à l'onglet **Déployer et exécuter Tranasactions** sur le côté gauche.

![Connectez-vous](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Assurez-vous que vous êtes connecté à votre Metamask. Dans le menu déroulant **Environnement,** sélectionnez `Injecté Web3`. Metamask apparaîtra et vous demandera de sélectionner le compte. Choisissez celui connecté à Avalanche et permettez-lui de se connecter. Cela pré-remplissage le champ **Compte.** Assurez-vous que le champ **du contrat** est réglé sur le contrat `WAVAX`. Maintenant, nous pouvons nous connecter au contrat, qui a déjà publié sur Avalanche. Dans le champ **At Address** éditer:

* Pour le réseau principal: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Pour Fuji Testnet: `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Après avoir collé l'adresse, appuyez sur le bouton **At** Addresse.

Remix devrait trouver le contrat déployé :

![Connectez-vous](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

Nous sommes maintenant prêts à interagir avec le contrat. Ouvrez l'interface du contrat en appuyant sur la flèche surlignée.

## Attribution des commandes au contrat WAVAX.

Enveloppons un peu AVAX!

Puisque l'ETH est libellée en 10^18 unités plus petites \(wei\), et AVAX est libellée en 10^9, basculez le sélecteur de valeur de `wei` en `gwei` \(gigawei\). 1 gwei = 10^9 wei = 1 nAVAX.

![Interaction](../../../.gitbook/assets/wavax2avax-08-interact.png)

### Wrap AVAX pour créer WAVAX

Pour envelopper 10 AVAX, entrez `1000` \(10^10\) gwei dans le champ **Valeur.** Pour initier l'emballage, cliquez **sur Déposit**. Vous serez présenté avec une invite par Remix pour confirmer la transaction. Lorsque vous appuyez **sur Confirmer** Metamask apparaîtra, demandant également la confirmation. Appuyez **sur Confirmer** dans Metamask, trop. Vous devriez remarquer votre solde AVAX de 10, plus le montant des frais. Passer à la section suivante pour voir votre WAVAX en Metamask.

## Ajouter WAVAX à Metamask

Pour voir votre balance WAVAX, vous devez ajouter WAVAX comme un jeton personnalisé à Metamask. Dans Metamask, sélectionnez les trois points à côté de votre nom de compte et sélectionnez `Expand View`. Cela ouvre un nouvel onglet de navigateur. Défiler vers le bas et sélectionnez **Ajouter un jeton**. Passer à l'onglet **Token** personnalisé.

![Token personnalisé](../../../.gitbook/assets/wavax2avax-10-add-token.png)

Dans le **contrat Token Adresse** coller la même adresse du contrat que nous avons utilisée avant:

* Pour le réseau principal: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Pour le filet de test Fuji: `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Cliquez **sur Suivant** et **Ajouter Tokens**. Votre WAVAX devrait maintenant être visible sous votre compte en Metmask.

### Débloquer WAVAX

Pour débloquer WAVAX, étendre la flèche à côté du bouton **Retirer** :

![Retrait](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

Malheureusement, le champ de retrait est libellé en wei, de sorte que 10 AVAX est représenté comme `100\(10^19\)` pour le montant de retrait. Appuyant **Transact** déclenchera la même confirmation d'abord dans Remix, puis dans Metamask. Votre AVAX devrait être de retour dans le compte, moins le montant des frais.

## Conclusion

Vous pouvez maintenant interagir avec des contrats intelligents sur la chaîne C d'Avalanche avec WAVAX, la version ERC-20 Avalanche's À l'avenir, la conversion entre AVAX et WAVAX sera significativement plus simple, avec un support intégré depuis le portefeuille et les échanges, mais entre-temps, vous pouvez toujours accéder aux DEXes, ponts et autres contrats basés sur Solidarité sur la Plateforme Avalanche.

