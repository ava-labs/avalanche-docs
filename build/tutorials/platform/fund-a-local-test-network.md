# 资助一个本地测试网络

## 简介

在[创建本地测试网络](create-a-local-test-network.md)中，我们向您展示了如何启动一个五节点本地测试网络。您有本地网络后，下一步将为地址注资，这样您可以开始创建交易并与智能合约交互。

我们将向您展示如何利用预先注资的私钥来访问 X-Chain、C-Chain 和 P-Chain 上的资金。**请注意**相同的私钥 `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN` 可以使用 [AvalancheJS](../../tools/avalanchejs/) 对 txs 进行本地签名。您不需要将密钥导入本地密钥库才能访问这些资金。它们位于每个相应链的创世顶点和区块中。

## 创建用户

首先运行 `keystore.createUser`以在本地密钥库中创建用户。

```text
curl --location --request POST '127.0.0.1:9650/ext/keystore' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username": "username",
        "password": "password"
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

接下来，您可以将预先注资的私钥，即 `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`—即 `ewoq` 导入到默认子网上的 3 个区块链中的任何一个。导入密钥后，您可以查看余额，以确认其正常。

## X-Chain

将 `ewoq`导入到 [X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md) 中。

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username": "username",
        "password": "password",
        "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "address": "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
    },
    "id": 1
}
```

### 查看 X-Chain 余额

确认 `X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u` 地址现在在 X-Chain 上有 300m AVAX 的余额。

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
      "assetID": "AVAX"
  }
} '

{
    "jsonrpc": "2.0",
    "result": {
        "balance": "300000000000000000",
        "utxoIDs": [
            {
                "txID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
                "outputIndex": 1
            }
        ]
    },
    "id": 1
}
```

## C-Chain

将 `ewoq` 导入到 [C-Chain](../../avalanchego-apis/contract-chain-c-chain-api.md)。

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/C/avax' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "avax.importKey",
    "params": {
        "username":"username",
        "password":"password",
        "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    },
    "jsonrpc": "2.0",
    "id": 1
}'

{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
    },
    "id": 1
}
```

### 查看 C-Chain 余额

确认 `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` 地址在 C-Chain 上有 50m（0x295be96e64066972000000 为十六进制格式） AVAX 的余额。

```text
curl --location --request POST 'localhost:9650/ext/bc/C/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
        "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
        "latest"
    ],
    "id": 1
}'

{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x295be96e64066972000000"
}
```

### 集成 MetaMask

要在 Metamask 上查看此账户，请按照以下步骤操作：

* 按照[此步骤](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md#local-testnet-avash-settings-avash-tutorial)设置 Metamask，并创建 `Avalanche Local` 网络。
* 通过在 Metamask 上导入此私钥 `0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`，创建一个新账户

![](../../../.gitbook/assets/Metamask-Import-Account.png)

* 现在您可以在 `Avalanche Local`上查看此新建账户的余额

![](../../../.gitbook/assets/local-pre-funded-account.png)

## P-Chain

将 `ewoq`导入到 [P-Chain](../../avalanchego-apis/platform-chain-p-chain-api.md) 中。

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username":"username",
        "password":"password",
        "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
    },
    "id": 1
}
```

### 查看 P-Chain 余额

确认 `P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u` 地址在 P-Chain 上有 30m AVAX 的余额。20m 应该解锁，并且 10m 应该锁定和可质押。

```text
curl --location --request POST '127.0.0.1:9650/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBalance",
    "params" :{
      "address":"P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"    
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "balance": "30000000000000000",
        "unlocked": "20000000000000000",
        "lockedStakeable": "10000000000000000",
        "lockedNotStakeable": "0",
        "utxoIDs": [
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 1
            },
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

