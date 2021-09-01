# IPC API

IPC API, kullanıcıların blok zincirlerinin yayınlanması için UNIX alan yuvaları oluşturmalarına izin verir. Blok zinciri bir vertex/bloke kabul ettiğinde bir sokete yayınlayacak ve içerideki kararlar başka bir kişiye yayınlanacak.

Bir `api-ipcs-enabled=true`düğüm, bu API'yi ancak [komut satırı](../references/command-line-interface.md) argümanıyla başlatılırsa ortaya çıkar.

## IPC İleti Biçimi

Soket mesajları Bigendian formatında 64bit tam sayıdan oluşur.

Örnek Olarak:

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## IPC Soket URL Biçimi

`<event_type>`Bu isimler ya da `<network_id>-<chain_id>-<event_type>`yer şekilleri olarak `consensus`adlandırılır.`decisions` Konsensus soketi dikey ve bloklar alırken, karar soketi bireysel işlemleri geri alır.

## Format

Bu API, `json 2.0`RPC formatını kullanır.

## Sonucu noktası

`/ext/ipcs`

## Yöntemler

### ipcs.publishBlockchain yayıncılık Blockchain

Bir blok zinciri Register ki Unix alan yuvasına kabul edilen dikenleri yayınlar.

#### **İmzalanma**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID`Kabul edilen dikenleri yayınlayacak olan blok zinciri.
* `consensusURL`Unix alan soketi için makale yazılan mekanlar için bir yol vardır.
* `decisionsURL`Bu işlemlerin yayınlandığı Unix alan soketi yoludur.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "ipcs.publishBlockchain",
    "params":{
        "blockchainID":"11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/ipcs
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "decisionsURL":"/tmp/1-11111111111111111111111111111111LpoYY-consensus",
        "consensusURL":"/tmp/1-11111111111111111111111111111111LpoYY-decisions"
    },
    "id":1
}
```

### ipcs.unpublishBlockchain

Bir blok zinciri oluştur, böylece artık Unix alan yuvasına basılmayacak.

#### **İmzalanma**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID`Unix alan yuvasına artık basılmayacak bir blok zinciri.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "ipcs.unpublishBlockchain",
    "params":{
        "blockchainID":"11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/ipcs
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

