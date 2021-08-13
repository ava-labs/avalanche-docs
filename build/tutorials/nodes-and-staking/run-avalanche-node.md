# Bir Çığ Düğümü çalıştır

Avalanche hakkında öğrenmenin en hızlı yolu bir düğme çalıştırmak ve ağla etkileşim kurmaktır.

{% embed url="https://youtu.be/c\_SjtCiOFdg" %}

Bu ders için 10 dakika sonra yapacağız.

* Bir Çığ düğümünü kur ve çalıştır
* to Bağlan
* AVAX Gönder
* Düğününü doğrulayıcı setine ekle

{% ipuçları style="warning" } Eğer sorununuz in ele alınmadıysa, [Avalanche](https://chat.avax.network) the yardım isteyin! Her türlü engeli aşman için çalışacağız. {% endhint }

{% ipuçları style="info" } Düğününüzü ev sahipliği yapmak veya onaylayıcı çalıştırmak için üçüncü taraf hizmeti kullanmak istiyorsanız [seçenekleri kontrol edin](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services). {% endhint }

Bu özel ders öncelikle geliştiricilere ve Avalanche Platformunun nasıl çalıştığıyla ilgilenen kişilere yönelik olarak hazırlanmaktadır. Eğer sadece gizlenmek için bir düğüm kurmakla ilgileniyorsanız, bunun yerine ["Sete Çıkma Çığ](set-up-node-with-installer.md) Düğümü" takipte bulunabilirsiniz. Yükleyici kurulum sürecini otomatik olarak ayarlar ve bu işlemi bir sistem hizmeti olarak ayarlar, bu da istenmeyen bir operasyon için önerilir. Ayrıca bu özel ders için önce bir şeyler deneyebilirsiniz, sonra da, kalıcı bir çözüm olarak kullanılarak düğümü kurabilirsiniz.

## Gereklilik

Avalanche inanılmaz hafif bir protokoldür, bu yüzden minimum bilgisayar gereksinimleri oldukça mütevazıdır. Ağ kullanım arttıkça, donanım gereksinimlerinin değişebileceğinin dikkat edin.

* Donanma: CPU > 2 GHz, RAM > 4 GB, Depo > 200 GB serbest alan
* OS: Ubuntu 18.04/20.04 veya MacOS >= Catalina

## Bir Çığ Düğümü çalıştır ve Fonları Gönder

AvalancheGo, bir Çığ düğümünün Go uygulamasını ve Avalanche Kamu to bağlanalım.

### AvalancheGo İndirin

Düğüm ikili bir programdır. Kaynak kodunu indirip ikili programı kurabilirsiniz, ya da önceden yapılmış ikili aryayı indirebilirsiniz. İkisini de yapmana gerek yok.

[Önceden yapılmış ikili](run-avalanche-node.md#binary) yazıları indirmek daha kolay ve kendi düğümünü çalıştırmak ve kazığı kazığa kazık atmak istiyorsan önerilir.

Kaynağından düğümü inşa etmek tavsiye edilir, eğer Avalanche'i deneye ve geliştirmek isteyen bir geliştirici iseniz.

#### **Kaynak Kod**

Eğer düğümü kaynağından yapmak istiyorsanız önce Go 1.15.5 ya da sonra kurmanız gerekecek. Talimatları takip [edin](https://golang.org/doc/install).

`Sürüm` sürsün. **1.15.5 veya üstü olmalı.** `Yankı ${ $GOPATH`. çalıştır. **Boş olmamalı.**

AvalancheGo deposunu indir:

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Gelişmiş kullanıcılara not: AvalancheGo Go modüllerini kullanır, böylece [AvalancheGo](https://github.com/ava-labs/avalanchego) deposunu modules, başka yerlere can

`avalanchego` dizinine değiş:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Çığ Yap

```cpp
./scripts/build.sh
```

Çığ adı verilen ikili `avalanchego``,`

#### **İkili mi?**

Eğer kendi binası yerine önceden inşa edilmiş bir ikili indirmek istiyorsanız [bizim sürümler](https://github.com/ava-labs/avalanchego/releases) sayfamıza gidin ve istediğiniz salıverilmeyi seçin. \)

`Varlıklar` altında, uygun dosyayı seçin.

MacOS için: İndirme: `avalanchego-macos-<VERSION>.zip`   Unzip: `unzip avalanchego-macos-<VERSION>.zip` Ortaya çıkan klasör, `avalanchego-<VERSION>`, ikili içermektedir.

Linux için PC'ler veya bulut sağlayıcıları için indirilme: `avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip: `tar - xvf avalanchego-linux-amd64<VERSION>.tar.gz`   Ortaya çıkan klasör `avalanchego-<VERSION>-linux`, ikili içerir.

Linux için RaspberryPi4 veya benzer Arm64 tabanlı bilgisayarlar: Download: `avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip: `tar - xvf avalanchego-linux-arm64<VERSION>.tar.gz`   Ortaya çıkan klasör `avalanchego-<VERSION>-linux`, ikili içerir.

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

Düğüm başladığında, \ (ağın geri kalanına yetişir), bot bağlamak zorundadır. Kayıplar hakkında kayıtlar göreceksin. Verilen zincir çizme işlemi yapıldığında şöyle bir kütük basacak:

`INFO [06-07| 19:54:06] <X Chain> /snow/motor/avalanche/transitive.go#80: bootstrapping (1) kabul edilen sınırda 1 dikey ile bitmiştir.`

Verilen bir zincir çizme işlemi yapılıp yapılmadığını kontrol etmek için, başka bir terminal pencere arama bootstrapping, tuşunda aşağıdaki komutu kopyalayarak [`ve`](../../avalanchego-apis/info-api.md#info-isbootstrapped) yapıştırarak bağlandı:

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

Eğer bu `doğru` dönerse, zincir kaydırılır. Eğer bir API çağrısı yaparsanız bot kayışı yapılmamış bir zincire `çevirirseniz, API çağrısını geri çevirir, çünkü zincir çizme yapılmamıştır`. Eğer düğümünüz hiç taslak bağlamayı bitirmezse, [bu this](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping) takip edin, hala sorunlarınız yaşıyorsanız lütfen [Discord](https://chat.avalabs.org/) ile irtibata geçin.

Düğümün çalışıyor ve bağlantılı. Ana ağdaki bir doğrulayıcı olarak your kullanmak istiyorsanız web cüzdanını kullanarak bir doğrulayıcı olarak node nasıl ekleyeceğinizi öğrenmek için [bu özel öğreticiye](add-a-validator.md#add-a-validator-with-avalanche-wallet) bakın.

Düğümü kesmek için `Ctrl + C` kullanabilirsiniz.

Eğer deney yapmak ve düğümle oynamak istiyorsan, oku.

Düğününü açarken diğer makinelerden API çağrıları yapabilmek için düğümleri açılırken, argüman `--http-host=` \(örn: `./build/avalanchego` -http-host=\)

Ana ağ yerine Fuji Testnet ile bağlantı kurmak için, argüman --ağ `--network-id=fuji`. [Musluktan](https://faucet.avax-test.network/) Testnet için para alabilirsin.

### Bir Keystore Kullanıcı Oluştur

Çığ düğümleri yerleşik **bir** a sağlar. Keystore kullanıcıları yönetiyor ve [bir cüzdan](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet) gibi çok benziyor. Kullanıcı, blok zincirleriyle etkileşim halinde bir istemcinin kullanabileceği şifre korumalı bir kimliktir. **Sadece düğüm operatörünün düz metin parolanıza erişimi olduğu için işlediğiniz bir düğümle bir anahtar kullanıcısı oluşturmalısınız.** Bir kullanıcı oluşturmak için, keystore. [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser):

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

{% ipuçları style="danger" % } **Paranızın sadece küçük bir kısmını your tutmalısınız.** Paranızın çoğu hiçbir bilgisayara kaydedilmemiş bir mnemonik tarafından korunmalı. {% endhint }

### Bir Adres Oluştur

Avalanche, dijital varlıkları oluşturmak ve ticaret yapmak için ademi merkeziyetli bir platform gibi hareket eden [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain) olan heterojen blok zincirlerinin bir platformudur. Şimdi de AVAX our tutmak için bir adres yaratacağız.

on yeni bir adres yaratmak için, [`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), arayın [X-Chain’s X-Chain’s](../../avalanchego-apis/exchange-chain-x-chain-api.md) bir metotu:

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

Eğer düğümünüz çizme işlemi tamamlanmadıysa, bu çağrı `503` durumu `API çağrısı reddedildi çünkü zincir çizme yapılmadı`.

Bu isteğin `127.0.0.1:9650/ext/bc/X`'e yapıldığına dikkat edin. `Bc/X` porsiyonu isteğin `X` \(veya takma as\) olduğu blok zincirine gönderildiğini gösterir.

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

Kullanıcınız `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` adresini kontrol ediyor. Farklı zincirlerdeki adresleri birbirinden ayırmak için, Avalanche kongresi üzerinde bulunan zincirin kimliği veya takma isimlerini içeren bir adres içindir. Bu nedenle bu adres X-, var olduğunu belirten `X-`, başlar.

### Çığ Cüzdanından Düğününüze Fonları Gönder

{% ipuçları style="warning" } _**Not: Aşağıdaki talimatlar gerçek fonları taşır.**_ {% endhint }

Avalanche cüzdanından sizin your aktaralım.

[Avalanche](https://wallet.avax.network) Cüzdanına git. Giriş `Cüzdan` tıklayın, sonra `Mnemonik Anahtar Ifadesi`. Hafızalı cümleni girin.

Soldaki `Gönderme` sekmesine tıklayın. Miktar, seç, `.002` AVAX. Düğününüzün adresini girin, sonra `da` of tıklayın.

![Web cüzdanı sekme gönderir](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%2819%29.png)

Bir adresin verilen varlık dengesini `avm.getBalance`, arayarak kontrol edebiliriz. X-Chain’s X-Chain’s başka bir yöntemi Transfer geçişini kontrol edelim:

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

AVAX özel kimlik `AVAX` olduğunu unutmayın. Genellikle bir varlık kimliği, alphanumeric iptir.

Cevap `2000,000 nAVAX` veya `0.002 AVAX` olduğunu göstermeli.

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

nAVAX sayısını gönderecek `kadar` tutar.

Değişimin nereye gitmesi gerektiğini belirtirseniz, `onu` değiştirme in belirtebilirsiniz. Bu alanı boş bırakabilirsiniz; eğer yaparsanız, herhangi bir değişiklik kullanıcınızın kontrolleri olan adreslerden birine gider.

Avalanche bir işlem ücretini ödemeyi gerektirir. İşlem ücreti bir işlem yayınladığınızda kullanıcınızın kontrol ettiği bir adresten otomatik olarak indirilecektir. Aşağıdaki dengeleri kontrol ederken bunu aklınızda tutun.

{% page-ref page="... /.. /../learn/platform-overview/transaction-fees.md" }

Bu isteği gönderdiğinizde, düğüm, kullanıcı adını ve parolanızı kullanarak sizi doğrulayacaktır. Sonra, kullanıcınızın kontrol ettiği [tüm özel](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) anahtarlara bakacaktır. Ta ki bu talebi tatmin edecek kadar AVAX bulana kadar.

Bu cevap işlemlerin kimliğini içeriyor. `Gönderilen` her şey için farklı olacak.

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

Bu işlem sadece bir iki saniye sürecek. Durumunu [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

Eğer ağ işlemleri henüz if `durum` `işleme` sürecinde olduğunu da görebilirsiniz.

İşlemin `kabul` edildiğini `gördüğünüzde,` gönderdiğimiz AVAX var mı diye adresin dengesini kontrol edin:

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

Aynı şekilde `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` ile gönderdiğimiz AVAX dengesini ve işlem ücretinin de düşüşünü görmek için kontrol edebiliriz.

{% page-ref page="add-a-validator.md" %}

{% page-ref page="... /../tools/avalanchejs/create-an-asset-on-the-x-chain.md" }

{% page-ref page="../platform/create-avm-blockchain.md" }

{% page-ref page="../platform/create-custom-blockchain.md" blok {% }

{% page-ref page="../platform/create-a-subnet.md"

{% page-ref page="... /./avalanchego-apis/% }

{% page-ref page="... /./referans/%}

