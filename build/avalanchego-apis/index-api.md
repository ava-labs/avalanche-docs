# インデックスAPI

AvalancheGoは、インデクサと一緒に動作するように設定することができます。つまり、X-Chain、P-Chain、C-Chainで受け入れたすべてのコンテナ（ブロック、バーテックス、トランザクション）を保存（インデックス化）します。インデックスを有効にしてAvalancheGoを実行するには、コマンドラインフラグ[--index-enabled](../references/command-line-interface.md#apis)をtrueに設定します。**AvalancheGoは、trueに`--index-enabled`設定して実行すると、受け入れられたコンテナのみをインデックス化します**。ノードが完全なインデックスを持っていることを確認するには、新鮮なデータベースを持つノードを実行し、trueに`--index-enabled`を設定します。ノードは、ブートストラップ中にネットワーク履歴のすべてのブロック、バーテックス、トランザクションを受け入れ、インデックスが完全になるようにします。インデックスを有効にした状態でノードが動作している場合は、ノードの電源を切っても問題ありません。インデックスを有効にしたまま再起動すると、オフラインの間に受け付けたすべてのコンテナを受け入れることになります。インデクサは、受け入れられたブロック、バーテックス、トランザクションのインデックス作成に失敗してはいけません。

インデックス付きのコンテナ（つまり、受け入れられたブロック、バーテックス、トランザクション）には、ノードがそのコンテナを受け入れた時間がタイムスタンプされます。ブートストラップ中にコンテナがインデックス化されていた場合、他のノードはもっと前にコンテナを受け入れていたかもしれないことに注意してください。ブートストラップ中にインデックスされたすべてのコンテナには、ネットワークに最初に受け入れられた時ではなく、ノードがブートストラップした時のタイムスタンプが付けられます。

なお、DAG（X-Chainを含みます）では、ノードが頂点やトランザクションを互いに異なる順序で受け入れることがあります。

このドキュメントでは、AvalancheGoのインデックスAPIからデータをクエリする方法を説明します。インデックスAPIは、`--index-enabled`で動作している場合のみ利用可能です。

## クライアントへ移動

インデックスAPIのクライアントのGo実装があります。[こちら](https://pkg.go.dev/github.com/ava-labs/avalanchego/indexer#Client)のドキュメントをご覧ください。このクライアントは、Goプログラム内で使用することができ、インデックスAPIを有効にして動作しているAvalancheGoノードに接続し、インデックスAPIを呼び出すことができます。

## フォーマット

このAPIは`json 2.0`RPCフォーマットを使用しています。JSON RPC呼び出しの詳細については、[こちら](issuing-api-calls.md)をご覧ください。

## エンドポイント

各チェーンには1つ以上のインデックスがあります。例えば、Cチェーンブロックが受け入れられているかどうかを確認するには、CチェーンブロックインデックスにAPIコールを送信します。例えば、Xチェーンのバーテックスが受け入れられているかどうかを確認するには、XチェーンのバーテックスインデックスにAPIコールを送ります。

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
index.getLastAccepted({
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

インデックスでコンテナを取得します。受け入れられた最初のコンテナはインデックス0、2番目はインデックス1といった具合になっています。

#### **署名**

```cpp
index.getContainerByIndex({
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

### index.getContainerByID

IDでコンテナを取得します。

#### **署名**

```cpp
index.getContainerByID({
  containerID: string,
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
    "method": "index.getContainerByID",
    "params": {
        "containerID": "6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **レスポンス例**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" : {
      "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
      "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
      "timestamp":"2021-04-02T15:34:00.262979-07:00",
      "encoding":"hex",
      "index":"0"
    }
}
```

### index.getContainerRange

[`startIndex`, `startIndex+1`, ... , `startIndex`+`numToFetch`-1]のインデックスを持つコンテナを返します。`numToFetch`は`[0,1024]`に含まれている必要があります。

#### **署名**

```cpp
index.getContainerRange({
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
index.getIndex({
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
index.isAccepted({
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

