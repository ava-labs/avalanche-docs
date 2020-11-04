[avalanche](../README.md) › [API-PlatformVM-Credentials](api_platformvm_credentials.md)

# Module: API-PlatformVM-Credentials

## Index

### Classes

* [SECPCredential](../classes/api_platformvm_credentials.secpcredential.md)

### Variables

* [serializer](api_platformvm_credentials.md#const-serializer)

### Functions

* [SelectCredentialClass](api_platformvm_credentials.md#const-selectcredentialclass)

## Variables

### `Const` serializer

• **serializer**: *[Serialization](../classes/utils_serialization.serialization.md)‹›* = Serialization.getInstance()

*Defined in [src/apis/platformvm/credentials.ts:15](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/credentials.ts#L15)*

## Functions

### `Const` SelectCredentialClass

▸ **SelectCredentialClass**(`credid`: number, ...`args`: Array‹any›): *[Credential](../classes/common_signature.credential.md)*

*Defined in [src/apis/platformvm/credentials.ts:24](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/platformvm/credentials.ts#L24)*

Takes a buffer representing the credential and returns the proper [Credential](../classes/common_signature.credential.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`credid` | number | A number representing the credential ID parsed prior to the bytes passed in  |
`...args` | Array‹any› | - |

**Returns:** *[Credential](../classes/common_signature.credential.md)*

An instance of an [Credential](../classes/common_signature.credential.md)-extended class.
