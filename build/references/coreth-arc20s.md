# AvalancheネイティブトークンとARC-20s

## Avalanche Native Tokenとは何ですか？

Avalanche Native Token (ANT)は、X-Chain上で作成された固定キャップまたは可変キャップのトークンです。これらのトークンは X-Chain上で光速で交換することができ、リニアチェーンよりもDAGの方が優れたパフォーマンスを発揮します。本書では、Avalanche Native Tokenには、 X-Chain上で作成された非代替性トークン(NFT)は含まれません。

## なぜANTをX-ChainからC-Chainに移行するのでしょう？

スマートコントラクトの機能には、状態遷移（トランザクション）の総合的な順序付けが必要です。そのため、ANTをスマートコントラクトで使用する場合は、C-Chainに移行する必要があります。

## C-Chain上のトークン

### Avalanche (AVAX) トークン

AVAXはC-Chain上で、ETHがEthereum Network上で担っているのと同じ役割を持ちます。スマートコントラクトを作成したり呼び出したりする際に、トランザクション手数料（ガスコスト）をAVAXで支払います。ネイティブのEVMツールやライブラリを使って、アカウント間でAVAXを送金したり、スマートコントラクトにAVAXを送信したりすることができます。

### ANT

しかし、ANTは、EVMの中には対応するものがありません。そのため、 C-Chain では、ANTの残高保持やANTの転送をサポートするために、いくつかの変更を行っています。

 C-Chainでは、ANTをサポートするために、各アカウントのストレージに[assetID->残高]のマッピングを保持しています。これらのトークンは、X-Chain,にエクスポートして戻すこともでき、`nativeAssetCall`と`nativeAssetBalance`を使用してC-Chainで使用することもできます。`nativeAssetCall`と`nativeAssetBalance`はApricot Phase2でリリースされたコンパイル済のコントラクトで、C-Chain上でANTをよりリッチに使用することができます。

#### nativeAssetCall

EVMトランザクションは、次のフィールドで構成されます。

* **`nonce`**送信者が送信したトランザクションの数に等しいスカラー値。
* **`gasPrice`**このトランザクションを実行するために1ガスあたりに支払われたWei(1Wei=10^-18AVAX)の数に等しいスカラー値。
* **`gasLimit`**このトランザクションを実行する際に使用されるべきガスの最大量に等しいスカラー値。
* **`to`**メッセージ呼び出しの受信者の20バイトのアドレスです。トランザクションがコントラクトを作成している場合、`to`は空のままです。
* **`value`**ネイティブ資産(AVAX)のスカラー値をWei(1Wei=10^-18AVAX)で表したもので、メッセージ呼び出しの受信者に転送されるもの、またはコントラクト作成の場合は、新たに作成されたコントラクトの養分として転送されるものです。
* **`v, r, s`**トランザクションの署名に対応する値。
* **`data`**コントラクト呼び出しの入力データを指定するサイズ無制限のバイト配列、またはコントラクトを作成する場合は、アカウント初期化処理のEVMバイトコードを指定します。

`nativeAssetCall`は`0x0100000000000000000000000000000000000002`のアドレスにあるコンパイル済のコントラクトです。`nativeAssetCall`は、ユーザーがネイティブ資産をあるアドレスにアトミックに転送し、オプションとしてそのアドレスにコントラクト呼び出しを行うことを可能にします。これは、通常のトランザクションが、あるアドレスに値を送り、そのアドレスにいくつかの`data`をアトミックに呼び出すことができるのと並行しています。

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

これらの引数は、Solidityでは可変長の引数が1つだけなので`abi.encodePacked(...)`でパックできます(`callData`)。最初の3つの引数は一定の長さなので、コンパイル済のコントラクトは、呼び出し入力を単純に次のように解析します。

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

**例**

例えば、assetIDが`2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`のANTを`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`のアドレスから`0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`のアドレスに送信する場合、まず資産IDを16進数`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`に変換します。次に、ANT、資産ID、assetAmountを受信しているアドレスを連結し、その値を`data`のパラメータとして、`eth_sendTransaction`のRPCを使用して`0x0100000000000000000000000000000000000002`のアドレスにPOSTします。

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

#### nativeAssetBalance

`nativeAssetBalance`は`0x0100000000000000000000000000000000000001`のアドレスにあるコンパイル済のコントラクトです。`nativeAssetBalance`は、`balance`を使用してAVAXの残高を得るANTと同等です。

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

