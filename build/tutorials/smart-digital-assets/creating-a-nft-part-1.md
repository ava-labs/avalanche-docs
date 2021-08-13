# Bir NFT \(Bölüm 1\ Oluştur

## Tanıştırma

On dijital mallar simge olarak temsil edilir. Bazı işaretler **fungible**, bu da bir simge diğerine göre değiştirilebilir. Gerçek dünya para birimi mantardır; örneğin bir $5 nota diğer 5 dolarlar gibi muamele edilir.

Avalanche ayrıca non-fungible olmayan tokens \(NFTs\) destekler. Tanım olarak, her NFT eşsiz ve diğer for için mükemmel bir şekilde değiştirilemez. Örneğin, gerçek dünya sanat eserinin ownership temsil eden bir NFT olabilir; her NFT gibi her bir sanat eseri eşsizdir. NFTs dijital kıtlığı temsil eder ve geleneksel mantarlı tokens. daha fazla faydalıya sahip olduklarını kanıtlar.

Bu özel ders için, AvalancheGo’s API'sini kullanarak NFTs oluşturup göndereceğiz. Gelecekteki bir özel ders olarak, [AvalancheJS](../../tools/avalanchejs/) kullanarak özel bir NFT ailesi oluşturacağız ve NFTs daha detaylı araştıracağız.

## Gereklilik

[Bir Avalanche](../nodes-and-staking/run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz. Bu özel ders için, API çağrıları yapmak için [Avalanche’s Postacı koleksiyonunu](https://github.com/ava-labs/avalanche-postman-collection) kullanıyoruz.

## NFT Ailesini oluştur

Her NFT bir **ismi** ve sembolü olan bir aileye aittir. Her aile **gruptan** oluşur. Aile içinde bulunan grupların sayısı aile oluşturduğu zaman belirlenir. NFT on var olacak, bu yüzden NFT ailemiz oluşturmak için [X-Chain, X-Chain’s](../../avalanchego-apis/exchange-chain-x-chain-api.md) bir metodu olan [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset), adını vereceğiz.

Bu yöntemin imzası:

```cpp
avm.createNFTAsset({
    name: string,
    symbol: string,
    minterSets []{
        minters: []string,
        threshold: int
    },
    from: []string,
    changeAddr: string,
    username: string,
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

### **Yöntem**

* [avm. `avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)

**Parametreler**

* `NFT` ailemiz için okunabilir bir isim. Eşsiz olması gerekmez. 0 ile 128 karakter.
* `Sembol,` bu NFT ailesinin bir kısaltma sembolüdür. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `MinterSets,` `her` elementin mürekkep `eşiğinin` bir minting operasyonu imzalayarak daha çok varlığı birleştirebileceği belirttiği bir listedir.
* X-Chain üzerinde bir işlem gerçekleştirmek AVAX ile ödenen bir işlem ücreti gerektirir. `Kullanıcı adı` ve `parola` ücreti ödeyen kullanıcıyı belirtir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişiklik adreslerinizden birine gönderilecek.

### **Yanıt**

* `Varlık` yarattığımız yeni varlığın kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

Bu örnekte bir NFT, nane yapacağız, bu yüzden kullanıcınızın kontrol ettiği bir adres ile minter setindeki en az 1 adresi değiştirmeyi unutmayın.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"Family",
        "symbol":"FAM",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            }
        ],
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Tepki şöyle olmalı:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "changeAddr":"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
    }
}
```

Bir NFT ailesi yaratmanın yanı sıra, AvalancheGo’s [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset) ayrıca `her bir` AvalancheGo’s de bir grup oluşturmaktadır. Örneğin, `minterSets` 3 elementi varsa, NFT ailesinin 3 grubu vardır. İkincisi, cevap olarak geri verilecek `olan` of notunu alın. Bu yeni yaratılmış NFT ailesinin `varlığı` ve daha sonra NFTs yayınlamak için ona ihtiyacınız olacak.

Neden tek bir adres yerine varlığın daha fazla birimini şekillendirebilen adresleri belirleyeceğimizi merak _ediyor_ olabilirsiniz. İşte neden:

* **Güvenlik:** Eğer bir adres varlığı daha fazla nane yapabilirse ve bu adrese giden özel anahtar kaybolursa, başka birim asla daraltılamaz. Benzer şekilde, sadece bir adres varlığı daha fazla nane yapabilirse bu adres sahibinin istedikleri kadar tek taraflı şekilde naneli olmasını durduramaz.
* **Esneklik:** "Alice bu varlığın tek taraflı olarak daha fazla birimini dinesh, Ellin, ve Jamie daha fazla nane yapabilir." gibi mantığı kodlamak güzel.

## NFT için UTXOs al

NFT çıktıları [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)[``](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances) veya to çağrıda görünmez. your görmek için [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) aramanız ve sonra da tip kimliğini kontrol etmek için utxo ayırmanız gerekir. NFT Mint Çıktıları hexidecimal \(`10`) ve NFT Transfer Outputs in `00`` 00 0b` (Decimal\ `11`) bir tip olarak (Decimal\ decimal\) bulunur.

### **Yöntem**

* [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **Parametreler**

* `Adresler` UTXOs almak için adresler.

**Yanıt:**

* `numFetched` cevaptaki UTXOs toplam sayısıdır.
* `utxos`, CB58 kodlanmış iplerin bir dizisidir.
* `endIndex` bu yöntem pagination. destekler. `endIndex` son the geri döndüğü anlamına gelir.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cevap UTXOs: bir listesi içeriyor:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "numFetched": "2",
        "utxos": [
            "116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC",
            "11cxRVipJgtuHy1ZJ6qM7moAf3GveBD9PjHeZMkhk7kjizdGUu5RxZqhViaWh8dJa9jT9sS62xy73FubMAxAy8b542v3k8frTnVitUagW9YhTMLmZ6nE48Z9qXB2V9HHzCuFH1xMvUEj33eNWv5wsP3JvmywkwkQW9WLM"
        ],
        "endIndex": {
            "address": "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
            "utxo": "2iyUVo8XautXpZwVfp5vhSh4ASWbo67zmHbtx7SUJg2Qa8BHtr"
        }
    }
}
```

