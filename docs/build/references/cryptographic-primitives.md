---
sidebar\_position: 5
---
# Kriptografik Temel Ögeler

[Avalanche](../../#avalanche) farklı farklı fonksiyonları için çeşitli kriptografik primitifler kullanır. Bu dosyada ağ ve blok zincir katmanlarında kullanılan kriptografi tipi ve çeşidi özetlenmektedir.

## Ağ Katmanındaki Kriptografi

Avalanche, düğümden düğüme iletişimleri gizli dinlemelerden \(eavesdropper\) korumak için Taşıma Katmanı Güvenliği \(TLS\) protokolünü kullanır. TLS, açık anahtarlı kriptografinin pratikliğini simetrik anahtarlı kriptografinin verimliliği ile birleştirir. Bu, TLS protokolünün internet iletişiminin standardı haline gelmesiyle sonuçlanmıştır. Çoğu klasik konsensüs protokolleri üçüncü taraflara giden mesajların alındığını kanıtlamak için açık anahtarlı kriptografi kullanırken, yeni Snow\* konsensüs ailesi bu tür kanıtlar gerektirmez. Bu, Avalanche'ın stake edenlerin kimlik doğrulamasında TLS kullanmasına imkan sağlar ve ağ mesajlarının imzalaması için pahalı açık anahtarlı kriptografiye olan ihtiyacı ortadan kaldırır.

### TLS Sertifikaları

Avalanche hiçbir merkezî üçüncü tarafa bağımlı değildir ve özellikle de üçüncü taraf kimlik doğrulayıcıların çıkardığı sertifikaları kullanmaz. Son noktaların kimliğini belirlemek için ağ katmanında kullanılan tüm sertifikalar kendinden imzalıdır, böylece kendine egemen bir kimlik katmanı yaratırlar. Hiçbir üçüncü taraf herhangi bir rol oynamaz.

### TLS Adresleri

TLS sertifikasının tamamının Platform zincirine gönderilmesini önlemek için sertifika ilk önce hash edilir \(özütlenir\). Avalanche, tutarlılık sağlamak adına, TLS sertifikaları için Bitcoin'de kullanılanla aynı hashing mekanizmasını kullanır. Yani, sertifikanın DER temsili sha256 ile hash edilir ve sonra çıkan sonuç ripemd160 ile hash edilerek stake edenler için 20 baytlık bir kimlik tanımlayıcı elde edilir.

Bu 20 baytlık kimlik tanımlayıcı, "NodeID-" ve onu izleyen verinin [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) formatıyla kodlanmış string'i ile temsil edilir.

## Avalanche Sanal Makinesinde Kriptografi

Avalanche sanal makinesi blok zincirdeki imzaları için eliptik eğri kriptografisi, spesifik olarak `secp256k1` kullanır.

Bu 32 baytlık kimlik tanımlayıcı "PrivateKey-" ve onu izleyen verinin [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) formatıyla kodlanmış string'i ile temsil edilir.

### Secp256k1 Adresleri

Avalanche, adresleme şemaları konusunda norm belirlemez, bunun yerine adreslemeyi her bir blok zincire bırakmayı seçer.

X-Chain ve P-Chain'in adresleme şeması secp256k1'e dayanır. Avalanche, Bitcoin'le aynı yaklaşımı izleyerek ECDSA açık anahtarını hash'ler. Açık anahtarın 33 baytlık sıkıştırılmış temsili, sha256 ile **bir kez** hash edilir. Sonra elde edilen sonuç ripemd160 ile hash edilerek 20 baytlık bir adres elde edilir.

Avalanche, bir adresin hangi zincirde olduğunu belirtmek için `chainID-address` geleneğini kullanır. `chainID`, zincirin bir alias'ıyla değiştirilebilir. Harici uygulamalar yoluyla bilgiler iletilirken CB58 geleneği gereklidir.

### Bech32

X-Chain ve P-Chain'deki adresler [BIP 0173](https://en.bitcoin.it/wiki/BIP_0173)'te ana hatlarıyla açıklanan [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) standardını kullanır. Bir Bech32 adres şemasında dört kısım vardır. Görünme sırasına göre:

* İnsan tarafından okunabilen kısım \(HRP\). Mainnet'te bu `avax`'dır.
* HRP'yi adres ve hata düzeltme kodundan ayıran `1` sayısı.
* 20 baytlık adresi temsil eden bir base-32 formatıyla kodlanmış string.
* 6 karakterli base-32 kodlu hata düzeltme kodu.

Ek olarak, bir Avalanche adresi, üzerinde bulunduğu zincirin alias'ını ön ek olarak alır ve ön eki bir tire işareti takip eder. Örneğin, X-Chain adresleri `X-` ön ekini alır.

Aşağıdaki düzenli ifade mainnet, fuji ve localnet için X-Chain, P-Chain ve C-Chain'deki adreslerle uyumludur. Tüm geçerli Avalanche adreslerinin bu düzenli ifadeyle uyumlu olacağı ancak geçerli Avalanche adresleri olmayan bazı string'lerin de bu düzenli ifadeyle uyumlu olabileceği aklınızda bulunsun.

```text
^([XPC]|[a-km-zA-HJ-NP-Z1-9]{36,72})-[a-zA-Z]{1,83}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$
```

Avalanche'ın [adresleme şeması](https://support.avalabs.org/en/articles/4596397-what-is-an-address) hakkında daha fazlasını okuyun.

### Secp256k1 Kurtarılabilir İmzalar

Geri getirilebilir imzalar 65 baytlık **`[R || S || V]`** olarak saklanır; burada **`V`**, açık anahtarın hızlı geri getirilebilirliğine imkan vermek için 0 veya 1'dir. **`S`**, imzanın manipüle edilebilirliğini önlemek için olası aralığın alt yarısında olmalıdır. Bir mesaj imzalanmadan önce sha256 kullanılarak hash edilir.

### Secp256k1 Örneği

Diyelim ki Rick ve Morty güvenli bir iletişim kanalı kuruyorlar. Morty yeni bir açık-özel anahtar çifti yaratır.

Özel Anahtar: `0x98cb077f972feb0481f1d894f272c6a1e3c15e272a1658ff716444f465200070`

Açık Anahtar \(33 bayt sıkıştırılmış\): `0x02b33c917f2f6103448d7feb42614037d05928433cb25e78f01a825aa829bb3c27`

Çok akıllı olan Rick, Morty'nin açık anahtarını kendi üstünde taşımak konusunda kendine güvenmiyordur, bu yüzden sadece Morty'nin adresini ister. Morty talimatları takip ederek açık anahtarına önce SHA256 sonra ripemd160 uygulayarak bir adres üretir.

SHA256\(Açık Anahtar\): `0x28d7670d71667e93ff586f664937f52828e6290068fa2a37782045bffa7b0d2f`

Adres: `0xe8777f38c88ca153a6fdc25942176d2bf5491b89`

Morty'nin kafası karışır çünkü bir açık anahtarın genel bilgi olması için güvenli olması gerekir. Rick durumu şöyle açıklar: açık anahtarın hash edilmesi, özel anahtar sahibini eliptik eğri kriptografisinde gelecekte ortaya çıkabilecek potansiyel güvenlik kusurlarından korur. Kriptografinin kırılarak bir açık anahtardan bir özel anahtarın elde edilebilmesi durumunda, kullanıcılar fonlarını daha önce hiçbir işlem imzalamamış olan bir adrese aktararak fonlarının bir saldırgan tarafından tehlikeye düşürülmesini önleyebilirler. Bu, kriptografi istemciler genelinde upgrade edilirken coin sahiplerinin korunmasını mümkün kılar.

Morty, Rick'in hikayesini dinledikten sonra Rick'e bir mesaj göndermeyi dener. Morty, Rick'in mesajını sadece ondan geldiğini doğrulayabilmesi halinde okuyacağını bildiği için mesajı özel anahtarıyla imzalar.

Mesaj: `0x68656c702049276d207472617070656420696e206120636f6d7075746572`

Mesaj Hash'i: `0x912800c29d554fb9cdce579c0abba991165bbbc8bfec9622481d01e0b3e4b7da`

Mesaj İmzası: `0xb52aa0535c5c48268d843bd65395623d2462016325a86f09420c81f142578e121d11bd368b88ca6de4179a007e6abe0e8d0be1a6a4485def8f9e02957d3d72da01`

Morty'yi bir daha gören olmaz.

## İmzalı Mesajlar

Bitcoin Script formatına ve Ethereum formatına dayanan, karşılıklı işletilebilir jenerik imzalı mesajlar için bir standart.

```text
sign(sha256(length(prefix) + prefix + length(message) + message))
```

Ön ek basitçe `\x1AAvalanche Signed Message:\n` string'idir; burada `0x1A`, ön ek metninin uzunluğu ve `length(message)`, mesaj boyutunun bir [integer](serialization-primitives.md#integer)'idir.

### Gantt Önceki İmaj \(Pre-image\) Spesifikasyonu

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

### Örnek

Örnek olarak "Through consensus to the stars" mesajını imzalayacağız.

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

`sha256` ile hash'leyip önceki imajı imzaladıktan sonra değeri [cb58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) ile kodlanmış olarak döndürürüz: `4Eb2zAHF4JjZFJmp4usSokTGqq9mEGwVMY2WZzzCmu657SNFZhndsiS8TvL32n3bexd8emUwiXs8XqKjhqzvoRFvghnvSN`. [Avalanche Web Cüzdan](https://wallet.avax.network/wallet/advanced)'ın kullanıldığı bir örnek burada.

![Mesaj imzalama](/img/sign-message.png)

## Ethereum Sanal Makinesinde Kriptografi

Avalanche düğümleri Ethereum Sanal Makinesini \(EVM\) destekler ve Ethereum'da kullanılan kriptografik yapıların hepsini hassas bir şekilde kopyalar. Buna Keccak hash fonksiyonu ve EVM'de kriptografik güvenlik için kullanılan diğer mekanizmalar dahildir.

## Diğer Sanal Makinelerdeki Kriptografi

Avalanche genişletilebilir bir platform olduğu için zaman içinde insanların sisteme ilave kriptografik primitifler eklemelerini bekliyoruz.

