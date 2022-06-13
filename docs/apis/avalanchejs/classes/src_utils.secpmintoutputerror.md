[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [SECPMintOutputError](src_utils.secpmintoutputerror.md)

# Class: SECPMintOutputError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **SECPMintOutputError**

## Index

### Constructors

* [constructor](src_utils.secpmintoutputerror.md#constructor)

### Properties

* [errorCode](src_utils.secpmintoutputerror.md#errorcode)
* [message](src_utils.secpmintoutputerror.md#message)
* [name](src_utils.secpmintoutputerror.md#name)
* [stack](src_utils.secpmintoutputerror.md#optional-stack)

### Methods

* [getCode](src_utils.secpmintoutputerror.md#getcode)

## Constructors

###  constructor

\+ **new SECPMintOutputError**(`m`: string): *[SECPMintOutputError](src_utils.secpmintoutputerror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:193](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/errors.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[SECPMintOutputError](src_utils.secpmintoutputerror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[errorCode](src_utils.avalancheerror.md#errorcode)*

*Defined in [src/utils/errors.ts:48](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/errors.ts#L48)*

___

###  message

• **message**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[message](src_utils.avalancheerror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1029

___

###  name

• **name**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[name](src_utils.avalancheerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1028

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[stack](src_utils.avalancheerror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1030

## Methods

###  getCode

▸ **getCode**(): *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[getCode](src_utils.avalancheerror.md#getcode)*

*Defined in [src/utils/errors.ts:55](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/errors.ts#L55)*

**Returns:** *string*
