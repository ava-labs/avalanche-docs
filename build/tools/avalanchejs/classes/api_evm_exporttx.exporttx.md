[avalanche](../README.md) › [API-EVM-ExportTx](../modules/api_evm_exporttx.md) › [ExportTx](api_evm_exporttx.exporttx.md)

# Class: ExportTx

## Hierarchy

  ↳ [EVMBaseTx](api_evm_basetx.evmbasetx.md)

  ↳ **ExportTx**

## Index

### Constructors

* [constructor](api_evm_exporttx.exporttx.md#constructor)

### Properties

* [_codecID](api_evm_exporttx.exporttx.md#protected-_codecid)
* [_typeID](api_evm_exporttx.exporttx.md#protected-_typeid)
* [_typeName](api_evm_exporttx.exporttx.md#protected-_typename)
* [blockchainid](api_evm_exporttx.exporttx.md#protected-blockchainid)
* [destinationChain](api_evm_exporttx.exporttx.md#protected-destinationchain)
* [exportedOutputs](api_evm_exporttx.exporttx.md#protected-exportedoutputs)
* [inputs](api_evm_exporttx.exporttx.md#protected-inputs)
* [networkid](api_evm_exporttx.exporttx.md#protected-networkid)
* [numExportedOutputs](api_evm_exporttx.exporttx.md#protected-numexportedoutputs)
* [numInputs](api_evm_exporttx.exporttx.md#protected-numinputs)

### Methods

* [clone](api_evm_exporttx.exporttx.md#clone)
* [create](api_evm_exporttx.exporttx.md#create)
* [deserialize](api_evm_exporttx.exporttx.md#deserialize)
* [fromBuffer](api_evm_exporttx.exporttx.md#frombuffer)
* [getBlockchainID](api_evm_exporttx.exporttx.md#getblockchainid)
* [getCodecID](api_evm_exporttx.exporttx.md#getcodecid)
* [getDestinationChain](api_evm_exporttx.exporttx.md#getdestinationchain)
* [getExportedOutputs](api_evm_exporttx.exporttx.md#getexportedoutputs)
* [getInputs](api_evm_exporttx.exporttx.md#getinputs)
* [getNetworkID](api_evm_exporttx.exporttx.md#getnetworkid)
* [getTxType](api_evm_exporttx.exporttx.md#gettxtype)
* [getTypeID](api_evm_exporttx.exporttx.md#gettypeid)
* [getTypeName](api_evm_exporttx.exporttx.md#gettypename)
* [select](api_evm_exporttx.exporttx.md#select)
* [serialize](api_evm_exporttx.exporttx.md#serialize)
* [sign](api_evm_exporttx.exporttx.md#sign)
* [toBuffer](api_evm_exporttx.exporttx.md#tobuffer)
* [toString](api_evm_exporttx.exporttx.md#tostring)

## Constructors

###  constructor

\+ **new ExportTx**(`networkid`: number, `blockchainid`: Buffer, `destinationChain`: Buffer, `inputs`: [EVMInput](api_evm_inputs.evminput.md)[], `exportedOutputs`: [TransferableOutput](api_evm_outputs.transferableoutput.md)[]): *[ExportTx](api_evm_exporttx.exporttx.md)*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[constructor](api_evm_basetx.evmbasetx.md#constructor)*

*Defined in [src/apis/evm/exporttx.ts:156](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L156)*

Class representing a ExportTx.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkid` | number | undefined | Optional networkid |
`blockchainid` | Buffer | Buffer.alloc(32, 16) | Optional blockchainid, default Buffer.alloc(32, 16) |
`destinationChain` | Buffer | Buffer.alloc(32, 16) | Optional destinationChain, default Buffer.alloc(32, 16) |
`inputs` | [EVMInput](api_evm_inputs.evminput.md)[] | undefined | Optional array of the [[EVMInputs]]s |
`exportedOutputs` | [TransferableOutput](api_evm_outputs.transferableoutput.md)[] | undefined | Optional array of the [[EVMOutputs]]s  |

**Returns:** *[ExportTx](api_evm_exporttx.exporttx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *number* = EVMConstants.EXPORTTX

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[_typeID](api_evm_basetx.evmbasetx.md#protected-_typeid)*

*Defined in [src/apis/evm/exporttx.ts:33](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L33)*

___

### `Protected` _typeName

• **_typeName**: *string* = "ExportTx"

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[_typeName](api_evm_basetx.evmbasetx.md#protected-_typename)*

*Defined in [src/apis/evm/exporttx.ts:32](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L32)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[blockchainid](common_transactions.evmstandardbasetx.md#protected-blockchainid)*

*Defined in [src/common/evmtx.ts:45](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L45)*

___

### `Protected` destinationChain

• **destinationChain**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/evm/exporttx.ts:55](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L55)*

___

### `Protected` exportedOutputs

• **exportedOutputs**: *[TransferableOutput](api_evm_outputs.transferableoutput.md)[]* = []

*Defined in [src/apis/evm/exporttx.ts:59](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L59)*

___

### `Protected` inputs

• **inputs**: *[EVMInput](api_evm_inputs.evminput.md)[]* = []

*Defined in [src/apis/evm/exporttx.ts:57](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L57)*

___

### `Protected` networkid

• **networkid**: *Buffer* = Buffer.alloc(4)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[networkid](common_transactions.evmstandardbasetx.md#protected-networkid)*

*Defined in [src/common/evmtx.ts:44](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L44)*

___

### `Protected` numExportedOutputs

• **numExportedOutputs**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/evm/exporttx.ts:58](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L58)*

___

### `Protected` numInputs

• **numInputs**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/evm/exporttx.ts:56](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L56)*

## Methods

###  clone

▸ **clone**(): *this*

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[clone](api_evm_basetx.evmbasetx.md#clone)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[clone](common_transactions.evmstandardbasetx.md#abstract-clone)*

*Defined in [src/apis/evm/basetx.ts:73](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/basetx.ts#L73)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[create](api_evm_basetx.evmbasetx.md#create)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[create](common_transactions.evmstandardbasetx.md#abstract-create)*

*Defined in [src/apis/evm/basetx.ts:79](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/basetx.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[deserialize](api_evm_basetx.evmbasetx.md#deserialize)*

*Defined in [src/apis/evm/exporttx.ts:43](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L43)*

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

*Defined in [src/apis/evm/exporttx.ts:103](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L103)*

Decodes the [ExportTx](api_evm_exporttx.exporttx.md) as a [Buffer](https://github.com/feross/buffer) and returns the size.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getBlockchainID](common_transactions.evmstandardbasetx.md#getblockchainid)*

*Defined in [src/common/evmtx.ts:60](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L60)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getDestinationChain

▸ **getDestinationChain**(): *Buffer*

*Defined in [src/apis/evm/exporttx.ts:64](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L64)*

Returns the destinationChain of the input as [Buffer](https://github.com/feross/buffer)

**Returns:** *Buffer*

___

###  getExportedOutputs

▸ **getExportedOutputs**(): *[TransferableOutput](api_evm_outputs.transferableoutput.md)[]*

*Defined in [src/apis/evm/exporttx.ts:74](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L74)*

Returns the outs as an array of [[EVMOutputs]]

**Returns:** *[TransferableOutput](api_evm_outputs.transferableoutput.md)[]*

___

###  getInputs

▸ **getInputs**(): *[EVMInput](api_evm_inputs.evminput.md)[]*

*Defined in [src/apis/evm/exporttx.ts:69](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L69)*

Returns the inputs as an array of [[EVMInputs]]

**Returns:** *[EVMInput](api_evm_inputs.evminput.md)[]*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getNetworkID](common_transactions.evmstandardbasetx.md#getnetworkid)*

*Defined in [src/common/evmtx.ts:55](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/evmtx.ts#L55)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getTxType

▸ **getTxType**(): *number*

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[getTxType](api_evm_basetx.evmbasetx.md#gettxtype)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getTxType](common_transactions.evmstandardbasetx.md#abstract-gettxtype)*

*Defined in [src/apis/evm/basetx.ts:39](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/basetx.ts#L39)*

Returns the id of the [BaseTx](api_avm_basetx.basetx.md)

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[select](api_evm_basetx.evmbasetx.md#select)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[select](common_transactions.evmstandardbasetx.md#abstract-select)*

*Defined in [src/apis/evm/basetx.ts:83](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/basetx.ts#L83)*

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

*Defined in [src/apis/evm/exporttx.ts:35](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L35)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_evm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[sign](api_evm_basetx.evmbasetx.md#sign)*

*Defined in [src/apis/evm/exporttx.ts:141](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L141)*

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

*Defined in [src/apis/evm/exporttx.ts:79](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L79)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [ExportTx](api_evm_exporttx.exporttx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toString](common_transactions.evmstandardbasetx.md#tostring)*

*Defined in [src/apis/evm/exporttx.ts:129](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/evm/exporttx.ts#L129)*

Returns a base-58 representation of the [ExportTx](api_evm_exporttx.exporttx.md).

**Returns:** *string*
