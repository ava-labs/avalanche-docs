# X-Chainキーを管理する

AvalancheJSには、独自のAVMキーチェーンが付属しています。このKeyChainは、APIの機能で使用され、登録された鍵を使用して署名できるようにします。このプロセスにおける最初のステップは、我々のAvalancheプラットフォームエンドポイントに接続されたAvalancheJSのインスタンスを作成することです。

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

## キーチェーンにアクセスする<a id="accessing-the-keychain"></a>

KeyChainは、X-Chain経由でアクセスされ、直接参照可変数経由で参照することができます。

```text
let myKeychain = xchain.keyChain();
```

これにより、X-Chain APIが作成されたときに作成されるクラスAVMKeyChainのインスタンスが公開されます。現在、ECDSA鍵ペアのsecp256k1カーブをサポートしています。

## X-Chain鍵ペアを作成する<a id="creating-x-chain-key-pairs"></a>

KeyChainは、あなたのために新しいKeyPairを作成し、鍵ペアに関連付けられたアドレスを返すことができます。

```text
let newAddress1 = myKeychain.makeKey(); //returns a Buffer for the address
```

バッファ…を使用して、既存の秘密鍵をKeyChainにインポートすることもできます。

```text
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

…あるいはAvalancheシリアライズされた文字列も機能します：

```text
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

## キーチェーンで作業する<a id="working-with-keychains"></a>

X-ChainsのKeyChainは、標準化された鍵管理機能を持っています。このインターフェースを実装するあらゆるKeyChain上で以下の機能が利用できます。

```text
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## キーペアで作業する<a id="working-with-keypairs"></a>

X-ChainのKeyPairは、標準化されたKeyPair機能を持ちます。このインターフェースを実装するすべてのKeyPair上で以下の操作が可能です。

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

