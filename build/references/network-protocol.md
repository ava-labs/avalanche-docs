# Protocole de réseau

Le réseau Avalanche définit le format de communication principal entre les nœuds Avalanche. Il utilise le format [de sérialisation primitive](serialization-primitives.md) pour l'emballage de la charge utile.

`"Containers"`sont mentionnés abondamment dans la description. Un conteneur est simplement un terme générique pour les blocs ou les sommets, sans avoir à spécifier si l'algorithme de consensus est DAG ou Chain.

## Getversion

`GetVersion`demande qu'un `Version`message soit envoyé en réponse.

L'opCode utilisé par les `GetVersion`messages est : .`0x00`

### Que contient GetVersion

La charge utile d'un `GetVersion`message est vide.

```text
[]
```

### Comment Getversion est géré

`GetVersion`Un nœud recevant un message doit répondre avec un `Version`message contenant la version actuelle du temps et du nœud.

### Lorsque GetVersion est envoyé

`GetVersion`est envoyé lorsqu'un nœud est connecté à un autre nœud, mais n'a pas encore reçu de `Version`message. Il peut toutefois être renvoyé de nouveau à tout moment.

## Version

`Version`assure que les nœuds auxquels nous sommes connectés sont en cours d'exécution des versions compatibles d'Avalanche, et du moins de manière lâche sur l'heure actuelle.

L'opCode utilisé par les `Version`messages est : .`0x01`

### Que contient la version

`Version`contient le temps actuel du nœud dans le format de temps Unix en nombre de millisecondes depuis le début de l'ère du 01/01/1970, ainsi qu'une chaîne de version décrivant la version du code que le nœud est en cours d'exécution.

Contenu :

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### Comment la version est gérée

Si les versions sont incompatibles ou que les temps actuels diffèrent trop, la connexion sera supprimée.

### Lorsque la version est envoyée

`Version`est envoyé en réponse à un `GetVersion`message.

### Exemple de version

Envoyer un `Version`message avec le temps `November 16th, 2008 at 12:00am (UTC)`et la version`avalanche/0.0.1`

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

### Aperçu

`GetPeers`demande qu'un `Peers`message soit envoyé en réponse.

L'opCode utilisé par les `GetPeers`messages est : .`0x02`

### Que contient GetPeers

La charge utile d'un `GetPeers`message est vide.

```text
[]
```

### Comment GetPeers est géré

Une `GetPeers`demande de nœud de réception doit répondre avec un `Peers`message contenant les adresses IP de ses nœuds de jalonnement.

### Lorsque GetPeers est envoyé

Un nœud envoie des `GetPeers`messages sur la start-up pour découvrir les participants au réseau. Il peut également envoyer périodiquement des `GetPeers`messages afin de découvrir de nouveaux nœuds en arrivant sur le réseau.

## Ses pairs

### Aperçu

`Peers`le message contient une liste de pairs, représentés en tant qu'adresses IP. Notez qu'une adresse IP contient à la fois l'IP et le numéro de port, et prend en charge le format IPv4 et IPv6.

L'opCode utilisé par les `Peers`messages est : .`0x03`

### Que contient les peers

`Peers`contient les adresses IP des nœuds de jalonnement auxquels ce nœud est actuellement connecté.

Contenu :

```text
[
    Variable Length IP Address Array
]
```

### Comment les pairs sont traités

Lors de la réception d'un message, un nœud doit comparer les nœuds qui apparaissent dans le message à sa propre liste de `Peers`voisins, et forger des connexions à tout nouveau nœud.

### Lorsque les pairs sont envoyés

`Peers`Les messages n'ont pas besoin d'être envoyés en réponse à un `GetPeers`message et sont envoyés périodiquement pour annoncer les nœuds d'arrivée La période par défaut pour ce type de gossip push est de 60 secondes.

### Exemple par les pairs

Envoyer un `Peers`message avec les adresses IP `"127.0.0.1:9650"`et`"[2001:0db8:ac10:fe01::]:12345"`

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

## Obtenir

### Aperçu

Un `Get`message demande un conteneur, c'est-à-dire un block ou un vertex, à partir d'un nœud.

L'opCode utilisé par les `Get`messages est : .`0x04`

### Que contient

`SubnetID`Un `Get`message contient un , `RequestID`et .`ContainerID`

**`SubnetID`**définit le sous-réseau de ce message est destiné .

**`RequestID`**est un compteur qui aide à suivre les messages envoyés par un nœud. Chaque fois qu'un nœud envoie un message non invité, le nœud créera un nouveau unique `RequestID`pour le message.

**`ContainerID`**est l'identifiant du contenant demandé.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Comment obtenir est géré

`SubnetID``ContainerID``Container`Le nœud doit répondre avec un `Put`message avec le même , `RequestID`et avec l'identifiant spécifié. Dans des situations correctes, un nœud doit être demandé seulement un contenant qu'il a. Par conséquent, si le nœud n'a pas le contenant spécifié, le `Get`message peut être abandonné en toute sécurité.

### Quand Obtenir est envoyé

