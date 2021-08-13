# ネットワークプロトコル

AvalancheネットワークはAvalancheノード間のコア通信フォーマットを定義しています。Payload Packingには[、Primitive](serialization-primitives.md) serialization formatを使用しています。

`「コンテナ」`は、説明の中で広く言及されています。コンセンサスアルゴリズムがDAGかChainであるかどうかを指定する必要はありません。

## GetVersion-JP

`GetVersion` では、`レスポンス`として送信する Version メッセージを要求します。

`GetVersion` メッセージで使用されるOpCodeは: `0x00`です。

### GetVersion には何が含まれていますか？

`GetVersion` メッセージのペイロードは空です。

```text
[]
```

### GetVersionの取り扱い方法

`GetVersion` メッセージを受け取るノードは、現在の時刻とノードバージョンを含む`Version` メッセージで応答する必要があります。

### GetVersion が送信される場合

`GetVersion` はノードが別のノードに接続されているときに送信されますが、まだ`Versionメッセージ`を受けていません。ただし、いつでも再送することができます。

## JavaScript-JavaScript-JavaScript-Java

`バージョン`では、接続されているノードが互換性のあるバージョンのAvalancheを実行していることを保証し、少なくとも現在の時間に合意します。

`Version` メッセージで使用される OpCode は: `0x01` です。

### JPJ-PARJ-PAR

`Version`には、ノードの現在時刻をUNIX時刻形式で1970年1月1日から1970年1月1日までのエポックの開始時刻をミリ秒単位で記述した文字列と、ノードが実行しているコードのバージョンを記述したバージョン文字列が含まれています。

コンテンツ:

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### JavaScript-JP-JP-

バージョンが互換性がない場合や現在の時刻が多すぎると、接続は終了します。

### Versionが送信される場合

`JavaScript```-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

### バージョン例

`バージョンメッセージ`を`2008年11月16日12:00am（UTC）`とバージョン`avalanche/0.0.1`で送信する

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

## GetPeers-JP

### JavaScript-JP-JP-

`GetPeers`は`Peersメッセージ`をレスポンスとして送信することを要求します。

`GetPeers`メッセージで使用されるOpCodeは`0x02`です。

### GetPeersが含まれているもの

`GetPeers` メッセージのペイロードは空です。

```text
[]
```

### GetPeersの取り扱い方法

`GetPeers`リクエストを受け取るノードは、接続されたステーキングノードの IP アドレスを含む`Peersメッセージ`で応答する必要があります。

### GetPeersが送られるとき

ノードは、ネットワーク内の参加者を発見するために、起動時に`GetPeers`メッセージを送信します。また、ネットワークに到着したときに新しいノードを発見するために`GetPeers`メッセージを定期的に送信することもできます。

## Peers-JP

### JavaScript-JP-JP-

`Peers` メッセージには、IP アドレスとして表現されるピアのリストが含まれています。IPアドレスにはIPとポート番号の両方が含まれており、IPv4とIPv6の両方のフォーマットをサポートしています。

`Peers`メッセージで使用されるOpCodeは`0x03`です。

### Peersが含まれているもの

`Peers`には、このノードが現在接続しているステーキングノードのIPアドレスが含まれています。

コンテンツ:

```text
[
    Variable Length IP Address Array
]
```

### Peersの取り扱い方法

`Peers`メッセージを受信するとき、ノードはメッセージに表示されるノードを自分の隣接するノードと比較し、新しいノードへの接続をフォージする必要があります。

### Peersが送られる場合

`Peersメッセージ`は`GetPeers`メッセージに応じて送信する必要はなく、新しく到着したノードを発表するために定期的に送信されます。このようなプッシュゴシップのデフォルトの期間は60秒です。

### Peers 例

`Peers`メッセージ`をIPアドレス「127.0.0.1:9650」`と`「[2001:0db8:ac10:fe01::]:12345」`で送信する

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

## JavaScript-JP-JP-

### JavaScript-JP-JP-

`Get`メッセージは、ノードからコンテナ、つまりblockまたはvertexを要求します。

`Get`メッセージで使用されるOpCodeは`0x04`です。

### Get には何が含まれていますか？

`Get`メッセージには、`SubnetID`、`RequestID`、`ContainerID`が含まれています。

**`SubnetID`** は、このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`** は、ノードから送信されたメッセージを追跡するのに役立つカウンターです。ノードがプロンプトされていないメッセージを送信するたびに、そのノードはメッセージに対して新しい一意の`RequestID`を作成します。

**`ContainerID`** は、要求されたコンテナの識別子です。

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Get の処理方法

Nodeは、`Put`メッセージと同じ`SubnetID`、`RequestID`、`ContainerID`と、ContainerIDと、指定した識別子を持つ`ContainerID`を返信する必要があります。正しい状況では、ノードはそのコンテナを求められるべきです。したがって、ノードに指定されたコンテナがない場合、`Get`メッセージを安全にドロップできます。

### Getが送信される場合

ノードは、コンテナの存在について説明するノードに`Get`メッセージを送信します。例えば、RickとMortyの2つのノードがあるとします。Rick`が``ContainerID`を含む`PullQuery`メッセージを送信した場合、MortyがContainerIDを取得したGetメッセージを送信します。

### Get Exampleを取得する

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

## Put QuickForm

### JavaScript-JP-JP-

`Put`メッセージは、要求されたコンテナをノードに提供します。

`Put`メッセージで使用されるOpCodeは`0x05`です。

### Put 内容

`Put`メッセージには、`SubnetID`、`RequestID`、`ContainerID`、およびContainerが含まれています`。`

**`SubnetID`** は、このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`** は、ノードから送信されたメッセージを追跡するのに役立つカウンターです。

