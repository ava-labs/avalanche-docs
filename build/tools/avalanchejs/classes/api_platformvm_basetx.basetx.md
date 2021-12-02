[avalanche](../README.md) › [API-PlatformVM-BaseTx](../modules/api_platformvm_basetx.md) › [BaseTx](api_platformvm_basetx.basetx.md)

# Class: BaseTx

Class representing a base for all transactions.

## Hierarchy

  ↳ [StandardBaseTx](common_transactions.standardbasetx.md)‹[KeyPair](api_platformvm_keychain.keypair.md), [KeyChain](api_platformvm_keychain.keychain.md)›

  ↳ **BaseTx**

  ↳ [ImportTx](api_platformvm_importtx.importtx.md)

  ↳ [ExportTx](api_platformvm_exporttx.exporttx.md)

  ↳ [ValidatorTx](api_platformvm_validationtx.validatortx.md)

  ↳ [CreateSubnetTx](api_platformvm_createsubnettx.createsubnettx.md)

## Index

### Constructors

* [constructor](api_platformvm_basetx.basetx.md#constructor)

### Properties

* [_codecID](api_platformvm_basetx.basetx.md#protected-_codecid)
* [_typeID](api_platformvm_basetx.basetx.md#protected-_typeid)
* [_typeName](api_platformvm_basetx.basetx.md#protected-_typename)
* [blockchainID](api_platformvm_basetx.basetx.md#protected-blockchainid)
* [ins](api_platformvm_basetx.basetx.md#protected-ins)
* [memo](api_platformvm_basetx.basetx.md#protected-memo)
* [networkID](api_platformvm_basetx.basetx.md#protected-networkid)
* [numins](api_platformvm_basetx.basetx.md#protected-numins)
* [numouts](api_platformvm_basetx.basetx.md#protected-numouts)
* [outs](api_platformvm_basetx.basetx.md#protected-outs)

### Methods

* [clone](api_platformvm_basetx.basetx.md#clone)
* [create](api_platformvm_basetx.basetx.md#create)
* [deserialize](api_platformvm_basetx.basetx.md#deserialize)
* [fromBuffer](api_platformvm_basetx.basetx.md#frombuffer)
* [getBlockchainID](api_platformvm_basetx.basetx.md#getblockchainid)
* [getCodecID](api_platformvm_basetx.basetx.md#getcodecid)
* [getIns](api_platformvm_basetx.basetx.md#getins)
* [getMemo](api_platformvm_basetx.basetx.md#getmemo)
* [getNetworkID](api_platformvm_basetx.basetx.md#getnetworkid)
* [getOuts](api_platformvm_basetx.basetx.md#getouts)
* [getTotalOuts](api_platformvm_basetx.basetx.md#gettotalouts)
* [getTxType](api_platformvm_basetx.basetx.md#gettxtype)
* [getTypeID](api_platformvm_basetx.basetx.md#gettypeid)
* [getTypeName](api_platformvm_basetx.basetx.md#gettypename)
* [select](api_platformvm_basetx.basetx.md#select)
* [serialize](api_platformvm_basetx.basetx.md#serialize)
* [sign](api_platformvm_basetx.basetx.md#sign)
* [toBuffer](api_platformvm_basetx.basetx.md#tobuffer)
* [toString](api_platformvm_basetx.basetx.md#tostring)

## Constructors

###  constructor

\+ **new BaseTx**(`networkID`: number, `blockchainID`: Buffer, `outs`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[], `ins`: [TransferableInput](api_platformvm_inputs.transferableinput.md)[], `memo`: Buffer): *[BaseTx](api_platformvm_basetx.basetx.md)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[constructor](common_transactions.standardbasetx.md#constructor)*

*Defined in [src/apis/platformvm/basetx.ts:146](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L146)*

Class representing a BaseTx which is the foundation for all transactions.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional networkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16) |
`outs` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[] | undefined | Optional array of the [TransferableOutput](api_platformvm_outputs.transferableoutput.md)s |
`ins` | [TransferableInput](api_platformvm_inputs.transferableinput.md)[] | undefined | Optional array of the [TransferableInput](api_platformvm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field  |

**Returns:** *[BaseTx](api_platformvm_basetx.basetx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.CREATESUBNETTX

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[_typeID](common_transactions.standardbasetx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/basetx.ts:28](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L28)*

___

### `Protected` _typeName

• **_typeName**: *string* = "BaseTx"

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[_typeName](common_transactions.standardbasetx.md#protected-_typename)*

*Defined in [src/apis/platformvm/basetx.ts:27](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L27)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L52)*

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

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[clone](common_transactions.standardbasetx.md#abstract-clone)*

*Defined in [src/apis/platformvm/basetx.ts:133](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L133)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

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

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[deserialize](common_transactions.standardbasetx.md#deserialize)*

*Defined in [src/apis/platformvm/basetx.ts:30](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L30)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/platformvm/basetx.ts:77](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L77)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [BaseTx](api_platformvm_basetx.basetx.md), parses it, populates the class, and returns the length of the BaseTx in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [BaseTx](api_platformvm_basetx.basetx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [BaseTx](api_platformvm_basetx.basetx.md)

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

###  getIns

▸ **getIns**(): *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

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

###  getOuts

▸ **getOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/platformvm/basetx.ts:48](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L48)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getTotalOuts

▸ **getTotalOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/platformvm/basetx.ts:57](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/platformvm/basetx.ts#L57)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getTxType

▸ **getTxType**(): *number*

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

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[serialize](common_transactions.standardbasetx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:32](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_platformvm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

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

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toBuffer](common_transactions.standardbasetx.md#tobuffer)*

*Defined in [src/common/tx.ts:97](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L97)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:129](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L129)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
