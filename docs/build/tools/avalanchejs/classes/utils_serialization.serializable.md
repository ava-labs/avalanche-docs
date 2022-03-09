[avalanche](../README.md) › [Utils-Serialization](../modules/utils_serialization.md) › [Serializable](utils_serialization.serializable.md)

# Class: Serializable

## Hierarchy

* **Serializable**

  ↳ [Credential](common_signature.credential.md)

  ↳ [Input](common_inputs.input.md)

  ↳ [StandardParseableInput](common_inputs.standardparseableinput.md)

  ↳ [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)

  ↳ [EVMStandardUnsignedTx](common_transactions.evmstandardunsignedtx.md)

  ↳ [EVMStandardTx](common_transactions.evmstandardtx.md)

  ↳ [StandardBaseTx](common_transactions.standardbasetx.md)

  ↳ [StandardUnsignedTx](common_transactions.standardunsignedtx.md)

  ↳ [StandardTx](common_transactions.standardtx.md)

  ↳ [StandardUTXO](common_utxos.standardutxo.md)

  ↳ [StandardUTXOSet](common_utxos.standardutxoset.md)

  ↳ [NBytes](common_nbytes.nbytes.md)

  ↳ [OutputOwners](common_output.outputowners.md)

  ↳ [StandardParseableOutput](common_output.standardparseableoutput.md)

  ↳ [InitialStates](api_avm_initialstates.initialstates.md)

  ↳ [Operation](api_avm_operations.operation.md)

  ↳ [TransferableOperation](api_avm_operations.transferableoperation.md)

  ↳ [MinterSet](api_avm_minterset.minterset.md)

  ↳ [GenesisData](api_avm_genesisdata.genesisdata.md)

  ↳ [SubnetAuth](api_platformvm_subnetauth.subnetauth.md)

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
* [sanitizeObject](utils_serialization.serializable.md#sanitizeobject)
* [serialize](utils_serialization.serializable.md#serialize)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = undefined

*Defined in [src/utils/serialization.ts:50](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L50)*

___

### `Protected` _typeName

• **_typeName**: *string* = undefined

*Defined in [src/utils/serialization.ts:49](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L49)*

## Methods

###  deserialize

▸ **deserialize**(`fields`: object, `encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Defined in [src/utils/serialization.ts:97](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | object |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *void*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Defined in [src/utils/serialization.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L63)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Defined in [src/utils/serialization.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L56)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  sanitizeObject

▸ **sanitizeObject**(`obj`: object): *object*

*Defined in [src/utils/serialization.ts:77](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L77)*

Sanitize to prevent cross scripting attacks.

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *object*

___

###  serialize

▸ **serialize**(`encoding?`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Defined in [src/utils/serialization.ts:90](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`encoding?` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |

**Returns:** *object*
