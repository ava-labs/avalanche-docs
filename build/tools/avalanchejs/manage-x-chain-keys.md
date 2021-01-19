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

let myNetworkID = 12345; //por defecto es 3, we want to override that for our local network
let myBlockchainID = "GJABrZ9A6UQFpwjPU8MDxDd8vuyRoDVeDAXc694wJ5t3zEkhU"; // The X-Chain blockchainID on this network
let ava = new avalanche.Avalanche("localhost", 9650, "http", myNetworkID, myBlockchainID);
let xchain = ava.XChain(); //returns a reference to the X-Chain used by AvalancheJS
```

## Accessing the Keychain <a id="accessing-the-keychain"></a>

The KeyChain is accessed through the X-Chain and can be referenced directly or through a reference variable.

```text
let myKeychain = xchain.keyChain();
```

This exposes the instance of the class AVMKeyChain which is created when the X-Chain API is created. At present, this supports secp256k1 curve for ECDSA key pairs.

## Creating X-Chain Key Pairs <a id="creating-x-chain-key-pairs"></a>

The KeyChain has the ability to create new KeyPairs for you and return the address associated with the key pair.

```text
let newAddress1 = myKeychain.makeKey(); //returns a Buffer for the address
```

You may also import your existing private key into the KeyChain using either a Buffer…

```text
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

… or an Avalanche serialized string works, too:

```text
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

## Working with Keychains <a id="working-with-keychains"></a>

The X-Chains’s KeyChain has standardized key management capabilities. The following functions are available on any KeyChain that implements this interface.

```text
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## Working with Keypairs <a id="working-with-keypairs"></a>

The X-Chain’s KeyPair has standardized KeyPair functionality. The following operations are available on any KeyPair that implements this interface.

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbNTY3MTM4OTA4XX0=
-->