[avalanche](../README.md) › [API-AVM-Credentials](../modules/api_avm_credentials.md) › [NFTCredential](api_avm_credentials.nftcredential.md)

# Class: NFTCredential

## Hierarchy

  ↳ [Credential](common_signature.credential.md)

  ↳ **NFTCredential**

## Index

### Constructors

* [constructor](api_avm_credentials.nftcredential.md#constructor)

### Properties

* [_typeID](api_avm_credentials.nftcredential.md#protected-_typeid)
* [_typeName](api_avm_credentials.nftcredential.md#protected-_typename)
* [sigArray](api_avm_credentials.nftcredential.md#protected-sigarray)

### Methods

* [addSignature](api_avm_credentials.nftcredential.md#addsignature)
* [clone](api_avm_credentials.nftcredential.md#clone)
* [create](api_avm_credentials.nftcredential.md#create)
* [deserialize](api_avm_credentials.nftcredential.md#deserialize)
* [fromBuffer](api_avm_credentials.nftcredential.md#frombuffer)
* [getCredentialID](api_avm_credentials.nftcredential.md#getcredentialid)
* [getTypeID](api_avm_credentials.nftcredential.md#gettypeid)
* [getTypeName](api_avm_credentials.nftcredential.md#gettypename)
* [select](api_avm_credentials.nftcredential.md#select)
* [serialize](api_avm_credentials.nftcredential.md#serialize)
* [toBuffer](api_avm_credentials.nftcredential.md#tobuffer)

## Constructors

###  constructor

\+ **new NFTCredential**(`sigarray`: Array‹[Signature](common_signature.signature.md)›): *[NFTCredential](api_avm_credentials.nftcredential.md)*

*Inherited from [Credential](common_signature.credential.md).[constructor](common_signature.credential.md#constructor)*

*Defined in [src/common/credentials.ts:162](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L162)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`sigarray` | Array‹[Signature](common_signature.signature.md)› | undefined |

**Returns:** *[NFTCredential](api_avm_credentials.nftcredential.md)*

## Properties

### `Protected` _typeID

• **_typeID**: *number* = AVMConstants.NFTCREDENTIAL

*Overrides [Credential](common_signature.credential.md).[_typeID](common_signature.credential.md#protected-_typeid)*

*Defined in [src/apis/avm/credentials.ts:63](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/credentials.ts#L63)*

___

### `Protected` _typeName

• **_typeName**: *string* = "NFTCredential"

*Overrides [Credential](common_signature.credential.md).[_typeName](common_signature.credential.md#protected-_typename)*

*Defined in [src/apis/avm/credentials.ts:62](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/credentials.ts#L62)*

___

### `Protected` sigArray

• **sigArray**: *Array‹[Signature](common_signature.signature.md)›* = []

*Inherited from [Credential](common_signature.credential.md).[sigArray](common_signature.credential.md#protected-sigarray)*

*Defined in [src/common/credentials.ts:121](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L121)*

## Methods

###  addSignature

▸ **addSignature**(`sig`: [Signature](common_signature.signature.md)): *number*

*Inherited from [Credential](common_signature.credential.md).[addSignature](common_signature.credential.md#addsignature)*

*Defined in [src/common/credentials.ts:128](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L128)*

Adds a signature to the credentials and returns the index off the added signature.

**Parameters:**

Name | Type |
------ | ------ |
`sig` | [Signature](common_signature.signature.md) |

**Returns:** *number*

___

###  clone

▸ **clone**(): *this*

*Overrides [Credential](common_signature.credential.md).[clone](common_signature.credential.md#abstract-clone)*

*Defined in [src/apis/avm/credentials.ts:71](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/credentials.ts#L71)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [Credential](common_signature.credential.md).[create](common_signature.credential.md#abstract-create)*

*Defined in [src/apis/avm/credentials.ts:77](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/credentials.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *void*

*Inherited from [Credential](common_signature.credential.md).[deserialize](common_signature.credential.md#deserialize)*

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

*Inherited from [Credential](common_signature.credential.md).[fromBuffer](common_signature.credential.md#frombuffer)*

*Defined in [src/common/credentials.ts:133](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L133)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | any | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getCredentialID

▸ **getCredentialID**(): *number*

*Overrides [Credential](common_signature.credential.md).[getCredentialID](common_signature.credential.md#abstract-getcredentialid)*

*Defined in [src/apis/avm/credentials.ts:67](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/credentials.ts#L67)*

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

###  select

▸ **select**(`id`: number, ...`args`: any[]): *[Credential](common_signature.credential.md)*

*Overrides [Credential](common_signature.credential.md).[select](common_signature.credential.md#abstract-select)*

*Defined in [src/apis/avm/credentials.ts:81](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/avm/credentials.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Credential](common_signature.credential.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/utils_serialization.md#serializedencoding)): *object*

*Inherited from [Credential](common_signature.credential.md).[serialize](common_signature.credential.md#serialize)*

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

*Inherited from [Credential](common_signature.credential.md).[toBuffer](common_signature.credential.md#tobuffer)*

*Defined in [src/common/credentials.ts:145](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/credentials.ts#L145)*

**Returns:** *Buffer*
