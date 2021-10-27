# インデックスAPI

AvalancheGoは、インデクサーと一緒に実行するように設定できます。つまり、X-Chain、P-Chain、C-Chainで受け入れたすべてのコンテナ（ブロック、頂点、またはトランザクション）を保存（インデックス化）します。インデックスを有効にしてAvalancheGoを実行するには、コマンドラインフラグ`--index-enabled`を使用します。AvalancheGoは`--index-enabled`で実行したときに受け入れたコンテナのみをインデックス化します。ノードが完全なインデックスを持っていることを確認するには、新しいデータベースと`--index-enabled`でノードを実行します。ノードはブートストラップ中にネットワーク履歴のすべてのブロック、頂点、トランザクションを受け入れ、インデックスが完全になるようにします。インデックス機能が有効な状態で、ノードの電源を切っても問題ありません。インデックスを有効にしたまま再起動すると、オフラインの間に受け入れたすべてのコンテナが受け入れます。インデクサーは、受け入れたブロック、頂点、トランザクションのインデックス作成に失敗してはいけません。

インデックスされたコンテナ（つまり、受け入れられたブロック、頂点、トランザクション）には、ノードがそのコンテナを受け入れた時間がタイムスタンプされます。ブートストラップ中にコンテナがインデックス化された場合、他のノードがそのコンテナをより前に受け入れている可能性があることに注意してください。ブートストラップ中にインデックスされたすべてのコンテナには、ネットワークに最初に受け入れられた時間ではなく、ノードがブートストラップした時間がタイムスタンプされます。

なお、DAG（X-Chainを含みます）では、ノードが頂点やトランザクションを互いに異なる順序で受け入れることがあります。

このドキュメントは、AvalancheGoのインデックスAPIからデータをクエリする方法を示しています。インデックスAPIは、`--index-enabled`で実行している場合のみ利用できます。

## フォーマット

このAPIは`json 2.0`RPCフォーマットを使用しています。JSONのRPC呼び出しの詳細については、[こちら](issuing-api-calls.md)をご覧ください。

## エンドポイント

各チェーンには1つ以上のインデックスがあります。例えば、C-Chainのブロックが受け入れられているかどうかを確認するには、C-ChainのブロックインデックスにAPI呼び出しを送信してください。X-Chainブロックが受け入れられているかどうかを確認するには、例えば、X-ChainブロックインデックスにAPI呼び出しを送信してください。

### X-Chainトランザクション

```text
/ext/index/X/tx
```

### X-Chainの頂点

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

最も最近受け入れられたコンテナを取得します。

#### **署名**

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

場所：

* `id`はコンテナのIDです
* `bytes`はコンテナのバイト表現です
* `timestamp`は、このノードがコンテナを受け入れた時間です
* `index`は、このインデックスの前に受け入れたコンテナの数です
* `encoding`は`"cb58"`または`"hex"`です

#### **呼び出し例**

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

インデックスでコンテナを取得します。受け付けた最初のコンテナは、インデックス0、2番目はインデックス1です。

#### **署名**

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

* `id`はコンテナのIDです
* `bytes`はコンテナのバイト表現です
* `timestamp`は、このノードがコンテナを受け入れた時間です
* `index`は、このインデックスの前に受け入れたコンテナの数です
* `encoding`は`"cb58"`または`"hex"`です

#### **呼び出し例**

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

### index.getContainerRange

[`startIndex`, `startIndex+1`, ... , `startIndex`+`numToFetch`-1]のインデックスを持つコンテナを返します。`numToFetch`は`[0,1024]`に含まれている必要があります。

#### **署名**

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

* `id`はコンテナのIDです
* `bytes`はコンテナのバイト表現です
* `timestamp`は、このノードがコンテナを受け入れた時間です
* `index`は、このインデックスの前に受け入れたコンテナの数です
* `encoding`は`"cb58"`または`"hex"`です

#### **呼び出し例**

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

#### **署名**

```cpp
info.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

ここで、`encoding`は`"cb58"`または`"hex"`です。

#### **呼び出し例**

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

コンテナがこのインデックス内にある場合は、TRUEを返します。

#### **署名**

```cpp
info.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **呼び出し例**

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

