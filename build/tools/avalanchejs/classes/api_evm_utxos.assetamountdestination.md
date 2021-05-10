[avalanche](../README.md) › [API-EVM-UTXOs](../modules/api_evm_utxos.md) › [AssetAmountDestination](api_evm_utxos.assetamountdestination.md)

# Class: AssetAmountDestination

## Hierarchy

* [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md)‹[TransferableOutput](api_evm_outputs.transferableoutput.md), [TransferableInput](api_evm_inputs.transferableinput.md)›

  ↳ **AssetAmountDestination**

## Index

### Constructors

* [constructor](api_evm_utxos.assetamountdestination.md#constructor)

### Properties

* [amountkey](api_evm_utxos.assetamountdestination.md#protected-amountkey)
* [amounts](api_evm_utxos.assetamountdestination.md#protected-amounts)
* [change](api_evm_utxos.assetamountdestination.md#protected-change)
* [changeAddresses](api_evm_utxos.assetamountdestination.md#protected-changeaddresses)
* [destinations](api_evm_utxos.assetamountdestination.md#protected-destinations)
* [inputs](api_evm_utxos.assetamountdestination.md#protected-inputs)
* [outputs](api_evm_utxos.assetamountdestination.md#protected-outputs)
* [senders](api_evm_utxos.assetamountdestination.md#protected-senders)

### Methods

* [addAssetAmount](api_evm_utxos.assetamountdestination.md#addassetamount)
* [addChange](api_evm_utxos.assetamountdestination.md#addchange)
* [addInput](api_evm_utxos.assetamountdestination.md#addinput)
* [addOutput](api_evm_utxos.assetamountdestination.md#addoutput)
* [assetExists](api_evm_utxos.assetamountdestination.md#assetexists)
* [canComplete](api_evm_utxos.assetamountdestination.md#cancomplete)
* [getAllOutputs](api_evm_utxos.assetamountdestination.md#getalloutputs)
* [getAmounts](api_evm_utxos.assetamountdestination.md#getamounts)
* [getAssetAmount](api_evm_utxos.assetamountdestination.md#getassetamount)
* [getChangeAddresses](api_evm_utxos.assetamountdestination.md#getchangeaddresses)
* [getChangeOutputs](api_evm_utxos.assetamountdestination.md#getchangeoutputs)
* [getDestinations](api_evm_utxos.assetamountdestination.md#getdestinations)
* [getInputs](api_evm_utxos.assetamountdestination.md#getinputs)
* [getOutputs](api_evm_utxos.assetamountdestination.md#getoutputs)
* [getSenders](api_evm_utxos.assetamountdestination.md#getsenders)

## Constructors

###  constructor

\+ **new AssetAmountDestination**(`destinations`: Array‹Buffer›, `senders`: Array‹Buffer›, `changeAddresses`: Array‹Buffer›): *[AssetAmountDestination](api_evm_utxos.assetamountdestination.md)*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[constructor](common_assetamount.standardassetamountdestination.md#constructor)*

*Defined in [src/common/assetamount.ts:187](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L187)*

**Parameters:**

Name | Type |
------ | ------ |
`destinations` | Array‹Buffer› |
`senders` | Array‹Buffer› |
`changeAddresses` | Array‹Buffer› |

**Returns:** *[AssetAmountDestination](api_evm_utxos.assetamountdestination.md)*

## Properties

### `Protected` amountkey

• **amountkey**: *object*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[amountkey](common_assetamount.standardassetamountdestination.md#protected-amountkey)*

*Defined in [src/common/assetamount.ts:114](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L114)*

___

### `Protected` amounts

• **amounts**: *Array‹[AssetAmount](common_assetamount.assetamount.md)›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[amounts](common_assetamount.standardassetamountdestination.md#protected-amounts)*

*Defined in [src/common/assetamount.ts:110](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L110)*

___

### `Protected` change

• **change**: *Array‹[TransferableOutput](api_evm_outputs.transferableoutput.md)›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[change](common_assetamount.standardassetamountdestination.md#protected-change)*

*Defined in [src/common/assetamount.ts:117](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L117)*

___

### `Protected` changeAddresses

• **changeAddresses**: *Array‹Buffer›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[changeAddresses](common_assetamount.standardassetamountdestination.md#protected-changeaddresses)*

*Defined in [src/common/assetamount.ts:113](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L113)*

___

### `Protected` destinations

• **destinations**: *Array‹Buffer›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[destinations](common_assetamount.standardassetamountdestination.md#protected-destinations)*

*Defined in [src/common/assetamount.ts:111](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L111)*

___

### `Protected` inputs

• **inputs**: *Array‹[TransferableInput](api_evm_inputs.transferableinput.md)›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[inputs](common_assetamount.standardassetamountdestination.md#protected-inputs)*

*Defined in [src/common/assetamount.ts:115](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L115)*

___

### `Protected` outputs

• **outputs**: *Array‹[TransferableOutput](api_evm_outputs.transferableoutput.md)›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[outputs](common_assetamount.standardassetamountdestination.md#protected-outputs)*

*Defined in [src/common/assetamount.ts:116](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L116)*

___

### `Protected` senders

• **senders**: *Array‹Buffer›* = []

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[senders](common_assetamount.standardassetamountdestination.md#protected-senders)*

*Defined in [src/common/assetamount.ts:112](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L112)*

## Methods

###  addAssetAmount

▸ **addAssetAmount**(`assetID`: Buffer, `amount`: BN, `burn`: BN): *void*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[addAssetAmount](common_assetamount.standardassetamountdestination.md#addassetamount)*

*Defined in [src/common/assetamount.ts:121](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`assetID` | Buffer |
`amount` | BN |
`burn` | BN |

**Returns:** *void*

___

###  addChange

▸ **addChange**(`output`: [TransferableOutput](api_evm_outputs.transferableoutput.md)): *void*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[addChange](common_assetamount.standardassetamountdestination.md#addchange)*

*Defined in [src/common/assetamount.ts:135](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [TransferableOutput](api_evm_outputs.transferableoutput.md) |

**Returns:** *void*

___

###  addInput

▸ **addInput**(`input`: [TransferableInput](api_evm_inputs.transferableinput.md)): *void*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[addInput](common_assetamount.standardassetamountdestination.md#addinput)*

*Defined in [src/common/assetamount.ts:127](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | [TransferableInput](api_evm_inputs.transferableinput.md) |

**Returns:** *void*

___

###  addOutput

▸ **addOutput**(`output`: [TransferableOutput](api_evm_outputs.transferableoutput.md)): *void*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[addOutput](common_assetamount.standardassetamountdestination.md#addoutput)*

*Defined in [src/common/assetamount.ts:131](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`output` | [TransferableOutput](api_evm_outputs.transferableoutput.md) |

**Returns:** *void*

___

###  assetExists

▸ **assetExists**(`assetHexStr`: string): *boolean*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[assetExists](common_assetamount.standardassetamountdestination.md#assetexists)*

*Defined in [src/common/assetamount.ts:159](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *boolean*

___

###  canComplete

▸ **canComplete**(): *boolean*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[canComplete](common_assetamount.standardassetamountdestination.md#cancomplete)*

*Defined in [src/common/assetamount.ts:179](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L179)*

**Returns:** *boolean*

___

###  getAllOutputs

▸ **getAllOutputs**(): *Array‹[TransferableOutput](api_evm_outputs.transferableoutput.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getAllOutputs](common_assetamount.standardassetamountdestination.md#getalloutputs)*

*Defined in [src/common/assetamount.ts:175](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L175)*

**Returns:** *Array‹[TransferableOutput](api_evm_outputs.transferableoutput.md)›*

___

###  getAmounts

▸ **getAmounts**(): *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getAmounts](common_assetamount.standardassetamountdestination.md#getamounts)*

*Defined in [src/common/assetamount.ts:139](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L139)*

**Returns:** *Array‹[AssetAmount](common_assetamount.assetamount.md)›*

___

###  getAssetAmount

▸ **getAssetAmount**(`assetHexStr`: string): *[AssetAmount](common_assetamount.assetamount.md)*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getAssetAmount](common_assetamount.standardassetamountdestination.md#getassetamount)*

*Defined in [src/common/assetamount.ts:155](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`assetHexStr` | string |

**Returns:** *[AssetAmount](common_assetamount.assetamount.md)*

___

###  getChangeAddresses

▸ **getChangeAddresses**(): *Array‹Buffer›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getChangeAddresses](common_assetamount.standardassetamountdestination.md#getchangeaddresses)*

*Defined in [src/common/assetamount.ts:151](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L151)*

**Returns:** *Array‹Buffer›*

___

###  getChangeOutputs

▸ **getChangeOutputs**(): *Array‹[TransferableOutput](api_evm_outputs.transferableoutput.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getChangeOutputs](common_assetamount.standardassetamountdestination.md#getchangeoutputs)*

*Defined in [src/common/assetamount.ts:171](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L171)*

**Returns:** *Array‹[TransferableOutput](api_evm_outputs.transferableoutput.md)›*

___

###  getDestinations

▸ **getDestinations**(): *Array‹Buffer›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getDestinations](common_assetamount.standardassetamountdestination.md#getdestinations)*

*Defined in [src/common/assetamount.ts:143](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L143)*

**Returns:** *Array‹Buffer›*

___

###  getInputs

▸ **getInputs**(): *Array‹[TransferableInput](api_evm_inputs.transferableinput.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getInputs](common_assetamount.standardassetamountdestination.md#getinputs)*

*Defined in [src/common/assetamount.ts:163](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L163)*

**Returns:** *Array‹[TransferableInput](api_evm_inputs.transferableinput.md)›*

___

###  getOutputs

▸ **getOutputs**(): *Array‹[TransferableOutput](api_evm_outputs.transferableoutput.md)›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getOutputs](common_assetamount.standardassetamountdestination.md#getoutputs)*

*Defined in [src/common/assetamount.ts:167](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L167)*

**Returns:** *Array‹[TransferableOutput](api_evm_outputs.transferableoutput.md)›*

___

###  getSenders

▸ **getSenders**(): *Array‹Buffer›*

*Inherited from [StandardAssetAmountDestination](common_assetamount.standardassetamountdestination.md).[getSenders](common_assetamount.standardassetamountdestination.md#getsenders)*

*Defined in [src/common/assetamount.ts:147](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/common/assetamount.ts#L147)*

**Returns:** *Array‹Buffer›*
