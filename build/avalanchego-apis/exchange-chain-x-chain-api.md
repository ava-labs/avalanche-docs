---
description: X-Chain 是 Avalanche 虚拟机（AVM） 的实例。
---

# 交换链 \(X-Chain\) API

[X-Chain](../../learn/platform-overview/#exchange-chain-x-chain) 是 Avalanche 创建和交易资产的原生平台，是 Avalanche 虚拟机（AVM） 的实例。此 API 允许客户在 X-Chain 和 AVM 的其他实例上创建和交易资产。

{% embed url="https://www.youtube.com/watch?v=rD-IOd1nvFo" caption="" %}

## 格式

本 API 使用 `json 2.0`RPC 格式。有关进行 JSON  RPC 调用的更多信息，请参阅[此处](issuing-api-calls.md)。

## 端点

`/ext/bc/X`与 X-Chain 交互。

`/ext/bc/blockchainID`与其它 AVM 实例交互，  其中，`blockchainID`为运行 AVM 的区块链的 ID 。

## 方法

### avm.buildGenesis

鉴于此虚拟机的 genesis 状态的 JSON 表达式，请创建该状态的字节表达式。

#### **端点**

本调用是针对 AVM 的静态 API 端点：

`/ext/vm/avm`

注意：地址在调用静态 API 端点时不应该包含链前缀（比如 X-\)，因为这些前缀引用特定的链。

#### **签名**

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

编码指定了用于任意字节（比如返回的 genesis 字节）的编码格式。可以是“cb58”或“hex”。默认为“cb58”。

`genesisData`有此形式：

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

#### **示例调用**

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

#### **示例响应**

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

创建由给定用户控制的新地址。

#### **签名**

