# Notas de Versión

## Notas de Versión de AvalancheGo v1.0.4 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)\)

![AvalancheGo release notes v1.0.4.png](../../.gitbook/assets/AvalancheGo-release-notes-v1.0.4.png)

Esta actualización es opcional pero se recomienda. El parche incluye mejoras en la calidad de vida y varias mejoras en el rendimiento. Tenga en cuenta que esta actualización requiere que los parámetros de la CLI se especifiquen con -- en lugar de permitir - o --. Por ejemplo, `-public-ip=127.0.0.1` ya no está permitido y debe especificarse como `--public-ip=127.0.0.1`. De resto, esta actualización es compatible con las versiones anteriores.

```text
- Se añadió la lista blanca de subnets para permitir al propietario de un nodo elegir qué subnets validar.
- Se añadió el análisis sintáctico del archivo de configuración para la configuración de los nodos.
- Añadidas más opciones para especificar la dirección IP de un nodo y añadido getNodeIP a la información *endpoint.
- Se añadió un TxID al resultado de los validadores get.Validators en la platformvm.
- Actualizada la versión de Coreth.
- Se limpió la implementación de la prueba snowball y añadió pruebas adicionales para alinearse con las pruebas de mutación.
- Se implementaron y optimizaron los promedios de tiempo continuo para el seguimiento de la latencia de la CPU y la red.
- Se optimizaron significativamente las asignaciones de memoria en varios lugares.
- Aumentado el tamaño de la caché de verificación de firmas.
- Reducción de las lecturas de la base de datos durante la gestión de vértices.
```

```text
• Añadido un argumento opcional includeReason to platform.getTxStatus.
Si no se proporciona, o si es falso, la salida de getTxStatus es la misma que antes.

Por ejemplo:
{
    "jsonrpc": "2.0",
    "result": "Dropped",
    "id": 1
}

Si includeReason es verdadero, la salida de getTxStatus tendrá un nuevo formato. Es un elemento que se ve así:

{
    "jsonrpc": "2.0",
    "result": {
        "status":"[Status]",
        "reason":"[Reason tx was dropped, if applicable]"
    },
    "id": 1
}

En este nuevo formato, la razón no estará presente a menos que el estado sea "Dropped".
Cualquier cosa que dependa de platform.getTxStatus debería cambiar a usar el argumento includeReason y usar el nuevo formato de respuesta. Después de algunos lanzamientos, sólo soportaremos el nuevo formato de respuesta.
```

Para ayuda con esta actualización ve a [Preguntas más frecuentes de los desarrolladores](http://support.avalabs.org/en/articles/4593477-how-do-i-upgrade-my-node), si todavía tienes problemas, puedes unirte a nuestro servidor de [Discord](https://chat.avalabs.org/) para que te ayudemos.
