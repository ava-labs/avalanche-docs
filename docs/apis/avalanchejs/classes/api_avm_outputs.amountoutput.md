[avalanche](../README.md) › [API-AVM-Outputs](../modules/api_avm_outputs.md) › [AmountOutput](api_avm_outputs.amountoutput.md)

# Class: AmountOutput

## Hierarchy

  ↳ [StandardAmountOutput](common_output.standardamountoutput.md)

  ↳ **AmountOutput**

  ↳ [SECPTransferOutput](api_avm_outputs.secptransferoutput.md)

## Index

### Constructors

* [constructor](api_avm_outputs.amountoutput.md#constructor)

### Properties

* [_codecID](api_avm_outputs.amountoutput.md#protected-_codecid)
* [_typeID](api_avm_outputs.amountoutput.md#protected-_typeid)
* [_typeName](api_avm_outputs.amountoutput.md#protected-_typename)
* [addresses](api_avm_outputs.amountoutput.md#protected-addresses)
* [amount](api_avm_outputs.amountoutput.md#protected-amount)
* [amountValue](api_avm_outputs.amountoutput.md#protected-amountvalue)
* [locktime](api_avm_outputs.amountoutput.md#protected-locktime)
* [numaddrs](api_avm_outputs.amountoutput.md#protected-numaddrs)
* [threshold](api_avm_outputs.amountoutput.md#protected-threshold)

### Methods

* [clone](api_avm_outputs.amountoutput.md#abstract-clone)
* [create](api_avm_outputs.amountoutput.md#abstract-create)
* [deserialize](api_avm_outputs.amountoutput.md#deserialize)
* [fromBuffer](api_avm_outputs.amountoutput.md#frombuffer)
* [getAddress](api_avm_outputs.amountoutput.md#getaddress)
* [getAddressIdx](api_avm_outputs.amountoutput.md#getaddressidx)
* [getAddresses](api_avm_outputs.amountoutput.md#getaddresses)
* [getAmount](api_avm_outputs.amountoutput.md#getamount)
* [getCodecID](api_avm_outputs.amountoutput.md#getcodecid)
* [getLocktime](api_avm_outputs.amountoutput.md#getlocktime)
* [getOutputID](api_avm_outputs.amountoutput.md#abstract-getoutputid)
* [getSpenders](api_avm_outputs.amountoutput.md#getspenders)
* [getThreshold](api_avm_outputs.amountoutput.md#getthreshold)
* [getTypeID](api_avm_outputs.amountoutput.md#gettypeid)
* [getTypeName](api_avm_outputs.amountoutput.md#gettypename)
* [makeTransferable](api_avm_outputs.amountoutput.md#maketransferable)
* [meetsThreshold](api_avm_outputs.amountoutput.md#meetsthreshold)
* [sanitizeObject](api_avm_outputs.amountoutput.md#sanitizeobject)
* [select](api_avm_outputs.amountoutput.md#select)
* [serialize](api_avm_outputs.amountoutput.md#serialize)
* [toBuffer](api_avm_outputs.amountoutput.md#tobuffer)
* [toString](api_avm_outputs.amountoutput.md#tostring)
* [comparator](api_avm_outputs.amountoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new AmountOutput**(`amount`: BN, `addresses`: Buffer[], `locktime`: BN, `threshold`: number): *[AmountOutput](api_avm_outputs.amountoutput.md)*

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[constructor](common_output.standardamountoutput.md#constructor)*

*Overrides [OutputOwners](common_output.outputowners.md).[constructor](common_output.outputowners.md#constructor)*

*Defined in [src/common/output.ts:563](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L563)*

A [StandardAmountOutput](common_output.standardamountoutput.md) class which issues a payment on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`amount` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the amount in the output |
`addresses` | Buffer[] | undefined | An array of [Buffer](https://github.com/feross/buffer)s representing addresses |
`locktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the locktime |
`threshold` | number | undefined | A number representing the the threshold number of signers required to sign the transaction  |

**Returns:** *[AmountOutput](api_avm_outputs.amountoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [NBytes](common_nbytes.nbytes.md).[_codecID](common_nbytes.nbytes.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[_typeID](common_output.standardamountoutput.md#protected-_typeid)*

*Defined in [src/apis/avm/outputs.ts:85](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/outputs.ts#L85)*

___

### `Protected` _typeName

• **_typeName**: *string* = "AmountOutput"

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[_typeName](common_output.standardamountoutput.md#protected-_typename)*

*Defined in [src/apis/avm/outputs.ts:84](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/outputs.ts#L84)*

___

### `Protected` addresses

• **addresses**: *[Address](common_output.address.md)[]* = []

*Inherited from [OutputOwners](common_output.outputowners.md).[addresses](common_output.outputowners.md#protected-addresses)*

*Defined in [src/common/output.ts:158](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L158)*

___

### `Protected` amount

• **amount**: *Buffer* = Buffer.alloc(8)

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[amount](common_output.standardamountoutput.md#protected-amount)*

*Defined in [src/common/output.ts:534](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L534)*

___

### `Protected` amountValue

• **amountValue**: *BN* = new BN(0)

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[amountValue](common_output.standardamountoutput.md#protected-amountvalue)*

*Defined in [src/common/output.ts:535](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L535)*

___

### `Protected` locktime

• **locktime**: *Buffer* = Buffer.alloc(8)

*Inherited from [OutputOwners](common_output.outputowners.md).[locktime](common_output.outputowners.md#protected-locktime)*

*Defined in [src/common/output.ts:155](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L155)*

___

### `Protected` numaddrs

• **numaddrs**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[numaddrs](common_output.outputowners.md#protected-numaddrs)*

*Defined in [src/common/output.ts:157](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L157)*

___

### `Protected` threshold

• **threshold**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[threshold](common_output.outputowners.md#protected-threshold)*

*Defined in [src/common/output.ts:156](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L156)*

## Methods

### `Abstract` clone

▸ **clone**(): *this*

*Inherited from [Output](common_output.output.md).[clone](common_output.output.md#abstract-clone)*

*Defined in [src/common/output.ts:384](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L384)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Inherited from [Output](common_output.output.md).[create](common_output.output.md#abstract-create)*

*Defined in [src/common/output.ts:386](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L386)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[deserialize](common_output.standardamountoutput.md#deserialize)*

*Overrides [OutputOwners](common_output.outputowners.md).[deserialize](common_output.outputowners.md#deserialize)*

*Defined in [src/common/output.ts:522](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L522)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`outbuff`: Buffer, `offset`: number): *number*

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[fromBuffer](common_output.standardamountoutput.md#frombuffer)*

*Overrides [OutputOwners](common_output.outputowners.md).[fromBuffer](common_output.outputowners.md#frombuffer)*

*Defined in [src/common/output.ts:547](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L547)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [StandardAmountOutput](common_output.standardamountoutput.md) and returns the size of the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`outbuff` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAddress

▸ **getAddress**(`idx`: number): *Buffer*

*Inherited from [OutputOwners](common_output.outputowners.md).[getAddress](common_output.outputowners.md#getaddress)*

*Defined in [src/common/output.ts:208](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L208)*

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

*Defined in [src/common/output.ts:188](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L188)*

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

*Defined in [src/common/output.ts:173](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L173)*

Returns an array of [Buffer](https://github.com/feross/buffer)s for the addresses.

**Returns:** *Buffer[]*

___

###  getAmount

▸ **getAmount**(): *BN*

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[getAmount](common_output.standardamountoutput.md#getamount)*

*Defined in [src/common/output.ts:540](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L540)*

Returns the amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [NBytes](common_nbytes.nbytes.md).[getCodecID](common_nbytes.nbytes.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getLocktime

▸ **getLocktime**(): *BN*

*Inherited from [OutputOwners](common_output.outputowners.md).[getLocktime](common_output.outputowners.md#getlocktime)*

*Defined in [src/common/output.ts:168](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L168)*

Returns the a [BN](https://github.com/indutny/bn.js/) repersenting the UNIX Timestamp when the lock is made available.

**Returns:** *BN*

___

### `Abstract` getOutputID

▸ **getOutputID**(): *number*

*Inherited from [Output](common_output.output.md).[getOutputID](common_output.output.md#abstract-getoutputid)*

*Defined in [src/common/output.ts:382](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L382)*

Returns the outputID for the output which tells parsers what type it is

**Returns:** *number*

___

###  getSpenders

▸ **getSpenders**(`addresses`: Buffer[], `asOf`: BN): *Buffer[]*

*Inherited from [OutputOwners](common_output.outputowners.md).[getSpenders](common_output.outputowners.md#getspenders)*

*Defined in [src/common/output.ts:237](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L237)*

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

*Defined in [src/common/output.ts:163](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L163)*

Returns the threshold of signers required to spend this output.

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

###  makeTransferable

▸ **makeTransferable**(`assetID`: Buffer): *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

*Overrides [Output](common_output.output.md).[makeTransferable](common_output.output.md#abstract-maketransferable)*

*Defined in [src/apis/avm/outputs.ts:93](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/outputs.ts#L93)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer | An assetID which is wrapped around the Buffer of the Output  |

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

___

###  meetsThreshold

▸ **meetsThreshold**(`addresses`: Buffer[], `asOf`: BN): *boolean*

*Inherited from [OutputOwners](common_output.outputowners.md).[meetsThreshold](common_output.outputowners.md#meetsthreshold)*

*Defined in [src/common/output.ts:218](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L218)*

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

▸ **select**(`id`: number, ...`args`: any[]): *[Output](common_output.output.md)*

*Overrides [Output](common_output.output.md).[select](common_output.output.md#abstract-select)*

*Defined in [src/apis/avm/outputs.ts:97](https://github.com/ava-labs/avalanchejs/blob/8033096/src/apis/avm/outputs.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Output](common_output.output.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[serialize](common_output.standardamountoutput.md#serialize)*

*Overrides [OutputOwners](common_output.outputowners.md).[serialize](common_output.outputowners.md#serialize)*

*Defined in [src/common/output.ts:509](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L509)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[toBuffer](common_output.standardamountoutput.md#tobuffer)*

*Overrides [OutputOwners](common_output.outputowners.md).[toBuffer](common_output.outputowners.md#tobuffer)*

*Defined in [src/common/output.ts:557](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L557)*

Returns the buffer representing the [StandardAmountOutput](common_output.standardamountoutput.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [OutputOwners](common_output.outputowners.md).[toString](common_output.outputowners.md#tostring)*

*Defined in [src/common/output.ts:315](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L315)*

Returns a base-58 string representing the [Output](common_output.output.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [OutputOwners](common_output.outputowners.md).[comparator](common_output.outputowners.md#static-comparator)*

*Defined in [src/common/output.ts:319](https://github.com/ava-labs/avalanchejs/blob/8033096/src/common/output.ts#L319)*

**Returns:** *function*

▸ (`a`: [Output](common_output.output.md), `b`: [Output](common_output.output.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Output](common_output.output.md) |
`b` | [Output](common_output.output.md) |
