# Ağ Protokolü

Avalanche ağı Avalanche düğümleri arasındaki temel iletişim biçimini tanımlar. Yükleme paketleme için [ilkel serileştirme](serialization-primitives.md) biçimini kullanır.

`"Containers"`Tarifte geniş bir şekilde bahsedilir. Konteyner, sadece blok veya dikişler için genel bir terimdir, uzlaşma algoritmasının DAG mi yoksa Zincir mi olduğunu belirtmek gerekmeden belirlemek gerekmeyen bir terimdir.

## - GetVersion

`GetVersion`Cevap olarak gönderilecek `Version`mesajın gönderilmesini talep ediyor.

`GetVersion`Mesajlar tarafından kullanılan OpCode şunlardır:`0x00`

### GetVersion içerdiği

`GetVersion`Mesajın yükü boş.

```text
[]
```

### GetVersion nasıl ele alınır

Bir `GetVersion`mesaj alan bir düğüm, mevcut zaman ve düğüm sürümünü içeren bir `Version`mesajla cevap vermelidir.

### GetVersion gönderildiğinde

`GetVersion`Bir düğüm, başka bir düğümle bağlandığında gönderilir ama henüz bir mesaj `Version`almadı. Ancak her zaman geri gönderilebilir.

## Sürüm

`Version`Bağlı olduğumuz düğümlerin of uyumlu sürümlerini çalıştırıp en azından şu anki zaman üzerinde anlaştığından emin olun.

`Version`Mesajlar tarafından kullanılan OpCode şunlardır:`0x01`

### Hangi Sürüm içerir

`Version`Düğümün geçerli zamanını, 01/01/1970'te dönemin başlangıcından bu yana milisaniye sayısında içerir ve düğümün çalıştığı kodun sürümü tanımlayan bir sürüm dizgisini içermektedir.

İçerik:

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### Sürüm nasıl ele alınır

Eğer sürümler uyumsuz veya mevcut zaman çok farklıysa, bağlantı sonlandırılır.

### Sürüm gönderildiğinde

`Version`Bir mesaj `GetVersion`gönderilir.

### Sürüm Örnekleri

Zaman `November 16th, 2008 at 12:00am (UTC)`ve sürümü ile bir `Version`mesaj gönderiliyor`avalanche/0.0.1`

```text
[
    Long   <- 1226793600 = 0x00000000491f6280
    String <- "avalanche/0.0.1"
]
=
[
    0x00, 0x00, 0x00, 0x00, 0x49, 0x1f, 0x62, 0x80,
    0x00, 0x0f, 0x61, 0x76, 0x61, 0x6c, 0x61, 0x6e,
    0x63, 0x68, 0x65, 0x2f, 0x30, 0x2e, 0x30, 0x2e,
    0x31,
]
```

## GetPeers

### Gözden geçirme

`GetPeers`Cevap olarak `Peers`mesaj gönderilmesini talep ediyor.

`GetPeers`Mesajlar tarafından kullanılan OpCode şunlardır:`0x02`

### GetPeers içindekileri

`GetPeers`Mesajın yükü boş.

```text
[]
```

### GetPeers nasıl idare edilir?

Bir düğüm alma `GetPeers`isteği bağlanmış IP adreslerini içeren bir `Peers`mesajla cevap vermelidir, düğümleri gizler.

### GetPeers gönderildiğinde

Bir düğüm, ağ içindeki katılımcıları keşfetmek için başlangıç noktasında `GetPeers`mesajlar gönderir. Ayrıca yeni düğümleri bulmak için düzenli olarak `GetPeers`mesajlar gönderebilir.

## Arkadaşlarım

### Gözden geçirme

`Peers`İleti IP Adresleri olarak temsil edilen bir grup akrabaları içerir. IP Adresinin hem IP hem de port numarasını içerdiğini ve hem IPv4 hem de IPv6 formatını desteklediğini unutmayın.

`Peers`Mesajlar tarafından kullanılan OpCode şunlardır:`0x03`

