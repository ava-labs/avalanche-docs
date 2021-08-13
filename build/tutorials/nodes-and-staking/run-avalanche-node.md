# Ejecute un nodo de Avalanche

La forma más rápida de aprender sobre Avalanche es ejecutar un nodo e interactuar con la red.

{% incrustado url="https://youtu.be/c\_SjtCiOFdg" subtítulo = "" %}

En este tutorial \(est. tiempo: 10 minutos\), nosotros deberemos:

* Instalar y ejecutar un nodo Avalanche
* Conecte a Avalanche
* Enviar AVAX
* Añade tu nodo al conjunto de validadores

{% insinuar style="warning" %} Si su problema no se aborda en las FAQ, venga a pedir ayuda en el [Discord! Avalanche](https://chat.avax.network)! Trabajaremos para conseguirte cualquier obstáculo. {% endhint %}

{% insinuar style="info" %} Si está interesado en utilizar un servicio de terceros para alojar su nodo o ejecutar un validador, [consulte las opciones](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services). {% endhint %}

Este tutorial está dirigido principalmente a desarrolladores y personas interesadas en cómo funciona la Plataforma Avalanche. Si solo te interesa configurar un nodo para el apilamiento, es posible que desee seguir el [Nodo de Avalanche Configurar con el](set-up-node-with-installer.md) tutorial de Instalador. Instalador automatiza el proceso de instalación y lo establece como un servicio de sistema, que se recomienda para una operación sin asistencia. También puede probar las cosas siguiendo este tutorial primero, y luego configurar el nodo utilizando el instalador como solución permanente.

## Requisitos para requisitos de seguridad

Avalanche es un protocolo increíblemente ligero, por lo que los requisitos mínimos de computadora son bastante modestos. Tenga en cuenta que a medida que aumenta el uso de la red, los requisitos de hardware pueden cambiar.

* Hardware: CPU > 2 GHz, RAM > 4 GB, Almacenamiento > 200 GB espacio libre
* OS: Ubuntu 18.04/20.04 o MacOS >= Catalina

## Ejecute un nodo de Avalanche y envíe fondos

Instalemos AvalancheGo, la implementación de Go de un nodo Avalanche, y conectemos con el Testnet Público de Avalanche.

### Descargar AvalancheGo

El nodo es un programa binario. Puede descargar el código fuente y luego construir el programa binario, o puede descargar el binario preconstruido. No necesitas hacer ambas cosas.

Descargar [binario pre-construido](run-avalanche-node.md#binary) es más fácil y recomendable si solo estás buscando ejecutar tu propio nodo y estaca en él.

Se recomienda construir el nodo de fuente si eres un desarrollador que busca experimentar y construir en Avalanche.

#### **Código fuente**

Si desea construir el nodo de fuente, primero tendrá que instalar Go 1.15.5 o posterior. Sigue las instrucciones [aquí](https://golang.org/doc/install).

Run `ir a la versión`. **Debe ser 1.15.5 o superior.** Runde `eco $GOPATH`. **No debería estar vacío.**

Descargar el repositorio AvalancheGo :

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Nota para usuarios avanzados: AvalancheGo utiliza módulos Go para que pueda clonar el [repositorio](https://github.com/ava-labs/avalanchego) AvalancheGo a lugares distintos de su GOPATH.

Cambio al directorio `avalanchego`:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construir AvalancheGo:

```cpp
./scripts/build.sh
```

El binario, llamado `avalanchego`, está en `avalanchego/construir`.

#### **Binary**

Si desea descargar un binario pre-construido en lugar de construirlo usted mismo, vaya a nuestra [página](https://github.com/ava-labs/avalanchego/releases) de lanzamientos, y seleccione el lanzamiento que desea \(probablemente el más reciente. \)

En `Activos`, seleccione el archivo apropiado.

Para MacOS: Descargar: `avalanchego-macos-<VERSION>.zip`   Unzip: `unzip avalanchego-macos-<VERSION>.zip` La carpeta resultante, `avalanchego-<VERSION>`, contiene los binarios.

Para Linux en PC o proveedores de nube: Descargar: `avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip: `alquitrán -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`   La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

Para Linux en RaspberryPi4 o ordenadores basados en Arm64: Descargar: `avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip: `alquitrán -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`   La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

### Inicie un Node, y Conectarse a Avalanche

Si usted construyó a partir de la fuente:

```cpp
./build/avalanchego
```

Si está utilizando los binarios pre-construidos en MacOS:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si está utilizando los binarios pre-construidos en Linux:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Cuando el nodo empiece, tiene que arrancar \(ponerse al día con el resto de la red\). Verás registros sobre la grabación de arranque. Cuando una cadena dada se hace el arranque de la secuestro, imprimirá un registro como este:

`INFO [06-07|19:54:06] <X Cadena / nieve/motor/avalanche/transitive.go#80: arranque terminado con 1 vértices en la frontera aceptada`

Para comprobar si una cadena dada se realiza el arranque de bootstrapping, en otra ventana terminal llame [`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped) copiando y pegando el siguiente comando:

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

Si esto devuelve `verdad`, la cadena está arrancada Si hace una llamada API a una cadena que no se hace la secuencia de arranque, devolverá la `llamada API rechazada porque la cadena no se realiza la secuestro`. Si su nodo nunca termina de arrancar, siga [esta FAQ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), si todavía está experimentando problemas, por favor póngase en contacto con nosotros en [Discord.](https://chat.avalabs.org/)

Tu nodo está funcionando y conectado. Si desea utilizar su nodo como validador en la red principal, consulte [este tutorial](add-a-validator.md#add-a-validator-with-avalanche-wallet) para averiguar cómo agregar su nodo como validador utilizando la cartera web.

Puede usar `Ctrl + C` para matar el nodo.

Si quieres experimentar y jugar con tu nodo, lea.

Para poder hacer llamadas API a su nodo desde otras máquinas, al iniciar el nodo incluye el argumento `--http-host=` \(por ejemplo, `./build/avalanchego --http-host=`\)

Para conectarse al Fuji Testnet en lugar de la red principal, utilice el argumento `--network-id=fuji`. Puedes obtener fondos en el Testnet desde el [grifo.](https://faucet.avax-test.network/)

### Crear un usuario de Keystore

Los nodos de Avalanche proporcionan una **Keystore** incorporada. El Keystore gestiona los usuarios y es mucho como una [cartera](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un usuario es una identidad protegida por contraseña que un cliente puede utilizar al interactuar con blockchains. **Solo debe crear un usuario de keystore en un nodo que opera, ya que el operador de nodo tiene acceso a su contraseña de texto llano.** Para crear un usuario, llame [`a`](../../avalanchego-apis/keystore-api.md#keystore-createuser) user,

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

La respuesta debe ser:

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

Ahora, tienes un usuario en este nodo. Los datos de los almacenes de teclas existen a nivel de nodo. Los usuarios que cree en el Keystore de un nodo no existen en otros nodos, pero puede importar / exportar usuarios a / desde el Keystore. Vea la [API de Keystore](../../avalanchego-apis/keystore-api.md) para ver cómo.

{% insinuar style="danger" %} **Solo debes mantener una pequeña cantidad de tus fondos en tu nodo.** La mayoría de sus fondos deben ser asegurados por un mnemonic que no se guarda en ningún ordenador. {% endhint %}

### Crear una dirección

Avalanche es una plataforma de cadenas de bloqueo heterogéneas, una de las cuales es la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain), que actúa como plataforma descentralizada para crear y comerciar activos digitales. Ahora vamos a crear una dirección para mantener AVAX en nuestro nodo.

Para crear una nueva dirección en la X-Chain, llame a [`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), un método de [la API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de X-Chain:

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

Si su nodo no ha terminado de iniciar el arranque, esta llamada devolverá el estado `503` con `la llamada API de mensaje rechazada porque la cadena no se realiza el arranque de la` secuencia.

Tenga en cuenta que hacemos esta solicitud a `127.0.1:9650/ext/bc/X`. La porción `bc/X` significa que la solicitud se envía a la cadena de bloques cuyo ID \(o alias\) es `X` \(es decir, la cadena X).

La respuesta debería parecer así:

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Su usuario ahora controla la dirección `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` en la cadena X. Para distinguir las direcciones en diferentes cadenas, la convención de Avalanche es para que una dirección incluya el ID o alias de la cadena en la que existe. Por lo tanto, esta dirección comienza `X-`, denotando que existe en la cadena X.

### Enviar fondos de Avalanche Wallet a su nodo

{% insinuar style="warning" %} _**Nota: las instrucciones a continuación mueven fondos reales.**_ {% endhint %}

Vamos a mover fondos de la Cartera Avalanche a su nodo.

Ve a [Avalanche Wallet](https://wallet.avax.network). Haga clic en `Access Wallet`, luego `Mnemonic Key` Ingrese su frase mnemónica.

Haga clic en la pestaña `Enviar` a la izquierda. Para la cantidad, seleccione, `.002` AVAX. Introduzca la dirección de su nodo, luego haga clic `en Confirmar`.

![billetera web enviar pestaña](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%2819%29.png)

Podemos comprobar el saldo de una dirección de un activo dado llamando a `avm.getBalance`, otro método de la API de la cadena X. Revisemos que la transferencia se realizó:

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

Tenga en cuenta que AVAX tiene el ID especial `AVAX`. Por lo general, un ID de activos es una cadena alfanumérica.

La respuesta debe indicar que tenemos `2.000.000 nAVAX` o `0.002 AVAX`.

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

Ahora, enviemos un poco de AVAX haciendo una llamada API a nuestro nodo:

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

`cantidad` especifica el número de nAVAX que enviará.

Si desea especificar una dirección particular a dónde debe ir el cambio, puede especificarlo en `changeAddr`. Puede dejar este campo vacío; si lo hace, cualquier cambio irá a una de las direcciones que controla el usuario.

Para evitar el spam, Avalanche requiere el pago de una cuota de transacción. La tarifa de transacción se deducirá automáticamente de una dirección controlada por su usuario cuando emita una transacción. Tenga en cuenta eso cuando está revisando los saldos a continuación.

{% page-ref page=".. /.. /../learn/platform-overview/transaction-fees.md" %}

Cuando envíe esta solicitud, el nodo le autenticará utilizando su nombre de usuario y contraseña. Luego, se verá a través de todas las [teclas privadas](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) controladas por su usuario hasta que encuentre suficiente AVAX para satisfacer la petición.

La respuesta contiene el ID de la transacción. Será diferente para cada invocación del `envío`.

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

#### Comprobando el estado de la transacción

Esta transacción solo tomará un segundo o dos para finalizar. Podemos comprobar su estado con [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

También puede ver que `el estado` es `Procesamiento` si la red aún no ha finalizado la transacción.

Una vez que vea que la transacción se `acepta`, compruebe el saldo de `la` dirección para ver que tiene el AVAX que enviamos:

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

La respuesta debe ser:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

De la misma manera, podríamos comprobar `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` para ver que AVAX enviamos fue deducido de su balance, así como la cuota de transacción.

{% page-ref page="add-a-validator.md" %}

{% page-ref page=".. /../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page-ref %}

{% page-ref page-ref %}

{% page-ref page=".. /../avalanchego-apis/" %}

{% page-ref page=".. /../referencias/" %}

