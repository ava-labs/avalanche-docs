# Vérifier les contrats intelligents sur l'Explorateur de la chaîne C

L'Explorateur de chaîne C supporte la vérification des contrats intelligents, permettant aux utilisateurs de l'examiner.

L'Explorateur de chaîne Mainnet est [ici](https://cchain.explorer.avax.network/) et l'Explorateur Fuji Testnet est [là.](https://cchain.explorer.avax-test.network/)

Si vous avez des problèmes, contactez-nous sur [Discord](https://chat.avalabs.org).

## Étapes principales

Naviguez à l'onglet _Code_ de la page Explorer pour l'adresse de votre contrat.

![Vérifier &amp; Publier](../../../.gitbook/assets/smart-contract-verify-page.png)

Cliquez _sur Vérifier et publier_ pour entrer la page de vérification du contrat intelligent.

![Entrée du contrat](../../../.gitbook/assets/smart-contract-input-page.png)

[Les bibliothèques](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries) peuvent être fournies. S'ils le sont, ils doivent être déployés, vérifiés de manière indépendante et dans la section _Ajouter_ des bibliothèques contractuelles.

![Bibliothèques](../../../.gitbook/assets/smart-contract-library.png)

L'Explorateur C-Chain peut récupérer automatiquement les arguments du constructeur pour des contrats intelligents simples. Les contrats plus complexes pourraient vous obliger à passer dans des arguments de constructeur spéciaux. Les contrats intelligents avec des constructeurs complexes [peuvent avoir des problèmes de validation](verify-smart-contracts.md#caveats). Vous pouvez essayer cet [encodeur abi en ligne](https://abi.hashex.org/).

## Exigences minimales

* **IMPORTANTS** Contrats devraient être vérifiés sur Testnet avant d'être déployés sur Mainnet pour s'assurer qu'il n'y a aucun problème.
* Les contrats doivent être aplati.
   * Inclut ne fonctionnera pas.
* Les contrats devraient être compilés dans [Remix](https://remix.ethereum.org).
   * Un contrat aplati avec `pragma expérimentale ABIEncoderV2` \(comme exemple\) peut créer des blobs binaires et/ou constructeurs. Cela pourrait causer des problèmes de validation.
* L'Explorateur C-Chain valide **uniquement** [le javascript et](https://github.com/ethereum/solc-bin) supporte uniquement les contrats [de](https://docs.soliditylang.org) solidité.

## Bibliothèques

Le bytecode compilation identifiera s'il y a des bibliothèques externes. Si vous avez libéré avec Remix, vous verrez également plusieurs transactions créées.

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

Une bibliothèque peut avoir des bibliothèques dépendantes. Pour vérifier une bibliothèque, la hiérarchie des dépendances devra être fournie à l'explorateur C-Chain . La vérification peut échouer si vous fournissez plus que la bibliothèque et toutes les dépendances \(c.-à-d. vous pourriez avoir besoin de tailler le code Solidité pour exclure n'importe quoi sauf les classes nécessaires\).

Vous pouvez également voir des références dans le code octet dans le formulaire `__$75f20d36.... $__`. Le hachage keccak256 est généré à partir du nom de la bibliothèque.

Exemple [convertisseur en ligne](https://emn178.github.io/online-tools/keccak_256.html): `contracts/Storage.sol:MathUtils` => `75f20d361629befd780a5bd3159f017e0f8283bdb6da80805f83e829337fd12`

## Exemples de mesures

* [SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan utilise swaputils et mathutils:

* [Swaputils](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils nécessite des mathutils:

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## Avertissements

### Licence SPDX requise

Un SPDX doit être fourni.

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 chaînes traitées

L'explorateur de chaîne C-Chain toutes les chaînes keccak256\(...\), même celles qui sont utilisées dans les commentaires. Cela peut causer des problèmes avec les args constructeur.

```javascript
/// keccak256("1");
keccak256("2");
```

Cela pourrait causer des défaillances de vérification automatique du constructeur. Si vous recevez des erreurs sur les args constructeur, ils peuvent être fournis dans ABI hex formulaire encodé sur la page de vérification du contrat.

### Constructeurs de solidité

Les constructeurs et les constructeurs hérités peuvent causer des problèmes de vérification des arguments des constructeurs.

exemple:

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

Si vous recevez des erreurs sur les args constructeur, ils peuvent être fournis dans ABI hex formulaire encodé sur la page de vérification du contrat.

