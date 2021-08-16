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
* [baseurl](common_restapi.restapi.md#protected-baseurl)
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

\+ **new RESTAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseurl`: string, `contentType`: string, `acceptType`: string): *[RESTAPI](common_restapi.restapi.md)*

*Overrides [APIBase](common_apibase.apibase.md).[constructor](common_apibase.apibase.md#constructor)*

*Defined in [src/common/restapi.ts:119](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L119)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | Reference to the Avalanche instance using this endpoint |
`baseurl` | string | - | Path of the APIs baseurl - ex: "/ext/bc/avm" |
`contentType` | string | "application/jsoncharset=UTF-8" | Optional Determines the type of the entity attached to the incoming request |
`acceptType` | string | undefined | Optional Determines the type of representation which is desired on the client side  |

**Returns:** *[RESTAPI](common_restapi.restapi.md)*

## Properties

### `Protected` acceptType

• **acceptType**: *string*

*Defined in [src/common/restapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L12)*

___

### `Protected` baseurl

• **baseurl**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseurl](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:28](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L28)*

___

### `Protected` contentType

• **contentType**: *string*

*Defined in [src/common/restapi.ts:11](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L11)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:26](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L26)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:30](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L30)*

## Methods

### `Protected` axConf

▸ **axConf**(): *AxiosRequestConfig*

*Defined in [src/common/restapi.ts:30](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L30)*

**Returns:** *AxiosRequestConfig*

___

###  delete

▸ **delete**(`method`: string, `params?`: object[] | object, `baseurl?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:79](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseurl?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  get

▸ **get**(`baseurl?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:37](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`baseurl?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  getAcceptType

▸ **getAcceptType**(): *string*

*Defined in [src/common/restapi.ts:119](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L119)*

Returns what type of representation is desired at the client side

**Returns:** *string*

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:53](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L53)*

Returns the baseurl's path.

**Returns:** *string*

___

###  getContentType

▸ **getContentType**(): *string*

*Defined in [src/common/restapi.ts:114](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L114)*

Returns the type of the entity attached to the incoming request

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L58)*

Returns the baseurl's database.

**Returns:** *StoreAPI*

___

###  patch

▸ **patch**(`method`: string, `params?`: object[] | object, `baseurl?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:95](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseurl?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  post

▸ **post**(`method`: string, `params?`: object[] | object, `baseurl?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:44](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseurl?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

### `Protected` prepHeaders

▸ **prepHeaders**(`contentType?`: string, `acceptType?`: string): *object*

*Defined in [src/common/restapi.ts:14](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *object*

___

###  put

▸ **put**(`method`: string, `params?`: object[] | object, `baseurl?`: string, `contentType?`: string, `acceptType?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/restapi.ts:60](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/restapi.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseurl?` | string |
`contentType?` | string |
`acceptType?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  setBaseURL

▸ **setBaseURL**(`baseurl`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:37](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L37)*

Sets the path of the APIs baseurl.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseurl` | string | Path of the APIs baseurl - ex: "/ext/bc/X"  |

**Returns:** *void*
