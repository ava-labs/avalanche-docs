# Gérer les clés de X-Chain

AvalancheJS est livré avec son propre Keychain AVM. Cette KeyChain est utilisée dans les fonctions de l'API, leur permettant de signer en utilisant les clés qu'elle est enregistrée. La première étape de ce processus est de créer une instance d'AvalancheJS connectée à notre endpoint de choix de la plateforme Avalanche.

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

## Accéder à la Keychain<a id="accessing-the-keychain"></a>

La KeyChain est accessible via la X-Chain et peut être référencé directement ou par une variable de référence.

```text
let myKeychain = xchain.keyChain();
```

Cela expose l'instance de la classe AVMKeyChain qui est créée lorsque l'API X-Chain est créée. À l'heure actuelle, cela prend en charge la courbe secp256k1 pour les paires de clés ECDSA.

## Créer des paires de clés de X-Chain<a id="creating-x-chain-key-pairs"></a>

La KeyChain a la capacité de créer de nouvelles KeyPairs pour vous et de retourner l'adresse associée à la paire de clés.

```text
let newAddress1 = myKeychain.makeKey(); //returns a Buffer for the address
```

Vous pouvez également importer votre clé privée existante dans la KeyChain en utilisant soit un buffer…

```text
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

… ou une chaîne de caractères sérialisés d'Avalanche fonctionne aussi :

```text
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

## Travailler avec Keychains<a id="working-with-keychains"></a>

La KeyChain de X-Chain a des capacités de gestion de clés normalisées. Les fonctions suivantes sont disponibles sur n'importe quelle KeyChain qui met en œuvre cette interface.

```text
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## Travailler avec les Keypairs<a id="working-with-keypairs"></a>

Le KeyPair de X-Chain a une fonctionnalité KeyPair. Les opérations suivantes sont disponibles sur n'importe quel KeyPair qui met en œuvre cette interface.

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

