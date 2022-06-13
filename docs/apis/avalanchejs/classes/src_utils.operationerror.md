[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [OperationError](src_utils.operationerror.md)

# Class: OperationError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **OperationError**

## Index

### Constructors

* [constructor](src_utils.operationerror.md#constructor)

### Properties

* [errorCode](src_utils.operationerror.md#errorcode)
* [message](src_utils.operationerror.md#message)
* [name](src_utils.operationerror.md#name)
* [stack](src_utils.operationerror.md#optional-stack)

### Methods

* [getCode](src_utils.operationerror.md#getcode)

## Constructors

###  constructor

\+ **new OperationError**(`m`: string): *[OperationError](src_utils.operationerror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:144](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/errors.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[OperationError](src_utils.operationerror.md)*

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
