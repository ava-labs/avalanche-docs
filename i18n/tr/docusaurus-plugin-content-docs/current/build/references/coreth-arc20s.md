---
sidebar\_position: 1
---
# Avalanche Yerel Token'lar ve ARC-20

## Avalanche Yerel Token nedir?

Avalanche Yerel Token \(ANT\), X-Chain'de yaratılmış sabit arz limitli veya değişken arz limitli bir token'dir. Bu token'lar, bir DAG zincirinin doğrusal bir zincire göre üstün performans avantajından yararlanan X-Chain'de ışık hızında alınıp satılabilir. Bu dokümanda, Avalanche Yerel Token'lara X-Chain'de yaratılmış olan değiştirilemez token'lar \(NFT\) dahil değildir.

## Bir ANT'ı X-Chain'den C-Chain'e neden taşımalı?

Akıllı sözleşme fonksiyonu, durum geçişlerinin \(işlemler\) tam bir sıralamasını gerektirir. Bundan dolayı, eğer akıllı sözleşmelerde kullanılacaklarsa, ANT'ların C-Chain'e taşınması gerekir.

## C-Chain'deki token'lar

### AVAX

AVAX, ETH'nin Ethereum Ağı'nda oynadığı rolün aynısını C-Chain'de oynar. Bir akıllı sözleşme yarattığınızda veya çağırdığınızda, işlem ücretini \(gaz bedeli\) AVAX ile ödersiniz. AVAX'ı hesaplar arasında transfer edebilir ve yerel EVM araçlarını ve kitaplıklarını kullanarak bir akıllı sözleşmeye AVAX gönderebilirsiniz.

### ANT'lar

Ancak ANT'ların EVM içinde hiçbir dengi yoktur. Bu nedenle C-Chain'de ANT bakiyelerinin tutulmasını ve ANT'ların transferini desteklemek için C-Chain bazı modifikasyonlar içermektedir.

C-Chain, ANT'ları desteklemek için her hesabın deposunda bir mapping [varlık kimliği -> bakiye] tutar. Bu token'lar X-Chain'e geri aktarılabilir, ya da `nativeAssetCall` ve `nativeAssetBalance` ögeleri kullanılarak C-Chain'de kullanılabilir. `nativeAssetCall` ve `nativeAssetBalance` ögeleri, ANT'ların C-Chain'de daha zengin kullanımına imkan sağlayan Apricot Faz 2'de yayınlanan önceden derlenmiş sözleşmelerdir.

#### nativeAssetCall

Bir EVM İşlemi aşağıdaki alanlardan oluşur:

* **`nonce`** Gönderici tarafından gönderilen işlemlerin sayısına eşit sayıl değerdir \(scalar value\).
* **`gasPrice`** Bu işlemin gerçekleştirilmesi için gaz birim başına ödenen Wei \(1 Wei = 10^-18 AVAX\) adedine eşit sayıl değerdir.
* **`gasLimit`** Bu işlemin gerçekleştirilmesi için kullanılması gereken maksimum gaz miktarına eşit sayıl değerdir.
* **`to`** Mesaj çağrısının alıcısının 20 baytlık adresidir. Eğer işlem bir sözleşme yaratıyorsa, `to` boş bırakılır.
* **`value`** Mesaj çağrısının alıcısına ya da bir sözleşme yaratılması durumunda yeni yaratılan sözleşmeye bir bağış olarak transfer edilecek yerel varlığın \(AVAX\) Wei cinsinden \(1 Wei = 10^-18 AVAX\) sayıl değeridir.
* **`v, r, s`** İşlemin imzasına karşılık gelen değerlerdir.
* **`data`** Bir sözleşme çağrısına giden girdi verilerini ya da bir sözleşme yaratılıyorsa, hesap başlatma sürecinin EVM bytecode'unu belirleyen sınırsız boyuttaki bayt dizilimidir.

`nativeAssetCall`, `0x0100000000000000000000000000000000000002` adresinde bulunan önceden derlenmiş bir sözleşmedir. `nativeAssetCall`, kullanıcıların bir yerel varlığı belli bir adrese atomik olarak transfer etmelerine ve isteğe bağlı olarak o adrese bir sözleşme çağrısı yapmalarına imkan verir. Bu, normal bir işlemin bir adrese değer gönderebilmesiyle ve o adrese bir miktar `data` ile atomik olarak çağrı yapabilmesiyle paraleldir.

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

Bu argümanlar Solidity'de `abi.encodePacked(...)` vasıtasıyla paketlenebilir, çünkü değişken \(variadic\) uzunluğa sahip olan tek bir argüman vardır \(`callData`\). İlk üç argüman sabit uzunluktadır, dolayısıyla önceden derlenmiş sözleşme çağrı girdisini basitçe şöyle parse eder:

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

**Örnek**

Örneğin, varlık kimliği `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK` olan bir ANT'ı `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` adresinden `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57` adresine göndermek için, önce varlık kimliğini hex'e, yani `0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`'e çevirin. Sonra ANT'ın alıcısı olan adresi, varlık kimliğini \(assetID\) ve varlık tutarını \(assetAmount\) birleştirin \(concatenate\) ve değeri `data` parametresi olarak `0x0100000000000000000000000000000000000002` adresine `eth_sendTransaction` RPC'yi kullanarak POST edin.

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

`nativeAssetBalance`, `0x0100000000000000000000000000000000000001` adresinde bulunan önceden derlenmiş bir sözleşmedir. `nativeAssetBalance`, AVAX bakiyesini almak için `balance` ögesini kullanmanın ANT eşdeğeridir.

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

Bu argümanların hepsi de sabit uzunlukta oldukları için bu argümanlar Solidity'de `abi.encodePacked(...)` vasıtasıyla paketlenebilir.

