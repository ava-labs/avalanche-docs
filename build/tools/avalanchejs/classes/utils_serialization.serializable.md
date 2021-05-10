[avalanche](../README.md) › [Utils-Serialization](../modules/utils_serialization.md) › [Serializable](utils_serialization.serializable.md)

# Class: Serializable

## Hierarchy

* **Serializable**

  ↳ [NBytes](common_nbytes.nbytes.md)

  ↳ [OutputOwners](common_output.outputowners.md)

  ↳ [StandardParseableOutput](common_output.standardparseableoutput.md)

  ↳ [Credential](common_signature.credential.md)

  ↳ [Input](common_inputs.input.md)

  ↳ [StandardParseableInput](common_inputs.standardparseableinput.md)

  ↳ [StandardBaseTx](common_transactions.standardbasetx.md)

  ↳ [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

  ↳ [StandardTx](common_transactions.standardtx.md)

  ↳ [InitialStates](api_avm_initialstates.initialstates.md)

  ↳ [Operation](api_avm_operations.operation.md)

  ↳ [TransferableOperation](api_avm_operations.transferableoperation.md)

  ↳ [MinterSet](api_avm_minterset.minterset.md)

  ↳ [StandardUTXO](common_utxos.standardutxo.md)

  ↳ [StandardUTXOSet](common_utxos.standardutxoset.md)

  ↳ [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)

  ↳ [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)

  ↳ [EVMStandardTx](common_transactions.evmstandardtx.md)

## Index

### Properties

* [_codecID](utils_serialization.serializable.md#protected-_codecid)
* [_typeID](utils_serialization.serializable.md#protected-_typeid)
* [_typeName](utils_serialization.serializable.md#protected-_typename)

### Methods

* [deserialize](utils_serialization.serializable.md#deserialize)
* [getCodecID](utils_serialization.serializable.md#getcodecid)
* [getTypeID](utils_serialization.serializable.md#gettypeid)
* [getTypeName](utils_serialization.serializable.md#gettypename)
* [serialize](utils_serialization.serializable.md#serialize)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *number* = undefined

*Defined in [src/utils/serialization.ts:41](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L41)*

___

### `Protected` _typeName

• **_typeName**: *string* = undefined

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L40)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Defined in [src/utils/serialization.ts:74](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | object |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *void*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  serialize

▸ **serialize**(`encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Defined in [src/utils/serialization.ts:67](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *object*
