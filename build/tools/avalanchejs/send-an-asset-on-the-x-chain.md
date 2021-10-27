# X-Chain上で資産を送信する

この例は、X-Chain内の資産を、単一の受信者に送信します。このプロセスの最初のステップは、選択したAvalancheプラットフォームエンドポイントに接続されたAvalancheJSのインスタンスを作成することです。

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let myNetworkID = 1; //default is 3, we want to override that for our local network
let myBlockchainID = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM"; // The X-Chain blockchainID on this network
let avax = new avalanche.Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = avax.XChain(); //returns a reference to the X-Chain used by AvalancheJS
```

キーストアが、このトランザクションで使用するアドレスのリストを含んでいることも想定しています。

## UTXOセットを取得<a id="getting-the-utxo-set"></a>

X-Chainは、使用可能なすべての残高を、Unsended Transaction Outputs（UTXO）と呼ばれるデータストアに保存します。UTXOセットは、トランザクション、それらの出力を費やすことができるアドレス、およびロックアウト時間（出力を費やすことができるタイムスタンプ）などのその他の変数、および閾値（出力を費やすために必要な署名者人数）です。

この例の場合、利用可能なコイン量を費やし、一切制限なく単一のアドレスに送信するシンプルなトランザクションを作成します。UTXOの管理は、ほとんどが抽象化されます。

ただし、管理しているアドレスのためのUTXOセットを取得する必要があります。

```text
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## UTXOを消費する<a id="spending-the-utxos"></a>

`buildBaseTx()`ヘルパー機能は、単一の資産タイプを送信します。どのコインを受信者アドレスに送信したいかという特定の資産IDがあります。これは、400コインを持っていると思われる、この例のためイメージした資産です。トランザクションに利用可能なファンドがあることを確認しましょう。

```text
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

400コインがあります。このうちの100コインを友人のアドレスに送信します。

```text
let sendAmount = new BN(100); //amounts are in BN format
let friendsAddress = "X-avax1k26jvfdzyukms95puxcceyzsa3lzwf5ftt0fjk"; // address format is Bech32

//The below returns a UnsignedTx
//Parameters sent are (in order of appearance):
//   * The UTXO Set
//   * The amount being sent as a BN
//   * An array of addresses to send the funds
//   * An array of addresses sending the funds
//   * An array of addresses any leftover funds are sent
//   * The AssetID of the funds being sent
let unsignedTx = await xchain.buildBaseTx(utxos, sendAmount, [friendsAddress], addressStrings, addressStrings, assetid);
let signedTx = unsignedTx.sign(myKeychain)
let txid = await xchain.issueTx(signedTx);
```

そして、トランザクションが送信されます。

## トランザクションのステータスを取得する<a id="get-the-status-of-the-transaction"></a>

トランザクションをネットワークに送信しました。トランザクションが完了したかどうかを判断するのに数秒かかります。X-Chainを介し、TxIDを使用してトランザクション上の更新ステータスを取得することができます。

```text
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

ステータスは、「承認」、「処理中」、「不明」、「拒否」のいずれかです。

* 「承認」は、トランザクションがネットワークで有効として受け入れられ、実行されていることを示します。
* 「処理中」は、トランザクションが処理中であることを示します。
* 「不明」は、ノードがトランザクションについて何も知らず、ノードが持っていないことを示します。
* 「拒否」は、トランザクションを知っていることを示しますが、承認トランザクションとは反対です。

## 結果を確認する<a id="check-the-results"></a>

トランザクションは、「承認」として返ってきました。では、UTXOセットを更新し、トランザクション残高が予想通りであることを確認しましょう。

_注意：実際のネットワークでは、このシナリオに一致する残高は保証されません。トランザクション手数料または追加費用により、残高が異なる場合があります。この例の目的では、これらのケースはいずれも想定していません。_

```text
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

