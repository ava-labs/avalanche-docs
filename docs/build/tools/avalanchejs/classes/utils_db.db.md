[avalanche](../README.md) › [Utils-DB](../modules/utils_db.md) › [DB](utils_db.db.md)

# Class: DB

A class for interacting with the [store2 module](https://github.com/nbubna/store)

This class should never be instantiated directly. Instead, invoke the "DB.getInstance()" static
function to grab the singleton instance of the database.

```js
const db = DB.getInstance();
const blockchaindb = db.getNamespace("mychain");
```

## Hierarchy

* **DB**

## Index

### Constructors

* [constructor](utils_db.db.md#private-constructor)

### Properties

* [instance](utils_db.db.md#static-private-instance)
* [store](utils_db.db.md#static-private-store)

### Methods

* [getInstance](utils_db.db.md#static-getinstance)
* [getNamespace](utils_db.db.md#static-getnamespace)

## Constructors

### `Private` constructor

\+ **new DB**(): *[DB](utils_db.db.md)*

*Defined in [src/utils/db.ts:21](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/db.ts#L21)*

**Returns:** *[DB](utils_db.db.md)*

## Properties

### `Static` `Private` instance

▪ **instance**: *[DB](utils_db.db.md)*

*Defined in [src/utils/db.ts:19](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/db.ts#L19)*

___

### `Static` `Private` store

▪ **store**: *StoreType* = store

*Defined in [src/utils/db.ts:21](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/db.ts#L21)*

## Methods

### `Static` getInstance

▸ **getInstance**(): *[DB](utils_db.db.md)*

*Defined in [src/utils/db.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/db.ts#L28)*

Retrieves the database singleton.

**Returns:** *[DB](utils_db.db.md)*

___

### `Static` getNamespace

▸ **getNamespace**(`ns`: string): *StoreAPI*

*Defined in [src/utils/db.ts:40](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/db.ts#L40)*

Gets a namespace from the database singleton.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ns` | string | Namespace to retrieve.  |

**Returns:** *StoreAPI*
