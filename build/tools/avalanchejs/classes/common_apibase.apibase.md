[avalanche](../README.md) › [Common-APIBase](../modules/common_apibase.md) › [APIBase](common_apibase.apibase.md)

# Class: APIBase

Abstract class defining a generic endpoint that all endpoints must implement (extend).

## Hierarchy

* **APIBase**

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ [RESTAPI](common_restapi.restapi.md)

## Index

### Constructors

* [constructor](common_apibase.apibase.md#constructor)

### Properties

* [baseurl](common_apibase.apibase.md#protected-baseurl)
* [core](common_apibase.apibase.md#protected-core)
* [db](common_apibase.apibase.md#protected-db)

### Methods

* [getBaseURL](common_apibase.apibase.md#getbaseurl)
* [getDB](common_apibase.apibase.md#getdb)
* [setBaseURL](common_apibase.apibase.md#setbaseurl)

## Constructors

###  constructor

\+ **new APIBase**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseurl`: string): *[APIBase](common_apibase.apibase.md)*

*Defined in [src/common/apibase.ts:68](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L68)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | Reference to the Avalanche instance using this baseurl |
`baseurl` | string | Path to the baseurl - ex: "/ext/bc/avm"  |

**Returns:** *[APIBase](common_apibase.apibase.md)*

## Properties

### `Protected` baseurl

• **baseurl**: *string*

*Defined in [src/common/apibase.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L38)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Defined in [src/common/apibase.ts:36](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L36)*

___

### `Protected` db

• **db**: *StoreAPI*

*Defined in [src/common/apibase.ts:40](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L40)*

## Methods

###  getBaseURL

▸ **getBaseURL**(): *string*

*Defined in [src/common/apibase.ts:63](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L63)*

Returns the baseurl's path.

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Defined in [src/common/apibase.ts:68](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L68)*

Returns the baseurl's database.

**Returns:** *StoreAPI*

___

###  setBaseURL

▸ **setBaseURL**(`baseurl`: string): *void*

*Defined in [src/common/apibase.ts:47](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L47)*

Sets the path of the APIs baseurl.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseurl` | string | Path of the APIs baseurl - ex: "/ext/bc/avm"  |

**Returns:** *void*
