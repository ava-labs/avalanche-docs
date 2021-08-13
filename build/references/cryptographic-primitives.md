# Primitivo criptográfico

[Avalanche](../../#avalanche) utiliza una variedad de primitivos criptográficos para sus diferentes funciones. Este archivo resume el tipo y tipo de criptografía utilizados en las capas de red y blockchain.

## Cryptography en la capa de red

Avalanche utiliza Transport Layer Security, TLS, para proteger las comunicaciones de node-to-node de los ovejas. TLS combina la practicidad de la criptografía de clave pública con la eficiencia de la criptografía de clave simétrica. Esto ha dado lugar a que TLS se convierta en el estándar para la comunicación de Internet. Mientras que la mayoría de los protocolos de consenso clásico emplean criptografía de clave pública para probar la recepción de mensajes a terceros, la nueva familia de consenso Snow\* no requiere tales pruebas. Esto permite a Avalanche emplear TLS en la autenticación de stakers y elimina la necesidad de una criptografía de clave pública costosa para firmar mensajes de red.

### Certificados TLS

Avalanche no se basa en terceros centralizados, y en particular, no utiliza certificados expedidos por terceros autenticadores. Todos los certificados utilizados dentro de la capa de red para identificar los puntos finales son autofirmados, creando así una capa de identidad self-sovereign Nunca hay terceros involucrados.

### Direcciones TLS

Para evitar la publicación del certificado TLS completo en la cadena de la Plataforma, el certificado se ha hashed. por primera vez. Para la coherencia, Avalanche emplea el mismo mecanismo de hashing para los certificados TLS que se utiliza en Bitcoin. A saber, la representación DER del certificado se enjuaga con sha256, y el resultado se hashed con ripemd160 para producir un identificador de 20 bytes para los stakers.

Este identificador de 20 bytes está representado por "NodeID-" seguido de la cadena codificada [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) de los datos.

## Cryptography en la máquina virtual de Avalanche

La máquina virtual de Avalanche utiliza criptografía de curva elíptica, específicamente `secp256k1`, para sus firmas en el blockchain.

Este identificador de 32 bytes está representado por "PrivateKey-" seguido de la cadena codificada [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) de los datos.

### Secp256k1 Direcciones

Avalanche no es prescriptivo sobre la dirección de los planes, eligiendo en lugar de dejar de abordar hasta cada cadena de bloqueo.

El esquema de dirección de la cadena X y la cadena P depende del secp256k1. Avalanche sigue un enfoque similar a Bitcoin y hash la clave pública ECDSA. La representación comprimida de 33 bytes de la clave pública se ha hecho con sha256 **una vez**. El resultado se hashed con ripemd160 para producir una dirección de 20 bytes.

Avalanche utiliza la `dirección de` chainID de convención para especificar en qué cadena existe una dirección. `chainID` puede ser sustituido por un alias de la cadena. Al transmitir información a través de aplicaciones externas, se requiere la convención CB58.

### Bech32

Las direcciones de la cadena X y la cadena P utilizan el estándar [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) descrito en [BIP 0173](https://en.bitcoin.it/wiki/BIP_0173). Hay cuatro partes en un esquema de direcciones Bech32. En orden de apariencia:

* Una parte de lectura humana \(HRP). En Mainnet esto es `avax`.
* El número `1`, que separa la HRP de la dirección y el código de corrección de errores.
* Una cadena codificada base-32 que representa la dirección de 20 byte.
* Un código de corrección de error codificado de base de 6 caracteres 32.

Además, una dirección Avalanche se prefija con el alias de la cadena en la que existe, seguido de un dash. Por ejemplo, las direcciones de X-Chain están prefijadas con `X-`.

La siguiente expresión regular coincide con las direcciones en la cadena X-Chain, P-Chain y C-Chain para mainnet, fuji y localnet. Tenga en cuenta que todas las direcciones de Avalanche válidas coincidirán con esta expresión regular, pero algunas cadenas que no son válidas direcciones de Avalanche pueden coincidir con esta expresión regular.

```text
^([XPC]|[a-km-zA-HJ-NP-Z1-9]{36,72})-[a-zA-Z]{1,83}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$
```

Lea más sobre el [esquema de abordaje](https://support.avalabs.org/en/articles/4596397-what-is-an-address) de Avalanche.

### Sectp256k1 Firmas recuperables

Las firmas recuperables se almacenan como el 65 byte **`[R || S || V]`** donde **`V`** es 0 o 1 para permitir una rápida recuperación de claves públicas. **`S`** debe estar en la mitad inferior del rango posible para prevenir la maleabilidad de la firma. Antes de firmar un mensaje, el mensaje se ha hashed usando sha256.

### Sect256k1 Ejemplo

Supongamos que Rick y Morty están estableciendo un canal de comunicación seguro. Morty crea un nuevo par de claves público-privadas.

Clave Privada: `0x98cb077f972feb0481f1d894f272c6a1e3c15e272a1658ff716444f465200070`

Llave pública \(33-byte 33-byte\): `0x02b3c917f2f6103448d7feb42614037d05928433cb25e78f01a825aa829b3c27`

Debido a la infinita sabiduría de Rick, no confía en sí mismo con llevar alrededor de la llave pública de Morty, por lo que solo pide la dirección de Morty. Morty sigue las instrucciones, la llave pública de SHA256 y luego la ripemd160 que producen una dirección.

SHA256\(Public Key\): `0x28d7670d71667e93ff586f64937f52828e6290068fa2a3782045bffa7b0d2f`

Dirección: `0xe8777f38c88ca153a6fdc25942176d2bf5491b89`

Morty está bastante confundido porque una clave pública debe ser segura para ser conocimiento público. Rick belches y explica que el hashing la clave pública protege al propietario de la clave privada de posibles defectos de seguridad futuros en la criptografía de curva elíptica. En caso de que la criptografía se rompa y una clave privada puede derivarse de una clave pública, los usuarios pueden transferir sus fondos a una dirección que nunca ha firmado una transacción antes, evitando que sus fondos se vean comprometidos por un atacante. Esto permite a los propietarios de monedas proteger mientras la criptografía se actualiza a través de los clientes.

Más tarde, una vez que Morty ha aprendido más sobre la historia de Rick, Morty intenta enviar un mensaje a Rick. Morty sabe que Rick solo leerá el mensaje si puede verificar que fue de él, así que firma el mensaje con su llave privada.

Mensaje: `0x68656c702049276d207472617070656420696e206120636f6d7075746572`

Mensaje Hash: `0x912800c29d554fb9cdce579c0abba991165bbbc8bfec9622481d01e0b3e4b7da`

Firma del mensaje: `0xb52aa0535c5c48268d843bd65395623d2462016325a86f09420c81f142578e121d1bd368b88ca6de4179a07e6abe0e8d0be1a6a4485def8f9e02957d3d72da01`

Morty nunca fue visto de nuevo.

## Mensajes firmados

Un estándar para mensajes firmados genéricos interoperables basados en el formato Bitcoin Script y el formato Ethereum.

```text
sign(sha256(length(prefix) + prefix + length(message) + message))
```

El prefijo es simplemente la cadena `\x1AAvalanche Mensaje` Signed donde `0x1A` es la longitud del texto prefijo y `la longitud (mensaje)` es un [entero](serialization-primitives.md#integer) del tamaño del mensaje.

### Especificación pre-imagen de Gantt

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

### Ejemplo de ello

Como ejemplo firmaremos el mensaje "A través del consenso a las estrellas"

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

Después de hashing con `sha256` y firmar la imagen pre-image el valor [cb58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) codificado: `4Eb2zAHF4JjJjJmp4usSokTqq9mEGwVMY2WZzzCmu657SNFZhndsiS8TvL32n3bexd8emUwiXs8XqkjhqzvoRFvghnvSN`. Aquí hay un ejemplo utilizando la [Cartera Web de Avalanche](https://wallet.avax.network/wallet/advanced).

![Mensaje de señalización](../../.gitbook/assets/sign-message.png)

## Cryptography en Ethereum Virtual Machine

Los nodos de Avalanche soportan la máquina virtual completa Ethereum \(EVM\) y duplican precisamente todos los constructos criptográficos utilizados en Ethereum. Esto incluye la función hash Keccak y los otros mecanismos utilizados para la seguridad criptográfica en el EVM.

## Cryptography en otras máquinas virtuales

Dado que Avalanche es una plataforma extensible, esperamos que la gente añadirá primitivos criptográficos adicionales al sistema a lo largo del tiempo.

