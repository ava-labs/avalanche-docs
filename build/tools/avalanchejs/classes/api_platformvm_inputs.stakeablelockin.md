[avalanche](../README.md) › [API-PlatformVM-Inputs](../modules/api_platformvm_inputs.md) › [StakeableLockIn](api_platformvm_inputs.stakeablelockin.md)

# Class: StakeableLockIn

An [Input](common_inputs.input.md) class which specifies an input that has a locktime which can also enable staking of the value held, preventing transfers but not validation.

## Hierarchy

  ↳ [AmountInput](api_platformvm_inputs.amountinput.md)

  ↳ **StakeableLockIn**

## Index

### Constructors

* [constructor](api_platformvm_inputs.stakeablelockin.md#constructor)

### Properties

* [_codecID](api_platformvm_inputs.stakeablelockin.md#protected-_codecid)
* [_typeID](api_platformvm_inputs.stakeablelockin.md#protected-_typeid)
* [_typeName](api_platformvm_inputs.stakeablelockin.md#protected-_typename)
* [amount](api_platformvm_inputs.stakeablelockin.md#protected-amount)
* [amountValue](api_platformvm_inputs.stakeablelockin.md#protected-amountvalue)
* [sigCount](api_platformvm_inputs.stakeablelockin.md#protected-sigcount)
* [sigIdxs](api_platformvm_inputs.stakeablelockin.md#protected-sigidxs)
* [stakeableLocktime](api_platformvm_inputs.stakeablelockin.md#protected-stakeablelocktime)
* [transferableInput](api_platformvm_inputs.stakeablelockin.md#protected-transferableinput)

### Methods

* [addSignatureIdx](api_platformvm_inputs.stakeablelockin.md#addsignatureidx)
* [clone](api_platformvm_inputs.stakeablelockin.md#clone)
* [create](api_platformvm_inputs.stakeablelockin.md#create)
* [deserialize](api_platformvm_inputs.stakeablelockin.md#deserialize)
* [fromBuffer](api_platformvm_inputs.stakeablelockin.md#frombuffer)
* [getAmount](api_platformvm_inputs.stakeablelockin.md#getamount)
* [getCodecID](api_platformvm_inputs.stakeablelockin.md#getcodecid)
* [getCredentialID](api_platformvm_inputs.stakeablelockin.md#getcredentialid)
* [getInputID](api_platformvm_inputs.stakeablelockin.md#getinputid)
* [getSigIdxs](api_platformvm_inputs.stakeablelockin.md#getsigidxs)
* [getStakeableLocktime](api_platformvm_inputs.stakeablelockin.md#getstakeablelocktime)
* [getTransferablInput](api_platformvm_inputs.stakeablelockin.md#gettransferablinput)
* [getTypeID](api_platformvm_inputs.stakeablelockin.md#gettypeid)
* [getTypeName](api_platformvm_inputs.stakeablelockin.md#gettypename)
* [select](api_platformvm_inputs.stakeablelockin.md#select)
* [serialize](api_platformvm_inputs.stakeablelockin.md#serialize)
* [synchronize](api_platformvm_inputs.stakeablelockin.md#private-synchronize)
* [toBuffer](api_platformvm_inputs.stakeablelockin.md#tobuffer)
* [toString](api_platformvm_inputs.stakeablelockin.md#tostring)
* [comparator](api_platformvm_inputs.stakeablelockin.md#static-comparator)

## Constructors

###  constructor

\+ **new StakeableLockIn**(`amount`: BN, `stakeableLocktime`: BN, `transferableInput`: [ParseableInput](api_platformvm_inputs.parseableinput.md)): *[StakeableLockIn](api_platformvm_inputs.stakeablelockin.md)*

*Overrides [StandardAmountInput](common_inputs.standardamountinput.md).[constructor](common_inputs.standardamountinput.md#constructor)*

*Defined in [src/apis/platformvm/inputs.ts:222](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L222)*

A [Output](common_output.output.md) class which specifies an [Input](common_inputs.input.md) that has a locktime which can also enable staking of the value held, preventing transfers but not validation.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`amount` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the amount in the input |
`stakeableLocktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the stakeable locktime |
`transferableInput` | [ParseableInput](api_platformvm_inputs.parseableinput.md) | undefined | A [ParseableInput](api_platformvm_inputs.parseableinput.md) which is embedded into this input.  |

**Returns:** *[StakeableLockIn](api_platformvm_inputs.stakeablelockin.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [Serializable](utils_serialization.serializable.md).[_codecID](utils_serialization.serializable.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:42](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L42)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.STAKEABLELOCKINID

*Overrides [AmountInput](api_platformvm_inputs.amountinput.md).[_typeID](api_platformvm_inputs.amountinput.md#protected-_typeid)*

*Defined in [src/apis/platformvm/inputs.ts:133](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L133)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StakeableLockIn"

*Overrides [AmountInput](api_platformvm_inputs.amountinput.md).[_typeName](api_platformvm_inputs.amountinput.md#protected-_typename)*

*Defined in [src/apis/platformvm/inputs.ts:132](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L132)*

___

### `Protected` amount

• **amount**: *Buffer* = Buffer.alloc(8)

*Inherited from [StandardAmountInput](common_inputs.standardamountinput.md).[amount](common_inputs.standardamountinput.md#protected-amount)*

*Defined in [src/common/input.ts:285](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L285)*

___

### `Protected` amountValue

• **amountValue**: *BN* = new BN(0)

*Inherited from [StandardAmountInput](common_inputs.standardamountinput.md).[amountValue](common_inputs.standardamountinput.md#protected-amountvalue)*

*Defined in [src/common/input.ts:286](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L286)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Inherited from [Input](common_inputs.input.md).[sigCount](common_inputs.input.md#protected-sigcount)*

*Defined in [src/common/input.ts:38](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L38)*

___

### `Protected` sigIdxs

• **sigIdxs**: *Array‹[SigIdx](common_signature.sigidx.md)›* = []

*Inherited from [Input](common_inputs.input.md).[sigIdxs](common_inputs.input.md#protected-sigidxs)*

*Defined in [src/common/input.ts:39](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L39)*

___

### `Protected` stakeableLocktime

• **stakeableLocktime**: *Buffer*

*Defined in [src/apis/platformvm/inputs.ts:160](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L160)*

___

### `Protected` transferableInput

• **transferableInput**: *[ParseableInput](api_platformvm_inputs.parseableinput.md)*

*Defined in [src/apis/platformvm/inputs.ts:161](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L161)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Inherited from [Input](common_inputs.input.md).[addSignatureIdx](common_inputs.input.md#addsignatureidx)*

*Defined in [src/common/input.ts:70](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L70)*

Creates and adds a [SigIdx](common_signature.sigidx.md) to the [Input](common_inputs.input.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`addressIdx` | number | The index of the address to reference in the signatures |
`address` | Buffer | The address of the source of the signature  |

**Returns:** *void*

___

###  clone

▸ **clone**(): *this*

*Overrides [Input](common_inputs.input.md).[clone](common_inputs.input.md#abstract-clone)*

*Defined in [src/apis/platformvm/inputs.ts:214](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L214)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [Input](common_inputs.input.md).[create](common_inputs.input.md#abstract-create)*

*Defined in [src/apis/platformvm/inputs.ts:210](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [StandardAmountInput](common_inputs.standardamountinput.md).[deserialize](common_inputs.standardamountinput.md#deserialize)*

*Defined in [src/apis/platformvm/inputs.ts:149](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L149)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [StandardAmountInput](common_inputs.standardamountinput.md).[fromBuffer](common_inputs.standardamountinput.md#frombuffer)*

*Defined in [src/apis/platformvm/inputs.ts:191](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L191)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [StakeableLockIn](api_platformvm_inputs.stakeablelockin.md) and returns the size of the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAmount

▸ **getAmount**(): *BN*

*Inherited from [StandardAmountInput](common_inputs.standardamountinput.md).[getAmount](common_inputs.standardamountinput.md#getamount)*

*Defined in [src/common/input.ts:291](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L291)*

Returns the amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getCodecID](utils_serialization.serializable.md#getcodecid)*

*Defined in [src/utils/serialization.ts:61](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L61)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getCredentialID

▸ **getCredentialID**(): *number*

*Overrides [Input](common_inputs.input.md).[getCredentialID](common_inputs.input.md#abstract-getcredentialid)*

*Defined in [src/apis/platformvm/inputs.ts:186](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L186)*

**Returns:** *number*

___

###  getInputID

▸ **getInputID**(): *number*

*Overrides [Input](common_inputs.input.md).[getInputID](common_inputs.input.md#abstract-getinputid)*

*Defined in [src/apis/platformvm/inputs.ts:182](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L182)*

Returns the inputID for this input

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *Array‹[SigIdx](common_signature.sigidx.md)›*

*Inherited from [Input](common_inputs.input.md).[getSigIdxs](common_inputs.input.md#getsigidxs)*

*Defined in [src/common/input.ts:60](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L60)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Input](common_inputs.input.md)

**Returns:** *Array‹[SigIdx](common_signature.sigidx.md)›*

___

###  getStakeableLocktime

▸ **getStakeableLocktime**(): *BN*

*Defined in [src/apis/platformvm/inputs.ts:172](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L172)*

**Returns:** *BN*

___

###  getTransferablInput

▸ **getTransferablInput**(): *[ParseableInput](api_platformvm_inputs.parseableinput.md)*

*Defined in [src/apis/platformvm/inputs.ts:176](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L176)*

**Returns:** *[ParseableInput](api_platformvm_inputs.parseableinput.md)*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:54](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L54)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:47](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/serialization.ts#L47)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *[Input](common_inputs.input.md)*

*Overrides [AmountInput](api_platformvm_inputs.amountinput.md).[select](api_platformvm_inputs.amountinput.md#select)*

*Defined in [src/apis/platformvm/inputs.ts:220](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L220)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Input](common_inputs.input.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [StandardAmountInput](common_inputs.standardamountinput.md).[serialize](common_inputs.standardamountinput.md#serialize)*

*Defined in [src/apis/platformvm/inputs.ts:137](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L137)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

### `Private` synchronize

▸ **synchronize**(): *void*

*Defined in [src/apis/platformvm/inputs.ts:163](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L163)*

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [StandardAmountInput](common_inputs.standardamountinput.md).[toBuffer](common_inputs.standardamountinput.md#tobuffer)*

*Defined in [src/apis/platformvm/inputs.ts:203](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/apis/platformvm/inputs.ts#L203)*

Returns the buffer representing the [StakeableLockIn](api_platformvm_inputs.stakeablelockin.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [Input](common_inputs.input.md).[toString](common_inputs.input.md#tostring)*

*Defined in [src/common/input.ts:110](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L110)*

Returns a base-58 representation of the [Input](common_inputs.input.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [Input](common_inputs.input.md).[comparator](common_inputs.input.md#static-comparator)*

*Defined in [src/common/input.ts:41](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/input.ts#L41)*

**Returns:** *function*

▸ (`a`: [Input](common_inputs.input.md), `b`: [Input](common_inputs.input.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Input](common_inputs.input.md) |
`b` | [Input](common_inputs.input.md) |
