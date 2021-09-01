# Ajouter une Avalanche à MetaMask Programmatic

L'ajout de nouveaux réseaux à Metamask n'est pas une tâche triviale pour les personnes qui ne sont pas techniquement savantes, et il peut être sujet à erreur. Pour faciliter l'inscription des utilisateurs sur votre application, il est utile de simplifier le plus possible ce processus. Ce tutoriel montrera comment construire un simple bouton dans votre application de front-end qui automatisera le processus d'ajout du réseau Avalanche à MetaMask.

## EIP-3038 & MetaMask

[EIP-3038](https://eips.ethereum.org/EIPS/eip-3085) est une [proposition d'amélioration d'Ethereum](https://eips.ethereum.org/) qui définit une méthode RPC pour ajouter des chaînes compatibles Ethereum aux applications de portefeuille.

Depuis mars 2021, Metamask a mis en œuvre cette EIP dans le cadre de leur API de [réseaux personnalisés](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/) Metamask.

Voyons comment ça marche.

## Structures de données

Pour ajouter le réseau Avalanche à Metamask, nous devons préparer les structures de données qui contiendront toutes les données nécessaires.

Principales données du réseau :

```javascript
export const AVALANCHE_MAINNET_PARAMS = {
    chainId: '43114',
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/']
}
```

Tester les données du réseau :

```javascript
export const AVALANCHE_TESTNET_PARAMS = {
    chainId: '43113',
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
}
```

## Ajouter le réseau

Pour ajouter le réseau à MetaMask, nous devons appeler la `wallet_addEthereumChain`méthode, exposée par le fournisseur web3.

```javascript
  function addAvalancheNetwork() {
    injected.getProvider().then(provider => {
      provider
        .request({
          method: 'wallet_addEthereumChain',
          params: [AVALANCHE_MAINNET_PARAMS]
        })
        .catch((error: any) => {
          console.log(error)
        })
    })
  }
```

Où `injected`est initialisé comme un `web3-react/injected-connector`utilisé pour interagir avec les API MetaMask. L'utilisation pour d'autres cadres Web populaires est similaire. Remplacez `AVALANCHE_MAINNET_PARAMS`par `AVALANCHE_TESTNET_PARAMS`si vous souhaitez ajouter le réseau de test.

Un motif d'utilisation typique serait d'exposer un bouton qui appelle cette méthode si vous obtenez ou `Wrong Network`des `Error connecting`erreurs lorsqu'il s'agit de tenter d'établir une connexion à MetaMask.

## Expérience utilisateur

Lorsque les utilisateurs viennent pour la première fois sur le site de votre dapp, ils doivent approuver la connexion à MetaMask. Après qu'ils le font encore, si vous ne détectez pas la connexion réseau web3 réussie, vous pouvez les présenter avec une boîte de dialogue leur demandant de confirmer le passage à un nouveau réseau :

![mauvais réseau](../../../.gitbook/assets/add-avalanche-to-metamask-01-wrong-network.png)

S'ils appuyez sur le bouton, ils sont affichés une boîte de dialogue de MetaMask demandant l'approbation d'ajouter le nouveau réseau :

![ajouter un réseau](../../../.gitbook/assets/add-avalanche-to-metamask-02-add-network.png)

Si elles approuvent, votre application sera connectée au réseau Avalanche. Très facile, pas besoin d'une saisie de données, pas de chance d'une mauvaise saisie de données. Et c'est tout, les utilisateurs sont prêts à interacer avec votre dapp !

## Conclusion

Les utilisateurs de Dapps ne sont souvent pas très techniquement sophistiqués et les embarquer doivent être aussi transparents et faciles que possible. L'ajout manuel d'un nouveau réseau à MetaMask est un obstacle qu'un certain pourcentage de vos utilisateurs potentiels ne pourra pas être clair. Supprimer cette exigence est une étape simple qui améliorera leur expérience et permettra à plus d'utilisateurs d'accéder à l'utilisation effective de votre dapp.

Si vous avez des questions, des problèmes ou des idées sur la manière de s'améliorer, ou si vous souhaitez simplement rejoindre notre communauté de développeurs, vous pouvez nous contacter sur notre serveur [Discord](https://chat.avalabs.org/).

