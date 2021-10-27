# 管理者用API

このAPIは、ノードの健全性の測定やデバッグに使用できます。なお、管理者用APIはセキュリティ上の理由からデフォルトでは無効になっています。管理者用APIを有効にしてノードを実行するには、[コマンドライン引数](../references/command-line-interface.md)を使用します。`--api-admin-enabled=true`

## フォーマット

このAPIは、`json 2.0`RPCフォーマットを使用しています。

{% page-ref page="issuing-api-calls.md" %}

## エンドポイント

```text
/ext/admin
```

## APIメソッド

### admin.alias

APIのエンドポイントにエイリアス、すなわち別のエンドポイントを割り当てることができます。それでも、元のエンドポイントは引き続き機能します。この変更は、このノードにのみ影響し他のノードはこのエイリアスを認識しません。

#### **署名**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint`は、APIの元のエンドポイントです。`endpoint`は、`/ext/`以降のエンドポイントの部分のみを含みます。
* これで、エイリアスが付いたAPIを`ext/alias`で呼び出すことができます。
* `alias`は最大で512文字までです。

#### **呼び出し例**

```bash
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

さて、X-Chainへの呼び出しは、`/ext/bc/X`または、`/ext/myAlias`のいずれにも等価的に行うことができます。

### admin.aliasChain

ブロックチェーンにエイリアス、すなわちブロックチェーンのIDを使用する場所で使用できる別の名前を指定します。

#### **署名**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chain`は、ブロックチェーンのIDです。
* `alias`は、今、ブロックチェーンのIDの代わりに使用できるようになりました（APIのエンドポイントなどで）

#### **呼び出し例**

```bash
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

ここでは、`/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`へのAPIの呼び出しで`sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`をIDとするブロックチェーンとやり取りする代わりに、`ext/bc/myBlockchainAlias`への呼び出しもできるようになっています

### admin.getChainAliases

チェーンのエイリアスを返します。

#### **署名**

```text
admin.getChainAliases(
    {
        chain:string
    }
) -> {aliases:string[]}
```

* `chain`は、ブロックチェーンのIDです。

#### **呼び出し例**

```bash
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

### admin.getLoggerLevel

ロガーのログレベルと表示レベルを返します。

#### **署名**

```text
admin.getLoggerLevel(
    {
        loggerName:string // optional
    }
) -> {
        loggerLevels: {
            loggerName: {
                    logLevel: string,
                    displayLevel: string
            }
        }
    }
```

* `loggerName`は、返ってくるロガーの名前です。これはオプションの引数です。指定がない場合は、可能なすべてのロガーを返します。

#### **呼び出し例**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.getLoggerLevel",
    "params": {
        "loggerName": "C"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **レスポンス例**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "loggerLevels": {
            "C": {
                "logLevel": "DEBUG",
                "displayLevel": "INFO"
            }
        }
    },
    "id": 1
}
```

### admin.lockProfile

ミューテックス統計のプロファイルを`lock.profile`に書き込みます。

#### **署名**

```text
admin.lockProfile() -> {success:bool}
```

#### **呼び出し例**

```bash
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

メモリープロファイルを`mem.profile`に書き込みます。

#### **署名**

```text
admin.memoryProfile() -> {success:bool}
```

#### **呼び出し例**

```bash
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

### admin.setLoggerLevel

ロガーのログレベルと表示レベルを設定します。

#### **署名**

```text
admin.setLoggerLevel(
    {
        loggerName: string, // optional
        logLevel: string, // optional
        displayLevel: string, // optional
    }
) -> {success:bool}
```

* `loggerName`は、変更するロガーの名前です。これはオプションのパラメータです。指定がない場合は、可能なすべてのロガーを変更します。
* `logLevel`は、書き込まれたログのログレベルで、省略可能です。
* `displayLevel`は、表示するログのログレベルで、省略可能です。

`logLevel`と`displayLevel`を同時に省略することはできません。

#### **呼び出し例**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLoggerLevel",
    "params": {
        "loggerName": "C",
        "logLevel": "DEBUG",
        "displayLevel": "INFO"
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

### admin.startCPUProfiler

ノードのCPU使用率のプロファイリングを開始します。停止するには`admin.stopCPUProfiler`を呼び出します。停止時には、`cpu.profile`にプロファイルを書き込みます。

#### **署名**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **呼び出し例**

```bash
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

先に起動していたCPUプロファイルを停止します。

#### **署名**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **呼び出し例**

```bash
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

