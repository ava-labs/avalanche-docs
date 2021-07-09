[avalanche](../README.md) › [API-PlatformVM-ValidationTx](../modules/api_platformvm_validationtx.md) › [ValidatorTx](api_platformvm_validationtx.validatortx.md)

# Class: ValidatorTx

Abstract class representing an transactions with validation information.

## Hierarchy

  ↳ [BaseTx](api_platformvm_basetx.basetx.md)

  ↳ **ValidatorTx**

  ↳ [WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md)

## Index

### Constructors

* [constructor](api_platformvm_validationtx.validatortx.md#constructor)

### Properties

* [_codecID](api_platformvm_validationtx.validatortx.md#protected-_codecid)
* [_typeID](api_platformvm_validationtx.validatortx.md#protected-_typeid)
* [_typeName](api_platformvm_validationtx.validatortx.md#protected-_typename)
* [blockchainID](api_platformvm_validationtx.validatortx.md#protected-blockchainid)
* [endTime](api_platformvm_validationtx.validatortx.md#protected-endtime)
* [ins](api_platformvm_validationtx.validatortx.md#protected-ins)
* [memo](api_platformvm_validationtx.validatortx.md#protected-memo)
* [networkID](api_platformvm_validationtx.validatortx.md#protected-networkid)
* [nodeID](api_platformvm_validationtx.validatortx.md#protected-nodeid)
* [numins](api_platformvm_validationtx.validatortx.md#protected-numins)
* [numouts](api_platformvm_validationtx.validatortx.md#protected-numouts)
* [outs](api_platformvm_validationtx.validatortx.md#protected-outs)
* [startTime](api_platformvm_validationtx.validatortx.md#protected-starttime)

### Methods

* [clone](api_platformvm_validationtx.validatortx.md#clone)
* [create](api_platformvm_validationtx.validatortx.md#create)
* [deserialize](api_platformvm_validationtx.validatortx.md#deserialize)
* [fromBuffer](api_platformvm_validationtx.validatortx.md#frombuffer)
* [getBlockchainID](api_platformvm_validationtx.validatortx.md#getblockchainid)
* [getCodecID](api_platformvm_validationtx.validatortx.md#getcodecid)
* [getEndTime](api_platformvm_validationtx.validatortx.md#getendtime)
* [getIns](api_platformvm_validationtx.validatortx.md#getins)
* [getMemo](api_platformvm_validationtx.validatortx.md#getmemo)
* [getNetworkID](api_platformvm_validationtx.validatortx.md#getnetworkid)
* [getNodeID](api_platformvm_validationtx.validatortx.md#getnodeid)
* [getNodeIDString](api_platformvm_validationtx.validatortx.md#getnodeidstring)
* [getOuts](api_platformvm_validationtx.validatortx.md#getouts)
* [getStartTime](api_platformvm_validationtx.validatortx.md#getstarttime)
* [getTotalOuts](api_platformvm_validationtx.validatortx.md#gettotalouts)
* [getTxType](api_platformvm_validationtx.validatortx.md#gettxtype)
* [getTypeID](api_platformvm_validationtx.validatortx.md#gettypeid)
* [getTypeName](api_platformvm_validationtx.validatortx.md#gettypename)
* [select](api_platformvm_validationtx.validatortx.md#select)
* [serialize](api_platformvm_validationtx.validatortx.md#serialize)
* [sign](api_platformvm_validationtx.validatortx.md#sign)
* [toBuffer](api_platformvm_validationtx.validatortx.md#tobuffer)
* [toString](api_platformvm_validationtx.validatortx.md#tostring)

## Constructors

###  constructor

\+ **new ValidatorTx**(`networkID`: number, `blockchainID`: Buffer, `outs`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[], `ins`: [TransferableInput](api_platformvm_inputs.transferableinput.md)[], `memo?`: Buffer, `nodeID?`: Buffer, `startTime?`: BN, `endTime?`: BN): *[ValidatorTx](api_platformvm_validationtx.validatortx.md)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[constructor](api_platformvm_basetx.basetx.md#constructor)*

*Defined in [src/apis/platformvm/validationtx.ts:102](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`networkID` | number |
`blockchainID` | Buffer |
`outs` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[] |
`ins` | [TransferableInput](api_platformvm_inputs.transferableinput.md)[] |
`memo?` | Buffer |
`nodeID?` | Buffer |
`startTime?` | BN |
`endTime?` | BN |

**Returns:** *[ValidatorTx](api_platformvm_validationtx.validatortx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[_typeID](api_platformvm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/validationtx.ts:30](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L30)*

___

### `Protected` _typeName

• **_typeName**: *string* = "ValidatorTx"

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[_typeName](api_platformvm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/platformvm/validationtx.ts:29](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L29)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L52)*

___

### `Protected` endTime

• **endTime**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/platformvm/validationtx.ts:50](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L50)*

___

### `Protected` ins

• **ins**: *[StandardTransferableInput](common_inputs.standardtransferableinput.md)[]*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[ins](common_transactions.standardbasetx.md#protected-ins)*

*Defined in [src/common/tx.ts:56](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L56)*

___

### `Protected` memo

• **memo**: *Buffer* = Buffer.alloc(0)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[memo](common_transactions.standardbasetx.md#protected-memo)*

*Defined in [src/common/tx.ts:57](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L57)*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[networkID](common_transactions.standardbasetx.md#protected-networkid)*

*Defined in [src/common/tx.ts:51](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L51)*

___

### `Protected` nodeID

• **nodeID**: *Buffer* = Buffer.alloc(20)

*Defined in [src/apis/platformvm/validationtx.ts:48](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L48)*

___

### `Protected` numins

• **numins**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numins](common_transactions.standardbasetx.md#protected-numins)*

*Defined in [src/common/tx.ts:55](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L55)*

___

### `Protected` numouts

• **numouts**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numouts](common_transactions.standardbasetx.md#protected-numouts)*

*Defined in [src/common/tx.ts:53](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L53)*

___

### `Protected` outs

• **outs**: *[StandardTransferableOutput](common_output.standardtransferableoutput.md)[]*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[outs](common_transactions.standardbasetx.md#protected-outs)*

*Defined in [src/common/tx.ts:54](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L54)*

___

### `Protected` startTime

• **startTime**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/platformvm/validationtx.ts:49](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L49)*

## Methods

###  clone

▸ **clone**(): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[clone](api_platformvm_basetx.basetx.md#clone)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[clone](common_transactions.standardbasetx.md#abstract-clone)*

*Defined in [src/apis/platformvm/basetx.ts:133](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L133)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[create](api_platformvm_basetx.basetx.md#create)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[create](common_transactions.standardbasetx.md#abstract-create)*

*Defined in [src/apis/platformvm/basetx.ts:139](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[deserialize](api_platformvm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/platformvm/validationtx.ts:41](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L41)*

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

*Defined in [src/apis/platformvm/validationtx.ts:79](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L79)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)*

*Defined in [src/common/tx.ts:72](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L72)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getEndTime

▸ **getEndTime**(): *BN‹›*

*Defined in [src/apis/platformvm/validationtx.ts:75](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L75)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getIns

▸ **getIns**(): *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getIns](api_platformvm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/platformvm/basetx.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L52)*

**Returns:** *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:92](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L92)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:67](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L67)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getNodeID

▸ **getNodeID**(): *Buffer*

*Defined in [src/apis/platformvm/validationtx.ts:55](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L55)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  getNodeIDString

▸ **getNodeIDString**(): *string*

*Defined in [src/apis/platformvm/validationtx.ts:62](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L62)*

Returns a string for the nodeID amount.

**Returns:** *string*

___

###  getOuts

▸ **getOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getOuts](api_platformvm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/platformvm/basetx.ts:48](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L48)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getStartTime

▸ **getStartTime**(): *BN‹›*

*Defined in [src/apis/platformvm/validationtx.ts:68](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L68)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getTotalOuts

▸ **getTotalOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getTotalOuts](api_platformvm_basetx.basetx.md#gettotalouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/platformvm/basetx.ts:57](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L57)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getTxType

▸ **getTxType**(): *number*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getTxType](api_platformvm_basetx.basetx.md#gettxtype)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTxType](common_transactions.standardbasetx.md#abstract-gettxtype)*

*Defined in [src/apis/platformvm/basetx.ts:64](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L64)*

Returns the id of the [BaseTx](api_platformvm_basetx.basetx.md)

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[select](api_platformvm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/platformvm/basetx.ts:143](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L143)*

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

*Defined in [src/apis/platformvm/validationtx.ts:32](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L32)*

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

*Defined in [src/apis/platformvm/basetx.ts:116](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L116)*

Takes the bytes of an [UnsignedTx](api_platformvm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_platformvm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_platformvm_keychain.keychain.md) | An [KeyChain](api_platformvm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[toBuffer](common_transactions.standardbasetx.md#tobuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:93](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/validationtx.ts#L93)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [ValidatorTx](api_platformvm_validationtx.validatortx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:129](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L129)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
