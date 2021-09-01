# Ejecutar un Nodo de Avalanche

La forma más rápida de aprender sobre Avalanche es ejecutando un nodo e interactuando con la red.

{% embed url="https://youtu.be/c_SjtCiOFdg" caption="" %}

En este tutorial \(Tiempo estimado: 10 minutos\), podremos:

* Instalar y ejecutar un nodo de Avalanche
* Conectar con Avalanche
* Enviar AVAX
* Añadir tu nodo al conjunto de validadores

{% hint style="warning" %}Si tu número no se aborda en las FAQ, ven a pedir ayuda en la [Discord](https://chat.avax.network) de Avalanche. Trabajaremos para conseguirte a través de cualquier obstáculo.{% endhint %}

{% hint style="info" %}Si estás interesado en usar un servicio de terceros para alojar tu nodo o ejecutar un validador, [mira las opciones.](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services){% endhint %}

Este tutorial está dirigido principalmente a desarrolladores y personas interesadas en cómo funciona la Plataforma de Avalanche. Si solo estás interesado en crear un nodo para crear el staking, puedes querer seguir el nodo de [Avalanche con](set-up-node-with-installer.md) tutorial de Instalador. El instalador automatiza el proceso de instalación y lo configura como un servicio del sistema, el cual se recomienda para el funcionamiento desatendido. También puedes probar siguiendo este tutorial primero, y luego configurar el nodo usando el instalador como una solución permanente.

## Requisitos

Avalanche es un protocolo increíblemente ligero, por lo que los nodos pueden ejecutarse en hardware de materias primas. Tenga en cuenta que a medida que el uso de la red aumenta, los requisitos de hardware pueden cambiar.

* CPU: Equivalente de 8 AWS vCPU
* RAM: 16 GB
* Almacenamiento: 200 GB
* OS: Ubuntu 18.04/20.04 o MacOS >= Catalina

## Ejecuta un Nodo de Avalanche y Envía Fondos

Instalemos AvalancheGo, la implementación Go de un nodo Avalanche, y conectémonos a la Red Pública de Avalanche.

### Descarga AvalancheGo

El nodo es un programa binario. Puedes descargar el código fuente y luego construir el programa binario, o puedes descargar el binario pre-construido. No necesitas hacer ambas cosas.

La descarga [de un binario creado es](run-avalanche-node.md#binary) más fácil y recomendado si estás buscando ejecutar tu propio nodo y hacer stock.

Se recomienda construir el nodo desde el código fuente si eres un desarrollador que busca experimentar y construir en Avalanche.

#### **Código fuente**

Si quieres construir el nodo desde el código fuente, primero tendrás que instalar Go 1.15.5 o posterior. Sigue las instrucciones [aquí](https://golang.org/doc/install).

`go version`Ejecu.** Debería ser 1.15.5 o superior.** `echo $GOPATH`Ejecu.** No debería estar vacío.**

Descarga el repositorio de AvalancheGo:

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Nota para los usuarios avanzados: AvalancheGo utiliza módulos Go para que puedas clonar el [repositorio](https://github.com/ava-labs/avalanchego) de AvalancheGo a ubicaciones distintas de tu GOPATH.

Cambia al `avalanchego`directorio:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construye en AvalancheGo:

```cpp
./scripts/build.sh
```

El binario, nombrado `avalanchego`, está en `avalanchego/build`.

#### **Binary**

Si quieres descargar un binario pre-construido en lugar de crearlo solo, ve a nuestra [página](https://github.com/ava-labs/avalanchego/releases) de lanzamientos y selecciona el lanzamiento que quieres \(probablemente la última.\)

Bajo `Assets`, selecciona el archivo apropiado.

Para MacOS:`avalanchego-macos-<VERSION>.zip`   Unzip: `unzip avalanchego-macos-<VERSION>.zip`La carpeta resultante, `avalanchego-<VERSION>`contiene los binarios.

Para Linux en PC o proveedores de la nube: Descargar:`avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  `avalanchego-<VERSION>-linux`La carpeta resultante, contiene los binarios.

Para Linux en RaspberryPi4 o computadoras similares basadas en Arm64: Descarga:`avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  `avalanchego-<VERSION>-linux`La carpeta resultante, contiene los binarios.

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

Cuando el nodo comienza, tiene que hacer bootstrapping \(actualizarse con el resto de la red\). Verás registros sobre el bootstrapping. Cuando una cadena termina de hacer el bootstrapping, imprimirá un registro como este:

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

Para comprobar si una cadena dada se hace la toma de arranque, en otra ventana de terminal llamada [`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped)en otra ventana de terminal copiando y pegando el siguiente comando:

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

Si esto `true`devuelve, la cadena se arranca. Si haces una llamada de API a una cadena que no se hace la toma de arranque, regresará `API call rejected because chain is not done bootstrapping`. Si tu nodo nunca termina de iniciar strapping, sigue [esta FAQ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), si sigues experimentando problemas por favor contacta con nosotros en [Discord.](https://chat.avalabs.org/)

Tu nodo está funcionando y conectado ahora. Si quieres usar tu nodo como validador en la red principal, mira [este tutorial](add-a-validator.md#add-a-validator-with-avalanche-wallet) para averiguar cómo agregar tu nodo como validador usando la billetera web.

Puedes usar `Ctrl + C`para matar el nodo.

Si quieres experimentar y jugar con tu nodo, sigue leyendo.

Para ser capaz de hacer llamadas de API a tu nodo de otras máquinas, al iniciar el nodo incluye el argumento \(por `--http-host=`ejemplo\)`./build/avalanchego --http-host=`

Para conectarse a la Testnet de Fuji en lugar de la red principal, usa el `--network-id=fuji`argumento. Puedes obtener fondos en la Testnet desde la [faucet.](https://faucet.avax-test.network/)

### Crear un Usuario del Keystore

Los nodos de Avalanche proporcionan una tienda de claves **incorporada.** La tienda de Keystore administra usuarios y es mucho como una [billetera](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un usuario es una identidad protegida con contraseña que un cliente puede usar al interactuar con blockchains.** Solo debes crear un usuario de keystore en un nodo que operas, ya que el operador de nodo tiene acceso a tu contraseña de texto llano.** Para crear un usuario, llama [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser):

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

Ahora, tienes un usuario en este nodo. Los datos del Keystore existen a nivel de nodo. Los usuarios que creas en el Keystore de un nodo no existen en otros nodos pero tu puedes importar/exportar usuarios a/desde el Keystore. Ver la [API](../../avalanchego-apis/keystore-api.md) de Keystore para ver cómo.

{% hint style="danger" %}**Solo debes mantener una pequeña cantidad de tus fondos en tu nodo.** La mayoría de tus fondos deberían ser asegurados por un mnemónico que no se guarda en ningún ordenador.{% endhint %}

### Crear una Dirección

Avalanche es una plataforma de blockchains heterogéneas, una de las cuales es la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain), que actúa como una plataforma descentralizada para crear y comerciar activos digitales. Ahora vamos a crear una dirección para guardar AVAX en nuestro nodo.

Para crear una nueva dirección en la X-Chain, llama [`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), un método de la [API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de la X-Chain:

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

Si tu nodo no está terminado de iniciar strapping, esta llamada regresará el estado `503`con el mensaje .`API call rejected because chain is not done bootstrapping`

Tenga en cuenta que hacemos esta petición a `127.0.0.1:9650/ext/bc/X`. La `bc/X`porción significa que la solicitud está siendo enviada a la blockchain cuyo ID \(o alias\) es \(es `X`decir, la X-Chain\).

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

Tu usuario ahora controla la dirección `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`en la X-Chain. Para diferenciar las direcciones de las diferentes cadenas, la convención de Avalanche es que una dirección incluya el ID o alias de la cadena en que existe. Por lo tanto, esta dirección comienza `X-`, denotando que existe en la X-Chain.

### Envíe Fondos desde la Wallet de Avalanche a Su Nodo

{% hint style="warning" %}_**Nota: las instrucciones a continuación mueven fondos reales.**_{% endhint %}

Vamos a mover fondos desde la Wallet de Avalanche a su nodo.

Ve a [la billetera](https://wallet.avax.network) de Avalanche. `Mnemonic Key Phrase`Haz clic en `Access Wallet`, entonces Introduce tu frase mnemónica.

Haz clic en la `Send`pestaña de la izquierda. Para cantidad, selecciona y `.002`AVAX. Ingresa la dirección de tu nodo y haz clic en `Confirm`.

![Billetera web](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%2819%29.png)

Podemos comprobar el saldo de una dirección de un activo dado al llamar `avm.getBalance`, otro método de la API de la X-Chain. Comprobemos que la transferencia se ha realizado:

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

`AVAX`Tenga en cuenta que AVAX tiene el ID especial Normalmente la ID de un activo es una cadena alfanumérica.

La respuesta debería indicar que tenemos `2,000,000 nAVAX`o .`0.002 AVAX`

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

`amount`Especifica el número de nAVAX para enviar.

Si quieres especificar una dirección particular a la que debe ir el cambio, puedes especificarla en `changeAddr`. Puedes dejar este campo vacío; si lo haces, cualquier cambio irá a una de las direcciones que tu usuario controla.

Para evitar el spam, Avalanche requiere el pago de una comisión por la transacción. La comisión por la transacción se deducirá automáticamente de una dirección controlada por el usuario cuando se emita una transacción. Tenlo en cuenta cuando revises los saldos de abajo.

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

Cuando envíes esta solicitud, el nodo te autentificará con tu nombre de usuario y contraseña. Luego, buscará todas las [claves privadas](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) controladas por tu usuario hasta que encuentre lo suficiente AVAX para satisfacer la petición.

La respuesta contiene el ID de la transacción. Será diferente para cada invocación `send`.

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

Esta transacción sólo tardará uno o dos segundos en finalizar. Podemos comprobar su estado con [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

También podrías ver que `status`es `Processing`si la red no ha finalizado la transacción.

Una vez ves que la transacción es `Accepted`, comprueba el saldo de la `to`dirección para ver que tiene la AVAX que enviamos:

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

De la misma manera, podemos comprobar `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`para ver que AVAX que enviamos fue deducido de su equilibrio, así como la tarifa de transacción.

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

