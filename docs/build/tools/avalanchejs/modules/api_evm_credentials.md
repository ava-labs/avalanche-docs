[avalanche](../README.md) › [API-EVM-Credentials](api_evm_credentials.md)

# Module: API-EVM-Credentials

## Index

### Classes

* [SECPCredential](../classes/api_evm_credentials.secpcredential.md)

### Functions

* [SelectCredentialClass](api_evm_credentials.md#const-selectcredentialclass)

## Functions

### `Const` SelectCredentialClass

▸ **SelectCredentialClass**(`credid`: number, ...`args`: any[]): *[Credential](../classes/common_signature.credential.md)*

*Defined in [src/apis/evm/credentials.ts:17](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/evm/credentials.ts#L17)*

Takes a buffer representing the credential and returns the proper [Credential](../classes/common_signature.credential.md) instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`credid` | number | A number representing the credential ID parsed prior to the bytes passed in  |
`...args` | any[] | - |

**Returns:** *[Credential](../classes/common_signature.credential.md)*

An instance of an [Credential](../classes/common_signature.credential.md)-extended class.
