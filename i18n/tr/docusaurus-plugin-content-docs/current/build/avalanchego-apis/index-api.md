---
sidebar\_position: 10
---
# İndeks API

AvalancheGo bir indeksleyici ile çalışmak üzere yapılandırılabilir. Yani, X-Chain, P-Chain ve C-Chain'de kabul ettiği her konteyneri \(bir blok, verteks veya işlem\) kaydeder \(indeksler\). AvalancheGo'yu indeksleme etkinleştirilmiş bir şekilde çalıştırmak için, [--index-enabled](../references/command-line-interface.md#apis) komut satırı bayrağını true olarak ayarlayın. **AvalancheGo, `--index-enabled`ögesi true olarak çalıştığında yalnızca kabul edilmiş olan konteynerleri indeksleyecektir.** Düğümünüzün eksiksiz bir indekse sahip olmasını sağlamak için, bir düğümü yeni bir veri tabanıyla ve `--index-enabled` true olarak ayarlanmış bir şekilde çalıştırın. Düğüm, bootstrapping sırasında ağ geçmişindeki her bloku, verteksi ve işlemi kabul ederek indeksinizin tamamlanmasını sağlar. İndeks oluşturma etkinken çalışıyorsa, düğümünüzü kapatmanızda bir sakınca yoktur. İndeks oluşturma hala etkinken yeniden başlarsa, çevrimdışıyken kabul edilen tüm konteynerleri kabul eder. İndeksleyici, kabul edilen bir bloğu, verteksi veya işlemi dizine eklemekte asla başarısız olmamalıdır.

İndekslenmiş konteynerler \(yani, kabul edilen bloklar, verteksler ve işlemler\), düğümün bu konteyneri kabul ettiği zamanla aynı zaman damgasına sahip olur. Eğer konteyner bootstrapping sırasında indekslendiyse, diğer düğümlerin konteyneri çok daha önce kabul etmiş olabileceğini aklınızda bulundurun. Bootstrapping sırasında indekslenen her konteyner, ağ tarafından ilk kabul edildiğinde değil, düğümün bootstrap yaptığı zaman ile aynı zaman damgasına sahip olacaktır.

DAGs için \(X-Chain dahil\), düğümlerin kesişme noktaları ve işlemleri birbirinden farklı bir sırada kabul edebileceğini unutmayın.

Bu doküman, AvalancheGo'nun Index API'sinden verilerin nasıl sorgulanacağını gösterir. Dizin API'si yalnızca `--index-enabled`ile çalıştırıldığında kullanılabilir.

## Go İstemcisi

Bir İndeks API istemcisinin bir Go implementasyonu vardır. Dokümanı [burada](https://pkg.go.dev/github.com/ava-labs/avalanchego/indexer#Client) görebilirsiniz. Bu istemci, İndeks API'si etkinleştirilmiş bir şekilde çalışan bir AvalancheGo düğümüne bağlanmak ve Index API'sine çağrılar yapmak için bir Go programında kullanılabilir.

## Format

Bu API `json 2.0`RPC formatını kullanmaktadır. JSON RPC çağrıları yapma hakkında daha fazla bilgi için [buraya](issuing-api-calls.md) bakın.

## Uç Noktalar

Her zincir bir veya daha fazla indekse sahiptir. Bir C-Chain blokunun kabul edilip edilmediğini görmek için C-Chain blok indeksine bir API çağrısı Bir X-Chain verteksinin kabul edilip edilmediğini görmek için X-Chain verteks indeksine bir API çağrısı gönderin.

### X-Chain İşlemleri

```text
/ext/index/X/tx
```

### X-Chain Kesişme Noktaları

```text
/ext/index/X/vtx
```

### P-Chain Blokları

```text
/ext/index/P/block
```

### C-Chain Blokları

```text
/ext/index/C/block
```

## API Metodları

### index.getLastAccepted

En son kabul edilen konteyneri getirin.

#### **İmza**

```cpp
index.getLastAccepted({
  encoding:string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

nerede:

* `id` konteynerin kimliğidir.
* `bytes` konteynerin bayt olarak temsilidir
* `timestamp` bu düğümün konteyneri kabul ettiği zamandır
* `index` bundan önce bu indekste kaç konteynerin kabul edildiğini gösterir
* `encoding`, `"cb58"`veya `"hex"` olabilir

#### **Örnek Çağrı**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Örnek Yanıt**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerByIndex

Konteyneri indekse göre getirin. Kabul edilen ilk konteyner 0 indeksinde, ikincisi 1 indeksindedir, vb.

#### **İmza**

```cpp
index.getContainerByIndex({
  index: uint64,
  encoding: string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` konteynerin kimliğidir.
* `bytes` konteynerin bayt olarak temsilidir
* `timestamp` bu düğümün konteyneri kabul ettiği zamandır
* `index` bundan önce bu indekste kaç konteynerin kabul edildiğini gösterir
* `encoding`, `"cb58"`veya `"hex"` olabilir

#### **Örnek Çağrı**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByIndex",
    "params": {
        "index":0,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Örnek Yanıt**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerByID

Konteyneri kimliğine göre getirin.

#### **İmza**

```cpp
index.getContainerByID({
  containerID: string,
  encoding: string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` konteynerin kimliğidir.
* `bytes` konteynerin bayt olarak temsilidir
* `timestamp` bu düğümün konteyneri kabul ettiği zamandır
* `index` bundan önce bu indekste kaç konteynerin kabul edildiğini gösterir
* `encoding`, `"cb58"`veya `"hex"` olabilir

#### **Örnek Çağrı**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByID",
    "params": {
        "containerID": "6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **Örnek Yanıt**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" : {
      "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
      "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
      "timestamp":"2021-04-02T15:34:00.262979-07:00",
      "encoding":"hex",
      "index":"0"
    }
}
```

### index.getContainerRange

[`startIndex`, `startIndex+1`, ... , `startIndex` \+ `numToFetch` - 1] içinde indeksleri olan konteynerleri döndürür.  `numToFetch`, `[0,1024]`içinde olmalıdır.

#### **İmza**

```cpp
index.getContainerRange({
  startIndex: uint64,
  numToFetch: uint64,
  encoding: string
}) -> []{
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` konteynerin kimliğidir.
* `bytes` konteynerin bayt olarak temsilidir
* `timestamp` bu düğümün konteyneri kabul ettiği zamandır
* `index` bundan önce bu indekste kaç konteynerin kabul edildiğini gösterir
* `encoding`, `"cb58"`veya `"hex"` olabilir

#### **Örnek Çağrı**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerRange",
    "params": {
        "startIndex":0,
        "numToFetch":100,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Örnek Yanıt**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :[{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }]
}
```

### index.getIndex

Bir konteynerin indeksini getirin.

#### **İmza**

```cpp
index.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

burada `encoding`, `"cb58"`veya `"hex"`olabilir.

#### **Örnek Çağrı**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getIndex",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Örnek Yanıt**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "index":"0"
    },
  "id":1
}
```

### index.isAccepted

Konteyner bu indeksteyse, true döndürür.

#### **İmza**

```cpp
index.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **Örnek Çağrı**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.isAccepted",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Örnek Yanıt**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "isAccepted": true
    },
  "id":1
}
```

