# Ajouter l'avalanche à MetaMask Programmatiquement

Ajouter de nouveaux réseaux à Metamask n'est pas une tâche triviale pour les personnes qui ne sont pas techniquement savvy, et il peut être pré erreur. Afin d'aider plus facile l'embarquement des utilisateurs à votre application, il est utile de simplifier ce processus autant que possible. Ce tutoriel montrera comment construire un bouton simple dans votre application front-end qui automatisera le processus d'ajout du réseau Avalanche à MetaMask.

## EIP-3038 & MetaMask

[EIP-3038](https://eips.ethereum.org/EIPS/eip-3085) est une [proposition d'amélioration Ethereum](https://eips.ethereum.org/) qui définit une méthode RPC pour l'ajout de chaînes compatibles Ethereum aux applications de portefeuille.

Depuis mars 2021, Metamask a implémenté cette EIP dans le cadre de leur API Metamask [Custom Networks](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/).

Voyons comment ça marche.

## Structures de données

Pour ajouter le réseau Avalanche à Metamask, nous devons préparer les structures de données qui seront toutes les données nécessaires.

Données principales du réseau:

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

Données du réseau d'essai :

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

## Ajout du réseau

Pour ajouter le réseau à MetaMask, nous devons appeler la méthode `wallet_addEthereumChain` exposed le fournisseur web3.

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

Lorsque `l'injection` est initialisée comme un `connecteur` web3-réacte/injecté, utilisé pour l'interface avec les API MetaMask. L'utilisation d'autres cadres web populaires est similaire. Remplacez `AVALANCHE_MAINNET_PARAMS` par `AVALANCHE_TESTNET_PARAMS` si vous souhaitez ajouter le réseau de test.

Modèle d'utilisation typique serait d'exposer un bouton appelant cette méthode si vous obtenez `erreur réseau` ou `erreur de connexion` lors de la tentative d'établir une connexion à MetaMask.

## Expérience utilisateur

Lorsque les utilisateurs viennent pour la première fois sur le site de votre dapp, ils doivent approuver la connexion à MetaMask. Après qu'ils le font, si vous ne détectez pas la connexion réseau web3 réussie, vous pouvez les présenter avec une boîte de dialogue leur demandant de confirmer le passage à un nouveau réseau:

![réseau incorrect](../../../.gitbook/assets/add-avalanche-to-metamask-01-wrong-network.png)

S'ils appuyez sur le bouton, ils sont affichés une boîte de dialogue de MetaMask demandant l'approbation d'ajouter le nouveau réseau:

![ajouter un réseau](../../../.gitbook/assets/add-avalanche-to-metamask-02-add-network.png)

S'ils approuvent, votre application sera connectée au réseau Avalanche. Très facile, pas besoin d'aucune entrée de données, aucune chance d'une mauvaise entrée de données. Et c'est cela, les utilisateurs sont prêts à interacy avec votre dapp!

## Conclusion

Les utilisateurs de Dapps sont souvent peu techniquement sophistiqués et leur inscription doit être aussi transparente et facile que possible. L'ajout manuel d'un nouveau réseau à MetaMask est un obstacle qu'un certain pourcentage de vos utilisateurs potentiels ne sera pas en mesure de clearer. Suppression de cette exigence est une étape simple qui permettra d'améliorer leur expérience et de permettre plus d'utilisateurs d'obtenir d'utiliser réellement votre dapp.

Si vous avez des questions, des problèmes ou des idées sur la façon de s'améliorer, ou simplement vous souhaitez rejoindre notre communauté de développeurs, vous pouvez nous contacter sur notre serveur [Discord](https://chat.avalabs.org/).