```cpp
avm.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **示例调用**

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

#### **示例响应**

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

创建新的固定资本、可替换资产。在初始化时创建一定的数量，然后不再创建了。可以用 `avm.send` 发送资产。

{% page-ref page="../tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

#### **签名**

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

* `name` 是人类可读的资产名称。未必具有唯一性。
* `symbol` 是该资产的简短符号。介于 0 到 4 个字符之间。未必具有唯一性。可以被省略。
* `denomination` 决定如何通过用户界面显示该资产的余额。如果 `denomination` 是 0，则本资产的 100 单位将被显示为 100。如果 `denomination` 是 1，则本资产的 100 单位将被显示为 10.0。如果 `denomination` 是 2，则本资产的 100 单位将被显示为 1.00 等。默认为 0。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* `username` 和 `password` 表示支付交易费的用户。
* `initialHolders` 中的每个元素指定 `address` 在 genesis 时持有的 `amount` 资产单位。
* `assetID` 是新资产的 ID。

#### **示例调用**

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

#### **示例响应**

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

使用 [ `avm.createVariableCapAsset`](exchange-chain-x-chain-api.md#avm-createvariablecapasset) 创建的可变资本资产的铸币单位。

#### **签名**

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

* 通过地址 `to` 创建和控制的 `amount` 单位 `assetID`。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* `username` 是支付交易费的用户，`username` 必须持有授予权限以铸造更多此类资产的密钥。也就是说，它必须至少控制一个 minter 集的_阈值_密钥。
* `txID` 是此交易的 ID。
* 结果中的 `changeAddr` 是发送任何更改的地址。

#### **示例调用**

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

#### **示例响应**

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

创建新的可变资本、可替换资产。初始化时不存在任何单位的资产。铸币厂可以使用 `avm.mint` 铸造此资产。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-variable-cap-asset.md" %}

#### **签名**

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

* `name` 是人类可读的资产名称。未必具有唯一性。
* `symbol` 是该资产的简短符号。介于 0 到 4 个字符之间。未必具有唯一性。可以被省略。
* `denomination` 决定如何通过用户界面显示该资产的余额。如果面值为 0，则本资产的 100 单位将显示为 100 。如果面值为 1，则本资产的 100 单位将显示为 10.0。如果面值为 2，则本资产的 100 单位将显示为.100，以此类推。
* `minterSets` 是一个列表，其中每个元素指定的 `minters` 中的地址的 `threshold` 可以通过签署铸币交易一起铸造更多资产。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* `username` 支付交易费。
* `assetID` 是新资产的 ID。
* 结果中的 `changeAddr` 是发送任何更改的地址。

#### **示例调用**

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

#### **示例响应**

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

创建新的非同质化资产。初始化时不存在任何单位的资产。铸币厂可以使用 `avm.mintNFT` 铸造此资产。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **签名**

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

* `name` 是人类可读的资产名称。未必具有唯一性。
* `symbol` 是该资产的简短符号。介于 0 到 4 个字符之间。未必具有唯一性。可能被省略。
* `minterSets` 是一个列表，其中每个元素指定的 `minters` 中的地址的 `threshold` 可以通过签署铸币交易一起铸造更多资产。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* `username` 支付交易费。
* `assetID` 是新资产的 ID。
* 结果中的 `changeAddr` 是发送任何更改的地址。

#### **示例调用**

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

#### **示例响应**

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

铸造非同质化代币，该代币用 [`avm.createNFTAsset`](exchange-chain-x-chain-api.md#avm-createnftasset) 创建。

{% page-ref page="../tutorials/smart-digital-assets/creating-a-nft-part-1.md" %}

#### **签名**

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

* `assetID` 是新创建的 NFT 资产的 assetID。
* `payload` 是长达 1024 字节的任意有效载荷。其编码格式由 `encoding` 参数指定。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* `username` 是支付交易费的用户，`username` 必须持有授予权限以铸造更多此类资产的密钥。也就是说，它必须至少控制一个 minter 集的_阈值_密钥。
* `txID` 是此交易的 ID。
* 结果中的 `changeAddr` 是发送任何更改的地址。
* `encoding` 是用于有效载荷参数的编码格式。可以是“cb58”或“hex”。默认为“cb58”。

#### **示例调用**

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

#### **示例响应**

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

从 X-Chain 发送一个 non-AVAX 到 P-Chain 或 C-Chain.。调用本方法后，您必须调用 C-Chain 上的 [`avax.import`](contract-chain-c-chain-api.md#avax-import) 以完成转移。

#### **签名**

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

* `to` 是资产发送到的 P-Chain 或 C-Chain 地址。
* `amount` 是要发送的资产数量。
* `assetID` 是发送资产的资产 ID。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* 资产从 `username` 控制的地址发送
* `txID` 是此交易的 ID。
* 结果中的 `changeAddr` 是发送任何更改的地址。

#### **示例调用**

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

#### **示例响应**

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

获取控制给定地址的私钥。可以使用 [`avm.importKey`](exchange-chain-x-chain-api.md#avm-importkey) 将返回的私钥添加到用户。

#### **签名**

```cpp
avm.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username` 必须控制 `address`。
* `privateKey` 是控制 `address` 的私钥的字符串表达式。

#### **示例调用**

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

#### **示例响应**

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

获取由给定地址控制的所有资产的余额。

#### **签名**

```cpp
avm.getAllBalances({address:string}) -> {
    balances: []{
        asset: string,
        balance: int
    }
}
```

#### **示例调用**

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

#### **示例响应**

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

获取有关资产的信息。

#### **签名**

```cpp
avm.getAssetDescription({assetID: string}) -> {
    assetId: string,
    name: string,
    symbol: string,
    denomination: int
}
```

* `assetID` 是请求其信息的资产的 id。
* `name` 是人类可读的资产名称，未必是唯一的名称。
* `symbol` 是资产的符号。
* `denomination` 决定如何通过用户界面显示该资产的余额。如果面值为 0，则本资产的 100 单位将显示为 100 。如果面值为 1，则本资产的 100 单位将显示为 10.0。如果面值为 2，则本资产的 100 单位将显示为 .100。

#### **示例调用**

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

#### **示例响应**

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

获取由给定地址控制的资产的余额。

#### **签名**

```cpp
avm.getBalance({
    address: string,
    assetID: string
}) -> {balance: int}
```

* 资产的 `address` 所有者
* `assetID` 是请求其余额的资产的 id

#### **示例调用**

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

#### **示例响应**

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

### avm.getAddressTxs <a id="avm-get-address-txs-api"></a>

返回所有更改给定地址的余额的交易。据说，如果任何一项为真，交易会更改地址的余额：

* 交易消耗的 UTXO 至少部分由该地址拥有。
* 交易产生的 UTXO 至少部分由该地址拥有。

注意：必须在 X-chain 配置中启用索引（`index-transactions`）。

#### **签名**

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

**请求参数**

* `address`：我们获取相关交易的地址
* `assetID`：仅返回更改了该资产余额的交易。必须是资产的 ID 或别名。
* `pageSize`：每个页面返回的项目数量。可选。默认为 1024。

**响应参数**

* `txIDs`：影响此地址余额的交易 ID 列表。
* `cursor`：页码或抵销。在请求中使用这个来获取下一页。

#### **示例调用**

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

#### **示例响应**

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

返回指定交易。`encoding` 参数设置返回交易的格式。可以是 `"json"`、`"cb58"` 或 `"hex"`。默认为“cb58”。

#### **签名**

```cpp
avm.getTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **示例调用**

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

