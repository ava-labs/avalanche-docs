---
description: X-Chainは、Avalancheバーチャルマシン（AVM）のインスタンスです。
---

# 取引所チェーン（X-Chain）API

Avalancheのネイティブプラットフォームである[X-Chain](../../learn/platform-overview/#exchange-chain-x-chain)は、Avalancheバーチャルマシン（AVM）のインスタンスです。このAPIにより、X-ChainやAVMの他のインスタンス上にアセットを作成、取引が可能になります。

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## フォーマット

このAPIは、`json 2.0`RPC形式を使用します。JSON RPC呼び出し方法の詳細については、ここを参照[してください。](issuing-api-calls.md)

## エンドポイント

`/ext/bc/X`X-Chainとやり取りする。

`/ext/bc/blockchainID`AVMを実行するブロックチェーンのID`blockchainID`である他のAVMインスタンスとやり取りします。

## メソッド

### avm.build

このバーチャルマシンのジェネシスステートのJSON表現が与えられ、そのステートのバイト表現を作成します。

#### **エンドポイント**

この呼び出しは、AVMの静的APIエンドポイントに実行されます：

`/ext/vm/avm`

注意：アドレスにチェーンプレフィックスを含めることはできません（つまり、チェーンプレフィックスを含めることはできません。これらのプレフィックスは特定のチェーンを参照するため、静的APIエンドポイント呼び出しでX-\)が実行されます。

#### **シグネチャ**

```cpp
avm.buildGenesis({
    networkID: int,
    genesisData: JSON,
    encoding: string, //optional
}) -> {
    bytes: string,
    encoding: string,
}
```

エンコーディングは、任意のバイトに使用するエンコード形式を指定します。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

`genesisData`以下のフォームを持ちます：

```cpp
{
"genesisData" :
    {
        "assetAlias1": {               // Each object defines an asset
            "name": "human readable name",
            "symbol":"AVAL",           // Symbol is between 0 and 4 characters
            "initialState": {
                "fixedCap" : [         // Choose the asset type.
                    {                  // Can be "fixedCap", "variableCap", "limitedTransfer", "nonFungible"
                        "amount":1000, // At genesis, address A has
                        "address":"A"  // 1000 units of asset
                    },
                    {
                        "amount":5000, // At genesis, address B has
                        "address":"B"  // 1000 units of asset
                    },
                    ...                // Can have many initial holders
                ]
            }
        },
        "assetAliasCanBeAnythingUnique": { // Asset alias can be used in place of assetID in calls
            "name": "human readable name", // names need not be unique
            "symbol": "AVAL",              // symbols need not be unique
            "initialState": {
                "variableCap" : [          // No units of the asset exist at genesis
                    {
                        "minters": [       // The signature of A or B can mint more of
                            "A",           // the asset.
                            "B"
                        ],
                        "threshold":1
                    },
                    {
                        "minters": [       // The signatures of 2 of A, B and C can mint
                            "A",           // more of the asset
                            "B",
                            "C"
                        ],
                        "threshold":2
                    },
                    ...                    // Can have many minter sets
                ]
            }
        },
        ...                                // Can list more assets
    }
}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "avm.buildGenesis",
    "params" : {
        "networkId": 16,
        "genesisData": {
            "asset1": {
                "name": "myFixedCapAsset",
                "symbol":"MFCA",
                "initialState": {
                    "fixedCap" : [
                        {
                            "amount":100000,
                            "address": "avax13ery2kvdrkd2nkquvs892gl8hg7mq4a6ufnrn6"
                        },
                        {
                            "amount":100000,
                            "address": "avax1rvks3vpe4cm9yc0rrk8d5855nd6yxxutfc2h2r"
                        },
                        {
                            "amount":50000,
                            "address": "avax1ntj922dj4crc4pre4e0xt3dyj0t5rsw9uw0tus"
                        },
                        {
                            "amount":50000,
                            "address": "avax1yk0xzmqyyaxn26sqceuky2tc2fh2q327vcwvda"
                        }
                    ]
                }
            },
            "asset2": {
                "name": "myVarCapAsset",
                "symbol":"MVCA",
                "initialState": {
                    "variableCap" : [
                        {
                            "minters": [
                                "avax1kcfg6avc94ct3qh2mtdg47thsk8nrflnrgwjqr",
                                "avax14e2s22wxvf3c7309txxpqs0qe9tjwwtk0dme8e"
                            ],
                            "threshold":1
                        },
                        {
                            "minters": [
                                "avax1y8pveyn82gjyqr7kqzp72pqym6xlch9gt5grck",
                                "avax1c5cmm0gem70rd8dcnpel63apzfnfxye9kd4wwe",
                                "avax12euam2lwtwa8apvfdl700ckhg86euag2hlhmyw"
                            ],
                            "threshold":2
                        }
                    ]
                }
            }
        },
        "encoding": "hex"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/avm
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "0x0000000000010006617373657431000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f6d794669786564436170417373657400044d464341000000000100000000000000010000000700000000000186a10000000000000000000000010000000152b219bc1b9ab0a9f2e3f9216e4460bd5db8d153bfa57c3c",
        "encoding": "hex"
    },
    "id": 1
}
```

