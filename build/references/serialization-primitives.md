# Serialization Primitives

[Avalanche](../../#avalanche) tüm iç veriler için basit ve zarif bir temsilci kullanır. Bu belge, Avalanche platformunda ilkel türlerin nasıl are açıklar. Bu temel ilkel tipler için işlemler kodlanmaktadır.

## Byte

Mesaj yüküne baytlar yerleştirildi.

Örnek Olarak:

```text
Packing:
    0x01
Results in:
    [0x01]
```

## - Kısa boylu

Şort BigEndian formatında mesaj yüküne paketlendi.

Örnek Olarak:

```text
Packing:
    0x0102
Results in:
    [0x01, 0x02]
```

## Tam sayı

Sayılar Bigendian biçiminde mesaj yüküne yüklenmiş 32 bit değerleridir.

Örnek Olarak:

```text
Packing:
    0x01020304
Results in:
    [0x01, 0x02, 0x03, 0x04]
```

## Uzun Sayılar

Uzun tamsayılar Bigendian biçiminde mesaj yüküne paketlenmiş 64 bit değerleridir.

Örnek Olarak:

```text
Packing:
    0x0102030405060708
Results in:
    [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]
```

## IP Adresleri

IP adresleri 16-byte IPv6 formatı olarak temsil edilirken, port bir kısa olarak mesaj yüküne eklenmiştir. IPv4 adresleri 0x00'lerin önde gelen 12 bayt ile eklenir.

IPv4 örneği:

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

IPv6 örneği:

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

## Düzeltilmiş Uzunluk Fixed-Length

Uzun uzunluğu zaman öncesinden ve bağlamla bilinen sabit uzunluklu diziler sırayla paketlenir.

Byte dizili örneği:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x01, 0x02]
```

Sayfa dizisi örneği:

```text
Packing:
    [0x03040506]
Results in:
    [0x03, 0x04, 0x05, 0x06]
```

## Değişken Uzunluk Dizisi

Dizinin uzunluğu Integer formatında önceden ayarlanmış, ardından Fixed Length Array formatındaki dizinin içeriğini paketlemesi takip etmektedir.

Byte dizili örneği:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x00, 0x00, 0x00, 0x02, 0x01, 0x02]
```

Int örneği:

```text
Packing:
    [0x03040506]
Results in:
    [0x00, 0x00, 0x00, 0x01, 0x03, 0x04, 0x05, 0x06]
```

## String

Bir ip, değişken uzunluklu bayt dizisine benzer şekilde paketlenir. Ancak uzunluk prefix bir intten ziyade kısa bir mesafededir. İpler UTF-8 formatında kodlanmıştır.

Örnek Olarak:

```text
Packing:
    "Avax"
Results in:
    [0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

