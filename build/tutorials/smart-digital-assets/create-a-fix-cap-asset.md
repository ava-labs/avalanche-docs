# Düzeltilmiş Başlık Varlığı Oluştur

## Tanıştırma

Bu özel ders Avalanche sabit kapak ve mantarlı bir varlık oluşturmak için nasıl kullanılabileceğini göstermektedir. Varlığın belirli bir miktarı varlığın başlatılmasında yaratılır ve daha sonra hiçbir zaman yaratılmamıştır.

10 M hissesi olan bir gelir paylaşımı anlaşması \(ISA\) olduğunu ve daha fazla hisse sahibi olmadıklarını varsayalım. Varlık birimi ISA'nın bir payını temsil eden bir varlık yaratalım.

## Gereklilik

[Bir Avalanche](../nodes-and-staking/run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz.

## Varlığı oluştur

[on](../../../learn/platform-overview/#exchange-chain-x-chain)`avm.createFixedCapAsset` varlığımız var, bu yüzden [X-Chain, X-Chain’s](../../avalanchego-apis/exchange-chain-x-chain-api.md) bir metodu olarak adlandıracağımız varlığımızı oluşturacağız.

Bu yöntemin imzası:

```cpp
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int,  
    initialHolders: []{
        address: string,
        amount: int
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

* `name`Bu bir insan ismi olarak okunabilir bir isimdir. Eşsiz olması gerekmez.
* `symbol`Bu bir eşya sembolü. 0 ile 4 karakter arasında. Eşsiz olması gerekmez. Belki de atılmıştır.
* `denomination`Bu varlığın dengelerinin kullanıcı arayüzleri tarafından nasıl gösterildiğini belirler. Eğer bu varlığın paydası 0, 100 ünite olarak gösterilecek. Eğer payda 1 100 birim ise bu varlığın 10.0 olarak gösterilecek. Eğer bu varlığın paydası 2, 100 ünite .100 olarak görüntülenir.
* `username``password`X-Chain bir işlem gerçekleştirmek in ödenen bir işlem ücreti gerektirir.
* `initialHolders`Her element, varlığın at `amount`birimleri `address`barındırır.
* `from`Bu operasyon için kullanmak istediğiniz adresler. Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `changeAddr`Bu adres, herhangi bir değişiklik gönderilecek. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.

### Yanıt

* `assetID`Yeni varlığın kimliği.
* `changeAddr`Sonuç olarak, herhangi bir değişikliğin gönderildiği adres.

Şimdi de varlığı yaratmaya devam ediyoruz. Kontrol ettiğiniz bir adres `address`ile değiştirilmek isteyeceksiniz. Böylece yeni yeni naneli varlıkların hepsini kontrol edeceksiniz. Ve daha sonra bu ders için göndereceksiniz.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "ISA Shares",
        "symbol":"ISAS",
        "denomination": 0,
        "initialHolders": [
            {
                "address": "X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
                "amount": 10000000
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Bu işlem aynı zamanda bu işlemin kimliği de içeriyor:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## Varlığı takas et

### Denge kontrol et

10.000 ünite varlığın tamamı \(hisseler\) belirttiğimiz adres tarafından kontrol `initialHolders`ediliyor.

Bunu doğrulamak için şöyle [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)deriz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
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

Şimdi arayarak 100 hisse [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send)gönderelim.

Hisseleri göndermek için hisseleri gönderen kullanıcıyı kontrol ettiğimizi kanıtlamalıyız. Bu yüzden bu sefer doldurmamız gerekecek `username`ve doldurmamız gerekecek.`password`

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "amount"  :100,
        "to"      :"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

### İşlem durumunu kontrol et

Yukarıdaki çağrıdan gelen yanıt şöyle olmalı:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

`txID`Bu şebekeye gönderdiğimiz `send`işlemlerin kimliği.

Bir iki saniye sonra işlem tamamlanacaktır. İşlemin durumunu şöyle kontrol [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)edebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Tepki şöyle olmalı:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

`status`Eğer ağ henüz `Pending`tamamlanmadıysa bunu da görebilirsiniz.

Şimdi adresin dengesini kontrol `to`edelim:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
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

* Sabit bir başlık varlığı oluşturmak `createFixedCapAsset`için çağrıldı
* Adres dengeleri kontrol etmek `getBalance`için çağrıldı.
* Varlığımızın bir miktarını aktarmak için `send`çağrıldı.

