[avalanche](../README.md) › [API-AVM-KeyChain](../modules/api_avm_keychain.md) › [KeyPair](api_avm_keychain.keypair.md)

# Class: KeyPair

Class for representing a private and public keypair on an AVM Chain.

## Hierarchy

  ↳ [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md)

  ↳ **KeyPair**

## Index

### Constructors

* [constructor](api_avm_keychain.keypair.md#constructor)

### Properties

* [chainid](api_avm_keychain.keypair.md#protected-chainid)
* [hrp](api_avm_keychain.keypair.md#protected-hrp)
* [keypair](api_avm_keychain.keypair.md#protected-keypair)
* [privk](api_avm_keychain.keypair.md#protected-privk)
* [pubk](api_avm_keychain.keypair.md#protected-pubk)

### Methods

* [addressFromPublicKey](api_avm_keychain.keypair.md#addressfrompublickey)
* [clone](api_avm_keychain.keypair.md#clone)
* [create](api_avm_keychain.keypair.md#create)
* [generateKey](api_avm_keychain.keypair.md#generatekey)
* [getAddress](api_avm_keychain.keypair.md#getaddress)
* [getAddressString](api_avm_keychain.keypair.md#getaddressstring)
* [getChainID](api_avm_keychain.keypair.md#getchainid)
* [getHRP](api_avm_keychain.keypair.md#gethrp)
* [getPrivateKey](api_avm_keychain.keypair.md#getprivatekey)
* [getPrivateKeyString](api_avm_keychain.keypair.md#getprivatekeystring)
* [getPublicKey](api_avm_keychain.keypair.md#getpublickey)
* [getPublicKeyString](api_avm_keychain.keypair.md#getpublickeystring)
* [importKey](api_avm_keychain.keypair.md#importkey)
* [recover](api_avm_keychain.keypair.md#recover)
* [setChainID](api_avm_keychain.keypair.md#setchainid)
* [setHRP](api_avm_keychain.keypair.md#sethrp)
* [sign](api_avm_keychain.keypair.md#sign)
* [verify](api_avm_keychain.keypair.md#verify)

## Constructors

###  constructor

\+ **new KeyPair**(`hrp`: string, `chainid`: string): *[KeyPair](api_avm_keychain.keypair.md)*

*Overrides [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[constructor](common_secp256k1keychain.secp256k1keypair.md#constructor)*

*Defined in [src/apis/avm/keychain.ts:77](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`hrp` | string |
`chainid` | string |

**Returns:** *[KeyPair](api_avm_keychain.keypair.md)*

## Properties

### `Protected` chainid

• **chainid**: *string* = ""

*Defined in [src/apis/avm/keychain.ts:20](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L20)*

___

### `Protected` hrp

• **hrp**: *string* = ""

*Defined in [src/apis/avm/keychain.ts:21](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L21)*

___

### `Protected` keypair

• **keypair**: *elliptic.ec.KeyPair*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[keypair](common_secp256k1keychain.secp256k1keypair.md#protected-keypair)*

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

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[addressFromPublicKey](common_secp256k1keychain.secp256k1keypair.md#addressfrompublickey)*

*Defined in [src/common/secp256k1.ts:107](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L107)*

Returns an address given a public key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pubk` | Buffer | A [Buffer](https://github.com/feross/buffer) representing the public key  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) for the address of the public key.

___

###  clone

▸ **clone**(): *this*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[clone](common_keychain.standardkeypair.md#abstract-clone)*

*Defined in [src/apis/avm/keychain.ts:66](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L66)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[create](common_keychain.standardkeypair.md#abstract-create)*

*Defined in [src/apis/avm/keychain.ts:72](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  generateKey

▸ **generateKey**(): *void*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[generateKey](common_secp256k1keychain.secp256k1keypair.md#generatekey)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[generateKey](common_keychain.standardkeypair.md#generatekey)*

*Defined in [src/common/secp256k1.ts:61](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L61)*

Generates a new keypair.

**Returns:** *void*

___

###  getAddress

▸ **getAddress**(): *Buffer*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getAddress](common_secp256k1keychain.secp256k1keypair.md#getaddress)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getAddress](common_keychain.standardkeypair.md#getaddress)*

*Defined in [src/common/secp256k1.ts:89](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L89)*

Returns the address as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) representation of the address

___

###  getAddressString

▸ **getAddressString**(): *string*

*Overrides [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getAddressString](common_secp256k1keychain.secp256k1keypair.md#getaddressstring)*

*Defined in [src/apis/avm/keychain.ts:28](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L28)*

Returns the address's string representation.

**Returns:** *string*

A string representation of the address

___

###  getChainID

▸ **getChainID**(): *string*

*Defined in [src/apis/avm/keychain.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L38)*

Returns the chainID associated with this key.

**Returns:** *string*

The [KeyPair](api_avm_keychain.keypair.md)'s chainID

___

###  getHRP

▸ **getHRP**(): *string*

*Defined in [src/apis/avm/keychain.ts:55](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L55)*

Returns the Human-Readable-Part of the network associated with this key.

**Returns:** *string*

The [KeyPair](api_avm_keychain.keypair.md)'s Human-Readable-Part of the network's Bech32 addressing scheme

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

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getPrivateKeyString](common_secp256k1keychain.secp256k1keypair.md#getprivatekeystring)*

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

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[getPublicKeyString](common_secp256k1keychain.secp256k1keypair.md#getpublickeystring)*

*Overrides [StandardKeyPair](common_keychain.standardkeypair.md).[getPublicKeyString](common_keychain.standardkeypair.md#getpublickeystring)*

*Defined in [src/common/secp256k1.ts:135](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/secp256k1.ts#L135)*

Returns the public key.

**Returns:** *string*

A cb58 serialized string representation of the public key

___

###  importKey

▸ **importKey**(`privk`: Buffer): *boolean*

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[importKey](common_secp256k1keychain.secp256k1keypair.md#importkey)*

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

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[recover](common_secp256k1keychain.secp256k1keypair.md#recover)*

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

###  setChainID

▸ **setChainID**(`chainid`: string): *void*

*Defined in [src/apis/avm/keychain.ts:45](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L45)*

Sets the the chainID associated with this key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chainid` | string | String for the chainID  |

**Returns:** *void*

___

###  setHRP

▸ **setHRP**(`hrp`: string): *void*

*Defined in [src/apis/avm/keychain.ts:62](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/keychain.ts#L62)*

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

*Inherited from [SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md).[verify](common_secp256k1keychain.secp256k1keypair.md#verify)*

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
