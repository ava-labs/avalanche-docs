---
description: 'Fourni par le membre de la Communauté: Murat Çeliktepe'

---

# Créer un jeton ERC-20

Les jetons ERC-20 sont le concept le plus fondamental et le plus essentiel dans Ethereum. Comme la communauté avalanche et l'écosystème se développent, de nouveaux cas d'utilisation et projets qui sont en cours sur Ethereum ou des chaînes différentes seraient mis en œuvre à Avalanche. La norme de jetons qui serait utilisée pour les projets n'est pas spécifique et tout le monde peut créer leur propre standard et propre jeton.

Par conséquent, nous allons créer notre propre jeton ERC-20 mintable et la jettera à n'importe quelle adresse que nous voulons. Le jeton sera généré sur la chaîne C Avalanche et sera accessible sur cette chaîne.

La chose que nous devons principalement considérer est que nous allons déployer un contrat intelligent écrit avec Solidité à Avalanche. C'est la fonctionnalité que Avalanche nous fournit - pour pouvoir déployer n'importe quel contrat intelligent dans la chaîne et aucune exigence pour un nouveau concept de contrat spécifique à la langue d'interagir. Regardons la façon de créer un contrat ERC-20 et de le déployer dans la chaîne avalanche

## Configuration Metamask

La première chose que nous devrions définir est un portefeuille metamask

