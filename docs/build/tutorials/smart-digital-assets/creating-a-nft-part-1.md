# Bir NFT Yaratın \(Bölüm 1\)

## Giriş

Avalanche'da dijital mallar tokenlar olarak temsil edilir. Bazı token'lar **değiştirilebilir** \(fungible\) tokenlardır, yani başka herhangi bir token ile değiştirilebilirler. Mesela gerçek dünyadaki bir para değiştirilebilir bir paradır; 5 $'lık bir banknot diğer bir 5 $'lık banknotla aynı kabul edilir.

Avalanche değiştirilemez token'ları da \(NFT'ler\) destekler. Her bir NFT, tanımı gereği, benzersizdir ve başka bir NFT ile bire bir değiştirilemez. Örneğin, gerçek dünyadaki bir sanat eserinin mülkiyetini temsil eden bir NFT olabilir; her sanat eseri, her NFT gibi, benzersizdir. NFT'ler dijital kıtlığı temsil ederler ve geleneksel değiştirilebilir token'lardan daha büyük bir yararlılığa sahip olduklarını dahi kanıtlayabilirler.

Bu eğitim makalesinde AvalancheGo'nun API'sini kullanarak NFT'ler yaratacak ve göndereceğiz. İlerideki bir eğitim makalesinde de, [AvalancheJS](../../tools/avalanchejs/README.md) kullanarak kişiselleştirilmiş bir NFT ailesi yaratacak ve NFT'leri daha detaylı şekilde keşfedeceğiz.

## Gereklilikler

