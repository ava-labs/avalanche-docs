# Transferir AVAX entre la X-Chain y la C-Chain

## Introducción

Los Tokens de AVAX existen en la X-Chain, donde se pueden tradear, en la P-Chain, donde se pueden proporcionar como stake al validar la Red Primaria, y en la C-Chain, donde se pueden utilizar en smart contracts o para pagar el gas. En este tutorial, enviaremos tokens de AVAX entre la X-Chain y la C-Chain.

## Requisitos

Has completado [Ejecutar un nodo](../nodes-and-staking/run-avalanche-node.md) de Avalanche y están familiarizados con [la arquitectura de](../../../learn/platform-overview/) Avalanche.

¡Para poder enviar AVAX, necesitas tener algo de AVAX! Puedes obtener AVAX real comprándolo en un exchange, o puedes obtener AVAX de prueba de testnet desde el [Faucet](https://faucet.avax-test.network) de pruebas de AVAX, que es una forma libre y fácil de jugar con Avalanche.

## Transferir AVAX usando la Wallet Web

La forma más fácil de transferir AVAX entre las blockchains es usar [la billetera](https://wallet.avax.network/) de Avalanche que es una forma no privativa y segura de acceder y mover AVAX.

El código de [fuente](https://github.com/ava-labs/avalanche-wallet) de Avalanche

### Paso 1 - Abre la Wallet de Avalanche

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-01-login.png)

Selecciona la billetera de **acceso **para entrar en tu billetera. Para conectar la billetera a una red distinta de la red principal de Avalanche, selecciona **Mainnet **y elige la red a la que se conectar.

### Paso 2 - Iniciar Sesión en tu Wallet

Puedes acceder a tu wallet utilizando el private key, la frase mnemónica, el archivo keystore o Ledger Nano S. Las transferencias de C-Chain a través de Ledger no están soportadas todavía.

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-02-access.png)

Después de un inicio de sesión exitoso, verás tu saldo, tu portafolio de activos y otra información diversa.

### Paso 3 - Ve a la pestaña de Cross Chain

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-03-earn.png)

La funcionalidad para transferir tokens entre tokens está en la pestaña de la blockchain ****Cross.

### Paso 4 - Introduce la Cantidad a Transferir

Te presentarán una opción para la blockchain de **origen **y la blockchain de ****destino. Selecciona X-Chain y C-Chain, respectivamente. Verás tus saldos X y C, y un campo de entrada para ingresar el monto a transferir de la cadena de origen a la de destino.

![Imagen para correo](../../../.gitbook/assets/wallet-x2c-01-x-c.png)

Introduce la cantidad que deseas transferir desde la X-Chain a la C-Chain.

### Paso 5 - Confirma la Transacción

![Imagen para correo](../../../.gitbook/assets/wallet-x2c-02-trasnfer.png)

Prensa ****Confirm, y luego **Transfiere **para iniciar la transferencia.

### Paso 6 - Listo!

La transferencia entre cadenas es un proceso de dos pasos: primero una transacción para exportar los fondos de la X-Chain y otra para importarlos a la C-Chain. La Wallet hará ambas cosas y mostrará su progreso mientras lo hace.

![Imagen para correo](../../../.gitbook/assets/wallet-x2c-03-done.png)

¡Eso es todo! ¡Has transferido AVAX de la X-Chain a la C-Chain! Ahora puedes usarlos para implementar contratos inteligentes en C-Chain.

### Transferir desde la C-Chain a la X-Chain

Para devolver AVAX de vuelta a la X-Chain, tienes que hacer la transferencia en la dirección opuesta.

Intercambia la fuente y la blockchain de destino, seleccionándolas en el menú **desplegable de **origen **y **destino. El resto del proceso es el mismo: introducir el importe, confirmar y transferir.

## Transferencia de la X-Chain a la C-Chain con llamados API

