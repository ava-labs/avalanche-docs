# Değişken Başlık Varlığı Oluştur

## Tanıştırma

Bu özel ders değişken kapak ve mantarlı bir varlık yaratmayı gösterir. Varlık başlatıldığında hiçbir varlık birimi mevcut değildir ancak daha fazla varlık birimi azalabilir. Varlık yaratılışında, hangi adreslerin daha fazla birim şekline girebileceğini belirleriz.

__Neden tek bir adres yerine varlığın daha fazla birimini şekillendirebilen adresleri belirleyeceğimizi merak ediyor olabilirsiniz. İşte neden:

* **Güvenlik: Eğer bir adres varlığı daha fazla nane **yapabilirse ve bu adrese giden özel anahtar kaybolursa, başka birim asla daraltılamaz. Benzer şekilde, sadece bir adres varlığı daha fazla nane yapabilirse bu adres sahibinin istedikleri kadar tek taraflı şekilde naneli olmasını durduramaz.
* ****Esneklik: "Alice bu varlığın tek taraflı olarak daha fazla birimini dinesh, Ellin, ve Jamie daha fazla nane yapabilir." gibi mantığı kodlamak güzel.

Diyelim ki bir şirketin hisselerini temsil eden bir varlık yayınlamak istiyoruz. Başlangıç için hiçbir hisse mevcut değildir ancak daha sonra daha fazla hisse oluşturulabilir. Böyle bir varlık yaratalım.

## Gereklilik

[Bir Avalanche](../nodes-and-staking/run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz.

## Varlığı oluştur

[`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset)on varlığımız var, bu yüzden [call X-Chain’s](../../avalanchego-apis/exchange-chain-x-chain-api.md) bir metodu olarak adlandıracağımız varlığımızı oluşturacağız.

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

* `name`Varlığımız için okunabilir bir isim. Eşsiz olması gerekmez. 0 ile 128 karakter.
* `symbol`Bu varlığın bir kısaltma sembolü. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `denomination`Bu varlığın dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. Eğer bu varlığın paydası 0, 100 ünite olarak gösterilecek. Eğer payda 1 100 birim ise bu varlığın 10.0 olarak gösterilecek. Eğer bu varlığın paydası 2, 100 ünite .100 olarak görüntülenir.
* `minterSets`Bu liste her elementin bir nane `threshold`işlemini imzalayarak varlığın daha çok nane şekline sahip `minters`olabileceği belirtilir.
* `username``password`X-Chain bir işlem gerçekleştirmek in ödenen bir işlem ücreti gerektirir.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.

### Yanıt

* `assetID`Yeni varlığın kimliği.
* `changeAddr`Sonuç olarak, herhangi bir değişikliğin gönderildiği adres.

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

Hisseleri nane [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint)olarak kullanacağız.

* `amount`Bu da yaratılacak hisse sayısı.
* `assetID`Daha fazla yarattığımız varlığın kimliği.
* `to`Yeni tazminat hisselerini alacak olan adres. `to`Kullanıcı your yerine adresi verin böylece yeni yeni mined hisselerden bazılarını gönderebilirsiniz.
* `username`Bu varlığı daha fazla nane için anahtarları tutan bir kullanıcı olmalı. Yani yukarıda belirttiğimiz minter setlerinden birinin en azından _eşik _anahtarlarını kontrol ediyor.

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

Az önce ağa gönderdiğimiz işlemlerin durumunu kontrol [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)edebiliriz:

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

10 M hisselerinin hepsi belirttiğimiz `to`adres tarafından kontrol ediliyor.`mint` Bunu doğrulamak için [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)kullanacağız:

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

Kullanarak başka bir adrese 100 hisse [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send)gönderelim. Bunu yapmak için:

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

Adresin dengelemelerini kontrol `to`edelim:

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

* Hisseleri temsil eden değişken kap varlığı `createVariableCapAsset`yaratırdı.
* Daha fazla mal varlığı nane şekeri `mint`yapardık.
* Adres dengesini kontrol `getBalance`ederdik.
* Hisselerini transfer `send`ederdi.

