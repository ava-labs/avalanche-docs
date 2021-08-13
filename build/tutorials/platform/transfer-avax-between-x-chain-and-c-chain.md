# Transferir AVAX Entre la cadena X y la cadena C-

## Introducción

Las fichas AVAX existen en la cadena X, donde se pueden comerciar, en la cadena P, donde pueden ser proporcionadas como una estaca al validar la Red Primaria, y en la cadena C-Chain, donde pueden ser utilizadas en contratos inteligentes o para pagar por gas. En este tutorial, enviaremos tokens AVAX entre la cadena X y la cadena C.

## Requisitos para requisitos de seguridad

Has completado [Run Nodo](../nodes-and-staking/run-avalanche-node.md) Avalanche y estás familiarizado con [la arquitectura de Avalanche](../../../learn/platform-overview/).

Para enviar AVAX, ¡tienes que tener algo de AVAX! Puede obtener AVAX real comprándolo en un intercambio, o puede obtener AVAX testnet desde el [Grifo de prueba](https://faucet.avax-test.network) AVAX, que es una forma libre y fácil de jugar con Avalanche.

## Transferir AVAX utilizando la cartera web

La forma más fácil de transferir AVAX entre cadenas es utilizar [la Cartera](https://wallet.avax.network/) Avalanche, que es una forma no privativa y segura de acceder y mover AVAX.

El código fuente de la cartera de Avalanche se puede encontrar [aquí](https://github.com/ava-labs/avalanche-wallet).

### Paso 1 - Abra la Cartera Avalanche

![Imagen para post](../../../.gitbook/assets/wallet-x2p-01-login.png)

Seleccione **Access Wallet** para entrar en su billetera. Para conectar la cartera a una red distinta de la red Avalanche principal, seleccione **Mainnet** y elija la red a la que conectarse.

### Paso 2 - Inicia sesión en tu billetera

Puede acceder a su cartera utilizando la clave privada, la frase de clave mnemonic, el archivo de keystore o las transferencias de Ledger Nano S. C-Chain vía Ledger no están compatibles todavía.

![Imagen para post](../../../.gitbook/assets/wallet-x2p-02-access.png)

Después de un inicio de sesión exitoso, verá su balance, cartera de activos y otra información.

### Paso 3 - Ve a la pestaña de cadena cruzada

![Imagen para post](../../../.gitbook/assets/wallet-x2p-03-earn.png)

Funcionalidad para transferir fichas entre cadenas está en la pestaña **Cadena** cruzada.

### Paso 4 - Ingrese la cantidad de transferencia

Se le presentará una opción para **cadena de origen** y cadena de **destino**. Seleccione Cadena X y Cadena C-Chain, respectivamente. Verá sus saldos X y C, y un campo de entrada para introducir la cantidad que se transferirá de fuente a cadena de destino.

![Imagen para post](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

Introduzca el importe que desea transferir de la cadena X a la cadena C-Chain.

### Paso 5 - Confirme la transacción

![Imagen para post](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

Presione **Confirm**, y luego **Transferir** para iniciar la transferencia.

### Paso 6 - ¡Hecho!

Una transferencia de cadena cruzada es un proceso de dos pasos: primero una transacción para exportar los fondos de la cadena X, y otro para importarlo a la cadena C. La cartera hará tanto y mostrará su progreso mientras lo hace.

![Imagen para post](../../../.gitbook/assets/wallet-x2c-03-done.png)

¡Eso es! ¡Ha transferido AVAX de la cadena X a la cadena C-Chain! Ahora puedes usarlos para implementar contratos inteligentes en C-Chain.

### Transferencia de la cadena C a la cadena X

Para devolver el AVAX de vuelta a la cadena X, es necesario hacer la transferencia en la dirección opuesta.

Intercambiar la fuente y la cadena de destino, seleccionándolas en el menú desplegable **Fuente** y **Destino.** El resto del proceso es el mismo: introducir la cantidad, confirmar y transferir.

## Transferir de la cadena X a la cadena C con llamadas API

Si estás construyendo una aplicación en la red Avalanche, es posible que desee hacer la transferencia programática como parte de alguna funcionalidad más amplia. Puede hacer eso llamando a las API apropiadas en un nodo AvalancheGo. El resto del tutorial asume que tienes acceso a un nodo AvalancheGo, tokens AVAX en la cadena X, y credenciales de usuario [creadas](../../avalanchego-apis/keystore-api.md#keystorecreateuser) y almacenadas en la tienda de llaves del nodo.

Todas las llamadas API de ejemplo a continuación asumen que el nodo se ejecuta localmente \(es decir, escuchando en `127.0.0.1`\). El nodo se puede conectar a la red principal, a una red de pruebas o a una red local. En cada caso, las llamadas y respuestas de API deben ser las mismas, excepto los formatos de direcciones. El nodo no necesita ser local; puede hacer llamadas a un nodo alojado en otro lugar.

Como puede haber notado mientras transfiere AVAX utilizando la Cartera Avalanche, una transferencia de cadena cruzada es una operación de dos transacciones:

* Exportar AVAX desde la cadena X-
* Importar AVAX a la cadena C-

Antes de que podamos hacer la transferencia, necesitamos configurar la dirección en la cadena C-Chain, junto con la tecla controladora.

### Configurar la dirección y la clave en la cadena C

La cadena X utiliza direcciones [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) y la cadena C-Chain utiliza direcciones hex Ethereum Virtual Machine \(EVM\). No hay forma de convertir la dirección de un formato a otro ya que ambos se derivan de una clave privada utilizando una función criptográfica de una sola vía.

Para poder subirlo, puede exportar una clave privada desde la cadena X y luego importarla a la cadena C-Chain. De esta manera, puede utilizar la dirección de la cadena X y cambiar el prefijo X- a un prefijo C- para obtener la dirección Bech32 correcta para usar para la cadena C-Chain.

En primer lugar, exportar una clave privada de la cadena X:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "X-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Respuesta:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}
```

Ahora, importa la misma clave privada a la cadena C:

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.importKey",
    "params" :{
        "username" :"myUsername",   
        "password":"myPassword",    
        "privateKey":"PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

La respuesta contiene una dirección EVM codificada hex-:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Ahora tenemos todo lo que necesitamos para transferir las fichas.

### Transferencia de la cadena X a la cadena C-Chain

Utilice la dirección correspondiente a la clave privada que exportó y cambie a utilizar el prefijo C- en la llamada [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax):

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"C-avax1jggdngzc9l87rgurmfu0z0n0v4mxlqta0h3k6e",   
        "destinationChain": "C",    
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Dado que su usuario de keystore posee la clave privada correspondiente en la cadena C, ahora puede importar el AVAX a la dirección de su elección. No es necesario importarla a la misma dirección a la que se exportó; puede importar el AVAX a una dirección que posee en MetaMask u otro servicio de terceros.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,    
    "method" :"avax.importAVAX",    
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",  
        "sourceChain":"X",  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

donde es una `dirección` EVM hex-encoded de su elección.

La respuesta parece así:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },  
    "id": 1
}
```

Nota: no hay comisión de transacción por transacciones de importación a la cadena C.

Una vez que su AVAX haya sido transferido a la cadena C, puede usarlo para desplegar e interactuar con contratos inteligentes.

## Transferencia de la cadena C a la cadena X-

Ahora, puedes mover AVAX de vuelta de la cadena C a la cadena X. Primero necesitamos exportar:

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.exportAVAX",
    "params" :{
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",   
        "amount": 5000000,  
        "username":"myUsername",    
        "password":"myPassword"
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

donde está la dirección codificada bech32 de una dirección de cadena X que `sostenga.` Asegúrese de que la cantidad que excede la cuota de transacción porque tanto las transacciones de exportación como las de importación cobrarán una cuota de transacción.

La respuesta debería parecer así:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1
}
```

Para terminar la transferencia, llame a [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax).

```cpp
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method": "avm.importAVAX",
    "params": {
        "username":"myUsername",    
        "password":"myPassword",    
        "sourceChain": "C",
        "to":"X-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

donde está la dirección codificada bech32 la dirección de la cadena X a `la` que envió los fondos en el paso anterior.

La respuesta debería parecer así:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1
}
```

## Envoltura hacia arriba

¡Eso es todo! Ahora, puede intercambiar AVAX de ida y vuelta entre la cadena X y C-Chain, tanto utilizando la Cartera Avalanche, como llamando a las llamadas API apropiadas en un nodo Avalanche.

