# API pública

Hay un servidor de API público que permite a los desarrolladores acceder a la red de Avalanche sin tener que ejecutar un nodo ellos mismos. El servidor de API público es en realidad varios nodos de [is](https://github.com/ava-labs/avalanchego) detrás de un balancer de carga para asegurar la alta disponibilidad y el alto rendimiento de la solicitud.

## Usar los nodos de API públicas

El servidor de API públicas está en `https://api.avax.network/`para Avalanche Mainnet y `https://api.avax-test.network/`para Avalanche Testnet. Para acceder a una API particular, solo adjunta el extremo de la API relevante, como se documenta [aquí](../avalanchego-apis/issuing-api-calls.md). Por ejemplo, la URL para enviar llamadas de API de X-Chain a la que se encuentran es `https://api.avax.network/ext/bc/X`.

## API compatibles

El servidor de API público admite todos los extremos de la API que tienen sentido estar disponibles en un servicio de cara al público, incluyendo API para la [X-Chain](../avalanchego-apis/exchange-chain-x-chain-api.md), la [P-Chain](../avalanchego-apis/platform-chain-p-chain-api.md) y la [C-Chain](../avalanchego-apis/contract-chain-c-chain-api.md). Para una lista completa de API disponibles vea [aquí](../avalanchego-apis/).

## Sesiones pegajosas

Las peticiones a la API de servidor de API públicas se distribuyen por un balador de carga a un nodo individual. Como resultado, las peticiones consecutivas pueden ir a diferentes nodos. Eso puede causar problemas para algunos casos de uso. Por ejemplo, un nodo puede pensar que una transacción dada es aceptada, mientras que para otro nodo la transacción sigue procesando. Para trabajar alrededor de esto, puedes usar 'sesiones sticky', como se documentan [aquí](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials). Esto permite que las llamadas de API consecutivas sean enviadas al mismo nodo.

Si usas [AvalancheJS](avalanchejs/) para acceder a la API pública, simplemente establece lo siguiente en tu código:

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## Disponibilidad

El uso de nodos de API públicas es gratuito y disponible para todos sin autenticación o autorización. La limitación de la tasa está presente, pero muchas de las llamadas de la API están grabadas, y los límites de la tasa son bastante altos. Si tu aplicación se está ejecutando contra los límites, por favor [contacta con nosotros](https://chat.avalabs.org).

## Soporte

Si tienes preguntas, problemas o sugerencias, ven [a hablar](https://chat.avalabs.org/)

