# Platform Zinciri (P-Chain) API'si

Bu API, müşterilerin Avalanche'ın [doğrulayıcı](../../learn/platform-overview/staking.md#validators) kümesini idame ettiren ve blok zincir yaratılmasını yöneten [P-Chain](../../learn/platform-overview/#platform-chain-p-chain) ile etkileşimde bulunmalarına imkan verir.

## Son Nokta

```cpp
/ext/P
```

## Format

Bu API, `json 2.0` RPC formatını kullanır.

## Metotlar

### platform.addDelegator

Birincil Ağ'a bir yetkilendirici (delegator) ekleyin.

Bir yetkilendirici AVAX stake eder ve kendisi adına doğrulama yapacak bir doğrulayıcı (yetkilendirilen) belirler. Yetkilendirilen, kendisine delege edilen stake miktarıyla orantılı olarak artan bir diğer doğrulayıcılar tarafından örneklenme olasılığına (ağırlık) sahip olur.

Yetkilendirilen, yetkilendirenden bir ücret alır; yetkilendirilen, yetkilendirenin (eğer varsa) doğrulama ödülünün bir yüzdesini alır. Stake delege etme işlemi ücrete tabi değildir.

Yetkilendirme (delegation) dönemi, yetkilendirilenin Birincil Ağ'ı doğruladığı dönemin bir subnet'i olmalıdır.

Bir yetkilendirici olarak bir düğüm eklemek için işlem yayınladıktan sonra parametreleri değiştirmenin hiçbir yolunun olmadığı aklınızda bulunsun. **Bir stake'i erken kaldıramazsınız ya da stake tutarını, düğüm kimliğini veya ödül adresini değiştiremezsiniz.** Doğru değerleri kullandığınızdan emin olun. Emin değilseniz, [Geliştirici SSS](https://support.avalabs.org/en/collections/2618154-developer-faq) bölümüne bakın veya [Discord](https://chat.avalabs.org/) platformunda yardım isteyin.

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **İmza**

```cpp
platform.addDelegator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `nodeID`, yetkilendirmenin yapılacağı düğümün kimliğidir.
* `startTime`, yetkilendirenin yetki delege etmeye başladığı Unix zamanıdır.
* `endTime`, yetkilendirenin yetki delege etmeyi durdurduğu (ve stake edilen AVAX'ın geri verildiği) Unix zamanıdır.
* `stakeAmount`, yetkilendirenin stake ettiği nAVAX'ın tutarıdır.
* `rewardAddress`, eğer varsa, doğrulayıcının ödülünün gittiği adrestir.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username`, işlem ücretini ödeyen kullanıcıdır.
* `password`, `username`'in parolasıdır.
* `txID`, işlem kimliğidir

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addDelegator",
    "params": {
        "nodeID":"NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "startTime":1594102400,
        "endTime":1604102400,
        "stakeAmount":100000,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pB3MtHUNogeHapZqMUBmx6N38ii3LzytVDrXuMovwKQFTZLs",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.addValidator

Birincil Ağ'a bir doğrulayıcı ekleyin. Bunu yapmak için AVAX stake etmeniz gerekir. Eğer düğüm doğrulama yaparken yeterince doğru ve hemen yanıt verebilir durumdaysa, stake döneminin sonuna gelindiğinde bir ödül kazanırsınız. Doğrulayıcının konsensüs sırasında diğer doğrulayıcılar tarafından örneklenme olasılığı, stake edilen AVAX tutarıyla orantılıdır.

Doğrulayıcı, yetkilendirenlerden bir ücret alır; doğrulayıcı, yetkilendirenin (eğer varsa) doğrulama ödülünün bir yüzdesini alır. En düşük yetkilendirme (delegation) ücreti %2'dir. Bir doğrulayıcı ekleme işlemi ücrete tabi değildir.

Doğrulama dönemi 2 hafta ile 1 yıl arasında olmalıdır.

Doğrulayıcılara uygulanan bir maksimum toplam ağırlık vardır. Bunun anlamı, hiçbir doğrulayıcı, bu değerden daha çok stake edilmiş ve kendisine delege edilmiş AVAX'a hiçbir zaman sahip olmayacak, demektir. Bu değer başlangıçta `min(5 * amount staked, 3M AVAX)` olarak ayarlanacaktır. Bir doğrulayıcı üzerindeki toplam değer 3 milyon AVAX'tır.

Bir doğrulayıcı olarak bir düğüm eklemek için işlem yayınladığınızda, parametreleri değiştirmenin hiçbir yolunun olmadığını aklınızda bulundurun. **Stake'inizi erken kaldıramazsınız ya da stake miktarını, düğüm kimliğini veya ödül adresini değiştiremezsiniz.** Doğru değerleri kullandığınızdan emin olun. Emin değilseniz, [Geliştirici SSS](https://support.avalabs.org/en/collections/2618154-developer-faq) bölümüne bakın veya [Discord](https://chat.avalabs.org/) platformunda yardım isteyin.

{% page-ref page="../../learn/platform-overview/staking.md" %}

#### **İmza**

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        delegationFeeRate: float,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `nodeID`, eklenen doğrulayıcının düğüm kimliğidir.
* `startTime`, doğrulayıcının Birincil Ağ'ı doğrulamaya başladığı Unix zamanıdır.
* `endTime`, doğrulayıcının Birincil Ağ'ı doğrulamayı durdurduğu (ve stake edilen AVAX'ın geri verildiği) Unix zamanıdır.
* `stakeAmount`, doğrulayıcının stake ettiği nAVAX tutarıdır.
* `rewardAddress`, eğer varsa, doğrulayıcının ödülünün gönderileceği adrestir.
* `delegationFeeRate`, bu doğrulayıcının diğerleri kendisine stake delege ettiğinde aldığı yüzdelik ücrettir. 4 ondalık basamağa kadar izin verilir; ilave ondalık basamaklar yok sayılır. 0 ile 100 (dahil) arasında olmalıdır. Örneğin, `delegationFeeRate` (yetkilendirme ücreti oranı) `1.2345` ise ve birisi bu doğrulayıcıyı yetkilendirirse, yetkilendirme dönemi sona erdiğinde, ödülün %1,2345'i doğrulayıcıya, kalanı yetkilendirene gider.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username`, işlem ücretini ödeyen kullanıcıdır.
* `password`, `username`'in parolasıdır.
* `txID`, işlem kimliğidir

