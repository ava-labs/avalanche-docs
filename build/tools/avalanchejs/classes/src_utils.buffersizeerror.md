[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [BufferSizeError](src_utils.buffersizeerror.md)

# Class: BufferSizeError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **BufferSizeError**

## Index

### Constructors

* [constructor](src_utils.buffersizeerror.md#constructor)

### Properties

* [errorCode](src_utils.buffersizeerror.md#errorcode)
* [message](src_utils.buffersizeerror.md#message)
* [name](src_utils.buffersizeerror.md#name)
* [stack](src_utils.buffersizeerror.md#optional-stack)

### Methods

* [getCode](src_utils.buffersizeerror.md#getcode)

## Constructors

###  constructor

\+ **new BufferSizeError**(`m`: string): *[BufferSizeError](src_utils.buffersizeerror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:244](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/errors.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[BufferSizeError](src_utils.buffersizeerror.md)*

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
