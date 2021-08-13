# X-Chain キーの管理

AvalancheJSには独自のAVMキーチェーンが付属しています。このKeyChainはAPIの関数で使用され、登録したキーを使用して署名できます。このプロセスの最初のステップは、AvalancheJSの選択肢のAvalancheプラットフォームエンドポイントに接続したインスタンスを作成することです。

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

## Keychainへのアクセス<a id="accessing-the-keychain"></a>

KeyChainはX-Chainを通じてアクセスし、直接または参照変数を通じて参照できます。

```text
let myKeychain = xchain.keyChain();
```

これにより、X-Chain API が作成されたときに作成される AVMKeyChain のクラスインスタンスが表示されます。現在、ECDSAキーペアのsecp256k1カーブをサポートしています。

## X-Chain Key ペアの作成<a id="creating-x-chain-key-pairs"></a>

KeyChainには、新しいKeyPairsを作成し、キーペアに関連付けられたアドレスを返す機能があります。

```text
let newAddress1 = myKeychain.makeKey(); //returns a Buffer for the address
```

また、Buffer...を使用して、既存の秘密鍵をKeyChainにインポートすることもできます。

```text
let mypk = bintools.avaDeserialize("24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5"); //returns a Buffer
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

…またはAvalancheシリアライズされた文字列も動作します:

```text
let mypk = "24jUJ9vZexUM6expyMcT48LBx27k1m7xpraoV62oSQAHdziao5";
let newAddress2 = myKeychain.importKey(mypk); //returns a Buffer for the address
```

## Keychainsの作業<a id="working-with-keychains"></a>

X-ChainsのKeyChainは、鍵管理機能を標準化しています。このインターフェイスを実装するKeyChainでは、以下の関数が利用できます。

```text
let addresses = myKeychain.getAddresses(); //returns an array of Buffers for the addresses
let addressStrings = myKeychain.getAddressStrings(); //returns an array of strings for the addresses
let exists = myKeychain.hasKey(newAddress1); //returns true if the address is managed
let keypair = myKeychain.getKey(newAddress1); //returns the KeyPair class
```

## Keypairs の操作<a id="working-with-keypairs"></a>

X-ChainのKeyPairはKeyPair機能を標準化しています。JavaScript-JP-JP-

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

