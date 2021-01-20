# Protocolo de Red

La red de Avalanche define el formato de comunicación central entre los nodos de Avalanche. Utiliza el formato [serialización primitiva](serialization-primitives.md) para el empaquetado de la carga útil.

Los `"Containers"` se mencionan extensamente en la descripción. Un Contenedor es simplemente un término genérico para bloques o vértices, sin necesidad de especificar si el algoritmo de consenso es DAG o Chain.

## GetVersion

`GetVersion` solicita que se envíe un mensaje de `Version` como respuesta.

El OpCode usado por los mensajes `GetVersion` es: `0x00`.

### Que contiene GetVersion

La carga útil de un mensaje `GetVersion` es nula.

```text
[]
```

### Cómo se maneja GetVersion

Un nodo que reciba un mensaje `GetVersion` debe responder con un mensaje `Version` que contenga la hora actual y la versión del nodo.

### Cuando se envía GetVersion

`GetVersion` se envía cuando un nodo está conectado a otro nodo, pero aún no ha recibido un mensaje `Version`. Sin embargo, puede ser reenviado en cualquier momento.

## Version


`Version` asegura que los nodos a los que estamos conectados están ejecutando versiones compatibles de Avalanche, y al menos coinciden en la hora actual.

El OpCode usado por los mensajes de `Version` es: `0x01`.


### Que Contiene Versión 

`Version` contiene la hora actual del nodo en formato de tiempo Unix en número de milisegundos desde el comienzo de la época en 01/01/1970, así como una cadena de versión que describe la versión del código que el nodo está ejecutando.

Contenido:

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### Como se maneja Version

Si las versiones son incompatibles o los tiempos actuales difieren demasiado, la conexión será terminada.

### Cuando se envía Version

`Version` se envía en respuesta a un mensaje `GetVersion`.

### Ejemplo de Version

Enviando un mensaje de `Version` con la fecha`November 16th, 2008 at 12:00am (UTC)` y la versión `avalanche/0.0.1`.

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

### Resumen


`GetPeers` solicita que se envíe un mensaje de `Peers` como respuesta.

El OpCode usado por los mensajes `GetPeers` es: `0x02`.

### Que contiene GetPeers

La carga útil de un mensaje `GetPeers` es nula.

```text
[]
```

### Como se maneja GetPeers

Un nodo que recibe la solicitud `GetPeers` debe responder con un mensaje `Peers` que contiene las direcciones IP de sus nodos conectados, en staking.

### Cuando se envía GetPeers

Un nodo envía mensajes `GetPeers` al inicio para descubrir a los participantes de la red. También puede enviar periódicamente mensajes `GetPeers` para descubrir nuevos nodos a medida que llegan a la red.

## Peers

### Resumen


El mensaje `Peers` contiene una lista de pares, representados como direcciones IP. Tenga en cuenta que una dirección IP contiene tanto el IP como el número de puerto, y soporta tanto el formato IPv4 como el IPv6.

El OpCode utilizado por los mensajes `Peers` es: `0x03`.

### Que contiene Peers

`Peers` contiene las direcciones IP de los nodos de staking a los que este nodo está actualmente conectado.

Contenido:

```text
[
    Variable Length IP Address Array
]
```


### Como se maneja Peers

Al recibir un mensaje `Peers`, un nodo debe comparar los nodos que aparecen en el mensaje con su propia lista de vecinos, y forjar conexiones con cualquier nuevo nodo.

### Cuando se envía Peers

Los mensajes `Peers` no necesitan ser enviados en respuesta a un mensaje `GetPeers`, y son enviados periódicamente para anunciar los nuevos nodos que llegan. El período por defecto para tales mensajes es de 60 segundos.

### Ejemplo de Peers

Sending a `Peers` message with the IP addresses `"127.0.0.1:9650"` and `"[2001:0db8:ac10:fe01::]:12345"`

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

## Get

### Resumen

Un mensaje `Get` solicita un contenedor, es decir, un bloque o vértice, de un nodo.

El OpCode utilizado por los mensajes `Get` es: `0x04`.


### Que contiene Get

Un mensaje `Get` contiene un  `SubnetID`, `RequestID`, y  `ContainerID`.

**`SubnetID`**  define a qué subnet está destinado este mensaje.

**`RequestID`** es un contador que ayuda a llevar la cuenta de los mensajes enviados por un nodo. Cada vez que un nodo envía un mensaje no solicitado, el nodo creará un nuevo y único `RequestID` para el mensaje.

