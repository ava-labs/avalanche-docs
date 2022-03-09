[avalanche](../README.md) › [Common-RESTAPI](../modules/common_restapi.md) › [RESTAPI](common_restapi.restapi.md)

# Class: RESTAPI

## Hierarchy

* [APIBase](common_apibase.apibase.md)

  ↳ **RESTAPI**

  ↳ [MetricsAPI](api_metrics.metricsapi.md)

## Index

### Constructors

* [constructor](common_restapi.restapi.md#constructor)

### Properties

* [acceptType](common_restapi.restapi.md#protected-accepttype)
* [baseURL](common_restapi.restapi.md#protected-baseurl)
* [contentType](common_restapi.restapi.md#protected-contenttype)
* [core](common_restapi.restapi.md#protected-core)
* [db](common_restapi.restapi.md#protected-db)

### Methods

* [axConf](common_restapi.restapi.md#protected-axconf)
* [delete](common_restapi.restapi.md#delete)
* [get](common_restapi.restapi.md#get)
* [getAcceptType](common_restapi.restapi.md#getaccepttype)
* [getBaseURL](common_restapi.restapi.md#getbaseurl)
* [getContentType](common_restapi.restapi.md#getcontenttype)
* [getDB](common_restapi.restapi.md#getdb)
* [patch](common_restapi.restapi.md#patch)
* [post](common_restapi.restapi.md#post)
* [prepHeaders](common_restapi.restapi.md#protected-prepheaders)
* [put](common_restapi.restapi.md#put)
* [setBaseURL](common_restapi.restapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new RESTAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string, `contentType`: string, `acceptType`: string): *[RESTAPI](common_restapi.restapi.md)*

*Overrides [APIBase](common_apibase.apibase.md).[constructor](common_apibase.apibase.md#constructor)*

*Defined in [src/common/restapi.ts:171](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L171)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | Reference to the Avalanche instance using this endpoint |
`baseURL` | string | - | Path of the APIs baseURL - ex: "/ext/bc/avm" |
`contentType` | string | "application/json;charset=UTF-8" | Optional Determines the type of the entity attached to the incoming request |
`acceptType` | string | undefined | Optional Determines the type of representation which is desired on the client side  |

**Returns:** *[RESTAPI](common_restapi.restapi.md)*

## Properties

### `Protected` acceptType

• **acceptType**: *string*

*Defined in [src/common/restapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L12)*

___

### `Protected` baseURL

• **baseURL**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseURL](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L29)*

___

### `Protected` contentType

• **contentType**: *string*

*Defined in [src/common/restapi.ts:11](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L11)*

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

## Methods

### `Protected` axConf

▸ **axConf**(): *AxiosRequestConfig*

*Defined in [src/common/restapi.ts:33](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L33)*

**Returns:** *AxiosRequestConfig*

___

###  delete

▸ **delete**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:110](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseURL?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  get

▸ **get**(`baseURL?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:40](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`baseURL?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  getAcceptType

▸ **getAcceptType**(): *string*

*Defined in [src/common/restapi.ts:171](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L171)*

Returns what type of representation is desired at the client side

**Returns:** *string*

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:53](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L53)*

Returns the baseURL's path.

**Returns:** *string*

___

###  getContentType

▸ **getContentType**(): *string*

*Defined in [src/common/restapi.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L166)*

Returns the type of the entity attached to the incoming request

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L58)*

Returns the baseURL's database.

**Returns:** *StoreAPI*

___

###  patch

▸ **patch**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:136](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseURL?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  post

▸ **post**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseURL?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

### `Protected` prepHeaders

▸ **prepHeaders**(`contentType?`: string, `acceptType?`: string): *object*

*Defined in [src/common/restapi.ts:14](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *object*

___

###  put

▸ **put**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseURL?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

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
