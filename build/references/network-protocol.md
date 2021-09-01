# ネットワークプロトコル

Avalancheネットワークは、Avalancheノード間でコアコミュニケーションフォーマットを定義します。ペイロードパッキングのために[プリミティブシリアライズ](serialization-primitives.md)形式を使用します。

`"Containers"`説明で広く言及されています。コンセンサスアルゴリズムがDAGあるいはチェーンであるかどうかを指定する必要なく、単にブロックあるいは頂点の一般的な用語です。

## GetVersion

`GetVersion`レスポンスとして送信される`Version`メッセージ要求。

`GetVersion`メッセージで使用されるOpCodeは、以下の通りです。`0x00`

### GetVersionが含まれているもの

`GetVersion`メッセージのペイロードは空です。

```text
[]
```

### GetVersionがどのように処理される

`GetVersion`メッセージを受け取ったノードは、現在の時間とノードバージョンを含む`Version`メッセージで応答する必要があります。

### GetVersionが送信されるとき

`GetVersion`ノードが別のノードに接続されたときに送信されます。しかし、メッセージが届かない場合にメッセージが表示されます`Version`。しかし、いつでも再送信が可能になります。

## バージョン

`Version`我々が接続したノードがAvalancheの互換バージョンを実行し、少なくとも現在の時間に合意するように保証します。

`Version`メッセージで使用されるOpCodeは、以下の通りです。`0x01`

### バージョンが含まれているもの

`Version`01/01/1970年のエポック開始以降、Unix時間形式で現在のノード時間が含まれています。

コンテンツ：

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### バージョンがどのように処理される

バージョンが互換性がない場合、あるいは現在の時間が多すぎる場合、接続は終了します。

### バージョンが送信されるとき

`Version`メッセージに対して返信で送信されます`GetVersion`。

### バージョン例

時間`November 16th, 2008 at 12:00am (UTC)`とバージョンで`Version`メッセージを送信する`avalanche/0.0.1`

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

### 概要

`GetPeers``Peers`メッセージがレスポンスとして送信されることを要求します。

`GetPeers`メッセージで使用されるOpCodeは、以下の通りです。`0x02`

### GetPeersが含まれているもの

`GetPeers`メッセージのペイロードは空です。

```text
[]
```

### GetPeersがどのように処理されるのです

`GetPeers`リクエストを受けたノードは、接続されたステーキングノードにIPアドレスを含む`Peers`メッセージで応答する必要があります。

### GetPeersが送信されたとき

ノードは、スタートアップに送信され、ネットワーク内の参加者を発見する`GetPeers`メッセージを送信します。ネットワークに到達した際に新しいノードを見つけるために、定期的に`GetPeers`メッセージを送信することもできます。

## ピア

### 概要

`Peers`メッセージは、IPアドレスとして表されるピアのリストが含まれます。IPアドレスには、IPとポート番号が含まれており、IPv4とIPv6両方のフォーマットをサポートしています。

`Peers`メッセージで使用されるOpCodeは、以下の通りです。`0x03`

### Peersが含まれているもの

`Peers`現在このノードが接続されているステーキングノードのIPアドレスを含みます。

コンテンツ：

```text
[
    Variable Length IP Address Array
]
```

### Peersがどのように処理される

メッセージを受け取った際に、ノードは`Peers`、メッセージに表示されるノードと、隣人の独自のリストを比較し、任意の新しいノードに接続するようにしてください。

### ピアが送信されたとき

`Peers`メッセージの返答でメッセージが送信される必要がなく`GetPeers`、定期的に新しく到着したノードをアナウンスするように送信されます。こうしたプッシュゴシップのデフォルト期間は、60秒です。

### ピア例

IPアドレスで`Peers`メッセージを送信`"127.0.0.1:9650"`し`"[2001:0db8:ac10:fe01::]:12345"`

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

## 取得

### 概要

`Get`メッセージは、ノードからコンテナ、ブロックあるいは頂点といった要求をされます。

`Get`メッセージで使用されるOpCodeは、以下の通りです。`0x04`

### Getが含まれているもの

`Get``SubnetID`メッセージには、a , `RequestID`そして.`ContainerID`

