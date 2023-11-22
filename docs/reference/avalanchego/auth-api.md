---
tags: [AvalancheGo APIs]
description: This page is an overview of the Auth API associated with AvalancheGo.
sidebar_label: Auth API
pagination_label: Auth API
---

# Auth API

When you run a node, you can require that API calls have an authorization token attached. This API
manages the creation and revocation of authorization tokens.

An authorization token provides access to one or more API endpoints. This is useful for
delegating access to a node’s APIs. Tokens expire after 12 hours.

An authorization token is provided in the header of an API call. Specifically, the header
`Authorization` should have value `Bearer TOKEN.GOES.HERE` (where `TOKEN.GOES.HERE` is replaced with
the token).

This API is only reachable if the node is started with [config flag](/nodes/configure/avalanchego-config-flags.md)`--api-auth-required`. If the node is
started without this CLI, API calls do not require authorization tokens, so this API is not
reachable. This API never requires an authorization token to be reached.

Authorization token creation must be permissioned. If you run your node with `--api-auth-required`,
you must also specify the file to read the Auth API's password from, with argument
`--api-auth-password-file`. You must provide this password in order to create/revoke authorization
tokens.

:::info
If you run your node with `--api-auth-required` then some tools like Core or MetaMask may not be
able to make API calls to your node because they don’t have an auth token.

This API set is for a specific node, it is unavailable on the [public server](/tooling/rpc-providers.md).

:::

## Format

This API uses the `json 2.0` RPC format. For more information on making JSON RPC calls, see
[here.](/reference/standards/guides/issuing-api-calls.md)

## Endpoint

```text
/ext/auth
```

## Methods

### `auth.newToken`

Creates a new authorization token that grants access to one or more API endpoints.

**Signature:**

```sh
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

- `password` is this node’s authorization token password.
- `endpoints` is a list of endpoints that will be accessible using the generated token. If
  `endpoints` contains an element `"*"`, the generated token can access any API endpoint.
- `token` is the authorization token.

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.newToken",
    "params":{
        "password":"YOUR PASSWORD GOES HERE",
        "endpoints":["/ext/bc/X", "/ext/info"]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

This call will generate an authorization token that allows access to API endpoints `/ext/bc/X`
(that is the X-Chain) and `/ext/info` (that is the [info API](/reference/avalanchego/info-api.md).)

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
  },
  "id": 1
}
```

This authorization token should be included in API calls by giving header `Authorization` value
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`.

For example, to call [`info.peers`](/reference/avalanchego/info-api.md#infopeers) with this token:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' 127.0.0.1:9650/ext/info \
-H 'content-type:application/json;' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps'
```

### `auth.revokeToken`

Revoke a previously generated token. The given token will no longer grant access to any endpoint. If
the token is invalid, does nothing.

**Signature:**

```sh
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {}
```

- `password` is this node’s authorization token password.
- `token` is the authorization token being revoked.

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.revokeToken",
    "params":{
        "password":"123",
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTMxNzIzMjh9.qZVNhH6AMQ_LpbXnPbTFEL6Vm5EM5FLU-VEKpYBH3k4"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "result": {},
  "id": 1
}
```

### `auth.changePassword`

Change this node’s authorization token password. Any authorization tokens created under an old
password will become invalid.

**Signature:**

```sh
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {}
```

- `oldPassword` is this node’s current authorization token password.
- `newPassword` is the node’s new authorization token password after this API call. Must be between
  1 and 1024 characters.

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.changePassword",
    "params":{
        "oldPassword":"OLD PASSWORD HERE",
        "newPassword":"NEW PASSWORD HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "result": {},
  "id": 1
}
```
