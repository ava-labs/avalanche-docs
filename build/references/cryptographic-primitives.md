# Primitivos criptográficos

[Avalanche](../../#avalanche) utiliza una variedad de primitivos criptográficos para sus diferentes funciones. Este archivo resume el tipo y la clase de criptografía utilizada en las capas de red y blockchain.

## Criptografía en la Capa de la Red

Avalanche utiliza la Transport Layer Security, TLS, para proteger las comunicaciones de nodo a nodo de los intrusos. TLS combina la practicidad de la criptografía de clave pública con la eficiencia de la criptografía de clave simétrica. Esto ha dado lugar a que el TLS se convierta en el estándar para la comunicación en Internet. Mientras que la mayoría de los protocolos de consenso clásicos emplean criptografía de clave pública para probar la recepción de mensajes a terceros, la nueva familia de consenso de Snow\* no requiere tales pruebas. Esto permite a Avalanche emplear el TLS para autenticar a los stakers y elimina la necesidad de la costosa criptografía de clave pública para firmar los mensajes de la red.

### Certificados TLS

Avalanche no depende de ningún tercero centralizado y, en particular, no utiliza certificados emitidos por terceros autentificadores. Todos los certificados utilizados dentro de la capa de red para identificar los puntos finales son autofirmados, creando así una capa de identidad autosoberana. Nunca intervienen terceros.

### Direcciones TLS

Para evitar la publicación del certificado completo de TLS en la Platform chain, el certificado es primero "hasheado". Por coherencia, Avalanche emplea el mismo mecanismo de hash para los certificados TLS que se utiliza en Bitcoin. Es decir, la representación DER del certificado se somete a hash con sha256, y el resultado se somete a hash con ripemd160 para obtener un identificador de 20 bytes para los stakers.

Este identificador de 20 bytes está representado por "NodeID-" seguido por la cadena codificada de la [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) de los datos.

## La Criptografía en la Avalanche Virtual Machine

`secp256k1`La máquina virtual de Avalanche utiliza la criptografía de curva elíptica, específicamente para sus firmas en la blockchain.

Este identificador de 32 bytes está representado por "PrivateKey-" seguido de la cadena codificada de la [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) de los datos.

### Direcciones Secp256k1

Avalanche no es prescriptivo en cuanto a los esquemas de direccionamiento, eligiendo en su lugar dejar el direccionamiento hasta cada blockchain.

El esquema de direccionamiento de la X-Chain y de la P-Chain se basa en el secp256k1. Avalanche sigue un enfoque similar al de Bitcoin y hace hash de la clave pública de la ECDSA. La representación comprimida de 33 bytes de la clave pública se hash con sha256 una ****vez. El resultado se comprime con ripemd160 para obtener una dirección de 20 bytes.

Avalanche utiliza la convención `chainID-address`para especificar en qué cadena existe una dirección. `chainID`Puede ser reemplazado por un alias de la cadena. Cuando se transmite información a través de aplicaciones externas, se requiere la convención CB58.

### Bech32

Las direcciones de la X-Chain y la P-Chain usan el estándar [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) descrito en [BIP 0173](https://en.bitcoin.it/wiki/BIP_0173). Hay cuatro partes a un esquema de direcciones de Bech32. En orden de apariencia:

* Una parte de lectura humana \(HRP\). En la red de la red que es `avax`este.
* El número `1`, que separa la HRP de la dirección y el código de corrección de errores.
* Una cadena codificada de base-32 que representa la dirección de 20 byte.
* Un código de corrección de error de base de 6 caracteres

Además, una dirección de Avalanche se fija con el alias de la cadena en la que existe, seguida de un dash. Por ejemplo, las direcciones de X-Chain están prefijadas con `X-`.

La siguiente expresión regular coincide con las direcciones en la X-Chain, la P-Chain y la C-Chain para la red principal, fuji y localnet. Tenga en cuenta que todas las direcciones de Avalanche válidas coincidirán con esta expresión regular, pero algunas cadenas que no son válidas direcciones de Avalanche pueden coincidir con esta expresión regular.

```text
^([XPC]|[a-km-zA-HJ-NP-Z1-9]{36,72})-[a-zA-Z]{1,83}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$
```

Leer más sobre el [plan](https://support.avalabs.org/en/articles/4596397-what-is-an-address) de dirección de Avalanche

### Firmas Recuperables Secp256k1

Las firmas recuperables se almacenan como el 65 byte **`[R || S || V]`**donde **`V`**es 0 o 1 para permitir la recuperación de clave pública rápida. **`S`**Debe estar en la mitad inferior de la posible gama para prevenir la maleabilidad de la firma. Antes de firmar un mensaje, el mensaje se somete a hash usando sha256.

### Ejemplo Secp256k1

Supongamos que Rick y Morty están estableciendo un canal de comunicación seguro. Morty crea un nuevo par de claves público-privadas.

Clave privada:`0x98cb077f972feb0481f1d894f272c6a1e3c15e272a1658ff716444f465200070`

Clave pública`0x02b33c917f2f6103448d7feb42614037d05928433cb25e78f01a825aa829bb3c27`

Debido a la infinita sabiduría de Rick, no confía en sí mismo para llevar la llave pública de Morty, así que sólo pide la dirección de Morty. Morty sigue las instrucciones, somete a hash su vlave pública usando SHA256, y luego ripemd160, ese resultado producirá una dirección.

SHA256\(Clave pública\):`0x28d7670d71667e93ff586f664937f52828e6290068fa2a37782045bffa7b0d2f`

Dirección:`0xe8777f38c88ca153a6fdc25942176d2bf5491b89`

Morty está bastante confundido porque una llave pública debe ser segura para ser de conocimiento público. Rick eructa y explica que el hecho de tener la clave pública protege al propietario de la clave privada de posibles fallos de seguridad futuros en la criptografía de curva elíptica. En caso de que se rompa la criptografía y se pueda derivar una clave privada de una clave pública, los usuarios pueden transferir sus fondos a una dirección que nunca antes haya firmado una transacción, evitando que sus fondos se vean comprometidos por un atacante. Esto permite proteger a los propietarios de las monedas mientras se actualiza la criptografía en los clientes.

Más tarde, una vez que Morty ha aprendido más sobre la historia de Rick, Morty intenta enviarle un mensaje. Morty sabe que Rick sólo leerá el mensaje si puede verificar que era de él, así que firma el mensaje con su clave privada.

Mensaje:`0x68656c702049276d207472617070656420696e206120636f6d7075746572`

Mensaje`0x912800c29d554fb9cdce579c0abba991165bbbc8bfec9622481d01e0b3e4b7da`

Firma de mensaje:`0xb52aa0535c5c48268d843bd65395623d2462016325a86f09420c81f142578e121d11bd368b88ca6de4179a007e6abe0e8d0be1a6a4485def8f9e02957d3d72da01`

Nunca más se volvio a ver a Morty.

## Mensajes Firmados

Un estándar para mensajes genéricos firmados interoperables basados en el formato Bitcoin Script y el formato Ethereum.

```text
sign(sha256(length(prefix) + prefix + length(message) + message))
```

La prefijo es simplemente la `\x1AAvalanche Signed Message:\n`string, donde `0x1A`está la longitud del texto de prefijo y `length(message)`es un [entero del](serialization-primitives.md#integer) tamaño de mensaje.

### Especificación de imagen previa de Gantt

```text
+---------------+-----------+------------------------------+
| prefix        : [26]byte  |                     26 bytes |
+---------------+-----------+------------------------------+
| messageLength : int       |                      4 bytes |
+---------------+-----------+------------------------------+
| message       : []byte    |          size(message) bytes |
+---------------+-----------+------------------------------+
                            |       26 + 4 + size(message) |
                            +------------------------------+
```

### Ejemplo

Como ejemplo, firmaremos el mensaje "A través del consenso a las estrellas"

```text
// prefix size: 26 bytes
0x1a
// prefix: Avalanche Signed Message:\n
0x41 0x76 0x61 0x6c 0x61 0x6e 0x63 0x68 0x65 0x20 0x53 0x69 0x67 0x6e 0x65 0x64 0x20 0x4d 0x65 0x73 0x73 0x61 0x67 0x65 0x3a 0x0a
// msg size: 30 bytes
0x00 0x00 0x00 0x1e
// msg: Through consensus to the stars
54 68 72 6f 75 67 68 20 63 6f 6e 73 65 6e 73 75 73 20 74 6f 20 74 68 65 20 73 74 61 72 73
```

Después de hash con `sha256`y firmar el valor c[b58 ](https://support.avalabs.org/en/articles/4587395-what-is-cb58)codificado: .`4Eb2zAHF4JjZFJmp4usSokTGqq9mEGwVMY2WZzzCmu657SNFZhndsiS8TvL32n3bexd8emUwiXs8XqKjhqzvoRFvghnvSN` Aquí hay un ejemplo con la [billetera de la Web](https://wallet.avax.network/wallet/advanced) de Avalanche

![Mensaje de señal](../../.gitbook/assets/sign-message.png)

## La Criptografía en la Ethereum Virtual Machine

Los nodos de avalanche soportan la Ethereum Virtual Machine \(EVM\) y duplican con precisión todas las construcciones criptográficas utilizadas en Ethereum. Esto incluye la función de hash Keccak y los otros mecanismos utilizados para la seguridad criptográfica en la EVM.

## La Criptografía en otras Virtual Machines

Dado que Avalanche es una plataforma extensible, esperamos que la gente añada primitivas criptográficas adicionales al sistema con el tiempo.

