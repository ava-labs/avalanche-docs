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

*Defined in [src/utils/errors.ts:217](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/errors.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[StakeError](src_utils.stakeerror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[errorCode](src_utils.avalancheerror.md#errorcode)*

*Defined in [src/utils/errors.ts:44](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/errors.ts#L44)*

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

*Defined in [src/utils/errors.ts:51](https://github.com/ava-labs/avalanchejs/blob/f2c4a10/src/utils/errors.ts#L51)*

**Returns:** *string*
