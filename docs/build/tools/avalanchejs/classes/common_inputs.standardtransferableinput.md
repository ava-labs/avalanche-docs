[avalanche](../README.md) › [Common-Inputs](../modules/common_inputs.md) › [StandardTransferableInput](common_inputs.standardtransferableinput.md)

# Class: StandardTransferableInput

## Hierarchy

  ↳ [StandardParseableInput](common_inputs.standardparseableinput.md)

  ↳ **StandardTransferableInput**

  ↳ [TransferableInput](api_evm_inputs.transferableinput.md)

  ↳ [TransferableInput](api_avm_inputs.transferableinput.md)

  ↳ [TransferableInput](api_platformvm_inputs.transferableinput.md)

## Index

### Constructors

* [constructor](common_inputs.standardtransferableinput.md#constructor)

### Properties

* [_codecID](common_inputs.standardtransferableinput.md#protected-_codecid)
* [_typeID](common_inputs.standardtransferableinput.md#protected-_typeid)
* [_typeName](common_inputs.standardtransferableinput.md#protected-_typename)
* [assetID](common_inputs.standardtransferableinput.md#protected-assetid)
* [input](common_inputs.standardtransferableinput.md#protected-input)
* [outputidx](common_inputs.standardtransferableinput.md#protected-outputidx)
* [txid](common_inputs.standardtransferableinput.md#protected-txid)

### Methods

* [deserialize](common_inputs.standardtransferableinput.md#deserialize)
* [fromBuffer](common_inputs.standardtransferableinput.md#abstract-frombuffer)
* [getAssetID](common_inputs.standardtransferableinput.md#getassetid)
* [getCodecID](common_inputs.standardtransferableinput.md#getcodecid)
* [getInput](common_inputs.standardtransferableinput.md#getinput)
* [getOutputIdx](common_inputs.standardtransferableinput.md#getoutputidx)
* [getTxID](common_inputs.standardtransferableinput.md#gettxid)
* [getTypeID](common_inputs.standardtransferableinput.md#gettypeid)
* [getTypeName](common_inputs.standardtransferableinput.md#gettypename)
* [getUTXOID](common_inputs.standardtransferableinput.md#getutxoid)
* [sanitizeObject](common_inputs.standardtransferableinput.md#sanitizeobject)
* [serialize](common_inputs.standardtransferableinput.md#serialize)
* [toBuffer](common_inputs.standardtransferableinput.md#tobuffer)
* [toString](common_inputs.standardtransferableinput.md#tostring)
* [comparator](common_inputs.standardtransferableinput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardTransferableInput**(`txid`: Buffer, `outputidx`: Buffer, `assetID`: Buffer, `input`: [Input](common_inputs.input.md)): *[StandardTransferableInput](common_inputs.standardtransferableinput.md)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[constructor](common_inputs.standardparseableinput.md#constructor)*

*Defined in [src/common/input.ts:289](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L289)*

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

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[_typeID](common_inputs.standardparseableinput.md#protected-_typeid)*

*Defined in [src/common/input.ts:189](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L189)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardTransferableInput"

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[_typeName](common_inputs.standardparseableinput.md#protected-_typename)*

*Defined in [src/common/input.ts:188](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L188)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/input.ts:233](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L233)*

___

### `Protected` input

• **input**: *[Input](common_inputs.input.md)*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[input](common_inputs.standardparseableinput.md#protected-input)*

*Defined in [src/common/input.ts:145](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L145)*

___

### `Protected` outputidx

• **outputidx**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/input.ts:232](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L232)*

___

### `Protected` txid

• **txid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/input.ts:231](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L231)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/input.ts:205](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L205)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

### `Abstract` fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset?`: number): *number*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[fromBuffer](common_inputs.standardparseableinput.md#abstract-frombuffer)*

*Defined in [src/common/input.ts:261](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | Buffer |
`offset?` | number |

**Returns:** *number*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/common/input.ts:259](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L259)*

Returns the assetID of the input.

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getInput

▸ **getInput**(): *[Input](common_inputs.input.md)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[getInput](common_inputs.standardparseableinput.md#getinput)*

*Defined in [src/common/input.ts:254](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L254)*

Returns the input.

**Returns:** *[Input](common_inputs.input.md)*

___

###  getOutputIdx

▸ **getOutputIdx**(): *Buffer*

*Defined in [src/common/input.ts:243](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L243)*

Returns a [Buffer](https://github.com/feross/buffer)  of the OutputIdx.

**Returns:** *Buffer*

___

###  getTxID

▸ **getTxID**(): *Buffer*

*Defined in [src/common/input.ts:238](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L238)*

Returns a [Buffer](https://github.com/feross/buffer) of the TxID.

**Returns:** *Buffer*

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

###  getUTXOID

▸ **getUTXOID**(): *string*

*Defined in [src/common/input.ts:248](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L248)*

Returns a base-58 string representation of the UTXOID this [StandardTransferableInput](common_inputs.standardtransferableinput.md) references.

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

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[serialize](common_inputs.standardparseableinput.md#serialize)*

*Defined in [src/common/input.ts:191](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L191)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[toBuffer](common_inputs.standardparseableinput.md#tobuffer)*

*Defined in [src/common/input.ts:266](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L266)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardTransferableInput](common_inputs.standardtransferableinput.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/input.ts:286](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L286)*

Returns a base-58 representation of the [StandardTransferableInput](common_inputs.standardtransferableinput.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [StandardParseableInput](common_inputs.standardparseableinput.md).[comparator](common_inputs.standardparseableinput.md#static-comparator)*

*Defined in [src/common/input.ts:150](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/input.ts#L150)*

Returns a function used to sort an array of [StandardParseableInput](common_inputs.standardparseableinput.md)s

**Returns:** *function*

▸ (`a`: [StandardParseableInput](common_inputs.standardparseableinput.md), `b`: [StandardParseableInput](common_inputs.standardparseableinput.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
`b` | [StandardParseableInput](common_inputs.standardparseableinput.md) |
