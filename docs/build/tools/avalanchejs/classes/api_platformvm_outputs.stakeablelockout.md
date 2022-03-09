[avalanche](../README.md) › [API-PlatformVM-Outputs](../modules/api_platformvm_outputs.md) › [StakeableLockOut](api_platformvm_outputs.stakeablelockout.md)

# Class: StakeableLockOut

An [Output](../modules/src_common.md#output) class which specifies an input that has a locktime which can also enable staking of the value held, preventing transfers but not validation.

## Hierarchy

  ↳ [AmountOutput](api_platformvm_outputs.amountoutput.md)

  ↳ **StakeableLockOut**

## Index

### Constructors

* [constructor](api_platformvm_outputs.stakeablelockout.md#constructor)

### Properties

* [_codecID](api_platformvm_outputs.stakeablelockout.md#protected-_codecid)
* [_typeID](api_platformvm_outputs.stakeablelockout.md#protected-_typeid)
* [_typeName](api_platformvm_outputs.stakeablelockout.md#protected-_typename)
* [addresses](api_platformvm_outputs.stakeablelockout.md#protected-addresses)
* [amount](api_platformvm_outputs.stakeablelockout.md#protected-amount)
* [amountValue](api_platformvm_outputs.stakeablelockout.md#protected-amountvalue)
* [locktime](api_platformvm_outputs.stakeablelockout.md#protected-locktime)
* [numaddrs](api_platformvm_outputs.stakeablelockout.md#protected-numaddrs)
* [stakeableLocktime](api_platformvm_outputs.stakeablelockout.md#protected-stakeablelocktime)
* [threshold](api_platformvm_outputs.stakeablelockout.md#protected-threshold)
* [transferableOutput](api_platformvm_outputs.stakeablelockout.md#protected-transferableoutput)

### Methods

* [clone](api_platformvm_outputs.stakeablelockout.md#clone)
* [create](api_platformvm_outputs.stakeablelockout.md#create)
* [deserialize](api_platformvm_outputs.stakeablelockout.md#deserialize)
* [fromBuffer](api_platformvm_outputs.stakeablelockout.md#frombuffer)
* [getAddress](api_platformvm_outputs.stakeablelockout.md#getaddress)
* [getAddressIdx](api_platformvm_outputs.stakeablelockout.md#getaddressidx)
* [getAddresses](api_platformvm_outputs.stakeablelockout.md#getaddresses)
* [getAmount](api_platformvm_outputs.stakeablelockout.md#getamount)
* [getCodecID](api_platformvm_outputs.stakeablelockout.md#getcodecid)
* [getLocktime](api_platformvm_outputs.stakeablelockout.md#getlocktime)
* [getOutputID](api_platformvm_outputs.stakeablelockout.md#getoutputid)
* [getSpenders](api_platformvm_outputs.stakeablelockout.md#getspenders)
* [getStakeableLocktime](api_platformvm_outputs.stakeablelockout.md#getstakeablelocktime)
* [getThreshold](api_platformvm_outputs.stakeablelockout.md#getthreshold)
* [getTransferableOutput](api_platformvm_outputs.stakeablelockout.md#gettransferableoutput)
* [getTypeID](api_platformvm_outputs.stakeablelockout.md#gettypeid)
* [getTypeName](api_platformvm_outputs.stakeablelockout.md#gettypename)
* [makeTransferable](api_platformvm_outputs.stakeablelockout.md#maketransferable)
* [meetsThreshold](api_platformvm_outputs.stakeablelockout.md#meetsthreshold)
* [sanitizeObject](api_platformvm_outputs.stakeablelockout.md#sanitizeobject)
* [select](api_platformvm_outputs.stakeablelockout.md#select)
* [serialize](api_platformvm_outputs.stakeablelockout.md#serialize)
* [synchronize](api_platformvm_outputs.stakeablelockout.md#private-synchronize)
* [toBuffer](api_platformvm_outputs.stakeablelockout.md#tobuffer)
* [toString](api_platformvm_outputs.stakeablelockout.md#tostring)
* [comparator](api_platformvm_outputs.stakeablelockout.md#static-comparator)

## Constructors

###  constructor

\+ **new StakeableLockOut**(`amount`: BN, `addresses`: Buffer[], `locktime`: BN, `threshold`: number, `stakeableLocktime`: BN, `transferableOutput`: [ParseableOutput](api_platformvm_outputs.parseableoutput.md)): *[StakeableLockOut](api_platformvm_outputs.stakeablelockout.md)*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[constructor](common_output.standardamountoutput.md#constructor)*

*Defined in [src/apis/platformvm/outputs.ts:260](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L260)*

A [Output](../modules/src_common.md#output) class which specifies a [ParseableOutput](api_platformvm_outputs.parseableoutput.md) that has a locktime which can also enable staking of the value held, preventing transfers but not validation.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`amount` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the amount in the output |
`addresses` | Buffer[] | undefined | An array of [Buffer](https://github.com/feross/buffer)s representing addresses |
`locktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the locktime |
`threshold` | number | undefined | A number representing the the threshold number of signers required to sign the transaction |
`stakeableLocktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the stakeable locktime |
`transferableOutput` | [ParseableOutput](api_platformvm_outputs.parseableoutput.md) | undefined | A [ParseableOutput](api_platformvm_outputs.parseableoutput.md) which is embedded into this output.  |

**Returns:** *[StakeableLockOut](api_platformvm_outputs.stakeablelockout.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.STAKEABLELOCKOUTID

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[_typeID](api_platformvm_outputs.amountoutput.md#protected-_typeid)*

*Defined in [src/apis/platformvm/outputs.ts:142](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L142)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StakeableLockOut"

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[_typeName](api_platformvm_outputs.amountoutput.md#protected-_typename)*

*Defined in [src/apis/platformvm/outputs.ts:141](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L141)*

___

### `Protected` addresses

• **addresses**: *[Address](common_output.address.md)[]* = []

*Inherited from [OutputOwners](common_output.outputowners.md).[addresses](common_output.outputowners.md#protected-addresses)*

*Defined in [src/common/output.ts:158](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L158)*

___

### `Protected` amount

• **amount**: *Buffer* = Buffer.alloc(8)

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[amount](common_output.standardamountoutput.md#protected-amount)*

*Defined in [src/common/output.ts:534](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L534)*

___

### `Protected` amountValue

• **amountValue**: *BN* = new BN(0)

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[amountValue](common_output.standardamountoutput.md#protected-amountvalue)*

*Defined in [src/common/output.ts:535](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L535)*

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

### `Protected` stakeableLocktime

• **stakeableLocktime**: *Buffer*

*Defined in [src/apis/platformvm/outputs.ts:183](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L183)*

___

### `Protected` threshold

• **threshold**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[threshold](common_output.outputowners.md#protected-threshold)*

*Defined in [src/common/output.ts:156](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L156)*

___

### `Protected` transferableOutput

• **transferableOutput**: *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

*Defined in [src/apis/platformvm/outputs.ts:184](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L184)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [Output](common_output.output.md).[clone](common_output.output.md#abstract-clone)*

*Defined in [src/apis/platformvm/outputs.ts:256](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L256)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [Output](common_output.output.md).[create](common_output.output.md#abstract-create)*

*Defined in [src/apis/platformvm/outputs.ts:252](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L252)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[deserialize](common_output.standardamountoutput.md#deserialize)*

*Defined in [src/apis/platformvm/outputs.ts:165](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L165)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`outbuff`: Buffer, `offset`: number): *number*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[fromBuffer](common_output.standardamountoutput.md#frombuffer)*

*Defined in [src/apis/platformvm/outputs.ts:226](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L226)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [StakeableLockOut](api_platformvm_outputs.stakeablelockout.md) and returns the size of the output.

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

###  getAmount

▸ **getAmount**(): *BN*

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[getAmount](common_output.standardamountoutput.md#getamount)*

*Defined in [src/common/output.ts:540](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L540)*

Returns the amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

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

*Defined in [src/apis/platformvm/outputs.ts:248](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L248)*

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

###  getStakeableLocktime

▸ **getStakeableLocktime**(): *BN*

*Defined in [src/apis/platformvm/outputs.ts:204](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L204)*

**Returns:** *BN*

___

###  getThreshold

▸ **getThreshold**(): *number*

*Inherited from [OutputOwners](common_output.outputowners.md).[getThreshold](common_output.outputowners.md#getthreshold)*

*Defined in [src/common/output.ts:163](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L163)*

Returns the threshold of signers required to spend this output.

**Returns:** *number*

___

###  getTransferableOutput

▸ **getTransferableOutput**(): *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

*Defined in [src/apis/platformvm/outputs.ts:208](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L208)*

**Returns:** *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

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

▸ **makeTransferable**(`assetID`: Buffer): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[makeTransferable](api_platformvm_outputs.amountoutput.md#maketransferable)*

*Defined in [src/apis/platformvm/outputs.ts:215](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L215)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer | An assetID which is wrapped around the Buffer of the Output  |

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)*

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

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[select](api_platformvm_outputs.amountoutput.md#select)*

*Defined in [src/apis/platformvm/outputs.ts:219](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L219)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Output](common_output.output.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[serialize](common_output.standardamountoutput.md#serialize)*

*Defined in [src/apis/platformvm/outputs.ts:146](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L146)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

### `Private` synchronize

▸ **synchronize**(): *void*

*Defined in [src/apis/platformvm/outputs.ts:187](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L187)*

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[toBuffer](common_output.standardamountoutput.md#tobuffer)*

*Defined in [src/apis/platformvm/outputs.ts:238](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/outputs.ts#L238)*

Returns the buffer representing the [StakeableLockOut](api_platformvm_outputs.stakeablelockout.md) instance.

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
