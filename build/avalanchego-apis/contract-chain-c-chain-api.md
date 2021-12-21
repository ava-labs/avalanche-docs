---
description: C-Chain, Ethereum Sanal Makinesinin \(EVM\) bir instance'ıdır
---

# Kontrat Zinciri \(C-Chain\) API'si

_Not: Ethereum'un kendi `networkID` ve `chainID` kavramları bulunmaktadır. Bunların Avalanche'ın ağ kimliği ve zincir kimliğiyle ilişkisi yoktur ve hepsi yalnızca _ [_C-Chain'in_](../../learn/platform-overview/#contract-chain-c-chain)_ içindedir. Mainnet üzerinde C-Chain, bu değerler için `1` ve `43114` kullanır. Fuji Testnet üzerinde, bu değerler için `1` ve `43113`kullanır. `net_version` ve `eth_chainId` metotları kullanılarak `networkID` ve `chainID` de elde edilebilir._

## Bir Akıllı Sözleşmenin Kullanıma Sunulması

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## Ethereum API'leri

### Ethereum API Son Noktaları

#### JSON-RPC Son Noktaları

JSON-RPC son noktası yoluyla C-Chain ile etkileşimde bulunmak için:

```cpp
/ext/bc/C/rpc
```

JSON-RPC son noktası yoluyla EVM'nin diğer instance'larıyla etkileşimde bulunmak için:

```cpp
/ext/bc/blockchainID/rpc
```

burada `blockchainID`, EVM'yi çalıştıran blok zincirin kimliğidir.

#### WebSoket Son Noktaları

Websocket son noktası yoluyla C-Chain ile etkileşimde bulunmak için:

```cpp
/ext/bc/C/ws
```

Örneğin, localhost üzerinde web soketi kullanarak C-Chain'in Ethereum API'si ile etkileşimde bulunmak için kullanabilecekleriniz:

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Not: yerel ana bilgisayarda `ws://` kullanın. [Genel API](../tools/public-api.md) veya şifrelemeyi destekleyen başka bir ana bilgisayar kullanırken `wss://` kullanın.

Web soketi uç noktası aracılığıyla diğer EVM örnekleriyle etkileşimde bulunmak için:

```cpp
/ext/bc/blockchainID/ws
```

burada `blockchainID`, EVM'yi çalıştıran blok zincirin kimliğidir.

### Metotlar

#### Standart Ethereum API'leri

Avalanche, Geth'in API'siyle özdeş olan bir API arayüzü sunar; bu özdeşliğin tek istisnası, bu arayüzün sadece aşağıdaki servisleri desteklemesidir:

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

Bu servislerle, Geth ile kurduğunuz etkileşimle tamamen aynı şekilde etkileşimde bulunabilirsiniz. Bu API'nin tam bir açıklaması için [Ethereum Wiki'nin JSON-RPC Dokümanına](https://eth.wiki/json-rpc/API) ve [Geth'in JSON-RPC dokümanına](https://geth.ethereum.org/docs/rpc/server) bakın.

#### eth\_getAssetBalance

Avalanche, standart Ethereum API'lerine ek olarak, C-Chain'deki birinci sınıf Avalanche Yerel Token'larının bakiyesini almak için `eth_getAssetBalance` komutunu sunar \(AVAX hariçtir; AVAX bakiyesini almak için `eth_getBalance` komutu kullanılır\).

**İmza**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `address`, varlığın sahibidir
* `blk`, getirilecek bakiyenin bulunduğu blok numarası veya hash'tir
* `assetID`, bakiyesi istenen varlığın kimliğidir

**Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getAssetBalance",
    "params": [
        "0x8723e5773847A4Eb5FeEDabD9320802c5c812F46",
        "latest",
        "3RvKBAmQnfYionFXMfW5P8TDZgZiogKbHjM8cjpu16LKAgF5T"
    ],
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

**Örnek Yanıt**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

### eth\_baseFee

Bir sonraki blokun taban ücretini alın.

#### **İmza**

```cpp
eth_baseFee() -> {}
```

`result`, bir sonraki blokun taban ücretinin hex değeridir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_baseFee",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x34630b8a00"
}
```

### eth\_maxPriorityFeePerGas

Bir bloka dahil edilmesi gereken öncelik ücretini alın.

#### **İmza**

```cpp
eth_maxPriorityFeePerGas() -> {}
```

`result`, bir bloka dahil edilmesi gereken öncelik ücretinin hex değeridir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_maxPriorityFeePerGas",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x2540be400"
}
```

