[avalanche](../README.md) › [Utils-Mnemonic](../modules/utils_mnemonic.md) › [Mnemonic](utils_mnemonic.mnemonic.md)

# Class: Mnemonic

BIP39 Mnemonic code for generating deterministic keys.

## Hierarchy

* **Mnemonic**

## Index

### Constructors

* [constructor](utils_mnemonic.mnemonic.md#private-constructor)

### Properties

* [wordlists](utils_mnemonic.mnemonic.md#protected-wordlists)
* [instance](utils_mnemonic.mnemonic.md#static-private-instance)

### Methods

* [entropyToMnemonic](utils_mnemonic.mnemonic.md#entropytomnemonic)
* [generateMnemonic](utils_mnemonic.mnemonic.md#generatemnemonic)
* [getDefaultWordlist](utils_mnemonic.mnemonic.md#getdefaultwordlist)
* [getWordlists](utils_mnemonic.mnemonic.md#getwordlists)
* [mnemonicToEntropy](utils_mnemonic.mnemonic.md#mnemonictoentropy)
* [mnemonicToSeed](utils_mnemonic.mnemonic.md#mnemonictoseed)
* [mnemonicToSeedSync](utils_mnemonic.mnemonic.md#mnemonictoseedsync)
* [setDefaultWordlist](utils_mnemonic.mnemonic.md#setdefaultwordlist)
* [validateMnemonic](utils_mnemonic.mnemonic.md#validatemnemonic)
* [getInstance](utils_mnemonic.mnemonic.md#static-getinstance)

## Constructors

### `Private` constructor

\+ **new Mnemonic**(): *[Mnemonic](utils_mnemonic.mnemonic.md)*

*Defined in [src/utils/mnemonic.ts:17](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L17)*

**Returns:** *[Mnemonic](utils_mnemonic.mnemonic.md)*

## Properties

### `Protected` wordlists

• **wordlists**: *string[]* = bip39.wordlists

*Defined in [src/utils/mnemonic.ts:19](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L19)*

___

### `Static` `Private` instance

▪ **instance**: *[Mnemonic](utils_mnemonic.mnemonic.md)*

*Defined in [src/utils/mnemonic.ts:17](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L17)*

## Methods

###  entropyToMnemonic

▸ **entropyToMnemonic**(`entropy`: Buffer | string, `wordlist?`: string[]): *string*

*Defined in [src/utils/mnemonic.ts:93](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L93)*

Takes mnemonic and wordlist and returns buffer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`entropy` | Buffer &#124; string | the entropy as a [Buffer](https://github.com/feross/buffer) or as a string |
`wordlist?` | string[] | Optional, the wordlist as an array of strings  |

**Returns:** *string*

A string

___

###  generateMnemonic

▸ **generateMnemonic**(`strength?`: number, `rng?`: function, `wordlist?`: string[]): *string*

*Defined in [src/utils/mnemonic.ts:142](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L142)*

Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 256-bits of entropy

**Parameters:**

▪`Optional`  **strength**: *number*

Optional the strength as a number

▪`Optional`  **rng**: *function*

Optional the random number generator. Defaults to crypto.randomBytes

▸ (`size`: number): *Buffer*

**Parameters:**

Name | Type |
------ | ------ |
`size` | number |

▪`Optional`  **wordlist**: *string[]*

Optional

**Returns:** *string*

___

###  getDefaultWordlist

▸ **getDefaultWordlist**(): *string*

*Defined in [src/utils/mnemonic.ts:130](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L130)*

Returns the language of the default word list

**Returns:** *string*

A string

___

###  getWordlists

▸ **getWordlists**(`language?`: string): *string[] | Wordlist*

*Defined in [src/utils/mnemonic.ts:38](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L38)*

Return wordlists

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`language?` | string | a string specifying the language  |

**Returns:** *string[] | Wordlist*

A [[Wordlist]] object or array of strings

___

###  mnemonicToEntropy

▸ **mnemonicToEntropy**(`mnemonic`: string, `wordlist?`: string[]): *string*

*Defined in [src/utils/mnemonic.ts:78](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L78)*

Takes mnemonic and wordlist and returns buffer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mnemonic` | string | the mnemonic as a string |
`wordlist?` | string[] | Optional the wordlist as an array of strings  |

**Returns:** *string*

A string

___

###  mnemonicToSeed

▸ **mnemonicToSeed**(`mnemonic`: string, `password`: string): *Promise‹Buffer›*

*Defined in [src/utils/mnemonic.ts:66](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L66)*

Asynchronously takes mnemonic and password and returns Promise<[Buffer](https://github.com/feross/buffer)>

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mnemonic` | string | the mnemonic as a string |
`password` | string | the password as a string  |

**Returns:** *Promise‹Buffer›*

A [Buffer](https://github.com/feross/buffer)

___

###  mnemonicToSeedSync

▸ **mnemonicToSeedSync**(`mnemonic`: string, `password`: string): *Buffer*

*Defined in [src/utils/mnemonic.ts:54](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L54)*

Synchronously takes mnemonic and password and returns [Buffer](https://github.com/feross/buffer)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mnemonic` | string | the mnemonic as a string |
`password` | string | the password as a string  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer)

___

###  setDefaultWordlist

▸ **setDefaultWordlist**(`language`: string): *void*

*Defined in [src/utils/mnemonic.ts:121](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L121)*

Sets the default word list

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`language` | string | the language as a string   |

**Returns:** *void*

___

###  validateMnemonic

▸ **validateMnemonic**(`mnemonic`: string, `wordlist?`: string[]): *string*

*Defined in [src/utils/mnemonic.ts:108](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L108)*

Validates a mnemonic
11*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mnemonic` | string | the mnemonic as a string |
`wordlist?` | string[] | Optional the wordlist as an array of strings  |

**Returns:** *string*

A string

___

### `Static` getInstance

▸ **getInstance**(): *[Mnemonic](utils_mnemonic.mnemonic.md)*

*Defined in [src/utils/mnemonic.ts:24](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/mnemonic.ts#L24)*

Retrieves the Mnemonic singleton.

**Returns:** *[Mnemonic](utils_mnemonic.mnemonic.md)*
