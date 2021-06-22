[avalanche](../README.md) › [Common-AssetAmount](../modules/common_assetamount.md) › [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md)

# Class: StandardAssetAmountDestination ‹**TO, TI**›

## Type parameters

▪ **TO**: *[StandardTransferableOutput](common_output.standardtransferableoutput.md)*

▪ **TI**: *[StandardTransferableInput](common_inputs.standardtransferableinput.md)*

## Hierarchy

* **StandardAssetAmountDestination**

  ↳ [AssetAmountDestination](api_avm_utxos.assetamountdestination.md)

  ↳ [AssetAmountDestination](api_evm_utxos.assetamountdestination.md)

  ↳ [AssetAmountDestination](api_platformvm_utxos.assetamountdestination.md)

## Index

### Constructors

* [constructor](common_assetamount.standardassetamountdestination.md#constructor)

### Properties

* [amountkey](common_assetamount.standardassetamountdestination.md#protected-amountkey)
* [amounts](common_assetamount.standardassetamountdestination.md#protected-amounts)
* [change](common_assetamount.standardassetamountdestination.md#protected-change)
* [changeAddresses](common_assetamount.standardassetamountdestination.md#protected-changeaddresses)
* [destinations](common_assetamount.standardassetamountdestination.md#protected-destinations)
* [inputs](common_assetamount.standardassetamountdestination.md#protected-inputs)
* [outputs](common_assetamount.standardassetamountdestination.md#protected-outputs)
* [senders](common_assetamount.standardassetamountdestination.md#protected-senders)

### Methods

* [addAssetAmount](common_assetamount.standardassetamountdestination.md#addassetamount)
* [addChange](common_assetamount.standardassetamountdestination.md#addchange)
* [addInput](common_assetamount.standardassetamountdestination.md#addinput)
* [addOutput](common_assetamount.standardassetamountdestination.md#addoutput)
* [assetExists](common_assetamount.standardassetamountdestination.md#assetexists)
* [canComplete](common_assetamount.standardassetamountdestination.md#cancomplete)
* [getAllOutputs](common_assetamount.standardassetamountdestination.md#getalloutputs)
* [getAmounts](common_assetamount.standardassetamountdestination.md#getamounts)
* [getAssetAmount](common_assetamount.standardassetamountdestination.md#getassetamount)
* [getChangeAddresses](common_assetamount.standardassetamountdestination.md#getchangeaddresses)
* [getChangeOutputs](common_assetamount.standardassetamountdestination.md#getchangeoutputs)
* [getDestinations](common_assetamount.standardassetamountdestination.md#getdestinations)
* [getInputs](common_assetamount.standardassetamountdestination.md#getinputs)
* [getOutputs](common_assetamount.standardassetamountdestination.md#getoutputs)
* [getSenders](common_assetamount.standardassetamountdestination.md#getsenders)

## Constructors

###  constructor

\+ **new StandardAssetAmountDestination**(`destinations`: Array‹Buffer›, `senders`: Array‹Buffer›, `changeAddresses`: Array‹Buffer›): *[StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md)*

*Defined in [src/common/assetamount.ts:187](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L187)*

**Parameters:**

Name | Type |
------ | ------ |
`destinations` | Array‹Buffer› |
`senders` | Array‹Buffer› |
`changeAddresses` | Array‹Buffer› |

**Returns:** *[StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md)*

## Properties

### `Protected` amountkey

• **amountkey**: *object*

*Defined in [src/common/assetamount.ts:114](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L114)*

___

### `Protected` amounts

• **amounts**: *Array‹[AssetAmount](common_assetamount.assetamount.md)›* = []

*Defined in [src/common/assetamount.ts:110](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L110)*

___

### `Protected` change

• **change**: *Array‹TO›* = []

*Defined in [src/common/assetamount.ts:117](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L117)*

___

### `Protected` changeAddresses

• **changeAddresses**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:113](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L113)*

___

### `Protected` destinations

• **destinations**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:111](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L111)*

___

### `Protected` inputs

• **inputs**: *Array‹TI›* = []

*Defined in [src/common/assetamount.ts:115](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L115)*

___

### `Protected` outputs

• **outputs**: *Array‹TO›* = []

*Defined in [src/common/assetamount.ts:116](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L116)*

___

### `Protected` senders

• **senders**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:112](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L112)*

## Methods

###  addAssetAmount

▸ **addAssetAmount**(`assetID`: Buffer, `amount`: BN, `burn`: BN): *void*

*Defined in [src/common/assetamount.ts:121](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |
`amount` | BN |
`burn` | BN |

**Returns:** *void*

___

###  addChange

▸ **addChange**(`output`: TO): *void*

*Defined in [src/common/assetamount.ts:135](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | TO |

**Returns:** *void*

___

###  addInput

▸ **addInput**(`input`: TI): *void*

*Defined in [src/common/assetamount.ts:127](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | TI |

**Returns:** *void*

___

###  addOutput

▸ **addOutput**(`output`: TO): *void*

*Defined in [src/common/assetamount.ts:131](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | TO |

**Returns:** *void*

___

###  assetExists

▸ **assetExists**(`assetHexStr`: string): *boolean*

*Defined in [src/common/assetamount.ts:159](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *boolean*

___

###  canComplete

▸ **canComplete**(): *boolean*

*Defined in [src/common/assetamount.ts:179](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L179)*

**Returns:** *boolean*

___

###  getAllOutputs

▸ **getAllOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:175](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L175)*

**Returns:** *Array‹TO›*

___

###  getAmounts

▸ **getAmounts**(): *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

*Defined in [src/common/assetamount.ts:139](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L139)*

**Returns:** *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

___

###  getAssetAmount

▸ **getAssetAmount**(`assetHexStr`: string): *[AssetAmount](common_assetamount.assetamount.md)*

*Defined in [src/common/assetamount.ts:155](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *[AssetAmount](common_assetamount.assetamount.md)*

___

###  getChangeAddresses

▸ **getChangeAddresses**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:151](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L151)*

**Returns:** *Array‹Buffer›*

___

###  getChangeOutputs

▸ **getChangeOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:171](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L171)*

**Returns:** *Array‹TO›*

___

###  getDestinations

▸ **getDestinations**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:143](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L143)*

**Returns:** *Array‹Buffer›*

___

###  getInputs

▸ **getInputs**(): *Array‹TI›*

*Defined in [src/common/assetamount.ts:163](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L163)*

**Returns:** *Array‹TI›*

___

###  getOutputs

▸ **getOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:167](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L167)*

**Returns:** *Array‹TO›*

___

###  getSenders

▸ **getSenders**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:147](https://github.com/ava-labs/avalanchejs/blob/1a2866a/src/common/assetamount.ts#L147)*

**Returns:** *Array‹Buffer›*
