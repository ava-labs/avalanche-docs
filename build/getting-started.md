# Getting Started: Run an Avalanche Node

La forma más rápida de aprender sobre Avalanche es ejecutando un nodo e interactuando con la red.

{% embed url="https://youtu.be/c\_SjtCiOFdg" %}

En este tutorial \(Tiempo estimado: 10 minutos\), podremos:

* Instalar y ejecutar un nodo de Avalanche
* Conectar con Avalanche
* Enviar AVAX
* Añadir tu nodo al conjunto de validadores

Si su problema no se trata en las preguntas frecuentes, puede pedir ayuda en el [Discord de Avalanche](https://chat.avax.network)! Trabajaremos para que superes cualquier obstáculo.

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

Nota para usuarios avanzados: AvalancheGo utiliza módulos Go, por lo que puede clonar el [Repositorio de AvalancheGo](https://github.com/ava-labs/avalanchego) en otros lugares que no sean su GOPATH

Cambie al directorio de AvalancheGo:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construya en AvalancheGo:

```cpp
./scripts/build.sh
```

El Binario, llamado `avalanchego`, está ubicado en `avalanchego/build`.

#### **Binario**

Si quieres descargar un binario pre-construido en lugar de construirlo tú mismo, ve a nuestra [página de lanzamientos](https://github.com/ava-labs/avalanchego/releases), y selecciona el  que quieras \(probablemente el último.\)

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
La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarioss.

### Inicie un Nodo, y Conéctese a Avalanche

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

Si retorna como`true`, la cadena terminó de hacer el bootstrapping. Si haces un llamado API a una cadena que no ha terminado el bootstrapping,  esta retornará `API call rejected because chain is not done bootstrapping`.Si tu nodo nunca termina el bootstrapping, sigue [Estas Preguntas más Frecuentes](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), si sigues experimentando problemas contactanos en [Discord.](https://chat.avalabs.org/)

Tu nodo está funcionando y conectado ahora. Si quieres usar tu nodo como validador en la red principal, mira [este tutorial](tutorials/nodes-and-staking/add-a-validator.md#add-a-validator-with-avalanche-wallet) para saber cómo añadir tu nodo como validador usando la Wallet Web.

Puedes usar `Ctrl + C` para apagar el Nodo.

Si quieres experimentar y jugar con tu nodo, sigue leyendo.

Para poder hacer llamados a la API de su nodo desde otras máquinas, al iniciar el nodo incluya el argumento `--http-host=` \(e.g. `./build/avalanchego --http-host=`\)

Para conectarse a la Fuji Testnet en lugar de la red principal, use el argumento `--network-id=fuji`. 
Puedes conseguir fondos en el Testnet desde el [faucet.](https://faucet.avax-test.network/)

### Crear un Usuario del Keystore 

Los nodos de Avalanche proporcionan un **Keystore.** El Keystore gestiona los usuarios y es muy parecido a una [wallet](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un usuario es una identidad protegida por una contraseña que un cliente puede utilizar cuando interactúa con blockchains. **Sólo debe crear un usuario de keystore en un nodo que tú operes, ya que el operador del nodo tiene acceso a su contraseña en texto plano.** Para crear un usuario ejecute [`keystore.createUser`](avalanchego-apis/keystore-api.md#keystore-createuser):

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

Ahora, tienes un usuario en este nodo. Los datos del Keystore existen a nivel de nodo. Los usuarios que usted crea en el Keystore de un nodo no existen en otros nodos pero usted puede importar/exportar usuarios a/desde el Keystore. Mira [ API del Keystore](avalanchego-apis/keystore-api.md) para ver como.

{% hint style="danger" %}
**You should only keep a small amount of your funds on your node.** Most of your funds should be secured by a mnemonic that is not saved to any computer.
{% endhint %}

### Create an Address

Avalanche is a platform of heterogeneous blockchains, one of which is the [X-Chain](../learn/platform-overview/#exchange-chain-x-chain), which acts as a decentralized platform for creating and trading digital assets. We are now going to create an address to hold AVAX on our node.

To create a new address on the X-Chain, call [`avm.createAddress`](avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), a method of the [X-Chain’s API](avalanchego-apis/exchange-chain-x-chain-api.md):

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

If your node isn’t finished bootstrapping, this call will return status `503` with message `API call rejected because chain is not done bootstrapping`.

Note that we make this request to `127.0.0.1:9650/ext/bc/X`. The `bc/X` portion signifies that the request is being sent to the blockchain whose ID \(or alias\) is `X` \(i.e., the X-Chain\).

The response should look like this:

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Your user now controls the address `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` on the X-Chain. To tell apart addresses on different chains, the Avalanche convention is for an address to include the ID or alias of the chain it exists on. Hence, this address begins `X-`, denoting that it exists on the X-Chain.

### Send Funds From Avalanche Wallet to Your Node

{% hint style="warning" %}
_**Note: the instructions below move real funds.**_
{% endhint %}

Let’s move funds from the Avalanche Wallet to your node.

Go to [Avalanche Wallet](https://wallet.avax.network). Click `Access Wallet`, then `Mnemonic Key Phrase`. Enter your mnemonic phrase.

Click the `Send` tab on the left. For amount, select, `.002` AVAX. Enter the address of your node, then click `Confirm`.

![web wallet send tab](../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%283%29.png)

We can check an address’s balance of a given asset by calling `avm.getBalance`, another method of the X-Chain’s API. Let’s check that the transfer went through:

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

Note that AVAX has the special ID `AVAX`. Usually an asset ID is an alphanumeric string.

The response should indicate that we have `2,000,000 nAVAX` or `0.002 AVAX`.

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

### Send AVAX

Now, let’s send some AVAX by making an API call to our node:

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

`amount` specifies the number of nAVAX to send.

If you want to specify a particular address where change should go, you can specify it in `changeAddr`. You can leave this field empty; if you do, any change will go to one of the addresses your user controls.

In order to prevent spam, Avalanche requires the payment of a transaction fee. The transaction fee will be automatically deducted from an address controlled by your user when you issue a transaction. Keep that in mind when you’re checking balances below.

{% page-ref page="../learn/platform-overview/transaction-fees.md" %}

When you send this request, the node will authenticate you using your username and password. Then, it will look through all the [private keys](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) controlled by your user until it finds enough AVAX to satisfy the request.

The response contains the transaction’s ID. It will be different for every invocation of `send`.

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

#### Checking the Transaction Status

This transaction will only take a second or two to finalize. We can check its status with [`avm.getTxStatus`](avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

The response should indicate that the transaction was accepted:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

You might also see that `status` is `Processing` if the network has not yet finalized the transaction.

Once you see that the transaction is `Accepted`, check the balance of the `to` address to see that it has the AVAX we sent:

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

The response should be:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

In the same fashion, we could check `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` to see that AVAX we sent was deducted from its balance, as well as the transaction fee.

{% page-ref page="tutorials/nodes-and-staking/add-a-validator.md" %}

{% page-ref page="tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="tutorials/platform/create-a-new-blockchain.md" %}

{% page-ref page="tutorials/platform/create-a-subnet.md" %}

{% page-ref page="avalanchego-apis/" %}

{% page-ref page="references/" %}

<!--stackedit_data:
eyJoaXN0b3J5IjpbNjAzMTU5NjMsLTE5Mjg0MzUzODMsLTE3Mj
I2MTY1ODldfQ==
-->