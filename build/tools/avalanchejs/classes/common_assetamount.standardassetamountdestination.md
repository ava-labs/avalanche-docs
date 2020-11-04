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

*Defined in [src/common/assetamount.ts:164](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L164)*

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

*Defined in [src/common/assetamount.ts:93](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L93)*

___

### `Protected` amounts

• **amounts**: *Array‹[AssetAmount](common_assetamount.assetamount.md)›* = []

*Defined in [src/common/assetamount.ts:89](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L89)*

___

### `Protected` change

• **change**: *Array‹TO›* = []

*Defined in [src/common/assetamount.ts:96](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L96)*

___

### `Protected` changeAddresses

• **changeAddresses**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:92](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L92)*

___

### `Protected` destinations

• **destinations**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:90](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L90)*

___

### `Protected` inputs

• **inputs**: *Array‹TI›* = []

*Defined in [src/common/assetamount.ts:94](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L94)*

___

### `Protected` outputs

• **outputs**: *Array‹TO›* = []

*Defined in [src/common/assetamount.ts:95](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L95)*

___

### `Protected` senders

• **senders**: *Array‹Buffer›* = []

*Defined in [src/common/assetamount.ts:91](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L91)*

## Methods

###  addAssetAmount

▸ **addAssetAmount**(`assetID`: Buffer, `amount`: BN, `burn`: BN): *void*

*Defined in [src/common/assetamount.ts:98](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L98)*

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

*Defined in [src/common/assetamount.ts:112](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | TO |

**Returns:** *void*

___

###  addInput

▸ **addInput**(`input`: TI): *void*

*Defined in [src/common/assetamount.ts:104](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | TI |

**Returns:** *void*

___

###  addOutput

▸ **addOutput**(`output`: TO): *void*

*Defined in [src/common/assetamount.ts:108](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | TO |

**Returns:** *void*

___

###  assetExists

▸ **assetExists**(`assetHexStr`: string): *boolean*

*Defined in [src/common/assetamount.ts:136](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *boolean*

___

###  canComplete

▸ **canComplete**(): *boolean*

*Defined in [src/common/assetamount.ts:156](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L156)*

**Returns:** *boolean*

___

###  getAllOutputs

▸ **getAllOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:152](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L152)*

**Returns:** *Array‹TO›*

___

###  getAmounts

▸ **getAmounts**(): *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

*Defined in [src/common/assetamount.ts:116](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L116)*

**Returns:** *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

___

###  getAssetAmount

▸ **getAssetAmount**(`assetHexStr`: string): *[AssetAmount](common_assetamount.assetamount.md)*

*Defined in [src/common/assetamount.ts:132](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *[AssetAmount](common_assetamount.assetamount.md)*

___

###  getChangeAddresses

▸ **getChangeAddresses**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:128](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L128)*

**Returns:** *Array‹Buffer›*

___

###  getChangeOutputs

▸ **getChangeOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:148](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L148)*

**Returns:** *Array‹TO›*

___

###  getDestinations

▸ **getDestinations**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:120](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L120)*

**Returns:** *Array‹Buffer›*

___

###  getInputs

▸ **getInputs**(): *Array‹TI›*

*Defined in [src/common/assetamount.ts:140](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L140)*

**Returns:** *Array‹TI›*

___

###  getOutputs

▸ **getOutputs**(): *Array‹TO›*

*Defined in [src/common/assetamount.ts:144](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L144)*

**Returns:** *Array‹TO›*

___

###  getSenders

▸ **getSenders**(): *Array‹Buffer›*

*Defined in [src/common/assetamount.ts:124](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L124)*

**Returns:** *Array‹Buffer›*
