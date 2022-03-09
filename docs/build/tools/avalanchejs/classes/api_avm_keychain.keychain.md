[avalanche](../README.md) › [API-AVM-KeyChain](../modules/api_avm_keychain.md) › [KeyChain](api_avm_keychain.keychain.md)

# Class: KeyChain

Class for representing a key chain in Avalanche.

**`typeparam`** Class extending [SECP256k1KeyChain](common_secp256k1keychain.secp256k1keychain.md) which is used as the key in [KeyChain](api_avm_keychain.keychain.md)

## Hierarchy

  ↳ [SECP256k1KeyChain](common_secp256k1keychain.secp256k1keychain.md)‹[KeyPair](api_avm_keychain.keypair.md)›

  ↳ **KeyChain**

## Index

### Constructors

* [constructor](api_avm_keychain.keychain.md#constructor)

### Properties

* [chainid](api_avm_keychain.keychain.md#chainid)
* [hrp](api_avm_keychain.keychain.md#hrp)
* [keys](api_avm_keychain.keychain.md#protected-keys)

### Methods

* [addKey](api_avm_keychain.keychain.md#addkey)
* [clone](api_avm_keychain.keychain.md#clone)
* [create](api_avm_keychain.keychain.md#create)
* [getAddressStrings](api_avm_keychain.keychain.md#getaddressstrings)
* [getAddresses](api_avm_keychain.keychain.md#getaddresses)
* [getKey](api_avm_keychain.keychain.md#getkey)
* [hasKey](api_avm_keychain.keychain.md#haskey)
* [importKey](api_avm_keychain.keychain.md#importkey)
* [makeKey](api_avm_keychain.keychain.md#makekey)
* [removeKey](api_avm_keychain.keychain.md#removekey)
* [union](api_avm_keychain.keychain.md#union)

## Constructors

###  constructor

\+ **new KeyChain**(`hrp`: string, `chainid`: string): *[KeyChain](api_avm_keychain.keychain.md)*

*Defined in [src/apis/avm/keychain.ts:102](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L102)*

Returns instance of KeyChain.

**Parameters:**

Name | Type |
------ | ------ |
`hrp` | string |
`chainid` | string |

**Returns:** *[KeyChain](api_avm_keychain.keychain.md)*

## Properties

###  chainid

• **chainid**: *string* = ""

*Defined in [src/apis/avm/keychain.ts:41](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L41)*

___

###  hrp

• **hrp**: *string* = ""

*Defined in [src/apis/avm/keychain.ts:40](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L40)*

___

### `Protected` keys

• **keys**: *object*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[keys](common_keychain.standardkeychain.md#protected-keys)*

*Defined in [src/common/keychain.ts:122](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L122)*

#### Type declaration:

* \[ **address**: *string*\]: [KeyPair](api_avm_keychain.keypair.md)

## Methods

###  addKey

▸ **addKey**(`newKey`: [KeyPair](api_avm_keychain.keypair.md)): *void*

*Overrides [SECP256k1KeyChain](common_secp256k1keychain.secp256k1keychain.md).[addKey](common_secp256k1keychain.secp256k1keychain.md#addkey)*

*Defined in [src/apis/avm/keychain.ts:54](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`newKey` | [KeyPair](api_avm_keychain.keypair.md) |

**Returns:** *void*

___

###  clone

▸ **clone**(): *this*

*Overrides [StandardKeyChain](common_keychain.standardkeychain.md).[clone](common_keychain.standardkeychain.md#abstract-clone)*

*Defined in [src/apis/avm/keychain.ts:88](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L88)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [StandardKeyChain](common_keychain.standardkeychain.md).[create](common_keychain.standardkeychain.md#abstract-create)*

*Defined in [src/apis/avm/keychain.ts:81](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  getAddressStrings

▸ **getAddressStrings**(): *string[]*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[getAddressStrings](common_keychain.standardkeychain.md#getaddressstrings)*

*Defined in [src/common/keychain.ts:154](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L154)*

Gets an array of addresses stored in the [StandardKeyChain](common_keychain.standardkeychain.md).

**Returns:** *string[]*

An array of string representations of the addresses

___

###  getAddresses

▸ **getAddresses**(): *Buffer[]*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[getAddresses](common_keychain.standardkeychain.md#getaddresses)*

*Defined in [src/common/keychain.ts:146](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L146)*

Gets an array of addresses stored in the [StandardKeyChain](common_keychain.standardkeychain.md).

**Returns:** *Buffer[]*

An array of [Buffer](https://github.com/feross/buffer)  representations
of the addresses

___

###  getKey

▸ **getKey**(`address`: Buffer): *[KeyPair](api_avm_keychain.keypair.md)*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[getKey](common_keychain.standardkeychain.md#getkey)*

*Defined in [src/common/keychain.ts:205](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L205)*

Returns the [StandardKeyPair](common_keychain.standardkeypair.md) listed under the provided address

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | Buffer | The [Buffer](https://github.com/feross/buffer) of the address to retrieve from the keys database  |

**Returns:** *[KeyPair](api_avm_keychain.keypair.md)*

A reference to the [StandardKeyPair](common_keychain.standardkeypair.md) in the keys database

___

###  hasKey

▸ **hasKey**(`address`: Buffer): *boolean*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[hasKey](common_keychain.standardkeychain.md#haskey)*

*Defined in [src/common/keychain.ts:195](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L195)*

Checks if there is a key associated with the provided address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | Buffer | The address to check for existence in the keys database  |

**Returns:** *boolean*

True on success, false if not found

___

###  importKey

▸ **importKey**(`privk`: Buffer | string): *[KeyPair](api_avm_keychain.keypair.md)*

*Overrides [SECP256k1KeyChain](common_secp256k1keychain.secp256k1keychain.md).[importKey](common_secp256k1keychain.secp256k1keychain.md#importkey)*

*Defined in [src/apis/avm/keychain.ts:66](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L66)*

Given a private key, makes a new key pair, returns the address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privk` | Buffer &#124; string | A [Buffer](https://github.com/feross/buffer) or cb58 serialized string representing the private key  |

**Returns:** *[KeyPair](api_avm_keychain.keypair.md)*

The new key pair

___

###  makeKey

▸ **makeKey**(): *[KeyPair](api_avm_keychain.keypair.md)*

*Overrides [SECP256k1KeyChain](common_secp256k1keychain.secp256k1keychain.md).[makeKey](common_secp256k1keychain.secp256k1keychain.md#makekey)*

*Defined in [src/apis/avm/keychain.ts:48](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L48)*

Makes a new key pair, returns the address.

**Returns:** *[KeyPair](api_avm_keychain.keypair.md)*

The new key pair

___

###  removeKey

▸ **removeKey**(`key`: [KeyPair](api_avm_keychain.keypair.md) | Buffer): *boolean*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[removeKey](common_keychain.standardkeychain.md#removekey)*

*Defined in [src/common/keychain.ts:174](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L174)*

Removes the key pair from the list of they keys managed in the [StandardKeyChain](common_keychain.standardkeychain.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | [KeyPair](api_avm_keychain.keypair.md) &#124; Buffer | A [Buffer](https://github.com/feross/buffer) for the address or KPClass to remove  |

**Returns:** *boolean*

The boolean true if a key was removed.

___

###  union

▸ **union**(`kc`: this): *this*

*Overrides [StandardKeyChain](common_keychain.standardkeychain.md).[union](common_keychain.standardkeychain.md#abstract-union)*

*Defined in [src/apis/avm/keychain.ts:96](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/keychain.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`kc` | this |

**Returns:** *this*
