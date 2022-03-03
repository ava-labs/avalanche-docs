# AVM'yi Çalıştıran bir Blok Zincir Yaratın

## Giriş

Avalanche'ın temel özelliklerinden biri yeni blok zincirler yaratma yeteneğidir. Avalanche, [Avalanche Sanal Makine \(AVM\)](../../../learn/platform-overview/README.md#exchange-chain-x-chain)'nin yeni instance'larının yaratılmasını destekler. Bu eğitim makalesinde AVM'nin yeni bir instance'ını açarak bir blok zincir yaratacağız.

Kişiselleştirilmiş blok zincirler kurmaya ilgi duyuyorsanız, [Bir Sanal Makine \(VM\) Yaratın](create-a-virtual-machine-vm.md) ve [Bir Kişiselleştirilmiş Blok Zincir Yaratın](create-a-virtual-machine-vm.md) başlıklı eğitim makalelerine bakın.

_Not: Blok Zincirlerin, Subnet'lerin, İşlemlerin ve Adreslerin kimlikleri her çalıştırma/ağ için değişik olabilir. Diğer bir deyişle, bu eğitim makalesindeki bazı girdiler, son noktalar vb. siz denediğinizde değişik olabilir._

### Ön gereklilikler

Çalışan bir düğüme, o düğümde bir kullanıcıya ve o kullanıcının kontrol ettiği adreste bir miktar AVAX'a ihtiyacınız olacak. Tüm bunlar [Bir Avalanche Düğümü Çalıştırın](../nodes-and-staking/run-avalanche-node.md) başlıklı eğitim makalesinde açıklanmaktadır.

Ardından, düğümünüzü [Birincil Ağda](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) bir doğrulayıcı yapmanız gerekiyor. Bunu nasıl yapacağınızı [Bir Doğrulayıcı Ekleyin](../nodes-and-staking/add-a-validator.md) başlıklı eğitim makalesinde öğrenebilirsiniz. Bunu [API çağrıları](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) ile yapmanızı tavsiye ederiz, çünkü bu eğitim makalesinin geri kalan kısmında düğümünüzle etkileşimde bulunmanızın yolu budur.

## Subnet'i Yaratın