Si estás construyendo una aplicación en la red de Avalanche, tal vez quieras hacer la transferencia programada como parte de una funcionalidad más amplia. Puedes hacerlo llamando a las API adecuadas en un nodo de AvalancheGo. El resto del tutorial asume que tienes acceso a un nodo de AvalancheGo, tokens de AVAX en la X-Chain, y credenciales de usuario [creadas](../../avalanchego-apis/keystore-api.md#keystorecreateuser) y almacenadas en la tienda de claves del nodo.

Todas las llamadas de API de ejemplo asumen que el nodo se está ejecutando localmente \(es decir, escuchando en `127.0.0.1`\). El nodo puede conectarse a la red principal, a una red de prueba o a una red local. En cada caso, los llamados y respuestas de la API deben ser las mismas, excepto en lo que respecta a los formatos de dirección. No es necesario que el nodo sea local; se pueden hacer llamados a un nodo alojado en otro lugar.

Como puedes haber notado al transferir AVAX usando la Wallet de Avalanche, una transferencia cross-chain es una operación de dos transacciones:

* Exportar AVAX desde la X-Chain
* Importar AVAX a la C-Chain

Antes de que podamos hacer la transferencia, tenemos que establecer la dirección en la C-Chain, junto con la control key.

### Configurar la Dirección y la Clave en la C-Chain

La X-Chain utiliza direcciones [Bech32](http://support.avalabs.org/en/articles/4587392-what-is-bech32) y la C-Chain utiliza direcciones hex Ethereum Virtual Machine \(EVM\). No hay forma de convertir la dirección de un formato a otro, ya que ambos se derivan de una private key usando una función criptográfica unidireccional.

Para evitar esto, puedes exportar una private key de la X-Chain y luego importarla a la C-Chain. De esta manera, puedes usar la dirección de la X-Chain y cambiar el prefijo X- por un prefijo C- para obtener la dirección Bech32 correcta para la C-Chain

Primero, exporta una private key de la X-Chain:

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

Ahora, importa la misma private key en la C-Chain:

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

La respuesta contiene una dirección EVM codificada en hexadecimal:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0x5Bf544EF123FE41B262295dBA41c5a9CFA8efDB4"
    },
    "id": 1
}
```

Ahora tenemos todo lo que necesitamos para transferir los tokens.

### Transferir desde la X-Chain a la C-Chain

Usa la dirección correspondiente a la clave privada que to y cambia a usar el prefijo C- en la [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax)llamada:

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

Dado que el usuario de tu keystore posee la correspondiente private key en la C-Chain, ahora puedes importar los AVAX a la dirección que elijas. No es necesario importarla a la misma dirección a la que se exportó; puedes importar la AVAX a una dirección que posees en MetaMask u otro servicio de terceros.

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

donde `to`es una dirección de EVM de código hex-encoded de tu elección.

La respuesta se ve así:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },  
    "id": 1
}
```

Nota: No se cobra ninguna comisión por las transacciones de importación a la C-Chain.

Una vez que tus AVAX han sido transferidos a la C-Chain, puedes usarlos para desplegar e interactuar con smart contracts

## Transferir desde la C-Chain a la X-Chain

Ahora, puedes mover AVAX desde la C-Chain to the X-Chain. Primero necesitamos exportar:

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

donde `to`es la dirección codificada de bech32 de una dirección de X-Chain que mantenes. Asegúrate de que la cantidad que exportas excede la comisión de transacción porque tanto las transacciones de exportación como las de importación cobrarán una comisión de transacción.

La respuesta debería ser así:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2ZDt3BNwzA8vm4CMP42pWD242VZy7TSWYUXEuBifkDh4BxbCvj"    
    },  
    "id": 1
}
```

Para terminar la transferencia, llama [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax).

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

donde `to`está la dirección codificada de bech32 la dirección de X-Chain a la que enviaste los fondos en el paso anterior.

La respuesta debería ser así:

```cpp
{   
    "jsonrpc": "2.0",   
    "result": {
        "txID": "2kxwWpHvZPhMsJcSTmM7a3Da7sExB8pPyF7t4cr2NSwnYqNHni"    
    },  
    "id": 1
}
```

## Concluimos!

¡Eso es todo! Ahora, puedes intercambiar AVAX entre la X-Chain y la C-Chain, usando la Wallet de Avalanche, y haciendo llamados a la API apropiada en un nodo de Avalanche.