Dinamik ücretler hakkında daha fazla bilgi için [işlem ücreti dokümanının C-Chain bölümüne](https://docs.avax.network/learn/platform-overview/transaction-fees#c-chain-fees) bakın.

## Avalanche'a Özgü API'ler

### Son Noktalar

C-Chain'de `avax`'a özgü RPC çağrılarıyla etkileşimde bulunmak için:

```cpp
/ext/bc/C/avax
```

EVM AVAX son noktalarının diğer instance'larıyla etkileşimde bulunmak için:

```cpp
/ext/bc/blockchainID/avax
```

### avax.getAtomicTx

Bir işlemi, o işlemin kimliği vasıtasıyla getirir. Döndürülen işlemin formatını belirtmek için isteğe bağlı kodlama parametresi. `cb58` veya `hex` olabilir. Varsayılan olarak `cb58`'e ayarlıdır.

#### İmza

```go
avax.getAtomicTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
    blockHeight: string
}
```

**İstek**

* `txID`, işlem kimliğidir. cb58 formatında olmalıdır.
* `encoding`, kullanılacak kodlama formatıdır. `cb58` veya `hex` olabilir. Varsayılan olarak `cb58`'e ayarlıdır.

**Yanıt**

* `tx`, `encoding`'e kodlanan işlemdir.
* `encoding`, `encoding`'dir.
* `blockHeight`, işlemin içinde yer aldığı blokun yüksekliğidir.

#### Örnek Çağrı

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getAtomicTx",
    "params" :{
        "txID":"2GD5SRYJQr2kw5jE73trBFiAgVQyrCaeg223TaTyJFYXf2kPty",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Örnek Yanıt

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111111115k3oJsP1JGxvsZPFh1WXzSYNVDtvgvZ4qDWtAs5ccogA1RtT3Me5x8xgkj7cyxaNGEHuMv5U34qo94fnvHweLeSRf31ggt3MoD7MHSDw6LbiXeaJa3uwBDHzd6tPxw17478X13Ff7DkHtbWYYx2WTcJYk4nVP2swCHjBE3uQjmu6RdhtgZCxvnD6YVpEsXqvam6cDzpf5BLaosYCSt5p8SmLU2ppaSb6DPA4EW4679ygUxiDNP3SFagjUvzSrfBJRFCzsan4ZJqH8haYqpJL42TUN4q3eFKvscZfp2v2WWEEwJYmJP4Nc1P7wndeMxPFEm3vjkBaVUZ5k25TpYtghq6Kx897dVNaMSsTAoudwqTR1cCUGiR3bLfi82MgnvuApsYqtRfaD9deSHc8UA1ohPehkj9eaY",
        "encoding": "cb58",
        "blockHeight": "1"
    },
    "id": 1
}
```

### avax.export

C-Chain'den X-Chain'e bir varlık aktarın. Bu metodu çağırdıktan sonra, transferi tamamlamak için X-Chain'de [`avm.import`](exchange-chain-x-chain-api.md#avm-import) komutunu çağırmanız gerekir.

#### İmza

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    baseFee: int,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to`, varlığın gönderildiği X-Chain adresidir.
* `amount`, gönderilecek varlığın tutarıdır.
* `assetID`, varlığın kimliğidir. Dışa AVAX aktarmak için, `assetID` olarak `"AVAX"` kullanın.
* `baseFee`, işlemi oluştururken uygulanması beklenen taban ücrettir. Atlanırsa, önerilen bir ücret kullanılacaktır.
* `username`, işlemin gönderileceği adresi kontrol eden kullanıcıdır.
* `password`, `username`'in parolasıdır.

