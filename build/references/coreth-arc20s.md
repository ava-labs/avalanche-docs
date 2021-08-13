# Çığ Yerli Tokens ve ARC-20'ler

## Çığ Yerli Token nedir?

Avalanche Yerlisi Token \ (ANT\), X-Chain üzerinde üretilen sabit kaplı veya değişken kapak jetidir. Bu işaretler on yıldırım hızlarında değişebilir, bu da bir of doğrusal zincir üzerindeki üstün performansından yararlanır. Bu belgede Avalanche Yerli Tokens X-Chain üzerinde yaratılmış non-fungible olmayan işaretler \(NFTs\) içermez.

## Neden from to karınca götürsün?

Akıllı sözleşme işlevselliği toplam devlet geçiş sıralamasını gerektirir. Sonuç olarak, ANTs akıllı sözleşmelerde kullanılacaksa to be

## on Tokens

### AVAX

AVAX, Ethereum Network'te on yaptığı C-Chain üzerinde aynı rolü oynar. Akıllı bir sözleşme oluşturduğunuzda veya When AVAX ile işlem ücretini ödersiniz. AVAX hesaplar arasında aktarıp AVAX yerel EVM araçları ve kütüphaneleri kullanarak akıllı bir sözleşmeye gönderebilirsiniz.

### ANTs

Ancak ANTs, EVM içinde bir mevkidaşı yok. Bu nedenle, Therefore, karınca dengelerini ve C-Chain üzerinde ANTs aktarmak için bazı değişiklikler vardır.

C-Chain her bir hesabın depolamasında ANTs. desteklemek için bir haritalama tutar. Bu işaretler to geri aktarılabilir, veya `X-Chain, Yerli Varlık Çağrısı` ve `Yerli``` `Varlık` Çağrısı ve Yerli Varlık tokens kullanarak kullanılabilirler.

#### Yerli Varlık Çağrısı

Bir EVM Transaction aşağıdaki alanlardan oluşur:

* **`Nonce`** Scalar değeri, gönderenin gönderdiği işlem sayısına eşittir.
* **`Benzin`** fiyatları ölçeğinin değeri Wei \(1 Wei = 10^-18 AVAX\) bu işlemi başlatmak için bir ünite gaz başına ödeme yaptı.
* **`Benzin`** ölçeği ölçeği ölçüsü bu işlem için kullanılması gereken gaz miktarına eşittir.
* Mesaj çağrısının alıcısının 20 byte adresine **`kadar.`** Eğer işlem bir `sözleşme` yaratıyorsa, boş kalır.
* Wei \(1 Wei = 10^-18 AVAX\) için yerel varlığın ölçer değeri \(AVAX\), mesaj **`çağrısının`** alıcısına veya sözleşme yaratıldığında aktarılacaktır.
* **`V, r, s`** Values işlemlerin imzasına karşılık geliyor.
* Bir sözleşme çağrısına girilen veriyi belirleyen sınırsız boyutsuz byte dizisi, bir sözleşme oluşturulursa, **`hesap`** başlatma işlemi için EVM bytecode (hesap)

Yerli `nativeAssetCall``` Adres `0x0100` Bu normal bir işlemin bir adrese değerini gönderip bazı `verilerle` atomik olarak bu adresi adlandırma şekline paraleldir.

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

Bu argümanlar in `abi.encodePacked (...)` ile paketlenebilir, çünkü variadic uzunlukta sadece bir argüman `vardır.` İlk üç argüman sürekli uzunluktur. Yani önceden derlenmiş sözleşme, çağrı girişini şöyle şöyle ayrıştırır:

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

**Örnek olarak**

Örneğin, `2nzgmhZLuVq8jc7NNu2eahkKwoJcWXWCCVWAJEZhquoK` Adresi `0x8dbb97C7C7C249c2bDC0226Cc4C2A57BF52FC` adresine `0xDd1749831f1f70d88B0d8B07B07B07c07CDc79c54466166bb66bcc44``` Bir sonraki adrese göre ANT, assetID ve değerleri elde eden adres `verileri` verileri olarak etiketle `concatenate` RPC kullanılarak kullanılarak `verileri` paylaşır.

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

#### Yerli Varlık Dengesi

Yerli `nativeAssetBalance````` Adres `0x0100`

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

Bu argümanlar tüm argümanlar sürekli uzunlukta olduğundan `abi.encodePacked(...)` (..) paketlenebilir.

```text
+-------------+---------------+-----------------+
| address     : address       |        20 bytes |
+-------------+---------------+-----------------+
| assetID     : uint256       |        32 bytes |
+-------------+---------------+-----------------+
                              |        52 bytes |
                              +-----------------+
```

**Örnek olarak**

