[avalanche](../README.md) › [Common-Inputs](../modules/common_inputs.md) › [StandardTransferableInput](common_inputs.standardtransferableinput.md)

# Class: StandardTransferableInput

## Hierarchy

  ↳ [StandardParseableInput](common_inputs.standardparseableinput.md)

  ↳ **StandardTransferableInput**

  ↳ [TransferableInput](api_avm_inputs.transferableinput.md)

  ↳ [TransferableInput](api_platformvm_inputs.transferableinput.md)

## Index

### Constructors

* [constructor](common_inputs.standardtransferableinput.md#constructor)

### Properties

* [_typeID](common_inputs.standardtransferableinput.md#protected-_typeid)
* [_typeName](common_inputs.standardtransferableinput.md#protected-_typename)
* [assetid](common_inputs.standardtransferableinput.md#protected-assetid)
* [input](common_inputs.standardtransferableinput.md#protected-input)
* [outputidx](common_inputs.standardtransferableinput.md#protected-outputidx)
* [txid](common_inputs.standardtransferableinput.md#protected-txid)

### Methods

* [deserialize](common_inputs.standardtransferableinput.md#deserialize)
* [fromBuffer](common_inputs.standardtransferableinput.md#abstract-frombuffer)
* [getAssetID](common_inputs.standardtransferableinput.md#getassetid)
* [getInput](common_inputs.standardtransferableinput.md#getinput)
* [getOutputIdx](common_inputs.standardtransferableinput.md#getoutputidx)
* [getTxID](common_inputs.standardtransferableinput.md#gettxid)
* [getTypeID](common_inputs.standardtransferableinput.md#gettypeid)
* [getTypeName](common_inputs.standardtransferableinput.md#gettypename)
* [getUTXOID](common_inputs.standardtransferableinput.md#getutxoid)
* [serialize](common_inputs.standardtransferableinput.md#serialize)
* [toBuffer](common_inputs.standardtransferableinput.md#tobuffer)
* [toString](common_inputs.standardtransferableinput.md#tostring)
* [comparator](common_inputs.standardtransferableinput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardTransferableInput**(`txid`: Buffer, `outputidx`: Buffer, `assetID`: Buffer, `input`: [Input](common_inputs.input.md)): *[StandardTransferableInput](common_inputs.standardtransferableinput.md)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[constructor](common_inputs.standardparseableinput.md#constructor)*

*Defined in [src/common/input.ts:244](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L244)*

Class representing an [StandardTransferableInput](common_inputs.standardtransferableinput.md) for a transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`txid` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) containing the transaction ID of the referenced UTXO |
`outputidx` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) containing the index of the output in the transaction consumed in the [StandardTransferableInput](common_inputs.standardtransferableinput.md) |
`assetID` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) representing the assetID of the [Input](common_inputs.input.md) |
`input` | [Input](common_inputs.input.md) | undefined | An [Input](common_inputs.input.md) to be made transferable  |

**Returns:** *[StandardTransferableInput](common_inputs.standardtransferableinput.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[_typeID](common_inputs.standardparseableinput.md#protected-_typeid)*

*Defined in [src/common/input.ts:173](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L173)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardTransferableInput"

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[_typeName](common_inputs.standardparseableinput.md#protected-_typename)*

*Defined in [src/common/input.ts:172](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L172)*

___

### `Protected` assetid

• **assetid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/input.ts:194](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L194)*

___

### `Protected` input

• **input**: *[Input](common_inputs.input.md)*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[input](common_inputs.standardparseableinput.md#protected-input)*

*Defined in [src/common/input.ts:134](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L134)*

___

### `Protected` outputidx

• **outputidx**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/input.ts:193](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L193)*

___

### `Protected` txid

• **txid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/input.ts:192](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L192)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/input.ts:184](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L184)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[fromBuffer](common_inputs.standardparseableinput.md#abstract-frombuffer)*

*Defined in [src/common/input.ts:225](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L225)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/common/input.ts:223](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L223)*

Returns the assetID of the input.

**Returns:** *Buffer*

___

###  getInput

▸ **getInput**(): *[Input](common_inputs.input.md)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[getInput](common_inputs.standardparseableinput.md#getinput)*

*Defined in [src/common/input.ts:218](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L218)*

Returns the input.

**Returns:** *[Input](common_inputs.input.md)*

___

###  getOutputIdx

▸ **getOutputIdx**(): *Buffer*

*Defined in [src/common/input.ts:206](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L206)*

Returns a [Buffer](https://github.com/feross/buffer)  of the OutputIdx.

**Returns:** *Buffer*

___

###  getTxID

▸ **getTxID**(): *Buffer*

*Defined in [src/common/input.ts:199](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L199)*

Returns a [Buffer](https://github.com/feross/buffer) of the TxID.

**Returns:** *Buffer*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  getUTXOID

▸ **getUTXOID**(): *string*

*Defined in [src/common/input.ts:213](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L213)*

Returns a base-58 string representation of the UTXOID this [StandardTransferableInput](common_inputs.standardtransferableinput.md) references.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[serialize](common_inputs.standardparseableinput.md#serialize)*

*Defined in [src/common/input.ts:175](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L175)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[toBuffer](common_inputs.standardparseableinput.md#tobuffer)*

*Defined in [src/common/input.ts:230](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L230)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTransferableInput](common_inputs.standardtransferableinput.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/input.ts:241](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L241)*

Returns a base-58 representation of the [StandardTransferableInput](common_inputs.standardtransferableinput.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[comparator](common_inputs.standardparseableinput.md#static-comparator)*

*Defined in [src/common/input.ts:139](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L139)*

Returns a function used to sort an array of [StandardParseableInput](common_inputs.standardparseableinput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableInput](common_inputs.standardparseableinput.md), `b`: [StandardParseableInput](common_inputs.standardparseableinput.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
`b` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