#### Örnek Çağrı

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.export",
    "params" :{
        "to":"X-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "assetID": "2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Örnek Yanıt

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2W5JuFENitZKTpJsy9igBpTcEeBKxBHHGAUkgsSUnkjVVGQ9i8"
    },
    "id": 1
}
```

### avax.exportAVAX

**KULLANIMDAN KALDIRILDI—bunun yerine** [**avax.export**](contract-chain-c-chain-api.md#avax-export) kullanın.

C-Chain'den X-Chain'e AVAX gönderin. Bu metodu çağırdıktan sonra, transferi tamamlamak için X-Chain'de [`avm.import`](exchange-chain-x-chain-api.md#avm-import) komutunu `AVAX` varlık kimliğiyle çağırmanız gerekir.

#### İmza

```go
avax.export({
    to: string,
    amount: int,
    baseFee: int,
    username: string,
    password:string,
}) -> {txID: string}
```

**İstek**

* `to`, varlığın gönderildiği X-Chain adresidir.
* `amount`, gönderilecek varlığın tutarıdır.
* `baseFee`, işlemi oluştururken uygulanması beklenen taban ücrettir. Atlanırsa, önerilen bir ücret kullanılacaktır.
* `username`, işlemin gönderileceği adresi kontrol eden kullanıcıdır.
* `password`, `username`'in parolasıdır.

**Yanıt**

* `txID`, tamamlanan ExportTx işleminin işlem kimliğidir \(txID\).

#### Örnek Çağrı

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportAVAX",
    "params" :{
        "from": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"],
        "to":"X-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "changeAddr": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Örnek Yanıt

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2ffcxdkiKXXA4JdyRoS38dd7zoThkapNPeZuGPmmLBbiuBBHDa"
    },
    "id": 1
}
```

### avax.exportKey

Belli bir adresi kontrol eden özel anahtarı alın. Döndürülen özel anahtar, `avax.importKey` komutu ile bir kullanıcıya eklenebilir.

#### İmza

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**İstek**

* `username`, `address`'i kontrol etmelidir.
* `address`, ilgili özel anahtarı dışa aktarmak istediğiniz adrestir. hex formatında olması gerekir.

**Yanıt**

* `privateKey`, `address`'i kontrol eden özel anahtarın CB58 formatıyla kodlanmış string temsilidir. Bir `PrivateKey-` önekine sahiptir ve bir anahtarı `avax.importKey` yoluyla içe aktarmak için kullanılabilir.
* `privateKeyHex`, `address`'i kontrol eden özel anahtarın hex formatlı string temsilidir. Bir hesabı Metamask'a aktarmak için kullanılabilir.

