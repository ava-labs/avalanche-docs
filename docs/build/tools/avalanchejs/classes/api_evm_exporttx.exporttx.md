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
* [blockchainID](api_evm_exporttx.exporttx.md#protected-blockchainid)
* [destinationChain](api_evm_exporttx.exporttx.md#protected-destinationchain)
* [exportedOutputs](api_evm_exporttx.exporttx.md#protected-exportedoutputs)
* [inputs](api_evm_exporttx.exporttx.md#protected-inputs)
* [networkID](api_evm_exporttx.exporttx.md#protected-networkid)
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
* [sanitizeObject](api_evm_exporttx.exporttx.md#sanitizeobject)
* [select](api_evm_exporttx.exporttx.md#select)
* [serialize](api_evm_exporttx.exporttx.md#serialize)
* [sign](api_evm_exporttx.exporttx.md#sign)
* [toBuffer](api_evm_exporttx.exporttx.md#tobuffer)
* [toString](api_evm_exporttx.exporttx.md#tostring)

## Constructors

###  constructor

\+ **new ExportTx**(`networkID`: number, `blockchainID`: Buffer, `destinationChain`: Buffer, `inputs`: [EVMInput](api_evm_inputs.evminput.md)[], `exportedOutputs`: [TransferableOutput](api_evm_outputs.transferableoutput.md)[]): *[ExportTx](api_evm_exporttx.exporttx.md)*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[constructor](api_evm_basetx.evmbasetx.md#constructor)*

*Defined in [src/apis/evm/exporttx.ts:179](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L179)*

Class representing a ExportTx.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | undefined | Optional networkID |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16) |
`destinationChain` | Buffer | Buffer.alloc(32, 16) | Optional destinationChain, default Buffer.alloc(32, 16) |
`inputs` | [EVMInput](api_evm_inputs.evminput.md)[] | undefined | Optional array of the [[EVMInputs]]s |
`exportedOutputs` | [TransferableOutput](api_evm_outputs.transferableoutput.md)[] | undefined | Optional array of the [[EVMOutputs]]s  |

**Returns:** *[ExportTx](api_evm_exporttx.exporttx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = EVMConstants.EXPORTTX

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[_typeID](api_evm_basetx.evmbasetx.md#protected-_typeid)*

*Defined in [src/apis/evm/exporttx.ts:30](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L30)*

___

### `Protected` _typeName

• **_typeName**: *string* = "ExportTx"

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[_typeName](api_evm_basetx.evmbasetx.md#protected-_typename)*

*Defined in [src/apis/evm/exporttx.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L29)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[blockchainID](common_transactions.evmstandardbasetx.md#protected-blockchainid)*

*Defined in [src/common/evmtx.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L74)*

___

### `Protected` destinationChain

• **destinationChain**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/evm/exporttx.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L63)*

___

### `Protected` exportedOutputs

• **exportedOutputs**: *[TransferableOutput](api_evm_outputs.transferableoutput.md)[]* = []

*Defined in [src/apis/evm/exporttx.ts:67](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L67)*

___

### `Protected` inputs

• **inputs**: *[EVMInput](api_evm_inputs.evminput.md)[]* = []

*Defined in [src/apis/evm/exporttx.ts:65](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L65)*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[networkID](common_transactions.evmstandardbasetx.md#protected-networkid)*

*Defined in [src/common/evmtx.ts:73](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L73)*

___

### `Protected` numExportedOutputs

• **numExportedOutputs**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/evm/exporttx.ts:66](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L66)*

___

### `Protected` numInputs

• **numInputs**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/evm/exporttx.ts:64](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L64)*

## Methods

###  clone

▸ **clone**(): *this*

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[clone](api_evm_basetx.evmbasetx.md#clone)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[clone](common_transactions.evmstandardbasetx.md#abstract-clone)*

*Defined in [src/apis/evm/basetx.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L70)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[create](api_evm_basetx.evmbasetx.md#create)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[create](common_transactions.evmstandardbasetx.md#abstract-create)*

*Defined in [src/apis/evm/basetx.ts:76](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[deserialize](api_evm_basetx.evmbasetx.md#deserialize)*

*Defined in [src/apis/evm/exporttx.ts:45](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L45)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[fromBuffer](api_evm_basetx.evmbasetx.md#frombuffer)*

*Defined in [src/apis/evm/exporttx.ts:126](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L126)*

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

*Defined in [src/common/evmtx.ts:91](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L91)*

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

*Defined in [src/apis/evm/exporttx.ts:72](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L72)*

Returns the destinationChain as a [Buffer](https://github.com/feross/buffer)

**Returns:** *Buffer*

___

###  getExportedOutputs

▸ **getExportedOutputs**(): *[TransferableOutput](api_evm_outputs.transferableoutput.md)[]*

*Defined in [src/apis/evm/exporttx.ts:86](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L86)*

Returns the outs as an array of [[EVMOutputs]]

**Returns:** *[TransferableOutput](api_evm_outputs.transferableoutput.md)[]*

___

###  getInputs

▸ **getInputs**(): *[EVMInput](api_evm_inputs.evminput.md)[]*

*Defined in [src/apis/evm/exporttx.ts:79](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L79)*

Returns the inputs as an array of [[EVMInputs]]

**Returns:** *[EVMInput](api_evm_inputs.evminput.md)[]*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getNetworkID](common_transactions.evmstandardbasetx.md#getnetworkid)*

*Defined in [src/common/evmtx.ts:84](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L84)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getTxType

▸ **getTxType**(): *number*

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[getTxType](api_evm_basetx.evmbasetx.md#gettxtype)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getTxType](common_transactions.evmstandardbasetx.md#abstract-gettxtype)*

*Defined in [src/apis/evm/basetx.ts:36](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L36)*

Returns the id of the [BaseTx](api_avm_basetx.basetx.md)

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

*Inherited from [EVMBaseTx](api_evm_basetx.evmbasetx.md).[select](api_evm_basetx.evmbasetx.md#select)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[select](common_transactions.evmstandardbasetx.md#abstract-select)*

*Defined in [src/apis/evm/basetx.ts:80](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[serialize](common_transactions.evmstandardbasetx.md#serialize)*

*Defined in [src/apis/evm/exporttx.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_evm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Overrides [EVMBaseTx](api_evm_basetx.evmbasetx.md).[sign](api_evm_basetx.evmbasetx.md#sign)*

*Defined in [src/apis/evm/exporttx.ts:164](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L164)*

Takes the bytes of an [UnsignedTx](api_evm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_evm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_evm_keychain.keychain.md) | An [KeyChain](api_evm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toBuffer](common_transactions.evmstandardbasetx.md#tobuffer)*

*Defined in [src/apis/evm/exporttx.ts:93](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L93)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [ExportTx](api_evm_exporttx.exporttx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toString](common_transactions.evmstandardbasetx.md#tostring)*

*Defined in [src/apis/evm/exporttx.ts:152](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/exporttx.ts#L152)*

Returns a base-58 representation of the [ExportTx](api_evm_exporttx.exporttx.md).

**Returns:** *string*