Örneğin, adres dengesini `elde` etmek için, 0x8db97C7C7C249c2b98bDC0226C2A57BF52FC ve assetID `2nzgmhzzq8jc7NNu2eahkKwoJWWWCCxHBVWAZhquoK`, ilk olarak of hex, `0xec2129d125253540e9dd16161261261686146646446446464641d7`. Bir sonraki adrese ve assetID ile değer verileri verileri etiketle `eth_call` RPC ile `kullanılarak`` 0x010100`

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

## ARC-20.

ARC-20 (ARC-20), WAVAX WAVAX sardığı gibi altta yatan bir Avalanche Yerli Token paketidir.

### ERC-20 nedir?

ERC-20 Ethereum üzerinde standart bir token türüdür. Standart bir dizi fonksiyon ve etkinlik sunar, akıllı bir sözleşmenin Ethereum üzerinde bir gösterge olarak hizmet etmesini sağlar. Tam bir açıklama için, orijinal öneriyi burada [oku](https://eips.ethereum.org/EIPS/eip-20).

ERC-20'ler aşağıdaki arayüzü ortaya çıkar:

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

Bir ERC-20 akıllı bir sözleşme ile uygulanır yani kendi devletlerini korudukları anlamına gelir. Eğer hesabınız verilen ERC-20'nin 5 tanesine sahipse, o zaman hesap sahibinizi veren veriler aslında ERC-20'nin sözleşmesinde saklanıyor. Buna karşılık, bir ETH dengesi kendi hesabınızın deposunda tutulur.

### KARINCA, ARC-20'ye

ERC-20'lerin aksine, Avalanche Yerli Tokens \(ANTs\) doğrudan onların sahibi olan hesaba saklanır. Karıncalar, on akıllı sözleşmelerde kullanılabilir hale getirmek için "paketlenmiş olabilir. Buna "ARC-20" diyoruz. Bunu yapmak için, ARC-20 paketinin temel varlığı temsil etmek için düzenli bir ERC-20 sözleşmesine bir `assetID` alanı ekleyeceğiz.

ArC-20 sözleşmesi iki ek fonksiyonu destekler: `geri` çekilme ve `depozit`. Bu uygulamayı uygulamak için ARC-20'lerin önceden derlenmiş sözleşmeleri kullanmaları gerekir: `Yerli Varlık Çağı` ve `Yerin Varlık` Dengelemesi.

#### Kontrat Denge / Toplam Arz

ERC-20'ler genellikle toplam tedarik alanı vardır ancak bu paketlenmiş bir varlığın bağlamında farklı şeyler ifade edebilir. Toplam tedarik, tüm platformdaki paketsiz varlığın toplam kaynağını veya wrapper sözleşmesindeki varlığın miktarını gösterebilir.

Basitlik için, ARC-20 sözleşmesindeki malın toplam kaynağını belirlemek için toplam malzeme kullanıyoruz.

#### ARC-20 Depozisyonu

Fonları bir ARC-20'ye yatırmak için ARC-20 sözleşmesini depozito miktarını gönderip kontratın depozitoyu kabul edip arayanın dengesini güncellemesi için sözleşmeyi talep etmeliyiz. Bu durum on WETH \(Sarılı ETH\) ile benzerdir. WETH ile bu basit `bir çağrı` ile başarılabilir, çünkü bu yöntem arayanın hem ETH göndermesini hem de akıllı bir kontratı atomik olarak çalıştırmasını sağlar. AVAX ARC-20'ler olmayan ARC-20'ler ile, `nativeAssetCall` nativeAssetCall ARC-20s, için de aynı işlevselliğe izin verir.

Örneğin:

* **`nonce`**: 2
* **`Gaz fiyatı`**: 225 gwei
* **`Gaz Limiti`**: 300.
* **`0x0100`**``
* **`değer`**: 0
* **`v, r, s`**: [Transaction Signature\
* **`Veri`**: abi.encodePacked\(arc20Address, (arc20Address, assetID, assetAmount, abi.encodeWithSignature\("deposit\(\)"\)\

Bu `durum` ARC-20 sözleşmesinin adresine `varlık` miktarı aktarır ve sözleşmede `deposit()` olarak adlandırılır.

Depozit fonksiyonu toplam arzın önceki değerini kullanır ve hesapta ne kadar `varlık` aldığını hesaplar.

Not: Sözleşmenin `assetID` dengesi eğer biri sözleşmeye `para` göndermeden para gönderirse toplam tedarik ile senkronize olabilir() Bu durumda, `daha` önce gönderilen fonlar için depozit() çağrıları yapılacak bir sonraki hesap kredi alacaktı.

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

#### ARC-20 Geri Çekilmesi

ARC-20 sözleşmesi geri çekilme talebi alınca yeterli hesap dengesi olduğunu kanıtlar, dengeyi ve toplam tedarik güncellemesi ve fonları `yerlilerle` birlikte geri çekmeceye gönderir. ARC-20'lerin geri çekilmesi şu gibi görünüyor:

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

