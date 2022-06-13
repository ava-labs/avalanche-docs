[avalanche](../README.md) › [API-PlatformVM-CreateChainTx](../modules/api_platformvm_createchaintx.md) › [CreateChainTx](api_platformvm_createchaintx.createchaintx.md)

# Class: CreateChainTx

Class representing an unsigned CreateChainTx transaction.

## Hierarchy

  ↳ [BaseTx](api_platformvm_basetx.basetx.md)

  ↳ **CreateChainTx**

## Index

### Constructors

* [constructor](api_platformvm_createchaintx.createchaintx.md#constructor)

### Properties

* [_codecID](api_platformvm_createchaintx.createchaintx.md#protected-_codecid)
* [_typeID](api_platformvm_createchaintx.createchaintx.md#protected-_typeid)
* [_typeName](api_platformvm_createchaintx.createchaintx.md#protected-_typename)
* [blockchainID](api_platformvm_createchaintx.createchaintx.md#protected-blockchainid)
* [chainName](api_platformvm_createchaintx.createchaintx.md#protected-chainname)
* [fxIDs](api_platformvm_createchaintx.createchaintx.md#protected-fxids)
* [genesisData](api_platformvm_createchaintx.createchaintx.md#protected-genesisdata)
* [ins](api_platformvm_createchaintx.createchaintx.md#protected-ins)
* [memo](api_platformvm_createchaintx.createchaintx.md#protected-memo)
* [networkID](api_platformvm_createchaintx.createchaintx.md#protected-networkid)
* [numFXIDs](api_platformvm_createchaintx.createchaintx.md#protected-numfxids)
* [numins](api_platformvm_createchaintx.createchaintx.md#protected-numins)
* [numouts](api_platformvm_createchaintx.createchaintx.md#protected-numouts)
* [outs](api_platformvm_createchaintx.createchaintx.md#protected-outs)
* [sigCount](api_platformvm_createchaintx.createchaintx.md#protected-sigcount)
* [sigIdxs](api_platformvm_createchaintx.createchaintx.md#protected-sigidxs)
* [subnetAuth](api_platformvm_createchaintx.createchaintx.md#protected-subnetauth)
* [subnetID](api_platformvm_createchaintx.createchaintx.md#protected-subnetid)
* [vmID](api_platformvm_createchaintx.createchaintx.md#protected-vmid)

### Methods

* [addSignatureIdx](api_platformvm_createchaintx.createchaintx.md#addsignatureidx)
* [clone](api_platformvm_createchaintx.createchaintx.md#clone)
* [create](api_platformvm_createchaintx.createchaintx.md#create)
* [deserialize](api_platformvm_createchaintx.createchaintx.md#deserialize)
* [fromBuffer](api_platformvm_createchaintx.createchaintx.md#frombuffer)
* [getBlockchainID](api_platformvm_createchaintx.createchaintx.md#getblockchainid)
* [getChainName](api_platformvm_createchaintx.createchaintx.md#getchainname)
* [getCodecID](api_platformvm_createchaintx.createchaintx.md#getcodecid)
* [getCredentialID](api_platformvm_createchaintx.createchaintx.md#getcredentialid)
* [getFXIDs](api_platformvm_createchaintx.createchaintx.md#getfxids)
* [getGenesisData](api_platformvm_createchaintx.createchaintx.md#getgenesisdata)
* [getIns](api_platformvm_createchaintx.createchaintx.md#getins)
* [getMemo](api_platformvm_createchaintx.createchaintx.md#getmemo)
* [getNetworkID](api_platformvm_createchaintx.createchaintx.md#getnetworkid)
* [getOuts](api_platformvm_createchaintx.createchaintx.md#getouts)
* [getSigIdxs](api_platformvm_createchaintx.createchaintx.md#getsigidxs)
* [getSubnetAuth](api_platformvm_createchaintx.createchaintx.md#getsubnetauth)
* [getSubnetID](api_platformvm_createchaintx.createchaintx.md#getsubnetid)
* [getTotalOuts](api_platformvm_createchaintx.createchaintx.md#gettotalouts)
* [getTxType](api_platformvm_createchaintx.createchaintx.md#gettxtype)
* [getTypeID](api_platformvm_createchaintx.createchaintx.md#gettypeid)
* [getTypeName](api_platformvm_createchaintx.createchaintx.md#gettypename)
* [getVMID](api_platformvm_createchaintx.createchaintx.md#getvmid)
* [sanitizeObject](api_platformvm_createchaintx.createchaintx.md#sanitizeobject)
* [select](api_platformvm_createchaintx.createchaintx.md#select)
* [serialize](api_platformvm_createchaintx.createchaintx.md#serialize)
* [sign](api_platformvm_createchaintx.createchaintx.md#sign)
* [toBuffer](api_platformvm_createchaintx.createchaintx.md#tobuffer)
* [toString](api_platformvm_createchaintx.createchaintx.md#tostring)

## Constructors

###  constructor

\+ **new CreateChainTx**(`networkID`: number, `blockchainID`: Buffer, `outs`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[], `ins`: [TransferableInput](api_platformvm_inputs.transferableinput.md)[], `memo`: Buffer, `subnetID`: string | Buffer, `chainName`: string, `vmID`: string, `fxIDs`: string[], `genesisData`: string | [GenesisData](api_avm_genesisdata.genesisdata.md)): *[CreateChainTx](api_platformvm_createchaintx.createchaintx.md)*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[constructor](api_platformvm_basetx.basetx.md#constructor)*

*Defined in [src/apis/platformvm/createchaintx.ts:279](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L279)*

Class representing an unsigned CreateChain transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional networkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16) |
`outs` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md)[] | undefined | Optional array of the [TransferableOutput](api_evm_outputs.transferableoutput.md)s |
`ins` | [TransferableInput](api_platformvm_inputs.transferableinput.md)[] | undefined | Optional array of the [TransferableInput](api_evm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field |
`subnetID` | string &#124; Buffer | undefined | Optional ID of the Subnet that validates this blockchain. |
`chainName` | string | undefined | Optional A human readable name for the chain; need not be unique |
`vmID` | string | undefined | Optional ID of the VM running on the new chain |
`fxIDs` | string[] | undefined | Optional IDs of the feature extensions running on the new chain |
`genesisData` | string &#124; [GenesisData](api_avm_genesisdata.genesisdata.md) | undefined | Optional Byte representation of genesis state of the new chain  |

**Returns:** *[CreateChainTx](api_platformvm_createchaintx.createchaintx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [NBytes](common_nbytes.nbytes.md).[_codecID](common_nbytes.nbytes.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.CREATECHAINTX

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[_typeID](api_platformvm_basetx.basetx.md#protected-_typeid)*

*Defined in [src/apis/platformvm/createchaintx.ts:29](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L29)*

___

### `Protected` _typeName

• **_typeName**: *string* = "CreateChainTx"

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[_typeName](api_platformvm_basetx.basetx.md#protected-_typename)*

*Defined in [src/apis/platformvm/createchaintx.ts:28](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L28)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[blockchainID](common_transactions.standardbasetx.md#protected-blockchainid)*

*Defined in [src/common/tx.ts:82](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L82)*

___

### `Protected` chainName

• **chainName**: *string* = ""

*Defined in [src/apis/platformvm/createchaintx.ts:56](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L56)*

___

### `Protected` fxIDs

• **fxIDs**: *Buffer[]* = []

*Defined in [src/apis/platformvm/createchaintx.ts:59](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L59)*

___

### `Protected` genesisData

• **genesisData**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/platformvm/createchaintx.ts:60](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L60)*

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

### `Protected` numFXIDs

• **numFXIDs**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/platformvm/createchaintx.ts:58](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L58)*

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

*Defined in [src/apis/platformvm/createchaintx.ts:62](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L62)*

___

### `Protected` sigIdxs

• **sigIdxs**: *[SigIdx](common_signature.sigidx.md)[]* = []

*Defined in [src/apis/platformvm/createchaintx.ts:63](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L63)*

___

### `Protected` subnetAuth

• **subnetAuth**: *[SubnetAuth](api_platformvm_subnetauth.subnetauth.md)*

*Defined in [src/apis/platformvm/createchaintx.ts:61](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L61)*

___

### `Protected` subnetID

• **subnetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/platformvm/createchaintx.ts:55](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L55)*

___

### `Protected` vmID

• **vmID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/platformvm/createchaintx.ts:57](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L57)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Defined in [src/apis/platformvm/createchaintx.ts:233](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L233)*

Creates and adds a [SigIdx](common_signature.sigidx.md) to the [AddSubnetValidatorTx](../modules/src_apis_platformvm.md#addsubnetvalidatortx).

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

*Defined in [src/apis/platformvm/createchaintx.ts:217](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L217)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [ValidatorTx](api_platformvm_validationtx.validatortx.md).[create](api_platformvm_validationtx.validatortx.md#create)*

*Defined in [src/apis/platformvm/createchaintx.ts:223](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [BaseTx](api_platformvm_basetx.basetx.md).[deserialize](api_platformvm_basetx.basetx.md#deserialize)*

*Defined in [src/apis/platformvm/createchaintx.ts:39](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L39)*

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

*Defined in [src/apis/platformvm/createchaintx.ts:123](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L123)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [CreateChainTx](api_platformvm_createchaintx.createchaintx.md), parses it, populates the class, and returns the length of the [CreateChainTx](api_platformvm_createchaintx.createchaintx.md) in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [CreateChainTx](api_platformvm_createchaintx.createchaintx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [CreateChainTx](api_platformvm_createchaintx.createchaintx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)*

*Defined in [src/common/tx.ts:104](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L104)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

###  getChainName

▸ **getChainName**(): *string*

*Defined in [src/apis/platformvm/createchaintx.ts:89](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L89)*

Returns a string of the chainName

**Returns:** *string*

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

*Defined in [src/apis/platformvm/createchaintx.ts:254](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L254)*

**Returns:** *number*

___

###  getFXIDs

▸ **getFXIDs**(): *Buffer[]*

*Defined in [src/apis/platformvm/createchaintx.ts:103](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L103)*

Returns an array of fxIDs as Buffers

**Returns:** *Buffer[]*

___

###  getGenesisData

▸ **getGenesisData**(): *string*

*Defined in [src/apis/platformvm/createchaintx.ts:110](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L110)*

Returns a string of the genesisData

**Returns:** *string*

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

###  getOuts

▸ **getOuts**(): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

*Inherited from [ImportTx](api_platformvm_importtx.importtx.md).[getOuts](api_platformvm_importtx.importtx.md#getouts)*

*Overrides [StandardBaseTx](common_transactions.standardbasetx.md).[getOuts](common_transactions.standardbasetx.md#abstract-getouts)*

*Defined in [src/apis/platformvm/basetx.ts:48](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/basetx.ts#L48)*

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)[]*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Defined in [src/apis/platformvm/createchaintx.ts:250](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L250)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Input](common_inputs.input.md)

**Returns:** *[SigIdx](common_signature.sigidx.md)[]*

___

###  getSubnetAuth

▸ **getSubnetAuth**(): *[SubnetAuth](api_platformvm_subnetauth.subnetauth.md)*

*Defined in [src/apis/platformvm/createchaintx.ts:75](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L75)*

Returns the subnetAuth

**Returns:** *[SubnetAuth](api_platformvm_subnetauth.subnetauth.md)*

___

###  getSubnetID

▸ **getSubnetID**(): *string*

*Defined in [src/apis/platformvm/createchaintx.ts:82](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L82)*

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

*Defined in [src/apis/platformvm/createchaintx.ts:68](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L68)*

Returns the id of the [CreateChainTx](api_platformvm_createchaintx.createchaintx.md)

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

###  getVMID

▸ **getVMID**(): *Buffer*

*Defined in [src/apis/platformvm/createchaintx.ts:96](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L96)*

Returns a Buffer of the vmID

**Returns:** *Buffer*

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

*Defined in [src/apis/platformvm/createchaintx.ts:31](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L31)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_platformvm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Overrides [ExportTx](api_platformvm_exporttx.exporttx.md).[sign](api_platformvm_exporttx.exporttx.md#sign)*

*Defined in [src/apis/platformvm/createchaintx.ts:266](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L266)*

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

*Defined in [src/apis/platformvm/createchaintx.ts:174](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/platformvm/createchaintx.ts#L174)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [CreateChainTx](api_platformvm_createchaintx.createchaintx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [StandardBaseTx](common_transactions.standardbasetx.md).[toString](common_transactions.standardbasetx.md#tostring)*

*Defined in [src/common/tx.ts:166](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/tx.ts#L166)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
