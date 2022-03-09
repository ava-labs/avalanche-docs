[avalanche](../README.md) › [Common-Transactions](../modules/common_transactions.md) › [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)

# Class: EVMStandardBaseTx ‹**KPClass, KCClass**›

Class representing a base for all transactions.

## Type parameters

▪ **KPClass**: *[StandardKeyPair](common_keychain.standardkeypair.md)*

▪ **KCClass**: *[StandardKeyChain](common_keychain.standardkeychain.md)‹KPClass›*

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **EVMStandardBaseTx**

  ↳ [EVMBaseTx](api_evm_basetx.evmbasetx.md)

## Index

### Constructors

* [constructor](common_transactions.evmstandardbasetx.md#constructor)

### Properties

* [_codecID](common_transactions.evmstandardbasetx.md#protected-_codecid)
* [_typeID](common_transactions.evmstandardbasetx.md#protected-_typeid)
* [_typeName](common_transactions.evmstandardbasetx.md#protected-_typename)
* [blockchainID](common_transactions.evmstandardbasetx.md#protected-blockchainid)
* [networkID](common_transactions.evmstandardbasetx.md#protected-networkid)

### Methods

* [clone](common_transactions.evmstandardbasetx.md#abstract-clone)
* [create](common_transactions.evmstandardbasetx.md#abstract-create)
* [deserialize](common_transactions.evmstandardbasetx.md#deserialize)
* [getBlockchainID](common_transactions.evmstandardbasetx.md#getblockchainid)
* [getCodecID](common_transactions.evmstandardbasetx.md#getcodecid)
* [getNetworkID](common_transactions.evmstandardbasetx.md#getnetworkid)
* [getTxType](common_transactions.evmstandardbasetx.md#abstract-gettxtype)
* [getTypeID](common_transactions.evmstandardbasetx.md#gettypeid)
* [getTypeName](common_transactions.evmstandardbasetx.md#gettypename)
* [sanitizeObject](common_transactions.evmstandardbasetx.md#sanitizeobject)
* [select](common_transactions.evmstandardbasetx.md#abstract-select)
* [serialize](common_transactions.evmstandardbasetx.md#serialize)
* [toBuffer](common_transactions.evmstandardbasetx.md#tobuffer)
* [toString](common_transactions.evmstandardbasetx.md#tostring)

## Constructors

###  constructor

\+ **new EVMStandardBaseTx**(`networkID`: number, `blockchainID`: Buffer): *[EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)*

*Defined in [src/common/evmtx.ts:116](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L116)*

Class representing a StandardBaseTx which is the foundation for all transactions.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional networkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16) |

**Returns:** *[EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/evmtx.ts:34](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L34)*

___

### `Protected` _typeName

• **_typeName**: *string* = "EVMStandardBaseTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/evmtx.ts:33](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L33)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/evmtx.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L74)*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/evmtx.ts:73](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L73)*

## Methods

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/evmtx.ts:112](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L112)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/evmtx.ts:114](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/evmtx.ts:55](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L55)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Defined in [src/common/evmtx.ts:91](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L91)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Defined in [src/common/evmtx.ts:84](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L84)*

Returns the NetworkID as a number

**Returns:** *number*

___

### `Abstract` getTxType

▸ **getTxType**(): *number*

*Defined in [src/common/evmtx.ts:79](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L79)*

Returns the id of the [StandardBaseTx](common_transactions.standardbasetx.md)

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L63)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L56)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  sanitizeObject

▸ **sanitizeObject**(`obj`: object): *object*

*Inherited from [SigIdx](common_signature.sigidx.md).[sanitizeObject](common_signature.sigidx.md#sanitizeobject)*

*Defined in [src/utils/serialization.ts:77](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L77)*

Sanitize to prevent cross scripting attacks.

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *object*

___

### `Abstract` select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Defined in [src/common/evmtx.ts:116](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:36](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L36)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/evmtx.ts:98](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L98)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/evmtx.ts:108](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L108)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
