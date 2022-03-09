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
* [blockchainID](api_platformvm_validationtx.addvalidatortx.md#protected-blockchainid)
* [delegationFee](api_platformvm_validationtx.addvalidatortx.md#protected-delegationfee)
* [endTime](api_platformvm_validationtx.addvalidatortx.md#protected-endtime)
* [ins](api_platformvm_validationtx.addvalidatortx.md#protected-ins)
* [memo](api_platformvm_validationtx.addvalidatortx.md#protected-memo)
* [networkID](api_platformvm_validationtx.addvalidatortx.md#protected-networkid)
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
* [sanitizeObject](api_platformvm_validationtx.addvalidatortx.md#sanitizeobject)
* [select](api_platformvm_validationtx.addvalidatortx.md#select)
* [serialize](api_platformvm_validationtx.addvalidatortx.md#serialize)
* [sign](api_platformvm_validationtx.addvalidatortx.md#sign)
* [toBuffer](api_platformvm_validationtx.addvalidatortx.md#tobuffer)
* [toString](api_platformvm_validationtx.addvalidatortx.md#tostring)

## Constructors

###  constructor

\+ **new AddValidatorTx**(`networkID`: number, `blockchainID`: Buffer, `outs`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[], `ins`: [TransferableInput](api_platformvm_inputs.transferableinput.md)[], `memo`: Buffer, `nodeID`: Buffer, `startTime`: BN, `endTime`: BN, `stakeAmount`: BN, `stakeOuts`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[], `rewardOwners`: [ParseableOutput](api_platformvm_outputs.parseableoutput.md), `delegationFee`: number): *[AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md)*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[constructor](api_platformvm_validationtx.adddelegatortx.md#constructor)*

*Defined in [src/apis/platformvm/validationtx.ts:487](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L487)*

Class representing an unsigned AddValidatorTx transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional. Networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional. Blockchainid, default Buffer.alloc(32, 16) |
`outs` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[] | undefined | Optional. Array of the [TransferableOutput](api_evm_outputs.transferableoutput.md)s |
`ins` | [TransferableInput](api_platformvm_inputs.transferableinput.md)[] | undefined | Optional. Array of the [TransferableInput](api_evm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional. [Buffer](https://github.com/feross/buffer) for the memo field |
`nodeID` | Buffer | undefined | Optional. The node ID of the validator being added. |
`startTime` | BN | undefined | Optional. The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | undefined | Optional. The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`stakeAmount` | BN | undefined | Optional. The amount of nAVAX the validator is staking. |
`stakeOuts` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[] | undefined | Optional. The outputs used in paying the stake. |
`rewardOwners` | [ParseableOutput](api_platformvm_outputs.parseableoutput.md) | undefined | Optional. The [ParseableOutput](api_platformvm_outputs.parseableoutput.md) containing the [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md) for the rewards. |
`delegationFee` | number | undefined | Optional. The percent fee this validator charges when others delegate stake to them. Up to 4 decimal places allowed; additional decimal places are ignored. Must be between 0 and 100, inclusive. For example, if delegationFeeRate is 1.2345 and someone delegates to this validator, then when the delegation period is over, 1.2345% of the reward goes to the validator and the rest goes to the delegator.  |

**Returns:** *[AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.ADDVALIDATORTX

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[_typeID](api_platformvm_validationtx.adddelegatortx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/validationtx.ts:417](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L417)*

___

### `Protected` _typeName

• **_typeName**: *string* = "AddValidatorTx"

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[_typeName](api_platformvm_validationtx.adddelegatortx.md#protected-_typename)*

*Defined in [src/apis/platformvm/validationtx.ts:416](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L416)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:82](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L82)*

___

### `Protected` delegationFee

• **delegationFee**: *number* = 0

*Defined in [src/apis/platformvm/validationtx.ts:445](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L445)*

___

### `Protected` endTime

• **endTime**: *Buffer* = Buffer.alloc(8)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[endTime](api_platformvm_validationtx.validatortx.md#protected-endtime)*

*Defined in [src/apis/platformvm/validationtx.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L78)*

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

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[networkID](common_transactions.standardbasetx.md#protected-networkid)*

*Defined in [src/common/tx.ts:81](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L81)*

___

### `Protected` nodeID

• **nodeID**: *Buffer* = Buffer.alloc(20)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[nodeID](api_platformvm_validationtx.validatortx.md#protected-nodeid)*

*Defined in [src/apis/platformvm/validationtx.ts:76](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L76)*

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

### `Protected` rewardOwners

• **rewardOwners**: *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)* = undefined

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[rewardOwners](api_platformvm_validationtx.adddelegatortx.md#protected-rewardowners)*

*Defined in [src/apis/platformvm/validationtx.ts:267](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L267)*

___

### `Protected` stakeOuts

• **stakeOuts**: *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]* = []

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[stakeOuts](api_platformvm_validationtx.adddelegatortx.md#protected-stakeouts)*

*Defined in [src/apis/platformvm/validationtx.ts:266](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L266)*

___

### `Protected` startTime

• **startTime**: *Buffer* = Buffer.alloc(8)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[startTime](api_platformvm_validationtx.validatortx.md#protected-starttime)*

*Defined in [src/apis/platformvm/validationtx.ts:77](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L77)*

___

### `Protected` weight

• **weight**: *Buffer* = Buffer.alloc(8)

*Inherited from [WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md).[weight](api_platformvm_validationtx.weightedvalidatortx.md#protected-weight)*

*Defined in [src/apis/platformvm/validationtx.ts:178](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L178)*

___

### `Static` `Private` delegatorMultiplier

▪ **delegatorMultiplier**: *number* = 10000

*Defined in [src/apis/platformvm/validationtx.ts:446](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L446)*

## Methods

###  clone

▸ **clone**(): *this*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[clone](api_platformvm_validationtx.adddelegatortx.md#clone)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[clone](api_platformvm_basetx.basetx.md#clone)*

*Defined in [src/apis/platformvm/validationtx.ts:359](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L359)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[create](api_platformvm_validationtx.adddelegatortx.md#create)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[create](api_platformvm_basetx.basetx.md#create)*

*Defined in [src/apis/platformvm/validationtx.ts:365](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L365)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[deserialize](api_platformvm_validationtx.adddelegatortx.md#deserialize)*

*Defined in [src/apis/platformvm/validationtx.ts:432](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L432)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[fromBuffer](api_platformvm_validationtx.adddelegatortx.md#frombuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:474](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L474)*

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

###  getDelegationFee

▸ **getDelegationFee**(): *number*

*Defined in [src/apis/platformvm/validationtx.ts:458](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L458)*

Returns the delegation fee (represents a percentage from 0 to 100);

**Returns:** *number*

___

###  getDelegationFeeBuffer

▸ **getDelegationFeeBuffer**(): *Buffer*

*Defined in [src/apis/platformvm/validationtx.ts:465](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L465)*

Returns the binary representation of the delegation fee as a [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer*

___

###  getEndTime

▸ **getEndTime**(): *BN‹›*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getEndTime](api_platformvm_validationtx.validatortx.md#getendtime)*

*Defined in [src/apis/platformvm/validationtx.ts:103](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L103)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getIns

▸ **getIns**(): *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getIns](api_platformvm_basetx.basetx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/platformvm/basetx.ts:52](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L52)*

**Returns:** *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L126)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:97](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L97)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getNodeID

▸ **getNodeID**(): *Buffer*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getNodeID](api_platformvm_validationtx.validatortx.md#getnodeid)*

*Defined in [src/apis/platformvm/validationtx.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L83)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  getNodeIDString

▸ **getNodeIDString**(): *string*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getNodeIDString](api_platformvm_validationtx.validatortx.md#getnodeidstring)*

*Defined in [src/apis/platformvm/validationtx.ts:90](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L90)*

Returns a string for the nodeID amount.

**Returns:** *string*

___

###  getOuts

▸ **getOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getOuts](api_platformvm_basetx.basetx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/platformvm/basetx.ts:48](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L48)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getRewardOwners

▸ **getRewardOwners**(): *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getRewardOwners](api_platformvm_validationtx.adddelegatortx.md#getrewardowners)*

*Defined in [src/apis/platformvm/validationtx.ts:313](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L313)*

Returns a [Buffer](https://github.com/feross/buffer) for the reward address.

**Returns:** *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

___

###  getStakeAmount

▸ **getStakeAmount**(): *BN*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getStakeAmount](api_platformvm_validationtx.adddelegatortx.md#getstakeamount)*

*Defined in [src/apis/platformvm/validationtx.ts:279](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L279)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN*

___

###  getStakeAmountBuffer

▸ **getStakeAmountBuffer**(): *Buffer*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getStakeAmountBuffer](api_platformvm_validationtx.adddelegatortx.md#getstakeamountbuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:286](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L286)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  getStakeOuts

▸ **getStakeOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getStakeOuts](api_platformvm_validationtx.adddelegatortx.md#getstakeouts)*

*Defined in [src/apis/platformvm/validationtx.ts:293](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L293)*

Returns the array of outputs being staked.

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getStakeOutsTotal

▸ **getStakeOutsTotal**(): *BN*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getStakeOutsTotal](api_platformvm_validationtx.adddelegatortx.md#getstakeoutstotal)*

*Defined in [src/apis/platformvm/validationtx.ts:300](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L300)*

Should match stakeAmount. Used in sanity checking.

**Returns:** *BN*

___

###  getStartTime

▸ **getStartTime**(): *BN‹›*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getStartTime](api_platformvm_validationtx.validatortx.md#getstarttime)*

*Defined in [src/apis/platformvm/validationtx.ts:96](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L96)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getTotalOuts

▸ **getTotalOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getTotalOuts](api_platformvm_validationtx.adddelegatortx.md#gettotalouts)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[getTotalOuts](api_platformvm_basetx.basetx.md#gettotalouts)*

*Defined in [src/apis/platformvm/validationtx.ts:317](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L317)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[getTxType](api_platformvm_validationtx.adddelegatortx.md#gettxtype)*

*Defined in [src/apis/platformvm/validationtx.ts:451](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L451)*

Returns the id of the [AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md)

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

###  getWeight

▸ **getWeight**(): *BN*

*Inherited from [WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md).[getWeight](api_platformvm_validationtx.weightedvalidatortx.md#getweight)*

*Defined in [src/apis/platformvm/validationtx.ts:183](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L183)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN*

___

###  getWeightBuffer

▸ **getWeightBuffer**(): *Buffer*

*Inherited from [WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md).[getWeightBuffer](api_platformvm_validationtx.weightedvalidatortx.md#getweightbuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:190](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L190)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

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

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[select](api_platformvm_basetx.basetx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/platformvm/basetx.ts:146](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[serialize](api_platformvm_validationtx.adddelegatortx.md#serialize)*

*Defined in [src/apis/platformvm/validationtx.ts:419](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L419)*

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

*Defined in [src/apis/platformvm/basetx.ts:117](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L117)*

Takes the bytes of an [UnsignedTx](api_evm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_evm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_platformvm_keychain.keychain.md) | An [KeyChain](api_evm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md).[toBuffer](api_platformvm_validationtx.adddelegatortx.md#tobuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:483](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L483)*

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L166)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
