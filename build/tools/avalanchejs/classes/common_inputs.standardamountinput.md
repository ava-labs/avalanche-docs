[avalanche](../README.md) › [Common-Inputs](../modules/common_inputs.md) › [StandardAmountInput](common_inputs.standardamountinput.md)

# Class: StandardAmountInput

An [Input](common_inputs.input.md) class which specifies a token amount .

## Hierarchy

  ↳ [Input](common_inputs.input.md)

  ↳ **StandardAmountInput**

  ↳ [AmountInput](api_avm_inputs.amountinput.md)

  ↳ [AmountInput](api_platformvm_inputs.amountinput.md)

## Index

### Constructors

* [constructor](common_inputs.standardamountinput.md#constructor)

### Properties

* [_typeID](common_inputs.standardamountinput.md#protected-_typeid)
* [_typeName](common_inputs.standardamountinput.md#protected-_typename)
* [amount](common_inputs.standardamountinput.md#protected-amount)
* [amountValue](common_inputs.standardamountinput.md#protected-amountvalue)
* [sigCount](common_inputs.standardamountinput.md#protected-sigcount)
* [sigIdxs](common_inputs.standardamountinput.md#protected-sigidxs)

### Methods

* [addSignatureIdx](common_inputs.standardamountinput.md#addsignatureidx)
* [clone](common_inputs.standardamountinput.md#abstract-clone)
* [create](common_inputs.standardamountinput.md#abstract-create)
* [deserialize](common_inputs.standardamountinput.md#deserialize)
* [fromBuffer](common_inputs.standardamountinput.md#frombuffer)
* [getAmount](common_inputs.standardamountinput.md#getamount)
* [getCredentialID](common_inputs.standardamountinput.md#abstract-getcredentialid)
* [getInputID](common_inputs.standardamountinput.md#abstract-getinputid)
* [getSigIdxs](common_inputs.standardamountinput.md#getsigidxs)
* [getTypeID](common_inputs.standardamountinput.md#gettypeid)
* [getTypeName](common_inputs.standardamountinput.md#gettypename)
* [select](common_inputs.standardamountinput.md#abstract-select)
* [serialize](common_inputs.standardamountinput.md#serialize)
* [toBuffer](common_inputs.standardamountinput.md#tobuffer)
* [toString](common_inputs.standardamountinput.md#tostring)
* [comparator](common_inputs.standardamountinput.md#static-comparator)

## Constructors

###  constructor

\+ **new StandardAmountInput**(`amount`: BN): *[StandardAmountInput](common_inputs.standardamountinput.md)*

*Defined in [src/common/input.ts:311](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L311)*

An [AmountInput](api_avm_inputs.amountinput.md) class which issues a payment on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`amount` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the amount in the input  |

**Returns:** *[StandardAmountInput](common_inputs.standardamountinput.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Input](common_inputs.input.md).[_typeID](common_inputs.input.md#protected-_typeid)*

*Defined in [src/common/input.ts:270](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L270)*

___

### `Protected` _typeName

• **_typeName**: *string* = "StandardAmountInput"

*Overrides [Input](common_inputs.input.md).[_typeName](common_inputs.input.md#protected-_typename)*

*Defined in [src/common/input.ts:269](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L269)*

___

### `Protected` amount

• **amount**: *Buffer* = Buffer.alloc(8)

*Defined in [src/common/input.ts:285](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L285)*

___

### `Protected` amountValue

• **amountValue**: *BN* = new BN(0)

*Defined in [src/common/input.ts:286](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L286)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Inherited from [Input](common_inputs.input.md).[sigCount](common_inputs.input.md#protected-sigcount)*

*Defined in [src/common/input.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L38)*

___

### `Protected` sigIdxs

• **sigIdxs**: *Array‹[SigIdx](common_signature.sigidx.md)›* = []

*Inherited from [Input](common_inputs.input.md).[sigIdxs](common_inputs.input.md#protected-sigidxs)*

*Defined in [src/common/input.ts:39](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L39)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Inherited from [Input](common_inputs.input.md).[addSignatureIdx](common_inputs.input.md#addsignatureidx)*

*Defined in [src/common/input.ts:70](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L70)*

Creates and adds a [SigIdx](common_signature.sigidx.md) to the [Input](common_inputs.input.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`addressIdx` | number | The index of the address to reference in the signatures |
`address` | Buffer | The address of the source of the signature  |

**Returns:** *void*

___

### `Abstract` clone

▸ **clone**(): *this*

*Inherited from [Input](common_inputs.input.md).[clone](common_inputs.input.md#abstract-clone)*

*Defined in [src/common/input.ts:114](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L114)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Inherited from [Input](common_inputs.input.md).[create](common_inputs.input.md#abstract-create)*

*Defined in [src/common/input.ts:116](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Input](common_inputs.input.md).[deserialize](common_inputs.input.md#deserialize)*

*Defined in [src/common/input.ts:279](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L279)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [Input](common_inputs.input.md).[fromBuffer](common_inputs.input.md#frombuffer)*

*Defined in [src/common/input.ts:296](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L296)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [AmountInput](api_avm_inputs.amountinput.md) and returns the size of the input.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAmount

▸ **getAmount**(): *BN*

*Defined in [src/common/input.ts:291](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L291)*

Returns the amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

### `Abstract` getCredentialID

▸ **getCredentialID**(): *number*

*Inherited from [Input](common_inputs.input.md).[getCredentialID](common_inputs.input.md#abstract-getcredentialid)*

*Defined in [src/common/input.ts:62](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L62)*

**Returns:** *number*

___

### `Abstract` getInputID

▸ **getInputID**(): *number*

*Inherited from [Input](common_inputs.input.md).[getInputID](common_inputs.input.md#abstract-getinputid)*

*Defined in [src/common/input.ts:55](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L55)*

**Returns:** *number*

___

###  getSigIdxs

▸ **getSigIdxs**(): *Array‹[SigIdx](common_signature.sigidx.md)›*

*Inherited from [Input](common_inputs.input.md).[getSigIdxs](common_inputs.input.md#getsigidxs)*

*Defined in [src/common/input.ts:60](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L60)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Input](common_inputs.input.md)

**Returns:** *Array‹[SigIdx](common_signature.sigidx.md)›*

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

▸ **select**(`id`: number, ...`args`: any[]): *[Input](common_inputs.input.md)*

*Inherited from [Input](common_inputs.input.md).[select](common_inputs.input.md#abstract-select)*

*Defined in [src/common/input.ts:118](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Input](common_inputs.input.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Input](common_inputs.input.md).[serialize](common_inputs.input.md#serialize)*

*Defined in [src/common/input.ts:272](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L272)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [Input](common_inputs.input.md).[toBuffer](common_inputs.input.md#tobuffer)*

*Defined in [src/common/input.ts:306](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L306)*

Returns the buffer representing the [AmountInput](api_avm_inputs.amountinput.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [Input](common_inputs.input.md).[toString](common_inputs.input.md#tostring)*

*Defined in [src/common/input.ts:110](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L110)*

Returns a base-58 representation of the [Input](common_inputs.input.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [Input](common_inputs.input.md).[comparator](common_inputs.input.md#static-comparator)*

*Defined in [src/common/input.ts:41](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/input.ts#L41)*

**Returns:** *function*

▸ (`a`: [Input](common_inputs.input.md), `b`: [Input](common_inputs.input.md)): *0 | 1 | -1*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Input](common_inputs.input.md) |
`b` | [Input](common_inputs.input.md) |