### avm.createAddress

指定されたユーザーによってコントロールされる新しいアドレスを作成します。

#### **シグネチャ**

```cpp
avm.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "X-avax12c6n252g5v3w6a6v69f0mnnzwr77jxzr3q3u7d"
    },
    "id": 1
}
```

### avm.createFixedCapAsset

新しい固定キャップ、真菌アセットを作成します。初期化時に数量が作成され、これ以上作成されることはありません。アセットは、以下で送信することができます`avm.send`。

{% page-ref page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

#### **シグネチャ**

```cpp
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int, //optional
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string
}
```

* `name`これは、アセットの人間が読みやすい名前です。必ずしも一意ではない。
* `symbol`iss は、アセットのショートランドシンボルです。0から4文字の間で。必ずしも一意ではない。省略可能。
* `denomination`このアセットの残高がユーザーインターフェースでどのように表示されるかを決定します。`denomination`0`denomination`の場合、このアセットの100ユニットが100として表示されます。1の場合、このアセットの100ユニットが10.0として表示されます。2`denomination`の場合、このアセットの100ユニットが1.00などとして表示されます。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`そして、トランザクション手数料を支払うユーザーを`password`示します。
* 内に含まれる各要素は、ジェネシスでアセットの`amount`単位を`address`保持する指定を`initialHolders`します。
* `assetID`は、新しいアセットのID。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "myFixedCapAsset",
        "symbol":"MFCA",
        "initialHolders": [
            {
                "address": "X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp",
                "amount": 10000
            },
            {
                "address":"X-avax1y0h66sjk0rlnh9kppnfskwpw2tpcluzxh9png8",
                "amount":50000
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"ZiKfqRXCZgHLgZ4rxGU9Qbycdzuq5DRY4tdSNS9ku8kcNxNLD",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.mint

[`avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset).

#### **シグネチャ**

```cpp
avm.mint({
    amount: int,
    assetID: string,
    to: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `amount``assetID`単位は、アドレスで作成、コントロールされます。`to`
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`トランザクション手数料を支払うユーザーです。このアセットをより多くのミントする権限を与える鍵を保持しなければなり`username`ません。つまり、ミンターセットのいずれかに対して少なくとも_閾値_キーをコントロールする必要があります。
* `txID`このトランザクションID
* `changeAddr`その結果、変更が送信されたアドレスとなります。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":10000000,
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "to":"X-avax1ap39w4a7fk0au083rrmnhc2pqk20yjt6s3gzkx",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2oGdPdfw2qcNUHeqjw8sU2hPVrFyNUTgn6A8HenDra7oLCDtja",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.createVariableCapAsset

新しい可変キャップ、カンビルアセットを作成します。初期化時にはアセットのユニットは存在しません。Mintersは、を使用してこのアセットの単位をミントすることができます`avm.mint`。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

#### **シグネチャ**

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int, //optional
    minterSets: []{
        minters: []string,
        threshold: int
    },
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

