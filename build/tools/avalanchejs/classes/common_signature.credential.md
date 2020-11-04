[avalanche](../README.md) › [Common-Signature](../modules/common_signature.md) › [Credential](common_signature.credential.md)

# Class: Credential

## Hierarchy

* [Serializable](utils_serialization.serializable.md)

  ↳ **Credential**

  ↳ [SECPCredential](api_avm_credentials.secpcredential.md)

  ↳ [NFTCredential](api_avm_credentials.nftcredential.md)

  ↳ [SECPCredential](api_platformvm_credentials.secpcredential.md)

## Index

### Constructors

* [constructor](common_signature.credential.md#constructor)

### Properties

* [_typeID](common_signature.credential.md#protected-_typeid)
* [_typeName](common_signature.credential.md#protected-_typename)
* [sigArray](common_signature.credential.md#protected-sigarray)

### Methods

* [addSignature](common_signature.credential.md#addsignature)
* [clone](common_signature.credential.md#abstract-clone)
* [create](common_signature.credential.md#abstract-create)
* [deserialize](common_signature.credential.md#deserialize)
* [fromBuffer](common_signature.credential.md#frombuffer)
* [getCredentialID](common_signature.credential.md#abstract-getcredentialid)
* [getTypeID](common_signature.credential.md#gettypeid)
* [getTypeName](common_signature.credential.md#gettypename)
* [select](common_signature.credential.md#abstract-select)
* [serialize](common_signature.credential.md#serialize)
* [toBuffer](common_signature.credential.md#tobuffer)

## Constructors

###  constructor

\+ **new Credential**(`sigarray`: Array‹[Signature](common_signature.signature.md)›): *[Credential](common_signature.credential.md)*

*Defined in [src/common/credentials.ts:162](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L162)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`sigarray` | Array‹[Signature](common_signature.signature.md)› | undefined |

**Returns:** *[Credential](common_signature.credential.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *any* = undefined

*Overrides [Serializable](utils_serialization.serializable.md).[_typeID](utils_serialization.serializable.md#protected-_typeid)*

*Defined in [src/common/credentials.ts:103](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L103)*

___

### `Protected` _typeName

• **_typeName**: *string* = "Credential"

*Overrides [Serializable](utils_serialization.serializable.md).[_typeName](utils_serialization.serializable.md#protected-_typename)*

*Defined in [src/common/credentials.ts:102](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L102)*

___

### `Protected` sigArray

• **sigArray**: *Array‹[Signature](common_signature.signature.md)›* = []

*Defined in [src/common/credentials.ts:121](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L121)*

## Methods

###  addSignature

▸ **addSignature**(`sig`: [Signature](common_signature.signature.md)): *number*

*Defined in [src/common/credentials.ts:128](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L128)*

Adds a signature to the credentials and returns the index off the added signature.

**Parameters:**

Name | Type |
------ | ------ |
`sig` | [Signature](common_signature.signature.md) |

**Returns:** *number*

___

### `Abstract` clone

▸ **clone**(): *this*

*Defined in [src/common/credentials.ts:158](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L158)*

**Returns:** *this*

___

### `Abstract` create

▸ **create**(...`args`: any[]): *this*

*Defined in [src/common/credentials.ts:160](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L160)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Overrides [Serializable](utils_serialization.serializable.md).[deserialize](utils_serialization.serializable.md#deserialize)*

*Defined in [src/common/credentials.ts:112](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L112)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: any, `offset`: number): *number*

*Defined in [src/common/credentials.ts:133](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L133)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | any | - |
`offset` | number | 0 |

**Returns:** *number*

___

### `Abstract` getCredentialID

▸ **getCredentialID**(): *number*

*Defined in [src/common/credentials.ts:123](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L123)*

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeID](utils_serialization.serializable.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [Serializable](utils_serialization.serializable.md).[getTypeName](utils_serialization.serializable.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

### `Abstract` select

▸ **select**(`id`: number, ...`args`: any[]): *[Credential](common_signature.credential.md)*

*Defined in [src/common/credentials.ts:162](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Credential](common_signature.credential.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/credentials.ts:105](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L105)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/utils_serialization.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/common/credentials.ts:145](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L145)*

**Returns:** *Buffer*
