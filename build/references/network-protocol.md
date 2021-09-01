# Protocolo de Red

La red de Avalanche define el formato de comunicación central entre los nodos de Avalanche. Utiliza el formato [de serialización primitivo](serialization-primitives.md) para el embalaje de carga útil.

`"Containers"`se menciona extensamente en la descripción. Un Contenedor es simplemente un término genérico para bloques o vértices, sin necesidad de especificar si el algoritmo de consenso es DAG o Chain.

## GetVersion

`GetVersion`peticiones de un `Version`mensaje que se enviará como respuesta.

El OpCode utilizado por los `GetVersion`mensajes es:`0x00`

### Que contiene GetVersion

La carga útil de un `GetVersion`mensaje está vacía.

```text
[]
```

### Cómo se maneja GetVersion

Un nodo que recibe un `GetVersion`mensaje debe responder con un `Version`mensaje que contiene la versión actual de tiempo y nodo.

### Cuando se envía GetVersion

`GetVersion`se envía cuando un nodo está conectado a otro nodo, pero aún no ha recibido un `Version`mensaje. Sin embargo, puede ser reenviado en cualquier momento.

## Version

`Version`garantiza que los nodos conectados estén ejecutando versiones compatibles de Avalanche, y al menos de acuerdo poco con la hora actual.

El OpCode utilizado por los `Version`mensajes es:`0x01`

### Que Contiene Versión

`Version`contiene la hora actual del nodo en formato de tiempo de Unix en número de milisegundos desde el comienzo de la época en 01/01/1970, así como una cadena de versión que describe la versión del código que el nodo está ejecutando.

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

`Version`se envía en respuesta a un `GetVersion`mensaje.

### Ejemplo de Version

Enviar un `Version`mensaje con el tiempo `November 16th, 2008 at 12:00am (UTC)`y la versión`avalanche/0.0.1`

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

`GetPeers`solicita que se envíe un `Peers`mensaje como respuesta.

El OpCode utilizado por los `GetPeers`mensajes es:`0x02`

### Que contiene GetPeers

La carga útil de un `GetPeers`mensaje está vacía.

```text
[]
```

### Como se maneja GetPeers

Una `GetPeers`solicitud de recepción de nodo debe responder con un `Peers`mensaje que contiene las direcciones IP de sus nodos de participación conectados y de aplicación.

### Cuando se envía GetPeers

Un nodo envía `GetPeers`mensajes al inicio de la empresa para descubrir los participantes en la red. `GetPeers`También puede enviar mensajes periódicamente para descubrir nuevos nodos al llegar a la red.

## Peers

### Resumen

`Peers`el mensaje contiene una lista de pares representados como direcciones IP. Tenga en cuenta que una dirección IP contiene tanto el IP como el número de puerto, y soporta tanto el formato IPv4 como el IPv6.

El OpCode utilizado por los `Peers`mensajes es:`0x03`

### Que contiene Peers

`Peers`contiene las direcciones IP de los nodos de participación a las que este nodo está conectado actualmente.

Contenido:

```text
[
    Variable Length IP Address Array
]
```

### Como se maneja Peers

Al recibir un mensaje, un nodo debería comparar los nodos que aparecen en el mensaje con su propia lista de `Peers`vecinos, y crear conexiones a cualquier nuevo nodo.

### Cuando se envía Peers

`Peers`los mensajes no necesitan ser enviados en respuesta a un `GetPeers`mensaje, y se envían periódicamente para anunciar nodos de recién llegados. El período por defecto para tales mensajes es de 60 segundos.

### Ejemplo de Peers

Enviar un `Peers`mensaje con las direcciones IP `"127.0.0.1:9650"`y`"[2001:0db8:ac10:fe01::]:12345"`

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

## Obtén

### Resumen

Un `Get`mensaje pide un contenedor, es decir, de bloque o vértice, desde un nodo.

El OpCode utilizado por los `Get`mensajes es:`0x04`

### Que contiene Get

`SubnetID`Un `Get`mensaje contiene una , `RequestID`y .`ContainerID`

**`SubnetID`**define para qué subnet este mensaje está destinado.

**`RequestID`**es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo. Cada vez que un nodo envía un mensaje sin incitar, el nodo creará un nuevo único `RequestID`para el mensaje.

**`ContainerID`**es el identificador del contenedor solicitado.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Como se maneja Get

`SubnetID``ContainerID`El nodo debería responder con un `Put`mensaje con el mismo , `RequestID`y junto `Container`con el identificador especificado. En situaciones correctas, a un nodo sólo se le debe preguntar por un contenedor que tenga. Por lo tanto, si el nodo no tiene el contenedor especificado, el `Get`mensaje puede ser eliminado de forma segura.

### Cuando se envía Get

