[avalanche](../README.md) › [API-EVM-KeyChain](../modules/api_evm_keychain.md) › [KeyPair](api_evm_keychain.keypair.md)

# Class: KeyPair

Class for representing a private and public keypair on an AVM Chain.

## Hierarchy

  ↳ [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md)

  ↳ **KeyPair**

## Index

### Constructors

* [constructor](api_evm_keychain.keypair.md#constructor)

### Properties

* [chainID](api_evm_keychain.keypair.md#protected-chainid)
* [hrp](api_evm_keychain.keypair.md#protected-hrp)
* [keypair](api_evm_keychain.keypair.md#protected-keypair)
* [privk](api_evm_keychain.keypair.md#protected-privk)
* [pubk](api_evm_keychain.keypair.md#protected-pubk)

### Methods

* [clone](api_evm_keychain.keypair.md#clone)
* [create](api_evm_keychain.keypair.md#create)
* [generateKey](api_evm_keychain.keypair.md#generatekey)
* [getAddress](api_evm_keychain.keypair.md#getaddress)
* [getAddressString](api_evm_keychain.keypair.md#getaddressstring)
* [getChainID](api_evm_keychain.keypair.md#getchainid)
* [getHRP](api_evm_keychain.keypair.md#gethrp)
* [getPrivateKey](api_evm_keychain.keypair.md#getprivatekey)
* [getPrivateKeyString](api_evm_keychain.keypair.md#getprivatekeystring)
* [getPublicKey](api_evm_keychain.keypair.md#getpublickey)
* [getPublicKeyString](api_evm_keychain.keypair.md#getpublickeystring)
* [importKey](api_evm_keychain.keypair.md#importkey)
* [recover](api_evm_keychain.keypair.md#recover)
* [setChainID](api_evm_keychain.keypair.md#setchainid)
* [setHRP](api_evm_keychain.keypair.md#sethrp)
* [sign](api_evm_keychain.keypair.md#sign)
* [verify](api_evm_keychain.keypair.md#verify)
* [addressFromPublicKey](api_evm_keychain.keypair.md#static-addressfrompublickey)

## Constructors

###  constructor

\+ **new KeyPair**(`hrp`: string, `chainID`: string): *[KeyPair](api_evm_keychain.keypair.md)*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[constructor](common_secp256k1keychain.secp256k1keypair.md#constructor)*

*Defined in [src/common/secp256k1.ts:253](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L253)*

**Parameters:**

Name | Type |
------ | ------ |
`hrp` | string |
`chainID` | string |

**Returns:** *[KeyPair](api_evm_keychain.keypair.md)*

## Properties

### `Protected` chainID

• **chainID**: *string* = ""

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[chainID](common_secp256k1keychain.secp256k1keypair.md#protected-chainid)*

*Defined in [src/common/secp256k1.ts:45](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L45)*

___

### `Protected` hrp

• **hrp**: *string* = ""

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[hrp](common_secp256k1keychain.secp256k1keypair.md#protected-hrp)*

*Defined in [src/common/secp256k1.ts:46](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L46)*

___

### `Protected` keypair

• **keypair**: *elliptic.ec.KeyPair*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[keypair](common_secp256k1keychain.secp256k1keypair.md#protected-keypair)*

*Defined in [src/common/secp256k1.ts:44](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L44)*

___

### `Protected` privk

• **privk**: *Buffer*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[privk](common_keychain.standardkeypair.md#protected-privk)*

*Defined in [src/common/keychain.ts:14](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L14)*

___

### `Protected` pubk

• **pubk**: *Buffer*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[pubk](common_keychain.standardkeypair.md#protected-pubk)*

*Defined in [src/common/keychain.ts:13](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L13)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[clone](common_keychain.standardkeypair.md#abstract-clone)*

*Defined in [src/apis/evm/keychain.ts:21](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/keychain.ts#L21)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[create](common_keychain.standardkeypair.md#abstract-create)*

*Defined in [src/apis/evm/keychain.ts:27](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/keychain.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  generateKey

▸ **generateKey**(): *void*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[generateKey](common_secp256k1keychain.secp256k1keypair.md#generatekey)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[generateKey](common_keychain.standardkeypair.md#abstract-generatekey)*

*Defined in [src/common/secp256k1.ts:68](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L68)*

Generates a new keypair.

**Returns:** *void*

___

###  getAddress

▸ **getAddress**(): *Buffer*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getAddress](common_secp256k1keychain.secp256k1keypair.md#getaddress)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getAddress](common_keychain.standardkeypair.md#abstract-getaddress)*

*Defined in [src/common/secp256k1.ts:112](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L112)*

Returns the address as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) representation of the address

___

###  getAddressString

▸ **getAddressString**(): *string*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getAddressString](common_secp256k1keychain.secp256k1keypair.md#getaddressstring)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getAddressString](common_keychain.standardkeypair.md#abstract-getaddressstring)*

*Defined in [src/common/secp256k1.ts:121](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L121)*

Returns the address's string representation.

**Returns:** *string*

A string representation of the address

___

###  getChainID

▸ **getChainID**(): *string*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getChainID](common_secp256k1keychain.secp256k1keypair.md#getchainid)*

*Defined in [src/common/secp256k1.ts:224](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L224)*

Returns the chainID associated with this key.

**Returns:** *string*

The [KeyPair](api_evm_keychain.keypair.md)'s chainID

___

###  getHRP

▸ **getHRP**(): *string*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getHRP](common_secp256k1keychain.secp256k1keypair.md#gethrp)*

*Defined in [src/common/secp256k1.ts:242](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L242)*

Returns the Human-Readable-Part of the network associated with this key.

**Returns:** *string*

The [KeyPair](api_evm_keychain.keypair.md)'s Human-Readable-Part of the network's Bech32 addressing scheme

___

###  getPrivateKey

▸ **getPrivateKey**(): *Buffer*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[getPrivateKey](common_keychain.standardkeypair.md#getprivatekey)*

*Defined in [src/common/keychain.ts:69](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L69)*

Returns a reference to the private key.

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) containing the private key

___

###  getPrivateKeyString

▸ **getPrivateKeyString**(): *string*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getPrivateKeyString](common_secp256k1keychain.secp256k1keypair.md#getprivatekeystring)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getPrivateKeyString](common_keychain.standardkeypair.md#abstract-getprivatekeystring)*

*Defined in [src/common/secp256k1.ts:160](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L160)*

Returns a string representation of the private key.

**Returns:** *string*

A cb58 serialized string representation of the private key

___

###  getPublicKey

▸ **getPublicKey**(): *Buffer*

*Inherited from [StandardKeyPair](common_keychain.standardkeypair.md).[getPublicKey](common_keychain.standardkeypair.md#getpublickey)*

*Defined in [src/common/keychain.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L78)*

Returns a reference to the public key.

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) containing the public key

___

###  getPublicKeyString

▸ **getPublicKeyString**(): *string*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getPublicKeyString](common_secp256k1keychain.secp256k1keypair.md#getpublickeystring)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getPublicKeyString](common_keychain.standardkeypair.md#abstract-getpublickeystring)*

*Defined in [src/common/secp256k1.ts:169](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L169)*

Returns the public key.

**Returns:** *string*

A cb58 serialized string representation of the public key

___

###  importKey

▸ **importKey**(`privk`: Buffer): *boolean*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[importKey](common_secp256k1keychain.secp256k1keypair.md#importkey)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[importKey](common_keychain.standardkeypair.md#abstract-importkey)*

*Defined in [src/common/secp256k1.ts:89](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L89)*

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

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[recover](common_secp256k1keychain.secp256k1keypair.md#recover)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[recover](common_keychain.standardkeypair.md#abstract-recover)*

*Defined in [src/common/secp256k1.ts:213](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L213)*

Recovers the public key of a message signer from a message and its associated signature.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | The message that's signed |
`sig` | Buffer | The signature that's signed on the message  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) containing the public key of the signer

___

###  setChainID

▸ **setChainID**(`chainID`: string): *void*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[setChainID](common_secp256k1keychain.secp256k1keypair.md#setchainid)*

*Defined in [src/common/secp256k1.ts:233](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L233)*

Sets the the chainID associated with this key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chainID` | string | String for the chainID  |

**Returns:** *void*

___

###  setHRP

▸ **setHRP**(`hrp`: string): *void*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[setHRP](common_secp256k1keychain.secp256k1keypair.md#sethrp)*

*Defined in [src/common/secp256k1.ts:251](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L251)*

Sets the the Human-Readable-Part of the network associated with this key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`hrp` | string | String for the Human-Readable-Part of Bech32 addresses  |

**Returns:** *void*

___

###  sign

▸ **sign**(`msg`: Buffer): *Buffer*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[sign](common_secp256k1keychain.secp256k1keypair.md#sign)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[sign](common_keychain.standardkeypair.md#abstract-sign)*

*Defined in [src/common/secp256k1.ts:180](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L180)*

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

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[verify](common_secp256k1keychain.secp256k1keypair.md#verify)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[verify](common_keychain.standardkeypair.md#abstract-verify)*

*Defined in [src/common/secp256k1.ts:200](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L200)*

Verifies that the private key associated with the provided public key produces the signature associated with the given message.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | The message associated with the signature |
`sig` | Buffer | The signature of the signed message  |

**Returns:** *boolean*

True on success, false on failure

___

### `Static` addressFromPublicKey

▸ **addressFromPublicKey**(`pubk`: Buffer): *Buffer*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[addressFromPublicKey](common_secp256k1keychain.secp256k1keypair.md#static-addressfrompublickey)*

*Defined in [src/common/secp256k1.ts:134](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L134)*

Returns an address given a public key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pubk` | Buffer | A [Buffer](https://github.com/feross/buffer) representing the public key  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) for the address of the public key.
