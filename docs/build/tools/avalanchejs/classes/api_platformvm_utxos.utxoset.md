[avalanche](../README.md) › [API-PlatformVM-UTXOs](../modules/api_platformvm_utxos.md) › [UTXOSet](api_platformvm_utxos.utxoset.md)

# Class: UTXOSet

Class representing a set of [UTXO](api_platformvm_utxos.utxo.md)s.

## Hierarchy

  ↳ [StandardUTXOSet](common_utxos.standardutxoset.md)‹[UTXO](api_platformvm_utxos.utxo.md)›

  ↳ **UTXOSet**

## Index

### Properties

* [_codecID](api_platformvm_utxos.utxoset.md#protected-_codecid)
* [_typeID](api_platformvm_utxos.utxoset.md#protected-_typeid)
* [_typeName](api_platformvm_utxos.utxoset.md#protected-_typename)
* [addressUTXOs](api_platformvm_utxos.utxoset.md#protected-addressutxos)
* [utxos](api_platformvm_utxos.utxoset.md#protected-utxos)

### Methods

* [_feeCheck](api_platformvm_utxos.utxoset.md#_feecheck)
* [add](api_platformvm_utxos.utxoset.md#add)
* [addArray](api_platformvm_utxos.utxoset.md#addarray)
* [buildAddDelegatorTx](api_platformvm_utxos.utxoset.md#buildadddelegatortx)
* [buildAddValidatorTx](api_platformvm_utxos.utxoset.md#buildaddvalidatortx)
* [buildBaseTx](api_platformvm_utxos.utxoset.md#buildbasetx)
* [buildCreateChainTx](api_platformvm_utxos.utxoset.md#buildcreatechaintx)
* [buildCreateSubnetTx](api_platformvm_utxos.utxoset.md#buildcreatesubnettx)
* [buildExportTx](api_platformvm_utxos.utxoset.md#buildexporttx)
* [buildImportTx](api_platformvm_utxos.utxoset.md#buildimporttx)
* [clone](api_platformvm_utxos.utxoset.md#clone)
* [create](api_platformvm_utxos.utxoset.md#create)
* [deserialize](api_platformvm_utxos.utxoset.md#deserialize)
* [difference](api_platformvm_utxos.utxoset.md#difference)
* [filter](api_platformvm_utxos.utxoset.md#filter)
* [getAddresses](api_platformvm_utxos.utxoset.md#getaddresses)
* [getAllUTXOStrings](api_platformvm_utxos.utxoset.md#getallutxostrings)
* [getAllUTXOs](api_platformvm_utxos.utxoset.md#getallutxos)
* [getAssetIDs](api_platformvm_utxos.utxoset.md#getassetids)
* [getBalance](api_platformvm_utxos.utxoset.md#getbalance)
* [getCodecID](api_platformvm_utxos.utxoset.md#getcodecid)
* [getConsumableUXTO](api_platformvm_utxos.utxoset.md#getconsumableuxto)
* [getMinimumSpendable](api_platformvm_utxos.utxoset.md#getminimumspendable)
* [getTypeID](api_platformvm_utxos.utxoset.md#gettypeid)
* [getTypeName](api_platformvm_utxos.utxoset.md#gettypename)
* [getUTXO](api_platformvm_utxos.utxoset.md#getutxo)
* [getUTXOIDs](api_platformvm_utxos.utxoset.md#getutxoids)
* [includes](api_platformvm_utxos.utxoset.md#includes)
* [intersection](api_platformvm_utxos.utxoset.md#intersection)
* [merge](api_platformvm_utxos.utxoset.md#merge)
* [mergeByRule](api_platformvm_utxos.utxoset.md#mergebyrule)
* [parseUTXO](api_platformvm_utxos.utxoset.md#parseutxo)
* [remove](api_platformvm_utxos.utxoset.md#remove)
* [removeArray](api_platformvm_utxos.utxoset.md#removearray)
* [sanitizeObject](api_platformvm_utxos.utxoset.md#sanitizeobject)
* [serialize](api_platformvm_utxos.utxoset.md#serialize)
* [symDifference](api_platformvm_utxos.utxoset.md#symdifference)
* [union](api_platformvm_utxos.utxoset.md#union)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[_typeID](common_utxos.standardutxoset.md#protected-_typeid)*

*Defined in [src/apis/platformvm/utxos.ts:142](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L142)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UTXOSet"

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[_typeName](common_utxos.standardutxoset.md#protected-_typename)*

*Defined in [src/apis/platformvm/utxos.ts:141](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L141)*

___

### `Protected` addressUTXOs

• **addressUTXOs**: *object*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[addressUTXOs](common_utxos.standardutxoset.md#protected-addressutxos)*

*Defined in [src/common/utxos.ts:265](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L265)*

#### Type declaration:

* \[ **address**: *string*\]: object

* \[ **utxoid**: *string*\]: BN

___

### `Protected` utxos

• **utxos**: *object*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[utxos](common_utxos.standardutxoset.md#protected-utxos)*

*Defined in [src/common/utxos.ts:264](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L264)*

#### Type declaration:

* \[ **utxoid**: *string*\]: [UTXO](api_platformvm_utxos.utxo.md)

## Methods

###  _feeCheck

▸ **_feeCheck**(`fee`: BN, `feeAssetID`: Buffer): *boolean*

*Defined in [src/apis/platformvm/utxos.ts:218](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L218)*

**Parameters:**

Name | Type |
------ | ------ |
`fee` | BN |
`feeAssetID` | Buffer |

**Returns:** *boolean*

___

###  add

▸ **add**(`utxo`: [UTXO](api_platformvm_utxos.utxo.md) | string, `overwrite`: boolean): *[UTXO](api_platformvm_utxos.utxo.md)*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[add](common_utxos.standardutxoset.md#add)*

*Defined in [src/common/utxos.ts:299](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L299)*

Adds a [StandardUTXO](common_utxos.standardutxo.md) to the StandardUTXOSet.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxo` | [UTXO](api_platformvm_utxos.utxo.md) &#124; string | - | Either a [StandardUTXO](common_utxos.standardutxo.md) an cb58 serialized string representing a StandardUTXO |
`overwrite` | boolean | false | If true, if the UTXOID already exists, overwrite it... default false  |

**Returns:** *[UTXO](api_platformvm_utxos.utxo.md)*

A [StandardUTXO](common_utxos.standardutxo.md) if one was added and undefined if nothing was added.

___

###  addArray

▸ **addArray**(`utxos`: string[] | [UTXO](api_platformvm_utxos.utxo.md)[], `overwrite`: boolean): *[StandardUTXO](common_utxos.standardutxo.md)[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[addArray](common_utxos.standardutxoset.md#addarray)*

*Defined in [src/common/utxos.ts:337](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L337)*

Adds an array of [StandardUTXO](common_utxos.standardutxo.md)s to the [StandardUTXOSet](common_utxos.standardutxoset.md).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxos` | string[] &#124; [UTXO](api_platformvm_utxos.utxo.md)[] | - | - |
`overwrite` | boolean | false | If true, if the UTXOID already exists, overwrite it... default false  |

**Returns:** *[StandardUTXO](common_utxos.standardutxo.md)[]*

An array of StandardUTXOs which were added.

___

###  buildAddDelegatorTx

▸ **buildAddDelegatorTx**(`networkID`: number, `blockchainID`: Buffer, `avaxAssetID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `nodeID`: Buffer, `startTime`: BN, `endTime`: BN, `stakeAmount`: BN, `rewardLocktime`: BN, `rewardThreshold`: number, `rewardAddresses`: Buffer[], `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN): *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

*Defined in [src/apis/platformvm/utxos.ts:972](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L972)*

Class representing an unsigned [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md) transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | - | Blockchainid, default undefined |
`avaxAssetID` | Buffer | - | [Buffer](https://github.com/feross/buffer) of the asset ID for AVAX |
`toAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) recieves the stake at the end of the staking period |
`fromAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who pays the fees and the stake |
`changeAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who gets the change leftover from the staking payment |
`nodeID` | Buffer | - | The node ID of the validator being added. |
`startTime` | BN | - | The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | - | The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`stakeAmount` | BN | - | A [BN](https://github.com/indutny/bn.js/) for the amount of stake to be delegated in nAVAX. |
`rewardLocktime` | BN | - | The locktime field created in the resulting reward outputs |
`rewardThreshold` | number | - | The number of signatures required to spend the funds in the resultant reward UTXO |
`rewardAddresses` | Buffer[] | - | The addresses the validator reward goes. |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildAddValidatorTx

▸ **buildAddValidatorTx**(`networkID`: number, `blockchainID`: Buffer, `avaxAssetID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `nodeID`: Buffer, `startTime`: BN, `endTime`: BN, `stakeAmount`: BN, `rewardLocktime`: BN, `rewardThreshold`: number, `rewardAddresses`: Buffer[], `delegationFee`: number, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN): *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

*Defined in [src/apis/platformvm/utxos.ts:1079](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L1079)*

Class representing an unsigned [AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md) transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | NetworkID, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | - | BlockchainID, default undefined |
`avaxAssetID` | Buffer | - | [Buffer](https://github.com/feross/buffer) of the asset ID for AVAX |
`toAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) recieves the stake at the end of the staking period |
`fromAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who pays the fees and the stake |
`changeAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who gets the change leftover from the staking payment |
`nodeID` | Buffer | - | The node ID of the validator being added. |
`startTime` | BN | - | The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | - | The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`stakeAmount` | BN | - | A [BN](https://github.com/indutny/bn.js/) for the amount of stake to be delegated in nAVAX. |
`rewardLocktime` | BN | - | The locktime field created in the resulting reward outputs |
`rewardThreshold` | number | - | The number of signatures required to spend the funds in the resultant reward UTXO |
`rewardAddresses` | Buffer[] | - | The addresses the validator reward goes. |
`delegationFee` | number | - | A number for the percentage of reward to be given to the validator when someone delegates to them. Must be between 0 and 100. |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildBaseTx

▸ **buildBaseTx**(`networkID`: number, `blockchainID`: Buffer, `amount`: BN, `assetID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

*Defined in [src/apis/platformvm/utxos.ts:566](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L566)*

Creates an [UnsignedTx](api_evm_transactions.unsignedtx.md) wrapping a [BaseTx](api_avm_basetx.basetx.md). For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) wrapping a [BaseTx](api_avm_basetx.basetx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s and [TransferableOutput](api_evm_outputs.transferableoutput.md)s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`amount` | BN | - | The amount of the asset to be spent in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/). |
`assetID` | Buffer | - | [Buffer](https://github.com/feross/buffer) of the asset ID for the UTXO |
`toAddresses` | Buffer[] | - | The addresses to send the funds |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Buffer[] | undefined | Optional. The addresses that can spend the change remaining from the spent UTXOs. Default: toAddresses |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. Default: assetID |
`memo` | Buffer | undefined | Optional. Contains arbitrary data, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildCreateChainTx

▸ **buildCreateChainTx**(`networkID`: number, `blockchainID`: Buffer, `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `subnetID`: string | Buffer, `chainName`: string, `vmID`: string, `fxIDs`: string[], `genesisData`: [GenesisData](api_avm_genesisdata.genesisdata.md), `subnetAuth`: [SubnetAuth](api_platformvm_subnetauth.subnetauth.md), `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN): *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

*Defined in [src/apis/platformvm/utxos.ts:1254](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L1254)*

Build an unsigned [CreateChainTx](api_platformvm_createchaintx.createchaintx.md).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | - | Blockchainid, default undefined |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Buffer[] | - | The addresses that can spend the change remaining from the spent UTXOs. |
`subnetID` | string &#124; Buffer | undefined | Optional ID of the Subnet that validates this blockchain |
`chainName` | string | undefined | Optional A human readable name for the chain; need not be unique |
`vmID` | string | undefined | Optional ID of the VM running on the new chain |
`fxIDs` | string[] | undefined | Optional IDs of the feature extensions running on the new chain |
`genesisData` | [GenesisData](api_avm_genesisdata.genesisdata.md) | undefined | Optional Byte representation of genesis state of the new chain |
`subnetAuth` | [SubnetAuth](api_platformvm_subnetauth.subnetauth.md) | undefined | Optional Specifies the addresses whose signatures will be provided to demonstrate that the owners of a subnet approve something |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

An unsigned CreateChainTx created from the passed in parameters.

___

###  buildCreateSubnetTx

▸ **buildCreateSubnetTx**(`networkID`: number, `blockchainID`: Buffer, `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `subnetOwnerAddresses`: Buffer[], `subnetOwnerThreshold`: number, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN): *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

*Defined in [src/apis/platformvm/utxos.ts:1185](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L1185)*

Class representing an unsigned [CreateSubnetTx](api_platformvm_createsubnettx.createsubnettx.md) transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | DefaultNetworkID | Networkid, [DefaultNetworkID](../modules/utils_constants.md#const-defaultnetworkid) |
`blockchainID` | Buffer | - | Blockchainid, default undefined |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Buffer[] | - | The addresses that can spend the change remaining from the spent UTXOs. |
`subnetOwnerAddresses` | Buffer[] | - | An array of [Buffer](https://github.com/feross/buffer) for the addresses to add to a subnet |
`subnetOwnerThreshold` | number | - | The number of owners's signatures required to add a validator to the network |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildExportTx

▸ **buildExportTx**(`networkID`: number, `blockchainID`: Buffer, `amount`: BN, `avaxAssetID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `destinationChain`: Buffer, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

*Defined in [src/apis/platformvm/utxos.ts:799](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L799)*

Creates an unsigned ExportTx transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`amount` | BN | - | The amount being exported as a [BN](https://github.com/indutny/bn.js/) |
`avaxAssetID` | Buffer | - | [Buffer](https://github.com/feross/buffer) of the asset ID for AVAX |
`toAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who recieves the AVAX |
`fromAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who owns the AVAX |
`changeAddresses` | Buffer[] | undefined | An array of addresses as [Buffer](https://github.com/feross/buffer) who gets the change leftover of the AVAX |
`destinationChain` | Buffer | undefined | Optional. A [Buffer](https://github.com/feross/buffer) for the chainid where to send the asset. |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildImportTx

▸ **buildImportTx**(`networkID`: number, `blockchainID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `atomics`: [UTXO](api_platformvm_utxos.utxo.md)[], `sourceChain`: Buffer, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

*Defined in [src/apis/platformvm/utxos.ts:655](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L655)*

Creates an unsigned ImportTx transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`toAddresses` | Buffer[] | - | The addresses to send the funds |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Buffer[] | - | Optional. The addresses that can spend the change remaining from the spent UTXOs. Default: toAddresses |
`atomics` | [UTXO](api_platformvm_utxos.utxo.md)[] | - | - |
`sourceChain` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) for the chainid where the imports are coming from. |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/). Fee will come from the inputs first, if they can. |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO |

**Returns:** *[UnsignedTx](api_platformvm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  clone

▸ **clone**(): *this*

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[clone](common_utxos.standardutxoset.md#abstract-clone)*

*Defined in [src/apis/platformvm/utxos.ts:211](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L211)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[create](common_utxos.standardutxoset.md#abstract-create)*

*Defined in [src/apis/platformvm/utxos.ts:207](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/platformvm/utxos.ts:146](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L146)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  difference

▸ **difference**(`utxoset`: this): *this*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[difference](common_utxos.standardutxoset.md#difference)*

*Defined in [src/common/utxos.ts:620](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L620)*

Set difference between this set and a parameter.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxoset` | this | The set to difference  |

**Returns:** *this*

A new StandardUTXOSet containing the difference

___

###  filter

▸ **filter**(`args`: any[], `lambda`: function): *this*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[filter](common_utxos.standardutxoset.md#filter)*

*Defined in [src/common/utxos.ts:565](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L565)*

**Parameters:**

▪ **args**: *any[]*

▪ **lambda**: *function*

▸ (`utxo`: [UTXO](api_platformvm_utxos.utxo.md), ...`largs`: any[]): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`utxo` | [UTXO](api_platformvm_utxos.utxo.md) |
`...largs` | any[] |

**Returns:** *this*

___

###  getAddresses

▸ **getAddresses**(): *Buffer[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getAddresses](common_utxos.standardutxoset.md#getaddresses)*

*Defined in [src/common/utxos.ts:496](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L496)*

Gets the addresses in the [StandardUTXOSet](common_utxos.standardutxoset.md) and returns an array of [Buffer](https://github.com/feross/buffer).

**Returns:** *Buffer[]*

___

###  getAllUTXOStrings

▸ **getAllUTXOStrings**(`utxoids`: string[]): *string[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getAllUTXOStrings](common_utxos.standardutxoset.md#getallutxostrings)*

*Defined in [src/common/utxos.ts:439](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L439)*

Gets all the [StandardUTXO](common_utxos.standardutxo.md)s as strings, optionally that match with UTXOIDs in an array.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoids` | string[] | undefined | An optional array of UTXOIDs, returns all [StandardUTXO](common_utxos.standardutxo.md)s if not provided  |

**Returns:** *string[]*

An array of [StandardUTXO](common_utxos.standardutxo.md)s as cb58 serialized strings.

___

###  getAllUTXOs

▸ **getAllUTXOs**(`utxoids`: string[]): *[UTXO](api_platformvm_utxos.utxo.md)[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getAllUTXOs](common_utxos.standardutxoset.md#getallutxos)*

*Defined in [src/common/utxos.ts:420](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L420)*

Gets all the [StandardUTXO](common_utxos.standardutxo.md)s, optionally that match with UTXOIDs in an array

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoids` | string[] | undefined | An optional array of UTXOIDs, returns all [StandardUTXO](common_utxos.standardutxo.md)s if not provided  |

**Returns:** *[UTXO](api_platformvm_utxos.utxo.md)[]*

An array of [StandardUTXO](common_utxos.standardutxo.md)s.

___

###  getAssetIDs

▸ **getAssetIDs**(`addresses`: Buffer[]): *Buffer[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getAssetIDs](common_utxos.standardutxoset.md#getassetids)*

*Defined in [src/common/utxos.ts:543](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L543)*

Gets all the Asset IDs, optionally that match with Asset IDs in an array

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Buffer[] | undefined |

**Returns:** *Buffer[]*

An array of [Buffer](https://github.com/feross/buffer) representing the Asset IDs.

___

###  getBalance

▸ **getBalance**(`addresses`: Buffer[], `assetID`: Buffer | string, `asOf`: BN): *BN*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getBalance](common_utxos.standardutxoset.md#getbalance)*

*Defined in [src/common/utxos.ts:508](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L508)*

Returns the balance of a set of addresses in the StandardUTXOSet.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`addresses` | Buffer[] | - | An array of addresses |
`assetID` | Buffer &#124; string | - | Either a [Buffer](https://github.com/feross/buffer) or an cb58 serialized representation of an AssetID |
`asOf` | BN | undefined | The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *BN*

Returns the total balance as a [BN](https://github.com/indutny/bn.js/).

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getConsumableUXTO

▸ **getConsumableUXTO**(`asOf`: BN, `stakeable`: boolean): *[UTXO](api_platformvm_utxos.utxo.md)[]*

*Defined in [src/apis/platformvm/utxos.ts:227](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L227)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`asOf` | BN | UnixNow() |
`stakeable` | boolean | false |

**Returns:** *[UTXO](api_platformvm_utxos.utxo.md)[]*

___

###  getMinimumSpendable

▸ **getMinimumSpendable**(`aad`: [AssetAmountDestination](api_platformvm_utxos.assetamountdestination.md), `asOf`: BN, `locktime`: BN, `threshold`: number, `stakeable`: boolean): *[Error](src_utils.avalancheerror.md#static-error)*

*Defined in [src/apis/platformvm/utxos.ts:253](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L253)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`aad` | [AssetAmountDestination](api_platformvm_utxos.assetamountdestination.md) | - |
`asOf` | BN | UnixNow() |
`locktime` | BN | new BN(0) |
`threshold` | number | 1 |
`stakeable` | boolean | false |

**Returns:** *[Error](src_utils.avalancheerror.md#static-error)*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L63)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L56)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  getUTXO

▸ **getUTXO**(`utxoid`: string): *[UTXO](api_platformvm_utxos.utxo.md)*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getUTXO](common_utxos.standardutxoset.md#getutxo)*

*Defined in [src/common/utxos.ts:411](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L411)*

Gets a [StandardUTXO](common_utxos.standardutxo.md) from the [StandardUTXOSet](common_utxos.standardutxoset.md) by its UTXOID.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxoid` | string | String representing the UTXOID  |

**Returns:** *[UTXO](api_platformvm_utxos.utxo.md)*

A [StandardUTXO](common_utxos.standardutxo.md) if it exists in the set.

___

###  getUTXOIDs

▸ **getUTXOIDs**(`addresses`: Buffer[], `spendable`: boolean): *string[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getUTXOIDs](common_utxos.standardutxoset.md#getutxoids)*

*Defined in [src/common/utxos.ts:464](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L464)*

Given an address or array of addresses, returns all the UTXOIDs for those addresses

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`addresses` | Buffer[] | undefined | - |
`spendable` | boolean | true | If true, only retrieves UTXOIDs whose locktime has passed  |

**Returns:** *string[]*

An array of addresses.

___

###  includes

▸ **includes**(`utxo`: [UTXO](api_platformvm_utxos.utxo.md) | string): *boolean*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[includes](common_utxos.standardutxoset.md#includes)*

*Defined in [src/common/utxos.ts:274](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L274)*

Returns true if the [StandardUTXO](common_utxos.standardutxo.md) is in the StandardUTXOSet.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxo` | [UTXO](api_platformvm_utxos.utxo.md) &#124; string | Either a [StandardUTXO](common_utxos.standardutxo.md) a cb58 serialized string representing a StandardUTXO  |

**Returns:** *boolean*

___

###  intersection

▸ **intersection**(`utxoset`: this): *this*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[intersection](common_utxos.standardutxoset.md#intersection)*

*Defined in [src/common/utxos.ts:606](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L606)*

Set intersetion between this set and a parameter.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxoset` | this | The set to intersect  |

**Returns:** *this*

A new StandardUTXOSet containing the intersection

___

###  merge

▸ **merge**(`utxoset`: this, `hasUTXOIDs`: string[]): *this*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[merge](common_utxos.standardutxoset.md#merge)*

*Defined in [src/common/utxos.ts:587](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L587)*

Returns a new set with copy of UTXOs in this and set parameter.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | this | - | The [StandardUTXOSet](common_utxos.standardutxoset.md) to merge with this one |
`hasUTXOIDs` | string[] | undefined | Will subselect a set of [StandardUTXO](common_utxos.standardutxo.md)s which have the UTXOIDs provided in this array, defults to all UTXOs  |

**Returns:** *this*

A new StandardUTXOSet that contains all the filtered elements.

___

###  mergeByRule

▸ **mergeByRule**(`utxoset`: this, `mergeRule`: [MergeRule](../modules/utils_constants.md#mergerule)): *this*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[mergeByRule](common_utxos.standardutxoset.md#mergebyrule)*

*Defined in [src/common/utxos.ts:670](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L670)*

Merges a set by the rule provided.

**`remarks`** 
The merge rules are as follows:
  * "intersection" - the intersection of the set
  * "differenceSelf" - the difference between the existing data and new set
  * "differenceNew" - the difference between the new data and the existing set
  * "symDifference" - the union of the differences between both sets of data
  * "union" - the unique set of all elements contained in both sets
  * "unionMinusNew" - the unique set of all elements contained in both sets, excluding values only found in the new set
  * "unionMinusSelf" - the unique set of all elements contained in both sets, excluding values only found in the existing set

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxoset` | this | The set to merge by the MergeRule |
`mergeRule` | [MergeRule](../modules/utils_constants.md#mergerule) | The [MergeRule](../modules/utils_constants.md#mergerule) to apply  |

**Returns:** *this*

A new StandardUTXOSet containing the merged data

___

###  parseUTXO

▸ **parseUTXO**(`utxo`: [UTXO](api_platformvm_utxos.utxo.md) | string): *[UTXO](api_platformvm_utxos.utxo.md)*

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[parseUTXO](common_utxos.standardutxoset.md#abstract-parseutxo)*

*Defined in [src/apis/platformvm/utxos.ts:191](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/utxos.ts#L191)*

**Parameters:**

Name | Type |
------ | ------ |
`utxo` | [UTXO](api_platformvm_utxos.utxo.md) &#124; string |

**Returns:** *[UTXO](api_platformvm_utxos.utxo.md)*

___

###  remove

▸ **remove**(`utxo`: [UTXO](api_platformvm_utxos.utxo.md) | string): *[UTXO](api_platformvm_utxos.utxo.md)*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[remove](common_utxos.standardutxoset.md#remove)*

*Defined in [src/common/utxos.ts:358](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L358)*

Removes a [StandardUTXO](common_utxos.standardutxo.md) from the [StandardUTXOSet](common_utxos.standardutxoset.md) if it exists.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxo` | [UTXO](api_platformvm_utxos.utxo.md) &#124; string | Either a [StandardUTXO](common_utxos.standardutxo.md) an cb58 serialized string representing a StandardUTXO  |

**Returns:** *[UTXO](api_platformvm_utxos.utxo.md)*

A [StandardUTXO](common_utxos.standardutxo.md) if it was removed and undefined if nothing was removed.

___

###  removeArray

▸ **removeArray**(`utxos`: string[] | [UTXO](api_platformvm_utxos.utxo.md)[]): *[UTXO](api_platformvm_utxos.utxo.md)[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[removeArray](common_utxos.standardutxoset.md#removearray)*

*Defined in [src/common/utxos.ts:393](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L393)*

Removes an array of [StandardUTXO](common_utxos.standardutxo.md)s to the [StandardUTXOSet](common_utxos.standardutxoset.md).

**Parameters:**

Name | Type |
------ | ------ |
`utxos` | string[] &#124; [UTXO](api_platformvm_utxos.utxo.md)[] |

**Returns:** *[UTXO](api_platformvm_utxos.utxo.md)[]*

An array of UTXOs which were removed.

___

###  sanitizeObject

▸ **sanitizeObject**(`obj`: object): *object*

*Inherited from [SigIdx](common_signature.sigidx.md).[sanitizeObject](common_signature.sigidx.md#sanitizeobject)*

*Defined in [src/utils/serialization.ts:77](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L77)*

Sanitize to prevent cross scripting attacks.

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *object*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[serialize](common_utxos.standardutxoset.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/utxos.ts:220](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L220)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  symDifference

▸ **symDifference**(`utxoset`: this): *this*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[symDifference](common_utxos.standardutxoset.md#symdifference)*

*Defined in [src/common/utxos.ts:634](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L634)*

Set symmetrical difference between this set and a parameter.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxoset` | this | The set to symmetrical difference  |

**Returns:** *this*

A new StandardUTXOSet containing the symmetrical difference

___

###  union

▸ **union**(`utxoset`: this): *this*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[union](common_utxos.standardutxoset.md#union)*

*Defined in [src/common/utxos.ts:650](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L650)*

Set union between this set and a parameter.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxoset` | this | The set to union  |

**Returns:** *this*

A new StandardUTXOSet containing the union
