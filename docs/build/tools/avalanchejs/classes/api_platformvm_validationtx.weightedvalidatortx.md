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

* [_codecID](api_platformvm_validationtx.weightedvalidatortx.md#protected-_codecid)
* [_typeID](api_platformvm_validationtx.weightedvalidatortx.md#protected-_typeid)
* [_typeName](api_platformvm_validationtx.weightedvalidatortx.md#protected-_typename)
* [blockchainID](api_platformvm_validationtx.weightedvalidatortx.md#protected-blockchainid)
* [endTime](api_platformvm_validationtx.weightedvalidatortx.md#protected-endtime)
* [ins](api_platformvm_validationtx.weightedvalidatortx.md#protected-ins)
* [memo](api_platformvm_validationtx.weightedvalidatortx.md#protected-memo)
* [networkID](api_platformvm_validationtx.weightedvalidatortx.md#protected-networkid)
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
* [getCodecID](api_platformvm_validationtx.weightedvalidatortx.md#getcodecid)
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
* [sanitizeObject](api_platformvm_validationtx.weightedvalidatortx.md#sanitizeobject)
* [select](api_platformvm_validationtx.weightedvalidatortx.md#select)
* [serialize](api_platformvm_validationtx.weightedvalidatortx.md#serialize)
* [sign](api_platformvm_validationtx.weightedvalidatortx.md#sign)
* [toBuffer](api_platformvm_validationtx.weightedvalidatortx.md#tobuffer)
* [toString](api_platformvm_validationtx.weightedvalidatortx.md#tostring)

## Constructors

###  constructor

\+ **new WeightedValidatorTx**(`networkID`: number, `blockchainID`: Buffer, `outs`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[], `ins`: [TransferableInput](api_platformvm_inputs.transferableinput.md)[], `memo`: Buffer, `nodeID`: Buffer, `startTime`: BN, `endTime`: BN, `weight`: BN): *[WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md)*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[constructor](api_platformvm_validationtx.validatortx.md#constructor)*

*Defined in [src/apis/platformvm/validationtx.ts:207](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L207)*

Class representing an unsigned AddSubnetValidatorTx transaction.

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
`weight` | BN | undefined | Optional. The amount of nAVAX the validator is staking.  |

**Returns:** *[WeightedValidatorTx](api_platformvm_validationtx.weightedvalidatortx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[_typeID](api_platformvm_validationtx.validatortx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/validationtx.ts:153](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L153)*

___

### `Protected` _typeName

• **_typeName**: *string* = "WeightedValidatorTx"

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[_typeName](api_platformvm_validationtx.validatortx.md#protected-_typename)*

*Defined in [src/apis/platformvm/validationtx.ts:152](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L152)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:82](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L82)*

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

### `Protected` startTime

• **startTime**: *Buffer* = Buffer.alloc(8)

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[startTime](api_platformvm_validationtx.validatortx.md#protected-starttime)*

*Defined in [src/apis/platformvm/validationtx.ts:77](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L77)*

___

### `Protected` weight

• **weight**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/platformvm/validationtx.ts:178](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L178)*

## Methods

###  clone

▸ **clone**(): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[clone](api_platformvm_basetx.basetx.md#clone)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[clone](common_transactions.standardbasetx.md#abstract-clone)*

*Defined in [src/apis/platformvm/basetx.ts:136](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L136)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[create](api_platformvm_basetx.basetx.md#create)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[create](common_transactions.standardbasetx.md#abstract-create)*

*Defined in [src/apis/platformvm/basetx.ts:142](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[deserialize](api_platformvm_validationtx.validatortx.md#deserialize)*

*Defined in [src/apis/platformvm/validationtx.ts:167](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L167)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[fromBuffer](api_platformvm_validationtx.validatortx.md#frombuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:194](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L194)*

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

###  getStartTime

▸ **getStartTime**(): *BN‹›*

*Inherited from [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getStartTime](api_platformvm_validationtx.validatortx.md#getstarttime)*

*Defined in [src/apis/platformvm/validationtx.ts:96](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L96)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN‹›*

___

###  getTotalOuts

▸ **getTotalOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getTotalOuts](api_platformvm_basetx.basetx.md#gettotalouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/platformvm/basetx.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L56)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getTxType

▸ **getTxType**(): *number*

*Inherited from [BaseTx](api_platformvm_basetx.basetx.md).[getTxType](api_platformvm_basetx.basetx.md#gettxtype)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTxType](common_transactions.standardbasetx.md#abstract-gettxtype)*

*Defined in [src/apis/platformvm/basetx.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/basetx.ts#L63)*

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

###  getWeight

▸ **getWeight**(): *BN*

*Defined in [src/apis/platformvm/validationtx.ts:183](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L183)*

Returns a [BN](https://github.com/indutny/bn.js/) for the stake amount.

**Returns:** *BN*

___

###  getWeightBuffer

▸ **getWeightBuffer**(): *Buffer*

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

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[serialize](api_platformvm_validationtx.validatortx.md#serialize)*

*Defined in [src/apis/platformvm/validationtx.ts:155](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L155)*

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

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[toBuffer](api_platformvm_validationtx.validatortx.md#tobuffer)*

*Defined in [src/apis/platformvm/validationtx.ts:204](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/validationtx.ts#L204)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [[AddSubnetValidatorTx]].

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/tx.ts#L166)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
