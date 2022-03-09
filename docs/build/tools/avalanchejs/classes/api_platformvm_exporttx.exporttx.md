[avalanche](../README.md) › [API-PlatformVM-ExportTx](../modules/api_platformvm_exporttx.md) › [ExportTx](api_platformvm_exporttx.exporttx.md)

# Class: ExportTx

Class representing an unsigned Export transaction.

## Hierarchy

  ↳ [BaseTx](api_platformvm_basetx.basetx.md)

  ↳ **ExportTx**

## Index

### Constructors

* [constructor](api_platformvm_exporttx.exporttx.md#constructor)

### Properties

* [_codecID](api_platformvm_exporttx.exporttx.md#protected-_codecid)
* [_typeID](api_platformvm_exporttx.exporttx.md#protected-_typeid)
* [_typeName](api_platformvm_exporttx.exporttx.md#protected-_typename)
* [blockchainID](api_platformvm_exporttx.exporttx.md#protected-blockchainid)
* [destinationChain](api_platformvm_exporttx.exporttx.md#protected-destinationchain)
* [exportOuts](api_platformvm_exporttx.exporttx.md#protected-exportouts)
* [ins](api_platformvm_exporttx.exporttx.md#protected-ins)
* [memo](api_platformvm_exporttx.exporttx.md#protected-memo)
* [networkID](api_platformvm_exporttx.exporttx.md#protected-networkid)
* [numOuts](api_platformvm_exporttx.exporttx.md#protected-numouts)
* [numins](api_platformvm_exporttx.exporttx.md#protected-numins)
* [numouts](api_platformvm_exporttx.exporttx.md#protected-numouts)
* [outs](api_platformvm_exporttx.exporttx.md#protected-outs)

### Methods

* [clone](api_platformvm_exporttx.exporttx.md#clone)
* [create](api_platformvm_exporttx.exporttx.md#create)
* [deserialize](api_platformvm_exporttx.exporttx.md#deserialize)
* [fromBuffer](api_platformvm_exporttx.exporttx.md#frombuffer)
* [getBlockchainID](api_platformvm_exporttx.exporttx.md#getblockchainid)
* [getCodecID](api_platformvm_exporttx.exporttx.md#getcodecid)
* [getDestinationChain](api_platformvm_exporttx.exporttx.md#getdestinationchain)
* [getExportOutputs](api_platformvm_exporttx.exporttx.md#getexportoutputs)
* [getExportTotal](api_platformvm_exporttx.exporttx.md#getexporttotal)
* [getIns](api_platformvm_exporttx.exporttx.md#getins)
* [getMemo](api_platformvm_exporttx.exporttx.md#getmemo)
* [getNetworkID](api_platformvm_exporttx.exporttx.md#getnetworkid)
* [getOuts](api_platformvm_exporttx.exporttx.md#getouts)
* [getTotalOuts](api_platformvm_exporttx.exporttx.md#gettotalouts)
* [getTxType](api_platformvm_exporttx.exporttx.md#gettxtype)
* [getTypeID](api_platformvm_exporttx.exporttx.md#gettypeid)
* [getTypeName](api_platformvm_exporttx.exporttx.md#gettypename)
* [sanitizeObject](api_platformvm_exporttx.exporttx.md#sanitizeobject)
* [select](api_platformvm_exporttx.exporttx.md#select)
* [serialize](api_platformvm_exporttx.exporttx.md#serialize)
* [sign](api_platformvm_exporttx.exporttx.md#sign)
* [toBuffer](api_platformvm_exporttx.exporttx.md#tobuffer)
* [toString](api_platformvm_exporttx.exporttx.md#tostring)

## Constructors

###  constructor

\+ **new ExportTx**(`networkID`: number, `blockchainID`: Buffer, `outs`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[], `ins`: [TransferableInput](api_platformvm_inputs.transferableinput.md)[], `memo`: Buffer, `destinationChain`: Buffer, `exportOuts`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]): *[ExportTx](api_platformvm_exporttx.exporttx.md)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[constructor](api_platformvm_basetx.basetx.md#constructor)*

*Defined in [src/apis/platformvm/exporttx.ts:156](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L156)*

Class representing an unsigned Export transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional networkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16) |
`outs` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[] | undefined | Optional array of the [TransferableOutput](api_evm_outputs.transferableoutput.md)s |
`ins` | [TransferableInput](api_platformvm_inputs.transferableinput.md)[] | undefined | Optional array of the [TransferableInput](api_evm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field |
`destinationChain` | Buffer | undefined | Optional chainid which identifies where the funds will send to. |
`exportOuts` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[] | undefined | Array of [[TransferableOutputs]]s used in the transaction  |

**Returns:** *[ExportTx](api_platformvm_exporttx.exporttx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.EXPORTTX

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[_typeID](api_platformvm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/exporttx.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L28)*

___

### `Protected` _typeName

• **_typeName**: *string* = "ExportTx"

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[_typeName](api_platformvm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/platformvm/exporttx.ts:27](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L27)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:82](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L82)*

___

### `Protected` destinationChain

• **destinationChain**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/platformvm/exporttx.ts:61](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L61)*

___

### `Protected` exportOuts

• **exportOuts**: *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]* = []

*Defined in [src/apis/platformvm/exporttx.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L63)*

___

### `Protected` ins

• **ins**: *[StandardTransferableInput](common_inputs.standardtransferableinput.md)[]*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[ins](common_transactions.standardbasetx.md#protected-ins)*

*Defined in [src/common/tx.ts:86](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L86)*

___

### `Protected` memo

• **memo**: *Buffer* = Buffer.alloc(0)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[memo](common_transactions.standardbasetx.md#protected-memo)*

*Defined in [src/common/tx.ts:87](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L87)*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[networkID](common_transactions.standardbasetx.md#protected-networkid)*

*Defined in [src/common/tx.ts:81](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L81)*

___

### `Protected` numOuts

• **numOuts**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/platformvm/exporttx.ts:62](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L62)*

___

### `Protected` numins

• **numins**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numins](common_transactions.standardbasetx.md#protected-numins)*

*Defined in [src/common/tx.ts:85](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L85)*

___

### `Protected` numouts

• **numouts**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numouts](common_transactions.standardbasetx.md#protected-numouts)*

*Defined in [src/common/tx.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L83)*

___

### `Protected` outs

• **outs**: *[StandardTransferableOutput](common_output.standardtransferableoutput.md)[]*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[outs](common_transactions.standardbasetx.md#protected-outs)*

*Defined in [src/common/tx.ts:84](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L84)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[clone](api_platformvm_basetx.basetx.md#clone)*

*Defined in [src/apis/platformvm/exporttx.ts:148](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L148)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[create](api_platformvm_basetx.basetx.md#create)*

*Defined in [src/apis/platformvm/exporttx.ts:154](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[deserialize](api_platformvm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/platformvm/exporttx.ts:43](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L43)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[fromBuffer](api_platformvm_basetx.basetx.md#frombuffer)*

*Defined in [src/apis/platformvm/exporttx.ts:115](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L115)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [ExportTx](api_platformvm_exporttx.exporttx.md), parses it, populates the class, and returns the length of the [ExportTx](api_platformvm_exporttx.exporttx.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [ExportTx](api_platformvm_exporttx.exporttx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [ExportTx](api_platformvm_exporttx.exporttx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)*

*Defined in [src/common/tx.ts:104](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L104)*

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

###  getDestinationChain

▸ **getDestinationChain**(): *Buffer*

*Defined in [src/apis/platformvm/exporttx.ts:102](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L102)*

Returns the destinationChain as a [Buffer](https://github.com/feross/buffer)

**Returns:** *Buffer*

___

###  getExportOutputs

▸ **getExportOutputs**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Defined in [src/apis/platformvm/exporttx.ts:75](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L75)*

Returns an array of [TransferableOutput](api_evm_outputs.transferableoutput.md)s in this transaction.

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getExportTotal

▸ **getExportTotal**(): *BN*

*Defined in [src/apis/platformvm/exporttx.ts:82](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L82)*

Returns the total exported amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  getIns

▸ **getIns**(): *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getIns](api_platformvm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/platformvm/basetx.ts:52](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L52)*

**Returns:** *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L126)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:97](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L97)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getOuts

▸ **getOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getOuts](api_platformvm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/platformvm/basetx.ts:48](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L48)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getTotalOuts

▸ **getTotalOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[getTotalOuts](api_platformvm_basetx.basetx.md#gettotalouts)*

*Defined in [src/apis/platformvm/exporttx.ts:92](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L92)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[getTxType](api_platformvm_basetx.basetx.md#gettxtype)*

*Defined in [src/apis/platformvm/exporttx.ts:68](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L68)*

Returns the id of the [ExportTx](api_platformvm_exporttx.exporttx.md)

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

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[select](api_platformvm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/platformvm/basetx.ts:146](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[serialize](common_transactions.standardbasetx.md#serialize)*

*Defined in [src/apis/platformvm/exporttx.ts:30](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L30)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_platformvm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[sign](api_platformvm_basetx.basetx.md#sign)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[sign](common_transactions.standardbasetx.md#abstract-sign)*

*Defined in [src/apis/platformvm/basetx.ts:117](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L117)*

Takes the bytes of an [UnsignedTx](api_evm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_evm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_platformvm_keychain.keychain.md) | An [KeyChain](api_evm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[toBuffer](common_transactions.standardbasetx.md#tobuffer)*

*Defined in [src/apis/platformvm/exporttx.ts:133](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/exporttx.ts#L133)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [ExportTx](api_platformvm_exporttx.exporttx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L166)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
