# Primitivos de serialización

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

Las direcciones IP se representan en formato IPv6 de 16 bytes, con el puerto añadido a la carga de mensajes como un Short. Las direcciones IPv4 se rellenan con 12 bytes de 0x00 principales.

Ejemplo de IPv4 :

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

Ejemplo de IPv6 :

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

Las matrices de longitud fija, cuya longitud se conoce de antemano y por contexto, se empaquetan en orden.

Ejemplo de matriz de bytes:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x01, 0x02]
```

Ejemplo de matriz entera:

```text
Packing:
    [0x03040506]
Results in:
    [0x03, 0x04, 0x05, 0x06]
```

## Variable Length Array

La longitud de la matriz se prefija en formato Entero, seguido del empaquetado del contenido de la matriz en formato Fixed Length Array.

Ejemplo de matriz de bytes:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x00, 0x00, 0x00, 0x02, 0x01, 0x02]
```

Ejemplo de matriz entera:

```text
Packing:
    [0x03040506]
Results in:
    [0x00, 0x00, 0x00, 0x01, 0x03, 0x04, 0x05, 0x06]
```

## String

Una cadena está empaquetada de forma similar a una matriz de bytes de longitud variable. Sin embargo, el prefijo de longitud es un short en lugar de un int. Las cadenas están codificadas en formato UTF-8.

Ejemplo:

```text
Packing:
    "Avax"
Results in:
    [0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