#### **Örnek Çağrı**

Bu örnekte, 10 dakika ve 2 gün sonraki Unix zamanlarını hesaplamak için `date` kabuk komutu kullanıyoruz. (Not: Mac kullanıcısıysanız `$(date` yerine `$(gdate` kullanın.  `gdate`kurulu değilse, `brew install coreutils` kullanın.)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-ARCLrphAHZ28xZEBfUL7SVAmzkTZNe1LK",
        "rewardAddress":"P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="2 days" +%s)',
        "stakeAmount":1000000,
        "delegationFeeRate":10,
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.addSubnetValidator

Birincil Ağ dışında bir subnet'e bir doğrulayıcı ekleyin. Doğrulayıcı, Birincil Ağ'ı, bu subnet'i doğruladığı sürenin tamamı boyunca doğrulamalıdır.

#### **İmza**

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string,
}
```

* `nodeID`, doğrulayıcının düğüm kimliğidir.
* `subnetID`, doğrulama yapacağı subnet'tir.
* `startTime`, doğrulayıcının subnet'i doğrulamaya başladığı unix zamanıdır.
* `endTime`, doğrulayıcının subnet'i doğrulamayı durdurduğu unix zamanıdır.
* `weight`, doğrulayıcının örneklenme için kullanılan ağırlığıdır.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username`, işlem ücretini ödeyen kullanıcıdır.
* `password`, `username`'in parolasıdır.
* `txID`, işlem kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetvalidator",
    "params": {
        "nodeID":"NodeID-7xhw2mdxuds44j42tcb6u5579esbst3lg",
        "subnetID":"zbfoww1ffkpvrfywpj1cvqrfnyesepdfc61hmu2n9jnghduel",
        "startTime":1583524047,
        "endTime":1604102399,
        "weight":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    }
}
```

### platform.createAddress

Belli bir kullanıcı tarafından kontrol edilen yeni bir adres oluşturun.

#### **İmza**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax12lqey27sfujqq6mc5a3jr5av56cjsu8hg2d3hx"
    },
    "id": 1
}
```

### platform.createBlockchain

Yeni bir blok zincir yaratın. Şu anda sadece AVM'nin ve Timestamp VM'nin yeni instance'larının yaratılması desteklenmektedir.

#### **İmza**

```cpp
platform.createBlockchain(
    {
        subnetID: string,
        vmID: string,
        name: string,
        genesisData: string,
        encoding: string, //optional
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `subnetID`, yeni blok zinciri doğrulayan Subnet'in kimliğidir. Subnet mevcut olmalıdır ve Birincil Ağ olamaz.
* `vmID`, blok zincirin çalıştığı Sanal Makine'nin kimliğidir. Sanal Makine'nin bir alias'ı (takma ad) da olabilir.
* `name`, yeni blok zincirin insan tarafından okunabilir bir adıdır. Benzersiz olması gerekmez.
* `genesisData`, yeni blok zincirin `encoding` parametresi vasıtasıyla belirlenen formatta kodlanan genesis durumunun bayt temsilidir.
* `encoding`, `genesisData` için kullanılacak formatı belirler. "cb58" veya "hex" formatı olabilir. Varsayılan format "cb58"dir. Sanal Makineler, `genesisData` üretmek için kullanılabilecek `buildGenesis` adlı bir statik API metoduna sahip olmalıdır
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username`, işlem ücretini ödeyen kullanıcıdır. Bu kullanıcının subnet'in yeterli sayıda kontrol anahtarlarına sahip olması gerekir.
* `password`, `username`'in parolasıdır.
* `txID`, işlem kimliğidir.

#### **Örnek Çağrı**

Bu örnekte, Timestamp Sanal Makinesinin yeni bir instance'ını yaratıyoruz. `genesisData`, `timestamp.buildGenesis` çağrısından gelmiştir.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "vmID":"timestamp",
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
        "name":"My new timestamp",
        "genesisData": "45oj4CqFViNHUtBxJ55TZfqaVAXFwMRMj2XkHVqUYjJYoTaEM",
        "encoding": "cb58",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2TBnyFmST7TirNm6Y6z4863zusRVpWi5Cj1sKS9bXTUmu8GfeU",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.createSubnet

Yeni bir subnet yaratın.

Subnet'in kimliği, bu işlemin kimliğiyle aynıdır.

#### **İmza**

