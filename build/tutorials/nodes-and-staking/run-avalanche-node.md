# Ejecutar un Nodo de Avalanche

La forma más rápida de aprender sobre Avalanche es ejecutando un nodo e interactuando con la red.

{% embed url="https://youtu.be/c_SjtCiOFdg" caption="" %}

En este tutorial (Tiempo estimado: 10 minutos), podremos:

* Instalar y ejecutar un nodo de Avalanche
* Conectar con Avalanche
* Enviar AVAX
* Añadir tu nodo al conjunto de validadores

{% hint style="warning" %}Si tu problema no se encuentra en las preguntas frecuentes, ¡puedes pedir ayuda en el [Discord de Avalanche](https://chat.avax.network)! Haremos todo lo posible para que superes cualquier obstáculo.{% endhint %}

{% hint style="info" %}Si deseas usar un servicio de terceros para alojar tu nodo o ejecutar un validador, [consulta las opciones disponibles](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services).{% endhint %}

Este tutorial está dirigido principalmente a desarrolladores y personas interesadas en cómo funciona la Plataforma de Avalanche. En cambio, si solo estás interesado en configurar un nodo para hacer la participación, puedes seguir el tutorial de [Cómo configurar un nodo de Avalanche con instalador](set-up-node-with-installer.md). El instalador automatiza el proceso de instalación y lo configura como un servicio del sistema, el cual se recomienda para el funcionamiento desatendido. También puedes probar siguiendo este tutorial primero, y luego configurar el nodo usando el instalador como una solución permanente.

## Requisitos

Avalanche es un protocolo increíblemente ligero, por lo que los nodos pueden funcionar con hardware común. Ten en cuenta que los requisitos del hardware pueden cambiar a medida que aumenta el uso de la red.

* CPU: Equivalente a 8 AWS vCPU
* RAM: 16 GB
* Almacenamiento: 200 GB
* OS: Ubuntu 18.04/20.04 o MacOS >= Catalina

## Ejecuta un Nodo de Avalanche y Envía Fondos

Instalemos AvalancheGo, la implementación Go de un nodo Avalanche, y conectémonos a la Red Pública de Avalanche.

### Descarga AvalancheGo

El nodo es un programa binario. Puedes descargar el código fuente y luego construir el programa binario, o puedes descargar el binario pre-construido. No necesitas hacer ambas cosas.

Descargar el [binario preconstruido](run-avalanche-node.md#binary) es más fácil y recomendado únicamente si solo deseas ejecutar tu propio nodo y hacer la prueba de participación en él.

Se recomienda construir el nodo desde el código fuente si eres un desarrollador que busca experimentar y construir en Avalanche.

#### **Código de la fuente**

Si quieres construir el nodo desde la fuente, primero tendrás que instalar Go 1.16.8 o una versión posterior. Sigue las instrucciones [aquí](https://golang.org/doc/install).

Ejecuta `go version`.** Debería ser 1.16.8 o posterior.** Ejecuta `echo $GOPATH`.** No debería estar vacío.**

Descarga el repositorio de AvalancheGo:

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Nota para usuarios avanzados: AvalancheGo usa módulos Go, así que puedes clonar el [repositorio de AvalancheGo](https://github.com/ava-labs/avalanchego) a ubicaciones distintas de tu GOPATH.

Cambia al directorio `avalanchego`:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construye en AvalancheGo:

```cpp
./scripts/build.sh
```

El binario, llamado `avalanchego`, se encuentra en `avalanchego/build`.

#### **Binario**

Si quieres descargar un binario preconstruido en lugar de construirlo tú mismo, ve a nuestra [página de lanzamientos](https://github.com/ava-labs/avalanchego/releases) y selecciona la versión que quieras (probablemente la última).

Selecciona el archivo correcto de `Assets`.

Para Mac OS: Descarga: `avalanchego-macos-<VERSION>.zip`  Descomprime: `unzip avalanchego-macos-<VERSION>.zip`la carpeta resultante, `avalanchego-<VERSION>`, contiene los binarios.

Para Linux en PC o proveedores de nube: descarga`avalanchego-linux-amd64-<VERSION>.tar.gz`  : Descomprime: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

Para Linux en RaspberryPi4 o computadoras similares basadas en Arm64: Descarga`avalanchego-linux-arm64-<VERSION>.tar.gz`  : Descomprime: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

### Inicia un Nodo, y Conéctate a Avalanche

Si construyes desde el código fuente:

```cpp
./build/avalanchego
```

Si estás usando los binarios pre-construidos en MacOS:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si estás usando los binarios pre-construidos en Linux:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Cuando el nodo comienza, tiene que hacer bootstrapping (actualizarse con el resto de la red). Verás registros sobre el bootstrapping. Cuando una cadena termina de hacer el bootstrapping, imprimirá un registro como este:

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

Para comprobar si una cadena completó el arranque, ejecuta [`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped) en otra ventana terminal al copiar y pegar el siguiente comando:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si el resultado es `true`, la cadena ha arrancado. Si haces una llamada de API a una cadena que todavía no ha terminado de arrancar, indicará `API call rejected because chain is not done bootstrapping`. Si tu nodo nunca terminó de arranchar, sigue [estas Preguntas frecuentes](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping). Si todavía tienes problemas, contáctanos en [Discord.](https://chat.avalabs.org/)

Tu nodo está funcionando y conectado ahora. Si quieres usar tu nodo como validador en la red principal, mira [este tutorial](add-a-validator.md#add-a-validator-with-avalanche-wallet) para saber cómo añadir tu nodo como validador con la billetera de la web.

Para matar el nodo, puedes usar `Ctrl + C`.

Si quieres experimentar y jugar con tu nodo, sigue leyendo.

Para poder hacer llamadas de API a tu nodo desde otras máquinas, incluye el argumento `--http-host=` (es decir, `./build/avalanchego --http-host=`) al iniciar el nodo.

Para conectarte a la red de pruebas Fuji en lugar de la principal, usa el argumento `--network-id=fuji`. Puedes conseguir fondos en la red de pruebas desde el [Faucet.](https://faucet.avax-test.network/)

### Crear un Usuario del Keystore

Los nodos de Avalanche proporcionan un **Keystore** incorporado. El Keystore gestiona a los usuarios; es muy parecido a una [billetera](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un usuario es una identidad protegida por una contraseña que un cliente puede utilizar cuando interactúa con blockchains.** Solo debes crear un usuario de Keystore en un nodo que tú operes, ya que el operador del nodo tiene acceso a tu contraseña en texto sin formato.** Para crear un usuario, llama a [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser):

```cpp
curl -X POST --data '{
     "jsonrpc": "2.0",
     "id": 1,
     "method": "keystore.createUser",
     "params": {
         "username": "YOUR USERNAME HERE",
         "password": "YOUR PASSWORD HERE"
     }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

La respuesta debería ser:

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

Ahora, tienes un usuario en este nodo. Los datos del Keystore existen en el ámbito de nodo. Los usuarios que creas en el Keystore de un nodo no existen en otros nodos pero tú puedes importar/exportar usuarios a/desde el Keystore. Mira la [API del Keystore](../../avalanchego-apis/keystore-api.md) para ver cómo hacerlo.

{% hint style="danger" %}**Únicamente debes mantener una pequeña cantidad de tus fondos en tu nodo.** La mayor parte de sus fondos deberían estar asegurados por una mnemónica que no debe guardarse en ningún ordenador.{% endhint %}

### Crear una Dirección

Avalanche es una plataforma de blockchains heterogéneas, una de las cuales es la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain), que actúa como una plataforma descentralizada para crear y el comerciar activos digitales. Ahora vamos a crear una dirección para guardar AVAX en nuestro nodo.

Para crear una nueva dirección en la X-Chain, llama a [`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), un método de la [API de la X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.createAddress",
    "params" :{
        "username":"YOUR USERNAME HERE",
        "password":"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Si tu nodo no ha terminado de arrancar, esta llamada devolverá el estado `503` con el mensaje `API call rejected because chain is not done bootstrapping`.

Ten en cuenta que puedes hacer esta petición a `127.0.0.1:9650/ext/bc/X`. La parte `bc/X` significa que la solicitud está en proceso de envío a la blockchain cuya ID (identificación o alias) es `X`(es decir, la X-Chain).

La respuesta debería ser así:

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Tu usuario ahora controla la dirección `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` en la X-Chain. Para diferenciar las direcciones de las diferentes cadenas, la convención de Avalanche es que una dirección incluya el ID o alias de la cadena en que existe. Por lo tanto, esta dirección comienza `X-`, lo que denota que existe en la X-Chain.

### Envíe Fondos desde la Wallet de Avalanche a Su Nodo

{% hint style="warning" %} _**Nota: Las siguientes instrucciones transfieren fondos reales.**_{% endhint %}

Vamos a mover fondos desde la Wallet de Avalanche a su nodo.

Ve a "[Avalanche Wallet](https://wallet.avax.network)". Haz clic en `Access Wallet` y después en `Mnemonic Key Phrase`. Introduce tu frase mnemónica.

Haz click en la pestaña `Send`, a la izquierda. Para la cantidad, selecciona `.002` AVAX. Ingresa la dirección de tu nodo y haz clic en `Confirm`.

![pestaña de envío de la billetera web](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%285%29.png)

Puedes revisar el saldo de la dirección de un activo dado al llamar a `avm.getBalance`, otro método de la API de la X-Chain. Comprobemos que la transferencia se ha realizado:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :3,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Observa que AVAX tenga la identificación especial `AVAX`. Normalmente la ID de un activo es una cadena alfanumérica.

La respuesta debería indicar que tenemos `2,000,000 nAVAX` o `0.002 AVAX`.

```cpp
{
    "jsonrpc":"2.0",
    "id"     :3,
    "result" :{
        "balance":2000000,
        "utxoIDs": [
            {
                "txID": "x6vR85YPNRf5phpLAEC7Sd6Tq2PXWRt3AAHAK4BpjxyjRyhtu",
                "outputIndex": 0
            }
        ]
    }
}
```

### Enviar AVAX

Ahora, enviemos algunos AVAX haciendo un llamado API a nuestro nodo:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :5,
    "method" :"avm.send",
    "params" :{
        "assetID"    :"AVAX",
        "amount"     :1000,
        "to"         :"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"   :"YOUR USERNAME HERE",
        "password"   :"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`amount` especifica la cantidad de nAVAX que se enviarán.

Si quieres especificar una dirección particular para el destino del cambio, puedes especificarla en `changeAddr`. Puedes dejar este campo vacío; si lo haces, cualquier cambio irá a una de las direcciones que tu usuario controla.

Para evitar el spam, Avalanche requiere el pago de una comisión por la transacción. La comisión por la transacción se deducirá automáticamente de una dirección controlada por el usuario cuando se emita una transacción. Tenlo en cuenta cuando revises los saldos de abajo.

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

Cuando envíes esta solicitud, el nodo te autentificará con tu nombre de usuario y contraseña. Después buscará entre todas las [claves privadas](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) que tu usuario controla hasta encontrar suficientes AVAX para satisfacer la petición.

La respuesta contiene el ID de la transacción. Será diferente para cada invocación de `send`.

```cpp
{
    "jsonrpc":"2.0",
    "id"     :5,
    "result" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

#### Comprobando el Estado de la Transacción

Esta transacción solo tardará uno o dos segundos en finalizar. Puedes comprobar su estado con [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :6,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La respuesta debe indicar que la transacción fue aceptada:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

También puedes ver que `status` está en `Processing` si la red aún no ha finalizado la transacción.

Una vez que veas la transacción como `Accepted`, revisa el saldo de la dirección `to` para ver si ya tiene los AVAX que enviaste.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :7,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La respuesta debería ser:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

De la misma manera, puedes revisar `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` para ver si los AVAX que enviaste se dedujeron de su saldo, aunado a la comisión de la transacción.

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

