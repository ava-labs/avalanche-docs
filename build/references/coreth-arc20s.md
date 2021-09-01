# Tokens nativos y ARC-20 s

## ¿Qué es una Token nativa de Avalanche?

Un token nativo de Avalanche \(ANT\) es un token de tapa fija o de variable creado en la X-Chain. Estos tokens pueden ser intercambiados a velocidades rápidas en la X-Chain, que aprovechan el rendimiento superior de un DAG sobre una cadena lineal. En este documento, las tokens de Avalanche Native no incluyen tokens no fungibles \(NFT\) creados en la X-Chain.

## ¿Por qué mover un ANT de la X-Chain a la C-Chain?

La funcionalidad de contrato inteligente requiere un pedido total de transiciones de estado \(transacciones\). Como resultado, las ANTs deben ser trasladadas a la C-Chain para ser utilizadas en contratos inteligentes.

## Tokens en la C-Chain

### C-AVAX

AVAX juega el mismo papel en la C-Chain que hace ETH en la Red de Ethereum. Cuando creas o llamas un contrato inteligente, pagas la tarifa de transacción \(costo de gas\) con AVAX. Puedes transferir AVAX entre cuentas y enviar AVAX a un contrato inteligente con herramientas y bibliotecas de EVM nativas.

### ANTs

Sin embargo, las ANTs no tienen contraparte dentro de la EVM. Por lo tanto, la C-Chain tiene algunas modificaciones para soportar saldos de ANT y transferir ANTs en la C-Chain.

La C-Chain mantiene una asignación [assetID -> balance] en el almacenamiento de cada cuenta para soportar ANT. Estos tokens pueden ser exportados de vuelta a la X-Chain, o pueden ser utilizados en la C-Chain usando `nativeAssetCall`y . `nativeAssetBalance``nativeAssetCall`y `nativeAssetBalance`son contratos precompilados publicados en la fase 2 de Apricot que permiten el uso más rico de ANTs en la C-Chain.

#### nativeAssetCall

Una transacción de EVM se compone de los siguientes campos:

* **`nonce`**Valor de Scalar igual al número de transacciones enviadas por el remitente.
* **`gasPrice`**Valor de Scalar igual al número de Wei \(1 Wei = 10 -18 AVAX\) pagado por unidad de gas para ejecutar esta transacción.
* **`gasLimit`**Valor de Scalar igual a la cantidad máxima de gas que debería ser utilizado para ejecutar esta transacción.
* **`to`**La dirección de 20 bytes del receptor de la llamada de mensaje. Si la transacción está creando un contrato, `to`queda vacía.
* **`value`**Valor de escala de activo nativo \(AVAX\), en Wei \(1 Wei = 10^-18 AVAX\), para ser transferido al receptor de la llamada de mensaje o en el caso de una creación de contrato, como una dotación al contrato recién creado.
* **`v, r, s`**Valores correspondientes a la firma de la transacción.
* **`data`**matriz de byte de tamaño ilimitado que especifica los datos de entrada a una llamada de contrato o, si crea un contrato, el bytecode de EVM para el proceso de inicialización de la cuenta.

`nativeAssetCall`es un contrato precompilado en la dirección. `0x0100000000000000000000000000000000000002``nativeAssetCall`permite a los usuarios transferir de forma atomica un activo nativo a una dirección dada y, opcionalmente, hacer una llamada de contrato a esa dirección. Esto es paralelo a cómo una transacción normal puede enviar valor a una dirección y llamar atomically esa dirección con algunos `data`.

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

Estos argumentos pueden ser empaquetados `abi.encodePacked(...)`en Solidity ya que solo hay un argumento con longitud variadic `callData`\(\). Los tres primeros argumentos son de longitud constante, por lo que el contrato precompilado simplemente analiza la entrada de llamada como:

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

**Ejemplo**

`2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`Por ejemplo, para enviar un ANT con un assetID de la dirección `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`a la dirección , `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`primero convierte el assetID a hex, .`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7` Siguiente concatenar la dirección que recibe la ANT, la identificación de activo y la cantidad de activosy POST el valor como el `data`param a la `0x0100000000000000000000000000000000000002`dirección usando el `eth_sendTransaction`RPC.

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

`nativeAssetBalance`es un contrato precompilado en la dirección . `0x0100000000000000000000000000000000000001``nativeAssetBalance`es el equivalente de ANT de usar para `balance`obtener el saldo de AVAX.

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

Estos argumentos pueden ser empaquetados `abi.encodePacked(...)`en Solidity ya que todos los argumentos tienen longitud constante.

