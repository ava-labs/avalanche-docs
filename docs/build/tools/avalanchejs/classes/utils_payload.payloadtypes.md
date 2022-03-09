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

*Defined in [src/utils/payload.ts:155](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L155)*

**Returns:** *[PayloadTypes](utils_payload.payloadtypes.md)*

## Properties

### `Protected` types

• **types**: *string[]* = []

*Defined in [src/utils/payload.ts:23](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L23)*

___

### `Static` `Private` instance

▪ **instance**: *[PayloadTypes](utils_payload.payloadtypes.md)*

*Defined in [src/utils/payload.ts:22](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L22)*

## Methods

###  getContent

▸ **getContent**(`payload`: Buffer): *Buffer*

*Defined in [src/utils/payload.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L28)*

Given an encoded payload buffer returns the payload content (minus typeID).

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(`payload`: Buffer): *Buffer*

*Defined in [src/utils/payload.ts:36](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L36)*

Given an encoded payload buffer returns the payload (with typeID).

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *Buffer*

___

###  getTypeID

▸ **getTypeID**(`payload`: Buffer): *number*

*Defined in [src/utils/payload.ts:44](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L44)*

Given a payload buffer returns the proper TypeID.

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *number*

___

###  lookupID

▸ **lookupID**(`typestr`: string): *number*

*Defined in [src/utils/payload.ts:55](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L55)*

Given a type string returns the proper TypeID.

**Parameters:**

Name | Type |
------ | ------ |
`typestr` | string |

**Returns:** *number*

___

###  lookupType

▸ **lookupType**(`value`: number): *string*

*Defined in [src/utils/payload.ts:62](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L62)*

Given a TypeID returns a string describing the payload type.

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *string*

___

###  recast

▸ **recast**(`unknowPayload`: [PayloadBase](utils_payload.payloadbase.md)): *[PayloadBase](utils_payload.payloadbase.md)*

*Defined in [src/utils/payload.ts:142](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L142)*

Given a [PayloadBase](utils_payload.payloadbase.md) which may not be cast properly, returns a properly cast [PayloadBase](utils_payload.payloadbase.md).

**Parameters:**

Name | Type |
------ | ------ |
`unknowPayload` | [PayloadBase](utils_payload.payloadbase.md) |

**Returns:** *[PayloadBase](utils_payload.payloadbase.md)*

___

###  select

▸ **select**(`typeID`: number, ...`args`: any[]): *[PayloadBase](utils_payload.payloadbase.md)*

*Defined in [src/utils/payload.ts:69](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L69)*

Given a TypeID returns the proper [PayloadBase](utils_payload.payloadbase.md).

**Parameters:**

Name | Type |
------ | ------ |
`typeID` | number |
`...args` | any[] |

**Returns:** *[PayloadBase](utils_payload.payloadbase.md)*

___

### `Static` getInstance

▸ **getInstance**(): *[PayloadTypes](utils_payload.payloadtypes.md)*

*Defined in [src/utils/payload.ts:149](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L149)*

Returns the [PayloadTypes](utils_payload.payloadtypes.md) singleton.

**Returns:** *[PayloadTypes](utils_payload.payloadtypes.md)*
