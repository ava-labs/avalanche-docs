# Çığ Yerli Tokens ve ARC-20'ler

## Çığ Yerli Token nedir?

Avalanche Native Token \(ANT\), X-Chain üzerinde üretilen sabit kap veya değişken kapak jetidir. Bu işaretler on yıldırım hızlarında değişebilir, bu da bir of doğrusal zincir üzerindeki üstün performansından yararlanır. Bu belgede Avalanche Yerli Tokens, X-Chain üzerinde yaratılmış non-fungible olmayan işaretler \(NFTs\) içermez.

## Neden from to karınca götürsün?

Akıllı sözleşme işlevselliği devlet geçiş işlemlerinin tam bir sıralaması gerektirir. Sonuç olarak, ANTs akıllı sözleşmelerde kullanılacaksa to be

## on Tokens

### AVAX

AVAX, Ethereum Network'te on yaptığı C-Chain üzerinde aynı rolü oynar. Akıllı bir sözleşme oluşturduğunuzda veya When işlem ücretini AVAX ile ödersiniz. AVAX hesaplar arasında aktarıp AVAX yerel EVM araçları ve kütüphaneleri kullanarak akıllı bir sözleşmeye gönderebilirsiniz.

### ANTs

Ancak ANTs, EVM içinde bir mevkidaşı yok. Bu nedenle, Therefore, karınca dengelerini ve C-Chain üzerinde ANTs aktarmak için bazı değişiklikler vardır.

C-Chain her bir hesap depolamasında ANTs. desteklemek için bir \(assetID -> dengesi\) haritalama tutar. `nativeAssetBalance``nativeAssetCall``nativeAssetBalance`Bu işaretler to geri aktarılabilir, veya X-Chain, kullanılabilir `nativeAssetCall`ve Apricot Faz 2 ile serbest bırakılan ön derlenmiş sözleşmeler in daha zengin ANTs daha iyi kullanılmasına izin verir.

#### Yerli Varlık Çağrısı

Bir EVM Transaction aşağıdaki alanlardan oluşur:

* **`nonce`**Skalar değeri, gönderenin gönderdiği işlem sayısına eşittir.
* **`gasPrice`**Skalar değer Wei sayısına eşit \(1 Wei = 10^-18 AVAX\) bu işlemi çalıştırmak için gaz başına ödeme yaptı.
* **`gasLimit`**Bu işlem için kullanılacak olan gazın en yüksek miktarına eşit ölçülen ölçüde.
* **`to`**Mesaj çağrısının 20 byte adresi alıcısı. `to`Eğer işlem bir sözleşme yaratıyorsa, boş kalır.
* **`value`**Ana varlıkların \(AVAX\), Wei \(1 Wei = 10^-18 AVAX\) ölçer değeri mesaj çağrısının alıcısına veya sözleşmeli bir yaratılma durumunda aktarılır.
* **`v, r, s`**Değer işlemlerin imzasına karşılık gelir.
* **`data`**Bir sözleşme çağrısına girilen girişim verilerini belirten sınırsız boyutsuz byte dizisi, bir sözleşme oluşturulursa, hesap başlatma işlemi için EVM bytecode.

`nativeAssetCall`Adreste önceden derlenmiş bir sözleşmedir. Kullanıcıların atomik olarak yerli bir varlığı belirli bir adrese aktarmasına ve isteğe bağlı olarak bu adrese bir kontrat çağrısı yapmalarına izin `0x0100000000000000000000000000000000000002``nativeAssetCall`verir. Bu normal bir işlemin bir adrese değer gönderip bu adresi bazılarıyla atomik olarak adlandırma şekline `data`paraleldir.

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

Bu argümanlar sadece variadic uzunlukta bir argüman olduğundan `abi.encodePacked(...)`in `callData`toplanabilir. İlk üç argüman sürekli uzunluktur. Yani önceden derlenmiş sözleşme, çağrı girişini şöyle şöyle ayrıştırır:

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

`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`Örneğin, `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`adrese bir varlık ile bir karınca göndermek için ilk `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`olarak varlık kimliği hex dönüştürmek,`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7` `0x0100000000000000000000000000000000000002`Bir sonraki adrese ANT, asit ve assetAmount alan adresi ayarlar ve RPC kullanarak `data`param adresi olarak poz `eth_sendTransaction`ver.

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

