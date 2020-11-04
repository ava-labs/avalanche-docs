[avalanche](../README.md) › [API-PlatformVM-ValidationTx](../modules/api_platformvm_validationtx.md) › [WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md)

# Class: WeightedValidatorTx

## Hierarchy

  ↳ [ValidatorTx](api_platformvm_validationtx.validatortx.md)

  ↳ **WeightedValidatorTx**

  ↳ [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md)

## Index

### Constructors

* [constructor](api_platformvm_validationtx.weightedvalidatortx.md#constructor)

### Properties

* [_typeID](api_platformvm_validationtx.weightedvalidatortx.md#protected-_typeid)
* [_typeName](api_platformvm_validationtx.weightedvalidatortx.md#protected-_typename)
* [blockchainid](api_platformvm_validationtx.weightedvalidatortx.md#protected-blockchainid)
* [endTime](api_platformvm_validationtx.weightedvalidatortx.md#protected-endtime)
* [ins](api_platformvm_validationtx.weightedvalidatortx.md#protected-ins)
* [memo](api_platformvm_validationtx.weightedvalidatortx.md#protected-memo)
* [networkid](api_platformvm_validationtx.weightedvalidatortx.md#protected-networkid)
* [nodeID](api_platformvm_validationtx.weightedvalidatortx.md#protected-nodeid)
* [numins](api_platformvm_validationtx.weightedvalidatortx.md#protected-numins)
* [numouts](api_platformvm_validationtx.weightedvalidatortx.md#protected-numouts)
* [outs](api_platformvm_validationtx.weightedvalidatortx.md#protected-outs)
* [startTime](api_platformvm_validationtx.weightedvalidatortx.md#protected-starttime)
* [weight](api_platformvm_validationtx.weightedvalidatortx.md#protected-weight)

### Methods

* [clone](api_platformvm_validationtx.weightedvalidatortx.md#clone)
* [create](api_platformvm_validationtx.weightedvalidatortx.md#create)
* [deserialize](api_platformvm_validationtx.weightedvalidatortx.md#deserialize)
* [fromBuffer](api_platformvm_validationtx.weightedvalidatortx.md#frombuffer)
* [getBlockchainID](api_platformvm_validationtx.weightedvalidatortx.md#getblockchainid)
* [getEndTime](api_platformvm_validationtx.weightedvalidatortx.md#getendtime)
* [getIns](api_platformvm_validationtx.weightedvalidatortx.md#getins)
* [getMemo](api_platformvm_validationtx.weightedvalidatortx.md#getmemo)
* [getNetworkID](api_platformvm_validationtx.weightedvalidatortx.md#getnetworkid)
* [getNodeID](api_platformvm_validationtx.weightedvalidatortx.md#getnodeid)
* [getNodeIDString](api_platformvm_validationtx.weightedvalidatortx.md#getnodeidstring)
* [getOuts](api_platformvm_validationtx.weightedvalidatortx.md#getouts)
* [getStartTime](api_platformvm_validationtx.weightedvalidatortx.md#getstarttime)
* [getTotalOuts](api_platformvm_validationtx.weightedvalidatortx.md#gettotalouts)
* [getTxType](api_platformvm_validationtx.weightedvalidatortx.md#gettxtype)
* [getTypeID](api_platformvm_validationtx.weightedvalidatortx.md#gettypeid)
* [getTypeName](api_platformvm_validationtx.weightedvalidatortx.md#gettypename)
* [getWeight](api_platformvm_validationtx.weightedvalidatortx.md#getweight)
* [getWeightBuffer](api_platformvm_validationtx.weightedvalidatortx.md#getweightbuffer)
* [select](api_platformvm_validationtx.weightedvalidatortx.md#select)
* [serialize](api_platformvm_validationtx.weightedvalidatortx.md#serialize)
* [sign](api_platformvm_validationtx.weightedvalidatortx.md#sign)
* [toBuffer](api_platformvm_validationtx.weightedvalidatortx.md#tobuffer)
* [toString](api_platformvm_validationtx.weightedvalidatortx.md#tostring)

## Constructors

###  constructor

\+ **new WeightedValidatorTx**(`networkid`: number, `blockchainid`: Buffer, `outs`: Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›, `ins`: Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›, `memo`: Buffer, `nodeID`: Buffer, `startTime`: BN, `endTime`: BN, `weight`: BN): *[WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md)*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[constructor](api_platformvm_validationtx.validatortx.md#constructor)*

*Defined in [src/apis/platformvm/validationtx.ts:166](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L166)*

Class representing an unsigned AddSubnetValidatorTx transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkid` | number | DefaultNetworkID | Optional. Networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainid` | Buffer | Buffer.alloc(32, 16) | Optional. Blockchainid, default Buffer.alloc(32, 16) |
`outs` | Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)› | undefined | Optional. Array of the [TransferableOutput](api_avm_outputs.transferableoutput.md)s |
`ins` | Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)› | undefined | Optional. Array of the [TransferableInput](api_avm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional. [Buffer](https://github.com/feross/buffer) for the memo field |
`nodeID` | Buffer | undefined | Optional. The node ID of the validator being added. |
`startTime` | BN | undefined | Optional. The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | undefined | Optional. The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`weight` | BN | undefined | Optional. The amount of nAVAX the validator is staking.  |

**Returns:** *[WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[_typeID](api_platformvm_validationtx.validatortx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/validationtx.ts:123](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L123)*

___

### `Protected` _typeName

• **_typeName**: *string* = "WeightedValidatorTx"

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[_typeName](api_platformvm_validationtx.validatortx.md#protected-_typename)*

*Defined in [src/apis/platformvm/validationtx.ts:122](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L122)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainid](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L49)*

___

### `Protected` endTime

• **endTime**: *Buffer* = Buffer.alloc(8)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[endTime](api_platformvm_validationtx.validatortx.md#protected-endtime)*

*Defined in [src/apis/platformvm/validationtx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L49)*

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

### `Protected` nodeID

• **nodeID**: *Buffer* = Buffer.alloc(20)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[nodeID](api_platformvm_validationtx.validatortx.md#protected-nodeid)*

*Defined in [src/apis/platformvm/validationtx.ts:47](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L47)*

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

### `Protected` startTime

• **startTime**: *Buffer* = Buffer.alloc(8)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[startTime](api_platformvm_validationtx.validatortx.md#protected-starttime)*

*Defined in [src/apis/platformvm/validationtx.ts:48](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L48)*

___

### `Protected` weight

• **weight**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/platformvm/validationtx.ts:137](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L137)*

## Methods

###  clone

▸ **clone**(): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[clone](api_platformvm_basetx.basetx.md#clone)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[clone](common_transactions.standardbasetx.md#abstract-clone)*

*Defined in [src/apis/platformvm/basetx.ts:134](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/basetx.ts#L134)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[create](api_platformvm_basetx.basetx.md#create)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[create](common_transactions.standardbasetx.md#abstract-create)*

*Defined in [src/apis/platformvm/basetx.ts:140](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/basetx.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[deserialize](api_platformvm_validationtx.validatortx.md#deserialize)*

*Defined in [src/apis/platformvm/validationtx.ts:132](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L132)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[fromBuffer](api_platformvm_validationtx.validatortx.md#frombuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:153](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L153)*

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

*Defined in [src/common/tx.ts:69](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L69)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getEndTime

▸ **getEndTime**(): *BN‹›*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getEndTime](api_platformvm_validationtx.validatortx.md#getendtime)*

*Defined in [src/apis/platformvm/validationtx.ts:74](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L74)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getIns

▸ **getIns**(): *Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getIns](api_platformvm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/platformvm/basetx.ts:53](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/basetx.ts#L53)*

**Returns:** *Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›*

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

###  getNodeID

▸ **getNodeID**(): *Buffer*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getNodeID](api_platformvm_validationtx.validatortx.md#getnodeid)*

*Defined in [src/apis/platformvm/validationtx.ts:54](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L54)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  getNodeIDString

▸ **getNodeIDString**(): *string*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getNodeIDString](api_platformvm_validationtx.validatortx.md#getnodeidstring)*

*Defined in [src/apis/platformvm/validationtx.ts:61](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L61)*

Returns a string for the nodeID amount.

**Returns:** *string*

___

###  getOuts

▸ **getOuts**(): *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getOuts](api_platformvm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/platformvm/basetx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/basetx.ts#L49)*

**Returns:** *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

___

###  getStartTime

▸ **getStartTime**(): *BN‹›*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getStartTime](api_platformvm_validationtx.validatortx.md#getstarttime)*

*Defined in [src/apis/platformvm/validationtx.ts:67](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L67)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getTotalOuts

▸ **getTotalOuts**(): *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getTotalOuts](api_platformvm_basetx.basetx.md#gettotalouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/platformvm/basetx.ts:58](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/basetx.ts#L58)*

**Returns:** *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

___

###  getTxType

▸ **getTxType**(): *number*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getTxType](api_platformvm_basetx.basetx.md#gettxtype)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTxType](common_transactions.standardbasetx.md#abstract-gettxtype)*

*Defined in [src/apis/platformvm/basetx.ts:65](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/basetx.ts#L65)*

Returns the id of the [BaseTx](api_avm_basetx.basetx.md)

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

###  getWeight

▸ **getWeight**(): *BN*

*Defined in [src/apis/platformvm/validationtx.ts:142](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L142)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN*

___

###  getWeightBuffer

▸ **getWeightBuffer**(): *Buffer*

*Defined in [src/apis/platformvm/validationtx.ts:149](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L149)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[select](api_platformvm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/platformvm/basetx.ts:144](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/basetx.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[serialize](api_platformvm_validationtx.validatortx.md#serialize)*

*Defined in [src/apis/platformvm/validationtx.ts:125](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L125)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_platformvm_keychain.keychain.md)): *Array‹[Credential](common_signature.credential.md)›*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[sign](api_platformvm_basetx.basetx.md#sign)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[sign](common_transactions.standardbasetx.md#abstract-sign)*

*Defined in [src/apis/platformvm/basetx.ts:117](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/basetx.ts#L117)*

Takes the bytes of an [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_avm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_platformvm_keychain.keychain.md) | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *Array‹[Credential](common_signature.credential.md)›*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[toBuffer](api_platformvm_validationtx.validatortx.md#tobuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:163](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/validationtx.ts#L163)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [[AddSubnetValidatorTx]].

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L126)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
