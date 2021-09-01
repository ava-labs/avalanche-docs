---
description: 'Fourni par le membre de la communauté : Murat Çeliktepe'
---

# Créer un jeton ERC-20

Les jetons ERC-20 sont le concept le plus fondamental et le plus essentiel d'Ethereum. Comme la communauté d'Avalanche et l'écosystème se développent, de nouveaux cas d'utilisation et projets qui sont en cours sur Ethereum ou différentes chaînes seraient mis en œuvre à Avalanche. La norme de jetons qui serait utilisée pour les projets n'est pas spécifique et tout le monde peut créer leur propre jeton standard et propre.

Par conséquent, nous créerons notre propre jeton ERC-20 minable et le frapperons sur toute adresse que nous voulons. Le jeton sera généré sur Avalanche C-Chain et sera accessible sur cette chaîne.

La chose que nous devons principalement considérer est que nous déploierons un contrat intelligent écrit avec Solidity à Avalanche. C'est la fonctionnalité que Avalanche nous fournit - pour pouvoir déployer tout contrat intelligent sur la chaîne et aucune exigence pour un nouveau concept de contrat de contrat spécifique à la langue pour interagir. Examinons la façon de créer un contrat ERC-20 et de le déployer sur avalanche C-Chain.

## Définir Metamask

La première chose que nous devrions définir est un portefeuille de metamask

