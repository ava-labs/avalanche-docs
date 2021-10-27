# AvalancheをMetaMaskにプログラムで追加する

Metamaskに新しいネットワークを追加するのは、技術に精通していない人にとっては簡単な作業ではなく、エラーが起こりやすくなります。ユーザーをアプリケーションに簡単に迎え入れるために、プロセスをできるだけシンプルにすることが役立ちますこのチュートリアルでは、AvalancheネットワークをMetaMaskに追加するプロセスを自動化するフロントエンドアプリケーションにシンプルなボタンを作成する方法を説明します。

## EIP-3038とMetaMask

[EIP-3038](https://eips.ethereum.org/EIPS/eip-3085)は、Ethereumと互換性のあるチェーンをウォレットアプリケーションに追加するために、RPCメソッドを定義する[Ethereum Improvement Proposal（Ethereum改善提案）](https://eips.ethereum.org/)です。

2021年3月以降、Metamaskは、そのEIPをMetamask [Custom Networks API](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/)の一部として実装しています。

ではどのように機能するか見てみましょう。

## データ構造

MetamaskにAvalancheネットワークを追加するには、必要なデータすべてを含むデータ構造を準備する必要があります。

主要ネットワークデータ

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

テストネットワークデータ

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

ネットワークをMetaMaskに追加するには、web3プロバイダが公開する`wallet_addEthereumChain`メソッドを呼び出す必要があります。

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

ここで、`injected`は、MetaMask APIとのインターフェースとして使用するための`web3-react/injected-connector`として初期化されます。他の人気のあるウェブフレームワークの使用も同様です。テストネットワークを追加したい場合は、`AVALANCHE_MAINNET_PARAMS`を`AVALANCHE_TESTNET_PARAMS`に置き換えます。

典型的な使用パターンは、MetaMaskに接続を開始しようとするときに`Wrong Network`あるいは`Error connecting`エラーが出た場合に、そのメソッドを呼び出すボタンを公開することです。

## ユーザーエクスペリエンス

ユーザーが初めてあなたの自律分散型アプリケーションウェブサイトを訪問した際には、MetaMaskへの接続の承認をしてもらう必要があります。ユーザーが承認した後でも、web3ネットワーク接続が感知できない場合、新しいネットワークに切り替える確認を行ってもらうようユーザーに依頼する会話をユーザーに提示することができます。

![間違ったネットワーク](../../../.gitbook/assets/add-avalanche-to-metamask-01-wrong-network.png)

ユーザーがボタンを押し、新しいネットワークを追加する承認を求めるMetaMaskからの会話がユーザーに表示されます。

![ネットワークを追加する](../../../.gitbook/assets/add-avalanche-to-metamask-02-add-network.png)

ユーザーが承認すると、あなたのアプリケーションはAvalancheネットワークに接続されます。とても簡単で、一切データエントリーの必要がなく、間違ったデータエントリーを入力することもありません。これで完了です。ユーザーはあなたの自律分散型アプリケーションとやり取りする準備ができました。

## 結論

分散型アプリのユーザーは常に技術的に洗練されているわけではありません。そのためユーザーに使用してもらうには、可能な限りシームレスかつ簡単である必要があります。手動で新しいネットワークをMetaMaskに追加するのは、あなたの見込みユーザーのうち一定割合の人たちにはクリアできないハードルとなるでしょう。この要件を取り除くことにより、ユーザーエクスペリエンスが向上し、より多くのユーザーがあなたの分散型アプリを実際に使ってくれるようになるでしょう。

質問、問題、あるいは改善方法についてのアイデアをお持ちの場合、また、単に私たちの開発者コミュニティに参加を希望される場合は、私たちの[Discord](https://chat.avalabs.org/)サーバー上でご連絡いただけます。

