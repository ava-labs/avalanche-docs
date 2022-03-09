[avalanche](../README.md) › [API-EVM-Inputs](../modules/api_evm_inputs.md) › [EVMInput](api_evm_inputs.evminput.md)

# Class: EVMInput

## Hierarchy

* [EVMOutput](api_evm_outputs.evmoutput.md)

  ↳ **EVMInput**

## Index

### Constructors

* [constructor](api_evm_inputs.evminput.md#constructor)

### Properties

* [address](api_evm_inputs.evminput.md#protected-address)
* [amount](api_evm_inputs.evminput.md#protected-amount)
* [amountValue](api_evm_inputs.evminput.md#protected-amountvalue)
* [assetID](api_evm_inputs.evminput.md#protected-assetid)
* [nonce](api_evm_inputs.evminput.md#protected-nonce)
* [nonceValue](api_evm_inputs.evminput.md#protected-noncevalue)
* [sigCount](api_evm_inputs.evminput.md#protected-sigcount)
* [sigIdxs](api_evm_inputs.evminput.md#protected-sigidxs)

### Methods

* [addSignatureIdx](api_evm_inputs.evminput.md#addsignatureidx)
* [clone](api_evm_inputs.evminput.md#clone)
* [create](api_evm_inputs.evminput.md#create)
* [fromBuffer](api_evm_inputs.evminput.md#frombuffer)
* [getAddress](api_evm_inputs.evminput.md#getaddress)
* [getAddressString](api_evm_inputs.evminput.md#getaddressstring)
* [getAmount](api_evm_inputs.evminput.md#getamount)
* [getAssetID](api_evm_inputs.evminput.md#getassetid)
* [getCredentialID](api_evm_inputs.evminput.md#getcredentialid)
* [getNonce](api_evm_inputs.evminput.md#getnonce)
* [getSigIdxs](api_evm_inputs.evminput.md#getsigidxs)
* [toBuffer](api_evm_inputs.evminput.md#tobuffer)
* [toString](api_evm_inputs.evminput.md#tostring)
* [comparator](api_evm_inputs.evminput.md#static-comparator)

## Constructors

###  constructor

\+ **new EVMInput**(`address`: Buffer | string, `amount`: BN | number, `assetID`: Buffer | string, `nonce`: BN | number): *[EVMInput](api_evm_inputs.evminput.md)*

*Overrides [EVMOutput](api_evm_outputs.evmoutput.md).[constructor](api_evm_outputs.evmoutput.md#constructor)*

*Defined in [src/apis/evm/inputs.ts:198](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L198)*

An [EVMInput](api_evm_inputs.evminput.md) class which contains address, amount, assetID, nonce.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`address` | Buffer &#124; string | undefined | is the EVM address from which to transfer funds. |
`amount` | BN &#124; number | undefined | is the amount of the asset to be transferred (specified in nAVAX for AVAX and the smallest denomination for all other assets). |
`assetID` | Buffer &#124; string | undefined | The assetID which is being sent as a [Buffer](https://github.com/feross/buffer) or as a string. |
`nonce` | BN &#124; number | undefined | A [BN](https://github.com/indutny/bn.js/) or a number representing the nonce.  |

**Returns:** *[EVMInput](api_evm_inputs.evminput.md)*

## Properties

### `Protected` address

• **address**: *Buffer* = Buffer.alloc(20)

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[address](api_evm_inputs.evminput.md#protected-address)*

*Defined in [src/apis/evm/outputs.ts:109](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L109)*

___

### `Protected` amount

• **amount**: *Buffer* = Buffer.alloc(8)

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[amount](api_evm_inputs.evminput.md#protected-amount)*

*Defined in [src/apis/evm/outputs.ts:110](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L110)*

___

### `Protected` amountValue

• **amountValue**: *BN* = new BN(0)

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[amountValue](api_evm_inputs.evminput.md#protected-amountvalue)*

*Defined in [src/apis/evm/outputs.ts:111](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L111)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[assetID](api_evm_inputs.evminput.md#protected-assetid)*

*Defined in [src/apis/evm/outputs.ts:112](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L112)*

___

### `Protected` nonce

• **nonce**: *Buffer* = Buffer.alloc(8)

*Defined in [src/apis/evm/inputs.ts:127](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L127)*

___

### `Protected` nonceValue

• **nonceValue**: *BN* = new BN(0)

*Defined in [src/apis/evm/inputs.ts:128](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L128)*

___

### `Protected` sigCount

• **sigCount**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/evm/inputs.ts:129](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L129)*

___

### `Protected` sigIdxs

• **sigIdxs**: *[SigIdx](common_signature.sigidx.md)[]* = []

*Defined in [src/apis/evm/inputs.ts:130](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L130)*

## Methods

###  addSignatureIdx

▸ **addSignatureIdx**(`addressIdx`: number, `address`: Buffer): *void*

*Defined in [src/apis/evm/inputs.ts:143](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L143)*

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

*Overrides [EVMOutput](api_evm_outputs.evmoutput.md).[clone](api_evm_outputs.evmoutput.md#clone)*

*Defined in [src/apis/evm/inputs.ts:194](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L194)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [EVMOutput](api_evm_outputs.evmoutput.md).[create](api_evm_outputs.evmoutput.md#create)*

*Defined in [src/apis/evm/inputs.ts:190](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Overrides [EVMOutput](api_evm_outputs.evmoutput.md).[fromBuffer](api_evm_outputs.evmoutput.md#frombuffer)*

*Defined in [src/apis/evm/inputs.ts:176](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L176)*

Decodes the [EVMInput](api_evm_inputs.evminput.md) as a [Buffer](https://github.com/feross/buffer) and returns the size.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`bytes` | Buffer | - | The bytes as a [Buffer](https://github.com/feross/buffer). |
`offset` | number | 0 | An offset as a number.  |

**Returns:** *number*

___

###  getAddress

▸ **getAddress**(): *Buffer*

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[getAddress](api_evm_inputs.evminput.md#getaddress)*

*Defined in [src/apis/evm/outputs.ts:134](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L134)*

Returns the address of the input as [Buffer](https://github.com/feross/buffer)

**Returns:** *Buffer*

___

###  getAddressString

▸ **getAddressString**(): *string*

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[getAddressString](api_evm_inputs.evminput.md#getaddressstring)*

*Defined in [src/apis/evm/outputs.ts:139](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L139)*

Returns the address as a bech32 encoded string.

**Returns:** *string*

___

###  getAmount

▸ **getAmount**(): *BN*

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[getAmount](api_evm_inputs.evminput.md#getamount)*

*Defined in [src/apis/evm/outputs.ts:144](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L144)*

Returns the amount as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[getAssetID](api_evm_inputs.evminput.md#getassetid)*

*Defined in [src/apis/evm/outputs.ts:149](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L149)*

Returns the assetID of the input as [Buffer](https://github.com/feross/buffer)

**Returns:** *Buffer*

___

###  getCredentialID

▸ **getCredentialID**(): *number*

*Defined in [src/apis/evm/inputs.ts:168](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L168)*

**Returns:** *number*

___

###  getNonce

▸ **getNonce**(): *BN*

*Defined in [src/apis/evm/inputs.ts:156](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L156)*

Returns the nonce as a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  getSigIdxs

▸ **getSigIdxs**(): *[SigIdx](common_signature.sigidx.md)[]*

*Defined in [src/apis/evm/inputs.ts:135](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L135)*

Returns the array of [SigIdx](common_signature.sigidx.md) for this [Input](common_inputs.input.md)

**Returns:** *[SigIdx](common_signature.sigidx.md)[]*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [EVMOutput](api_evm_outputs.evmoutput.md).[toBuffer](api_evm_outputs.evmoutput.md#tobuffer)*

*Defined in [src/apis/evm/inputs.ts:161](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L161)*

Returns a [Buffer](https://github.com/feross/buffer) representation of the [EVMOutput](api_evm_outputs.evmoutput.md).

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Overrides [EVMOutput](api_evm_outputs.evmoutput.md).[toString](api_evm_outputs.evmoutput.md#tostring)*

*Defined in [src/apis/evm/inputs.ts:186](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/inputs.ts#L186)*

Returns a base-58 representation of the [EVMInput](api_evm_inputs.evminput.md).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [EVMInput](api_evm_inputs.evminput.md).[comparator](api_evm_inputs.evminput.md#static-comparator)*

*Defined in [src/apis/evm/outputs.ts:117](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/outputs.ts#L117)*

Returns a function used to sort an array of [EVMOutput](api_evm_outputs.evmoutput.md)s

**Returns:** *function*

▸ (`a`: [EVMOutput](api_evm_outputs.evmoutput.md) | [EVMInput](api_evm_inputs.evminput.md), `b`: [EVMOutput](api_evm_outputs.evmoutput.md) | [EVMInput](api_evm_inputs.evminput.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [EVMOutput](api_evm_outputs.evmoutput.md) &#124; [EVMInput](api_evm_inputs.evminput.md) |
`b` | [EVMOutput](api_evm_outputs.evmoutput.md) &#124; [EVMInput](api_evm_inputs.evminput.md) |
