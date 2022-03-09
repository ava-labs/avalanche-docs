[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [AvalancheError](src_utils.avalancheerror.md)

# Class: AvalancheError

## Hierarchy

* [Error](src_utils.avalancheerror.md#static-error)

  ↳ **AvalancheError**

  ↳ [AddressError](src_utils.addresserror.md)

  ↳ [GooseEggCheckError](src_utils.gooseeggcheckerror.md)

  ↳ [ChainIdError](src_utils.chainiderror.md)

  ↳ [NoAtomicUTXOsError](src_utils.noatomicutxoserror.md)

  ↳ [SymbolError](src_utils.symbolerror.md)

  ↳ [NameError](src_utils.nameerror.md)

  ↳ [TransactionError](src_utils.transactionerror.md)

  ↳ [CodecIdError](src_utils.codeciderror.md)

  ↳ [CredIdError](src_utils.crediderror.md)

  ↳ [TransferableOutputError](src_utils.transferableoutputerror.md)

  ↳ [TransferableInputError](src_utils.transferableinputerror.md)

  ↳ [InputIdError](src_utils.inputiderror.md)

  ↳ [OperationError](src_utils.operationerror.md)

  ↳ [InvalidOperationIdError](src_utils.invalidoperationiderror.md)

  ↳ [ChecksumError](src_utils.checksumerror.md)

  ↳ [OutputIdError](src_utils.outputiderror.md)

  ↳ [UTXOError](src_utils.utxoerror.md)

  ↳ [InsufficientFundsError](src_utils.insufficientfundserror.md)

  ↳ [ThresholdError](src_utils.thresholderror.md)

  ↳ [SECPMintOutputError](src_utils.secpmintoutputerror.md)

  ↳ [EVMInputError](src_utils.evminputerror.md)

  ↳ [EVMOutputError](src_utils.evmoutputerror.md)

  ↳ [FeeAssetError](src_utils.feeasseterror.md)

  ↳ [StakeError](src_utils.stakeerror.md)

  ↳ [TimeError](src_utils.timeerror.md)

  ↳ [DelegationFeeError](src_utils.delegationfeeerror.md)

  ↳ [SubnetOwnerError](src_utils.subnetownererror.md)

  ↳ [BufferSizeError](src_utils.buffersizeerror.md)

  ↳ [AddressIndexError](src_utils.addressindexerror.md)

  ↳ [PublicKeyError](src_utils.publickeyerror.md)

  ↳ [MergeRuleError](src_utils.mergeruleerror.md)

  ↳ [Base58Error](src_utils.base58error.md)

  ↳ [PrivateKeyError](src_utils.privatekeyerror.md)

  ↳ [NodeIdError](src_utils.nodeiderror.md)

  ↳ [HexError](src_utils.hexerror.md)

  ↳ [TypeIdError](src_utils.typeiderror.md)

  ↳ [TypeNameError](src_utils.typenameerror.md)

  ↳ [UnknownTypeError](src_utils.unknowntypeerror.md)

  ↳ [Bech32Error](src_utils.bech32error.md)

  ↳ [EVMFeeError](src_utils.evmfeeerror.md)

  ↳ [InvalidEntropy](src_utils.invalidentropy.md)

  ↳ [ProtocolError](src_utils.protocolerror.md)

  ↳ [SubnetIdError](src_utils.subnetiderror.md)

## Index

### Constructors

* [constructor](src_utils.avalancheerror.md#constructor)

### Properties

* [errorCode](src_utils.avalancheerror.md#errorcode)
* [message](src_utils.avalancheerror.md#message)
* [name](src_utils.avalancheerror.md#name)
* [stack](src_utils.avalancheerror.md#optional-stack)
* [Error](src_utils.avalancheerror.md#static-error)

### Methods

* [getCode](src_utils.avalancheerror.md#getcode)

## Constructors

###  constructor

\+ **new AvalancheError**(`m`: string, `code`: string): *[AvalancheError](src_utils.avalancheerror.md)*

*Defined in [src/utils/errors.ts:46](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/errors.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |
`code` | string |

**Returns:** *[AvalancheError](src_utils.avalancheerror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Defined in [src/utils/errors.ts:46](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/errors.ts#L46)*

___

###  message

• **message**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[message](src_utils.avalancheerror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1023

___

###  name

• **name**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[name](src_utils.avalancheerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1022

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[stack](src_utils.avalancheerror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1024

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1033

## Methods

###  getCode

▸ **getCode**(): *string*

*Defined in [src/utils/errors.ts:53](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/errors.ts#L53)*

**Returns:** *string*
