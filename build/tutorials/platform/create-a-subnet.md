# Bir Subnet Oluştur

## Tanıştırma

[Alt ağ](../../../learn/platform-overview/#subnets) bir doğrulayıcı kümesidir. Bir alt ağ bir dizi blok zincirini geçerlidir. Her blok zinciri tam olarak bir alt ağ tarafından doğrulanır ve blok zinciri yaratılmasında belirtilir. Subnetler izin verilen blok zincirlerinin oluşturulmasına olanak sağlayan güçlü bir ilkel özelliktir.

Bir alt ağ oluşturulduğunda bir eşik ve bir dizi anahtar belirlenir. \ (Aslında anahtarların adresleri değil, anahtarların kendileri belirtilmiştir, \) Bu alt ağa bir doğrulayıcı eklemek için, bu anahtarlardan _eşik_ imzalar gereklidir. Bunlara subnet’s **kontrol** anahtarları diyoruz, bir alt ağ **kontrol imzasına** bir doğrulayıcı ekleyen bir işlemde kontrol anahtarının imzasını çağırıyoruz. Özetle, bir alt ağ üyeliğini kontrol ediyor.

Bu özel programda, 2 kontrol anahtarı ve 2 eşik eşiği olan yeni bir alt ağ oluşturacağız.

### Kontrol Anahtarlarını oluştur<a id="generate-the-control-keys"></a>

İlk olarak, 2 kontrol anahtarını oluşturalım. Bu şekilde [`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) Adresi olarak adlandırıyoruz. Bu yeni bir özel anahtar oluşturuyor ve bir kullanıcı için depoluyor.

İlk anahtarı oluşturmak için:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Bu ilk kontrol anahtarını verir (tekrar, aslında ilk kontrol anahtarının _adresini_ verir). Anahtar az önce belirttiğimiz kullanıcı tarafından tutuluyor.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

İkinci anahtarı oluştur:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Cevap az önce belirttiğimiz kullanıcı tarafından tutulan ikinci kontrol anahtarı içerir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### Subnet oluştur<a id="create-the-subnet"></a>

Bir alt ağ yaratmak için [`create Subneti`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet) diyoruz.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg",
            "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
        ],
        "threshold":2,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Bu cevap bize işlemlerin kimliğini verir, bu da yeni yaratılmış of kimliğidir.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Başarıyı Doğrulanıyor<a id="verifying-success"></a>

[`Platformu`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) çağırabiliriz. platform.getSubnets var olan tüm platform.getSubnets almak için:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Tepki our yaratıldığını doğruluyor:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

### Subnet Geçerli Yazılar Ekle<a id="add-validators-to-the-subnet"></a>

Bu [ders](../nodes-and-staking/add-a-validator.md) size bir alt ağa nasıl doğrulayıcı ekleneceğini gösterecek.