### Akrabaların içindekileri

`Peers`Bu düğümün şu anda bağlandığı engelleme düğümlerinin IP adreslerini içeriyor.

İçerik:

```text
[
    Variable Length IP Address Array
]
```

### Akrabaların nasıl idare edilir

Bir mesaj alındığında, bir `Peers`düğüm, mesajdaki düğümleri komşu listesiyle karşılaştırmalı ve yeni düğümlerle bağlantılar kurmalıdır.

### Esirler gönderildiğinde

`Peers``GetPeers`Mesajlara yanıt olarak gönderilmesine gerek yoktur ve yeni gelen düğümleri duyurmak için düzenli olarak gönderilirler. Bu tür bir itme dedikodu için varsayılan dönem 60 saniyedir.

### Peers Örnek

IP adresleri ile bir `Peers`mesaj gönderiyor `"127.0.0.1:9650"`ve...`"[2001:0db8:ac10:fe01::]:12345"`

```text
[
    Variable Length IP Address Array <- ["127.0.0.1:9650", "[2001:0db8:ac10:fe01::]:12345"]
]
=
[
    0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff,
    0x7f, 0x00, 0x00, 0x01, 0x25, 0xb2, 0x20, 0x01,
    0x0d, 0xb8, 0xac, 0x10, 0xfe, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39,
]
```

## - Git

### Gözden geçirme

Bir `Get`mesaj bir konteynır, yani düğümden blok veya çeviri şeklinde bir konteynır ister.

`Get`Mesajlar tarafından kullanılan OpCode şunlardır:`0x04`

### Ne elde ediliyor

`SubnetID`Bir mesaj içerir ve `RequestID`bir `Get`de.`ContainerID`

**`SubnetID`**Bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`**Bir düğümle gönderilen mesajları takip etmeye yardımcı olan bir sayacı. Her bir düğüm, beklenmedik bir mesaj gönderdiğinde düğüm, mesaj `RequestID`için yeni bir eşsiz yaratacaktır.

**`ContainerID`**İstenen konteynırın tanımlayıcısı.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Nasıl halledilir

`SubnetID``Container`Düğün, aynı `Put`mesajla cevap vermeli `RequestID`ve belirlenen the `ContainerID`birlikte. Doğru durumlarda, bir düğüm, sadece sahip olduğu bir konteynır istenmelidir. Bu nedenle, eğer düğüm, belirtilmiş konteynıra sahip değilse, `Get`mesaj güvenli bir şekilde indirilebilir.

### Get gönderildiğinde

Bir düğüm, bize konteynırın varlığını anlatan bir düğüme `Get`mesaj gönderecektir. Örneğin, iki nodes: var: Rick ve Morty. `ContainerID`Eğer Rick, Morty'nin konteynırın olmadığını içeren bir `PullQuery`mesaj gönderirse, Morty kaybolan mesajı da içeren bir mesaj gönderecektir.`ContainerID`

### Örnek Alın

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    ContainerID <- 0x2122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f40
]
=
[
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    0x00, 0x00, 0xa8, 0x66, 0x21, 0x22, 0x23, 0x24,
    0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x2b, 0x2c,
    0x2d, 0x2e, 0x2f, 0x30, 0x31, 0x32, 0x33, 0x34,
    0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x3b, 0x3c,
    0x3d, 0x3e, 0x3f, 0x40,
]
```

## - Kaldır şunu

### Gözden geçirme

Bir `Put`mesaj bir düğüme istenen konteynır sağlar.

`Put`Mesajlar tarafından kullanılan OpCode şunlardır:`0x05`

### Koyu'nun ne olduğunu

`SubnetID``RequestID`Bir mesaj içeriyor, ve `ContainerID`bir `Put`de.`Container`

