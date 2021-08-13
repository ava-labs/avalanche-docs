# Primitivo de serialización

[Avalanche](../../#avalanche) utiliza una representación simple, uniforme y elegante para todos los datos internos.Este documento describe cómo se codifican los tipos primitivos en la plataforma Avalanche. Las transacciones se codifican en términos de estos tipos primitivos básicos.

## Byte

Los Bytes están empacados como se encuentra en la carga útil del mensaje.

Ejemplo:

```text
Packing:
    0x01
Results in:
    [0x01]
```

## Corresponde al Sr.

Los pantalones cortos se empaquetan en formato BigEndian en la carga útil del mensaje.

Ejemplo:

```text
Packing:
    0x0102
Results in:
    [0x01, 0x02]
```

## Integer

Los números enteros son valores de 32 bits embalados en formato BigEndian en la carga útil del mensaje.

Ejemplo:

```text
Packing:
    0x01020304
Results in:
    [0x01, 0x02, 0x03, 0x04]
```

## Enteros largos

Los enteros largos son valores de 64 bits embalados en formato BigEndian en la carga útil del mensaje.

Ejemplo:

```text
Packing:
    0x0102030405060708
Results in:
    [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]
```

## Direcciones IP

Las direcciones IP están representadas como formato IPv6 de 16 bytes, con el puerto adjunto en la carga útil del mensaje como un Corto. Las direcciones IPv4 están acolchadas con 12 bytes de 0x00s.

Ejemplo IPv4:

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

Ejemplo IPv6:

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

## Array de longitud fija.

Las matrices de duración fija, cuya longitud se conoce con antelación y por contexto, se embalan en orden.

Byte array example:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x01, 0x02]
```

Ejemplo de matriz completa:

```text
Packing:
    [0x03040506]
Results in:
    [0x03, 0x04, 0x05, 0x06]
```

## Array de longitud variable

La longitud de la matriz se prefija en formato Integer, seguido por el embalaje del contenido de la matriz en formato Fija Length Array formato.

Byte array example:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x00, 0x00, 0x00, 0x02, 0x01, 0x02]
```

Ejemplo de matriz de entrada:

```text
Packing:
    [0x03040506]
Results in:
    [0x00, 0x00, 0x00, 0x01, 0x03, 0x04, 0x05, 0x06]
```

## Cadena

Una cadena se empaqueta de manera similar a una serie de byte de longitud variable. Sin embargo, el prefijo de longitud es un corto en lugar de una int. Las cadenas están codificadas en formato UTF-8.

Ejemplo:

```text
Packing:
    "Avax"
Results in:
    [0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

