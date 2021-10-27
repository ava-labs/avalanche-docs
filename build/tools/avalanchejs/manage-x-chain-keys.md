# X-Chain鍵を管理する

AvalancheJSは、独自のAVM Keychainが付いています。このKeyChainは、API機能で使用され、登録された鍵を使用して署名することができます。このプロセスの最初のステップは、選択したAvalancheプラットフォームエンドポイントに接続されたAvalancheJSのインスタンスを作成することです。

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

## Keychainにアクセスする<a id="accessing-the-keychain"></a>

KeyChainは、X-Chainを介してアクセスし、直接または参照変数で参照することができます。

```text
let myKeychain = xchain.keyChain();
```

これにより、X-Chain APIが作成されたときに作成されるクラスAVMKeyChainのインスタンスが公開されます。現在、ECDSAKeyPairのためのsecp256k1楕円曲線をサポートしています。

## X-ChainKeyPairの作成<a id="creating-x-chain-key-pairs"></a>

KeyChainには、新しいKeyPairを作成し、そのKeyPairに関連するアドレスを返す機能があります。

```text
let newAddress1 = myKeychain.makeKey(); //returns a Buffer for the address
```

既存の秘密鍵を、バッファーまたはAvalancheのシリアル化文字列を使用して

```text
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

KeyChainにインポートすることができます。

```text
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

## Keychains<a id="working-with-keychains"></a>での作業

X-Chainが提供するKeyChainには、標準化された鍵管理機能があります。次の機能は、このインターフェースを実装するすべてのKeyChainで使用できます。

```text
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## Keypairs<a id="working-with-keypairs"></a>での作業

X-Chainが提供するKeyPairは、標準化されたKeyPair機能です。次の操作は、このインターフェースを実装するすべてのKeyPairで使用できます。

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

