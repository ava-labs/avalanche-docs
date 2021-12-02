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
* [select](api_avm_outputs.secpmintoutput.md#select)
* [serialize](api_avm_outputs.secpmintoutput.md#serialize)
* [setCodecID](api_avm_outputs.secpmintoutput.md#setcodecid)
* [toBuffer](api_avm_outputs.secpmintoutput.md#tobuffer)
* [toString](api_avm_outputs.secpmintoutput.md#tostring)
* [comparator](api_avm_outputs.secpmintoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new SECPMintOutput**(`addresses`: Buffer[], `locktime`: BN, `threshold`: number): *[SECPMintOutput](api_avm_outputs.secpmintoutput.md)*

*Inherited from [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[constructor](api_platformvm_outputs.secpowneroutput.md#constructor)*

*Defined in [src/common/output.ts:278](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L278)*

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

*Defined in [src/apis/avm/outputs.ts:143](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L143)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0 ? AVMConstants.SECPMINTOUTPUTID : AVMConstants.SECPMINTOUTPUTID_CODECONE

*Overrides [Output](common_output.output.md).[_typeID](common_output.output.md#protected-_typeid)*

*Defined in [src/apis/avm/outputs.ts:144](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L144)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SECPMintOutput"

*Overrides [Output](common_output.output.md).[_typeName](common_output.output.md#protected-_typename)*

*Defined in [src/apis/avm/outputs.ts:142](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L142)*

___

### `Protected` addresses

• **addresses**: *[Address](common_output.address.md)[]* = []

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[addresses](api_platformvm_outputs.amountoutput.md#protected-addresses)*

*Defined in [src/common/output.ts:121](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L121)*

___

### `Protected` locktime

• **locktime**: *Buffer* = Buffer.alloc(8)

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[locktime](api_platformvm_outputs.amountoutput.md#protected-locktime)*

*Defined in [src/common/output.ts:118](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L118)*

___

### `Protected` numaddrs

• **numaddrs**: *Buffer* = Buffer.alloc(4)

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[numaddrs](api_platformvm_outputs.amountoutput.md#protected-numaddrs)*

*Defined in [src/common/output.ts:120](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L120)*

___

### `Protected` threshold

• **threshold**: *Buffer* = Buffer.alloc(4)

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[threshold](api_platformvm_outputs.amountoutput.md#protected-threshold)*

*Defined in [src/common/output.ts:119](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L119)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[clone](api_platformvm_outputs.amountoutput.md#abstract-clone)*

*Defined in [src/apis/avm/outputs.ts:181](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L181)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[create](api_platformvm_outputs.amountoutput.md#abstract-create)*

*Defined in [src/apis/avm/outputs.ts:177](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Inherited from [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[deserialize](api_platformvm_outputs.secpowneroutput.md#deserialize)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/output.ts:105](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L105)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[fromBuffer](api_platformvm_outputs.secpowneroutput.md#frombuffer)*

*Defined in [src/common/output.ts:225](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L225)*

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

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getAddress](api_platformvm_outputs.amountoutput.md#getaddress)*

*Defined in [src/common/output.ts:168](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L168)*

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

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getAddressIdx](api_platformvm_outputs.amountoutput.md#getaddressidx)*

*Defined in [src/common/output.ts:151](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L151)*

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

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getAddresses](api_platformvm_outputs.amountoutput.md#getaddresses)*

*Defined in [src/common/output.ts:136](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L136)*

Returns an array of [Buffer](https://github.com/feross/buffer)s for the addresses.

**Returns:** *Buffer[]*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getLocktime

▸ **getLocktime**(): *BN*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getLocktime](api_platformvm_outputs.amountoutput.md#getlocktime)*

*Defined in [src/common/output.ts:131](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L131)*

Returns the a [BN](https://github.com/indutny/bn.js/) repersenting the UNIX Timestamp when the lock is made available.

**Returns:** *BN*

___

###  getOutputID

▸ **getOutputID**(): *number*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[getOutputID](api_platformvm_outputs.amountoutput.md#abstract-getoutputid)*

*Defined in [src/apis/avm/outputs.ts:165](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L165)*

Returns the outputID for this output

**Returns:** *number*

___

###  getSpenders

▸ **getSpenders**(`addresses`: Buffer[], `asOf`: BN): *Buffer[]*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getSpenders](api_platformvm_outputs.amountoutput.md#getspenders)*

*Defined in [src/common/output.ts:197](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L197)*

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

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getThreshold](api_platformvm_outputs.amountoutput.md#getthreshold)*

*Defined in [src/common/output.ts:126](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L126)*

Returns the threshold of signers required to spend this output.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  makeTransferable

▸ **makeTransferable**(`assetID`: Buffer): *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

*Overrides [Output](common_output.output.md).[makeTransferable](common_output.output.md#abstract-maketransferable)*

*Defined in [src/apis/avm/outputs.ts:173](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L173)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer | An assetID which is wrapped around the Buffer of the Output  |

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

___

###  meetsThreshold

▸ **meetsThreshold**(`addresses`: Buffer[], `asOf`: BN): *boolean*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[meetsThreshold](api_platformvm_outputs.amountoutput.md#meetsthreshold)*

*Defined in [src/common/output.ts:178](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L178)*

Given an array of address [Buffer](https://github.com/feross/buffer)s and an optional timestamp, returns true if the addresses meet the threshold required to spend the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Buffer[] | - |
`asOf` | BN | undefined |

**Returns:** *boolean*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *[Output](common_output.output.md)*

*Overrides [Output](common_output.output.md).[select](common_output.output.md#abstract-select)*

*Defined in [src/apis/avm/outputs.ts:187](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L187)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Output](common_output.output.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Inherited from [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[serialize](api_platformvm_outputs.secpowneroutput.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/output.ts:96](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L96)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/outputs.ts:153](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L153)*

Set the codecID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`codecID` | number | The codecID to set  |

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[toBuffer](api_platformvm_outputs.secpowneroutput.md#tobuffer)*

*Defined in [src/common/output.ts:246](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L246)*

Returns the buffer representing the [Output](../modules/src_common.md#output) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[toString](api_platformvm_outputs.amountoutput.md#tostring)*

*Defined in [src/common/output.ts:262](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L262)*

Returns a base-58 string representing the [Output](../modules/src_common.md#output).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[comparator](api_platformvm_outputs.amountoutput.md#static-comparator)*

*Defined in [src/common/output.ts:266](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L266)*

**Returns:** *function*

▸ (`a`: [Output](common_output.output.md), `b`: [Output](common_output.output.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Output](common_output.output.md) |
`b` | [Output](common_output.output.md) |
