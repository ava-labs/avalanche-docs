[avalanche](../README.md) › [Common-KeyChain](../modules/common_keychain.md) › [StandardKeyChain](common_keychain.standardkeychain.md)

# Class: StandardKeyChain ‹**KPClass**›

Class for representing a key chain in Avalanche.
All endpoints that need key chains should extend on this class.

## Type parameters

▪ **KPClass**: *[StandardKeyPair](common_keychain.standardkeypair.md)*

extending [StandardKeyPair](common_keychain.standardkeypair.md) which is used as the key in [StandardKeyChain](common_keychain.standardkeychain.md)

## Hierarchy

* **StandardKeyChain**

  ↳ [SECP256k1KeyChain](common_secp256k1keychain.secp256k1keychain.md)

## Index

### Properties

* [importKey](common_keychain.standardkeychain.md#importkey)
* [keys](common_keychain.standardkeychain.md#protected-keys)
* [makeKey](common_keychain.standardkeychain.md#makekey)

### Methods

* [addKey](common_keychain.standardkeychain.md#addkey)
* [clone](common_keychain.standardkeychain.md#abstract-clone)
* [create](common_keychain.standardkeychain.md#abstract-create)
* [getAddressStrings](common_keychain.standardkeychain.md#getaddressstrings)
* [getAddresses](common_keychain.standardkeychain.md#getaddresses)
* [getKey](common_keychain.standardkeychain.md#getkey)
* [hasKey](common_keychain.standardkeychain.md#haskey)
* [removeKey](common_keychain.standardkeychain.md#removekey)
* [union](common_keychain.standardkeychain.md#abstract-union)

## Properties

###  importKey

• **importKey**: *function*

*Defined in [src/common/keychain.ts:138](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L138)*

Given a private key, makes a new [StandardKeyPair](common_keychain.standardkeypair.md), returns the address.

**`param`** A [Buffer](https://github.com/feross/buffer) representing the private key

**`returns`** A new [StandardKeyPair](common_keychain.standardkeypair.md)

#### Type declaration:

▸ (`privk`: Buffer): *KPClass*

**Parameters:**

Name | Type |
------ | ------ |
`privk` | Buffer |

___

### `Protected` keys

• **keys**: *object*

*Defined in [src/common/keychain.ts:122](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L122)*

#### Type declaration:

* \[ **address**: *string*\]: KPClass

___

###  makeKey

• **makeKey**: *function*

*Defined in [src/common/keychain.ts:129](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L129)*

Makes a new [StandardKeyPair](common_keychain.standardkeypair.md), returns the address.

**`returns`** Address of the new [StandardKeyPair](common_keychain.standardkeypair.md)

#### Type declaration:

▸ (): *KPClass*

## Methods

###  addKey

▸ **addKey**(`newKey`: KPClass): *void*

*Defined in [src/common/keychain.ts:162](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L162)*

Adds the key pair to the list of the keys managed in the [StandardKeyChain](common_keychain.standardkeychain.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newKey` | KPClass | A key pair of the appropriate class to be added to the [StandardKeyChain](common_keychain.standardkeychain.md)  |

**Returns:** *void*

___

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/keychain.ts:209](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L209)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/keychain.ts:207](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  getAddressStrings

▸ **getAddressStrings**(): *string[]*

*Defined in [src/common/keychain.ts:154](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L154)*

Gets an array of addresses stored in the [StandardKeyChain](common_keychain.standardkeychain.md).

**Returns:** *string[]*

An array of string representations of the addresses

___

###  getAddresses

▸ **getAddresses**(): *Buffer[]*

*Defined in [src/common/keychain.ts:146](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L146)*

Gets an array of addresses stored in the [StandardKeyChain](common_keychain.standardkeychain.md).

**Returns:** *Buffer[]*

An array of [Buffer](https://github.com/feross/buffer)  representations
of the addresses

___

###  getKey

▸ **getKey**(`address`: Buffer): *KPClass*

*Defined in [src/common/keychain.ts:205](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L205)*

Returns the [StandardKeyPair](common_keychain.standardkeypair.md) listed under the provided address

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | Buffer | The [Buffer](https://github.com/feross/buffer) of the address to retrieve from the keys database  |

**Returns:** *KPClass*

A reference to the [StandardKeyPair](common_keychain.standardkeypair.md) in the keys database

___

###  hasKey

▸ **hasKey**(`address`: Buffer): *boolean*

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

▸ **removeKey**(`key`: KPClass | Buffer): *boolean*

*Defined in [src/common/keychain.ts:174](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L174)*

Removes the key pair from the list of they keys managed in the [StandardKeyChain](common_keychain.standardkeychain.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | KPClass &#124; Buffer | A [Buffer](https://github.com/feross/buffer) for the address or KPClass to remove  |

**Returns:** *boolean*

The boolean true if a key was removed.

___

### `Abstract` union

▸ **union**(`kc`: this): *this*

*Defined in [src/common/keychain.ts:211](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/keychain.ts#L211)*

**Parameters:**

Name | Type |
------ | ------ |
`kc` | this |

**Returns:** *this*
