[avalanche](../README.md) › [API-AVM-CreateAssetTx](../modules/api_avm_createassettx.md) › [CreateAssetTx](api_avm_createassettx.createassettx.md)

# Class: CreateAssetTx

## Hierarchy

  ↳ [BaseTx](api_avm_basetx.basetx.md)

  ↳ **CreateAssetTx**

  ↳ [GenesisAsset](api_avm_genesisasset.genesisasset.md)

## Index

### Constructors

* [constructor](api_avm_createassettx.createassettx.md#constructor)

### Properties

* [_codecID](api_avm_createassettx.createassettx.md#protected-_codecid)
* [_typeID](api_avm_createassettx.createassettx.md#protected-_typeid)
* [_typeName](api_avm_createassettx.createassettx.md#protected-_typename)
* [blockchainID](api_avm_createassettx.createassettx.md#protected-blockchainid)
* [denomination](api_avm_createassettx.createassettx.md#protected-denomination)
* [initialState](api_avm_createassettx.createassettx.md#protected-initialstate)
* [ins](api_avm_createassettx.createassettx.md#protected-ins)
* [memo](api_avm_createassettx.createassettx.md#protected-memo)
* [name](api_avm_createassettx.createassettx.md#protected-name)
* [networkID](api_avm_createassettx.createassettx.md#protected-networkid)
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

\+ **new CreateAssetTx**(`networkID`: number, `blockchainID`: Buffer, `outs`: [TransferableOutput](api_avm_outputs.transferableoutput.md)[], `ins`: [TransferableInput](api_avm_inputs.transferableinput.md)[], `memo`: Buffer, `name`: string, `symbol`: string, `denomination`: number, `initialState`: [InitialStates](api_avm_initialstates.initialstates.md)): *[CreateAssetTx](api_avm_createassettx.createassettx.md)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[constructor](api_avm_basetx.basetx.md#constructor)*

*Defined in [src/apis/avm/createassettx.ts:164](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L164)*

Class representing an unsigned Create Asset transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional networkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16) |
`outs` | [TransferableOutput](api_avm_outputs.transferableoutput.md)[] | undefined | Optional array of the [TransferableOutput](api_platformvm_outputs.transferableoutput.md)s |
`ins` | [TransferableInput](api_avm_inputs.transferableinput.md)[] | undefined | Optional array of the [TransferableInput](api_platformvm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field |
`name` | string | undefined | String for the descriptive name of the asset |
`symbol` | string | undefined | String for the ticker symbol of the asset |
`denomination` | number | undefined | Optional number for the denomination which is 10^D. D must be >= 0 and <= 32. Ex: $1 AVAX = 10^9 $nAVAX |
`initialState` | [InitialStates](api_avm_initialstates.initialstates.md) | undefined | Optional [InitialStates](api_avm_initialstates.initialstates.md) that represent the intial state of a created asset  |

**Returns:** *[CreateAssetTx](api_avm_createassettx.createassettx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_codecID](api_avm_basetx.basetx.md#protected-_codecid)*

*Defined in [src/apis/avm/createassettx.ts:27](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L27)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0 ? AVMConstants.CREATEASSETTX : AVMConstants.CREATEASSETTX_CODECONE

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeID](api_avm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/avm/createassettx.ts:28](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L28)*

___

### `Protected` _typeName

• **_typeName**: *string* = "CreateAssetTx"

*Overrides [BaseTx](api_avm_basetx.basetx.md).[_typeName](api_avm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/avm/createassettx.ts:26](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L26)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L52)*

___

### `Protected` denomination

• **denomination**: *Buffer* = Buffer.alloc(1)

*Defined in [src/apis/avm/createassettx.ts:51](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L51)*

___

### `Protected` initialState

• **initialState**: *[InitialStates](api_avm_initialstates.initialstates.md)* = new InitialStates()

*Defined in [src/apis/avm/createassettx.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L52)*

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

### `Protected` name

• **name**: *string* = ""

*Defined in [src/apis/avm/createassettx.ts:49](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L49)*

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

___

### `Protected` symbol

• **symbol**: *string* = ""

*Defined in [src/apis/avm/createassettx.ts:50](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L50)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[clone](api_avm_basetx.basetx.md#clone)*

*Defined in [src/apis/avm/createassettx.ts:156](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L156)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[create](api_avm_basetx.basetx.md#create)*

*Defined in [src/apis/avm/createassettx.ts:162](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[deserialize](api_avm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/avm/createassettx.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L40)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[fromBuffer](api_avm_basetx.basetx.md#frombuffer)*

*Defined in [src/apis/avm/createassettx.ts:111](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L111)*

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

###  getDenomination

▸ **getDenomination**(): *number*

*Defined in [src/apis/avm/createassettx.ts:93](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L93)*

Returns the numeric representation of the denomination

**Returns:** *number*

___

###  getDenominationBuffer

▸ **getDenominationBuffer**(): *Buffer*

*Defined in [src/apis/avm/createassettx.ts:98](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L98)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the denomination

**Returns:** *Buffer*

___

###  getInitialStates

▸ **getInitialStates**(): *[InitialStates](api_avm_initialstates.initialstates.md)*

*Defined in [src/apis/avm/createassettx.ts:78](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L78)*

Returns the array of array of [Output](../modules/src_common.md#output)s for the initial state

**Returns:** *[InitialStates](api_avm_initialstates.initialstates.md)*

___

###  getIns

▸ **getIns**(): *[TransferableInput](api_avm_inputs.transferableinput.md)[]*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getIns](api_avm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/avm/basetx.ts:58](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/basetx.ts#L58)*

**Returns:** *[TransferableInput](api_avm_inputs.transferableinput.md)[]*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:92](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L92)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getName

▸ **getName**(): *string*

*Defined in [src/apis/avm/createassettx.ts:83](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L83)*

Returns the string representation of the name

**Returns:** *string*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:67](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L67)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getOuts

▸ **getOuts**(): *[TransferableOutput](api_avm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getOuts](api_avm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/avm/basetx.ts:54](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/basetx.ts#L54)*

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)[]*

___

###  getSymbol

▸ **getSymbol**(): *string*

*Defined in [src/apis/avm/createassettx.ts:88](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L88)*

Returns the string representation of the symbol

**Returns:** *string*

___

###  getTotalOuts

▸ **getTotalOuts**(): *[TransferableOutput](api_avm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getTotalOuts](api_avm_basetx.basetx.md#gettotalouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/avm/basetx.ts:62](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/basetx.ts#L62)*

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)[]*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[getTxType](api_avm_basetx.basetx.md#gettxtype)*

*Defined in [src/apis/avm/createassettx.ts:71](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L71)*

Returns the id of the [CreateAssetTx](api_avm_createassettx.createassettx.md)

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

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[select](api_avm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/avm/basetx.ts:162](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/basetx.ts#L162)*

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

*Defined in [src/apis/avm/createassettx.ts:30](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L30)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[setCodecID](api_avm_basetx.basetx.md#setcodecid)*

*Defined in [src/apis/avm/createassettx.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L59)*

Set the codecID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`codecID` | number | The codecID to set  |

**Returns:** *void*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_avm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[sign](api_avm_basetx.basetx.md#sign)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[sign](common_transactions.standardbasetx.md#abstract-sign)*

*Defined in [src/apis/avm/basetx.ts:135](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/basetx.ts#L135)*

Takes the bytes of an [UnsignedTx](api_platformvm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_platformvm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_avm_keychain.keychain.md) | An [KeyChain](api_platformvm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[toBuffer](common_transactions.standardbasetx.md#tobuffer)*

*Defined in [src/apis/avm/createassettx.ts:137](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/createassettx.ts#L137)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [CreateAssetTx](api_avm_createassettx.createassettx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:129](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/tx.ts#L129)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
