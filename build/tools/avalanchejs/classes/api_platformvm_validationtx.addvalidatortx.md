[avalanche](../README.md) › [API-PlatformVM-ValidationTx](../modules/api_platformvm_validationtx.md) › [AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md)

# Class: AddValidatorTx

## Hierarchy

  ↳ [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md)

  ↳ **AddValidatorTx**

## Index

### Constructors

* [constructor](api_platformvm_validationtx.addvalidatortx.md#constructor)

### Properties

* [_codecID](api_platformvm_validationtx.addvalidatortx.md#protected-_codecid)
* [_typeID](api_platformvm_validationtx.addvalidatortx.md#protected-_typeid)
* [_typeName](api_platformvm_validationtx.addvalidatortx.md#protected-_typename)
* [blockchainid](api_platformvm_validationtx.addvalidatortx.md#protected-blockchainid)
* [delegationFee](api_platformvm_validationtx.addvalidatortx.md#protected-delegationfee)
* [endTime](api_platformvm_validationtx.addvalidatortx.md#protected-endtime)
* [ins](api_platformvm_validationtx.addvalidatortx.md#protected-ins)
* [memo](api_platformvm_validationtx.addvalidatortx.md#protected-memo)
* [networkid](api_platformvm_validationtx.addvalidatortx.md#protected-networkid)
* [nodeID](api_platformvm_validationtx.addvalidatortx.md#protected-nodeid)
* [numins](api_platformvm_validationtx.addvalidatortx.md#protected-numins)
* [numouts](api_platformvm_validationtx.addvalidatortx.md#protected-numouts)
* [outs](api_platformvm_validationtx.addvalidatortx.md#protected-outs)
* [rewardOwners](api_platformvm_validationtx.addvalidatortx.md#protected-rewardowners)
* [stakeOuts](api_platformvm_validationtx.addvalidatortx.md#protected-stakeouts)
* [startTime](api_platformvm_validationtx.addvalidatortx.md#protected-starttime)
* [weight](api_platformvm_validationtx.addvalidatortx.md#protected-weight)
* [delegatorMultiplier](api_platformvm_validationtx.addvalidatortx.md#static-private-delegatormultiplier)

### Methods

* [clone](api_platformvm_validationtx.addvalidatortx.md#clone)
* [create](api_platformvm_validationtx.addvalidatortx.md#create)
* [deserialize](api_platformvm_validationtx.addvalidatortx.md#deserialize)
* [fromBuffer](api_platformvm_validationtx.addvalidatortx.md#frombuffer)
* [getBlockchainID](api_platformvm_validationtx.addvalidatortx.md#getblockchainid)
* [getCodecID](api_platformvm_validationtx.addvalidatortx.md#getcodecid)
* [getDelegationFee](api_platformvm_validationtx.addvalidatortx.md#getdelegationfee)
* [getDelegationFeeBuffer](api_platformvm_validationtx.addvalidatortx.md#getdelegationfeebuffer)
* [getEndTime](api_platformvm_validationtx.addvalidatortx.md#getendtime)
* [getIns](api_platformvm_validationtx.addvalidatortx.md#getins)
* [getMemo](api_platformvm_validationtx.addvalidatortx.md#getmemo)
* [getNetworkID](api_platformvm_validationtx.addvalidatortx.md#getnetworkid)
* [getNodeID](api_platformvm_validationtx.addvalidatortx.md#getnodeid)
* [getNodeIDString](api_platformvm_validationtx.addvalidatortx.md#getnodeidstring)
* [getOuts](api_platformvm_validationtx.addvalidatortx.md#getouts)
* [getRewardOwners](api_platformvm_validationtx.addvalidatortx.md#getrewardowners)
* [getStakeAmount](api_platformvm_validationtx.addvalidatortx.md#getstakeamount)
* [getStakeAmountBuffer](api_platformvm_validationtx.addvalidatortx.md#getstakeamountbuffer)
* [getStakeOuts](api_platformvm_validationtx.addvalidatortx.md#getstakeouts)
* [getStakeOutsTotal](api_platformvm_validationtx.addvalidatortx.md#getstakeoutstotal)
* [getStartTime](api_platformvm_validationtx.addvalidatortx.md#getstarttime)
* [getTotalOuts](api_platformvm_validationtx.addvalidatortx.md#gettotalouts)
* [getTxType](api_platformvm_validationtx.addvalidatortx.md#gettxtype)
* [getTypeID](api_platformvm_validationtx.addvalidatortx.md#gettypeid)
* [getTypeName](api_platformvm_validationtx.addvalidatortx.md#gettypename)
* [getWeight](api_platformvm_validationtx.addvalidatortx.md#getweight)
* [getWeightBuffer](api_platformvm_validationtx.addvalidatortx.md#getweightbuffer)
* [select](api_platformvm_validationtx.addvalidatortx.md#select)
* [serialize](api_platformvm_validationtx.addvalidatortx.md#serialize)
* [sign](api_platformvm_validationtx.addvalidatortx.md#sign)
* [toBuffer](api_platformvm_validationtx.addvalidatortx.md#tobuffer)
* [toString](api_platformvm_validationtx.addvalidatortx.md#tostring)

## Constructors

###  constructor

\+ **new AddValidatorTx**(`networkid`: number, `blockchainid`: Buffer, `outs`: Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›, `ins`: Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›, `memo`: Buffer, `nodeID`: Buffer, `startTime`: BN, `endTime`: BN, `stakeAmount`: BN, `stakeOuts`: Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›, `rewardOwners`: [ParseableOutput](api_platformvm_outputs.parseableoutput.md), `delegationFee`: number): *[AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md)*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[constructor](api_platformvm_validationtx.adddelegatortx.md#constructor)*

*Defined in [src/apis/platformvm/validationtx.ts:534](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L534)*

Class representing an unsigned AddValidatorTx transaction.

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
`stakeAmount` | BN | undefined | Optional. The amount of nAVAX the validator is staking. |
`stakeOuts` | Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)› | undefined | Optional. The outputs used in paying the stake. |
`rewardOwners` | [ParseableOutput](api_platformvm_outputs.parseableoutput.md) | undefined | Optional. The [ParseableOutput](api_platformvm_outputs.parseableoutput.md) containing the [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md) for the rewards. |
`delegationFee` | number | undefined | Optional. The percent fee this validator charges when others delegate stake to them. Up to 4 decimal places allowed; additional decimal places are ignored. Must be between 0 and 100, inclusive. For example, if delegationFeeRate is 1.2345 and someone delegates to this validator, then when the delegation period is over, 1.2345% of the reward goes to the validator and the rest goes to the delegator.  |

**Returns:** *[AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.ADDVALIDATORTX

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[_typeID](api_platformvm_validationtx.adddelegatortx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/validationtx.ts:478](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L478)*

___

### `Protected` _typeName

• **_typeName**: *string* = "AddValidatorTx"

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[_typeName](api_platformvm_validationtx.adddelegatortx.md#protected-_typename)*

*Defined in [src/apis/platformvm/validationtx.ts:477](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L477)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainid](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:49](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L49)*

___

### `Protected` delegationFee

• **delegationFee**: *number* = 0

*Defined in [src/apis/platformvm/validationtx.ts:495](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L495)*

___

### `Protected` endTime

• **endTime**: *Buffer* = Buffer.alloc(8)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[endTime](api_platformvm_validationtx.validatortx.md#protected-endtime)*

*Defined in [src/apis/platformvm/validationtx.ts:50](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L50)*

___

### `Protected` ins

• **ins**: *Array‹[StandardTransferableInput](common_inputs.standardtransferableinput.md)›*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[ins](common_transactions.standardbasetx.md#protected-ins)*

*Defined in [src/common/tx.ts:53](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L53)*

___

### `Protected` memo

• **memo**: *Buffer* = Buffer.alloc(0)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[memo](common_transactions.standardbasetx.md#protected-memo)*

*Defined in [src/common/tx.ts:54](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L54)*

___

### `Protected` networkid

• **networkid**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[networkid](common_transactions.standardbasetx.md#protected-networkid)*

*Defined in [src/common/tx.ts:48](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L48)*

___

### `Protected` nodeID

• **nodeID**: *Buffer* = Buffer.alloc(20)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[nodeID](api_platformvm_validationtx.validatortx.md#protected-nodeid)*

*Defined in [src/apis/platformvm/validationtx.ts:48](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L48)*

___

### `Protected` numins

• **numins**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numins](common_transactions.standardbasetx.md#protected-numins)*

*Defined in [src/common/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L52)*

___

### `Protected` numouts

• **numouts**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numouts](common_transactions.standardbasetx.md#protected-numouts)*

*Defined in [src/common/tx.ts:50](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L50)*

___

### `Protected` outs

• **outs**: *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[outs](common_transactions.standardbasetx.md#protected-outs)*

*Defined in [src/common/tx.ts:51](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L51)*

___

### `Protected` rewardOwners

• **rewardOwners**: *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)* = undefined

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[rewardOwners](api_platformvm_validationtx.adddelegatortx.md#protected-rewardowners)*

*Defined in [src/apis/platformvm/validationtx.ts:340](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L340)*

___

### `Protected` stakeOuts

• **stakeOuts**: *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›* = []

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[stakeOuts](api_platformvm_validationtx.adddelegatortx.md#protected-stakeouts)*

*Defined in [src/apis/platformvm/validationtx.ts:339](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L339)*

___

### `Protected` startTime

• **startTime**: *Buffer* = Buffer.alloc(8)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[startTime](api_platformvm_validationtx.validatortx.md#protected-starttime)*

*Defined in [src/apis/platformvm/validationtx.ts:49](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L49)*

___

### `Protected` weight

• **weight**: *Buffer* = Buffer.alloc(8)

*Inherited from [WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md).[weight](api_platformvm_validationtx.weightedvalidatortx.md#protected-weight)*

*Defined in [src/apis/platformvm/validationtx.ts:138](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L138)*

___

### `Static` `Private` delegatorMultiplier

▪ **delegatorMultiplier**: *number* = 10000

*Defined in [src/apis/platformvm/validationtx.ts:496](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L496)*

## Methods

###  clone

▸ **clone**(): *this*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[clone](api_platformvm_validationtx.adddelegatortx.md#clone)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[clone](api_platformvm_basetx.basetx.md#clone)*

*Defined in [src/apis/platformvm/validationtx.ts:430](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L430)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[create](api_platformvm_validationtx.adddelegatortx.md#create)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[create](api_platformvm_basetx.basetx.md#create)*

*Defined in [src/apis/platformvm/validationtx.ts:436](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L436)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[deserialize](api_platformvm_validationtx.adddelegatortx.md#deserialize)*

*Defined in [src/apis/platformvm/validationtx.ts:487](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L487)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[fromBuffer](api_platformvm_validationtx.adddelegatortx.md#frombuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:522](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L522)*

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

*Defined in [src/common/tx.ts:69](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L69)*

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

###  getDelegationFee

▸ **getDelegationFee**(): *number*

*Defined in [src/apis/platformvm/validationtx.ts:508](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L508)*

Returns the delegation fee (represents a percentage from 0 to 100);

**Returns:** *number*

___

###  getDelegationFeeBuffer

▸ **getDelegationFeeBuffer**(): *Buffer*

*Defined in [src/apis/platformvm/validationtx.ts:515](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L515)*

Returns the binary representation of the delegation fee as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getEndTime

▸ **getEndTime**(): *BN‹›*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getEndTime](api_platformvm_validationtx.validatortx.md#getendtime)*

*Defined in [src/apis/platformvm/validationtx.ts:75](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L75)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getIns

▸ **getIns**(): *Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getIns](api_platformvm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/platformvm/basetx.ts:53](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/basetx.ts#L53)*

**Returns:** *Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:89](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L89)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:64](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L64)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getNodeID

▸ **getNodeID**(): *Buffer*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getNodeID](api_platformvm_validationtx.validatortx.md#getnodeid)*

*Defined in [src/apis/platformvm/validationtx.ts:55](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L55)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  getNodeIDString

▸ **getNodeIDString**(): *string*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getNodeIDString](api_platformvm_validationtx.validatortx.md#getnodeidstring)*

*Defined in [src/apis/platformvm/validationtx.ts:62](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L62)*

Returns a string for the nodeID amount.

**Returns:** *string*

___

###  getOuts

▸ **getOuts**(): *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getOuts](api_platformvm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/platformvm/basetx.ts:49](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/basetx.ts#L49)*

**Returns:** *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

___

###  getRewardOwners

▸ **getRewardOwners**(): *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getRewardOwners](api_platformvm_validationtx.adddelegatortx.md#getrewardowners)*

*Defined in [src/apis/platformvm/validationtx.ts:384](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L384)*

Returns a [Buffer](https://github.com/feross/buffer) for the reward address.

**Returns:** *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

___

###  getStakeAmount

▸ **getStakeAmount**(): *BN*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getStakeAmount](api_platformvm_validationtx.adddelegatortx.md#getstakeamount)*

*Defined in [src/apis/platformvm/validationtx.ts:352](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L352)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN*

___

###  getStakeAmountBuffer

▸ **getStakeAmountBuffer**(): *Buffer*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getStakeAmountBuffer](api_platformvm_validationtx.adddelegatortx.md#getstakeamountbuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:359](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L359)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  getStakeOuts

▸ **getStakeOuts**(): *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getStakeOuts](api_platformvm_validationtx.adddelegatortx.md#getstakeouts)*

*Defined in [src/apis/platformvm/validationtx.ts:366](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L366)*

Returns the array of outputs being staked.

**Returns:** *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

___

###  getStakeOutsTotal

▸ **getStakeOutsTotal**(): *BN*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getStakeOutsTotal](api_platformvm_validationtx.adddelegatortx.md#getstakeoutstotal)*

*Defined in [src/apis/platformvm/validationtx.ts:373](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L373)*

Should match stakeAmount. Used in sanity checking.

**Returns:** *BN*

___

###  getStartTime

▸ **getStartTime**(): *BN‹›*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getStartTime](api_platformvm_validationtx.validatortx.md#getstarttime)*

*Defined in [src/apis/platformvm/validationtx.ts:68](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L68)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getTotalOuts

▸ **getTotalOuts**(): *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getTotalOuts](api_platformvm_validationtx.adddelegatortx.md#gettotalouts)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[getTotalOuts](api_platformvm_basetx.basetx.md#gettotalouts)*

*Defined in [src/apis/platformvm/validationtx.ts:388](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L388)*

**Returns:** *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getTxType](api_platformvm_validationtx.adddelegatortx.md#gettxtype)*

*Defined in [src/apis/platformvm/validationtx.ts:501](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L501)*

Returns the id of the [AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md)

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

###  getWeight

▸ **getWeight**(): *BN*

*Inherited from [WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md).[getWeight](api_platformvm_validationtx.weightedvalidatortx.md#getweight)*

*Defined in [src/apis/platformvm/validationtx.ts:143](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L143)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN*

___

###  getWeightBuffer

▸ **getWeightBuffer**(): *Buffer*

*Inherited from [WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md).[getWeightBuffer](api_platformvm_validationtx.weightedvalidatortx.md#getweightbuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:150](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L150)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[select](api_platformvm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/platformvm/basetx.ts:144](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/basetx.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[serialize](api_platformvm_validationtx.adddelegatortx.md#serialize)*

*Defined in [src/apis/platformvm/validationtx.ts:480](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L480)*

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

*Defined in [src/apis/platformvm/basetx.ts:117](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/basetx.ts#L117)*

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

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[toBuffer](api_platformvm_validationtx.adddelegatortx.md#tobuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:530](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/apis/platformvm/validationtx.ts#L530)*

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/common/tx.ts#L126)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
