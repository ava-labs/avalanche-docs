# ネットワークプロトコル

Avalancheネットワークは、Avalancheノード間の中核となる通信フォーマットを定義します。ペイロードのパッキングには、[プリミティブシリアライゼーション](serialization-primitives.md)フォーマットを使用します。

`"Containers"`は、説明の中で広く言及されています。コンテナは、単にブロックや頂点の総称ですから、コンセンサスアルゴリズムがDAGかChainかを指定する必要はありません。

## GetVersion

`GetVersion`は、レスポンスとして、`Version`のメッセージを送信するようにリクエストします。

`GetVersion`のメッセージで使用されるOpCodeは、次の通りです。`0x00`。

### GetVersionの内容

`GetVersion`のメッセージのペイロードは空です。

```text
[]
```

### GetVersionの処理方法

`GetVersion`のメッセージを受け取ったノードは、現在の時間とノードのバージョンを含む`Version`のメッセージを返信しなければなりません。

### GetVersionの送信時

`GetVersion`は、ノードが他のノードに接続しているが、まだ`Version`のメッセージを受け取っていない場合に送信されます。しかし、いつでも再送信することができます。

## バージョン

`Version`接続されているノードが、互換性のあるバージョンのAvalancheを実行しており、少なくとも現在の時間に緩やかに合意していることを確認します。

`Version`のメッセージで使用されるOpCodeは、次の通りです。`0x01`。

### バージョンの内容

`Version`には、ノードの現在の時刻がUNIX時間フォーマットで、エポックの始まりである1970年01月01日からのミリ秒数で表示され、ノードが実行しているコードのバージョンを示すバージョン文字列が含まれます。

内容：

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### バージョンの取り扱いについて

バージョンの互換性がない場合や、現在の時間があまりにも異なる場合は、接続が終了します。

### バージョンの送信時

`Version`は、`GetVersion`のメッセージに応答して送信されます。

### バージョン例

時間`November 16th, 2008 at 12:00am (UTC)`、バージョン`avalanche/0.0.1`の`Version`のメッセージを送信します

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

`GetPeers`は、`Peers`のメッセージをレスポンスとして送信することをリクエストします。

`GetPeers`のメッセージで使用されるOpCodeは、次の通りです。`0x02`。

### GetPeersの内容

`GetPeers`のメッセージのペイロードは空です。

```text
[]
```

### GetPeersの処理方法

`GetPeers`リクエストを受け取ったノードは、接続しているステーキングノードのIPアドレスを含む`Peers`のメッセージを返信しなければなりません。

### GetPeersの送信時

ノードは、ネットワークの参加者を発見するために、起動時に`GetPeers`のメッセージを送信します。また、ネットワークに到着した新しいノードを発見するために、定期的に`GetPeers`のメッセージを送信することもあります。

## ピア

### 概要

`Peers`のメッセージには、IPアドレスで表されるピアのリストが含まれています。IPアドレスは、IPとポート番号の両方を含み、IPv4とIPv6の両方のフォーマットに対応していることに注意してください。

`Peers`のメッセージで使用されるOpCodeは、次の通りです。`0x03`。

### ピアの内容

`Peers`には、このノードが現在接続しているステーキングノードのIPアドレスが含まれています。

内容：

```text
[
    Variable Length IP Address Array
]
```

### ピアの取り扱いについて

`Peers`のメッセージを受信したノードは、メッセージに登場するノードを自分のネイバーリストと比較し、新しいノードとの接続を確立します。

### ピアの送信時

`Peers`のメッセージは、`GetPeers`のメッセージへのレスポンスとして送信する必要はなく、新しく到着したノードを知らせるために定期的に送信されます。このようなプッシュゴシップのデフォルトの周期は60秒です。

### ピアの例

IPアドレス`"127.0.0.1:9650"`と`"[2001:0db8:ac10:fe01::]:12345"`を持つ`Peers`のメッセージの送信

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

### 概要

`Get`のメッセージは，コンテナをリクエストし、それはノードからのブロックや頂点です。

`Get`のメッセージで使用されるOpCodeは、次の通りです。`0x04`。

### Getに含まれるもの

`Get`のメッセージには、`SubnetID`、`RequestID`、`ContainerID`が含まれます。

**`SubnetID`**は、このメッセージがどのサブネットに向けられているかを定義します。

**`RequestID`**は、ノードが送信したメッセージを追跡するためのカウンターです。ノードがプロンプトのないメッセージを送信するたびに、ノードはそのメッセージのための新しい固有の`RequestID`を作成します。

**`ContainerID`**は、リクエストされたコンテナの識別子です。

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Getの処理方法

ノードは、同様の`SubnetID`、`RequestID`、`ContainerID`と指定された識別子を持つ`Container`を合わせた`Put`のメッセージを返信する必要があります。正しい状況下では、ノードは自分が持っているコンテナのみをリクエストされるべきです。従って、ノードが指定されたコンテナを持っていない場合、`Get`のメッセージは安全にドロップすることができます。

### Getの送信時

