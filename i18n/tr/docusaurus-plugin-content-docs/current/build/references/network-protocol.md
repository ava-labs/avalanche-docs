---
sidebar\_position: 6
---

# Ağ Protokolü

Avalanche ağı Avalanche düğümleri arasındaki temel iletişim formatını belirler. Bu ağ, payload paketlemesi için [primitif serileştirme](serialization-primitives.md) formatını kullanır.

`"Containers"` açıklama kısmında ayrıntılı olarak ele alınmaktadır. Bir Konteyner, konsensüs algoritmasının DAG veya Zincir olup olmadığını belirtmeye gerek olmaksızın bloklar veya verteksler için kullanılan genel bir terimdir.

## GetVersion

`GetVersion`, bir `Version` mesajının yanıt olarak gönderilmesini talep eder.

`GetVersion` mesajları tarafından kullanılan OpCode şudur: `0x00`.

### Getversion neleri içerir

Bir `GetVersion` mesajının payload'u boştur.

```text
[]
```

### GetVersion nasıl yönetilir

Bir `GetVersion` mesajı alan bir düğüm, güncel saati ve düğüm sürümünü içeren bir `Version` mesajıyla yanıt vermelidir.

### GetVersion ne zaman gönderilir

`GetVersion`, bir düğüm diğer bir düğüme bağlandığında ancak henüz bir `Version` mesajı almadığında gönderilir. Ancak herhangi bir zamanda tekrar gönderilebilir.

##
Versiyon

`Version`, bağlandığımız düğümlerin Avalanche'ın uyumlu sürümlerini çalıştırmasını ve en azından güncel zamanı gevşek bir şekilde onaylamasını sağlar.

`Version` mesajları tarafından kullanılan OpCode şudur: `0x01`.

### Versiyon neleri içerir

`Version`, düğümün güncel zamanını Unix zaman formatında 01/01/1970 tarihinde dönemin başlangıcından bu yana geçen milisaniyelerin sayısı olarak içerir ve bunun yanı sıra düğümün çalıştırdığı kodun sürümünü belirten bir sürüm string'i içerir.

İçerik:

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### Versiyon nasıl yönetilir

Versiyonlar uyumsuzsa ya da güncel zamanlar çok farklıysa, bağlantı sonlandırılacaktır.

### Versiyon ne zaman gönderilir

`Version`, bir `GetVersion` mesajına yanıt olarak gönderilir.

### Sürüm Örneği

`November 16th, 2008 at 12:00am (UTC)` zamanını ve `avalanche/0.0.1` sürümünü içeren bir `Version` mesajı gönderilmesi

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

### Genel Bakış

`GetPeers`, yanıt olarak bir `Peers` mesajının gönderilmesini talep eder.

`GetPeers` mesajları tarafından kullanılan OpCode şudur: `0x02`.

### GetPeers neleri içerir

Bir `GetPeers` mesajının payload'u boştur.

```text
[]
```

### GetPeers nasıl yönetilir

`GetPeers` talebi alan bir düğüm, bağlı olduğu, staking yapan düğümlerinin IP adreslerini içeren bir `Peers` mesajıyla yanıt vermelidir.

### GetPeers ne zaman gönderilir

Bir düğüm, başlatma \(startup\) üzerine, ağda bulunan katılımcıları keşfetmek için `GetPeers` mesajları gönderir. Ağa yeni katılan düğümleri keşfetmek için de periyodik olarak `GetPeers` mesajları gönderebilir.

## Peers

### Genel Bakış

`Peers` mesajı, IP Adresleri olarak temsil edilen bir eşler \(peers\) listesi içerir. Bir IP Adresinin hem IP'yi hem de port numarasını içerdiğini ve hem IPv4 hem de IPv6 formatını desteklediğini aklınızda bulundurun.

`Peers` mesajları tarafından kullanılan OpCode şudur: `0x03`.

### Peers neleri içerir

`Peers`, bu düğümün şu anda bağlı olduğu staking yapan düğümlerin IP adreslerini içerir.

İçerik:

```text
[
    Variable Length IP Address Array
]
```

### Peers nasıl yönetilir