```cpp
platform.createSubnet(
    {
        controlKeys: []string,
        threshold: int,
        from: []string, //optional
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* Bu subnet'e bir doğrulayıcı eklemek için, `controlKeys` parametresindeki adreslerden `threshold` (eşik) sayısı kadar imza gerekir
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username`, işlem ücretini ödeyen kullanıcıdır.
* `password`, `username`'in parolasıdır.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax13xqjvp8r2entvw5m29jxxjhmp3hh6lz8laep9m",
            "P-avax165mp4efnel8rkdeqe5ztggspmw4v40j7pfjlhu"
        ],
        "threshold":2,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "hJfC5xGhtjhCGBh1JWn3vZ51KJP696TZrsbadPHNbQG2Ve5yd"
    },
    "id": 1
}
```

### platform.exportAVAX

P-Chain'deki bir adresten X-Chain'deki bir adrese AVAX gönderin. Bu işlemi yayınladıktan sonra, transferi tamamlamak için X-Chain'in [`avm.import`](exchange-chain-x-chain-api.md#avm-import) metodunu `AVAX` varlık kimliğiyle çağırmanız gerekir.

#### **İmza**

```cpp
platform.exportAVAX(
    {
        amount: int,
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    txID: string,
    changeAddr: string
}
```

* `amount`, gönderilecek nAVAX tutarıdır.
* `to`, X-Chain'deki AVAX gönderilecek adrestir
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username`, AVAX gönderen ve işlem ücretini ödeyen kullanıcıdır.
* `password`, `username`'in parolasıdır.
* `txID`, bu işlemin kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.exportAVAX",
    "params": {
        "to":"X-avax1yv8cwj9kq3527feemtmh5gkvezna5xys08mxet",
        "amount":1,
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2Kz69TNBSeABuaVjKa6ZJCTLobbe5xo9c5eU8QwdUSvPo2dBk3",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.exportKey

Belli bir adresi kontrol eden özel anahtarı getirin. Getirilen özel anahtar, [`platform.importKey`](platform-chain-p-chain-api.md#platform-importkey) komutuyla bir kullanıcıya eklenebilir.

#### **İmza**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `username`, `address`'i kontrol eden kullanıcıdır.
* `password`, `username`'in parolasıdır.
* `privateKey`, `address`'i kontrol eden özel anahtarın string temsilidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.exportKey",
    "params" :{
        "username" :"myUsername",
        "password": "myPassword",
        "address": "P-avax1zwp96clwehpwm57r9ftzdm7rnuslrunj68ua3r"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-Lf49kAJw3CbaL783vmbeAJvhscJqC7vi5yBYLxw2XfbzNS5RS"
    }
}
```

### platform.getBalance

Belli bir adres ile kontrol edilen AVAX bakiyesini getirin.

#### **İmza**

```cpp
platform.getBalance({
    address:string
}) -> {
    balance: string,
    unlocked: string,
    lockedStakeable: string,
    lockedNotStakeable: string,
    utxoIDs: []{
        txID: string,
        outputIndex: int
    }
}
```

* `address`, bakiyesi getirilecek adrestir.
* `balance`, nAVAX cinsinden toplam bakiyedir.
* `unlocked`, nAVAX cinsinden kilidi açılmış bakiyedir.
* `lockedStakeable`, nAVAX cinsinden stake edilebilir kilitli bakiyedir.
* `lockedNotStakeable`, nAVAX cinsinden kilitli ve stake edilemeyen bakiyedir.
* `utxoIDs`, `address`'e referans yapan UTXO'ların kimlikleridir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"platform.getBalance",
  "params" :{
      "address":"P-avax1m8wnvtqvthsxxlrrsu3f43kf9wgch5tyfx4nmf"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "20000000000000000",
        "unlocked": "10000000000000000",
        "lockedStakeable": "10000000000000000",
        "lockedNotStakeable": "0",
        "utxoIDs": [
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 1
            },
            {
                "txID": "11111111111111111111111111111111LpoYY",
                "outputIndex": 0
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchains

Mevcut tüm blok zincirleri getirin (P-Chain hariç).

#### **İmza**

```cpp
platform.getBlockchains() ->
{
    blockchains: []{
        id: string,
        name:string,
        subnetID: string,
        vmID: string
    }
}
```

* `blockchains`, Avalanche ağında mevcut blok zincirlerin tümüdür.
* `name` bu blok zincirin insan tarafından okunabilir adıdır.
* `id` blok zincirin kimliğidir.
* `subnetID`, bu blok zinciri doğrulayan Subnet'in kimliğidir.
* `vmID`, blok zinciri çalıştıran Sanal Makine'nin kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "CqhF97NNugqYLiGaQJ2xckfmkEr8uNeGG5TQbyGcgnZ5ahQwa",
                "name": "Simple DAG Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjdyTKUSrQs1YmKDTUbdUhdstSdtRTGRbUn8sqK8B6pkZkz1"
            },
            {
                "id": "VcqKNBJsYanhVFxGyQE5CyNVYxL3ZFD7cnKptKWeVikJKQkjv",
                "name": "Simple Chain Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjchUjzDqDfBPGjfQq2tXW1UCwZTyvzAWHsNzF2cb1eVHt6w"
            },
            {
                "id": "2SMYrx4Dj6QqCEA3WjnUTYEFSnpqVTwyV3GPNgQqQZbBbFgoJX",
                "name": "Simple Timestamp Server",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
                "name": "My new timestamp",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi",
                "name": "My new AVM",
                "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### platform.getBlockchainStatus

Bir blok zincirin durumunu getirin.

#### **İmza**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`status`, şunlardan biridir:

* `Validating`: Blok zincir bu düğüm tarafından doğrulanıyor.
* `Created`: Blok zincir mevcut ancak bu düğüm tarafından doğrulanmıyor.
* `Preferred`: Blok zincirin yaratılması teklif edildi ve muhtemelen yaratılacak ancak işlem henüz kabul edilmedi.
* `Unknown`: Blok zincir ya teklif edilmedi ya da blok zinciri yaratma teklifi tercih edilmedi. Teklif yeniden gönderilebilir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchainStatus",
    "params":{
        "blockchainID":"2NbS4dwGaf2p1MaXb65PrkZdXRwmSX4ZzGnUu7jm3aykgThuZE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Created"
    },
    "id": 1
}
```

### platform.getCurrentSupply

Mevcut AVAX adedi için bir üst limit döndürür. Bu bir üst limittir, çünkü işlem ücretleri de dahil, yakılmış token'ları hesaba katmaz.

#### **İmza**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* `supply`, mevcut nAVAX adedi üzerindeki AVAX cinsinden ifade edilen bir üst limittir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

Bu örnekteki yanıt, AVAX arzının en fazla 365,865 milyon olduğunu gösterir.

### platform.getCurrentValidators

Belli bir Subnet'in güncel doğrulayıcılarını listeleyin.

Üst düzey alan `delegators`'ın v1.0.1 sürümü itibarıyla [kullanımdan kaldırılacağı ilan edilmiş](deprecated-api-calls.md#getcurrentvalidators) ve v.1.0.6 sürümünde kullanımdan kaldırılmıştı. Bunun yerine, `validators`'ın her bir ögesi şimdi o doğrulayıcıya ait yetkilendirenlerin listesini içerir.

#### **İmza**

```cpp
platform.getCurrentValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        weight: string, //optional
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: bool,
        delegators: []{
            txID: string,
            startTime: string,
            endTime: string,
            stakeAmount: string, //optional
            nodeID: string,
            rewardOwner: {
                locktime: string,
                threshold: string,
                addresses: string[]
            },
            potentialReward: string,
        }
    }
}
```

* `subnetID`, güncel doğrulayıcıları döndürülen subnet'tir. Kullanılmadıysa, Birincil Ağ'ın güncel doğrulayıcılarını döndürür.
* `nodeIDs`, istenen güncel doğrulayıcıların düğüm kimliklerinin bir listesidir. Kullanılmazsa, tüm güncel doğrulayıcılar döndürülür. Belirtilen bir düğüm kimliği güncel doğrulayıcılar kümesinde değilse, gelen yanıtta yer almayacaktır.
* `validators`:
   * `txID`, doğrulayıcı işlemidir.
   * `startTime`, doğrulayıcının Subnet'i doğrulamaya başladığı Unix zamanıdır.
   * `endTime`, doğrulayıcının Subnet'i doğrulamayı durdurduğu Unix zamanıdır.
   * `stakeAmount`, bu doğrulayıcının stake ettiği nAVAX tutarıdır. Eğer `subnetID` Birincil Ağ değilse, kullanılmaz.
   * `nodeID`, doğrulayıcının düğüm kimliğidir.
   * `weight`, doğrulayıcıların örneklenmesi sırasında doğrulayıcının ağırlığıdır. Eğer `subnetID` Birincil Ağ ise, kullanılmaz.
   * `rewardOwner`, bir `OutputOwners` çıktısıdır ki `locktime`, `threshold` ve `addresses` dizisini içerir.
   * `potentialReward`, staking'den kazanılan potansiyel ödüldür
   * `delegationFeeRate`, bu doğrulayıcının diğerleri kendisine stake delege ettiğinde aldığı yüzdelik ücrettir.
   * `uptime`, sorgulanan düğümün bu eşin (peer) çevrimiçi olduğunu rapor ettiği zamanın %'sidir.
   * `connected` ise düğüm ağa bağlıdır
   * `delegators`, bu doğrulayıcıyı yetkilendirenlerin listesidir:
      * `txID`, yetkilendirici işlemidir.
      * `startTime`, yetkilendiricinin başladığı andaki Unix zamanıdır.
      * `endTime`, yetkilendiricinin durduğu andaki Unix zamanıdır.
      * `stakeAmount`, bu yetkilendiricinin stake ettiği nAVAX tutarıdır. Eğer `subnetID` Birincil Ağ değilse, kullanılmaz.
      * `nodeID`, doğrulayan düğümün düğüm kimliğidir.
      * `rewardOwner`, bir `OutputOwners` çıktısıdır ki `locktime`, `threshold` ve `addresses` dizisini içerir.
      * `potentialReward`, staking'den kazanılan potansiyel ödüldür
* `delegators`: (**v1.0.1 versiyonunda kullanımdan kaldırılacağı ilan edilmiştir. Metot dokümanının başındaki nota bakın.**)

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "2000000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "rewardOwner": {
                    "locktime": "0",
                    "threshold": "1",
                    "addresses": [
                        "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                    ]
                },
                "potentialReward": "117431493426",
                "delegationFee": "10.0000",
                "uptime": "0.0000",
                "connected": false,
                "delegators": [
                    {
                        "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
                        "startTime": "1600368523",
                        "endTime": "1602960342",
                        "stakeAmount": "25000000000",
                        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                        "rewardOwner": {
                            "locktime": "0",
                            "threshold": "1",
                            "addresses": [
                                "P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                            ]
                        },
                        "potentialReward": "11743144774"
                    }
                ]
            }
        ]
    },
    "id": 1
}
```

### platform.getHeight

Son kabul edilen blokun yüksekliğini döndürür.

#### **İmza**

```cpp
platform.getHeight() ->
{
    height: int,
}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "height": "56"
    },
    "id": 1
}
```

### platform.getMinStake

Birincil Ağ'ı doğrulamak için gerekli minimum AVAX tutarını ve delege edilebilecek minimum AVAX tutarını getirin.

#### **İmza**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "minValidatorStake": "2000000000000",
        "minDelegatorStake": "25000000000"
    },
    "id": 1
}
```

