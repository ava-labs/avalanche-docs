[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [PayloadTypes](utils_payload.payloadtypes.md)

# Class: PayloadTypes

Class for determining payload types and managing the lookup table.

## Hierarchy

* **PayloadTypes**

## Index

### Constructors

* [constructor](utils_payload.payloadtypes.md#private-constructor)

### Properties

* [types](utils_payload.payloadtypes.md#protected-types)
* [instance](utils_payload.payloadtypes.md#static-private-instance)

### Methods

* [getContent](utils_payload.payloadtypes.md#getcontent)
* [getPayload](utils_payload.payloadtypes.md#getpayload)
* [getTypeID](utils_payload.payloadtypes.md#gettypeid)
* [lookupID](utils_payload.payloadtypes.md#lookupid)
* [lookupType](utils_payload.payloadtypes.md#lookuptype)
* [recast](utils_payload.payloadtypes.md#recast)
* [select](utils_payload.payloadtypes.md#select)
* [getInstance](utils_payload.payloadtypes.md#static-getinstance)

## Constructors

### `Private` constructor

\+ **new PayloadTypes**(): *[PayloadTypes](utils_payload.payloadtypes.md)*

*Defined in [src/utils/payload.ts:151](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L151)*

**Returns:** *[PayloadTypes](utils_payload.payloadtypes.md)*

## Properties

### `Protected` types

• **types**: *Array‹string›* = []

*Defined in [src/utils/payload.ts:21](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L21)*

___

### `Static` `Private` instance

▪ **instance**: *[PayloadTypes](utils_payload.payloadtypes.md)*

*Defined in [src/utils/payload.ts:20](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L20)*

## Methods

###  getContent

▸ **getContent**(`payload`: Buffer): *Buffer*

*Defined in [src/utils/payload.ts:26](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L26)*

Given an encoded payload buffer returns the payload content (minus typeID).

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(`payload`: Buffer): *Buffer*

*Defined in [src/utils/payload.ts:34](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L34)*

Given an encoded payload buffer returns the payload (with typeID).

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *Buffer*

___

###  getTypeID

▸ **getTypeID**(`payload`: Buffer): *number*

*Defined in [src/utils/payload.ts:42](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L42)*

Given a payload buffer returns the proper TypeID.

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *number*

___

###  lookupID

▸ **lookupID**(`typestr`: string): *number*

*Defined in [src/utils/payload.ts:53](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L53)*

Given a type string returns the proper TypeID.

**Parameters:**

Name | Type |
------ | ------ |
`typestr` | string |

**Returns:** *number*

___

###  lookupType

▸ **lookupType**(`value`: number): *string*

*Defined in [src/utils/payload.ts:60](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L60)*

Given a TypeID returns a string describing the payload type.

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *string*

___

###  recast

▸ **recast**(`unknowPayload`: [PayloadBase](utils_payload.payloadbase.md)): *[PayloadBase](utils_payload.payloadbase.md)*

*Defined in [src/utils/payload.ts:138](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L138)*

Given a [PayloadBase](utils_payload.payloadbase.md) which may not be cast properly, returns a properly cast [PayloadBase](utils_payload.payloadbase.md).

**Parameters:**

Name | Type |
------ | ------ |
`unknowPayload` | [PayloadBase](utils_payload.payloadbase.md) |

**Returns:** *[PayloadBase](utils_payload.payloadbase.md)*

___

###  select

▸ **select**(`typeid`: number, ...`args`: Array‹any›): *[PayloadBase](utils_payload.payloadbase.md)*

*Defined in [src/utils/payload.ts:67](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L67)*

Given a TypeID returns the proper [PayloadBase](utils_payload.payloadbase.md).

**Parameters:**

Name | Type |
------ | ------ |
`typeid` | number |
`...args` | Array‹any› |

**Returns:** *[PayloadBase](utils_payload.payloadbase.md)*

___

### `Static` getInstance

▸ **getInstance**(): *[PayloadTypes](utils_payload.payloadtypes.md)*

*Defined in [src/utils/payload.ts:145](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L145)*

Returns the [PayloadTypes](utils_payload.payloadtypes.md) singleton.

**Returns:** *[PayloadTypes](utils_payload.payloadtypes.md)*