Bir `Peers` mesajı alan bir düğüm, mesajda görünen düğümleri kendi komşular listesiyle karşılaştırmalı ve yeni düğümlere bağlantılar kurmaya çalışmalıdır.

### Peers ne zaman gönderilir

`Peers` mesajlarının bir `GetPeers` mesajına yanıt olarak gönderilmeleri gerekmez ve yeni katılan düğümleri duyurmak için periyodik olarak gönderilirler. Bu tür bir push gossip için varsayılan süre 60 saniyedir.

### Peers Örneği

`"127.0.0.1:9650"` ve `"[2001:0db8:ac10:fe01::]:12345"` IP adresleri içeren bir `Peers` mesajının gönderilmesi

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

## Get

### Genel Bakış

Bir `Get` mesajı bir düğümden bir konteyner -yani blok veya verteks- talep eder.

`Get` mesajları tarafından kullanılan OpCode şudur: `0x04`.

### Get ne içerir

Bir `Get` mesajı bir `SubnetID`, `RequestID` ve `ContainerID` içerir.

**`SubnetID`**, bu mesajın hangi subnet'e gideceğini belirler.

**`RequestID`**, bir düğüm tarafından gönderilen mesajların takip edilmesine yardımcı olan bir sayaçtır. Bir düğüm istenmeyen \(un-prompted\) bir mesaj gönderdiği her seferinde, o düğüm mesaj için benzersiz yeni bir `RequestID` yaratacaktır.

**`ContainerID`**, talep edilen konteynerin kimliğidir.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Get nasıl yönetilir

Düğümün, belirtilen kimliğe sahip `Container` ile birlikte, aynı `SubnetID`, `RequestID` ve `ContainerID` bilgilerini içeren bir `Put` mesajıyla yanıt vermesi beklenir. Doğru durumlarda, bir düğümden yalnızca sahip olduğu bir konteyner talep edilmelidir. Dolayısıyla, o düğüm belirtilen konteynere sahip değilse, `Get` mesajı güvenli bir şekilde düşürülebilir.

### Get ne zaman gönderilir

Bir düğüm, bize bir konteynerin mevcudiyeti hakkında bilgi veren bir düğüme bir `Get` mesajı gönderecektir. Örnek verecek olursak, diyelim ki iki düğümümüz var: Rick ve Morty. Eğer Rick bir `ContainerID` içeren bir `PullQuery` mesajı gönderirse ve Morty o konteynere sahip değilse, o takdirde Morty eksik `ContainerID`'yi içeren bir Get mesajı gönderecektir.

### Get Örneği

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

## Put

### Genel Bakış

Bir `Put` mesajı bir düğüme talep edilen bir konteyneri sağlar.

`Put` mesajları tarafından kullanılan OpCode şudur: `0x05`.

### Put neleri içerir

Bir `Put` mesajı bir `SubnetID`, `RequestID`, `ContainerID` ve `Container` içerir.

**`SubnetID`**, bu mesajın hangi subnet'e gideceğini belirler.

**`RequestID`**, bir düğüm tarafından gönderilen mesajların takip edilmesine yardımcı olan bir sayaçtır.

**`ContainerID`**, bu mesajın gönderdiği konteynerin kimliğidir.

**`Container`**, bu mesajın gönderdiği konteynerin baytlarıdır.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Put nasıl yönetilir

Düğüm konteyneri konsensüse eklemeye çalışmalıdır.

### Put ne zaman gönderilir

Bir düğüm, erişebildiği bir konteyner için bir Get mesajı alması üzerine yanıt olarak bir `Put` mesajı gönderecektir.

### Put Örneği

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

## PushQuery

### Genel Bakış

Bir `PushQuery` mesajı, belirtilen `ContainerID` konsensüse eklendikten sonra, düğümden tercih edilen konteyner kimliklerini talep eder. `ContainerID` bilinmiyorsa, `Container` iyimser bir tahmin olarak verilir.

`PushQuery` mesajları tarafından kullanılan OpCode şudur: `0x06`.

### PushQuery neleri içerir

Bir `PushQuery` mesajı bir `SubnetID`, `RequestID`, `ContainerID` ve `Container` içerir.

**`SubnetID`**, bu mesajın hangi subnet'e gideceğini belirler.

