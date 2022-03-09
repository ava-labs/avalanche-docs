[avalanche](../README.md) › [API-AVM-UTXOs](../modules/api_avm_utxos.md) › [UTXOSet](api_avm_utxos.utxoset.md)

# Class: UTXOSet

Class representing a set of [UTXO](api_avm_utxos.utxo.md)s.

## Hierarchy

  ↳ [StandardUTXOSet](common_utxos.standardutxoset.md)‹[UTXO](api_avm_utxos.utxo.md)›

  ↳ **UTXOSet**

## Index

### Properties

* [_codecID](api_avm_utxos.utxoset.md#protected-_codecid)
* [_typeID](api_avm_utxos.utxoset.md#protected-_typeid)
* [_typeName](api_avm_utxos.utxoset.md#protected-_typename)
* [addressUTXOs](api_avm_utxos.utxoset.md#protected-addressutxos)
* [utxos](api_avm_utxos.utxoset.md#protected-utxos)

### Methods

* [_feeCheck](api_avm_utxos.utxoset.md#_feecheck)
* [add](api_avm_utxos.utxoset.md#add)
* [addArray](api_avm_utxos.utxoset.md#addarray)
* [buildBaseTx](api_avm_utxos.utxoset.md#buildbasetx)
* [buildCreateAssetTx](api_avm_utxos.utxoset.md#buildcreateassettx)
* [buildCreateNFTAssetTx](api_avm_utxos.utxoset.md#buildcreatenftassettx)
* [buildCreateNFTMintTx](api_avm_utxos.utxoset.md#buildcreatenftminttx)
* [buildExportTx](api_avm_utxos.utxoset.md#buildexporttx)
* [buildImportTx](api_avm_utxos.utxoset.md#buildimporttx)
* [buildNFTTransferTx](api_avm_utxos.utxoset.md#buildnfttransfertx)
* [buildSECPMintTx](api_avm_utxos.utxoset.md#buildsecpminttx)
* [clone](api_avm_utxos.utxoset.md#clone)
* [create](api_avm_utxos.utxoset.md#create)
* [deserialize](api_avm_utxos.utxoset.md#deserialize)
* [difference](api_avm_utxos.utxoset.md#difference)
* [filter](api_avm_utxos.utxoset.md#filter)
* [getAddresses](api_avm_utxos.utxoset.md#getaddresses)
* [getAllUTXOStrings](api_avm_utxos.utxoset.md#getallutxostrings)
* [getAllUTXOs](api_avm_utxos.utxoset.md#getallutxos)
* [getAssetIDs](api_avm_utxos.utxoset.md#getassetids)
* [getBalance](api_avm_utxos.utxoset.md#getbalance)
* [getCodecID](api_avm_utxos.utxoset.md#getcodecid)
* [getMinimumSpendable](api_avm_utxos.utxoset.md#getminimumspendable)
* [getTypeID](api_avm_utxos.utxoset.md#gettypeid)
* [getTypeName](api_avm_utxos.utxoset.md#gettypename)
* [getUTXO](api_avm_utxos.utxoset.md#getutxo)
* [getUTXOIDs](api_avm_utxos.utxoset.md#getutxoids)
* [includes](api_avm_utxos.utxoset.md#includes)
* [intersection](api_avm_utxos.utxoset.md#intersection)
* [merge](api_avm_utxos.utxoset.md#merge)
* [mergeByRule](api_avm_utxos.utxoset.md#mergebyrule)
* [parseUTXO](api_avm_utxos.utxoset.md#parseutxo)
* [remove](api_avm_utxos.utxoset.md#remove)
* [removeArray](api_avm_utxos.utxoset.md#removearray)
* [sanitizeObject](api_avm_utxos.utxoset.md#sanitizeobject)
* [serialize](api_avm_utxos.utxoset.md#serialize)
* [symDifference](api_avm_utxos.utxoset.md#symdifference)
* [union](api_avm_utxos.utxoset.md#union)

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[_typeID](common_utxos.standardutxoset.md#protected-_typeid)*

*Defined in [src/apis/avm/utxos.ts:141](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L141)*

___

### `Protected` _typeName

• **_typeName**: *string* = "UTXOSet"

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[_typeName](common_utxos.standardutxoset.md#protected-_typename)*

*Defined in [src/apis/avm/utxos.ts:140](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L140)*

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

* \[ **utxoid**: *string*\]: [UTXO](api_avm_utxos.utxo.md)

## Methods

###  _feeCheck

▸ **_feeCheck**(`fee`: BN, `feeAssetID`: Buffer): *boolean*

*Defined in [src/apis/avm/utxos.ts:217](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`fee` | BN |
`feeAssetID` | Buffer |

**Returns:** *boolean*

___

###  add

▸ **add**(`utxo`: [UTXO](api_avm_utxos.utxo.md) | string, `overwrite`: boolean): *[UTXO](api_avm_utxos.utxo.md)*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[add](common_utxos.standardutxoset.md#add)*

*Defined in [src/common/utxos.ts:299](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L299)*

Adds a [StandardUTXO](common_utxos.standardutxo.md) to the StandardUTXOSet.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxo` | [UTXO](api_avm_utxos.utxo.md) &#124; string | - | Either a [StandardUTXO](common_utxos.standardutxo.md) an cb58 serialized string representing a StandardUTXO |
`overwrite` | boolean | false | If true, if the UTXOID already exists, overwrite it... default false  |

**Returns:** *[UTXO](api_avm_utxos.utxo.md)*

A [StandardUTXO](common_utxos.standardutxo.md) if one was added and undefined if nothing was added.

___

###  addArray

▸ **addArray**(`utxos`: string[] | [UTXO](api_avm_utxos.utxo.md)[], `overwrite`: boolean): *[StandardUTXO](common_utxos.standardutxo.md)[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[addArray](common_utxos.standardutxoset.md#addarray)*

*Defined in [src/common/utxos.ts:337](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L337)*

Adds an array of [StandardUTXO](common_utxos.standardutxo.md)s to the [StandardUTXOSet](common_utxos.standardutxoset.md).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxos` | string[] &#124; [UTXO](api_avm_utxos.utxo.md)[] | - | - |
`overwrite` | boolean | false | If true, if the UTXOID already exists, overwrite it... default false  |

**Returns:** *[StandardUTXO](common_utxos.standardutxo.md)[]*

An array of StandardUTXOs which were added.

___

###  buildBaseTx

▸ **buildBaseTx**(`networkID`: number, `blockchainID`: Buffer, `amount`: BN, `assetID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Defined in [src/apis/avm/utxos.ts:351](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L351)*

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

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildCreateAssetTx

▸ **buildCreateAssetTx**(`networkID`: number, `blockchainID`: Buffer, `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `initialState`: [InitialStates](api_avm_initialstates.initialstates.md), `name`: string, `symbol`: string, `denomination`: number, `mintOutputs`: [SECPMintOutput](api_avm_outputs.secpmintoutput.md)[], `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Defined in [src/apis/avm/utxos.ts:442](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L442)*

Creates an unsigned Create Asset transaction. For more granular control, you may create your own
[[CreateAssetTX]] manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Buffer[] | - | Optional. The addresses that can spend the change remaining from the spent UTXOs |
`initialState` | [InitialStates](api_avm_initialstates.initialstates.md) | - | The [InitialStates](api_avm_initialstates.initialstates.md) that represent the intial state of a created asset |
`name` | string | - | String for the descriptive name of the asset |
`symbol` | string | - | String for the ticker symbol of the asset |
`denomination` | number | - | Optional number for the denomination which is 10^D. D must be >= 0 and <= 32. Ex: $1 AVAX = 10^9 $nAVAX |
`mintOutputs` | [SECPMintOutput](api_avm_outputs.secpmintoutput.md)[] | undefined | Optional. Array of [SECPMintOutput](api_avm_outputs.secpmintoutput.md)s to be included in the transaction. These outputs can be spent to mint more tokens. |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildCreateNFTAssetTx

▸ **buildCreateNFTAssetTx**(`networkID`: number, `blockchainID`: Buffer, `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `minterSets`: [MinterSet](api_avm_minterset.minterset.md)[], `name`: string, `symbol`: string, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN, `locktime`: BN): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Defined in [src/apis/avm/utxos.ts:615](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L615)*

Creates an unsigned Create Asset transaction. For more granular control, you may create your own
[[CreateAssetTX]] manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Buffer[] | - | Optional. The addresses that can spend the change remaining from the spent UTXOs. |
`minterSets` | [MinterSet](api_avm_minterset.minterset.md)[] | - | The minters and thresholds required to mint this nft asset |
`name` | string | - | String for the descriptive name of the nft asset |
`symbol` | string | - | String for the ticker symbol of the nft asset |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | undefined | Optional. The locktime field created in the resulting mint output  |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildCreateNFTMintTx

▸ **buildCreateNFTMintTx**(`networkID`: number, `blockchainID`: Buffer, `owners`: [OutputOwners](common_output.outputowners.md)[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `utxoids`: string[], `groupID`: number, `payload`: Buffer, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Defined in [src/apis/avm/utxos.ts:693](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L693)*

Creates an unsigned NFT mint transaction. For more granular control, you may create your own
[OperationTx](api_avm_operationtx.operationtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`owners` | [OutputOwners](common_output.outputowners.md)[] | - | An array of [OutputOwners](../modules/src_common.md#outputowners) who will be given the NFTs. |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs |
`changeAddresses` | Buffer[] | - | Optional. The addresses that can spend the change remaining from the spent UTXOs. |
`utxoids` | string[] | - | An array of strings for the NFTs being transferred |
`groupID` | number | 0 | Optional. The group this NFT is issued to. |
`payload` | Buffer | undefined | Optional. Data for NFT Payload. |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildExportTx

▸ **buildExportTx**(`networkID`: number, `blockchainID`: Buffer, `amount`: BN, `assetID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `destinationChain`: Buffer, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Defined in [src/apis/avm/utxos.ts:1029](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L1029)*

Creates an unsigned ExportTx transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`amount` | BN | - | The amount being exported as a [BN](https://github.com/indutny/bn.js/) |
`assetID` | Buffer | - | - |
`toAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who recieves the AVAX |
`fromAddresses` | Buffer[] | - | An array of addresses as [Buffer](https://github.com/feross/buffer) who owns the AVAX |
`changeAddresses` | Buffer[] | undefined | Optional. The addresses that can spend the change remaining from the spent UTXOs. |
`destinationChain` | Buffer | undefined | Optional. A [Buffer](https://github.com/feross/buffer) for the chainid where to send the asset. |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildImportTx

▸ **buildImportTx**(`networkID`: number, `blockchainID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `atomics`: [UTXO](api_avm_utxos.utxo.md)[], `sourceChain`: Buffer, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Defined in [src/apis/avm/utxos.ts:885](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L885)*

Creates an unsigned ImportTx transaction.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`toAddresses` | Buffer[] | - | The addresses to send the funds |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Buffer[] | - | Optional. The addresses that can spend the change remaining from the spent UTXOs. |
`atomics` | [UTXO](api_avm_utxos.utxo.md)[] | - | - |
`sourceChain` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) for the chainid where the imports are coming from. |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/). Fee will come from the inputs first, if they can. |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildNFTTransferTx

▸ **buildNFTTransferTx**(`networkID`: number, `blockchainID`: Buffer, `toAddresses`: Buffer[], `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `utxoids`: string[], `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN, `locktime`: BN, `threshold`: number): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Defined in [src/apis/avm/utxos.ts:787](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L787)*

Creates an unsigned NFT transfer transaction. For more granular control, you may create your own
[OperationTx](api_avm_operationtx.operationtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`toAddresses` | Buffer[] | - | An array of [Buffer](https://github.com/feross/buffer)s which indicate who recieves the NFT |
`fromAddresses` | Buffer[] | - | An array for [Buffer](https://github.com/feross/buffer) who owns the NFT |
`changeAddresses` | Buffer[] | - | Optional. The addresses that can spend the change remaining from the spent UTXOs. |
`utxoids` | string[] | - | An array of strings for the NFTs being transferred |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/) |
`locktime` | BN | new BN(0) | Optional. The locktime field created in the resulting outputs |
`threshold` | number | 1 | Optional. The number of signatures required to spend the funds in the resultant UTXO  |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

An unsigned transaction created from the passed in parameters.

___

###  buildSECPMintTx

▸ **buildSECPMintTx**(`networkID`: number, `blockchainID`: Buffer, `mintOwner`: [SECPMintOutput](api_avm_outputs.secpmintoutput.md), `transferOwner`: [SECPTransferOutput](api_avm_outputs.secptransferoutput.md), `fromAddresses`: Buffer[], `changeAddresses`: Buffer[], `mintUTXOID`: string, `fee`: BN, `feeAssetID`: Buffer, `memo`: Buffer, `asOf`: BN): *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

*Defined in [src/apis/avm/utxos.ts:518](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L518)*

Creates an unsigned Secp mint transaction. For more granular control, you may create your own
[OperationTx](api_avm_operationtx.operationtx.md) manually (with their corresponding [TransferableInput](api_evm_inputs.transferableinput.md)s, [TransferableOutput](api_evm_outputs.transferableoutput.md)s, and [[TransferOperation]]s).

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`networkID` | number | - | The number representing NetworkID of the node |
`blockchainID` | Buffer | - | The [Buffer](https://github.com/feross/buffer) representing the BlockchainID for the transaction |
`mintOwner` | [SECPMintOutput](api_avm_outputs.secpmintoutput.md) | - | A [SECPMintOutput](api_avm_outputs.secpmintoutput.md) which specifies the new set of minters |
`transferOwner` | [SECPTransferOutput](api_avm_outputs.secptransferoutput.md) | - | A [SECPTransferOutput](api_evm_outputs.secptransferoutput.md) which specifies where the minted tokens will go |
`fromAddresses` | Buffer[] | - | The addresses being used to send the funds from the UTXOs [Buffer](https://github.com/feross/buffer) |
`changeAddresses` | Buffer[] | - | The addresses that can spend the change remaining from the spent UTXOs |
`mintUTXOID` | string | - | The UTXOID for the [[SCPMintOutput]] being spent to produce more tokens |
`fee` | BN | undefined | Optional. The amount of fees to burn in its smallest denomination, represented as [BN](https://github.com/indutny/bn.js/) |
`feeAssetID` | Buffer | undefined | Optional. The assetID of the fees being burned. |
`memo` | Buffer | undefined | Optional contains arbitrary bytes, up to 256 bytes |
`asOf` | BN | UnixNow() | Optional. The timestamp to verify the transaction against as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *[UnsignedTx](api_avm_transactions.unsignedtx.md)*

___

###  clone

▸ **clone**(): *this*

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[clone](common_utxos.standardutxoset.md#abstract-clone)*

*Defined in [src/apis/avm/utxos.ts:210](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L210)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[create](common_utxos.standardutxoset.md#abstract-create)*

*Defined in [src/apis/avm/utxos.ts:206](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L206)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/apis/avm/utxos.ts:145](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L145)*

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

▸ (`utxo`: [UTXO](api_avm_utxos.utxo.md), ...`largs`: any[]): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`utxo` | [UTXO](api_avm_utxos.utxo.md) |
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

▸ **getAllUTXOs**(`utxoids`: string[]): *[UTXO](api_avm_utxos.utxo.md)[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getAllUTXOs](common_utxos.standardutxoset.md#getallutxos)*

*Defined in [src/common/utxos.ts:420](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L420)*

Gets all the [StandardUTXO](common_utxos.standardutxo.md)s, optionally that match with UTXOIDs in an array

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`utxoids` | string[] | undefined | An optional array of UTXOIDs, returns all [StandardUTXO](common_utxos.standardutxo.md)s if not provided  |

**Returns:** *[UTXO](api_avm_utxos.utxo.md)[]*

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

###  getMinimumSpendable

▸ **getMinimumSpendable**(`aad`: [AssetAmountDestination](api_avm_utxos.assetamountdestination.md), `asOf`: BN, `locktime`: BN, `threshold`: number): *[Error](src_utils.avalancheerror.md#static-error)*

*Defined in [src/apis/avm/utxos.ts:226](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L226)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`aad` | [AssetAmountDestination](api_avm_utxos.assetamountdestination.md) | - |
`asOf` | BN | UnixNow() |
`locktime` | BN | new BN(0) |
`threshold` | number | 1 |

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

▸ **getUTXO**(`utxoid`: string): *[UTXO](api_avm_utxos.utxo.md)*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[getUTXO](common_utxos.standardutxoset.md#getutxo)*

*Defined in [src/common/utxos.ts:411](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L411)*

Gets a [StandardUTXO](common_utxos.standardutxo.md) from the [StandardUTXOSet](common_utxos.standardutxoset.md) by its UTXOID.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxoid` | string | String representing the UTXOID  |

**Returns:** *[UTXO](api_avm_utxos.utxo.md)*

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

▸ **includes**(`utxo`: [UTXO](api_avm_utxos.utxo.md) | string): *boolean*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[includes](common_utxos.standardutxoset.md#includes)*

*Defined in [src/common/utxos.ts:274](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L274)*

Returns true if the [StandardUTXO](common_utxos.standardutxo.md) is in the StandardUTXOSet.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxo` | [UTXO](api_avm_utxos.utxo.md) &#124; string | Either a [StandardUTXO](common_utxos.standardutxo.md) a cb58 serialized string representing a StandardUTXO  |

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

▸ **parseUTXO**(`utxo`: [UTXO](api_avm_utxos.utxo.md) | string): *[UTXO](api_avm_utxos.utxo.md)*

*Overrides [StandardUTXOSet](common_utxos.standardutxoset.md).[parseUTXO](common_utxos.standardutxoset.md#abstract-parseutxo)*

*Defined in [src/apis/avm/utxos.ts:190](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/utxos.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`utxo` | [UTXO](api_avm_utxos.utxo.md) &#124; string |

**Returns:** *[UTXO](api_avm_utxos.utxo.md)*

___

###  remove

▸ **remove**(`utxo`: [UTXO](api_avm_utxos.utxo.md) | string): *[UTXO](api_avm_utxos.utxo.md)*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[remove](common_utxos.standardutxoset.md#remove)*

*Defined in [src/common/utxos.ts:358](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L358)*

Removes a [StandardUTXO](common_utxos.standardutxo.md) from the [StandardUTXOSet](common_utxos.standardutxoset.md) if it exists.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`utxo` | [UTXO](api_avm_utxos.utxo.md) &#124; string | Either a [StandardUTXO](common_utxos.standardutxo.md) an cb58 serialized string representing a StandardUTXO  |

**Returns:** *[UTXO](api_avm_utxos.utxo.md)*

A [StandardUTXO](common_utxos.standardutxo.md) if it was removed and undefined if nothing was removed.

___

###  removeArray

▸ **removeArray**(`utxos`: string[] | [UTXO](api_avm_utxos.utxo.md)[]): *[UTXO](api_avm_utxos.utxo.md)[]*

*Inherited from [StandardUTXOSet](common_utxos.standardutxoset.md).[removeArray](common_utxos.standardutxoset.md#removearray)*

*Defined in [src/common/utxos.ts:393](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/utxos.ts#L393)*

Removes an array of [StandardUTXO](common_utxos.standardutxo.md)s to the [StandardUTXOSet](common_utxos.standardutxoset.md).

**Parameters:**

Name | Type |
------ | ------ |
`utxos` | string[] &#124; [UTXO](api_avm_utxos.utxo.md)[] |

**Returns:** *[UTXO](api_avm_utxos.utxo.md)[]*

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
