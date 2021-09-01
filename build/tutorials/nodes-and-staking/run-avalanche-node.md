# Bir Çığ Düğümü çalıştır

Avalanche hakkında öğrenmenin en hızlı yolu bir düğme çalıştırmak ve ağla etkileşim kurmaktır.

{% embed url="https://youtu.be/c_SjtCiOFdg" caption="" %}

Bu ders için \(10 dakika\), biz de yapacağız.

* Bir Çığ düğümünü kur ve çalıştır
* to Bağlan
* AVAX Gönder
* Düğününü doğrulayıcı setine ekle

{% hint style="warning" %}Eğer sorununuz in ele alınmadıysa, [Avalanche](https://chat.avax.network) the yardım isteyin! Her türlü engeli aşman için çalışacağız.{% endhint %}

{% hint style="info" %}Düğününüzü ev sahipliği yapmak veya onaylayıcı çalıştırmak için üçüncü taraf hizmeti kullanmak istiyorsanız [seçenekleri kontrol edin.](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services){% endhint %}

Bu özel ders öncelikle geliştiricilere ve Avalanche Platformunun nasıl çalıştığıyla ilgilenen kişilere yönelik olarak hazırlanmaktadır. Eğer sadece gizlenmek için bir düğüm kurmakla ilgileniyorsanız, bunun yerine ["Sete Çıkma Çığ](set-up-node-with-installer.md) Düğümü" takipte bulunabilirsiniz. Yükleyici kurulum sürecini otomatik olarak ayarlar ve bu işlemi bir sistem hizmeti olarak ayarlar, bu da istenmeyen bir operasyon için önerilir. Ayrıca bu özel ders için önce bir şeyler deneyebilirsiniz, sonra da, kalıcı bir çözüm olarak kullanılarak düğümü kurabilirsiniz.

## Gereklilik

Avalanche inanılmaz hafif bir protokoldür, bu yüzden düğümler emtia donanımı üzerinde çalışabilir. Ağ kullanım arttıkça, donanım gereksinimlerinin değişebileceğinin dikkat edin.

* CPU: 8 AWS vCPU eşdeğeri
* RAM: 16 GB
* Depolama 200 GB
* OS: Ubuntu 18.04/20.04 veya MacOS >= Catalina

## Bir Çığ Düğümü çalıştır ve Fonları Gönder

AvalancheGo, bir Çığ düğümünün Go uygulamasını ve Avalanche Kamu to bağlanalım.

### AvalancheGo İndirin

Düğüm ikili bir programdır. Kaynak kodunu indirip ikili programı kurabilirsiniz, ya da önceden yapılmış ikili aryayı indirebilirsiniz. İkisini de yapmana gerek yok.

[Önceden yapılmış ikili](run-avalanche-node.md#binary) yazıları indirmek daha kolay ve kendi düğümünü çalıştırmak ve kazığı kazığa kazık atmak istiyorsan önerilir.

Kaynağından düğümü inşa etmek tavsiye edilir, eğer Avalanche'i deneye ve geliştirmek isteyen bir geliştirici iseniz.

#### **Kaynak Kod**

Eğer düğümü kaynağından yapmak istiyorsanız önce Go 1.15.5 ya da sonra kurmanız gerekecek. Talimatları takip [edin](https://golang.org/doc/install).

Koş `go version`hadi.** 1.15.5 veya üstü olmalı.** Koş `echo $GOPATH`hadi.** Boş olmamalı.**

AvalancheGo deposunu indir:

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Gelişmiş kullanıcılara not: AvalancheGo Go modüllerini kullanır, böylece [AvalancheGo](https://github.com/ava-labs/avalanchego) deposunu modules, başka yerlere can

Dizine `avalanchego`değiş:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Çığ Yap

```cpp
./scripts/build.sh
```

`avalanchego`İkili adı verilen ikili `avalanchego/build`var.

#### **İkili mi?**

Eğer kendi binası yerine önceden inşa edilmiş bir ikili indirmek istiyorsanız [bizim sürümler](https://github.com/ava-labs/avalanchego/releases) sayfamıza gidin ve istediğiniz salıverilmeyi seçin. \(muhtemelen en sonuncusu\)

`Assets`Altında, uygun dosyayı seçin.

MacOS Için: İndirme`avalanchego-macos-<VERSION>.zip`   `unzip avalanchego-macos-<VERSION>.zip`Çıkan klasör ikili dosyayı `avalanchego-<VERSION>`içeriyor.

PC'ler veya bulut sağlayıcıları için Linux için: İndirme:`avalanchego-linux-amd64-<VERSION>.tar.gz`   - Boşalt.`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`   `avalanchego-<VERSION>-linux`Ortaya çıkan klasör, ikili dosyaları içeriyor.

RaspberryPi4 veya benzer Arm64 tabanlı bilgisayarlar için Linux için: Download:`avalanchego-linux-arm64-<VERSION>.tar.gz`   - Boşalt.`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`   `avalanchego-<VERSION>-linux`Ortaya çıkan klasör, ikili dosyaları içeriyor.

### Bir Düğüm başlat ve Avalanche Bağlantı

Kaynağından inşa ettiysen:

```cpp
./build/avalanchego
```

Eğer on önceden inşa edilmiş ikili harfleri kullanıyorsanız:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Linux'ta önceden inşa edilmiş ikili kullanacaksanız:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Düğüm başladığında, düğme bağlaması \(ağın geri kalanına yetişir\). Kayıplar hakkında kayıtlar göreceksin. Verilen zincir çizme işlemi yapıldığında şöyle bir kütük basacak:

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

[`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped)Verilen bir zincir çizme işlemi yapılıp yapılmadığını kontrol etmek için diğer terminal pencere araması aşağıdaki komutu kopyalayıp yapıştırarak:

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

Eğer bu geri `true`dönerse, zincir kaydırılmış olur. Eğer bir API çağrısı yaparsanız bot kayışı yapılmamış bir zincire `API call rejected because chain is not done bootstrapping`döner. Eğer düğümünüz hiç taslak bağlamayı bitirmezse, [bu this](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping) takip edin, hala sorunlarınız yaşıyorsanız lütfen [Discord](https://chat.avalabs.org/) ile irtibata geçin.

Düğümün çalışıyor ve bağlantılı. Ana ağdaki bir doğrulayıcı olarak your kullanmak istiyorsanız web cüzdanını kullanarak bir doğrulayıcı olarak node nasıl ekleyeceğinizi öğrenmek için [bu özel öğreticiye](add-a-validator.md#add-a-validator-with-avalanche-wallet) bakın.

Düğümü öldürmek `Ctrl + C`için kullanabilirsin.

Eğer deney yapmak ve düğümle oynamak istiyorsan, oku.

Diğer makinelerden gelen düğümleri araması yapabilmek için düğümleri açarken `--http-host=`\(örn.`./build/avalanchego --http-host=`

Ana ağ yerine Fuji Testnet ile bağlantı kurmak için argüman `--network-id=fuji`kullanın. [Musluktan](https://faucet.avax-test.network/) Testnet için para alabilirsin.

### Bir Keystore Kullanıcı Oluştur

Çığ düğümleri yerleşik bir a **sağlar.** Keystore kullanıcıları yönetiyor ve [bir cüzdan](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet) gibi çok benziyor. Kullanıcı, blok zincirleriyle etkileşim halinde bir istemcinin kullanabileceği şifre korumalı bir kimliktir.** Sadece düğüm operatörünün düz metin parolanıza erişimi olduğu için işlediğiniz bir düğümle bir anahtar kullanıcısı oluşturmalısınız.** Bir kullanıcı yaratmak için, şöyle [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser)seslen:

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

Cevap şöyle olmalı:

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

Bu düğümde bir kullanıcın var. Anahtar mağazası verileri düğüm seviyesinde mevcuttur. Bir düğümün on oluşturduğunuz kullanıcılar başka düğümlerde mevcut değildir ancak kullanıcıları to/from aktarabilirsiniz. [Keystore API](../../avalanchego-apis/keystore-api.md)'yi gör.

{% hint style="danger" %}**Paranızın sadece küçük bir kısmını your tutmalısınız.** Paranızın çoğu hiçbir bilgisayara kaydedilmemiş bir mnemonik tarafından korunmalı.{% endhint %}

### Bir Adres Oluştur

Avalanche, dijital varlıkları oluşturmak ve ticaret yapmak için ademi merkeziyetli bir platform gibi hareket eden [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain) olan heterojen blok zincirlerinin bir platformudur. Şimdi de AVAX our tutmak için bir adres yaratacağız.

[`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress)on yeni bir adres yaratmak için, [X-Chain’s X-Chain’s](../../avalanchego-apis/exchange-chain-x-chain-api.md) bir metotunu arayın:

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

Eğer düğümünüz çizme işlemi tamamlanmadıysa, bu çağrı mesaj `503`ile geri dönecektir.`API call rejected because chain is not done bootstrapping`

Bu isteği biz `127.0.0.1:9650/ext/bc/X`yapıyoruz. Bu `bc/X``X`bölüm, isteğin kimliği \(veya takma isim\) olan blok zincirine gönderildiğini ifade eder.

Tepki şöyle olmalı:

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Kullanıcın `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`on adresi kontrol ediyor. Farklı zincirlerdeki adresleri birbirinden ayırmak için, Avalanche kongresi üzerinde bulunan zincirin kimliği veya takma isimlerini içeren bir adres içindir. `X-`Bu nedenle bu adres on var olduğunu belirtir.

### Çığ Cüzdanından Düğününüze Fonları Gönder

{% hint style="warning" %}_**Not: Aşağıdaki talimatlar gerçek fonları taşır.**_{% endhint %}

Avalanche cüzdanından sizin your aktaralım.

[Avalanche](https://wallet.avax.network) Cüzdanına git. `Access Wallet`Tıkla, sonra `Mnemonic Key Phrase`da. Hafızalı cümleni girin.

Soldaki `Send`sekmeyi tıklayın. Miktar, seç, `.002`AVAX. Düğününün adresini girin ve sonra `Confirm`tıklayın.

![Web cüzdanı sekme gönderir](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%2819%29.png)

`avm.getBalance`Bir adresin verilen varlık dengesini calling X-Chain’s başka bir metodu arayarak kontrol edebiliriz. Transfer geçişini kontrol edelim:

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

AVAX özel kimliği olduğunu `AVAX`unutmayın. Genellikle bir varlık kimliği, alphanumeric iptir.

Cevap bizim olduğunu ya `2,000,000 nAVAX`da olduğunu göstermeli.`0.002 AVAX`

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

### AVAX Gönder

Şimdi, bizim our API çağrısı yaparak biraz AVAX gönderelim:

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

`amount`Gönderilecek nAVAX sayısını belirler.

Değişimin nereye gitmesi gerektiğini belirli bir adres belirlemek istiyorsanız onu içinde `changeAddr`belirtebilirsiniz. Bu alanı boş bırakabilirsiniz; eğer yaparsanız, herhangi bir değişiklik kullanıcınızın kontrolleri olan adreslerden birine gider.

Avalanche bir işlem ücretini ödemeyi gerektirir. İşlem ücreti bir işlem yayınladığınızda kullanıcınızın kontrol ettiği bir adresten otomatik olarak indirilecektir. Aşağıdaki dengeleri kontrol ederken bunu aklınızda tutun.

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

Bu isteği gönderdiğinizde, düğüm, kullanıcı adını ve parolanızı kullanarak sizi doğrulayacaktır. Sonra, kullanıcınızın kontrol ettiği [tüm özel](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) anahtarlara bakacaktır. Ta ki bu talebi tatmin edecek kadar AVAX bulana kadar.

Bu cevap işlemlerin kimliğini içeriyor. Her defasında farklı `send`olacak.

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

#### İşlem Durumunu Kontrol Ediyor

Bu işlem sadece bir iki saniye sürecek. Durumunu şöyle kontrol [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)edebiliriz:

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

Cevap işlemlerin kabul edildiğini göstermeli:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

`status`Eğer ağ işlemleri henüz tamamlamamış `Processing`ise bunu da görebilirsiniz.

`Accepted`İşlemin gerçekleştiğini gördüğünüzde gönderdiğimiz AVAX olduğunu görmek için `to`adresin dengesini kontrol edin:

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

Cevap şöyle olmalı:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

`X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`Aynı şekilde, gönderdiğimiz AVAX dengesini ve işlem ücretinin de kesildiğini kontrol edebiliriz.

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

