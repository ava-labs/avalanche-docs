[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [Bech32Error](src_utils.bech32error.md)

# Class: Bech32Error

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **Bech32Error**

## Index

### Constructors

* [constructor](src_utils.bech32error.md#constructor)

### Properties

* [errorCode](src_utils.bech32error.md#errorcode)
* [message](src_utils.bech32error.md#message)
* [name](src_utils.bech32error.md#name)
* [stack](src_utils.bech32error.md#optional-stack)

### Methods

* [getCode](src_utils.bech32error.md#getcode)

## Constructors

###  constructor

\+ **new Bech32Error**(`m`: string): *[Bech32Error](src_utils.bech32error.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:326](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/errors.ts#L326)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[Bech32Error](src_utils.bech32error.md)*

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