### platform.getPendingValidators

Belirtilen Subnet'in kararı beklenen doğrulayıcı kümesini listeler. Her bir doğrulayıcı şu anda Subnet'i doğrulamıyor ancak gelecekte doğrulayacak.

#### **İmza**

```cpp
platform.getPendingValidators({
    subnetID: string, //optional
    nodeIDs: string[], //optional
}) -> {
    validators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        delegationFee: string,
        connected: bool,
        weight: string, //optional
    },
    delegators: []{
        txID: string,
        startTime: string,
        endTime: string,
        stakeAmount: string,
        nodeID: string
    }
}
```

* `subnetID`, güncel doğrulayıcıları döndürülen subnet'tir. Kullanılmadıysa, Birincil Ağ'ın güncel doğrulayıcılarını döndürür.
* `nodeIDs`, istenen kararı beklenen doğrulayıcıların düğüm kimliklerinin listesidir. Kullanılmazsa, tüm kararı beklenen doğrulayıcılar döndürülür. Belirtilen bir düğüm kimliği kararı beklenen doğrulayıcılar kümesinde değilse, bu bilgi gelen yanıtta yer almayacaktır.
* `validators`:
   * `txID`, doğrulayıcı işlemidir.
   * `startTime`, doğrulayıcının Subnet'i doğrulamaya başladığı Unix zamanıdır.
   * `endTime`, doğrulayıcının Subnet'i doğrulamayı durdurduğu Unix zamanıdır.
   * `stakeAmount`, bu doğrulayıcının stake ettiği nAVAX tutarıdır. Eğer `subnetID` Birincil Ağ değilse, kullanılmaz.
   * `nodeID`, doğrulayıcının düğüm kimliğidir.
   * `connected` ise düğüm bağlıdır.
   * `weight`, doğrulayıcıların örneklenmesi sırasında doğrulayıcının ağırlığıdır. Eğer `subnetID` Birincil Ağ ise, kullanılmaz.
