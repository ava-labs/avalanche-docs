# Protocole de réseau

Le réseau Avalanche définit le format de communication principal entre les nœuds Avalanche. Il utilise le format [de sérialisation primitive](serialization-primitives.md) pour l'emballage de charge utile.

`Les "conteneurs"` sont mentionnés abondamment dans la description. Un conteneur est simplement un terme générique pour les blocs ou les sommets, sans avoir besoin de préciser si l'algorithme de consensus est DAG ou chaîne.

## GetVersion

`GetVersion` demande qu'un message `Version` soit envoyé comme réponse.

L'OpCode utilisé par les messages `GetVersion` est: `0x00`.

### Quoi que GetVersion contient

La charge utile d'un message `GetVersion` est vide.

```text
[]
```

### Comment GetVersion gérée

Un noeud recevant un message `GetVersion` doit répondre avec un message `Version` contenant l'heure et la version du noeud courants.

### Lorsque GetVersion envoyée

`GetVersion` est envoyé lorsqu'un noeud est connecté à un autre noeud, mais n'a pas encore reçu de message `version.` Il peut toutefois être réenvoyé à tout moment.

## Version anglaise

`La version` assure que les nœuds auxquels nous sommes connectés sont en cours d'exécution des versions compatibles d'Avalanche, et du moins de manière lâche accord sur l'heure actuelle.

L'OpCode utilisé par les messages `Version` est: `0x01`.

### Quelle version contient

`La version` contient l'heure actuelle du noeud dans le format temps Unix en nombre de millisecondes depuis le début de l'époque du 01/01/1970, ainsi qu'une chaîne de version décrivant la version du code que le noeud est en cours d'exécution.

Contenu :

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### Comment la version est gérée

Si les versions sont incompatibles ou les temps actuels diffèrent trop, la connexion sera terminée.

### Quand la version est envoyée

`La version` est envoyée en réponse à un message `Getversion.`

### Exemple de version

Envoyer un message `version` avec l'heure `16 novembre 2008 à 12:00am (UTC)` et la version `avalanche/0.0.1`

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

### Aperçu général

`GetPeers``` demande qu'un message Peers soit envoyé comme réponse.

L'OpCode utilisé par les messages `GetPeers` est: `0x02`.

### Ce que GetPeers contient

La charge utile d'un message `GetPeers` est vide.

```text
[]
```

### Comment GetPeers est géré

Une demande de noeud recevant `GetPeers` doit répondre avec un message `Peers` contenant les adresses IP de ses noeuds de jalonnement connectés.

### Lorsque GetPeers est envoyé

Un noeud envoie des messages `GetPeers` lors de la mise en démarrage pour découvrir les participants du réseau. Il peut également envoyer périodiquement des messages `GetPeers` afin de découvrir de nouveaux nœuds lorsqu'ils arrivent dans le réseau.

## Les pairs

### Aperçu général

Le message `par les pairs` contient une liste de pairs, représentés comme adresses IP. Notez qu'une Adresse IP contient à la fois le numéro IP et le numéro de port, et supporte à la fois le format IPv4 et IPv6.

L'OpCode utilisé par les messages `Peers` est: `0x03`.

### Ce que les pairs contient

`Peers` contient les adresses IP des nœuds de jalonnement auxquels ce nœud est actuellement connecté.

Contenu :

```text
[
    Variable Length IP Address Array
]
```

### Comment les pairs sont manipulés

Lors de la réception d'un message `par les` pairs, un noeud doit comparer les noeuds apparaissant dans le message à sa propre liste de voisins, et forger les connexions à n'importe quel noeuds.

### Lorsque les pairs sont envoyés

Les messages `par les pairs` n'ont pas besoin d'être envoyés en réponse à un message `GetPeers`, et sont envoyés périodiquement pour annoncer les nœuds nouvellement arrivants. La période par défaut pour ce type de gossip push est de 60 secondes.

### Exemple par les pairs

Envoyer un message `par les pairs` avec les adresses IP `"127.0.1:9650"` et `"[2001:0db8:ac10:fe01::]:12345"`

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

## Obtenez

### Aperçu général

Un message `obtenir` demande un conteneur, c'est-à-dire bloquer ou vertex, à partir d'un nœud.

L'OpCode utilisé par `Get` messages est: `0x04`.

### Qu'est-ce que contient

Un message `Get` contient un `SubnetID`, `SubnetID`, et `Conteneur ID`.

**`SubnetID`** définit quel sous-réseau ce message est destiné.

**`RequestID`** est un compteur qui aide à garder la trace des messages envoyés par un nœud. Chaque fois qu'un noeud envoie un message non induit, le noeud créera un nouveau `RequestID` unique pour le message.

**`Conteneur ID`** est l'identifiant du conteneur demandé.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Comment obtenir géré

Le noeud doit répondre avec un message `Put` avec le même `SubnetID`, `SubnetID`, et `Conteneur` avec le `Conteneur` avec l'identifiant spécifié. Dans les situations correctes, un noeud ne devrait être demandé qu'un conteneur qu'il a. Par conséquent, si le noeud n'a pas le conteneur spécifié, le message `Get` peut être abandonné en toute sécurité.

### Quand Get envoyé

