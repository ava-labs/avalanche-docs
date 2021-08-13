# Ağ Protokolü

Avalanche ağı Avalanche düğümleri arasındaki temel iletişim biçimini tanımlar. Yükleme paketleme için [ilkel serileştirme](serialization-primitives.md) biçimini kullanır.

`"Konteyner"` tanımında geniş bir şekilde bahsedilir. Konteyner, sadece blok veya dikişler için genel bir terimdir, uzlaşma algoritmasının DAG mi yoksa Zincir mi olduğunu belirtmek gerekmeden belirlemek gerekmeyen bir terimdir.

## - GetVersion

`Version``` bir cevap olarak gönderilmesi için bir Sürüm mesajını talep eder.

`GetVersion` mesajları tarafından kullanılan OpCode `0x00`.

### GetVersion içerdiği

Bir `GetVersion` mesajının yükü boş.

```text
[]
```

### GetVersion nasıl ele alınır

Bir `GetVersion` mesajı alan bir düğüm, mevcut zaman ve düğüm sürümünü içeren bir `Sürüm` mesajıyla cevap vermelidir.

### GetVersion gönderildiğinde

Bir düğüm, başka bir düğümle bağlandığında `GetVersion` gönderilir, ancak henüz bir `Sürüm` mesajı almadı. Ancak her zaman geri gönderilebilir.

## Sürüm

`Sürüm` bağladığımız düğümlerin of uyumlu sürümlerini çalıştırdığını ve en azından mevcut zaman üzerinde anlaşmalarını sağlar.

`Sürüm` mesajları tarafından kullanılan OpCode `0x01`'dir.

### Hangi Sürüm içerir

`Sürüm,` düğümün geçerli zamanı Unix zaman biçiminde (Unix zaman biçimi) 01/01/1970'te dönemin başlangıcından bu yana milisaniyeler sayısında ve düğünün çalıştığı kodun sürümü tanımlayan bir sürüm dizimi içerir.

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

`Sürüm` bir `GetVersion` mesajına yanıt olarak gönderilir.

### Sürüm Örnekleri

`16 Kasım 2008 tarihinde saat 12:00'de (UTC)``` ve sürüm `avalanche/0.0.1`

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

`GetPeers` `bir cevap` olarak Peers mesajının gönderilmesini talep ediyor.

`GetPeers` mesajları tarafından kullanılan OpCode `0x02`.

### GetPeers içindekileri

Bir `GetPeers` mesajının yükü boş.

```text
[]
```

### GetPeers nasıl idare edilir?

`GetPeers` çağrısı ile ilgili bir düğüm, bağlanmış IP adreslerini içeren `bir Peers` mesajıyla cevap vermelidir.

### GetPeers gönderildiğinde

Bir düğüm, ağ içindeki katılımcıları keşfetmek için `GetPeers` mesaj gönderir. Ayrıca çevre ağına ulaştıklarında yeni düğümleri keşfetmek için `GetPeers` düzenli olarak mesaj gönderebilir.

## Arkadaşlarım

### Gözden geçirme

`Peers` mesajında IP Adresleri olarak temsil edilen bir grup akrabaları yer almaktadır. IP Adresinin hem IP hem de port numarasını içerdiğini ve hem IPv4 hem de IPv6 formatını desteklediğini unutmayın.

`Peers` mesajları tarafından kullanılan OpCode `0x03`'tür.

### Akrabaların içindekileri

`Bu` düğümün şu anda bağlandığı tıkalı düğümlerin IP adreslerini içeriyor.

İçerik:

```text
[
    Variable Length IP Address Array
]
```

### Akrabaların nasıl idare edilir

Bir `Peers` mesajı aldığında, bir düğüm, mesajdaki düğümleri komşu listesiyle karşılaştırmalı ve yeni düğümlerle bağlantılar kurmalıdır.

### Esirler gönderildiğinde

`Bir` `GetPeers` mesajına yanıt olarak gönderilmesi gerekmez, ve yeni gelen düğümleri duyurmak için periyodik yollanır. Bu tür bir itme dedikodu için varsayılan dönem 60 saniyedir.

### Peers Örnek

IP adresleri ile bir `Peers` mesajı gönderiliyor: `"127.0.0.1:9650"` ve `"[2001:0db8:ac10:fe01::12345.]`

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

Bir `Get` mesajı bir konteynır, yani düğümden blok veya çeviri şeklinde bir konteynır talep eder.

`İletiler` tarafından kullanılan OpCode `0x04`'tür.

### Ne elde ediliyor

Bir `Get` mesajı bir `SubnetID`, `İstenir` ve `ContainerID` içerir.