```text
+-------------+---------------+-----------------+
| address     : address       |        20 bytes |
+-------------+---------------+-----------------+
| assetID     : uint256       |        32 bytes |
+-------------+---------------+-----------------+
                              |        52 bytes |
                              +-----------------+
```

**Örnek**

Örneğin, `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` adresinin bakiyesini ve varlık kimliği `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`'yi  almak için önce varlık kimliğini hex'e, yani `0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`'ye çevirin. Sonra adresi ve varlık kimliğini birleştirin \(concatenate\) ve değeri `data` parametresi olarak `0x0100000000000000000000000000000000000001` adresine `eth_call` RPC'yi kullanarak POST edin.

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

## ARC-20'ler

Bir ARC-20, altta yatan bir Avalanche Yerel Token'ını, WAVAX'ın AVAX'ı wrap etmesiyle aynı şekilde wrap eden bir ERC-20 token'ıdır.

### ERC-20 nedir?

ERC-20, Ethereum'da standartlaştırılmış bir token tipidir. Bu token, bir akıllı sözleşmenin Ethereum'da bir token olarak hizmet etmesine imkan veren standart bir fonksiyonlar ve olaylar kümesi sunar. Tam bir açıklama için [buradaki](https://eips.ethereum.org/EIPS/eip-20) orijinal teklifi okuyun.

ERC-20'ler aşağıdaki arayüzü kullanıma sunar:

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

Bir ERC-20 bir akıllı sözleşme vasıtasıyla implemente edilir, yani bunlar kendi durumlarını korurlar. Yani, hesabınızda belli bir ERC-20'den 5 adet varsa, hesabınıza sahipliği veren veriler aslında o ERC-20'nin sözleşmesinde saklanır. Bunun tersine, bir ETH bakiyesi sizin kendi hesabınızın deposunda tutulur.

### ANT'dan ARC-20'ye

ERC-20'lerden farklı olarak, Avalanche Yerel Token'ları \(ANT'lar\) doğrudan bunlara sahip olan hesapta saklanır. ANT'lar, bunları C-Chain'deki akıllı sözleşmelerde kullanılabilir yapmak için "wrap edilebilirler". Biz bu wrap edilmiş varlığa ARC-20 diyoruz. Bunu yapmak için, normal bir ERC-20 sözleşmesine, ARC-20'nin wrap ettiği altta yatan varlığı temsil etmesi için bir `assetID` alanı ekliyoruz.

Ek olarak, ARC-20 sözleşmeleri iki ek fonksiyonu destekler: `withdraw` ve `deposit`. Bunu implemente etmek için, ARC-20'lerin önceden derlenmiş şu sözleşmeleri kullanmaları gerekir: `nativeAssetCall` ve `nativeAssetBalance`.

#### Sözleşme Bakiyesi / Toplam Arz

ERC-20'ler tipik olarak bir toplam arz alanına sahiptir, ancak bu, wrap edilmiş bir varlık bağlamında farklı şeyleri ifade edebilir. Toplam arz, wrap edilmemiş varlığın tüm platformdaki toplam arzını ya da varlığın wrapper sözleşmedeki tutarını gösteriyor olabilir.

Basitleştirmek için, biz wrap edilmiş varlığın ARC-20 sözleşmesindeki toplam arzını göstermek için toplam arzı kullanıyoruz.

#### ARC-20 Mevduatları

Bir ARC-20'ye fonlar yatırmak için, ARC-20 sözleşmesine mevduat miktarını göndermemiz ve ardından sözleşmenin mevduat fonksiyonunu çalıştırarak sözleşmenin mevduatı onaylamasını ve çağrıyı yapanın bakiyesini güncellemesini sağlamamız gerekir. Bu, Ethereum'daki WETH \(Wrap Edilmiş ETH\) ile aynıdır. WETH'le bu işlem basit bir `call` ile yapılabilir çünkü bu metot çağrıyı yapanın hem ETH göndermesine hem de akıllı sözleşmeyi atomik olarak çalıştırmasına imkan verir. AVAX dışı ARC-20'lerle, `nativeAssetCall` komutu C-Chain'de ANT'lar için aynı fonksiyonelliğe imkan verir.

Örnek olarak:

* **`nonce`**: 2
* **`gasPrice`**: 225 gwei
* **`gasLimit`**: 3.000.000
* **`to`**: `0x0100000000000000000000000000000000000002`
* **`value`**: 0
* **`v, r, s`**: [İşlem İmzası]
* **`data`**: abi.encodePacked\(arc20Address, assetID, assetAmount, abi.encodeWithSignature\("deposit\(\)"\)\)

Bu, `assetID` varlık kimliğinin `assetAmount` varlık tutarını ARC-20 sözleşmesinin adresine transfer eder ve ardından sözleşmedeki `deposit()` mevduat ögesini çağırır.

Mevduat fonksiyonu, toplam arzın bir önceki değerini kullanarak `assetID`'nin ne kadarının mevduata alındığını hesaplar.

Not: Sözleşmenin `assetID` bakiyesi, biri `deposit()` ögesini çağırmadan sözleşmeye fonlar gönderirse toplam arzla senkronizasyonunu kaybedebilir. Bu durumda, `deposit()` ögesini çağıran bir sonraki hesap, daha önce gönderilmiş fonları hesabın alacağında görebilir.

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

#### ARC-20 Çekişleri

Bir ARC-20 sözleşmesi bir çekiş isteği aldığında, `nativeAssetCall` ile hesapta yeterli bakiye olup olmadığını doğrular, bakiyeyi ve toplam arzı günceller ve fonları çekiş yapana gönderir. ARC-20'lerin çekiş fonksiyonu şöyle görünür:

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

