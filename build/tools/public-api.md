# API pública

Hay un servidor de API público que permite a los desarrolladores acceder a la red Avalanche sin tener que ejecutar un nodo ellos mismos. El servidor API público es en realidad varios nodos [AvalancheGo](https://github.com/ava-labs/avalanchego) detrás de un balancer de carga para garantizar una alta disponibilidad y alta capacidad de producción.

## Utilizando los nodos de API públicas

El servidor de API público está en `https://api.avax.network/``` Avalanche Mainnet y https://api.avax.network/ para Avalanche Testnet. Para acceder a una API en particular, simplemente añada el punto final de API relevante, como se documenta [aquí](../avalanchego-apis/issuing-api-calls.md). Por ejemplo, la URL para enviar llamadas API de cadena X es `https://api.avax.network/ext/bc/X`.

## API compatibles

El servidor API público admite todos los puntos finales de API que tienen sentido estar disponibles en un servicio de orientación pública, incluyendo API para la cadena [X-Chain](../avalanchego-apis/exchange-chain-x-chain-api.md), [P-Chain](../avalanchego-apis/platform-chain-p-chain-api.md) y [C-Chain](../avalanchego-apis/contract-chain-c-chain-api.md). Para obtener una lista completa de API disponibles consulte [aquí](../avalanchego-apis/).

## Sesiones pegajosas

Las solicitudes a la API pública de servidor API se distribuyen por un balancer de carga a un nodo individual. Como resultado, las solicitudes consecutivas pueden ir a diferentes nodos. Eso puede causar problemas para algunos casos de uso. Por ejemplo, un nodo puede pensar que una transacción dada es aceptada, mientras que para otro nodo la transacción todavía está procesando. Para trabajar en esto, puedes usar 'sesiones pegajosas', como se [documentó aquí](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials). Esto permite que las llamadas de API consecutivas sean enviadas al mismo nodo.

Si utiliza [AvalanchejS](avalanchejs/) para acceder a la API pública, simplemente establece lo siguiente en su código:

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## Disponibilidad de información

El uso de nodos de API públicas es gratuito y disponible para todos sin autenticación o autorización. La limitación de velocidad está presente, pero muchas de las llamadas API están almacenadas, y los límites de velocidad son bastante altos. Si su solicitud se está ejecutando contra los límites, por favor [póngase en contacto con nosotros](https://chat.avalabs.org).

## Apoyo al apoyo

Si tienes preguntas, problemas o sugerencias, ven [a hablar con nosotros](https://chat.avalabs.org/).

