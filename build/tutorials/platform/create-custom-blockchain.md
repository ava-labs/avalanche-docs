# Özel Bir Blok zinciri Oluştur

## Tanıştırma

Avalanche alt ağlarda sanal makineler olan blok zincirlerini oluşturmayı destekler. Bu özel özel bir sanal makine \(Timestamp VM\) kullanarak özel bir blok zinciri oluşturacağız.

X-Chain \(AVM\) kapasitesine sahip bir blok zinciri istiyorsanız [AVM Blockchain](../nodes-and-staking/run-avalanche-node.md) oluşturun.

### Ön şartlar

Bir çalıştırma düğümü, düğümdeki bir kullanıcı ve kullanıcının kontrol ettiği adreste AVAX olması gerek. Bunların hepsi ["Koş"](../nodes-and-staking/run-avalanche-node.md) ile kaplıdır.

Sırada, [ilkel](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) Ağ'da bir onaylayıcı olmak için düğümünü kullanmalısın. [Bunu bir onaylayıcı](../nodes-and-staking/add-a-validator.md) özel ders olarak nasıl yapılacağını öğrenebilirsin. [Bunu API çağrılarıyla](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) yapmanızı tavsiye eder. Çünkü bu ders için düğümle bu şekilde etkileşime gireceksiniz.

## Sanal Makine oluştur

