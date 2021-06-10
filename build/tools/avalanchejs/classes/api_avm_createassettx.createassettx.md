[avalanche](../README.md) › [API-AVM-CreateAssetTx](../modules/api_avm_createassettx.md) › [CreateAssetTx](api_avm_createassettx.createassettx.md)

# Class: CreateAssetTx

## Hierarchy

  ↳ [BaseTx](api_avm_basetx.basetx.md)

  ↳ **CreateAssetTx**

## Index

### Constructors

* [constructor](api_avm_createassettx.createassettx.md#constructor)

### Properties

* [_codecID](api_avm_createassettx.createassettx.md#protected-_codecid)
* [_typeID](api_avm_createassettx.createassettx.md#protected-_typeid)
* [_typeName](api_avm_createassettx.createassettx.md#protected-_typename)
* [blockchainid](api_avm_createassettx.createassettx.md#protected-blockchainid)
* [denomination](api_avm_createassettx.createassettx.md#protected-denomination)
* [initialstate](api_avm_createassettx.createassettx.md#protected-initialstate)
* [ins](api_avm_createassettx.createassettx.md#protected-ins)
* [memo](api_avm_createassettx.createassettx.md#protected-memo)
* [name](api_avm_createassettx.createassettx.md#protected-name)
* [networkid](api_avm_createassettx.createassettx.md#protected-networkid)
* [numins](api_avm_createassettx.createassettx.md#protected-numins)
* [numouts](api_avm_createassettx.createassettx.md#protected-numouts)
* [outs](api_avm_createassettx.createassettx.md#protected-outs)
* [symbol](api_avm_createassettx.createassettx.md#protected-symbol)

### Methods

* [clone](api_avm_createassettx.createassettx.md#clone)
* [create](api_avm_createassettx.createassettx.md#create)
* [deserialize](api_avm_createassettx.createassettx.md#deserialize)
* [fromBuffer](api_avm_createassettx.createassettx.md#frombuffer)
* [getBlockchainID](api_avm_createassettx.createassettx.md#getblockchainid)
* [getCodecID](api_avm_createassettx.createassettx.md#getcodecid)
* [getDenomination](api_avm_createassettx.createassettx.md#getdenomination)
* [getDenominationBuffer](api_avm_createassettx.createassettx.md#getdenominationbuffer)
* [getInitialStates](api_avm_createassettx.createassettx.md#getinitialstates)
* [getIns](api_avm_createassettx.createassettx.md#getins)
* [getMemo](api_avm_createassettx.createassettx.md#getmemo)
* [getName](api_avm_createassettx.createassettx.md#getname)
* [getNetworkID](api_avm_createassettx.createassettx.md#getnetworkid)
* [getOuts](api_avm_createassettx.createassettx.md#getouts)
* [getSymbol](api_avm_createassettx.createassettx.md#getsymbol)
* [getTotalOuts](api_avm_createassettx.createassettx.md#gettotalouts)
* [getTxType](api_avm_createassettx.createassettx.md#gettxtype)
* [getTypeID](api_avm_createassettx.createassettx.md#gettypeid)
* [getTypeName](api_avm_createassettx.createassettx.md#gettypename)
* [select](api_avm_createassettx.createassettx.md#select)
* [serialize](api_avm_createassettx.createassettx.md#serialize)
* [setCodecID](api_avm_createassettx.createassettx.md#setcodecid)
* [sign](api_avm_createassettx.createassettx.md#sign)
* [toBuffer](api_avm_createassettx.createassettx.md#tobuffer)
* [toString](api_avm_createassettx.createassettx.md#tostring)

## Constructors

###  constructor

\+ **new CreateAssetTx**(`networkid`: number, `blockchainid`: Buffer, `outs`: Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›, `ins`: Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›, `memo`: Buffer, `name`: string, `symbol`: string, `denomination`: number, `initialstate`: [InitialStates](api_avm_initialstates.initialstates.md)): *[CreateAssetTx](api_avm_createassettx.createassettx.md)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[constructor](api_avm_basetx.basetx.md#constructor)*

*Defined in [src/apis/avm/createassettx.ts:156](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L156)*

Class representing an unsigned Create Asset transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkid` | number | DefaultNetworkID | Optional networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainid` | Buffer | Buffer.alloc(32, 16) | Optional blockchainid, default Buffer.alloc(32, 16) |
`outs` | Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)› | undefined | Optional array of the [TransferableOutput](api_avm_outputs.transferableoutput.md)s |
`ins` | Array‹[TransferableInput](api_avm_inputs.transferableinput.md)› | undefined | Optional array of the [TransferableInput](api_avm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field |
`name` | string | undefined | String for the descriptive name of the asset |
`symbol` | string | undefined | String for the ticker symbol of the asset |
`denomination` | number | undefined | Optional number for the denomination which is 10^D. D must be >= 0 and <= 32. Ex: $1 AVAX = 10^9 $nAVAX |
`initialstate` | [InitialStates](api_avm_initialstates.initialstates.md) | undefined | Optional [InitialStates](api_avm_initialstates.initialstates.md) that represent the intial state of a created asset  |

**Returns:** *[CreateAssetTx](api_avm_createassettx.createassettx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_codecID](api_avm_basetx.basetx.md#protected-_codecid)*

*Defined in [src/apis/avm/createassettx.ts:24](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L24)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0 ? AVMConstants.CREATEASSETTX : AVMConstants.CREATEASSETTX_CODECONE

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeID](api_avm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/avm/createassettx.ts:25](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L25)*

___

### `Protected` _typeName

• **_typeName**: *string* = "CreateAssetTx"

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeName](api_avm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/avm/createassettx.ts:23](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L23)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainid](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:49](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L49)*

___

### `Protected` denomination

• **denomination**: *Buffer* = Buffer.alloc(1)

*Defined in [src/apis/avm/createassettx.ts:48](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L48)*

___

### `Protected` initialstate

• **initialstate**: *[InitialStates](api_avm_initialstates.initialstates.md)* = new InitialStates()

*Defined in [src/apis/avm/createassettx.ts:49](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L49)*

___

### `Protected` ins

• **ins**: *Array‹[StandardTransferableInput](common_inputs.standardtransferableinput.md)›*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[ins](common_transactions.standardbasetx.md#protected-ins)*

*Defined in [src/common/tx.ts:53](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L53)*

___

### `Protected` memo

• **memo**: *Buffer* = Buffer.alloc(0)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[memo](common_transactions.standardbasetx.md#protected-memo)*

*Defined in [src/common/tx.ts:54](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L54)*

___

### `Protected` name

• **name**: *string* = ""

*Defined in [src/apis/avm/createassettx.ts:46](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L46)*

___

### `Protected` networkid

• **networkid**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[networkid](common_transactions.standardbasetx.md#protected-networkid)*

*Defined in [src/common/tx.ts:48](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L48)*

___

### `Protected` numins

• **numins**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numins](common_transactions.standardbasetx.md#protected-numins)*

*Defined in [src/common/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L52)*

___

### `Protected` numouts

• **numouts**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numouts](common_transactions.standardbasetx.md#protected-numouts)*

*Defined in [src/common/tx.ts:50](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L50)*

___

### `Protected` outs

• **outs**: *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[outs](common_transactions.standardbasetx.md#protected-outs)*

*Defined in [src/common/tx.ts:51](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L51)*

___

### `Protected` symbol

• **symbol**: *string* = ""

*Defined in [src/apis/avm/createassettx.ts:47](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L47)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[clone](api_avm_basetx.basetx.md#clone)*

*Defined in [src/apis/avm/createassettx.ts:148](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L148)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[create](api_avm_basetx.basetx.md#create)*

*Defined in [src/apis/avm/createassettx.ts:154](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[deserialize](api_avm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/avm/createassettx.ts:37](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L37)*

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

*Defined in [src/apis/avm/createassettx.ts:103](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L103)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [CreateAssetTx](api_avm_createassettx.createassettx.md), parses it, populates the class, and returns the length of the [CreateAssetTx](api_avm_createassettx.createassettx.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [CreateAssetTx](api_avm_createassettx.createassettx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [CreateAssetTx](api_avm_createassettx.createassettx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)*

*Defined in [src/common/tx.ts:69](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L69)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getDenomination

▸ **getDenomination**(): *number*

*Defined in [src/apis/avm/createassettx.ts:85](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L85)*

Returns the numeric representation of the denomination

**Returns:** *number*

___

###  getDenominationBuffer

▸ **getDenominationBuffer**(): *Buffer*

*Defined in [src/apis/avm/createassettx.ts:90](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L90)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the denomination

**Returns:** *Buffer*

___

###  getInitialStates

▸ **getInitialStates**(): *[InitialStates](api_avm_initialstates.initialstates.md)*

*Defined in [src/apis/avm/createassettx.ts:70](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L70)*

Returns the array of array of [Output](common_output.output.md)s for the initial state

**Returns:** *[InitialStates](api_avm_initialstates.initialstates.md)*

___

###  getIns

▸ **getIns**(): *Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getIns](api_avm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/avm/basetx.ts:55](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/basetx.ts#L55)*

**Returns:** *Array‹[TransferableInput](api_avm_inputs.transferableinput.md)›*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:89](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L89)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getName

▸ **getName**(): *string*

*Defined in [src/apis/avm/createassettx.ts:75](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L75)*

Returns the string representation of the name

**Returns:** *string*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:64](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L64)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getOuts

▸ **getOuts**(): *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getOuts](api_avm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/avm/basetx.ts:51](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/basetx.ts#L51)*

**Returns:** *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

___

###  getSymbol

▸ **getSymbol**(): *string*

*Defined in [src/apis/avm/createassettx.ts:80](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L80)*

Returns the string representation of the symbol

**Returns:** *string*

___

###  getTotalOuts

▸ **getTotalOuts**(): *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getTotalOuts](api_avm_basetx.basetx.md#gettotalouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/avm/basetx.ts:59](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/basetx.ts#L59)*

**Returns:** *Array‹[TransferableOutput](api_avm_outputs.transferableoutput.md)›*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[getTxType](api_avm_basetx.basetx.md#gettxtype)*

*Defined in [src/apis/avm/createassettx.ts:63](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L63)*

Returns the id of the [CreateAssetTx](api_avm_createassettx.createassettx.md)

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[select](api_avm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/avm/basetx.ts:154](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/basetx.ts#L154)*

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

*Defined in [src/apis/avm/createassettx.ts:27](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L27)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[setCodecID](api_avm_basetx.basetx.md#setcodecid)*

*Defined in [src/apis/avm/createassettx.ts:51](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`codecID` | number |

**Returns:** *void*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_avm_keychain.keychain.md)): *Array‹[Credential](common_signature.credential.md)›*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[sign](api_avm_basetx.basetx.md#sign)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[sign](common_transactions.standardbasetx.md#abstract-sign)*

*Defined in [src/apis/avm/basetx.ts:127](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/basetx.ts#L127)*

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

*Defined in [src/apis/avm/createassettx.ts:129](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/apis/avm/createassettx.ts#L129)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [CreateAssetTx](api_avm_createassettx.createassettx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/common/tx.ts#L126)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
