---
description: C-Chain Ethereum Sanal Makinesi'nin (EVM) bir örneğidir.

---

# Zincir \(C-Chain\ Contract Chain API

_Not: Note: `kendi ağ kimliği` ve `zincir` kimliği ile ilgili bir fikri vardır. Bu durum Avalanche’s ağ kimliği ve zincir ile bir ilişkisi yoktur ve C-Chain ile tamamen iç içe_[__](../../learn/platform-overview/#contract-chain-c-chain)__ konumdadır. On C-Chain bu değerler için `1` ve `43114` kullanır. Fuji On bu değerler için `1` ve `43113` kullanır. `networkID``` ve `eth_chainId` yöntemleri `kullanarak` da elde edilebilir.

## Akıllı bir Sözleşme Düzenlemesi

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" }

## Ethereum APIs

### Ethereum API Endpoints

#### JSON-RPC Endpoints

JSON-RPC sonları aracılığıyla C-Chain ile etkileşime geçmek:

```cpp
/ext/bc/C/rpc
```

of diğer örnekleriyle JSON-RPC sonları aracılığıyla etkileşime geçmek:

```cpp
/ext/bc/blockchainID/rpc
```

`where` kimliği, of çalıştıran blok zincirinin kimliği.

#### WebSocket Endpoints

Web soketi sonucu üzerinden C-Chain ile etkileşime geçmek:

```cpp
/ext/bc/C/ws
```

Örneğin, yerel konuttaki web sitesi aracılığıyla C-Chain's Ethereum API'si ile etkileşime geçmek için:

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Web soketi noktası üzerinden of diğer örnekleriyle etkileşime geçmek:

```cpp
/ext/bc/blockchainID/ws
```

`where` kimliği, of çalıştıran blok zincirinin kimliği.

### Yöntemler

#### Standart Ethereum API

Avalanche sadece aşağıdaki hizmetleri desteklemesi dışında Geth's Geth's benzer API arayüzü sunuyor:

* `web3.`
* `Ağ`
* `- eth_`
* `Kişisel`
* `txpool_`
* `Ayrı böceği.`

Bu hizmetlerle aynı şekilde etkileşime girebilirsiniz. Geth ile etkileşim halinde. [Ethereum Wiki'nin JSON-RPC Belgeleme](https://eth.wiki/json-rpc/API) ve [Geth’s JSON-RPC](https://geth.ethereum.org/docs/rpc/server) Belgelemesi, API'nin tam tanımını sunar.

#### eth\ eth\_getAssetBalance Dengeli

Standart Ethereum API'ye ek olarak, Avalanche `Ethereum` API'ye ek olarak, Avalanche üzerindeki Avalanche Yerli of dengesini geri almak için `eth_getAssetBalance` sunar.

**İmzalanma**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `Varlığın` sahibi
* `Blk` blok numarası veya dengeyi geri almak için özet
* Dengenin istendiği varlığın `varlığının özet` kimliği

**Örnek Example**

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

**Örnek Tepki**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

## Çığ Özel API

### Çığ Özel API Uçları

on `özel` RPC çağrıları ile etkileşime geçmek için:

```cpp
/ext/bc/C/avax
```

EVM AVAX sonlarının diğer örnekleriyle etkileşime geçmek:

```cpp
/ext/bc/blockchainID/avax
```

### avax. Dışarıya aktarılıyor

from to bir varlık aktar. Bu yöntemi aradıktan sonra, X-Chain üzerinden [`avm.import`](exchange-chain-x-chain-api.md#avm-import) aktarmayı tamamlamak için you

#### İmzalanma

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `...` X-Chain adresi varlığın gönderildiği adres.
* `Gönderilecek` varlığın miktarı.
* `Varlığın` kimliği. AVAX aktarmak için `"AVAX"``` kullanın.
* Varlık `kullanıcı adı` ve `şifre` tarafından kontrol edilen adreslerden gönderilir.

#### Örnek Example

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

#### Örnek Tepki

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2W5JuFENitZKTpJsy9igBpTcEeBKxBHHGAUkgsSUnkjVVGQ9i8"
    },
    "id": 1
}
```

### avax. avax.exportAVAX

**DEPRECATED—instead yerine** [**use**](contract-chain-c-chain-api.md#avax-export) kullan.

AVAX AVAX AVAX gönder. Bu yöntemi aradıktan sonra, X-Chain üzerindeki [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) göndermeyi tamamlamak için çağırmalısınız.

#### İmzalanma

```go
avax.exportAVAX({
    to: string,
    amount: int,
    destinationChain: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password:string,
}) -> {txID: string}
```

**İstek**

* `Bu` adresler C-Chain gönderdiği C-Chain adresleri. Büyü formatında olmalılar.
* `...X-Chain` adresi, X-Chain gönderdiği adresdir. Bech32 formatında olmalı.
* `NAVAX` miktarı gönderilir.
* Zincir, `destinationChain` gönderdiği zincirdir. to fon aktarmak için `"X"` kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderildiği C-Chain adresidir. Büyü formatında olmalı.
* AVAX `kullanıcı adı` tarafından kontrol edilen adreslerden gönderiliyor

**Yanıt**

* `txID` tamamlanmış of is

#### Örnek Example

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportAVAX",
    "params" :{
        "from": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"],
        "to":"X-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "destinationChain": "X",
        "changeAddr": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Örnek Tepki

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2ffcxdkiKXXA4JdyRoS38dd7zoThkapNPeZuGPmmLBbiuBBHDa"
    },
    "id": 1
}
```

### avax. avax.exportKey

Verilen adresi kontrol eden özel anahtarı al. Geri dönen özel anahtar `with` eklenebilir.

#### İmzalanma

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**İstek**

* `Kullanıcı adı` `adresi` kontrol etmeli.
* `Adres` adres, karşılık gelen özel anahtarı aktarmak istediğiniz adres. Büyü formatında olmalı.

**Yanıt**

* `Özel` Anahtar, `adresi` kontrol eden özel anahtarın CB58 kodlanmış sicim temsilidir. Bir `PrivateKey-` önekleme vardır ve `via` bir anahtar aktarmak için kullanılabilir.
* Özel `privateKeyHex` `adresi` kontrol eden özel anahtarın büyü sicim temsilidir. into bir hesabı aktarmak için kullanılabilir.

#### Örnek Example

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

#### Örnek Tepki

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

Verilen adresi gönderen UTXOs ulaşıyor.

#### **İmzalanma**

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

* `UTXos,` UTXO referansları en az bir adres `olarak` adlandırılan UTXOs listesidir.
* En `çok sınırda` UTXOs geri döner. `Eğer sınır` 1024'ten daha büyük veya ihmal edilirse, 1024'e ayarlanır.
* Bu yöntem pagination. destekler. `endIndex` son UTXO geri döndüğü anlamına gelir. Bir sonraki UTXOs setini almak için, bir sonraki çağrıda `endIndex` olarak `endIndex` değerini kullanın.
* Eğer `startIndex` atılırsa, tüm UTXOs `sınıra` kadar getirecektir.
* Eğer `başlangıç Endeksi` sağlanırsa, UTXOs birden fazla arama arasında eşsiz olmak garantisi yoktur. Bu da ilk çağrının sonucu olarak UTXO görünebilir, sonra ikinci çağrıda da görünebilir.
* pagination, kullanırken tutarlılık birden fazla arama arasında garanti edilmez. Bu da UTXO adresleri aramalar arasında değişmiş olabilir.
* `Şifreleme` UTXOs. için biçimi belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **Örnek olarak**

Tüm UTXOs `C-avax1yzt57wd8me6xmy3t42lz8mg6yruy79m6whsf'dan` en az bir tane olduğunu varsayalım.

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

Bu cevap verir:

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

### avax.import aktarılabilir

non-AVAX to bir AVAX veya AVAX transferini tamamlayın. Bu yöntem çağrılmadan önce, transferi başlatmak için X-Chain's [`avm.export`](exchange-chain-x-chain-api.md#avm-export) aktarma yöntemini aramanız gerekir.

#### İmzalanma

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**İstek**

* `...varlığın` gönderdiği adres. Bu C-Chain's `ihracatına` `karşılık` gelen çağrıda tartışmayla aynı olmalı.
* `Kaynak` Zincir, varlığın ithal edildiği zincirin kimliklerinden veya takma isimleridir. from fonları aktarmak için `"X"` kullanın.
* `Kullanıcı adı` kontrol eden `kullanıcı`.

**Yanıt**

* `txID` tamamlanmış of kimliğidir.

#### Örnek Example

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

#### Örnek Tepki

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6bJq9dbqhiQvoshT3uSUbg9oB24n7Ei6MLnxvrdmao78oHR9t"
    },
    "id": 1
}
```

### avax, avax.importAVAX

**DEPRECATED—instead bunun yerine** [**avax.import**](contract-chain-c-chain-api.md#avax-import) aktarma kullan

from to aktarma işlemi tamamlayın. Bu yöntem çağrılmadan önce, transferi başlatmak için X-Chain's [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) yöntemini aramanız gerekir.

#### İmzalanma

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**İstek**

* `to` gönderdiği adres. Büyü formatında olmalı.
* `Kaynak zinciri` of ithal edildiği zincirin kimliği, kimliktir. from fonları aktarmak için `"X"` kullanın.
* `Kullanıcı adı` kontrol eden `kullanıcı`.

**Yanıt**

* `txID` tamamlanmış of kimliğidir.

#### Örnek Example

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

#### Örnek Tepki

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },
    "id": 1
}
```

### avax. avax.importKey

Adresi kontrol eden özel anahtarı sağlayarak bir kullanıcı adresi kontrol ettir.

#### İmzalanma

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**İstek**

* `Özel` `anahtarları kullanıcı adı` ile özel anahtarları ekle.

**Yanıt**

* `Adres` artık özel anahtar ile kontrol edilen adres `kullanıcı` adıdır. Büyü formatında olacak.

#### Örnek Example

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

#### Örnek Tepki

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    },
    "id": 1
}
```

### avax.

İmzalı bir işlem gönderin. `Şifreleme` imzalanmış işlem biçimini belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **İmzalanma**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Örnek Example**

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

#### **Örnek Tepki**

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

Ağa gönderilen bir atom işlem durumunu bildir.

#### **İmzalanma**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`Durum` şu:

* `Kabul edilir`: işlem her düğümle kabul edilir. `blockHeight` yükseklik malını kontrol et
* `İşlem`: işlem bu düğümle oylanıyor
* `Satış` işlemi bu düğümle düşürüldü, çünkü işlem geçersiz olduğunu düşündü.
* `Bilinmiyor`: Bu düğümle işlem görülmedi.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

