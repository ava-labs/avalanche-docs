[avalanche](../README.md) › [src/utils](../modules/src_utils.md) › [DelegationFeeError](src_utils.delegationfeeerror.md)

# Class: DelegationFeeError

## Hierarchy

  ↳ [AvalancheError](src_utils.avalancheerror.md)

  ↳ **DelegationFeeError**

## Index

### Constructors

* [constructor](src_utils.delegationfeeerror.md#constructor)

### Properties

* [errorCode](src_utils.delegationfeeerror.md#errorcode)
* [message](src_utils.delegationfeeerror.md#message)
* [name](src_utils.delegationfeeerror.md#name)
* [stack](src_utils.delegationfeeerror.md#optional-stack)

### Methods

* [getCode](src_utils.delegationfeeerror.md#getcode)

## Constructors

###  constructor

\+ **new DelegationFeeError**(`m`: string): *[DelegationFeeError](src_utils.delegationfeeerror.md)*

*Overrides [AvalancheError](src_utils.avalancheerror.md).[constructor](src_utils.avalancheerror.md#constructor)*

*Defined in [src/utils/errors.ts:230](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/errors.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`m` | string |

**Returns:** *[DelegationFeeError](src_utils.delegationfeeerror.md)*

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
