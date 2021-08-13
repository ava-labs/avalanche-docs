# Index API

AvalancheGo bir indeksleyici ile çalıştırılabilir Bu da her konteyner\ (bir blok, vertex veya transaction\) \(indexes\ ) kaydeder. AvalancheGo indeksleme etkinleştirme ile çalıştırmak için, komut satırı bayrağını `use` kullanın. AvalancheGo sadece `indeks` etkinleştirildiğinde kabul edilen konteynırları indeks olarak kullanacaktır. Düğününüzün tam bir indeksi olduğundan emin olmak için yeni bir veritabanı ve `--index-enabled`. bir düğümü çalıştırın. Düğün, ağ tarihindeki her bloğu, vertex ve işlemleri bootstrapping sırasında kabul eder, your tamamlanmasını sağlar. Eğer indeksleme etkinleştirme ile çalışıyorsa your kapatmanız sorun değil. Eğer endekse hala etkin olarak yeniden başlarsa, çevrimdışı olduğu sürece kabul edilen tüm konteynırları kabul edecektir. indeksleyici kabul edilmiş bir bloğu, vertex veya işlem indeksini asla yapamayacaktır.

Endekslenmiş konteynırlar \ (yani kabul edilmiş bloklar, dikler ve işlemler\), düğünün konteynırı kabul ettiği zaman zaman damgalanır. Eğer konteynır boz kayma sırasında if diğer düğümler konteynırı çok daha önce kabul etmiş olabilir. Bağlama sırasında indekslenmiş her konteyner, düğümün düğümünün düğümlendiği zaman ile zaman be ağ tarafından ilk kabul edildiğinde değil.

DAGs \ (X-Chain\ dahil) için düğümlerin dikey ve işlemleri birbirlerinden farklı bir sırayla kabul edebileceğinin dikkat edin.

Bu belge, AvalancheGo's Endeksi from verileri nasıl sorgulayacağını gösteriyor. Endeks API sadece `indeks` etkinleştirildiğinde mevcuttur.

## Format

Bu API, `json 2.0` RPC formatını kullanır. JSON RPC arama yapmak için daha fazla bilgi için, [buraya](issuing-api-calls.md) bakın.

## Son nokta

Her zincir bir veya daha fazla endeksi vardır. C-Chain bloğu kabul edilip edilmediğini görmek için, örneğin C-Chain blok indeksine bir API çağrısı gönder. Örneğin, X-Chain bloğu kabul edilip edilmediğini görmek için X-Chain blok indeksine bir API çağrısı gönder.

### X-Chain İşlemleri

```text
/ext/index/X/tx
```

### X-Chain Vertices

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

## API Yöntemleri

### index.getLastAccepted Edildi

En son kabul edilen konteynırı al.

#### **İmzalanma**

```cpp
info.getLastAccepted({
  encoding:string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

Nereye?

* `Kimlik` konteynerin kimliği.
* `bytes` konteynırın byte temsilidir.
* `Zaman damgası` bu düğümün konteynırı kabul ettiği zaman.
* `Bu` indekste bu indekste kaç tane konteynır kabul edilir
* `Kodlama` `"cb58"` veya `"hek"`

#### **Örnek Example**

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

#### **Örnek Tepki**

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

### index.getContainerByIndex index.getContainerByIndex info: status

Konteyneri indeksle al. Kabul edilen ilk konteyner indeks 0, ikincisi indeks 1, vb.

#### **İmzalanma**

```cpp
info.getContainerByIndex({
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

* `Kimlik` konteynerin kimliği.
* `bytes` konteynırın byte temsilidir.
* `Zaman damgası` bu düğümün konteynırı kabul ettiği zaman.
* `Bu` indekste bu indekste kaç tane konteynır kabul edilir
* `Kodlama` `"cb58"` veya `"hek"`

#### **Örnek Example**

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

#### **Örnek Tepki**

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

### index.getContainerRange Aralığı

`Endeks`, `startIndex+1`, .., `startIndex` + `numToFetch` - 1\]. `numToFetch` `(0,1024)` içinde olmak zorunda.

#### **İmzalanma**

```cpp
info.getContainerRange({
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

* `Kimlik` konteynerin kimliği.
* `bytes` konteynırın byte temsilidir.
* `Zaman damgası` bu düğümün konteynırı kabul ettiği zaman.
* `Bu` indekste bu indekste kaç tane konteynır kabul edilir
* `Kodlama` `"cb58"` veya `"hek"`

#### **Örnek Example**

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

#### **Örnek Tepki**

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

Konteynır indeksini al.

#### **İmzalanma**

```cpp
info.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

`Kodlama` `"cb58"` veya `"hece"` anlamına gelir.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

### index.isAccepted kabul edildi

Konteyner bu indekste ise doğru döner.

#### **İmzalanma**

```cpp
info.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **Örnek Example**

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

#### **Örnek Tepki**

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