```text
+-------------+---------------+-----------------+
| address     : address       |        20 bytes |
+-------------+---------------+-----------------+
| assetID     : uint256       |        32 bytes |
+-------------+---------------+-----------------+
                              |        52 bytes |
                              +-----------------+
```

**Ejemplo**

Por ejemplo, para obtener el saldo de dirección `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`y de assetID , `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`primero convierte el assetID al hex, .`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7` Siguiente concatenar la dirección y el assetID y POST el valor como el `data`param a la `0x0100000000000000000000000000000000000001`dirección usando la `eth_call`RPC.

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

Un ARC-20 es un token de ERC-20 que envuelve una Token nativa de Avalanche subyacente, similar a cómo WAVAX envuelve AVAX AVAX

### Qué es un ERC-20

Un ERC-20 es un tipo de token estandarizado en Ethereum. Presenta un conjunto estándar de funciones y eventos que permiten un contrato inteligente servir como un token en Ethereum. Para una explicación completa, lee la propuesta original [aquí](https://eips.ethereum.org/EIPS/eip-20).

ERC-20 expone la siguiente interfaz:

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

Un ERC-20 se aplica por un contrato inteligente, lo que significa que mantienen su propio estado. Es decir, si tu cuenta posee 5 de un ERC-20 determinado, entonces los datos que da la propiedad de tu cuenta se almacenan en el contrato de ERC-20. Por el contrario, un saldo de ETH se mantiene en el almacenamiento de tu propia cuenta.

### De ANT ARC-20

A diferencia de ERC-20s, las Tokens nativas de Avalanche \(ANT\) se almacenan directamente en la cuenta que los posee. Las ANTs pueden ser "wrapped" para hacerlas utilizables en contratos inteligentes en la C-Chain. Llamamos a este activo envuelto un ARC-20. Para ello, añadimos un `assetID`campo a un contrato de ERC-20 regular para representar el activo subyacente que envuelve el ARC-20.

Además, el contrato de ARC-20 admite dos funciones adicionales: `withdraw`y`deposit` Para implementar esto, los ARC-20 necesitan usar los contratos precompilados: `nativeAssetCall`y .`nativeAssetBalance`

#### Balance de contrato

Las ERC-20 suelen tener un campo de suministro total, pero esto puede significar diferentes cosas en el contexto de un activo envuelto. El suministro total podría indicar el suministro total del activo no envuelto en toda la plataforma o la cantidad del activo en el contrato de wrapper.

Para simplificar, usamos el suministro total para indicar el suministro total del activo envuelto en el contrato ARC-20.

#### Depósitos de ARC-20

Para depositar fondos en un ARC-20, necesitamos enviar el contrato de ARC-20 el monto de depósito y luego invocar la función de depósito del contrato de modo que el contrato pueda reconocer el depósito y actualizar el saldo de la persona de llamada. Esto es similar a WETH \(WETH Wrapped ETH\) en Ethereum. Con WETH, esto puede ser logrado con un simple `call`porque ese método permite a la persona que llama enviar ETH e invocar un contrato inteligente de forma átoma. Con ARC-20 no AVAX `nativeAssetCall`permite la misma funcionalidad para las ANTs en la C-Chain.

Por ejemplo:

* **`nonce`**: 2
* **`gasPrice`**: 225 gwei
* **`gasLimit`**: 300 
* **`to`**:`0x0100000000000000000000000000000000000002`
* **`value`**: 0
* **`v, r, s`**: [Firma de transacción]
* **`data`**: abi.encodePacked\(arc20Address, assetID, assetID, abi.encodePacked\(arc20Address, \("Deposit\(\)"\)\)

`assetAmount`Esta transferencia `assetID`a la dirección del contrato ARC-20 y luego hace llamadas en `deposit()`el contrato.

La función de depósito utiliza el valor anterior del suministro total para calcular cuánto de `assetID`ella ha recibido en el depósito.

Nota: el saldo de este contrato `assetID`puede quedar fuera de sincronización con el suministro total si alguien envía fondos al contrato sin llamar .`deposit()` En este caso, la siguiente cuenta que llamadas `deposit()`recibiría crédito por los fondos enviados previamente.

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

#### Retiros de ARC-20

Cuando un contrato de ARC-20 recibe una solicitud de retirada, simplemente verifica que hay un saldo de cuenta suficiente, actualiza el saldo y el suministro total, y envía los fondos al retirador con la `nativeAssetCall`información. La función de retiro de ARC-20 se ve así:

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

