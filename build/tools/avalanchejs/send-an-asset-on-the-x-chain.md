# X-Chainでアセットを送信する

この例では、X-Chain のアセットを 1 つの受信者に送信します。このプロセスの最初のステップは、Avalanche Platformの選択肢に接続したAvalancheのインスタンスを作成することです。

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

また、キーストアには、このトランザクションで使用されるアドレスの一覧が含まれていると仮定しています。

## UTXOセットの取得<a id="getting-the-utxo-set"></a>

X-Chain は、利用可能なすべての残高を、Unspeed Transaction Outputs \(UTXOs\) と呼ばれるデータストアに格納します。UTXO Set はトランザクションによって生成される出力の一意のリストであり、それらの出力を費やすことができるアドレス、および他の変数(出力が使えるタイムスタンプ) およびしきい値 \(出力に必要なシグナー数) などの変数です。

この例では、利用可能なコインの量を費やし、制限なしに1つのアドレスに送信するシンプルなトランザクションを作成します。UTXOの管理はほとんど抽象化されます。

ただし、管理しているアドレスに対してUTXO Setを取得する必要があります。

```text
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## UTXOの費用<a id="spending-the-utxos"></a>

`buildBaseTx()` ヘルパー関数は、単一のアセットタイプを送信します。私たちは、受信者アドレスに送りたいコインを特定のassetIDを持っています。これは、400コインを有すると信じています。JavaScriptが取引で利用可能な資金を持っていることを確認しましょう。

```text
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

400コインがいます!これで、100コインを友達の住所に送ります。

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

そしてトランザクションが送信されます！

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-<a id="get-the-status-of-the-transaction"></a>

トランザクションをネットワークに送信したので、トランザクションが通過したかどうかを判断するのに数秒かかります。X-Chainを通じてTxIDを使用してトランザクションの更新ステータスを取得できます。

```text
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

ステータスは "Accepted", "Processing", "Unknown", "Rejected" のいずれかです:

* "Accepted" はトランザクションがネットワークによって有効であると認められ、実行されたことを示します。
* "Processing"はトランザクションが投票されていることを示します。
* "Unknown" は、ノードがトランザクションについて何も知らないことを示し、ノードがそれを持っていないことを示します。
* "Rejected" は、トランザクションのノードがトランザクションを知っていることを示しますが、受け入れられたトランザクションと矛盾します。

## 結果を確認する<a id="check-the-results"></a>

トランザクションは最終的に「Accepted」として戻ってきました。これでは、UTXOSetを更新して、トランザクション残高が予想通りであることを確認しましょう。

_注: 実際のネットワークでは、バランスがこのシナリオに一致するものではありません。取引手数料や追加の費用は残高が異なる場合があります。この例では、これらのケースではいずれも想定しています。_

```text
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

