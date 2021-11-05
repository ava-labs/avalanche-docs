---
description: X-Chainは、Avalanche Virtual Machine \(AVM\)のインスタンスです。
---

# Exchange Chain \(X-Chain\) API

[X-Chain](../../learn/platform-overview/#exchange-chain-x-chain)は、アセットを作成して取引するためのAvalancheのネイティブプラットフォームであり、Avalanche Virtual Machine（AVM）のインスタンスです。このAPIにより、クライアントはX-ChainやAVMの他のインスタンス上でアセットを作成、取引することができます。

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## フォーマット

このAPIは`json 2.0`RPCフォーマットを使用しています。JSON RPC呼び出しの詳細については、[こちら](issuing-api-calls.md)をご覧ください。

## エンドポイント

`/ext/bc/X`を使用して、X-Chainとやり取りすることができます。

`/ext/bc/blockchainID`は、他のAVMインスタンスとやり取りするためのもので、ここで、`blockchainID`はAVMを実行しているブロックチェーンのIDを示しています。

## メソッド

### avm.buildGenesis

この仮想マシンのジェネシス状態のJSON表現が与えられると、その状態のバイト表現を作成します。

#### **エンドポイント**

この呼び出しは、以下のAVMの静的APIエンドポイントに対して実行されます。

`/ext/vm/avm`

注意：これらのプレフィックスは、特定のチェーンを参照しているため、静的APIエンドポイントを呼び出す際には、アドレスにチェーンプレフィックス（例：X-）を含めないでください。

#### **署名**

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

エンコーディングは、任意のバイト、つまり返されるジェネシスバイトに使用するエンコードフォーマットを指定します。「cb58」または「hex」のいずれかを指定します。デフォルトは「cb58」です。

`genesisData`は、次のようなフォームになります。

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

#### **呼び出し例**

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

#### **レスポンス例**

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

指定されたユーザーが管理する新しいアドレスを作成します。

#### **署名**

```cpp
avm.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **呼び出し例**

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

#### **レスポンス例**

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

新たな固定キャップの代替可能アセットを作成します。初期化時に大量に作成され、それ以上は作成されません。このアセットは`avm.send`で送ることができます。

{% page-ref page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

#### **署名**

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

* `name`は、人が解読できる資産の名前です。必ずしも固有のものである必要はありません。
* `symbol`は、資産の略称シンボルです。0～4文字の間で指定します。必ずしも固有のものである必要はありません。省略しても構いません。
* `denomination`は、この資産の残高がどのようにユーザーインターフェースで表示されるかを決定します。`denomination`が0の場合、このアセットの100単位は100として表示されます。`denomination`が1の場合、このアセットの100単位は10.0として表示されます。`denomination`が2の場合、このアセットの100単位は1.00として表示されます。デフォルトは0です。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`と`password`は、トランザクション手数料を支払うユーザーを示します。
* `initialHolders`の各要素は、`address`がジェネシス時に`amount`単位の資産を保有していることを示しています。
* `assetID` は、新しい資産のIDです。

#### **呼び出し例**

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

#### **レスポンス例**

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

[`avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset)で作成した可変キャップ資産のミント単位。

#### **署名**

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

* `assetID`の`amount`単位は、アドレスで作`to`成され、管理されます。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。`username`は、このアセットをさらにミントすることを許可する鍵を所有していなければなりません。つまり、ミンターセットの１つに対して、少なくとも_しきい値_の鍵を管理していなければなりません。
* `txID`は、このトランザクションのIDです。
* `changeAddr`の結果には、変更があった場合の送付先が表示されます。

#### **呼び出し例**

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

#### **レスポンス例**

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

新しい可変キャップの代替可能なアセットを作成します。初期化時には、このアセットの単位は存在しません。ミンターはこのアセットの単位を`avm.mint`を使用してミントすることができます。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

#### **署名**

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

* `name`は、人が解読できる資産の名前です。必ずしも固有のものである必要はありません。
* `symbol`は、資産の略称シンボルです。0～4文字の間で指定します。必ずしも固有のものである必要はありません。省略しても構いません。
* `denomination`は、この資産の残高がどのようにユーザーインターフェースで表示されるかを決定します。デノミネーションが0の場合、この資産の100単位は100と表示されます。デノミネーションが1の場合、この資産の100単位は10.0と表示されます。デノミネーションが2の場合、この資産の100単位は.100などと表示されます。
* `minterSets`は、各要素を指定するリストです。これにより、`minters`のアドレスのうちの`threshold`が、ミントトランザクションに署名することで、一緒にその資産をより多くミントするよう指定できます。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は取引手数料を支払います。
* `assetID`は、新しい資産IDです。
* 結果の`changeAddr`は、変更があった場合に送信されるアドレスです。

#### **呼び出し例**

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

#### **レスポンス例**

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

新しい非代替可能アセットを作成します。初期化時には、このアセットの単位は存在しません。ミンターはこのアセットの単位を`avm.mintNFT`を使用してミントすることができます。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **署名**

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

* `name`は、人が解読できる資産の名前です。必ずしも固有のものである必要はありません。
* `symbol`は、資産の略称シンボルです。0～4文字の間で指定します。必ずしも固有のものである必要はありません。省略しても構いません。
* `minterSets`は、各要素を指定するリストです。これにより、`minters`のアドレスのうちの`threshold`が、ミントトランザクションに署名することで、一緒にその資産をより多くミントするよう指定できます。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は取引手数料を支払います。
* `assetID`は、新しい資産IDです。
* 結果の`changeAddr`は、変更があった場合に送信されるアドレスです。

#### **呼び出し例**

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

#### **レスポンス例**

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

[`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset)で作成された非代替性資産トークンをミントします。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **署名**

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

* `assetID`は、新たに作成されたNFT資産の資産IDです。
* `payload`は、最大1024バイトの任意のペイロードです。そのエンコーディングフォーマットは、`encoding`引数で指定します。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `username`は、トランザクション手数料を支払うユーザーです。`username`は、このアセットをさらにミントすることを許可する鍵を所有していなければなりません。つまり、ミンターセットの１つに対して、少なくとも_しきい値_の鍵を管理していなければなりません。
* `txID`は、このトランザクションのIDです。
* 結果の`changeAddr`は、変更があった場合に送信されるアドレスです。
* `encoding`は、ペイロード引数に使用するエンコーディングフォーマットです。「cb58」または「hex」のいずれかを指定します。デフォルトは「cb58」です。

#### **呼び出し例**

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

#### **レスポンス例**

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

X-ChainからP-ChainまたはC-Chainに非AVAXを送信します。このメソッドを呼び出した後、C-Chain上の[`avax.import`](contract-chain-c-chain-api.md#avax-import)を呼び出して転送を完了させる必要があります。

#### **署名**

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

* `to`は、資産の送信先であるP-ChainまたはC-Chainのアドレスです。
* `amount`は、送信する資産の金額です。
* `assetID`は、送信された資産の資産IDです。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* この資産は、`username`が管理するアドレスから送信されます。
* `txID`は、このトランザクションのIDです。
* `changeAddr`の結果には、変更があった場合の送付先が表示されます。

#### **呼び出し例**

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

#### **レスポンス例**

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

### avm.exportKey

指定されたアドレスを管理する秘密鍵を取得します。返された秘密鍵は、[`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey)でユーザーに追加することができます。

#### **署名**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username`は`address`を管理する必要があります。
* `privateKey`は、`address`を管理する秘密鍵の文字列表現です。

#### **呼び出し例**

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

#### **レスポンス例**

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

指定されたアドレスで管理されているすべての資産の残高を取得します。

#### **署名**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

#### **呼び出し例**

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

#### **レスポンス例**

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

資産の情報を取得します。

#### **署名**

```cpp
avm.getAssetDescription({assetID: string}) -> {
    assetId: string,
    name: string,
    symbol: string,
    denomination: int
}
```

* `assetID`は、情報をリクエストしている資産のIDです。
* `name`は、資産の人間が読める名前ですが、必ずしも一意ではありません。
* `symbol`はその資産のシンボルです。
* `denomination`は、この資産の残高がどのようにユーザーインターフェースで表示されるかを決定します。デノミネーションが0の場合、この資産の100単位は100と表示されます。デノミネーションが1の場合、この資産の100単位は10.0と表示されます。デノミネーションが2の場合、この資産の100単位は.100などと表示されます。

#### **呼び出し例**

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

#### **レスポンス例**

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

指定したアドレスで管理している資産の残高を取得します。

#### **署名**

```cpp
avm.getBalance({
    address: string,
    assetID: string
}) -> {balance: int}
```

* `address`資産の所有者
* `assetID`残高がリクエストされた資産のID

#### **呼び出し例**

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

#### **レスポンス例**

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

### avm.getAddressTxs<a id="avm-get-address-txs-api"></a>

指定されたアドレスの残高を変更した全てのトランザクションを返します。どちらかが当てはまれば、トランザクションはアドレスのバランスを変更します。

* トランザクションが消費するUTXOは、少なくとも部分的にアドレスが所有していました。
* トランザクションが生成するUTXOは、少なくとも部分的にはアドレスが所有しています。

注意：X-chainの設定でインデックス（`index-transactions`）を有効にする必要があります。

#### **署名**

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

* `address`：関連するトランザクションを取得しているアドレス
* `assetID`: この資産の残高を変更したトランザクションのみを返します。アセットのIDまたはエイリアスでなければなりません。
* `pageSize`：1ページあたりに返すアイテムの数。オプションです。デフォルトは1024です。

**レスポンスパラメータ**

* `txIDs`：このアドレスの残高に影響を与えたトランザクションIDのリストです。
* `cursor`ページ番号あるいはオフセット。次のページを取得するリクエストでこれを使用します。

#### **呼び出し例**

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

#### **レスポンス例**

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

指定したトランザクションを返します。`encoding`パラメータセットは、返すトランザクションのフォーマットを設定します。`"cb58"`、`"hex"`または`"json"`を指定します。デフォルトは「cb58」です。

#### **署名**

```cpp
avm.getTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **呼び出し例**

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

#### **レスポンス例**

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

ネットワークに送信されたトランザクションのステータスを取得します。

#### **署名**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`status`は、次の内の1つです。

* `Accepted`：すべてのノードがトランザクションを受け入れます（または受け入れることになります）
* `Processing`：トランザクションは、このノードが決定します
* `Rejected`：ネットワーク上のどのノードもそのトランザクションを受け入れません
* `Unknown`：トランザクションがこのノードで認識されていません

#### **呼び出し例**

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

#### **レスポンス例**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

### avm.getUTXOs

指定アドレスを参照するUTXOを取得します。sourceChainが指定されている場合は、そのチェーンからX-ChainにエクスポートされたアトミックUTXOを取得します。

#### **署名**

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

* `utxos`は、各UTXOが`addresses`の少なくとも1つのアドレスを参照するようなUTXOのリストです。
* 最大`limit`で、UTXOが返されます。`limit`が省略された場合や1024より大きい場合は、1024に設定されます。
* このメソッドはページネーションをサポートしています。`endIndex`は、最後に返されたUTXOを表示します。次のセットのUTXOを取得するには、次の呼び出しで、`endIndex`の値を`startIndex`として使用します。
* `startIndex`が省略された場合は、`limit`までのUTXOをすべて取得します。
* ページネーションを使用する場合（`startIndex`が提供されている場合）、UTXOは複数回の呼び出しで一意であることは保証されません。つまり、UTXOが最初の呼び出しの結果に現れ、その後、2回目の呼び出しで再び現れる可能性があります。
* ページネーションを使用する場合、複数回の呼び出しでの一貫性は保証されません。
   つまり、アドレスのUTXOセットが呼び出しの間に変更されている可能性があります。
* `encoding`は、返されるUTXOのフォーマットを設定します。「cb58」または「hex」のいずれかを指定します。デフォルトは「cb58」です。

#### **例**

`X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`と`X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz`の少なくとも1つを参照するすべてのUTXOが欲しいとします。

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

これでレスポンスが得られます。

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

`numFetched`は`limit`と同じなので、フェッチされなかったUTXOがさらにあるのではないかと考えられます。今回は`startIndex`で、このメソッドを再度呼び出します。

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

これでレスポンスが得られます。

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

`numFetched`が`limit`よりも小さいので、UTXOの取得が完了したことがわかり、このメソッドを再度呼び出す必要はありません。

ImportTxを構築するために、P-ChainからX-ChainにエクスポートしたUTXOを取得したいとします。次に、アトミックUTXOを取得するためには、sourceChain引数でGetUTXOを呼び出す必要があります。

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

これでレスポンスが得られます。

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

P-ChainまたはC-ChainからX-ChainへのAVAXの転送を確定します。このメソッドが呼び出される前に、P-Chainの[`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax)あるいはC-Chainの[`avax.export`](contract-chain-c-chain-api.md#avax-export)メソッドを呼び出して転送を開始する必要があります。

#### **署名**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to`は、AVAXが送信されたアドレスです。これは、P-Chainの`exportAVAX`、あるいはC-Chainの`export`に対応する呼び出しの`to`引数と同じでなければなりません。
* `sourceChain`は、AVAXをインポートするチェーンのIDまたはエイリアスです。C-Chainから資金をインポートする場合は、`"C"`を使用します。
* `username`は、`to`を管理するユーザーです。
* `txID`は新しく作成されたアトミックトランザクションのIDです。

#### **呼び出し例**

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

#### **レスポンス例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2gXpf4jFoMAWQ3rxBfavgFfSdLkL2eFUYprKsUQuEdB5H6Jo1H"
    },
    "id": 1
}
```

### avm.importKey

アドレスを管理する秘密鍵を提供することで、ユーザーがアドレスの管理をできるようにします。

#### **署名**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* `username`の秘密鍵のセットに`privateKey`を追加します。`address`は、現在`username`が秘密鍵で管理しているアドレスです。

#### **呼び出し例**

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

#### **レスポンス例**

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

署名付きのトランザクションをネットワークに送信します。`encoding`では、署名付きトランザクションのフォーマットを指定します。「cb58」または「hex」のいずれかを指定します。デフォルトは「cb58」です。

#### **署名**

```cpp
avm.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **呼び出し例**

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

#### **レスポンス例**

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

指定ユーザーが管理するアドレスを一覧表示します。

#### **署名**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **呼び出し例**

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

#### **レスポンス例**

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

資産の数量をあるアドレスに送ります。

#### **署名**

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

* `assetID`のIDを持つ`amount`単位のアセットを`to`のアドレスに送信します。`amount`は、そのアセットの最小単位で表示されます。AVAXの場合、これは１nAVAX（１AVAXの10憶分の１）です。
* `to`は、資産の送信先であるX-Chainアドレスです。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `memo`を添付することができ、その長さは最大256バイトまで可能です。
* ユーザー`username`が管理するアドレスからアセットを送信します。（もちろん、そのユーザーは、少なくとも送信されるアセットの残高を保持している必要があります。）

#### **呼び出し例**

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

#### **レスポンス例**

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

### avm.sendMultiple

所有するアドレスのリストから指定アドレスに、`amount`の`assetID`の転送を複数回行います。

#### **署名**

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

* `outputs`は、`assetID`、`amount`、`to`をそれぞれ含むオブジェクトリテラルの配列です。
* `memo`はオプションのメッセージで、その長さは最大256バイトまでです。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* ユーザー`username`が管理するアドレスからアセットを送信します。（もちろん、そのユーザーは、少なくとも送信されるアセットの残高を保持している必要があります。）

#### **呼び出し例**

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

#### **レスポンス例**

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

非代替性トークンを送ります。

#### **署名**

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

* `assetID`は、送信されるNFTの資産IDです。
* `groupID`は、NFTを送信するための送信元NFTグループです。NFTの作成では、1つのNFT IDの下に複数のグループを作成することができます。各グループに対して複数のNFTを発行することができます。
* `to`は、NFTの送信先であるX-Chainアドレスです。
* `from`は、この操作に使用したいアドレスです。省略された場合は、必要に応じて自分のアドレスのいずれかを使用します。`changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* ユーザー`username`が管理するアドレスからアセットを送信します。（もちろん、そのユーザーは、少なくとも送信されるNFTの残高を保持している必要があります。）

#### **呼び出し例**

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

#### **レスポンス例**

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

署名付きのトランザクションをネットワークに送信し、トランザクションが受け入れられると仮定します。`encoding`では、署名付きトランザクションのフォーマットを指定します。「cb58」または「hex」のいずれかを指定します。デフォルトは「cb58」です。

この呼び出しはウォレットAPIエンドポイントに対して行われます。

`/ext/bc/X/wallet`

#### 署名

```cpp
wallet.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### 呼び出し例

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

#### レスポンス例

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

資産の量をあるアドレスに送信し、そのトランザクションが受け入れられると仮定することで、今後の呼び出しでは修正されたUTXOセットを使用することができます。

この呼び出しはウォレットAPIエンドポイントに対して行われます。

`/ext/bc/X/wallet`

#### **署名**

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

* `assetID`のIDを持つ`amount`単位のアセットを`to`のアドレスに送信します。`amount`は、その資産の最小単位で表示されます。AVAXの場合、これは１nAVAX（１AVAXの10憶分の１）です。
* `to`は、資産の送信先であるX-Chainアドレスです。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `memo`を添付することができ、その長さは最大256バイトまで可能です。
* ユーザー`username`が管理するアドレスからアセットを送信します。（もちろん、そのユーザーは、少なくとも送信されるアセットの残高を保持している必要があります。）

#### **呼び出し例**

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

#### **レスポンス例**

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

`assetID`の`amount`の転送を、所有するアドレスのリストから指定アドレスに複数回送信し、そのトランザクションが受け入れられると仮定することで、以降の呼び出しで変更されたUTXOセットを使用することができます。

この呼び出しはウォレットAPIエンドポイントに対して行われます。

`/ext/bc/X/wallet`

#### **署名**

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

* `outputs`は、`assetID`、`amount`、`to`をそれぞれ含むオブジェクトリテラルの配列です。
* `from`は、この操作に使用したいアドレスです。省略した場合は、必要に応じて自分のアドレスのいずれかを使用します。
* `changeAddr`は、変更が行われた場合に送信されるアドレスです。省略した場合は、ユーザーが管理するいずれかのアドレスに送信されます。
* `memo`を添付することができ、その長さは最大256バイトまで可能です。
* ユーザー`username`が管理するアドレスからアセットを送信します。（もちろん、そのユーザーは、少なくとも送信されるアセットの残高を保持している必要があります。）

#### **呼び出し例**

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

#### **レスポンス例**

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

指定したアドレスのトランザクションをリスンします。

この呼び出しは、イベントAPIエンドポイントに対して行われます。

`/ext/bc/X/events`

#### **Golangの例**

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
| **NewSet** | 新しいアドレスマップセットの作成 | {"newSet":{}} |  |
| **NewBloom** | 新しいブルームセットを作成します。 | {"newBloom":{"maxElements":"1000","collisionProb":"0.0100"}} | maxElements - フィルター内の要素数は0以上でなければなりません、collisionProb - 許容される衝突確率は0以上、<= 1でなければなりません |
| **AddAddresses** | セットにアドレスを追加する | {"addAddresses":{"addresses":["X-fuji..."]}} | addresses - マッチするアドレスのリスト |

**NewSet**または**NewBloom**を呼び出すとフィルタがリセットされるため、続いて**AddAddresses**を呼び出す必要があります。**AddAddresses**は、複数回呼び出すことができます。

**セット内容**

* **NewSet**は絶対的なアドレス照合を行い、アドレスがアドレスセットに含まれていれば、トランザクションを行います。
* **NewBloom**の[ブルームフィルタリング](https://en.wikipedia.org/wiki/Bloom_filter)では、誤検知の可能性がありますが、より多くのアドレスをフィルタリングすることができます。そのアドレスがフィルターに入っていれば、トランザクションが送信されます。

#### **レスポンス例**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```