ノードは、コンテナの存在を知らせる`Get`のメッセージをノードに送信します。例えば、リックとモーティの2つのノードがあるとします。リックが`ContainerID`を含む`PullQuery`のメッセージを送信し、それに対してモーティがコンテナを持っていない場合、モーティは不足している`ContainerID`を含むGetメッセージを送信します。

### Getの例

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

### 概要

`Put`のメッセージは、リクエストされたコンテナをノードに提供します。

`Put`のメッセージで使用されるOpCodeは、次の通りです。`0x05`。

### Putに含まれるもの

`Put`のメッセージには、`SubnetID`、`RequestID`、`ContainerID`、`Container`が含まれています。

**`SubnetID`**は、このメッセージがどのサブネットに向けられているかを定義します。

**`RequestID`**は、ノードが送信したメッセージを記録するためのカウンターです。

**`ContainerID`**は、このメッセージが送信するコンテナの識別子です。

**`Container`**は、このメッセージが送信するコンテナのバイト数です。

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Putの処理方法

ノードは、コンセンサスにコンテナを追加しようとするはずです。

### Putが送られてきた場合

ノードは、そのノードがアクセスできるコンテナのGetメッセージを受信したことに応答して、`Put`のメッセージを送信します。

### Putの例

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

`PushQuery`のメッセージは、指定された`ContainerID`がコンセンサスに追加された後に、ノードに優先的なコンテナIDをリクエストします。`ContainerID`が不明の場合は、`Container`が楽観的に提供されます。

`PushQuery`のメッセージで使用されるOpCodeは、次の通りです。`0x06`。

### PushQueryに含まれるもの

`PushQuery`のメッセージには、`SubnetID`、`RequestID`、`ContainerID`、`Container`が含まれています。

**`SubnetID`**は、このメッセージがどのサブネットに向けられているかを定義します。

**`RequestID`**は、ノードが送信したメッセージを記録するためのカウンターです。

**`ContainerID`**は、応答が送信される前に、このメッセージがコンセンサスに追加されていることを期待するコンテナの識別子です。

**`Container`**は、識別子`ContainerID`のコンテナのバイト数です。

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### PushQueryの処理方法

ノードは、コンセンサスにコンテナを追加しようとするはずです。コンテナがコンセンサスに追加された後、ノードの現在のプリファレンスを記載した`Chits`のメッセージを送信する必要があります。

### PushQueryの送信時

ノードは、そのノードの現在のプリファレンスを把握したいと考え、そのノードがまだ`Container`を学習していない可能性があると感じた場合、`PushQuery`のメッセージを送るべきです。ノードは、新しいコンテナを学習した時、または「しばらくの間」保留中のコンテナを持っていた時に、ノードの設定を学習したいと思うでしょう。

### PushQuery の例

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

`PullQuery`のメッセージは、指定された`ContainerID`がコンセンサスに追加された後、ノードに優先コンテナIDをリクエストします。

`PullQuery`のメッセージで使用されるOpCodeは、次の通りです。`0x07`。

### PullQueryに含まれるもの

`PullQuery`のメッセージには、`SubnetID`、`RequestID`、`ContainerID`が含まれます。

**`SubnetID`**は、このメッセージがどのサブネットに向けられているかを定義します。

**`RequestID`**は、ノードが送信したメッセージを記録するためのカウンターです。

**`ContainerID`**は、応答が送信される前に、このメッセージがコンセンサスに追加されていることを期待するコンテナの識別子です。

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### PullQueryの処理方法

ノードが`ContainerID`を追加していない場合、コンセンサスにコンテナを追加しようとするはずです。コンテナがコンセンサスに追加された後、ノードの現在のプリファレンスを記載した`Chits`のメッセージを送信する必要があります。

### PullQueryの送信時

ノードは、そのノードの現在のプリファレンスを把握したいと考え、そのノードがまだ`Container`を学習していない可能性があると感じた場合、`PullQuery`のメッセージを送るべきです。ノードは、新しいコンテナを学習した時、または「しばらくの間」保留中のコンテナを持っていた時に、ノードの設定を学習したいと思うでしょう。

### PullQueryの例

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

### 概要

`Chits`のメッセージは、要求された優先コンテナのセットをノードに提供します。

`Chits`のメッセージで使用されるOpCodeは、次の通りです。`0x08`。

### Chitsに含まれるもの

`Chits`のメッセージには、`SubnetID`、`RequestID`、`Preferences`が含まれます。

**`SubnetID`**は、このメッセージがどのサブネットに向けられているかを定義します。

**`RequestID`**は、ノードが送信したメッセージを記録するためのカウンターです。

**`Preferences`**は、そのノードのプリファレンスを完全に表すコンテナIDのリストです。

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Chitsの取り扱い

ノードは、参照されているコンテナのコンセンサスへの追加を試みる必要があります。参照されているコンテナを追加できない場合、ノードは不足しているコンテナを無視して、残りのチットをポーリングに適用できます。調査が完了したら、コンテナのコンフィデンスを適切に更新する必要があります。

### Chitsの送信時

ノードは、そのノードがコンセンサスに追加したコンテナに対する`PullQuery`または`PushQuery`のメッセージを受信したことに応答して、`Chits`のメッセージを送信します。

### Chitsの例

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

