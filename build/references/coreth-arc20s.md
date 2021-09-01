# AvalancheネイティブトークンとARC-20s

## Avalancheネイティブトークンとは何ですか？

Avalancheネイティブトークン（ANT）は、X-Chain上で作成された固定キャップあるいは可変キャップトークンです。これらのトークンは、X-Chain上で、超高速で取引が可能になります。これにより、リニアチェーン上でDAGの優れた性能を利用することができます。このドキュメントでは、Avalancheネイティブトークンには、X-Chain上で作成された非可変トークン（NFTs）は含まれません。

## ANTをX-ChainからC-Chainに移動する理由

スマートコントラクト機能には、ステート遷移（トランザクション）の合計順序が必要です。その結果、スマートコントラクトで使用される場合、ANTsはC-Chainに移動する必要があります。

## C-Chain上でトークン

### Avalanche \(AVAX\) トークン

AVAXは、ETHがイーサリアムネットワーク上で行うC-Chain上でAVAXは、同じ役割を果たします。スマートコントラクトを作成したり呼び出したりするとき、AVAXでトランザクション手数料（ガスコスト）を支払います。AVAXをアカウント間で転送したり、ネイティブなEVMツールとライブラリを使用してAVAXをスマートコントラクトに送信することができます。

### ANTs

しかし、ANTsは、EVM内で対応することはありません。したがって、C-Chainは、ANTバランスの保持とC-Chain上にANTを移すことをサポートするいくつかの変更があります。

C-Chainは、ANTをサポートするために、各アカウントストレージに[アセットID ->バランス]をマッピングし続けます。これらのトークンは、X-Chainに戻すことができます。あるいは、C-Chain上で使用して使用して使用`nativeAssetCall`して使用し、Apricotフェーズ2でリリースされたプリコンパイル済みのコントラクト`nativeAssetBalance`で、C-Chain上でANTのより豊富な使用を可能にすることができます`nativeAssetBalance``nativeAssetCall`。

#### nativeAssetCall

EVMトランザクションは、次のフィールドで構成されます：

* **`nonce`**送信者により送信されたトランザクション数に等しいスカラー値。
* **`gasPrice`**このトランザクションを実行するために、1単位のガスあたり支払われたWei（1 Wei = 10^-18 AVAX）の数に等しいスカラー値。
* **`gasLimit`**このトランザクションを実行する際に使用される最大ガス数に等しいスカラー値。
* **`to`**メッセージコールが受信した20バイトアドレス。トランザクションがコントラクトを作成する場合、空の`to`ままです。
* **`value`**Wei（1 Wei = 10^-18 AVAX）で、ネイティブアセット（AVAX）のスカラーバリューは、メッセージコール受信者に転送するか、コントラクト作成の場合、新しく作成されたコントラクトへの寄付として、メッセージコールに移動されます。
* **`v, r, s`**トランザクションの署名に相当する値。
* **`data`**コントラクトコールに入力データを指定する無制限のサイズバイトアレイまたはコントラクトを作成する場合、アカウントの初期化プロセスのためのEVMバイトコード。

`nativeAssetCall``0x0100000000000000000000000000000000000002``nativeAssetCall`is。で、アドレスでプリコンパイルされたコントラクトです。でに、ユーザーは、ネイティブアセットをアトミックで指定されたアドレスに移動し、オプションでそのアドレスにコントラクトコールを行います。これは、通常のトランザクションがアドレスに価値を送信し、アトムリ的にそのアドレスを呼び出す方法と平行です`data`。

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

バリアディック長（）で1つの引数しか存在しないので、これらの引数はSolidity`abi.encodePacked(...)`でパックすることができます`callData`。最初の3つの引数は、一定の長さです。したがって、プリコンパイルされたコントラクトは、呼び出し入力を以下のようにパースするだけです。

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

たとえば、アドレス`2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`からアドレス`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`までのアセットIDでANTを送信する場合、`0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`まずアセットIDを16進に変換します。`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7``0x0100000000000000000000000000000000000002`次に、ANT、assetID、assetAmazonを受信したアドレスを、RPCを使用して、そのアドレスにPOSTとしての値を`data`パラムとして連結します`eth_sendTransaction`。

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

