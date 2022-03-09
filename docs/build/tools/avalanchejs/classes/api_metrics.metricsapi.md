[avalanche](../README.md) › [API-Metrics](../modules/api_metrics.md) › [MetricsAPI](api_metrics.metricsapi.md)

# Class: MetricsAPI

Class for interacting with a node API that is using the node's MetricsApi.

**`remarks`** This extends the [RESTAPI](common_restapi.restapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [RESTAPI](common_restapi.restapi.md)

  ↳ **MetricsAPI**

## Index

### Constructors

* [constructor](api_metrics.metricsapi.md#constructor)

### Properties

* [acceptType](api_metrics.metricsapi.md#protected-accepttype)
* [baseURL](api_metrics.metricsapi.md#protected-baseurl)
* [contentType](api_metrics.metricsapi.md#protected-contenttype)
* [core](api_metrics.metricsapi.md#protected-core)
* [db](api_metrics.metricsapi.md#protected-db)

### Methods

* [axConf](api_metrics.metricsapi.md#protected-axconf)
* [delete](api_metrics.metricsapi.md#delete)
* [get](api_metrics.metricsapi.md#get)
* [getAcceptType](api_metrics.metricsapi.md#getaccepttype)
* [getBaseURL](api_metrics.metricsapi.md#getbaseurl)
* [getContentType](api_metrics.metricsapi.md#getcontenttype)
* [getDB](api_metrics.metricsapi.md#getdb)
* [getMetrics](api_metrics.metricsapi.md#getmetrics)
* [patch](api_metrics.metricsapi.md#patch)
* [post](api_metrics.metricsapi.md#post)
* [prepHeaders](api_metrics.metricsapi.md#protected-prepheaders)
* [put](api_metrics.metricsapi.md#put)
* [setBaseURL](api_metrics.metricsapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new MetricsAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string): *[MetricsAPI](api_metrics.metricsapi.md)*

*Overrides [RESTAPI](common_restapi.restapi.md).[constructor](common_restapi.restapi.md#constructor)*

*Defined in [src/apis/metrics/api.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/metrics/api.ts#L32)*

This class should not be instantiated directly. Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseURL` | string | "/ext/metrics" | Defaults to the string "/ext/metrics" as the path to rpc's baseurl  |

**Returns:** *[MetricsAPI](api_metrics.metricsapi.md)*

## Properties

### `Protected` acceptType

• **acceptType**: *string*

*Inherited from [RESTAPI](common_restapi.restapi.md).[acceptType](common_restapi.restapi.md#protected-accepttype)*

*Defined in [src/common/restapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/restapi.ts#L12)*

___

### `Protected` baseURL

• **baseURL**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseURL](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L29)*

___

### `Protected` contentType

• **contentType**: *string*

*Inherited from [RESTAPI](common_restapi.restapi.md).[contentType](common_restapi.restapi.md#protected-contenttype)*

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

*Overrides [RESTAPI](common_restapi.restapi.md).[axConf](common_restapi.restapi.md#protected-axconf)*

*Defined in [src/apis/metrics/api.ts:18](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/metrics/api.ts#L18)*

**Returns:** *AxiosRequestConfig*

___

###  delete

▸ **delete**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [RESTAPI](common_restapi.restapi.md).[delete](common_restapi.restapi.md#delete)*

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

*Inherited from [RESTAPI](common_restapi.restapi.md).[get](common_restapi.restapi.md#get)*

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

*Inherited from [RESTAPI](common_restapi.restapi.md).[getAcceptType](common_restapi.restapi.md#getaccepttype)*

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

*Inherited from [RESTAPI](common_restapi.restapi.md).[getContentType](common_restapi.restapi.md#getcontenttype)*

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

###  getMetrics

▸ **getMetrics**(): *Promise‹string›*

*Defined in [src/apis/metrics/api.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/metrics/api.ts#L29)*

**Returns:** *Promise‹string›*

Promise for an object containing the metrics response

___

###  patch

▸ **patch**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [RESTAPI](common_restapi.restapi.md).[patch](common_restapi.restapi.md#patch)*

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

*Inherited from [RESTAPI](common_restapi.restapi.md).[post](common_restapi.restapi.md#post)*

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

*Inherited from [RESTAPI](common_restapi.restapi.md).[prepHeaders](common_restapi.restapi.md#protected-prepheaders)*

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

*Inherited from [RESTAPI](common_restapi.restapi.md).[put](common_restapi.restapi.md#put)*

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
