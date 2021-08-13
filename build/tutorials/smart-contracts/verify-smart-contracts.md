# C-Chain Explorerでスマートコントラクトを確認する

C-Chain Explorerは、スマートコントラクトの検証をサポートし、ユーザーはそれを確認できます。

JPJ-C-Chain Explorerは[こちら](https://cchain.explorer.avax.network/)、富士テストネットエクスプローラは[こちらです。](https://cchain.explorer.avax-test.network/)

問題がある場合は、[Discord](https://chat.avalabs.org)でお問い合わせください。

## JP-JP-

契約のアドレスをエクスプローラーページの_[_コード]タブに移動します。

![&amp; 公開する](../../../.gitbook/assets/smart-contract-verify-page.png)

[_Verify & Publish_]をクリックして、スマートコントラクトの検証ページを入力します。

![契約書エントリー](../../../.gitbook/assets/smart-contract-input-page.png)

[ライブラリー](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries)を提供することができます。それらが存在する場合、それらはデプロイし、独立して検証され、_[契約ライブラリ_の追加]セクションでなければなりません。

![JavaScript-JP-JP-](../../../.gitbook/assets/smart-contract-library.png)

C-Chain Explorer は、シンプルなスマートコントラクトのためにコンストラクタ引数を自動的に取得できます。より複雑なコントラクトでは、特別なコンストラクタ引数を渡す必要があるかもしれません。複雑なコンストラクターを持つスマートコントラクトには[、検証の問題が発生する可能性があります。](verify-smart-contracts.md#caveats)あなたはこの[オンラインabiエンコーダを](https://abi.hashex.org/)試すことができます。

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

* **重要**な契約は、問題がないことを確認するために、Mainnet にデプロイする前に、Testnet で検証する必要があります。
* 契約は平坦化する必要があります。
   * Includesは機能しません。
* Contractsは[Remix](https://remix.ethereum.org)でコンパイル可能である必要があります。
   * `Pragma 実験的な ABIEncoderV2` \(例: example\) によるフラット化されたコントラクトは、異常なバイナリやコンストラクターのブロブを作成できます。これにより、検証の問題が発生する可能性があります。
* C-Chain Explorerは[solc javascript](https://github.com/ethereum/solc-bin)**のみ**を検証し、[Solidity](https://docs.soliditylang.org) 契約書のみをサポートします。

## JavaScript-JP-JP-

コンパイルバイトコードは、外部ライブラリーがあるかどうかを識別します。Remixでリリースした場合、複数のトランザクションが作成されます。

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

これにより、コードを真正にするために外部ライブラリを追加する必要があります。

ライブラリーは依存ライブラリーを持っていることができます。ライブラリを検証するには、依存関係の階層をC-Chain Explorerに提供する必要があります。JavaScript-JP-JP-

`__$75f20d36..` という形式でバイトコードで参照も表示できます。$__.keccak256ハッシュはライブラリ名から生成されます。

[オンラインコンバータ例：](https://emn178.github.io/online-tools/keccak_256.html)`contracts/Storage.sol:MathUtils` => `75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

* [SwapFlashLoan-JP](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoan は swaputils と mathutils を使います:

* [JavaScript-JP-JP-](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtils は mathutils を必要とする:

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## CaveJP-JP-

### SPDXライセンスが必要

SPDXを用意する必要があります。

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 文字列処理済み

C-Chain Explorer は、コメントのものでも、すべての keccak256\(...\) 文字列を解釈します。これにより、コンストラクターargsの問題が発生する可能性があります。

```javascript
/// keccak256("1");
keccak256("2");
```

これにより、自動コンストラクタ検証の失敗を引き起こす可能性があります。コンストラクターargs についてエラーが発生した場合、ABI エンコードされたフォームでコントラクト検証ページで提供できます。

### Solidity コンストラクタ

Constructors と 継承されたコンストラクターは、コンストラクター引数を検証する問題を引き起こす可能性があります。

例:

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

コンストラクターargs についてエラーが発生した場合、ABI エンコードされたフォームでコントラクト検証ページで提供できます。

