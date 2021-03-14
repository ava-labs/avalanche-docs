# Créer un token ERC-20

Les jetons ERC-20 sont le concept le plus fondamental et le plus essentiel d'Ethereum. Au fur et à mesure que la communauté Avalanche et l'écosystème se développent, de nouveaux cas d'utilisation et projets en cours d'exécution sur Ethereum ou sur différentes chaînes seraient mis en œuvre sur Avalanche. Le standard de jeton qui serait utilisé pour les projets n'est pas spécifique et chacun peut créer son propre standard et son propre jeton.

Par conséquent, nous allons créer notre propre jeton ERC-20 mintable de frappe et le frapperons à l'adresse de notre choix. Le jeton sera généré sur Avalanche C-Chain et sera accessible sur cette chaîne.

La chose que nous devons principalement considérer est que nous allons déployer un contrat intelligent écrit avec Solidity sur Avalanche. C'est la fonctionnalité qu'Avalanche nous fournit - pour pouvoir déployer n'importe quel contrat intelligent dans la chaîne et aucune exigence d'un nouveau concept de contrat spécifique à une langue pour interagir. Voyons comment créer un contrat ERC-20 et le déployer sur la C-Chain d'Avalanche.

## Configurer Metamask

La première chose que nous devrions définir est un portefeuille metamask.

