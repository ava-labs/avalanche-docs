# インデックスAPI

AvalancheGo はインデックスで実行するように設定できます。つまり、X-Chain、P-Chain、C-Chainで受け入れるすべてのコンテナ \(inexes\)を保存します。AvalancheGo をインデックス化を有効にして実行するには、`--index-enabled` コマンドラインフラグを使用します。AvalancheGoは`--index-enable-enabled`で実行したときに受け入れられるインデックスコンテナのみです。ノードに完全なインデックスを保持するには、`--index-enabled`-enabled-node を実行します。ノードは、ブートストラップ時にネットワーク履歴内のすべてのブロック、頂点、トランザクションを受けることにより、インデックスが完了するようにします。インデックス化が有効になっている場合、ノードをオフにしてもOKです。インデックス化がまだ有効になっている場合、オフラインで受け入れられたすべてのコンテナが受け入れられます。インデックスサーは決して受け入れられたブロック、頂点、またはトランザクションをインデックスに失敗してはなりません。

インデックス化されたコンテナ \(つまり、受け入れられたブロック、頂点、およびトランザクション\)は、ノードがそのコンテナを受け入れた時間にタイムスタンプされます。コンテナがブートストラップ中にインデックス化された場合、他のノードはもっと早い段階でコンテナを受け入れていた可能性があることに注意してください。起動時にインデックスされたすべてのコンテナは、ネットワークで最初に受け入れられたときではなく、ノードが起動した時刻にタイムスタンプされます。

DAGs \(X-Chain\を含む) では、ノードは、頂点とトランザクションを互いに異なる順序で受け入れられることに注意してください。

このドキュメントでは、AvalancheGo's Index API からデータをクエリする方法を説明します。Index API は `--index-enabled` で実行する場合にのみ使用できます。

## JP-JP-

`JSON 2.0` RPC 形式を使用しています。JSON RPC 呼び出しの詳細については、[こちら](issuing-api-calls.md)を参照してください。

## Endpoints-JP-JP-J

各チェーンには1つ以上のインデックスがあります。C-Chain ブロックが受け入れられているかどうかを確認するには、C-Chain ブロック インデックスに API 呼び出しを送信します。X-Chain ブロックが受け付けられているかどうかを確認するには、例えば、X-Chain ブロック インデックスに API 呼び出しを送信します。

### X-Chainトランザクション

```text
/ext/index/X/tx
```

### X-Chain Vertices

```text
/ext/index/X/vtx
```

### P-Chainブロック

```text
/ext/index/P/block
```

### C-Chainブロック

```text
/ext/index/C/block
```

## API メソッド

### index.getLastAccepted

最も最近受け入れられたコンテナを取得します。

#### **JPS-JP-JP**

```cpp
info.getLastAccepted({
  encoding:string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

--

* `id` はコンテナの ID です。
* `bytes` はコンテナのバイト表現です。
* `timestamp` は、このノードがコンテナを受諾した時刻です。
* `index` は、このインデックスで何個のコンテナが受け入れられましたか？
* `"cb``58"` または `"hex"`

#### **Call 例**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **レスポンス例**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerByIndex

コンテナをインデックスで取得します。受け入れられた最初のコンテナはインデックス0、2つ目はインデックス1などです。

#### **JPS-JP-JP**

```cpp
info.getContainerByIndex({
  index: uint64,
  encoding: string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` はコンテナの ID です。
* `bytes` はコンテナのバイト表現です。
* `timestamp` は、このノードがコンテナを受諾した時刻です。
* `index` は、このインデックスで何個のコンテナが受け入れられましたか？
* `"cb``58"` または `"hex"`

#### **Call 例**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByIndex",
    "params": {
        "index":0,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **レスポンス例**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerRange-JP

`\[startIndex`, `startIndex+1`, ... , `startIndex` + `numToFetch` - 1\] 内のインデックスを持つコンテナを返します。 `numToFetch` は `[0,1024]` でなければなりません。

#### **JPS-JP-JP**

```cpp
info.getContainerRange({
  startIndex: uint64,
  numToFetch: uint64,
  encoding: string
}) -> []{
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` はコンテナの ID です。
* `bytes` はコンテナのバイト表現です。
* `timestamp` は、このノードがコンテナを受諾した時刻です。
* `index` は、このインデックスで何個のコンテナが受け入れられましたか？
* `"cb``58"` または `"hex"`

#### **Call 例**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerRange",
    "params": {
        "startIndex":0,
        "numToFetch":100,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **レスポンス例**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :[{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }]
}
```

### index.getIndex

コンテナのインデックスを取得します。

#### **JPS-JP-JP**

```cpp
info.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

ここで`、エンコーディング`は `"cb58"` または `"hex"` です。

#### **Call 例**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getIndex",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **レスポンス例**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "index":"0"
    },
  "id":1
}
```

### index.isAccepted

コンテナがこのインデックスにある場合に true を返します。

#### **JPS-JP-JP**

```cpp
info.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **Call 例**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.isAccepted",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **レスポンス例**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "isAccepted": true
    },
  "id":1
}
```

