[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [OutputIdError](src_utils.outputiderror.md)

# Class: OutputIdError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **OutputIdError**

## Index

### Constructors

* [constructor](src_utils.outputiderror.md#constructor)

### Properties

* [errorCode](src_utils.outputiderror.md#errorcode)
* [message](src_utils.outputiderror.md#message)
* [name](src_utils.outputiderror.md#name)
* [stack](src_utils.outputiderror.md#optional-stack)

### Methods

* [getCode](src_utils.outputiderror.md#getcode)

## Constructors

###  constructor

\+ **new OutputIdError**(`m`: string): *[OutputIdError](src_utils.outputiderror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:163](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/errors.ts#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[OutputIdError](src_utils.outputiderror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[errorCode](src_utils.avalancheerror.md#errorcode)*

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

## Methods

###  getCode

▸ **getCode**(): *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[getCode](src_utils.avalancheerror.md#getcode)*

*Defined in [src/utils/errors.ts:53](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/errors.ts#L53)*

**Returns:** *string*