![Image for post](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Cliquez sur l'icône de metamask dans le navigateur et sélectionnez le menu déroulant du réseau. Ici, nous devrions nous connecter à C-Chain. Cliquez sur "Custom RPC”.

![Image for post](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Maintenant, nous devons définir ces cases avec des valeurs correctes.

* **Network Name**: Avalanche C-Chain
* **New RPC URL**:
  * **Mainnet:** [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) 
  * **Fuji Testnet:** [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
  * **Local Testnet:** [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc) 
* **ChainID**:
  * **Mainnet:** `0xa86a` 
  * **Fuji Testnet:** `0xa869` 
  * **Local Testnet:** `0xa868` 
* **Symbol**: C-AVAX
* **Explorer**:
  * **Mainnet:** [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/) 
  * **Fuji Testnet:** [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)
  * **Localnet:** n/a 

![Image for post](https://miro.medium.com/max/358/1*q0HIWcI3okakwYV2glos0A.png)

Après avoir configuré correctement tous les paramètres, nous devrions voir cette page. Pour l'instant, nous avons 0 C-AVAX. «C» fait référence à la C-Chain et nous devons obtenir du C-AVAX pour interagir avec le réseau.

## Financez votre adresse C-Chain

Selon le réseau utilisé, il existe trois façons de transférer des fonds à votre adresse C-Chain.

### Utilisation du portefeuille Avalanche

Sur le réseau principal, vous pouvez utiliser le [portefeuille Avalanche](https://wallet.avax.network/) pour transférer des fonds de la X-Chain vers votre adresse C-Chain. Le processus est simple, comme expliqué dans ce tutoriel. Wallet peut également être utilisé sur les réseaux de test et locaux.

### Utilisation du **Test Network Faucet**

Pour le financement sur le réseau de test, vous pouvez également utiliser le Test Network Faucet. Navigate to [https://faucet.avax-test.network/](https://faucet.avax-test.network/) Accédez à [https://faucet.avax-test.network/](https://faucet.avax-test.network/) et collez votre adresse C-AVAX. Tout ce que vous avez à faire est d'ajouter un préfixe «C-» et le robinet passera d'AVAX à C-AVAX.

### Financement sur testnet local

Sur un réseau local, vous pouvez facilement financer vos adresses en déployant votre propre faucet. [Tutorial](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

Allons sur l'[avax faucet](https://faucet.avax-test.network/) et collez notre adresse avec le préfixe "C-"

Par exemple, mon adresse est "0xfe8886bec537252040Dff36448C0F104Be635650", je dois coller l'adresse de mon compte en tant que "C-0xfe8886bec537252040Dff36448C0F104Be635650"

![Image for post](https://miro.medium.com/max/422/1*okw3MKlyGcF4U9ibsq5v8w.png)

Après avoir copié et collé l'adresse ici, cliquez sur request 2.0000 C-AVAX. Ce test faucet token n'a aucune valeur, c'est juste à des fins de développement.

Vérifiez ensuite le solde de votre portefeuille et vous devriez avoir un jeton de test dans votre metamask.

## Créer un jeton Mintable

Maintenant, nous pouvons créer notre jeton Mintable sur Remix. Ouvrez Remix sur votre navigateur ou accédez à ce [lien](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js).

![Image for post](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

Vous devriez voir cette page. Sur cette page, cliquez d'abord sur «SOLIDITY» dans «Featured Plugins», puis sur le bouton «New File». Lorsque vous cliquez sur le bouton Nouveau fichier, vous verrez une fenêtre contextuelle qui nécessite un nom de fichier. Vous pouvez choisir un nom ou laisser la valeur par défaut.

Puisque nous utiliserons un contrat ERC-20 de [OpenZeppelin](https://openzeppelin.com/contracts/), collez simplement cette ligne dans le fichier et enregistrez-le.

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

Après avoir enregistré le fichier, nous verrons un tas de fichiers importés dans remix. Il s'agit d'une fonctionnalité de remix qui nous permet d'importer un référentiel de contrats GitHub à remixer en donnant simplement le lien URL avec une déclaration d'importation.

![](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

Nous avons le fichier ERC20PresetMinterPauser.sol dans les préréglages. Ce fichier est écrit par OpenZeppelin selon les normes ERC20 avec une fonctionnalité minter. Après avoir déployé ce fichier, nous serons le propriétaire du contrat et aurons ainsi l'autorité et la capacité de mint les jetons.

![](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Déployer le contrat

Ouvrez le deuxième onglet qui est «SOLIDITY COMPILER» et sélectionnez la version de solidité qui correspond à la version de solidité écrite dans le fichier comme «pragma solidity… ..». La version doit être égale ou supérieure à la version du fichier. Par exemple, dans mon fichier, «pragma solidity ^ 0.6.0» est écrit donc la version requise est 0.6.0 ou supérieure. Comme indiqué, dans le compilateur, la version Solidity est la version 0.6.6, ce qui est correct. Après avoir vérifié la version de solidité, cliquez sur le bouton de compilation. Si vous n'avez rien changé dans le fichier, ou si la version Solidity n'est pas erronée, le contrat devrait se compiler sans aucune erreur.

![](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

Ensuite, passons au troisième onglet, DEPLOY & RUN TRANSACTION. Ici, avant de déployer notre contrat, nous devons changer d'environnement. Cliquez sur l'environnement et sélectionnez «Injected Web3». Si une fenêtre contextuelle apparaît et vous demande de vous connecter au compte, cliquez pour vous connecter. Ensuite, vous devriez voir l'adresse du compte dans la zone de texte “ACCOUNT”.

La dernière chose avant le processus de déploiement est de définir le contrat qui sera déployé en tant que jeton. Au-dessus du bouton Deploy, il y a un menu déroulant pour sélectionner un contrat. Sélectionnez le contrat nommé «ERC20PresetMinterPauser.sol».

![](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Maintenant, entrez ici le nom et le symbole de votre jeton. Je l'appellerai «test» et le symbole sera «tst». Vous pouvez lui donner un bouton et cliquer pour effectuer une transaction.

![](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

Après avoir cliqué sur le bouton, une fenêtre contextuelle apparaîtra et confirmera simplement.

![Image for post](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

Et puis une autre fenêtre contextuelle, une confirmation de metamask, apparaît. Confirme-la.

Après avoir confirmé toutes ces fenêtres contextuelles, nous avons déployé notre jeton sur la C-Chain Avalanche. Nous pouvons donc commencer à interagir avec lui.

## Intéragir avec le Token

Nous pouvons voir notre transaction qui s'est déployée sur avalanche C-Chain via cet [explorateur de la C-Chain.](https://cchain.explorer.avax.network/)

Mais tout d'abord, voyons notre hachage de transaction depuis la console de remix.

![](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

Après avoir déployé le contrat, nous devrions voir un journal dans la console de remix. Lorsque vous cliquez sur la flèche et que vous la développez, un hachage de transaction apparaît. Copiez-le.

![](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Collez simplement le hachage de la transaction dans l'explorateur que j'ai partagé ci-dessus et appuyez sur Entrée.

![](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

Ici, nous pouvons voir tous les détails sur la transaction et le contrat du jeton.

![](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

La première est l'adresse de mon portefeuille qui crée le jeton et la deuxième adresse est l'adresse de mon contrat de jeton qui s'appelle «test». Maintenant, c'est le moment de mint un jeton sur notre propre adresse.

![Image for post](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

Revenez sur remix et après le déploiement, vous devriez pouvoir voir le contrat dans la section “Deployed Contracts”.

Ici, nous avons un tas de fonctions que nous pouvons utiliser pour interagir avec notre contrat du jeton. Vous pouvez consulter toutes ces méthodes dans la documentation d'OpenZeppelin pour savoir comment les utiliser. Mais nous n'utiliserons que la méthode pour mint.

Cliquez sur la flèche à côté de mint method pour la lire.

![Image for post](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

Entrez votre adresse et un montant en WEI. Par exemple, je mint 1000 tst token donc, j'ai entré "1000000000000000000000"

![Image for post](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Ajouter un jeton à Metamask

Nous avons maintenant ajouté 1000 jetons à notre contrat, mais vous ne devriez pas pouvoir voir les jetons dans votre portefeuille métamasque. Afin de voir notre propre jeton, nous devons l'ajouter. Sur le Metamask, cliquez sur le bouton “Add Token” et sélectionnez l'onglet “Custom Token”.

Entrez ici l'adresse du jeton que vous pouvez voir depuis l'explorateur comme je l'ai montré ci-dessus. Copiez-le et collez-le ici. Cliquez ensuite sur le bouton "Next" button, vous devriez voir 1000 jetons que vous avez nommés dans votre portefeuille de metamask. En outre, vous pouvez l'envoyer à un autre compte via remix ou metamask.

