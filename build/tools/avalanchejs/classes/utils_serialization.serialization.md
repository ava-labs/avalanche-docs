[avalanche](../README.md) › [Utils-Serialization](../modules/utils_serialization.md) › [Serialization](utils_serialization.serialization.md)

# Class: Serialization

## Hierarchy

* **Serialization**

## Index

### Constructors

* [constructor](utils_serialization.serialization.md#private-constructor)

### Properties

* [bintools](utils_serialization.serialization.md#private-bintools)
* [instance](utils_serialization.serialization.md#static-private-instance)

### Methods

* [bufferToType](utils_serialization.serialization.md#buffertotype)
* [decoder](utils_serialization.serialization.md#decoder)
* [deserialize](utils_serialization.serialization.md#deserialize)
* [encoder](utils_serialization.serialization.md#encoder)
* [serialize](utils_serialization.serialization.md#serialize)
* [typeToBuffer](utils_serialization.serialization.md#typetobuffer)
* [getInstance](utils_serialization.serialization.md#static-getinstance)

## Constructors

### `Private` constructor

\+ **new Serialization**(): *[Serialization](utils_serialization.serialization.md)*

*Defined in [src/utils/serialization.ts:83](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L83)*

**Returns:** *[Serialization](utils_serialization.serialization.md)*

## Properties

### `Private` bintools

• **bintools**: *[BinTools](utils_bintools.bintools.md)*

*Defined in [src/utils/serialization.ts:88](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L88)*

___

### `Static` `Private` instance

▪ **instance**: *[Serialization](utils_serialization.serialization.md)*

*Defined in [src/utils/serialization.ts:83](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L83)*

## Methods

###  bufferToType

▸ **bufferToType**(`vb`: Buffer, `type`: [SerializedType](../modules/utils_serialization.md#serializedtype), ...`args`: Array‹any›): *any*

*Defined in [src/utils/serialization.ts:100](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`vb` | Buffer |
`type` | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`...args` | Array‹any› |

**Returns:** *any*

___

###  decoder

▸ **decoder**(`value`: string, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding), `intype`: [SerializedType](../modules/utils_serialization.md#serializedtype), `outtype`: [SerializedType](../modules/utils_serialization.md#serializedtype), ...`args`: Array‹any›): *any*

*Defined in [src/utils/serialization.ts:193](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L193)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |
`intype` | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`outtype` | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`...args` | Array‹any› |

**Returns:** *any*

___

###  deserialize

▸ **deserialize**(`input`: object, `output`: [Serializable](utils_serialization.serializable.md)): *void*

*Defined in [src/utils/serialization.ts:217](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | object |
`output` | [Serializable](utils_serialization.serializable.md) |

**Returns:** *void*

___

###  encoder

▸ **encoder**(`value`: any, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding), `intype`: [SerializedType](../modules/utils_serialization.md#serializedtype), `outtype`: [SerializedType](../modules/utils_serialization.md#serializedtype), ...`args`: Array‹any›): *string*

*Defined in [src/utils/serialization.ts:181](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |
`intype` | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`outtype` | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`...args` | Array‹any› |

**Returns:** *string*

___

###  serialize

▸ **serialize**(`serialize`: [Serializable](utils_serialization.serializable.md), `vm`: string, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding), `notes`: string): *object*

*Defined in [src/utils/serialization.ts:204](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L204)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`serialize` | [Serializable](utils_serialization.serializable.md) | - |
`vm` | string | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "display" |
`notes` | string | undefined |

**Returns:** *object*

___

###  typeToBuffer

▸ **typeToBuffer**(`v`: any, `type`: [SerializedType](../modules/utils_serialization.md#serializedtype), ...`args`: Array‹any›): *Buffer*

*Defined in [src/utils/serialization.ts:132](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |
`type` | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`...args` | Array‹any› |

**Returns:** *Buffer*

___

### `Static` getInstance

▸ **getInstance**(): *[Serialization](utils_serialization.serialization.md)*

*Defined in [src/utils/serialization.ts:93](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L93)*

Retrieves the Serialization singleton.

**Returns:** *[Serialization](utils_serialization.serialization.md)*
