[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [CredIdError](src_utils.crediderror.md)

# Class: CredIdError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **CredIdError**

## Index

### Constructors

* [constructor](src_utils.crediderror.md#constructor)

### Properties

* [errorCode](src_utils.crediderror.md#errorcode)
* [message](src_utils.crediderror.md#message)
* [name](src_utils.crediderror.md#name)
* [stack](src_utils.crediderror.md#optional-stack)

### Methods

* [getCode](src_utils.crediderror.md#getcode)

## Constructors

###  constructor

\+ **new CredIdError**(`m`: string): *[CredIdError](src_utils.crediderror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:116](https://github.com/ava-labs/avalanchejs/blob/5511161/src/utils/errors.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[CredIdError](src_utils.crediderror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[errorCode](src_utils.avalancheerror.md#errorcode)*

*Defined in [src/utils/errors.ts:48](https://github.com/ava-labs/avalanchejs/blob/5511161/src/utils/errors.ts#L48)*

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

*Defined in [src/utils/errors.ts:55](https://github.com/ava-labs/avalanchejs/blob/5511161/src/utils/errors.ts#L55)*

**Returns:** *string*