* `delegators`:
   * `txID`, yetkilendirici işlemidir.
   * `startTime`, yetkilendiricinin başladığı Unix zamanıdır.
   * `endTime`, yetkilendiricinin durduğu andaki Unix zamanıdır.
   * `stakeAmount`, bu yetkilendiricinin stake ettiği nAVAX tutarıdır. Eğer `subnetID` Birincil Ağ değilse, kullanılmaz.
   * `nodeID`, doğrulayan düğümün düğüm kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "txID": "2NNkpYTGfTFLSGXJcHtVv6drwVU2cczhmjK2uhvwDyxwsjzZMm",
                "startTime": "1600368632",
                "endTime": "1602960455",
                "stakeAmount": "200000000000",
                "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
                "delegationFee": "10.0000",
                "connected": false
            }
        ],
        "delegators": [
            {
                "txID": "Bbai8nzGVcyn2VmeYcbS74zfjJLjDacGNVuzuvAQkHn1uWfoV",
                "startTime": "1600368523",
                "endTime": "1602960342",
                "stakeAmount": "20000000000",
                "nodeID": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg"
            }
        ]
    },
    "id": 1
}
```

### platform.getRewardUTXOs

Belirtilen işlemin staking veya yetkilendirme dönemi sona erdikten sonra ödüllendirilen UTXO'lar döndürülür.

#### **İmza**

```cpp
platform.getRewardUTXOs({
    txID: string,
    encoding: string //optional
}) -> {
    numFetched: integer,
    utxos: []string,
    encoding: string
}
```

* `txID`, staking veya yetkilendirme işleminin kimliğidir
* `numFetched`, döndürülen UTXO'ların sayısıdır
* `utxos`, şifrelenmiş ödül UTXO'larının bir dizilimidir
* `encoding`, döndürülen UTXO'ların formatını belirtir. "cb58" veya "hex" formatında alabilir ve varsayılan olarak "cb58"dir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getRewardUTXOs",
    "params": {
        "txID": "2nmH8LithVbdjaXsxVQCQfXtzN9hBbmebrsaEYnLM9T32Uy2Y5"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1gz8G3BtLJ73MPspLkD83cygZufT4TPYZCmuxW5cRdPrVMbZAHfb6uyGM1jNGBhBiQAgQ6V1yceYf825g27TT6WU4bTdbniWdECDWdGdi84hdiqSJH2y",
            "11Zf8cc55Qy1rVgy3t87MJVCSEu539whRSwpdbrtHS6oh5Hnwv1NjNhqZnievVs2kBD9qTrayBYRs81emGTtmnu2wzqpLstbAPJDdVjf3kjwGWywNCdjV6TPGojVR5vHpJhBVRtHTQXR9VP9MBdHXge8zEBsQJAoZhTbr2"
        ],
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getStakingAssetID

Bir subnet'in staking varlığına ait bir varlık kimliğini getirin. Şu anda bu işlem sadece Birincil Ağ'ın staking varlık kimliğini döndürür.

#### **İmza**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `subnetID`, varlık kimliği istenen subnet'tir.
* `assetID`, bir subnet'in staking varlığına ait varlık kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStakingAssetID",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    },
    "id": 1
}
```

### platform.getSubnets

Subnet'ler hakkındaki bilgileri getirin.

#### **İmza**

```cpp
platform.getSubnets(
    {ids: []string}
) ->
{
    subnets: []{
        id: string,
        controlKeys: []string,
        threshold: string
    }
}
```

