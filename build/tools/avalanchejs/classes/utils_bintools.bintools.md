[avalanche](../README.md) › [Utils-BinTools](../modules/utils_bintools.md) › [BinTools](utils_bintools.bintools.md)

# Class: BinTools

A class containing tools useful in interacting with binary data cross-platform using
nodejs & javascript.

This class should never be instantiated directly. Instead,
invoke the "BinTools.getInstance()" static * function to grab the singleton
instance of the tools.

Everything in this library uses
the [feross's Buffer class](https://github.com/feross/buffer).

```js
const bintools = BinTools.getInstance();
let b58str = bintools.bufferToB58(Buffer.from("Wubalubadubdub!"));
```

## Hierarchy

* **BinTools**

## Index

### Constructors

* [constructor](utils_bintools.bintools.md#private-constructor)

### Properties

* [b58](utils_bintools.bintools.md#private-b58)
* [instance](utils_bintools.bintools.md#static-private-instance)

### Methods

* [addChecksum](utils_bintools.bintools.md#addchecksum)
* [addressToString](utils_bintools.bintools.md#addresstostring)
* [b58ToBuffer](utils_bintools.bintools.md#b58tobuffer)
* [bufferToB58](utils_bintools.bintools.md#buffertob58)
* [bufferToString](utils_bintools.bintools.md#buffertostring)
* [cb58Decode](utils_bintools.bintools.md#cb58decode)
* [cb58Encode](utils_bintools.bintools.md#cb58encode)
* [copyFrom](utils_bintools.bintools.md#copyfrom)
* [fromArrayBufferToBuffer](utils_bintools.bintools.md#fromarraybuffertobuffer)
* [fromBNToBuffer](utils_bintools.bintools.md#frombntobuffer)
* [fromBufferToArrayBuffer](utils_bintools.bintools.md#frombuffertoarraybuffer)
* [fromBufferToBN](utils_bintools.bintools.md#frombuffertobn)
* [isBase58](utils_bintools.bintools.md#isbase58)
* [isBase64](utils_bintools.bintools.md#isbase64)
* [isCB58](utils_bintools.bintools.md#iscb58)
* [isDecimal](utils_bintools.bintools.md#isdecimal)
* [isHex](utils_bintools.bintools.md#ishex)
* [isPrimaryBechAddress](utils_bintools.bintools.md#isprimarybechaddress)
* [parseAddress](utils_bintools.bintools.md#parseaddress)
* [stringToAddress](utils_bintools.bintools.md#stringtoaddress)
* [stringToBuffer](utils_bintools.bintools.md#stringtobuffer)
* [validateChecksum](utils_bintools.bintools.md#validatechecksum)
* [getInstance](utils_bintools.bintools.md#static-getinstance)

## Constructors

### `Private` constructor

\+ **new BinTools**(): *[BinTools](utils_bintools.bintools.md)*

*Defined in [src/utils/bintools.ts:31](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L31)*

**Returns:** *[BinTools](utils_bintools.bintools.md)*

## Properties

### `Private` b58

• **b58**: *[Base58](utils_base58.base58.md)*

*Defined in [src/utils/bintools.ts:37](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L37)*

___

### `Static` `Private` instance

▪ **instance**: *[BinTools](utils_bintools.bintools.md)*

*Defined in [src/utils/bintools.ts:31](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L31)*

## Methods

###  addChecksum

▸ **addChecksum**(`buff`: Buffer): *Buffer*

*Defined in [src/utils/bintools.ts:251](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L251)*

Takes a [Buffer](https://github.com/feross/buffer) and adds a checksum, returning
a [Buffer](https://github.com/feross/buffer) with the 4-byte checksum appended.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`buff` | Buffer | The [Buffer](https://github.com/feross/buffer) to append a checksum  |

**Returns:** *Buffer*

___

###  addressToString

▸ **addressToString**(`hrp`: string, `chainid`: string, `bytes`: Buffer): *string*

*Defined in [src/utils/bintools.ts:297](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L297)*

**Parameters:**

Name | Type |
------ | ------ |
`hrp` | string |
`chainid` | string |
`bytes` | Buffer |

**Returns:** *string*

___

###  b58ToBuffer

▸ **b58ToBuffer**(`b58str`: string): *Buffer*

*Defined in [src/utils/bintools.ts:177](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L177)*

Takes a base-58 string and returns a [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`b58str` | string | The base-58 string to convert to a [Buffer](https://github.com/feross/buffer)  |

**Returns:** *Buffer*

___

###  bufferToB58

▸ **bufferToB58**(`buff`: Buffer): *string*

*Defined in [src/utils/bintools.ts:169](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L169)*

Takes a [Buffer](https://github.com/feross/buffer) and returns a base-58 string of
the [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`buff` | Buffer | The [Buffer](https://github.com/feross/buffer) to convert to base-58  |

**Returns:** *string*

___

###  bufferToString

▸ **bufferToString**(`buff`: Buffer): *string*

*Defined in [src/utils/bintools.ts:134](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L134)*

Produces a string from a [Buffer](https://github.com/feross/buffer)
representing a string. ONLY USED IN TRANSACTION FORMATTING, ASSUMED LENGTH IS PREPENDED.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`buff` | Buffer | The [Buffer](https://github.com/feross/buffer) to convert to a string  |

**Returns:** *string*

___

###  cb58Decode

▸ **cb58Decode**(`bytes`: Buffer | string): *Buffer*

*Defined in [src/utils/bintools.ts:287](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L287)*

Takes a cb58 serialized [Buffer](https://github.com/feross/buffer) or base-58 string
and returns a [Buffer](https://github.com/feross/buffer) of the original data. Throws on error.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Buffer &#124; string | A cb58 serialized [Buffer](https://github.com/feross/buffer) or base-58 string  |

**Returns:** *Buffer*

___

###  cb58Encode

▸ **cb58Encode**(`bytes`: Buffer): *string*

*Defined in [src/utils/bintools.ts:276](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L276)*

Takes a [Buffer](https://github.com/feross/buffer) and returns a base-58 string with
checksum as per the cb58 standard.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Buffer | A [Buffer](https://github.com/feross/buffer) to serialize  |

**Returns:** *string*

A serialized base-58 string of the Buffer.

___

###  copyFrom

▸ **copyFrom**(`buff`: Buffer, `start`: number, `end`: number): *Buffer*

*Defined in [src/utils/bintools.ts:156](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L156)*

Makes a copy (no reference) of a [Buffer](https://github.com/feross/buffer)
over provided indecies.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`buff` | Buffer | - | The [Buffer](https://github.com/feross/buffer) to copy |
`start` | number | 0 | The index to start the copy |
`end` | number | undefined | The index to end the copy  |

**Returns:** *Buffer*

___

###  fromArrayBufferToBuffer

▸ **fromArrayBufferToBuffer**(`ab`: ArrayBuffer): *Buffer*

*Defined in [src/utils/bintools.ts:199](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L199)*

Takes an ArrayBuffer and converts it to a [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ab` | ArrayBuffer | The ArrayBuffer to convert to a [Buffer](https://github.com/feross/buffer)  |

**Returns:** *Buffer*

___

###  fromBNToBuffer

▸ **fromBNToBuffer**(`bn`: BN, `length?`: number): *Buffer*

*Defined in [src/utils/bintools.ts:228](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L228)*

Takes a [BN](https://github.com/indutny/bn.js/) and converts it
to a [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bn` | BN | The [BN](https://github.com/indutny/bn.js/) to convert to a [Buffer](https://github.com/feross/buffer) |
`length?` | number | The zero-padded length of the [Buffer](https://github.com/feross/buffer)  |

**Returns:** *Buffer*

___

###  fromBufferToArrayBuffer

▸ **fromBufferToArrayBuffer**(`buff`: Buffer): *ArrayBuffer*

*Defined in [src/utils/bintools.ts:185](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L185)*

Takes a [Buffer](https://github.com/feross/buffer) and returns an ArrayBuffer.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`buff` | Buffer | The [Buffer](https://github.com/feross/buffer) to convert to an ArrayBuffer  |

**Returns:** *ArrayBuffer*

___

###  fromBufferToBN

▸ **fromBufferToBN**(`buff`: Buffer): *BN*

*Defined in [src/utils/bintools.ts:214](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L214)*

Takes a [Buffer](https://github.com/feross/buffer) and converts it
to a [BN](https://github.com/indutny/bn.js/).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`buff` | Buffer | The [Buffer](https://github.com/feross/buffer) to convert to a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *BN*

___

###  isBase58

▸ **isBase58**(`base58`: string): *boolean*

*Defined in [src/utils/bintools.ts:75](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L75)*

Returns true if base58, otherwise false

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`base58` | string | the string to verify is base58  |

**Returns:** *boolean*

___

###  isBase64

▸ **isBase64**(`str`: string): *boolean*

*Defined in [src/utils/bintools.ts:53](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L53)*

Returns true if base64, otherwise false

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | the string to verify is Base64  |

**Returns:** *boolean*

___

###  isCB58

▸ **isCB58**(`cb58`: string): *boolean*

*Defined in [src/utils/bintools.ts:67](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L67)*

Returns true if cb58, otherwise false

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`cb58` | string | the string to verify is cb58  |

**Returns:** *boolean*

___

###  isDecimal

▸ **isDecimal**(`str`: string): *boolean*

*Defined in [src/utils/bintools.ts:101](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L101)*

Returns true if decimal, otherwise false

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | the string to verify is hexidecimal  |

**Returns:** *boolean*

___

###  isHex

▸ **isHex**(`hex`: string): *boolean*

*Defined in [src/utils/bintools.ts:88](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L88)*

Returns true if hexidecimal, otherwise false

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`hex` | string | the string to verify is hexidecimal  |

**Returns:** *boolean*

___

###  isPrimaryBechAddress

▸ **isPrimaryBechAddress**(`address`: string): *boolean*

*Defined in [src/utils/bintools.ts:114](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L114)*

Returns true if meets requirements to parse as an address as Bech32 on X-Chain or P-Chain, otherwise false

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | the string to verify is address  |

**Returns:** *boolean*

___

###  parseAddress

▸ **parseAddress**(`addr`: string, `blockchainID`: string, `alias`: string, `addrlen`: number): *Buffer*

*Defined in [src/utils/bintools.ts:348](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L348)*

Takes an address and returns its [Buffer](https://github.com/feross/buffer)
representation if valid. A more strict version of stringToAddress.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`addr` | string | - | A string representation of the address |
`blockchainID` | string | - | A cb58 encoded string representation of the blockchainID |
`alias` | string | undefined | A chainID alias, if any, that the address can also parse from. |
`addrlen` | number | 20 | VMs can use any addressing scheme that they like, so this is the appropriate number of address bytes. Default 20.  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) for the address if valid,
undefined if not valid.

___

###  stringToAddress

▸ **stringToAddress**(`address`: string, `hrp?`: string): *Buffer*

*Defined in [src/utils/bintools.ts:299](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L299)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |
`hrp?` | string |

**Returns:** *Buffer*

___

###  stringToBuffer

▸ **stringToBuffer**(`str`: string): *Buffer*

*Defined in [src/utils/bintools.ts:141](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L141)*

Produces a [Buffer](https://github.com/feross/buffer) from a string. ONLY USED IN TRANSACTION FORMATTING, LENGTH IS PREPENDED.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | The string to convert to a [Buffer](https://github.com/feross/buffer)  |

**Returns:** *Buffer*

___

###  validateChecksum

▸ **validateChecksum**(`buff`: Buffer): *boolean*

*Defined in [src/utils/bintools.ts:262](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L262)*

Takes a [Buffer](https://github.com/feross/buffer) with an appended 4-byte checksum
and returns true if the checksum is valid, otherwise false.

**Parameters:**

Name | Type |
------ | ------ |
`buff` | Buffer |

**Returns:** *boolean*

___

### `Static` getInstance

▸ **getInstance**(): *[BinTools](utils_bintools.bintools.md)*

*Defined in [src/utils/bintools.ts:42](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/bintools.ts#L42)*

Retrieves the BinTools singleton.

**Returns:** *[BinTools](utils_bintools.bintools.md)*
