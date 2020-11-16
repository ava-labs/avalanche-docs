[avalanche](../README.md) › [Common-AssetAmount](../modules/common_assetamount.md) › [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md)

# Class: StandardAssetAmountDestination ‹**TO, TI**›

## Type parameters

▪ **TO**: *[StandardTransferableOutput](common_output.standardtransferableoutput.md)*

▪ **TI**: *[StandardTransferableInput](common_inputs.standardtransferableinput.md)*

## Hierarchy

* **StandardAssetAmountDestination**

  ↳ [AssetAmountDestination](api_avm_utxos.assetamountdestination.md)

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

*Defined in [src/common/assetamount.ts:186](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L186)*

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

*Defined in [src/common/assetamount.ts:113](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L113)*

___

### `Protected` amounts

• **amounts**: *Array‹[AssetAmount](common_assetamount.assetamount.md)›* = []

*Defined in [src/common/assetamount.ts:109](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L109)*

___

### `Protected` change

• **change**: *Array‹TO›* = []

*Defined in [src/common/assetamount.ts:116](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L116)*

___

### `Protected` changeAddresses

• **changeAddresses**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:112](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L112)*

___

### `Protected` destinations

• **destinations**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:110](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L110)*

___

### `Protected` inputs

• **inputs**: *Array‹TI›* = []

*Defined in [src/common/assetamount.ts:114](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L114)*

___

### `Protected` outputs

• **outputs**: *Array‹TO›* = []

*Defined in [src/common/assetamount.ts:115](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L115)*

___

### `Protected` senders

• **senders**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:111](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L111)*

## Methods

###  addAssetAmount

▸ **addAssetAmount**(`assetID`: Buffer, `amount`: BN, `burn`: BN): *void*

*Defined in [src/common/assetamount.ts:120](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L120)*

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

*Defined in [src/common/assetamount.ts:134](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | TO |

**Returns:** *void*

___

###  addInput

▸ **addInput**(`input`: TI): *void*

*Defined in [src/common/assetamount.ts:126](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | TI |

**Returns:** *void*

___

###  addOutput

▸ **addOutput**(`output`: TO): *void*

*Defined in [src/common/assetamount.ts:130](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | TO |

**Returns:** *void*

___

###  assetExists

▸ **assetExists**(`assetHexStr`: string): *boolean*

*Defined in [src/common/assetamount.ts:158](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L158)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *boolean*

___

###  canComplete

▸ **canComplete**(): *boolean*

*Defined in [src/common/assetamount.ts:178](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L178)*

**Returns:** *boolean*

___

###  getAllOutputs

▸ **getAllOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:174](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L174)*

**Returns:** *Array‹TO›*

___

###  getAmounts

▸ **getAmounts**(): *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

*Defined in [src/common/assetamount.ts:138](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L138)*

**Returns:** *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

___

###  getAssetAmount

▸ **getAssetAmount**(`assetHexStr`: string): *[AssetAmount](common_assetamount.assetamount.md)*

*Defined in [src/common/assetamount.ts:154](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *[AssetAmount](common_assetamount.assetamount.md)*

___

###  getChangeAddresses

▸ **getChangeAddresses**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:150](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L150)*

**Returns:** *Array‹Buffer›*

___

###  getChangeOutputs

▸ **getChangeOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:170](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L170)*

**Returns:** *Array‹TO›*

___

###  getDestinations

▸ **getDestinations**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:142](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L142)*

**Returns:** *Array‹Buffer›*

___

###  getInputs

▸ **getInputs**(): *Array‹TI›*

*Defined in [src/common/assetamount.ts:162](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L162)*

**Returns:** *Array‹TI›*

___

###  getOutputs

▸ **getOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:166](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L166)*

**Returns:** *Array‹TO›*

___

###  getSenders

▸ **getSenders**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:146](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/assetamount.ts#L146)*

**Returns:** *Array‹Buffer›*
