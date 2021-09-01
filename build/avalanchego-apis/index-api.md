# インデックスAPI

AvalancheGoは、インデックスで実行するように構成することができます。つまり、X-Chain、P-Chain、C-Chain上で受け取るすべてのコンテナ（ブロック、バーテックスあるいはトランザクション）を保存（インデックス）します。インデックスを有効にした状態でAvalancheGoを実行するには、コマンドラインフラグを使用します`--index-enabled`。AvalancheGoは、で実行する際に受け付けられたコンテナのみをインデックスします`--index-enabled`。ノードが完全なインデックスを持つようにするには、新しいデータベースでノードを実行し、`--index-enabled`。ブートストラップ中にネットワーク履歴内のすべてのブロック、頂点、トランザクションを受け付け、インデックスが完了するようにします。インデックスが有効になっている場合、ノードをオフにすることは大丈夫です。インデックスで再度有効にされた場合、オフラインである中に受け入れられたすべてのコンテナを受け入れます。インデックスは、受け入れられたブロック、頂点あるいはトランザクションを指すことに失敗してはいけません。

インデックスされたコンテナ（つまり、受け入れられたブロック、バーティ、トランザクション）は、ノードがそのコンテナを受け付ける時間とともにタイムスタンプされます。ブートストラップ中にインデックスが行われた場合、他のノードははるかに早くコンテナを受理した可能性があることに留意してください。ブートストラップ中にインデックスされたコンテナは、ノードがブートストラップした時点でタイムスタンプされます。

（X-Chainを含む）DAGsのために、ノードは、頂点や取引を互い違いから受け付けることができます。

このドキュメントでは、AvalancheGoのインデックスAPIからデータをクエリする方法を示します。インデックスAPIは、以前の . で実行する場合にのみ利用できます`--index-enabled`。

## フォーマット

このAPIは、`json 2.0`RPC形式を使用します。JSON RPC呼び出し方法の詳細については、ここを参照[してください。](issuing-api-calls.md)

## エンドポイント

各チェーンには1つ以上のインデックスがあります。C-Chainブロックが承認されているかどうか確認するには、C-ChainブロックインデックスにAPIコールを送信します。X-Chainブロックが承認されているかどうか確認するには、例えば、X-ChainブロックインデックスにAPIコールを送信します。

### X-Chainトランザクション

```text
/ext/index/X/tx
```

### X-Chainバーティス

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

## APIメソッド

### index.getLastAccepted

最新で受け入れられたコンテナを入手します。

#### **シグネチャ**

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

ここで：

* `id`コンテナのID
* `bytes`は、コンテナのバイト表現
* `timestamp`は、このノードがコンテナを受け入れた時刻
* `index`このインデックスで受け入れられた数量
* `encoding`is `"cb58"`または`"hex"`

#### **コール例**

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

#### **例**

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

インデックスでコンテナを取得します。受け入れられた最初のコンテナは、インデックス0で、2つ目は、インデックス1などで受け入れます。

#### **シグネチャ**

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

* `id`コンテナのID
* `bytes`は、コンテナのバイト表現
* `timestamp`は、このノードがコンテナを受け入れた時刻
* `index`このインデックスで受け入れられた数量
* `encoding`is `"cb58"`または`"hex"`

#### **コール例**

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

#### **例**

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

### index.getContainerRange

`startIndex+1``numToFetch`[`startIndex`, ... , `startIndex`\+-1]でインデックスを持つコンテナを返します`numToFetch`。`[0,1024]`

#### **シグネチャ**

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

* `id`コンテナのID
* `bytes`は、コンテナのバイト表現
* `timestamp`は、このノードがコンテナを受け入れた時刻
* `index`このインデックスで受け入れられた数量
* `encoding`is `"cb58"`または`"hex"`

#### **コール例**

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

#### **例**

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

#### **シグネチャ**

```cpp
info.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

`encoding`ここで、`"cb58"`あるいは。`"hex"`

#### **コール例**

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

#### **例**

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

### index.is

コンテナがこのインデックスに含まれている場合、trueを返します。

#### **シグネチャ**

```cpp
info.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **コール例**

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

#### **例**

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

