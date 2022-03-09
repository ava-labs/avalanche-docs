[avalanche](../README.md) › [API-Keystore](../modules/api_keystore.md) › [KeystoreAPI](api_keystore.keystoreapi.md)

# Class: KeystoreAPI

Class for interacting with a node API that is using the node's KeystoreAPI.

**WARNING**: The KeystoreAPI is to be used by the node-owner as the data is stored locally on the node. Do not trust the root user. If you are not the node-owner, do not use this as your wallet.

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **KeystoreAPI**

## Index

### Constructors

* [constructor](api_keystore.keystoreapi.md#constructor)

### Properties

* [baseURL](api_keystore.keystoreapi.md#protected-baseurl)
* [core](api_keystore.keystoreapi.md#protected-core)
* [db](api_keystore.keystoreapi.md#protected-db)
* [jrpcVersion](api_keystore.keystoreapi.md#protected-jrpcversion)
* [rpcID](api_keystore.keystoreapi.md#protected-rpcid)

### Methods

* [callMethod](api_keystore.keystoreapi.md#callmethod)
* [createUser](api_keystore.keystoreapi.md#createuser)
* [deleteUser](api_keystore.keystoreapi.md#deleteuser)
* [exportUser](api_keystore.keystoreapi.md#exportuser)
* [getBaseURL](api_keystore.keystoreapi.md#getbaseurl)
* [getDB](api_keystore.keystoreapi.md#getdb)
* [getRPCID](api_keystore.keystoreapi.md#getrpcid)
* [importUser](api_keystore.keystoreapi.md#importuser)
* [listUsers](api_keystore.keystoreapi.md#listusers)
* [setBaseURL](api_keystore.keystoreapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new KeystoreAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string): *[KeystoreAPI](api_keystore.keystoreapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/keystore/api.ts:125](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/keystore/api.ts#L125)*

This class should not be instantiated directly. Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseURL` | string | "/ext/keystore" | Defaults to the string "/ext/keystore" as the path to rpc's baseURL  |

**Returns:** *[KeystoreAPI](api_keystore.keystoreapi.md)*

## Properties

### `Protected` baseURL

• **baseURL**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseURL](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L29)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L28)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:30](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L30)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)*

*Defined in [src/common/jrpcapi.ts:11](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L11)*

___

### `Protected` rpcID

• **rpcID**: *number* = 1

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[rpcID](common_jrpcapi.jrpcapi.md#protected-rpcid)*

*Defined in [src/common/jrpcapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L12)*

## Methods

###  callMethod

▸ **callMethod**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `headers?`: object): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[callMethod](common_jrpcapi.jrpcapi.md#callmethod)*

*Defined in [src/common/jrpcapi.ts:14](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseURL?` | string |
`headers?` | object |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  createUser

▸ **createUser**(`username`: string, `password`: string): *Promise‹boolean›*

*Defined in [src/apis/keystore/api.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/keystore/api.ts#L29)*

Creates a user in the node's database.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | Name of the user to create |
`password` | string | Password for the user  |

**Returns:** *Promise‹boolean›*

Promise for a boolean with true on success

___

###  deleteUser

▸ **deleteUser**(`username`: string, `password`: string): *Promise‹boolean›*

*Defined in [src/apis/keystore/api.ts:113](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/keystore/api.ts#L113)*

Deletes a user in the node's database.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | Name of the user to delete |
`password` | string | Password for the user  |

**Returns:** *Promise‹boolean›*

Promise for a boolean with true on success

___

###  exportUser

▸ **exportUser**(`username`: string, `password`: string): *Promise‹string›*

*Defined in [src/apis/keystore/api.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/keystore/api.ts#L51)*

Exports a user. The user can be imported to another node with keystore.importUser .

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The name of the user to export |
`password` | string | The password of the user to export  |

**Returns:** *Promise‹string›*

Promise with a string importable using importUser

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:53](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L53)*

Returns the baseURL's path.

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L58)*

Returns the baseURL's database.

**Returns:** *StoreAPI*

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L78)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  importUser

▸ **importUser**(`username`: string, `user`: string, `password`: string): *Promise‹boolean›*

*Defined in [src/apis/keystore/api.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/keystore/api.ts#L74)*

Imports a user file into the node's user database and assigns it to a username.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The name the user file should be imported into |
`user` | string | cb58 serialized string represetning a user"s data |
`password` | string | The user"s password  |

**Returns:** *Promise‹boolean›*

A promise with a true-value on success.

___

###  listUsers

▸ **listUsers**(): *Promise‹string[]›*

*Defined in [src/apis/keystore/api.ts:98](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/keystore/api.ts#L98)*

Lists the names of all users on the node.

**Returns:** *Promise‹string[]›*

Promise of an array with all user names.

___

###  setBaseURL

▸ **setBaseURL**(`baseURL`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:37](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L37)*

Sets the path of the APIs baseURL.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseURL` | string | Path of the APIs baseURL - ex: "/ext/bc/X"  |

**Returns:** *void*
