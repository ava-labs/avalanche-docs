# Sabit Arz Limitli Varlık Yaratma

## Giriş

Bu eğitim makalesinde Avalanche'ın sabit arz limitli, değiştirebilir varlık yaratmak ve alıp satmak için nasıl kullanılabileceği gösterilmektedir. Bir varlığın ilk arzında o varlık belli bir miktarda yaratılır ve daha sonra daha fazlası hiçbir zaman yaratılmaz.

Diyelim ki 10 milyon paydan oluşan bir Gelir Paylaşımı Sözleşmesi \(GPS\) mevcut ve daha fazla pay hiçbir zaman yaratılmıyor. Şimdi varlığın bir adedinin GPS'nin bir payını temsil ettiği bir varlık yaratalım.

## Gereklilikler

[Bir Avalanche Düğümünü Çalıştırma](../nodes-and-staking/run-avalanche-node.md) eğitimini tamamlamış ve [Avalanche mimarisini](../../../learn/platform-overview/README.md) biliyor olmanız.

## Varlığın Yaratılması

Varlığımız [X-Chain](../../../learn/platform-overview/README.md#exchange-chain-x-chain) platformunda bulunacak, bu nedenle varlığımızı yaratmak için bir [X-Chain API'si](../../avalanchego-apis/exchange-chain-x-chain-api.mdx) metodu olan `avm.createFixedCapAsset` komutunu çağıracağız.

Bu metodun imzası şöyledir:

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

* `name`, varlığın insan tarafından okunabilir adıdır. Benzersiz olması gerekmez.
* `symbol`, varlığın kısaltma sembolüdür. 0 ile 4 karakter arasındadır. Benzersiz olması gerekmez. Kullanılmayabilir.
* `denomination`, bu varlığa ait bakiyelerin kullanıcı arayüzlerinde nasıl görüntüleneceğini belirler. Denomination 0 ise, bu varlığın 100 adedi 100 olarak gösterilir. Denomination 1 ise, bu varlığın 100 adedi 10.0 olarak gösterilir. Denomination 2 ise, bu varlığın 100 adedi .100 olarak gösterilir vb.
* X-Chain'de işlem yapmak AVAX cinsinden bir işlem ücreti ödenmesini gerektirir. `username` ve `password` parametreleri ücreti ödeyen kullanıcıyı ifade eder.
* `initialHolders` parametresindeki her bir eleman ilk çıkışta \(genesis\) `address` adresinde `amount` adet varlık bulunduğunu belirtir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, yapılan değişiklik kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.

### Yanıt

* `assetID`, yeni varlığın kimliğidir.
* Sonuç kısmındaki `changeAddr` parametresi, yapılan bir değişikliğin gönderildiği adrestir.

Şimdi varlığı yaratmaya geçelim. `address` parametresindeki adresi, kontrol ettiğiniz bir adresle değiştirin, böylece yeni mint edilen varlıkların tümünü kontrol edersiniz ve varlıkların bir kısmını daha sonra bu eğitim makalesinde açıklandığı şekilde gönderebilirsiniz.

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

Gelen yanıt, aynı zamanda bu işlemin de kimliği olan varlık kimliğini içerir:

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

## Varlığı Alıp Satma

### Bir bakiyeyi kontrol etme

10.000.000 adet varlığın \(pay\) tümü `initialHolders` parametresinde belirttiğimiz adres tarafından kontrol edilir.

Bunu doğrulamak için [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-getbalance) komutunu çağırırız:

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

Gelen yanıt, varlık oluşturma işlemimizin başarılı olduğunu ve beklenen adreste 10.000.000 payın tümünün mevcut olduğunu onaylar:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### Varlığı gönderme

Şimdi [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-send) komutunu çağırarak 100 pay gönderelim.

Payları göndermek için payların gönderildiği kullanıcıyı kontrol ettiğimizi kanıtlamamız gerekir. Bu nedenle, bu kez `username` ve `password` parametrelerini doldurmamız gerekir.

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

### İşlem durumunu kontrol etme

Yukarıdaki çağrıdan gelen yanıt şöyle görünmelidir:

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

`txID`, ağa gönderdiğimiz `send` işleminin kimliğidir.

Bir-iki saniye sonra işlem kesinleştirilmiş olmalıdır. İşlemin durumunu [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.mdx#avm-gettxstatus) komutuyla kontrol edebiliriz:

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

Gelen yanıt şöyle görünmelidir:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

Ağ henüz işlemi kesinleştirmediyse `status` \(durum\) ögesinin `Pending` \(bekleniyor\) olduğunu da görebilirsiniz.

Şimdi `to` adresinin bakiyesini kontrol edelim:

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

Gelen yanıt şöyle olmalıdır:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## Özet

Bu eğitim makalesinde

* Sabit arz limitli bir varlık yaratmak için `createFixedCapAsset` komutunu çağırdık
* Adres bakiyelerini kontrol etmek için `getBalance` komutunu çağırdık
* Varlığımızın bir miktarını transfer etmek için `send` komutunu çağırdık

