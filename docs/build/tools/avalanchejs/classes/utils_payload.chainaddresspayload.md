[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [ChainAddressPayload](utils_payload.chainaddresspayload.md)

# Class: ChainAddressPayload

Class for payloads representing chain addresses.

## Hierarchy

* [PayloadBase](utils_payload.payloadbase.md)

  ↳ **ChainAddressPayload**

  ↳ [XCHAINADDRPayload](utils_payload.xchainaddrpayload.md)

  ↳ [PCHAINADDRPayload](utils_payload.pchainaddrpayload.md)

  ↳ [CCHAINADDRPayload](utils_payload.cchainaddrpayload.md)

## Index

### Constructors

* [constructor](utils_payload.chainaddresspayload.md#constructor)

### Properties

* [chainid](utils_payload.chainaddresspayload.md#protected-chainid)
* [payload](utils_payload.chainaddresspayload.md#protected-payload)
* [typeid](utils_payload.chainaddresspayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.chainaddresspayload.md#frombuffer)
* [getContent](utils_payload.chainaddresspayload.md#getcontent)
* [getPayload](utils_payload.chainaddresspayload.md#getpayload)
* [returnChainID](utils_payload.chainaddresspayload.md#returnchainid)
* [returnType](utils_payload.chainaddresspayload.md#returntype)
* [toBuffer](utils_payload.chainaddresspayload.md#tobuffer)
* [typeID](utils_payload.chainaddresspayload.md#typeid)
* [typeName](utils_payload.chainaddresspayload.md#typename)

## Constructors

###  constructor

\+ **new ChainAddressPayload**(`payload`: any, `hrp?`: string): *[ChainAddressPayload](utils_payload.chainaddresspayload.md)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:448](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L448)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer or address string  |
`hrp?` | string | - | - |

**Returns:** *[ChainAddressPayload](utils_payload.chainaddresspayload.md)*

## Properties

### `Protected` chainid

• **chainid**: *string* = ""

*Defined in [src/utils/payload.ts:433](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L433)*

___

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:198](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L198)*

___

### `Protected` typeid

• **typeid**: *number* = 6

*Overrides [PayloadBase](utils_payload.payloadbase.md).[typeid](utils_payload.payloadbase.md#protected-typeid)*

*Defined in [src/utils/payload.ts:432](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L432)*

## Methods

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[fromBuffer](utils_payload.payloadbase.md#frombuffer)*

*Defined in [src/utils/payload.ts:236](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L236)*

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

*Defined in [src/utils/payload.ts:218](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L218)*

Returns the payload content (minus typeID).

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[getPayload](utils_payload.payloadbase.md#getpayload)*

*Defined in [src/utils/payload.ts:226](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L226)*

Returns the payload (with typeID).

**Returns:** *Buffer*

___

###  returnChainID

▸ **returnChainID**(): *string*

*Defined in [src/utils/payload.ts:438](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L438)*

Returns the chainid.

**Returns:** *string*

___

###  returnType

▸ **returnType**(`hrp`: string): *string*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:445](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L445)*

Returns an address string for the payload.

**Parameters:**

Name | Type |
------ | ------ |
`hrp` | string |

**Returns:** *string*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[toBuffer](utils_payload.payloadbase.md#tobuffer)*

*Defined in [src/utils/payload.ts:251](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L251)*

Encodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Returns:** *Buffer*

___

###  typeID

▸ **typeID**(): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeID](utils_payload.payloadbase.md#typeid)*

*Defined in [src/utils/payload.ts:204](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L204)*

Returns the TypeID for the payload.

**Returns:** *number*

___

###  typeName

▸ **typeName**(): *string*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeName](utils_payload.payloadbase.md#typename)*

*Defined in [src/utils/payload.ts:211](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L211)*

Returns the string name for the payload's type.

**Returns:** *string*
