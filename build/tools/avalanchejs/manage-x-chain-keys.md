# Administrar Claves de la X-Chain

AvalancheJS viene con su propio Keychain de AVM. Este KeyChain se utiliza en las funciones de la API, permitiéndoles firmar con las keys con las que está registrado. El primer paso de este proceso es crear una instancia de AvalancheJS conectada a nuestro Endpoint de elección de la plataforma Avalanche.

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();

let myNetworkID = 12345; //default is 3, we want to override that for our local network
let myBlockchainID = "GJABrZ9A6UQFpwjPU8MDxDd8vuyRoDVeDAXc694wJ5t3zEkhU"; // The X-Chain blockchainID on this network
let ava = new avalanche.Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = ava.XChain(); //returns a reference to the X-Chain used by AvalancheJS
```

## Access<a id="accessing-the-keychain"></a>

Se accede a la KeyChain a través de la X-Chain y puede ser referenciada directamente o a través de una variable de referencia.

```text
let myKeychain = xchain.keyChain();
```

Esto expone la instancia de la clase AVMKeyChain que se crea cuando se crea la API de la X-Chain. En la actualidad, esto soporta la curva secp256k1 para los key pairs ECDSA.

## Creando pares de claves de X-Chain<a id="creating-x-chain-key-pairs"></a>

El KeyChain tiene la capacidad de crear nuevos KeyPairs para ti y devolver la dirección asociada al key pair.

```text
let newAddress1 = myKeychain.makeKey(); //returns a Buffer for the address
```

También puede importar su private key existente en el KeyChain usando un Buffer...

```text
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

...o, una cadena serializada de Avalanche también funciona:

```text
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

## Trabajar con Keychains<a id="working-with-keychains"></a>

El KeyChain de la X-Chains tiene capacidades de gestión de claves estandarizadas. Las siguientes funciones están disponibles en cualquier KeyChain que implemente esta interfaz.

```text
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## Trabajar con Keypairs<a id="working-with-keypairs"></a>

El KeyPair de la X-Chain tiene una funcionalidad estandarizada de KeyPair. Las siguientes operaciones están disponibles en cualquier KeyPair que implemente esta interfaz.

```text
let address = keypair.getAddress(); //returns Buffer
let addressString = keypair.getAddressString(); //returns string

let pubk = keypair.getPublicKey(); //returns Buffer
let pubkstr = keypair.getPublicKeyString(); //returns a CB58 encoded string

let privk = keypair.getPrivateKey(); //returns Buffer
let privkstr = keypair.getPrivateKeyString(); //returns a CB58 encoded string

keypair.generateKey(); //creates a new random KeyPair

let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let successul = keypair.importKey(mypk); //returns boolean if private key imported successfully

let message = Buffer.from("Wubalubadubdub");
let signature = keypair.sign(message); //returns a Buffer with the signature

let signerPubk = keypair.recover(message, signature);
let isValid = keypair.verify(message, signature); //returns a boolean
```

