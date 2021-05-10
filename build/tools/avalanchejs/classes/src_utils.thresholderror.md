[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [ThresholdError](src_utils.thresholderror.md)

# Class: ThresholdError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **ThresholdError**

## Index

### Constructors

* [constructor](src_utils.thresholderror.md#constructor)

### Properties

* [errorCode](src_utils.thresholderror.md#errorcode)
* [message](src_utils.thresholderror.md#message)
* [name](src_utils.thresholderror.md#name)
* [stack](src_utils.thresholderror.md#optional-stack)

### Methods

* [getCode](src_utils.thresholderror.md#getcode)

## Constructors

###  constructor

\+ **new ThresholdError**(`m`: string): *[ThresholdError](src_utils.thresholderror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:181](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/errors.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[ThresholdError](src_utils.thresholderror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[errorCode](src_utils.avalancheerror.md#errorcode)*

*Defined in [src/utils/errors.ts:43](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/errors.ts#L43)*

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

*Defined in [src/utils/errors.ts:50](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/errors.ts#L50)*

**Returns:** *string*
