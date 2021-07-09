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

*Defined in [src/utils/serialization.ts:99](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L99)*

**Returns:** *[Serialization](utils_serialization.serialization.md)*

## Properties

### `Private` bintools

• **bintools**: *[BinTools](utils_bintools.bintools.md)*

*Defined in [src/utils/serialization.ts:104](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L104)*

___

### `Static` `Private` instance

▪ **instance**: *[Serialization](utils_serialization.serialization.md)*

*Defined in [src/utils/serialization.ts:99](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L99)*

## Methods

###  bufferToType

▸ **bufferToType**(`vb`: Buffer, `type`: [SerializedType](../modules/utils_serialization.md#serializedtype), ...`args`: any[]): *any*

*Defined in [src/utils/serialization.ts:124](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L124)*

Convert [Buffer](https://github.com/feross/buffer) to [SerializedType](../modules/utils_serialization.md#serializedtype)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vb` | Buffer | [Buffer](https://github.com/feross/buffer) |
`type` | [SerializedType](../modules/utils_serialization.md#serializedtype) | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`...args` | any[] | - |

**Returns:** *any*

type of [SerializedType](../modules/utils_serialization.md#serializedtype)

___

###  decoder

▸ **decoder**(`value`: string, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding), `intype`: [SerializedType](../modules/utils_serialization.md#serializedtype), `outtype`: [SerializedType](../modules/utils_serialization.md#serializedtype), ...`args`: any[]): *any*

*Defined in [src/utils/serialization.ts:244](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L244)*

Convert value to type of [SerializedType](../modules/utils_serialization.md#serializedtype) or [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | string | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |
`intype` | [SerializedType](../modules/utils_serialization.md#serializedtype) | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`outtype` | [SerializedType](../modules/utils_serialization.md#serializedtype) | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`...args` | any[] | - |

**Returns:** *any*

type of [SerializedType](../modules/utils_serialization.md#serializedtype) or [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)

___

###  deserialize

▸ **deserialize**(`input`: [Serialized](../interfaces/common_interfaces.serialized.md), `output`: [Serializable](utils_serialization.serializable.md)): *void*

*Defined in [src/utils/serialization.ts:268](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L268)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | [Serialized](../interfaces/common_interfaces.serialized.md) |
`output` | [Serializable](utils_serialization.serializable.md) |

**Returns:** *void*

___

###  encoder

▸ **encoder**(`value`: any, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding), `intype`: [SerializedType](../modules/utils_serialization.md#serializedtype), `outtype`: [SerializedType](../modules/utils_serialization.md#serializedtype), ...`args`: any[]): *any*

*Defined in [src/utils/serialization.ts:223](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L223)*

Convert value to type of [SerializedType](../modules/utils_serialization.md#serializedtype) or [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | any | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) |
`intype` | [SerializedType](../modules/utils_serialization.md#serializedtype) | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`outtype` | [SerializedType](../modules/utils_serialization.md#serializedtype) | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`...args` | any[] | - |

**Returns:** *any*

type of [SerializedType](../modules/utils_serialization.md#serializedtype) or [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)

___

###  serialize

▸ **serialize**(`serialize`: [Serializable](utils_serialization.serializable.md), `vm`: string, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding), `notes`: string): *[Serialized](../interfaces/common_interfaces.serialized.md)*

*Defined in [src/utils/serialization.ts:255](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L255)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`serialize` | [Serializable](utils_serialization.serializable.md) | - |
`vm` | string | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "display" |
`notes` | string | undefined |

**Returns:** *[Serialized](../interfaces/common_interfaces.serialized.md)*

___

###  typeToBuffer

▸ **typeToBuffer**(`v`: any, `type`: [SerializedType](../modules/utils_serialization.md#serializedtype), ...`args`: any[]): *Buffer*

*Defined in [src/utils/serialization.ts:164](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L164)*

Convert [SerializedType](../modules/utils_serialization.md#serializedtype) to [Buffer](https://github.com/feross/buffer)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | any | type of [SerializedType](../modules/utils_serialization.md#serializedtype) |
`type` | [SerializedType](../modules/utils_serialization.md#serializedtype) | [SerializedType](../modules/utils_serialization.md#serializedtype) |
`...args` | any[] | - |

**Returns:** *Buffer*

[Buffer](https://github.com/feross/buffer)

___

### `Static` getInstance

▸ **getInstance**(): *[Serialization](utils_serialization.serialization.md)*

*Defined in [src/utils/serialization.ts:109](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L109)*

Retrieves the Serialization singleton.

**Returns:** *[Serialization](utils_serialization.serialization.md)*