`nativeAssetBalance`Adreste önceden derlenmiş bir `0x0100000000000000000000000000000000000001``nativeAssetBalance`sözleşmedir. AVAX dengesini `balance`elde etmek için ANT ile aynı değerdedir.

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

`abi.encodePacked(...)`Bu argümanlar tüm tartışmalar sürekli uzunlukta olduğundan Dayanıklılık ile paketlenebilir.

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

Örneğin, adres `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`ve assetID dengesini elde etmek için ilk `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`olarak varlık kimliğinin büyüye dönüştürülmesi,`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7` Bir sonraki adrese ve assetID ile eş zamanlı olarak `data`the RPC kullanılarak `0x0100000000000000000000000000000000000001`adresine `eth_call`gönder.

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

ARC-20 \(ARC-20\), WAVAX WAVAX sardığı gibi altta yatan bir Avalanche Yerli Token paketidir.

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

ERC-20'lerin aksine, Avalanche Yerli Tokens \(ANTs\) doğrudan onların sahibi olan hesaba saklanır. Karıncalar, on akıllı sözleşmelerde kullanılabilir hale getirmek için "paketlenmiş olabilir. Buna "ARC-20" diyoruz. Bunu yapmak için, ARC-20 paketinin altında yatan varlığı temsil etmek için düzenli bir ERC-20 sözleşmesine bir `assetID`alan ekleyeceğiz.

ArC-20 sözleşmesi iki ek fonksiyonu destekler: `withdraw`ve.`deposit` Bu uygulamayı uygulamak için ARC-20'lerin önceden hazırlanmış sözleşmeleri kullanmaları gerekir: `nativeAssetCall`ve.`nativeAssetBalance`

#### Kontrat Denge / Toplam Arz

ERC-20'ler genellikle toplam tedarik alanı vardır ancak bu paketlenmiş bir varlığın bağlamında farklı şeyler ifade edebilir. Toplam tedarik, tüm platformdaki paketsiz varlığın toplam kaynağını veya wrapper sözleşmesindeki varlığın miktarını gösterebilir.

Basitlik için, ARC-20 sözleşmesindeki malın toplam kaynağını belirlemek için toplam malzeme kullanıyoruz.

#### ARC-20 Depozisyonu

Fonları bir ARC-20'ye yatırmak için ARC-20 sözleşmesini depozito miktarını gönderip kontratın depozitoyu kabul edip arayanın dengesini güncellemesi için sözleşmeyi talep etmeliyiz. Bu durum on WETH \(Sarılı ETH\) ile benzerdir. WETH ile bu basit bir şekilde başarılabilir, `call`çünkü bu yöntem arayanın hem ETH göndermesini hem de akıllı bir kontratı atomik olarak çalıştırmasını sağlar. AVAX olmayan ARC-20'ler ile birlikte on ARC-20s, için aynı işlevselliğe izin `nativeAssetCall`verir.

Örneğin:

* **`nonce`**2:
* **`gasPrice`**225 gwei
* **`gasLimit`**300.
* **`to`**:`0x0100000000000000000000000000000000000002`
* **`value`**0
* **`v, r, s`**[İşlem İmzası]
* **`data`**: abi.encodePacked\(arc20Address, assetID, assetAmount, abi.encodeWithSignature\("deposit\(\)"\).

`assetAmount``assetID`Bu durum ARC-20 sözleşmesinin adresine aktarılır ve `deposit()`kontratı çağrılır.

`assetID`Depozit fonksiyonu toplam arzın önceki değerini kullanır ve depozito miktarından ne kadar aldığını hesaplar.

`assetID`Not: Eğer biri sözleşmeye para göndermeden sözleşmeye para gönderirse sözleşmenin dengesi tamamen senkronize olabilir.`deposit()` `deposit()`Bu durumda bir sonraki hesap daha önce gönderilen fonlar için kredi alacaktı.

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

ARC-20 sözleşmesi geri çekilme talebi alınca yeterli hesap dengesi olduğunu kanıtlar, dengeyi ve toplam tedarik güncellemesi ve parayı geri çekmeceye `nativeAssetCall`gönderir. ARC-20'lerin geri çekilmesi şu gibi görünüyor:

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

