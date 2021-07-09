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

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L58)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | Reference to the Avalanche instance using this baseurl |
`baseurl` | string | Path to the baseurl - ex: "/ext/bc/X"  |

**Returns:** *[APIBase](common_apibase.apibase.md)*

## Properties

### `Protected` baseurl

• **baseurl**: *string*

*Defined in [src/common/apibase.ts:28](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L28)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Defined in [src/common/apibase.ts:26](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L26)*

___

### `Protected` db

• **db**: *StoreAPI*

*Defined in [src/common/apibase.ts:30](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L30)*

## Methods

###  getBaseURL

▸ **getBaseURL**(): *string*

*Defined in [src/common/apibase.ts:53](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L53)*

Returns the baseurl's path.

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L58)*

Returns the baseurl's database.

**Returns:** *StoreAPI*

___

###  setBaseURL

▸ **setBaseURL**(`baseurl`: string): *void*

*Defined in [src/common/apibase.ts:37](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L37)*

Sets the path of the APIs baseurl.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseurl` | string | Path of the APIs baseurl - ex: "/ext/bc/X"  |

**Returns:** *void*
