[avalanche](../README.md) › [Common-Transactions](../modules/common_transactions.md) › [StandardBaseTx](common_transactions.standardbasetx.md)

# Class: StandardBaseTx ‹**KPClass, KCClass**›

Class representing a base for all transactions.

## Type parameters

▪ **KPClass**: *[StandardKeyPair](common_keychain.standardkeypair.md)*

▪ **KCClass**: *[StandardKeyChain](common_keychain.standardkeychain.md)‹KPClass›*

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **StandardBaseTx**

  ↳ [BaseTx](api_avm_basetx.basetx.md)

  ↳ [BaseTx](api_platformvm_basetx.basetx.md)

## Index

### Constructors

* [constructor](common_transactions.standardbasetx.md#constructor)

### Properties

* [_typeID](common_transactions.standardbasetx.md#protected-_typeid)
* [_typeName](common_transactions.standardbasetx.md#protected-_typename)
* [blockchainid](common_transactions.standardbasetx.md#protected-blockchainid)
* [getTxType](common_transactions.standardbasetx.md#abstract-gettxtype)
* [ins](common_transactions.standardbasetx.md#protected-ins)
* [memo](common_transactions.standardbasetx.md#protected-memo)
* [networkid](common_transactions.standardbasetx.md#protected-networkid)
* [numins](common_transactions.standardbasetx.md#protected-numins)
* [numouts](common_transactions.standardbasetx.md#protected-numouts)
* [outs](common_transactions.standardbasetx.md#protected-outs)

### Methods

* [clone](common_transactions.standardbasetx.md#abstract-clone)
* [create](common_transactions.standardbasetx.md#abstract-create)
* [deserialize](common_transactions.standardbasetx.md#deserialize)
* [getBlockchainID](common_transactions.standardbasetx.md#getblockchainid)
* [getIns](common_transactions.standardbasetx.md#abstract-getins)
* [getMemo](common_transactions.standardbasetx.md#getmemo)
* [getNetworkID](common_transactions.standardbasetx.md#getnetworkid)
* [getOuts](common_transactions.standardbasetx.md#abstract-getouts)
* [getTotalOuts](common_transactions.standardbasetx.md#abstract-gettotalouts)
* [getTypeID](common_transactions.standardbasetx.md#gettypeid)
* [getTypeName](common_transactions.standardbasetx.md#gettypename)
* [select](common_transactions.standardbasetx.md#abstract-select)
* [serialize](common_transactions.standardbasetx.md#serialize)
* [sign](common_transactions.standardbasetx.md#abstract-sign)
* [toBuffer](common_transactions.standardbasetx.md#tobuffer)
* [toString](common_transactions.standardbasetx.md#tostring)

## Constructors

###  constructor

\+ **new StandardBaseTx**(`networkid`: number, `blockchainid`: Buffer, `outs`: Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›, `ins`: Array‹[StandardTransferableInput](common_inputs.standardtransferableinput.md)›, `memo`: Buffer): *[StandardBaseTx](common_transactions.standardbasetx.md)*

*Defined in [src/common/tx.ts:144](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L144)*

Class representing a StandardBaseTx which is the foundation for all transactions.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkid` | number | DefaultNetworkID | Optional networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainid` | Buffer | Buffer.alloc(32, 16) | Optional blockchainid, default Buffer.alloc(32, 16) |
`outs` | Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)› | undefined | Optional array of the [TransferableOutput](api_avm_outputs.transferableoutput.md)s |
`ins` | Array‹[StandardTransferableInput](common_inputs.standardtransferableinput.md)› | undefined | Optional array of the [TransferableInput](api_avm_inputs.transferableinput.md)s |
`memo` | Buffer | undefined | Optional [Buffer](https://github.com/feross/buffer) for the memo field  |

**Returns:** *[StandardBaseTx](common_transactions.standardbasetx.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/tx.ts:26](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L26)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardBaseTx"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/tx.ts:25](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L25)*

___

### `Protected` blockchainid

• **blockchainid**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/tx.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L49)*

___

### `Abstract` getTxType

• **getTxType**: *function*

*Defined in [src/common/tx.ts:59](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L59)*

Returns the id of the [StandardBaseTx](common_transactions.standardbasetx.md)

#### Type declaration:

▸ (): *number*

___

### `Protected` ins

• **ins**: *Array‹[StandardTransferableInput](common_inputs.standardtransferableinput.md)›*

*Defined in [src/common/tx.ts:53](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L53)*

___

### `Protected` memo

• **memo**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/tx.ts:54](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L54)*

___

### `Protected` networkid

• **networkid**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/tx.ts:48](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L48)*

___

### `Protected` numins

• **numins**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/tx.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L52)*

___

### `Protected` numouts

• **numouts**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/tx.ts:50](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L50)*

___

### `Protected` outs

• **outs**: *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

*Defined in [src/common/tx.ts:51](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L51)*

## Methods

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/tx.ts:140](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L140)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/tx.ts:142](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/tx.ts:40](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L40)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Defined in [src/common/tx.ts:69](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L69)*

Returns the Buffer representation of the BlockchainID

**Returns:** *Buffer*

___

### `Abstract` getIns

▸ **getIns**(): *Array‹[StandardTransferableInput](common_inputs.standardtransferableinput.md)›*

*Defined in [src/common/tx.ts:74](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L74)*

Returns the array of [StandardTransferableInput](common_inputs.standardtransferableinput.md)s

**Returns:** *Array‹[StandardTransferableInput](common_inputs.standardtransferableinput.md)›*

___

###  getMemo

▸ **getMemo**(): *Buffer*

*Defined in [src/common/tx.ts:89](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L89)*

Returns the [Buffer](https://github.com/feross/buffer) representation of the memo

**Returns:** *Buffer*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Defined in [src/common/tx.ts:64](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L64)*

Returns the NetworkID as a number

**Returns:** *number*

___

### `Abstract` getOuts

▸ **getOuts**(): *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

*Defined in [src/common/tx.ts:79](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L79)*

Returns the array of [StandardTransferableOutput](common_output.standardtransferableoutput.md)s

**Returns:** *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

___

### `Abstract` getTotalOuts

▸ **getTotalOuts**(): *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

*Defined in [src/common/tx.ts:84](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L84)*

Returns the array of combined total [StandardTransferableOutput](common_output.standardtransferableoutput.md)s

**Returns:** *Array‹[StandardTransferableOutput](common_output.standardtransferableoutput.md)›*

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

### `Abstract` select

▸ **select**(`id`: number, ...`args`: any[]): *this*

*Defined in [src/common/tx.ts:144](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/tx.ts:28](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

### `Abstract` sign

▸ **sign**(`msg`: Buffer, `kc`: [StandardKeyChain](common_keychain.standardkeychain.md)‹KPClass›): *Array‹[Credential](common_signature.credential.md)›*

*Defined in [src/common/tx.ts:138](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L138)*

Takes the bytes of an [UnsignedTx](api_avm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_avm_transactions.unsignedtx.md) |
`kc` | [StandardKeyChain](common_keychain.standardkeychain.md)‹KPClass› | An [KeyChain](api_avm_keychain.keychain.md) used in signing  |

**Returns:** *Array‹[Credential](common_signature.credential.md)›*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/tx.ts:94](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L94)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/common/tx.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/tx.ts#L126)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