**`SubnetID`** bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`** bir düğümle gönderilen mesajların izini sürmesine yardımcı olan bir sayacı. Her bir düğüm, beklenmedik bir mesaj gönderdiğinde düğüm, mesaj için yeni bir özgün `RequestID` yaratacaktır.

**`Konteyner,`** istenen konteynırın tanımlayıcısıdır.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Nasıl halledilir

Düğün, aynı `SubnetID`, `İstenç` ve `ContainerID` bir `mesaj` ile belirtilen the `birlikte bir` Put birlikte bir Put mesajıyla cevap vermelidir. Doğru durumlarda, bir düğüm, sadece sahip olduğu bir konteynır istenmelidir. Bu nedenle, eğer düğüm, belirtilmiş konteynıra sahip değilse, `Get` mesajı güvenli bir şekilde indirilebilir.

### Get gönderildiğinde

Bir düğüm, bize `konteynırın` varlığını anlatan bir düğüme mesaj gönderecektir. Örneğin, iki nodes: var: Rick ve Morty. Eğer `Rick, ContainerID`, içeren `PullQuery` mesajı gönderirse, Morty'nin konteynırın yanında olmadığı için Morty kayıp `ContainerID,` içeren bir mesaj gönderecektir.

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

Bir `mesaj` bir düğümle istenen konteynır sağlar.

`Mesajlar` tarafından kullanılan OpCode `0x05`'tir.

### Koyu'nun ne olduğunu

Bir `Put` mesajında `SubnetID`, `İstenilen`, `ContainerID` ve `Container` bulunur.

**`SubnetID`** bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`** bir düğümle gönderilen mesajların izini sürmesine yardımcı olan bir sayacı.

**`ContainerID`** bu mesajın gönderdiği konteynırın tanımlayıcısıdır.

**`Konteynır,`** bu mesajın gönderdiği konteynırın the

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

Bir düğüm, düğümün erişebileceği bir konteynıra ulaşma mesajı almak için bir `Put` mesajı gönderecektir.

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

Bir `PushQuery` mesajı belirtilen `ContainerID` uzlaşmaya eklendikten sonra düğümden tercih edilen containerIDs talep eder. Eğer `ContainerID` bilinmiyorsa, `Konteyner` optimistically sağlanmaktadır.

`PushQuery` mesajları tarafından kullanılan OpCode `0x06`.

### PushQuery

Bir `PushQuery` mesajında `SubnetID`, `İstenilen`, `Konteyneri` ve `a` içeriyor.

**`SubnetID`** bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`** bir düğümle gönderilen mesajların izini sürmesine yardımcı olan bir sayacı.

**`Konteynır,`** bu mesajın yanıt gönderilmeden önce uzlaşma için eklenmesini beklediği konteynırın tanımlayıcısıdır.

**`Konteynır,`** konteynırın tanımlayıcı `ContainerID` ile bytes parçalarıdır.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Nasıl İt Sorgulanır

Bu düğüm, konteynırın uzlaşmasını eklemeye çalışmalıdır. Konteynır uzlaşmaya eklendikten sonra, düğümün şu anki tercihi \(s\) ile bir `Chits` mesajı gönderilmelidir.

### İt Sorgu gönderildiğinde

Bu düğüm, bu düğümün mevcut tercihlerini öğrenmek istiyorsa bir `PushQuery` mesajı göndermeli ve bu düğümün `of` henüz öğrenememiş olması mümkün olduğunu düşünmektedir. Düğüm, yeni bir konteynır öğrendiğinde ya da "uzun süre" için konteynırları bulunduğunda, düğümlerin tercihlerini öğrenmek isteyecektir.

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

Bir `PullQuery` mesajı belirtilen `ContainerID` uzlaşmaya eklendikten sonra düğümden tercih edilen containerIDs talep eder.

`PullQuery` mesajları tarafından kullanılan OpCode `0x07`.

### PullQuery ne kadar da

Bir `PullQuery` mesajında `SubnetID`, `İstenir` ve `ContainerID` bulunur.

**`SubnetID`** bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`** bir düğümle gönderilen mesajların izini sürmesine yardımcı olan bir sayacı.

**`Konteynır,`** bu mesajın yanıt gönderilmeden önce uzlaşma için eklenmesini beklediği konteynırın tanımlayıcısıdır.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Çekme Sorunu nasıl halledilir

Eğer düğüm, `ContainerID`, If konteynırları uzlaşmaya eklemek için çalışmalıdır. Konteynır uzlaşmaya eklendikten sonra, düğümün şu anki tercihi \(s\) ile bir `Chits` mesajı gönderilmelidir.

### Çekici Sorgu gönderildiğinde

Bu düğüm, bu düğümün mevcut tercihlerini öğrenmek istiyorsa `PullQuery` mesajı göndermeli ve muhtemelen `konteynırdan` öğrenmiş olması muhtemeldir. Düğüm, yeni bir konteynır öğrendiğinde ya da "uzun süre" için konteynırları bulunduğunda, düğümlerin tercihlerini öğrenmek isteyecektir.

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

Bir `Chits` mesajı bir düğüme istenen container\(s\) setini sunar.

`Chits` mesajları tarafından kullanılan OpCode `0x08`'dir.

### Chits içerdiği

Bir `Chits` mesajı bir `SubnetID`, `RequestID`, ve `Tercihler` içerir.

**`SubnetID`** bu mesajın hangi alt net için yazıldığını tanımlar.

**`RequestID`** bir düğümle gönderilen mesajların izini sürmesine yardımcı olan bir sayacı.

**`Tercihler,`** konteynerlerin tam olarak tanımladığı bir listedir.

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

Bir düğüm, düğümün uzlaşmaya eklediği bir konteynıra `PullQuery` veya `PushQuery` mesajı alabilmek için `Chits` mesajı gönderecektir.

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

