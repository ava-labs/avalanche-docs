[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [AddressIndexError](src_utils.addressindexerror.md)

# Class: AddressIndexError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **AddressIndexError**

## Index

### Constructors

* [constructor](src_utils.addressindexerror.md#constructor)

### Properties

* [errorCode](src_utils.addressindexerror.md#errorcode)
* [message](src_utils.addressindexerror.md#message)
* [name](src_utils.addressindexerror.md#name)
* [stack](src_utils.addressindexerror.md#optional-stack)

### Methods

* [getCode](src_utils.addressindexerror.md#getcode)

## Constructors

###  constructor

\+ **new AddressIndexError**(`m`: string): *[AddressIndexError](src_utils.addressindexerror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:252](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/errors.ts#L252)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[AddressIndexError](src_utils.addressindexerror.md)*

## Properties

###  errorCode

• **errorCode**: *string*

*Inherited from [AvalancheError](src_utils.avalancheerror.md).[errorCode](src_utils.avalancheerror.md#errorcode)*

*Defined in [src/utils/errors.ts:44](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/errors.ts#L44)*

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

*Defined in [src/utils/errors.ts:51](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/errors.ts#L51)*

**Returns:** *string*
