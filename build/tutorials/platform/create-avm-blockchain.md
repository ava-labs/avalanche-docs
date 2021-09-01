# AVM'yi çalıştıran bir Blok zinciri oluştur

## Tanıştırma

of temel özelliklerinden biri yeni blok zincirleri oluşturma yeteneğidir. Avalanche yeni örnekleri [Avalanche Sanal Makinesi'nin \(AVM\)](../../../learn/platform-overview/#exchange-chain-x-chain) oluşturulmasını destekler. Bu özel derslerde, AVM'nin yeni bir örneğini oluşturarak bir blok zinciri oluşturacağız.

Özel blok zincirleri inşa etmek istiyorsanız [Virtual Machine \(VM\)](create-a-virtual-machine-vm.md) oluşturun ve [Özel Blok zinciri oluşturun](create-a-virtual-machine-vm.md).

### Ön şartlar

Bir çalıştırma düğümü, düğümdeki bir kullanıcı ve kullanıcının kontrol ettiği adreste AVAX olması gerek. Bunların hepsi ["Koş"](../nodes-and-staking/run-avalanche-node.md) ile kaplıdır.

Sırada, [ilkel](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) Ağ'da bir onaylayıcı olmak için düğümünü kullanmalısın. [Bunu bir onaylayıcı](../nodes-and-staking/add-a-validator.md) özel ders olarak nasıl yapılacağını öğrenebilirsin. [Bunu API çağrılarıyla](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) yapmanızı tavsiye eder. Çünkü bu ders için düğümle bu şekilde etkileşime gireceksiniz.

## Subnet oluştur

Her blok zinciri [bir alt ağ](../../../learn/platform-overview/#subnets) tarafından onaylanır. Bir blok zinciri oluşturmadan önce, bunu onaylamak için bir subnet ihtiyacınız olacak. Kontrol anahtarlarının yeterli sayısına sahip olduğu bir subnet da kullanabilirsiniz.

{% page-ref page="create-a-subnet.md" %}

### Subnet Geçerli Yazılar Ekle

Alt ağ blok zincirlerini doğrulamak için geçerli The ihtiyaç duyar.

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

## Genesis Verisi Oluştur<a id="create-the-genesis-data"></a>

Her blok zincirinin yaratıldığında bazı genez durumu vardır. `buildGenesis`Her VM genesis verisinin biçimi ve semantik tanımlar. AVM ve Coreth, bir blok zincirinin genez durumunu JSON temsil eden ve bu durumun byte temsil edilmesini geri getiren statik bir API metodu vardır.

[AVM’nin belgeseli](../../avalanchego-apis/exchange-chain-x-chain-api.md) tartışmanın şöyle görünmesi [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis)gerektiğini belirtir:

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

Bu genez durumunun byte temsilini yaratmak için çağrı [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis)bırakın. Araman aşağıdaki gibi olmalı. AVAX özel blok zincirlerinde olmadığını not edin, ama yine de bu yeni zincirin işlem ücretlerini ödemek için bir yol bulmanız gerekiyor. Özel AVM vakalarında işlem ücretleri ilk varlık içinde `genesisData`belirtilmiştir. Bu örnekte ücretler `asset1`\(isim\) ile `myFixedCapAsset`ödenir. Ücret için yeterli miktarda para koyduğundan emin ol. Varsayılan işlem ücreti ücretin 1000.000 değerinde değerlidir. Ücret hakkında daha fazla bilgi bulunabilir[`here.`](../../../learn/platform-overview/transaction-fees.md#transaction-fees)

Bu arama AVM'nin statik API uç noktasına `/ext/vm/avm`yapılıyor.

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

Şimdi yeni bir blok zinciri oluşturalım. Bunu yapmak için [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain)arayacağız. Araman aşağıdaki gibi olmalı. `subnetID``username`Buket zincirinizi doğrulayacak alt ağa değişmeli ve alt ağın kontrol anahtarlarının yeterli sayısını kontrol eden bir kaynak sağlamalısınız. Bir hatırlatma olarak, bir alt ağ eşiğinin ve kontrol anahtarlarının ne olduğunu arayarak [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)öğrenebilirsiniz.

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

Birkaç saniye sonra, blok zincirini oluşturmak için işlem kabul edilmeli ve blok zinciri var olmalı \(isteğin iyi biçimlendirildiğini varsayarsak\)

Kontrol etmek için, [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains)ara. Bu da var olan tüm blok zincirlerinin listesini gönderir.

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

Her blok zincirinin üzerinde işlemleri onaylamak ve işlemek için bir dizi onaylayıcı gerekir. Bu [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)düğümle calling verilen bir blok zincirini geçerli kılıp doğrulamadığını kontrol edebilirsiniz:

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

Eğer cevap verirse, `"Validating"`düğüm, verilen zinciri doğruluyor. Eğer cevap `"Syncing"`verirse, zincir bu düğümle takip edilir ama geçerli değildir. `"Created"`Eğer cevap verirse zincir var ama senkronize edilmiyor. `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`Bir alt ağı onaylamak veya izlemek için your argüman `--whitelisted-subnets=[subnet ID goes here]`ile başlatmanız gerektiğini, ayrıca alt ağın doğrulayıcı setine düğümü eklemeniz gerektiğini unutmayın.

Daha fazla bilgi [Subnet Doğrulama](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) özel ders eklenmesinde bulunabilir.

## Yeni Blok zinciri ile etkileşim<a id="interact-with-the-new-blockchain"></a>

AVM'nin bu yeni örneğiyle neredeyse [with](../../../learn/platform-overview/#exchange-chain-x-chain) etkileşime girdiğiniz şekilde etkileşime girebilirsiniz. Bazı küçük farklılıklar var:

* Senin blok zincirinin API sonu `127.0.0.1:9650/ext/bc/xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH`şudur. Bu zincir kimliğinin daha basit API URL'leri `myxchain`ile de takma isimlendirebilirsiniz. Daha fazla bilgi:

   [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

* Adresler daha `xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-`çok hazır.`X-`
* Ücretler AVAX yerine genesis verilerinde belirtildiği gibi ilk varlık ile ödenir.

### Dengeli Dengeli Doğrula@ info: whatsthis

Genesis verilerinde adrese ait 100.000 ünite sahte isimler `avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z`koyduk.`asset1` Şunu doğrulayalım:

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

Başka bir `asset1`adrese gönderelim. Önce alıcı adresi oluştur:

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

`asset1`Şimdi yeni adrese 1 ünite gönderelim.[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.send)

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

Bu nedenle de bu iş için para `asset1`ödenmektedir. 1000,000 birim \(varsayılan olarak\) işlem sırasında ücret olarak kullanıldığını doğrulayabiliriz. Algılayıcılar dengesini kontrol edelim.

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

Bu adrese 100,000,000 dolar `asset1`koyduk, sonra bir birim diğer adrese gönderdik ve işlem ücreti için 1000,000 ödedik, ve bu da 98,999 ünite bir denge ile `asset1`sonuçlandı.

### Mint Varlığı

`asset2`Bizim blok zincirimizin başka bir varlığı var.`myVarCapAsset` Bu değişken kap bir varlık. Bu varlığın daha fazla birimi [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.mint)var. `asset1`Adres mintable varlığı kontrol `avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70`eder `asset2`ve ayrıca işlem ücretini ödemeye yetecek 5000.000 birim de vardır.

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

Dengeyi kontrol [`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.getAllBalances)edelim.

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

Görebileceğimiz gibi, 1 ünite `asset2`darbelenmiş. Adresin genez verilerinde tanımlandığı `asset1`gibi 5000.000 `avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70`idi ve şu anda işlem ücretini ödedikten `asset1`sonra 4.000.000 tane var.

