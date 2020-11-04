[avalanche](../README.md) › [API-AVM-Inputs](../modules/api_avm_inputs.md) › [TransferableInput](api_avm_inputs.transferableinput.md)

# Class: TransferableInput

## Hierarchy

  ↳ [StandardTransferableInput](common_inputs.standardtransferableinput.md)

  ↳ **TransferableInput**

## Index

### Constructors

* [constructor](api_avm_inputs.transferableinput.md#constructor)

### Properties

* [_typeID](api_avm_inputs.transferableinput.md#protected-_typeid)
* [_typeName](api_avm_inputs.transferableinput.md#protected-_typename)
* [assetid](api_avm_inputs.transferableinput.md#protected-assetid)
* [input](api_avm_inputs.transferableinput.md#protected-input)
* [outputidx](api_avm_inputs.transferableinput.md#protected-outputidx)
* [txid](api_avm_inputs.transferableinput.md#protected-txid)

### Methods

* [deserialize](api_avm_inputs.transferableinput.md#deserialize)
* [fromBuffer](api_avm_inputs.transferableinput.md#frombuffer)
* [getAssetID](api_avm_inputs.transferableinput.md#getassetid)
* [getInput](api_avm_inputs.transferableinput.md#getinput)
* [getOutputIdx](api_avm_inputs.transferableinput.md#getoutputidx)
* [getTxID](api_avm_inputs.transferableinput.md#gettxid)
* [getTypeID](api_avm_inputs.transferableinput.md#gettypeid)
* [getTypeName](api_avm_inputs.transferableinput.md#gettypename)
* [getUTXOID](api_avm_inputs.transferableinput.md#getutxoid)
* [serialize](api_avm_inputs.transferableinput.md#serialize)
* [toBuffer](api_avm_inputs.transferableinput.md#tobuffer)
* [toString](api_avm_inputs.transferableinput.md#tostring)
* [comparator](api_avm_inputs.transferableinput.md#static-comparator)

## Constructors

###  constructor

\+ **new TransferableInput**(`txid`: Buffer, `outputidx`: Buffer, `assetID`: Buffer, `input`: [Input](common_inputs.input.md)): *[TransferableInput](api_avm_inputs.transferableinput.md)*

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[constructor](common_inputs.standardtransferableinput.md#constructor)*

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

**Returns:** *[TransferableInput](api_avm_inputs.transferableinput.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardTransferableInput](common_inputs.standardtransferableinput.md).[_typeID](common_inputs.standardtransferableinput.md#protected-_typeid)*

*Defined in [src/apis/avm/inputs.ts:34](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/inputs.ts#L34)*

___

### `Protected` _typeName

• **_typeName**: *string* = "TransferableInput"

*Overrides [StandardTransferableInput](common_inputs.standardtransferableinput.md).[_typeName](common_inputs.standardtransferableinput.md#protected-_typename)*

*Defined in [src/apis/avm/inputs.ts:33](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/inputs.ts#L33)*

___

### `Protected` assetid

• **assetid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[assetid](common_inputs.standardtransferableinput.md#protected-assetid)*

*Defined in [src/common/input.ts:194](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L194)*

___

### `Protected` input

• **input**: *[Input](common_inputs.input.md)*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[input](common_inputs.standardparseableinput.md#protected-input)*

*Defined in [src/common/input.ts:134](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L134)*

___

### `Protected` outputidx

• **outputidx**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[outputidx](common_inputs.standardtransferableinput.md#protected-outputidx)*

*Defined in [src/common/input.ts:193](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L193)*

___

### `Protected` txid

• **txid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[txid](common_inputs.standardtransferableinput.md#protected-txid)*

*Defined in [src/common/input.ts:192](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L192)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [StandardTransferableInput](common_inputs.standardtransferableinput.md).[deserialize](common_inputs.standardtransferableinput.md#deserialize)*

*Defined in [src/apis/avm/inputs.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/inputs.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardTransferableInput](common_inputs.standardtransferableinput.md).[fromBuffer](common_inputs.standardtransferableinput.md#abstract-frombuffer)*

*Defined in [src/apis/avm/inputs.ts:51](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/inputs.ts#L51)*

Takes a [Buffer](https://github.com/feross/buffer) containing a [TransferableInput](api_avm_inputs.transferableinput.md), parses it, populates the class, and returns the length of the [TransferableInput](api_avm_inputs.transferableinput.md) in bytes.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [TransferableInput](api_avm_inputs.transferableinput.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [TransferableInput](api_avm_inputs.transferableinput.md)

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[getAssetID](common_inputs.standardtransferableinput.md#getassetid)*

*Defined in [src/common/input.ts:223](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L223)*

Returns the assetID of the input.

**Returns:** *Buffer*

___

###  getInput

▸ **getInput**(): *[Input](common_inputs.input.md)*

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[getInput](common_inputs.standardtransferableinput.md#getinput)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[getInput](common_inputs.standardparseableinput.md#getinput)*

*Defined in [src/common/input.ts:218](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L218)*

Returns the input.

**Returns:** *[Input](common_inputs.input.md)*

___

###  getOutputIdx

▸ **getOutputIdx**(): *Buffer*

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[getOutputIdx](common_inputs.standardtransferableinput.md#getoutputidx)*

*Defined in [src/common/input.ts:206](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L206)*

Returns a [Buffer](https://github.com/feross/buffer)  of the OutputIdx.

**Returns:** *Buffer*

___

###  getTxID

▸ **getTxID**(): *Buffer*

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[getTxID](common_inputs.standardtransferableinput.md#gettxid)*

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

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[getUTXOID](common_inputs.standardtransferableinput.md#getutxoid)*

*Defined in [src/common/input.ts:213](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L213)*

Returns a base-58 string representation of the UTXOID this [StandardTransferableInput](common_inputs.standardtransferableinput.md) references.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[serialize](common_inputs.standardtransferableinput.md#serialize)*

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

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[toBuffer](common_inputs.standardtransferableinput.md#tobuffer)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[toBuffer](common_inputs.standardparseableinput.md#tobuffer)*

*Defined in [src/common/input.ts:230](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L230)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTransferableInput](common_inputs.standardtransferableinput.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardTransferableInput](common_inputs.standardtransferableinput.md).[toString](common_inputs.standardtransferableinput.md#tostring)*

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
