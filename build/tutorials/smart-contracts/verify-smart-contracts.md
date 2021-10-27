#  C-Chain Explorerでスマートコントラクトを検証する

 C-Chain Explorerでは、スマートコントラクトの検証のサポートを提供しており、ユーザーはコントラクトを確認することができます。

Mainnet C-Chain Explorerは[ここ](https://cchain.explorer.avax.network/)にあり、Fuji Testnet Explorerは[こちら](https://cchain.explorer.avax-test.network/)です。

問題がある場合は、[Discord](https://chat.avalabs.org)でお問い合わせください。

## ステップ

コントラクトのアドレスを確認するには、Explorerページの_Code（コード）_タブに移動します。

![検証と公開](../../../.gitbook/assets/smart-contract-verify-page.png)

_Verify & Publish（検証と公開）_をクリックし、スマートコントラクト検証ページを入力します。

![コントラクトの入力](../../../.gitbook/assets/smart-contract-input-page.png)

[ライブラリ](https://docs.soliditylang.org/en/v0.8.4/contracts.html?highlight=libraries#libraries)が提供されていることもあります。ライブラリが提供される場合、ライブラリをデプロイし、個別に検証し、_で、Contract Libraries（コントラクトライブラリ）_セクションに追加してください。

![ライブラリ](../../../.gitbook/assets/smart-contract-library.png)

 C-Chainエクスプローラは、シンプルなスマートコントラクトであれば自動的にコンストラクタ引数を取得することができます。より複雑なコントラクトの場合は、特別なコンストラクタ引数を渡す必要があります。複雑なコンストラクタをもつスマートコントラクトは、[検証に問題が出る可能性があります](verify-smart-contracts.md#caveats)。この[オンラインabiエンコーダ](https://abi.hashex.org/)を試すことができます。

## 要件

* **重要**　問題を確実に避けるため、コントラクトは、Mainnetにデプロイする前に、テストネットで検証しておく必要があります。
* コントラクトはフラット化しておく必要があります。
   * インクルードは機能しません。
* コントラクトは、[Remix](https://remix.ethereum.org)でコンパイル可能でなければなりません。
   * (例えば)`pragma experimental ABIEncoderV2`でフラット化されたコントラクトは、通常とは異なるバイナリおよび／またはコンストラクタのblobを作成することができます。これは、検証の問題を引き起こす可能性があります。
*  C-Chain Explorer[は、](https://github.com/ethereum/solc-bin)**solc javascript**だけを検証し、[Solidity](https://docs.soliditylang.org)コントラクトのみをサポートしています。

## ライブラリ

コンパイルバイトコードが外部ライブラリが存在するかどうかを識別します。Remixでリリースした場合は、作成された複数の取引も表示されます。

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

このため、コードを検証するために外部ライブラリを追加する必要があります。

ライブラリは、依存するライブラリを持つことができます。ライブラリを検証するには、依存関係の階層を、 C-Chain Explorer.に提供しておく必要があります。ライブラリと依存関係以上のものを提供する場合、検証が失敗する可能性があります。（例えば、必要なクラス以外のものをすべてとり除くため、Solidarityコードを短くする必要があるかもしれません。）

`__$75f20d36....$__`フォームのバイトコードの参照情報もご覧ください。keccak256ハッシュは、ライブラリ名から生成します。

[オンラインコンバータ](https://emn178.github.io/online-tools/keccak_256.html)の例:`contracts/Storage.sol:MathUtils` =>`75f20d361629befd780a5bd3159f017ee0f8283bdb6da80805f83e829337fd12`

## 例

* [SwapFlashLoan](https://cchain.explorer.avax-test.network/address/0x12DF75Fed4DEd309477C94cE491c67460727C0E8/contracts)

SwapFlashLoanは、swaputilsとmathutilsを使用します。

* [SwapUtils](https://cchain.explorer.avax-test.network/address/0x6703e4660E104Af1cD70095e2FeC337dcE034dc1/contracts)

SwapUtilsは、mathutilsを必要とします。

* [MathUtils](https://cchain.explorer.avax-test.network/address/0xbA21C84E4e593CB1c6Fe6FCba340fa7795476966/contracts)

## 警告

### SPDXライセンスが必要です。

SPDXが提供されている必要があります。

```javascript
// SPDX-License-Identifier: ...
```

### keccak256 文字列が実行されました。

 C-Chain Explorerは、すべてのkeccak256(...)文字列、コメント内の文字列さえも解釈します。これによりコンストラクタのargsに問題を引き起こす可能性があります。

```javascript
/// keccak256("1");
keccak256("2");
```

これにより自動コンストラクタ検証の失敗を引き起こす可能性があります。コンストラクタ argsについてエラーが発生した場合、それらはコントラクト検証ページのABI hexエンコードフォームで提供することができます。

### Solidityコンストラクタ

コンストラクタと継承されたコンストラクタは、コンストラクタの引数の検証に問題を引き起こす可能性があります。

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

コンストラクタ argsについてエラーが発生した場合、それらはコントラクト検証ページのABI hexエンコードフォームで提供することができます。

