# Avalanche Native Tokens y ARC-20

## ¿Qué es una Token Nativa Avalanche?

Un token nativo de Avalanche \(ANT\) es un token de tapa fija o variable creado en la cadena X. Estas fichas pueden intercambiarse a velocidades rápidas de rayo en la cadena X, que aprovecha el rendimiento superior de un DAG sobre una cadena lineal. En este documento, las fichas nativas de Avalanche no incluyen tokens no fungibles \(NFTs\) creadas en la cadena X.

## ¿Por qué mover un ANT de la cadena X a la cadena C-Chain?

La funcionalidad del contrato inteligente requiere un pedido total de transiciones de estado \(transacciones\). Como resultado, las ANTs deben trasladarse a la cadena C si se utilizan en contratos inteligentes.

## Fichas en la cadena C

### AVAX

AVAX juega el mismo papel en la cadena C que ETH hace en la Red Ethereum. Cuando crea o llama un contrato inteligente, paga la tarifa de transacción \(costo de gas) con AVAX. Puede transferir AVAX entre cuentas y enviar AVAX a un contrato inteligente utilizando herramientas y bibliotecas nativas EVM.

### ANT

Sin embargo, las ANTs no tienen contraparte dentro del MV. Por lo tanto, la cadena C tiene algunas modificaciones para apoyar los saldos ANT y transferir ANTs en la cadena C.

La cadena C mantiene una asignación \[assetID -> balance\] en el almacenamiento de cada cuenta para apoyar ANTs. Estas fichas pueden ser exportadas de nuevo a la cadena X, o pueden utilizarse en la cadena C utilizando `nativeAssetCall``` y `nativeAssetBalance```. nativeAssetCall y nativeAssetCall son contratos precompilados liberados en la fase 2 de Apricot que permiten un uso más rico de ANTs en la cadena C.

#### nativeAssetCall

Una Transacción EVM está compuesta por los siguientes campos:

* Valor de la **`escala`** igual al número de transacciones enviadas por el remitente.
* **`gasPrice`** Valor escalar igual al número de Wei \(1 Wei = 10^-18 AVAX\) pagado por unidad de gas para ejecutar esta transacción.
* **`gasLimit`** Valor escalar igual a la cantidad máxima de gas que debe utilizarse para ejecutar esta transacción.
* **`a`** La dirección de 20 bytes del destinatario de la llamada de mensajes. Si la transacción está creando un contrato, `para` dejar vacío.
* **`valor`** Valor escalar de los activos nativos \(AVAX\), en Wei \(1 Wei = 10^-18 AVAX\), que se transferirá al destinatario de la llamada de mensaje o en el caso de una creación de contrato, como dotación al contrato recién creado.
* **`v, r, s`** Valores correspondientes a la firma de la transacción.
* **`datos`** matriz de byte de tamaño ilimitado especificando los datos de entrada a una llamada de contrato o, si se crea un contrato, el bytecode EVM para el proceso de inicialización de la cuenta.

`nativeAssetCall``` es un contrato precompilado en la dirección `0x01002`. nativeAssetCall permite a los usuarios transferir atomically un activo nativo a una dirección determinada y, opcionalmente, hacer una llamada de contrato a esa dirección. Esto es paralelo a cómo una transacción normal puede enviar valor a una dirección y llamar atomically esa dirección con algunos `datos`.

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

Estos argumentos pueden ser embalados por `abi.encodePacked(...)` en abi.encodePacked(...) ya que solo hay un argumento con longitud variada \(`callData`\). Los tres primeros argumentos son de longitud constante, por lo que el contrato precompilado simplemente analiza la entrada de llamada como:

```text
+-------------+---------------+--------------------------------+
| address     : address       |                       20 bytes |
+-------------+---------------+--------------------------------+
| assetID     : uint256       |                       32 bytes |
+-------------+---------------+--------------------------------+
| assetAmount : uint256       |                       32 bytes |
+-------------+---------------+--------------------------------+
| callData    : bytes memory  |            len(callData) bytes |
+-------------+---------------+--------------------------------+
                              |       84 + len(callData) bytes |
                              +--------------------------------+
```

**Ejemplo de ello**

Por ejemplo, enviar un ANT con un asset de `2nzgmhZLuVq8jc7NNu2eakKwoJcbFXWJCxHBWAJEZkhquK` de la dirección `0x8db97C7cE249c2b98bDC026Cc4C2A57BF52FC``` para dirigirse a `0xD1749831fbF70d8AB7b07CD9c53D054a57`, convertir primero el assetID a hex, 0xec21e629d1252b3540e9d174a63af0814176612e968154612e9681546154661, por ejemplo, para enviar un ANT A continuación concatenar la dirección que está recibiendo la ANT, la identificación de `activos` y el assetAmount y POST el valor como param `de datos` a la dirección de la RPC de `eth_sendTransaction`.

```text
curl --location --request POST 'https://api.avax.network:443/ext/bc/C/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_sendTransaction",
    "params": [
        {
            "to": "0x0100000000000000000000000000000000000002",
            "from": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
            "value": "",
            "gas": "0x2DC6C0",
            "gasPrice": "0x34630B8A00",
            "data": "0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57ec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7000000000000000000000000000000000000000000000000000000000000012c"
        }
    ]
}'
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x451ffb79936be1baba438b591781192cbc9659d1f3a693a7a434b4a93dda639f"
}
```

#### nativeAssetBalance

`nativeAssetBalance``` es un contrato precompilado en la dirección `0x01001`. nativeAssetBalance es el equivalente ANT de utilizar `el saldo` para obtener el saldo AVAX.

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

