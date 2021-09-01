# Vérifier les contrats intelligents sur l'Explorer de C-Chain

L'Explorer de C-Chain prend en charge la vérification des contrats intelligents, ce qui permet aux utilisateurs de la examiner.

L'Explorer de la chaîne Mainnet est [ici](https://cchain.explorer.avax.network/) et l'Explorer de Fuji Testnet est [ici.](https://cchain.explorer.avax-test.network/)

Si vous avez des problèmes, contactez-nous sur [Discord](https://chat.avalabs.org).

## Étapes

Naviguez sur _l'onglet _Code de la page Explorer pour l'adresse de votre contrat.

![Vérifier et amp; Publier](../../../.gitbook/assets/smart-contract-verify-page.png)

Cliquez sur _Vérifier et publier pour entrer la page _de vérification du contrat intelligent.

![Entrée au contrat](../../../.gitbook/assets/smart-contract-input-page.png)

[Les bibliothèques](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) peuvent être fournies. S'ils le sont, ils doivent être déployés, vérifiés de manière indépendante et dans la section Bibliothèques _Ajouter un _contrat.

![Bibliothèques](../../../.gitbook/assets/smart-contract-library.png)

L'Explorer de C-Chain peut récupérer automatiquement les arguments du constructeur pour des contrats intelligents simples. Les contrats plus complexes peuvent vous obliger à passer dans des arguments de constructeurs spéciaux. Les contrats intelligents avec des constructeurs complexes [peuvent avoir des problèmes de validation](verify-smart-contracts.md#caveats). Vous pouvez essayer cet [encodeur en ligne](https://abi.hashex.org/).

## Exigences

* **Les **contrats IMPORTANTS doivent être vérifiés sur Testnet avant d'être déployés sur Mainnet pour s'assurer qu'il n'y a pas de problème
* Les contrats doivent être aplatis.
   * Comprend ne fonctionnera pas.
* Les contrats devraient être en mesure de compiler les contrats dans [Remix](https://remix.ethereum.org).
   * Un contrat aplati avec \(à `pragma experimental ABIEncoderV2`titre d'exemple\) peut créer des blobs binaires ou constructeurs inhabituels. Cela peut causer des problèmes de validation.
* L'Explorer de C-Chain ne **valide que [le javascript](https://github.com/ethereum/solc-bin) et ne prend en charge **que les contrats de [solidity.](https://docs.soliditylang.org)

## Bibliothèques

Le bytecode de compilation identifiera s'il existe des bibliothèques externes. Si vous avez publié avec Remix, vous verrez également plusieurs transactions créées.

```javascript
{
  "linkReferences": {
    "contracts/Storage.sol": {
      "MathUtils": [
        {
          "length": 20,
          "start": 3203
        }
        ...
      ]
    }
  },
  "object": "....",
  ...
}
```

Cela vous oblige à ajouter des bibliothèques externes afin de vérifier le code.

Une bibliothèque peut avoir des bibliothèques dépendantes. Pour vérifier une bibliothèque, la hiérarchie des dépendances devra être fournie à l'Explorer de C-Chain. La vérification peut échouer si vous fournissez plus que la bibliothèque et toute dépendance \(c'est-à-dire que vous pourriez avoir besoin de tailler le code de Solidité pour exclure tout sauf les classes nécessaires\).

Vous pouvez également voir les références dans le code d'octets dans le formulaire `__$75f20d36....$__`. Le hash keccak256 est généré à partir du nom de la bibliothèque.

Exemple [de convertisseur en ligne](https://emn178.github.io/online-tools/keccak_256.html): `contracts/Storage.sol:MathUtils`=>`75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## Exemples

* [SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan utilise des swaputils et des swaputils :

* [SwapUtils](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils nécessite des SwapUtils :

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## Capsules

### Licence de SPDX

Un SPDX doit être fourni.

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 cordes traitées

L'Explorer de C-Chain interprète toutes les chaînes de keccak256\(...\), même celles qui sont en commentaires. Cela peut causer des problèmes avec les args du constructeur.

```javascript
/// keccak256("1");
keccak256("2");
```

Cela pourrait causer des défaillances de vérification automatique du constructeur. Si vous recevez des erreurs sur les args du constructeur, ils peuvent être fournis dans le formulaire encodé ABI hex sur la page de vérification du contrat.

### Constructeurs de solidité

Les constructeurs et les constructeurs hérités peuvent causer des problèmes de vérification des arguments des constructeurs.

exemple :

```javascript
abstract contract Parent {
  constructor () {
    address msgSender = ...;
    emit Something(address(0), msgSender);
  }
}
contract Main is Parent {
  constructor (
          string memory _name,
          address deposit,
          uint fee
  ) {
    ...
  }
}
```

Si vous recevez des erreurs sur les args du constructeur, ils peuvent être fournis dans le formulaire encodé ABI hex sur la page de vérification du contrat.

