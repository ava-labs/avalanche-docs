# API Çağrıları Veriyor

Bu rehber Avalanche düğümleri tarafından açık to nasıl telefon açacağını açıklar.

### Sonucu noktası<a id="endpoint"></a>

Bir API çağrısı bir son noktaya getirilir, ki bu bir URL olur. URL'nin tabanı her zaman şöyle:

`[node-ip]:[http-port]`

- Nerede?

* `node-ip`Bu çağrının verildiği düğümün IP adresi
* `http-port`HTTP çağrıları için düğümün dinlediği port Bu [komut satırı argümanı](../references/command-line-interface.md#http-server) `http-port`\(varsayılan değer\) ile `9650`belirtilir.

`127.0.0.1:9650`Örneğin, temel URL şöyle görünebilir:

Her API’nin belgeseli, API’nin yöntemlerine ulaşmak için kullanıcının hangi uç noktasının hangi noktasını aradığını belirtir.

## JSON RPC API Biçimi

Birçok dahili API, isteklerini ve yanıtlarını tanımlamak için [JSON RPC 2.0](https://www.jsonrpc.org/specification) biçimini kullanır. Bu API'ler Platform API ve X-Chain API içerir.

### JSON RPC İsteği Yapılıyor.

[X-Chain](exchange-chain-x-chain-api.md) API'nin `getTxStatus`yöntemini aramak istiyoruz. X-Chain API belgeleri bize bu API için son nokta olduğunu `/ext/bc/X`söylüyor.

Bu da API çağrımızı gönderdiğimiz son nokta şu:

`[node-ip]:[http-port]/ext/bc/X`

X-Chain API belgeseli bize imzanın şöyle olduğunu `getTxStatus`söylüyor:

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

Nereye?

* `txID`Tartışma durumumuzu ele geçirdiğimiz işlemlerin kimliğidir.
* `status`Değerlendirme konusu işlem durumudur.

Bu yöntemi aramak için:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :4,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

* `jsonrpc`JSON RPC protokolünün sürümünü belirler. \(Pratikte her zaman 2.0\)
* `method``getTxStatus`\(\) `avm`ve istek yapmak istediğimiz hizmet \(\) ile metot \(\) belirler.
* `params`Yöntemin argümanlarını belirler.
* `id`Bu isteğin kimliği. Kimlikler eşsiz olmalı.

İşte böyle!

### JSON RPC Başarı Tepkisi

Eğer arama başarılı olursa, cevap şöyle olacak:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id`Bu yanıtın karşılık geldiği talebin kimliği.
* `result`...geri dönme değerleri.`getTxStatus`

### JSON RPC Hata Yanıtı

`error`Eğer API yöntemi çağrıldığında bir hata geri dönerse, yanıtın yerine bir alan olacaktır.`result` `data`Ayrıca, meydana gelen hata hakkında ek bilgi içeren fazladan bir alan da vardır.

Böyle bir tepki şöyle olurdu:

```cpp
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32600,
        "message": "[Some error message here]",
        "data": [Object with additional information about the error]
    },
    "id": 1
}
```

## Diğer API Biçimleri

Bazı API'ler isteklerini ve yanıtlarını biçimlendirmek için JSON RPC 2.0 dışında bir standart kullanabilirler. Bu tür uzantı, onlara nasıl telefon açacağını ve onlara yanıtları to belirtmelidir.

## Gönderme ve Alıcı Eklentileri

Aksi belirtilmedikçe bytes bir API çağrısı / yanıt gönderilirse, [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) temsilinde, bir checksum ile bir taban 58 kodlaması