#### Örnek Çağrı

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Örnek Yanıt

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "privateKey": "PrivateKey-2o2uPgTSf3aR5nW6yLHjBEAiatAFKEhApvYzsjvAJKRXVWCYkE",
        "privateKeyHex": "0xec381fb8d32168be4cf7f8d4ce9d8ca892d77ba574264f3665ad5edb89710157"
    },
    "id": 1
}}
```

### avax.getUTXOs

Belli bir adrese referans yapan UTXO'ları getirir.

#### **İmza**

```cpp
avax.getUTXOs(
    {
        addresses: string,
        limit: int, //optional
        startIndex: { //optional
            address: string,
            utxo: string
        },
        sourceChain: string,
        encoding: string, //optional
    },
) ->
{
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    }
}
```

* `utxos`, her bir UTXO'nun `addresses`'deki en az bir adrese referans yaptığı UTXO'ların bir listesidir.
* En çok `limit` kadar sayıda UTXO döndürülür. Eğer `limit` kullanılmazsa veya 1024'ten büyükse, 1024'e ayarlanır.
* Bu metot sayfa düzenlemeyi \(pagination\) destekler. `endIndex`, en son döndürülen UTXO'yu ifade eder. Bir sonraki UTXO'lar kümesini getirmek için, bir sonraki çağrıda `endIndex` değerini `startIndex` olarak belirleyin.
* Eğer `startIndex` kullanılmazsa, `limit` sayısına kadar olan tüm UTXO'ları getirecektir.
* Sayfa düzeni kullanıldığında \(yani `startIndex` verildiğinde\), UTXO'ların çoklu çağrılarda benzersiz olması garanti değildir. Yani, bir UTXO birinci çağrının sonucunda görünebilir ve ardından ikinci çağrıda tekrar görünebilir.
* Sayfa düzeni kullanıldığında, çoklu çağrılarda tutarlılık garanti değildir. Yani, UTXO adresler kümesi çağrılar arasında değişmiş olabilir.
* `encoding`, döndürülen UTXO'lar için formatı ayarlar. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.

#### **Örnek**

Diyelim ki `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`'den en az birine referans yapan tüm UTXO'ları istiyoruz.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getUTXOs",
    "params" :{
        "addresses":["C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf"],
        "sourceChain": "X",
        "startIndex": {
            "address": "C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
            "utxo": "22RXW7SWjBrrxu2vzDkd8uza7fuEmNpgbj58CxBob9UbP37HSB"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

Bu şu yanıtı verir:

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "3",
        "utxos": [
            "11QEQTor9xZ1TyCyq8aFVShdP7YjM1ug9KuPUuMpgvQVz5qjEzo244NbJomjciNUPqUr1cD455dXhVrVNopnMXTQrTFY5kqrEVAQ3Ng9AnapQrYVEYiWc32F5CQuD3N5sB1EhQmMdJr5pis1QLjMmRQmut7Maafwup1vEU",
            "11Eo6c9iUz3ERtmHbdUb3nzzMaqFffFQStshEsSTiFQP5xqfmeaeCFHCBajmoJUdQRHtkChGAmPucDfuCyBAEyGmmv2w8b7dX5sATxV7HxHZE4eak14GMGVEr7v3ij1B8mE82cymTJJz1X3PpRk2pTaxwEnLWfh1aAiTFC",
            "118mpEHsia5sYYvKUx4j56mA7i1yvmLNyynm7LcmehcJJwMVY65smT4kGQgyc9DULwuaLTrUcsqbQutCdajoJXBdPVqvHMkYBTYQKs7WSmTXH8v7iUVqZfphMnS7VxVjGU1zykeTnbuAoZt4cFMUJzd8JaZk5eC82zmLmT"
        ],
        "endIndex": {
            "address": "C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
            "utxo": "27q6nsuvtyT4mvXVnQQAXw1YKoTxCow5Qm91GZ678TU1SvUiC2"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### avax.import

X-Chain'den C-Chain'e bir AVAX dışı varlık veya AVAX transferini kesinleştirin. Bu metot çağrılmadan önce, transferi başlatmak için X-Chain'in [`avm.export`](exchange-chain-x-chain-api.md#avm-export) metodunu `AVAX` varlık kimliği ile çağırmanız gerekir.

#### İmza

```go
avax.import({
    to: string,
    sourceChain: string,
    baseFee: int, // optional
    username: string,
    password:string,
}) -> {txID: string}
```

**İstek**

* `to`, varlığın gönderildiği adrestir. Bu, karşılık gelen C-Chain `export` çağrısındaki `to` argümanıyla aynı olmalıdır.
* `sourceChain`, varlık hangi zincirden içe aktarılıyorsa, o zincirin kimliği veya alias'ıdır. X-Chain'den içe fonlar aktarmak için `"X"` kullanın.
* `baseFee`, işlemi oluştururken uygulanması beklenen taban ücrettir. Atlanırsa, önerilen bir ücret kullanılacaktır.
* `username`, işlemin gönderileceği adresi kontrol eden kullanıcıdır.
* `password`, `username`'in parolasıdır.

**Yanıt**

* `txID`, tamamlanan ImportTx işleminin kimliğidir.

#### Örnek Çağrı

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.import",
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",
        "sourceChain":"X",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Örnek Yanıt

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6bJq9dbqhiQvoshT3uSUbg9oB24n7Ei6MLnxvrdmao78oHR9t"
    },
    "id": 1
}
```

### avax.importAVAX