これらの引数は、すべての引数が一定の長さを持っているので、Solidityでは`abi.encodePacked(...)`でパックすることができます。

```text
+-------------+---------------+-----------------+
| address     : address       |        20 bytes |
+-------------+---------------+-----------------+
| assetID     : uint256       |        32 bytes |
+-------------+---------------+-----------------+
                              |        52 bytes |
                              +-----------------+
```

**例**

例えば、アドレス`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`と資産ID`2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`の残高を取得するには、まず資産IDを16進数、`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`に変換します。次にアドレスと資産IDを連結し、その値を`data`パラメータとして`eth_call`RPCを使用して`0x0100000000000000000000000000000000000001`アドレスにPOSTします。

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

## ARC-20

ARC-20とは、WAVAXがAVAXをラップするのと同様に、基盤となるAvalancheネイティブトークンをラップしたERC-20トークンのことです。

### ERC-20とは何ですか？

ERC-20は、Ethereum上で標準化されたトークンタイプです。ERC-20は、スマートコントラクトがEthereum上のトークンとして機能することを可能にする機能とイベントの標準セットを提示します。詳しい説明は[こちら](https://eips.ethereum.org/EIPS/eip-20)の原案をご覧ください。

ERC-20は以下のようなインターフェースを公開しています。

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

ERC-20はスマートコントラクトで実装されており、独自の状態を維持しています。つまり、お客様のアカウントがあるERC-20を5個所有している場合、お客様のアカウントの所有権を示すデータは、実際にそのERC-20のコントラクトに保存されています。それに対して、ETHの残高は自分のアカウントのストレージに保管されています。

### ANTからARC-20へ

ERC-20とは異なり、Avalanche Native Tokens (ANTs)は、所有するアカウントに直接保存されます。ANTは、C-Chain上のスマートコントラクトで使用できるように「ラッピング」することができます。このラッピングされた資産をARC-20と呼んでいます。これを実現するために、通常のERC-20コントラクトに`assetID`フィールドを追加して、ARC-20がラップする基本的な資産を表現します。

さらに、ARC-20のコントラクトでは、次の2つの追加機能をサポートしています。`withdraw`と`deposit`です。これを実装するためには、ARC-20は、次のコンパイル済のコントラクトを使用する必要があります。`nativeAssetCall`と`nativeAssetBalance`です。

#### コントラクト残高/総供給量

ERC-20には通常、総供給量のフィールがありますが、これはラッピングされた資産のコンテキストでは異なる意味を持つことがあります。総供給量は、プラットフォーム全体での非ラッピング資産の総供給量を示すこともあれば、ラッピングコントラクトにおける資産の量を示すこともあります。

簡単にするために、ARC-20コントラクトにおけるラップ資産の総供給量を示すために総供給量を使用します。

#### ARC-20デポジット

ARC-20に資金を入金するためには、ARC-20のコントラクトに入金額を送り、コントラクトの入金関数を呼び出して、コントラクトが入金を確認し、呼び出し元の残高を更新する必要があります。これはEthereumのWETH(Wrapped ETH)と似ています。WETHでは、呼び出し側がETHの送信とスマートコントラクトの呼び出しの両方をアトミックに行うことができるため、単純な`call`で実現できます。AVAX以外のARC-20では、`nativeAssetCall`によってC-Chain上のANTにも同様の機能を持たせることができます。

例：

* **`nonce`**：2
* **`gasPrice`**：225gwei
* **`gasLimit`**：3000000
* **`to`**：`0x0100000000000000000000000000000000000002`
* **`value`**：0
* **`v, r, s`**：[トランザクションの署名]
* **`data`**：abi.encodePacked(arc20Address, assetID, assetAmount, abi.encodeWithSignature("deposit()"))

この転送により、`assetID`の`assetAmount`をARC-20のコントラクトのアドレスに転送し、そのコントラクト上で`deposit()`を呼び出します。

入金機能は、前回の総供給量の値を使用して、`assetID`をどれだけ受け取ったかを計算します。

注意：誰かが`deposit()`を呼び出さずに契約に資金を送った場合、契約の`assetID`の残高が総供給量と同期しなくなることがあります。この場合、次に`deposit()`を呼び出した口座が、先に送られた資金のクレジットを受け取ることになります。

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

#### ARC-20出金

ARC-20のコントラクトは、出金リクエストを受け取ると、十分な口座残高があるかどうかを確認し、残高と総供給量を更新し、`nativeAssetCall`で出金者に資金を送るだけです。ARC-20の出金機能は次のようになっています。

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

