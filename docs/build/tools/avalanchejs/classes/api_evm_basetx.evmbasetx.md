[avalanche](../README.md) › [API-EVM-BaseTx](../modules/api_evm_basetx.md) › [EVMBaseTx](api_evm_basetx.evmbasetx.md)

# Class: EVMBaseTx

Class representing a base for all transactions.

## Hierarchy

  ↳ [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md)‹[KeyPair](api_evm_keychain.keypair.md), [KeyChain](api_evm_keychain.keychain.md)›

  ↳ **EVMBaseTx**

  ↳ [ImportTx](api_evm_importtx.importtx.md)

  ↳ [ExportTx](api_evm_exporttx.exporttx.md)

## Index

### Constructors

* [constructor](api_evm_basetx.evmbasetx.md#constructor)

### Properties

* [_codecID](api_evm_basetx.evmbasetx.md#protected-_codecid)
* [_typeID](api_evm_basetx.evmbasetx.md#protected-_typeid)
* [_typeName](api_evm_basetx.evmbasetx.md#protected-_typename)
* [blockchainID](api_evm_basetx.evmbasetx.md#protected-blockchainid)
* [networkID](api_evm_basetx.evmbasetx.md#protected-networkid)

### Methods

* [clone](api_evm_basetx.evmbasetx.md#clone)
* [create](api_evm_basetx.evmbasetx.md#create)
* [deserialize](api_evm_basetx.evmbasetx.md#deserialize)
* [fromBuffer](api_evm_basetx.evmbasetx.md#frombuffer)
* [getBlockchainID](api_evm_basetx.evmbasetx.md#getblockchainid)
* [getCodecID](api_evm_basetx.evmbasetx.md#getcodecid)
* [getNetworkID](api_evm_basetx.evmbasetx.md#getnetworkid)
* [getTxType](api_evm_basetx.evmbasetx.md#gettxtype)
* [getTypeID](api_evm_basetx.evmbasetx.md#gettypeid)
* [getTypeName](api_evm_basetx.evmbasetx.md#gettypename)
* [sanitizeObject](api_evm_basetx.evmbasetx.md#sanitizeobject)
* [select](api_evm_basetx.evmbasetx.md#select)
* [serialize](api_evm_basetx.evmbasetx.md#serialize)
* [sign](api_evm_basetx.evmbasetx.md#sign)
* [toBuffer](api_evm_basetx.evmbasetx.md#tobuffer)
* [toString](api_evm_basetx.evmbasetx.md#tostring)

## Constructors

###  constructor

\+ **new EVMBaseTx**(`networkID`: number, `blockchainID`: Buffer): *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[constructor](common_transactions.evmstandardbasetx.md#constructor)*

*Defined in [src/apis/evm/basetx.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L83)*

Class representing an EVMBaseTx which is the foundation for all EVM transactions.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Optional networkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | Buffer.alloc(32, 16) | Optional blockchainID, default Buffer.alloc(32, 16)  |

**Returns:** *[EVMBaseTx](api_evm_basetx.evmbasetx.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[_typeID](common_transactions.evmstandardbasetx.md#protected-_typeid)*

*Defined in [src/apis/evm/basetx.ts:25](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L25)*

___

### `Protected` _typeName

• **_typeName**: *string* = "BaseTx"

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[_typeName](common_transactions.evmstandardbasetx.md#protected-_typename)*

*Defined in [src/apis/evm/basetx.ts:24](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L24)*

___

### `Protected` blockchainID

• **blockchainID**: *Buffer* = Buffer.alloc(32)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[blockchainID](common_transactions.evmstandardbasetx.md#protected-blockchainid)*

*Defined in [src/common/evmtx.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L74)*

___

### `Protected` networkID

• **networkID**: *Buffer* = Buffer.alloc(4)

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[networkID](common_transactions.evmstandardbasetx.md#protected-networkid)*

*Defined in [src/common/evmtx.ts:73](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L73)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[clone](common_transactions.evmstandardbasetx.md#abstract-clone)*

*Defined in [src/apis/evm/basetx.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L70)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[create](common_transactions.evmstandardbasetx.md#abstract-create)*

*Defined in [src/apis/evm/basetx.ts:76](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[deserialize](common_transactions.evmstandardbasetx.md#deserialize)*

*Defined in [src/apis/evm/basetx.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/evm/basetx.ts:49](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L49)*

Takes a [Buffer](https://github.com/feross/buffer) containing an [BaseTx](api_avm_basetx.basetx.md), parses it, populates the class, and returns the length of the BaseTx in bytes.

**`remarks`** assume not-checksummed

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | A [Buffer](https://github.com/feross/buffer) containing a raw [BaseTx](api_avm_basetx.basetx.md)  |
`offset` | number | 0 | - |

**Returns:** *number*

The length of the raw [BaseTx](api_avm_basetx.basetx.md)

___

###  getBlockchainID

▸ **getBlockchainID**(): *Buffer*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getBlockchainID](common_transactions.evmstandardbasetx.md#getblockchainid)*

*Defined in [src/common/evmtx.ts:91](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L91)*

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

###  getNetworkID

▸ **getNetworkID**(): *number*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getNetworkID](common_transactions.evmstandardbasetx.md#getnetworkid)*

*Defined in [src/common/evmtx.ts:84](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L84)*

Returns the NetworkID as a number

**Returns:** *number*

___

###  getTxType

▸ **getTxType**(): *number*

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[getTxType](common_transactions.evmstandardbasetx.md#abstract-gettxtype)*

*Defined in [src/apis/evm/basetx.ts:36](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L36)*

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

*Overrides [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[select](common_transactions.evmstandardbasetx.md#abstract-select)*

*Defined in [src/apis/evm/basetx.ts:80](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *this*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[serialize](common_transactions.evmstandardbasetx.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/evmtx.ts:36](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L36)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  sign

▸ **sign**(`msg`: Buffer, `kc`: [KeyChain](api_evm_keychain.keychain.md)): *[Credential](common_signature.credential.md)[]*

*Defined in [src/apis/evm/basetx.ts:65](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/basetx.ts#L65)*

Takes the bytes of an [UnsignedTx](api_evm_transactions.unsignedtx.md) and returns an array of [Credential](common_signature.credential.md)s

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`msg` | Buffer | A Buffer for the [UnsignedTx](api_evm_transactions.unsignedtx.md) |
`kc` | [KeyChain](api_evm_keychain.keychain.md) | An [KeyChain](api_evm_keychain.keychain.md) used in signing  |

**Returns:** *[Credential](common_signature.credential.md)[]*

An array of [Credential](common_signature.credential.md)s

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toBuffer](common_transactions.evmstandardbasetx.md#tobuffer)*

*Defined in [src/common/evmtx.ts:98](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L98)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [EVMStandardBaseTx](common_transactions.evmstandardbasetx.md).[toString](common_transactions.evmstandardbasetx.md#tostring)*

*Defined in [src/common/evmtx.ts:108](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/evmtx.ts#L108)*

Returns a base-58 representation of the [StandardBaseTx](common_transactions.standardbasetx.md).

**Returns:** *string*
