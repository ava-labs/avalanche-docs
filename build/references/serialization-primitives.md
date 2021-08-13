# Primaires de sérialisation

[Avalanche](../../#avalanche) utilise une représentation simple, uniforme et élégante pour toutes les données internal document décrit comment les types primitifs sont encodés sur la plate-forme Avalanche. Les transactions sont encodées en termes de ces types primitifs de base.

## Byte

Les octets sont emballés comme -est dans la charge utile du message.

Exemple:

```text
Packing:
    0x01
Results in:
    [0x01]
```

## Courte durée

Les shorts sont emballés dans le format BigEndian dans la charge utile du message.

Exemple:

```text
Packing:
    0x0102
Results in:
    [0x01, 0x02]
```

## Intégrité

Les intégrateurs sont des valeurs 32-bit emballées dans le format BigEndian dans la charge utile du message.

Exemple:

```text
Packing:
    0x01020304
Results in:
    [0x01, 0x02, 0x03, 0x04]
```

## Longues intégrales

Les entiers longs sont des valeurs 64-bit emballées dans le format BigEndian dans la charge utile du message.

Exemple:

```text
Packing:
    0x0102030405060708
Results in:
    [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]
```

## Adresses IP

Les adresses IP sont représentées comme format IPv6 16 octets, le port étant ajouté dans la charge utile du message comme un court. Les adresses IPv4 sont rembourrées avec 12 octets de 0x00s leader.

Exemple IPv4:

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

Exemple IPv6:

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

## Longueur fixe

Les tableaux de longueur fixe, dont la longueur est connue en avance et par contexte, sont emballés dans l'ordre.

Exemple de tableau Byte:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x01, 0x02]
```

Exemple de tableau entier :

```text
Packing:
    [0x03040506]
Results in:
    [0x03, 0x04, 0x05, 0x06]
```

## Variable rayon de longueur

La longueur du tableau est préfixe au format integer, suivie par l'emballage du contenu du tableau au format Array longueur fixe.

Exemple de tableau Byte:

```text
Packing:
    [0x01, 0x02]
Results in:
    [0x00, 0x00, 0x00, 0x02, 0x01, 0x02]
```

Exemple de tableau int :

```text
Packing:
    [0x03040506]
Results in:
    [0x00, 0x00, 0x00, 0x01, 0x03, 0x04, 0x05, 0x06]
```

## Chaîne

Une chaîne est emballée de la même manière qu'un tableau a variable. Cependant, le préfixe de longueur est un court plutôt qu'une int. Les chaînes sont encodées au format UTF-8.

Exemple:

```text
Packing:
    "Avax"
Results in:
    [0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

