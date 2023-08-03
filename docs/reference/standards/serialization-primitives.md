---
tags: [Standards]
description:  This document describes how primitive types are encoded on the Avalanche platform. 
sidebar_label: Serialization
pagination_label: Serialization Primitives
---

# Serialization Primitives

Avalanche uses a simple, uniform, and elegant representation for all internal data. This document 
describes how primitive types are encoded on the Avalanche platform. Transactions are encoded in 
terms of these basic primitive types.

## Byte

Bytes are packed as-is into the message payload.

Example:

```text
Packing:
    0x01
Results in:
    [0x01]
```

## Short

Shorts are packed in BigEndian format into the message payload.

Example:

```text
Packing:
    0x0102
Results in:
    [0x01, 0x02]
```

## Integer

Integers are 32-bit values packed in BigEndian format into the message payload.

Example:

```text
Packing:
    0x01020304
Results in:
    [0x01, 0x02, 0x03, 0x04]
```

## Long Integers

Long integers are 64-bit values packed in BigEndian format into the message payload.

Example:

```text
Packing:
    0x0102030405060708
Results in:
    [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]
```

## IP Addresses

IP addresses are represented as 16-byte IPv6 format, with the port appended into the message payload
as a Short. IPv4 addresses are padded with 12 bytes of leading 0x00s.

IPv4 example:

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

IPv6 example:

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

Byte array example:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x01, 0x02]
```

Integer array example:

```text
Packing:
    [0x03040506]
Results in:
    [0x03, 0x04, 0x05, 0x06]
```

## Variable Length Array

The length of the array is prefixed in Integer format, followed by the packing of the array contents
in Fixed Length Array format.

Byte array example:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x00, 0x00, 0x00, 0x02, 0x01, 0x02]
```

Int array example:

```text
Packing:
    [0x03040506]
Results in:
    [0x00, 0x00, 0x00, 0x01, 0x03, 0x04, 0x05, 0x06]
```

## String

A String is packed similarly to a variable-length byte array. However, the length prefix is a short
rather than an int. Strings are encoded in UTF-8 format.

Example:

```text
Packing:
    "Avax"
Results in:
    [0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```
