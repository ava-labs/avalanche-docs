# Primitivos de Serialización

[Avalanche](../../#avalanche) utiliza una representación simple, uniforme y elegante de todos los datos internos. Este documento describe cómo se codifican los tipos primitivos en la plataforma de Avalanche. Las transacciones se codifican en términos de estos tipos primitivos básicos.

## Bytes

Los bytes se empaquetan tal cual en la carga de mensajes.

Ejemplo:

```text
Packing:
    0x01
Results in:
    [0x01]
```

## Short

Los Shorts están empaquetados en formato BigEndian en la carga de mensajes.

Ejemplo:

```text
Packing:
    0x0102
Results in:
    [0x01, 0x02]
```

## Integer

Los números enteros son valores de 32 bits empaquetados en formato BigEndian en la carga de mensajes.

Ejemplo:

```text
Packing:
    0x01020304
Results in:
    [0x01, 0x02, 0x03, 0x04]
```

## Long Integers

Los números enteros largos son valores de 64 bits empaquetados en formato BigEndian en la carga de mensajes.


Ejemplo:

```text
Packing:
    0x0102030405060708
Results in:
    [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]
```

## IP Addresses

IP addresses are represented as 16-byte IPv6 format, with the port appended into the message payload as a Short. IPv4 addresses are padded with 12 bytes of leading 0x00s.

IPv4 Ejemplo:

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

IPv6 Ejemplo:

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

## Fixed-Length Array

Fixed-length arrays, whose length is known ahead of time and by context, are packed in order.

Byte array Ejemplo:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x01, 0x02]
```

Integer array Ejemplo:

```text
Packing:
    [0x03040506]
Results in:
    [0x03, 0x04, 0x05, 0x06]
```

## Variable Length Array

The length of the array is prefixed in Integer format, followed by the packing of the array contents in Fixed Length Array format.

Byte array Ejemplo:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x00, 0x00, 0x00, 0x02, 0x01, 0x02]
```

Int array Ejemplo:

```text
Packing:
    [0x03040506]
Results in:
    [0x00, 0x00, 0x00, 0x01, 0x03, 0x04, 0x05, 0x06]
```

## String

A String is packed similarly to a variable-length byte array. However, the length prefix is a short rather than an int. Strings are encoded in UTF-8 format.

Ejemplo:

```text
Packing:
    "Avax"
Results in:
    [0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTEwODIxMzgzN119
-->