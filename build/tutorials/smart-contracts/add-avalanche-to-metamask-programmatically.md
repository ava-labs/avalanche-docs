# Avalancheをプログラムで追加する

Metamaskに新しいネットワークの追加は、技術的に精味がない人々の些細なタスクではなく、エラーが発生しやすい場合もあります。ユーザーのオンボードがより簡単にできるようにするため、そのプロセスをできるだけシンプルにするのに役立ちます。このチュートリアルでは、AvalancheネットワークをMetaMaskに追加するプロセスを自動化する、フロントエンドアプリケーションでシンプルなボタンを構築する方法を説明します。

## EIP-3038とMetaMask

[EIP-3038](https://eips.ethereum.org/EIPS/eip-3085)は、イーサリアムと互換性のあるチェーンをウォレットアプリケーションに追加するためのRPCメソッドを定義するイーサリアムの[改善](https://eips.ethereum.org/)プロポーザルです。

2021年3月以来、Metamaskは、MetamaskカスタムネットワークAPIの一部としてEIPを実装してきました[。](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/)

まず、それがどのように機能するかを見てみましょう。

## データ構造

AvalancheネットワークをMetamaskに追加するには、すべての必要なデータを含むデータ構造を準備する必要があります。

メインネットワークデータ：

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

テストネットワークデータ：

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

## ネットワークの追加

MetaMaskにネットワークを追加するには、web3プロバイダにより公開される`wallet_addEthereumChain`メソッドを呼び出す必要があります。

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

`injected`MetaMask APIとインターフェースする際に`web3-react/injected-connector`使用される初期化されます。他の人気ウェブフレームワークのための使用は類似しています。テストネットワークを追加したい`AVALANCHE_TESTNET_PARAMS`場合は、置き換え`AVALANCHE_MAINNET_PARAMS`ましょう。

典型的な使用パターンは、MetaMaskへの接続を確立しようとする際に`Error connecting`エラーが発生した場合`Wrong Network`、そのメソッドを呼び出すボタンを公開するでしょう。

## ユーザー体験

ユーザーがあなたのdappのウェブサイトに最初に訪れたとき、MetaMaskとの接続を承認する必要があります。その後、ウェブ3ネットワーク接続に成功したと検出できない場合、新しいネットワークに切り替えることを求めるダイアログが表示されます。

![間違ったネットワーク](../../../.gitbook/assets/add-avalanche-to-metamask-01-wrong-network.png)

ボタンを押すと、MetaMaskから新しいネットワークを追加する承認を求めるダイアログが表示されます。

![ネットワークを追加する](../../../.gitbook/assets/add-avalanche-to-metamask-02-add-network.png)

承認が完了すると、Avalancheネットワークに接続されます。非常に簡単で、任意のデータ入力も必要ありません、間違ったデータ入力が発生する可能性はありません。そして、それであなたのダップとやり取りできます！

## 結論

Dappsユーザーは、技術的に洗練されたものではなく、オンボードすることは、できるだけシームレスかつ簡単でなければなりません。MetaMaskに新しいネットワークを追加するのは、あなたの潜在的なユーザーの特定のパーセントよりも、ハードルです。その要求を削除するのは簡単なステップであり、彼らの体験を向上し、より多くのユーザーが実際にあなたのダップを使用できるようにすることができます。

改善方法についてご質問、問題、アイデアがある場合、あるいは単に我々の開発者コミュニティに参加したい場合、[Discord](https://chat.avalabs.org/)サーバー上でご連絡ください。

