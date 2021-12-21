# X-Chain ile P-Chain Arasında AVAX Transfer Edin

## Giriş

AVAX tokenları, alınıp satılabilecekleri X-Chain'de, Birincil Ağı doğrularken stake edilebilecekleri P-Chain'de ve akıllı sözleşmelerde veya gaz ödemesi için kullanılabilecekleri C-Chain'de bulunurlar. Avalanche, AVAX'ın bu zincirler arasındaki hareketini destekler ve gelecekte Avalanche, zincirler arasındaki daha genel atomik takasları destekleyecektir. Bu eğitim makalesinde X-Chain ve P-Chain arasında AVAX tokenları göndereceğiz.

## Gereklilikler

[Başlangıç eğitimini](../nodes-and-staking/run-avalanche-node.md) tamamlamış ve [Avalanche mimarisini](../../../learn/platform-overview/) biliyor olmanız.

AVAX göndermek için biraz AVAX'ınız olmalı! Bir borsadan gerçek AVAX satın alabilir veya Avalanche'ı denemenin ücretsiz ve kolay bir yolu olan [AVAX Test Faucet](https://faucet.avax-test.network)'ten testnet AVAX'ı alabilirsiniz.

## Web Cüzdan'ı Kullanarak AVAX Transfer Etmek

AVAX'ı zincirler arasında aktarmanın en kolay yolu, AVAX'a erişmenin ve taşımanın gözetimsiz ve güvenli bir yolu olan [Avalanche Cüzdan](https://wallet.avax.network/)'ı kullanmaktır.

Avalanche Cüzdan'ın kaynak kodunu [burada](https://github.com/ava-labs/avalanche-wallet) bulunabilirsiniz.

### 1. Adım - Avalanche Cüzdan'ı Açın

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-01-login.png)

Cüzdanınıza girmek için **Access Wallet** düğmesini tıklayın. Cüzdanı ana Avalanche ağından başka bir ağa bağlamak için **Mainnet** ögesini ve bağlayacağınız ağı seçin.

### 2. Adım - Cüzdanınıza Giriş Yapın

Özel anahtarı, mnemonik anahtar ifadesini, keystore dosyasını veya Ledger Nano S'yi kullanarak cüzdanınıza erişebilirsiniz.

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-02-access.png)

Başarılı bir şekilde giriş yaptıktan sonra bakiyenizi, varlık portföyünüzü ve diğer çeşitli bilgileri göreceksiniz.

### 3. Adım - Cross Chain Sekmesine Gidin

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-03-earn.png)

Zincirler arasında token transfer etme fonksiyonu **Cross Chain** sekmesinde yer alır.

### 4. Adım - Transfer Edilecek Tutarı Girin

Size **Source Chain** ve **Destination Chain** için bir seçenek sunulur. Sırasıyla X-Chain'i ve P-Chain'i seçin. X ve P bakiyelerinizi ve kaynaktan (source) hedef (destination) zincire aktarılacak tutarı girmek için bir giriş alanı göreceksiniz.

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

X-Chain'den P-Chain'e transfer etmek istediğiniz miktarı girin.

### 5. Adım - İşlemi Onaylayın

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

**Confirm** düğmesine tıklayın, ardından transferi başlatmak için **Transfer** düğmesine tıklayın.

### 6. Adım - İşlem Tamam!

Zincirler arası transfer iki adımlı bir süreçtir: ilki X-Chain'den fonları dışa aktaran bir işlemdir, diğeri ise fonları dışarıdan P-Chain'e aktarmak içindir. Cüzdan her ikisini de yapacak ve bunu yaparken de ilerlemelerini gösterecektir.

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

Bu kadar! AVAX'ı X-Chain'den P-Chain'e aktardınız! Artık Avalanche ağında doğrulama veya yetkilendirme yapmak için AVAX'larınızı kullanabilirsiniz.

### P-Chain'den X-Chain'e Transfer

AVAX'ı X-Chain'e geri getirmek için transferi ters yönde yapmanız gerekir.

**Source** ve **Destination** açılır menüsünden source ve destination'ı seçerek bunları birbiriyle değiştirin. Sürecin geri kalanı aynıdır: Tutarı girin, onaylayın ve transfer edin.

## X-Chain'den API Çağrıları ile P-Chain'e Aktarmak