* `name`これは、アセットの人間が読みやすい名前です。必ずしも一意ではない。
* `symbol`iss は、アセットのショートランドシンボルです。0から4文字の間で。必ずしも一意ではない。省略可能。
* `denomination`このアセットの残高がユーザーインターフェースでどのように表示されるかを決定します。デノミネーションが0の場合、このアセットの100ユニットが100として表示されます。デノミネーションが2の場合、このアセットの100ユニットは.100などと表示されます。
* `minterSets``minters`は、各要素が、中に含まれたアドレスのリスト`threshold`が、ミントトランザクションに署名することにより、より多くのアセットをまとめて指定するリストを一覧で示します。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`トランザクション手数料を支払います。
* `assetID`は、新しいアセットのID。
* `changeAddr`その結果、変更が送信されたアドレスとなります。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"myVariableCapAsset",
        "symbol":"MFCA",
        "minterSets":[
            {
                "minters":[
                    "X-avax14q0p6y4yzweuugz9p080kapajwvac3ur755n7d"
                ],
                "threshold": 1
            },
            {
                "minters": [
                    "X-avax1fzyldr3mwn6lj7y46edhua6vr5ayx0ruuhezpv",
                    "X-avax1x5mrgxj0emysnnzyszamqxhq95t2kwcp9n3fy3",
                    "X-avax13zmrjvj75h3578rn3sfth8p64t2ll4gm4tv2rp"
                ],
                "threshold": 2
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"2QbZFE7J4MAny9iXHUwq8Pz8SpFhWk3maCw4SkinVPv6wPmAbK",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.createNFTAsset

新しい非真菌アセットを作成します。初期化時にはアセットのユニットは存在しません。Mintersは、を使用してこのアセットの単位をミントすることができます`avm.mintNFT`。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **シグネチャ**

```cpp
avm.createNFTAsset({
    name: string,
    symbol: string,
    minterSets: []{
        minters: []string,
        threshold: int
    },
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
 {
    assetID: string,
    changeAddr: string,
}
```

* `name`これは、アセットの人間が読みやすい名前です。必ずしも一意ではない。
* `symbol`iss は、アセットのショートランドシンボルです。0から4文字の間で。必ずしも一意ではない。省略可能。
* `minterSets``minters`は、各要素が、中に含まれたアドレスのリスト`threshold`が、ミントトランザクションに署名することにより、より多くのアセットをまとめて指定するリストを一覧で示します。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`トランザクション手数料を支払います。
* `assetID`は、新しいアセットのID。
* `changeAddr`その結果、変更が送信されたアドレスとなります。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"Coincert",
        "symbol":"TIXX",
        "minterSets":[
            {
                "minters":[
                    "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
                ],
                "threshold": 1
            }
        ],
        "from": ["X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm.mintNFT

ミントノンファンジブルトークン[`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset)。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **シグネチャ**

```cpp
avm.mintNFT({
    assetID: string,
    payload: string,
    to: string,
    encoding: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `assetID`は、新しく作成されたNFTアセットのアセットID
* `payload`は、1024バイトまでの任意ペイロードです。そのエンコード形式は、引数で指定されます`encoding`。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* `username`トランザクション手数料を支払うユーザーです。このアセットをより多くのミントする権限を与える鍵を保持しなければなり`username`ません。つまり、ミンターセットのいずれかに対して少なくとも_閾値_キーをコントロールする必要があります。
* `txID`このトランザクションID
* `changeAddr`その結果、変更が送信されたアドレスとなります。
* `encoding`は、ペイロード引数に使用するエンコーディングフォーマットです。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "payload":"2EWh72jYQvEJF9NLk",
        "to":"X-avax1ap39w4a7fk0au083rrmnhc2pqk20yjt6s3gzkx",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2oGdPdfw2qcNUHeqjw8sU2hPVrFyNUTgn6A8HenDra7oLCDtja",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.export

X-ChainからP-ChainあるいはC-Chainに非AVAXを送信します。このメソッドを呼び出した後、C-Chain[`avax.import`](contract-chain-c-chain-api.md#avax-import)に呼び出して、振り込みが完了する必要があります。

#### **シグネチャ**

```cpp
avm.export({
    to: string,
    amount: int,
    assetID: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string,
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `to`iss a p-ChainあるいはC-Chainアドレス。
* `amount`iss は、送信するアセットの額です。
* `assetID`送信されたアセットのアセットid。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* アセットは、以下によってコントロールされたアドレスから送信されます。`username`
* `txID`このトランザクションID
* `changeAddr`その結果、変更が送信されたアドレスとなります。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"C-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "assetID": "2YmsQfMaCczE4mLG1DPYUnRURNGfhjj4qrqnLRR3LmZ3GxDWPt",
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2Eu16yNaepP57XrrJgjKGpiEDandpiGWW8xbUm6wcTYny3fejj",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm.exportAVAX

X-ChainからAVAXを別のチェーンに送信します。このメソッドを呼び出した後、他のチェーン`import`に呼び出して、振り込みを完了する必要があります。

#### **シグネチャ**

```cpp
avm.exportAVAX({
    to: string,
    amount: int,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string,
}) ->
{
    txID: string,
    changeAddr: string,
}
```

* `to`AVAXが送信されるP-Chainアドレスです。
* `amount`issimplyは、送信するnAVAX額です。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* AVAXは、以下によってコントロールされたアドレスから送信されます。`username`
* `txID`このトランザクションID
* `changeAddr`その結果、変更が送信されたアドレスとなります。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"P-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "25VzbNzt3gi2vkE3Kr6H9KJeSR2tXkr8FsBCm3vARnB5foLVmx",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### avm.exportKey

指定されたアドレスをコントロールする秘密鍵を取得します。  返却された秘密鍵は、. でユーザーに追加することができます[`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey)。

#### **シグネチャ**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username`コントロールする必要があります。`address`
* `privateKey`コントロールする秘密鍵の文字列表現`address`

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username":"myUsername",
        "password":"myPassword",
        "address":"X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

### avm.getAllBalances

指定されたアドレスでコントロールされるすべてのアセットの残高を取得します。

#### **シグネチャ**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getAllBalances",
    "params" :{
        "address":"X-avax1c79e0dd0susp7dc8udq34jgk2yvve7hapvdyht"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balances": [
            {
                "asset": "AVAX",
                "balance": "102"
            },
            {
                "asset": "2sdnziCz37Jov3QSNMXcFRGFJ1tgauaj6L7qfk7yUcRPfQMC79",
                "balance": "10000"
            }
        ]
    },
    "id": 1
}
```

### avm.getAssetDescription

アセットについての情報を入手します。

#### **シグネチャ**

```cpp
avm.getAssetDescription({assetID: string}) -> {
    assetId: string,
    name: string,
    symbol: string,
    denomination: int
}
```

* `assetID`iss は、情報が要求されたアセットのidです。
* `name`これは、必ずしも一意の名前ではありません。
* `symbol`これは、アセットのシンボルです。
* `denomination`このアセットの残高がユーザーインターフェースでどのように表示されるかを決定します。デノミネーションが0の場合、このアセットの100ユニットが100として表示されます。デノミネーションが2の場合、このアセットの100ユニットは.100などと表示されます。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getAssetDescription",
    "params" :{
        "assetID" :"2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
        "name": "Avalanche",
        "symbol": "AVAX",
        "denomination": "9"
    },
    "id": 1
}`
```

### avm.getBalance

指定されたアドレスでコントロールされたアセットの残高を取得します。

#### **シグネチャ**

```cpp
avm.getBalance({
    address: string,
    assetID: string
}) -> {balance: int}
```

* `address`アセットのオーナー
* `assetID`バランスが要求されたアセットのid

#### **コール例**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-avax1ns3jzhqyk7parg29qan56k0fcxwstc76cjqq2s",
      "assetID": "2pYGetDWyKdHxpFxh2LHeoLNCH6H5vxxCxHQtFnnFaYxLsqtHC"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":"299999999999900",
        "utxoIDs":[
            {
                "txID":"WPQdyLNqHfiEKp4zcCpayRHYDVYuh1hqs9c1RqgZXS4VPgdvo",
                "outputIndex":1
            }
        ]
    }
}
```

### avm.getAdddressTxs<a id="avm-get-address-txs-api"></a>

指定されたアドレスがバランスを変えるすべてのトランザクションを返します。どちらかが真である場合、トランザクションはアドレスいのバランスを変更すると言われています。

* トランザクションが消費するUTXOは、少なくとも部分的に、アドレスによって所有されていません。
* トランザクションが生成するUTXOは、少なくとも一部は、アドレスによって所有されます。

注意：インデックス（`index-transactions`）は、X-chain設定で有効化する必要があります。

#### **シグネチャ**

```cpp
avm.getAddressTxs({
    address: string,
    cursor: uint64,     // optional, leave empty to get the first page
    assetID: string,
    pageSize: uint64    // optional, defaults to 1024
}) -> {
    txIDs: []string,
    cursor: uint64,
}
```

**リクエストパラメータ**

* `address`：我々が関連したトランザクションを取得するアドレス
* `assetID`：このアセットのバランスが変更になったトランザクションのみを返します。IDあるいはアセットのエイリアでなければなりません。
* `pageSize`：ページごとに返却するアイテム数。オプションデフォルトは1024です。

**レスポンスパラメータ**

* `txIDs`：このアドレスのバランスに影響を及ぼしたトランザクションIDのリスト。
* `cursor`：ページ番号あるいはオフセット。次のページを取得するには、要求でこれを使用してください。

#### **コール例**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getAddressTxs",
  "params" :{
      "address":"X-local1kpprmfpzzm5lxyene32f6lr7j0aj7gxsu6hp9y",
      "assetID":"AVAX",
      "pageSize":20
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txIDs": [
            "SsJF7KKwxiUJkczygwmgLqo3XVRotmpKP8rMp74cpLuNLfwf6"
        ],
        "cursor": "1"
    },
    "id": 1
}
```

### avm.getTx

指定されたトランザクションを返します。`encoding`パラメーターは、返されたトランザクションのフォーマットを設定します。`"cb58"``"hex"`あるいは、その.`"json"`デフォルトは、「cb58」になります。

#### **シグネチャ**

```cpp
avm.getTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "tx":"1111111vQFqEEHkkAGwJnpdAJgga28zHk9pFARHp1VWe3QM5wC7ztGA5cZAPanFWXHkhbWEbFs9qsEpNZ7QHrzucUUZqLEPrAwJZLrZBik4dEhbsTCF3nS6s2fXVzc5ar2esLFD92WVMZmJNuTUQuKjVkjag2Gy3HHYSqm6bojrG62KrazywKPhrYx8QF9AqNfYYwD3XcSUV1g46r7sQ1WqzM8nyG4qL517JS1YVuTC3aWPeN5cxP6FdvbYexwHcgaBtiQsYbCEeZ9cuJqhE2Pxx8BJFpicLN8FBexb6fzQyBLiFR7yx6v6YBjq7dtu9MBczFdNCnDE4MsG2SyPZsdUv1XxQYVVwDqgqi8Zto5esJKph72YZbrXX3SHVSZBFZXkKbTzyEQFWHCF1jC",
        "encoding": "cb58"
    }
}
```

### avm.getTxStatus

ネットワークに送信されたトランザクションステータスを得る。

#### **シグネチャ**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`status`次のいずれかです：

* `Accepted`：トランザクションは、すべてのノードで受け入れられる（あるいは受け入れられる）
* `Processing`：トランザクションは、このノードによって投票されます
* `Rejected`：トランザクションは、ネットワーク内のいかなるノードから受け入れられないことはありません。
* `Unknown`：このノードではトランザクションは見ることができません。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

### avm.getUTXO

指定されたアドレスを参照するUTXOを取得します。sourceCainが指定された場合、そのチェーンからXチェーンにエクスポートされたアトミックUTXOを回収します。

#### **シグネチャ**

```cpp
avm.getUTXOs({
    addresses: []string,
    limit: int, //optional
    startIndex: { //optional
        address: string,
        utxo: string
    },
    sourceChain: string, //optional
    encoding: string //optional
}) -> {
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    },
    sourceChain: string, //optional
    encoding: string
}
```

* `utxos`UTXOのリストにより、各UTXOが少なくとも1つのアドレスを参照する`addresses`
* ほとんどの`limit`UTXOは返却されます。`limit`省略された場合、1024を超える場合、1024に設定されます。
* この方法は、ページネーションを`endIndex`サポートします。`startIndex`次のUTXOセットを取得するには、次の呼び出し時にその値`endIndex`を使用してください。
* `startIndex`省略された場合、UTXOを最大限に取得します。`limit`
* `startIndex`（提供時）ページネーションを使用する際、UTXOは、複数の呼び出しで一意のものを保証することはできません。つまり、UTXOは、最初の呼び出しの結果に表示され、その後、2回目の呼び出しで表示される場合があります。
* ページネーションを使用する際、複数の呼び出しで一貫性が保証されることはありません。つまり、呼び出し間でアドレスのUTXOセットが変更された可能性があります。
* `encoding`戻されたUTXOのフォーマットを設定します。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

#### **例**

少なくとも1つと`X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`を参照するすべてのUTXOを望むとします。`X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf", "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