**`SubnetID`**Bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`**Bir düğümle gönderilen mesajları takip etmeye yardımcı olan bir sayacı.

**`ContainerID`**Bu mesajın gönderdiği konteynırın tanımlayıcısı.

**`Container`**Bu mesajın gönderdiği konteynırın baytları.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Nasıl

Bu düğüm, konteynırın uzlaşmasını eklemeye çalışmalıdır.

### Gönderildiğinde

Bir düğüm, düğümün erişebileceği bir konteynıra ulaşma mesajı almak için bir `Put`mesaj gönderecektir.

### Örnek Koy

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    ContainerID <- 0x5ba080dcf6861c94c24ec62bc09a3c8b0fdd4691ebf02491e0e921dd0c77206f
    Container   <- 0x2122232425
]
=
[
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    0x00, 0x00, 0xa8, 0x66, 0x5b, 0xa0, 0x80, 0xdc,
    0xf6, 0x86, 0x1c, 0x94, 0xc2, 0x4e, 0xc6, 0x2b,
    0xc0, 0x9a, 0x3c, 0x8b, 0x0f, 0xdd, 0x46, 0x91,
    0xeb, 0xf0, 0x24, 0x91, 0xe0, 0xe9, 0x21, 0xdd,
    0x0c, 0x77, 0x20, 0x6f, 0x00, 0x00, 0x00, 0x05,
    0x21, 0x22, 0x23, 0x24, 0x25,
]
```

## İt PushQuery

### Gözden geçirme

`ContainerID`Bir `PushQuery`mesaj belirtilen konteynırların önerildiği konteynırların uzlaşmaya eklenmesinden sonra düğümden istenmesini ister. `ContainerID``Container`Eğer bilinmiyorsa, iyimser olarak sağlanır.

`PushQuery`Mesajlar tarafından kullanılan OpCode şunlardır:`0x06`

### PushQuery

`SubnetID``RequestID`Bir mesaj içeriyor, ve `ContainerID`bir `PushQuery`de.`Container`

**`SubnetID`**Bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`**Bir düğümle gönderilen mesajları takip etmeye yardımcı olan bir sayacı.

**`ContainerID`**Bu iletinin cevap gönderilmeden önce uzlaşma için eklenmesini beklediği konteynırın tanımlayıcısı.

**`Container`**Bu konteynırın tanımlayıcı kısımları.`ContainerID`

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Nasıl İt Sorgulanır

Bu düğüm, konteynırın uzlaşmasını eklemeye çalışmalıdır. Konteynırın uzlaşması eklendikten sonra, düğümün mevcut tercihi \(s\) ile bir `Chits`mesaj gönderilmesi gerekir.

### İt Sorgu gönderildiğinde

Bu düğüm, bu düğümün mevcut tercihlerini öğrenmek istiyorsa bir `PushQuery`mesaj göndermeli ve düğümün henüz öğrenememiş olması mümkün olduğunu `Container`düşünmektedir. Düğüm, yeni bir konteynır öğrendiğinde ya da "uzun süre" için konteynırları bulunduğunda, düğümlerin tercihlerini öğrenmek isteyecektir.

### PushQuery PushQuery

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    ContainerID <- 0x5ba080dcf6861c94c24ec62bc09a3c8b0fdd4691ebf02491e0e921dd0c77206f
    Container   <- 0x2122232425
]
=
[
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    0x00, 0x00, 0xa8, 0x66, 0x5b, 0xa0, 0x80, 0xdc,
    0xf6, 0x86, 0x1c, 0x94, 0xc2, 0x4e, 0xc6, 0x2b,
    0xc0, 0x9a, 0x3c, 0x8b, 0x0f, 0xdd, 0x46, 0x91,
    0xeb, 0xf0, 0x24, 0x91, 0xe0, 0xe9, 0x21, 0xdd,
    0x0c, 0x77, 0x20, 0x6f, 0x00, 0x00, 0x00, 0x05,
    0x21, 0x22, 0x23, 0x24, 0x25,
]
```

## Çekici Bir Arama

### Gözden geçirme

`ContainerID`Bir `PullQuery`mesaj belirtilen konteynırların önerildiği konteynırların uzlaşmaya eklenmesinden sonra düğümden istenmesini ister.

