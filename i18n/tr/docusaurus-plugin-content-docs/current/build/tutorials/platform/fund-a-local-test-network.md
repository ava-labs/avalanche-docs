# Yerel Bir Test Ağının Fonlanması

## Giriş

[Yerel Test Ağı Yaratma](create-a-local-test-network.md) başlıklı eğitim makalesinde 5 düğümlü bir test ağının nasıl kullanıma sunulacağını göstermiştik. Yerel ağınızı yarattıktan sonraki ilk adım, işlemler yaratmaya ve akıllı sözleşmeler ile etkileşim kurmaya başlayabilmeniz için bir adresi fonlamaktır.

X-Chain, C-Chain ve P-Chain üzerindeki fonlara erişim için önceden fonlanmış bir özel anahtarı \(private key\) nasıl kullanacağınızı göstereceğiz. **NOT** bu aynı özel anahtar, yani `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`, [AvalancheJS](../../tools/avalanchejs/README.md) kullanılarak yerel olarak işlemler imzalamak için kullanılabilir. Bu fonlara erişim için anahtarı yerel keystore'a aktarmanıza gerek yok. Bunlar her bir ilgili zincir için genesis verteks \(kesişim noktası veya düğüm\) ve blok içinde bulunurlar.

## Bir Kullanıcı Yaratma

Yerel keystore'da bir kullanıcı yaratmak için önce `keystore.createUser` komutunu çalıştırın.

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

Ardından, önceden fonlanmış özel anahtarı `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`-&mdash;olarak da bilinir- `ewoq`varsayılan subnet üzerindeki 3 blok zincirden herhangi birine aktarabilirsiniz. Anahtarı içe aktardıktan sonra bakiyeyi kontrol ederek anahtarın doğru çalıştığını doğrulayabilirsiniz.

## X-Chain

`ewoq`'un [X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.mdx)'e aktarılması.

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

### X-Chain bakiyesinin kontrol edilmesi

Şimdi X-Chain'de `X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u` adresinde 300 milyonluk bir AVAX bakiyesi olduğunu doğrulayın.

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

`ewoq`'un [C-Chain](../../avalanchego-apis/contract-chain-c-chain-api.md)'e aktarılması.

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

### C-Chain bakiyesinin kontrol edilmesi

C-Chain'de `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` adresinde 50 milyonluk \(hex'te, yani on altılık sayı sistemde 0x295be96e64066972000000\) bir AVAX bakiyesi bulunduğunu doğrulayın.

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

### MetaMask ile entegre etme

Bu hesabı Metamask'da görmek için şu adımları takip edin:

* [Bu adımı](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md#local-testnet-avash-settings-avash-tutorial) takip ederek Metamask'ı kurun ve bir `Avalanche Local` ağı yaratın.
* Bu özel anahtar `0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`'ı Metamask'a aktararak yeni bir hesap oluşturun

![](/img/Metamask-Import-Account.png)

* Şimdi bu yeni oluşturulan hesabın bakiyesini `Avalanche Local`'de görebilirsiniz

![](/img/local-pre-funded-account.png)

## P-Chain

`ewoq`'u [P-Chain](../../avalanchego-apis/platform-chain-p-chain-api.md)'e aktarın.

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

### P-Chain bakiyesini kontrol etme

P-Chain'de `P-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u` adresinde 30 milyonluk bir AVAX bakiyesi olduğunu doğrulayın. 20 milyon kilitsiz, 10 milyon kilitli ve stake edilebilir olmalıdır.

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

