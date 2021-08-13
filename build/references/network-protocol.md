# Protocolo de Red

La red Avalanche define el formato de comunicación principal entre los nodos Avalanche. Utiliza el formato [de serialización primitivo](serialization-primitives.md) para el embalaje de carga útil.

`Los "contenedores"` se mencionan extensamente en la descripción. Un Contenedor es simplemente un término genérico para bloques o vértices, sin necesidad de especificar si el algoritmo de consenso es DAG o Cadena.

## GetVersion

`GetVersion` solicita un mensaje de `Versión` que se enviará como respuesta.

El OpCode utilizado por los mensajes `GetVersion` es: `0x00`.

### ¿Qué contiene GetVersion

La carga útil de un mensaje `GetVersion` está vacía.

```text
[]
```

### Cómo se maneja GetVersion

Un nodo que reciba un mensaje de `GetVersion` debe responder con un mensaje `de Versión` que contenga la versión actual del tiempo y del nodo.

### Cuando GetVersion se envía

`GetVersion` se envía cuando un nodo está conectado a otro nodo, pero aún no ha recibido un mensaje `de` Versión. Sin embargo, puede ser reenviado en cualquier momento.

## Versión para imprimir

`La versión` garantiza que los nodos a los que estamos conectados están ejecutando versiones compatibles de Avalanche, y al menos de acuerdo libremente en el momento actual.

El OpCode utilizado por los mensajes `de Versión` es: `0x01`.

### ¿Qué versión contiene

`La versión` contiene el tiempo actual del nodo en formato de tiempo Unix en número de milisegundos desde el comienzo de la época en 01/01/1970, así como una cadena de versión que describe la versión del código que el nodo está ejecutando.

Contenido:

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### Cómo se maneja la versión

Si las versiones son incompatibles o los tiempos actuales difieren demasiado, la conexión se terminará.

### Cuando se envía la versión

`La versión` se envía en respuesta a un mensaje de `GetVersion`.

### Ejemplo de versión

Envío de un mensaje `de versión` con el momento `16 de noviembre de 2008 a las 12:00 am (UTC)` y la versión `avalanche/0.0.1`

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

### Descripción general

`GetPeers` pide que se envíe un mensaje `de pares` como respuesta.

El OpCode utilizado por los mensajes de `GetPeers` es: `0x02`.

### Qué contiene GetPeers

La carga útil de un mensaje de `GetPeers` está vacía.

```text
[]
```

### Cómo se maneja GetPeers

Un nodo que reciba la solicitud de `GetPeers` debe responder con un mensaje `de pares` que contenga las direcciones IP de sus nodos conectados.

### Cuando GetPeers envía

Un nodo envía mensajes de `GetPeers` al inicio para descubrir a los participantes en la red. También puede enviar periódicamente mensajes de `GetPeers` para descubrir nuevos nodos a medida que llegan a la red.

## Los pares

### Descripción general

El mensaje de los pares contiene una lista de pares, representados como direcciones `IP.` Tenga en cuenta que una dirección IP contiene tanto el número IP como el de puerto, y admite tanto el formato IPv4 como IPv6.

El OpCode utilizado por los mensajes `de los pares` es: `0x03`.

### Lo que contiene los pares

`Los pares` contienen las direcciones IP de los nodos de estampar a los que se encuentra actualmente conectado este nodo.

Contenido:

```text
[
    Variable Length IP Address Array
]
```

### Cómo se maneja a los pares

Al recibir un mensaje `de los` compañeros, un nodo debe comparar los nodos que aparecen en el mensaje con su propia lista de vecinos, y forjar conexiones con cualquier nuevo nodo.

### Cuando los pares son enviados

Los mensajes de `los pares` no necesitan ser enviados en respuesta a un mensaje de `GetPeers`, y se envían periódicamente para anunciar los nodos recién llegados. El período predeterminado para tales chismes de presión es de 60 segundos.

### Ejemplo de pares

Envío de un mensaje `entre los pares` con las direcciones IP `"127.0.0.1:9650"` y `"[2001:0db8:ac10:fe01::]:12345"`

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

## ¡Vamos!

### Descripción general

A `Obtener` mensaje solicita un contenedor, es decir, bloqueo o vértice, desde un nodo.

El OpCode utilizado por `Get` mensajes es: `0x04`.

### ¿Qué contiene

A `Consigue` mensaje contiene un `SubnetID`, `RequestID` y `ContainerID`.

**`SubnetID`** define para qué subnet este mensaje está destinado.

**`RequestID`** es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo. Cada vez que un nodo envía un mensaje sin motivar, el nodo creará un nuevo `RequestID` único para el mensaje.

**`ContainerID`** es el identificador del contenedor solicitado.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Cómo se maneja

El nodo debe responder con un mensaje `de envío` con el mismo `SubnetID`, `RequestID` y `ContainerID` junto con el `Contenedor` con el identificador especificado. En situaciones correctas, solo se debe pedir un nodo para un contenedor que tiene. Por lo tanto, si el nodo no tiene el contenedor especificado, el mensaje `Obtener` puede ser descargado de forma segura.

### Cuando se envía

