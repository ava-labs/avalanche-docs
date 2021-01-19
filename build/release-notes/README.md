# Notas de Versión

## Notas de Versión de AvalancheGo v1.0.4 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)\)

![AvalancheGo release notes v1.0.4.png](../../.gitbook/assets/AvalancheGo-release-notes-v1.0.4.png)

Esta actualización es opcional pero se recomienda. El parche incluye mejoras en la calidad de vida y varias mejoras en el rendimiento. Tenga en cuenta que esta actualización requiere que los parámetros de la CLI se especifiquen con -- en lugar de permitir - o --. Por ejemplo, `-public-ip=127.0.0.1` ya no está permitido y debe especificarse como `--public-ip=127.0.0.1`. Por lo demás, esta actualización es compatible con las versiones anteriores.

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

Para asistencia con esta actualización, sigue nuestras [Preguntas más frecuentes de los desarrolladores](http://support.avalabs.org/en/articles/4593477-how-do-i-upgrade-my-node), si todavía tienes problemas, puedes unirte a nuestro servidor de [Discord](https://chat.avalabs.org/) para que te ayudemos.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMzgzNzgxNjAsNTQ4ODY4OTVdfQ==
-->