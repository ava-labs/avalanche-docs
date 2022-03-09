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

*Defined in [src/utils/errors.ts:254](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/errors.ts#L254)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[AddressIndexError](src_utils.addressindexerror.md)*

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
