[avalanche](../README.md) › [Common-SECP256k1KeyChain](../modules/common_secp256k1keychain.md) › [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md)

# Class: SECP256k1KeyPair

Class for representing a private and public keypair on the Platform Chain.

## Hierarchy

* [StandardKeyPair](common_keychain.standardkeypair.md)

  ↳ **SECP256k1KeyPair**

  ↳ [KeyPair](api_avm_keychain.keypair.md)

  ↳ [KeyPair](api_platformvm_keychain.keypair.md)

## Index

### Constructors

* [constructor](common_secp256k1keychain.secp256k1keypair.md#constructor)

### Properties

* [getAddressString](common_secp256k1keychain.secp256k1keypair.md#getaddressstring)
* [keypair](common_secp256k1keychain.secp256k1keypair.md#protected-keypair)
* [privk](common_secp256k1keychain.secp256k1keypair.md#protected-privk)
* [pubk](common_secp256k1keychain.secp256k1keypair.md#protected-pubk)

### Methods

* [addressFromPublicKey](common_secp256k1keychain.secp256k1keypair.md#addressfrompublickey)
* [clone](common_secp256k1keychain.secp256k1keypair.md#abstract-clone)
* [create](common_secp256k1keychain.secp256k1keypair.md#abstract-create)
* [generateKey](common_secp256k1keychain.secp256k1keypair.md#generatekey)
* [getAddress](common_secp256k1keychain.secp256k1keypair.md#getaddress)
* [getPrivateKey](common_secp256k1keychain.secp256k1keypair.md#getprivatekey)
* [getPrivateKeyString](common_secp256k1keychain.secp256k1keypair.md#getprivatekeystring)
* [getPublicKey](common_secp256k1keychain.secp256k1keypair.md#getpublickey)
* [getPublicKeyString](common_secp256k1keychain.secp256k1keypair.md#getpublickeystring)
* [importKey](common_secp256k1keychain.secp256k1keypair.md#importkey)
* [recover](common_secp256k1keychain.secp256k1keypair.md#recover)
* [sign](common_secp256k1keychain.secp256k1keypair.md#sign)
* [verify](common_secp256k1keychain.secp256k1keypair.md#verify)

## Constructors

###  constructor

\+ **new SECP256k1KeyPair**(): *[SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md)*

*Defined in [src/common/secp256k1.ts:182](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L182)*

Class for representing a private and public keypair in Avalanche PlatformVM.

**Returns:** *[SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md)*

## Properties

###  getAddressString

• **getAddressString**: *function*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getAddressString](common_keychain.standardkeypair.md#getaddressstring)*

*Defined in [src/common/secp256k1.ts:98](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L98)*

Returns the address's string representation.

**`returns`** A string representation of the address

#### Type declaration:

▸ (): *string*

___

### `Protected` keypair

• **keypair**: *elliptic.ec.KeyPair*

*Defined in [src/common/secp256k1.ts:41](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L41)*

___

### `Protected` privk

• **privk**: *Buffer*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[privk](common_keychain.standardkeypair.md#protected-privk)*

*Defined in [src/common/keychain.ts:14](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/keychain.ts#L14)*

___

### `Protected` pubk

• **pubk**: *Buffer*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[pubk](common_keychain.standardkeypair.md#protected-pubk)*

*Defined in [src/common/keychain.ts:13](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/keychain.ts#L13)*

## Methods

###  addressFromPublicKey

▸ **addressFromPublicKey**(`pubk`: Buffer): *Buffer*

*Defined in [src/common/secp256k1.ts:107](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L107)*

Returns an address given a public key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pubk` | Buffer | A [Buffer](https://github.com/feross/buffer) representing the public key  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) for the address of the public key.

___

### `Abstract` clone

▸ **clone**(): *this*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[clone](common_keychain.standardkeypair.md#abstract-clone)*

*Defined in [src/common/keychain.ts:108](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/keychain.ts#L108)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[create](common_keychain.standardkeypair.md#abstract-create)*

*Defined in [src/common/keychain.ts:106](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/keychain.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  generateKey

▸ **generateKey**(): *void*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[generateKey](common_keychain.standardkeypair.md#generatekey)*

*Defined in [src/common/secp256k1.ts:61](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L61)*

Generates a new keypair.

**Returns:** *void*

___

###  getAddress

▸ **getAddress**(): *Buffer*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getAddress](common_keychain.standardkeypair.md#getaddress)*

*Defined in [src/common/secp256k1.ts:89](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L89)*

Returns the address as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) representation of the address

___

###  getPrivateKey

▸ **getPrivateKey**(): *Buffer*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[getPrivateKey](common_keychain.standardkeypair.md#getprivatekey)*

*Defined in [src/common/keychain.ts:69](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/keychain.ts#L69)*

Returns a reference to the private key.

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) containing the private key

___

###  getPrivateKeyString

▸ **getPrivateKeyString**(): *string*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getPrivateKeyString](common_keychain.standardkeypair.md#getprivatekeystring)*

*Defined in [src/common/secp256k1.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L126)*

Returns a string representation of the private key.

**Returns:** *string*

A cb58 serialized string representation of the public key

___

###  getPublicKey

▸ **getPublicKey**(): *Buffer*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[getPublicKey](common_keychain.standardkeypair.md#getpublickey)*

*Defined in [src/common/keychain.ts:76](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/keychain.ts#L76)*

Returns a reference to the public key.

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) containing the public key

___

###  getPublicKeyString

▸ **getPublicKeyString**(): *string*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getPublicKeyString](common_keychain.standardkeypair.md#getpublickeystring)*

*Defined in [src/common/secp256k1.ts:135](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L135)*

Returns the public key.

**Returns:** *string*

A cb58 serialized string representation of the public key

___

###  importKey

▸ **importKey**(`privk`: Buffer): *boolean*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[importKey](common_keychain.standardkeypair.md#importkey)*

*Defined in [src/common/secp256k1.ts:76](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L76)*

Imports a private key and generates the appropriate public key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privk` | Buffer | A [Buffer](https://github.com/feross/buffer) representing the private key  |

**Returns:** *boolean*

true on success, false on failure

___

###  recover

▸ **recover**(`msg`: Buffer, `sig`: Buffer): *Buffer*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[recover](common_keychain.standardkeypair.md#recover)*

*Defined in [src/common/secp256k1.ts:178](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L178)*

Recovers the public key of a message signer from a message and its associated signature.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | The message that's signed |
`sig` | Buffer | The signature that's signed on the message  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) containing the public key of the signer

___

###  sign

▸ **sign**(`msg`: Buffer): *Buffer*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[sign](common_keychain.standardkeypair.md#sign)*

*Defined in [src/common/secp256k1.ts:147](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L147)*

Takes a message, signs it, and returns the signature.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | The message to sign, be sure to hash first if expected  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) containing the signature

___

###  verify

▸ **verify**(`msg`: Buffer, `sig`: Buffer): *boolean*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[verify](common_keychain.standardkeypair.md#verify)*

*Defined in [src/common/secp256k1.ts:165](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L165)*

Verifies that the private key associated with the provided public key produces the signature associated with the given message.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | The message associated with the signature |
`sig` | Buffer | The signature of the signed message  |

**Returns:** *boolean*

True on success, false on failure
