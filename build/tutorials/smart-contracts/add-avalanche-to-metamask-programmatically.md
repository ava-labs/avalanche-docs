# MetaMaskにAvalancheをプログラム的に追加

Metamaskに新しいネットワークを追加することは、技術的に精通していない人にとっては些細なタスクではなく、エラーが発生しやすいことです。ユーザーのオンボーディングを簡単にするために、そのプロセスをできるだけ簡素化するのに便利です。このチュートリアルでは、MetaMaskにAvalancheネットワークを追加するプロセスを自動化する、フロントエンドアプリケーションでシンプルなボタンを構築する方法を説明します。

## EIP-3038 & MetaMask

[EIP-3038](https://eips.ethereum.org/EIPS/eip-3085)は、ウォレットアプリケーションにEthereum互換チェーンを追加するためのRPCメソッドを定義する[Ethereum Improvement Proposal](https://eips.ethereum.org/)です。

2021年3月からMetamaskはEIPをMetamask[カスタムネットワークAPI](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/)の一環として実装しています。

JavaScript-JP-JP-

## データ構造

AvalancheネットワークをMetamaskに追加するには、必要なすべてのデータを含むデータ構造を準備する必要があります。

主要なネットワーク データ:

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

ネットワークデータをテストします:

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

## Networks-JP-JP

MetaMaskにネットワークを追加するには、`wallet_addEthereumChain`メソッドを呼び出す必要があります。

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

JavaScriptを`有効`にするには`、`JavaScriptを有効にします。他の一般的なWebフレームワークでの使用法は似ています。テストネットワークを追加する場合は、`AVALANCHE_MAINNET_PARAMS`を`AVALANCHE_TESTNET_PARAMS`に置き換えます。

典型的な使用パターンは、MetaMaskへの接続を試みる際に、`Wrong Network`や`Error`がエラーを接続した場合、そのメソッドを呼び出すボタンを公開することです。

## ユーザー体験

ユーザーがDappのWebサイトに最初にアクセスしたとき、MetaMaskへの接続を承認する必要があります。それらがそれらを処理した後、Web3 ネットワーク接続が成功したことを検出しない場合は、新しいネットワークへの切り替えを確認するように求めるダイアログを表示できます。

![間違ったネットワーク](../../../.gitbook/assets/add-avalanche-to-metamask-01-wrong-network.png)

ボタンを押すと、MetaMaskから新しいネットワークを追加する承認を求めるダイアログが表示されます。

![ネットワークを追加する](../../../.gitbook/assets/add-avalanche-to-metamask-02-add-network.png)

承認すると、Avalancheネットワークに接続されます。非常に簡単に、任意のデータ入力の必要性、間違ったデータ入力の可能性はありません。それで、ユーザーはあなたのdappと相互作用する準備ができています!

## JP-JP-

Dappsユーザーは技術的にあまり洗練されていないことが多く、オンボーディングはできるだけシームレスで簡単に済む必要があります。MetaMaskに新しいネットワークを手動で追加することは、潜在的なユーザーの特定のパーセンテージよりもハードルです。この要件を削除することは、ユーザーの経験を向上させ、より多くのユーザーが実際にDappを使用できるようにする簡単なステップです。

改善方法についてご質問、問題、あるいはアイデアがあれば、[Discord](https://chat.avalabs.org/)サーバーからご連絡ください。

