# API Çağrıları Veriyor

Bu rehber Avalanche düğümleri tarafından açık to nasıl telefon açacağını açıklar.

### Sonucu noktası<a id="endpoint"></a>

Bir API çağrısı bir son noktaya getirilir, ki bu bir URL olur. URL'nin tabanı her zaman şöyle:

`[node-ip]:[http-port]`

- Nerede?

* `Node-ip` çağrının IP adresi olarak adlandırılır.
* `http-port` HTTP çağrıları için düğümün dinlediği port Bu [durum komut-satırı argümanı](../references/command-line-interface.md#http-server) `http-port` \(varsayılan değer `9650`\) ile belirtilir.

Örneğin, taban URL şöyle görünebilir: `127.0.1:9650`.

Her API’nin belgeseli, API’nin yöntemlerine ulaşmak için kullanıcının hangi uç noktasının hangi noktasını aradığını belirtir.

## JSON RPC API Biçimi

Birçok dahili API, isteklerini ve yanıtlarını tanımlamak için [JSON RPC 2.0](https://www.jsonrpc.org/specification) biçimini kullanır. Bu API'ler Platform API ve X-Chain API içerir.

### JSON RPC İsteği Yapılıyor.

[X-Chain API](exchange-chain-x-chain-api.md)'nin `getTxStatus` yöntemini aramak istiyoruz. X-Chain API belgeseli bu API için sonun `/ext/bc/X` olduğunu söyler.

Bu da API çağrımızı gönderdiğimiz son nokta şu:

`[node-ip]:[http-port]/ext/bc/X`

X-Chain API belgeseli bize `getTxStatus` imzasının şöyle olduğunu söylüyor:

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

Nereye?

* Argent `txID` durumunun nasıl olduğunu öğrendiğimiz işlemlerin kimliğidir.
* Değerlendirme `durumu` söz konusu işlemlerin durumudur.

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

* `Jsonrpc` JSON RPC protokolünün sürümünü belirler. \ (Pratikte her zaman 2.0\
* `Yöntemi,``` to istediğimiz service ve metodu \(`getTxStatus`\) belirler.
* `Params` yöntemin argümanlarını belirler.
* `Bu` isteğin kimliği. Kimlikler eşsiz olmalı.

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

* `Bu` yanıtın cevabının kimlik kimliği kimliğidir.
* `Sonuç ise` of `geri` dönme değerleridir.

### JSON RPC Hata Yanıtı

Eğer API yöntemi çağrıldığında bir hata geri dönerse, sonuç yerine bir alan `hatası` `olacaktır`. Ayrıca, meydana gelen hata hakkında ek bilgi içeren fazladan bir alan `var.`

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

