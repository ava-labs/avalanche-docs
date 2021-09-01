# Primitifs de sérialisation

[Avalanche](../../#avalanche) utilise une représentation simple, uniforme et élégante pour toutes les données internes. Ce document décrit comment les types primitifs sont encodés sur la plateforme Avalanche. Les transactions sont encodées en termes de ces types primitifs de base.

## Byte

Les octes sont emballés en tant qu'est dans la charge utile du message.

Exemple :

```text
Packing:
    0x01
Results in:
    [0x01]
```

## Court

Les shorts sont emballés dans le format BigEndian dans la charge de message utile.

Exemple :

```text
Packing:
    0x0102
Results in:
    [0x01, 0x02]
```

## Inter

Les intégrateurs sont des valeurs de 32 bits emballés dans le format BigEndian dans le message et le message de la charge.

Exemple :

```text
Packing:
    0x01020304
Results in:
    [0x01, 0x02, 0x03, 0x04]
```

## Long Integers

Les entiers longs sont des valeurs de 64 bits emballés dans le format BigEndian dans le message et la charge utile.

Exemple :

```text
Packing:
    0x0102030405060708
Results in:
    [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]
```

## Adresses IP

Les adresses IP sont représentées comme un format IPv6 de 16 octets, avec le port annexé au chargement utile du message en tant que court. Les adresses IPv4 sont remboursées avec 12 octets de la première ligne des 0x00.

Exemple IPv4

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

Exemple IPv6

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

## Array à longueur fixe

Les barrages de longueur fixe, dont la longueur est connue en amont et par contexte, sont emballés en ordre.

Exemple de tableau Byte

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x01, 0x02]
```

Exemple de tableau entier entier:

```text
Packing:
    [0x03040506]
Results in:
    [0x03, 0x04, 0x05, 0x06]
```

## Array de longueur variable

La longueur du tableau est préfixée au format entier, suivie de l'emballage du contenu du tableau au format de tableau de longueur fixe.

Exemple de tableau Byte

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x00, 0x00, 0x00, 0x02, 0x01, 0x02]
```

Exemple de tableau Int :

```text
Packing:
    [0x03040506]
Results in:
    [0x00, 0x00, 0x00, 0x01, 0x03, 0x04, 0x05, 0x06]
```

## Chaîne

Une chaîne de caractères est emballée de la même manière qu'un tableau d'octets de longueur variable. Cependant, le préfixe de longueur est un court et non un int. Les chaînes sont encodées au format UTF-8.

Exemple :

```text
Packing:
    "Avax"
Results in:
    [0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

