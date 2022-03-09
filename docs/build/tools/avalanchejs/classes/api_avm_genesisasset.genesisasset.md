[avalanche](../README.md) › [API-AVM-GenesisAsset](../modules/api_avm_genesisasset.md) › [GenesisAsset](api_avm_genesisasset.genesisasset.md)

# Class: GenesisAsset

## Hierarchy

  ↳ [CreateAssetTx](api_avm_createassettx.createassettx.md)

  ↳ **GenesisAsset**

## Index

### Constructors

* [constructor](api_avm_genesisasset.genesisasset.md#constructor)

### Properties

* [_codecID](api_avm_genesisasset.genesisasset.md#protected-_codecid)
* [_typeID](api_avm_genesisasset.genesisasset.md#protected-_typeid)
* [_typeName](api_avm_genesisasset.genesisasset.md#protected-_typename)
* [assetAlias](api_avm_genesisasset.genesisasset.md#protected-assetalias)
* [blockchainID](api_avm_genesisasset.genesisasset.md#protected-blockchainid)
* [denomination](api_avm_genesisasset.genesisasset.md#protected-denomination)
* [initialState](api_avm_genesisasset.genesisasset.md#protected-initialstate)
* [ins](api_avm_genesisasset.genesisasset.md#protected-ins)
* [memo](api_avm_genesisasset.genesisasset.md#protected-memo)
* [name](api_avm_genesisasset.genesisasset.md#protected-name)
* [networkID](api_avm_genesisasset.genesisasset.md#protected-networkid)
* [numins](api_avm_genesisasset.genesisasset.md#protected-numins)
* [numouts](api_avm_genesisasset.genesisasset.md#protected-numouts)
* [outs](api_avm_genesisasset.genesisasset.md#protected-outs)
* [symbol](api_avm_genesisasset.genesisasset.md#protected-symbol)

### Methods

* [clone](api_avm_genesisasset.genesisasset.md#clone)
* [create](api_avm_genesisasset.genesisasset.md#create)
* [deserialize](api_avm_genesisasset.genesisasset.md#deserialize)
* [fromBuffer](api_avm_genesisasset.genesisasset.md#frombuffer)
* [getAssetAlias](api_avm_genesisasset.genesisasset.md#getassetalias)
* [getBlockchainID](api_avm_genesisasset.genesisasset.md#getblockchainid)
* [getCodecID](api_avm_genesisasset.genesisasset.md#getcodecid)
* [getDenomination](api_avm_genesisasset.genesisasset.md#getdenomination)
* [getDenominationBuffer](api_avm_genesisasset.genesisasset.md#getdenominationbuffer)
* [getInitialStates](api_avm_genesisasset.genesisasset.md#getinitialstates)
* [getIns](api_avm_genesisasset.genesisasset.md#getins)
* [getMemo](api_avm_genesisasset.genesisasset.md#getmemo)
* [getName](api_avm_genesisasset.genesisasset.md#getname)
* [getNetworkID](api_avm_genesisasset.genesisasset.md#getnetworkid)
* [getOuts](api_avm_genesisasset.genesisasset.md#getouts)
* [getSymbol](api_avm_genesisasset.genesisasset.md#getsymbol)
* [getTotalOuts](api_avm_genesisasset.genesisasset.md#gettotalouts)
* [getTxType](api_avm_genesisasset.genesisasset.md#gettxtype)
* [getTypeID](api_avm_genesisasset.genesisasset.md#gettypeid)
* [getTypeName](api_avm_genesisasset.genesisasset.md#gettypename)
* [sanitizeObject](api_avm_genesisasset.genesisasset.md#sanitizeobject)
* [select](api_avm_genesisasset.genesisasset.md#select)
* [serialize](api_avm_genesisasset.genesisasset.md#serialize)
* [setCodecID](api_avm_genesisasset.genesisasset.md#setcodecid)
* [sign](api_avm_genesisasset.genesisasset.md#sign)
* [toBuffer](api_avm_genesisasset.genesisasset.md#tobuffer)
* [toString](api_avm_genesisasset.genesisasset.md#tostring)

## Constructors

###  constructor

\+ **new GenesisAsset**(`assetAlias`: string, `name`: string, `symbol`: string, `denomination`: number, `initialState`: [InitialStates](api_avm_initialstates.initialstates.md), `memo`: Buffer): *[GenesisAsset](api_avm_genesisasset.genesisasset.md)*

*Overrides [CreateAssetTx](api_avm_createassettx.createassettx.md).[constructor](api_avm_createassettx.createassettx.md#constructor)*

*Defined in [src/apis/avm/genesisasset.ts:180](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L180)*

Class representing a GenesisAsset

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`assetAlias` | string | undefined | Optional String for the asset alias |
`name` | string | undefined | Optional String for the descriptive name of the asset |
`symbol` | string | undefined | Optional String for the ticker symbol of the asset |
`denomination` | number | undefined | Optional number for the denomination which is 10^D. D must be >= 0 and <= 32. Ex: $1 AVAX = 10^9 $nAVAX |
`initialState` | [InitialStates](api_avm_initialstates.initialstates.md) | undefined | Optional [InitialStates](api_avm_initialstates.initialstates.md) that represent the intial state of a created asset |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field  |

**Returns:** *[GenesisAsset](api_avm_genesisasset.genesisasset.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *any* = undefined

*Overrides [CreateAssetTx](api_avm_createassettx.createassettx.md).[_codecID](api_avm_createassettx.createassettx.md#protected-_codecid)*

*Defined in [src/apis/avm/genesisasset.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L28)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [CreateAssetTx](api_avm_createassettx.createassettx.md).[_typeID](api_avm_createassettx.createassettx.md#protected-_typeid)*

*Defined in [src/apis/avm/genesisasset.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L29)*

___

### `Protected` _typeName

• **_typeName**: *string* = "GenesisAsset"

*Overrides [CreateAssetTx](api_avm_createassettx.createassettx.md).[_typeName](api_avm_createassettx.createassettx.md#protected-_typename)*

*Defined in [src/apis/avm/genesisasset.ts:27](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L27)*

___

### `Protected` assetAlias

• **assetAlias**: *string* = ""

*Defined in [src/apis/avm/genesisasset.ts:76](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L76)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:82](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L82)*

___

### `Protected` denomination

• **denomination**: *Buffer* = Buffer.alloc(1)

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[denomination](api_avm_createassettx.createassettx.md#protected-denomination)*

*Defined in [src/apis/avm/createassettx.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L70)*

___

### `Protected` initialState

• **initialState**: *[InitialStates](api_avm_initialstates.initialstates.md)* = new InitialStates()

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[initialState](api_avm_createassettx.createassettx.md#protected-initialstate)*

*Defined in [src/apis/avm/createassettx.ts:71](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L71)*

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

### `Protected` name

• **name**: *string* = ""

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[name](api_avm_createassettx.createassettx.md#protected-name)*

*Defined in [src/apis/avm/createassettx.ts:68](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L68)*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[networkID](common_transactions.standardbasetx.md#protected-networkid)*

*Defined in [src/common/tx.ts:81](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L81)*

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

___

### `Protected` symbol

• **symbol**: *string* = ""

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[symbol](api_avm_createassettx.createassettx.md#protected-symbol)*

*Defined in [src/apis/avm/createassettx.ts:69](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L69)*

## Methods

###  clone

▸ **clone**(): *this*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[clone](api_avm_createassettx.createassettx.md#clone)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[clone](api_avm_basetx.basetx.md#clone)*

*Defined in [src/apis/avm/createassettx.ts:211](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L211)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[create](api_avm_createassettx.createassettx.md#create)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[create](api_avm_basetx.basetx.md#create)*

*Defined in [src/apis/avm/createassettx.ts:217](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [CreateAssetTx](api_avm_createassettx.createassettx.md).[deserialize](api_avm_createassettx.createassettx.md#deserialize)*

*Defined in [src/apis/avm/genesisasset.ts:52](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L52)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [CreateAssetTx](api_avm_createassettx.createassettx.md).[fromBuffer](api_avm_createassettx.createassettx.md#frombuffer)*

*Defined in [src/apis/avm/genesisasset.ts:92](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L92)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [GenesisAsset](api_avm_genesisasset.genesisasset.md), parses it, populates the class, and returns the length of the [GenesisAsset](api_avm_genesisasset.genesisasset.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [GenesisAsset](api_avm_genesisasset.genesisasset.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [GenesisAsset](api_avm_genesisasset.genesisasset.md)

___

###  getAssetAlias

▸ **getAssetAlias**(): *string*

*Defined in [src/apis/avm/genesisasset.ts:81](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L81)*

Returns the string representation of the assetAlias

**Returns:** *string*

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

###  getDenomination

▸ **getDenomination**(): *number*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[getDenomination](api_avm_createassettx.createassettx.md#getdenomination)*

*Defined in [src/apis/avm/createassettx.ts:123](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L123)*

Returns the numeric representation of the denomination

**Returns:** *number*

___

###  getDenominationBuffer

▸ **getDenominationBuffer**(): *Buffer*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[getDenominationBuffer](api_avm_createassettx.createassettx.md#getdenominationbuffer)*

*Defined in [src/apis/avm/createassettx.ts:130](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L130)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the denomination

**Returns:** *Buffer*

___

###  getInitialStates

▸ **getInitialStates**(): *[InitialStates](api_avm_initialstates.initialstates.md)*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[getInitialStates](api_avm_createassettx.createassettx.md#getinitialstates)*

*Defined in [src/apis/avm/createassettx.ts:102](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L102)*

Returns the array of array of [Output](../modules/src_common.md#output)s for the initial state

**Returns:** *[InitialStates](api_avm_initialstates.initialstates.md)*

___

###  getIns

▸ **getIns**(): *[TransferableInput](api_avm_inputs.transferableinput.md)[]*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getIns](api_avm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/avm/basetx.ts:75](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/basetx.ts#L75)*

**Returns:** *[TransferableInput](api_avm_inputs.transferableinput.md)[]*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L126)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getName

▸ **getName**(): *string*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[getName](api_avm_createassettx.createassettx.md#getname)*

*Defined in [src/apis/avm/createassettx.ts:109](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L109)*

Returns the string representation of the name

**Returns:** *string*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:97](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L97)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getOuts

▸ **getOuts**(): *[TransferableOutput](api_avm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getOuts](api_avm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/avm/basetx.ts:71](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/basetx.ts#L71)*

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)[]*

___

###  getSymbol

▸ **getSymbol**(): *string*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[getSymbol](api_avm_createassettx.createassettx.md#getsymbol)*

*Defined in [src/apis/avm/createassettx.ts:116](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L116)*

Returns the string representation of the symbol

**Returns:** *string*

___

###  getTotalOuts

▸ **getTotalOuts**(): *[TransferableOutput](api_avm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[getTotalOuts](api_avm_basetx.basetx.md#gettotalouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/avm/basetx.ts:79](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/basetx.ts#L79)*

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)[]*

___

###  getTxType

▸ **getTxType**(): *number*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[getTxType](api_avm_createassettx.createassettx.md#gettxtype)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[getTxType](api_avm_basetx.basetx.md#gettxtype)*

*Defined in [src/apis/avm/createassettx.ts:95](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L95)*

Returns the id of the [CreateAssetTx](api_avm_createassettx.createassettx.md)

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

*Inherited from [BaseTx](api_avm_basetx.basetx.md).[select](api_avm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/avm/basetx.ts:186](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/basetx.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [CreateAssetTx](api_avm_createassettx.createassettx.md).[serialize](api_avm_createassettx.createassettx.md#serialize)*

*Defined in [src/apis/avm/genesisasset.ts:31](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L31)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Inherited from [CreateAssetTx](api_avm_createassettx.createassettx.md).[setCodecID](api_avm_createassettx.createassettx.md#setcodecid)*

*Overrides [BaseTx](api_avm_basetx.basetx.md).[setCodecID](api_avm_basetx.basetx.md#setcodecid)*

*Defined in [src/apis/avm/createassettx.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/createassettx.ts#L78)*

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

*Defined in [src/apis/avm/basetx.ts:157](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/basetx.ts#L157)*

Takes the bytes of an [UnsignedTx](api_evm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_evm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_avm_keychain.keychain.md) | An [KeyChain](api_evm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(`networkID`: number): *Buffer*

*Overrides [CreateAssetTx](api_avm_createassettx.createassettx.md).[toBuffer](api_avm_createassettx.createassettx.md#tobuffer)*

*Defined in [src/apis/avm/genesisasset.ts:108](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/genesisasset.ts#L108)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [GenesisAsset](api_avm_genesisasset.genesisasset.md).

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`networkID` | number | DefaultNetworkID |

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L166)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
