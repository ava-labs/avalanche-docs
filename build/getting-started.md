# Iniciando: Ejecutando un Nodo de Avalanche

La forma más rápida de aprender sobre Avalanche es ejecutando un nodo e interactuando con la red.

{% embed url="https://youtu.be/c\_SjtCiOFdg" %}

En este tutorial \(Tiempo estimado: 10 minutos\), podremos:

* Instalar y ejecutar un nodo de Avalanche
* Conectar con Avalanche
* Enviar AVAX
* Añadir tu nodo al conjunto de validadores

Si tu problema no es tratado en las preguntas frecuentes, puedes pedir ayuda en el [Discord de Avalanche](https://chat.avax.network)! Trabajaremos para que superes cualquier obstáculo.

Este tutorial está dirigido principalmente a desarrolladores y personas interesadas en cómo funciona la Plataforma de Avalanche. Si sólo estás interesado en configurar un nodo para Staking, tal vez quieras seguir el Tutorial [Configura un Nodo de Avalanche con Instalador](tutorials/nodes-and-staking/set-up-node-with-installer.md). El instalador automatiza el proceso de instalación y lo configura como un servicio del sistema, el cual se recomienda para el funcionamiento desatendido. También puedes probar siguiendo este tutorial primero, y luego configurar el nodo usando el instalador como una solución permanente.

## Requisitos

Avalanche es un protocolo increíblemente ligero, por lo que los requisitos mínimos de la computadora son bastante modestos.

* Hardware: CPU &gt; 2 GHz, RAM &gt; 4 GB, Almacenamiento&gt; 10 GB de espacio libre
* Sistema Operativo: Ubuntu 18.04/20.04 or MacOS &gt;= Catalina

## Ejecuta un Nodo de Avalanche y Envía Fondos

Instalemos AvalancheGo, la implementación Go de un nodo Avalanche, y conectémonos a la Red Pública de Avalanche.

### Descarga AvalancheGo

El nodo es un programa binario. Puedes descargar el código fuente y luego construir el programa binario, o puedes descargar el binario pre-construido. No necesitas hacer ambas cosas.

Descargando el [binario pre-construido](getting-started.md#binary) es más fácil y recomendable si sólo buscas dirigir tu propio nodo y hacer staking en él.

Se recomienda construir el nodo desde el código fuente si eres un desarrollador que busca experimentar y construir en Avalanche.

#### **Código Fuente**

Si quieres construir el nodo desde el código fuente, primero tendrás que instalar Go 1.15.5 o posterior. Sigue las instrucciones  [aquí.](https://golang.org/doc/install).

Ejecuta `go version`. **It should be 1.15.5 or above.** Ejecuta `echo $GOPATH`. **No debe estar vacía.**

Descarga el repositorio de AvalancheGo:

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Nota para usuarios avanzados: AvalancheGo utiliza módulos Go, por lo que puedes clonar el [Repositorio de AvalancheGo](https://github.com/ava-labs/avalanchego) en otros lugares que no sean su GOPATH

Cambia al directorio de AvalancheGo:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construye en AvalancheGo:

```cpp
./scripts/build.sh
```

El Binario, llamado `avalanchego`, está ubicado en `avalanchego/build`.

#### **Binario**

Si quieres descargar un binario pre-construido en lugar de construirlo tú mismo, ve a nuestra [página de lanzamientos](https://github.com/ava-labs/avalanchego/releases), y selecciona la versión que quieras \(probablemente la última.\)

Debajo de `Assets`, selecciona el archivo apropiado.

Para MacOS:  
Descarga: `avalanchego-macos-<VERSION>.zip`  
Descomprime: `unzip avalanchego-macos-<VERSION>.zip`  
La carpeta resultante, `avalanchego-<VERSION>`, contiene los binarios.

Para Linux en PCs o proveedores de nube:  
Descarga: `avalanchego-linux-amd64-<VERSION>.tar.gz`  
Descomprime: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  
La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

Para Linux en computadoras basadas en RaspberryPi4 o similares basadas en Arm64:   
Descarga: `avalanchego-linux-arm64-<VERSION>.tar.gz`  
Descomprime: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  
La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

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

Para comprobar si una cadena termina de hacer el bootstrapping, en otra ventana terminal ejecute [`info.isBootstrapped`](avalanchego-apis/info-api.md#info-isbootstrapped) copiando y pegando el siguiente comando:

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

Si retorna como`true`, la cadena terminó de hacer el bootstrapping. Si haces un llamado API a una cadena que no ha terminado el bootstrapping,  esta retornará `API call rejected because chain is not done bootstrapping`. Si tu nodo nunca termina el bootstrapping, sigue [Estas Preguntas más Frecuentes](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), si sigues experimentando problemas contactanos en [Discord.](https://chat.avalabs.org/)

Tu nodo está funcionando y conectado ahora. Si quieres usar tu nodo como validador en la red principal, mira [este tutorial](tutorials/nodes-and-staking/add-a-validator.md#add-a-validator-with-avalanche-wallet) para saber cómo añadir tu nodo como validador usando la Wallet Web.

Puedes usar `Ctrl + C` para apagar el Nodo.

Si quieres experimentar y jugar con tu nodo, sigue leyendo.

Para poder hacer llamados a la API de su nodo desde otras máquinas, al iniciar el nodo incluya el argumento `--http-host=` \(e.g. `./build/avalanchego --http-host=`\)

Para conectarse a la Fuji Testnet en lugar de la red principal, use el argumento `--network-id=fuji`. 
Puedes conseguir fondos en el Testnet desde el [faucet.](https://faucet.avax-test.network/)

### Crear un Usuario del Keystore 

Los nodos de Avalanche proporcionan un **Keystore.** El Keystore gestiona los usuarios y es muy parecido a una [wallet](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un usuario es una identidad protegida por una contraseña que un cliente puede utilizar cuando interactúa con blockchains. **Sólo debes crear un usuario de keystore en un nodo que tú operes, ya que el operador del nodo tiene acceso a tu contraseña en texto plano.** Para crear un usuario ejecuta [`keystore.createUser`](avalanchego-apis/keystore-api.md#keystore-createuser):

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

Ahora, tienes un usuario en este nodo. Los datos del Keystore existen a nivel de nodo. Los usuarios que creas en el Keystore de un nodo no existen en otros nodos pero tu puedes importar/exportar usuarios a/desde el Keystore. Mira la [ API del Keystore](avalanchego-apis/keystore-api.md) para ver como.

{% hint style="danger" %}
**Sólo debes mantener una pequeña cantidad de tus fondos en tu nodo.** La mayoría de sus fondos deberían estar asegurados por un nemónico que no se guarde en ningún ordenador.
{% endhint %}

### Crear una Dirección

Avalanche es una plataforma de blockchains heterogéneas, una de las cuales es la [X-Chain](../learn/platform-overview/#exchange-chain-x-chain), que actúa como una plataforma descentralizada para la creación y el comercio de activos digitales. Ahora vamos a crear una dirección para guardar AVAX en nuestro nodo.

Para crear una nueva dirección en la X-Chain, ejecute [`avm.createAddress`](avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), un método de la [API de la X-Chain](avalanchego-apis/exchange-chain-x-chain-api.md):

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

Si tu nodo no ha terminado el bootstrapping, esta llamada devolverá el estado `503` con el mensaje `API call rejected because chain is not done bootstrapping`.

Ten en cuenta que hacemos esta petición a `127.0.0.1:9650/ext/bc/X`. La parte`bc/X`  significa que la solicitud se envía a la blockchain cuyo ID \(o alias\) es `X` \(es decir, la X-Chain\).

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

Tu usuario ahora controla la dirección `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` en la X-Chain. Para diferenciar las direcciones de las diferentes cadenas, la convención de Avalanche es que una dirección incluya el ID o  alias de la cadena en que existe. Por lo tanto, esta dirección comienza `X-`, denotando que existe en la X-Chain.

### Envíe Fondos desde la Wallet de Avalanche a Su Nodo

{% hint style="warning" %}
_**Nota: las instrucciones de abajo mueven fondos reales.**_
{% endhint %}

Vamos a mover fondos desde la Wallet de Avalanche a su nodo.

Vamos a la [Wallet de Avalanche ](https://wallet.avax.network). Click en `Access Wallet`, ahora `Mnemonic Key Phrase`. Introduce tu frase mnemónica.

Haz click en la pestaña`Send` a la izquierda. Para la cantidad, seleccione, `.002` AVAX. Ingrese la dirección de su nodo, luego haga clic en `Confirm`.

![web wallet send tab](../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%283%29.png)

Podemos comprobar el balance de una dirección de un activo dado ejecutando `avm.getBalance`, otro método de la API de la X-Chain. Comprobemos que la transferencia se ha realizado:

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

Observe que AVAX tiene la identificación especial `AVAX`. Normalmente la ID de un activo es una cadena alfanumérica.

La respuesta debe indicar que tenemos `2,000,000 nAVAX` o `0.002 AVAX`.

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

`amount` especifica en numero de nAVAX a enviar.

Si quieres especificar una dirección en particular donde debe ir el cambio, puedes especificarla en `changeAddr`. Puedes dejar este campo vacío; si lo haces, cualquier cambio irá a una de las direcciones que tu usuario controla.

Para evitar el spam, Avalanche requiere el pago de una comisión por la transacción. La comisión por la transacción se deducirá automáticamente de una dirección controlada por el usuario cuando se emita una transacción. Tenlo en cuenta cuando revises los saldos de abajo.

{% page-ref page="../learn/platform-overview/transaction-fees.md" %}

Cuando envíes esta solicitud, el nodo te autentificará con tu nombre de usuario y contraseña. Luego, buscará a través de todas las [private keys](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) controladas por tu usuario hasta que encuentre suficiente AVAX para satisfacer la petición.

La respuesta contieneel ID de la transacción. Será diferente para cada invocación de `send`.

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

Esta transacción sólo tardará uno o dos segundos en finalizar. Podemos comprobar su estado con [`avm.getTxStatus`](avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

También podría ver que `status` está en `Processing` si la red no ha finalizado aún la transacción.

Una vez que vea que la transacción es `Accepted`, comprobar el saldo de la dirección `to` para ver que tiene el AVAX que enviamos:

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

De la misma manera, podríamos comprobar `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` para ver que el AVAX que enviamos fue deducido de su balance, así como la comisión de la transacción.

{% page-ref page="tutorials/nodes-and-staking/add-a-validator.md" %}

{% page-ref page="tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="tutorials/platform/create-a-new-blockchain.md" %}

{% page-ref page="tutorials/platform/create-a-subnet.md" %}

{% page-ref page="avalanchego-apis/" %}

{% page-ref page="references/" %}

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQyMTIzNTA0MSwxNjQ4NzYwLDE4NjI5Mz
A0NjQsMTMxMzI5OTk1NywxODI4Mzc5ODc0LC04MDAzODA4ODUs
MTUwNTc2MjgxNywtMjA2Nzc4NDI1MCwtMTkyODQzNTM4MywtMT
cyMjYxNjU4OV19
-->