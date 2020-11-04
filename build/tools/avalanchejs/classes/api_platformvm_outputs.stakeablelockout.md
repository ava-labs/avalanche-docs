[avalanche](../README.md) › [API-PlatformVM-Outputs](../modules/api_platformvm_outputs.md) › [StakeableLockOut](api_platformvm_outputs.stakeablelockout.md)

# Class: StakeableLockOut

An [Output](common_output.output.md) class which specifies an input that has a locktime which can also enable staking of the value held, preventing transfers but not validation.

## Hierarchy

  ↳ [AmountOutput](api_platformvm_outputs.amountoutput.md)

  ↳ **StakeableLockOut**

## Index

### Constructors

* [constructor](api_platformvm_outputs.stakeablelockout.md#constructor)

### Properties

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
* [select](api_platformvm_outputs.stakeablelockout.md#select)
* [serialize](api_platformvm_outputs.stakeablelockout.md#serialize)
* [synchronize](api_platformvm_outputs.stakeablelockout.md#private-synchronize)
* [toBuffer](api_platformvm_outputs.stakeablelockout.md#tobuffer)
* [toString](api_platformvm_outputs.stakeablelockout.md#tostring)
* [comparator](api_platformvm_outputs.stakeablelockout.md#static-comparator)

## Constructors

###  constructor

\+ **new StakeableLockOut**(`amount`: BN, `addresses`: Array‹Buffer›, `locktime`: BN, `threshold`: number, `stakeableLocktime`: BN, `transferableOutput`: [ParseableOutput](api_platformvm_outputs.parseableoutput.md)): *[StakeableLockOut](api_platformvm_outputs.stakeablelockout.md)*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[constructor](common_output.standardamountoutput.md#constructor)*

*Defined in [src/apis/platformvm/outputs.ts:231](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L231)*

A [Output](common_output.output.md) class which specifies a [ParseableOutput](api_platformvm_outputs.parseableoutput.md) that has a locktime which can also enable staking of the value held, preventing transfers but not validation.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`amount` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the amount in the output |
`addresses` | Array‹Buffer› | undefined | An array of [Buffer](https://github.com/feross/buffer)s representing addresses |
`locktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the locktime |
`threshold` | number | undefined | A number representing the the threshold number of signers required to sign the transaction |
`stakeableLocktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the stakeable locktime |
`transferableOutput` | [ParseableOutput](api_platformvm_outputs.parseableoutput.md) | undefined | A [ParseableOutput](api_platformvm_outputs.parseableoutput.md) which is embedded into this output.  |

**Returns:** *[StakeableLockOut](api_platformvm_outputs.stakeablelockout.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.STAKEABLELOCKOUTID

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[_typeID](api_platformvm_outputs.amountoutput.md#protected-_typeid)*

*Defined in [src/apis/platformvm/outputs.ts:126](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L126)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StakeableLockOut"

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[_typeName](api_platformvm_outputs.amountoutput.md#protected-_typename)*

*Defined in [src/apis/platformvm/outputs.ts:125](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L125)*

___

### `Protected` addresses

• **addresses**: *Array‹[Address](common_output.address.md)›* = []

*Inherited from [OutputOwners](common_output.outputowners.md).[addresses](common_output.outputowners.md#protected-addresses)*

*Defined in [src/common/output.ts:120](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L120)*

___

### `Protected` amount

• **amount**: *Buffer* = Buffer.alloc(8)

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[amount](common_output.standardamountoutput.md#protected-amount)*

*Defined in [src/common/output.ts:445](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L445)*

___

### `Protected` amountValue

• **amountValue**: *BN* = new BN(0)

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[amountValue](common_output.standardamountoutput.md#protected-amountvalue)*

*Defined in [src/common/output.ts:446](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L446)*

___

### `Protected` locktime

• **locktime**: *Buffer* = Buffer.alloc(8)

*Inherited from [OutputOwners](common_output.outputowners.md).[locktime](common_output.outputowners.md#protected-locktime)*

*Defined in [src/common/output.ts:117](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L117)*

___

### `Protected` numaddrs

• **numaddrs**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[numaddrs](common_output.outputowners.md#protected-numaddrs)*

*Defined in [src/common/output.ts:119](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L119)*

___

### `Protected` stakeableLocktime

• **stakeableLocktime**: *Buffer*

*Defined in [src/apis/platformvm/outputs.ts:155](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L155)*

___

### `Protected` threshold

• **threshold**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[threshold](common_output.outputowners.md#protected-threshold)*

*Defined in [src/common/output.ts:118](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L118)*

___

### `Protected` transferableOutput

• **transferableOutput**: *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

*Defined in [src/apis/platformvm/outputs.ts:156](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L156)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [Output](common_output.output.md).[clone](common_output.output.md#abstract-clone)*

*Defined in [src/apis/platformvm/outputs.ts:227](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L227)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [Output](common_output.output.md).[create](common_output.output.md#abstract-create)*

*Defined in [src/apis/platformvm/outputs.ts:223](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[deserialize](common_output.standardamountoutput.md#deserialize)*

*Defined in [src/apis/platformvm/outputs.ts:143](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L143)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`outbuff`: Buffer, `offset`: number): *number*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[fromBuffer](common_output.standardamountoutput.md#frombuffer)*

*Defined in [src/apis/platformvm/outputs.ts:197](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L197)*

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

*Defined in [src/common/output.ts:167](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L167)*

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

*Defined in [src/common/output.ts:150](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L150)*

Returns the index of the address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | Buffer | A [Buffer](https://github.com/feross/buffer) of the address to look up to return its index.  |

**Returns:** *number*

The index of the address.

___

###  getAddresses

▸ **getAddresses**(): *Array‹Buffer›*

*Inherited from [OutputOwners](common_output.outputowners.md).[getAddresses](common_output.outputowners.md#getaddresses)*

*Defined in [src/common/output.ts:135](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L135)*

Returns an array of [Buffer](https://github.com/feross/buffer)s for the addresses.

**Returns:** *Array‹Buffer›*

___

###  getAmount

▸ **getAmount**(): *BN*

*Inherited from [StandardAmountOutput](common_output.standardamountoutput.md).[getAmount](common_output.standardamountoutput.md#getamount)*

*Defined in [src/common/output.ts:451](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L451)*

Returns the amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  getLocktime

▸ **getLocktime**(): *BN*

*Inherited from [OutputOwners](common_output.outputowners.md).[getLocktime](common_output.outputowners.md#getlocktime)*

*Defined in [src/common/output.ts:130](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L130)*

Returns the a [BN](https://github.com/indutny/bn.js/) repersenting the UNIX Timestamp when the lock is made available.

**Returns:** *BN*

___

###  getOutputID

▸ **getOutputID**(): *number*

*Overrides [Output](common_output.output.md).[getOutputID](common_output.output.md#abstract-getoutputid)*

*Defined in [src/apis/platformvm/outputs.ts:219](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L219)*

Returns the outputID for this output

**Returns:** *number*

___

###  getSpenders

▸ **getSpenders**(`addresses`: Array‹Buffer›, `asOf`: BN): *Array‹Buffer›*

*Inherited from [OutputOwners](common_output.outputowners.md).[getSpenders](common_output.outputowners.md#getspenders)*

*Defined in [src/common/output.ts:196](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L196)*

Given an array of addresses and an optional timestamp, select an array of address [Buffer](https://github.com/feross/buffer)s of qualified spenders for the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Array‹Buffer› | - |
`asOf` | BN | undefined |

**Returns:** *Array‹Buffer›*

___

###  getStakeableLocktime

▸ **getStakeableLocktime**(): *BN*

*Defined in [src/apis/platformvm/outputs.ts:175](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L175)*

**Returns:** *BN*

___

###  getThreshold

▸ **getThreshold**(): *number*

*Inherited from [OutputOwners](common_output.outputowners.md).[getThreshold](common_output.outputowners.md#getthreshold)*

*Defined in [src/common/output.ts:125](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L125)*

Returns the threshold of signers required to spend this output.

**Returns:** *number*

___

###  getTransferableOutput

▸ **getTransferableOutput**(): *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

*Defined in [src/apis/platformvm/outputs.ts:179](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L179)*

**Returns:** *[ParseableOutput](api_platformvm_outputs.parseableoutput.md)*

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

###  makeTransferable

▸ **makeTransferable**(`assetID`: Buffer): *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[makeTransferable](api_platformvm_outputs.amountoutput.md#maketransferable)*

*Defined in [src/apis/platformvm/outputs.ts:186](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L186)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer | An assetID which is wrapped around the Buffer of the Output  |

**Returns:** *[TransferableOutput](api_platformvm_outputs.transferableoutput.md)*

___

###  meetsThreshold

▸ **meetsThreshold**(`addresses`: Array‹Buffer›, `asOf`: BN): *boolean*

*Inherited from [OutputOwners](common_output.outputowners.md).[meetsThreshold](common_output.outputowners.md#meetsthreshold)*

*Defined in [src/common/output.ts:177](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L177)*

Given an array of address [Buffer](https://github.com/feross/buffer)s and an optional timestamp, returns true if the addresses meet the threshold required to spend the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Array‹Buffer› | - |
`asOf` | BN | undefined |

**Returns:** *boolean*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *[Output](common_output.output.md)*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[select](api_platformvm_outputs.amountoutput.md#select)*

*Defined in [src/apis/platformvm/outputs.ts:190](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Output](common_output.output.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[serialize](common_output.standardamountoutput.md#serialize)*

*Defined in [src/apis/platformvm/outputs.ts:130](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L130)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

### `Private` synchronize

▸ **synchronize**(): *void*

*Defined in [src/apis/platformvm/outputs.ts:159](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L159)*

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardAmountOutput](common_output.standardamountoutput.md).[toBuffer](common_output.standardamountoutput.md#tobuffer)*

*Defined in [src/apis/platformvm/outputs.ts:209](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/outputs.ts#L209)*

Returns the buffer representing the [StakeableLockOut](api_platformvm_outputs.stakeablelockout.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [OutputOwners](common_output.outputowners.md).[toString](common_output.outputowners.md#tostring)*

*Defined in [src/common/output.ts:261](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L261)*

Returns a base-58 string representing the [Output](common_output.output.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [OutputOwners](common_output.outputowners.md).[comparator](common_output.outputowners.md#static-comparator)*

*Defined in [src/common/output.ts:265](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/output.ts#L265)*

**Returns:** *function*

▸ (`a`: [Output](common_output.output.md), `b`: [Output](common_output.output.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Output](common_output.output.md) |
`b` | [Output](common_output.output.md) |