`PullQuery`Mesajlar tarafından kullanılan OpCode şunlardır:`0x07`

### PullQuery ne kadar da

`SubnetID`Bir mesaj içerir ve `RequestID`bir `PullQuery`de.`ContainerID`

**`SubnetID`**Bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`**Bir düğümle gönderilen mesajları takip etmeye yardımcı olan bir sayacı.

**`ContainerID`**Bu iletinin cevap gönderilmeden önce uzlaşma için eklenmesini beklediği konteynırın tanımlayıcısı.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Çekme Sorunu nasıl halledilir

Eğer düğüm `ContainerID`If konteynırları uzlaşmaya eklemeye çalışmalıdır. Konteynırın uzlaşması eklendikten sonra, düğümün mevcut tercihi \(s\) ile bir `Chits`mesaj gönderilmesi gerekir.

### Çekici Sorgu gönderildiğinde

Bu düğüm, bu düğümün mevcut tercihlerini öğrenmek istiyorsa bir `PullQuery`mesaj göndermeli ve muhtemelen düğümün çoktan öğrenmiş olduğunu hisseder.`Container` Düğüm, yeni bir konteynır öğrendiğinde ya da "uzun süre" için konteynırları bulunduğunda, düğümlerin tercihlerini öğrenmek isteyecektir.

### Çekici Sorgu Örnekleri

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    ContainerID <- 0x5ba080dcf6861c94c24ec62bc09a3c8b0fdd4691ebf02491e0e921dd0c77206f
]
=
[
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    0x00, 0x00, 0xa8, 0x66, 0x5b, 0xa0, 0x80, 0xdc,
    0xf6, 0x86, 0x1c, 0x94, 0xc2, 0x4e, 0xc6, 0x2b,
    0xc0, 0x9a, 0x3c, 0x8b, 0x0f, 0xdd, 0x46, 0x91,
    0xeb, 0xf0, 0x24, 0x91, 0xe0, 0xe9, 0x21, 0xdd,
    0x0c, 0x77, 0x20, 0x6f,
]
```

## Chits

### Gözden geçirme

Bir `Chits`mesaj bir düğüme istenen konteynır \(s\) setini sunar.

`Chits`Mesajlar tarafından kullanılan OpCode şunlardır:`0x08`

### Chits içerdiği

`SubnetID`Bir mesaj içerir ve `RequestID`bir `Chits`de.`Preferences`

**`SubnetID`**Bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`**Bir düğümle gönderilen mesajları takip etmeye yardımcı olan bir sayacı.

**`Preferences`**Bu konteynerlerin listesi, düğümün tercihlerini tam olarak tanımlayan konteynerlerin listesidir.

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Chits nasıl idare edilir?

Bu düğüm, referanslı konteynırlara katılmaya çalışmalıdır. Eğer referanslı konteynırlar If düğüm, kayıp konteynırları görmezden gelebilir ve geri kalan çeneleri ankete uygulayabilir. Anketler tamamlandıktan sonra konteynır sırları uygun şekilde güncellenmelidir.

### Chits gönderildiğinde

Bir düğüm, düğümün uzlaşmaya eklediği konteynıra bir mesaj `PullQuery`veya `PushQuery`mesaj alınması için bir `Chits`mesaj gönderecektir.

### Chits Example

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    Preferences <- [
        0x2122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f40,
        0x4142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f60,
    ]
]
=
[
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
        0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
        0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
        0x00, 0x00, 0xa8, 0x66, 0x00, 0x00, 0x00, 0x02,
        0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28,
        0x29, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f, 0x30,
        0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38,
        0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e, 0x3f, 0x40,
        0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48,
        0x49, 0x4a, 0x4b, 0x4c, 0x4d, 0x4e, 0x4f, 0x50,
        0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58,
        0x59, 0x5a, 0x5b, 0x5c, 0x5d, 0x5e, 0x5f, 0x60,
]
```

