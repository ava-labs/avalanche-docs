[avalanche](../README.md) › [API-EVM-Outputs](../modules/api_evm_outputs.md) › [EVMOutput](api_evm_outputs.evmoutput.md)

# Class: EVMOutput

## Hierarchy

* **EVMOutput**

  ↳ [EVMInput](api_evm_inputs.evminput.md)

## Index

### Constructors

* [constructor](api_evm_outputs.evmoutput.md#constructor)

### Properties

* [address](api_evm_outputs.evmoutput.md#protected-address)
* [amount](api_evm_outputs.evmoutput.md#protected-amount)
* [amountValue](api_evm_outputs.evmoutput.md#protected-amountvalue)
* [assetID](api_evm_outputs.evmoutput.md#protected-assetid)

### Methods

* [clone](api_evm_outputs.evmoutput.md#clone)
* [create](api_evm_outputs.evmoutput.md#create)
* [fromBuffer](api_evm_outputs.evmoutput.md#frombuffer)
* [getAddress](api_evm_outputs.evmoutput.md#getaddress)
* [getAddressString](api_evm_outputs.evmoutput.md#getaddressstring)
* [getAmount](api_evm_outputs.evmoutput.md#getamount)
* [getAssetID](api_evm_outputs.evmoutput.md#getassetid)
* [toBuffer](api_evm_outputs.evmoutput.md#tobuffer)
* [toString](api_evm_outputs.evmoutput.md#tostring)
* [comparator](api_evm_outputs.evmoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new EVMOutput**(`address`: Buffer | string, `amount`: BN | number, `assetID`: Buffer | string): *[EVMOutput](api_evm_outputs.evmoutput.md)*

*Defined in [src/apis/evm/outputs.ts:177](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L177)*

An [EVMOutput](api_evm_outputs.evmoutput.md) class which contains address, amount, and assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`address` | Buffer &#124; string | undefined | The address recieving the asset as a [Buffer](https://github.com/feross/buffer) or a string. |
`amount` | BN &#124; number | undefined | A [BN](https://github.com/indutny/bn.js/) or number representing the amount. |
`assetID` | Buffer &#124; string | undefined | The assetID which is being sent as a [Buffer](https://github.com/feross/buffer) or a string.  |

**Returns:** *[EVMOutput](api_evm_outputs.evmoutput.md)*

## Properties

### `Protected` address

• **address**: *Buffer* = Buffer.alloc(20)

*Defined in [src/apis/evm/outputs.ts:99](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L99)*

___

### `Protected` amount

• **amount**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/evm/outputs.ts:100](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L100)*

___

### `Protected` amountValue

• **amountValue**: *BN* = new BN(0)

*Defined in [src/apis/evm/outputs.ts:101](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L101)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/apis/evm/outputs.ts:102](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L102)*

## Methods

###  clone

▸ **clone**(): *this*

*Defined in [src/apis/evm/outputs.ts:173](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L173)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/apis/evm/outputs.ts:169](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L169)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Defined in [src/apis/evm/outputs.ts:152](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L152)*

Decodes the [EVMOutput](api_evm_outputs.evmoutput.md) as a [Buffer](https://github.com/feross/buffer) and returns the size.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAddress

▸ **getAddress**(): *Buffer*

*Defined in [src/apis/evm/outputs.ts:122](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L122)*

Returns the address of the input as [Buffer](https://github.com/feross/buffer)

**Returns:** *Buffer*

___

###  getAddressString

▸ **getAddressString**(): *string*

*Defined in [src/apis/evm/outputs.ts:127](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L127)*

Returns the address as a bech32 encoded string.

**Returns:** *string*

___

###  getAmount

▸ **getAmount**(): *BN*

*Defined in [src/apis/evm/outputs.ts:132](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L132)*

Returns the amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/apis/evm/outputs.ts:137](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L137)*

Returns the assetID of the input as [Buffer](https://github.com/feross/buffer)

**Returns:** *Buffer*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/apis/evm/outputs.ts:142](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L142)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [EVMOutput](api_evm_outputs.evmoutput.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Defined in [src/apis/evm/outputs.ts:165](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L165)*

Returns a base-58 representation of the [EVMOutput](api_evm_outputs.evmoutput.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Defined in [src/apis/evm/outputs.ts:107](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/evm/outputs.ts#L107)*

Returns a function used to sort an array of [EVMOutput](api_evm_outputs.evmoutput.md)s

**Returns:** *function*

▸ (`a`: [EVMOutput](api_evm_outputs.evmoutput.md) | [EVMInput](api_evm_inputs.evminput.md), `b`: [EVMOutput](api_evm_outputs.evmoutput.md) | [EVMInput](api_evm_inputs.evminput.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [EVMOutput](api_evm_outputs.evmoutput.md) &#124; [EVMInput](api_evm_inputs.evminput.md) |
`b` | [EVMOutput](api_evm_outputs.evmoutput.md) &#124; [EVMInput](api_evm_inputs.evminput.md) |
