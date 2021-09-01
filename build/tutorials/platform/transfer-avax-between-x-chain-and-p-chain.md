# Transferir AVAX entre la X-Chain y la P-Chain

## Introducción

Los Tokens de AVAX existen en la X-Chain, donde se pueden tradear, en la P-Chain, donde se pueden proporcionar como stake al validar la Red Primaria, y en la C-Chain, donde se pueden utilizar en smart contracts o para pagar el gas. Avalanche apoya el movimiento de AVAX entre estas cadenas, y en el futuro, Avalanche apoyará más intercambios atómicos genéricos entre cadenas. En este tutorial, enviaremos fichas AVAX entre la X-Chain y la P-Chain.

## Requisitos

Has completado [el inicio](../nodes-and-staking/run-avalanche-node.md) y estás familiarizado con [la arquitectura de Avalanche](../../../learn/platform-overview/).

¡Para poder enviar AVAX, necesitas tener algo de AVAX! Puedes obtener AVAX real comprándolo en un exchange, o puedes obtener AVAX de prueba de testnet desde el [Faucet](https://faucet.avax-test.network) de pruebas de AVAX, que es una forma libre y fácil de jugar con Avalanche.

## Transferir AVAX usando la Wallet Web

La forma más fácil de transferir AVAX entre las blockchains es usar [la billetera](https://wallet.avax.network/) de Avalanche, que es una forma no privativa y segura de acceder y mover AVAX.

El código de [fuente](https://github.com/ava-labs/avalanche-wallet) de Avalanche

### Paso 1 - Abre la Wallet de Avalanche

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-01-login.png)

Selecciona la billetera de **acceso **para entrar en tu billetera. Para conectar la billetera a una red distinta de la red principal de Avalanche, selecciona **Mainnet **y elige la red a la que se conectar.

### Paso 2 - Iniciar Sesión en tu Wallet

Puedes acceder a tu wallet utilizando el private key, la frase mnemónica, el archivo keystore o Ledger Nano S

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-02-access.png)

Después de un inicio de sesión exitoso, verás tu saldo, tu portafolio de activos y otra información diversa.

### Paso 3 - Ve a la pestaña de Cross Chain

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-03-earn.png)

La funcionalidad para transferir tokens entre tokens está en la pestaña de la blockchain ****Cross.

### Paso 4 - Introduce la Cantidad a Transferir

Te presentarán una opción para la blockchain de **origen **y la blockchain de ****destino. Selecciona X-Chain y P-Chain, espectivamente. Verás tus saldos X y P, y un campo de entrada para ingresar el monto a transferir de la cadena de origen a la de destino.

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

Introduce la cantidad que deseas transferir desde la X-Chain a la P-Chain.

### Paso 5 - Confirma la Transacción

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

Prensa ****Confirm, y luego **Transfiere **para iniciar la transferencia.

### Paso 6 - Listo!

La transferencia entre cadenas es un proceso de dos pasos: primero una transacción para exportar los fondos de la X-Chain y otra para importarlos a la P-Chain. La Wallet hará ambas cosas y mostrará su progreso mientras lo hace.