#### **示例响应**

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

获取发送到网络的交易状态。

#### **签名**

```cpp
avm.getTxStatus({txID: string}) -> {status: string}
```

`status` 是其中之一：

* `Accepted`：交易已被（或将要被）每个节点接受
* `Processing`：交易正在由此节点投票表决
* `Rejected`：交易永远不会被网络中的任何节点接受
* `Unknown`：交易尚未被此节点查看

#### **示例调用**

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

#### **示例响应**

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

获取引用给定地址的 UTXO。如果指定了 sourceChain，那么它将检索从该链导出到 X Chain 的原子 UTXO。

#### **签名**

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

* `utxos` 是一个 UTXO 列表，以便每个 UTXO 在 `addresses` 中引用至少一个地址。
* 最多返回 `limit` 个 UTXO。如果 `limit` 被省略或大于 1024，则将其设置为 1024。
* 本方法支持页码。`endIndex` 表示最后一次返回的 UTXO。要获取下一个 UTXO 集，请在下次调用中使用 `endIndex` 的值作为 `startIndex`。
* 如果 `startIndex` 被省略，将获取所有 UTXO，最多 `limit` 个。
* 当使用页码时（提供 `startIndex` 时），无法保证 UTXO 在多个调用中是唯一的。也就是说，一个 UTXO 可能出现在第一次调用的结果中，然后在第二次调用中再次出现。
* 使用页码时，不能保证多个调用之间的一致性。也就是说，地址的 UTXO 集可能在调用之间发生变化。
* `encoding` 设置返回的 UTXO 的格式。可以是“cb58”或“hex”。默认为“cb58”。

#### **示例**

假设我们希望至少引用一个 `X-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf` 和 `X-avax1x459sj0ssujguq723cljfty4jlae28evjzt7xz` 的所有 UTXO。

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

这给出响应：

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

由于 `numFetched` 与 `limit` 相同，我们可以判断可能有更多未提取的 UTXO。我们再次调用方法，这次通过 `startIndex` 调用：

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

这给出响应：

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

由于 `numFetched` 小于 `limit`，我们知道我们已经完成了 UTXO 的获取，无需再次调用本方法。

假设我们想获取从 P Chain 导出到 X Chain 的 UTXO，以创建 ImportTx。然后，我们需要使用 sourceChain 参数调用 GetUTXO，以便检索原子 UTXO：

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

这给出响应：

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

