---
description: Management des clés avec KeyChain
---

# Management des clés sur la X-Chain

AvalancheJS est livré avec son propre KeyChain AVM. Cette KeyChain est utilisée dans les fonctions de l'API, ce qui leur permet de se connecter à l'aide des clés qu'elle a enregistrées. La première étape de ce processus consiste à créer une instance d'AvalancheJS connectée à notre point de terminaison Avalanche Platform de choix.

```cpp
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

## Accéder au KeyChain <a id="accessing-the-keychain"></a>

Le KeyChain est accessible via la X-Chain et peut être référencé directement ou via une variable de référence.

```cpp
let myKeychain = xchain.keyChain();
```

Cela expose l'instance de la classe AVMKeyChain qui est créée lorsque l'API X-Chain est créée. À l'heure actuelle, cela prend en charge la courbe secp256k1 pour les paires de clés ECDSA.

## Création de key pairs sur la X-Chain <a id="creating-x-chain-key-pairs"></a>

Le KeyChain a la capacité de créer de nouveaux KeyPairs pour vous et de renvoyer l'adresse associée à la paire de clés.

```cpp
let newAddress1 = myKeychain.makeKey(); //returns a Buffer for the address
```

Vous pouvez également importer votre clé privée existante dans la KeyChain en utilisant soit un Buffer…

```cpp
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

… ou une chaîne sérialisée Avalanche fonctionne aussi:

```cpp
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

## Travailler avec keychains <a id="working-with-keychains"></a>

Les KeyChains de la X-Chain disposent de capacités de gestion de clés standardisées. Les fonctions suivantes sont disponibles sur tout KeyChain qui implémente cette interface.

```cpp
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## Travailler avec keypairs <a id="working-with-keypairs"></a>

Le KeyPair de la X-Chain dispose de la fonctionnalité KeyPair standardisée. Les opérations suivantes sont disponibles sur n'importe quel KeyPair qui implémente cette interface.

```cpp
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

