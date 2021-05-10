[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [TransferableOutputError](src_utils.transferableoutputerror.md)

# Class: TransferableOutputError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **TransferableOutputError**

## Index

### Constructors

* [constructor](src_utils.transferableoutputerror.md#constructor)

### Properties

* [errorCode](src_utils.transferableoutputerror.md#errorcode)
* [message](src_utils.transferableoutputerror.md#message)
* [name](src_utils.transferableoutputerror.md#name)
* [stack](src_utils.transferableoutputerror.md#optional-stack)

### Methods

* [getCode](src_utils.transferableoutputerror.md#getcode)

## Constructors

###  constructor

\+ **new TransferableOutputError**(`m`: string): *[TransferableOutputError](src_utils.transferableoutputerror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:118](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/errors.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[TransferableOutputError](src_utils.transferableoutputerror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[errorCode](src_utils.avalancheerror.md#errorcode)*

*Defined in [src/utils/errors.ts:43](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/errors.ts#L43)*

___

###  message

• **message**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[message](src_utils.avalancheerror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[name](src_utils.avalancheerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[stack](src_utils.avalancheerror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

## Methods

###  getCode

▸ **getCode**(): *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[getCode](src_utils.avalancheerror.md#getcode)*

*Defined in [src/utils/errors.ts:50](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/errors.ts#L50)*

**Returns:** *string*