![Image pour post](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Cliquez pour l'icône metamask sur le navigateur et sélectionnez le menu déroulant réseau. Ici, nous devrions nous connecter à C-Chain. Cliquez sur "RPC personnalisé".

![Image pour post](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Maintenant, nous devons définir ces boîtes avec des valeurs correctes.

* **Nom du réseau**: Avalanche C-Chain
* **Nouvelle URL RPC**:
   * **Mainnet:** [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
   * **Fuji Testnet:** [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
   * **Test local:** [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**:
   * **Mainnet:** `43114`
   * **Fuji Testnet:** `43113`
   * **Test local:** `43112`
* **Symbole **: AVAX
* **Explorateur**:
   * **Mainnet:** [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/)
   * **Fuji Testnet:** [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)
   * **Localnet :** n/a

![Image pour post](../../../.gitbook/assets/erc20-metamask.png)

Après avoir configuré tous les paramètres correctement, nous devrions voir cette page. Pour l'instant, nous avons 0 AVAX.

## Financer votre adresse C-Chain

Selon le réseau utilisé, il y a trois façons d'obtenir des fonds à votre adresse C-Chain.

### **Utilisation du Portefeuille Avalanche**

Sur le réseau principal, vous pouvez utiliser le [Portefeuille Avalanche](https://wallet.avax.network/) pour transférer des fonds de la chaîne Xà votre adresse C-Chain. Le processus est simple, comme expliqué dans ce [tutoriel](../platform/transfer-avax-between-x-chain-and-c-chain.md). Portefeuille peut être utilisé sur les réseaux de test et locaux, aussi.

### **Utilisation du robinet réseau de test**

Pour le financement sur le réseau de test, vous pouvez également utiliser le robinet de réseau de test. Naviguez vers [https://faucet.avax-test.network/](https://faucet.avax-test.network/) et collez votre adresse C-Chain.

### Financement sur test local

Sur un réseau local, vous pouvez facilement financer vos adresses en déployant votre propre robinet. [Tutoriel](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

Allons au [robinet avax](https://faucet.avax-test.network/) et coller notre adresse C-Chain, pour l'érable "0xfe8886bec537252040Dff36448C0F104Be635650".

![Image pour post](../../../.gitbook/assets/erc20-faucet.png)

Après copier et coller l'adresse ici, cliquez sur demande 20 AVAX. Ce jeton de robinet d'essai n'a aucune valeur, il est juste pour des fins de développement.

Ensuite, vérifiez votre balance de portefeuille et vous devriez avoir un jeton de test dans votre metamask.

## Créer jeton de table

Maintenant, nous pouvons créer notre jeton de table sur Remix. Ouvrez Remix sur votre navigateur ou allez à [ce lien](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js).

![Image pour post](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

Vous devriez visualiser cette page. Sur cette page, d'abord, cliquez sur "SOLIDITÉ" depuis "Plugins veillées" puis cliquez sur le "Nouveau fichier" bouton. Lorsque vous cliquez sur le Nouveau fichier, vous verrez un pop-up qui nécessite un nom de fichier. Vous pouvez choisir un nom ou quitter la valeur par défaut.

Puisque nous allons utiliser un contrat ERC-20 depuis [OpenZeppelin](https://openzeppelin.com/contracts/), il suffit de coller cette ligne dans le fichier et sauvegarder.

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![Image pour post](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

Après avoir enregistré le fichier, nous allons voir un tas de fichiers qui sont importés pour remix. Il s'agit d'une fonctionnalité remix qui nous permet d'importer un dépôt contractuel GitHub à remixer en donnant simplement import avec une déclaration d'importation.

![Image pour post](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

Nous avons le fichier ERC20PresetMinterPaiser.sol dans les presets. Ce fichier est écrit par OpenZeppelin selon les normes ERC20 avec la fonctionnalité de minter. Après avoir déployé ce fichier, nous serons le propriétaire du contrat et ainsi avoir l'autorité et la capacité de mint les jetons.

![Image pour post](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Déployer le contrat

Ouvrez la deuxième onglet qui est "SOLIDITY COMPILER" et sélectionnez la version de solidité qui correspond à la version de solidité écrite dans le fichier comme "pragma solidité…..". La version devrait être égale ou supérieure à la version du fichier. Par exemple, dans mon fichier, "pragma solidité ^0.6.0" est écrit de sorte que la version requise est 0.6.0 ou supérieure. Comme indiqué, dans le compilateur la version de solidité est 0.6.6, qui est ok. Après avoir vérifié la version de solidité, cliquez sur le bouton compiler. Si vous n'avez rien modifié dans le fichier, ou la version de solidité n'est pas fausse, le contrat devrait compiler sans aucune erreur.

![Image pour post](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

Ensuite, nous allons sauter dans la troisième onglet qui est DÉPLOYER & RUN TRANSACTION. Ici avant le déploiement de notre contrat, nous devrions changer l'environnement. Cliquez sur l'environnement et sélectionnez "Injected Web3". Si un pop-up apparaît et vous demande de connecter le compte, cliquez pour se connecter. Après, vous devriez voir l'adresse de compte dans la zone de texte "COMPTE".

La dernière chose avant le processus de déploiement est de définir le contrat qui sera déployé comme jeton. Au-dessus du bouton Déployer, il y a un menu déroulant pour sélectionner un contrat. Sélectionnez le contrat nommé "ERC20PresetMinterPauser.sol".

![Image pour post](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Maintenant, entrez le nom et le symbole de votre jeton. Je vais le nommer "test" et le symbole sera "tsst". Vous pouvez lui donner un et cliquez pour transact bouton.

![Image pour post](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

Après avoir cliqué sur le bouton, un pop-up apparaîtra et juste la confirmer.

![Image pour post](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

Et puis un autre pop-up, une confirmation metamask apparaît. Confirmez-le.

Après avoir confirmé tous ces pop-ups, nous avons déployé notre jeton vers avalanche C-Chain. Nous pouvons donc commencer à interagir avec elle.

## Interagir avec Token

Nous pouvons voir notre transaction qui est déployée sur la chaîne avalanche C-Chain via cet [explorateur de la chaîne c](https://cchain.explorer.avax-test.network/).

Mais d'abord, voyons notre hachage de transaction depuis la console remix.

![Image pour post](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

Après le déploiement du contrat, nous devrions voir une connexion dans la console de remix. Lorsque vous cliquez pour l'arroser et l'agrandir, une hachage de transaction apparaîtra. Copiez-le.

![Image pour post](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Il suffit de [coller](https://cchain.explorer.avax-test.network/) le hachage de la transaction à l'explorateur que j'ai partagé ci-dessus et appuyez sur entrer.

![Image pour post](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

Ici, nous pouvons voir tous les détails sur la transaction et le contrat jeton.

![Image pour post](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

La première est mon adresse portefeuille qui crée jeton et la seconde adresse est mon adresse de contrat jetant le nom de "test". Maintenant, jetons un jeton à notre propre adresse.

![Image pour post](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

Revenez au remix et après le déploiement, vous devriez être en mesure de voir le contrat dans la section "Contrats déployés".

Ici, nous avons un tas de fonctions que nous pouvons utiliser pour interagir avec notre contrat de jetons. Vous pouvez vérifier toutes ces méthodes de la documentation OpenZeppelin pour apprendre à les utiliser. Mais nous n'utiliserons la méthode de la menthe.

Cliquez pour flèche à côté de la méthode de la menthe pour la lire.

![Image pour post](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

Entrez votre adresse et un montant dans le WEI. Par exemple, je vais jeter 1000 jetons de première minute, donc, j'ai entré "100"

![Image pour post](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Ajouter Token à Metamask

Maintenant, nous avons mis 1000 jetons à notre contrat, mais vous ne devriez pas être en mesure de voir les jetons dans votre portefeuille metamask Afin de voir notre propre jeton, nous devons l'ajouter. Sur la metamask, cliquez sur le bouton "Ajouter jeton" et sélectionnez onglet "Token personnalisé".

Ici entrez l'adresse jeton que vous pouvez voir de l'explorateur comme je l'ai montré ci-dessus. Copiez et collez-la ici. Puis cliquez sur le bouton Suivant, vous devriez voir 1000 jetons que vous avez nommé dans votre portefeuille metamask Aussi, vous pouvez l'envoyer à un autre compte via soit remix ou metamask.

