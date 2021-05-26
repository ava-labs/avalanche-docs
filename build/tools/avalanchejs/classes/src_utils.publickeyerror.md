[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [PublicKeyError](src_utils.publickeyerror.md)

# Class: PublicKeyError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **PublicKeyError**

## Index

### Constructors

* [constructor](src_utils.publickeyerror.md#constructor)

### Properties

* [errorCode](src_utils.publickeyerror.md#errorcode)
* [message](src_utils.publickeyerror.md#message)
* [name](src_utils.publickeyerror.md#name)
* [stack](src_utils.publickeyerror.md#optional-stack)

### Methods

* [getCode](src_utils.publickeyerror.md#getcode)

## Constructors

###  constructor

\+ **new PublicKeyError**(`m`: string): *[PublicKeyError](src_utils.publickeyerror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:258](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/errors.ts#L258)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[PublicKeyError](src_utils.publickeyerror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[errorCode](src_utils.avalancheerror.md#errorcode)*

*Defined in [src/utils/errors.ts:43](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/errors.ts#L43)*

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

*Defined in [src/utils/errors.ts:50](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/errors.ts#L50)*

**Returns:** *string*
