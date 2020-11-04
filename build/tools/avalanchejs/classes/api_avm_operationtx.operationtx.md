[avalanche](../README.md) › [API-AVM-OperationTx](../modules/api_avm_operationtx.md) › [OperationTx](api_avm_operationtx.operationtx.md)

# Class: OperationTx

Class representing an unsigned Operation transaction.

## Hierarchy

  ↳ [BaseTx](api_avm_basetx.basetx.md)

  ↳ **OperationTx**

## Index

### Constructors

* [constructor](api_avm_operationtx.operationtx.md#constructor)

### Properties

* [_typeID](api_avm_operationtx.operationtx.md#protected-_typeid)
* [_typeName](api_avm_operationtx.operationtx.md#protected-_typename)
* [blockchainid](api_avm_operationtx.operationtx.md#protected-blockchainid)
* [ins](api_avm_operationtx.operationtx.md#protected-ins)
* [memo](api_avm_operationtx.operationtx.md#protected-memo)
* [networkid](api_avm_operationtx.operationtx.md#protected-networkid)
* [numOps](api_avm_operationtx.operationtx.md#protected-numops)
* [numins](api_avm_operationtx.operationtx.md#protected-numins)
* [numouts](api_avm_operationtx.operationtx.md#protected-numouts)
* [ops](api_avm_operationtx.operationtx.md#protected-ops)
* [outs](api_avm_operationtx.operationtx.md#protected-outs)

### Methods

* [clone](api_avm_operationtx.operationtx.md#clone)
* [create](api_avm_operationtx.operationtx.md#create)
* [deserialize](api_avm_operationtx.operationtx.md#deserialize)
* [fromBuffer](api_avm_operationtx.operationtx.md#frombuffer)
* [getBlockchainID](api_avm_operationtx.operationtx.md#getblockchainid)
* [getIns](api_avm_operationtx.operationtx.md#getins)
* [getMemo](api_avm_operationtx.operationtx.md#getmemo)
* [getNetworkID](api_avm_operationtx.operationtx.md#getnetworkid)
* [getOperations](api_avm_operationtx.operationtx.md#getoperations)
* [getOuts](api_avm_operationtx.operationtx.md#getouts)
* [getTotalOuts](api_avm_operationtx.operationtx.md#gettotalouts)
* [getTxType](api_avm_operationtx.operationtx.md#gettxtype)
* [getTypeID](api_avm_operationtx.operationtx.md#gettypeid)
* [getTypeName](api_avm_operationtx.operationtx.md#gettypename)
* [select](api_avm_operationtx.operationtx.md#select)
* [serialize](api_avm_operationtx.operationtx.md#serialize)
* [sign](api_avm_operationtx.operationtx.md#sign)
* [toBuffer](api_avm_operationtx.operationtx.md#tobuffer)
* [toString](api_avm_operationtx.operationtx.md#tostring)

## Constructors

###  constructor

\+ **new OperationTx**(`networkid`: number, `blockchainid`: Buffer, `outs`: Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›, `ins`: Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›, `memo`: Buffer, `ops`: Array‹[TransferableOperation](api_avm_operations.transferableoperation.md)›): *[OperationTx](api_avm_operationtx.operationtx.md)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[constructor](api_avm_basetx.basetx.md#constructor)*

*Defined in [src/apis/avm/operationtx.ts:134](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L134)*

Class representing an unsigned Operation transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkid` | number | DefaultNetworkID | Optional networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainid` | Buffer | Buffer.alloc(32, 16) | Optional blockchainid, default Buffer.alloc(32, 16) |
`outs` | Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)› | undefined | Optional array of the [TransferableOutput](api_avm_outputs.transferableoutput.md)s |
`ins` | Array‹[TransferableInput](api_avm_inputs.transferableinput.md)› | undefined | Optional array of the [TransferableInput](api_avm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field |
`ops` | Array‹[TransferableOperation](api_avm_operations.transferableoperation.md)› | undefined | Array of [Operation](api_avm_operations.operation.md)s used in the transaction  |

**Returns:** *[OperationTx](api_avm_operationtx.operationtx.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *number* = AVMConstants.OPERATIONTX

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeID](api_avm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/avm/operationtx.ts:29](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L29)*

___

### `Protected` _typeName

• **_typeName**: *string* = "OperationTx"

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeName](api_avm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/avm/operationtx.ts:28](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L28)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainid](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L49)*

___

### `Protected` ins

• **ins**: *Array‹[StandardTransferableInput](common_inputs.standardtransferableinput.md)›*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[ins](common_transactions.standardbasetx.md#protected-ins)*

*Defined in [src/common/tx.ts:53](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L53)*

___

### `Protected` memo

• **memo**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[memo](common_transactions.standardbasetx.md#protected-memo)*

*Defined in [src/common/tx.ts:54](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L54)*

___

### `Protected` networkid

• **networkid**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[networkid](common_transactions.standardbasetx.md#protected-networkid)*

*Defined in [src/common/tx.ts:48](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L48)*

___

### `Protected` numOps

• **numOps**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/operationtx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L49)*

___

### `Protected` numins

• **numins**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numins](common_transactions.standardbasetx.md#protected-numins)*

*Defined in [src/common/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L52)*

___

### `Protected` numouts

• **numouts**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numouts](common_transactions.standardbasetx.md#protected-numouts)*

*Defined in [src/common/tx.ts:50](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L50)*

___

### `Protected` ops

• **ops**: *Array‹[TransferableOperation](api_avm_operations.transferableoperation.md)›* = []

*Defined in [src/apis/avm/operationtx.ts:50](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L50)*

___

### `Protected` outs

• **outs**: *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[outs](common_transactions.standardbasetx.md#protected-outs)*

*Defined in [src/common/tx.ts:51](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L51)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[clone](api_avm_basetx.basetx.md#clone)*

*Defined in [src/apis/avm/operationtx.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L126)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[create](api_avm_basetx.basetx.md#create)*

*Defined in [src/apis/avm/operationtx.ts:132](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[deserialize](api_avm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/avm/operationtx.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number, `codecid`: number): *number*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[fromBuffer](api_avm_basetx.basetx.md#frombuffer)*

*Defined in [src/apis/avm/operationtx.ts:68](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L68)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [OperationTx](api_avm_operationtx.operationtx.md), parses it, populates the class, and returns the length of the [OperationTx](api_avm_operationtx.operationtx.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [OperationTx](api_avm_operationtx.operationtx.md)  |
`offset` | number | 0 | - |
`codecid` | number | AVMConstants.LATESTCODEC | - |

**Returns:** *number*

The length of the raw [OperationTx](api_avm_operationtx.operationtx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)*

*Defined in [src/common/tx.ts:69](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L69)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getIns

▸ **getIns**(): *Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getIns](api_avm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/avm/basetx.ts:53](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/basetx.ts#L53)*

**Returns:** *Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:89](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L89)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:64](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L64)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getOperations

▸ **getOperations**(): *Array‹[TransferableOperation](api_avm_operations.transferableoperation.md)›*

*Defined in [src/apis/avm/operationtx.ts:97](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L97)*

Returns an array of [TransferableOperation](api_avm_operations.transferableoperation.md)s in this transaction.

**Returns:** *Array‹[TransferableOperation](api_avm_operations.transferableoperation.md)›*

___

###  getOuts

▸ **getOuts**(): *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getOuts](api_avm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/avm/basetx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/basetx.ts#L49)*

**Returns:** *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

___

###  getTotalOuts

▸ **getTotalOuts**(): *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getTotalOuts](api_avm_basetx.basetx.md#gettotalouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/avm/basetx.ts:57](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/basetx.ts#L57)*

**Returns:** *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[getTxType](api_avm_basetx.basetx.md#gettxtype)*

*Defined in [src/apis/avm/operationtx.ts:55](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L55)*

Returns the id of the [OperationTx](api_avm_operationtx.operationtx.md)

**Returns:** *number*

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

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[select](api_avm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/avm/basetx.ts:143](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/basetx.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[serialize](common_transactions.standardbasetx.md#serialize)*

*Defined in [src/apis/avm/operationtx.ts:31](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L31)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_avm_keychain.keychain.md)): *Array‹[Credential](common_signature.credential.md)›*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[sign](api_avm_basetx.basetx.md#sign)*

*Defined in [src/apis/avm/operationtx.ts:109](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L109)*

Takes the bytes of an [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_avm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_avm_keychain.keychain.md) | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *Array‹[Credential](common_signature.credential.md)›*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[toBuffer](common_transactions.standardbasetx.md#tobuffer)*

*Defined in [src/apis/avm/operationtx.ts:84](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/operationtx.ts#L84)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [OperationTx](api_avm_operationtx.operationtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L126)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