**`RequestID`**, bir düğüm tarafından gönderilen mesajların takip edilmesine yardımcı olan bir sayaçtır.

**`ContainerID`**, yanıt gönderilmeden önce bu mesajın konsensüse eklenmiş olduğunu beklediği konteynerin kimliğidir.

**`Container`**, kimliği `ContainerID` olan konteynerin baytlarıdır.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### PushQuery nasıl yönetilir

Düğüm konteyneri konsensüse eklemeye çalışmalıdır. Konteyner konsensüse eklendikten sonra, düğümün güncel tercihlerini içeren bir `Chits` mesajının gönderilmesi gerekir.

### PushQuery ne zaman gönderilir

Bir düğüm, bu düğümün güncel tercihlerini öğrenmek isterse ve bu düğümün `Container`'ı henüz öğrenmemiş olabileceğini düşünürse, bir `PushQuery` mesajı göndermelidir. Düğüm, yeni bir konteyner öğrendiğinde veya "bir süredir" beklemede olan konteynerlere sahip olduğunda, düğüm tercihlerini öğrenmek isteyecektir.

### PushQuery Örneği

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

## PullQuery

### Genel Bakış

Bir `PullQuery` mesajı, belirtilen `ContainerID` konsensüse eklendikten sonra, düğümden tercih edilen konteyner kimliklerini talep eder.

`PullQuery` mesajları tarafından kullanılan OpCode şudur: `0x07`.

### PullQuery neleri içerir

Bir `PullQuery` mesajı bir `SubnetID`, `RequestID` ve `ContainerID` içerir.

**`SubnetID`**, bu mesajın hangi subnet'e gideceğini belirler.

**`RequestID`**, bir düğüm tarafından gönderilen mesajların takip edilmesine yardımcı olan bir sayaçtır.

**`ContainerID`**, yanıt gönderilmeden önce bu mesajın konsensüse eklenmiş olduğunu beklediği konteynerin kimliğidir.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### PullQuery nasıl yönetilir

Eğer düğüm `ContainerID`'ı henüz eklemediyse, konteyneri konsensüse eklemeye çalışmalıdır. Konteyner konsensüse eklendikten sonra, düğümün güncel tercihlerini içeren bir `Chits` mesajının gönderilmesi gerekir.

### PullQuery ne zaman gönderilir

Bir düğüm, bu düğümün güncel tercihlerini öğrenmek isterse ve düğümün  `Container` konteynerini yüksek bir olasılıkla öğrenmiş olduğunu düşünüyorsa bir `PullQuery` mesajı göndermelidir. Düğüm, yeni bir konteyner öğrendiğinde veya "bir süredir" beklemede olan konteynerlere sahip olduğunda, düğüm tercihlerini öğrenmek isteyecektir.

### PullQuery Örneği

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

### Genel Bakış

Bir `Chits` mesajı, bir düğüme talep edilen tercihli konteynerler kümesini sağlar.

`Chits` mesajları tarafından kullanılan OpCode şudur: `0x08`.

### Chits neleri içerir

Bir `Chits` mesajı bir `SubnetID`, `RequestID` ve `Preferences` içerir.

**`SubnetID`**, bu mesajın hangi subnet'e gideceğini belirler.

**`RequestID`**, bir düğüm tarafından gönderilen mesajların takip edilmesine yardımcı olan bir sayaçtır.

**`Preferences`**, düğümün tercihlerini tam olarak belirten konteyner kimliklerinin listesidir.

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Chits nasıl yönetilir

Düğüm referans yapılan tüm konteynerleri konsensüse eklemeye çalışmalıdır. Referans yapılan konteynerler eklenemezse, düğüm eksik konteynerleri yok sayabilir ve geriye kalan chit'leri yoklamaya tabi tutar. Bir yoklama tamamlandığında, konteyner güven düzeyleri uygun şekilde güncellenmelidir.

### Chits ne zaman gönderilir

Bir düğüm, düğümün konsensüse eklediği bir konteyner için `PullQuery` veya `PushQuery` mesajı alması üzerine yanıt olarak bir `Chits` mesajı gönderecektir.

### Chits Örneği

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

