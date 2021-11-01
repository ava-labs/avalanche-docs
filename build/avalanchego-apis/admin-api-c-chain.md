# Admin API (C-Chain)

This API can be used for debugging. Note that the Admin API is disabled by default. To run a node with the Admin API enabled, use [command line argument](../references/command-line-interface.md#c-chain-config) `--coreth-admin-api-enabled=true`.

## Format

This API uses the `json 2.0` RPC format.

{% page-ref page="issuing-api-calls.md" %}

## Endpoint

```text
/ext/bc/C/admin
```

## API Methods

### admin.setLogLevel

Sets the log level of the C-Chain.

#### **Signature**

```text
admin.setLogLevel({level:string}) -> {success:bool}
```

* `level` is the log level to be set.

#### **Example Call**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLogLevel",
    "params": {
        "level":"info",
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Example Response**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```