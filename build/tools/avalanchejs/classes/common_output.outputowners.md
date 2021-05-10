[avalanche](../README.md) › [Common-Output](../modules/common_output.md) › [OutputOwners](common_output.outputowners.md)

# Class: OutputOwners

Defines the most basic values for output ownership. Mostly inherited from, but can be used in population of NFT Owner data.

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **OutputOwners**

  ↳ [Output](common_output.output.md)

## Index

### Constructors

* [constructor](common_output.outputowners.md#constructor)

### Properties

* [_codecID](common_output.outputowners.md#protected-_codecid)
* [_typeID](common_output.outputowners.md#protected-_typeid)
* [_typeName](common_output.outputowners.md#protected-_typename)
* [addresses](common_output.outputowners.md#protected-addresses)
* [locktime](common_output.outputowners.md#protected-locktime)
* [numaddrs](common_output.outputowners.md#protected-numaddrs)
* [threshold](common_output.outputowners.md#protected-threshold)

### Methods

* [deserialize](common_output.outputowners.md#deserialize)
* [fromBuffer](common_output.outputowners.md#frombuffer)
* [getAddress](common_output.outputowners.md#getaddress)
* [getAddressIdx](common_output.outputowners.md#getaddressidx)
* [getAddresses](common_output.outputowners.md#getaddresses)
* [getCodecID](common_output.outputowners.md#getcodecid)
* [getLocktime](common_output.outputowners.md#getlocktime)
* [getSpenders](common_output.outputowners.md#getspenders)
* [getThreshold](common_output.outputowners.md#getthreshold)
* [getTypeID](common_output.outputowners.md#gettypeid)
* [getTypeName](common_output.outputowners.md#gettypename)
* [meetsThreshold](common_output.outputowners.md#meetsthreshold)
* [serialize](common_output.outputowners.md#serialize)
* [toBuffer](common_output.outputowners.md#tobuffer)
* [toString](common_output.outputowners.md#tostring)
* [comparator](common_output.outputowners.md#static-comparator)

## Constructors

###  constructor

\+ **new OutputOwners**(`addresses`: Array‹Buffer›, `locktime`: BN, `threshold`: number): *[OutputOwners](common_output.outputowners.md)*

*Defined in [src/common/output.ts:278](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L278)*

An [Output](common_output.output.md) class which contains addresses, locktimes, and thresholds.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`addresses` | Array‹Buffer› | undefined | An array of [Buffer](https://github.com/feross/buffer)s representing output owner's addresses |
`locktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the locktime |
`threshold` | number | undefined | A number representing the the threshold number of signers required to sign the transaction  |

**Returns:** *[OutputOwners](common_output.outputowners.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/output.ts:94](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L94)*

___

### `Protected` _typeName

• **_typeName**: *string* = "OutputOwners"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/output.ts:93](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L93)*

___

### `Protected` addresses

• **addresses**: *Array‹[Address](common_output.address.md)›* = []

*Defined in [src/common/output.ts:121](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L121)*

___

### `Protected` locktime

• **locktime**: *Buffer* = Buffer.alloc(8)

*Defined in [src/common/output.ts:118](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L118)*

___

### `Protected` numaddrs

• **numaddrs**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/output.ts:120](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L120)*

___

### `Protected` threshold

• **threshold**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/output.ts:119](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L119)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/output.ts:105](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L105)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/common/output.ts:225](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L225)*

Returns a base-58 string representing the [Output](common_output.output.md).

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAddress

▸ **getAddress**(`idx`: number): *Buffer*

*Defined in [src/common/output.ts:168](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L168)*

Returns the address from the index provided.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idx` | number | The index of the address.  |

**Returns:** *Buffer*

Returns the string representing the address.

___

###  getAddressIdx

▸ **getAddressIdx**(`address`: Buffer): *number*

*Defined in [src/common/output.ts:151](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L151)*

Returns the index of the address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | Buffer | A [Buffer](https://github.com/feross/buffer) of the address to look up to return its index.  |

**Returns:** *number*

The index of the address.

___

###  getAddresses

▸ **getAddresses**(): *Array‹Buffer›*

*Defined in [src/common/output.ts:136](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L136)*

Returns an array of [Buffer](https://github.com/feross/buffer)s for the addresses.

**Returns:** *Array‹Buffer›*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getLocktime

▸ **getLocktime**(): *BN*

*Defined in [src/common/output.ts:131](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L131)*

Returns the a [BN](https://github.com/indutny/bn.js/) repersenting the UNIX Timestamp when the lock is made available.

**Returns:** *BN*

___

###  getSpenders

▸ **getSpenders**(`addresses`: Array‹Buffer›, `asOf`: BN): *Array‹Buffer›*

*Defined in [src/common/output.ts:197](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L197)*

Given an array of addresses and an optional timestamp, select an array of address [Buffer](https://github.com/feross/buffer)s of qualified spenders for the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Array‹Buffer› | - |
`asOf` | BN | undefined |

**Returns:** *Array‹Buffer›*

___

###  getThreshold

▸ **getThreshold**(): *number*

*Defined in [src/common/output.ts:126](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L126)*

Returns the threshold of signers required to spend this output.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  meetsThreshold

▸ **meetsThreshold**(`addresses`: Array‹Buffer›, `asOf`: BN): *boolean*

*Defined in [src/common/output.ts:178](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L178)*

Given an array of address [Buffer](https://github.com/feross/buffer)s and an optional timestamp, returns true if the addresses meet the threshold required to spend the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Array‹Buffer› | - |
`asOf` | BN | undefined |

**Returns:** *boolean*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/output.ts:96](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L96)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/output.ts:246](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L246)*

Returns the buffer representing the [Output](common_output.output.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/output.ts:262](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L262)*

Returns a base-58 string representing the [Output](common_output.output.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/common/output.ts:266](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/output.ts#L266)*

**Returns:** *function*

▸ (`a`: [Output](common_output.output.md), `b`: [Output](common_output.output.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Output](common_output.output.md) |
`b` | [Output](common_output.output.md) |