Un nodo enviará un `Get`mensaje a un nodo que nos dice sobre la existencia de un contenedor. Por ejemplo, supongamos que tenemos dos nodos: Rick y Morty. `PullQuery`Si Rick envía un mensaje que contiene un , `ContainerID`que Morty no tiene el contenedor para, entonces Morty enviará un mensaje que contiene lo que falta.`ContainerID`

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

## Poner

### Resumen

Un `Put`mensaje proporciona un contenedor solicitado a un nodo.

El OpCode utilizado por los `Put`mensajes es:`0x05`

### Que contiene Put

`SubnetID``RequestID`Un `Put`mensaje contiene una , `ContainerID`y`Container`

**`SubnetID`**define para qué subnet este mensaje está destinado.

**`RequestID`**es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo.

**`ContainerID`**es el identificador del contenedor que este mensaje está enviando.

**`Container`**es los bytes del contenedor

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Como se maneja a Put

El nodo debe intentar añadir el contenedor al consenso.

### Cuando se envía Put

`Put`Un nodo enviará un mensaje en respuesta a la recepción de un mensaje de obtener para un contenedor al que el nodo tiene acceso.

### Ejemplo de Put

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

### Resumen

Un `PushQuery`mensaje pide los containerIDs preferidos desde el nodo después de que el código especificado `ContainerID`haya sido agregado al consenso. Si lo no `ContainerID`es conocido, lo `Container`está optimizado

El OpCode utilizado por los `PushQuery`mensajes es:`0x06`

### Que contiene PushQuery

`SubnetID``RequestID`Un `PushQuery`mensaje contiene una , `ContainerID`y`Container`

**`SubnetID`**define para qué subnet este mensaje está destinado.

**`RequestID`**es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo.

**`ContainerID`**es el identificador del contenedor que este mensaje espera haber sido agregado al consenso antes de que la respuesta sea enviada.

**`Container`**es los bytes del contenedor con identificador`ContainerID`

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Como se maneja PushQuery

El nodo debe intentar añadir el contenedor al consenso. Después de que el contenedor sea agregado al consenso, se debe enviar un `Chits`mensaje con las preferencias actuales del nodo.

### Cuando se envía PushQuery

Un nodo debería enviar un `PushQuery`mensaje si quiere aprender de las preferencias actuales de este nodo y se siente que es posible que el nodo no haya aprendido `Container`todavía. El nodo querrá aprender de las preferencias de nodos cuando aprende de un nuevo contenedor o ha tenido contenedores pendientes por "un rato".

### Ejemplo de PushQuery

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

### Resumen

Un `PullQuery`mensaje pide los containerIDs preferidos desde el nodo después de que el código especificado `ContainerID`haya sido agregado al consenso.

El OpCode utilizado por los `PullQuery`mensajes es:`0x07`

### Que contiene PullQuery

`SubnetID`Un `PullQuery`mensaje contiene una , `RequestID`y .`ContainerID`

**`SubnetID`**define para qué subnet este mensaje está destinado.

**`RequestID`**es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo.

**`ContainerID`**es el identificador del contenedor que este mensaje espera haber sido agregado al consenso antes de que la respuesta sea enviada.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Como se maneja PullQuery

Si el nodo no ha `ContainerID`añadido, debería intentar agregar el contenedor al consenso. Después de que el contenedor sea agregado al consenso, se debe enviar un `Chits`mensaje con las preferencias actuales del nodo.

### Cuando se envía PullQuery

Un nodo debería enviar un `PullQuery`mensaje si quiere aprender de las preferencias actuales de este nodo y se siente que es muy probable que el nodo ya ha aprendido .`Container` El nodo querrá aprender de las preferencias de nodos cuando aprende de un nuevo contenedor o ha tenido contenedores pendientes por "un rato".

### Ejemplo de PullQuery

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

## Chicos

### Resumen

Un `Chits`mensaje proporciona un conjunto solicitado de contenedores preferidos a un nodo.

El OpCode utilizado por los `Chits`mensajes es:`0x08`

### Que contiene Chits

`SubnetID`Un `Chits`mensaje contiene una , `RequestID`y .`Preferences`

**`SubnetID`**define para qué subnet este mensaje está destinado.

**`RequestID`**es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo.

**`Preferences`**es la lista de containerIDs que describen totalmente las preferencias del nodo.

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Como se maneja Chits

El nodo debería intentar añadir cualquier contenedor referenciado al consenso. Si no se pueden añadir los contenedores referenciados, el nodo puede ignorar los contenedores que faltan y aplicar los restantes al sondeo. Una vez completado el sondeo, las confidencias de los contenedores deberían actualizarse adecuadamente.

### Cuando se envía Chits

Un nodo enviará un mensaje en respuesta a recibir un `Chits`mensaje `PullQuery`o un `PushQuery`mensaje para un contenedor que el nodo ha añadido al consenso.

### Ejemplo de Chits

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

