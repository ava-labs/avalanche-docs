# Cryptographic Primitives - 暗号プリミティブ

[Avalanche](../../#avalanche)はさまざまな機能にさまざまな暗号プリミティブを使用しています。このファイルは、ネットワークおよびブロックチェーンレイヤーで使用される暗号化の種類と種類をまとめています。

## ネットワークレイヤーの暗号化

AvalancheはTransport Layer Security(TLS)を使用して、ノード間通信を盗聴者から保護します。TLSは、公開鍵暗号の実用性と対称鍵暗号の効率性を組み合わせたものです。これによりTLSがインターネット通信の標準化に繋がりました。ほとんどの古典的なコンセンサスプロトコルでは、第三者へのメッセージの受信を証明するために公開鍵暗号を採用しているのに対し、新しいSnow\*コンセンサスファミリーではそのような証明を必要としない。これによりAvalancheはステーカーの認証にTLSを採用し、ネットワークメッセージに署名するための高価な公開鍵暗号化の必要性をなくします。

### TLS 証明書

Avalanche は一元化されたサードパーティに依存せず、特に、サードパーティ認証子によって発行された証明書を使用しません。エンドポイントを識別するためにネットワーク層内で使用されるすべての証明書は、自己署名され、それゆえ、自己主権の ID レイヤーを作成します。第三者には関与していません。

### TLS アドレス

TLS 証明書を Platform チェーンに投稿しないようにするには、証明書は最初にハッシュされます。Avalancheは、Bitcoinで使用されているTLS証明書のハッシュ化メカニズムを採用しています。つまり、証明書のDER表現はsha256でハッシュされ、結果はripemd160でハッシュされ、ステーカーの20バイト識別子が得られます。

この20バイト識別子は、"NodeID-" で表現さ[れ](https://support.avalabs.org/en/articles/4587395-what-is-cb58)ます。

## Avalanche仮想マシンにおける暗号化

Avalanche仮想マシンは、ブロックチェーン上の署名のために、楕円曲線暗号技術、特に`secp256k1`を使用しています。

この32バイト識別子は、"PrivateKey-" で表現されます。その後にデータの[CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58)エンコードされた文字列が続きます。

### Secp256k1 アドレス

Avalancheはスキームにアドレスを指定するのではなく、各ブロックチェーンにアドレスを指定する方法を選ぶことができます。

X-ChainとP-Chainのアドレス指定スキームはsecp256k1に依存しています。AvalancheはBitcoinと同様のアプローチに従い、ECDSA公開鍵をハッシュします。公開鍵の33バイト圧縮表現は、sha256で一**度**ハッシュされます。結果は、20バイトアドレスを取得するためにripemd160でハッシュされます。

Avalanche はコンベンション `chainID-address` を使用して、どのチェーンに存在するかを指定します。`chainID` はチェーンのエイリアスに置き換えることができます。CB58条約は外部アプリケーションを通じて情報を伝達する場合に必要です。

### Bech32-JP

X-ChainおよびP-Chain上のアドレスは、[BIP 0173](https://en.bitcoin.it/wiki/BIP_0173)で概説されている[Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32)規格を使用します。Bech32アドレススキームには4つの部分があります。出現の順序で:

* HOME-READ-COMPANY-JP-JP-JMainnet では `avax` です。
* HRP をアドレスとエラー補正コードから区切る番号`1`。
* Base-32 エンコードされた文字列は、20バイトアドレスを表します。
* 6文字のbase-32エンコードされたエラー訂正コードです。

さらに、Avalancheアドレスは、その上にあるチェーンのエイリアスに接頭辞を付けて、その後ダッシュが続きます。例えば、X-Chain アドレスは`X-`で接頭辞を付けています。

次の正規表現は、mainnet、fuji、localnetのX-Chain、P-Chain、C-Chainのアドレスにマッチします。Avalanche のすべての有効な Avalanche アドレスはこの正規表現に一致しますが、Avalanche アドレスでない文字列はこの正規表現に一致するかもしれません。

```text
^([XPC]|[a-km-zA-HJ-NP-Z1-9]{36,72})-[a-zA-Z]{1,83}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$
```

Avalancheの[アドレス指定スキーム](https://support.avalabs.org/en/articles/4596397-what-is-an-address)についてもっと読む。

### Secp256k1 回復可能な署名

回復可能な署名は65バイト**`[R || S || V]`****``**として保存され、公開鍵の迅速な回復可能性を可能にします。**`S`**は、署名の可鍛性を防ぐために可能な範囲の下半分になければなりません。メッセージに署名する前に、メッセージは sha256 を使用してハッシュされます。

### Secp256k1 例

RickとMortyが安全な通信チャネルを設定しているとします。Mortyは新しい公開鍵のペアを作成します。

プライベートキー: `0x98cb077f972feb0481f1d894f272c6a1e3c15e272a1658ff716444f465200070`

Public Key \(33-byte compressed\): `0x02b33c917f2f6103448d7feb42614037d05928433cb25e78f01a825aa829bb3c27`

リックの無限の知恵のため、彼はモーティの公開鍵を携帯すること自体を信頼していないので、彼はモーティの住所を尋ねるだけです。MortyはSHA256の公開鍵であり、その結果ripemd160のアドレスを生成します。

SHA256\(Public Key\): `0x28d7670d71667e93ff586f664937f52828e6290068fa2a37782045bffa7b0d2f`

住所: `0xe8777f38c88ca153a6fdc25942176d2bf5491b89`

Mortyは、公開鍵が公共の知識であるために安全であるべきであるため、かなり混乱しています。Rick は、公開鍵をハッシュすると、秘密鍵の所有者を楕円曲線暗号化における潜在的な将来のセキュリティ上の欠陥から保護することを説明します。暗号化が壊れ、秘密鍵が公開鍵から生成される場合、ユーザーはトランザクションに署名したことがないアドレスに資金を転送することができ、その資金が攻撃者によって侵害されるのを防ぎます。これにより、コイン所有者は、クライアント全体で暗号化がアップグレードされる間、保護されます。

その後、モーティーがリックのバックストーリーを知り、モーティーはリックにメッセージを送ろうとする。モーティはリックがメッセージを読むことを知っているので、彼がメッセージを秘密鍵で署名する。

メッセージ：`0x68656c702049276d207472617070656420696e206120636f6d7075746572`

メッセージハッシュ: `0x912800c29d554fb9cdce579c0abba991165bbbc8bfec9622481d01e0b3e4b7da`

メッセージ署名：`0xb52aa0535c5c48268d843bd65395623d2462016325a86f09420c81f142578e121d11bd368b88ca6de4179a007e6abe0e8d0be1a6a4485def8f9e02957d3d72da01`

モーティーは二度と会ったことがない。

## 署名されたメッセージ

Bitcoin Script 形式および Ethereum 形式に基づいた相互運用可能なジェネリック署名メッセージの標準です。

```text
sign(sha256(length(prefix) + prefix + length(message) + message))
```

プレフィックスは単純に文字列 `\x1AAvalanche Signed Message:\n` です。ここで `0x1A` はプレフィックステキストの長さであり、`length(message)`はメッセージサイズの[整数](serialization-primitives.md#integer)です。

### Gantt Pre-image Specifications

```text
+---------------+-----------+------------------------------+
| prefix        : [26]byte  |                     26 bytes |
+---------------+-----------+------------------------------+
| messageLength : int       |                      4 bytes |
+---------------+-----------+------------------------------+
| message       : []byte    |          size(message) bytes |
+---------------+-----------+------------------------------+
                            |       26 + 4 + size(message) |
                            +------------------------------+
```

### JPE-JP-JP

例として、「星々にコンセンサスを通して」というメッセージに署名します。

```text
// prefix size: 26 bytes
0x1a
// prefix: Avalanche Signed Message:\n
0x41 0x76 0x61 0x6c 0x61 0x6e 0x63 0x68 0x65 0x20 0x53 0x69 0x67 0x6e 0x65 0x64 0x20 0x4d 0x65 0x73 0x73 0x61 0x67 0x65 0x3a 0x0a
// msg size: 30 bytes
0x00 0x00 0x00 0x1e
// msg: Through consensus to the stars
54 68 72 6f 75 67 68 20 63 6f 6e 73 65 6e 73 75 73 20 74 6f 20 74 68 65 20 73 74 61 72 73
```

`sha256` でハッシュし、プリイメージに署名した後、[cb58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) エンコードされた値を返します。`4Eb2zAHF4JJZFJjmp4usSokTGqq9mEGwVMY2WZzCmu657SNFZhndsiS8TvL32n3bexd8emUwiXs8XqKjjhqzvoRFvghnvSN`.[Avalanche Web Wallet](https://wallet.avax.network/wallet/advanced)を使用した例を示します。

![メッセージメッセージ](../../.gitbook/assets/sign-message.png)

## Ethereum Virtual Machineの暗号化

AvalancheノードはEthereum Virtual Machine \(EVM\)をサポートし、Ethereumで使用されるすべての暗号化構造を正確に複製します。これには、Keccakハッシュ関数やEVMで暗号化セキュリティに使用される他のメカニズムが含まれています。

## 他の仮想マシンにおける暗号化

Avalancheは拡張可能なプラットフォームであるため、私たちは時間の経過とともに、システムに追加の暗号プリミティブを追加することを期待しています。