[Bir Avalanche Düğümü Çalıştırın](../nodes-and-staking/run-avalanche-node.md) eğitimini tamamlamış ve [Avalanche mimarisini](../../../learn/platform-overview/README.md) öğrenmiş olmanız. Bu eğitim makalesinde, API çağrıları yapmamıza yardımcı olacak [Avalanche Postman koleksiyonu](https://github.com/ava-labs/avalanche-postman-collection)'nu kullanıyoruz.

## NFT Ailesini Yaratın

Her bir NFT, bir adı ve sembolü olan bir **aileye** aittir. Her bir aile **gruplardan** oluşur. Bir ailedeki grupların sayısı, aile yaratılırken belirlenir. NFT'miz X-Chain'de olacaktır, dolayısıyla NFT ailemizi yaratmak için [X-Chain API](../../avalanchego-apis/exchange-chain-x-chain-api.mdx) metodu olan [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-createnftasset) komutunu çağıracağız.

Bu metodun imzası şudur:

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

### **Metot**

* [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-createnftasset)

**Parametreler**

* `name`, NFT ailemizin insan tarafından okunabilir adıdır. Benzersiz olması gerekmez. 0 ile 128 karakter arasındadır.
* `symbol`, bu NFT ailesinin kısaltma sembolüdür. 0 ile 4 karakter arasındadır. Benzersiz olması gerekmez. Kullanılmayabilir.
* `minterSets`, her bir elemanın `minters`'taki adreslerin bir minting operasyonunu imzalaması ile varlığın daha fazla adedini birlikte mint edebilecekleri `threshold`'u belirlediği bir listedir.
* X-Chain'de işlem yapmak AVAX cinsinden bir işlem ücreti ödenmesini gerektirir. `username` ve `password` parametreleri ücreti ödeyen kullanıcıyı ifade eder.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Boş bırakılırsa, para üstü herhangi bir adresinize gönderilir.

### **Yanıt**

* `assetID`, yaratacağımız yeni varlığın kimliğidir.
* Sonuç kısmındaki `changeAddr`, para üstünün gönderildiği adrestir.

Bu örneğin devamında bir NFT mint edeceğiz, o yüzden minter kümesindeki en az bir adresi, kullanıcınızın kontrol ettiği bir adresle değiştirmeyi unutmayın.

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

Gelen yanıt şöyle görünmelidir:

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

Akılda tutulması gereken birkaç nokta: Birincisi, AvalancheGo'nun [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-createnftasset) metodu bir NFT ailesi yaratmanın yanı sıra, teslim edilen her `minterSets` için bir grup yaratır. Örneğin, `minterSets`'de 3 eleman varsa NFT ailesinin 3 grubu vardır. İkincisi, yanıtta döndürülen `assetID`'yi not edin. Bu, yeni yaratılan NFT ailesinin `assetID`'sidir ve daha sonra NFT'ler yayınlamak için buna ihtiyacınız olacak.

Varlığın daha fazla adetlerini mint edebilecek tek bir adres yerine neden adres _kümeleri_ belirlediğimizi merak ediyor olabilirsiniz. Nedeni şu:

* **Güvenlik:** Yalnızca tek bir adres varlığın daha fazlasını mint edebilecek olsa ve o adresin özel anahtarı kaybolsa, o andan sonra daha fazla adet mint edilemez. Aynı şekilde, yalnızca tek bir adres varlığın daha fazla adedini mint edebilecek olsa, o adresi dilediği kadar adedi tek taraflı olarak mint etmekten hiçbir şey alıkoyamaz.
* **Esneklik:** "Alice bu varlığın daha fazla adedini tek taraflı olarak mint edebilir, ya da Dinesh, Ellin ve Jamie'den 2'si birlikte daha fazla adet mint edebilir," şeklinde bir mantık kodlayabilmek güzeldir.

## NFT'nin UTXO'larını getirin

NFT çıktıları [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getbalance) ve [`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getallbalances)'ye yapılan çağrılarda gelmez. NFT'lerinizi görmek için [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getutxos) komutunu çağırmanız ve sonra utxo'yu parse ederek tip kimliğini kontrol etmeniz gerekir. NFT Mint Çıktılarında on altılık sayı sistemiyle ifade edilen `00 00 00 0a` \(ondalık sistemde `10`\) tip kimliği vardır ve NFT Transfer Çıktılarında on altılık sayı sistemiyle ifade edilen `00 00 00 0b` \(ondalık sistemde `11`\) tip kimliği vardır.

### **Metot**

* [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getutxos)

### **Parametreler**

* `addresses`, UTXO'ların getirileceği adreslerdir.

**Yanıt:**

* `numFetched`, yanıttaki toplam UTXO sayısıdır.
* `utxos`, CB58 ile kodlanmış bir dizilimdir.
* `endIndex` Bu metot sayfa düzenlemeyi \(pagination\) destekler. `endIndex`, en son döndürülen UTXO'yu ifade eder.

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

Yanıtta bir UTXO listesi bulunur:

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

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getutxos) komutu 2 adet UTXO döndürür. İlkini alalım ve bir [NFT Mint Çıktısı](../../references/avm-transaction-serialization.md#nft-mint-output) olduğunu doğrulamak için deşifre edelim. İlk önce, [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getutxos) çağrısından döndürülen Base58Check ile kodlanmış string'i on altılık formata çeviririz. Aşağıdaki [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) string'idir:

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

on altılık sayı sisteminde şöyle ifade edilir:

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Şimdi on altılığı \(hex\) [işlem serileştirme formatına](../../references/avm-transaction-serialization.md) başvurarak UTXO'nun ferdi bileşenlerine ayırabiliriz.

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

`TypeID`'nin bir NFT Mint Çıktısı için doğru tip kimliği olan `00 00 00 0a` olduğunu aklınızda bulundurun. `GroupID`'nin de `00 00 00 00` olduğunu aklınızda bulundurun. Bu `GroupID`, `avm.createNFTAsset`'e geçirdiğim `MinterSets`'nin sayısına dayanarak yaratıldı.

## Varlığı Mint Edin

Şimdi bir NFT ailemiz ve tekil `MinterSet` için bir grubumuz olduğuna göre, bu gruba ait olan NFT'ler yaratabiliriz. Bu yapmak için [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-mintnft) komutunu çağırıyoruz:

### **Metot**

* [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-mintnft)

### **Parametreler**

* `assetID`, NFT ailesinin kimliğidir.
* `payload`, gelişigüzel CB58 kodlu, 1024 bayta kadar olan bir payload'dur. 2. Bölümde \(**YAKINDA GELİYOR**\), NFT payload merkezli bir protokol yaratmayı keşfedeceğiz. Bu eğitim makalesi için payload, "AVA Labs" string'idir.
* `to`, yeni mint edilen NFT'leri alacak olan adrestir. `to` parametresini kullanıcınızın kontrol ettiği bir adresle değiştirin, böylece yeni mint edilen NFT'nin bir kısmını daha sonra o adrese gönderebilirsiniz.
* `username`, bu NFT'nin daha fazlasını mint etmesine izin veren anahtarlara sahip olan bir kullanıcı olmalıdır. Yani, bu kullanıcı yukarıda belirlediğimiz minter kümelerinden biri için en azından _threshold_ \(eşik veya sınır\) anahtarlarını kontrol eder.
* `password`, `username` için geçerli şifredir

### **Yanıt**

* `txID`, işlem kimliğidir.
* Sonuç kısmındaki `changeAddr`, para üstünün gönderildiği adrestir.

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

Gelen yanıtta işlemin kimliği bulunur:

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

Bir önceki adıma benzer şekilde, bir NFT'nin mint edildiğini [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getutxos) komutunu çağırarak doğrulayabilir ve UTXO'yu parse ederek şimdi bir [NFT Transfer Çıktısı](../../references/avm-transaction-serialization.md#nft-transfer-output)'na sahip olduğumuzu doğrulayabiliriz.

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

Gelen yanıt şöyle olmalıdır:

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

Önceki adımda olduğu gibi, şimdi CB58 ile kodlanmış UTXO'yu onaltılığa \(hexadecimal\) deşifre edebilir, ardından bunu ferdi bileşenlerine ayırarak doğru UTXO'ya ve tipe sahip olduğumuzu doğrulayabiliriz.

İlk önce, [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getutxos) çağrısından döndürülen Base58Check ile kodlanmış string'i on altılık formata çeviririz. Aşağıdaki CB58 string'idir:

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

on altılık sayı sisteminde şöyle ifade edilir:

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Şimdi on altılığı UTXO'nun ferdi bileşenlerine ayırabiliriz:

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

`TypeID`'nin `00 00 00 0b`, yani [NFT Transfer Çıktısı](../../references/avm-transaction-serialization.md#nft-transfer-output) için doğru bir tip kimliği olduğunu aklınızda bulundurun. Ayrıca Payload'un dahil edildiğini görüyorsunuz.

## NFT'yi Gönderin

Şimdi NFT'yi herhangi birine gönderebilirsiniz. Bunu yapmak için AvalancheGo'nun [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-sendnft) API metodunu kullanın.

**Metot**

* [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-sendnft)

**Parametreler**

* `assetID`, gönderdiğimiz NFT'nin kimliğidir.
* `to`, yeni mint edilen NFT'yi alacak olan adrestir.
* `groupID`, NFT hangi NFT grubundan gönderiliyorsa, o NFT grubudur.
* `username`, NFT'yi kontrol eden kullanıcıdır.
* `password`, `username` için geçerli şifredir

**Yanıt**

* `txID`, işlem kimliğidir.
* Sonuç kısmındaki `changeAddr`, para üstünün gönderildiği adrestir.

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

Gelen yanıt NFT Transfer Operasyonumuzun başarılı olduğunu doğrulamaktadır:

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

NFT'yi gönderdiğiniz adres için [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getutxos) komutunu çağırıp döndürülen UTXO'yu, CB58'den on altılığa çevirdikten sonra bileşenlerine ayırarak, tip kimliği on altılıkta `00 00 00 0b` ve ondalıkta `11` olan bir UTXO mevcut olduğunu doğrulayabilirsiniz.

## Özet

Blok zincir teknolojisi ve tokenomi, dijital varlıkları temsil etmenin yeni ve radikal bir yoludur. Değiştirilemeyen token'lar kıt varlıkların tokenlaştırılmasına olanak tanır. Bu eğitim makalesinde:

* `createNFTAsset` komutunu kullanarak bir değiştirilemez varlık ailesi ve grubu yarattık.
* `mintNFT` komutunu kullanarak bir NFT'nin adetlerini gruba mint ettik
* `getUTXOs` komutunu kullanarak bir adrese UTXO'lar getirdik. Sonra CB58 ile kodlanmış UTXO'yu onaltılığa çevirdik ve ferdi bileşenlerine ayırdık.
* `sendNFT` komutunu kullanarak adresler arasında NFT transferi yaptık.

Bu serinin 2. bölümünde, AvalancheJS'yi kullanarak daha derinlere ineceğiz ve NFT payload'umuz için bir protokol yaratarak bu protokolü çoklu gruplara yayınlayacağız.

