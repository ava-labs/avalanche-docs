# 管理API

このAPIは、ノードヘルスとデバッグのために使用することができます。セキュリティ上の理由により、管理APIは無効になっていることに注意してください。管理APIを有効にした上でノードを実行するには、[コマンドライン引数](../references/command-line-interface.md)を使用します`--api-admin-enabled=true`。

## フォーマット

このAPIは、`json 2.0`RPC形式を使用します。

{% page-ref page="issuing-api-calls.md" %}

## エンドポイント

```text
/ext/admin
```

## APIメソッド

### admin.alias

APIエンドポイント、APIの別のエンドポイント、エイリアを割り当てます。元のエンドポイントはまだ機能します。この変更は、このノードにのみ影響します。他のノードは、このエイリアスについて知らないことはありません。

#### **シグネチャ**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint``endpoint`APIの元のエンドポイントです。`/ext/`
* エイリアスされるAPIを、以下に呼び出すことができます`ext/alias`。
* `alias`最大で512文字の文字になります。

#### **コール例**

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

#### **例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

`/ext/bc/X`現在、X-Chainへの呼び出しが可能になります。`/ext/myAlias`

### admin.aliasChain

ブロックチェーンのIDが使用される場所で使用できる別名、ブロックチェーンにエイリアを与える。

#### **シグネチャ**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chain`ブロックチェーンのIDです。
* `alias`ブロックチェーンのID代わりに（APIエンドポイントなどで使用できるようになりました。

#### **コール例**

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

#### **例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

`/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`APIコール`sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`によりIDがやり取りされる代わりに、APIコールが行われるブロックチェーンとやり取りすることも可能になります。`ext/bc/myBlockchainAlias`

### admin.getChainAliass

チェーンのエイリアスを返します

#### **シグネチャ**

```text
admin.getChainAliases(
    {
        chain:string
    }
) -> {aliases:string[]}
```

* `chain`ブロックチェーンのIDです。

#### **コール例**

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

#### **例**

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

ログとロガーの表示レベルを返します。

#### **シグネチャ**

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

* `loggerName`issで、返されるロガーの名前になります。これはオプションの引数です。指定されていない場合、すべての可能なロガーを返します。

#### **コール例**

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

#### **例**

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

ミューテックス統計のプロフィールを、以下のように書き出します`lock.profile`。

#### **シグネチャ**

```text
admin.lockProfile() -> {success:bool}
```

#### **コール例**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **例**

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

Toにのメモリプロファイルを書き込む`mem.profile`。

#### **シグネチャ**

```text
admin.memoryProfile() -> {success:bool}
```

#### **コール例**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **例**

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

ロガーのログレベルを設定します。

#### **シグネチャ**

```text
admin.setLoggerLevel(
    {
        loggerName: string, // optional
        logLevel: string, // optional
        displayLevel: string, // optional
    }
) -> {success:bool}
```

* `loggerName`は、変更されるロガーの名前です。これはオプションのパラメータです。指定されていない場合、すべての可能なロガーを変更します。
* `logLevel`は、書き込みされたログレベルで、省略できます。
* `displayLevel`isで、表示されたログのログレベルです。

`logLevel`そして、同時に省略することは`displayLevel`できません。

#### **コール例**

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

#### **例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.startCProfiler

ノードのCPU利用率プロファイリングを開始します。停止するには、呼び出します`admin.stopCPUProfiler`。停止すると、プロファイルを以下に書き込む`cpu.profile`。

#### **シグネチャ**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **コール例**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.stopCProfiler

以前に開始されたCPUプロファイルを停止します。

#### **シグネチャ**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **コール例**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **例**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

