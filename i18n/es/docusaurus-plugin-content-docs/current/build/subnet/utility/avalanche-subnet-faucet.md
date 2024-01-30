---
etiquetas: [Construir, Subredes]
descripción: Implementa un grifo de testnet personalizado para tu Subred con características como soporte para múltiples cadenas, limitación de velocidad personalizada, verificación CAPTCHA y manejo de transacciones concurrentes.
sidebar_label: Agregar un Grifo de Testnet
pagination_label: Grifo de Subred Avalanche
sidebar_position: 1
---

# Habilitar Capacidades de Testnet en una Subred con el Grifo de Subred Avalanche

Hay miles de redes y cadenas en el espacio de la blockchain, cada una con sus propias capacidades y casos de uso. Cada red requiere monedas nativas para realizar cualquier transacción en ellas, las cuales también pueden tener un valor monetario. Estas monedas se pueden recolectar a través de intercambios centralizados, ventas de tokens, etc., a cambio de algunos activos monetarios como USD.

Pero no podemos arriesgar nuestros fondos en la red o en cualquier aplicación alojada en esa red, sin probarlos primero. Por lo tanto, estas redes a menudo tienen redes de prueba o testnets, donde las monedas nativas no tienen ningún valor monetario y, por lo tanto, se pueden obtener libremente a través de grifos.

Estas testnets suelen ser los bancos de pruebas para cualquier nueva característica nativa de la propia red, o cualquier dapp o [Subred](learn/avalanche/subnets-overview.md) que va a vivir en la red principal (Mainnet). Por ejemplo, la red [Fuji](learn/avalanche/fuji.md) es la Testnet para la Mainnet de Avalanche.

