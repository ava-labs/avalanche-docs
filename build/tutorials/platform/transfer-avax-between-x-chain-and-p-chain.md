# X-Chain ve P-Chain Arasındaki AVAX Aktar

## Tanıştırma

AVAX işaretleri on mevcut olup, traded, takas edilebilir, burada Primary Network'ü onaylarken ve akıllı sözleşmelerde kullanılabilecekleri veya benzin için ödeme yapılabilecek on de bulunur. Avalanche bu zincirler arasında of hareketini destekler ve gelecekte Avalanche zincirler arasındaki daha genel atom değişimlerini destekler. Bu özel ders için, X-Chain ve P-Chain. arasında AVAX işaretleri göndereceğiz.

## Gereklilik

[Başlatmayı](../nodes-and-staking/run-avalanche-node.md) bitirdin ve [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsun.

to göndermek için biraz AVAX kullanmanız gerek! Borsada satın alarak gerçek AVAX elde edebilirsiniz ya da [AVAX Test](https://faucet.avax-test.network) from testnet AVAX alabilirsiniz ki bu Avalanche ile oynamak için ücretsiz ve kolay bir yoldur.

## Web Cüzdanı kullanarak AVAX Transfer Ediliyor

to zincirler arasında aktarmanın en kolay yolu to taşımak için özel olmayan ve güvenli bir yol olan [Avalanche Cüzdan](https://wallet.avax.network/) kullanmaktır.

Avalanche Cüzdan kaynak kodu [burada](https://github.com/ava-labs/avalanche-wallet) bulunabilir.

### Adım 1 - Çığ Cüzdanını Aç

![Posta için resim](../../../.gitbook/assets/wallet-x2p-01-login.png)

Cüzdanınızı girmek için **giriş** cüzdanını seçin. Cüzdanı ana Avalanche ağı dışında bir ağa bağlamak için **to** seçin ve bağlanacak ağı seçin.

### İkinci Adım - Cüzdanına Gir.

Cüzdanına özel anahtar, mnemonik anahtar cümlesi, anahtar dosyası veya Ledger Nano S'yi kullanarak erişebilirsiniz.

![Posta için resim](../../../.gitbook/assets/wallet-x2p-02-access.png)

Başarılı bir giriş yaptıktan sonra dengenizi görebilirsiniz, portföyü ve çeşitli diğer bilgilerinizi varlığınıza göre.

### Adım 3 - Çapraz Zincir Tablosuna Git

![Posta için resim](../../../.gitbook/assets/wallet-x2p-03-earn.png)

Zincir arasındaki tokaların transfer edilmesinin fonksiyonelliği **Cross Chain** hesabında bulunmaktadır.

### Adım 4 - Aktarıma Miktarı Girin

**Kaynak** Zinciri ve **Hedef** Zinciri için bir seçim sunacaksınız. X-Chain ve P-Chain seçin, sırasıyla X ve P dengelerinizi ve kaynaktan hedef zincirine aktarmak için miktarı girme için bir giriş alanı göreceksiniz.

![Posta için resim](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

from to aktarmak istediğiniz miktarı girin.

### Adım 5 - İşlemi Onayla.

![Posta için resim](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

**Tetikte** ve sonra transferi başlatmak için **transferi** başlat.

### - Adım 6.

Çapraz zincir transferi, iki adım işlemidir: ilk olarak from fonları aktarmak için bir işlem, diğeri ise to aktarmak için. Cüzdan ikisini de yapar ve bunu yaparken gelişimini gösterecektir.

![Posta için resim](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

İşte böyle! AVAX to AVAX transfer ettin! Şimdi onları Avalanche ağına doğrulamak veya delege yapmak için kullanabilirsiniz.

### from to aktarım

AVAX to geri döndürmek için ters yönde transfer yapmanız gerekir.

Kaynak ve hedef zincirlerini **kaynak** ve hedef zincirlerini kaynak ve **hedef** indirme menüsünden seçerek değiştir. Sürecin geri kalanı aynı: miktarı girin, onaylayın ve aktarın.

## from to API Çağrıları ile aktarılıyor.

Avalanche ağına bir uygulama inşa ediyorsanız, transfer işlemi programlamalı olarak daha geniş bir işlevselliğin parçası olarak yapmak isteyebilirsiniz. Bunu AvalancheGo düğümündeki API'leri arayarak yapabilirsin. Diğer öğretmenler bir AvalancheGo düğümüne erişebileceğinizi varsayıyor on AVAX işaretleri ve düğümün anahtarında [oluşturulmuş](../../avalanchego-apis/keystore-api.md#keystorecreateuser) ve depolanan kullanıcı kimlik bilgilerine erişiminiz var.

Aşağıdaki tüm API çağrıları düğümün yerel olarak çalıştığını varsayar. (yani `127.0.1`\ dinleme ile ilgili olarak). Düğün, ana ağa, test ağı veya yerel bir ağa bağlı olabilir. Her durumda, API çağrıları ve yanıtlar aynı olmalıdır, adres formatları hariç. Düğüm yerel olmamalıdır; başka bir yere ev sahipliği yapan bir düğümle telefon edebilirsiniz.

AVAX Avalanche Cüzdan kullanılarak transfer edildiğini fark etmiş olabileceğiniz gibi, bir çapraz zincir transfer iki işlem operasyonu:

* from AVAX aktar
* AVAX P zincirine aktar

### Adım 1 - from AVAX Aktar

AVAX, dışa aktarmak için, X-Chain’s [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax) yöntemini çağırın.

Araman şöyle olmalı:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "destinationChain": "P",
        "amount": 5000000,
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Kullanıcı denetimlerinizi ve `değiştirme` Adresi, bir P-Chain adresi adresi olarak adresi adresi adresi `olarak` gönderilecek herhangi bir değişiklik göndermek için adres adresidir. `Değiştirilmiş Addr` boş bırakabilirsiniz; eğer boş bırakırsanız, değişiklik kullanıcınız tarafından kontrol edilen bir adrese geri verilecektir\ (yeni bir P-Chain adresi oluşturma talimatları için [burada](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) bakın).

İhracat ve ithalat işlemleri için bir işlem ücreti ödeyeceğinizi unutmayın. Bu örnekte, işlem ücretinin `.001` AVAX olduğunu varsayalım. Daha sonra yukarıdaki ihracat aslında `.006` AVAX; tüketir; `.005` to gider ve `.001` işlem ücreti olarak yanar.

Gönderdiğiniz miktarın işlem ücretinin çok olduğundan emin olun. Aksi takdirde, AVAX on aktardığınızda, işlem ücretini tüketir ve P-Chain, daha _az_ AVAX ile end

Tepki şöyle olmalı:

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

Bu işlemin [`this`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus) çağırarak kabul edildiğini doğrulayabiliriz:

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

Bu da bizim işlemimizin kabul edildiğini gösteriyor:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

[`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) arayabiliriz. AVAX kullanıcımızın yaptığı bir adresten çıkarıldığını kontrol etmek için:

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

Düşürülen miktar, \(`.005` AVAX bu örnekteki aktarma ücreti artı işlem ücretidir. Eğer kullanıcınız birden fazla X-Chain adreslerini kontrol ediyorsa, AVAX herhangi bir kombinasyonundan gönderilmiş olabilir.

### Adım 2 - AVAX to Aktar

Transferimiz henüz bitmedi. Transferi bitirmek için P-Chain’s [`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax) yöntemini aramalıyız.

Araman şöyle olmalı:

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

Bu işlem kimliğini gönderir:

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

İşlemin kabul edildiğini kontrol edebiliriz:

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

`Bu` da nakil tamamlandı anlamına geliyor. Adres dengesini de kontrol edebiliriz:

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

Tepki şöyle olmalı:

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

Gördüğümüz denge, işlem ücreti \(`.004` AVAX\) bu örnekteki işlem ücreti \(`.001` AVAX daha az aktarılan miktardır. Şimdi, bu P-Chain adresi tarafından tutulan the Primary Network'ü onaylamak için bir hisse sağlayabiliriz.

## from to aktarılıyor programlamalı

Şimdi, AVAX from to geri taşıyalım.

Önceki gibi bu da iki işlem operasyonu:

* from dışarıya aktar
* to Aktar

### Adım 1 - from AVAX Aktar

Bu yüzden [`call`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax) arayın:

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

X-Chain gönderdiği X-Chain `adresi` nerede olacak?

Bu işlem kimliğini geri verir, ve [`işlemin`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus) to başka bir çağrı ile işlendiğini kontrol edebiliriz. Gönderdiğiniz miktarın işlem ücretinin çok olduğundan emin olun.

### Adım 2 - AVAX to Aktar

from to aktarmamızı bitirmek için [`to`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax) arayın:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importAVAX",
    "params" :{
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "sourceChain":"P",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Bu adresin [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax) `çağrısında` belirtilen aynı adres olduğunu unutmayın.

Tıpkı önceki gibi, [`call`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) arayıp, fonların alındığını doğrulayabiliriz. Denge işlem ücreti eksi `.003` AVAX ile artmış olmalıydı.

## Toplantı

İşte böyle! AVAX X-Chain ve P-Chain arasında bir ileri geri değiştirebilirsiniz. Hem Avalanche Cüzdan kullanarak, hem de Avalanche düğümünü kullanarak uygun API çağrılarını arayabilirsiniz.

Şimdi on işaretleri Primary Network'te [geçerli bir düğüm](../nodes-and-staking/add-a-validator.md) eklemede kullanabilirsiniz.

