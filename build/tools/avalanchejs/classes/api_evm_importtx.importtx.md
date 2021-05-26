[avalanche](../README.md) › [API-EVM-ImportTx](../modules/api_evm_importtx.md) › [ImportTx](api_evm_importtx.importtx.md)

# Class: ImportTx

Class representing an unsigned Import transaction.

## Hierarchy

  ↳ [EVMBaseTx](api_evm_basetx.evmbasetx.md)

  ↳ **ImportTx**

## Index

### Constructors

* [constructor](api_evm_importtx.importtx.md#constructor)

### Properties

* [_codecID](api_evm_importtx.importtx.md#protected-_codecid)
* [_typeID](api_evm_importtx.importtx.md#protected-_typeid)
* [_typeName](api_evm_importtx.importtx.md#protected-_typename)
* [blockchainid](api_evm_importtx.importtx.md#protected-blockchainid)
* [importIns](api_evm_importtx.importtx.md#protected-importins)
* [networkid](api_evm_importtx.importtx.md#protected-networkid)
* [numIns](api_evm_importtx.importtx.md#protected-numins)
* [numOuts](api_evm_importtx.importtx.md#protected-numouts)
* [outs](api_evm_importtx.importtx.md#protected-outs)
* [sourceChain](api_evm_importtx.importtx.md#protected-sourcechain)

### Methods

* [clone](api_evm_importtx.importtx.md#clone)
* [create](api_evm_importtx.importtx.md#create)
* [deserialize](api_evm_importtx.importtx.md#deserialize)
* [fromBuffer](api_evm_importtx.importtx.md#frombuffer)
* [getBlockchainID](api_evm_importtx.importtx.md#getblockchainid)
* [getCodecID](api_evm_importtx.importtx.md#getcodecid)
* [getImportInputs](api_evm_importtx.importtx.md#getimportinputs)
* [getNetworkID](api_evm_importtx.importtx.md#getnetworkid)
* [getOuts](api_evm_importtx.importtx.md#getouts)
* [getSourceChain](api_evm_importtx.importtx.md#getsourcechain)
* [getTxType](api_evm_importtx.importtx.md#gettxtype)
* [getTypeID](api_evm_importtx.importtx.md#gettypeid)
* [getTypeName](api_evm_importtx.importtx.md#gettypename)
* [select](api_evm_importtx.importtx.md#select)
* [serialize](api_evm_importtx.importtx.md#serialize)
* [sign](api_evm_importtx.importtx.md#sign)
* [toBuffer](api_evm_importtx.importtx.md#tobuffer)
* [toString](api_evm_importtx.importtx.md#tostring)
* [validateOuts](api_evm_importtx.importtx.md#private-validateouts)

## Constructors

###  constructor

\+ **new ImportTx**(`networkid`: number, `blockchainid`: Buffer, `sourceChainid`: Buffer, `importIns`: [TransferableInput](api_evm_inputs.transferableinput.md)[], `outs`: [EVMOutput](api_evm_outputs.evmoutput.md)[]): *[ImportTx](api_evm_importtx.importtx.md)*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[constructor](api_evm_basetx.evmbasetx.md#constructor)*

*Defined in [src/apis/evm/importtx.ts:190](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L190)*

Class representing an unsigned Import transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkid` | number | DefaultNetworkID | Optional networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainid` | Buffer | Buffer.alloc(32, 16) | Optional blockchainid, default Buffer.alloc(32, 16) |
`sourceChainid` | Buffer | Buffer.alloc(32, 16) | Optional chainid for the source inputs to import. Default platform chainid. |
`importIns` | [TransferableInput](api_evm_inputs.transferableinput.md)[] | undefined | Array of [TransferableInput](api_avm_inputs.transferableinput.md)s used in the transaction |
`outs` | [EVMOutput](api_evm_outputs.evmoutput.md)[] | undefined | Optional array of the [EVMOutput](api_evm_outputs.evmoutput.md)s  |

**Returns:** *[ImportTx](api_evm_importtx.importtx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *number* = EVMConstants.IMPORTTX

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[_typeID](api_evm_basetx.evmbasetx.md#protected-_typeid)*

*Defined in [src/apis/evm/importtx.ts:42](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L42)*

___

### `Protected` _typeName

• **_typeName**: *string* = "ImportTx"

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[_typeName](api_evm_basetx.evmbasetx.md#protected-_typename)*

*Defined in [src/apis/evm/importtx.ts:41](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L41)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[blockchainid](common_transactions.evmstandardbasetx.md#protected-blockchainid)*

*Defined in [src/common/evmtx.ts:45](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/evmtx.ts#L45)*

___

### `Protected` importIns

• **importIns**: *[TransferableInput](api_evm_inputs.transferableinput.md)[]* = []

*Defined in [src/apis/evm/importtx.ts:66](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L66)*

___

### `Protected` networkid

• **networkid**: *Buffer* = Buffer.alloc(4)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[networkid](common_transactions.evmstandardbasetx.md#protected-networkid)*

*Defined in [src/common/evmtx.ts:44](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/evmtx.ts#L44)*

___

### `Protected` numIns

• **numIns**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/evm/importtx.ts:65](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L65)*

___

### `Protected` numOuts

• **numOuts**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/evm/importtx.ts:67](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L67)*

___

### `Protected` outs

• **outs**: *[EVMOutput](api_evm_outputs.evmoutput.md)[]* = []

*Defined in [src/apis/evm/importtx.ts:68](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L68)*

___

### `Protected` sourceChain

• **sourceChain**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/evm/importtx.ts:64](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L64)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[clone](api_evm_basetx.evmbasetx.md#clone)*

*Defined in [src/apis/evm/importtx.ts:157](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L157)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[create](api_evm_basetx.evmbasetx.md#create)*

*Defined in [src/apis/evm/importtx.ts:163](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[deserialize](api_evm_basetx.evmbasetx.md#deserialize)*

*Defined in [src/apis/evm/importtx.ts:52](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L52)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[fromBuffer](api_evm_basetx.evmbasetx.md#frombuffer)*

*Defined in [src/apis/evm/importtx.ts:95](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L95)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [ImportTx](api_evm_importtx.importtx.md), parses it,
populates the class, and returns the length of the [ImportTx](api_evm_importtx.importtx.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [ImportTx](api_evm_importtx.importtx.md) |
`offset` | number | 0 | A number representing the byte offset. Defaults to 0.  |

**Returns:** *number*

The length of the raw [ImportTx](api_evm_importtx.importtx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getBlockchainID](common_transactions.evmstandardbasetx.md#getblockchainid)*

*Defined in [src/common/evmtx.ts:60](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/evmtx.ts#L60)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getImportInputs

▸ **getImportInputs**(): *[TransferableInput](api_evm_inputs.transferableinput.md)[]*

*Defined in [src/apis/evm/importtx.ts:146](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L146)*

Returns an array of [TransferableInput](api_avm_inputs.transferableinput.md)s in this transaction.

**Returns:** *[TransferableInput](api_evm_inputs.transferableinput.md)[]*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getNetworkID](common_transactions.evmstandardbasetx.md#getnetworkid)*

*Defined in [src/common/evmtx.ts:55](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/evmtx.ts#L55)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getOuts

▸ **getOuts**(): *[EVMOutput](api_evm_outputs.evmoutput.md)[]*

*Defined in [src/apis/evm/importtx.ts:153](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L153)*

Returns an array of [EVMOutput](api_evm_outputs.evmoutput.md)s in this transaction.

**Returns:** *[EVMOutput](api_evm_outputs.evmoutput.md)[]*

___

###  getSourceChain

▸ **getSourceChain**(): *Buffer*

*Defined in [src/apis/evm/importtx.ts:80](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L80)*

Returns a [Buffer](https://github.com/feross/buffer) for the source chainid.

**Returns:** *Buffer*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[getTxType](api_evm_basetx.evmbasetx.md#gettxtype)*

*Defined in [src/apis/evm/importtx.ts:73](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L73)*

Returns the id of the [ImportTx](api_evm_importtx.importtx.md)

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[select](api_evm_basetx.evmbasetx.md#select)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[select](common_transactions.evmstandardbasetx.md#abstract-select)*

*Defined in [src/apis/evm/basetx.ts:83](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/basetx.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[serialize](common_transactions.evmstandardbasetx.md#serialize)*

*Defined in [src/apis/evm/importtx.ts:44](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L44)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_evm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[sign](api_evm_basetx.evmbasetx.md#sign)*

*Defined in [src/apis/evm/importtx.ts:175](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L175)*

Takes the bytes of an [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_avm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_evm_keychain.keychain.md) | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toBuffer](common_transactions.evmstandardbasetx.md#tobuffer)*

*Defined in [src/apis/evm/importtx.ts:121](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L121)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [ImportTx](api_evm_importtx.importtx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toString](common_transactions.evmstandardbasetx.md#tostring)*

*Defined in [src/common/evmtx.ts:75](https://github.com/ava-labs/avalanchejs/blob/9282770/src/common/evmtx.ts#L75)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*

___

### `Private` validateOuts

▸ **validateOuts**(): *void*

*Defined in [src/apis/evm/importtx.ts:238](https://github.com/ava-labs/avalanchejs/blob/9282770/src/apis/evm/importtx.ts#L238)*

**Returns:** *void*
