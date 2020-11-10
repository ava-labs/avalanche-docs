[avalanche](../README.md) › [Common-AssetAmount](../modules/common_assetamount.md) › [AssetAmount](common_assetamount.assetamount.md)

# Class: AssetAmount

Class for managing asset amounts in the UTXOSet fee calcuation

## Hierarchy

* **AssetAmount**

## Index

### Constructors

* [constructor](common_assetamount.assetamount.md#constructor)

### Properties

* [amount](common_assetamount.assetamount.md#protected-amount)
* [assetID](common_assetamount.assetamount.md#protected-assetid)
* [burn](common_assetamount.assetamount.md#protected-burn)
* [change](common_assetamount.assetamount.md#protected-change)
* [finished](common_assetamount.assetamount.md#protected-finished)
* [spent](common_assetamount.assetamount.md#protected-spent)
* [stakeableLockChange](common_assetamount.assetamount.md#protected-stakeablelockchange)
* [stakeableLockSpent](common_assetamount.assetamount.md#protected-stakeablelockspent)

### Methods

* [getAmount](common_assetamount.assetamount.md#getamount)
* [getAssetID](common_assetamount.assetamount.md#getassetid)
* [getAssetIDString](common_assetamount.assetamount.md#getassetidstring)
* [getBurn](common_assetamount.assetamount.md#getburn)
* [getChange](common_assetamount.assetamount.md#getchange)
* [getSpent](common_assetamount.assetamount.md#getspent)
* [getStakeableLockChange](common_assetamount.assetamount.md#getstakeablelockchange)
* [getStakeableLockSpent](common_assetamount.assetamount.md#getstakeablelockspent)
* [isFinished](common_assetamount.assetamount.md#isfinished)
* [spendAmount](common_assetamount.assetamount.md#spendamount)

## Constructors

###  constructor

\+ **new AssetAmount**(`assetID`: Buffer, `amount`: BN, `burn`: BN): *[AssetAmount](common_assetamount.assetamount.md)*

*Defined in [src/common/assetamount.ts:96](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |
`amount` | BN |
`burn` | BN |

**Returns:** *[AssetAmount](common_assetamount.assetamount.md)*

## Properties

### `Protected` amount

• **amount**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:18](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L18)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/assetamount.ts:16](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L16)*

___

### `Protected` burn

• **burn**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:20](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L20)*

___

### `Protected` change

• **change**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:30](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L30)*

___

### `Protected` finished

• **finished**: *boolean* = false

*Defined in [src/common/assetamount.ts:36](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L36)*

___

### `Protected` spent

• **spent**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:23](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L23)*

___

### `Protected` stakeableLockChange

• **stakeableLockChange**: *boolean* = false

*Defined in [src/common/assetamount.ts:33](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L33)*

___

### `Protected` stakeableLockSpent

• **stakeableLockSpent**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:26](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L26)*

## Methods

###  getAmount

▸ **getAmount**(): *BN*

*Defined in [src/common/assetamount.ts:46](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L46)*

**Returns:** *BN*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/common/assetamount.ts:38](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L38)*

**Returns:** *Buffer*

___

###  getAssetIDString

▸ **getAssetIDString**(): *string*

*Defined in [src/common/assetamount.ts:42](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L42)*

**Returns:** *string*

___

###  getBurn

▸ **getBurn**(): *BN*

*Defined in [src/common/assetamount.ts:54](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L54)*

**Returns:** *BN*

___

###  getChange

▸ **getChange**(): *BN*

*Defined in [src/common/assetamount.ts:58](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L58)*

**Returns:** *BN*

___

###  getSpent

▸ **getSpent**(): *BN*

*Defined in [src/common/assetamount.ts:50](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L50)*

**Returns:** *BN*

___

###  getStakeableLockChange

▸ **getStakeableLockChange**(): *boolean*

*Defined in [src/common/assetamount.ts:66](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L66)*

**Returns:** *boolean*

___

###  getStakeableLockSpent

▸ **getStakeableLockSpent**(): *BN*

*Defined in [src/common/assetamount.ts:62](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L62)*

**Returns:** *BN*

___

###  isFinished

▸ **isFinished**(): *boolean*

*Defined in [src/common/assetamount.ts:70](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L70)*

**Returns:** *boolean*

___

###  spendAmount

▸ **spendAmount**(`amt`: BN, `stakeableLocked`: boolean): *boolean*

*Defined in [src/common/assetamount.ts:76](https://github.com/ava-labs/avalanchejs/blob/ccc6083/src/common/assetamount.ts#L76)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`amt` | BN | - |
`stakeableLocked` | boolean | false |

**Returns:** *boolean*