* `ids`, hakkında bilgi alınacak subnet'lerin kimlikleridir. Kullanılmazsa, tüm subnet'ler hakkındaki bilgileri getirir.
* `id`, Subnet'in kimliğidir.
* Subnet'e bir doğrulayıcı eklemek için `controlKeys`'deki adreslerden `threshold` kadar imzaya ihtiyaç vardır.

Bir Subnet'e bir doğrulayıcı eklenmesi hakkında bilgiler için [buraya](../tutorials/nodes-and-staking/add-a-validator.md) bakın.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}'
```

### platform.getStake

Bir adresler kümesi tarafından stake edilen nAVAX tutarını getirin. Döndürülen tutara staking ödülleri dahil değildir.

#### **İmza**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getStake",
    "params": {
        "addresses": [
            "P-everest1g3ea9z5kmkzwnxp8vr8rpjh6lqw4r0ufec460d",
            "P-everest12un03rm579fewele99c4v53qnmymwu46dv3s5v"
        ]
    },
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform.getTimestamp

Şu andaki P-Chain zaman damgasını alın.

#### **İmza**

```cpp
platform.getTimestamp() -> {time: string}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTimestamp",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "2021-09-07T00:00:00-04:00"
    },
    "id": 1
}
```

### platform.getTotalStake

Birincil Ağ'da stake edilen toplam nAVAX tutarını getirin.

#### **İmza**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "stake": "279825917679866811"
    },
    "id": 1
}
```

### platform.getTx

Bir işlemi o işlemin kimliği vasıtasıyla getirir.

Döndürülen işlemin formatını belirlemek için isteğe bağlı `encoding` parametresi. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.

#### **İmza**

```cpp
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTx",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111117XV7Rm5EoKbwXFJp5WWWouAENJcF1zXGxPDPCfTbpiLfwkUXcoHKnfzdXz7sRgGYeaVtJkcD9MNgGuKGXsyWEWpTK2zAToEf64ezp7r7SyvyL7RqC5oqvNbRDShn5hm9pDV4JTCjZR5RzAxjBEJZ2V8eqtU6jvpsJMHxNBtCwL6Atc1t2Dt7s5nqf7wdbFUBvwKXppBb2Yps8wUvtTKQifssMUAPygc2Rv4rGd9LRANk4JTiT15qzUjXX7zSzz16pxdBXc4jp2Z2UJRWbdxZdaybL3mYCFj197bBnYieRYzRohaUEpEjGcohrmkSfHB8S2eD74o2r66sVGdpXYo95vkZeayQkrMRit6unwWBx8FJR7Sd7GysxS9A3CiMc8cL4oRmr7XyvcFCrnPbUZK7rnN1Gtq3MN8k4JVvX6DuiFAS7xe61jY3VKJAZM9Lg3BgU6TAU3gZ",
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getTxStatus

Bir işlemin durumunu o işlemin kimliğini kullanarak getirir. İşlem düştüyse (dropped), gelen yanıtta işlemin neden düştüğü hakkında daha fazla bilgi içeren bir `reason` alanı olacaktır.

Bir önceki davranışa dair notlar için [buraya](deprecated-api-calls.md#gettxstatus) bakın.

#### **İmza**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`status`, şunlardan biridir:

* `Committed`: İşlem her düğüm tarafından kabul edilir (veya edilecektir)
* `Processing`: İşlem bu düğümde oylanıyor
* `Dropped`: İşlem ağdaki herhangi bir düğüm tarafından asla kabul edilmeyecek, daha fazla bilgi için `reason` alanına bakın
* `Unknown`: İşlem bu düğüm tarafından görülmedi

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q"
   },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Committed"
    },
    "id": 1
}
```

### platform.getUTXOs

Belli bir adresler kümesine referans yapan UTXO'ları getirir.

#### **İmza**

```cpp
platform.getUTXOs(
    {
        addresses: []string,
        limit: int, //optional
        startIndex: { //optional
            address: string,
            utxo: string
        },
        sourceChain: string, //optional
        encoding: string, //optional
    },
) ->
{
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    },
    encoding: string,
}
```

* `utxos`, her bir UTXO'nun `addresses`'deki en az bir adrese referans yaptığı UTXO'ların bir listesidir.
* En çok `limit` kadar sayıda UTXO döndürülür. Eğer `limit` kullanılmazsa veya 1024'ten büyükse, 1024'e ayarlanır.
* Bu metot sayfa düzenlemeyi (pagination) destekler. `endIndex`, en son döndürülen UTXO'yu ifade eder. Bir sonraki UTXO'lar kümesini getirmek için, bir sonraki çağrıda `endIndex` değerini `startIndex` olarak belirleyin.
* Eğer `startIndex` kullanılmazsa, `limit` sayısına kadar olan tüm UTXO'ları getirecektir.
* Sayfa düzeni kullanıldığında (yani `startIndex` verildiğinde), UTXO'ların çoklu çağrılarda benzersiz olması garanti değildir. Yani, bir UTXO birinci çağrının sonucunda görünebilir ve ardından ikinci çağrıda tekrar görünebilir.
* Sayfa düzeni kullanıldığında, çoklu çağrılarda tutarlılık garanti değildir. Yani, UTXO adresler kümesi çağrılar arasında değişmiş olabilir.
* `encoding`, döndürülen UTXO'ların formatını belirtir. "cb58" veya "hex" formatında alabilir ve varsayılan olarak "cb58"dir.

#### **Örnek**