![Image pour post](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Cliquez pour l'icône en metamask sur le navigateur et sélectionnez le menu déroulant du réseau. Ici nous devrions nous connecter à C-Chain. Cliquez sur "RPC personnalisé".

![Image pour post](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Maintenant, nous devons configurer ces boîtes avec des valeurs correctes.

* **Nom du réseau **: Avalanche C-Chain
* **Nouvelle URL **RPC:
   * **Mainnet : **[https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
   * **Fuji Testnet:** [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
   * **Testnet local: **[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**:
   * **Mainnet:**`43114`
   * **Fuji Testnet:**`43113`
   * **Testnet local:**`43112`
* **Symbole **: AVAX
* **Explorer **:
   * **Mainnet : **[https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/)
   * **Fuji Testnet:** [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)
   * **Localnet : **n/a

![Image pour post](../../../.gitbook/assets/erc20-metamask.png)

Après avoir configuré correctement tous les paramètres, nous devons voir cette page. Pour l'instant, nous avons 0 AVAX.

## Financer votre adresse C-

En fonction du réseau utilisé, il existe trois façons d'obtenir des fonds à votre adresse C-Chain.

### **Utilisation d'Avalanche Wallet**

Sur le réseau principal, vous pouvez utiliser le [portefeuille](https://wallet.avax.network/) d'Avalanche pour transférer des fonds de la X-Chain à votre adresse C-Chain. Le processus est simple, comme expliqué dans ce [tutoriel](../platform/transfer-avax-between-x-chain-and-c-chain.md). Le portefeuille peut également être utilisé sur les réseaux de test et local.

### **Utilisation du faucer de réseau de test**

Pour le financement sur le réseau de tests, vous pouvez également utiliser le faucet de réseau de tests. Naviguez sur [https://faucet.avax-test.network/](https://faucet.avax-test.network/) et collez votre adresse C-Chain.

### Financement sur test local

Sur un réseau local, vous pouvez facilement financer vos adresses en déployant votre propre robinet. [Tutoriel](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

Allons à [avax](https://faucet.avax-test.network/) et coller notre adresse C-Chain, pour exMaple "0xfe8886bec537252040Dff36448C0F104Be635650".

![Image pour post](../../../.gitbook/assets/erc20-faucet.png)

Après avoir copié et collé l'adresse ici, cliquez sur demander 20 AVAX. Ce jeton de test n'a aucune valeur, il est juste pour des fins de développement.

Ensuite, vérifiez votre solde de portefeuille et vous devriez avoir un jeton de test dans votre metamask.

## Créer un jeton de lecture de minables

Maintenant, nous pouvons créer notre jeton de menton sur Remix. Ouvrez Remix sur votre navigateur ou accédez à [ce lien](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js).

![Image pour post](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

Vous devriez visualiser cette page. Sur cette page, d'abord, cliquez sur "SOLIDITÉ" de "Plugins en vedette" puis cliquez sur le bouton "Nouveau fichier". Lorsque vous cliquez sur le bouton Nouveau fichier, vous verrez une pop-up qui nécessite un nom de fichier. Vous pouvez choisir un nom ou laisser la défaut.

Puisque nous utiliserons un contrat ERC-20 [use](https://openzeppelin.com/contracts/) il suffit de coller cette ligne au fichier et de les enregistrer.

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![Image pour post](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

Après avoir enregistré le fichier, nous verrons un tas de fichiers importés pour se remixer. Ceci est une fonctionnalité de remix qui nous permet d'importer un dépôt de contrat de GitHub pour remixer en donnant simplement is

![Image pour post](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

Nous avons le fichier ERC20PresetMinterPauser.sol dans les presets. Ce fichier est écrit par OpenZeppelin selon les normes ERC20 avec des fonctionnalités de minerais. Après avoir déployé ce fichier, nous serons le propriétaire du contrat et avons ainsi l'autorité et la capacité de frapper les jetons.

![Image pour post](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Déployer le contrat

Ouvrez la deuxième onglet qui est "SOLIDITY COMPILER" et sélectionnez la version de solidité qui correspond à la version de solidité écrite dans le fichier comme "pragma solidité…..". La version devrait être égale ou supérieure à la version du fichier. Par exemple, dans mon fichier, "pragma solidité ^0.6.0" est écrit de sorte que la version requise est 0.6.0 ou plus Comme indiqué, dans le compilateur, la version de solidité est 0.6.6, qui est d'accord. Après avoir vérifié la version de solidité, cliquez sur le bouton de compilation. Si vous n'avez pas modifié rien dans le fichier ou que la version de solidité n'est pas fausse, le contrat devrait compiler sans aucune erreur.

![Image pour post](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

Ensuite, passez à la troisième onglet qui est DÉPLOYER ET EXÉCUTER LA TRANSACTION. Ici avant de déployer notre contrat, nous devons changer l'environnement. Cliquez sur l'environnement et sélectionnez "Web3 injecté". Si un pop-up est affiché et vous demande de connecter le compte, cliquez pour se connecter. Ensuite, vous devez voir l'adresse de compte dans la zone de texte "COMPTE".

La dernière chose avant le processus de déploiement est de définir le contrat qui sera déployé en tant que jeton. Au-dessus du bouton de déploiement, il ya un menu déroulant pour sélectionner un contrat. Sélectionnez le contrat nommé "ERC20PresetMinterPauser.sol".

![Image pour post](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Maintenant, entrez ici le nom et le symbole de votre jeton. Je vais le nommer "test" et le symbole sera "tst". Vous pouvez lui donner un et cliquer pour transact le bouton.

![Image pour post](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

Après avoir cliqué sur le bouton, une pop-up contextuelle, et la confirmera.

![Image pour post](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

Et ensuite un autre pop-up, une confirmation en metamask s'affiche. Confirmez-le.

Après avoir confirmé tous ces pop-ups, nous avons déployé notre jeton sur avalanche C-Chain. Donc nous pouvons commencer à interagir avec elle.

## Interagir avec Token

Nous pouvons voir notre transaction qui s'est déployée sur la C-Chain d'avalanche via cet [explorateur de c-chain](https://cchain.explorer.avax-test.network/).

Mais d'abord, voyons notre hachage de transaction depuis la console de remix.

![Image pour post](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

Après avoir déployé le contrat, nous devons voir une console de remix en ligne. Lorsque vous cliquez pour l'arroser et l'agrandir, un hachage de transaction sera créé. Copiez-le.

![Image pour post](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Il suffit de collez le hacher de la transaction à [l'explorateur](https://cchain.explorer.avax-test.network/) que j'ai partagé ci-dessus et de appuyez sur entre.

![Image pour post](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

Ici nous pouvons voir tous les détails sur la transaction et le contrat de jetons.

![Image pour post](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

La première est mon adresse de portefeuille qui crée un jeton et la deuxième est mon adresse de contrat de jeton qui est nommée « test ». Maintenant, jetons un peu de jetons sur notre propre adresse.

![Image pour post](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

Revenez au remix et après le déploiement, vous devriez être en mesure de voir le contrat dans la section "Contrats de déploiement".

Ici, nous avons un tas de fonctions que nous pouvons utiliser pour interagir avec notre contrat de jetons. Vous pouvez vérifier toutes ces méthodes depuis la documentation OpenZeppelin pour apprendre à les utiliser. Mais nous n'utiliserons que la méthode de la menthe.

Cliquez pour flèche à côté de la méthode de la menthe pour la lire.

![Image pour post](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

Saisissez votre adresse et un montant en WEI. Par exemple, je vais taper 1000 jetons de tst donc, j'ai entré "100"

![Image pour post](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Ajouter un jeton à Metamask

Maintenant nous avons frappé 1000 jetons sur notre contrat, mais vous ne devriez pas être en mesure de voir les jetons dans votre portefeuille de metamask Afin de voir notre propre jeton, nous devons l'ajouter. Sur la metamask, cliquez sur le bouton "Ajouter un jeton" et sélectionnez l'onglet "Jeton personnalisé".

Saisissez ici l'adresse de jetons que vous pouvez voir de l'explorateur comme je l'ai montré ci-dessus. Copiez et collez-le ici. Cliquez ensuite sur le bouton suivant, vous devez voir 1000 jetons que vous avez nommé dans votre portefeuille de metamask En outre, vous pouvez l'envoyer à un autre compte par remix ou par metamask.