**`ContainerID`** es el identificador del contenedor solicitado.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```


### Como se maneja Get

El nodo debe responder con un mensaje `Put` con el mismo `SubnetID`, `RequestID`, y  `ContainerID` junto con el `Container`con el identificador especificado. En situaciones correctas, a un nodo sólo se le debe preguntar por un contenedor que tenga. Por lo tanto, si el nodo no tiene el contenedor especificado, el mensaje `Get` puede ser eliminado con seguridad.

### Cuando se envía Get

Un nodo enviará un mensaje `Get` a un nodo que nos dice sobre la existencia de un contenedor. Por ejemplo, supongamos que tenemos dos nodos: Rick y Morty. Si Rick envía un mensaje `PullQuery` que contiene un `ContainerID`", para el cual Morty no tenga el contenedor, entonces Morty enviará un mensaje `Get` que contenga el `ContainerID` que falta.

### Ejemplo de Get

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

## Put

### Resumen

Un mensaje `Put` proporciona un contenedor solicitado a un nodo.

El OpCode utilizado por los mensajes `Put` es: `0x05`.

### What Put contains


### Que contiene Put

Un mensaje `Put` contiene un `SubnetID`, `RequestID`, `ContainerID`, y `Container`.

**`SubnetID`** define a qué subnet está destinado este mensaje.

**`RequestID`** es un contador que ayuda a llevar la cuenta de los mensajes enviados por un nodo.

**`ContainerID`** es el identificador del contenedor que este mensaje está enviando.

**`Container`** son los bytes del contenedor que este mensaje está enviando.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### How Put is handled

The node should attempt to add the container to consensus.

### When Put is sent

A node will send a `Put` message in response to receiving a Get message for a container the node has access to.

### Put Example

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

### Overview

A `PushQuery` message requests the preferred containerIDs from the node after the specified `ContainerID` has been added to consensus. If the `ContainerID` is not known, the `Container` is optimistically provided.

The OpCode used by `PushQuery` messages is: `0x06`.

### What PushQuery contains

A `Put` message contains a `SubnetID`, `RequestID`, `ContainerID`, and `Container`.

**`SubnetID`** defines which subnet this message is destined for.

**`RequestID`** is a counter that helps keep track of the messages sent by a node.

**`ContainerID`** is the identifier of the container this message expects to have been added to consensus before the response is sent.

**`Container`** is the bytes of the container with identifier `ContainerID`.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### How PushQuery is handled

The node should attempt to add the container to consensus. After the container is added to consensus, a `Chits` message should be sent with the current preference\(s\) of the node.

### When PushQuery is sent

A node should send a `PushQuery` message if it wants to learn of this node’s current preferences and it feels that it is possible the node hasn’t learned of `Container` yet. The node will want to learn of nodes preferences when it learns of a new container or it has had pending containers for “awhile”.

### PushQuery Example

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

### Overview

A `PullQuery` message requests the preferred containerIDs from the node after the specified `ContainerID` has been added to consensus.

The OpCode used by `PullQuery` messages is: `0x07`.

### What PullQuery contains

A `Put` message contains a `SubnetID`, `RequestID`, and `ContainerID`.

**`SubnetID`** defines which subnet this message is destined for.

**`RequestID`** is a counter that helps keep track of the messages sent by a node.

**`ContainerID`** is the identifier of the container this message expects to have been added to consensus before the response is sent.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### How PullQuery is handled

If the node hasn’t added `ContainerID`, it should attempt to add the container to consensus. After the container is added to consensus, a `Chits` message should be sent with the current preference\(s\) of the node.

### When PullQuery is sent

A node should send a `PullQuery` message if it wants to learn of this node’s current preferences and it feels that it quite likely the node has already learned of `Container`. The node will want to learn of nodes preferences when it learns of a new container or it has had pending containers for “awhile”.

### PullQuery Example

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

### Overview

A `Chits` message provides a requested set of preferred container\(s\) to a node.

The OpCode used by `Chits` messages is: `0x08`.

### What Chits contains

A `Chits` message contains a `SubnetID`, `RequestID`, and `Preferences`.

**`SubnetID`** defines which subnet this message is destined for.

**`RequestID`** is a counter that helps keep track of the messages sent by a node.

**`Preferences`** is the list of containerIDs that fully describe the node’s preferences.

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### How Chits is handled

The node should attempt to add any referenced containers to consensus. If the referenced containers can’t be added, the node can ignore the missing containers and apply the remaining chits to the poll. Once a poll is completed, container confidences should be updated appropriately.

### When Chits is sent

A node will send a `Chits` message in response to receiving a `PullQuery` or `PushQuery` message for a container the node has added to consensus.

### Chits Example

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDM0MjA0NzA5LDEwNjc2NDQzNjJdfQ==
-->