**`ContainerID`** は、このメッセージが送信するコンテナの識別子です。

**`Container`** は、このメッセージが送信するコンテナのバイトです。

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Putの取り扱い方法

Node はコンセンサスにコンテナを追加しようとします。

### Putが送信されるとき

ノードがアクセスできるコンテナのGetメッセージを受け取るときに、`Put`メッセージを送信します。

### Put 例

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

## PushQuery-JP

### JavaScript-JP-JP-

`PushQuery`メッセージは、指定した`ContainerID`がコンセンサスに追加された後、ノードから好ましいcontainerIDを要求します。`ContainerID```が不明な場合、コンテナは最適化されます。

`PushQuery` メッセージで使用されるOpCodeは: `0x06`です。

### PushQuery が含まれているもの

`PushQuery` メッセージには、`SubnetID`、`RequestID`、`ContainerID`、およびContainerが含まれています`。`

**`SubnetID`** は、このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`** は、ノードから送信されたメッセージを追跡するのに役立つカウンターです。

**`ContainerID`** は、レスポンスが送信される前にこのメッセージがコンセンサスに追加されることを期待するコンテナの識別子です。

**`Container`**は、`ContainerID` という識別子を持つコンテナのバイトです。

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### PushQuery の取り扱い方法

Node はコンセンサスにコンテナを追加しようとします。コンテナがコンセンサスに追加された後、`Chits`メッセージはノードの現在のpreference\(s\)で送信されます。

### PushQuery が送信される場合

ノードは`PushQuery`メッセージを送信する必要があります。このノードの現在の環境設定を知りたい場合、ノードが`Container`をまだ学習していない可能性があると感じることです。ノードは、新しいコンテナを学習したとき、または "awhile" のためのコンテナが保留中の状態だったときに、ノード設定を学びたいと思います。

### PushQuery 例

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

## PullQuery-JP

### JavaScript-JP-JP-

`PullQuery` メッセージは、指定した`ContainerID`がコンセンサスに追加された後、ノードから好ましいcontainerIDを要求します。

`PullQuery` メッセージで使用されるOpCodeは: `0x07`です。

### PullQuery には何が含まれていますか？

`PullQuery` メッセージには、`SubnetID`、`RequestID`、および`ContainerID`が含まれています。

**`SubnetID`** は、このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`** は、ノードから送信されたメッセージを追跡するのに役立つカウンターです。

**`ContainerID`** は、レスポンスが送信される前にこのメッセージがコンセンサスに追加されることを期待するコンテナの識別子です。

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### PullQuery の取り扱い方法

`ContainerID`を追加していないノードがコンセンサスにコンテナを追加しようと試みるべきです。コンテナがコンセンサスに追加された後、`Chits`メッセージはノードの現在のpreference\(s\)で送信されます。

### PullQuery が送信される場合

ノードは、このノードの現在の環境設定を知りたい場合は、`PullQuery`メッセージを送信する必要があります。そして、ノードがすでに`Container`を知っている可能性が高いと感じています。ノードは、新しいコンテナを学習したとき、または "awhile" のためのコンテナが保留中の状態だったときに、ノード設定を学びたいと思います。

### PullQuery 例

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

## Chits-JP

### JavaScript-JP-JP-

`Chits`メッセージは、要求された好ましいコンテナ\(s\)のセットをノードに提供します。

`Chits`メッセージで使用されるOpCodeは`0x08`です。

### Chitsが含まれているもの

`Chits` メッセージには、`SubnetID`、`RequestID`、および`Preferences`が含まれています。

**`SubnetID`** は、このメッセージがどのサブネットに宛てられているかを定義します。

**`RequestID`** は、ノードから送信されたメッセージを追跡するのに役立つカウンターです。

**`Preferences`** は、ノードの設定を完全に記述する containerID のリストです。

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Chitsの取り扱い方法

Node は、参照されたコンテナをコンセンサスに追加しようとします。参照されたコンテナを追加できない場合、ノードは欠けているコンテナを無視して、残りのチットをポーリングに適用できます。投票が完了すると、コンテナの信頼関係を適切に更新する必要があります。

### Chitsが送信されるとき

ノードはコンセンサスに追加したコンテナの`PullQuery`または`PushQuery`メッセージを受け取るために、`Chits`メッセージを送信します。

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

