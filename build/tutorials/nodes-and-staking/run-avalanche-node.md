# Bir Avalanche Düğümü Çalıştırın

Avalanche hakkında bilgi edinmenin en hızlı yolu bir düğüm çalıştırmak ve ağ ile etkileşim kurmaktır.

Bu eğitim makalesinde şunların nasıl yapılacağını öğreneceğiz:

* Bir Avalanche düğümü kurma ve çalıştırma
* Avalanche'a bağlanma
* AVAX gönderme
* Düğümünüzü doğrulayıcı kümesine ekleme

{% hint style="warning" %}Karşılaştığınız sorun SSS'de ele alınmamışsa, [Avalanche Discord](https://chat.avax.network)'a gelin ve yardım isteyin! Engelleri aşmanıza yardımcı olmak için çalışacağız.{% endhint %}

{% hint style="info" %}Düğümünüzü barındırmak veya bir doğrulayıcı çalıştırmak için bir üçüncü taraf servis kullanmayı düşünürseniz, [seçeneklere göz atın](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services).{% endhint %}

Bu eğitim makalesi öncelikle geliştiricilere ve Avalanche Platformunun nasıl çalıştığına ilgi duyan kişilere yönelik olarak hazırlanmıştır. Sadece staking için bir düğüm oluşturmakla ilgileniyorsanız, bu makale yerine [Installer ile Avalanche Düğüm Kurulumu](set-up-node-with-installer.md) eğitim makalesini takip edebilirsiniz. Installer, kurulum sürecini otomatikleştirir ve bir sistem servisi olarak ayarlar, dolayısıyla başında beklemeden çalıştırma için tavsiye edilir. Ayrıca, önce bu eğitim makalesini takip ederek denemeler yapabilir, daha sonra installer'ı kullanarak düğümün ayarlarını kalıcı bir çözüm olarak yapabilirsiniz.

## Gereklilikler

Avalanche inanılmaz derecede hafif bir protokoldür, dolayısıyla düğümler sıradan bir donanımda çalışabilir. Ağ kullanımı arttıkça donanım gereksinimlerinin değişebileceğini aklınızda bulundurun.

* CPU: 8 AWS vCPU eşdeğeri
* RAM: 16 GB
* Depolama alanı: 200 GB
* İşletim Sistemi: Ubuntu 18.04/20.04 veya MacOS >= Catalina

## Bir Avalanche Düğümünü Çalıştırma ve Fonlar Gönderme

Şimdi bir Avalanche düğümün Go implementasyonu olan AvalancheGo'yu kuralım ve Avalanche Public Testnet'ine bağlanalım.

### AvalancheGo'yu indir

Düğüm, bir binary programdır. Kaynak kodunu indirebilir ve sonra binary programı kurabilir, ya da önceden kurulmuş binary'yi indirebilirsiniz. Her ikisini yapmanıza gerek yoktur.

