# X-Chain ile C-Chain Arasında AVAX Transfer Edin

## Giriş

AVAX tokenları, alıp satılabilecekleri X-Chain'de, Birincil Ağı doğrularken stake edilebilecekleri P-Chain'de ve akıllı sözleşmelerde veya gaz ödemesi için kullanılabilecekleri C-Chain'de bulunurlar. Bu Bu eğitimde, X-Chain ve C-Chain arasında AVAX tokenları göndereceğiz.

## Gereklilikler

[Bir Avalanche Düğümünün Çalıştırılması](../nodes-and-staking/run-avalanche-node.md) eğitimini tamamlamış ve [Avalanche mimarisini](../../../learn/platform-overview/) biliyor olmanız.

AVAX göndermek için, biraz AVAX'ınız olmalı! Bir borsadan gerçek AVAX satın alabilir veya Avalanche'ı denemenin ücretsiz ve kolay bir yolu olan [AVAX Test Faucet](https://faucet.avax-test.network)'ten testnet AVAX'ı alabilirsiniz.

## AVAX'ı web cüzdanını kullanarak aktarmak

AVAX'ı zincirler arasında aktarmanın en kolay yolu, AVAX'a erişmenin ve taşımanın gözetimsiz ve güvenli bir yolu olan [Avalanche Cüzdan](https://wallet.avax.network/)'ı kullanmaktır.

Avalanche Cüzdan'in kaynak kodunu [burada](https://github.com/ava-labs/avalanche-wallet) bulunabilirsiniz.

### 1. Adım - Avalanche Cüzdan'ı Açın

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-01-login.png)

Cüzdanınıza girmek için **Access Cüzdan** düğmesine tıklayın. Cüzdanı ana Avalanche ağından başka bir ağa bağlamak için **Mainnet**' ögesini ve bağlayacağınız ağı seçin.

### Adım 2 - Cüzdanınıza Giriş Yapın

Özel anahtarı, mnemonik anahtar kelime grubunu, keystore dosyasını ya da Ledger Nano S'yi kullanarak cüzdanınıza erişebilirsiniz. Ledger üzerinden C-Chain transferleri henüz desteklenmemektedir.

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-02-access.png)

Başarılı bir şekilde giriş yaptıktan sonra bakiyenizi, varlık portföyünüzü ve diğer çeşitli bilgileri göreceksiniz.

### 3. Adım - Cross Chain Sekmesine Gidin

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2p-03-earn.png)

Zincirler arasında token transfer etme fonksiyonu **Cross Chain** sekmesinde yer alır.

### 4. Adım - Transfer Edilecek Tutarı Girin

Size **Source Chain** ve **Destination Chain** için bir seçenek sunulur. Sırasıyla X-Chain'i ve C-Chain'i seçin. X ve C bakiyelerinizi ve kaynaktan hedef zincire aktarılacak tutarı girmek için bir giriş alanı göreceksiniz.

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

X-Chain'den C-Chain'e aktarmak istediğiniz miktarı girin.

### Adım 5 - İşlemi Onaylayın

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

**Confirm** düğmesine tıklayın, ardından transferi başlatmak için **Transfer** düğmesine tıklayın.

### Adım 6 - İşlem Tamam!

Zincirler arası transfer iki adımlı bir süreçtir: ilki X-Chain'den fonları dışa aktaran bir işlemdir, diğeri ise fonları dışarıdan C-Chain'e aktarmak içindir. Cüzdan her ikisini de yapacak ve bunu yaparken de ilerlemelerini gösterecektir.

![Yayınlanacak görsel](../../../.gitbook/assets/wallet-x2c-03-done.png)

Bu kadar! AVAX'ı X-Chain'den C-Chain'e aktardınız! Artık C-Chain'de akıllı sözleşmeleri kullanıma sunmak (deploy) için bunları kullanabilirsiniz.

### C-Chain'den X-Chain'e Aktarma

AVAX'ı X-Chain'e geri getirmek için transferi ters yönde yapmanız gerekir.

**Source** ve **Destination** açılır menüsünden seçim yaparak kaynağı ve hedefi birbiriyle değiştirin. Sürecin geri kalanı aynıdır: Tutarı girin, onaylayın ve transfer edin.

## X-Chain'den API Çağrıları ile C-Chain'e Aktarım

