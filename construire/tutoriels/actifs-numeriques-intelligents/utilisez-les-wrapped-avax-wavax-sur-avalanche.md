# Utilisez les Wrapped AVAX \(WAVAX\) sur Avalanche

## Le WAVAX qu'est-ce que c'est?

[AVAX](../../../) est le jeton natif de la [plateforme Avalanche](../../../apprendre/presentation-du-systeme/). De nombreux contrats intelligents sur la [C-Chain](../../../apprendre/presentation-du-systeme/#chaine-de-contrat-c-chain), qui est une instance de la machine virtuelle Ethereum, sont conçus pour fonctionner avec les jetons ERC-20 d'Ethereum. Pour utiliser AVAX dans de tels contrats, vous devez utiliser AVAX enveloppé \(WAVAX\), qui est compatible ERC-20.

## Aperçu

Pour convertir AVAX en WAVAX, vous déposerez AVAX dans un contrat intelligent qui verrouille l'AVAX et vous émet WAVAX. Pour convertir WAVAX en AVAX, vous retournerez le WAVAX au contrat intelligent, qui brûlera le WAVAX et retournera votre AVAX.

Dans ce didacticiel, vous allez:

* Connectez Metamask à Avalanche
* Financer votre compte Metamask  
* Chargez le contrat WAVAX dans Remix
* Connectez-vous au contrat WAVAX pré-déployé
* Convertir AVAX en WAVAX et inversement
* Ajouter WAVAX en tant que jeton personnalisé à Metamask

## Se Connecter à Metamask

[Metamask](https://metamask.io/) est une extension de navigateur Web populaire qui facilite l'interaction avec Ethereum et les blockchains compatibles, telles que C-Chain d'Avalanche. La configuration de Metamask et la création d'un compte sur celui-ci dépassent la portée de ce didacticiel, mais il existe un certain nombre de ressources sur Internet pour vous guider à travers cela.

Après vous être connecté à votre compte Metamask, connectez-le au réseau Avalanche. Cliquez sur la liste déroulante **Networks** -&gt; Sélectionner **Custom RPC**:

![](../../../.gitbook/assets/image%20%2860%29.png)

Saisissez les informations du réseau de votre choix:

### Avalanche Mainnet Settings:

* **Network Name**: Avalanche Mainnet C-Chain
* **New RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `0xa86a`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

### Fuji Testnet Settings:

* **Network Name**: Avalanche Fuji C-Chain
* **New RPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `0xa869`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

Après avoir enregistré les modifications, sélectionnez le réseau Avalanche que vous venez de spécifier. Vous devriez voir votre solde AVAX, qui sera probablement de 0.

## Financez votre compte C-Chain

Vous devez avoir AVAX dans votre compte.

### **En utilisant le portefeuille Avalanche**

Si vous possédez déjà des AVAX, vous pouvez les transférer sur le compte Metamask à l'aide de votre [portefeuille Avalanche](https://wallet.avax.network/). Vous pouvez voir où se trouvent vos fonds en sélectionnant Afficher la répartition dans le panneau du portefeuille indiquant votre solde. Si vous n'avez pas déjà les fonds sur la C-Chain, vous devez effectuer un [transfert entre chaînes](../plateforme/transferer-de-lavax-entre-la-x-chain-et-la-c-chain.md) pour déplacer votre AVAX de la X-Chain vers la C-Chain

Une fois que vous avez des fonds sur la C-Chain, sélectionnez **Send** dans le menu de gauche du portefeuille, puis basculez la chaîne source sur **C Contract**. Dans le champ **To Address**, collez votre adresse Metamask. Entrez le montant à envoyer et cliquez sur **Confirm** puis sur **Send**.

![](../../../.gitbook/assets/image%20%2859%29.png)

Les fonds devraient bientôt être visibles dans votre compte Metamask.

### **En utilisant le Test Network Faucet**

Si vous êtes connecté au réseau de test, vous pouvez utiliser son robinet pour approvisionner votre compte Metamask. Accédez au [faucet](https://faucet.avax-test.network/) et collez votre adresse Ethereum, qui est affichée sous le nom du compte dans Metamask \(par exemple, `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`\). Lorsque vous cliquez sur le nom du compte, il copiera le compte dans le presse-papiers.

![](../../../.gitbook/assets/image%20%2850%29.png)

Collez cette adresse dans le faucet, prouvez que vous n'êtes pas un robot, puis demandez le test AVAX. Ils devraient apparaître dans votre Metamask sous peu.

## Charger le contrat WAVAX dans Remix

Remix est un outil basé sur un navigateur populaire pour écrire, déployer et interagir avec des contrats intelligents. Accédez au [site Web de Remix](https://remix.ethereum.org/). Faites défiler vers le bas jusqu'à ce que vous voyiez les options d'importation de contrats.

![](../../../.gitbook/assets/image%20%2863%29.png)

Sélectionnez **GitHub**, et dans le champ de saisie, collez`https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol` et sélectionnez **OK**. Cela chargera le contrat dans Remix.

![](../../../.gitbook/assets/image%20%2854%29.png)

Passez à l'onglet Explorateur de fichiers sur la gauche et sélectionnez `WAVAX.sol`, qui est le contrat que nous venons de charger.

Dans le menu de gauche, passez à l'onglet Compile:

![](../../../.gitbook/assets/image%20%2858%29.png)

Vérifiez que la version du compilateur est compatible avec le contrat, comme indiqué. Appuyez sur **Compile WAVAX.sol**, et vérifiez que le contrat WAVAX est apparu dans le champ `CONTRACT` ci-dessous. Vous êtes maintenant prêt à vous connecter au contrat WAVAX, qui a déjà été déployé sur le réseau Avalanche.

## Connectez-vous au contrat WAVAX

Basculez vers l'onglet **Deploy & Run Tranasactions** sur le côté gauche.

![](../../../.gitbook/assets/image%20%2855%29.png)

Assurez-vous que vous êtes connecté à votre Metamask. Dans le menu déroulant **Environment**, sélectionnez `Injected Web3`. Metamask apparaîtra et vous demandera de sélectionner le compte. Choisissez celui connecté à Avalanche et permettez-lui de se connecter. Cela pré-remplira le champ **Account**. Assurez-vous que le champ **Contract** est défini sur le contrat WAVAX. Maintenant, nous pouvons nous connecter au contrat, qui a déjà publié sur Avalanche. Dans le champ d'édition **At Address**, copiez:

* Pour le Mainnet: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Pour le Fuji Testnet: `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Après avoir collé l'adresse, appuyez sur le bouton **At Address**.

Remix devrait trouver le contrat déployé:

![](../../../.gitbook/assets/image%20%2851%29.png)

Nous sommes maintenant prêts à interagir avec le contrat. Ouvrez l'interface du contrat en appuyant sur la flèche en surbrillance.

## Émettre des commandes pour le contrat WAVAX

Emballons quelques AVAX!

Puisque ETH est libellé en 10^18 unités plus petites \(wei\), et AVAX est dénommé en 10^9, changez le sélecteur de valeur de `wei` à `gwei` \(gigawei\). 1 gwei = 10^9 wei = 1 nAVAX.

![](../../../.gitbook/assets/image%20%2852%29.png)

### Enveloppez AVAX pour créer du WAVAX

Pour envelopper 10 AVAX, entrez `10000000000`\(10 ^ 10\) gwei dans le champ **Value**. Pour lancer l'emballage, cliquez sur **Deposit**. Remix vous demandera de confirmer la transaction. Lorsque vous appuyez sur **Confirm**, Metamask apparaîtra, demandant également une confirmation. Appuyez également sur **Confirm** dans Metamask. Vous devriez remarquer que votre solde AVAX a été réduit de 10, plus le montant des frais. Passez à la section suivante pour voir votre WAVAX dans Metamask.

## Ajouter WAVAX à Metamask

Pour voir votre solde WAVAX, vous devez ajouter WAVAX en tant que jeton personnalisé à Metamask. Dans Metamask, sélectionnez les trois points à côté du nom de votre compte et sélectionnez `Expand View`. Cela ouvre un nouvel onglet de navigateur. Faites défiler vers le bas et sélectionnez **Add token**. Basculez vers l'onglet **Custom Token**.

![](../../../.gitbook/assets/image%20%2862%29.png)

Dans **Token Contract Address**, collez la même adresse de contrat que celle que nous avons utilisée auparavant:

* Pour le mainnet: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Pour le Fuji testnet: `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Cliquez sur **Next** et **Add Tokens**. Votre WAVAX devrait maintenant être visible sous votre compte dans Metmask.

### Déballer \(unwrap\) de l'WAVAX en AVAX

Pour déballer WAVAX, développez la flèche à côté du bouton **Withdraw**:

![](../../../.gitbook/assets/image%20%2856%29.png)

Malheureusement, le champ de retrait est libellé en wei, donc 10 AVAX est représenté par `10000000000000000000` \(10 ^ 19\) pour le montant du retrait. Appuyer sur **Transact** déclenchera la même confirmation d'abord dans Remix, puis dans Metamask. Votre AVAX devrait être de retour dans le compte, moins le montant des frais.

## Conclusion

Vous pouvez désormais interagir avec des contrats intelligents sur la C-Chain d'Avalanche avec WAVAX, la version ERC-20 d'AVAX. À l'avenir, la conversion entre AVAX et WAVAX sera considérablement plus simple, avec la prise en charge intégrée du portefeuille et des échanges, mais en attendant, vous pouvez toujours accéder aux DEX, aux ponts et à d'autres contrats basés sur Solidity sur la plate-forme Avalanche.