Estos argumentos pueden ser embalados por `abi.encodePacked(...)` en Solidez ya que todos los argumentos tienen longitud constante.

```text
+-------------+---------------+-----------------+
| address     : address       |        20 bytes |
+-------------+---------------+-----------------+
| assetID     : uint256       |        32 bytes |
+-------------+---------------+-----------------+
                              |        52 bytes |
                              +-----------------+
```

**Ejemplo de ello**

Por ejemplo, para obtener el saldo de dirección `0x8db97C7cE249c2b98bDC0226Cc4C2A57BF52FC` y asset `2nzgmhZLuVq8jc7NNu2eakwoJcbFWXWJCxHBVWAJEZkhquK`, primero convertir el activo a hex, `0xec21e629d1252b3540e9d2fcd174a63af081417ea682612e96815463b8a41d7`. Siguiente concatenar la dirección y el assetID y POST el valor como param `de datos` a la dirección de `la 0x01001` utilizando la dirección `eth_call` RPC.

```text
curl --location --request POST 'https://api.avax.network:443/ext/bc/C/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [
        {
            "to": "0x0100000000000000000000000000000000000001",
            "data": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FCec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7"
        },
        "latest"
    ]
}'
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x000000000000000000000000000000000000000000000000000000000000012c"
}
```

## ARC-20

Un ARC-20 es una muestra ERC-20 que envuelve un Token nativo de Avalanche, similar a cómo WAVAX envuelve AVAX a AVAX.

### ¿Qué es un ERC-20

Un ERC-20 es un tipo de token estandarizado en Ethereum. Presenta un conjunto estándar de funciones y eventos que permiten que un contrato inteligente sirva como símbolo en Ethereum. Para obtener una explicación completa, lea la propuesta original [aquí](https://eips.ethereum.org/EIPS/eip-20).

ERC-20 exponen la siguiente interfaz:

```text
// Functions
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

// Events
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

Un ERC-20 se implementa mediante un contrato inteligente, lo que significa que mantienen su propio estado. Es decir, si su cuenta posee 5 de un ERC-20 determinado, entonces los datos que da la propiedad de su cuenta se almacenan en realidad en el contrato de ERC-20. Por el contrario, un saldo ETH se mantiene en el almacenamiento de su propia cuenta.

### De ANT a ARC-20

A diferencia de ERC-20s, Avalanche Native Tokens \(ANTs\) se almacenan directamente en la cuenta que los posee. Las ANTs pueden ser "envueltas" para que puedan utilizarse en contratos inteligentes en la cadena C. Llamamos a este activo envuelto un ARC-20. Para ello, añadimos un campo `de activos` a un contrato ordinario ERC-20 para representar el activo subyacente que envuelve el ARC-20.

Además, el contrato ARC-20 apoya dos funciones adicionales: `retirar` y `depósito`. Para implementar esto, ARC-20 necesita utilizar los contratos precompilados: `nativeAssetCall` y `nativeAssetBalance`.

#### Saldo del contrato / Suministro total

Los ERC-20 suelen tener un campo de suministro total, pero esto puede significar cosas diferentes en el contexto de un activo envuelto. El suministro total podría indicar el suministro total del activo no envuelto en toda la plataforma o la cantidad del activo en el contrato de envoltorio.

Para la simplicidad, utilizamos el suministro total para indicar el suministro total del activo envuelto en el contrato ARC-20.

#### ARC-20 Depósitos

Para depositar fondos en un ARC-20, necesitamos enviar el contrato ARC-20 el importe del depósito y luego invocar la función de depósito del contrato para que el contrato pueda reconocer el depósito y actualizar el saldo del llamante. Esto es similar a WETH \(EH\) en Ethereum. Con WETH, esto puede lograrse con una llamada simple, porque ese método permite `que` la persona que llama envíe ETH e invoque un contrato inteligente atomically. Con no non-AVAX ARC-20s, `nativeAssetCall` permite la misma funcionalidad para ANTs en la cadena C.

Por ejemplo:

* **`no ce`**: 2
* **`gasPrice`**: 225 gwei
* **`Límite`**: 3000
* **`a`**: `0x01002`
* **`valor`**: 0
* **`v, r, s`**: \[Firma de transacción\]
* **`datos`**: abi.encodePacked\(arc20Dirección, assetID, abi.encodePacked\(arc20Address, abi.encodeWithSignature\("Deposit\(\)"\)\)

Este `activo` transfiere Importe de `la identificación` de activos a la dirección del contrato ARC-20 y luego llama `a Deposit()` en el contrato.

La función de depósito utiliza el valor anterior del suministro total para calcular cuánto de `la identificación` de activos ha recibido en el depósito.

Nota: el saldo del contrato de `la identificación` de activos puede quedar fuera de sincronización con el suministro total si alguien envía fondos al contrato sin llamar a `depósito()`. En este caso, la siguiente cuenta que llama `Deposit()` recibiría crédito por los fondos previamente enviados.

```go
    function deposit() public {
        uint256 updatedBalance = NativeAssets.assetBalance(address(this), _assetID);
        uint256 depositAmount = updatedBalance - _totalSupply;
        assert(depositAmount >= 0);

        _balances[msg.sender] += depositAmount;
        _totalSupply = updatedBalance;
        emit Deposit(msg.sender, depositAmount);
    }
```

#### Retiros ARC-20

Cuando un contrato ARC-20 recibe una solicitud de retirada, simplemente verifica que hay un saldo suficiente de la cuenta, actualiza el saldo y el suministro total, y envía los fondos al withdrawer con `nativeAssetCall`. La función de retirada ARC-20 se ve así:

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

