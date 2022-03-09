[avalanche](../README.md) › [Utils-Base58](../modules/utils_base58.md) › [Base58](utils_base58.base58.md)

# Class: Base58

A Base58 class that uses the cross-platform Buffer module. Built so that Typescript
will accept the code.

```js
let b58:Base58 = new Base58();
let str:string = b58.encode(somebuffer);
let buff:Buffer = b58.decode(somestring);
```

## Hierarchy

* **Base58**

## Index

### Constructors

* [constructor](utils_base58.base58.md#private-constructor)

### Properties

* [alphabetIdx0](utils_base58.base58.md#protected-alphabetidx0)
* [b58](utils_base58.base58.md#protected-b58)
* [b58alphabet](utils_base58.base58.md#protected-b58alphabet)
* [big58Radix](utils_base58.base58.md#protected-big58radix)
* [bigZero](utils_base58.base58.md#protected-bigzero)
* [instance](utils_base58.base58.md#static-private-instance)

### Methods

* [decode](utils_base58.base58.md#decode)
* [encode](utils_base58.base58.md#encode)
* [getInstance](utils_base58.base58.md#static-getinstance)

## Constructors

### `Private` constructor

\+ **new Base58**(): *[Base58](utils_base58.base58.md)*

*Defined in [src/utils/base58.ts:20](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L20)*

**Returns:** *[Base58](utils_base58.base58.md)*

## Properties

### `Protected` alphabetIdx0

• **alphabetIdx0**: *string* = "1"

*Defined in [src/utils/base58.ts:37](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L37)*

___

### `Protected` b58

• **b58**: *number[]* = [
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 255, 255, 255, 255, 255, 255,
    255, 9, 10, 11, 12, 13, 14, 15, 16, 255, 17, 18, 19, 20, 21, 255, 22, 23,
    24, 25, 26, 27, 28, 29, 30, 31, 32, 255, 255, 255, 255, 255, 255, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 255, 44, 45, 46, 47, 48, 49, 50, 51, 52,
    53, 54, 55, 56, 57, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255
  ]

*Defined in [src/utils/base58.ts:39](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L39)*

___

### `Protected` b58alphabet

• **b58alphabet**: *string* = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

*Defined in [src/utils/base58.ts:34](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L34)*

___

### `Protected` big58Radix

• **big58Radix**: *BN* = new BN(58)

*Defined in [src/utils/base58.ts:59](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L59)*

___

### `Protected` bigZero

• **bigZero**: *BN* = new BN(0)

*Defined in [src/utils/base58.ts:61](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L61)*

___

### `Static` `Private` instance

▪ **instance**: *[Base58](utils_base58.base58.md)*

*Defined in [src/utils/base58.ts:20](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L20)*

## Methods

###  decode

▸ **decode**(`b`: string): *Buffer*

*Defined in [src/utils/base58.ts:95](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L95)*

Decodes a base-58 into a [Buffer](https://github.com/feross/buffer)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`b` | string | A base-58 string to decode  |

**Returns:** *Buffer*

A [Buffer](https://github.com/feross/buffer) from the decoded string.

___

###  encode

▸ **encode**(`buff`: Buffer): *string*

*Defined in [src/utils/base58.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L70)*

Encodes a [Buffer](https://github.com/feross/buffer) as a base-58 string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`buff` | Buffer | A [Buffer](https://github.com/feross/buffer) to encode  |

**Returns:** *string*

A base-58 string.

___

### `Static` getInstance

▸ **getInstance**(): *[Base58](utils_base58.base58.md)*

*Defined in [src/utils/base58.ts:27](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/base58.ts#L27)*

Retrieves the Base58 singleton.

**Returns:** *[Base58](utils_base58.base58.md)*
