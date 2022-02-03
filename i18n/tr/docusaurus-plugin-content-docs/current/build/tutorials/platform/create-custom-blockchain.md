# Kişiselleştirilmiş bir Blok Zincir Yaratın

## Giriş

Avalanche subnet'lerde sanal makinelerle blok zincirler yaratılmasını destekler. Bu eğitim makalesinde kişiselleştirilmiş bir Sanal Makine \(Timestamp VM\) kullanarak kişiselleştirilmiş bir blok zincir yaratacağız.

X-Chain \(AVM\) yeteneklerine sahip bir blok zincir istiyorsanız [AVM Blok Zinciri Yaratın](../nodes-and-staking/run-avalanche-node.md) başlıklı eğitim makalesine bakın.

_Not: Blok Zincirlerin, Subnet'lerin, İşlemlerin ve Adreslerin kimlikleri her çalıştırma/ağ için değişik olabilir. Diğer bir deyişle, bu eğitim makalesindeki bazı girdiler, son noktalar vb. siz denediğinizde değişik olabilir._

### Ön gereklilikler

Çalışan bir düğüme, o düğümde bir kullanıcıya ve o kullanıcının kontrol ettiği adreste bir miktar AVAX'a ihtiyacınız olacak. Tüm bunlar [Bir Avalanche Düğümü Çalıştırın](../nodes-and-staking/run-avalanche-node.md) başlıklı eğitim makalesinde açıklanmaktadır.

Ardından, düğümünüzü [Birincil Ağda](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network) bir doğrulayıcı yapmanız gerekiyor. Bunu nasıl yapacağınızı [Bir Doğrulayıcı Ekleyin](../nodes-and-staking/add-a-validator.md) başlıklı eğitim makalesinde öğrenebilirsiniz. Bunu [API çağrıları](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) ile yapmanızı tavsiye ederiz, çünkü bu eğitim makalesinin geri kalan kısmında düğümünüzle etkileşimde bulunmanızın yolu budur.

## Sanal Makineyi Yaratın

Her blok zincir bir sanal makinenin instance'ıdır. Mesela X-Chain, AVM'nin bir instance'ı ve C-Chain, EVM'nin bir instance'ıdır. Avalanche, Sanal Makinelerden yeni blok zincirler \(instance'lar\) yaratılmasını destekler. Bu senaryoda, harici bir VM plugin'i \(eklenti\) olan [Timestamp VM](https://github.com/ava-labs/timestampvm) kullanacağız. Timestamp VM, RPC \(uzaktan yordam çağrısı\) yoluyla AvalancheGo düğümümüzle iletişimde bulunur.

:::bilgi [Bir Sanal Makine \(VM\) Yaratın](create-a-virtual-machine-vm.md) :::

## Subnet'i Yaratın