Her blok zincir bir [subnet](../../../learn/platform-overview/README.md#subnets) vasıtasıyla doğrulanır. Bir blok zincir yaratmadan önce, o blok zinciri doğrulamak için bir subnet'e ihtiyacınız olacak. Halihazırda mevcut bir subnet'i de kullanabilirsiniz, ama bunu yapabilmeniz için o subnet'in yeterli sayıda kontrol anahtarlarına sahip olmanız gerekir.

:::bilgi [Bir Subnet Yaratın](create-a-subnet.md) :::

### Subnet'e Doğrulayıcılar Ekleyin

Subnet'te doğrulayıcılar bulunması gerekir ki blok zincirleri doğrulayabilsin.

:::bilgi [Doğrulayıcı Kümesine bir düğüm ekleyin](../nodes-and-staking/add-a-validator.md) :::


## Genesis Verilerini yaratın {#create-the-genesis-data}

Her blok zincir ilk yaratıldığında bir genesis, yani "ilk çıkış" durumundadır. Her VM \(sanal makine\), kendi genesis verilerinin formatını ve semantiğini belirler. Avalanche Sanal Makine \(AVM\) ve Coreth, `buildGenesis` adı verilen statik bir API metoduna sahiptir; bu metot, bir blok zincirin genesis durumunun bir JSON temsilini alır ve o durumun bayt temsilini döndürür.

[AVM dokümanı](../../avalanchego-apis/exchange-chain-x-chain-api.mdx), [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm.buildGenesis) komutuna verilen argümanının aşağıdaki gibi görünmesi gerektiğini belirtir:

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

Bu genesis durumunun bayt temsilini yaratmak için [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm.buildGenesis) komutunu çağırın. Çağrınız aşağıdaki gibi görünmelidir. AVAX'ın kişiselleştirilmiş blok zincirlerde mevcut olmadığını ama yine de bu yeni zincirde işlem ücretleri ödemenin bir yolunu bulmanız gerektiğini aklınızda bulundurun. Kişiselleştirilmiş AVM instance'larında işlem ücretleri `genesisData`'da belirtilen ilk varlık cinsinden ifade edilir. Bu örnekte ücretler `asset1`ile ödenir \(bu varlığın adı şudur: `myFixedCapAsset`, yani ilk sabit arz limitli varlığım\). Ücretleri karşılayacak yeterli miktarı koyduğunuzdan emin olun. Varsayılan işlem ücreti, ücretlerin cinsi hangi varlıkla ifade edilmişse, o varlıktan 1.000.000  adettir. Ücretler hakkında daha fazla bilgiyi [`here.`](../../../learn/platform-overview/transaction-fees.md#transaction-fees) \(burada\) bulabilirsiniz

Bu çağrının AVM'nin statik API son noktasına, yani `/ext/vm/avm`'ye yapıldığını aklınızda bulundurun:

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

Bu çağrı, blok zincirinizin genesis durumunun bayt temsilini döndürür:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "111TNWzUtHKoSvxohjyfEwE2X228ZDGBngZ4mdMUVMnVnjtnawW1b1zbAhzyAM1v6d7ECNj6DXsT7qDmhSEf3DWgXRj7ECwBX36ZXFc9tWVB2qHURoUfdDvFsBeSRqatCmj76eZQMGZDgBFRNijRhPNKUap7bCeKpHDtuCZc4YpPkd4mR84dLL2AL1b4K46eirWKMaFVjA5btYS4DnyUx5cLpAq3d35kEdNdU5zH3rTU18S4TxYV8voMPcLCTZ3h4zRsM5jW1cUzjWVvKg7uYS2oR9qXRFcgy1gwNTFZGstySuvSF7MZeZF4zSdNgC4rbY9H94RVhqe8rW7MXqMSZB6vBTB2BpgF6tNFehmYxEXwjaKRrimX91utvZe9YjgGbDr8XHsXCnXXg4ZDCjapCy4HmmRUtUoAduGNBdGVMiwE9WvVbpMFFcNfgDXGz9NiatgSnkxQALTHvGXXm8bn4CoLFzKnAtq3KwiWqHmV3GjFYeUm3m8Zee9VDfZAvDsha51acxfto1htstxYu66DWpT36YT18WSbxibZcKXa7gZrrsCwyzid8CCWw79DbaLCUiq9u47VqofG1kgxwuuyHb8NVnTgRTkQASSbj232fyG7YeX4mAvZY7a7K7yfSyzJaXdUdR7aLeCdLP6mbFDqUMrN6YEkU2X8d4Ck3T"
    },
    "id": 1
}
```

## Blok Zinciri Yaratın

Şimdi yeni blok zinciri yaratalım. Bunu yapmak için [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain) komutunu çağırıyoruz. Çağrınız aşağıdaki gibi görünmelidir. `subnetID` parametresini blok zincirinizi doğrulayacak subnet'e değiştirmeniz ve subnet'in yeterli sayıda kontrol anahtarlarını kontrol eden bir `username` girmeniz gerekir. Bir subnet'in eşiğinin ve kontrol anahtarlarının neler olduğunu [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) komutunu çağırarak öğrenebileceğinizi hatırlatırız.

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

Gelen yanıtta işlem kimliği bulunur:

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

### İşlem Başarısını Doğrulayın {#verify-success}

Birkaç saniye sonra blok zincirimizi yaratma işleminin kabul edilmiş olması ve blok zincirin mevcut olması gerekir \(bu isteğin iyi oluşturulmuş olması vb. şartıyla\)

Kontrol etmek için [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains) komutunu çağırın. Bu çağrı, mevcut tüm blok zincirlerin bir listesini döndürür.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Gelen yanıt, blok zincirin yaratıldığını doğrular:

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

### Blok Zincirin doğrulanması {#validating-blockchain}

Her blok zincirde, o zincirde yapılan işlemleri doğrulayacak ve işleyecek bir doğrulayıcılar kümesi olması gerekir. Bir düğümün belli bir blok zinciri doğruladığını, o düğümde [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus) komutunu çağırarak kontrol edebilirsiniz:

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

Gelen yanıt `"Validating"` ise, o düğüm ilgili zinciri doğruluyor demektir. Gelen yanıt `"Syncing"` \(senkronize ediyor\) ise, ilgili zincir o düğüm tarafından takip ediliyor ama o düğüm tarafından doğrulanmıyor demektir. Gelen yanıt `"Created"` \(yaratıldı\) ise, o zincir mevcut ama senkronize edilmiyor demektir. Bir subnet'i doğrulamak veya izlemek için düğümünüzü `--whitelisted-subnets=[subnet ID goes here]` argümanı ile \(örn.\) `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT` başlatmanız ve ayrıca düğümü subnet'in doğrulayıcı kümesine eklemeniz gerektiğini aklınızda bulundurun.

Daha fazla bilgiyi [Bir Subnet Doğrulayıcısı Ekleme](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) başlıklı eğitim makalesinde bulabilirsiniz.

## Yeni Blok Zincirle etkileşimde bulunma {#interact-with-the-new-blockchain}

AVM'nin bu yeni instance'ı ile etkileşimde bulunabilirsiniz; bu etkileşim, [X-Chain](../../../learn/platform-overview/README.md#exchange-chain-x-chain) ile etkileşimle aşağı yukarı aynıdır. Bazı ufak tefek farklılıklar vardır:

* Blok zincirinizin API son noktası `127.0.0.1:9650/ext/bc/xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH`'dır. Son noktadaki son kısım, blok zincirin kimliğidir. Bu kimlik, blok zinciri yarattığınız esnadaki kimlikten farklı olabilir. Bu zincir kimliğine `myxchain` alias'ını \(takma ad\) vererek API URL'lerini daha basit hale getirebilirsiniz. Daha fazla bilgi:

   [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

* Adreslerin önüne, `xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-` yerine, kişiselleştirilmiş blok zincirin kimliği, yani `X-` eklenir. Bu kimlik, blok zincirinizi yarattığınız esnadaki kimlikten farklı olabilir.
* Ücretler, yukarıda açıklandığı gibi, genesis verilerinde belirtilen ilk varlıkla ödenir, AVAX'la değil...

### Bakiyeyi Doğrulayın

Genesis verilerinde, `avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z` adresinde `asset1` alias'lı varlıktan 100.000.000 adet bulunduğunu belirtmiştik. Şimdi bunu doğrulayalım:

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

### Varlık Gönderin

Şimdi başka bir adrese bir miktar `asset1` gönderelim. Önce bir alıcı adresi yaratın:

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

Şimdi yeni adrese [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm.send) komutuyla 1 adet `asset1` gönderelim.

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

İşlemin durumunu aşağıdakiyle doğrulayabiliriz:

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

Şimdi bakiyelerin buna göre değiştiğini doğrulayabiliriz:

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

Yukarıda belirtildiği gibi, işlem ücretleri `asset1` ile ödenir. İşlemimizde ücret olarak 1.000.000 adet \(varsayılan\) kullanıldığını doğrulayabiliriz. Şimdi göndericinin işlemden sonraki bakiyesini kontrol edelim.

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

Bu adreste 100.000.000 adet `asset1` vardı, sonra diğer adrese 1 adet gönderdik ve işlem ücreti olarak 1.000.000 ödedik ve bunun sonucunda `asset1` varlığından 98.999.999 adetlik bir bakiye oluştu.

### Varlık Mint Edin

Blok zincirimizde `myVarCapAsset` adında başka bir varlığımız, yani `asset2` mevcut olsun. Bu varlık, değişken arz limitli bir varlıktır. Şimdi bu varlığın daha fazla adedini [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm.mint) komutuyla mint edelim. `avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70` adresi, mint edilebilir `asset2` varlığını kontrol etmektedir ve bu adreste ayrıca 5.000.000 adet `asset1` varlığından mevcuttur, yani işlem ücretini ödemeye yetecek miktarda varlık mevcuttur.

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

Şimdi bakiyeyi [`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm.getAllBalances) komutu ile kontrol edelim.

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

Gördüğümüz gibi, `asset2` varlığından 1 adet mint edilmiştir. Genesis verilerinde belirlendiği gibi, `avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70` adresinde 5.000.000 adet `asset1` varlığı mevcuttu ve işlem ücreti ödendikten sonra şimdi bu adreste 4.000.000 adet `asset1` varlığı mevcuttur.

