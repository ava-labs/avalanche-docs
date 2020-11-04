[avalanche](../README.md) › [API-PlatformVM-UTXOs](../modules/api_platformvm_utxos.md) › [AssetAmountDestination](api_platformvm_utxos.assetamountdestination.md)

# Class: AssetAmountDestination

## Hierarchy

* [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md)‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md), [TransferableInput](api_platformvm_inputs.transferableinput.md)›

  ↳ **AssetAmountDestination**

## Index

### Constructors

* [constructor](api_platformvm_utxos.assetamountdestination.md#constructor)

### Properties

* [amountkey](api_platformvm_utxos.assetamountdestination.md#protected-amountkey)
* [amounts](api_platformvm_utxos.assetamountdestination.md#protected-amounts)
* [change](api_platformvm_utxos.assetamountdestination.md#protected-change)
* [changeAddresses](api_platformvm_utxos.assetamountdestination.md#protected-changeaddresses)
* [destinations](api_platformvm_utxos.assetamountdestination.md#protected-destinations)
* [inputs](api_platformvm_utxos.assetamountdestination.md#protected-inputs)
* [outputs](api_platformvm_utxos.assetamountdestination.md#protected-outputs)
* [senders](api_platformvm_utxos.assetamountdestination.md#protected-senders)

### Methods

* [addAssetAmount](api_platformvm_utxos.assetamountdestination.md#addassetamount)
* [addChange](api_platformvm_utxos.assetamountdestination.md#addchange)
* [addInput](api_platformvm_utxos.assetamountdestination.md#addinput)
* [addOutput](api_platformvm_utxos.assetamountdestination.md#addoutput)
* [assetExists](api_platformvm_utxos.assetamountdestination.md#assetexists)
* [canComplete](api_platformvm_utxos.assetamountdestination.md#cancomplete)
* [getAllOutputs](api_platformvm_utxos.assetamountdestination.md#getalloutputs)
* [getAmounts](api_platformvm_utxos.assetamountdestination.md#getamounts)
* [getAssetAmount](api_platformvm_utxos.assetamountdestination.md#getassetamount)
* [getChangeAddresses](api_platformvm_utxos.assetamountdestination.md#getchangeaddresses)
* [getChangeOutputs](api_platformvm_utxos.assetamountdestination.md#getchangeoutputs)
* [getDestinations](api_platformvm_utxos.assetamountdestination.md#getdestinations)
* [getInputs](api_platformvm_utxos.assetamountdestination.md#getinputs)
* [getOutputs](api_platformvm_utxos.assetamountdestination.md#getoutputs)
* [getSenders](api_platformvm_utxos.assetamountdestination.md#getsenders)

## Constructors

###  constructor

\+ **new AssetAmountDestination**(`destinations`: Array‹Buffer›, `senders`: Array‹Buffer›, `changeAddresses`: Array‹Buffer›): *[AssetAmountDestination](api_platformvm_utxos.assetamountdestination.md)*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[constructor](common_assetamount.standardassetamountdestination.md#constructor)*

*Defined in [src/common/assetamount.ts:164](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`destinations` | Array‹Buffer› |
`senders` | Array‹Buffer› |
`changeAddresses` | Array‹Buffer› |

**Returns:** *[AssetAmountDestination](api_platformvm_utxos.assetamountdestination.md)*

## Properties

### `Protected` amountkey

• **amountkey**: *object*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[amountkey](common_assetamount.standardassetamountdestination.md#protected-amountkey)*

*Defined in [src/common/assetamount.ts:93](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L93)*

___

### `Protected` amounts

• **amounts**: *Array‹[AssetAmount](common_assetamount.assetamount.md)›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[amounts](common_assetamount.standardassetamountdestination.md#protected-amounts)*

*Defined in [src/common/assetamount.ts:89](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L89)*

___

### `Protected` change

• **change**: *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[change](common_assetamount.standardassetamountdestination.md#protected-change)*

*Defined in [src/common/assetamount.ts:96](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L96)*

___

### `Protected` changeAddresses

• **changeAddresses**: *Array‹Buffer›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[changeAddresses](common_assetamount.standardassetamountdestination.md#protected-changeaddresses)*

*Defined in [src/common/assetamount.ts:92](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L92)*

___

### `Protected` destinations

• **destinations**: *Array‹Buffer›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[destinations](common_assetamount.standardassetamountdestination.md#protected-destinations)*

*Defined in [src/common/assetamount.ts:90](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L90)*

___

### `Protected` inputs

• **inputs**: *Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[inputs](common_assetamount.standardassetamountdestination.md#protected-inputs)*

*Defined in [src/common/assetamount.ts:94](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L94)*

___

### `Protected` outputs

• **outputs**: *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[outputs](common_assetamount.standardassetamountdestination.md#protected-outputs)*

*Defined in [src/common/assetamount.ts:95](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L95)*

___

### `Protected` senders

• **senders**: *Array‹Buffer›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[senders](common_assetamount.standardassetamountdestination.md#protected-senders)*

*Defined in [src/common/assetamount.ts:91](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L91)*

## Methods

###  addAssetAmount

▸ **addAssetAmount**(`assetID`: Buffer, `amount`: BN, `burn`: BN): *void*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[addAssetAmount](common_assetamount.standardassetamountdestination.md#addassetamount)*

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

▸ **addChange**(`output`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)): *void*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[addChange](common_assetamount.standardassetamountdestination.md#addchange)*

*Defined in [src/common/assetamount.ts:112](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md) |

**Returns:** *void*

___

###  addInput

▸ **addInput**(`input`: [TransferableInput](api_platformvm_inputs.transferableinput.md)): *void*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[addInput](common_assetamount.standardassetamountdestination.md#addinput)*

*Defined in [src/common/assetamount.ts:104](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | [TransferableInput](api_platformvm_inputs.transferableinput.md) |

**Returns:** *void*

___

###  addOutput

▸ **addOutput**(`output`: [TransferableOutput](api_platformvm_outputs.transferableoutput.md)): *void*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[addOutput](common_assetamount.standardassetamountdestination.md#addoutput)*

*Defined in [src/common/assetamount.ts:108](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [TransferableOutput](api_platformvm_outputs.transferableoutput.md) |

**Returns:** *void*

___

###  assetExists

▸ **assetExists**(`assetHexStr`: string): *boolean*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[assetExists](common_assetamount.standardassetamountdestination.md#assetexists)*

*Defined in [src/common/assetamount.ts:136](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *boolean*

___

###  canComplete

▸ **canComplete**(): *boolean*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[canComplete](common_assetamount.standardassetamountdestination.md#cancomplete)*

*Defined in [src/common/assetamount.ts:156](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L156)*

**Returns:** *boolean*

___

###  getAllOutputs

▸ **getAllOutputs**(): *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getAllOutputs](common_assetamount.standardassetamountdestination.md#getalloutputs)*

*Defined in [src/common/assetamount.ts:152](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L152)*

**Returns:** *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

___

###  getAmounts

▸ **getAmounts**(): *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getAmounts](common_assetamount.standardassetamountdestination.md#getamounts)*

*Defined in [src/common/assetamount.ts:116](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L116)*

**Returns:** *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

___

###  getAssetAmount

▸ **getAssetAmount**(`assetHexStr`: string): *[AssetAmount](common_assetamount.assetamount.md)*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getAssetAmount](common_assetamount.standardassetamountdestination.md#getassetamount)*

*Defined in [src/common/assetamount.ts:132](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *[AssetAmount](common_assetamount.assetamount.md)*

___

###  getChangeAddresses

▸ **getChangeAddresses**(): *Array‹Buffer›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getChangeAddresses](common_assetamount.standardassetamountdestination.md#getchangeaddresses)*

*Defined in [src/common/assetamount.ts:128](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L128)*

**Returns:** *Array‹Buffer›*

___

###  getChangeOutputs

▸ **getChangeOutputs**(): *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getChangeOutputs](common_assetamount.standardassetamountdestination.md#getchangeoutputs)*

*Defined in [src/common/assetamount.ts:148](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L148)*

**Returns:** *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

___

###  getDestinations

▸ **getDestinations**(): *Array‹Buffer›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getDestinations](common_assetamount.standardassetamountdestination.md#getdestinations)*

*Defined in [src/common/assetamount.ts:120](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L120)*

**Returns:** *Array‹Buffer›*

___

###  getInputs

▸ **getInputs**(): *Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getInputs](common_assetamount.standardassetamountdestination.md#getinputs)*

*Defined in [src/common/assetamount.ts:140](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L140)*

**Returns:** *Array‹[TransferableInput](api_platformvm_inputs.transferableinput.md)›*

___

###  getOutputs

▸ **getOutputs**(): *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getOutputs](common_assetamount.standardassetamountdestination.md#getoutputs)*

*Defined in [src/common/assetamount.ts:144](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L144)*

**Returns:** *Array‹[TransferableOutput](api_platformvm_outputs.transferableoutput.md)›*

___

###  getSenders

▸ **getSenders**(): *Array‹Buffer›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getSenders](common_assetamount.standardassetamountdestination.md#getsenders)*

*Defined in [src/common/assetamount.ts:124](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/assetamount.ts#L124)*

**Returns:** *Array‹Buffer›*
