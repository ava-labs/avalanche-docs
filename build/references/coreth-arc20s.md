# AvalancheネイティブトークンとARC-20s

## Avalanche Native Tokenとは何ですか？

Avalanche Native Token \(ANT\)はX-Chain上で作成された固定キャップまたは変数キャップトークンです。これらのトークンはX-Chain上で高速で交換できます。これは、線形チェーン上でDAGの優れた性能を利用します。この文書では、Avalanche Native TokensにはX-Chain上で作成された非真菌トークン \(NFTs\)は含まれません。

## ANTをX-ChainからC-Chainに移動するのはなぜですか？

Smart contract 機能には、状態トランジション \(transactions\)の全順序が必要です。その結果、ANTはスマートコントラクトで使用する場合は、C-Chainに移動する必要があります。

## C-Chainのトークン

### AVAX-JP

AVAXは、ETHがEthereum Networkで行うC-Chainでも同じ役割を果たしています。スマートコントラクトを作成または呼び出すとき、AVAXでトランザクション手数料 \(ガスコスト\)を支払います。AVAX をアカウント間で転送し、AVAX をネイティブ EVM ツールやライブラリを使用してスマートコントラクトに送信できます。

### ANTS-JP

しかし、ANTはEVM内に相当するものはありません。したがって、C-ChainにはANT残高を保持し、C-Chain上でANTを転送する機能をいくつか変更しました。

C-Chainは、ANT をサポートするために各アカウントのストレージに \[assetID -> balance\] をマッピングします。これらのトークンはX-Chainにエクスポートすることも、C-Chainで`nativeAssetCall```と`nativeAssetBalance```を使用して使用することもできます。

#### NativeAssetCall-JP

EVMトランザクションは、次のフィールドで構成されます。

* **`nonce`** Scalar 値は、送信者によって送信されたトランザクション数に等しい。
* **`gasPrice`** Scalar値は、このトランザクションを実行するためにガス単位あたりWei \(1 Wei = 10^-18 AVAX\)の数に等しいです。
* **`gasLimit`** Scalar値は、このトランザクションの実行に使用するガスの最大量に等しいです。
* **`The`** java-java-jav.commccma-java-java-jjava-javic.tdma-java-javic.tdma-java-jjava-jjjava-java-java-jav.tdorjjjav.tdorjava-トランザクションがコントラクトを作成する場合、`to`は空のままです。
* **`value`** ネイティブアセット \(AVAX\)のScalar値は、Wei \(1 Wei = 10^-18 AVAX\)で、メッセージコールの受信者またはコントラクト作成の場合に、新しく作成されたコントラクトへの寄付として転送されます。
* **`v, r, s`** トランザクションの署名に対応する値。
* **`data`** 無制限のサイズバイト配列 入力データをコントラクトコールまたはコントラクトを作成する場合、アカウント初期化プロセス用のEVMバイトコードです。

`nativeAssetCall`は、アドレス `0x01002` におけるコンパイル済みのコントラクトです。`nativeAssetCallは`、ユーザーはネイティブアセットを指定したアドレスにアトミックに転送し、オプションでそのアドレスにコントラクトコールを実行できます。これは、通常のトランザクションがアドレスに値を送信し、そのアドレスをいくつかのデータでアトムリ的に呼び出す方法と平行です`。`

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

これらの引数は、Solidity では `abi.encodePacked(...)` によってパックすることができます。なぜならば、変数長 \(`callData`\) を持つ引数は 1 つしかありません。最初の3つの引数は定数長ですので、コンパイル済みのコントラクトは単純にコール入力を次のように解析します。

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

**JPE-JP-JP-J-JP-JP-J-J-JP-JP**

例えば、`2nzgmhZLuVq8jc7NNu`2eahkKwoJcbWXJCxHBVWAJEZkhkhquoK から `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` 宛てに 0`xDd1749831fF70d88AB7B7B07eF7CD9c53D054a57a57`にANTを送信し、まず0`xec21e629d1252b3540e9d2fcd174a63aa63af081417ea6826612e96815463b8a41d7`.次に、`ant`, assetID, assetAmount および POST 値を`データパラム`として、値を `0x01002` アドレスに結合します。

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

#### NativeAssetBalance-JP

`nativeAssetBalance```は、AVAX残高を取得するために`ANT`のバランスを使用するのに相当する、アドレス`0x01001`でコンパイル済みの契約です。

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

これらの引数は、すべての引数が定数長であるため、Solidity では `abi.encodePacked(...)` によってパックできます。

