# Info API

Bu API, düğüm hakkındaki temel bilgilere ulaşmak için kullanılabilir.

## Format

Bu API `json 2.0` RPC formatını kullanır. JSON RPC çağrıları yapma hakkında daha fazla bilgi için [buraya](issuing-api-calls.md) bakın.

## Son Nokta

```text
/ext/info
```

## API Metotları

### info.getBlockchainID

Bir blok zincirin alias'ı (takma ad) verildiğinde, blok zincirin kimliğini getirin. (Bkz. [`admin.aliasChain`](admin-api.md#admin-aliaschain).)

#### **İmza**

```cpp
info.getBlockchainID({alias:string}) -> {blockchainID:string}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getBlockchainID",
    "params": {
        "alias":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "blockchainID":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM"
    }
}
```

### info.getNetworkID

Bu düğümün katıldığı ağın kimliğini getirin.

#### **İmza**

```cpp
info.getNetworkID() -> {networkID:int}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "networkID":"2"
    }
}
```

### info.getNetworkName

Bu düğümün katıldığı ağın adını getirin.

#### **İmza**

```cpp
info.getNetworkName() -> {networkName:string}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "networkName":"local"
    }
}
```

### info.getNodeID

Bu düğümün kimliğini getirin.

#### **İmza**

```cpp
info.getNodeID() -> {nodeID: string}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

### info.getNodeIP

Bu düğümün IP'sini getirin.

#### **İmza**

```text
info.getNodeIP() -> {ip: string}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeIP"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "ip": "192.168.1.1:9651"
    },
    "id": 1
}
```

### info.getNodeVersion

Bu düğümün sürümünü getirin.

#### **İmza**

```cpp
info.getNodeVersion() -> {
    version: string,
    databaseVersion: string,
    gitCommit: string,
    vmVersions: map[string]string,
}
```

burada:

* `version`, bu düğümün sürümüdür
* `databaseVersion`, bu düğümün kullandığı veri tabanının sürümüdür
* `gitCommit`, bu düğümün kurulmasında kullanılan Git commit'tir
* `vmVersions`, her bir anahtar/değer çiftinin bir VM'nin adı ve bu düğümün çalıştırdığı o VM'nin sürümü olduğu haritadır

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.10",
        "databaseVersion": "v1.4.5",
        "gitCommit": "a3930fe3fa115c018e71eb1e97ca8cec34db67f1",
        "vmVersions": {
            "avm": "v1.4.10",
            "evm": "v0.5.5-rc.1",
            "platform": "v1.4.10"
        }
    },
    "id": 1
}
```

### info.isBootstrapped

Belli bir zincirin önyüklemeyi tamamlayıp tamamlamadığını kontrol edin

#### **İmza**

```cpp
info.isBootstrapped({chain: string}) -> {isBootstrapped: bool}
```

`chain`, bir zincirin kimliği veya alias'ıdır.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

### info.peers

Peer (eşler arası) bağlantıların bir açıklamasını alın.

#### **İmza**

```cpp
info.peers({
    nodeIDs: string[] // optional
}) ->
{
    numPeers: int,
    peers:[]{
        ip: string,
        publicIP: string,
        nodeID: string,
        version: string,
        lastSent: string,
        lastReceived: string,
        benched: string[],
        observedUptime: int,
    }
}
```

* `nodeIDs`, hangi düğüm kimliği açıklamalarının döndürüleceğini belirtmek için kullanılan isteğe bağlı bir parametredir. Bu parametre boş bırakılırsa, tüm aktif bağlantıların açıklamaları döndürülür. Eğer düğüm belirtilen bir düğüm kimliğine bağlı değilse, o düğüm yanıttan çıkarılır.
* `ip`, eşin uzak IP'sidir.
* `publicIP` eşin genel IP'sidir.
* `nodeID` eşin önceden belirlenmiş Düğüm kimliğidir.
* `version` eşin hangi versiyonun üzerinde çalıştığını gösterir.
* `lastSent` eşe gönderilen son mesajın zaman damgasıdır.
* `lastReceived` eşten alınan son mesajın zaman damgasıdır.
* `benched` eşin bench edildiği zincir kimliklerini gösterir.
* `observedUptime` bu düğümün eş tarafından gözlenen uptime'ıdır.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers",
    "params": {
        "nodeIDs": []
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "numPeers":3,
        "peers":[
          {
             "ip":"206.189.137.87:9651",
             "publicIP":"206.189.137.87:9651",
             "nodeID":"NodeID-8PYXX47kqLDe2wD4oPbvRRchcnSzMA4J4",
             "version":"avalanche/0.5.0",
             "lastSent":"2020-06-01T15:23:02Z",
             "lastReceived":"2020-06-01T15:22:57Z",
             "benched": [],
             "observedUptime": "99",
          },
          {
             "ip":"158.255.67.151:9651",
             "publicIP":"158.255.67.151:9651",
             "nodeID":"NodeID-C14fr1n8EYNKyDfYixJ3rxSAVqTY3a8BP",
             "version":"avalanche/0.5.0",
             "lastSent":"2020-06-01T15:23:02Z",
             "lastReceived":"2020-06-01T15:22:34Z",
             "benched": [],
             "observedUptime": "75",
          },
          {
             "ip":"83.42.13.44:9651",
             "publicIP":"83.42.13.44:9651",
             "nodeID":"NodeID-LPbcSMGJ4yocxYxvS2kBJ6umWeeFbctYZ",
             "version":"avalanche/0.5.0",
             "lastSent":"2020-06-01T15:23:02Z",
             "lastReceived":"2020-06-01T15:22:55Z",
             "benched": [],
             "observedUptime": "95",
          }
        ]
    }
}
```

### info.getTxFee

Ağın ücretlerini getirin.

#### **İmza**

```cpp
info.getTxFee() ->
{
    creationTxFee: uint64,
    txFee: uint64
}
```

* `creationTxFee`, ağda varlıklar yaratma ücretidir.
* `txFee`, ağda işlemler yapma ücretidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getTxFee"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "creationTxFee": "10000000",
        "txFee": "1000000"
    }
}
```

### info.uptime <a id="info-uptime"></a>

Bu düğümün ağ tarafından gözlenen uptime'ını döndürür.

#### **İmza**

```cpp
info.uptime() ->
{
    rewardingStakePercentage: float64,
    weightedAveragePercentage: float64
}
```

* `rewardingStakePercentage`, bu düğümün uptime gerekliliğini aştığı düşünülen stake yüzdesidir.
* `weightedAveragePercentage`, bu düğüm için gözlenen tüm uptime'ların stake ağırlıklı ortalamasıdır.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.uptime"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result": {
        "rewardingStakePercentage": "100.0000",
        "weightedAveragePercentage": "99.0000"
    }
}
```