**`SubnetID`**このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`**issは、ノードによって送信されたメッセージを追跡するのに役立ちます。ノードがメッセージを送信するたびに、ノードはメッセージに固有`RequestID`の新しいものを作成します。

**`ContainerID`**iss は、要求されたコンテナの識別子

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Getがどのように処理される

`ContainerID``Container`ノードは`SubnetID`、同じで、`RequestID`指定された識別子とともに`Put`メッセージで返答する必要があります。正しい状況下で、ノードは、その持つコンテナを求めるべきです。したがって、指定されたコンテナが存在しない場合、`Get`メッセージは安全に削除できます。

### Getが送信されるとき

ノードは、コンテナの存在について私たちに告げるノードに`Get`メッセージを送信します。たとえば、RickとMortyの2つのノードがあるとします。Rickが、Mortyにコンテナが持たないメッセージを送信した場合、Mortyは、欠落したものを記載`ContainerID`した`PullQuery`Getメッセージを送信します。`ContainerID`

### 例

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

## プット

### 概要

`Put`メッセージにより、要求されたコンテナがノードに提供されます。

`Put`メッセージで使用されるOpCodeは、以下の通りです。`0x05`

### Putに含まれる

`Put``SubnetID``RequestID`メッセージには、a , ,`ContainerID`と。`Container`

**`SubnetID`**このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`**issは、ノードによって送信されたメッセージを追跡するのに役立ちます。

**`ContainerID`**iss は、このメッセージが送信されているコンテナの識別子です。

**`Container`**iss このメッセージが送信されているコンテナのバイトです。

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Putはどのように処理される

ノードは、コンセンサスにコンテナを追加しようとする必要があります。

### プットが送信されたとき

ノードがアクセスできるコンテナにGetメッセージを受け取る場合に、ノードが`Put`メッセージを送信します。

### プット例

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

### 概要

指定`ContainerID`がコンセンサスに追加された後、`PushQuery`メッセージが表示されるコンセンサスが要求されます。`ContainerID`これらが知られていない場合、楽観的に提供`Container`されます。

`PushQuery`メッセージで使用されるOpCodeは、以下の通りです。`0x06`

### PushQueryが含まれているもの

`PushQuery``SubnetID``RequestID`メッセージには、a , ,`ContainerID`と。`Container`

**`SubnetID`**このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`**issは、ノードによって送信されたメッセージを追跡するのに役立ちます。

**`ContainerID`**isは、レスポンスが送信される前に、このメッセージがコンセンサスに追加されると期待するコンテナの識別子です。

**`Container`**is ID が識別子を持つコンテナのバイトです。`ContainerID`

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### PushQueryがどのように処理されるのです

ノードは、コンセンサスにコンテナを追加しようとする必要があります。コンテナがコンセンサスに追加された後、ノードが現在の好みで`Chits`メッセージを送信する必要があります。

### PushQueryが送信されるとき

このノードが現在の設定を知りたい場合、ノードがまだ知識がないと感じる場合、ノードが`PushQuery`メッセージを送信する必要があります`Container`。新しいコンテナを知った場合、または「一時的に」のコンテナが持つときにノード好について知識したいと思われるようになります。

### PushQuery例

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

### 概要

指定`ContainerID`がコンセンサスに追加された後、`PullQuery`メッセージが表示されるコンセンサスが要求されます。

`PullQuery`メッセージで使用されるOpCodeは、以下の通りです。`0x07`

### PullQueryが含まれているもの

`PullQuery``SubnetID`メッセージには、a , `RequestID`そして.`ContainerID`

**`SubnetID`**このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`**issは、ノードによって送信されたメッセージを追跡するのに役立ちます。

**`ContainerID`**isは、レスポンスが送信される前に、このメッセージがコンセンサスに追加されると期待するコンテナの識別子です。

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### PullQueryがどのように処理されるのです

ノードが追加されていない場合`ContainerID`、コンセンサスにコンセプスするコンテナを追加しようとします。コンテナがコンセンサスに追加された後、ノードが現在の好みで`Chits`メッセージを送信する必要があります。

### PullQueryが送信されるとき

このノードが現在の設定を知りたい場合、ノードは`PullQuery`メッセージを送信する必要があります。`Container`新しいコンテナを知った場合、または「一時的に」のコンテナが持つときにノード好について知識したいと思われるようになります。

### PullQuery例

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

## チット

### 概要

`Chits`メッセージにより、要求された優先コンテナセットがノードに提供されます。

`Chits`メッセージで使用されるOpCodeは、以下の通りです。`0x08`

### Chitsが含まれているもの

`Chits``SubnetID`メッセージには、a , `RequestID`そして.`Preferences`

**`SubnetID`**このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`**issは、ノードによって送信されたメッセージを追跡するのに役立ちます。

**`Preferences`**これは、ノードの好みを完全に説明するコンテナIDのリストです。

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Chitsがどのように処理される

ノードは、参照されたコンテナをコンセンサスに追加しようとする必要があります。参照されたコンテナを追加できない場合、ノードは欠落したコンテナを無視し、残りのチットを世論調査に適用することができます。世論調査が完了した後、コンテナの信頼性が適切に更新される必要があります。

### Chitsが送信されたとき

`PullQuery``PushQuery`ノードがコンセンサスに追加したコンテナにメッセージを受け取った場合に、ノードが`Chits`メッセージを送信します。

### チット例

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

