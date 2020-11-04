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

* [baseurl](api_auth.authapi.md#protected-baseurl)
* [core](api_auth.authapi.md#protected-core)
* [db](api_auth.authapi.md#protected-db)
* [jrpcVersion](api_auth.authapi.md#protected-jrpcversion)
* [rpcid](api_auth.authapi.md#protected-rpcid)

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

\+ **new AuthAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseurl`: string): *[AuthAPI](api_auth.authapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/auth/api.ts:67](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/auth/api.ts#L67)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - |
`baseurl` | string | "/ext/auth" |

**Returns:** *[AuthAPI](api_auth.authapi.md)*

## Properties

### `Protected` baseurl

• **baseurl**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseurl](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L38)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:36](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L36)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:40](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L40)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)*

*Defined in [src/common/jrpcapi.ts:17](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L17)*

___

### `Protected` rpcid

• **rpcid**: *number* = 1

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[rpcid](common_jrpcapi.jrpcapi.md#protected-rpcid)*

*Defined in [src/common/jrpcapi.ts:19](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L19)*

## Methods

###  callMethod

▸ **callMethod**(`method`: string, `params?`: Array‹object› | object, `baseurl?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[callMethod](common_jrpcapi.jrpcapi.md#callmethod)*

*Defined in [src/common/jrpcapi.ts:21](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | Array‹object› &#124; object |
`baseurl?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  changePassword

▸ **changePassword**(`oldPassword`: string, `newPassword`: string): *Promise‹boolean›*

*Defined in [src/apis/auth/api.ts:60](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/auth/api.ts#L60)*

Change this node's authorization token password. **Any authorization tokens created under an old password will become invalid.**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`oldPassword` | string | This node's authorization token password, set through the CLI when the node was launched. |
`newPassword` | string | A new password for this node's authorization token issuance.  |

**Returns:** *Promise‹boolean›*

Returns a Promise<boolean> indicating if the password was successfully changed.

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:63](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L63)*

Returns the baseurl's path.

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:68](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L68)*

Returns the baseurl's database.

**Returns:** *StoreAPI*

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:66](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L66)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  newToken

▸ **newToken**(`password`: string, `endpoints`: Array‹string›): *Promise‹string›*

*Defined in [src/apis/auth/api.ts:25](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/auth/api.ts#L25)*

Creates a new authorization token that grants access to one or more API endpoints.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`password` | string | This node's authorization token password, set through the CLI when the node was launched. |
`endpoints` | Array‹string› | A list of endpoints that will be accessible using the generated token. If there's an element that is "*", this token can reach any endpoint.  |

**Returns:** *Promise‹string›*

Returns a Promise<string> containing the authorization token.

___

###  revokeToken

▸ **revokeToken**(`password`: string, `token`: string): *Promise‹boolean›*

*Defined in [src/apis/auth/api.ts:43](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/apis/auth/api.ts#L43)*

Revokes an authorization token, removing all of its rights to access endpoints.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`password` | string | This node's authorization token password, set through the CLI when the node was launched. |
`token` | string | An authorization token whose access should be revoked.  |

**Returns:** *Promise‹boolean›*

Returns a Promise<boolean> indicating if a token was successfully revoked.

___

###  setBaseURL

▸ **setBaseURL**(`baseurl`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:47](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L47)*

Sets the path of the APIs baseurl.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseurl` | string | Path of the APIs baseurl - ex: "/ext/bc/avm"  |

**Returns:** *void*
