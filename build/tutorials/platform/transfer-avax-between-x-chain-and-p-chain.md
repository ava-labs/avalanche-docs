# Transferir AVAX Entre la cadena X y la cadena P-

## Introducción

Las fichas AVAX existen en la cadena X, donde se pueden comerciar, en la cadena P, donde pueden ser proporcionadas como una estaca al validar la Red Primaria, y en la cadena C-Chain, donde pueden ser utilizadas en contratos inteligentes o para pagar por gas. Avalanche apoya el movimiento de AVAX entre estas cadenas y en el futuro, Avalanche apoyará los cambios atómicos más genéricos entre las cadenas. En este tutorial, enviaremos tokens AVAX entre la cadena X y la cadena P.

## Requisitos para requisitos de seguridad

Has completado [el inicio](../nodes-and-staking/run-avalanche-node.md) de la sesión y estás familiarizado con [la arquitectura de Avalanche](../../../learn/platform-overview/).

Para enviar AVAX, ¡tienes que tener algo de AVAX! Puede obtener AVAX real comprándolo en un intercambio, o puede obtener AVAX testnet desde el [Grifo de prueba](https://faucet.avax-test.network) AVAX, que es una forma libre y fácil de jugar con Avalanche.

## Transferir AVAX Usando la cartera web

La forma más fácil de transferir AVAX entre cadenas es utilizar [la Cartera Avalanche](https://wallet.avax.network/), que es una forma no privativa y segura de acceder y mover AVAX.

El código fuente de la cartera de Avalanche se puede encontrar [aquí](https://github.com/ava-labs/avalanche-wallet).

### Paso 1 - Abra la Cartera Avalanche

![Imagen para post](../../../.gitbook/assets/wallet-x2p-01-login.png)

Seleccione **Access Wallet** para entrar en su billetera. Para conectar la cartera a una red distinta de la red Avalanche principal, seleccione **Mainnet** y elija la red a la que conectarse.

### Paso 2 - Inicia sesión en tu billetera

Puede acceder a su cartera utilizando la clave privada, la frase de clave mnemonic, el archivo de keystore o Ledger Nano S.

![Imagen para post](../../../.gitbook/assets/wallet-x2p-02-access.png)

Después de un inicio de sesión exitoso, verá su balance, cartera de activos y otra información.

### Paso 3 - Ve a la pestaña de cadena cruzada

![Imagen para post](../../../.gitbook/assets/wallet-x2p-03-earn.png)

Funcionalidad para transferir fichas entre cadenas está en la pestaña **Cadena** cruzada.

### Paso 4 - Ingrese la cantidad de transferencia

Se le presentará una opción para **cadena de origen** y cadena de **destino**. Seleccione Cadena X y Cadena P-Chain, respectivamente. Verá sus saldos X y P, y un campo de entrada para introducir la cantidad que se transferirá de fuente a cadena de destino.

![Imagen para post](../../../.gitbook/assets/wallet-x2p-05-x-p.png)

Introduzca el importe que desea transferir de la cadena X a la cadena P-Chain.

### Paso 5 - Confirme la transacción

![Imagen para post](../../../.gitbook/assets/wallet-x2p-06-confirm.png)

Presione **Confirm**, y luego **Transferir** para iniciar la transferencia.

### Paso 6 - ¡Hecho!

Una transferencia de cadena cruzada es un proceso de dos pasos: primero una transacción para exportar los fondos de la cadena X, y otro para importarlo a la cadena P. La cartera hará tanto y mostrará su progreso mientras lo hace.

![Imagen para post](../../../.gitbook/assets/wallet-x2p-07-transfer.png)

¡Eso es! ¡Ha transferido AVAX de la cadena X a la cadena P-Chain! Ahora puede usarlos para validar o delegar en la red Avalanche.

### Transferencia de Cadena P a Cadena X-Chain

Para devolver el AVAX de vuelta a la cadena X, es necesario hacer la transferencia en la dirección opuesta.

Intercambiar las cadenas de origen y destino seleccionándolas en el menú desplegable **Fuente** y **Destino.** El resto del proceso es el mismo: introducir la cantidad, confirmar y transferir.

## Transferir de la cadena X a la cadena P con llamadas API

Si estás construyendo una aplicación en la red Avalanche, es posible que desee hacer la transferencia programática como parte de alguna funcionalidad más amplia. Puede hacer eso llamando a las API apropiadas en un nodo AvalancheGo. El resto del tutorial asume que tienes acceso a un nodo AvalancheGo, tokens AVAX en la cadena X, y credenciales de usuario [creadas](../../avalanchego-apis/keystore-api.md#keystorecreateuser) y almacenadas en la tienda de llaves del nodo.

Todas las llamadas API de ejemplo a continuación asumen que el nodo se ejecuta localmente \(es decir, escuchando en `127.0.0.1`\). El nodo se puede conectar a la red principal, a una red de pruebas o a una red local. En cada caso, las llamadas y respuestas de API deben ser las mismas, excepto los formatos de direcciones. El nodo no necesita ser local; puede hacer llamadas a un nodo alojado en otro lugar.

Como puede haber notado mientras transfiere AVAX utilizando la Cartera Avalanche, una transferencia de cadena cruzada es una operación de dos transacciones:

* Exportar AVAX desde la cadena X-
* Importar AVAX a la cadena P

### Paso 1 - Exportar AVAX desde la cadena X-

Para exportar AVAX, llame al método [`avm.exportAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-exportavax) de la X-Chain’s

Tu llamada debería parecer así:

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

donde está la dirección de una dirección de la cadena P sus controles `de` usuario y `changeAddr` es la dirección a la que enviar cualquier cambio a. Puede dejar `changeAddr` en blanco; si lo deja en blanco, el cambio se devolverá a una dirección controlada por su usuario \(consulte [aquí](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) las instrucciones sobre la creación de una nueva dirección de cadena P).

Tenga en cuenta que usted pagará una cuota de transacción tanto para las operaciones de exportación como para las importaciones. En este ejemplo, asumamos que la tarifa de transacción es `.001` AVAX. Luego, la exportación anterior realmente consume `.006` AVAX; `.005` va a la cadena P y `.001` se quema como una tasa de transacción.

Asegúrese de que la cantidad que usted está enviando excede la cuota de transacción. De lo contrario, cuando importes AVAX en la cadena P, consumirá la tarifa de transacción, y terminará con _menos_ AVAX en la cadena P.

La respuesta debería parecer así:

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

Podemos verificar que esta transacción fue aceptada llamando a [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

Lo que muestra nuestra transacción aceptada:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

También podemos llamar a [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) para comprobar que el AVAX fue deducido de una dirección sostenida por nuestro usuario:

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

La cantidad deducida es la cantidad exportada \(`.005` AVAX en este ejemplo\) más la cuota de transacción. Si su usuario controla varias direcciones de cadena X, AVAX puede haber sido enviado desde cualquier combinación de ellas.

### Paso 2 - Importar AVAX a la cadena P

Nuestro traslado no ha terminado todavía. Necesitamos llamar a la [`plataforma`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-importavax) de la cadena P-Chain’s método para terminar la transferencia.

Tu llamada debería parecer así:

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

Esto devuelve el ID de la transacción:

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

Podemos comprobar que la transacción fue aceptada con:

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

Debe `ser comprometido`, lo que significa que la transferencia está completa. También podemos comprobar el saldo de la dirección con:

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

La respuesta debería parecer así:

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

Tenga en cuenta que el saldo que vemos es el importe exportado desde la X-Chain \(`.004` AVAX\) menos la cuota de transacción \(`.001` AVAX en este ejemplo\). Ahora, podemos utilizar el AVAX que mantiene esta dirección de la cadena P para proporcionar una participación para validar la Red Primaria.

## Transferir de la cadena P a la cadena X programática

Ahora, vamos a mover AVAX de la cadena P de vuelta a la cadena X.

Igual que antes, esta es también una operación de dos transacciones:

* Exportación de la cadena P
* Importar a la cadena X

### Paso 1 - Exportar AVAX desde la cadena P

Para ello, llame a [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax):

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

donde está la `dirección` de la cadena X se está enviando a AVAX.

Esto devuelve el ID de transacción, y podemos comprobar que la transacción se cometió con otra llamada a [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-gettxstatus). De nuevo, asegúrese de que la cantidad que está enviando excede la cuota de transacción.

### Paso 2 - Importar AVAX a cadena X

Para terminar nuestra transferencia de la cadena P a la cadena X-Chain, llame a [`avm.importAVAX`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-importavax):

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

Tenga en cuenta que `es` la misma dirección especificada en nuestra llamada a [`platform.exportAVAX`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-exportavax).

Al igual que antes, podemos llamar a [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) para verificar que los fondos fueron recibidos. El saldo debería haber aumentado en `003` AVAX menos la tasa de transacción.

## Envoltura hacia arriba

¡Eso es todo! Ahora, puede intercambiar AVAX de ida y vuelta entre la cadena X y la cadena P-Chain, tanto utilizando la Cartera Avalanche, como llamando a las llamadas API apropiadas en un nodo Avalanche.

Ahora puede utilizar las fichas de la cadena P para [agregar un nodo como validador](../nodes-and-staking/add-a-validator.md) en la Red Primaria.