Diyelim ki `P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx` ve `P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr`'dan en az birine referans yapan tüm UTXO'ları istiyoruz.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1s994jad0rtwvlfpkpyg2yau9nxt60qqfv023qx", "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Bu şu yanıtı verir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "5",
        "utxos": [
            "11PQ1sNw9tcXjVki7261souJnr1TPFrdVCu5JGZC7Shedq3a7xvnTXkBQ162qMYxoerMdwzCM2iM1wEQPwTxZbtkPASf2tWvddnsxPEYndVSxLv8PDFMwBGp6UoL35gd9MQW3UitpfmFsLnAUCSAZHWCgqft2iHKnKRQRz",
            "11RCDVNLzFT8KmriEJN7W1in6vB2cPteTZHnwaQF6kt8B2UANfUkcroi8b8ZSEXJE74LzX1mmBvtU34K6VZPNAVxzF6KfEA8RbYT7xhraioTsHqxVr2DJhZHpR3wGWdjUnRrqSSeeKGE76HTiQQ8WXoABesvs8GkhVpXMK",
            "11GxS4Kj2od4bocNWMQiQhcBEHsC3ZgBP6edTgYbGY7iiXgRVjPKQGkhX5zj4NC62ZdYR3sZAgp6nUc75RJKwcvBKm4MGjHvje7GvegYFCt4RmwRbFDDvbeMYusEnfVwvpYwQycXQdPFMe12z4SP4jXjnueernYbRtC4qL",
            "11S1AL9rxocRf2NVzQkZ6bfaWxgCYch7Bp2mgzBT6f5ru3XEMiVZM6F8DufeaVvJZnvnHWtZqocoSRZPHT5GM6qqCmdbXuuqb44oqdSMRvLphzhircmMnUbNz4TjBxcChtks3ZiVFhdkCb7kBNLbBEmtuHcDxM7MkgPjHw",
            "11Cn3i2T9SMArCmamYUBt5xhNEsrdRCYKQsANw3EqBkeThbQgAKxVJomfc2DE4ViYcPtz4tcEfja38nY7kQV7gGb3Fq5gxvbLdb4yZatwCZE7u4mrEXT3bNZy46ByU8A3JnT91uJmfrhHPV1M3NUHYbt6Q3mJ3bFM1KQjE"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

`numFetched` ve `limit` birbirinin aynı olduğu için, getirilmemiş daha fazla UTXO olabileceğini söyleyebiliriz. Metodu bu sefer `startIndex` ile tekrar çağırıyoruz:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "limit":5,
        "startIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Bu şu yanıtı verir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "4",
        "utxos": [
            "115ZLnNqzCsyugMY5kbLnsyP2y4se4GJBbKHjyQnbPfRBitqLaxMizsaXbDMU61fHV2MDd7fGsDnkMzsTewULi94mcjk1bfvP7aHYUG2i3XELpV9guqsCtv7m3m3Kg4Ya1m6tAWqT7PhvAaW4D3fk8W1KnXu5JTWvYBqD2",
            "11QASUuhw9M1r52maTFUZ4fnuQby9inX77VYxePQoNavEyCPuHN5cCWPQnwf8fMrydFXVMPAcS4UJAcLjSFskNEmtVPDMY4UyHwh2MChBju6Y7V8yYf3JBmYt767NPsdS3EqgufYJMowpud8fNyH1to4pAdd6A9CYbD8KG",
            "11MHPUWT8CsdrtMWstYpFR3kobsvRrLB4W8tP9kDjhjgLkCJf9aaJQM832oPcvKBsRhCCxfKdWr2UWPztRCU9HEv4qXVwRhg9fknAXzY3a9rXXPk9HmArxMHLzGzRECkXpXb2dAeqaCsZ637MPMrJeWiovgeAG8c5dAw2q",
            "11K9kKhFg75JJQUFJEGiTmbdFm7r1Uw5zsyDLDY1uVc8zo42WNbgcpscNQhyNqNPKrgtavqtRppQNXSEHnBQxEEh5KbAEcb8SxVZjSCqhNxME8UTrconBkTETSA23SjUSk8AkbTRrLz5BAqB6jo9195xNmM3WLWt7mLJ24"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "21jG2RfqyHUUgkTLe2tUp6ETGLriSDTW3th8JXFbPRNiSZ11jK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

`limit`, `numFetched`'ten daha az olduğu için UTXO'ları getirme işlemini bitirdiğimizi ve bu metodu tekrar çağırmamıza gerek olmadığını biliriz.

Diyelim ki bir ImportTx kurmak için X Chain'den P Chain'e aktarılmış UTXO'ları getirmek istiyoruz. Bu durumda atomik UTXO'ları getirmek için sourceChain argümanıyla GetUTXOs komutunu çağırmamız gerekir:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getUTXOs",
    "params" :{
        "addresses":["P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr"],
        "sourceChain": "X",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Bu şu yanıtı verir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "1",
        "utxos": [
            "115P1k9aSVFBfi9siZZz135jkrBCdEMZMbZ82JaLLuML37cgVMvGwefFXr2EaH2FML6mZuCehMLDdXSVE5aBwc8ePn8WqtZgDv9W641JZoLQhWY8fmvitiBLrc3Zd1aJPDxPouUVXFmLEbmcUnQxfw1Hyz1jpPbWSioowb"
        ],
        "endIndex": {
            "address": "P-avax1fquvrjkj7ma5srtayfvx7kncu7um3ym73ztydr",
            "utxo": "S5UKgWoVpoGFyxfisebmmRf8WqC7ZwcmYwS7XaDVZqoaFcCwK"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### platform.getValidatorsAt

Belli bir P-Chain yüksekliğindeki bir subnet'in veya Birincil Ağ'ın doğrulayıcılarını ve bunların ağırlıklarını getirin.

#### **İmza**

```cpp
platform.getValidatorsAt(
    {
        height: int,
        subnetID: string, // optional
    }
)
```

* `height`, getirilecek doğrulayıcı kümesinin bulunduğu P-Chain yüksekliğidir.
* `subnetID`, getirilecek doğrulayıcı kümesinin subnet kimliğidir. Belirtilmezse, Birincil Ağ'ın doğrulayıcı kümesini getirir.

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getValidatorsAt",
    "params": {
        "height":1
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "validators": {
            "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg": 2000000000000000,
            "NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu": 2000000000000000,
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ": 2000000000000000,
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN": 2000000000000000,
            "NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5": 2000000000000000
        }
    },
    "id": 1
}
```

### platform.importAVAX

X-Chain'den P-Chain'e bir AVAX aktarımı tamamlayın.

Bu metot çağrılmadan önce, transferi başlatmak için X-Chain'in [`avm.export`](exchange-chain-x-chain-api.md#avm-export) metodunu `AVAX` varlık kimliği ile çağırmanız gerekir.

#### **İmza**

```cpp
platform.importAVAX(
    {
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        username: string,
        password: string
    }
) ->
{
    tx: string,
    changeAddr: string
}
```

* `to`, AVAX'ın içe aktarıldığı adresin kimliğidir. Bu, karşılık gelen X-Chain `export` çağrısındaki `to` argümanıyla aynı olmalıdır.
* `from`, bu operasyon için kullanmak istediğiniz adreslerdir. Kullanılmazsa, adreslerinizden herhangi birini gereken şekilde kullanır.
* `changeAddr`, para üstünün gönderileceği adrestir. Kullanılmazsa, para üstü kullanıcı tarafından kontrol edilen adreslerden birine gönderilir.
* `username` adresleri kontrol eden ve değiştiren kullanıcıdır.
* `password`, `username`'in parolasıdır.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to": "P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "P63NjowXaQJXt5cmspqdoD3VcuQdXUPM5eoZE2Vcg63aVEx8R",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### platform.importKey

Bir kullanıcıya bir adresi kontrol eden özel anahtarı vererek o kullanıcıya o adresin kontrolünü verin.

#### **İmza**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* `username`'in özel anahtarlarına `privateKey` ekleyin. `address`, `username`'in şimdi özel anahtarla kontrol ettiği adrestir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username": "myUsername",
        "password": "myPassword",
        "privateKey": "PrivateKey-2w4XiXxPfQK4TypYqnohRL8DRNTz9cGiGmwQ1zmgEqD9c9KWLq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc":"2.0",
    "id": 1,
    "result": {
        "address":"P-avax19hwpvkx2p5q99w87dlpfhqpt3czyh8ywasfaym"
    }
}
```

### platform.issueTx

Platform Zincirine bir işlem gönderin.

#### **İmza**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx`, bir işlemin bayt temsilidir.
* `encoding`, işlem baytlarının şifreleme formatını belirler. "cb58" veya "hex" formatı olabilir. Varsayılan olarak "cb58"dir.
* `txID`, işlemin kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.issueTx",
    "params": {
        "tx":"111Bit5JNASbJyTLrd2kWkYRoc96swEWoWdmEhuGAFK3rCAyTnTzomuFwgx1SCUdUE71KbtXPnqj93KGr3CeftpPN37kVyqBaAQ5xaDjr7wVBTUYi9iV7kYJnHF61yovViJF74mJJy7WWQKeRMDRTiPuii5gsd11gtNahCCsKbm9seJtk2h1wAPZn9M1eL84CGVPnLUiLP",
        "encoding": "cb58"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "G3BuH6ytQ2averrLxJJugjWZHTRubzCrUZEXoheG5JMqL5ccY"
    },
    "id": 1
}
```

### platform.listAddresses

Belli bir kullanıcı tarafından kontrol edilen adresleri listeleyin.

#### **İmza**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.listAddresses",
    "params": {
        "username":"myUsername",
        "password":"myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["P-avax1ffksh2m592yjzwfp2xmdxe3z4ushln9s09z5p0"]
    },
    "id": 1
}
```

### platform.sampleValidators

Belirtilen Subnet'den doğrulayıcılar örnekleyin.

#### **İmza**

```cpp
platform.sampleValidators(
    {
        size: int,
        subnetID: string, //optional
    }
) ->
{
    validators: []string
}
```

* `size`, örneklenecek doğrulayıcıların sayısıdır.
* `subnetID`, örneklemenin yapılacağı Subnet'tir. Kullanılmazsa, varsayılan olarak Birincil Ağ'a ayarlanır.
* `validators`'ın her bir ögesi, bir doğrulayıcının kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.sampleValidators",
    "params" :{
        "size":2
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "validators":[
            "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
            "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN"
        ]
    }
}
```

### platform.validatedBy

Belli bir blok zinciri doğrulayan Subnet'i getirin.

#### **İmza**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID` blok zincirin kimliğidir.
* `subnetID`, blok zinciri doğrulayan Subnet'in kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validatedBy",
    "params": {
        "blockchainID": "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}
```

### platform.validates

Bir Subnet'in doğruladığı blok zincirlerin kimliklerini getirin.

#### **İmza**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `subnetID`, Subnet'in kimliğidir.
* `blockchainIDs`'deki her bir öge, Subnet'in doğruladığı bir blok zincirin kimliğidir.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.validates",
    "params": {
        "subnetID":"2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchainIDs": [
            "KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN",
            "2TtHFqEAAJ6b33dromYMqfgavGPF3iCpdG3hwNMiart2aB5QHi"
        ]
    },
    "id": 1
}
```

