[avalanche](../README.md) › [Common-SECP256k1KeyChain](../modules/common_secp256k1keychain.md) › [SECP256k1KeyChain](common_secp256k1keychain.secp256k1keychain.md)

# Class: SECP256k1KeyChain ‹**SECPKPClass**›

Class for representing a key chain in Avalanche.

**`typeparam`** Class extending [StandardKeyPair](common_keychain.standardkeypair.md) which is used as the key in [SECP256k1KeyChain](common_secp256k1keychain.secp256k1keychain.md)

## Type parameters

▪ **SECPKPClass**: *[SECP256k1KeyPair](common_secp256k1keychain.secp256k1keypair.md)*

## Hierarchy

* [StandardKeyChain](common_keychain.standardkeychain.md)‹SECPKPClass›

  ↳ **SECP256k1KeyChain**

  ↳ [KeyChain](api_evm_keychain.keychain.md)

  ↳ [KeyChain](api_avm_keychain.keychain.md)

  ↳ [KeyChain](api_platformvm_keychain.keychain.md)

## Index

### Properties

* [importKey](common_secp256k1keychain.secp256k1keychain.md#importkey)
* [keys](common_secp256k1keychain.secp256k1keychain.md#protected-keys)
* [makeKey](common_secp256k1keychain.secp256k1keychain.md#makekey)

### Methods

* [addKey](common_secp256k1keychain.secp256k1keychain.md#addkey)
* [clone](common_secp256k1keychain.secp256k1keychain.md#abstract-clone)
* [create](common_secp256k1keychain.secp256k1keychain.md#abstract-create)
* [getAddressStrings](common_secp256k1keychain.secp256k1keychain.md#getaddressstrings)
* [getAddresses](common_secp256k1keychain.secp256k1keychain.md#getaddresses)
* [getKey](common_secp256k1keychain.secp256k1keychain.md#getkey)
* [hasKey](common_secp256k1keychain.secp256k1keychain.md#haskey)
* [removeKey](common_secp256k1keychain.secp256k1keychain.md#removekey)
* [union](common_secp256k1keychain.secp256k1keychain.md#abstract-union)

## Properties

###  importKey

• **importKey**: *function*

*Overrides [StandardKeyChain](common_keychain.standardkeychain.md).[importKey](common_keychain.standardkeychain.md#importkey)*

*Defined in [src/common/secp256k1.ts:289](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L289)*

Given a private key, makes a new key pair, returns the address.

**`param`** A [Buffer](https://github.com/feross/buffer) or cb58 serialized string representing the private key

**`returns`** Address of the new key pair

#### Type declaration:

▸ (`privk`: Buffer | string): *SECPKPClass*

**Parameters:**

Name | Type |
------ | ------ |
`privk` | Buffer &#124; string |

___

### `Protected` keys

• **keys**: *object*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[keys](common_keychain.standardkeychain.md#protected-keys)*

*Defined in [src/common/keychain.ts:122](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L122)*

#### Type declaration:

* \[ **address**: *string*\]: SECPKPClass

___

###  makeKey

• **makeKey**: *function*

*Overrides [StandardKeyChain](common_keychain.standardkeychain.md).[makeKey](common_keychain.standardkeychain.md#makekey)*

*Defined in [src/common/secp256k1.ts:276](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L276)*

Makes a new key pair, returns the address.

**`returns`** Address of the new key pair

#### Type declaration:

▸ (): *SECPKPClass*

## Methods

###  addKey

▸ **addKey**(`newKey`: SECPKPClass): *void*

*Overrides [StandardKeyChain](common_keychain.standardkeychain.md).[addKey](common_keychain.standardkeychain.md#addkey)*

*Defined in [src/common/secp256k1.ts:278](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/secp256k1.ts#L278)*

**Parameters:**

Name | Type |
------ | ------ |
`newKey` | SECPKPClass |

**Returns:** *void*

___

### `Abstract` clone

▸ **clone**(): *this*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[clone](common_keychain.standardkeychain.md#abstract-clone)*

*Defined in [src/common/keychain.ts:209](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L209)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[create](common_keychain.standardkeychain.md#abstract-create)*

*Defined in [src/common/keychain.ts:207](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L207)*

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

▸ **getKey**(`address`: Buffer): *SECPKPClass*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[getKey](common_keychain.standardkeychain.md#getkey)*

*Defined in [src/common/keychain.ts:205](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L205)*

Returns the [StandardKeyPair](common_keychain.standardkeypair.md) listed under the provided address

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | Buffer | The [Buffer](https://github.com/feross/buffer) of the address to retrieve from the keys database  |

**Returns:** *SECPKPClass*

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

###  removeKey

▸ **removeKey**(`key`: SECPKPClass | Buffer): *boolean*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[removeKey](common_keychain.standardkeychain.md#removekey)*

*Defined in [src/common/keychain.ts:174](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L174)*

Removes the key pair from the list of they keys managed in the [StandardKeyChain](common_keychain.standardkeychain.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | SECPKPClass &#124; Buffer | A [Buffer](https://github.com/feross/buffer) for the address or KPClass to remove  |

**Returns:** *boolean*

The boolean true if a key was removed.

___

### `Abstract` union

▸ **union**(`kc`: this): *this*

*Inherited from [StandardKeyChain](common_keychain.standardkeychain.md).[union](common_keychain.standardkeychain.md#abstract-union)*

*Defined in [src/common/keychain.ts:211](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`kc` | this |

**Returns:** *this*