Her blok zincir bir [subnet](../../../learn/platform-overview/README.md#subnets) vasıtasıyla doğrulanır. Bir blok zincir yaratmadan önce, o blok zinciri doğrulamak için bir subnet'e ihtiyacınız olacak. Halihazırda mevcut bir subnet'i de kullanabilirsiniz, ama bunu yapabilmeniz için o subnet'in yeterli sayıda kontrol anahtarlarına sahip olmanız gerekir.

:::bilgi [Bir Subnet Yaratın](create-a-subnet.md) :::


### Subnet'e Doğrulayıcılar Ekleyin

Subnet'te doğrulayıcılar bulunması gerekir ki blok zincirleri doğrulayabilsin.

:::bilgi [Doğrulayıcı Kümesine bir düğüm ekleyin](../nodes-and-staking/add-a-validator.md) :::


### Genesis Verilerini yaratın {#create-the-genesis-data}

Her blok zincir ilk yaratıldığında bir genesis, yani "ilk çıkış" durumundadır. Her VM, genesis data'sının formatını ve semantiğini tanımlar. TimestampVM, genesis data'sı olarak CB58 formatında şifrelenmiş veriler kullanır. String verileri şifrelemek/deşifre etmek için kullanılabilen `encode`ve `decode` statik API metotları vardır. Bkz. [TimestampVM API](create-a-virtual-machine-vm.md#api).

Şimdi TimestampVM için basit bir genesis data üretelim:

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

Genesis data'mız `fP1vxkpyLWnH9dD6BQA` olacaktır.

## Blok Zinciri Yaratın

Şimdi yeni blok zinciri yaratalım. Bunu yapmak için [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain) komutunu çağırıyoruz. Çağrınız aşağıdaki gibi görünmelidir. `subnetID` parametresini blok zincirinizi doğrulayacak subnet'e değiştirmeniz ve subnet'in yeterli sayıda kontrol anahtarlarını kontrol eden bir `username` girmeniz gerekir. Bir subnet'in eşiğinin ve kontrol anahtarlarının neler olduğunu [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) komutunu çağırarak öğrenebileceğinizi hatırlatırız.

[Bir Sanal Makine \(VM\) Yaratın](create-a-virtual-machine-vm.md#vm-aliases) başlıklı eğitim makalesinde VM'mizin kimliği olarak `tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`'yi kullanmış olduğumuzu hatırlayın.

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

Gelen yanıtta işlem kimliği bulunur:

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

### İşlem Başarısını Doğrulayın {#verify-success}

Birkaç saniye sonra blok zincirimizi yaratma işleminin kabul edilmiş olması ve blok zincirin mevcut olması gerekir \(bu isteğin iyi oluşturulmuş olması vb. şartıyla\)

Kontrol etmek için [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains) komutunu çağırın. Bu çağrı, mevcut tüm blok zincirlerin bir listesini döndürür.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Gelen yanıt, blok zincirin yaratıldığını doğrular:

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

### Blok Zincirin doğrulanması {#validating-blockchain}

Her blok zincirde, o zincirde yapılan işlemleri doğrulayacak ve işleyecek bir doğrulayıcılar kümesi olması gerekir. Bir düğümün belli bir blok zinciri doğruladığını, o düğümde [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus) komutunu çağırarak kontrol edebilirsiniz:

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

Gelen yanıt `"Validating"` ise, o düğüm ilgili zinciri doğruluyor demektir. Gelen yanıt `"Syncing"` \(senkronize ediyor\) ise, ilgili zincir o düğüm tarafından takip ediliyor ama o düğüm tarafından doğrulanmıyor demektir. Gelen yanıt `"Created"` \(yaratıldı\) ise, o zincir mevcut ama senkronize edilmiyor demektir. Bir subnet'i doğrulamak veya izlemek için düğümünüzü `--whitelisted-subnets=[subnet ID goes here]` argümanı ile \(örn.\) `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT` başlatmanız ve ayrıca düğümü subnet'in doğrulayıcı kümesine eklemeniz gerektiğini aklınızda bulundurun.

Daha fazla bilgiyi [Bir Subnet Doğrulayıcısı Ekleme](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) başlıklı eğitim makalesinde bulabilirsiniz.

## Yeni Blok Zincirle etkileşimde bulunma {#interact-with-the-new-blockchain}

VM'nin bu yeni instance'ı ile etkileşimde bulunabilirsiniz. Blok zincirin API son noktası `127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`'dır. Son noktadaki son kısım, blok zincirin kimliğidir, yani `sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`. Her blok zincirin kimliği birbirinden farklıdır, dolayısıyla statik bir kimlik değildir bu. Blok zincirinizin kimliği ve son noktası farklı olabilir.

Ayrıca bu zincir kimliğine `timestampbc` alias'ını \(takma ad\) ya da başka bir alias vererek API URL'lerinin daha basit olmasını sağlayabilirsiniz. Daha fazla bilgi: [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### Genesis Blokunu Doğrulayın

Genesis'te, `fP1vxkpyLWnH9dD6BQA`'yi genesis data'sı olarak belirlemiştik. Şimdi bunu doğrulayalım:

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

Gördüğünüz gibi, ilk blokumuzda `timestamp: 0` var. Ayrıca ana kimlik \(`11111111111111111111111111111111LpoYY`\), P-Chain'in kimliğidir. Şimdi genesis data'yı VM'nin statik API metodu ile deşifre edelim. TimestampVM kimliğimize `timestampvm` alias'ı verdiğimizi hatırlayalım:

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

Genesis data'da `helloworld` string'i olduğunu görebiliyoruz.

### Yeni Blok Önerin

Blok zincirimize, içinde birtakım veriler olan yeni bloklar önerebiliriz.

Şimdi önce şifrelenmiş data'yı alalım. Bloklarda 32 karakter uzunluğunda baytlar olması beklenir. Şifreleme metodunda bir `length` argümanı vardır:

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

Şimdi şu data'yı içeren yeni bir blok önerebiliriz:

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

Şimdi önerdiğimiz blokun varlığını doğrulamak için en son bloku kontrol edelim:

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

Sonuçtaki `data`alanı `qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y` içeriyor. Bu data, bir önceki adımda önerdiğimiz data'yla aynıdır.