Un noeud enverra un message `Get` à un noeud qui nous indique l'existence d'un conteneur. Par exemple, supposons que nous avons deux nœuds: Rick et Morty. Si Rick envoie un message `PullQuery` qui contient un `Conteneur ID`, que Morty n'a pas le conteneur pour, alors Morty enverra un message Get contenant le `Conteneur` ID manquant.

### Obtenir l'exemple

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

## Mets

### Aperçu général

Un message `Put` fournit un conteneur demandé à un nœud.

L'OpCode utilisé par les messages `Put` est: `0x05`.

### Qu'il contient

Un message `Put` contient un `SubnetID`, `SubnetID`, `Conteneur` et `conteneur`.

**`SubnetID`** définit quel sous-réseau ce message est destiné.

**`RequestID`** est un compteur qui aide à garder la trace des messages envoyés par un nœud.

**`Conteneur ID`** est l'identifiant du conteneur que ce message est envoyé.

**`Conteneur`** est les octets du conteneur ce message est envoie.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Comment mettre est géré

Le noeud devrait tenter d'ajouter le contenant au consensus.

### Quand la mise est envoyée

Un noeud enverra un message `Put` en réponse à la réception d'un message Obtenir un conteneur auquel le noeud a accès.

### Mettez l'exemple

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

### Aperçu général

Un message `PushQuery` demande les containerIDs préférés du noeud après que le `conteneur` spécifié a été ajouté au consensus. Si le `Conteneur ID` n'est pas connu, le Conteneur est fourni de façon `optimale.`

L'OpCode utilisé par les messages `PushQuery` est: `0x06`.

### Quelles mesures PushQuery contient

Un message `PushQuery` contient un `SubnetID`, `SubnetID`, `conteneur` et `conteneur`.

**`SubnetID`** définit quel sous-réseau ce message est destiné.

**`RequestID`** est un compteur qui aide à garder la trace des messages envoyés par un nœud.

**`Conteneur ID`** est l'identifiant du conteneur que ce message prévoit avoir été ajouté au consensus avant que la réponse ne soit envoyée.

**`Conteneur`** est les octets du conteneur avec l'identifiant `Conteneur ID`.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Comment PushQuery est géré

Le noeud devrait tenter d'ajouter le contenant au consensus. Après que le conteneur est ajouté au consensus, un message `Chits` doit être envoyé avec la préférence current du nœud .

### Lorsque PushQuery est envoyé

Un noeud devrait envoyer un message `PushQuery` si il veut apprendre des préférences actuelles de ce noeud et il pense qu'il est possible que le noeud n'a pas encore appris de `Conteneur` . Le noeud voudra apprendre les préférences des noeuds lorsqu'il apprend un nouveau conteneur ou qu'il a eu des conteneurs en attente pour "un moment".

### Exemple de la demande

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

### Aperçu général

Un message `PullQuery` demande les containerIDs préférés du noeud après que le `conteneur` spécifié a été ajouté au consensus.

L'OpCode utilisé par les messages `PullQuery` est: `0x07`.

### Qu'est-ce que PullQuery contient

Un message `PullQuery` contient un `SubnetID`, `RequestID`, et `Conteneur ID`.

**`SubnetID`** définit quel sous-réseau ce message est destiné.

**`RequestID`** est un compteur qui aide à garder la trace des messages envoyés par un nœud.

**`Conteneur ID`** est l'identifiant du conteneur que ce message prévoit avoir été ajouté au consensus avant que la réponse ne soit envoyée.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Comment PullQuery est géré

Si le noeud n'a pas ajouté `Conteneur ID`, il devrait tenter d'ajouter le conteneur au consensus. Après que le conteneur est ajouté au consensus, un message `Chits` doit être envoyé avec la préférence current du nœud .

### Lorsque PullQuery est envoyé

Un noeud devrait envoyer un message `PullQuery` s'il veut apprendre des préférences actuelles de ce noeud et il pense qu'il est fort probable que le noeud a déjà appris de `Conteneur `. Le noeud voudra apprendre les préférences des noeuds lorsqu'il apprend un nouveau conteneur ou qu'il a eu des conteneurs en attente pour "un moment".

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

## Chits

### Aperçu général

Un message `Chits` fournit un ensemble demandé de container\(s\) preferred un nœud.

L'OpCode utilisé par les messages `Chits` est: `0x08`.

### Qu'est-ce que les Chits contient

Un message `Chits` contient un `SubnetID`, `SubnetID`, et `Préférences`.

**`SubnetID`** définit quel sous-réseau ce message est destiné.

**`RequestID`** est un compteur qui aide à garder la trace des messages envoyés par un nœud.

**`Les préférences`** sont la liste des containerIDs qui décrivent pleinement les préférences du nœud.

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Comment les chits sont manipulés

Le noeud devrait tenter d'ajouter les conteneurs référencés au consensus. Si les conteneurs référencés ne peuvent pas être ajoutés, le noeud peut ignorer les conteneurs manquants et appliquer les derniers morceaux au sondage. Une fois qu'un sondage est terminé, les confidences de conteneurs devraient être mises à jour adéquatement.

### Lorsque Chits envoyés

Un noeud enverra un message `Chits` en réponse à la réception d'un message `PullQuery` ou `PushQuery` pour un conteneur que le noeud a ajouté au consensus.

### Exemple de poussins

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

