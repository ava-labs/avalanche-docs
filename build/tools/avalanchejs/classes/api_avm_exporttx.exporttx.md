[avalanche](../README.md) › [API-AVM-ExportTx](../modules/api_avm_exporttx.md) › [ExportTx](api_avm_exporttx.exporttx.md)

# Class: ExportTx

Class representing an unsigned Export transaction.

## Hierarchy

  ↳ [BaseTx](api_avm_basetx.basetx.md)

  ↳ **ExportTx**

## Index

### Constructors

* [constructor](api_avm_exporttx.exporttx.md#constructor)

### Properties

* [_typeID](api_avm_exporttx.exporttx.md#protected-_typeid)
* [_typeName](api_avm_exporttx.exporttx.md#protected-_typename)
* [blockchainid](api_avm_exporttx.exporttx.md#protected-blockchainid)
* [destinationChain](api_avm_exporttx.exporttx.md#protected-destinationchain)
* [exportOuts](api_avm_exporttx.exporttx.md#protected-exportouts)
* [ins](api_avm_exporttx.exporttx.md#protected-ins)
* [memo](api_avm_exporttx.exporttx.md#protected-memo)
* [networkid](api_avm_exporttx.exporttx.md#protected-networkid)
* [numOuts](api_avm_exporttx.exporttx.md#protected-numouts)
* [numins](api_avm_exporttx.exporttx.md#protected-numins)
* [numouts](api_avm_exporttx.exporttx.md#protected-numouts)
* [outs](api_avm_exporttx.exporttx.md#protected-outs)

### Methods

* [clone](api_avm_exporttx.exporttx.md#clone)
* [create](api_avm_exporttx.exporttx.md#create)
* [deserialize](api_avm_exporttx.exporttx.md#deserialize)
* [fromBuffer](api_avm_exporttx.exporttx.md#frombuffer)
* [getBlockchainID](api_avm_exporttx.exporttx.md#getblockchainid)
* [getDestinationChain](api_avm_exporttx.exporttx.md#getdestinationchain)
* [getExportOutputs](api_avm_exporttx.exporttx.md#getexportoutputs)
* [getExportTotal](api_avm_exporttx.exporttx.md#getexporttotal)
* [getIns](api_avm_exporttx.exporttx.md#getins)
* [getMemo](api_avm_exporttx.exporttx.md#getmemo)
* [getNetworkID](api_avm_exporttx.exporttx.md#getnetworkid)
* [getOuts](api_avm_exporttx.exporttx.md#getouts)
* [getTotalOuts](api_avm_exporttx.exporttx.md#gettotalouts)
* [getTxType](api_avm_exporttx.exporttx.md#gettxtype)
* [getTypeID](api_avm_exporttx.exporttx.md#gettypeid)
* [getTypeName](api_avm_exporttx.exporttx.md#gettypename)
* [select](api_avm_exporttx.exporttx.md#select)
* [serialize](api_avm_exporttx.exporttx.md#serialize)
* [sign](api_avm_exporttx.exporttx.md#sign)
* [toBuffer](api_avm_exporttx.exporttx.md#tobuffer)
* [toString](api_avm_exporttx.exporttx.md#tostring)

## Constructors

###  constructor

\+ **new ExportTx**(`networkid`: number, `blockchainid`: Buffer, `outs`: Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›, `ins`: Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›, `memo`: Buffer, `destinationChain`: Buffer, `exportOuts`: Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›): *[ExportTx](api_avm_exporttx.exporttx.md)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[constructor](api_avm_basetx.basetx.md#constructor)*

*Defined in [src/apis/avm/exporttx.ts:137](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L137)*

Class representing an unsigned Export transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkid` | number | DefaultNetworkID | Optional networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainid` | Buffer | Buffer.alloc(32, 16) | Optional blockchainid, default Buffer.alloc(32, 16) |
`outs` | Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)› | undefined | Optional array of the [TransferableOutput](api_avm_outputs.transferableoutput.md)s |
`ins` | Array‹[TransferableInput](api_avm_inputs.transferableinput.md)› | undefined | Optional array of the [TransferableInput](api_avm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field |
`destinationChain` | Buffer | undefined | Optional chainid which identifies where the funds will sent to |
`exportOuts` | Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)› | undefined | Array of [[TransferableOutputs]]s used in the transaction  |

**Returns:** *[ExportTx](api_avm_exporttx.exporttx.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *number* = AVMConstants.EXPORTTX

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeID](api_avm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/avm/exporttx.ts:27](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L27)*

___

### `Protected` _typeName

• **_typeName**: *string* = "ExportTx"

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeName](api_avm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/avm/exporttx.ts:26](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L26)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainid](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L49)*

___

### `Protected` destinationChain

• **destinationChain**: *Buffer* = undefined

*Defined in [src/apis/avm/exporttx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L49)*

___

### `Protected` exportOuts

• **exportOuts**: *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›* = []

*Defined in [src/apis/avm/exporttx.ts:51](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L51)*

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

### `Protected` numOuts

• **numOuts**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/exporttx.ts:50](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L50)*

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

### `Protected` outs

• **outs**: *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[outs](common_transactions.standardbasetx.md#protected-outs)*

*Defined in [src/common/tx.ts:51](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L51)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[clone](api_avm_basetx.basetx.md#clone)*

*Defined in [src/apis/avm/exporttx.ts:129](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L129)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[create](api_avm_basetx.basetx.md#create)*

*Defined in [src/apis/avm/exporttx.ts:135](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[deserialize](api_avm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/avm/exporttx.ts:37](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L37)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[fromBuffer](api_avm_basetx.basetx.md#frombuffer)*

*Defined in [src/apis/avm/exporttx.ts:98](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L98)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [ExportTx](api_avm_exporttx.exporttx.md), parses it, populates the class, and returns the length of the [ExportTx](api_avm_exporttx.exporttx.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [ExportTx](api_avm_exporttx.exporttx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [ExportTx](api_avm_exporttx.exporttx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)*

*Defined in [src/common/tx.ts:69](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L69)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getDestinationChain

▸ **getDestinationChain**(): *Buffer*

*Defined in [src/apis/avm/exporttx.ts:85](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L85)*

Returns a [Buffer](https://github.com/feross/buffer) for the destination chainid.

**Returns:** *Buffer*

___

###  getExportOutputs

▸ **getExportOutputs**(): *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

*Defined in [src/apis/avm/exporttx.ts:63](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L63)*

Returns an array of [TransferableOutput](api_avm_outputs.transferableoutput.md)s in this transaction.

**Returns:** *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

___

###  getExportTotal

▸ **getExportTotal**(): *BN*

*Defined in [src/apis/avm/exporttx.ts:70](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L70)*

Returns the totall exported amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

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

###  getOuts

▸ **getOuts**(): *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getOuts](api_avm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/avm/basetx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/basetx.ts#L49)*

**Returns:** *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

___

###  getTotalOuts

▸ **getTotalOuts**(): *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[getTotalOuts](api_avm_basetx.basetx.md#gettotalouts)*

*Defined in [src/apis/avm/exporttx.ts:78](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L78)*

**Returns:** *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[getTxType](api_avm_basetx.basetx.md#gettxtype)*

*Defined in [src/apis/avm/exporttx.ts:56](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L56)*

Returns the id of the [ExportTx](api_avm_exporttx.exporttx.md)

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

*Defined in [src/apis/avm/exporttx.ts:29](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_avm_keychain.keychain.md)): *Array‹[Credential](common_signature.credential.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[sign](api_avm_basetx.basetx.md#sign)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[sign](common_transactions.standardbasetx.md#abstract-sign)*

*Defined in [src/apis/avm/basetx.ts:116](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/basetx.ts#L116)*

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

*Defined in [src/apis/avm/exporttx.ts:116](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/exporttx.ts#L116)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [ExportTx](api_avm_exporttx.exporttx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L126)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