これにより応答が得られます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "5",
        "utxos": [
            "11PQ1sNw9tcXjVki7261souJnr1TPFrdVCu5JGZC7Shedq3a7xvnTXkBQ162qMYxoerMdwzCM2iM1wEQPwTxZbtkPASf2tWvddnsxPEYndVSxLv8PDFMwBGp6UoL35gd9MQW3UitpfmFsLnAUCSAZHWCgqft2iHKnKRQRz",
            "11RCDVNLzFT8KmriEJN7W1in6vB2cPteTZHnwaQF6kt8B2UANfUkcroi8b8ZSEXJE74LzX1mmBvtU34K6VZPNAVxzF6KfEA8RbYT7xhraioTsHqxVr2DJhZHpR3wGWdjUnRrqSSeeKGE76HTiQQ8WXoABesvs8GkhVpXMK",
            "11GxS4Kj2od4bocNWMQiQhcBEHsC3ZgBP6edTgYbGY7iiXgRVjPKQGkhX5zj4NC62ZdYR3sZAgp6nUc75RJKwcvBKm4MGjHvje7GvegYFCt4RmwRbFDDvbeMYusEnfVwvpYwQycXQdPFMe12z4SP4jXjnueernYbRtC4qL",
            "11S1AL9rxocRf2NVzQkZ6bfaWxgCYch7Bp2mgzBT6f5ru3XEMiVZM6F8DufeaVvJZnvnHWtZqocoSRZPHT5GM6qqCmdbXuuqb44oqdSMRvLphzhircmMnUbNz4TjBxcChtks3ZiVFhdkCb7kBNLbBEmtuHcDxM7MkgPjHw",
            "11Cn3i2T9SMArCmamYUBt5xhNEsrdRCYKQsANw3EqBkeThbQgAKxVJomfc2DE4ViYcPtz4tcEfja38nY7kQV7gGb3Fq5gxvbLdb4yZatwCZE7u4mrEXT3bNZy46ByU8A3JnT91uJmfrhHPV1M3NUHYbt6Q3mJ3bFM1KQjE"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

`numFetched`そのため、フェッチされていないUTXOがより多く存在する可能性が、`limit`我々に示すことができます。今回は、次のようにしてメソッドを呼び出します`startIndex`：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

これにより応答が得られます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "4",
        "utxos": [
            "115ZLnNqzCsyugMY5kbLnsyP2y4se4GJBbKHjyQnbPfRBitqLaxMizsaXbDMU61fHV2MDd7fGsDnkMzsTewULi94mcjk1bfvP7aHYUG2i3XELpV9guqsCtv7m3m3Kg4Ya1m6tAWqT7PhvAaW4D3fk8W1KnXu5JTWvYBqD2",
            "11QASUuhw9M1r52maTFUZ4fnuQby9inX77VYxePQoNavEyCPuHN5cCWPQnwf8fMrydFXVMPAcS4UJAcLjSFskNEmtVPDMY4UyHwh2MChBju6Y7V8yYf3JBmYt767NPsdS3EqgufYJMowpud8fNyH1to4pAdd6A9CYbD8KG",
            "11MHPUWT8CsdrtMWstYpFR3kobsvRrLB4W8tP9kDjhjgLkCJf9aaJQM832oPcvKBsRhCCxfKdWr2UWPztRCU9HEv4qXVwRhg9fknAXzY3a9rXXPk9HmArxMHLzGzRECkXpXb2dAeqaCsZ637MPMrJeWiovgeAG8c5dAw2q",
            "11K9kKhFg75JJQUFJEGiTmbdFm7r1Uw5zsyDLDY1uVc8zo42WNbgcpscNQhyNqNPKrgtavqtRppQNXSEHnBQxEEh5KbAEcb8SxVZjSCqhNxME8UTrconBkTETSA23SjUSk8AkbTRrLz5BAqB6jo9195xNmM3WLWt7mLJ24"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

`numFetched``limit`それより少ないので、UTXOを取得したが、再びこのメソッドを呼び出す必要はありません。

PチェーンからXチェーンにエクスポートされたUTXOを取得し、ImportTxを構築したいとしましょう。その後、アトミックUTXOを取得するために、sourceChain引数でGetUTXOを呼び出す必要があります：

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf", "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz"],
        "limit":5,
        "sourceChain": "P",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

これにより応答が得られます：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "1",
        "utxos": [
            "115P1k9aSVFBfi9siZZz135jkrBCdEMZMbZ82JaLLuML37cgVMuxgu73ukQbPjXtDgyBCE1cgrJjqDPgboUswV5BGAYhnuxunkHS3xncB599V3mxyvWnwVwNPmq3mKQwF5EWhfTaXkhqE5VFr92yQBk9Nh5ekZBDSFGCSC"
        ],
        "endIndex": {
            "address": "X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz",
            "utxo": "2Sz2XwRYqUHwPeiKoRnZ6ht88YqzAF1SQjMYZQQaB5wBFkAqST"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### avm.import

P-ChainあるいはC-ChainからX-ChainにAVAXの移動を完了します。このメソッドが呼び出される前に、P-Chain’s[`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax)あるいはC-Chain’[`avax.export`](contract-chain-c-chain-api.md#avax-export)sメソッドを呼び出して転送を開始する必要があります。

#### **シグネチャ**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to`AVAXが送信されるアドレスP-Chain`exportAVAX`あるいはC-Chainの呼び出しに伴う`to`引数と同じでなければなりません。`export`
* `sourceChain`AVAXがインポートされるチェーンのIDまたはエイリアです。C-Chainから資金をインポートするには、使用してください`"C"`。
* `username`は、コントロールするユーザです。`to`
* `txID`は、新しく作成したアトミックトランザクションのIDです。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.import",
    "params" :{
        "to":"X-avax1s7aygrkrtxflmrlyadlhqu70a6f4a4n8l2tru8",
        "sourceChain":"C",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2gXpf4jFoMAWQ3rxBfavgFfSdLkL2eFUYprKsUQuEdB5H6Jo1H"
    },
    "id": 1
}
```

### avm.importAVAX

P-ChainからX-ChainにAVAXの移動を完了します。このメソッドが呼び出される前に、P-Chainの[`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax)メソッドを呼び出して転送を開始する必要があります。

#### **シグネチャ**

```cpp
avm.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to`AVAXが送信されるアドレスP-Chainに呼び出される際に、`to`引数と同じでなければなりません。`exportAVAX`
* `sourceChain`AVAXがインポートされるチェーンのIDまたはエイリアです。P-Chainから資金をインポートするには、 `"P"`.
* `username`は、コントロールするユーザです。`to`

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importAVAX",
    "params" :{
        "to":"X-avax1s7aygrkrtxflmrlyadlhqu70a6f4a4n8l2tru8",
        "sourceChain":"P",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h"
    },
    "id": 1
}
```

### avm.importKey

アドレスをコントロールする秘密鍵を提供することにより、ユーザーにアドレスをコントロールします。

#### **シグネチャ**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* `username`秘密鍵のセットに追加します。`username`現在、秘密鍵でコントロール`privateKey`されるアドレス`address`です。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username":"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "address":"X-avax1mwlnrzv0ezdycx4qhqj77j55cwgcvtf29zvmpy"
    }
}
```

### avm.issueTx

`encoding`署名トランザクションをネットワークに送信します。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

#### **シグネチャ**

```cpp
avm.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### avm.listAddresses

指定されたユーザーによってコントロールされるアドレスを一覧します。

#### **シグネチャ**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.listAddresses",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["X-avax1rt4vac58crp0p59yf640c4gycm6creg2rt8hc6"]
    },
    "id": 1
}
```

### avm.send

数量のアセットをアドレスに送信します。

#### **シグネチャ**

```cpp
avm.send({
    amount: int,
    assetID: string,
    to: string,
    memo: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `amount`IDでアセット`amount`を送信し、. アドレスを`assetID`確保`to`します。AVAXの場合、1 nAVAX \(1AVAXの10億分の1\)です。
* `to`iss a good is a good asset to good asset to good asset to g
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* その長さは256バイトまで可能で`memo`、添付できます。
* アセットは、ユーザーによってコントロールされたアドレスから送信されます`username`。（もちろん、そのユーザーは、少なくとも送信されたアセットの残高を保持する必要があります。）

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10000,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "memo"      : "hi, mom!",
        "username"  : "userThatControlsAtLeast10000OfThisAsset",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.send

`amount`所有されたアドレスリストから指定されたアドレスへ、複数の移動を送信`assetID`します。

#### **シグネチャ**

```cpp
avm.sendMultiple({
    outputs: []{
      assetID: string,
      amount: int,
      to: string
    },
    from: []string, //optional
    changeAddr: string, //optional
    memo: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `outputs`は、それぞれが、そのを含むオブジェクトリテラルの配列です`assetID``amount`。`to`
* `memo`オプションで、長さは256バイトまで可能になります。
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* アセットは、ユーザーによってコントロールされたアドレスから送信されます`username`。（もちろん、そのユーザーは、少なくとも送信されたアセットの残高を保持する必要があります。）

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendMultiple",
    "params" :{
        "outputs": [
            {
                "assetID" : "AVAX",
                "to"      : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
                "amount"  : 1000000000
            },
            {
                "assetID" : "26aqSTpZuWDAVtRmo44fjCx4zW6PDEx3zy9Qtp2ts1MuMFn9FB",
                "to"      : "X-avax18knvhxx8uhc0mwlgrfyzjcm2wrd6e60w37xrjq",
                "amount"  : 10
            }
        ],
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "username",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### avm.sendNFT

非真菌トークンを送信します。

#### **シグネチャ**

```cpp
avm.sendNFT({
    assetID: string,
    groupID: number,
    to: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string}
```

* `assetID`送信されたNFTのアセットID。
* `groupID`は、NFTを送信するNFTグループです。NFT作成により、各NFT ID下で複数のグループが可能になります。各グループに複数のNFTを発行できます。
* `to`isNFTが送信したX-Chainアドレス。
* `from`は、この操作に使用するアドレスです。`changeAddr`省略した場合、必要に応じてあなたのアドレスを使用します。省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* アセットは、ユーザーによってコントロールされたアドレスから送信されます`username`。（もちろん、そのユーザーは、少なくとも送信されたNFTのバランスを保持する必要があります。）

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID"   : "2KGdt2HpFKpTH5CtGZjYt5XPWs6Pv9DLoRBhiFfntbezdRvZWP",
        "groupID"   : 0,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "myUsername",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "DoR2UtG1Trd3Q8gWXVevNxD666Q3DPqSFmBSMPQ9dWTV8Qtuy",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    },
    "id": 1
}
```

### wallet.issueTx

署名トランザクションをネットワークに送信し、txが受け付けられると想定します。署名トランザクションのフォーマットを指定`encoding`します。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

この呼び出しは、ウォレットAPIエンドポイントに渡されます：

`/ext/bc/X/wallet`

#### シグネチャ

```cpp
wallet.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### 例

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"wallet.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### 例

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### wallet.send

数量のアセットをアドレスに送信し、txが受け入れられると想定し、将来のコールが変更されたUTXOセットを使用できるようにします。

この呼び出しは、ウォレットAPIエンドポイントに渡されます：

`/ext/bc/X/wallet`

#### **シグネチャ**

```cpp
wallet.send({
    amount: int,
    assetID: string,
    to: string,
    memo: string, //optional
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `amount`IDでアセット`amount`を送信し、. アドレスを`assetID`確保`to`します。AVAXの場合、1 nAVAX \(1AVAXの10億分の1\)です。
* `to`iss a good is a good asset to good asset to good asset to g
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* その長さは256バイトまで可能で`memo`、添付できます。
* アセットは、ユーザーによってコントロールされたアドレスから送信されます`username`。（もちろん、そのユーザーは、少なくとも送信されたアセットの残高を保持する必要があります。）

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"wallet.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10000,
        "to"        : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "userThatControlsAtLeast10000OfThisAsset",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### wallet.sendMultiple

`amount`その後の呼び出しが変更されたUTXOセットを使用できるようにするように、アドレスが所有するリストから指定されたアドレス`assetID`に、複数の移動を送信します。

この呼び出しは、ウォレットAPIエンドポイントに渡されます：

`/ext/bc/X/wallet`

#### **シグネチャ**

```cpp
wallet.sendMultiple({
    outputs: []{
      assetID: string,
      amount: int,
      to: string
    },
    from: []string, //optional
    changeAddr: string, //optional
    memo: string, //optional
    username: string,
    password: string
}) -> {txID: string, changeAddr: string}
```

* `outputs`は、それぞれが、そのを含むオブジェクトリテラルの配列です`assetID``amount`。`to`
* `from`は、この操作に使用するアドレスです。省略した場合、必要に応じてあなたのアドレスを使用します。
* `changeAddr`変更があった場合は、アドレス省略した場合、変更はユーザーがコントロールするアドレスのひとつに送信されます。
* その長さは256バイトまで可能で`memo`、添付できます。
* アセットは、ユーザーによってコントロールされたアドレスから送信されます`username`。（もちろん、そのユーザーは、少なくとも送信されたアセットの残高を保持する必要があります。）

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"wallet.sendMultiple",
    "params" :{
        "outputs": [
            {
                "assetID" : "AVAX",
                "to"      : "X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
                "amount"  : 1000000000
            },
            {
                "assetID" : "26aqSTpZuWDAVtRmo44fjCx4zW6PDEx3zy9Qtp2ts1MuMFn9FB",
                "to"      : "X-avax18knvhxx8uhc0mwlgrfyzjcm2wrd6e60w37xrjq",
                "amount"  : 10
            }
        ],
        "memo"      : "hi, mom!",
        "from"      : ["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"  : "username",
        "password"  : "myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X/wallet
```

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2iXSVLPNVdnFqn65rRvLrsu8WneTFqBJRMqkBJx5vZTwAQb8c1",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

### イベント

指定されたアドレス上でトランザクションを確認します。

この呼び出しは、イベントAPIエンドポイントまで行われます：

`/ext/bc/X/events`

#### **Golang例**

```go
package main

import (
    "encoding/json"
    "log"
    "net"
    "net/http"
    "sync"

    "github.com/ava-labs/avalanchego/api"
    "github.com/ava-labs/avalanchego/pubsub"
    "github.com/gorilla/websocket"
)

func main() {
    dialer := websocket.Dialer{
        NetDial: func(netw, addr string) (net.Conn, error) {
            return net.Dial(netw, addr)
        },
    }

    httpHeader := http.Header{}
    conn, _, err := dialer.Dial("ws://localhost:9650/ext/bc/X/events", httpHeader)
    if err != nil {
        panic(err)
    }

    waitGroup := &sync.WaitGroup{}
    waitGroup.Add(1)

    readMsg := func() {
        defer waitGroup.Done()

        for {
            mt, msg, err := conn.ReadMessage()
            if err != nil {
                log.Println(err)
                return
            }
            switch mt {
            case websocket.TextMessage:
                log.Println(string(msg))
            default:
                log.Println(mt, string(msg))
            }
        }
    }

    go readMsg()

    cmd := &pubsub.Command{NewSet: &pubsub.NewSet{}}
    cmdmsg, err := json.Marshal(cmd)
    if err != nil {
        panic(err)
    }
    err = conn.WriteMessage(websocket.TextMessage, cmdmsg)
    if err != nil {
        panic(err)
    }

    var addresses []string
    addresses = append(addresses, " X-fuji....")
    cmd = &pubsub.Command{AddAddresses: &pubsub.AddAddresses{JSONAddresses: api.JSONAddresses{Addresses: addresses}}}
    cmdmsg, err = json.Marshal(cmd)
    if err != nil {
        panic(err)
    }

    err = conn.WriteMessage(websocket.TextMessage, cmdmsg)
    if err != nil {
        panic(err)
    }

    waitGroup.Wait()
}
```

**オペレーション**

| コマンド | 説明 | 例 | 引数 |
| :--- | :--- | :--- | :--- |
| **NewSet** | 新しいアドレスマップセットを作成 | {"newSet":{}} |  |
| **NewBloom** | 新しいブルームセットを作成します。 | {"newBloom":{"maxElements":"1000","collisionProb":"0.0100"} | maxElements - フィルター内の要素数が0以上で、0以上のコリジョンプロブで、許可されたコリジョン確率は0以上で、0以上、<= 1でなければなりません。 |
| **Adddaddresses** | セットにアドレスを追加する | {"addAdddresses":{"addresses":["X-fuji..."]} | アドレス - |

NewSet**あるいは****NewBloomを呼び出すことで、フィルターを**リセットし、Addressesで続く必要があります****。**Addaddressesは、複数回呼び出す**ことができます。

**詳細**

* ****NewSetは、アドレスがセットにされている場合、トランザクションが送信されます。
* ****NewBloom [フィルターにより](https://en.wikipedia.org/wiki/Bloom_filter)誤検出が可能になります。しかし、より多くのアドレスをフィルターすることができます。アドレスがフィルター内に存在する場合、トランザクションが送信されます。

#### **例**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```

