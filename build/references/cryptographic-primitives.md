# Kriptografik Primitives

[Avalanche](../../#avalanche) farklı fonksiyonları için çeşitli kriptografik ilkel kullanmaktadır. Bu dosya ağ ve blok zinciri katmanlarında kullanılan türünü ve kind özetler.

## Ağ Katmanındaki Kriptografi

Avalanche kulak misafiri ile node-to-node iletişimi korumak için Taşıma Katmanı Güvenliği ve TLS kullanır. TLS açık anahtar kriptografinin pratikliğini simetrik anahtar kriptografinin verimliliğini birleştirir. Bu durum TLS internet iletişim standartları haline geldi. Çoğu klasik uzlaşma protokolü üçüncü şahıslara mesajların alındığını kanıtlamak için halka açık anahtar kriptografi kullanırken Snow\* uzlaşma ailesi bu tür kanıtlara ihtiyaç duymaz. Bu durum Avalanche doğrulama yazıcıları için TLS çalıştırmasını ve ağ mesajlarını imzalamak için maliyetli halka açık şifreleme ihtiyacını ortadan kaldırmasını sağlar.

### TLS Sertifikaları

Avalanche merkezi olan üçüncü şahitlere güvenmiyor ve özellikle üçüncü taraf kimlik authenticators. tarafından verilen sertifikaları kullanmıyor. Ağ katmanında kullanılan tüm sertifika kendi kendini imzalar, böylece kendi kendine bağımsız kimlik katmanı oluştururlar. Üçüncü taraf bu işe karışmadı.

### TLS Adresleri

TLS sertifikasını Platform zincirine göndermemek için sertifika ilk kez saklandı. Avalanche tutarlılık için Bitcoin'de kullanıldığı gibi TLS sertifikaları için aynı hashing mekanizmasını kullanır. Sertifika DER temsili sha256 ile birlikte ezilir ve sonuç daha sonra rakipler için 20 byte tanımlayıcı vermek için ripemd160 ile birlikte is

Bu 20 byte [tanımlayıcısı,](https://support.avalabs.org/en/articles/4587395-what-is-cb58) "NodeID" tarafından temsil edilir.

## Avalanche Sanal Makinesi'nde Kriptografi

Avalanche sanal makine blok zincirindeki imzaları için özellikle `secp256k1` eliptik eğri kriptografi kullanır.

Bu 32 byte [tanımlayıcısı,](https://support.avalabs.org/en/articles/4587395-what-is-cb58) "PrivateKey" tarafından temsil edilir.

### Secp256k1 Adresleri

Avalanche planlara hitap etme konusunda reçeteli değildir, bunun yerine her blok zincirine hitap etmeyi seçer.

X-Chain ve P-Chain adresleme şeması secp256k1'e dayanmaktadır. Avalanche Bitcoin gibi benzer bir yaklaşımı takip eder ve ECDSA kamu anahtarına sahiptir. 33 byte sıkıştırılmış halka açık anahtarın temsil edilmesi, bir **kez** Sha256 ile birlikte ezilmektedir. Sonuç 20 byte bir adres vermek için ripemd160 ile birlikte ortaya çıkar.

Avalanche bir adres zincirinin hangi zinciri olduğunu belirlemek için kongre zinciri kimlik adresini kullanır. `chainID-address``` zinciri zincirinin takma adı ile değiştirilebilir. Dış uygulamalar aracılığıyla bilgi aktarıldığında, CB58 kongresi gereklidir.

### Bech32

X-Chain ve P-Chain üzerindeki adresler [BIP 0173](https://en.bitcoin.it/wiki/BIP_0173)'te açıklanmış [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) standardını kullanır. Bech32 adres planında dört parça var. Görünüş sırası:

* İnsan okunabilir bir bölüm. (HRP\). Bu bir `avax`.
* HRP adres ve hata düzeltme kodundan ayıran `1` numara.
* 20 byte adresi temsil eden bir üs-32 kodlanmış bir dizgi.
* 6-karakterli bir üs-32 kodlanmış hata düzeltme kodu.

Ayrıca, bir Avalanche adresi üzerinde bulunan zincirin takma adıyla önceden belirlenmiş ve ardından bir nokta var. Örneğin, X-Chain adresleri `X-`. önceden ayarlanır.

Aşağıdaki düzenli ifade X-Chain, P-Chain ve C-Chain ile mainnet, fuji ve localnet için eşleşiyor. Tüm geçerli Avalanche adreslerinin bu düzenli ifadeye uyacağını not edin, ancak geçerli olmayan bazı iplikler bu düzenli ifade ile eşleşebilir.

```text
^([XPC]|[a-km-zA-HJ-NP-Z1-9]{36,72})-[a-zA-Z]{1,83}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$
```

Avalanche's [adres](https://support.avalabs.org/en/articles/4596397-what-is-an-address) planıyla ilgili daha fazla bilgi edin.

### Secp256k1 Yeniden Yapılabilir İmzalar

Kurtarılabilir imzalar **`V'nin`** hızlı bir kamu anahtarının iyileşmesine izin vermek için 0 veya 1 olduğu 65 byte **`(R   S   V)`** olarak saklanıyor. **`S`**, imzalı malleability önlemek için olası menzilin alt yarısında olmalıdır. Mesaj imzalamadan önce mesaj, Sha256 ile iletilir.

### Secp256k1 Örnek

Rick ve Morty güvenli bir iletişim kanalı kuruyorlar. Morty yeni bir kamuoyu özel anahtar çifti yaratıyor.

Özel Anahtar: `0x98cb077f972feb0481f1d894f272c6a1e3c15e272a1658ff71644f46520070`

Public Key \(33-byte sıkıştırılabilir), `0x02b33c3c917f61034448d7feb42614037d0592843cb25e7f01a825a829b3c29b3c229b3c2229b3c225`

Rick'in sonsuz bilgeliği yüzünden Morty'nin açık anahtarını taşımakta kendisine güvenmiyor, bu yüzden sadece Morty'nin adresini istiyor. Morty talimatları takip eder, SHA256'nın açık anahtarı, ve sonra bir adres üretmek için ripemd160'ın talimatlarını takip eder.

SHA256\(Public Key\): `0x28d77166679386636f6647f528e62900668fa2a3782045bffa7b0d222006636:`

Adresi: `0xe877f38c8ca153a6fdc25942176df5491b89`

Morty oldukça kafası karışmış çünkü halka açık bir anahtar halka açık bilgi için güvenli olmalı. Rick belch ve açıklar ki açık anahtarın saklaması özel anahtar sahibini eliptik eğri in potansiyel güvenlik kusurlarından korumaktadır. Şifreleme bozulduğunda ve özel bir anahtar kamu anahtarından türetilebilir, kullanıcılar fonlarını, daha önce hiç bir işlem imzalamamış bir adrese aktarabilir, ve bir saldırgan tarafından tehlikeye atılmasını önleyebilir. Bu durum kriptografi müşteriler tarafından geliştirilirken, para sahiplerinin korunmasını sağlar.

Daha sonra Morty, Rick'in geçmişini öğrendikten sonra Morty, Rick'e bir mesaj göndermeye çalışır. Morty, Rick'in mesajını sadece ondan olduğunu if okuyacağını biliyor, bu yüzden mesajı özel anahtarıyla imzalar.

Erişim tarihi: 2017-08-08.  `0x68656c702049276d20766120636f6d757475722`

Erişim tarihi: `2013-04.  ^` Hash: 0x912800c29d554fbbb9cdce579c0c0abba991165bbccec9622481d01d0b3e4b7da

Mesaj İmzası: `0xb52aa053c5c48268d843bd65395623d24620163a86f09420c81f1d3688669a07ee6abe0e0b0b0be1a6a448585551f9e02929577d3d7d77d77d7d70011bd70011bd70011200114668866`

Morty bir daha görülmedi.

## İmzalamış Mesajlar

Bitcoin Senaryo formatı ve Ethereum formatına dayalı olarak imzalanan iletiler için bir standart

```text
sign(sha256(length(prefix) + prefix + length(message) + message))
```

prefix basitçe `\x1AAvalanche İmzalamış Message :\n`, burada `0x1A` ön ekim metin ve `uzunluk` [uzunluğunun](serialization-primitives.md#integer) uzunluğudur.

### Gantt Pre-image Belirtisi

```text
+---------------+-----------+------------------------------+
| prefix        : [26]byte  |                     26 bytes |
+---------------+-----------+------------------------------+
| messageLength : int       |                      4 bytes |
+---------------+-----------+------------------------------+
| message       : []byte    |          size(message) bytes |
+---------------+-----------+------------------------------+
                            |       26 + 4 + size(message) |
                            +------------------------------+
```

### Örnek olarak

Bir örnek olarak mesajımızı "Yıldızlara uzlaşma yoluyla imzalayacağız"

```text
// prefix size: 26 bytes
0x1a
// prefix: Avalanche Signed Message:\n
0x41 0x76 0x61 0x6c 0x61 0x6e 0x63 0x68 0x65 0x20 0x53 0x69 0x67 0x6e 0x65 0x64 0x20 0x4d 0x65 0x73 0x73 0x61 0x67 0x65 0x3a 0x0a
// msg size: 30 bytes
0x00 0x00 0x00 0x1e
// msg: Through consensus to the stars
54 68 72 6f 75 67 68 20 63 6f 6e 73 65 6e 73 75 73 20 74 6f 20 74 68 65 20 73 74 61 72 73
```

`Sha256` ile haşhaş ve ön görüntü imzaladıktan sonra kodlanmış [cb58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) değerini geri veriyoruz: `4Eb2zAHFJJmp4usSokTGqq9mEGwVMY2WZzzCmu657SNFZhndsiS8Tv32n3bexd8xxzjhqzvoRvghnvvnvSN`. İşte [Avalanche Web](https://wallet.avax.network/wallet/advanced) Cüzdanını kullanmış bir örnek.

![İmzala](../../.gitbook/assets/sign-message.png)

## Ethereum Sanal Makinesi'nde Kriptografi

Avalanche düğümleri, Ethereum Sanal Makinesi \(EVM\) tam olarak destekler ve in kullanılan tüm kriptografik yapıları tam olarak kopyalamaktadır. Bu durum Keccak özet fonksiyonu ve in kriptografik güvenlik için kullanılan diğer mekanizmaları içerir.

## Diğer Sanal Makinelerde Kriptografi

Avalanche uzanabilir bir platform olduğundan insanların sisteme zaman içinde ek kriptografik ilkel ekler ekleyeceğini umuyoruz.

