[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [BIGNUMPayload](utils_payload.bignumpayload.md)

# Class: BIGNUMPayload

Class for payloads representing Big Numbers.

**`param`** Accepts a Buffer, BN, or base64 string

## Hierarchy

* [PayloadBase](utils_payload.payloadbase.md)

  ↳ **BIGNUMPayload**

## Index

### Constructors

* [constructor](utils_payload.bignumpayload.md#constructor)

### Properties

* [payload](utils_payload.bignumpayload.md#protected-payload)
* [typeid](utils_payload.bignumpayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.bignumpayload.md#frombuffer)
* [getContent](utils_payload.bignumpayload.md#getcontent)
* [getPayload](utils_payload.bignumpayload.md#getpayload)
* [returnType](utils_payload.bignumpayload.md#returntype)
* [toBuffer](utils_payload.bignumpayload.md#tobuffer)
* [typeID](utils_payload.bignumpayload.md#typeid)
* [typeName](utils_payload.bignumpayload.md#typename)

## Constructors

###  constructor

\+ **new BIGNUMPayload**(`payload`: any): *[BIGNUMPayload](utils_payload.bignumpayload.md)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:375](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L375)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer, BN, or base64 string  |

**Returns:** *[BIGNUMPayload](utils_payload.bignumpayload.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:166](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L166)*

___

### `Protected` typeid

• **typeid**: *number* = 5

*Overrides [PayloadBase](utils_payload.payloadbase.md).[typeid](utils_payload.payloadbase.md#protected-typeid)*

*Defined in [src/utils/payload.ts:368](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L368)*

## Methods

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[fromBuffer](utils_payload.payloadbase.md#frombuffer)*

*Defined in [src/utils/payload.ts:204](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L204)*

Decodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getContent

▸ **getContent**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[getContent](utils_payload.payloadbase.md#getcontent)*

*Defined in [src/utils/payload.ts:186](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L186)*

Returns the payload content (minus typeID).

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[getPayload](utils_payload.payloadbase.md#getpayload)*

*Defined in [src/utils/payload.ts:194](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L194)*

Returns the payload (with typeID).

**Returns:** *Buffer*

___

###  returnType

▸ **returnType**(): *BN*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:373](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L373)*

Returns a [BN](https://github.com/indutny/bn.js/) for the payload.

**Returns:** *BN*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[toBuffer](utils_payload.payloadbase.md#tobuffer)*

*Defined in [src/utils/payload.ts:217](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L217)*

Encodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Returns:** *Buffer*

___

###  typeID

▸ **typeID**(): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeID](utils_payload.payloadbase.md#typeid)*

*Defined in [src/utils/payload.ts:172](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L172)*

Returns the TypeID for the payload.

**Returns:** *number*

___

###  typeName

▸ **typeName**(): *string*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeName](utils_payload.payloadbase.md#typename)*

*Defined in [src/utils/payload.ts:179](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/payload.ts#L179)*

Returns the string name for the payload's type.

**Returns:** *string*
