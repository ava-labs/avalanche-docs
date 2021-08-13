# X-Chain ve C-Chain arasında AVAX aktarın

## Tanıştırma

AVAX işaretleri on mevcut olup, traded, takas edilebilir, burada Primary Network'ü onaylarken ve akıllı sözleşmelerde kullanılabilecekleri veya benzin için ödeme yapılabilecek on de bulunur. Bu özel ders için, X-Chain ve C-Chain arasında AVAX işaretleri göndereceğiz.

## Gereklilik

[Bir Avalanche](../nodes-and-staking/run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz.

to göndermek için biraz AVAX kullanmanız gerek! Borsada satın alarak gerçek AVAX elde edebilirsiniz ya da [AVAX Test](https://faucet.avax-test.network) from testnet AVAX alabilirsiniz ki bu Avalanche ile oynamak için ücretsiz ve kolay bir yoldur.

## Web cüzdanı kullanarak AVAX Transferring

to zincirler arasında aktarmanın en kolay yolu to taşımak için özel olmayan ve güvenli bir yol olan [Avalanche Cüzdanını](https://wallet.avax.network/) kullanmaktır.

Avalanche Cüzdan kaynak kodu [burada](https://github.com/ava-labs/avalanche-wallet) bulunabilir.

### Adım 1 - Çığ Cüzdanını Aç

![Posta için resim](../../../.gitbook/assets/wallet-x2p-01-login.png)

Cüzdanınızı girmek için **giriş** cüzdanını seçin. Cüzdanı ana Avalanche ağı dışında bir ağa bağlamak için **to** seçin ve bağlanacak ağı seçin.

### İkinci Adım - Cüzdanına Gir.

Cüzdanınıza özel anahtar, mnemonik anahtar cümlesi, anahtar dosyası veya Ledger Nano S. C-Chain aktarımları kullanarak erişebilirsiniz.

![Posta için resim](../../../.gitbook/assets/wallet-x2p-02-access.png)

Başarılı bir giriş yaptıktan sonra dengenizi görebilirsiniz, portföyü ve çeşitli diğer bilgilerinizi varlığınıza göre.

### Adım 3 - Çapraz Zincir Tablosuna Git

![Posta için resim](../../../.gitbook/assets/wallet-x2p-03-earn.png)

Zincir arasındaki tokaların transfer edilmesinin fonksiyonelliği **Cross Chain** hesabında bulunmaktadır.

### Adım 4 - Aktarıma Miktarı Girin

**Kaynak** Zinciri ve **Hedef** Zinciri için bir seçim sunacaksınız. X-Chain ve C-Chain seçin, sırasıyla X ve C dengelerinizi ve kaynaktan hedef zincirine aktarmak için miktarı girme için bir giriş alanı göreceksiniz.

![Posta için resim](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

from to aktarmak istediğiniz miktarı girin.

### Adım 5 - İşlemi Onayla.

![Posta için resim](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

**Tetikte** ve sonra transferi başlatmak için **transferi** başlat.

### - Adım 6.

Çapraz zincir transferi, iki adım işlemidir: ilk olarak from fonları aktarmak için bir işlem, diğeri ise to aktarmak için. Cüzdan ikisini de yapar ve bunu yaparken gelişimini gösterecektir.

![Posta için resim](../../../.gitbook/assets/wallet-x2c-03-done.png)

İşte böyle! AVAX AVAX AVAX transfer ettin! Şimdi onları on akıllı sözleşmeler yerleştirmek için kullanabilirsin.

### from to aktar.

AVAX to geri döndürmek için ters yönde transfer yapmanız gerekir.

Kaynak ve hedef zinciri, **onları Kaynak** ve **Hedef** indirme menüsünden seçerek değiştir. Sürecin geri kalanı aynı: miktarı girin, onaylayın ve aktarın.

## from API Çağrıları ile to aktarılıyor.

Avalanche ağına bir uygulama inşa ediyorsanız, transfer işlemi programlamalı olarak daha geniş bir işlevselliğin parçası olarak yapmak isteyebilirsiniz. Bunu AvalancheGo düğümündeki API'leri arayarak yapabilirsin. Diğer öğretmenler bir AvalancheGo düğümüne erişebileceğinizi varsayıyor on AVAX işaretleri ve düğümün anahtarında [oluşturulmuş](../../avalanchego-apis/keystore-api.md#keystorecreateuser) ve depolanan kullanıcı kimlik bilgilerine erişiminiz var.

Aşağıdaki tüm API çağrıları düğümün yerel olarak çalıştığını varsayar. (yani `127.0.1`\ dinleme ile ilgili olarak). Düğün, ana ağa, test ağı veya yerel bir ağa bağlı olabilir. Her durumda, API çağrıları ve yanıtlar aynı olmalıdır, adres formatları hariç. Düğüm yerel olmamalıdır; başka bir yere ev sahipliği yapan bir düğümle telefon edebilirsiniz.

AVAX Avalanche Cüzdan kullanılarak transfer edildiğini fark etmiş olabileceğiniz gibi, bir çapraz zincir transfer iki işlem operasyonu:

* from AVAX aktar
* AVAX to Aktar

Transferi yapmadan önce on adresini kontrol anahtarıyla birlikte ayarlamalıyız.

### on Adres ve Anahtarı ayarla

X-Chain [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) adreslerini kullanır ve C-Chain Hex Ethereum Sanal Makinesi \(EVM\) adreslerini kullanır. Adresi bir formattan diğerine dönüştürmenin hiçbir yolu yoktur, çünkü ikisi de tek yönlü şifreleme fonksiyonu kullanarak özel bir anahtardan türetilmiştir.

Bu konuyu aşmak için, from özel bir anahtar aktarabilir ve sonra to aktarabilirsiniz. Bu şekilde, X-Chain adresini kullanabilir ve C-Chain için kullanılacak doğru Bech32 adresini almak için bir C- prefix C- önekini değiştirebilirsiniz.

İlk olarak, from özel bir anahtar dışarıya aktar:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Yanıt:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

Şimdi, aynı özel anahtarı to aktar:

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.importKey",
    "params" :{
        "username" :"myUsername",   
        "password":"myPassword",    
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

Cevap Hx kodlanmış EVM adresi içeriyor:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Şimdi işaretleri transfer etmek için her şeye sahibiz.

### from to aktar.

İhraç ettiğiniz özel anahtara karşılık gelen adresi kullan ve [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax) çağrısında C- prefix kullan:

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"C-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e",   
        "destinationChain": "C",    
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Anahtarlık kullanıcınız on özel anahtara sahip olduğu için, AVAX seçtiğiniz adrese aktarabilirsiniz. İhraç edildiği aynı adrese aktarmak gereksiz; the MetaMask veya başka bir üçüncü taraf hizmetine aktarabilirsiniz.

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

Nerede `bulunacağını` seçtiğiniz evM adresine göre.

Tepki şöyle görünüyor:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },  
    "id": 1
}
```

Not: C Zincirine aktarım için işlem ücreti yoktur.

your to transfer edildikten sonra akıllı sözleşmelerle etkileşim kurmak için kullanabilirsiniz.

## from to aktar.

AVAX from to geri taşıyabilirsin. Önce ihracat yapmalıyız:

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.exportAVAX",
    "params" :{
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",   
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

Nerede tutulduğunuz X-Chain `adresinin` bech32 kodlanmış adresi var. İhracat ettiğiniz miktarın işlem ücretinin aştığından emin olun. Çünkü ihracat ve ithalat işlemleri bir işlem ücreti alacak.

Tepki şöyle olmalı:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1
}
```

Transferi tamamlamak için [`call`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax) arayın.

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method": "avm.importAVAX",
    "params": {
        "username":"myUsername",    
        "password":"myPassword",    
        "sourceChain": "C",
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Önceki adreste gönderdiğiniz `X-Chain` adresi bech32 kodlanmış adres nerede olacak?

Tepki şöyle olmalı:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1
}
```

## Toplantı

İşte böyle! AVAX hem X-Chain hem de C-Chain arasında bir geri değiştirebilirsiniz. Avalanche Cüzdan kullanarak. Ve uygun API çağrılarını Avalanche düğümünden çağırarak.