**KULLANIMDAN KALDIRILDI—bunun yerine** [**avax.import** ](contract-chain-c-chain-api.md#avax-import) kullanın

X-Chain'den C-Chain'e bir AVAX transferini kesinleştirin. Bu metot çağrılmadan önce, transferi başlatmak için X-Chain'in [`avm.export`](exchange-chain-x-chain-api.md#avm-export) metodunu `AVAX` varlık kimliği ile çağırmanız gerekir.

#### İmza

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    baseFee: int, // optional
    username: string,
    password:string,
}) -> {txID: string}
```

**İstek**

* `to` AVAX'ın gönderildiği adrestir. hex formatında olması gerekir.
* `sourceChain`, AVAX hangi zincirden içe aktarılıyorsa, o zincirin kimliği veya alias'ıdır. X-Chain'den içe fonlar aktarmak için `"X"` kullanın.
* `baseFee`, işlemi oluştururken uygulanması beklenen taban ücrettir. Atlanırsa, önerilen bir ücret kullanılacaktır.
* `username`, işlemin gönderileceği adresi kontrol eden kullanıcıdır.
* `password`, `username`'in parolasıdır.

**Yanıt**

* `txID`, tamamlanan ImportTx işleminin kimliğidir.

#### Örnek Çağrı

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.importAVAX",
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",
        "sourceChain":"X",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Örnek Yanıt

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },
    "id": 1
}
```

### avax.importKey

Bir kullanıcıya bir adresi kontrol eden özel anahtarı vererek o kullanıcıya o adresin kontrolünü verin.

#### İmza

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**İstek**

* `privateKey`'i `username`'nin özel anahtar kümesine ekleyin.

**Yanıt**

* `address`, şimdi `username`'in özel anahtarla kontrol ettiği adrestir. hex formatında olacaktır.

#### Örnek Çağrı

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.importKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2o2uPgTSf3aR5nW6yLHjBEAiatAFKEhApvYzsjvAJKRXVWCYkE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Örnek Yanıt

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    },
    "id": 1
}
```

### avax.issueTx

Ağa imzalı bir işlem gönderin. `encoding`, imzalı işlemin formatını belirler. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.

#### **İmza**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avax.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### avax.getAtomicTxStatus

Ağa gönderilen bir atomik işlemin durumunu getirin.

#### **İmza**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status`, şunlardan biridir:

* `Accepted`: İşlem her düğüm tarafından kabul edilir \(veya edilecektir\). `blockHeight` property'sini kontrol edin
* `Processing`: İşlem bu düğüm tarafından oylanmakta
* `Dropped`: İşlem bu düğüm tarafından düşürüldü, çünkü bu düğüm işlemin geçersiz olduğunu düşündü
* `Unknown`: İşlem bu düğüm tarafından görülmedi

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getAtomicTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted",
        "blockHeight": "1"
    }
}
```

## Admin API

Bu API, hata ayıklamak için kullanılabilir. Not: Admin API varsayılan olarak etkinleştirilmiş değildir. Admin API etkinleştirilmiş durumdayken bir düğümü çalıştırmak için [komut satırı argümanı](../references/command-line-interface.md#c-chain-config) `--coreth-admin-api-enabled:true`'yi kullanın.

### Son Nokta

```text
/ext/bc/C/admin
```

### Metotlar

#### admin.setLogLevel

C-Chain'in günlük tutma düzeyini ayarlar.

#### **İmza**

```text
admin.setLogLevel({level:string}) -> {success:bool}
```

* `level` ayarlanacak günlük tutma düzeyidir.

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLogLevel",
    "params": {
        "level":"info",
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.startCPUProfiler

Bir CPU profili başlatır.

#### **İmza**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.StopCPUProfiler

Bir CPU profilini durdurur ve yazar.

#### **İmza**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.memoryProfile

Bir bellek profilini çalıştırır ve yazar.

#### **İmza**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLogLevel",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.lockProfile

`coreth_performance_c` dizinine bir mutex profili yazılması işlemini çalıştırır.

#### **İmza**

```text
admin.lockProfile() -> {success:bool}
```

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```