Sadece kendi düğümünüzü çalıştırmak ve o düğümde stake yapmak istiyorsanız, [önceden kurulu binary'yi](run-avalanche-node.md#binary) indirmek daha kolaydır ve tavsiye edilir.

Avalanche'ı deneyimlemek ve onun üzerinde kurulum yapmak isteyen bir geliştirici iseniz, kaynaktan bir düğüm kurmanız tavsiye edilir.

#### **Kaynak Kodu**

Düğümü kaynaktan kurmak isterseniz, önce Go 1.16.8 sürümünü veya daha sonraki bir sürümünü kurmanız gerekecek. [Buradaki](https://golang.org/doc/install) talimatları takip edin.

`go version`'ı çalıştırın. **1.16.8 veya üstü bir sürüm olmalıdır.** `echo $GOPATH`'ı çalıştırın. **Boş olmamalıdır.**

AvalancheGo yazılım havuzunu indirin:

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

İleri düzey kullanıcılara not: AvalancheGo, Go modülleri kullanır, dolayısıyla [AvalancheGo repository](https://github.com/ava-labs/avalanchego)'yi GOPATH dışındaki konumlara klonlayabilirsiniz.

`avalanchego` dizini olarak değiştirin:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

AvalancheGo'yu kurun:

```cpp
./scripts/build.sh
```

`avalanchego` adlı binary `avalanchego/build` içindedir.

#### **Binary**

Kendiniz bir binary kurmak yerine önceden kurulmuş bir binary'yi indirmek isterseniz, [sürümler sayfamıza](https://github.com/ava-labs/avalanchego/releases) gidin ve istediğiniz sürümü seçin (muhtemelen en sonuncusu).

`Assets` altında, uygun dosyayı seçin.

MacOS için: İndirin: `avalanchego-macos-<VERSION>.zip`  Açın: `unzip avalanchego-macos-<VERSION>.zip` Çıkan klasör `avalanchego-<VERSION>`, binary'leri içerir.

PC'lerde veya bulut sağlayıcılarda Linux için: İndirin: `avalanchego-linux-amd64-<VERSION>.tar.gz`  Açın: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  Çıkan klasör, `avalanchego-<VERSION>-linux`, binary'leri içerir.

RaspberryPi4 veya benzeri Arm64 tabanlı bilgisayarlarda Linux için: İndirin: `avalanchego-linux-arm64-<VERSION>.tar.gz`  Açın: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  Çıkan klasör, `avalanchego-<VERSION>-linux`, binary'leri içerir.

### Bir Düğümü Başlatma ve Avalanche'a Bağlanma

Kaynaktan kurduysanız:

```cpp
./build/avalanchego
```

MacOS'de önceden kurulmuş binary'ler kullanıyorsanız:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Linux'da önceden kurulmuş binary'ler kullanıyorsanız:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Düğüm başladığında, (ağın geri kalanıyla eşitlenmek için) önyükleme yapması gerekir. Önyükleme ile ilgili günlükleri göreceksiniz. Belli bir zincire önyükleme yaptırıldığında, şöyle bir günlük oluşturacaktır:

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

Belli bir zincirin önyükleme yapıp yapmadığını kontrol etmek için, başka bir terminal penceresinde aşağıdaki komutu kopyalayıp yapıştırarak [`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped)  komutunu çağırın.

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

Bu komut `true` olarak dönerse, zincir önyükleme yapmış demektir. Önyükleme yapmamış bir zincire bir API çağrısı gönderirseniz, bu çağrı `API call rejected because chain is not done bootstrapping`  olarak dönecektir. Düğümünüz önyüklemeyi bir türlü bitirmiyorsa, [bu SSS'i](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping) takip edin. Sorunlar yaşamaya devam ederseniz lütfen [Discord](https://chat.avalabs.org/) üzerinden bizimle iletişime geçin.

Şimdi düğümünüz çalışıyor ve bağlı. Düğümünüzü ana ağda bir doğrulayıcı olarak kullanmak isterseniz, düğümünüzü web cüzdan kullanarak bir doğrulayıcı olarak nasıl ekleyeceğinizi öğrenmek için [bu eğitim makalesine](add-a-validator.md#add-a-validator-with-avalanche-wallet) bakın.

Düğümü kaldırmak için `Ctrl + C` tuşlarını kullanabilirsiniz.

Düğümünüzü deneyimlemek ve onunla oyunlar oynamak isterseniz okumaya devam edin.

Düğümünüze başka makinelerden API çağırısı yapabilmek için, düğümü başlatırken `--http-host=` argümanını ekleyin (örn.: `./build/avalanchego --http-host=`)

Ana ağ yerine Fuji Testnet'e bağlanmak için, `--network-id=fuji` argümanını kullanın. Testnet'te [musluktan](https://faucet.avax-test.network/) (faucet) fonlar alabilirsiniz.

### Bir Keystore Kullanıcısı yaratma

Avalanche düğümleri yerleşik bir **Keystore** (anahtar deposu) sağlar. Keystore, kullanıcıları yönetir ve esasında bir [cüzdan](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet) gibidir. Kullanıcı dediğiniz şey, bir müşterinin blok zincirlerle etkileşimde bulunurken kullanabildiği bir şifre korumalı kimliktir. **Sadece kendinizin işlettiği bir düğümde bir keystore kullanıcısı yaratmanız gerekir, çünkü düğüm işletmecisinin sizin plaintext şifrenize erişimi vardır.** Bir kullanıcı yaratmak için, [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser) komutunu çağırın:

```cpp
curl -X POST --data '{
     "jsonrpc": "2.0",
     "id": 1,
     "method": "keystore.createUser",
     "params": {
         "username": "YOUR USERNAME HERE",
         "password": "YOUR PASSWORD HERE"
     }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

Gelen yanıt şöyle olmalıdır:

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

Şimdi bu düğümde bir kullanıcıya sahipsiniz. Keystore verisi düğüm düzeyinde mevcuttur. Bir düğümün Keystore'unda yarattığınız kullanıcılar diğer düğümlerde mevcut değillerdir ama Keystore'dan veya Keystore'a kullanıcılar aktarabilirsiniz. Bunu nasıl yapacağınızı görmek için [Keystore API](../../avalanchego-apis/keystore-api.md)'ye bakın.

{% hint style="danger" %}**Düğümünüzde fonlarınızın sadece küçük bir miktarını tutmalısınız.** Fonlarınızın büyük bir kısmı, herhangi bir bilgisayara kaydedilmeyen bir nimonikle (mnemonic) güvenlik altına alınmalıdır.{% endhint %}

### Bir Adres Yaratma

Avalanche bir heterojen blok zincirler platformudur; bu blok zincirlerden biri [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)'dir ve dijital varlıklar yaratılması ve alınıp satılması için kullanılan merkezi olmayan bir platformdur. Şimdi düğümümüzde AVAX tutacak bir adres yaratacağız.

X-Chain'de yeni bir adres yaratmak için, [X-Chain API](../../avalanchego-apis/exchange-chain-x-chain-api.md)'nin bir metodu olan [`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress) komutunu çağırın:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.createAddress",
    "params" :{
        "username":"YOUR USERNAME HERE",
        "password":"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Düğümünüz önyükleme işlemini tamamlamadıysa, bu çağrı durum olarak `503` , mesaj olarak  `API call rejected because chain is not done bootstrapping`getirecektir.

Gördüğünüz gibi bu isteği `127.0.0.1:9650/ext/bc/X`'ye yapıyoruz. Satırın `bc/X` kısmı, isteğin, kimliği (ya da alias'ı) `X` olan blok zincire (örn. X-Chain) gönderildiğini gösterir.

Gelen yanıt şöyle görünmelidir:

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Şimdi kullanıcınız X-Chain'deki `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` adresini kontrol ediyor. Farklı zincirlerdeki adresleri ayırt etmek için kullanılan Avalanche yöntemi, bir adresin, üzerinde bulunduğu zincirin kimliğini ya da alias'ını içermesidir. Dolayısıyla, bu adres `X-` ile başlar, yani bu adresin X-Chain'de mevcut olduğunu gösterir.

### Avalanche Cüzdan'dan Düğümünüze Fonlar Gönderin

{% hint style="warning" %}_**Not: Aşağıdaki talimatlar gerçek fonları taşır.**_ {% endhint %}

Şimdi Avalanche Cüzdan'dan düğümünüze fonlar taşıyalım.

[Avalanche Cüzdan](https://wallet.avax.network)'a gidin. `Access Wallet` komutunu, ardından `Mnemonic Key Phrase` ögesini tıklayın. Nimonik söz öbeğinizi (mnemonic phrase) girin.

Soldaki `Send` sekmesini tıklayın. Miktar olarak, `.002` AVAX seçin. Düğümünüzün adresini girin, ardından `Confirm`'i tıklayın.

![web cüzdan gönderme sekmesi](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%285%29.png)

Bir adresin belli bir varlık bakiyesini, X-Chain API'nin diğer bir metodu olan `avm.getBalance` komutunu çağırarak kontrol edebiliriz. Şimdi transferin gerçekleşip gerçekleşmediğini kontrol edelim:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :3,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

AVAX'ın özel `AVAX` kimliğine sahip olduğu aklınızda bulunsun. Bir varlık kimliği genelde alfa sayısal bir dizgidir.

Gelen yanıt `2,000,000 nAVAX` veya `0.002 AVAX` miktarına sahip olduğumuzu göstermelidir.

```cpp
{
    "jsonrpc":"2.0",
    "id"     :3,
    "result" :{
        "balance":2000000,
        "utxoIDs": [
            {
                "txID": "x6vR85YPNRf5phpLAEC7Sd6Tq2PXWRt3AAHAK4BpjxyjRyhtu",
                "outputIndex": 0
            }
        ]
    }
}
```

### AVAX gönderme

Şimdi düğümümüze bir API çağrısı yaparak bir miktar AVAX gönderelim:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :5,
    "method" :"avm.send",
    "params" :{
        "assetID"    :"AVAX",
        "amount"     :1000,
        "to"         :"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"   :"YOUR USERNAME HERE",
        "password"   :"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`amount`, gönderilecek nAVAX adedini belirtir.

Para üstünün gideceği belli bir adres belirlemek isterseniz, bunu `changeAddr` parametresinde belirtebilirsiniz. Bu alanı boş bırakabilirsiniz; bu durumda para üstü kullanıcınızın kontrol ettiği adreslerden birine gidecektir.

Spam'ı önlemek için, Avalanche bir işlem ücreti ödenmesini zorunlu kılar. İşlem ücreti, bir işlem yayınladığınızda kullanıcınızın kontrol ettiği bir adresten otomatik olarak kesilecektir. Bakiyeleri kontrol ederken bunu aklınızda tutun.

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

Bu istemi gönderdiğinizde, düğüm, kullanıcı adınızı ve şifrenizi kullanarak kimliğinizi doğrulayacaktır. Ardından, bu istemi karşılayacak yeterli AVAX bulana kadar kullanıcınızın kontrol ettiği tüm [özel anahtarları](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) yoklayacaktır.

Gelen yanıtta işlemin kimliği bulunur. Bu kimlik her `send` çağrısında farklı olacaktır.

```cpp
{
    "jsonrpc":"2.0",
    "id"     :5,
    "result" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

#### İşlem Durumunu kontrol etme

Bu işlemi kesinleştirmek sadece bir veya iki saniye alır. İşlemin durumunu [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus) komutu ile kontrol edebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :6,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Gelen yanıt işlemin kabul edildiğini göstermelidir:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

Ayrıca, ağ işlemi henüz kesinleştirmemişse, `status`'un `Processing` (işleniyor) olduğunu da görebilirsiniz.

İşlemin `Accepted` olduğunu gördüğünüzde, `to` adresinin bakiyesini kontrol ederek gönderdiğimiz AVAX'ın orada olup olmadığını görebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :7,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Gelen yanıt şöyle olmalıdır:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

Aynı şekilde, `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` adresini kontrol ederek, gönderdiğimiz AVAX'ın işlem ücreti ile birlikte bu adresin bakiyesinden düşülüp düşülmediğini görebiliriz.

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

