# Admin API

このAPIはノードの健全性測定やデバッグに使用できます。Admin API は、セキュリティ上の理由によりデフォルトで無効になっていることに注意してください。Admin API を有効にしたノードを実行するには、[コマンドライン引数](../references/command-line-interface.md)`--api-admin-enabled=true`を使用します。

## JP-JP-

`JSON 2.0` RPC 形式を使用しています。

--

## Endpoint-JP

```text
/ext/admin
```

## API メソッド

### admin.alias

API エンドポイント、API の別のエンドポイントを割り当てます。元のエンドポイントはまだ機能します。この変更はこのノードにのみ影響します。他のノードはこのエイリアスについて知りません。

#### **JPS-JP-JP**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint` は API の元のエンドポイントです。`endpoint` は `/ext/` の後にエンドポイントの部分のみを含める必要があります。
* エイリアスされたAPIを `ext/alias` で呼び出すことができるようになりました。
* `alias` は最大 512 文字でできます。

#### **Call 例**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.alias",
    "params": {
        "alias":"myAlias",
        "endpoint":"bc/X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **レスポンス例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

X-Chain への呼び出しは `/ext/bc/X` か、または `/ext/myAlias` に行うことができます。

### admin.aliasChain

ブロックチェーンに別名エイリアス、ブロックチェーンIDが使用されている場所で使用できる別の名前を付けます。

#### **JPS-JP-JP**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chain`はブロックチェーンのIDです。
* `alias`はブロックチェーンのID \(例えばAPIエンドポイントで使用できるようになりました。\)

#### **Call 例**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.aliasChain",
    "params": {
        "chain":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM",
        "alias":"myBlockchainAlias"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **レスポンス例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

現在、`sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4`VQAWmJQnM というブロックチェーンと交換するのではなく、`/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM` でも`ext/bc/myBlockchainAlias`への呼び出しをすることができます。

### admin.getChainAliases

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaServer-JavaScript-JavaScript-JavaScript-JavaJavaJav

#### **JPS-JP-JP**

```text
admin.getChainAliases(
    {
        chain:string
    }
) -> {aliases:string[]}
```

* `chain`はブロックチェーンのIDです。

#### **Call 例**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.getChainAliases",
    "params": {
        "chain":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **レスポンス例**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "aliases": [
            "X",
            "avm",
            "2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed"
        ]
    },
    "id": 1
}
```

### admin.lockProfile

`lock.profile` に mutex 統計のプロファイルを書き込んでください。

#### **JPS-JP-JP**

```text
admin.lockProfile() -> {success:bool}
```

#### **Call 例**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **レスポンス例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.memoryProfile

`mem.profile`のメモリプロファイルを書き込みます。

#### **JPS-JP-JP**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Call 例**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **レスポンス例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.startCPUProfiler

ノードのCPU使用率のプロファイリングを開始します。停止するには、`admin.stopCPUProfiler` を呼び出します。PPP プロファイルにプロファイルを書き込む`。`

#### **JPS-JP-JP**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Call 例**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **レスポンス例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.stopCPUProfiler

CPU プロファイルを停止します。

#### **JPS-JP-JP**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Call 例**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **レスポンス例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

