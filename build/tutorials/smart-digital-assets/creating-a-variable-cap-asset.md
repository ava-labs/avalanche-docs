# Değişken Başlık Varlığı Oluştur

## Tanıştırma

Bu özel ders değişken kapak ve mantarlı bir varlık yaratmayı gösterir. Varlık başlatıldığında hiçbir varlık birimi mevcut değildir ancak daha fazla varlık birimi azalabilir. Varlık yaratılışında, hangi adreslerin daha fazla birim şekline girebileceğini belirleriz.

Neden tek bir adres yerine varlığın daha fazla birimini şekillendirebilen adresleri belirleyeceğimizi merak _ediyor_ olabilirsiniz. İşte neden:

* **Güvenlik:** Eğer bir adres varlığı daha fazla nane yapabilirse ve bu adrese giden özel anahtar kaybolursa, başka birim asla daraltılamaz. Benzer şekilde, sadece bir adres varlığı daha fazla nane yapabilirse bu adres sahibinin istedikleri kadar tek taraflı şekilde naneli olmasını durduramaz.
* **Esneklik:** "Alice bu varlığın tek taraflı olarak daha fazla birimini dinesh, Ellin, ve Jamie daha fazla nane yapabilir." gibi mantığı kodlamak güzel.

Diyelim ki bir şirketin hisselerini temsil eden bir varlık yayınlamak istiyoruz. Başlangıç için hiçbir hisse mevcut değildir ancak daha sonra daha fazla hisse oluşturulabilir. Böyle bir varlık yaratalım.

## Gereklilik

[Bir Avalanche](../nodes-and-staking/run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz.

## Varlığı oluştur

on varlığımız var, bu yüzden varlığımızı oluşturmak için [X-Chain, X-Chain’s](../../avalanchego-apis/exchange-chain-x-chain-api.md) bir metodu [`olan avm.createVariableCapAsset, avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset), adını vereceğiz.

Bu yöntemin imzası:

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int,
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

### Parametreler

* `İsim` bizim varlığımız için okunabilir bir isim. Eşsiz olması gerekmez. 0 ile 128 karakter.
* `Sembol,` bu varlığın bir kısaltma sembolüdür. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `Bu` değerin dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. Eğer bu varlığın paydası 0, 100 ünite olarak gösterilecek. Eğer payda 1 100 birim ise bu varlığın 10.0 olarak gösterilecek. Eğer bu varlığın paydası 2, 100 ünite .100 olarak görüntülenir.
* `MinterSets,` `her` elementin in adreslerin `eşiğinin` bir minting işlemini imzalayarak daha çok varlığı birleştirebileceği bir listedir.
* X-Chain üzerinde bir işlem gerçekleştirmek AVAX ile ödenen bir işlem ücreti gerektirir. `Kullanıcı adı` ve `parola` ücreti ödeyen kullanıcıyı belirtir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.

### Yanıt

* `Varlık` yeni varlığın kimliği.
* `Sonuç` olarak değişim, herhangi bir değişikliğin gönderildiği adres.

Daha sonra bu örnekte daha fazla paylaşım yapacağız, bu yüzden kullanıcı your belirlenen ikinci minter içinde en az 2 adres değiştirmeyi unutmayın.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"Corp. Shares",
        "symbol":"CS",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            },
            {
                "minters": [
                    "X-avax1k4nr26c80jaquzm9369j5a4shmwcjn0vmemcjz",
                    "X-avax1yell3e4nln0m39cfpdhgqprsd87jkh4qnakklx",
                    "X-avax1ztkzsrjnkn0cek5ryvhqswdtcg23nhge3nnr5e"
                ],
                "threshold": 2
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
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
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## Varlığı Mint

Şu anda 0 hisse var. 10 milyon hisse senedi yapalım.

### İmzasız İşlemini Oluştur

Hisseleri nane yapmak için [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint) kullanacağız.

* `Bu` miktar, yaratılacak hisse sayısıdır.
* `Varlık` kimliği, daha fazla yarattığımız varlığın kimliğidir.
* `...yeni` tazminat hisseleri alacak olan adres. Kullanıcı kontrollerinizin yerine `geçin` böylece yeni yeni mined hisselerden bazılarını gönderebileceksiniz.
* `Kullanıcı adı` anahtarları tutan bir kullanıcı olmalı, bu varlığı daha fazla nane için izin verir. Yani yukarıda belirttiğimiz minter setlerinden birinin _en_ azından eşik anahtarlarını kontrol ediyor.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":10000000,
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
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
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

[`Avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Bu da şöyle olmalı:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## Varlığı takas et

### Denge Kontrol Et

10 M hisselerinin `hepsi` `nane olarak` belirttiğimiz adres ile kontrol ediliyor. Bunu doğrulamak için [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cevap varlık yaratmamızın başarılı olduğunu ve beklenen adresin 10.000 hissesi olduğunu doğruluyor:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### Varlığı gönder.

[`Avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send) kullanarak başka bir adrese 100 hisse gönderelim. Bunu yapmak için:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "amount"  :100,
        "to"      :"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Adrese giden dengeleri `kontrol` edelim:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cevap şöyle olmalı:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## Toplantı

Bu özel ders için:

* Paylaşımları temsil eden `değişken` kap varlığı oluşturmak için kullanılıyor.
* Daha fazla mal varlığı `nane` şekeri kullanmış.
* Adres dengesini kontrol etmek için kullanılmış `bir` ayarlama ayarlaması.
* Hisselerini aktarmak için `kullanılmış.`

