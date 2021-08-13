# X-Chain Anahtarlarını Yönet@ info: whatsthis

AvalancheJS kendi AVM Keychain ile geliyor. Bu KeyChain API'nin işlevlerinde kullanılır ve kayıtlı anahtarları kullanarak imzalamalarını sağlar. Bu sürecin ilk adımı, Avalanche platformunun seçim noktasına bağlı bir AvalancheJS örneğini oluşturmaktır.

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

## Keychain erişiliyor@ info: whatsthis<a id="accessing-the-keychain"></a>

KeyChain X-Chain aracılığıyla erişilir ve doğrudan referans değişkeniyle referans edilebilir.

```text
let myKeychain = xchain.keyChain();
```

Bu durum X-Chain API oluşturulduğunda oluşturulan AVMKeyChain sınıfı örneğini ortaya çıkarır. Şu anda bu ECDSA anahtar çiftleri için secp256k1 eğrisini destekliyor.

## X-Chain Anahtarlı Çiftler Oluşturuluyor<a id="creating-x-chain-key-pairs"></a>

KeyChain, sizin için yeni KeyPairs oluşturma ve anahtar çiftle ilişkili adresi geri verme yeteneğine sahiptir.

```text
let newAddress1 = myKeychain.makeKey(); //returns a Buffer for the address
```

Ayrıca mevcut özel anahtarınızı bir Buffer' ı kullanarak KeyChain' e aktarabilirsiniz...

```text
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

...ya da bir Avalanche dizisini diziye çevirmiş bir de işe yarar:

```text
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

## Keychains ile çalışmak.<a id="working-with-keychains"></a>

X-Chains’s KeyChain anahtar yönetim yeteneklerini has Aşağıdaki fonksiyonlar bu arayüzü uygulayan herhangi bir KeyChain üzerinde mevcuttur.

```text
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## Anahtar Çiftleri<a id="working-with-keypairs"></a>

X-Chain’s KeyPair işlevselliğini standardized etti. Bu arayüzü uygulayan herhangi bir KeyPair üzerinde aşağıdaki işlemler mevcuttur.

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