Her blok zinciri sanal bir makinenin bir örneğidir. Örneğin, X-Chain AVM ve C-Chain EVM's örneğidir. Avalanche Sanal from yeni blok zincirleri oluşturmayı destekler. Bu durumda bir VM [eklentisi olan zaman damgası VM'yi](https://github.com/ava-labs/timestampvm) kullanacağız. Zaman damgası VM bizim AvalancheGo düğümüyle RPC aracılığıyla iletişim kuracak.

{% page-ref page="create-a-virtual-machine-vm.md" %}

## Subnet oluştur

Her blok zinciri [bir alt ağ](../../../learn/platform-overview/#subnets) tarafından onaylanır. Bir blok zinciri oluşturmadan önce, bunu onaylamak için bir subnet ihtiyacınız olacak. Kontrol anahtarlarının yeterli sayısına sahip olduğu bir subnet da kullanabilirsiniz.

{% page-ref page="create-a-subnet.md" %}

### Subnet Geçerli Yazılar Ekle

Alt ağ blok zincirlerini doğrulamak için geçerli The ihtiyaç duyar.

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

### Genesis Verisi Oluştur<a id="create-the-genesis-data"></a>

Her blok zincirinin yaratıldığında bazı genez durumu vardır. Her VM genesis verisinin biçimi ve semantics tanımlar. Zaman damgası CB58 kodlanmış veriyi genesis verisi olarak kullanır. [Kodlama](create-a-virtual-machine-vm.md#api) / kod sicim verisi için kullanılabilecek `encode`ve `decode`statik API yöntemleri var.

Zaman damgası için basit bir genez verisi oluşturalım:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.encode",
    "params":{
        "data":"helloworld"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "fP1vxkpyLWnH9dD6BQA",
    "encoding": "cb58"
  },
  "id": 1
}
```

Genesis verimiz `fP1vxkpyLWnH9dD6BQA`olacak.

## Blok zinciri oluştur

Şimdi yeni bir blok zinciri oluşturalım. Bunu yapmak için [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain)arayacağız. Araman aşağıdaki gibi olmalı. `subnetID``username`Buket zincirinizi doğrulayacak alt ağa değişmeli ve alt ağın kontrol anahtarlarının yeterli sayısını kontrol eden bir kaynak sağlamalısınız. Bir hatırlatma olarak, bir alt ağ eşiğinin ve kontrol anahtarlarının ne olduğunu arayarak [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)öğrenebilirsiniz.

[Bir Sanal Makine \(VM\) oluşturma için](create-a-virtual-machine-vm.md#vm-aliases) VM kimliğimiz `tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`olarak kullandığımızı hatırlayın.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
        "vmID":"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH",
        "name":"My new TSVM",
        "genesisData": "fP1vxkpyLWnH9dD6BQA",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Cevap işlem kimliği içerir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Başarıyı Doğrulayın<a id="verify-success"></a>

Birkaç saniye sonra, blok zincirini oluşturmak için işlem kabul edilmeli ve blok zinciri var olmalı \(isteğin iyi biçimlendirildiğini varsayarsak\)

Kontrol etmek için, [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains)ara. Bu da var olan tüm blok zincirlerinin listesini gönderir.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Tepki blok zincirinin yaratıldığını doğruluyor:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "AXerNQX7voY2AABaRdTAyXcawBURBR6thPRJp43LtPpZZi6Qz",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "tZGm6RCkeGpVETUTp11DW3UYFZmm69zfqxchpHrSF7wgy8rmw",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
                "name": "My new TSVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH",
                "name": "My new AVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### Blok zincirini onaylıyor<a id="validating-blockchain"></a>

Her blok zincirinin üzerinde işlemleri onaylamak ve işlemek için bir dizi onaylayıcı gerekir. Bu [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)düğümle calling verilen bir blok zincirini geçerli kılıp doğrulamadığını kontrol edebilirsiniz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Validating"
  },
  "id": 1
}
```

Eğer cevap verirse, `"Validating"`düğüm, verilen zinciri doğruluyor. Eğer cevap `"Syncing"`verirse, zincir bu düğümle takip edilir ama geçerli değildir. `"Created"`Eğer cevap verirse zincir var ama senkronize edilmiyor. `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`Bir alt ağı onaylamak veya izlemek için your argüman `--whitelisted-subnets=[subnet ID goes here]`ile başlatmanız gerektiğini, ayrıca alt ağın doğrulayıcı setine düğümü eklemeniz gerektiğini unutmayın.

Daha fazla bilgi [Subnet Doğrulama](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) özel ders eklenmesinde bulunabilir.

## Yeni Blok zinciri ile etkileşim<a id="interact-with-the-new-blockchain"></a>

Bu yeni of yeni örneğiyle etkileşime girebilirsiniz. Senin blok zincirinin API sonu `127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`şudur.

`timestampbc`Bu zincir kimliğinin adını da daha basit API URL'ler için kullanabilirsiniz. Daha fazla bilgi : [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### Genesis Blokunu Doğrulayın.

Genesis'in genesis verisi `fP1vxkpyLWnH9dD6BQA`olarak belirttiğimiz genesis bunu doğrulayalım:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":""
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "0",
        "data": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp",
        "id": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn",
        "parentID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}
```

Gördüğünüz gibi ilk blokta `timestamp: 0`var. Ayrıca ebeveyn `11111111111111111111111111111111LpoYY`kimliği, P-chain's kimliğidir. VM's statik API yöntemiyle genesis verilerini çözelim. Zaman damgası kimliğimizin sahte olduğunu `timestampvm`unutmayın:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.decode",
    "params" : {
        "bytes": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "data":"helloworld",
        "encoding": "cb58"
    },
    "id": 1
}
```

Dizinin dizginleri genesis verilerinin olduğunu `helloworld`görebiliyoruz.

### Yeni Blok Teklif

İçinde bazı verilerle blok zincirine yeni bloklar önerebiliriz.

Önce kodlanmış verileri alalım. Blokların 32 boyunda have sahip olmasını bekliyor. Şifreleme yönteminde bir `length`tartışma var:

```cpp
curl -X POST --data '{
   "jsonrpc": "2.0",
    "method" : "timestampvm.encode",
    "params" : {
        "data": "mynewblock",
        "length": 32
    }
    "id"     : 1,
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

Sonuç:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "encoding": "cb58"
  },
  "id": 1
}
```

Şimdi verilerle yeni bir blok önerebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.proposeBlock",
    "params":{
        "data":"qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

Sonuç:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

Önerilen bloğumuzun varlığını doğrulamak için en son bloğu kontrol edelim:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":""
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

Sonuç:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "timestamp": "1625674027",
    "data": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "id": "Br36bggr9vEEoNTNVPsSCD7QHHoCqE31Coui6uh1rA71EGPve",
    "parentID": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn"
  },
  "id": 1
}
```

Sonuç `data`alan içeriyor.`qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y` Bu önceki adımda önerilen verilerle aynı veridir.

