# AvalancheGo Release Notes

{% page-ref page="../tutorials/platform/upgrade-your-avalanchego-node.md" %}

## AvalancheGo Release Notes v1.0.5 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)\)

![](../../.gitbook/assets/group-2105.png)

{% hint style="danger" %}
Please note that the release after this one, v1.0.6, will contain the breaking changes described [here](https://docs.avax.network/build/apis/deprecated-api-calls). Namely, the response format of `platform.getTxStatus` and `platform.getCurrentValidators` will change. 
{% endhint %}

The changes in this release, v1.0.5, are backwards compatible with previous releases. The update is optional but encouraged. The patch includes performance improvements and some quality of life improvements.

* Added `IssueTx` and `GetUTXOs` to the C-chain API to enable issuing atomic swaps without revealing private keys to a node.
* Fixed memory leak in the snowman request manager with oracle block processing.
* Fix UTXO pagination bug that under-reported available funds.
* Moved chain http logs to live in the human-readable chain logs folder.
* Restructure how IDs are managed to avoid heap allocations.
* Optimized the `UniformSampler`s to avoid creating multiple maps.
* Reduced usage of `ids.Set` in favor of `[]ids.ID` to better utilize continuous memory.
* Introduced `[]byte` reuse in `PrefixDB`.
* Implemented type-specific sorting functions to avoid frequent interface conversion allocations.
* Optimized AVM load user to avoid reading unnecessary information from disk.
* Removed a memory allocation + copy in socket sending for the full length of the message.

For assistance with this update, follow our [Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), if you are still running into issues you can join our [Discord](https://chat.avax.network) for help.

## AvalancheGo Release Notes v1.0.4 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)\)

![](../../.gitbook/assets/image%20%283%29.png)

This update is optional but encouraged. The patch includes quality of life improvements and various performance enhancements. Note that this update requires the CLI parameters to be specified with -- rather than allowing for either - or --. For example, `-public-ip=127.0.0.1` is no longer allowed and must be specified as `--public-ip=127.0.0.1`. Otherwise, this update is backwards compatible.

```text
• Added subnet whitelisting to allow a node owner to choose which subnets to validate.
• Added config file parsing for node settings.
• Added more options for specifying a node's IP address and added getNodeIP to the info *endpoint.
• Added a TxID to the result of get.Validators in the platformvm.
• Updated Coreth version.
• Cleaned up the snowball trie implementation and added additional tests to align with mutation tests.
• Implemented and optimized continuous time averages for tracking CPU and network latency.
• Significantly optimized memory allocations in various locations.
• Increased the signature verification cache size.
• Reduced DB reads during vertex management.
```

```text
• Added an optional argument includeReason to platform.getTxStatus.
If not provided, or if false, the output from getTxStatus is the same as before.

For example:
{
    "jsonrpc": "2.0",
    "result": "Dropped",
    "id": 1
}

If includeReason is true, the output from getTxStatus has a new format. It's an object that looks like this:

{
    "jsonrpc": "2.0",
    "result": {
        "status":"[Status]",
        "reason":"[Reason tx was dropped, if applicable]"
    },
    "id": 1
}

In this new format, reason will not be present unless the status is Dropped.
Anything that depends on platform.getTxStatus should switch to using the includeReason argument and use the new response format. After a few releases, we'll only support the new response format.
```

For assistance with this update, follow our [Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), if you are still running into issues you can join our [Discord](https://chat.avax.network) for help.

