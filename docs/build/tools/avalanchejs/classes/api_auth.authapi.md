[avalanche](../README.md) › [API-Auth](../modules/api_auth.md) › [AuthAPI](api_auth.authapi.md)

# Class: AuthAPI

Class for interacting with a node's AuthAPI.

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **AuthAPI**

## Index

### Constructors

* [constructor](api_auth.authapi.md#constructor)

### Properties

* [baseURL](api_auth.authapi.md#protected-baseurl)
* [core](api_auth.authapi.md#protected-core)
* [db](api_auth.authapi.md#protected-db)
* [jrpcVersion](api_auth.authapi.md#protected-jrpcversion)
* [rpcID](api_auth.authapi.md#protected-rpcid)

### Methods

* [callMethod](api_auth.authapi.md#callmethod)
* [changePassword](api_auth.authapi.md#changepassword)
* [getBaseURL](api_auth.authapi.md#getbaseurl)
* [getDB](api_auth.authapi.md#getdb)
* [getRPCID](api_auth.authapi.md#getrpcid)
* [newToken](api_auth.authapi.md#newtoken)
* [revokeToken](api_auth.authapi.md#revoketoken)
* [setBaseURL](api_auth.authapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new AuthAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string): *[AuthAPI](api_auth.authapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/auth/api.ts:89](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/auth/api.ts#L89)*

This class should not be instantiated directly. Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi)
method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseURL` | string | "/ext/auth" | Defaults to the string "/ext/auth" as the path to rpc's baseURL  |

**Returns:** *[AuthAPI](api_auth.authapi.md)*

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

###  changePassword

▸ **changePassword**(`oldPassword`: string, `newPassword`: string): *Promise‹boolean›*

*Defined in [src/apis/auth/api.ts:76](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/auth/api.ts#L76)*

Change this node's authorization token password. **Any authorization tokens created under an old password will become invalid.**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`oldPassword` | string | This node's authorization token password, set through the CLI when the node was launched. |
`newPassword` | string | A new password for this node's authorization token issuance.  |

**Returns:** *Promise‹boolean›*

Returns a Promise boolean indicating if the password was successfully changed.

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

###  newToken

▸ **newToken**(`password`: string, `endpoints`: string[]): *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

*Defined in [src/apis/auth/api.ts:31](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/auth/api.ts#L31)*

Creates a new authorization token that grants access to one or more API endpoints.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`password` | string | This node's authorization token password, set through the CLI when the node was launched. |
`endpoints` | string[] | A list of endpoints that will be accessible using the generated token. If there"s an element that is "*", this token can reach any endpoint.  |

**Returns:** *Promise‹string | [ErrorResponseObject](../interfaces/src_utils.errorresponseobject.md)›*

Returns a Promise string containing the authorization token.

___

###  revokeToken

▸ **revokeToken**(`password`: string, `token`: string): *Promise‹boolean›*

*Defined in [src/apis/auth/api.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/auth/api.ts#L56)*

Revokes an authorization token, removing all of its rights to access endpoints.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`password` | string | This node's authorization token password, set through the CLI when the node was launched. |
`token` | string | An authorization token whose access should be revoked.  |

**Returns:** *Promise‹boolean›*

Returns a Promise boolean indicating if a token was successfully revoked.

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
