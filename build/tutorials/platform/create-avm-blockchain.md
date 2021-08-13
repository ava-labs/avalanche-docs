# AVM'yi çalıştıran bir Blok zinciri oluştur

## Tanıştırma

of temel özelliklerinden biri yeni blok zincirleri oluşturma yeteneğidir. Avalanche yeni örnekleri [Avalanche Sanal Makinesi \(AVM\)](../../../learn/platform-overview/#exchange-chain-x-chain) oluşturulmasını destekler. Bu özel derslerde, AVM'nin yeni bir örneğini oluşturarak bir blok zinciri oluşturacağız.

Özel blok zincirleri inşa etmek istiyorsanız [Virtual Machine \(VM\)](create-a-virtual-machine-vm.md) oluşturun ve [Özel Blok zinciri oluşturun](create-a-virtual-machine-vm.md).

### Ön şartlar

Bir çalıştırma düğümü, düğümdeki bir kullanıcı ve kullanıcının kontrol ettiği adreste AVAX olması gerek. Bunların hepsi ["Koş"](../nodes-and-staking/run-avalanche-node.md) ile kaplıdır.

Sırada, [ilkel](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) Ağ'da bir onaylayıcı olmak için düğümünü kullanmalısın. [Bunu bir onaylayıcı](../nodes-and-staking/add-a-validator.md) özel ders olarak nasıl yapılacağını öğrenebilirsin. [Bunu API çağrılarıyla](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) yapmanızı tavsiye eder. Çünkü bu ders için düğümle bu şekilde etkileşime gireceksiniz.

## Subnet oluştur

Her blok zinciri [bir alt ağ](../../../learn/platform-overview/#subnets) tarafından onaylanır. Bir blok zinciri oluşturmadan önce, bunu onaylamak için bir subnet ihtiyacınız olacak. Kontrol anahtarlarının yeterli sayısına sahip olduğu bir subnet da kullanabilirsiniz.

{% page-ref % }

### Subnet Geçerli Yazılar Ekle

Alt ağ blok zincirlerini doğrulamak için geçerli The ihtiyaç duyar.

{% page-ref page="../nodes-and-staking/add-a-validator.md"

## Genesis Verisi Oluştur<a id="create-the-genesis-data"></a>

Her blok zincirinin yaratıldığında bazı genez durumu vardır. Her VM genesis verisinin biçimi ve semantik tanımlar. AVM ve Coreth, bir blok zincirinin of JSON temsilini alan ve bu durumun byte temsilini geri getiren `buildGenesis` adlı statik bir API metodu vardır.

[AVM’nin](../../avalanchego-apis/exchange-chain-x-chain-api.md) belgesinde, [`that`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis) yönelik argümanın şöyle görünmesi gerektiğini belirtiyor:

```cpp
{
"genesisData":
    {
        "assetAlias1": {               // Each object defines an asset
            "name": "human readable name",
            "symbol":"AVAL",           // Symbol is between 0 and 4 characters
            "initialState": {
                "fixedCap" : [         // Choose the asset type.
                    {                  // Can be "fixedCap", "variableCap"
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

Bu genez durumunun byte temsilini oluşturmak için [`of`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis) çağırın. Araman aşağıdaki gibi olmalı. AVAX özel blok zincirlerinde olmadığını not edin, ama yine de bu yeni zincirin işlem ücretlerini ödemek için bir yol bulmanız gerekiyor. Özel AVM vakalarında işlem ücretleri `in` belirtilen ilk varlık içinde belirtir. Bu örnekte ücretler `varlık 1` ile ödenir `(myFixedCapasset` olarak adlandırılır). \) Ücret için yeterli miktarda koyduğunuzdan emin olun. Varsayılan işlem ücreti ücretin 1000.000 değerinde değerlidir. Ücret hakkında daha fazla bilgi [`burada`](../../../learn/platform-overview/transaction-fees.md#transaction-fees) bulunabilir.

Bu arama AVM'nin statik API uç noktasına yapılıyor, `/ext/vm/avm`:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "avm.buildGenesis",
    "params" : {
        "genesisData": {
            "asset1": {
                "name": "myFixedCapAsset",
                "symbol":"MFCA",
                "initialState": {
                    "fixedCap" : [
                        {
                            "amount":100000000,
                            "address": "avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z"
                        },
                        {
                            "amount":100000000,
                            "address": "avax1u4uvatmymlue3zf4w0admnyj6vsw9mqk7hjckl"
                        },
                        {
                            "amount":5000000,
                            "address": "avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"
                        },
                        {
                            "amount":5000000,
                            "address": "avax1hzrwdlpum8xmt3pgstejx4sz86ajylmmaylspc"
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
                                "avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70",
                                "avax1hzrwdlpum8xmt3pgstejx4sz86ajylmmaylspc"
                            ],
                            "threshold":1
                        },
                        {
                            "minters": [
                                "avax1je76jegcc0qylnz473ag9l5ywvhe8we8e5qw0k",
                                "avax1y9sull9tpaz9s507uekmm4sejwvndrela0mu43",
                                "avax1grn5kuzalzek7uk405fmgae06ly8cw52ms070k"
                            ],
                            "threshold":2
                        }
                    ]
                }
            }
        }
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/avm
```

Bu, blok zincirinin of byte temsilini gönderir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "111TNWzUtHKoSvxohjyfEwE2X228ZDGBngZ4mdMUVMnVnjtnawW1b1zbAhzyAM1v6d7ECNj6DXsT7qDmhSEf3DWgXRj7ECwBX36ZXFc9tWVB2qHURoUfdDvFsBeSRqatCmj76eZQMGZDgBFRNijRhPNKUap7bCeKpHDtuCZc4YpPkd4mR84dLL2AL1b4K46eirWKMaFVjA5btYS4DnyUx5cLpAq3d35kEdNdU5zH3rTU18S4TxYV8voMPcLCTZ3h4zRsM5jW1cUzjWVvKg7uYS2oR9qXRFcgy1gwNTFZGstySuvSF7MZeZF4zSdNgC4rbY9H94RVhqe8rW7MXqMSZB6vBTB2BpgF6tNFehmYxEXwjaKRrimX91utvZe9YjgGbDr8XHsXCnXXg4ZDCjapCy4HmmRUtUoAduGNBdGVMiwE9WvVbpMFFcNfgDXGz9NiatgSnkxQALTHvGXXm8bn4CoLFzKnAtq3KwiWqHmV3GjFYeUm3m8Zee9VDfZAvDsha51acxfto1htstxYu66DWpT36YT18WSbxibZcKXa7gZrrsCwyzid8CCWw79DbaLCUiq9u47VqofG1kgxwuuyHb8NVnTgRTkQASSbj232fyG7YeX4mAvZY7a7K7yfSyzJaXdUdR7aLeCdLP6mbFDqUMrN6YEkU2X8d4Ck3T"
    },
    "id": 1
}
```

## Blok zinciri oluştur

Şimdi yeni bir blok zinciri oluşturalım. Bunu yapmak için [`platformu`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain) oluşturmak için "Blockchain" diyoruz. Araman aşağıdaki gibi olmalı. Alt `ağ` ile blok zincirinizi doğrulayacak alt ağ değiştirmeniz ve subnet’s kontrol anahtarlarının yeterli sayısını kontrol eden `bir kullanıcı adı` sağlamalısınız. Bir hatırlatma olarak, bir subnet’s eşiğinin ve kontrol anahtarlarının [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets). çağırarak ne olduğunu öğrenebilirsiniz.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
        "vmID":"avm",
        "name":"My new AVM",
        "genesisData": "111TNWzUtHKoSvxohjyfEwE2X228ZDGBngZ4mdMUVMnVnjtnawW1b1zbAhzyAM1v6d7ECNj6DXsT7qDmhSEf3DWgXRj7ECwBX36ZXFc9tWVB2qHURoUfdDvFsBeSRqatCmj76eZQMGZDgBFRNijRhPNKUap7bCeKpHDtuCZc4YpPkd4mR84dLL2AL1b4K46eirWKMaFVjA5btYS4DnyUx5cLpAq3d35kEdNdU5zH3rTU18S4TxYV8voMPcLCTZ3h4zRsM5jW1cUzjWVvKg7uYS2oR9qXRFcgy1gwNTFZGstySuvSF7MZeZF4zSdNgC4rbY9H94RVhqe8rW7MXqMSZB6vBTB2BpgF6tNFehmYxEXwjaKRrimX91utvZe9YjgGbDr8XHsXCnXXg4ZDCjapCy4HmmRUtUoAduGNBdGVMiwE9WvVbpMFFcNfgDXGz9NiatgSnkxQALTHvGXXm8bn4CoLFzKnAtq3KwiWqHmV3GjFYeUm3m8Zee9VDfZAvDsha51acxfto1htstxYu66DWpT36YT18WSbxibZcKXa7gZrrsCwyzid8CCWw79DbaLCUiq9u47VqofG1kgxwuuyHb8NVnTgRTkQASSbj232fyG7YeX4mAvZY7a7K7yfSyzJaXdUdR7aLeCdLP6mbFDqUMrN6YEkU2X8d4Ck3T",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Cevap işlem kimliği içerir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Başarıyı Doğrulayın<a id="verify-success"></a>

Birkaç saniye sonra, blok zincirini oluşturmak için işlem kabul edilmeli ve blok zinciri var should iyi biçimlendirildiğini varsayarsak, vb...)

Kontrol etmek için, platformu çağırın. [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains). arayın. Bu da var olan tüm blok zincirlerinin listesini gönderir.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Tepki blok zincirinin yaratıldığını doğruluyor:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "AXerNQX7voY2AABaRdTAyXcawBURBR6thPRJp43LtPpZZi6Qz",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "tZGm6RCkeGpVETUTp11DW3UYFZmm69zfqxchpHrSF7wgy8rmw",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
                "name": "My new TSVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH",
                "name": "My new AVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### Blok zincirini onaylıyor<a id="validating-blockchain"></a>

Her blok zincirinin üzerinde işlemleri onaylamak ve işlemek için bir dizi onaylayıcı gerekir. Bu düğümün verilen bir blok zincirini [`bu`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus) düğümle calling Statüsünü çağırarak geçerli olup olmadığını kontrol edebilirsiniz.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Validating"
  },
  "id": 1
}
```

`Eğer "Doğrulanma"` cevap verirse, düğüm, verilen zincirin doğrulanmasını sağlar. Eğer `"Syncing"` cevap verirse, zincir bu düğümle takip edilir ama geçerli değildir. `Eğer "yaratılmış"` cevabını verirse zincir var ama senkronize edilmiyor. Bir alt ağı onaylamak veya izlemek için your argüman `--whitelisted-subnets=[subnet (subnet ID burada gider)` (örneğin: --whitelisted-subnets=[subnet (n. `---whitelisted-subnets=KL1e8io1Zi2kr8cTxvi321pAzfQuUa8tmBfadff9K2dc2TT\)` ve alt ağın geçerli kümesine de düğümünü eklemeniz gerektiğini.

Daha fazla bilgi [Subnet Doğrulama](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) özel ders eklenmesinde bulunabilir.

## Yeni Blok zinciri ile etkileşim<a id="interact-with-the-new-blockchain"></a>

AVM'nin bu yeni örneğiyle neredeyse [with](../../../learn/platform-overview/#exchange-chain-x-chain) etkileşime girdiğiniz şekilde etkileşime girebilirsiniz. Bazı küçük farklılıklar var:

* Blok zincirinin API sonucu, `127.0.0.1:9650/ext/bc/xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dZDckYH'dir`. Bu zincir kimliğinin daha basit API URL'ler için `myxchain` ile takma isimlendirebilirsiniz. Daha fazla bilgi:

   [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

* `Adresler` `X-`-
* Ücretler AVAX yerine genesis verilerinde belirtildiği gibi ilk varlık ile ödenir.

### Dengeli Dengeli Doğrula@ info: whatsthis

Genesis verilerinde bu adrese `ait olan avax1dmrwka6uck4zkaamagq46hhyyy9h9h9z` 100,000 birim varlık varlığı `var`. Şunu doğrulayalım:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z",
        "assetID":"asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "balance": "100000000",
    "utxoIDs": [
      {
        "txID": "9tKDkdk4PUj3GW3tw6fuYywVRwP5gXDj7XTEuPkmLAhauPN8a",
        "outputIndex": 0
      }
    ]
  },
  "id": 1
}
```

### Varlığı Gönder.

Başka bir adrese bir `kaç varlık` gönderelim. Önce alıcı adresi oluştur:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "address": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1u4uvatmymlue3zf4w0admnyj6vsw9mqk7hjckl"
  },
  "id": 1
}
```

Şimdi [`Avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.send) ile yeni adrese 1 ünite `varlık` gönderelim.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID" : "asset1",
        "amount"  : 1,
        "from"    : ["xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z"],
        "to"      : "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1u4uvatmymlue3zf4w0admnyj6vsw9mqk7hjckl",
        "changeAddr": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z",
        "username": "USERNAME GOES HERE",
        "password": "PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq",
    "changeAddr": "g1GK7GErN3BqauK6BhhU8uCNfaBTMz4VWr3JdwvXXNCwpwQJQ-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z"
  },
  "id": 1
}
```

İşlem durumunu şöyle doğrulayabiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
       "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Accepted"
  },
  "id": 1
}
```

Şimdi dengelerin değiştiğini doğrulayabiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1u4uvatmymlue3zf4w0admnyj6vsw9mqk7hjckl",
        "assetID": "asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "balance": "1",
    "utxoIDs": [
      {
        "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq",
        "outputIndex": 0
      }
    ]
  },
  "id": 1
}
```

Daha sonra da bu işlemler `1. olarak` kabul edilir. 1000,000 birimin (varsayılan olarak\ ) işlem sırasında ücret olarak kullanıldığını doğrulayabiliriz. Algılayıcılar dengesini kontrol edelim.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z",
        "assetID": "asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "balance": "98999999",
    "utxoIDs": [
      {
        "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq",
        "outputIndex": 1
      }
    ]
  },
  "id": 1
}
```

Bu adrese 100,000,000 `varlık` vardı, sonra bir birim diğer adrese gönderdik ve işlem ücreti için 1000,000 ödedik ve bu da 98,999,999 ünite bir mal varlığı ile `sonuçlandı`.

### Mint Varlığı

Bizim blok zincirimizin `myVarCapAsset`. adında bir varlık `varlığı` daha var. Bu değişken kap bir varlık. Bu varlığın daha fazla birimi [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.mint). ile nane yapalım. Adres `avax16k8n4d8xmhpln5vhm342g6n9rkxuj8wn6u70` mintable `varlığı 22` kontrol eder ve ayrıca işlem ücretini ödemek için `yeterli` olan 5,000,000 birim varlığı varlığı vardır.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount": 1,
        "assetID": "asset2",
        "from": ["xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"],
        "to": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70",
        "minters": [
            "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"
        ],
        "changeAddr": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70",
        "username": "USERNAME GOES HERE",
        "password": "PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "txID": "2UQL5u5ZEELHfRpAtDYtmFF8BMSdoWNWS1Zf2dkbVSDeTbXeJQ",
    "changeAddr": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"
  },
  "id": 1
}
```

[`Hadi`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.getAllBalances) dengeyi with kontrol edelim.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getAllBalances",
    "params" :{
        "address":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "balances": [
      {
        "asset": "asset2",
        "balance": "1"
      },
      {
        "asset": "asset1",
        "balance": "4000000"
      }
    ]
  },
  "id": 1
}
```

Görebileceğimiz üzere 1 ünite `varlık` bölünmüş. Adres `avax16k8n4d8xmhpln5vhm3442g6n9rkxuj8wn6u70,``` genesis verisinde tanımlandığı gibi 5,000,000 varlık varlığı vardı ve şimdi işlem ücretini ödedikten sonra 4,000,000 `varlık` varlığı varlığı var.

