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

*Defined in [src/common/assetamount.ts:76](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L76)*

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

*Defined in [src/common/assetamount.ts:16](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L16)*

___

### `Protected` assetID

• **assetID**: *Buffer* = Buffer.alloc(32)

*Defined in [src/common/assetamount.ts:15](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L15)*

___

### `Protected` burn

• **burn**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:17](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L17)*

___

### `Protected` change

• **change**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:19](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L19)*

___

### `Protected` finished

• **finished**: *boolean* = false

*Defined in [src/common/assetamount.ts:22](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L22)*

___

### `Protected` spent

• **spent**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:18](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L18)*

___

### `Protected` stakeableLockChange

• **stakeableLockChange**: *boolean* = false

*Defined in [src/common/assetamount.ts:21](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L21)*

___

### `Protected` stakeableLockSpent

• **stakeableLockSpent**: *BN* = new BN(0)

*Defined in [src/common/assetamount.ts:20](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L20)*

## Methods

###  getAmount

▸ **getAmount**(): *BN*

*Defined in [src/common/assetamount.ts:32](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L32)*

**Returns:** *BN*

___

###  getAssetID

▸ **getAssetID**(): *Buffer*

*Defined in [src/common/assetamount.ts:24](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L24)*

**Returns:** *Buffer*

___

###  getAssetIDString

▸ **getAssetIDString**(): *string*

*Defined in [src/common/assetamount.ts:28](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L28)*

**Returns:** *string*

___

###  getBurn

▸ **getBurn**(): *BN*

*Defined in [src/common/assetamount.ts:40](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L40)*

**Returns:** *BN*

___

###  getChange

▸ **getChange**(): *BN*

*Defined in [src/common/assetamount.ts:44](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L44)*

**Returns:** *BN*

___

###  getSpent

▸ **getSpent**(): *BN*

*Defined in [src/common/assetamount.ts:36](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L36)*

**Returns:** *BN*

___

###  getStakeableLockChange

▸ **getStakeableLockChange**(): *boolean*

*Defined in [src/common/assetamount.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L52)*

**Returns:** *boolean*

___

###  getStakeableLockSpent

▸ **getStakeableLockSpent**(): *BN*

*Defined in [src/common/assetamount.ts:48](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L48)*

**Returns:** *BN*

___

###  isFinished

▸ **isFinished**(): *boolean*

*Defined in [src/common/assetamount.ts:56](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L56)*

**Returns:** *boolean*

___

###  spendAmount

▸ **spendAmount**(`amt`: BN, `stakeableLocked`: boolean): *boolean*

*Defined in [src/common/assetamount.ts:60](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L60)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`amt` | BN | - |
`stakeableLocked` | boolean | false |

**Returns:** *boolean*