`nativeAssetBalance`isは、アドレスでプリコンパイルされたコントラクトです。AVAXバランスを`balance`得るためにANTと同値のANTと同値`0x0100000000000000000000000000000000000001``nativeAssetBalance`です。

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

すべての引数が一定の長さであるため、これらの引数はSolidity`abi.encodePacked(...)`で梱包できます。

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

たとえば、アドレス`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`とアセットIDの残高を得るため、`2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`まずアセットIDを16進に変換します。`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`次に、アドレスとassetIDを連結し、RPCを使用して`0x0100000000000000000000000000000000000001`アドレスに`data`パラムとして値をPOSTします`eth_call`。

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

## ARC-20s

ARC-20は、AvalancheネイティブトークンをラップするERC-20トークンです。

### ERC-20とは

ERC-20は、イーサリアム上で標準化されたトークンタイプです。スマートコントラクトがイーサリアム上でのトークンとして機能できるようにする標準的な機能やイベントセットを提示します。完全な説明については、オリジナルプロポーザルを[ここ](https://eips.ethereum.org/EIPS/eip-20)で読む。

ERC-20sは、以下のインターフェースを公開します：

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

ERC-20は、スマートコントラクトで実装されるため、独自の状態を維持します。つまり、あなたのアカウントが指定されたERC-20のうち5を所有している場合、あなたのアカウントの所有権を与えるデータは、実際にそのERC-20のコントラクトに保存されます。対照的に、ETHバランスは、自身のアカウントのストージに保持されます。

### ANTからARC-20

ERC-20sとは異なり、Avalancheネイティブトークン（ANTs）は、所有者のアカウントに直接保存されます。C-Chain上でスマートコントラクトで使用可能にするようにするため、ANTsは「ラップ」することができます。このラップアセットをARC-20と呼びます。これを実行するため、ARC-20がラップする基礎資産を表すために、通常のERC-20コントラクトに`assetID`フィールドを追加します。

さらに、ARC-20コントラクトは、2つの追加機能をサポート`withdraw`しています。`deposit``nativeAssetCall`これを実装するには、ARC-20sは、プリコンパイルコントラクトを使用する必要があります。`nativeAssetBalance`

#### コントラクトバランス / トータルサプライ

ERC-20sは、一般に合計供給フィールドを持っています。しかし、これはラップされたアセットの文脈における異なることを意味することができます。合計で、プラットフォーム全体上のノンラップアセットの総供給が示す可能性があります。

シンプルにするため、ARC-20コントラクトでラップされたアセットの総供給を示すために合計供給を使用します。

#### ARC-20預金

ARC-20に資金を入金するには、ARC-20コントラクトに預金額を送信し、コントラクトが預金額を呼び出す必要があり、コントラクトが預金を認識し、コントラクトがコントラクトの残高を更新することができます。これは、イーサリアムのWETH（ラップETH）に似ています。WETHを使用することで、呼び出し者はETHを送信し、アトミックでスマートコントラクトを呼び出すことができる`call`ようにするため、シンプルで実現できます。`nativeAssetCall`AVAX ARC-20sにより、C-Chain上のANTの機能が可能になります。

たとえば、

* **`nonce`**: 2
* **`gasPrice`**: 225 gwei
* **`gasLimit`**:300
* **`to`**:`0x0100000000000000000000000000000000000002`
* **`value`**: 0
* **`v, r, s`**: [トランザクション署名]
* **`data`**: abi.encodePacked\(arc20Address, assetID, assetAmount, abi.encodeWithSignature\("deposit\(\)\)

`assetAmount``deposit()`これによりARC-20コントラクトのアドレス`assetID`に転送され、コントラクトを呼び出します。

預金機能は、合計サプライの前の価値を使用して`assetID`、預金口座でどれだけ受け取ったかを計算します。

注意：呼び出しずにコントラクトに資金を送信した場合、コントラクトバランスが崩れる可能性`assetID`があります。`deposit()`この場合、呼び出しが付く次のアカウントは、以前に送付された資金についてクレジットを`deposit()`受け取ります。

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

#### ARC-20 撤回

`nativeAssetCall`ARC-20コントラクトが引き出し要求を受けた場合、十分なアカウント残高があることを確認し、バランスと合計の供給を更新し、そのまま引き出しに資金を送出します。ARC-20sは、以下のようになります。

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

