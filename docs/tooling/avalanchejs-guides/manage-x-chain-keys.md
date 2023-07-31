---
tags: [Tooling, AvalancheJS]
description: AvalancheJS is a JavaScript Library for interfacing with the Avalanche platform. It is built using TypeScript and intended to support both browser and Node.js. The AvalancheJS library allows one to issue commands to the Avalanche node APIs.
pagination_label: Manage X-Chain Keys
sidebar_label: Manage X-Chain Keys
sidebar_position: 6
---
# Manage X-Chain Keys

AvalancheJS comes with its own AVM Keychain. This KeyChain is used in the
functions of the API, enabling them to sign using keys it's registered. The
first step in this process is to create an instance of AvalancheJS connected to
our Avalanche platform endpoint of choice.

```ts
import { Avalanche, BinTools, Buffer, BN } from "avalanche"

let bintools = BinTools.getInstance()

let myNetworkID = 12345 //default is 1, we want to override that for our local network
let myBlockchainID = "GJABrZ9A6UQFpwjPU8MDxDd8vuyRoDVeDAXc694wJ5t3zEkhU" // The X-Chain blockchainID on this network
let ava = new avalanche.Avalanche(
  "localhost",
  9650,
  "http",
  myNetworkID,
  myBlockchainID
)
let xchain = ava.XChain() //returns a reference to the X-Chain used by AvalancheJS
```

## Accessing the Keychain

The KeyChain is accessed through the X-Chain and can be referenced directly or through a reference variable.

```ts
let myKeychain = xchain.keyChain()
```

This exposes the instance of the class AVMKeyChain which is created when the
X-Chain API is created. At present, this supports secp256k1 curve for ECDSA key
pairs.

## Creating X-Chain Key Pairs

The KeyChain has the ability to create new Keypairs for you and return the
address associated with the key pair.

```ts
let newAddress1 = myKeychain.makeKey() //returns a Buffer for the address
```

You may also import your existing private key into the KeyChain using either a Buffer…

```ts
let mypk = bintools.avaDeserialize(
  "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"
) //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk) //returns a Buffer for the address
```

… or an Avalanche serialized string works, too:

```ts
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"
let newAddress2 = myKeychain.importKey(mypk) //returns a Buffer for the address
```

## Working with Keychains

The X-Chain's KeyChain has standardized key management capabilities. The
following functions are available on any KeyChain that implements this
interface.

```text
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## Working with Keypairs

The X-Chain's keypair has standardized keypair functionality. The following
operations are available on any keypair that implements this interface.

```ts
let address = keypair.getAddress() //returns Buffer
let addressString = keypair.getAddressString() //returns string

let pubk = keypair.getPublicKey() //returns Buffer
let pubkstr = keypair.getPublicKeyString() //returns a CB58 encoded string

let privk = keypair.getPrivateKey() //returns Buffer
let privkstr = keypair.getPrivateKeyString() //returns a CB58 encoded string

keypair.generateKey() //creates a new random KeyPair

let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"
let successul = keypair.importKey(mypk) //returns boolean if private key imported successfully

let message = Buffer.from("Wubalubadubdub")
let signature = keypair.sign(message) //returns a Buffer with the signature

let signerPubk = keypair.recover(message, signature)
let isValid = keypair.verify(message, signature) //returns a boolean
```

## Encode Bech32 Addresses

The X-Chain and the P-Chain use Bech32 to encode addresses. Note, the C-Chain
also uses Bech32 to encode addresses for importing and exporting assets however
the EVM, in general, uses hex encoding for addresses. Ex:
`0x46f3e64E4e3f5a46Eaf5c292301c6174B9B646Bf`.

Each Bech32 address is composed of the following components

1. A Human-Readable Part (HRP).
2. The number `1` is a separator (the last digit `1` seen is considered the separator).
3. Base-32 encoded string for the data part of the address (the 20-byte address itself).
4. A 6-character base-32 encoded error correction code using the BCH algorithm.

For example the following Bech32 address,
`X-avax19rknw8l0grnfunjrzwxlxync6zrlu33y2jxhrg`, is composed like so:

1. HRP: `avax`
2. Separator: `1`
3. Address: `9rknw8l0grnfunjrzwxlxync6zrlu33y`
4. Checksum: `2jxhrg`

Depending on the `networkID` which is passed in when instantiating `Avalanche`
the encoded addresses will have a distinctive HRP per each network. AvalancheJS
also has address encoding for past networks `cascade`, `denali`, and `everest`.

- 0 - X-`custom`19rknw8l0grnfunjrzwxlxync6zrlu33yeg5dya
- 1 - X-`avax`19rknw8l0grnfunjrzwxlxync6zrlu33y2jxhrg
- 2 - X-`cascade`19rknw8l0grnfunjrzwxlxync6zrlu33ypmtvnh
- 3 - X-`denali`19rknw8l0grnfunjrzwxlxync6zrlu33yhc357h
- 4 - X-`everest`19rknw8l0grnfunjrzwxlxync6zrlu33yn44wty
- 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h
- 1337 - X-`custom`19rknw8l0grnfunjrzwxlxync6zrlu33yeg5dya
- 12345 - X-`local`19rknw8l0grnfunjrzwxlxync6zrlu33ynpm3qq

Here's the mapping of `networkID` to bech32 HRP.

```ts
export const NetworkIDToHRP = {
  0: "custom",
  1: "avax",
  2: "cascade",
  3: "denali",
  4: "everest",
  5: "fuji",
  1337: "custom",
  12345: "local",
}
```

Change the HRP of the bech32 address by passing in a different networkID when instantiating `Avalanche`.

```ts
// mainnet
const networkID = 1
const avalanche = new Avalanche(undefined, undefined, undefined, networkID)

// [ 'X-avax1j2j0vzttatv73gr7j4tnd7rp4el3ngcyjy0pre' ]
// [ 'X-avax19rknw8l0grnfunjrzwxlxync6zrlu33y2jxhrg' ]
```

```ts
// fuji
const networkID = 5
const avalanche = new Avalanche(undefined, undefined, undefined, networkID)

// [ 'X-fuji1j2j0vzttatv73gr7j4tnd7rp4el3ngcy7kt70x' ]
// [ 'X-fuji19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h' ]
```

```ts
// custom
const networkID = 1337 // also networkID = 0
const avalanche = new Avalanche(undefined, undefined, undefined, networkID)

// [ 'X-custom1j2j0vzttatv73gr7j4tnd7rp4el3ngcyp7amyv' ]
// [ 'X-custom19rknw8l0grnfunjrzwxlxync6zrlu33yeg5dya' ]
```

```ts
// mainnet
const networkID = 12345
const avalanche = new Avalanche(undefined, undefined, undefined, networkID)

// [ 'X-local1j2j0vzttatv73gr7j4tnd7rp4el3ngcythj8q3' ]
// [ 'X-local19rknw8l0grnfunjrzwxlxync6zrlu33ynpm3qq' ]
```
