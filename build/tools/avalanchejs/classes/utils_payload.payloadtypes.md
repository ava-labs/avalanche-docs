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

*Defined in [src/utils/payload.ts:152](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L152)*

**Returns:** *[PayloadTypes](utils_payload.payloadtypes.md)*

## Properties

### `Protected` types

• **types**: *Array‹string›* = []

*Defined in [src/utils/payload.ts:22](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L22)*

___

### `Static` `Private` instance

▪ **instance**: *[PayloadTypes](utils_payload.payloadtypes.md)*

*Defined in [src/utils/payload.ts:21](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L21)*

## Methods

###  getContent

▸ **getContent**(`payload`: Buffer): *Buffer*

*Defined in [src/utils/payload.ts:27](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L27)*

Given an encoded payload buffer returns the payload content (minus typeID).

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(`payload`: Buffer): *Buffer*

*Defined in [src/utils/payload.ts:35](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L35)*

Given an encoded payload buffer returns the payload (with typeID).

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *Buffer*

___

###  getTypeID

▸ **getTypeID**(`payload`: Buffer): *number*

*Defined in [src/utils/payload.ts:43](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L43)*

Given a payload buffer returns the proper TypeID.

**Parameters:**

Name | Type |
------ | ------ |
`payload` | Buffer |

**Returns:** *number*

___

###  lookupID

▸ **lookupID**(`typestr`: string): *number*

*Defined in [src/utils/payload.ts:54](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L54)*

Given a type string returns the proper TypeID.

**Parameters:**

Name | Type |
------ | ------ |
`typestr` | string |

**Returns:** *number*

___

###  lookupType

▸ **lookupType**(`value`: number): *string*

*Defined in [src/utils/payload.ts:61](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L61)*

Given a TypeID returns a string describing the payload type.

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *string*

___

###  recast

▸ **recast**(`unknowPayload`: [PayloadBase](utils_payload.payloadbase.md)): *[PayloadBase](utils_payload.payloadbase.md)*

*Defined in [src/utils/payload.ts:139](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L139)*

Given a [PayloadBase](utils_payload.payloadbase.md) which may not be cast properly, returns a properly cast [PayloadBase](utils_payload.payloadbase.md).

**Parameters:**

Name | Type |
------ | ------ |
`unknowPayload` | [PayloadBase](utils_payload.payloadbase.md) |

**Returns:** *[PayloadBase](utils_payload.payloadbase.md)*

___

###  select

▸ **select**(`typeid`: number, ...`args`: Array‹any›): *[PayloadBase](utils_payload.payloadbase.md)*

*Defined in [src/utils/payload.ts:68](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L68)*

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

*Defined in [src/utils/payload.ts:146](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L146)*

Returns the [PayloadTypes](utils_payload.payloadtypes.md) singleton.

**Returns:** *[PayloadTypes](utils_payload.payloadtypes.md)*
