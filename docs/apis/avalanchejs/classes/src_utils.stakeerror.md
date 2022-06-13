[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [StakeError](src_utils.stakeerror.md)

# Class: StakeError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **StakeError**

## Index

### Constructors

* [constructor](src_utils.stakeerror.md#constructor)

### Properties

* [errorCode](src_utils.stakeerror.md#errorcode)
* [message](src_utils.stakeerror.md#message)
* [name](src_utils.stakeerror.md#name)
* [stack](src_utils.stakeerror.md#optional-stack)

### Methods

* [getCode](src_utils.stakeerror.md#getcode)

## Constructors

###  constructor

\+ **new StakeError**(`m`: string): *[StakeError](src_utils.stakeerror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:221](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/errors.ts#L221)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[StakeError](src_utils.stakeerror.md)*

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