Además de la Testnet Fuji, el
[Grifo Avalanche](https://core.app/tools/testnet-faucet/?subnet=c&token=c)
se puede utilizar para obtener tokens de prueba gratuitos en Subredes de testnet como:

- [Testnet WAGMI](https://core.app/tools/testnet-faucet/?subnet=wagmi)
- [Testnet DeFI Kingdoms](https://core.app/tools/testnet-faucet/?subnet=dfk)
- [Testnet Beam](https://core.app/tools/testnet-faucet/?subnet=beam&token=beam) y muchos más.

Puedes usar este [repositorio](https://github.com/ava-labs/avalanche-faucet) para implementar tu grifo o
simplemente hacer un PR con las
[configuraciones](https://github.com/ava-labs/avalanche-faucet/blob/main/config.json) de la Subred.
Este grifo viene con muchas características como soporte para múltiples cadenas, limitación de velocidad personalizada por Subred, verificación CAPTCHA y manejo de transacciones concurrentes.

## Resumen

Un [Grifo](https://faucet.avax.network/) alimentado por Avalanche para la Red Fuji y otras Subredes.
Puedes:

- Solicitar monedas de prueba para las Subredes soportadas
- Integrar tu Subred EVM con el grifo haciendo un PR con las [configuraciones de la cadena](https://github.com/ava-labs/avalanche-faucet/blob/main/config.json)
- Hacer un fork del [repositorio](https://github.com/ava-labs/avalanche-faucet) para implementar tu grifo para cualquier cadena EVM

## Agregar una Nueva Subred

También puedes integrar una nueva Subred en el [grifo](https://faucet.avax.network) en vivo con solo unos pocos parámetros de configuración. Todo lo que tienes que hacer es hacer un PR en el repositorio git de [Avalanche Faucet](https://github.com/ava-labs/avalanche-faucet) con la información de la Subred. Los siguientes parámetros son requeridos.

```json
{
    "ID": string,
    "NAME": string,
    "TOKEN": string,
    "RPC": string,
    "CHAINID": number,
    "EXPLORER": string,
    "IMAGE": string,
    "MAX_PRIORITY_FEE": string,
    "MAX_FEE": string,
    "DRIP_AMOUNT": number,
    "RATELIMIT": {
        "MAX_LIMIT": number,
        "WINDOW_SIZE": number
    }
}
```

- `ID` - Cada cadena de Subred debe tener un ID único y relacionable.
- `NAME` - Nombre de la cadena de Subred que aparecerá en el sitio.
- `RPC` - Una URL RPC válida para acceder a la cadena.
- `CHAINID` - ID de cadena de la cadena
- `EXPLORER` - URL base del sitio del explorador estándar.
- `IMAGE` - URL del icono de la cadena que se mostrará en el menú desplegable.
- `MAX_PRIORITY_FEE` - Propina máxima por caída de grifo en **wei** o en unidad **10<sup>-18</sup>** (para cadenas compatibles con EIP1559)
- `MAX_FEE` - Tarifa máxima que se puede pagar por una caída de grifo en **wei** o en unidad **10<sup>-18</sup>**
- `DRIP_AMOUNT` - Cantidad de monedas a enviar por solicitud en **gwei** o en unidad **10<sup>-9</sup>**
- `RECALIBRATE` _(opcional)_ - Número de segundos después de los cuales el nonce y el saldo se recalibrarán
- `RATELIMIT` - Número de veces (MAX_LIMIT) permitidas por usuario dentro del WINDOW_SIZE (en minutos)

Agrega la configuración en el arreglo de `evmchains` dentro del archivo
[config.json](https://github.com/ava-labs/avalanche-faucet/blob/main/config.json) y haz un PR.

## Construcción e Implementación de un Grifo

También puedes implementar y construir tu propio grifo utilizando el repositorio [Avalanche
Faucet](https://github.com/ava-labs/avalanche-faucet).

### Requisitos

- [Node](https://nodejs.org/en) >= 17.0 y [npm](https://www.npmjs.com/) >= 8.0
- Claves de [reCAPTCHA](https://www.google.com/recaptcha/intro/v3.html) v3 de Google
- [Docker](https://www.docker.com/get-started/)

### Instalación

Clona este repositorio en tu ubicación preferida.

```bash
git clone https://github.com/ava-labs/avalanche-faucet
```

:::info
El método de clonación del repositorio utilizado es HTTPS, pero también se puede usar SSH:

`git clone git@github.com:ava-labs/avalanche-faucet.git`

Puedes encontrar más información sobre SSH y cómo usarlo
[aquí](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).
:::

### Configuraciones del Lado del Cliente

Necesitamos configurar nuestra aplicación con los puntos finales de la API del servidor y las claves del sitio CAPTCHA. Todas las configuraciones del lado del cliente están en el archivo `client/src/config.json`. Dado que no hay secretos en el lado del cliente, no necesitamos ninguna variable de entorno. Actualiza los archivos de configuración según tus necesidades.

```json
{
  "banner": "/banner.png",
  "apiBaseEndpointProduction": "/api/",
  "apiBaseEndpointDevelopment": "http://localhost:8000/api/",
  "apiTimeout": 10000,
  "CAPTCHA": {
    "siteKey": "6LcNScYfAAAAAJH8fauA-okTZrmAxYqfF9gOmujf",
    "action": "faucetdrip"
  }
}
```

Coloca la clave del sitio reCAPTCHA de Google sin la cual el cliente del grifo no puede enviar la respuesta CAPTCHA necesaria al servidor. Esta clave no es un secreto y podría ser pública.

En el archivo anterior, hay 2 puntos finales base para el servidor del grifo `apiBaseEndpointProduction` y
`apiBaseEndpointDevelopment`.

En modo de producción, el lado del cliente se servirá como contenido estático a través del punto final del servidor, y por lo tanto no tenemos que proporcionar la dirección IP o el dominio del servidor.

La ruta de la URL debe ser válida, donde se alojan las API del servidor. Si los puntos finales de la API tienen un `/v1/api` al principio y el servidor se está ejecutando en localhost en el puerto 3000, entonces debes usar `http://localhost:3000/v1/api` o `/v1/api/` dependiendo de si es producción o desarrollo.

### Configuraciones del lado del servidor

En el lado del servidor, necesitamos configurar 2 archivos: `.env` para claves secretas y `config.json` para configuraciones de cadena y límites de tasa de API.

#### Configurar variables de entorno

Configura la variable de entorno con tu clave privada y el secreto de reCAPTCHA. Crea un archivo `.env` en tu ubicación preferida con las siguientes credenciales, ya que este archivo no se enviará al repositorio. El servidor de la llave puede manejar múltiples cadenas EVM y, por lo tanto, requiere claves privadas para direcciones con fondos en cada una de las cadenas.

Si tienes fondos en la misma dirección en cada cadena, entonces puedes especificarlos con la variable única `PK`. Pero si tienes fondos en direcciones diferentes en diferentes cadenas, entonces puedes proporcionar cada una de las claves privadas contra el ID de la cadena, como se muestra a continuación.

```env
C="Clave privada de la cadena C"
WAGMI="Clave privada de la cadena WAGMI"
PK="Clave privada del remitente con fondos en ella"
CAPTCHA_SECRET="Secreto de reCAPTCHA de Google"
```

`PK` actuará como una clave privada de respaldo, en caso de que no se proporcione la clave para ninguna cadena.

#### Configurar Configuraciones de Cadena EVM

Puedes crear un servidor de llaves para cualquier cadena EVM haciendo cambios en el archivo `config.json`. Agrega tu configuración de cadena como se muestra a continuación en el objeto `evmchains`. A continuación se muestra un ejemplo de configuración para la cadena C de Fuji y la cadena WAGMI.

```json
"evmchains": [
    {
        "ID": "C",
        "NAME": "Fuji (C-Chain)",
        "TOKEN": "AVAX",
        "RPC": "https://api.avax-test.network/ext/C/rpc",
        "CHAINID": 43113,
        "EXPLORER": "https://testnet.snowtrace.io",
        "IMAGE": "/avaxred.png",
        "MAX_PRIORITY_FEE": "2000000000",
        "MAX_FEE": "100000000000",
        "DRIP_AMOUNT": 2000000000,
        "RECALIBRATE": 30,
        "RATELIMIT": {
            "MAX_LIMIT": 1,
            "WINDOW_SIZE": 1440
        }
    },
    {
        "ID": "WAGMI",
        "NAME": "WAGMI Testnet",
        "TOKEN": "WGM",
        "RPC": "https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc",
        "CHAINID": 11111,
        "EXPLORER": "https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer",
        "IMAGE": "/wagmi.png",
        "MAX_PRIORITY_FEE": "2000000000",
        "MAX_FEE": "100000000000",
        "DRIP_AMOUNT": 2000000000,
        "RATELIMIT": {
            "MAX_LIMIT": 1,
            "WINDOW_SIZE": 1440
        }
    }
]
```

En la configuración anterior, la cantidad de goteo está en `nAVAX` o `gwei`, mientras que las tarifas están en `wei`. Por ejemplo, con las configuraciones anteriores, la llave enviará `1 AVAX` con tarifas máximas por gas de `100 nAVAX` y tarifa de prioridad de `2 nAVAX`.

El limitador de tasa para la cadena C solo aceptará 1 solicitud en 60 minutos para una API en particular y 2 solicitudes en 60 minutos para la cadena WAGMI. Aunque omitirá cualquier solicitud fallida para que los usuarios puedan solicitar tokens nuevamente, incluso si hay algún error interno en la aplicación. Por otro lado, el limitador de tasa global permitirá 15 solicitudes por minuto en cada API. Esta vez, las solicitudes fallidas también se contarán para que nadie pueda abusar de las API.

### Puntos finales de la API

Este servidor expondrá las siguientes API

#### API de salud

La API `/health` siempre devolverá una respuesta con un código de estado `200`. Este punto final se puede usar para conocer la salud del servidor.

```bash
curl http://localhost:8000/health
```

Respuesta

```bash
Servidor saludable
```

#### Obtener dirección de la llave

Esta API se utilizará para obtener la dirección de la llave.

```bash
curl http://localhost:8000/api/faucetAddress?chain=C
```

Dará la siguiente respuesta

```bash
0x3EA53fA26b41885cB9149B62f0b7c0BAf76C78D4
```

#### Obtener saldo de la llave

Esta API se utilizará para obtener el saldo de la llave.

```bash
curl http://localhost:8000/api/getBalance?chain=C
```

Dará la siguiente respuesta

```bash
14282900936
```

#### Enviar token

Este punto final de la API manejará las solicitudes de tokens de los usuarios. Devolverá el hash de transacción como un recibo del goteo de la llave.

```bash
curl -d '{
        "address": "0x3EA53fA26b41885cB9149B62f0b7c0BAf76C78D4"
        "chain": "C"
}' -H 'Content-Type: application/json' http://localhost:8000/api/sendToken
```

La API de envío de tokens requiere un token de respuesta de reCAPTCHA que se genera utilizando la clave del sitio reCAPTCHA en el lado del cliente. Dado que no podemos generar y pasar este token mientras hacemos una solicitud de curl, tenemos que desactivar la verificación de reCAPTCHA con fines de prueba. Puedes encontrar los pasos para desactivarlo en las secciones siguientes. La respuesta se muestra a continuación

```bash
{
    "message": "¡Transacción exitosa en Avalanche C Chain!",
    "txHash": "0x3d1f1c3facf59c5cd7d6937b3b727d047a1e664f52834daf20b0555e89fc8317"
}
```

### Limitadores de tasa (Importante)

Los limitadores de tasa se aplican a nivel global (todos los puntos finales) y en la API `/api/sendToken`. Estos se pueden configurar desde el archivo `config.json`. Los parámetros de limitación de tasa para las cadenas se pasan en la configuración de la cadena como se muestra arriba.

```json
"GLOBAL_RL": {
    "ID": "GLOBAL",
    "RATELIMIT": {
        "REVERSE_PROXIES": 4,
        "MAX_LIMIT": 40,
        "WINDOW_SIZE": 1,
        "PATH": "/",
        "SKIP_FAILED_REQUESTS": false
    }
}
```

Podría haber varios proxies entre el servidor y el cliente. El servidor verá la dirección IP del proxy adyacente conectado con el servidor, y esto puede no ser la IP real del cliente.

Las direcciones IP de todos los proxies a través de los cuales ha pasado la solicitud están almacenadas dentro del arreglo de encabezados **x-forwarded-for**. Pero los proxies intermedios pueden manipular fácilmente estos encabezados para evadir los limitadores de velocidad. Por lo tanto, no podemos confiar en todos los proxies y, por lo tanto, en todas las direcciones IP dentro del encabezado.

Los proxies que son configurados por el propietario del servidor (reverse-proxies) son los proxies confiables en los que podemos confiar y saber que han incluido la IP real de los llamantes en el medio. Cualquier proxy que no sea configurado por el servidor, debe considerarse un proxy no confiable. Por lo tanto, podemos saltar a la dirección IP agregada por el último proxy en el que confiamos. El número de saltos que queremos puede ser configurado en el archivo `config.json` dentro del objeto `GLOBAL_RL`.

![faucet 5](/img/faucet-5.png)

#### Clientes detrás del mismo proxy

Considera el siguiente diagrama. El servidor está configurado con 2 reverse proxies. Si el cliente está detrás de proxies, entonces no podemos obtener la IP real del cliente, y en su lugar consideraremos la IP del proxy como la IP del cliente. Y si algún otro cliente está detrás del mismo proxy, entonces esos clientes serán considerados como una sola entidad y podrían ser limitados más rápidamente.

![faucet 6](/img/faucet-6.png)

Por lo tanto, se aconseja a los usuarios que eviten usar cualquier proxy para acceder a aplicaciones que tengan límites de velocidad críticos, como esta faucet.

#### Número incorrecto de reverse proxies

Entonces, si quieres implementar esta faucet, y tienes algunos reverse proxies en el medio, entonces debes configurarlo dentro de la clave `GLOBAL_RL` del archivo `config.json`. Si esto no está configurado correctamente, entonces los usuarios podrían ser limitados de velocidad con mucha frecuencia, ya que las direcciones IP del proxy del lado del servidor están siendo vistas como la IP del cliente. Puedes verificar esto en el código
[aquí](https://github.com/ava-labs/avalanche-faucet/blob/23eb300635b64130bc9ce10d9e894f0a0b3d81ea/middlewares/rateLimiter.ts#L25).

```json
"GLOBAL_RL": {
    "ID": "GLOBAL",
    "RATELIMIT": {
        "REVERSE_PROXIES": 4,
        ...
```

![faucet 7](/img/faucet-7.png)

También es bastante común tener a Cloudflare como el último reverse proxy o el servidor expuesto. Cloudflare proporciona un encabezado **cf-connecting-ip** que es la IP del cliente que solicitó la faucet y, por lo tanto, Cloudflare. Estamos usando esto como valor predeterminado.

### Verificación CAPTCHA

CAPTCHA es necesario para demostrar que el usuario es humano y no un bot. Para este propósito, utilizaremos
[reCAPTCHA de Google](https://www.google.com/recaptcha/intro/v3.html). El lado del servidor requerirá
`CAPTCHA_SECRET` que no debe ser expuesto. Puedes configurar el puntaje umbral para pasar la prueba CAPTCHA por los usuarios
[aquí](https://github.com/ava-labs/avalanche-faucet/blob/23eb300635b64130bc9ce10d9e894f0a0b3d81ea/middlewares/verifyCaptcha.ts#L20).

Puedes desactivar estas verificaciones CAPTCHA y limitadores de velocidad para fines de prueba, ajustando
en el archivo `server.ts`.

### Desactivando los limitadores de velocidad

Comenta o elimina estas 2 líneas del archivo `server.ts`

```javascript
new RateLimiter(app, [GLOBAL_RL]);
new RateLimiter(app, evmchains);
```

### Desactivando la verificación CAPTCHA

Elimina el middleware `captcha.middleware` de la API `sendToken`.

### Iniciando la Faucet

Sigue los siguientes comandos para iniciar tu faucet local.

#### Instalando Dependencias

Esto instalará concurrentemente las dependencias tanto para el cliente como para el servidor.

```bash
npm install
```

Si los puertos tienen una configuración predeterminada, entonces el cliente se iniciará en el puerto 3000 y el servidor se iniciará en el puerto 8000 mientras esté en modo de desarrollo.

#### Iniciando en Modo de Desarrollo

Esto iniciará concurrentemente el servidor y el cliente en modo de desarrollo.

```bash
npm run dev
```

#### Construyendo para Producción

El siguiente comando construirá el servidor y el cliente en los directorios `build/` y `build/client`.

```bash
npm run build
```

#### Iniciando en Modo de Producción

Este comando solo debe ejecutarse después de construir correctamente el código del cliente y del servidor.

```bash
npm start
```

### Configuración con Docker

Sigue los pasos para ejecutar esta aplicación en un contenedor Docker.

#### Construir la Imagen de Docker

Las imágenes de Docker pueden servir como las versiones construidas de nuestra aplicación, que se pueden usar para implementar en un contenedor Docker.

```bash
docker build . -t faucet-image
```

#### Iniciando la Aplicación dentro del Contenedor Docker

Ahora podemos crear cualquier número de contenedores usando la imagen `faucet` anterior. También tenemos que suministrar
el archivo `.env` o las variables de entorno con las claves secretas para crear el contenedor. Una vez creado el
contenedor, estas variables y configuraciones se mantendrán y se pueden iniciar o detener fácilmente con un solo comando.

```bash
docker run -p 3000:8000 --name faucet-container --env-file ../.env faucet-image
```

El servidor se ejecutará en el puerto 8000, y nuestro Docker también expondrá este puerto para que el mundo exterior
interactúe. Hemos expuesto este puerto en el `Dockerfile`. Pero no podemos interactuar directamente con el
puerto del contenedor, por lo que tuvimos que vincular este puerto del contenedor a nuestro puerto de host. Para el puerto de host, hemos
elegido 3000. Esta bandera `-p 3000:8000` logra lo mismo.

Esto iniciará nuestra aplicación faucet en un contenedor Docker en el puerto 3000 (puerto 8000 en el
contenedor). Puedes interactuar con la aplicación visitando [http://localhost:3000] en tu navegador.

#### Deteniendo el Contenedor

Puedes detener fácilmente el contenedor usando el siguiente comando

```bash
docker stop faucet-container
```

#### Reiniciando el Contenedor

Para reiniciar el contenedor, usa el siguiente comando

```bash
docker start faucet-container
```

## Usando la Faucet

Usar la faucet es bastante sencillo, pero para completar, repasemos los pasos para recolectar tus primeras monedas de prueba.

### Visita el Sitio de la Faucet Avalanche

Ve a [https://faucet.avax.network](https://faucet.avax.network). Verás varios parámetros de red como el nombre de la red, el saldo de la faucet,
la cantidad de la gota, el límite de la gota, la dirección de la faucet, etc.

![faucet 1](/img/faucet/faucet1.png)

### Selecciona la Red

Puedes usar el menú desplegable para seleccionar la red de tu elección y obtener algunas monedas gratis (cada red
puede tener una cantidad de gota diferente).

![faucet 2](/img/faucet/faucet2.png)

### Ingresa la Dirección y Solicita Monedas

Si ya tienes un saldo AVAX mayor que cero en Mainnet, pega tu dirección de la cadena C allí y solicita tokens de prueba. De lo contrario,
por favor solicita un cupón de faucet en
[Discord](https://discord.com/channels/578992315641626624/1193594716835545170).

En un segundo, recibirás un **hash de transacción** para la transacción procesada. El hash será un hipervínculo al explorador de la Subnet.
Puedes ver el estado de la transacción haciendo clic en ese enlace.

![faucet 3](/img/faucet/faucet3.png)

### Más Interacciones

Esto no es todo. Usando los botones mostrados a continuación, puedes ir al explorador de la Subnet o agregar la
Subnet a tus extensiones de billetera de navegador como Core o MetaMask con un solo clic.

![faucet 4](/img/faucet/faucet4.png)

### Errores Probables y Solución de Problemas

No se esperan errores, pero si estás enfrentando algunos de los errores mostrados, entonces podrías intentar
solucionar problemas como se muestra a continuación. Si ninguna de las soluciones de problemas funciona, contáctanos a través de
[Discord](https://discord.com/channels/578992315641626624/).

- **Demasiadas solicitudes. Por favor, inténtalo de nuevo después de X minutos**. Este es un mensaje de límite de tasa. Cada subred puede establecer sus límites de caída. El mensaje anterior sugiere que has alcanzado tu límite de caída, es decir, el número de veces que podrías solicitar monedas dentro de la ventana de X minutos. Deberías intentar solicitar después de X minutos. Si estás enfrentando este problema, incluso cuando estás solicitando por primera vez en la ventana, es posible que estés detrás de algún proxy, Wi-Fi o servicio de VPN que también está siendo utilizado por otro usuario.

- **¡La verificación CAPTCHA ha fallado! Intenta refrescar**. Estamos utilizando la versión 3 de [reCAPTCHA](https://developers.google.com/recaptcha/docs/v3) de Google. Esta versión utiliza puntuaciones entre 0 y 1 para calificar la interacción de los humanos con el sitio, siendo 0 el más sospechoso. No tienes que resolver ningún rompecabezas ni marcar la casilla de **No soy un robot**. La puntuación se calculará automáticamente. Queremos que nuestros usuarios obtengan al menos 0.3 para usar el grifo. Esto es configurable y actualizaremos el umbral después de tener datos más amplios. Pero si estás enfrentando este problema, puedes intentar refrescar tu página, desactivar los bloqueadores de anuncios o apagar cualquier VPN. Puedes seguir esta [guía](https://2captcha.com/blog/google-doesnt-accept-recaptcha-answers) para deshacerte de este problema.

- **¡Error interno de RPC! Por favor, inténtalo después de un tiempo**. Este es un error interno en el nodo de la subred, en el que estamos haciendo una RPC para enviar transacciones. Una verificación regular actualizará el estado de salud de la RPC cada 30 segundos (por defecto) o lo que esté configurado en la configuración. Esto puede suceder solo en escenarios raros y no puedes hacer mucho al respecto, excepto esperar.

- **Se superó el tiempo de espera de 10000ms**. Puede haber muchas razones para este mensaje. Podría ser un error interno del servidor, o la solicitud no fue recibida por el servidor, internet lento, etc. Podrías intentarlo de nuevo después de un tiempo, y si el problema persiste, entonces deberías plantear este problema en nuestro servidor de [Discord](https://discord.com/channels/578992315641626624/).

- **No se pudo ver ningún estado de transacción en el explorador**. El hash de transacción que obtienes para cada caída se precalcula utilizando el nonce esperado, la cantidad y la dirección del receptor. Aunque las transacciones en Avalanche son casi instantáneas, el explorador puede tardar tiempo en indexar esas transacciones. Deberías esperar unos segundos más antes de plantear cualquier problema o comunicarte con nosotros.