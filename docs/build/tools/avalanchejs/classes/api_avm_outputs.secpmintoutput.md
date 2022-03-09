[avalanche](../README.md) › [API-AVM-Outputs](../modules/api_avm_outputs.md) › [SECPMintOutput](api_avm_outputs.secpmintoutput.md)

# Class: SECPMintOutput

An [Output](../modules/src_common.md#output) class which specifies an Output that carries an ammount for an assetID and uses secp256k1 signature scheme.

## Hierarchy

  ↳ [Output](common_output.output.md)

  ↳ **SECPMintOutput**

## Index

### Constructors

* [constructor](api_avm_outputs.secpmintoutput.md#constructor)

### Properties

* [_codecID](api_avm_outputs.secpmintoutput.md#protected-_codecid)
* [_typeID](api_avm_outputs.secpmintoutput.md#protected-_typeid)
* [_typeName](api_avm_outputs.secpmintoutput.md#protected-_typename)
* [addresses](api_avm_outputs.secpmintoutput.md#protected-addresses)
* [locktime](api_avm_outputs.secpmintoutput.md#protected-locktime)
* [numaddrs](api_avm_outputs.secpmintoutput.md#protected-numaddrs)
* [threshold](api_avm_outputs.secpmintoutput.md#protected-threshold)

### Methods

* [clone](api_avm_outputs.secpmintoutput.md#clone)
* [create](api_avm_outputs.secpmintoutput.md#create)
* [deserialize](api_avm_outputs.secpmintoutput.md#deserialize)
* [fromBuffer](api_avm_outputs.secpmintoutput.md#frombuffer)
* [getAddress](api_avm_outputs.secpmintoutput.md#getaddress)
* [getAddressIdx](api_avm_outputs.secpmintoutput.md#getaddressidx)
* [getAddresses](api_avm_outputs.secpmintoutput.md#getaddresses)
* [getCodecID](api_avm_outputs.secpmintoutput.md#getcodecid)
* [getLocktime](api_avm_outputs.secpmintoutput.md#getlocktime)
* [getOutputID](api_avm_outputs.secpmintoutput.md#getoutputid)
* [getSpenders](api_avm_outputs.secpmintoutput.md#getspenders)
* [getThreshold](api_avm_outputs.secpmintoutput.md#getthreshold)
* [getTypeID](api_avm_outputs.secpmintoutput.md#gettypeid)
* [getTypeName](api_avm_outputs.secpmintoutput.md#gettypename)
* [makeTransferable](api_avm_outputs.secpmintoutput.md#maketransferable)
* [meetsThreshold](api_avm_outputs.secpmintoutput.md#meetsthreshold)
* [sanitizeObject](api_avm_outputs.secpmintoutput.md#sanitizeobject)
* [select](api_avm_outputs.secpmintoutput.md#select)
* [serialize](api_avm_outputs.secpmintoutput.md#serialize)
* [setCodecID](api_avm_outputs.secpmintoutput.md#setcodecid)
* [toBuffer](api_avm_outputs.secpmintoutput.md#tobuffer)
* [toString](api_avm_outputs.secpmintoutput.md#tostring)
* [comparator](api_avm_outputs.secpmintoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new SECPMintOutput**(`addresses`: Buffer[], `locktime`: BN, `threshold`: number): *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

*Inherited from [OutputOwners](common_output.outputowners.md).[constructor](common_output.outputowners.md#constructor)*

*Defined in [src/common/output.ts:339](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L339)*

An [Output](../modules/src_common.md#output) class which contains addresses, locktimes, and thresholds.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`addresses` | Buffer[] | undefined | An array of [Buffer](https://github.com/feross/buffer)s representing output owner's addresses |
`locktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the locktime |
`threshold` | number | undefined | A number representing the the threshold number of signers required to sign the transaction  |

**Returns:** *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/apis/avm/outputs.ts:176](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L176)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0
      ? AVMConstants.SECPMINTOUTPUTID
      : AVMConstants.SECPMINTOUTPUTID_CODECONE

*Overrides [Output](common_output.output.md).[_typeID](common_output.output.md#protected-_typeid)*

*Defined in [src/apis/avm/outputs.ts:177](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L177)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SECPMintOutput"

*Overrides [Output](common_output.output.md).[_typeName](common_output.output.md#protected-_typename)*

*Defined in [src/apis/avm/outputs.ts:175](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L175)*

___

### `Protected` addresses

• **addresses**: *[Address](common_output.address.md)[]* = []

*Inherited from [OutputOwners](common_output.outputowners.md).[addresses](common_output.outputowners.md#protected-addresses)*

*Defined in [src/common/output.ts:158](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L158)*

___

### `Protected` locktime

• **locktime**: *Buffer* = Buffer.alloc(8)

*Inherited from [OutputOwners](common_output.outputowners.md).[locktime](common_output.outputowners.md#protected-locktime)*

*Defined in [src/common/output.ts:155](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L155)*

___

### `Protected` numaddrs

• **numaddrs**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[numaddrs](common_output.outputowners.md#protected-numaddrs)*

*Defined in [src/common/output.ts:157](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L157)*

___

### `Protected` threshold

• **threshold**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[threshold](common_output.outputowners.md#protected-threshold)*

*Defined in [src/common/output.ts:156](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L156)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [Output](common_output.output.md).[clone](common_output.output.md#abstract-clone)*

*Defined in [src/apis/avm/outputs.ts:222](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L222)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [Output](common_output.output.md).[create](common_output.output.md#abstract-create)*

*Defined in [src/apis/avm/outputs.ts:218](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L218)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Inherited from [OutputOwners](common_output.outputowners.md).[deserialize](common_output.outputowners.md#deserialize)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/output.ts:130](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L130)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [OutputOwners](common_output.outputowners.md).[fromBuffer](common_output.outputowners.md#frombuffer)*

*Defined in [src/common/output.ts:277](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L277)*

Returns a base-58 string representing the [Output](../modules/src_common.md#output).

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAddress

▸ **getAddress**(`idx`: number): *Buffer*

*Inherited from [OutputOwners](common_output.outputowners.md).[getAddress](common_output.outputowners.md#getaddress)*

*Defined in [src/common/output.ts:208](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L208)*

Returns the address from the index provided.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idx` | number | The index of the address.  |

**Returns:** *Buffer*

Returns the string representing the address.

___

###  getAddressIdx

▸ **getAddressIdx**(`address`: Buffer): *number*

*Inherited from [OutputOwners](common_output.outputowners.md).[getAddressIdx](common_output.outputowners.md#getaddressidx)*

*Defined in [src/common/output.ts:188](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L188)*

Returns the index of the address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | Buffer | A [Buffer](https://github.com/feross/buffer) of the address to look up to return its index.  |

**Returns:** *number*

The index of the address.

___

###  getAddresses

▸ **getAddresses**(): *Buffer[]*

*Inherited from [OutputOwners](common_output.outputowners.md).[getAddresses](common_output.outputowners.md#getaddresses)*

*Defined in [src/common/output.ts:173](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L173)*

Returns an array of [Buffer](https://github.com/feross/buffer)s for the addresses.

**Returns:** *Buffer[]*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getLocktime

▸ **getLocktime**(): *BN*

*Inherited from [OutputOwners](common_output.outputowners.md).[getLocktime](common_output.outputowners.md#getlocktime)*

*Defined in [src/common/output.ts:168](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L168)*

Returns the a [BN](https://github.com/indutny/bn.js/) repersenting the UNIX Timestamp when the lock is made available.

**Returns:** *BN*

___

###  getOutputID

▸ **getOutputID**(): *number*

*Overrides [Output](common_output.output.md).[getOutputID](common_output.output.md#abstract-getoutputid)*

*Defined in [src/apis/avm/outputs.ts:206](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L206)*

Returns the outputID for this output

**Returns:** *number*

___

###  getSpenders

▸ **getSpenders**(`addresses`: Buffer[], `asOf`: BN): *Buffer[]*

*Inherited from [OutputOwners](common_output.outputowners.md).[getSpenders](common_output.outputowners.md#getspenders)*

*Defined in [src/common/output.ts:237](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L237)*

Given an array of addresses and an optional timestamp, select an array of address [Buffer](https://github.com/feross/buffer)s of qualified spenders for the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Buffer[] | - |
`asOf` | BN | undefined |

**Returns:** *Buffer[]*

___

###  getThreshold

▸ **getThreshold**(): *number*

*Inherited from [OutputOwners](common_output.outputowners.md).[getThreshold](common_output.outputowners.md#getthreshold)*

*Defined in [src/common/output.ts:163](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L163)*

Returns the threshold of signers required to spend this output.

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

###  makeTransferable

▸ **makeTransferable**(`assetID`: Buffer): *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

*Overrides [Output](common_output.output.md).[makeTransferable](common_output.output.md#abstract-maketransferable)*

*Defined in [src/apis/avm/outputs.ts:214](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L214)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer | An assetID which is wrapped around the Buffer of the Output  |

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

___

###  meetsThreshold

▸ **meetsThreshold**(`addresses`: Buffer[], `asOf`: BN): *boolean*

*Inherited from [OutputOwners](common_output.outputowners.md).[meetsThreshold](common_output.outputowners.md#meetsthreshold)*

*Defined in [src/common/output.ts:218](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L218)*

Given an array of address [Buffer](https://github.com/feross/buffer)s and an optional timestamp, returns true if the addresses meet the threshold required to spend the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Buffer[] | - |
`asOf` | BN | undefined |

**Returns:** *boolean*

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

▸ **select**(`id`: number, ...`args`: any[]): *[Output](common_output.output.md)*

*Overrides [Output](common_output.output.md).[select](common_output.output.md#abstract-select)*

*Defined in [src/apis/avm/outputs.ts:228](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Output](common_output.output.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Inherited from [OutputOwners](common_output.outputowners.md).[serialize](common_output.outputowners.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/output.ts:107](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L107)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/outputs.ts:189](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L189)*

Set the codecID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`codecID` | number | The codecID to set  |

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [OutputOwners](common_output.outputowners.md).[toBuffer](common_output.outputowners.md#tobuffer)*

*Defined in [src/common/output.ts:298](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L298)*

Returns the buffer representing the [Output](../modules/src_common.md#output) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [OutputOwners](common_output.outputowners.md).[toString](common_output.outputowners.md#tostring)*

*Defined in [src/common/output.ts:315](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L315)*

Returns a base-58 string representing the [Output](../modules/src_common.md#output).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [OutputOwners](common_output.outputowners.md).[comparator](common_output.outputowners.md#static-comparator)*

*Defined in [src/common/output.ts:319](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L319)*

**Returns:** *function*

▸ (`a`: [Output](common_output.output.md), `b`: [Output](common_output.output.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Output](common_output.output.md) |
`b` | [Output](common_output.output.md) |
