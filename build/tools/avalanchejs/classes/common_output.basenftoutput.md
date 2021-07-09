[avalanche](../README.md) › [Common-Output](../modules/common_output.md) › [BaseNFTOutput](common_output.basenftoutput.md)

# Class: BaseNFTOutput

An [Output](common_output.output.md) class which specifies an NFT.

## Hierarchy

  ↳ [Output](common_output.output.md)

  ↳ **BaseNFTOutput**

  ↳ [NFTOutput](api_avm_outputs.nftoutput.md)

## Index

### Constructors

* [constructor](common_output.basenftoutput.md#constructor)

### Properties

* [_codecID](common_output.basenftoutput.md#protected-_codecid)
* [_typeID](common_output.basenftoutput.md#protected-_typeid)
* [_typeName](common_output.basenftoutput.md#protected-_typename)
* [addresses](common_output.basenftoutput.md#protected-addresses)
* [groupID](common_output.basenftoutput.md#protected-groupid)
* [locktime](common_output.basenftoutput.md#protected-locktime)
* [numaddrs](common_output.basenftoutput.md#protected-numaddrs)
* [threshold](common_output.basenftoutput.md#protected-threshold)

### Methods

* [clone](common_output.basenftoutput.md#abstract-clone)
* [create](common_output.basenftoutput.md#abstract-create)
* [deserialize](common_output.basenftoutput.md#deserialize)
* [fromBuffer](common_output.basenftoutput.md#frombuffer)
* [getAddress](common_output.basenftoutput.md#getaddress)
* [getAddressIdx](common_output.basenftoutput.md#getaddressidx)
* [getAddresses](common_output.basenftoutput.md#getaddresses)
* [getCodecID](common_output.basenftoutput.md#getcodecid)
* [getGroupID](common_output.basenftoutput.md#getgroupid)
* [getLocktime](common_output.basenftoutput.md#getlocktime)
* [getOutputID](common_output.basenftoutput.md#abstract-getoutputid)
* [getSpenders](common_output.basenftoutput.md#getspenders)
* [getThreshold](common_output.basenftoutput.md#getthreshold)
* [getTypeID](common_output.basenftoutput.md#gettypeid)
* [getTypeName](common_output.basenftoutput.md#gettypename)
* [makeTransferable](common_output.basenftoutput.md#abstract-maketransferable)
* [meetsThreshold](common_output.basenftoutput.md#meetsthreshold)
* [select](common_output.basenftoutput.md#abstract-select)
* [serialize](common_output.basenftoutput.md#serialize)
* [toBuffer](common_output.basenftoutput.md#tobuffer)
* [toString](common_output.basenftoutput.md#tostring)
* [comparator](common_output.basenftoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new BaseNFTOutput**(`addresses`: Buffer[], `locktime`: BN, `threshold`: number): *[BaseNFTOutput](common_output.basenftoutput.md)*

*Inherited from [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[constructor](api_platformvm_outputs.secpowneroutput.md#constructor)*

*Defined in [src/common/output.ts:278](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L278)*

An [Output](common_output.output.md) class which contains addresses, locktimes, and thresholds.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`addresses` | Buffer[] | undefined | An array of [Buffer](https://github.com/feross/buffer)s representing output owner's addresses |
`locktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the locktime |
`threshold` | number | undefined | A number representing the the threshold number of signers required to sign the transaction  |

**Returns:** *[BaseNFTOutput](common_output.basenftoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:40](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L40)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Output](common_output.output.md).[_typeID](common_output.output.md#protected-_typeid)*

*Defined in [src/common/output.ts:497](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L497)*

___

### `Protected` _typeName

• **_typeName**: *string* = "BaseNFTOutput"

*Overrides [Output](common_output.output.md).[_typeName](common_output.output.md#protected-_typename)*

*Defined in [src/common/output.ts:496](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L496)*

___

### `Protected` addresses

• **addresses**: *[Address](common_output.address.md)[]* = []

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[addresses](api_platformvm_outputs.amountoutput.md#protected-addresses)*

*Defined in [src/common/output.ts:121](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L121)*

___

### `Protected` groupID

• **groupID**: *Buffer* = Buffer.alloc(4)

*Defined in [src/common/output.ts:511](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L511)*

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

### `Abstract` clone

▸ **clone**(): *this*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[clone](api_platformvm_outputs.amountoutput.md#abstract-clone)*

*Defined in [src/common/output.ts:319](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L319)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[create](api_platformvm_outputs.amountoutput.md#abstract-create)*

*Defined in [src/common/output.ts:321](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L321)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[deserialize](api_platformvm_outputs.secpowneroutput.md#deserialize)*

*Defined in [src/common/output.ts:506](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L506)*

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

Returns a base-58 string representing the [Output](common_output.output.md).

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

###  getGroupID

▸ **getGroupID**(): *number*

*Defined in [src/common/output.ts:516](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L516)*

Returns the groupID as a number.

**Returns:** *number*

___

###  getLocktime

▸ **getLocktime**(): *BN*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getLocktime](api_platformvm_outputs.amountoutput.md#getlocktime)*

*Defined in [src/common/output.ts:131](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L131)*

Returns the a [BN](https://github.com/indutny/bn.js/) repersenting the UNIX Timestamp when the lock is made available.

**Returns:** *BN*

___

### `Abstract` getOutputID

▸ **getOutputID**(): *number*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getOutputID](api_platformvm_outputs.amountoutput.md#abstract-getoutputid)*

*Defined in [src/common/output.ts:317](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L317)*

Returns the outputID for the output which tells parsers what type it is

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

### `Abstract` makeTransferable

▸ **makeTransferable**(`assetID`: Buffer): *[StandardTransferableOutput](common_output.standardtransferableoutput.md)*

*Inherited from [Output](common_output.output.md).[makeTransferable](common_output.output.md#abstract-maketransferable)*

*Defined in [src/common/output.ts:331](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L331)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer | An assetID which is wrapped around the Buffer of the Output  Must be implemented to use the appropriate TransferableOutput for the VM.  |

**Returns:** *[StandardTransferableOutput](common_output.standardtransferableoutput.md)*

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

### `Abstract` select

▸ **select**(`id`: number, ...`args`: any[]): *[Output](common_output.output.md)*

*Inherited from [Output](common_output.output.md).[select](common_output.output.md#abstract-select)*

*Defined in [src/common/output.ts:323](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L323)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Output](common_output.output.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[serialize](api_platformvm_outputs.secpowneroutput.md#serialize)*

*Defined in [src/common/output.ts:499](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L499)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[toBuffer](api_platformvm_outputs.secpowneroutput.md#tobuffer)*

*Defined in [src/common/output.ts:246](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L246)*

Returns the buffer representing the [Output](common_output.output.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[toString](api_platformvm_outputs.amountoutput.md#tostring)*

*Defined in [src/common/output.ts:262](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L262)*

Returns a base-58 string representing the [Output](common_output.output.md).

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
