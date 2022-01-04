---
sidebar\_position: 2
---
# API Çağrıları Yayımlama

Bu kılavuzda Avalanche düğümlerinin sunduğu API'lere nasıl çağrı yapılacağı açıklanmaktadır.

### Son Nokta {#endpoint}

Bir API çağrısı bir URL olan bir son noktaya yapılır. URL'nin tabanı her zaman şudur:

`[node-ip]:[http-port]`

burada

* `node-ip`, çağrı hangi düğüme yapılıyorsa, o düğümün IP adresidir.
* `http-port`, düğümün HTTP çağrılarını dinlediği port'tur. Bu port, [komut satırı argümanı](../references/command-line-interface.md#http-server) `http-port` vasıtasıyla belirtilir \(varsayılan değer `9650`'dir\).

Örneğin, taban URL şöyle görünebilir: `127.0.0.1:9650`.

Her API'nin dokümanında, kullanıcının API'nin metotlarına erişmek için hangi son noktaya çağrılar yapması gerektiği belirtilir.

## JSON RPC Formatlı API'ler

Birkaç yerleşik API, istekleri ve yanıtları belirtmek için [JSON RPC 2.0](https://www.jsonrpc.org/specification) formatını kullanır. Bu API'ler arasında Platform API ve X-Chain API yer alır.

### Bir JSON RPC İsteği Gönderilmesi

Diyelim ki [X-Chain API](exchange-chain-x-chain-api.mdx)'nin `getTxStatus` metodunu çağırmak istiyoruz. X-Chain API dokümanında bu API'nin son noktasının `/ext/bc/X` olduğu belirtiliyor.

Buna göre, API çağrımızı gönderdiğimiz son nokta şudur:

`[node-ip]:[http-port]/ext/bc/X`

X-Chain API dokümanında `getTxStatus`'in imzasının şu olduğu belirtiliyor:

[`avm.getTxStatus`](exchange-chain-x-chain-api.mdx#avm-gettxstatus)`(txID:bytes) -> (status:string)`

burada:

* `txID` argümanı, durumunu getirdiğimiz işlemin kimliğidir.
* Döndürülen `status` değeri, söz konusu işlemin durumudur.

O halde, bu metodu çağırmak için:

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

* `jsonrpc`, JSON RPC protokolünün sürümünü belirtir. \(Uygulamada her zaman 2.0'dır\)
* `method`, getirmek istediğimiz servisi \(`avm`\) ve metodu \(`getTxStatus`\) belirtir.
* `params`, metodun argümanlarını belirtir.
* `id`, bu isteğin kimliğidir. İstek kimlikleri benzersiz olmalıdır.

Bu kadar!

### JSON RPC İşlem Başarılı Yanıtı

Çağrı başarılı olursa, yanıt şöyle görünecektir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id`, bu yanıtın ilgili olduğu isteğin kimliğidir.
* `result`, `getTxStatus` komutunun döndürülen değerlerdir.

### JSON RPC Hata Yanıtı

Çağrılan API metodu bir hata döndürürse, yanıtta `result` yerine `error` alanı olur. Ek olarak, oluşan hata hakkında ek bilgiler içeren ekstra bir `data` alanı vardır.

Böyle bir yanıt şöyle görünebilir:

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

## Diğer API Formatları

Bazı API'ler istekleri ve yanıtları formatlamak için JSON RPC 2.0'den farklı bir standart kullanabilir. Böyle bir uzantının dokümanında çağrıların nasıl yapılacağı ve yanıtların nasıl parse edileceği belirtiliyor olmalıdır.

## Baytların Gönderilmesi ve Alınması

Aksi belirtilmedikçe, bir API çağrısında/yanıtında baytlar gönderildiğinde, bu baytlar bir sağlama toplamı içeren bir base-58 kodlaması olan [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) temsilinde olurlar