Avalanche ağında bir uygulama kuruyorsanız, daha geniş fonksiyonların bir parçası olarak aktarımı programatik olarak yapmak isteyebilirsiniz. Bunu, bir AvalancheGo düğümündeki uygun API'leri çağırarak yapabilirsiniz. Eğitimin geri kalanında, bir AvalancheGo düğümüne, X-Chain'deki AVAX tokenlarına ve düğümün anahtar deposunda (keystore) [yaratılan](../../avalanchego-apis/keystore-api.md#keystorecreateuser) ve depolanan kullanıcı kimlik bilgilerine erişiminiz olduğu varsayılır.

Aşağıdaki tüm örnek API çağrıları, düğümün yerel olarak çalıştığını (yani, `127.0.0.1` portunu dinlediğini) varsayar. Düğüm, ana ağa, bir test ağına veya yerel bir ağa bağlanabilir. Her durumda, API çağrıları ve yanıtları, adres formatları hariç aynı olmalıdır. Düğümün yerel olması şart değildir; başka bir yerde barındırılan bir düğüme de çağrı yapabilirsiniz.

Avalanche Cüzdan'ı kullanarak AVAX transfer ederken fark etmiş olabileceğiniz gibi, zincirler arası transfer iki adımlı bir işlemdir:

* X-Chain'den Dışa AVAX Aktarma
* Dıştan C-Chain'e AVAX Aktarma

Aktarımı yapmadan önce, kontrol anahtarıyla birlikte C-Chain'deki adresi ayarlamamız gerekir.

### C-Chain'de Adresi ve Anahtarı Ayarlama

X-Chain, [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) adresleri ve C-Chain, hex Ethereum Sanal Makinesi (EVM) adresleri kullanır. Adresi bir 	formattan diğerine dönüştürmenin yolu yoktur, çünkü her ikisi de tek yönlü bir kriptografik fonksiyon kullanan özel bir anahtardan türetilmiştir.

Bunu aşmak için, X-Chain'den özel bir anahtarı dışa aktarabilir ve ardından da bunu C-Chain'e aktarabilirsiniz. Bu yolla, C-Chain için kullanılacak doğru Bech32 adresini almak için X-Chain adresini kullanabilir ve X-ön ekini bir C-ön ekiyle değiştirebilirsiniz.

İlk olarak, X-Chain'den özel bir anahtarı dışa aktarın:

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

Şimdi aynı özel anahtarı C-Chain'e aktarın:

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

Yanıt bir hex-kodlu bir EVM adresi içerir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Artık tokenları aktarmak için gereken her şeye sahibiz.

### X-Chain'den C-Chain'e Aktarma

Dışa aktardığınız özel anahtara karşılık gelen adresi kullanın ve [`avm.export`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-export) çağrısında C ön ekini kullanın:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "assetID": "AVAX",
        "to": "C-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
        "amount": 5000000,
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Keystore kullanıcınız C-Chain'de karşılık gelen özel anahtara sahip olduğundan artık AVAX'ı seçtiğiniz adresinize aktarabilirsiniz. Dışa aktarıldığı adresin aynısına içe aktarmak şart değildir; AVAX'ı MetaMask'ta veya başka bir üçüncü taraf servisinde sahip olduğunuz bir adrese aktarabilirsiniz.

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

burada `to`, seçtiğiniz hex-kodlu bir EVM adresi olur.

Yanıt şöyle görünür:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },
    "id": 1
}
```

Not: C-Chain'e yapılan aktarım işlemlerinde işlem ücreti alınmaz.

AVAX'ınız C-Chain'e aktarıldıktan sonra, akıllı sözleşmeleri kullanıma sunmak ve bunlarla etkileşimde bulunmak için kullanabilirsiniz.

## C-Chain'den X-Chain'e Aktarım

Artık AVAX'ı C-Chain'den X-Chain'e geri taşıyabilirsiniz. Önce şunu dışa aktarmamız gerekir:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportAVAX",
    "params" :{
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "assetID": "AVAX",
        "amount": 5000000,
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

burada `to`, sahip olduğunuz bir X-Chain adresinin bech32 kodlu adresidir. Hem içe hem de dışa aktarım işlemlerinde işlem ücreti alınacağından, içe aktardığınız miktarın işlem ücretini aştığından emin olmanız gerekir.

Gelen yanıt şöyle görünmelidir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"
    },
    "id": 1
}
```

Aktarımı tamamlamak için [`avm.import`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-import) çağrısını yapın.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method": "avm.import",
    "params": {
        "username":"myUsername",
        "password":"myPassword",
        "sourceChain": "C",
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

burada `to`, önceki adımda parayı gönderdiğiniz X-Chain adresinin bech32 kodlu adresidir.

Gelen yanıt şöyle görünmelidir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"
    },
    "id": 1
}
```

## Özet

Bu kadar! Şimdi hem Avalanche Cüzdan'ı kullanarak hem de bir Avalanche düğümündeki uygun API çağrılarını arayarak AVAX'ı X-Chain ve C-Chain arasında gönderip geri alabilirsiniz.

