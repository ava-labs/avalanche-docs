# C-Chain エクスプローラ上でスマートコントラクトを確認する

C-Chain エクスプローラは、スマートコントラクトの検証をサポートし、ユーザーがレビューできるようにします。

メインネットC-Chain エクスプローラが[ここに](https://cchain.explorer.avax.network/)あり、富士テストネット エクスプローラがここにございます[。](https://cchain.explorer.avax-test.network/)

問題が発生した場合は、[Discord](https://chat.avalabs.org)上でご連絡ください。

## ステップ

コントラクトのアドレスについては、エクスプローラページの__コードタブに移動します。

![&amp; パブリッシュする](../../../.gitbook/assets/smart-contract-verify-page.png)

スマートコントラクト検証ページに入力_するには、「_検証と公開」をクリックします。

![コントラクトエントリ](../../../.gitbook/assets/smart-contract-input-page.png)

[ライブラリ](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries)を提供できます。もしそうでなければ、デプロイされ、独立検証され、「コントラクトライブラリを_追加セクションで実行する必要があります_。

![ライブラリ](../../../.gitbook/assets/smart-contract-library.png)

C-Chain エクスプローラは、シンプルなスマートコントラクトのために自動的にコンストラクタ引数を取得することができます。より複雑なコントラクトが必要になるかもしれません。複雑なコンストラクタを持つスマートコントラクトは[、バリデーション問題を抱える可能性があります。](verify-smart-contracts.md#caveats)[オンラインabiエンコーダ](https://abi.hashex.org/)

## 要件

* **重要な**コントラクトは、メインネットに展開される前に、テストネット上で確認してください。
* コントラクトはフラット化する必要があります。
   * 含まれることはありません。
* コントラクトは、[Remix](https://remix.ethereum.org)でコンパイル可能でなければなりません。
   * （例として）フラット化コントラクトにより`pragma experimental ABIEncoderV2`、異常なバイナリや/あるいはコンストラクタブローブを作成することができます。これによりバリデーション問題が発生する可能性があります。
* C-Chain エクスプローラは、[solc javascript](https://github.com/ethereum/solc-bin)**のみを**検証し、[Solcity](https://docs.soliditylang.org)コントラクトのみをサポートします。

## ライブラリ

コンパイルバイトコードが外部ライブラリがあるかどうか識別します。Remixでリリースされた場合、複数のトランザクションが作成されることも表示されます。

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

こうした場合、コードを真正確にするために外部ライブラリを追加する必要があります。

ライブラリは、依存型ライブラリを持つことができます。ライブラリを確認するためには、依存者の階層をC-Chain Explorerに提供する必要があります。ライブラリを超える依存性を提供すると、検証が失敗する可能性があります。（すなわち、Solidityコードをプルーン化して、必要なクラス以外を除外する必要があります）。

バイトコードで参照を見ることもできます`__$75f20d36....$__`。keccak256ハッシュは、ライブラリ名から生成されます。

[オンラインコンバータ例：](https://emn178.github.io/online-tools/keccak_256.html)`contracts/Storage.sol:MathUtils`=>`75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## 例

* [SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoanは、swaputilsとmathutilsを使用します：

* [SwapUtils](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtilsには、mathutilsが必要です：

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## 注意:

### SPDX

SPDX

```javascript
// SPDX-License-Identifier: ...
```

### keccak256文字列

C-Chain エクスプローラは、コメントでさえ、すべてのkeccak256\(...\)文字列を解釈します。これにより、コンストラクタargsに問題が発生する可能性があります。

```javascript
/// keccak256("1");
keccak256("2");
```

これにより自動コンストラクタ検証障害が発生する可能性があります。コンストラクタargsについてエラーが発生した場合、コントラクト検証ページ上のABI 16進数でエンコードされる形式で提供することができます。

### Solidity コンストラクタ

コンストラクタと継承されたコンストラクタは、コンストラクタ引数を検証する問題を引き起こす可能性があります。

例：

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

コンストラクタargsについてエラーが発生した場合、コントラクト検証ページ上のABI 16進数でエンコードされる形式で提供することができます。