Un nodo enviará un mensaje a un nodo que nos diga sobre la `existencia` de un contenedor. Por ejemplo, supongamos que tenemos dos nodos: Rick y Morty. Si Rick envía un mensaje de `PullQuery` que contiene un `ContainerID```, que Morty no tiene el contenedor para, entonces Morty enviará un mensaje de obtener que contenga el Contenedor que falte.

### Obtener ejemplo

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

## Ponga en marcha

### Descripción general

Un mensaje `de envío` proporciona un contenedor solicitado a un nodo.

El OpCode utilizado por `Put` mensajes es: `0x05`.

### ¿Qué contiene Put

Un mensaje `de envío` contiene un `SubnetID`, `RequestID`, `ContainerID` y `Contenedor`.

**`SubnetID`** define para qué subnet este mensaje está destinado.

**`RequestID`** es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo.

**`ContainerID`** es el identificador del contenedor que este mensaje está enviando.

**`El contenedor`** es los bytes del contenedor este mensaje está enviando.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Cómo se maneja Put

El nodo debería tratar de añadir el contenedor al consenso.

### Cuando Put se envía

Un nodo enviará un mensaje `de envío` en respuesta a recibir un mensaje de envío para un contenedor al que tiene acceso el nodo.

### Poner ejemplo

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

### Descripción general

Un mensaje de `PushQuery` pide a los containerIDs preferidos desde el nodo después de que el `Contenedor` especificado haya sido agregado al consenso. Si no se conoce el `Contenedor,` el `Contenedor` se proporciona de forma óptima.

El OpCode utilizado por los mensajes de `PushQuery` es: `0x06`.

### ¿Qué contiene PushQuery

Un mensaje de `PushQuery` contiene un `SubnetID`, `RequestID`, `ContainerID` y `Contenedor`.

**`SubnetID`** define para qué subnet este mensaje está destinado.

**`RequestID`** es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo.

**`ContainerID`** es el identificador del contenedor que espera haber sido agregado al consenso antes de enviar la respuesta.

**`El contenedor`** es los bytes del contenedor con el identificador `ContainerID`.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### Cómo se maneja PushQuery

El nodo debería tratar de añadir el contenedor al consenso. Después de que el contenedor se añada al consenso, se debe enviar un mensaje de `Chits` con la preferencia actual del nodo.

### Cuando PushQuery se envía

Un nodo debe enviar un mensaje de `PushQuery` si quiere aprender de las preferencias actuales de este nodo y se siente que es posible que el nodo no haya aprendido de `Contenedor` todavía. El nodo querrá aprender de las preferencias de los nodos cuando se entere de un nuevo contenedor o que ha tenido contenedores pendientes durante "un tiempo".

### PushQuery Ejemplo

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

### Descripción general

Un mensaje `PullQuery` pide los containerIDs preferidos desde el nodo después de que el `Contenedor` especificado haya sido agregado al consenso.

El OpCode utilizado por los mensajes `PullQuery` es: `0x07`.

### ¿Qué contiene PullQuery

Un mensaje de `PullQuery` contiene un `SubnetID`, `RequestID` y `ContainerID`.

**`SubnetID`** define para qué subnet este mensaje está destinado.

**`RequestID`** es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo.

**`ContainerID`** es el identificador del contenedor que espera haber sido agregado al consenso antes de enviar la respuesta.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### Cómo se maneja PullQuery

Si el nodo no ha añadido `ContainerID`, debería intentar añadir el contenedor al consenso. Después de que el contenedor se añada al consenso, se debe enviar un mensaje de `Chits` con la preferencia actual del nodo.

### Cuando PullQuery se envía

Un nodo debe enviar un mensaje `PullQuery` si quiere aprender de las preferencias actuales de este nodo y se siente que es muy probable que el nodo ya haya aprendido de `Contenedor`. El nodo querrá aprender de las preferencias de los nodos cuando se entere de un nuevo contenedor o que ha tenido contenedores pendientes durante "un tiempo".

### PullQuery Ejemplo

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

### Descripción general

Un mensaje `de chits` proporciona un conjunto solicitado de container\(s\) preferido a un nodo.

El OpCode utilizado por los mensajes de `Chits` es: `0x08`.

### Qué contiene los chits

Un mensaje de `Chits` contiene un `SubnetID`, `RequestID` y `Preferencias`.

**`SubnetID`** define para qué subnet este mensaje está destinado.

**`RequestID`** es un contador que ayuda a realizar un seguimiento de los mensajes enviados por un nodo.

**`Las preferencias`** son la lista de containerIDs que describen plenamente las preferencias del nodo.

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### Cómo se manejan los chits

El nodo debería tratar de añadir cualquier contenedor de referencia al consenso. Si no se pueden añadir los recipientes referenciados, el nodo puede ignorar los contenedores desaparecidos y aplicar los chits restantes a la encuesta. Una vez que se complete una encuesta, las confidencias de los contenedores deben actualizarse adecuadamente.

### Cuando los chits se envían

Un nodo enviará un mensaje de `Chits` en respuesta a recibir un mensaje `PullQuery` o `PushQuery` para un contenedor que el nodo ha añadido al consenso.

### Chits Ejemplo

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