```text
+-------------+---------------+-----------------+
| address     : address       |        20 bytes |
+-------------+---------------+-----------------+
| assetID     : uint256       |        32 bytes |
+-------------+---------------+-----------------+
                              |        52 bytes |
                              +-----------------+
```

**JPE-JP-JP-J-JP-JP-J-J-JP-JP**

例えば、アドレス`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`およびassetID `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJJCxHBVWAJEZkhkhquoKの`残高を取得するには、まずassetIDをhex,`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`に変換します。次に、address と assetID と値を POST として値を、`eth_call` RPC を使用して、`データパラム`として `0x01001` アドレスに結合します。

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

## ARC-20s-20s-JP-JP-J

ARC-20は、ERC-20トークンで、Avalanche Native Tokenを包むことによって、WAVAXがAVAXを包む方法と同様に、JavaScript-20を用いています。

### ERC-20とは何ですか？

ERC-20はEthereum上で標準化されたトークン型です。それは、スマートコントラクトがEthereum上でトークンとして機能することを可能にする機能とイベントの標準セットを提示します。完全な説明については、元の提案を[こちら](https://eips.ethereum.org/EIPS/eip-20)で読んでください。

ERC-20sは以下のインターフェースを公開します。

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

ERC-20はスマートコントラクトによって実装され、つまり、自分自身の状態を維持します。つまり、アカウントがERC-20の5を所有している場合、アカウントの所有権を与えるデータは、実際にそのERC-20の契約に格納されます。対照的に、ETH残高は、お客様のアカウントのストレージに保管されます。

### ANTからARC-20まで

ERC-20sとは異なり、Avalanche Native Tokens \(ANTs\)はそれらを所有するアカウントに直接格納されます。ANTはC-Chain上のスマートコントラクトで使用できるようにするために「包まれる」ことができます。このラップされたアセットをARC-20と呼びます。これを行うには、ARC-20が包む基礎となる資産を表すために、通常のERC-20コントラクトに`assetID`フィールドを追加します。

さらにARC-20コントラクトは、`2`つの追加機能(devcates and `deposit`)をサポートしています。これを実装するには、ARC-20s は、あらかじめコンパイルされたコントラクト(`nativeAssetCall` と `nativeAssetBalance`)を使用する必要があります。

#### 契約残高/総供給

ERC-20sは通常、全供給フィールドを持っていますが、これは包まれた資産の文脈で異なることを意味することができます。合計供給は、プラットフォーム全体での非ラップアセットの総供給量またはラッパー契約におけるアセットの金額を示すことができます。

簡易化のため、ARC-20契約における包まれた資産の総供給量を示すために、総供給量を使用しています。

#### ARC-20 預金

ARC-20に資金を入金するには、ARC-20契約に預金額を送り、契約に預金を認め、発信者の残高を更新できるように、契約の預金機能を呼び出す必要があります。これはEthereumのWETH \(Wrapped ETH\)と似ています。WETH では、呼び出し元は ETH を送信し、スマートコントラクトをアトミックに呼び出すことができるため、これは単純な`呼び出し`で実現できます。`NATIVAX` ARC-20Sでは、NATIVEAssetCallはC-Chain上でANTでも同じ機能を可能にします。

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaJava-JavaJavaJava-JavaJavaScript-JavaJavaScri.RJavaScrip.RJavaJavaScri.RJMod-JavaScri.RJavaJavaJMod-JavaJMod-JMod-JMod-JavaJava-JJMod-JMod-JM-JMod-JM-JMod-JM-JMod-JM-JMod-JMod-JMod-JM-JM-

* **`nonce`**: 2
* **`ガス価格`**: 225 gwei
* **`gasLimit`**: 300
* **`-`**`-`
* **`値`**: 0
* **`v, r, s`**: \[トランザクションシグネチャ\]
* **`data`**: abi.encodePacked\(arc20Address, assetID, assetAmount, abi.encodeWithSignature\("deposit\(\)"\)\\)\

`assetAmount` of `assetID`を ARC-20 契約のアドレスに転送し、契約で `deposit()` を呼び出します。

Deposit 関数は、総供給の前の値を使用して、預金にどのくらい受け取った`assetID`を計算します。

注: 契約の`assetID`の残高は、`deposit()` を呼び出さずにコントラクトに資金を送る場合、合計供給と同期しない場合があります。この場合、`deposit()` を呼び出す次の口座は、以前に送られた資金のクレジットを受け取ります。

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

#### ARC-20 出金

ARC-20 契約が出金リクエストを受け取った場合、単純に十分な口座残高があることを確認し、残高と総供給を更新し、`nativeAssetCall` を使用して出金者に資金を送信します。ARC-20s development 関数は次のようになります:

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