Avalanche ağında bir uygulama kuruyorsanız, daha geniş fonksiyonların bir parçası olarak transferi programatik olarak yapmak isteyebilirsiniz. Bunu, bir AvalancheGo düğümündeki uygun API'leri çağırarak yapabilirsiniz. Eğitimin geri kalanında, bir AvalancheGo düğümüne, X-Chain'deki AVAX tokenlarına ve düğümün anahtar deposunda (keystore) [yaratılan](../../avalanchego-apis/keystore-api.md#keystorecreateuser) ve depolanan kullanıcı kimlik bilgilerine erişiminiz olduğu varsayılır.

Aşağıdaki tüm örnek API çağrıları, düğümün yerel olarak çalıştığını (yani, `127.0.0.1` portunu dinlediğini) varsayar. Düğüm, ana ağa, bir test ağına veya yerel bir ağa bağlanabilir. Her durumda, API çağrıları ve yanıtları, adres formatları hariç aynı olmalıdır. Düğümün yerel olması şart değildir; başka bir yerde barındırılan bir düğüme de çağrı yapabilirsiniz.

Avalanche Cüzdan'ı kullanarak AVAX transfer ederken fark etmiş olabileceğiniz gibi, zincirler arası transfer iki adımlı bir işlemdir:

* X-Chain'den dışa AVAX aktarma
* Dışarıdan P-Chain'e AVAX aktarma

### 1. Adım - X-Chain'den dışa AVAX aktarma

AVAX'ı dışa aktarmak için, X-Chain'in [`avm.export`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-export)yöntemini  `AVAX`rlık kimliği ile çağırın.

Çağrınız şöyle görünmelidir:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "assetID": "AVAX",
        "amount": 5000000,
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

burada `to` kullanıcınızın kontrol ettiği bir P-Chain adresinin adresidir ve `changeAddr` para üstünün gönderileceği adrestir. `changeAddr` alanını boş bırakabilirsiniz; boş bırakırsanız, para üstü kullanıcınız tarafından kontrol edilen bir adrese iade edilecektir (yeni bir P-Chain adresi yaratmaya ilişkin talimatlar için [buraya](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) bakın).

Hem dışa hem de içe aktarma işlemleri için işlem ücreti ödeyeceğinizi aklınızda bulundurun. Bu örnekte, işlem ücretinin `.001` AVAX olduğunu varsayalım. Daha sonra, yukarıdaki dışa aktarma aslında `.006` AVAX harcar; `.005` P-Chain'e gider ve `.001` de işlem ücreti olarak yakılır.

Gönderdiğiniz tutarın işlem ücretinden daha fazla olduğunu kontrol edin. Aksi takdirde, P-Chain'de AVAX içe aktardığınızda bu içe aktarım işlem ücreti tüketir ve sonuçta P-Chain'de _daha az_ AVAX'ınız kalır.

Gelen yanıt şöyle görünmelidir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
    },
    "id": 1
}
```

Bu işlemin kabul edildiğini [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus) komutunu çağırarak doğrulayabiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.getTxStatus",
    "params":{
        "txID":"MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Gelen yanıt işlemimizin kabul edildiğini gösterir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

AVAX'ın kullanıcımız tarafından tutulan bir adresten düşüldüğünü kontrol etmek için [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) komutunu da çağırabiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-ADDRESSGOESHERE",
        "assetID":"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Düşülen tutar, dışa aktarılan tutar (bu örnekte `.005` AVAX) artı işlem ücretidir. Kullanıcınız birden fazla X-Chain adresini kontrol ediyorsa, AVAX bunların herhangi bir kombinasyonundan gönderilmiş olabilir.

### 2. Adım - Dışarıdan P-Chain'e AVAX aktarma

Transferimiz henüz yapılmadı. Transferi tamamlamak için P-Chain'in [`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax) metodunu çağırmamız gerekiyor.

Çağrınız şöyle görünmelidir:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "sourceChain":"X",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword",
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Bu, şu işlem kimliğini döndürür:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

İşlemin kabul edildiğini şununla kontrol edebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Gelen yanıt `Committed` olmalıdır, yani transfer tamamlanmıştır. Adresin bakiyesini de şu şekilde kontrol edebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBalance",
    "params":{
        "address":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Gelen yanıt şöyle görünmelidir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "4000000",
        "utxoIDs": [
            {
                "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

Gördüğümüz bakiyenin, X-Chain'den (`.004` AVAX) dışarı aktarılan tutardan işlem ücretinin çıkarılmasıyla (bu örnekte `.001` AVAX) oluşan bakiye olduğunu aklınızda bulundurun. Şimdi Birincil Ağ'ı doğrulamak için bu P-Chain adresinde tutulan AVAX'ı kullanabiliriz.

## P-Chain'den X-Chain'e programatik olarak transfer

Şimdi AVAX'ı P-Chain'den X-Chain'e geri taşıyalım.

Daha önce olduğu gibi, bu da iki aşamalı bir işlemdir:

* P-Chain'den Dışa Aktarma
* Dışarıdan X-Chain'e Aktarma

### 1. Adım - P-Chain'den dışa AVAX aktarma

Bunu yapmak için [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax) komutunu çağırın:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "amount":3000000,
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

burada `to`, AVAX'ın gönderildiği X-Chain adresidir.

Bu, işlem kimliğini döndürür ve başka bir [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus) çağrısıyla işlemin gerçekleştirildiğini kontrol edebiliriz. Yine, gönderdiğiniz tutarın işlem ücretini aştığından emin olun.

### 2. Adım - Dışarıdan X-Chain'e AVAX aktarma

P-Chain'den X-Chain'e transferimizi tamamlamak için [`avm.import`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-import) çağrısını yapın.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.import",
    "params" :{
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "sourceChain":"P",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

 `to` adresinin, [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax) çağrımızda belirtilenle aynı olduğunu aklınızda bulundurun.

Daha önce olduğu gibi, fonların alındığını doğrulamak için [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) çağrısını yapabiliriz. Bakiye, `.003` AVAX eksi işlem ücreti kadar artmış olmalıdır.

## Özet

Bu kadar! Şimdi, hem Avalanche Cüzdan'ı kullanarak hem de bir Avalanche düğümündeki uygun API çağrılarını yaparak AVAX'ı X-Chain ve P-Chain arasında gönderip geri alabilirsiniz.

Şimdi Birincil Ağda [bir doğrulayıcı olarak bir düğümü eklemek](../nodes-and-staking/add-a-validator.md) için P-Chain'deki tokenları kullanabilirsiniz.

