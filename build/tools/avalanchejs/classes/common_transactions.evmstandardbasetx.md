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
* [getTxType](common_transactions.evmstandardbasetx.md#abstract-gettxtype)
* [networkID](common_transactions.evmstandardbasetx.md#protected-networkid)

### Methods

* [clone](common_transactions.evmstandardbasetx.md#abstract-clone)
* [create](common_transactions.evmstandardbasetx.md#abstract-create)
* [deserialize](common_transactions.evmstandardbasetx.md#deserialize)
* [getBlockchainID](common_transactions.evmstandardbasetx.md#getblockchainid)
* [getCodecID](common_transactions.evmstandardbasetx.md#getcodecid)
* [getNetworkID](common_transactions.evmstandardbasetx.md#getnetworkid)
* [getTypeID](common_transactions.evmstandardbasetx.md#gettypeid)
* [getTypeName](common_transactions.evmstandardbasetx.md#gettypename)
* [select](common_transactions.evmstandardbasetx.md#abstract-select)
* [serialize](common_transactions.evmstandardbasetx.md#serialize)
* [toBuffer](common_transactions.evmstandardbasetx.md#tobuffer)
* [toString](common_transactions.evmstandardbasetx.md#tostring)

## Constructors

###  constructor

\+ **new EVMStandardBaseTx**(`networkID`: number, `blockchainID`: Buffer): *[EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)*

*Defined in [src/common/evmtx.ts:83](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L83)*

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

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/evmtx.ts:27](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L27)*

___

### `Protected` _typeName

• **_typeName**: *string* = "EVMStandardBaseTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/evmtx.ts:26](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L26)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/evmtx.ts:45](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L45)*

___

### `Abstract` getTxType

• **getTxType**: *function*

*Defined in [src/common/evmtx.ts:50](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L50)*

Returns the id of the [StandardBaseTx](common_transactions.standardbasetx.md)

#### Type declaration:

▸ (): *number*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/evmtx.ts:44](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L44)*

## Methods

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/evmtx.ts:79](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L79)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/evmtx.ts:81](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/evmtx.ts:38](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Defined in [src/common/evmtx.ts:60](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L60)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Defined in [src/common/evmtx.ts:55](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L55)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

### `Abstract` select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Defined in [src/common/evmtx.ts:83](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L83)*

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

*Defined in [src/common/evmtx.ts:29](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/evmtx.ts:65](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L65)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/evmtx.ts:75](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/evmtx.ts#L75)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
