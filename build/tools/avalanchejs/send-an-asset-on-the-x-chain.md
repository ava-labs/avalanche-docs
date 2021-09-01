# X-Chain上でアセットを送信する

この例では、X-Chain内のアセットが、1人の受信者に送信されます。このプロセスにおける最初のステップは、Avalancheプラットフォームエンドポイントに接続されたAvalancheのインスタンスを作成することです。

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

鍵ストアに、このトランザクションで使用されるアドレスのリストが含まれているとも想定しています。

## UTXOセット<a id="getting-the-utxo-set"></a>

X-Chainは、Unsended Transaction Outputs（UTXO）と呼ばれるデータストアに、利用可能な残高をすべて保存します。UTXOセット、それらの出力を費やしやすいアドレス、（出力が消費できるタイムスタンプ）、（出力が消費できるまでのタイムスタンプといったその他の変数で、UTXOセットは、トランザクションによって生成される出力の一意のリストです。

この例の場合、利用可能なコイン数を浪費し、一切の制限なしで1つのアドレスに送信するシンプルなトランザクションを作成するようになります。UTXOの管理は、主に抽象化されるようになります。

しかし、我々が管理するアドレスをUTXOセットを取得する必要があります。

```text
let myAddresses = xchain.keyChain().getAddresses(); //returns an array of addresses the KeyChain manages
let addressStrings = xchain.keyChain().getAddressStrings(); //returns an array of addresses the KeyChain manages as strings
let utxos = (await xchain.getUTXOs(myAddresses)).utxos;
```

## UTXOを費やする<a id="spending-the-utxos"></a>

`buildBaseTx()`ヘルパ関数により、単一のアセットタイプが送信されます。我々は、そのコインが、受信者アドレスに送信する特別なアセットIDを持っています。これは、400コインを保持すると我々が信じているこの例の虚偽アセットです。トランザクションで利用可能な資金があることを確認しましょう。

```text
let assetid = "23wKfz3viWLmjWo2UZ7xWegjvnZFenGAVkouwQCeB9ubPXodG6"; //avaSerialized string
let mybalance = utxos.getBalance(myAddresses, assetid); //returns 400 as a BN
```

400コインが揃います！今で100コインを、友人のアドレス宛に送付するようになります。

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

そして、トランザクションが送信されます！

## トランザクションのステータスを取得する<a id="get-the-status-of-the-transaction"></a>

トランザクションをネットワークに送信したことにより、トランザクションが完了したかどうか判断まで数秒でかかります。X-Chainを通じてTxIDを使用して、トランザクション上のステータスが更新されます。

```text
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
let status = await xchain.getTxStatus(txid);
```

ステータスは、「受け入れ」、「処理」、「未知」、「拒否」のいずれかでできます。

* 「承認」は、トランザクションがネットワークにより有効と受け付けられ、実行されていることを示します。
* 「処理」は、トランザクションが投票されていることを示します。
* 「未知」は、ノードがトランザクションについて何も知らないことを示し、ノードが持つことがないことを示します。
* 「拒否」は、トランザクションを知っているノードが示しますが、受け入れられたトランザクションと競合します。

## 結果を確認する<a id="check-the-results"></a>

トランザクションは、ようやく「承認」として戻り、UTXOSetを更新し、トランザクションバランスが我々が期待したものであることを確認しましょう。

_注意：実際のネットワークでは、バランスが保証されることはありません。トランザクション手数料や追加費用がバランスによって変わる可能性があります。この例の目的のために、我々はこれらのケースでないものとみなします。_

```text
let updatedUTXOs = await xchain.getUTXOs();
let newBalance = updatedUTXOs.getBalance(myAddresses, assetid);
if(newBalance.toNumber() != mybalance.sub(sendAmount).toNumber()){
    throw Error("heyyy these should equal!");
}
```

