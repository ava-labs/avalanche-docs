[avalanche](../README.md) › [API-AVM](../modules/api_avm.md) › [AVMAPI](api_avm.avmapi.md)

# Class: AVMAPI

Class for interacting with a node endpoint that is using the AVM.

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **AVMAPI**

## Index

### Constructors

* [constructor](api_avm.avmapi.md#constructor)

### Properties

* [AVAXAssetID](api_avm.avmapi.md#protected-avaxassetid)
* [baseURL](api_avm.avmapi.md#protected-baseurl)
* [blockchainAlias](api_avm.avmapi.md#protected-blockchainalias)
* [blockchainID](api_avm.avmapi.md#protected-blockchainid)
* [core](api_avm.avmapi.md#protected-core)
* [creationTxFee](api_avm.avmapi.md#protected-creationtxfee)
* [db](api_avm.avmapi.md#protected-db)
* [jrpcVersion](api_avm.avmapi.md#protected-jrpcversion)
* [rpcID](api_avm.avmapi.md#protected-rpcid)
* [txFee](api_avm.avmapi.md#protected-txfee)

### Methods

* [addressFromBuffer](api_avm.avmapi.md#addressfrombuffer)
* [buildBaseTx](api_avm.avmapi.md#buildbasetx)
* [buildCreateAssetTx](api_avm.avmapi.md#buildcreateassettx)
* [buildCreateNFTAssetTx](api_avm.avmapi.md#buildcreatenftassettx)
* [buildCreateNFTMintTx](api_avm.avmapi.md#buildcreatenftminttx)
* [buildExportTx](api_avm.avmapi.md#buildexporttx)
* [buildGenesis](api_avm.avmapi.md#buildgenesis)
* [buildImportTx](api_avm.avmapi.md#buildimporttx)
* [buildNFTTransferTx](api_avm.avmapi.md#buildnfttransfertx)
* [buildSECPMintTx](api_avm.avmapi.md#buildsecpminttx)
* [callMethod](api_avm.avmapi.md#callmethod)
* [checkGooseEgg](api_avm.avmapi.md#checkgooseegg)
* [createAddress](api_avm.avmapi.md#createaddress)
* [createFixedCapAsset](api_avm.avmapi.md#createfixedcapasset)
* [createVariableCapAsset](api_avm.avmapi.md#createvariablecapasset)
* [export](api_avm.avmapi.md#export)
* [exportKey](api_avm.avmapi.md#exportkey)
* [getAVAXAssetID](api_avm.avmapi.md#getavaxassetid)
* [getAllBalances](api_avm.avmapi.md#getallbalances)
* [getAssetDescription](api_avm.avmapi.md#getassetdescription)
* [getBalance](api_avm.avmapi.md#getbalance)
* [getBaseURL](api_avm.avmapi.md#getbaseurl)
* [getBlockchainAlias](api_avm.avmapi.md#getblockchainalias)
* [getBlockchainID](api_avm.avmapi.md#getblockchainid)
* [getCreationTxFee](api_avm.avmapi.md#getcreationtxfee)
* [getDB](api_avm.avmapi.md#getdb)
* [getDefaultCreationTxFee](api_avm.avmapi.md#getdefaultcreationtxfee)
* [getDefaultTxFee](api_avm.avmapi.md#getdefaulttxfee)
* [getRPCID](api_avm.avmapi.md#getrpcid)
* [getTx](api_avm.avmapi.md#gettx)
* [getTxFee](api_avm.avmapi.md#gettxfee)
* [getTxStatus](api_avm.avmapi.md#gettxstatus)
* [getUTXOs](api_avm.avmapi.md#getutxos)
* [import](api_avm.avmapi.md#import)
* [importKey](api_avm.avmapi.md#importkey)
* [issueTx](api_avm.avmapi.md#issuetx)
* [keyChain](api_avm.avmapi.md#keychain)
* [listAddresses](api_avm.avmapi.md#listaddresses)
* [mint](api_avm.avmapi.md#mint)
* [parseAddress](api_avm.avmapi.md#parseaddress)
* [refreshBlockchainID](api_avm.avmapi.md#refreshblockchainid)
* [send](api_avm.avmapi.md#send)
* [sendMultiple](api_avm.avmapi.md#sendmultiple)
* [setAVAXAssetID](api_avm.avmapi.md#setavaxassetid)
* [setBaseURL](api_avm.avmapi.md#setbaseurl)
* [setBlockchainAlias](api_avm.avmapi.md#setblockchainalias)
* [setCreationTxFee](api_avm.avmapi.md#setcreationtxfee)
* [setTxFee](api_avm.avmapi.md#settxfee)
* [signTx](api_avm.avmapi.md#signtx)

## Constructors

###  constructor

\+ **new AVMAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string, `blockchainID`: string): *[AVMAPI](api_avm.avmapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/avm/api.ts:1782](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1782)*

This class should not be instantiated directly. Instead use the [[Avalanche.addAP`${I}`]] method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseURL` | string | "/ext/bc/X" | Defaults to the string "/ext/bc/X" as the path to blockchain's baseURL |
`blockchainID` | string | "" | The Blockchain"s ID. Defaults to an empty string: ""  |

**Returns:** *[AVMAPI](api_avm.avmapi.md)*

## Properties

### `Protected` AVAXAssetID

• **AVAXAssetID**: *Buffer* = undefined

*Defined in [src/apis/avm/api.ts:77](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L77)*

___

### `Protected` baseURL

• **baseURL**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseURL](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:29](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/apibase.ts#L29)*

___

### `Protected` blockchainAlias

• **blockchainAlias**: *string* = undefined

*Defined in [src/apis/avm/api.ts:76](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L76)*

___

### `Protected` blockchainID

• **blockchainID**: *string* = ""

*Defined in [src/apis/avm/api.ts:75](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L75)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:28](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/apibase.ts#L28)*

___

### `Protected` creationTxFee

• **creationTxFee**: *BN* = undefined

*Defined in [src/apis/avm/api.ts:79](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L79)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:30](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/apibase.ts#L30)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)*

*Defined in [src/common/jrpcapi.ts:11](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/jrpcapi.ts#L11)*

___

### `Protected` rpcID

• **rpcID**: *number* = 1

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[rpcID](common_jrpcapi.jrpcapi.md#protected-rpcid)*

*Defined in [src/common/jrpcapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/jrpcapi.ts#L12)*

___

### `Protected` txFee

• **txFee**: *BN* = undefined

*Defined in [src/apis/avm/api.ts:78](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L78)*

## Methods

###  addressFromBuffer

▸ **addressFromBuffer**(`address`: Buffer): *string*

*Defined in [src/apis/avm/api.ts:162](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | Buffer |

**Returns:** *string*

___

###  buildBaseTx

▸ **buildBaseTx**(`utxoset`: [UTXOSet](api_avm_utxos.utxoset.md), `amount`: BN, `assetID`: Buffer | string, `toAddresses`: string[], `fromAddresses`: string[], `changeAddresses`: string[], `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

*Defined in [src/apis/avm/api.ts:848](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L848)*

Helper function which creates an unsigned transaction. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**`remarks`** 
This helper exists because the endpoint API should be the primary point of entry for most functionality.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_avm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`amount` | BN | - | The amount of AssetID to be spent in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/). |
`assetID` | Buffer &#124; string | undefined | The assetID of the value being sent |
`toAddresses` | string[] | - | The addresses to send the funds |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs provided |
`changeAddresses` | string[] | - | The addresses that can spend the change remaining from the spent UTXOs |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains a [BaseTx](api_avm_basetx.basetx.md).

___

###  buildCreateAssetTx

▸ **buildCreateAssetTx**(`utxoset`: [UTXOSet](api_avm_utxos.utxoset.md), `fromAddresses`: string[], `changeAddresses`: string[], `initialStates`: [InitialStates](api_avm_initialstates.initialstates.md), `name`: string, `symbol`: string, `denomination`: number, `mintOutputs`: [SECPMintOutput](api_avm_outputs.secpmintoutput.md)[], `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

*Defined in [src/apis/avm/api.ts:1222](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1222)*

Creates an unsigned transaction. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_avm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | string[] | - | The addresses that can spend the change remaining from the spent UTXOs |
`initialStates` | [InitialStates](api_avm_initialstates.initialstates.md) | - | - |
`name` | string | - | String for the descriptive name of the asset |
`symbol` | string | - | String for the ticker symbol of the asset |
`denomination` | number | - | Number for the denomination which is 10^D. D must be >= 0 and <= 32. Ex: $1 AVAX = 10^9 $nAVAX |
`mintOutputs` | [SECPMintOutput](api_avm_outputs.secpmintoutput.md)[] | undefined | Optional. Array of [SECPMintOutput](api_avm_outputs.secpmintoutput.md)s to be included in the transaction. These outputs can be spent to mint more tokens. |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains a [CreateAssetTx](api_avm_createassettx.createassettx.md).

___

###  buildCreateNFTAssetTx

▸ **buildCreateNFTAssetTx**(`utxoset`: [UTXOSet](api_avm_utxos.utxoset.md), `fromAddresses`: string[], `changeAddresses`: string[], `minterSets`: [MinterSet](api_avm_minterset.minterset.md)[], `name`: string, `symbol`: string, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN): *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

*Defined in [src/apis/avm/api.ts:1375](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1375)*

Creates an unsigned transaction. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_avm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | string[] | - | The addresses that can spend the change remaining from the spent UTXOs |
`minterSets` | [MinterSet](api_avm_minterset.minterset.md)[] | - | is a list where each element specifies that threshold of the addresses in minters may together mint more of the asset by signing a minting transaction |
`name` | string | - | String for the descriptive name of the asset |
`symbol` | string | - | String for the ticker symbol of the asset |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting mint output  ```js Example minterSets: [      {          "minters":[              "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"          ],          "threshold": 1      },      {          "minters": [              "X-avax1yell3e4nln0m39cfpdhgqprsd87jkh4qnakklx",              "X-avax1k4nr26c80jaquzm9369j5a4shmwcjn0vmemcjz",              "X-avax1ztkzsrjnkn0cek5ryvhqswdtcg23nhge3nnr5e"          ],          "threshold": 2      } ] ```  |

**Returns:** *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains a [CreateAssetTx](api_avm_createassettx.createassettx.md).

___

###  buildCreateNFTMintTx

▸ **buildCreateNFTMintTx**(`utxoset`: [UTXOSet](api_avm_utxos.utxoset.md), `owners`: [OutputOwners](common_output.outputowners.md)[] | [OutputOwners](common_output.outputowners.md), `fromAddresses`: string[], `changeAddresses`: string[], `utxoid`: string | string[], `groupID`: number, `payload`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹any›*

*Defined in [src/apis/avm/api.ts:1454](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1454)*

Creates an unsigned transaction. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_avm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`owners` | [OutputOwners](common_output.outputowners.md)[] &#124; [OutputOwners](common_output.outputowners.md) | - | Either a single or an array of [OutputOwners](../modules/src_common.md#outputowners) to send the nft output |
`fromAddresses` | string[] | - | The addresses being used to send the NFT from the utxoID provided |
`changeAddresses` | string[] | - | The addresses that can spend the change remaining from the spent UTXOs |
`utxoid` | string &#124; string[] | - | A base58 utxoID or an array of base58 utxoIDs for the nft mint output this transaction is sending |
`groupID` | number | 0 | Optional. The group this NFT is issued to. |
`payload` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional. Data for NFT Payload as either a [PayloadBase](utils_payload.payloadbase.md) or a [Buffer](https://github.com/feross/buffer) |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹any›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains an [OperationTx](api_avm_operationtx.operationtx.md).

___

###  buildExportTx

▸ **buildExportTx**(`utxoset`: [UTXOSet](api_avm_utxos.utxoset.md), `amount`: BN, `destinationChain`: Buffer | string, `toAddresses`: string[], `fromAddresses`: string[], `changeAddresses`: string[], `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number, `assetID`: string): *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

*Defined in [src/apis/avm/api.ts:1112](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1112)*

Helper function which creates an unsigned Export Tx. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_avm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`amount` | BN | - | The amount being exported as a [BN](https://github.com/indutny/bn.js/) |
`destinationChain` | Buffer &#124; string | - | The chainid for where the assets will be sent. |
`toAddresses` | string[] | - | The addresses to send the funds |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs provided |
`changeAddresses` | string[] | undefined | The addresses that can spend the change remaining from the spent UTXOs |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO |
`assetID` | string | undefined | Optional. The assetID of the asset to send. Defaults to AVAX assetID. Regardless of the asset which you"re exporting, all fees are paid in AVAX.  |

**Returns:** *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains an [ExportTx](api_evm_exporttx.exporttx.md).

___

###  buildGenesis

▸ **buildGenesis**(`genesisData`: object): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:1733](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1733)*

Given a JSON representation of this Virtual Machine’s genesis state, create the byte representation of that state.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`genesisData` | object | The blockchain's genesis data object  |

**Returns:** *Promise‹string›*

Promise of a string of bytes

___

###  buildImportTx

▸ **buildImportTx**(`utxoset`: [UTXOSet](api_avm_utxos.utxoset.md), `ownerAddresses`: string[], `sourceChain`: Buffer | string, `toAddresses`: string[], `fromAddresses`: string[], `changeAddresses`: string[], `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

*Defined in [src/apis/avm/api.ts:1007](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1007)*

Helper function which creates an unsigned Import Tx. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**`remarks`** 
This helper exists because the endpoint API should be the primary point of entry for most functionality.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_avm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`ownerAddresses` | string[] | - | The addresses being used to import |
`sourceChain` | Buffer &#124; string | - | The chainid for where the import is coming from |
`toAddresses` | string[] | - | The addresses to send the funds |
`fromAddresses` | string[] | - | The addresses being used to send the funds from the UTXOs provided |
`changeAddresses` | string[] | undefined | The addresses that can spend the change remaining from the spent UTXOs |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains a [ImportTx](api_evm_importtx.importtx.md).

___

###  buildNFTTransferTx

▸ **buildNFTTransferTx**(`utxoset`: [UTXOSet](api_avm_utxos.utxoset.md), `toAddresses`: string[], `fromAddresses`: string[], `changeAddresses`: string[], `utxoid`: string | string[], `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

*Defined in [src/apis/avm/api.ts:926](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L926)*

Helper function which creates an unsigned NFT Transfer. For more granular control, you may create your own
[UnsignedTx](api_evm_transactions.unsignedtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**`remarks`** 
This helper exists because the endpoint API should be the primary point of entry for most functionality.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoset` | [UTXOSet](api_avm_utxos.utxoset.md) | - | A set of UTXOs that the transaction is built on |
`toAddresses` | string[] | - | The addresses to send the NFT |
`fromAddresses` | string[] | - | The addresses being used to send the NFT from the utxoID provided |
`changeAddresses` | string[] | - | The addresses that can spend the change remaining from the spent UTXOs |
`utxoid` | string &#124; string[] | - | A base58 utxoID or an array of base58 utxoIDs for the nfts this transaction is sending |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined | Optional CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *Promise‹[UnsignedTx](api_avm_transactions.unsignedtx.md)›*

An unsigned transaction ([UnsignedTx](api_evm_transactions.unsignedtx.md)) which contains a [[NFTTransferTx]].

___

###  buildSECPMintTx

▸ **buildSECPMintTx**(`utxoset`: [UTXOSet](api_avm_utxos.utxoset.md), `mintOwner`: [SECPMintOutput](api_avm_outputs.secpmintoutput.md), `transferOwner`: [SECPTransferOutput](api_avm_outputs.secptransferoutput.md), `fromAddresses`: string[], `changeAddresses`: string[], `mintUTXOID`: string, `memo`: [PayloadBase](utils_payload.payloadbase.md) | Buffer, `asOf`: BN): *Promise‹any›*

*Defined in [src/apis/avm/api.ts:1291](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1291)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`utxoset` | [UTXOSet](api_avm_utxos.utxoset.md) | - |
`mintOwner` | [SECPMintOutput](api_avm_outputs.secpmintoutput.md) | - |
`transferOwner` | [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) | - |
`fromAddresses` | string[] | - |
`changeAddresses` | string[] | - |
`mintUTXOID` | string | - |
`memo` | [PayloadBase](utils_payload.payloadbase.md) &#124; Buffer | undefined |
`asOf` | BN | UnixNow() |

**Returns:** *Promise‹any›*

___

###  callMethod

▸ **callMethod**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `headers?`: object): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[callMethod](common_jrpcapi.jrpcapi.md#callmethod)*

*Defined in [src/common/jrpcapi.ts:14](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/jrpcapi.ts#L14)*

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

▸ **checkGooseEgg**(`utx`: [UnsignedTx](api_avm_transactions.unsignedtx.md), `outTotal`: BN): *Promise‹boolean›*

*Defined in [src/apis/avm/api.ts:301](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L301)*

Helper function which determines if a tx is a goose egg transaction.

**`remarks`** 
A "Goose Egg Transaction" is when the fee far exceeds a reasonable amount

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utx` | [UnsignedTx](api_avm_transactions.unsignedtx.md) | - | An UnsignedTx  |
`outTotal` | BN | new BN(0) | - |

**Returns:** *Promise‹boolean›*

boolean true if passes goose egg test and false if fails.

___

###  createAddress

▸ **createAddress**(`username`: string, `password`: string): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:357](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L357)*

Creates an address (and associated private keys) on a user on a blockchain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | Name of the user to create the address under |
`password` | string | Password to unlock the user and encrypt the private key  |

**Returns:** *Promise‹string›*

Promise for a string representing the address created by the vm.

___

###  createFixedCapAsset

▸ **createFixedCapAsset**(`username`: string, `password`: string, `name`: string, `symbol`: string, `denomination`: number, `initialHolders`: object[]): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:398](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L398)*

Create a new fixed-cap, fungible asset. A quantity of it is created at initialization and there no more is ever created.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The user paying the transaction fee (in $AVAX) for asset creation |
`password` | string | The password for the user paying the transaction fee (in $AVAX) for asset creation |
`name` | string | The human-readable name for the asset |
`symbol` | string | Optional. The shorthand symbol for the asset. Between 0 and 4 characters |
`denomination` | number | Optional. Determines how balances of this asset are displayed by user interfaces. Default is 0 |
`initialHolders` | object[] | An array of objects containing the field "address" and "amount" to establish the genesis values for the new asset  ```js Example initialHolders: [   {     "address": "X-avax1kj06lhgx84h39snsljcey3tpc046ze68mek3g5",     "amount": 10000   },   {     "address": "X-avax1am4w6hfrvmh3akduzkjthrtgtqafalce6an8cr",     "amount": 50000   } ] ```  |

**Returns:** *Promise‹string›*

Returns a Promise string containing the base 58 string representation of the ID of the newly created asset.

___

###  createVariableCapAsset

▸ **createVariableCapAsset**(`username`: string, `password`: string, `name`: string, `symbol`: string, `denomination`: number, `minterSets`: object[]): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:453](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L453)*

Create a new variable-cap, fungible asset. No units of the asset exist at initialization. Minters can mint units of this asset using createMintTx, signMintTx and sendMintTx.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The user paying the transaction fee (in $AVAX) for asset creation |
`password` | string | The password for the user paying the transaction fee (in $AVAX) for asset creation |
`name` | string | The human-readable name for the asset |
`symbol` | string | Optional. The shorthand symbol for the asset -- between 0 and 4 characters |
`denomination` | number | Optional. Determines how balances of this asset are displayed by user interfaces. Default is 0 |
`minterSets` | object[] | is a list where each element specifies that threshold of the addresses in minters may together mint more of the asset by signing a minting transaction  ```js Example minterSets: [    {      "minters":[        "X-avax1am4w6hfrvmh3akduzkjthrtgtqafalce6an8cr"      ],      "threshold": 1     },     {      "minters": [        "X-avax1am4w6hfrvmh3akduzkjthrtgtqafalce6an8cr",        "X-avax1kj06lhgx84h39snsljcey3tpc046ze68mek3g5",        "X-avax1yell3e4nln0m39cfpdhgqprsd87jkh4qnakklx"      ],      "threshold": 2     } ] ```  |

**Returns:** *Promise‹string›*

Returns a Promise string containing the base 58 string representation of the ID of the newly created asset.

___

###  export

▸ **export**(`username`: string, `password`: string, `to`: string, `amount`: BN, `assetID`: string): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:590](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L590)*

Send ANT (Avalanche Native Token) assets including AVAX from the X-Chain to an account on the P-Chain or C-Chain.

After calling this method, you must call the P-Chain's `import` or the C-Chain’s `import` method to complete the transfer.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The Keystore user that controls the P-Chain or C-Chain account specified in `to` |
`password` | string | The password of the Keystore user |
`to` | string | The account on the P-Chain or C-Chain to send the asset to. |
`amount` | BN | Amount of asset to export as a [BN](https://github.com/indutny/bn.js/) |
`assetID` | string | The asset id which is being sent  |

**Returns:** *Promise‹string›*

String representing the transaction id

___

###  exportKey

▸ **exportKey**(`username`: string, `password`: string, `address`: string): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:530](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L530)*

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

*Defined in [src/apis/avm/api.ts:182](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L182)*

Fetches the AVAX AssetID and returns it in a Promise.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`refresh` | boolean | false | This function caches the response. Refresh = true will bust the cache.  |

**Returns:** *Promise‹Buffer›*

The the provided string representing the AVAX AssetID

___

###  getAllBalances

▸ **getAllBalances**(`address`: string): *Promise‹object[]›*

*Defined in [src/apis/avm/api.ts:673](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L673)*

Retrieves all assets for an address on a server and their associated balances.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | The address to get a list of assets  |

**Returns:** *Promise‹object[]›*

Promise of an object mapping assetID strings with [BN](https://github.com/indutny/bn.js/) balance for the address on the blockchain.

___

###  getAssetDescription

▸ **getAssetDescription**(`assetID`: Buffer | string): *Promise‹object›*

*Defined in [src/apis/avm/api.ts:697](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L697)*

Retrieves an assets name and symbol.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer &#124; string | Either a [Buffer](https://github.com/feross/buffer) or an b58 serialized string for the AssetID or its alias.  |

**Returns:** *Promise‹object›*

Returns a Promise object with keys "name" and "symbol".

___

###  getBalance

▸ **getBalance**(`address`: string, `assetID`: string, `includePartial`: boolean): *Promise‹object›*

*Defined in [src/apis/avm/api.ts:326](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L326)*

Gets the balance of a particular asset on a blockchain.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`address` | string | - | The address to pull the asset balance from |
`assetID` | string | - | The assetID to pull the balance from |
`includePartial` | boolean | false | If includePartial=false, returns only the balance held solely  |

**Returns:** *Promise‹object›*

Promise with the balance of the assetID as a [BN](https://github.com/indutny/bn.js/) on the provided address for the blockchain.

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:53](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/apibase.ts#L53)*

Returns the baseURL's path.

**Returns:** *string*

___

###  getBlockchainAlias

▸ **getBlockchainAlias**(): *string*

*Defined in [src/apis/avm/api.ts:86](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L86)*

Gets the alias for the blockchainID if it exists, otherwise returns `undefined`.

**Returns:** *string*

The alias for the blockchainID

___

###  getBlockchainID

▸ **getBlockchainID**(): *string*

*Defined in [src/apis/avm/api.ts:121](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L121)*

Gets the blockchainID and returns it.

**Returns:** *string*

The blockchainID

___

###  getCreationTxFee

▸ **getCreationTxFee**(): *BN*

*Defined in [src/apis/avm/api.ts:254](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L254)*

Gets the creation fee for this chain.

**Returns:** *BN*

The creation fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/apibase.ts#L58)*

Returns the baseURL's database.

**Returns:** *StoreAPI*

___

###  getDefaultCreationTxFee

▸ **getDefaultCreationTxFee**(): *BN*

*Defined in [src/apis/avm/api.ts:243](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L243)*

Gets the default creation fee for this chain.

**Returns:** *BN*

The default creation fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getDefaultTxFee

▸ **getDefaultTxFee**(): *BN*

*Defined in [src/apis/avm/api.ts:211](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L211)*

Gets the default tx fee for this chain.

**Returns:** *BN*

The default tx fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:78](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/jrpcapi.ts#L78)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  getTx

▸ **getTx**(`txID`: string): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:733](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L733)*

Returns the transaction data of a provided transaction ID by calling the node's `getTx` method.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txID` | string | The string representation of the transaction ID  |

**Returns:** *Promise‹string›*

Returns a Promise string containing the bytes retrieved from the node

___

###  getTxFee

▸ **getTxFee**(): *BN*

*Defined in [src/apis/avm/api.ts:222](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L222)*

Gets the tx fee for this chain.

**Returns:** *BN*

The tx fee as a [BN](https://github.com/indutny/bn.js/)

___

###  getTxStatus

▸ **getTxStatus**(`txID`: string): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:751](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L751)*

Returns the status of a provided transaction ID by calling the node's `getTxStatus` method.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txID` | string | The string representation of the transaction ID  |

**Returns:** *Promise‹string›*

Returns a Promise string containing the status retrieved from the node

___

###  getUTXOs

▸ **getUTXOs**(`addresses`: string[] | string, `sourceChain`: string, `limit`: number, `startIndex`: object, `persistOpts`: [PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)): *Promise‹object›*

*Defined in [src/apis/avm/api.ts:777](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L777)*

Retrieves the UTXOs related to the addresses provided from the node's `getUTXOs` method.

**`remarks`** 
persistOpts is optional and must be of type [PersistanceOptions](utils_persistanceoptions.persistanceoptions.md)

**Parameters:**

▪ **addresses**: *string[] | string*

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

###  import

▸ **import**(`username`: string, `password`: string, `to`: string, `sourceChain`: string): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:624](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L624)*

Send ANT (Avalanche Native Token) assets including AVAX from an account on the P-Chain or C-Chain to an address on the X-Chain. This transaction
must be signed with the key of the account that the asset is sent from and which pays
the transaction fee.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The Keystore user that controls the account specified in `to` |
`password` | string | The password of the Keystore user |
`to` | string | The address of the account the asset is sent to. |
`sourceChain` | string | The chainID where the funds are coming from. Ex: "C"  |

**Returns:** *Promise‹string›*

Promise for a string for the transaction, which should be sent to the network
by calling issueTx.

___

###  importKey

▸ **importKey**(`username`: string, `password`: string, `privateKey`: string): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:560](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L560)*

Imports a private key into the node's keystore under an user and for a blockchain.

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

▸ **issueTx**(`tx`: string | Buffer | [Tx](api_avm_transactions.tx.md)): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:1531](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1531)*

Calls the node's issueTx method from the API and returns the resulting transaction ID as a string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tx` | string &#124; Buffer &#124; [Tx](api_avm_transactions.tx.md) | A string, [Buffer](https://github.com/feross/buffer), or [Tx](api_evm_transactions.tx.md) representing a transaction  |

**Returns:** *Promise‹string›*

A Promise string representing the transaction ID of the posted transaction.

___

###  keyChain

▸ **keyChain**(): *[KeyChain](api_avm_keychain.keychain.md)*

*Defined in [src/apis/avm/api.ts:275](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L275)*

Gets a reference to the keychain for this class.

**Returns:** *[KeyChain](api_avm_keychain.keychain.md)*

The instance of [KeyChain](api_evm_keychain.keychain.md) for this class

___

###  listAddresses

▸ **listAddresses**(`username`: string, `password`: string): *Promise‹string[]›*

*Defined in [src/apis/avm/api.ts:651](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L651)*

Lists all the addresses under a user.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The user to list addresses |
`password` | string | The password of the user to list the addresses  |

**Returns:** *Promise‹string[]›*

Promise of an array of address strings in the format specified by the blockchain.

___

###  mint

▸ **mint**(`username`: string, `password`: string, `amount`: number | BN, `assetID`: Buffer | string, `to`: string, `minters`: string[]): *Promise‹string›*

*Defined in [src/apis/avm/api.ts:486](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L486)*

Create an unsigned transaction to mint more of an asset.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | - |
`password` | string | - |
`amount` | number &#124; BN | The units of the asset to mint |
`assetID` | Buffer &#124; string | The ID of the asset to mint |
`to` | string | The address to assign the units of the minted asset |
`minters` | string[] | Addresses of the minters responsible for signing the transaction  |

**Returns:** *Promise‹string›*

Returns a Promise string containing the base 58 string representation of the unsigned transaction.

___

###  parseAddress

▸ **parseAddress**(`addr`: string): *Buffer*

*Defined in [src/apis/avm/api.ts:151](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L151)*

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

*Defined in [src/apis/avm/api.ts:130](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L130)*

Refresh blockchainID, and if a blockchainID is passed in, use that.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`blockchainID` | string | undefined |

**Returns:** *boolean*

The blockchainID

___

###  send

▸ **send**(`username`: string, `password`: string, `assetID`: string | Buffer, `amount`: number | BN, `to`: string, `from`: string[] | Buffer[], `changeAddr`: string, `memo`: string | Buffer): *Promise‹object›*

*Defined in [src/apis/avm/api.ts:1571](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1571)*

Sends an amount of assetID to the specified address from a list of owned of addresses.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`username` | string | - | The user that owns the private keys associated with the `from` addresses |
`password` | string | - | The password unlocking the user |
`assetID` | string &#124; Buffer | - | The assetID of the asset to send |
`amount` | number &#124; BN | - | The amount of the asset to be sent |
`to` | string | - | The address of the recipient |
`from` | string[] &#124; Buffer[] | undefined | Optional. An array of addresses managed by the node's keystore for this blockchain which will fund this transaction |
`changeAddr` | string | undefined | Optional. An address to send the change |
`memo` | string &#124; Buffer | undefined | Optional. CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes  |

**Returns:** *Promise‹object›*

Promise for the string representing the transaction's ID.

___

###  sendMultiple

▸ **sendMultiple**(`username`: string, `password`: string, `sendOutputs`: object[], `from`: string[] | Buffer[], `changeAddr`: string, `memo`: string | Buffer): *Promise‹object›*

*Defined in [src/apis/avm/api.ts:1647](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1647)*

Sends an amount of assetID to an array of specified addresses from a list of owned of addresses.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`username` | string | - | The user that owns the private keys associated with the `from` addresses |
`password` | string | - | The password unlocking the user |
`sendOutputs` | object[] | - | The array of SendOutputs. A SendOutput is an object literal which contains an assetID, amount, and to. |
`from` | string[] &#124; Buffer[] | undefined | Optional. An array of addresses managed by the node's keystore for this blockchain which will fund this transaction |
`changeAddr` | string | undefined | Optional. An address to send the change |
`memo` | string &#124; Buffer | undefined | Optional. CB58 Buffer or String which contains arbitrary bytes, up to 256 bytes  |

**Returns:** *Promise‹object›*

Promise for the string representing the transaction"s ID.

___

###  setAVAXAssetID

▸ **setAVAXAssetID**(`avaxAssetID`: string | Buffer): *void*

*Defined in [src/apis/avm/api.ts:199](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L199)*

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

*Defined in [src/common/apibase.ts:37](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/common/apibase.ts#L37)*

Sets the path of the APIs baseURL.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseURL` | string | Path of the APIs baseURL - ex: "/ext/bc/X"  |

**Returns:** *void*

___

###  setBlockchainAlias

▸ **setBlockchainAlias**(`alias`: string): *undefined*

*Defined in [src/apis/avm/api.ts:110](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L110)*

Sets the alias for the blockchainID.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`alias` | string | The alias for the blockchainID.   |

**Returns:** *undefined*

___

###  setCreationTxFee

▸ **setCreationTxFee**(`fee`: BN): *void*

*Defined in [src/apis/avm/api.ts:266](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L266)*

Sets the creation fee for this chain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fee` | BN | The creation fee amount to set as [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *void*

___

###  setTxFee

▸ **setTxFee**(`fee`: BN): *void*

*Defined in [src/apis/avm/api.ts:234](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L234)*

Sets the tx fee for this chain.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fee` | BN | The tx fee amount to set as [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *void*

___

###  signTx

▸ **signTx**(`utx`: [UnsignedTx](api_avm_transactions.unsignedtx.md)): *[Tx](api_avm_transactions.tx.md)*

*Defined in [src/apis/avm/api.ts:1522](https://github.com/ava-labs/avalanchejs/blob/fa4a637/src/apis/avm/api.ts#L1522)*

Helper function which takes an unsigned transaction and signs it, returning the resulting [Tx](api_evm_transactions.tx.md).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utx` | [UnsignedTx](api_avm_transactions.unsignedtx.md) | The unsigned transaction of type [UnsignedTx](api_evm_transactions.unsignedtx.md)  |

**Returns:** *[Tx](api_avm_transactions.tx.md)*

A signed transaction of type [Tx](api_evm_transactions.tx.md)