![Imagen para correo](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

¡Eso es todo! ¡Has transferido AVAX de la X-Chain a la P-Chain! Ahora puede usarlos para validar o delegar en la red de Avalanche.

### Transferir desde P-Chain a la X-Chain

Para devolver AVAX de vuelta a la X-Chain, tienes que hacer la transferencia en la dirección opuesta.

Intercambia las cadenas de origen y destino seleccionándolas en el menú desplegable **de **origen **y **destino. El resto del proceso es el mismo: introducir el importe, confirmar y transferir.

## Transferencia de la X-Chain a la P-Chain con llamados API

Si estás construyendo una aplicación en la red de Avalanche, tal vez quieras hacer la transferencia programada como parte de una funcionalidad más amplia. Puedes hacerlo llamando a las API adecuadas en un nodo de AvalancheGo. El resto del tutorial asume que tienes acceso a un nodo de AvalancheGo, tokens de AVAX en la X-Chain, y credenciales de usuario [creadas](../../avalanchego-apis/keystore-api.md#keystorecreateuser) y almacenadas en la tienda de claves del nodo.

Todas las llamadas de API de ejemplo asumen que el nodo se está ejecutando localmente \(es decir, escuchando en `127.0.0.1`\). El nodo puede conectarse a la red principal, a una red de prueba o a una red local. En cada caso, los llamados y respuestas de la API deben ser las mismas, excepto en lo que respecta a los formatos de dirección. No es necesario que el nodo sea local; se pueden hacer llamados a un nodo alojado en otro lugar.

Como puedes haber notado al transferir AVAX usando la Wallet de Avalanche, una transferencia cross-chain es una operación de dos transacciones:

* Exportar AVAX desde la X-Chain
* Importar AVAX a la P-chain

### Paso 1 - Exportar AVAX desde la X-Chain

Para exportar AVAX, llama el método de la [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax)X-Chain.

Tu solicitud debería verse así:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportAVAX",
    "params" :{
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "destinationChain": "P",
        "amount": 5000000,
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

donde `to`es la dirección de una dirección de P-Chain que controla tu usuario y `changeAddr`es la dirección para enviar cualquier cambio a la que te modificar. Puedes dejar en `changeAddr`blanco; si la dejas en blanco, el cambio se devolverá a una dirección controlada por tu usuario \(mira [aquí](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) para instrucciones sobre crear una nueva dirección P-Chain\).

Ten en cuenta que pagarás una comisión por las operaciones de exportación e importación. En este ejemplo, asumimos que la tarifa de transacción es `.001`AVAX. Luego, la exportación anterior consume `.006`AVAX; `.005`va a la P-Chain y se `.001`queman como una tarifa de transacción.

Asegúrate de que la cantidad que envías excede la comisión por la transacción. De lo contrario, cuando importes AVAX en la P-Chain, consumirá la tarifa de transacción, y terminarás con _menos _AVAX en la P-Chain.

La respuesta debería ser así:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
    },
    "id": 1
}
```

Podemos verificar que esta transacción fue aceptada llamando al [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus)llamar:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.getTxStatus",
    "params":{
        "txID":"MqEaeWc4rfkw9fhRMuMTN7KUTNpFmh9Fd7KSre1ZqTsTQG73h"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La cual nos muestra que nuestra transacción fué aceptada:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

También podemos llamar [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)para comprobar que la AVAX fue deducida de una dirección sostenida por nuestro usuario:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-ADDRESSGOESHERE",
        "assetID":"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La cantidad deducida es la cantidad exportada \( `.005`AVAX en este ejemplo\) más la tarifa de transacción. Si tu usuario controla múltiples direcciones de la X-Chain, el AVAX puede haber sido enviado desde cualquier combinación de ellas.

### Paso 2 - Importar AVAX a la P-Chain

Nuestra transferencia no ha terminado todavía. Necesitamos llamar el [`platform.importAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax)método de la P-Chain’s terminar la transferencia.

Tu solicitud debería verse así:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q",
        "sourceChain":"X",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword",
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Esto nos proporciona el ID de la transacción:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

Podemos comprobar que la transacción fué aceptada con:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Debería ser `Committed`, lo que significa que la transferencia está completa. También podemos comprobar el saldo de la dirección con:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBalance",
    "params":{
        "address":"P-avax1wkmfja9ve3lt3n9ye4qp3l3gj9k2mz7ep45j7q"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

La respuesta debería ser así:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "4000000",
        "utxoIDs": [
            {
                "txID": "2sxo3ySETZ4xzXqAtgsUvZ5pdkqG4SML4c7Z7NoKLZcp77YNXC",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

Tenga en cuenta que el saldo que vemos es la cantidad exportada desde la X-Chain \( AVAX\) menos la tarifa de transacción \( `.004``.001`AVAX en este ejemplo\). Ahora, podemos usar los AVAX de esta dirección de la P-Chain para proporcionar stake para validar la Red Primaria.

## Transfiriendo de la P-Chain a la X-Chain de Forma Programada

Ahora, movamos el AVAX de la P-Chain a la X-Chain.

Al igual que antes, esta también es una operación de dos transacciones:

* Exportar desde la P-Chain
* Importar a la X-Chain

### Paso 1 - Exportar AVAX desde la P-Cha

Para hacerlo, llama [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax):

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "amount":3000000,
        "changeAddr":"P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

donde `to`se envía la dirección de X-Chain a la que se envia.

Esto devuelve el ID de transacción y podemos comprobar que la transacción se ha comprometido con otra llamada [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus). Una vez más, asegúrate de que la cantidad que estás enviando supere la tarifa de transacción.

### Paso 2 - Importar AVAX a X-Chain

Para terminar nuestra transferencia de la P-Chain a la X-Chain, llama [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importAVAX",
    "params" :{
        "to":"X-avax1fjn5rffqvny7uk3tjegjs6snwjs3hhgcpcxfax",
        "sourceChain":"P",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Nota que `to`es la misma dirección especificada en nuestra llamada .[`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax)

Al igual que antes, podemos llamar [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)para verificar que los fondos fueron recibidos. El saldo debería haber aumentado por `.003`AVAX menos la tasa de transacción.

## Concluimos!

¡Eso es todo! Ahora, puedes intercambiar AVAX entre la X-Chain y la P-Chain, usando la Wallet de Avalanche, y ejecutando los llamados API apropiados en un nodo de Avalanche.

Ahora puedes usar los tokens en la P-Chain para [agregar un nodo como validador](../nodes-and-staking/add-a-validator.md) en la red primaria.

