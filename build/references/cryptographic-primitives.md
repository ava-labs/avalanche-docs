# Primitivos Criptográficos

[Avalanche](../../#avalanche) utiliza una variedad de primitivas criptográficas para sus diferentes funciones. Este archivo resume el tipo y la clase de criptografía utilizada en las capas de red y blockchain.

## Criptografía en la Capa de la Red

Avalanche utiliza la Transport Layer Security, TLS, para proteger las comunicaciones de nodo a nodo de los intrusos. TLS combina la practicidad de la criptografía de clave pública con la eficiencia de la criptografía de clave simétrica. Esto ha dado lugar a que el TLS se convierta en el estándar para la comunicación en Internet. Mientras que la mayoría de los protocolos de consenso clásicos emplean criptografía de clave pública para probar la recepción de mensajes a terceros, la nueva familia de consenso de Snow\* no requiere tales pruebas. Esto permite a Avalanche emplear el TLS para autenticar a los stakers y elimina la necesidad de la costosa criptografía de clave pública para firmar los mensajes de la red.

### Certificados TLS 

Avalanche no depende de ningún tercero centralizado y, en particular, no utiliza certificados emitidos por terceros autentificadores. Todos los certificados utilizados dentro de la capa de red para identificar los puntos finales son autofirmados, creando así una capa de identidad autosoberana. Nunca intervienen terceros.

### Direcciones TLS 

Para evitar la publicación del certificado completo de TLS en la Platform chain, el certificado es primero "hasheado". Por coherencia, Avalanche emplea el mismo mecanismo de hash para los certificados TLS que se utiliza en Bitcoin. Es decir, la representación DER del certificado se somete a hash con sha256, y el resultado se somete a hash con ripemd160 para obtener un identificador de 20 bytes para los stakers.

Este identificador de 20 bytes está representado por "NodeID-" seguido de la cadena codificada de datos [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58).

## La Criptografía en la Avalanche Virtual Machine

La Avalanche virtual machine utiliza criptografía de curva elíptica, específicamente `secp256k1`, para sus firmas en la blockchain.

Este identificador de 32 bytes está representado por "PrivateKey-" seguido de la cadena codificada de datos [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58).

### Direcciones Secp256k1 


Avalanche no es prescriptivo en cuanto a los esquemas de direccionamiento, eligiendo en su lugar dejar el direccionamiento hasta cada blockchain.

El esquema de direccionamiento de la X-Chain y de la P-Chain se basa en el secp256k1. Avalanche sigue un enfoque similar al de Bitcoin y hace hash de la clave pública de la ECDSA. La representación comprimida de 33 bytes de la clave pública se somete a hash con sha256 **una vez**. El resultado se comprime con ripemd160 para obtener una dirección de 20 bytes.

Avalanche utiliza la convención `chainID-address` para especificar en qué cadena existe una dirección. `chainID` puede ser reemplazado con un alias de la cadena. Cuando se transmite información a través de aplicaciones externas, se requiere la convención CB58.

Lea más sobre el [esquema de direcciones](https://github.com/ava-labs/avalanche-docs/tree/94d2e4aeddbf91f89b830f9b44b4aa60089ac755/en/articles/4596397-what-is-an-address/README.md) y [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32).

### Firmas Recuperables Secp256k1 

Las firmas recuperables se almacenan como el **`[R || S || V]`** de 65 bytes **donde**`V`** is 0 or 1 to allow quick public key recoverability. **`S`** must be in the lower half of the possible range to prevent signature malleability. Before signing a message, the message is hashed using sha256.

### Secp256k1 Example

Suppose Rick and Morty are setting up a secure communication channel. Morty creates a new public-private key pair.

Private Key: `0x98cb077f972feb0481f1d894f272c6a1e3c15e272a1658ff716444f465200070`

Public Key \(33-byte compressed\): `0x02b33c917f2f6103448d7feb42614037d05928433cb25e78f01a825aa829bb3c27`

Because of Rick’s infinite wisdom, he doesn’t trust himself with carrying around Morty’s public key, so he only asks for Morty’s address. Morty follows the instructions, SHA256’s his public key, and then ripemd160’s that result to produce an address.

SHA256\(Public Key\): `0x28d7670d71667e93ff586f664937f52828e6290068fa2a37782045bffa7b0d2f`

Address: `0xe8777f38c88ca153a6fdc25942176d2bf5491b89`

Morty is quite confused because a public key should be safe to be public knowledge. Rick belches and explains that hashing the public key protects the private key owner from potential future security flaws in elliptic curve cryptography. In the event cryptography is broken and a private key can be derived from a public key, users can transfer their funds to an address that has never signed a transaction before, preventing their funds from being compromised by an attacker. This enables coin owners to be protected while the cryptography is upgraded across the clients.

Later, once Morty has learned more about Rick’s backstory, Morty attempts to send Rick a message. Morty knows that Rick will only read the message if he can verify it was from him, so he signs the message with his private key.

Message: `0x68656c702049276d207472617070656420696e206120636f6d7075746572`

Message Hash: `0x912800c29d554fb9cdce579c0abba991165bbbc8bfec9622481d01e0b3e4b7da`

Message Signature: `0xb52aa0535c5c48268d843bd65395623d2462016325a86f09420c81f142578e121d11bd368b88ca6de4179a007e6abe0e8d0be1a6a4485def8f9e02957d3d72da01`

Morty was never seen again.

## Signed Messages

A standard for interoperable generic signed messages based on the Bitcoin Script format and Ethereum format.

```text
sign(sha256(length(prefix) + prefix + length(message) + message))
```

The prefix is simply the string `\x1AAvalanche Signed Message:\n`, where `0x1A` is the length of the prefix text and `length(message)` is an [integer](serialization-primitives.md#integer) of the message size.

### Gantt Pre-image Specification

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

### Example

As an example we will sign the message "Through consensus to the stars"

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

After hashing with `sha256` and signing the pre-image we return the value [cb58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) encoded: `4Eb2zAHF4JjZFJmp4usSokTGqq9mEGwVMY2WZzzCmu657SNFZhndsiS8TvL32n3bexd8emUwiXs8XqKjhqzvoRFvghnvSN`. Here's an example using the [Avalanche Web Wallet](https://wallet.avax.network/wallet/advanced).

![Sign message](../../.gitbook/assets/sign-message.png)

## Cryptography in Ethereum Virtual Machine

Avalanche nodes support the full Ethereum Virtual Machine \(EVM\) and precisely duplicate all of the cryptographic constructs used in Ethereum. This includes the Keccak hash function and the other mechanisms used for cryptographic security in the EVM.

## Cryptography in Other Virtual Machines

Since Avalanche is an extensible platform, we expect that people will add additional cryptographic primitives to the system over time.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTM3MzAwNTU4OSwtMTU2NzM1MzQzOF19
-->