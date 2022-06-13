[avalanche](../README.md) › [API-PlatformVM-AddSubnetValidatorTx](../modules/api_platformvm_addsubnetvalidatortx.md) › [AddSubnetValidatorTx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md)

# Class: AddSubnetValidatorTx

Class representing an unsigned AddSubnetValidatorTx transaction.

## Hierarchy

  ↳ [BaseTx](api_platformvm_basetx.basetx.md)

  ↳ **AddSubnetValidatorTx**

## Index

### Constructors

* [constructor](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#constructor)

### Properties

* [_codecID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-_codecid)
* [_typeID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-_typeid)
* [_typeName](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-_typename)
* [blockchainID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-blockchainid)
* [endTime](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-endtime)
* [ins](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-ins)
* [memo](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-memo)
* [networkID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-networkid)
* [nodeID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-nodeid)
* [numins](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-numins)
* [numouts](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-numouts)
* [outs](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-outs)
* [sigCount](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-sigcount)
* [sigIdxs](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-sigidxs)
* [startTime](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-starttime)
* [subnetAuth](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-subnetauth)
* [subnetID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-subnetid)
* [weight](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#protected-weight)

### Methods

* [addSignatureIdx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#addsignatureidx)
* [clone](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#clone)
* [create](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#create)
* [deserialize](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#deserialize)
* [fromBuffer](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#frombuffer)
* [getBlockchainID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getblockchainid)
* [getCodecID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getcodecid)
* [getCredentialID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getcredentialid)
* [getEndTime](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getendtime)
* [getIns](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getins)
* [getMemo](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getmemo)
* [getNetworkID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getnetworkid)
* [getNodeID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getnodeid)
* [getNodeIDString](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getnodeidstring)
* [getOuts](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getouts)
* [getSigIdxs](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getsigidxs)
* [getStartTime](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getstarttime)
* [getSubnetAuth](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getsubnetauth)
* [getSubnetID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getsubnetid)
* [getTotalOuts](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#gettotalouts)
* [getTxType](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#gettxtype)
* [getTypeID](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#gettypeid)
* [getTypeName](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#gettypename)
* [getWeight](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#getweight)
* [sanitizeObject](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#sanitizeobject)
* [select](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#select)
* [serialize](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#serialize)
* [sign](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#sign)
* [toBuffer](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#tobuffer)
* [toString](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md#tostring)

## Constructors

###  constructor

\+ **new AddSubnetValidatorTx**(`networkID`: number, `blockchainID`: Buffer, `outs`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[], `ins`: [TransferableInput](api_platformvm_inputs.transferableinput.md)[], `memo`: Buffer, `nodeID`: Buffer, `startTime`: BN, `endTime`: BN, `weight`: BN, `subnetID`: string | Buffer): *[AddSubnetValidatorTx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[constructor](api_platformvm_basetx.basetx.md#constructor)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:244](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L244)*

Class representing an unsigned AddSubnetValidator transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional networkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16) |
`outs` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[] | undefined | Optional array of the [TransferableOutput](api_evm_outputs.transferableoutput.md)s |
`ins` | [TransferableInput](api_platformvm_inputs.transferableinput.md)[] | undefined | Optional array of the [TransferableInput](api_evm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field |
`nodeID` | Buffer | undefined | Optional. The node ID of the validator being added. |
`startTime` | BN | undefined | Optional. The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | undefined | Optional. The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`weight` | BN | undefined | Optional. Weight of this validator used when sampling |
`subnetID` | string &#124; Buffer | undefined | Optional. ID of the subnet this validator is validating  |

**Returns:** *[AddSubnetValidatorTx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [NBytes](common_nbytes.nbytes.md).[_codecID](common_nbytes.nbytes.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.ADDSUBNETVALIDATORTX

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[_typeID](api_platformvm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:30](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L30)*

___

### `Protected` _typeName

• **_typeName**: *string* = "AddSubnetValidatorTx"

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[_typeName](api_platformvm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:29](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L29)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:82](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L82)*

___

### `Protected` endTime

• **endTime**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:58](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L58)*

___

### `Protected` ins

• **ins**: *[StandardTransferableInput](common_inputs.standardtransferableinput.md)[]*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[ins](common_transactions.standardbasetx.md#protected-ins)*

*Defined in [src/common/tx.ts:86](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L86)*

___

### `Protected` memo

• **memo**: *Buffer* = Buffer.alloc(0)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[memo](common_transactions.standardbasetx.md#protected-memo)*

*Defined in [src/common/tx.ts:87](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L87)*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[networkID](common_transactions.standardbasetx.md#protected-networkid)*

*Defined in [src/common/tx.ts:81](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L81)*

___

### `Protected` nodeID

• **nodeID**: *Buffer* = Buffer.alloc(20)

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:56](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L56)*

___

### `Protected` numins

• **numins**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numins](common_transactions.standardbasetx.md#protected-numins)*

*Defined in [src/common/tx.ts:85](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L85)*

___

### `Protected` numouts

• **numouts**: *Buffer* = Buffer.alloc(4)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[numouts](common_transactions.standardbasetx.md#protected-numouts)*

*Defined in [src/common/tx.ts:83](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L83)*

___

### `Protected` outs

• **outs**: *[StandardTransferableOutput](common_output.standardtransferableoutput.md)[]*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[outs](common_transactions.standardbasetx.md#protected-outs)*

*Defined in [src/common/tx.ts:84](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L84)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:62](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L62)*

___

### `Protected` sigIdxs

• **sigIdxs**: *[SigIdx](common_signature.sigidx.md)[]* = []

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:63](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L63)*

___

### `Protected` startTime

• **startTime**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:57](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L57)*

___

### `Protected` subnetAuth

• **subnetAuth**: *[SubnetAuth](api_platformvm_subnetauth.subnetauth.md)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:61](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L61)*

___

### `Protected` subnetID

• **subnetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:60](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L60)*

___

### `Protected` weight

• **weight**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:59](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L59)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:198](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L198)*

Creates and adds a [SigIdx](common_signature.sigidx.md) to the [AddSubnetValidatorTx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`addressIdx` | number | The index of the address to reference in the signatures |
`address` | Buffer | The address of the source of the signature  |

**Returns:** *void*

___

###  clone

▸ **clone**(): *this*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[clone](api_platformvm_validationtx.validatortx.md#clone)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:181](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L181)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[create](api_platformvm_validationtx.validatortx.md#create)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:188](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[deserialize](api_platformvm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:40](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L40)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[fromBuffer](api_platformvm_basetx.basetx.md#frombuffer)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:129](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L129)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [AddSubnetValidatorTx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md), parses it, populates the class, and returns the length of the [CreateChainTx](api_platformvm_createchaintx.createchaintx.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [AddSubnetValidatorTx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [AddSubnetValidatorTx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)*

*Defined in [src/common/tx.ts:104](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L104)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getCodecID](common_nbytes.nbytes.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getCredentialID

▸ **getCredentialID**(): *number*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:219](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L219)*

**Returns:** *number*

___

###  getEndTime

▸ **getEndTime**(): *BN*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:96](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L96)*

Returns a [BN](https://github.com/indutny/bn.js/) for the endTime.

**Returns:** *BN*

___

###  getIns

▸ **getIns**(): *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

*Inherited from [ImportTx](api_platformvm_importtx.importtx.md).[getIns](api_platformvm_importtx.importtx.md#getins)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getIns](common_transactions.standardbasetx.md#abstract-getins)*

*Defined in [src/apis/platformvm/basetx.ts:52](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/basetx.ts#L52)*

**Returns:** *[TransferableInput](api_platformvm_inputs.transferableinput.md)[]*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getMemo](common_transactions.standardbasetx.md#getmemo)*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L126)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getNetworkID](common_transactions.standardbasetx.md#getnetworkid)*

*Defined in [src/common/tx.ts:97](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L97)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getNodeID

▸ **getNodeID**(): *Buffer*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:75](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L75)*

Returns a [Buffer](https://github.com/feross/buffer) for the stake amount.

**Returns:** *Buffer*

___

###  getNodeIDString

▸ **getNodeIDString**(): *string*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:82](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L82)*

Returns a string for the nodeID amount.

**Returns:** *string*

___

###  getOuts

▸ **getOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [ImportTx](api_platformvm_importtx.importtx.md).[getOuts](api_platformvm_importtx.importtx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/platformvm/basetx.ts:48](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/basetx.ts#L48)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:215](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L215)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Input](common_inputs.input.md)

**Returns:** *[SigIdx](common_signature.sigidx.md)[]*

___

###  getStartTime

▸ **getStartTime**(): *BN*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:89](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L89)*

Returns a [BN](https://github.com/indutny/bn.js/) for the startTime.

**Returns:** *BN*

___

###  getSubnetAuth

▸ **getSubnetAuth**(): *[SubnetAuth](api_platformvm_subnetauth.subnetauth.md)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:116](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L116)*

Returns the subnetAuth

**Returns:** *[SubnetAuth](api_platformvm_subnetauth.subnetauth.md)*

___

###  getSubnetID

▸ **getSubnetID**(): *string*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:110](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L110)*

Returns the subnetID as a string

**Returns:** *string*

___

###  getTotalOuts

▸ **getTotalOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [ImportTx](api_platformvm_importtx.importtx.md).[getTotalOuts](api_platformvm_importtx.importtx.md#gettotalouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)*

*Defined in [src/apis/platformvm/basetx.ts:56](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/basetx.ts#L56)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[getTxType](api_platformvm_validationtx.validatortx.md#gettxtype)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:68](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L68)*

Returns the id of the [AddSubnetValidatorTx](api_platformvm_addsubnetvalidatortx.addsubnetvalidatortx.md)

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getTypeID](common_nbytes.nbytes.md#gettypeid)*

*Defined in [src/utils/serialization.ts:63](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L63)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getTypeName](common_nbytes.nbytes.md#gettypename)*

*Defined in [src/utils/serialization.ts:56](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L56)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  getWeight

▸ **getWeight**(): *BN*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:103](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L103)*

Returns a [BN](https://github.com/indutny/bn.js/) for the weight

**Returns:** *BN*

___

###  sanitizeObject

▸ **sanitizeObject**(`obj`: object): *object*

*Inherited from [NBytes](common_nbytes.nbytes.md).[sanitizeObject](common_nbytes.nbytes.md#sanitizeobject)*

*Defined in [src/utils/serialization.ts:77](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L77)*

Sanitize to prevent cross scripting attacks.

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *object*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Inherited from [ImportTx](api_platformvm_importtx.importtx.md).[select](api_platformvm_importtx.importtx.md#select)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[select](common_transactions.standardbasetx.md#abstract-select)*

*Defined in [src/apis/platformvm/basetx.ts:146](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/basetx.ts#L146)*

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

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:32](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_platformvm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Overrides [ExportTx](api_platformvm_exporttx.exporttx.md).[sign](api_platformvm_exporttx.exporttx.md#sign)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:231](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L231)*

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

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[toBuffer](common_transactions.standardbasetx.md#tobuffer)*

*Defined in [src/apis/platformvm/addsubnetvalidatortx.ts:157](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/addsubnetvalidatortx.ts#L157)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [CreateChainTx](api_platformvm_createchaintx.createchaintx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:166](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L166)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