Un nœud enverra un `Get`message à un nœud qui nous parle de l'existence d'un conteneur. Par exemple, supposons que nous avons deux nœuds : Rick et Morty. `PullQuery`Si Rick envoie un message qui contient un , pour `ContainerID`lequel Morty n'a pas le conteneur pour, alors Morty enverra un message Get contenant la disparition .`ContainerID`

### Obtenir des exemples

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

## Mettre

### Aperçu

Un `Put`message fournit un conteneur demandé à un nœud.

L'opCode utilisé par les `Put`messages est : .`0x05`

### Que contient les mises à mettre

`SubnetID``RequestID`Un `Put`message contient un , , `ContainerID`et .`Container`

**`SubnetID`**définit le sous-réseau de ce message est destiné .

**`RequestID`**est un compteur qui aide à suivre les messages envoyés par un nœud.

**`ContainerID`**est l'identifiant du conteneur que ce message envoie ci-dessous.

**`Container`**est les octets du conteneur que ce message envoie ci-dessus.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Comment mettre est géré

Le nœud devrait tenter d'ajouter le contenant au consensus.

### Lorsque Put est envoyé

`Put`Un nœud enverra un message en réponse à la réception d'un message Obtenir un conteneur pour un contenant auquel le nœud a accès.

### Mettre l'exemple

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

### Aperçu

Un `PushQuery`message demande les containerids préférés du nœud après que les spécifiés `ContainerID`aient été ajoutés au consensus. Si la personne `ContainerID`n'est pas connue, la personne `Container`est fournie de manière optimiste.

L'opCode utilisé par les `PushQuery`messages est : .`0x06`

### Qu'est-ce que contient PushQuery

`SubnetID``RequestID`Un `PushQuery`message contient un , , `ContainerID`et .`Container`

**`SubnetID`**définit le sous-réseau de ce message est destiné .

**`RequestID`**est un compteur qui aide à suivre les messages envoyés par un nœud.

**`ContainerID`**est l'identifiant du conteneur que ce message prévoit avoir été ajouté au consensus avant que la réponse ne soit envoyée.

**`Container`**est les octets du contenant avec l'identifiant .`ContainerID`

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Comment PushQuery est géré

Le nœud devrait tenter d'ajouter le contenant au consensus. Une fois le conteneur ajouté au consensus, un `Chits`message doit être envoyé avec les préférences actuelles du nœud.

### Lorsque PushQuery est envoyé

Un nœud devrait envoyer un `PushQuery`message si il veut apprendre les préférences actuelles de ce nœud et il estime qu'il est possible que le nœud n'ait pas encore `Container`appris. Le nœud voudra apprendre les préférences des nœuds lorsqu'il apprend un nouveau conteneur ou qu'il a eu des conteneurs en attente pour un « moment ».

### Exemple de PushQuery

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

### Aperçu

Un `PullQuery`message demande les containerids préférés du nœud après que les spécifiés `ContainerID`aient été ajoutés au consensus.

L'opCode utilisé par les `PullQuery`messages est : .`0x07`

### Qu'est-ce que contient PullQuery

`SubnetID`Un `PullQuery`message contient un , `RequestID`et .`ContainerID`

**`SubnetID`**définit le sous-réseau de ce message est destiné .

**`RequestID`**est un compteur qui aide à suivre les messages envoyés par un nœud.

**`ContainerID`**est l'identifiant du conteneur que ce message prévoit avoir été ajouté au consensus avant que la réponse ne soit envoyée.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Comment PullQuery est géré

Si le nœud n'a pas ajouté `ContainerID`, il devrait tenter d'ajouter le conteneur au consensus. Une fois le conteneur ajouté au consensus, un `Chits`message doit être envoyé avec les préférences actuelles du nœud.

### Lorsque PullQuery est envoyé

Un nœud devrait envoyer un `PullQuery`message si il veut apprendre les préférences actuelles de ce nœud et il estime qu'il est très probable que le nœud a déjà appris .`Container` Le nœud voudra apprendre les préférences des nœuds lorsqu'il apprend un nouveau conteneur ou qu'il a eu des conteneurs en attente pour un « moment ».

### Exemple de PullQuery

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

## Chics

### Aperçu

Un `Chits`message fournit un ensemble demandé de conteneurs préférés à un nœud.

L'opCode utilisé par les `Chits`messages est : .`0x08`

### Que contient les chics

`SubnetID`Un `Chits`message contient un , `RequestID`et .`Preferences`

**`SubnetID`**définit le sous-réseau de ce message est destiné .

**`RequestID`**est un compteur qui aide à suivre les messages envoyés par un nœud.

**`Preferences`**est la liste des containerids qui décrivent entièrement les préférences du nœud.

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Comment les chits sont traités

Le nœud devrait tenter d'ajouter tout conteneurs référencés au consensus. Si les conteneurs référencés ne peuvent pas être ajoutés, le nœud peut ignorer les conteneurs manquants et appliquer les chics restants au sondage. Une fois un sondage terminé, les confidences pour conteneurs doivent être mises à jour de manière appropriée.

### Lorsque les chits sont envoyés

`PullQuery`Un nœud enverra un `Chits`message en réponse à la réception d'un ou d'un `PushQuery`message pour un conteneur que le nœud a ajouté au consensus.

### Exemple de chics

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