Avm.getUTXOs 2 [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) gönderir. İlk olanı alıp [NFT Mint Çıkışı](../../references/avm-transaction-serialization.md#nft-mint-output) olduğunu doğrulamak için şifreyi çözelim. İlk olarak, Base58Check kodlanmış sicimi [`çeviriyoruz. Bu`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) da from iblise geri dönüyor. Aşağıdaki [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) dizisi:

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

in şöyle ifade edilir:

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Şimdi, büyüyü UTXO’s bireysel bileşenlerine [aktararak işlem seri dizilimi biçimine](../../references/avm-transaction-serialization.md) atıfta bulunarak çözebiliriz:

```cpp
NFT Mint Output

CodecID: 00 00
TXID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0a
GroupID: 00 00 00 00
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

`TypeID` `00` `GroupID` `00`. Bu `GroupID` `the` aktardığım `MinterSets` sayısına dayanılarak oluşturulmuştur.

## Varlığı Mint

Şimdi bir NFT ailemiz ve tek `MinterSet` için bir grup oluşturduğumuza göre bu gruba ait NFTs oluşturabiliyoruz. [`Bunun`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft) için that şöyle diyoruz:

### **Yöntem**

* [avm. `avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **Parametreler**

* `NFT` ailesinin kimliği.
* `Yük,` 1024 to kadar kodlanmış bir CB58 kodlanmış bir yüktür. **2\(Yaklaşan SOON\)** NFT yükü etrafında bir protokol oluşturmayı deneyeceğiz. Bu özel ders için görev yükü "AVA Labs" dizisidir.
* ...yeni `to` alacak olan adres. Kullanıcı kontrollerinizin yerine `geçin` böylece yeni of bazılarını gönderebileceksiniz.
* `Kullanıcı adı` anahtarları tutan bir kullanıcı olmalı, bu of daha fazla nane için izin verir. Yani yukarıda belirttiğimiz minter setlerinden birinin _en_ azından eşik anahtarlarını kontrol ediyor.
* `Parola` `kullanıcı adı` için geçerli parola

### **Yanıt**

* `TxID` işlem kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "payload":"2EWh72jYQvEJF9NLk",
        "to":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cevap işlemlerin kimliğini içeriyor:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"x4fKx95KirTvqWCeiPZfnjB4xFdrTduymRKMouXTioXojdnUm",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"
    }
}
```

Önceki adıma benzer olarak, şimdi bir NFT nafaka ile [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) arayarak ve avm.getUTXOs ayırarak [NFT Transfer](../../references/avm-transaction-serialization.md#nft-transfer-output) Çıktısının olduğunu doğrulayabiliriz.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Bu da şöyle olmalı:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24",
            "11JL98R9yVoCaekrzP2PoCKJfCTin6vhTWU4h9TxqevEUnhiMo2j7F4DHxRpHq6BnFnHGAajhmiXgrdfUbbNd1izmdLVMwqe3UCTJWWLaJ6XUZ46R243T8NdhKXXJWC9GvcjFYMyiKRWvVnvFt7duzq8P8D53uhv1QfdQ9"
        ],
        "endIndex": {
            "address": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
            "utxo": "2qs3A1sBhVjFcXqRADJ7AorvoawVgMkNdgJi8eYNPABMKmdBYq"
        }
    },
    "id": 1
}
```

