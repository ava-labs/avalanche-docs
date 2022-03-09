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
* [baseURL](api_platformvm.platformvmapi.md#protected-baseurl)
* [blockchainAlias](api_platformvm.platformvmapi.md#protected-blockchainalias)
* [blockchainID](api_platformvm.platformvmapi.md#protected-blockchainid)
* [core](api_platformvm.platformvmapi.md#protected-core)
* [creationTxFee](api_platformvm.platformvmapi.md#protected-creationtxfee)
* [db](api_platformvm.platformvmapi.md#protected-db)
* [jrpcVersion](api_platformvm.platformvmapi.md#protected-jrpcversion)
* [minDelegatorStake](api_platformvm.platformvmapi.md#protected-mindelegatorstake)
* [minValidatorStake](api_platformvm.platformvmapi.md#protected-minvalidatorstake)
* [rpcID](api_platformvm.platformvmapi.md#protected-rpcid)
* [txFee](api_platformvm.platformvmapi.md#protected-txfee)

### Methods

* [addDelegator](api_platformvm.platformvmapi.md#adddelegator)
* [addSubnetValidator](api_platformvm.platformvmapi.md#addsubnetvalidator)
* [addValidator](api_platformvm.platformvmapi.md#addvalidator)
* [addressFromBuffer](api_platformvm.platformvmapi.md#addressfrombuffer)
* [buildAddDelegatorTx](api_platformvm.platformvmapi.md#buildadddelegatortx)
* [buildAddValidatorTx](api_platformvm.platformvmapi.md#buildaddvalidatortx)
* [buildCreateChainTx](api_platformvm.platformvmapi.md#buildcreatechaintx)
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
* [getCreateChainTxFee](api_platformvm.platformvmapi.md#getcreatechaintxfee)
* [getCreateSubnetTxFee](api_platformvm.platformvmapi.md#getcreatesubnettxfee)
* [getCreationTxFee](api_platformvm.platformvmapi.md#getcreationtxfee)
* [getCurrentSupply](api_platformvm.platformvmapi.md#getcurrentsupply)
* [getCurrentValidators](api_platformvm.platformvmapi.md#getcurrentvalidators)
* [getDB](api_platformvm.platformvmapi.md#getdb)
* [getDefaultCreationTxFee](api_platformvm.platformvmapi.md#getdefaultcreationtxfee)
* [getDefaultTxFee](api_platformvm.platformvmapi.md#getdefaulttxfee)
* [getHeight](api_platformvm.platformvmapi.md#getheight)
* [getMaxStakeAmount](api_platformvm.platformvmapi.md#getmaxstakeamount)
* [getMinStake](api_platformvm.platformvmapi.md#getminstake)
* [getPendingValidators](api_platformvm.platformvmapi.md#getpendingvalidators)
* [getRPCID](api_platformvm.platformvmapi.md#getrpcid)
* [getRewardUTXOs](api_platformvm.platformvmapi.md#getrewardutxos)
* [getStake](api_platformvm.platformvmapi.md#getstake)
* [getStakingAssetID](api_platformvm.platformvmapi.md#getstakingassetid)
* [getSubnets](api_platformvm.platformvmapi.md#getsubnets)
* [getTimestamp](api_platformvm.platformvmapi.md#gettimestamp)
* [getTotalStake](api_platformvm.platformvmapi.md#gettotalstake)
* [getTx](api_platformvm.platformvmapi.md#gettx)
* [getTxFee](api_platformvm.platformvmapi.md#gettxfee)
* [getTxStatus](api_platformvm.platformvmapi.md#gettxstatus)
* [getUTXOs](api_platformvm.platformvmapi.md#getutxos)
* [getValidatorsAt](api_platformvm.platformvmapi.md#getvalidatorsat)
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

\+ **new PlatformVMAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string): *[PlatformVMAPI](api_platformvm.platformvmapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/platformvm/api.ts:1928](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1928)*

This class should not be instantiated directly.
Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseURL` | string | "/ext/bc/P" | Defaults to the string "/ext/P" as the path to blockchain's baseURL  |

**Returns:** *[PlatformVMAPI](api_platformvm.platformvmapi.md)*

## Properties

### `Protected` AVAXAssetID

• **AVAXAssetID**: *Buffer* = undefined

*Defined in [src/apis/platformvm/api.ts:87](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L87)*

___

### `Protected` baseURL

• **baseURL**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseURL](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L29)*

___

### `Protected` blockchainAlias

• **blockchainAlias**: *string* = undefined

*Defined in [src/apis/platformvm/api.ts:85](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L85)*

___

### `Protected` blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/apis/platformvm/api.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L83)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L28)*

___

### `Protected` creationTxFee

• **creationTxFee**: *BN* = undefined

*Defined in [src/apis/platformvm/api.ts:91](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L91)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:30](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L30)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)*

*Defined in [src/common/jrpcapi.ts:11](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L11)*

___

### `Protected` minDelegatorStake

• **minDelegatorStake**: *BN* = undefined

*Defined in [src/apis/platformvm/api.ts:95](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L95)*

___

### `Protected` minValidatorStake

• **minValidatorStake**: *BN* = undefined

*Defined in [src/apis/platformvm/api.ts:93](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L93)*

___

### `Protected` rpcID

• **rpcID**: *number* = 1

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[rpcID](common_jrpcapi.jrpcapi.md#protected-rpcid)*

*Defined in [src/common/jrpcapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L12)*

___

### `Protected` txFee

• **txFee**: *BN* = undefined

*Defined in [src/apis/platformvm/api.ts:89](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L89)*

## Methods

###  addDelegator

▸ **addDelegator**(`username`: string, `password`: string, `nodeID`: string, `startTime`: Date, `endTime`: Date, `stakeAmount`: BN, `rewardAddress`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:716](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L716)*

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

Promise for an array of validator"s stakingIDs.

___

###  addSubnetValidator

▸ **addSubnetValidator**(`username`: string, `password`: string, `nodeID`: string, `subnetID`: Buffer | string, `startTime`: Date, `endTime`: Date, `weight`: number): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:672](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L672)*

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

*Defined in [src/apis/platformvm/api.ts:630](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L630)*

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
`delegationFeeRate` | BN | undefined | Optional. A [BN](https://github.com/indutny/bn.js/) for the percent fee this validator charges when others delegate stake to them. Up to 4 decimal places allowed additional decimal places are ignored. Must be between 0 and 100, inclusive. For example, if delegationFeeRate is 1.2345 and someone delegates to this validator, then when the delegation period is over, 1.2345% of the reward goes to the validator and the rest goes to the delegator.  |

**Returns:** *Promise‹string›*

Promise for a base58 string of the unsigned transaction.

___

###  addressFromBuffer

▸ **addressFromBuffer**(`address`: Buffer): *string*

*Defined in [src/apis/platformvm/api.ts:178](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | Buffer |

**Returns:** *string*

___

###  buildAddDelegatorTx

▸ **buildAddDelegatorTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `toAddresses`: string[], `fromAddresses`: string[], `changeAddresses`: string[], `nodeID`: string, `startTime`: BN, `endTime`: BN, `stakeAmount`: BN, `rewardAddresses`: string[], `rewardLocktime`: BN, `rewardThreshold`: number, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1564](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1564)*

Helper function which creates an unsigned [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md). For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually and import the [AddDelegatorTx](api_platformvm_validationtx.adddelegatortx.md) class directly.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`toAddresses` | string[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who received the staked tokens at the end of the staking period |
`fromAddresses` | string[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who own the staking UTXOs the fees in AVAX |
`changeAddresses` | string[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who gets the change leftover from the fee payment |
`nodeID` | string | - | The node ID of the validator being added. |
`startTime` | BN | - | The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | - | The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`stakeAmount` | BN | - | The amount being delegated as a [BN](https://github.com/indutny/bn.js/) |
`rewardAddresses` | string[] | - | The addresses which will recieve the rewards from the delegated stake. |
`rewardLocktime` | BN | new BN(0) | Optional. The locktime field created in the resulting reward outputs |
`rewardThreshold` | number | 1 | Opional. The number of signatures required to spend the funds in the resultant reward UTXO. Default 1. |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction created from the passed in parameters.

___

###  buildAddValidatorTx

▸ **buildAddValidatorTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `toAddresses`: string[], `fromAddresses`: string[], `changeAddresses`: string[], `nodeID`: string, `startTime`: BN, `endTime`: BN, `stakeAmount`: BN, `rewardAddresses`: string[], `delegationFee`: number, `rewardLocktime`: BN, `rewardThreshold`: number, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1666](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1666)*

Helper function which creates an unsigned [AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md). For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually and import the [AddValidatorTx](api_platformvm_validationtx.addvalidatortx.md) class directly.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`toAddresses` | string[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who received the staked tokens at the end of the staking period |
`fromAddresses` | string[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who own the staking UTXOs the fees in AVAX |
`changeAddresses` | string[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who gets the change leftover from the fee payment |
`nodeID` | string | - | The node ID of the validator being added. |
`startTime` | BN | - | The Unix time when the validator starts validating the Primary Network. |
`endTime` | BN | - | The Unix time when the validator stops validating the Primary Network (and staked AVAX is returned). |
`stakeAmount` | BN | - | The amount being delegated as a [BN](https://github.com/indutny/bn.js/) |
`rewardAddresses` | string[] | - | The addresses which will recieve the rewards from the delegated stake. |
`delegationFee` | number | - | A number for the percentage of reward to be given to the validator when someone delegates to them. Must be between 0 and 100. |
`rewardLocktime` | BN | new BN(0) | Optional. The locktime field created in the resulting reward outputs |
`rewardThreshold` | number | 1 | Opional. The number of signatures required to spend the funds in the resultant reward UTXO. Default 1. |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction created from the passed in parameters.

___

###  buildCreateChainTx

▸ **buildCreateChainTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `fromAddresses`: string[], `changeAddresses`: string[], `subnetID`: string | Buffer, `chainName`: string, `vmID`: string, `fxIDs`: string[], `genesisData`: [GenesisData](api_avm_genesisdata.genesisdata.md), `subnetAuth`: [SubnetAuth](api_platformvm_subnetauth.subnetauth.md), `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1838](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1838)*

Build an unsigned [CreateChainTx](api_platformvm_createchaintx.createchaintx.md).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | string[] | - | The addresses that can spend the change remaining from the spent UTXOs |
`subnetID` | string &#124; Buffer | undefined | Optional ID of the Subnet that validates this blockchain |
`chainName` | string | undefined | Optional A human readable name for the chain; need not be unique |
`vmID` | string | undefined | Optional ID of the VM running on the new chain |
`fxIDs` | string[] | undefined | Optional IDs of the feature extensions running on the new chain |
`genesisData` | [GenesisData](api_avm_genesisdata.genesisdata.md) | undefined | Optional Byte representation of genesis state of the new chain |
`subnetAuth` | [SubnetAuth](api_platformvm_subnetauth.subnetauth.md) | undefined | Optional Specifies the addresses whose signatures will be provided to demonstrate that the owners of a subnet approve something |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction created from the passed in parameters.

___

###  buildCreateSubnetTx

▸ **buildCreateSubnetTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `fromAddresses`: string[], `changeAddresses`: string[], `subnetOwnerAddresses`: string[], `subnetOwnerThreshold`: number, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1772](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1772)*

Class representing an unsigned [CreateSubnetTx](api_platformvm_createsubnettx.createsubnettx.md) transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | string[] | - | The addresses that can spend the change remaining from the spent UTXOs |
`subnetOwnerAddresses` | string[] | - | An array of addresses for owners of the new subnet |
`subnetOwnerThreshold` | number | - | A number indicating the amount of signatures required to add validators to a subnet |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction created from the passed in parameters.

___

###  buildExportTx

▸ **buildExportTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `amount`: BN, `destinationChain`: Buffer | string, `toAddresses`: string[], `fromAddresses`: string[], `changeAddresses`: string[], `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1390](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1390)*

Helper function which creates an unsigned Export Tx. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`amount` | BN | - | The amount being exported as a [BN](https://github.com/indutny/bn.js/) |
`destinationChain` | Buffer &#124; string | - | The chainid for where the assets will be sent. |
`toAddresses` | string[] | - | The addresses to send the funds |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs provided |
`changeAddresses` | string[] | undefined | The addresses that can spend the change remaining from the spent UTXOs |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains an [ExportTx](api_evm_exporttx.exporttx.md).

___

###  buildImportTx

▸ **buildImportTx**(`utxoset`: [UTXOSet](api_platformvm_utxos.utxoset.md), `ownerAddresses`: string[], `sourceChain`: Buffer | string, `toAddresses`: string[], `fromAddresses`: string[], `changeAddresses`: string[], `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

*Defined in [src/apis/platformvm/api.ts:1298](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1298)*

Helper function which creates an unsigned Import Tx. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**`remarks`** 
This helper exists because the endpoint API should be the primary point of entry for most functionality.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_platformvm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`ownerAddresses` | string[] | - | The addresses being used to import |
`sourceChain` | Buffer &#124; string | - | The chainid for where the import is coming from. |
`toAddresses` | string[] | - | The addresses to send the funds |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs provided |
`changeAddresses` | string[] | undefined | The addresses that can spend the change remaining from the spent UTXOs |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *Promise‹[UnsignedTx](api_platformvm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains a [ImportTx](api_evm_importtx.importtx.md).

___

###  callMethod

▸ **callMethod**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `headers?`: object): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[callMethod](common_jrpcapi.jrpcapi.md#callmethod)*

*Defined in [src/common/jrpcapi.ts:14](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseURL?` | string |
`headers?` | object |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  checkGooseEgg

▸ **checkGooseEgg**(`utx`: [UnsignedTx](api_platformvm_transactions.unsignedtx.md), `outTotal`: BN): *Promise‹boolean›*

*Defined in [src/apis/platformvm/api.ts:339](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L339)*

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

*Defined in [src/apis/platformvm/api.ts:460](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L460)*

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

▸ **createBlockchain**(`username`: string, `password`: string, `subnetID`: Buffer | string, `vmID`: string, `fxIDs`: number[], `name`: string, `genesis`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:380](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L380)*

Creates a new blockchain.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`username` | string | - | The username of the Keystore user that controls the new account |
`password` | string | - | The password of the Keystore user that controls the new account |
`subnetID` | Buffer &#124; string | undefined | Optional. Either a [Buffer](https://github.com/feross/buffer) or an cb58 serialized string for the SubnetID or its alias. |
`vmID` | string | - | The ID of the Virtual Machine the blockchain runs. Can also be an alias of the Virtual Machine. |
`fxIDs` | number[] | - | The ids of the FXs the VM is running. |
`name` | string | - | A human-readable name for the new blockchain |
`genesis` | string | - | The base 58 (with checksum) representation of the genesis state of the new blockchain. Virtual Machines should have a static API method named buildGenesis that can be used to generate genesisData.  |

**Returns:** *Promise‹string›*

Promise for the unsigned transaction to create this blockchain. Must be signed by a sufficient number of the Subnet’s control keys and by the account paying the transaction fee.

___

###  createSubnet

▸ **createSubnet**(`username`: string, `password`: string, `controlKeys`: string[], `threshold`: number): *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

*Defined in [src/apis/platformvm/api.ts:753](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L753)*

Create an unsigned transaction to create a new Subnet. The unsigned transaction must be
signed with the key of the account paying the transaction fee. The Subnet’s ID is the ID of the transaction that creates it (ie the response from issueTx when issuing the signed transaction).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The username of the Keystore user |
`password` | string | The password of the Keystore user |
`controlKeys` | string[] | Array of platform addresses as strings |
`threshold` | number | To add a validator to this Subnet, a transaction must have threshold signatures, where each signature is from a key whose address is an element of `controlKeys`  |

**Returns:** *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

Promise for a string with the unsigned transaction encoded as base58.

___

###  exportAVAX

▸ **exportAVAX**(`username`: string, `password`: string, `amount`: BN, `to`: string): *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

*Defined in [src/apis/platformvm/api.ts:843](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L843)*

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

**Returns:** *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

Promise for an unsigned transaction to be signed by the account the the AVAX is
sent from and pays the transaction fee.

___

###  exportKey

▸ **exportKey**(`username`: string, `password`: string, `address`: string): *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

*Defined in [src/apis/platformvm/api.ts:1115](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1115)*

Exports the private key for an address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The name of the user with the private key |
`password` | string | The password used to decrypt the private key |
`address` | string | The address whose private key should be exported  |

**Returns:** *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

Promise with the decrypted private key as store in the database

___

###  getAVAXAssetID

▸ **getAVAXAssetID**(`refresh`: boolean): *Promise‹Buffer›*

*Defined in [src/apis/platformvm/api.ts:198](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L198)*

Fetches the AVAX AssetID and returns it in a Promise.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`refresh` | boolean | false | This function caches the response. Refresh = true will bust the cache.  |

**Returns:** *Promise‹Buffer›*

The the provided string representing the AVAX AssetID

___

###  getBalance

▸ **getBalance**(`address`: string): *Promise‹[GetBalanceResponse](../interfaces/platformvm_interfaces.getbalanceresponse.md)›*

*Defined in [src/apis/platformvm/api.ts:482](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L482)*

Gets the balance of a particular asset.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | The address to pull the asset balance from  |

**Returns:** *Promise‹[GetBalanceResponse](../interfaces/platformvm_interfaces.getbalanceresponse.md)›*

Promise with the balance as a [BN](https://github.com/indutny/bn.js/) on the provided address.

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:53](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L53)*

Returns the baseURL's path.

**Returns:** *string*

___

###  getBlockchainAlias

▸ **getBlockchainAlias**(): *string*

*Defined in [src/apis/platformvm/api.ts:102](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L102)*

Gets the alias for the blockchainID if it exists, otherwise returns `undefined`.

**Returns:** *string*

The alias for the blockchainID

___

###  getBlockchainID

▸ **getBlockchainID**(): *string*

*Defined in [src/apis/platformvm/api.ts:137](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L137)*

Gets the blockchainID and returns it.

**Returns:** *string*

The blockchainID

___

###  getBlockchainStatus

▸ **getBlockchainStatus**(`blockchainID`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:416](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L416)*

Gets the status of a blockchain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`blockchainID` | string | The blockchainID requesting a status update  |

**Returns:** *Promise‹string›*

Promise for a string of one of: "Validating", "Created", "Preferred", "Unknown".

___

###  getBlockchains

▸ **getBlockchains**(): *Promise‹[Blockchain](../interfaces/platformvm_interfaces.blockchain.md)[]›*

*Defined in [src/apis/platformvm/api.ts:822](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L822)*

Get all the blockchains that exist (excluding the P-Chain).

**Returns:** *Promise‹[Blockchain](../interfaces/platformvm_interfaces.blockchain.md)[]›*

Promise for an array of objects containing fields "id", "subnetID", and "vmID".

___

###  getCreateChainTxFee

▸ **getCreateChainTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:261](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L261)*

Gets the CreateChainTx fee.

**Returns:** *BN*

The CreateChainTx fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getCreateSubnetTxFee

▸ **getCreateSubnetTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:248](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L248)*

Gets the CreateSubnetTx fee.

**Returns:** *BN*

The CreateSubnetTx fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getCreationTxFee

▸ **getCreationTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:292](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L292)*

Gets the creation fee for this chain.

**Returns:** *BN*

The creation fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getCurrentSupply

▸ **getCurrentSupply**(): *Promise‹BN›*

*Defined in [src/apis/platformvm/api.ts:936](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L936)*

Returns an upper bound on the amount of tokens that exist. Not monotonically increasing because this number can go down if a staker"s reward is denied.

**Returns:** *Promise‹BN›*

___

###  getCurrentValidators

▸ **getCurrentValidators**(`subnetID`: Buffer | string, `nodeIDs`: string[]): *Promise‹object›*

*Defined in [src/apis/platformvm/api.ts:532](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L532)*

Lists the set of current validators.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`subnetID` | Buffer &#124; string | undefined | Optional. Either a [Buffer](https://github.com/feross/buffer) or an cb58 serialized string for the SubnetID or its alias. |
`nodeIDs` | string[] | undefined | Optional. An array of strings  |

**Returns:** *Promise‹object›*

Promise for an array of validators that are currently staking, see: [platform.getCurrentValidators documentation](https://docs.avax.network/v1.0/en/api/platform/#platformgetcurrentvalidators).

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L58)*

Returns the baseURL's database.

**Returns:** *StoreAPI*

___

###  getDefaultCreationTxFee

▸ **getDefaultCreationTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:281](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L281)*

Gets the default creation fee for this chain.

**Returns:** *BN*

The default creation fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getDefaultTxFee

▸ **getDefaultTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:225](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L225)*

Gets the default tx fee for this chain.

**Returns:** *BN*

The default tx fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getHeight

▸ **getHeight**(): *Promise‹BN›*

*Defined in [src/apis/platformvm/api.ts:946](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L946)*

Returns the height of the platform chain.

**Returns:** *Promise‹BN›*

___

###  getMaxStakeAmount

▸ **getMaxStakeAmount**(`subnetID`: string | Buffer, `nodeID`: string, `startTime`: BN, `endTime`: BN): *Promise‹BN›*

*Defined in [src/apis/platformvm/api.ts:1003](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1003)*

getMaxStakeAmount() returns the maximum amount of nAVAX staking to the named node during the time period.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subnetID` | string &#124; Buffer | A Buffer or cb58 string representing subnet |
`nodeID` | string | A string representing ID of the node whose stake amount is required during the given duration |
`startTime` | BN | A big number denoting start time of the duration during which stake amount of the node is required. |
`endTime` | BN | A big number denoting end time of the duration during which stake amount of the node is required. |

**Returns:** *Promise‹BN›*

A big number representing total staked by validators on the primary network

___

###  getMinStake

▸ **getMinStake**(`refresh`: boolean): *Promise‹[GetMinStakeResponse](../interfaces/platformvm_interfaces.getminstakeresponse.md)›*

*Defined in [src/apis/platformvm/api.ts:958](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L958)*

Gets the minimum staking amount.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`refresh` | boolean | false | A boolean to bypass the local cached value of Minimum Stake Amount, polling the node instead.  |

**Returns:** *Promise‹[GetMinStakeResponse](../interfaces/platformvm_interfaces.getminstakeresponse.md)›*

___

###  getPendingValidators

▸ **getPendingValidators**(`subnetID`: Buffer | string, `nodeIDs`: string[]): *Promise‹object›*

*Defined in [src/apis/platformvm/api.ts:562](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L562)*

Lists the set of pending validators.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`subnetID` | Buffer &#124; string | undefined | Optional. Either a [Buffer](https://github.com/feross/buffer) or a cb58 serialized string for the SubnetID or its alias. |
`nodeIDs` | string[] | undefined | Optional. An array of strings  |

**Returns:** *Promise‹object›*

Promise for an array of validators that are pending staking, see: [platform.getPendingValidators documentation](https://docs.avax.network/v1.0/en/api/platform/#platformgetpendingvalidators).

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L78)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  getRewardUTXOs

▸ **getRewardUTXOs**(`txID`: string, `encoding?`: string): *Promise‹[GetRewardUTXOsResponse](../interfaces/platformvm_interfaces.getrewardutxosresponse.md)›*

*Defined in [src/apis/platformvm/api.ts:1965](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1965)*

**Parameters:**

Name | Type |
------ | ------ |
`txID` | string |
`encoding?` | string |

**Returns:** *Promise‹[GetRewardUTXOsResponse](../interfaces/platformvm_interfaces.getrewardutxosresponse.md)›*

the UTXOs that were rewarded after the provided transaction"s staking or delegation period ended.

___

###  getStake

▸ **getStake**(`addresses`: string[], `encoding`: string): *Promise‹[GetStakeResponse](../interfaces/platformvm_interfaces.getstakeresponse.md)›*

*Defined in [src/apis/platformvm/api.ts:1055](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1055)*

Gets the total amount staked for an array of addresses.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | string[] | - |
`encoding` | string | "cb58" |

**Returns:** *Promise‹[GetStakeResponse](../interfaces/platformvm_interfaces.getstakeresponse.md)›*

___

###  getStakingAssetID

▸ **getStakingAssetID**(): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:360](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L360)*

Retrieves an assetID for a subnet"s staking assset.

**Returns:** *Promise‹string›*

Returns a Promise string with cb58 encoded value of the assetID.

___

###  getSubnets

▸ **getSubnets**(`ids`: string[]): *Promise‹[Subnet](../interfaces/platformvm_interfaces.subnet.md)[]›*

*Defined in [src/apis/platformvm/api.ts:1094](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1094)*

Get all the subnets that exist.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ids` | string[] | undefined | IDs of the subnets to retrieve information about. If omitted, gets all subnets  |

**Returns:** *Promise‹[Subnet](../interfaces/platformvm_interfaces.subnet.md)[]›*

Promise for an array of objects containing fields "id",
"controlKeys", and "threshold".

___

###  getTimestamp

▸ **getTimestamp**(): *Promise‹number›*

*Defined in [src/apis/platformvm/api.ts:1955](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1955)*

**Returns:** *Promise‹number›*

the current timestamp on chain.

___

###  getTotalStake

▸ **getTotalStake**(): *Promise‹BN›*

*Defined in [src/apis/platformvm/api.ts:987](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L987)*

getTotalStake() returns the total amount staked on the Primary Network

**Returns:** *Promise‹BN›*

A big number representing total staked by validators on the primary network

___

###  getTx

▸ **getTx**(`txID`: string, `encoding`: string): *Promise‹string | object›*

*Defined in [src/apis/platformvm/api.ts:1171](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1171)*

Returns the treansaction data of a provided transaction ID by calling the node's `getTx` method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`txID` | string | - | The string representation of the transaction ID |
`encoding` | string | "cb58" | sets the format of the returned transaction. Can be, "cb58", "hex" or "json". Defaults to "cb58".  |

**Returns:** *Promise‹string | object›*

Returns a Promise string or object containing the bytes retrieved from the node

___

###  getTxFee

▸ **getTxFee**(): *BN*

*Defined in [src/apis/platformvm/api.ts:236](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L236)*

Gets the tx fee for this chain.

**Returns:** *BN*

The tx fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getTxStatus

▸ **getTxStatus**(`txid`: string, `includeReason`: boolean): *Promise‹string | [GetTxStatusResponse](../interfaces/platformvm_interfaces.gettxstatusresponse.md)›*

*Defined in [src/apis/platformvm/api.ts:1196](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1196)*

Returns the status of a provided transaction ID by calling the node's `getTxStatus` method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`txid` | string | - | The string representation of the transaction ID |
`includeReason` | boolean | true | Return the reason tx was dropped, if applicable. Defaults to true  |

**Returns:** *Promise‹string | [GetTxStatusResponse](../interfaces/platformvm_interfaces.gettxstatusresponse.md)›*

Returns a Promise string containing the status retrieved from the node and the reason a tx was dropped, if applicable.

___

###  getUTXOs

▸ **getUTXOs**(`addresses`: string[] | string, `sourceChain`: string, `limit`: number, `startIndex`: object, `persistOpts`: [PersistanceOptions](utils_persistanceoptions.persistanceoptions.md), `encoding`: string): *Promise‹[GetUTXOsResponse](../interfaces/platformvm_interfaces.getutxosresponse.md)›*

*Defined in [src/apis/platformvm/api.ts:1227](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1227)*

Retrieves the UTXOs related to the addresses provided from the node's `getUTXOs` method.

**`remarks`** 
persistOpts is optional and must be of type [PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)

**Parameters:**

▪ **addresses**: *string[] | string*

An array of addresses as cb58 strings or addresses as [Buffer](https://github.com/feross/buffer)s

▪`Default value`  **sourceChain**: *string*= undefined

A string for the chain to look for the UTXO"s. Default is to use this chain, but if exported UTXOs exist from other chains, this can used to pull them instead.

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

▪`Default value`  **encoding**: *string*= "cb58"

Optional.  is the encoding format to use for the payload argument. Can be either "cb58" or "hex". Defaults to "hex".

**Returns:** *Promise‹[GetUTXOsResponse](../interfaces/platformvm_interfaces.getutxosresponse.md)›*

___

###  getValidatorsAt

▸ **getValidatorsAt**(`height`: number, `subnetID?`: string): *Promise‹[GetValidatorsAtResponse](../interfaces/platformvm_interfaces.getvalidatorsatresponse.md)›*

*Defined in [src/apis/platformvm/api.ts:435](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L435)*

Get the validators and their weights of a subnet or the Primary Network at a given P-Chain height.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`height` | number | The P-Chain height to get the validator set at. |
`subnetID?` | string | Optional. A cb58 serialized string for the SubnetID or its alias.  |

**Returns:** *Promise‹[GetValidatorsAtResponse](../interfaces/platformvm_interfaces.getvalidatorsatresponse.md)›*

Promise GetValidatorsAtResponse

___

###  importAVAX

▸ **importAVAX**(`username`: string, `password`: string, `to`: string, `sourceChain`: string): *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

*Defined in [src/apis/platformvm/api.ts:879](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L879)*

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

**Returns:** *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

Promise for a string for the transaction, which should be sent to the network
by calling issueTx.

___

###  importKey

▸ **importKey**(`username`: string, `password`: string, `privateKey`: string): *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

*Defined in [src/apis/platformvm/api.ts:1143](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1143)*

Give a user control over an address by providing the private key that controls the address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The name of the user to store the private key |
`password` | string | The password that unlocks the user |
`privateKey` | string | A string representing the private key in the vm"s format  |

**Returns:** *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

The address for the imported private key.

___

###  issueTx

▸ **issueTx**(`tx`: string | Buffer | [Tx](api_platformvm_transactions.tx.md)): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:907](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L907)*

Calls the node's issueTx method from the API and returns the resulting transaction ID as a string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tx` | string &#124; Buffer &#124; [Tx](api_platformvm_transactions.tx.md) | A string, [Buffer](https://github.com/feross/buffer), or [Tx](api_evm_transactions.tx.md) representing a transaction  |

**Returns:** *Promise‹string›*

A Promise string representing the transaction ID of the posted transaction.

___

###  keyChain

▸ **keyChain**(): *[KeyChain](api_platformvm_keychain.keychain.md)*

*Defined in [src/apis/platformvm/api.ts:313](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L313)*

Gets a reference to the keychain for this class.

**Returns:** *[KeyChain](api_platformvm_keychain.keychain.md)*

The instance of [[]] for this class

___

###  listAddresses

▸ **listAddresses**(`username`: string, `password`: string): *Promise‹string[]›*

*Defined in [src/apis/platformvm/api.ts:507](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L507)*

List the addresses controlled by the user.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The username of the Keystore user |
`password` | string | The password of the Keystore user  |

**Returns:** *Promise‹string[]›*

Promise for an array of addresses.

___

###  parseAddress

▸ **parseAddress**(`addr`: string): *Buffer*

*Defined in [src/apis/platformvm/api.ts:167](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L167)*

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

*Defined in [src/apis/platformvm/api.ts:146](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L146)*

Refresh blockchainID, and if a blockchainID is passed in, use that.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`blockchainID` | string | undefined |

**Returns:** *boolean*

The blockchainID

___

###  sampleValidators

▸ **sampleValidators**(`sampleSize`: number, `subnetID`: Buffer | string): *Promise‹string[]›*

*Defined in [src/apis/platformvm/api.ts:592](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L592)*

Samples `Size` validators from the current validator set.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`sampleSize` | number | - | Of the total universe of validators, select this many at random |
`subnetID` | Buffer &#124; string | undefined | Optional. Either a [Buffer](https://github.com/feross/buffer) or an cb58 serialized string for the SubnetID or its alias.  |

**Returns:** *Promise‹string[]›*

Promise for an array of validator"s stakingIDs.

___

###  setAVAXAssetID

▸ **setAVAXAssetID**(`avaxAssetID`: string | Buffer): *void*

*Defined in [src/apis/platformvm/api.ts:213](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L213)*

Overrides the defaults and sets the cache to a specific AVAX AssetID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`avaxAssetID` | string &#124; Buffer | A cb58 string or Buffer representing the AVAX AssetID  |

**Returns:** *void*

The the provided string representing the AVAX AssetID

___

###  setBaseURL

▸ **setBaseURL**(`baseURL`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:37](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L37)*

Sets the path of the APIs baseURL.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseURL` | string | Path of the APIs baseURL - ex: "/ext/bc/X"  |

**Returns:** *void*

___

###  setBlockchainAlias

▸ **setBlockchainAlias**(`alias`: string): *string*

*Defined in [src/apis/platformvm/api.ts:126](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L126)*

Sets the alias for the blockchainID.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`alias` | string | The alias for the blockchainID.   |

**Returns:** *string*

___

###  setCreationTxFee

▸ **setCreationTxFee**(`fee`: BN): *void*

*Defined in [src/apis/platformvm/api.ts:304](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L304)*

Sets the creation fee for this chain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fee` | BN | The creation fee amount to set as [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *void*

___

###  setMinStake

▸ **setMinStake**(`minValidatorStake`: BN, `minDelegatorStake`: BN): *void*

*Defined in [src/apis/platformvm/api.ts:1040](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L1040)*

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

*Defined in [src/apis/platformvm/api.ts:272](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L272)*

Sets the tx fee for this chain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fee` | BN | The tx fee amount to set as [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *void*

___

###  validatedBy

▸ **validatedBy**(`blockchainID`: string): *Promise‹string›*

*Defined in [src/apis/platformvm/api.ts:782](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L782)*

Get the Subnet that validates a given blockchain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`blockchainID` | string | Either a [Buffer](https://github.com/feross/buffer) or a cb58 encoded string for the blockchainID or its alias.  |

**Returns:** *Promise‹string›*

Promise for a string of the subnetID that validates the blockchain.

___

###  validates

▸ **validates**(`subnetID`: Buffer | string): *Promise‹string[]›*

*Defined in [src/apis/platformvm/api.ts:801](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/api.ts#L801)*

Get the IDs of the blockchains a Subnet validates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subnetID` | Buffer &#124; string | Either a [Buffer](https://github.com/feross/buffer) or an AVAX serialized string for the SubnetID or its alias.  |

**Returns:** *Promise‹string[]›*

Promise for an array of blockchainIDs the subnet validates.
