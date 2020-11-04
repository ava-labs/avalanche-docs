[avalanche](../README.md) › [API-AVM-ImportTx](../modules/api_avm_importtx.md) › [ImportTx](api_avm_importtx.importtx.md)

# Class: ImportTx

Class representing an unsigned Import transaction.

## Hierarchy

  ↳ [BaseTx](api_avm_basetx.basetx.md)

  ↳ **ImportTx**

## Index

### Constructors

* [constructor](api_avm_importtx.importtx.md#constructor)

### Properties

* [_typeID](api_avm_importtx.importtx.md#protected-_typeid)
* [_typeName](api_avm_importtx.importtx.md#protected-_typename)
* [blockchainid](api_avm_importtx.importtx.md#protected-blockchainid)
* [importIns](api_avm_importtx.importtx.md#protected-importins)
* [ins](api_avm_importtx.importtx.md#protected-ins)
* [memo](api_avm_importtx.importtx.md#protected-memo)
* [networkid](api_avm_importtx.importtx.md#protected-networkid)
* [numIns](api_avm_importtx.importtx.md#protected-numins)
* [numins](api_avm_importtx.importtx.md#protected-numins)
* [numouts](api_avm_importtx.importtx.md#protected-numouts)
* [outs](api_avm_importtx.importtx.md#protected-outs)
* [sourceChain](api_avm_importtx.importtx.md#protected-sourcechain)

### Methods

* [clone](api_avm_importtx.importtx.md#clone)
* [create](api_avm_importtx.importtx.md#create)
* [deserialize](api_avm_importtx.importtx.md#deserialize)
* [fromBuffer](api_avm_importtx.importtx.md#frombuffer)
* [getBlockchainID](api_avm_importtx.importtx.md#getblockchainid)
* [getImportInputs](api_avm_importtx.importtx.md#getimportinputs)
* [getIns](api_avm_importtx.importtx.md#getins)
* [getMemo](api_avm_importtx.importtx.md#getmemo)
* [getNetworkID](api_avm_importtx.importtx.md#getnetworkid)
* [getOuts](api_avm_importtx.importtx.md#getouts)
* [getSourceChain](api_avm_importtx.importtx.md#getsourcechain)
* [getTotalOuts](api_avm_importtx.importtx.md#gettotalouts)
* [getTxType](api_avm_importtx.importtx.md#gettxtype)
* [getTypeID](api_avm_importtx.importtx.md#gettypeid)
* [getTypeName](api_avm_importtx.importtx.md#gettypename)
* [select](api_avm_importtx.importtx.md#select)
* [serialize](api_avm_importtx.importtx.md#serialize)
* [sign](api_avm_importtx.importtx.md#sign)
* [toBuffer](api_avm_importtx.importtx.md#tobuffer)
* [toString](api_avm_importtx.importtx.md#tostring)

## Constructors

###  constructor

\+ **new ImportTx**(`networkid`: number, `blockchainid`: Buffer, `outs`: Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›, `ins`: Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›, `memo`: Buffer, `sourceChain`: Buffer, `importIns`: Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›): *[ImportTx](api_avm_importtx.importtx.md)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[constructor](api_avm_basetx.basetx.md#constructor)*

*Defined in [src/apis/avm/importtx.ts:147](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L147)*

Class representing an unsigned Import transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkid` | number | DefaultNetworkID | Optional networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainid` | Buffer | Buffer.alloc(32, 16) | Optional blockchainid, default Buffer.alloc(32, 16) |
`outs` | Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)› | undefined | Optional array of the [TransferableOutput](api_avm_outputs.transferableoutput.md)s |
`ins` | Array‹[TransferableInput](api_avm_inputs.transferableinput.md)› | undefined | Optional array of the [TransferableInput](api_avm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field |
`sourceChain` | Buffer | undefined | Optional chainid for the source inputs to import. Default platform chainid. |
`importIns` | Array‹[TransferableInput](api_avm_inputs.transferableinput.md)› | undefined | Array of [TransferableInput](api_avm_inputs.transferableinput.md)s used in the transaction  |

**Returns:** *[ImportTx](api_avm_importtx.importtx.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *number* = AVMConstants.IMPORTTX

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeID](api_avm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/avm/importtx.ts:28](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L28)*

___

### `Protected` _typeName

• **_typeName**: *string* = "ImportTx"

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeName](api_avm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/avm/importtx.ts:27](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L27)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainid](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L49)*

___

### `Protected` importIns

• **importIns**: *Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›* = []

*Defined in [src/apis/avm/importtx.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L52)*

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

### `Protected` numIns

• **numIns**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/importtx.ts:51](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L51)*

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

___

### `Protected` sourceChain

• **sourceChain**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/avm/importtx.ts:50](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L50)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[clone](api_avm_basetx.basetx.md#clone)*

*Defined in [src/apis/avm/importtx.ts:114](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L114)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[create](api_avm_basetx.basetx.md#create)*

*Defined in [src/apis/avm/importtx.ts:120](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[deserialize](api_avm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/avm/importtx.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L38)*

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

*Defined in [src/apis/avm/importtx.ts:77](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L77)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [ImportTx](api_avm_importtx.importtx.md), parses it, populates the class, and returns the length of the [ImportTx](api_avm_importtx.importtx.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [ImportTx](api_avm_importtx.importtx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [ImportTx](api_avm_importtx.importtx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)*

*Defined in [src/common/tx.ts:69](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L69)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getImportInputs

▸ **getImportInputs**(): *Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›*

*Defined in [src/apis/avm/importtx.ts:110](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L110)*

Returns an array of [TransferableInput](api_avm_inputs.transferableinput.md)s in this transaction.

**Returns:** *Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›*

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

###  getSourceChain

▸ **getSourceChain**(): *Buffer*

*Defined in [src/apis/avm/importtx.ts:64](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L64)*

Returns a [Buffer](https://github.com/feross/buffer) for the source chainid.

**Returns:** *Buffer*

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

*Defined in [src/apis/avm/importtx.ts:57](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L57)*

Returns the id of the [ImportTx](api_avm_importtx.importtx.md)

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

*Defined in [src/apis/avm/importtx.ts:30](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L30)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_avm_keychain.keychain.md)): *Array‹[Credential](common_signature.credential.md)›*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[sign](api_avm_basetx.basetx.md#sign)*

*Defined in [src/apis/avm/importtx.ts:132](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L132)*

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

*Defined in [src/apis/avm/importtx.ts:95](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/importtx.ts#L95)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [ImportTx](api_avm_importtx.importtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L126)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