Önceki adımlarda olduğu gibi, şimdi UTX8'in kodlanmış the hexidecimal kodlayabiliriz ve sonra da doğru UTXO ve daktilo olduğunu doğrulamak için bireysel bileşenlerine decompose yapabiliriz.

İlk olarak, Base58Check kodlanmış sicimi [`çeviriyoruz. Bu`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) da from iblise geri dönüyor. Aşağıdaki CB58 dizisi:

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

in şöyle ifade edilir:

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Büyüyü UTXO’s bireysel bileşenlerine ayırabiliriz:

```cpp
NFT Mint Output

CodecID: 00 00
TXID: 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0b
GroupID: 00 00 00 00
Payload Length: 00 00 00 08
Payload: 41 56 41 20 4c 61 62 73
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

`TypeID` `00b` olduğunu not edin, bu da [bir NFT Transfer Çıktı](../../references/avm-transaction-serialization.md#nft-transfer-output) için doğru bir kimlik oluşturuyor. Ayrıca the de dahil olduğunu unutmayın.

## NFT gönderin

NFT de herkese gönderebilirsin. Bunun için AvalancheGo’s [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft) API yöntemini kullanın.

**Yöntem**

* [`avm.`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**Parametreler**

* `assetID` gönderdiğimiz NFT kimliği.
* ...yeni `to` alacak olan adres.
* `Grup kimliği` NFT gönderme için NFT grubudur.
* `Kullanıcı adı` controls kontrol eden kullanıcı.
* `Parola` `kullanıcı adı` için geçerli parola

**Yanıt**

* `TxID` işlem kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID" :"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "to"      :"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
        "groupID" : 0,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cevap NFT Transfer Operasyonumuzun başarılı olduğunu doğruluyor:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "txtzxcrzPx1sn38HWKU9PB52EpbpXCegbdHNxPNAYd9ZvezJq",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"0
    }
}
```

NFT gönderdiğiniz adres için [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) arayabilirsiniz, CB58'den büyüye dönüştürdükten sonra geri dönen UTXO, yok edin, böylece bir UTXO tipi `0000 00 0b` ya da in `11` tane bir tane olduğunu doğrulamak için.

## Toplantı

Blok zinciri teknolojisi ve tokenomics dijital varlıkların temsil edilmesinin radikal yeni bir yolunu temsil etmektedir. Mantıksız jetonlar az varlıkların to izin verir. Bu özel ders için:

* Mantıklı olmayan bir varlık ailesi ve grup oluşturmak için yaratılma `createNFTAsset` varlığı kullanılıyor.
* NFT ile NFT `grubuna` nane birimleri kullandılar.
* Adres için getUTXOs için `kullanılan` getUTXOs kullanıldı. Daha sonra CB58'i the büyüye dönüştürdük. Ve kendi bileşenlerine ayırdık.
* Adresler arasında NFTs aktarmak için `gönderilen gönderme` kullanılmış.

Bu serinin 2. bölümünde, NFT yükümüz için bir protokol oluşturmak için AvalancheJS kullanarak daha derinlere ineceğiz.

