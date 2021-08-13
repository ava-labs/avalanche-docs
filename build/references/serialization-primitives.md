# シリアライゼーションプリミティブ

[Avalancheは](../../#avalanche)、すべての内部データに対して、シンプルでユニフォームで優雅な表現を使用しています。このドキュメントでは、Avalancheプラットフォーム上でプリミティブ型がどのようにエンコードされているかを説明します。トランザクションはこれらの基本的なプリミティブ型の点でエンコードされています。

## Byte バイト

Byteは、メッセージペイロードにパックされます。

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

```text
Packing:
    0x01
Results in:
    [0x01]
```

## JP-JP-

ShortsはBigEndian形式でメッセージペイロードに詰め込まれています。

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

```text
Packing:
    0x0102
Results in:
    [0x01, 0x02]
```

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

整数は、メッセージペイロードにBigEndian形式でパックされた32ビットの値です。

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

```text
Packing:
    0x01020304
Results in:
    [0x01, 0x02, 0x03, 0x04]
```

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

長い整数は、メッセージペイロードにBigEndian形式でパックされた64ビットの値です。

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

```text
Packing:
    0x0102030405060708
Results in:
    [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]
```

## IPアドレス

IPアドレスは16バイトIPv6形式で表現され、ポートはメッセージペイロードにショートとして追加されます。IPv4アドレスは12バイトでパッドされます。 0x00sの先頭に置かれています。

IPv4の例:

```text
Packing:
    "127.0.0.1:9650"
Results in:
    [
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0xff, 0xff, 0x7f, 0x00, 0x00, 0x01,
        0x25, 0xb2,
    ]
```

IPv6の例:

```text
Packing:
    "[2001:0db8:ac10:fe01::]:12345"
Results in:
    [
        0x20, 0x01, 0x0d, 0xb8, 0xac, 0x10, 0xfe, 0x01,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x30, 0x39,
    ]
```

## Fixed-Length Array-JP

Fixed-length arrays arrays, そして、コンテキストによって長さが知られています。

Byte arrayの例:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x01, 0x02]
```

整数配列の例:

```text
Packing:
    [0x03040506]
Results in:
    [0x03, 0x04, 0x05, 0x06]
```

## 変数長さ配列

配列の長さは整数形式で接頭辞を付け、続いて配列内容を固定長配列形式でパッキングします。

Byte arrayの例:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x00, 0x00, 0x00, 0x02, 0x01, 0x02]
```

Int arrayの例:

```text
Packing:
    [0x03040506]
Results in:
    [0x00, 0x00, 0x00, 0x01, 0x03, 0x04, 0x05, 0x06]
```

## JavaScript-JP-JP-

String は、変数長のバイト配列と同様にパックされます。しかし、長さの接頭辞は int ではなく短いです。文字列はUTF-8形式でエンコードされます。

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

```text
Packing:
    "Avax"
Results in:
    [0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