最后完成从 P-Chain 或 C-Chain 到 X-Chain 的 AVAX 转移。调用此方法之前，您必须调用 P-Chain 的 [`platform.exportAVAX`](platform-chain-p-chain-api.md#platform-exportavax) 方法或 C-Chain 的 [`avax.export`](contract-chain-c-chain-api.md#avax-export) 方法以启动转移。

#### **签名**

```cpp
avm.import({
    to: string,
    sourceChain: string,
    username: string,
    password: string,
}) -> {txID: string}
```

* `to` 是 AVAX 发送到的地址。这必须与 P-Chain 的 `exportAVAX` 或 C-Chain 的 `export` 的相应调用中的 `to` 参数相同。
* `sourceChain` 是导入 AVAX 所在的链的 ID 或别名。要从 C-Chain 导入资金，请使用 `"C"`。
* `username` 是控制 `to` 的用户。
* `txID` 是新创建的原子交易的 ID。

#### **示例调用**

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

#### **示例响应**

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

通过提供控制地址的私钥，让用户控制该地址。

#### **签名**

```cpp
avm.importKey({
    username: string,
    password: string,
    privateKey: string
}) -> {address: string}
```

* 将 `privateKey` 添加到 `username` 的私钥集 。`address` 是现在通过私钥控制的地址 `username`。

#### **示例调用**

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

#### **示例响应**

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

将签名交易发送到网络。`encoding` 指定签名交易的格式。可以是“cb58”或“hex”。默认为“cb58”。

#### **签名**

```cpp
avm.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **示例调用**

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

#### **示例响应**

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

列出由给定用户控制的地址。

#### **签名**

```cpp
avm.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **示例调用**

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

#### **示例响应**

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

将资产数量发送到一个地址。

#### **签名**

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

* 通过 ID `assetID` 发送 `amount` 单位的资产，以处理  `to`。`amount` 以资产的最小增量为单位。对于 AVAX，这是 1 nAVAX（十亿分之 1 AVAX。）
* `to` 是资产被发送到的 X-Chain 地址。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* 您可以附加一个 `memo`，其长度最多为 256 字节。
* 资产从用户 `username` 控制的地址发送。（当然，该用户需要至少持有正在发送的资产的余额。）

#### **示例调用**

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

#### **示例响应**

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

将 `assetID` 的 `amount`多次转移发送到一份所拥有地址列表中的指定地址。

#### **签名**

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

* `outputs`是一组包含`assetID`、`amount`和`to`的对象字面量。
* `memo` 是一个可选消息，其长度最多为 256 字节。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* 资产从用户 `username` 控制的地址发送。（当然，该用户需要至少持有正在发送的资产的余额。）

#### **示例调用**

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

#### **示例响应**

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

发送非同质化代币。

#### **签名**

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

* `assetID` 是正在发送的 NFT 的资产 ID。
* `groupID` 是发送 NFT 的 NFT 组。
   NFT 允许在每个 NFT ID 下创建多个组。您可以向每个组发出多个 NFT。
* `to` 是 NFT 被发送到的 X-Chain 地址。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。`changeAddr` 是任何更改将发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* 资产从用户 `username` 控制的地址发送。（当然，该用户需要至少持有正在发送的 NFT 的余额。）

#### **示例调用**

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

#### **示例响应**

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

将签名交易发送到网络，并假设 tx 被接受。`encoding` 指定签名交易的格式。可以是“cb58”或“hex”。默认为“cb58”。

本调用是针对钱包 API 端点的：

`/ext/bc/X/wallet`

#### 签名

```cpp
wallet.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### 示例调用

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

#### 示例响应

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

将一定数量资产发送到一个地址，并假设 tx 将被接受，这样未来调用可以使用经修改的 UTXO 集。

本调用是针对钱包 API 端点的：

`/ext/bc/X/wallet`

#### **签名**

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

* 通过 ID `assetID` 发送 `amount` 单位的资产，以处理  `to`。`amount` 以资产的最小增量为单位。对于 AVAX，这是 1 nAVAX（十亿分之 1 AVAX。）
* `to` 是资产被发送到的 X-Chain 地址。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* 您可以附加一个 `memo`，其长度最多为 256 字节。
* 资产从用户 `username` 控制的地址发送。（当然，该用户需要至少持有正在发送的资产的余额。）

#### **示例调用**

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

#### **示例响应**

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

将 `assetID` 的 `amount` 多次转移发送到一份所拥有地址列表中的指定地址，并假设 tx 被接受，以便今后的调用可以使用修改的 UTXO 集。

本调用是针对钱包 API 端点的：

`/ext/bc/X/wallet`

#### **签名**

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

* `outputs`是一组包含`assetID`、`amount`和`to`的对象字面量。
* `from` 是您想用于本操作的地址。如果被省略，请根据需要使用您的任何地址。
* `changeAddr` 是任何更改将被发送到的地址。如果被省略，则将更改发送到由用户控制的其中一个地址。
* 您可以附加一个 `memo`，其长度最多为 256 字节。
* 资产从用户 `username` 控制的地址发送。（当然，该用户需要至少持有正在发送的资产的余额。）

#### **示例调用**

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

#### **示例响应**

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

### 事件

监听指定地址上的交易。

本调用针对事件 API 端点：

`/ext/bc/X/events`

#### **Golang 示例**

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

**操作**

| 命令 | 描述 | 示例 | 参数 |
| :--- | :--- | :--- | :--- |
| **NewSet** | 创建新地址地图集。 | {"newSet":{}} |  |
| **NewBloom** | 创建新的 bloom 集。 | {"newBloom":{"maxElements":"1000","collisionProb":"0.0100"}} | maxElements - 过滤器中的元素数量必须 > 0 collisionProb - 允许的碰撞概率必须 > 0 和 <= 1 |
| **AddAddresses** | 将地址添加到集 | {"addAddresses":{"addresses":["X-fuji..."]}} | 地址 - 要匹配的地址列表 |

调用 **NewSet **或 **NewBloom ** 会重置过滤器，必须使用 **AddAddresses ** 进行跟踪。**AddAddresses ** 可以被多次调用。

**设置详细信息**

* **NewSet** 执行绝对地址匹配，如果地址在集合中，您将会收到交易。
* **NewBloom [Bloom 过滤](https://en.wikipedia.org/wiki/Bloom_filter)** 可以产生误报，但可以允许过滤更多的地址。如果地址在过滤器中，您将会收到交易。

#### **示例响应**

```cpp
2021/05/11 15:59:35 {"txID":"22HWKHrREyXyAiDnVmGp3TQQ79tHSSVxA9h26VfDEzoxvwveyk"}
```

