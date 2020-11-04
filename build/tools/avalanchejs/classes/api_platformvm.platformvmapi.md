[avalanche](../README.md) › [API-PlatformVM](../modules/api_platformvm.md) › [PlatformVMAPI](api_platformvm.platformvmapi.md)

# Class: PlatformVMAPI

Class for interacting with a node's PlatformVMAPI

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **PlatformVMAPI**

## Index

### Constructors

* [constructor](api_platformvm.platformvmapi.md#constructor)

### Properties

* [AVAXAssetID](api_platformvm.platformvmapi.md#protected-avaxassetid)
* [baseurl](api_platformvm.platformvmapi.md#protected-baseurl)
* [blockchainAlias](api_platformvm.platformvmapi.md#protected-blockchainalias)
* [blockchainID](api_platformvm.platformvmapi.md#protected-blockchainid)
* [core](api_platformvm.platformvmapi.md#protected-core)
* [creationTxFee](api_platformvm.platformvmapi.md#protected-creationtxfee)
* [db](api_platformvm.platformvmapi.md#protected-db)
* [jrpcVersion](api_platformvm.platformvmapi.md#protected-jrpcversion)
* [minDelegatorStake](api_platformvm.platformvmapi.md#protected-mindelegatorstake)
* [minValidatorStake](api_platformvm.platformvmapi.md#protected-minvalidatorstake)
* [rpcid](api_platformvm.platformvmapi.md#protected-rpcid)
* [txFee](api_platformvm.platformvmapi.md#protected-txfee)

### Methods

* [addDelegator](api_platformvm.platformvmapi.md#adddelegator)
* [addSubnetValidator](api_platformvm.platformvmapi.md#addsubnetvalidator)
* [addValidator](api_platformvm.platformvmapi.md#addvalidator)
* [addressFromBuffer](api_platformvm.platformvmapi.md#addressfrombuffer)
* [buildAddDelegatorTx](api_platformvm.platformvmapi.md#buildadddelegatortx)
* [buildAddValidatorTx](api_platformvm.platformvmapi.md#buildaddvalidatortx)
* [buildCreateSubnetTx](api_platformvm.platformvmapi.md#buildcreatesubnettx)
* [buildExportTx](api_platformvm.platformvmapi.md#buildexporttx)
* [buildImportTx](api_platformvm.platformvmapi.md#buildimporttx)
* [callMethod](api_platformvm.platformvmapi.md#callmethod)
* [checkGooseEgg](api_platformvm.platformvmapi.md#checkgooseegg)
* [createAddress](api_platformvm.platformvmapi.md#createaddress)
* [createBlockchain](api_platformvm.platformvmapi.md#createblockchain)
* [createSubnet](api_platformvm.platformvmapi.md#createsubnet)
* [exportAVAX](api_platformvm.platformvmapi.md#exportavax)
* [exportKey](api_platformvm.platformvmapi.md#exportkey)
* [getAVAXAssetID](api_platformvm.platformvmapi.md#getavaxassetid)
* [getBalance](api_platformvm.platformvmapi.md#getbalance)
* [getBaseURL](api_platformvm.platformvmapi.md#getbaseurl)
* [getBlockchainAlias](api_platformvm.platformvmapi.md#getblockchainalias)
* [getBlockchainID](api_platformvm.platformvmapi.md#getblockchainid)
* [getBlockchainStatus](api_platformvm.platformvmapi.md#getblockchainstatus)
* [getBlockchains](api_platformvm.platformvmapi.md#getblockchains)
* [getCreationTxFee](api_platformvm.platformvmapi.md#getcreationtxfee)
* [getCurrentSupply](api_platformvm.platformvmapi.md#getcurrentsupply)
* [getCurrentValidators](api_platformvm.platformvmapi.md#getcurrentvalidators)
* [getDB](api_platformvm.platformvmapi.md#getdb)
* [getDefaultCreationTxFee](api_platformvm.platformvmapi.md#getdefaultcreationtxfee)
* [getDefaultTxFee](api_platformvm.platformvmapi.md#getdefaulttxfee)
* [getHeight](api_platformvm.platformvmapi.md#getheight)
* [getMinStake](api_platformvm.platformvmapi.md#getminstake)
* [getPendingValidators](api_platformvm.platformvmapi.md#getpendingvalidators)
* [getRPCID](api_platformvm.platformvmapi.md#getrpcid)
* [getStake](api_platformvm.platformvmapi.md#getstake)
* [getStakingAssetID](api_platformvm.platformvmapi.md#getstakingassetid)
* [getSubnets](api_platformvm.platformvmapi.md#getsubnets)
* [getTx](api_platformvm.platformvmapi.md#gettx)
* [getTxFee](api_platformvm.platformvmapi.md#gettxfee)
* [getTxStatus](api_platformvm.platformvmapi.md#gettxstatus)
* [getUTXOs](api_platformvm.platformvmapi.md#getutxos)
* [importAVAX](api_platformvm.platformvmapi.md#importavax)
* [importKey](api_platformvm.platformvmapi.md#importkey)
* [issueTx](api_platformvm.platformvmapi.md#issuetx)
* [keyChain](api_platformvm.platformvmapi.md#keychain)
* [listAddresses](api_platformvm.platformvmapi.md#listaddresses)
* [parseAddress](api_platformvm.platformvmapi.md#parseaddress)
* [refreshBlockchainID](api_platformvm.platformvmapi.md#refreshblockchainid)
* [sampleValidators](api_platformvm.platformvmapi.md#samplevalidators)
* [setAVAXAssetID](api_platformvm.platformvmapi.md#setavaxassetid)
* [setBaseURL](api_platformvm.platformvmapi.md#setbaseurl)
* [setBlockchainAlias](api_platformvm.platformvmapi.md#setblockchainalias)
* [setCreationTxFee](api_platformvm.platformvmapi.md#setcreationtxfee)
* [setMinStake](api_platformvm.platformvmapi.md#setminstake)
* [setTxFee](api_platformvm.platformvmapi.md#settxfee)
* [validatedBy](api_platformvm.platformvmapi.md#validatedby)
* [validates](api_platformvm.platformvmapi.md#validates)

## Constructors

###  constructor

\+ **new PlatformVMAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseurl`: string): *[PlatformVMAPI](api_platformvm.platformvmapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/platformvm/api.ts:1418](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L1418)*

This class should not be instantiated directly.
Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseurl` | string | "/ext/bc/P" | Defaults to the string "/ext/P" as the path to blockchain's baseurl  |

**Returns:** *[PlatformVMAPI](api_platformvm.platformvmapi.md)*

## Properties

### `Protected` AVAXAssetID

• **AVAXAssetID**: *Buffer* = undefined

*Defined in [src/apis/platformvm/api.ts:43](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L43)*

___

### `Protected` baseurl

• **baseurl**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseurl](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L38)*

___

### `Protected` blockchainAlias

• **blockchainAlias**: *string* = undefined

*Defined in [src/apis/platformvm/api.ts:41](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L41)*

___

### `Protected` blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/apis/platformvm/api.ts:39](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L39)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:36](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L36)*

___

### `Protected` creationTxFee

• **creationTxFee**: *BN* = undefined

*Defined in [src/apis/platformvm/api.ts:47](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L47)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:40](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L40)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)*

*Defined in [src/common/jrpcapi.ts:17](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L17)*

___

### `Protected` minDelegatorStake

• **minDelegatorStake**: *BN* = undefined

*Defined in [src/apis/platformvm/api.ts:51](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L51)*

___

### `Protected` minValidatorStake

• **minValidatorStake**: *BN* = undefined

*Defined in [src/apis/platformvm/api.ts:49](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L49)*

___

### `Protected` rpcid

• **rpcid**: *number* = 1

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[rpcid](common_jrpcapi.jrpcapi.md#protected-rpcid)*

*Defined in [src/common/jrpcapi.ts:19](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L19)*

___

### `Protected` txFee

• **txFee**: *BN* = undefined

*Defined in [src/apis/platformvm/api.ts:45](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L45)*

## Methods

###  addDelegator

▸ **addDelegator**(`username`: string, `password`: string, `nodeID`: string, `startTime`: Date, `endTime`: Date, `stakeAmount`: BN, `rewardAddress`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:544](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L544)*

Add a delegator to the Primary Network.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The username of the Keystore user |
`password` | string | The password of the Keystore user |
`nodeID` | string | The node ID of the delegatee |
`startTime` | Date | Javascript Date object for when the delegator starts delegating |
`endTime` | Date | Javascript Date object for when the delegator starts delegating |
`stakeAmount` | BN | The amount of nAVAX the delegator is staking as a [BN](https://github.com/indutny/bn.js/) |
`rewardAddress` | string | The address of the account the staked AVAX and validation reward (if applicable) are sent to at endTime  |

**Returns:** *Promise‹string›*

Promise for an array of validator's stakingIDs.

___

###  addSubnetValidator

▸ **addSubnetValidator**(`username`: string, `password`: string, `nodeID`: string, `subnetID`: Buffer | string, `startTime`: Date, `endTime`: Date, `weight`: number): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:502](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L502)*

Add a validator to a Subnet other than the Primary Network. The validator must validate the Primary Network for the entire duration they validate this Subnet.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The username of the Keystore user |
`password` | string | The password of the Keystore user |
`nodeID` | string | The node ID of the validator |
`subnetID` | Buffer &#124; string | Either a [Buffer](https://github.com/feross/buffer) or a cb58 serialized string for the SubnetID or its alias. |
`startTime` | Date | Javascript Date object for the start time to validate |
`endTime` | Date | Javascript Date object for the end time to validate |
`weight` | number | The validator’s weight used for sampling  |

**Returns:** *Promise‹string›*

Promise for the unsigned transaction. It must be signed (using sign) by the proper number of the Subnet’s control keys and by the key of the account paying the transaction fee before it can be issued.

___

###  addValidator

▸ **addValidator**(`username`: string, `password`: string, `nodeID`: string, `startTime`: Date, `endTime`: Date, `stakeAmount`: BN, `rewardAddress`: string, `delegationFeeRate`: BN): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:463](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L463)*

Add a validator to the Primary Network.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`username` | string | - | The username of the Keystore user |
`password` | string | - | The password of the Keystore user |
`nodeID` | string | - | The node ID of the validator |
`startTime` | Date | - | Javascript Date object for the start time to validate |
`endTime` | Date | - | Javascript Date object for the end time to validate |
`stakeAmount` | BN | - | The amount of nAVAX the validator is staking as a [BN](https://github.com/indutny/bn.js/) |
`rewardAddress` | string | - | The address the validator reward will go to, if there is one. |
`delegationFeeRate` | BN | undefined | Optional. A [BN](https://github.com/indutny/bn.js/) for the percent fee this validator charges when others delegate stake to them. Up to 4 decimal places allowed; additional decimal places are ignored. Must be between 0 and 100, inclusive. For example, if delegationFeeRate is 1.2345 and someone delegates to this validator, then when the delegation period is over, 1.2345% of the reward goes to the validator and the rest goes to the delegator.  |

**Returns:** *Promise‹string›*

Promise for a base58 string of the unsigned transaction.

___

###  addressFromBuffer

▸ **addressFromBuffer**(`address`: Buffer): *string*

*Defined in [src/apis/platformvm/api.ts:121](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | Buffer |

**Returns:** *string*

___

###  buildAddDelegatorTx

▸ **buildAddDelegatorTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `toAddresses`: Array‹string›, `fromAddresses`: Array‹string›, `changeAddresses`: Array‹string›, `nodeID`: string, `startTime`: BN, `endTime`: BN, `stakeAmount`: BN, `rewardAddresses`: Array‹string›, `rewardLocktime`: BN, `rewardThreshold`: number, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1192](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L1192)*

Helper function which creates an unsigned [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md). For more granular control, you may create your own
[UnsignedTx](api_avm_transactions.unsignedtx.md) manually and import the [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md) class directly.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`toAddresses` | Array‹string› | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who recieved the staked tokens at the end of the staking period |
`fromAddresses` | Array‹string› | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who own the staking UTXOs the fees in AVAX |
`changeAddresses` | Array‹string› | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who gets the change leftover from the fee payment |
`nodeID` | string | - | The node ID of the validator being added. |
`startTime` | BN | - | The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | - | The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`stakeAmount` | BN | - | The amount being delegated as a [BN](https://github.com/indutny/bn.js/) |
`rewardAddresses` | Array‹string› | - | The addresses which will recieve the rewards from the delegated stake. |
`rewardLocktime` | BN | new BN(0) | Optional. The locktime field created in the resulting reward outputs |
`rewardThreshold` | number | 1 | Opional. The number of signatures required to spend the funds in the resultant reward UTXO. Default 1. |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction created from the passed in parameters.

___

###  buildAddValidatorTx

▸ **buildAddValidatorTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `toAddresses`: Array‹string›, `fromAddresses`: Array‹string›, `changeAddresses`: Array‹string›, `nodeID`: string, `startTime`: BN, `endTime`: BN, `stakeAmount`: BN, `rewardAddresses`: Array‹string›, `delegationFee`: number, `rewardLocktime`: BN, `rewardThreshold`: number, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1276](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L1276)*

Helper function which creates an unsigned [AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md). For more granular control, you may create your own
[UnsignedTx](api_avm_transactions.unsignedtx.md) manually and import the [AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md) class directly.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`toAddresses` | Array‹string› | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who recieved the staked tokens at the end of the staking period |
`fromAddresses` | Array‹string› | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who own the staking UTXOs the fees in AVAX |
`changeAddresses` | Array‹string› | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who gets the change leftover from the fee payment |
`nodeID` | string | - | The node ID of the validator being added. |
`startTime` | BN | - | The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | - | The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`stakeAmount` | BN | - | The amount being delegated as a [BN](https://github.com/indutny/bn.js/) |
`rewardAddresses` | Array‹string› | - | The addresses which will recieve the rewards from the delegated stake. |
`delegationFee` | number | - | A number for the percentage of reward to be given to the validator when someone delegates to them. Must be between 0 and 100. |
`rewardLocktime` | BN | new BN(0) | Optional. The locktime field created in the resulting reward outputs |
`rewardThreshold` | number | 1 | Opional. The number of signatures required to spend the funds in the resultant reward UTXO. Default 1. |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction created from the passed in parameters.

___

###  buildCreateSubnetTx

▸ **buildCreateSubnetTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `fromAddresses`: Array‹string›, `changeAddresses`: Array‹string›, `subnetOwnerAddresses`: Array‹string›, `subnetOwnerThreshold`: number, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1359](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L1359)*

Class representing an unsigned [CreateSubnetTx](api_platformvm_createsubnettx.createsubnettx.md) transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`fromAddresses` | Array‹string› | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Array‹string› | - | The addresses that can spend the change remaining from the spent UTXOs |
`subnetOwnerAddresses` | Array‹string› | - | An array of addresses for owners of the new subnet |
`subnetOwnerThreshold` | number | - | A number indicating the amount of signatures required to add validators to a subnet |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction created from the passed in parameters.

___

###  buildExportTx

▸ **buildExportTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `amount`: BN, `destinationChain`: Buffer | string, `toAddresses`: Array‹string›, `fromAddresses`: Array‹string›, `changeAddresses`: Array‹string›, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1035](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L1035)*

Helper function which creates an unsigned Export Tx. For more granular control, you may create your own
[UnsignedTx](api_avm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_avm_inputs.transferableinput.md)s, [TransferableOutput](api_avm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`amount` | BN | - | The amount being exported as a [BN](https://github.com/indutny/bn.js/) |
`destinationChain` | Buffer &#124; string | - | The chainid for where the assets will be sent. |
`toAddresses` | Array‹string› | - | The addresses to send the funds |
`fromAddresses` | Array‹string› | - | The addresses being used to send the funds from the UTXOs provided |
`changeAddresses` | Array‹string› | undefined | The addresses that can spend the change remaining from the spent UTXOs |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_avm_transactions.unsignedtx.md)) which contains an [ExportTx](api_avm_exporttx.exporttx.md).

___

###  buildImportTx

▸ **buildImportTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `ownerAddresses`: Array‹string›, `sourceChain`: Buffer | string, `toAddresses`: Array‹string›, `fromAddresses`: Array‹string›, `changeAddresses`: Array‹string›, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:961](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L961)*

Helper function which creates an unsigned Import Tx. For more granular control, you may create your own
[UnsignedTx](api_avm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_avm_inputs.transferableinput.md)s, [TransferableOutput](api_avm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**`remarks`** 
This helper exists because the endpoint API should be the primary point of entry for most functionality.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`ownerAddresses` | Array‹string› | - | The addresses being used to import |
`sourceChain` | Buffer &#124; string | - | The chainid for where the import is coming from. |
`toAddresses` | Array‹string› | - | The addresses to send the funds |
`fromAddresses` | Array‹string› | - | The addresses being used to send the funds from the UTXOs provided |
`changeAddresses` | Array‹string› | undefined | The addresses that can spend the change remaining from the spent UTXOs |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_avm_transactions.unsignedtx.md)) which contains a [ImportTx](api_avm_importtx.importtx.md).

___

###  callMethod

▸ **callMethod**(`method`: string, `params?`: Array‹object› | object, `baseurl?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[callMethod](common_jrpcapi.jrpcapi.md#callmethod)*

*Defined in [src/common/jrpcapi.ts:21](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | Array‹object› &#124; object |
`baseurl?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  checkGooseEgg

▸ **checkGooseEgg**(`utx`: [UnsignedTx](api_platformvm_transactions.unsignedtx.md), `outTotal`: BN): *Promise‹boolean›*

*Defined in [src/apis/platformvm/api.ts:247](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L247)*

Helper function which determines if a tx is a goose egg transaction.

**`remarks`** 
A "Goose Egg Transaction" is when the fee far exceeds a reasonable amount

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utx` | [UnsignedTx](api_platformvm_transactions.unsignedtx.md) | - | An UnsignedTx  |
`outTotal` | BN | new BN(0) | - |

**Returns:** *Promise‹boolean›*

boolean true if passes goose egg test and false if fails.

___

###  createAddress

▸ **createAddress**(`username`: string, `password`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:331](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L331)*

Create an address in the node's keystore.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The username of the Keystore user that controls the new account |
`password` | string | The password of the Keystore user that controls the new account  |

**Returns:** *Promise‹string›*

Promise for a string of the newly created account address.

___

###  createBlockchain

▸ **createBlockchain**(`username`: string, `password`: string, `subnetID`: Buffer | string, `vmID`: string, `fxIDs`: Array‹number›, `name`: string, `genesis`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:281](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L281)*

Creates a new blockchain.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`username` | string | - | The username of the Keystore user that controls the new account |
`password` | string | - | The password of the Keystore user that controls the new account |
`subnetID` | Buffer &#124; string | undefined | Optional. Either a [Buffer](https://github.com/feross/buffer) or an cb58 serialized string for the SubnetID or its alias. |
`vmID` | string | - | The ID of the Virtual Machine the blockchain runs. Can also be an alias of the Virtual Machine. |
`fxIDs` | Array‹number› | - | - |
`name` | string | - | A human-readable name for the new blockchain |
`genesis` | string | - | The base 58 (with checksum) representation of the genesis state of the new blockchain. Virtual Machines should have a static API method named buildGenesis that can be used to generate genesisData.  |

**Returns:** *Promise‹string›*

Promise for the unsigned transaction to create this blockchain. Must be signed by a sufficient number of the Subnet’s control keys and by the account paying the transaction fee.

___

###  createSubnet

▸ **createSubnet**(`username`: string, `password`: string, `controlKeys`: Array‹string›, `threshold`: number): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:578](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L578)*

Create an unsigned transaction to create a new Subnet. The unsigned transaction must be
signed with the key of the account paying the transaction fee. The Subnet’s ID is the ID of the transaction that creates it (ie the response from issueTx when issuing the signed transaction).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The username of the Keystore user |
`password` | string | The password of the Keystore user |
`controlKeys` | Array‹string› | Array of platform addresses as strings |
`threshold` | number | To add a validator to this Subnet, a transaction must have threshold signatures, where each signature is from a key whose address is an element of `controlKeys`  |

**Returns:** *Promise‹string›*

Promise for a string with the unsigned transaction encoded as base58.

___

###  exportAVAX

▸ **exportAVAX**(`username`: string, `password`: string, `amount`: BN, `to`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:657](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L657)*

Send AVAX from an account on the P-Chain to an address on the X-Chain. This transaction
must be signed with the key of the account that the AVAX is sent from and which pays the
transaction fee. After issuing this transaction, you must call the X-Chain’s importAVAX
method to complete the transfer.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The Keystore user that controls the account specified in `to` |
`password` | string | The password of the Keystore user |
`amount` | BN | Amount of AVAX to export as a [BN](https://github.com/indutny/bn.js/)  |
`to` | string | The address on the X-Chain to send the AVAX to. Do not include X- in the address |

**Returns:** *Promise‹string›*

Promise for an unsigned transaction to be signed by the account the the AVAX is
sent from and pays the transaction fee.

___

###  exportKey

▸ **exportKey**(`username`: string, `password`: string, `address`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:815](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L815)*

Exports the private key for an address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The name of the user with the private key |
`password` | string | The password used to decrypt the private key |
`address` | string | The address whose private key should be exported  |

**Returns:** *Promise‹string›*

Promise with the decrypted private key as store in the database

___

###  getAVAXAssetID

▸ **getAVAXAssetID**(`refresh`: boolean): *Promise‹Buffer›*

*Defined in [src/apis/platformvm/api.ts:133](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L133)*

Fetches the AVAX AssetID and returns it in a Promise.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`refresh` | boolean | false | This function caches the response. Refresh = true will bust the cache.  |

**Returns:** *Promise‹Buffer›*

The the provided string representing the AVAX AssetID

___

###  getBalance

▸ **getBalance**(`address`: string): *Promise‹object›*

*Defined in [src/apis/platformvm/api.ts:351](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L351)*

Gets the balance of a particular asset.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | The address to pull the asset balance from  |

**Returns:** *Promise‹object›*

Promise with the balance as a [BN](https://github.com/indutny/bn.js/) on the provided address.

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:63](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L63)*

Returns the baseurl's path.

**Returns:** *string*

___

###  getBlockchainAlias

▸ **getBlockchainAlias**(): *string*

*Defined in [src/apis/platformvm/api.ts:58](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L58)*

Gets the alias for the blockchainID if it exists, otherwise returns `undefined`.

**Returns:** *string*

The alias for the blockchainID

___

###  getBlockchainID

▸ **getBlockchainID**(): *string*

*Defined in [src/apis/platformvm/api.ts:89](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L89)*

Gets the blockchainID and returns it.

**Returns:** *string*

The blockchainID

___

###  getBlockchainStatus

▸ **getBlockchainStatus**(`blockchainID`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:315](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L315)*

Gets the status of a blockchain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`blockchainID` | string | The blockchainID requesting a status update  |

**Returns:** *Promise‹string›*

Promise for a string of one of: "Validating", "Created", "Preferred", "Unknown".

___

###  getBlockchains

▸ **getBlockchains**(): *Promise‹Array‹object››*

*Defined in [src/apis/platformvm/api.ts:637](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L637)*

Get all the blockchains that exist (excluding the P-Chain).

**Returns:** *Promise‹Array‹object››*

Promise for an array of objects containing fields "id", "subnetID", and "vmID".

___

###  getCreationTxFee

▸ **getCreationTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:200](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L200)*

Gets the creation fee for this chain.

**Returns:** *BN*

The creation fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getCurrentSupply

▸ **getCurrentSupply**(): *Promise‹BN›*

*Defined in [src/apis/platformvm/api.ts:725](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L725)*

Returns an upper bound on the amount of tokens that exist. Not monotonically increasing because this number can go down if a staker's reward is denied.

**Returns:** *Promise‹BN›*

___

###  getCurrentValidators

▸ **getCurrentValidators**(`subnetID`: Buffer | string): *Promise‹object›*

*Defined in [src/apis/platformvm/api.ts:388](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L388)*

Lists the set of current validators.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`subnetID` | Buffer &#124; string | undefined | Optional. Either a [Buffer](https://github.com/feross/buffer) or an cb58 serialized string for the SubnetID or its alias.  |

**Returns:** *Promise‹object›*

Promise for an array of validators that are currently staking, see: [platform.getCurrentValidators documentation](https://docs.avax.network/v1.0/en/api/platform/#platformgetcurrentvalidators).

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:68](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L68)*

Returns the baseurl's database.

**Returns:** *StoreAPI*

___

###  getDefaultCreationTxFee

▸ **getDefaultCreationTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:191](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L191)*

Gets the default creation fee for this chain.

**Returns:** *BN*

The default creation fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getDefaultTxFee

▸ **getDefaultTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:160](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L160)*

Gets the default tx fee for this chain.

**Returns:** *BN*

The default tx fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getHeight

▸ **getHeight**(): *Promise‹BN›*

*Defined in [src/apis/platformvm/api.ts:734](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L734)*

Returns the height of the platform chain.

**Returns:** *Promise‹BN›*

___

###  getMinStake

▸ **getMinStake**(`refresh`: boolean): *Promise‹object›*

*Defined in [src/apis/platformvm/api.ts:745](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L745)*

Gets the minimum staking amount.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`refresh` | boolean | false | A boolean to bypass the local cached value of Minimum Stake Amount, polling the node instead.  |

**Returns:** *Promise‹object›*

___

###  getPendingValidators

▸ **getPendingValidators**(`subnetID`: Buffer | string): *Promise‹object›*

*Defined in [src/apis/platformvm/api.ts:408](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L408)*

Lists the set of pending validators.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`subnetID` | Buffer &#124; string | undefined | Optional. Either a [Buffer](https://github.com/feross/buffer) or a cb58 serialized string for the SubnetID or its alias.  |

**Returns:** *Promise‹object›*

Promise for an array of validators that are pending staking, see: [platform.getPendingValidators documentation](https://docs.avax.network/v1.0/en/api/platform/#platformgetpendingvalidators).

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:66](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L66)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  getStake

▸ **getStake**(`addresses`: Array‹string›): *Promise‹BN›*

*Defined in [src/apis/platformvm/api.ts:781](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L781)*

Gets the total amount staked for an array of addresses.

**Parameters:**

Name | Type |
------ | ------ |
`addresses` | Array‹string› |

**Returns:** *Promise‹BN›*

___

###  getStakingAssetID

▸ **getStakingAssetID**(): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:263](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L263)*

Retrieves an assetID for a subnet's staking assset.

**Returns:** *Promise‹string›*

Returns a Promise<string> with cb58 encoded value of the assetID.

___

###  getSubnets

▸ **getSubnets**(`ids`: Array‹string›): *Promise‹Array‹object››*

*Defined in [src/apis/platformvm/api.ts:797](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L797)*

Get all the subnets that exist.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ids` | Array‹string› | undefined | IDs of the subnets to retrieve information about. If omitted, gets all subnets  |

**Returns:** *Promise‹Array‹object››*

Promise for an array of objects containing fields "id",
"controlKeys", and "threshold".

___

###  getTx

▸ **getTx**(`txid`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:851](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L851)*

Returns the treansaction data of a provided transaction ID by calling the node's `getTx` method.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txid` | string | The string representation of the transaction ID  |

**Returns:** *Promise‹string›*

Returns a Promise<string> containing the bytes retrieved from the node

___

###  getTxFee

▸ **getTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:169](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L169)*

Gets the tx fee for this chain.

**Returns:** *BN*

The tx fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getTxStatus

▸ **getTxStatus**(`txid`: string, `includeReason`: boolean): *Promise‹string | object›*

*Defined in [src/apis/platformvm/api.ts:866](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L866)*

Returns the status of a provided transaction ID by calling the node's `getTxStatus` method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`txid` | string | - | The string representation of the transaction ID |
`includeReason` | boolean | true | Return the reason tx was dropped, if applicable. Defaults to true  |

**Returns:** *Promise‹string | object›*

Returns a Promise<string> containing the status retrieved from the node and the reason a tx was dropped, if applicable.

___

###  getUTXOs

▸ **getUTXOs**(`addresses`: Array‹string› | string, `sourceChain`: string, `limit`: number, `startIndex`: object, `persistOpts`: [PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)): *Promise‹object›*

*Defined in [src/apis/platformvm/api.ts:889](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L889)*

Retrieves the UTXOs related to the addresses provided from the node's `getUTXOs` method.

**`remarks`** 
persistOpts is optional and must be of type [PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)

**Parameters:**

▪ **addresses**: *Array‹string› | string*

An array of addresses as cb58 strings or addresses as [Buffer](https://github.com/feross/buffer)s

▪`Default value`  **sourceChain**: *string*= undefined

A string for the chain to look for the UTXO's. Default is to use this chain, but if exported UTXOs exist from other chains, this can used to pull them instead.

▪`Default value`  **limit**: *number*= 0

Optional. Returns at most [limit] addresses. If [limit] == 0 or > [maxUTXOsToFetch], fetches up to [maxUTXOsToFetch].

▪`Default value`  **startIndex**: *object*= undefined

Optional. [StartIndex] defines where to start fetching UTXOs (for pagination.)
UTXOs fetched are from addresses equal to or greater than [StartIndex.Address]
For address [StartIndex.Address], only UTXOs with IDs greater than [StartIndex.Utxo] will be returned.

Name | Type |
------ | ------ |
`address` | string |
`utxo` | string |

▪`Default value`  **persistOpts**: *[PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)*= undefined

Options available to persist these UTXOs in local storage

**Returns:** *Promise‹object›*

___

###  importAVAX

▸ **importAVAX**(`username`: string, `password`: string, `to`: string, `sourceChain`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:683](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L683)*

Send AVAX from an account on the P-Chain to an address on the X-Chain. This transaction
must be signed with the key of the account that the AVAX is sent from and which pays
the transaction fee. After issuing this transaction, you must call the X-Chain’s
importAVAX method to complete the transfer.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The Keystore user that controls the account specified in `to` |
`password` | string | The password of the Keystore user |
`to` | string | The ID of the account the AVAX is sent to. This must be the same as the to argument in the corresponding call to the X-Chain’s exportAVAX |
`sourceChain` | string | The chainID where the funds are coming from.  |

**Returns:** *Promise‹string›*

Promise for a string for the transaction, which should be sent to the network
by calling issueTx.

___

###  importKey

▸ **importKey**(`username`: string, `password`: string, `privateKey`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:834](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L834)*

Give a user control over an address by providing the private key that controls the address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The name of the user to store the private key |
`password` | string | The password that unlocks the user |
`privateKey` | string | A string representing the private key in the vm's format  |

**Returns:** *Promise‹string›*

The address for the imported private key.

___

###  issueTx

▸ **issueTx**(`tx`: string | Buffer | [Tx](api_platformvm_transactions.tx.md)): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:702](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L702)*

Calls the node's issueTx method from the API and returns the resulting transaction ID as a string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tx` | string &#124; Buffer &#124; [Tx](api_platformvm_transactions.tx.md) | A string, [Buffer](https://github.com/feross/buffer), or [Tx](api_avm_transactions.tx.md) representing a transaction  |

**Returns:** *Promise‹string›*

A Promise<string> representing the transaction ID of the posted transaction.

___

###  keyChain

▸ **keyChain**(): *[KeyChain](api_platformvm_keychain.keychain.md)*

*Defined in [src/apis/platformvm/api.ts:221](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L221)*

Gets a reference to the keychain for this class.

**Returns:** *[KeyChain](api_platformvm_keychain.keychain.md)*

The instance of [[]] for this class

___

###  listAddresses

▸ **listAddresses**(`username`: string, `password`: string): *Promise‹Array‹string››*

*Defined in [src/apis/platformvm/api.ts:370](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L370)*

List the addresses controlled by the user.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The username of the Keystore user |
`password` | string | The password of the Keystore user  |

**Returns:** *Promise‹Array‹string››*

Promise for an array of addresses.

___

###  parseAddress

▸ **parseAddress**(`addr`: string): *Buffer*

*Defined in [src/apis/platformvm/api.ts:115](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L115)*

Takes an address string and returns its [Buffer](https://github.com/feross/buffer) representation if valid.

**Parameters:**

Name | Type |
------ | ------ |
`addr` | string |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) for the address if valid, undefined if not valid.

___

###  refreshBlockchainID

▸ **refreshBlockchainID**(`blockchainID`: string): *boolean*

*Defined in [src/apis/platformvm/api.ts:98](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L98)*

Refresh blockchainID, and if a blockchainID is passed in, use that.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`blockchainID` | string | undefined |

**Returns:** *boolean*

The blockchainID

___

###  sampleValidators

▸ **sampleValidators**(`sampleSize`: number, `subnetID`: Buffer | string): *Promise‹Array‹string››*

*Defined in [src/apis/platformvm/api.ts:429](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L429)*

Samples `Size` validators from the current validator set.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`sampleSize` | number | - | Of the total universe of validators, select this many at random |
`subnetID` | Buffer &#124; string | undefined | Optional. Either a [Buffer](https://github.com/feross/buffer) or an cb58 serialized string for the SubnetID or its alias.  |

**Returns:** *Promise‹Array‹string››*

Promise for an array of validator's stakingIDs.

___

###  setAVAXAssetID

▸ **setAVAXAssetID**(`avaxAssetID`: string | Buffer): *void*

*Defined in [src/apis/platformvm/api.ts:148](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L148)*

Overrides the defaults and sets the cache to a specific AVAX AssetID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`avaxAssetID` | string &#124; Buffer | A cb58 string or Buffer representing the AVAX AssetID  |

**Returns:** *void*

The the provided string representing the AVAX AssetID

___

###  setBaseURL

▸ **setBaseURL**(`baseurl`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:47](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L47)*

Sets the path of the APIs baseurl.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseurl` | string | Path of the APIs baseurl - ex: "/ext/bc/avm"  |

**Returns:** *void*

___

###  setBlockchainAlias

▸ **setBlockchainAlias**(`alias`: string): *string*

*Defined in [src/apis/platformvm/api.ts:78](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L78)*

Sets the alias for the blockchainID.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`alias` | string | The alias for the blockchainID.   |

**Returns:** *string*

___

###  setCreationTxFee

▸ **setCreationTxFee**(`fee`: BN): *void*

*Defined in [src/apis/platformvm/api.ts:212](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L212)*

Sets the creation fee for this chain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fee` | BN | The creation fee amount to set as [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *void*

___

###  setMinStake

▸ **setMinStake**(`minValidatorStake`: BN, `minDelegatorStake`: BN): *void*

*Defined in [src/apis/platformvm/api.ts:769](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L769)*

Sets the minimum stake cached in this class.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`minValidatorStake` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) to set the minimum stake amount cached in this class. |
`minDelegatorStake` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) to set the minimum delegation amount cached in this class.  |

**Returns:** *void*

___

###  setTxFee

▸ **setTxFee**(`fee`: BN): *void*

*Defined in [src/apis/platformvm/api.ts:181](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L181)*

Sets the tx fee for this chain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fee` | BN | The tx fee amount to set as [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *void*

___

###  validatedBy

▸ **validatedBy**(`blockchainID`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:603](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L603)*

Get the Subnet that validates a given blockchain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`blockchainID` | string | Either a [Buffer](https://github.com/feross/buffer) or a cb58 encoded string for the blockchainID or its alias.  |

**Returns:** *Promise‹string›*

Promise for a string of the subnetID that validates the blockchain.

___

###  validates

▸ **validates**(`subnetID`: Buffer | string): *Promise‹Array‹string››*

*Defined in [src/apis/platformvm/api.ts:619](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/api.ts#L619)*

Get the IDs of the blockchains a Subnet validates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subnetID` | Buffer &#124; string | Either a [Buffer](https://github.com/feross/buffer) or an AVAX serialized string for the SubnetID or its alias.  |

**Returns:** *Promise‹Array‹string››*

Promise for an array of blockchainIDs the subnet validates.
