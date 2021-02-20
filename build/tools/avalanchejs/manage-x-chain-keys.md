# Administrar las Keys de la X-Chain

AvalancheJS viene con su propio Keychain de AVM. Este KeyChain se utiliza en las funciones de la API, permitiéndoles firmar con las keys con las que está registrado. El primer paso en este proceso es crear una instancia de AvalancheJS conectada a nuestro endpoint de la plataforma Avalanche de elección.

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche" 

let bintools = BinTools.getInstance();

let myNetworkID = 12345; //por defecto es 3, queremos anular eso para nuestra red local
let myBlockchainID = "GJABrZ9A6UQFpwjPU8MDxDd8vuyRoDVeDAXc694wJ5t3zEkhU"; // La blockchainID de la X-Chain en esta red
let ava = new avalanche.Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = ava.XChain(); //devuelve una referencia a la X-Chain usada por AvalancheJS
```

## Accediendo al Keychain <a id="accessing-the-keychain"></a>

Se accede a la KeyChain a través de la X-Chain y puede ser referenciada directamente o a través de una variable de referencia.

```text
let myKeychain = xchain.keyChain();
```

Esto expone la instancia de la clase AVMKeyChain que se crea cuando se crea la API de la X-Chain. En la actualidad, esto soporta la curva secp256k1 para los key pairs ECDSA.

## Creación de Key Pairs de la X-Chain<a id="creating-x-chain-key-pairs"></a>

El KeyChain tiene la capacidad de crear nuevos KeyPairs para ti y devolver la dirección asociada al key pair.

```text
let newAddress1 = myKeychain.makeKey(); //retorna un Buffer para la dirección
```

También puede importar su private key existente en el KeyChain usando un Buffer...

```text
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //retorna un Buffer
let newAddress2 = myKeychain.importKey(mypk); //retorna un Buffer para la dirección

```

...o, una cadena serializada de Avalanche también funciona:

```text
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //retorna un Buffer para la dirección
```

## Trabajando con Keychains <a id="working-with-keychains"></a>

El KeyChain de la X-Chains tiene capacidades de gestión de claves estandarizadas. Las siguientes funciones están disponibles en cualquier KeyChain que implemente esta interfaz.

```text
let addresses = myKeychain.getAddresses(); //devuelve un conjunto de Buffers para las direcciones
let addressStrings = myKeychain.getAddressStrings(); //devuelve un conjunto de cadenas para las direcciones
let exists = myKeychain.hasKey(newAddress1); //retorna verdadero si la dirección es administrada
let keypair = myKeychain.getKey(newAddress1); //retorna el KeyPair class
```

## Trabajando con Keypairs <a id="working-with-keypairs"></a>

El KeyPair de la X-Chain tiene una funcionalidad estandarizada de KeyPair. Las siguientes operaciones están disponibles en cualquier KeyPair que implemente esta interfaz.

```text
let address = keypair.getAddress(); //retorna Buffer
let addressString = keypair.getAddressString(); //retorna string

let pubk = keypair.getPublicKey(); //retorna Buffer
let pubkstr = keypair.getPublicKeyString(); //devuelve una cadena codificada CB58

let privk = keypair.getPrivateKey(); //retorna Buffer
let privkstr = keypair.getPrivateKeyString(); //devuelve una cadena codificada CB58

keypair.generateKey(); //crea un nuevo KeyPair aleatorio

let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let successul = keypair.importKey(mypk); //retorna un booleano si el private key fue importado exitosamente

let message = Buffer.from("Wubalubadubdub");
let signature = keypair.sign(message); //retorna un Buffer con la firma

let signerPubk = keypair.recover(message, signature);
let isValid = keypair.verify(message, signature); //retorna un booleano
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTIwNTkzMTY5OSwtNTIwNzkzMTk0XX0=
-->