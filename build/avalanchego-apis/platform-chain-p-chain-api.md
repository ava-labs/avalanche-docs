# Platform Zinciri \(P-Chain\ API

Bu API, müşterilerin Avalanche’s [doğrulama](../../learn/platform-overview/staking.md#validators) setini koruyan [P-Chain](../../learn/platform-overview/#platform-chain-p-chain) ile etkileşime girmelerine izin verir ve blok zincir yaratılışını kontrol eder.

## Sonucu noktası

```cpp
/ext/P
```

## Format

Bu API, `json 2.0` RPC formatını kullanır.

## Yöntemler

### platform. Eklenti platform.addDelegator

Ana Ağ'a bir delegator ekleyin.

Bir delege AVAX kazıklar ve onların adına doğrulamak için bir onaylayıcı \(dele\) belirler. Delege bu delege diğer validators \(weight\) tarafından dağıtılma olasılığının artmasına sahiptir.

Delege delege ücreti ödemektedir; eski delege tarafından onaylanma ödülünün yüzde bir pay alır. \) Delegelerin hisselerinin ücreti yok.

Delege dönemi Delege ilinin Ana Ağ'ı onayladığı dönemin bir alt kümesi olmalı.

Bir kez bir vekil olarak bir düğüm eklemek için işlem yapınca parametreleri değiştirmenin hiçbir yolu olmadığını unutmayın. **Kazığı erken kaldıramazsınız, ya da kazık miktarını, düğümünü veya ödül adresi değiştiremezsiniz.** Lütfen doğru değerleri kullandığınızdan emin olun. Emin değilseniz, [Geliştirici](https://support.avalabs.org/en/collections/2618154-developer-faq) sure, kontrol edin veya [Discord](https://chat.avalabs.org/) için yardım isteyin.

{% page-ref page="... /../learn/platform-overview/staking.md" }

#### **İmzalanma**

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

* `NodeID` delege edilecek düğümün kimliğidir.
* `Başlangıç` Zamanı, delege atanmaya başladığı Unix zamanıdır.
* `Son,` delege vekilinin görevine son verdiğinde Unix zamanıdır. (ve kazık atılan AVAX\\).
* `Kazık` miktarı delege tarafından elde edilen nAVAX miktarı.
* `Ödül` adresi, onaylayıcı ödülünün verildiği adresdir. Eğer varsa.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini ödeyen kullanıcıdır.
* `Şifre` `kullanıcı adı` şifresidir.
* `txID` işlem kimliği.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

### platform. Eklenti Doğrulaması

Ana Ağa bir onaylayıcı ekle. Bunu yapmak için AVAX kazık atmalısın. Eğer düğüm, doğrulanırken yeterince doğru ve tepki verirse, dikiş süresi sona ulaştığında bir ödül alırsınız. validator’s uzlaşma sırasında diğer validators tarafından damgalanma olasılığı of çarptığı miktara orantılı olarak orantılıdır.

Doğrulayıcı delegelerden ücret alır; eski delege doğrulama ödülünün yüzde bir kısmını alır. \) Asgari delegasyon ücreti %2'dir. Bir doğrulayıcı ekleyen bir işlemin ücreti yoktur.

Onaylanma süresi 2 hafta ile 1 yıl arasında olmalı.

Vericilere verilen toplam ağırlık yüklenir. Bu da hiçbir validator hiçbir AVAX bu değerden daha fazla kazık ve will anlamına gelir. Bu değer başlangıçta `min(5 m, 3M AVAX)` e ayarlanacaktır. Bir validator toplam değeri 3 milyon is

Bir kere bir geçiş kartı eklemek için işlem yapınca parametreleri değiştirmenin yolu olmadığını unutmayın. **Kazığı erken kaldıramazsınız, kazık miktarını, düğümünü veya ödül adresi değiştiremezsiniz.** Lütfen doğru değerleri kullandığınızdan emin olun. Emin değilseniz, [Geliştirici](https://support.avalabs.org/en/collections/2618154-developer-faq) sure, kontrol edin veya [Discord](https://chat.avalabs.org/) için yardım isteyin.

{% page-ref page="... /../learn/platform-overview/staking.md" }

#### **İmzalanma**

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

* `nodeID` destekleyicinin düğümü.
* `Başlangıç` Zamanı, onay verenin birincil Ağ'ı onaylamaya başladığı Unix zamanıdır.
* `Geçiş` süresi, geçerli olan Unix süresidir. (ve Network the geri döndüğü zaman (İngilizce).
* `Vekilinin` nAVAX miktarı ise the gizlendiği miktardır.
* `Ödül` adresi, eğer varsa, onaylayıcı ödülünün verileceği adres.
* Delege `delegationFeeRate` diğerleri onlara hisse dağıttığında bu doğrulama ücreti yüzde ücrettir. 400'e kadar ondalık yer verilmiş, ek ondalık alanları göz ardı edilmemiştir. 0-100 arası olmalı, içerik. Örneğin, eğer delege `delegationFeeRate` `1.2345` ise ve birisi bu onaylama sürecine delege devresinin bittiği zaman, ödülün %1.2345'i the gider ve geri kalanı delege olur.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini ödeyen kullanıcıdır.
* `Şifre` `kullanıcı adı` şifresidir.
* `txID` işlem kimliği.

#### **Örnek Example**

Bu örnekte, gelecekte 10 dakika 2 gün Unix'in hesaplanması için kabuk komuta `tarihini` kullanırız. \\ (Not: Eğer bir you’re `$($'la tarih ile tarih``` ile tarih ile değiştirin. `Gdate` yüklenmemişse, `çekirdek` kullanım yapınız. \)

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

#### **Örnek Tepki**

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

### platform. eklenti Ağ Validator

Ana Ağdan başka bir alt ağa bir onaylayıcı ekle. Bu alt ağı onaylayan süreç boyunca geçerli olan Temel Ağ'ı onaylamak zorundadır.

#### **İmzalanma**

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

* `nodeID` the düğümüdür.
* `SubnetID` onaylayacakları alt ağdır.
* `Başlangıç zamanı` geçerli olan alt ağı onaylamaya başladığı tek zaman.
* `Geçerli` süre, geçerli olan alt ağı onaylamayı bırakan tek süredir.
* `Ağırlık` örnekleme için kullanılan validator’s ağırlığı.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini ödeyen kullanıcıdır.
* `Şifre` `kullanıcı adı` şifresidir.
* `TxID` işlem kimliği.

#### **Örnek çağrı**

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

#### **Örnek tepki**

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

### platform.

Verilen kullanıcı tarafından kontrol edilen yeni bir adres oluştur.

#### **İmzalanma**

```cpp
platform.createAddress({
    username: string,
    password: string
}) -> {address: string}
```

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax12lqey27sfujqq6mc5a3jr5av56cjsu8hg2d3hx"
    },
    "id": 1
}
```

### platform. Yaratılma Blockchain

Yeni bir blok zinciri oluştur. Şu anda sadece AVM'nin yeni örneklerinin oluşturulmasını ve Zaman damgası of oluşturulmasını destekler.

#### **İmzalanma**

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

* `SubnetID` yeni blok zincirini doğrulayan of kimliğidir. Subnet var olmalı ve ana ağ olamaz.
* `VmID` virtüel makinenin bir parçasıdır. Blok zinciri koşuları. Sanal Makine'nin takma adı da olabilir.
* `Yeni` blok zinciri için insan okunabilir bir isim. Eşsiz olması gerekmez.
* `GenesisData,` `kodlama` parametresi tarafından belirlenen biçimde, yeni blok zincirinin genez durumunun byte temsilidir.
* `Kodlama` `genesisData`. veri için kullanılacak biçimi belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults Sanal Makineler, `Genesis` adında statik bir API metodu olmalı. Genesis `genesisData` veri üretmek için kullanılabilir
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini ödeyen kullanıcıdır. Bu kullanıcı, alt ağ kontrol anahtarlarının yeterli sayıda olmasına sahip olmalıdır.
* `Şifre` `kullanıcı adı` şifresidir.
* `TxID` işlem kimliği.

#### **Örnek Example**

Bu örnekte Zaman `damgası` Sanal Makinesi'nin yeni bir örneğini oluşturuyoruz. `Genesis,` zaman damgası oluşturulan Genesis'in çağrılmasından kaynaklandı.

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

#### **Örnek Tepki**

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

### platform. Yarat platform.createSubnet

Yeni bir alt ağ oluştur.

Bu işlem ile aynı alt ağ kimliği.

#### **İmzalanma**

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

* Bu alt ağa bir doğrulayıcı eklemek için, `in` adreslerden `eşik` imzalar gereklidir.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` işlem ücretini ödeyen kullanıcıdır.
* `Şifre` `kullanıcı adı` şifresidir.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "hJfC5xGhtjhCGBh1JWn3vZ51KJP696TZrsbadPHNbQG2Ve5yd"
    },
    "id": 1
}
```

### platform. platform.exportAVAX

on bir adresten on adrese AVAX gönder. Bu işlem yayınlandıktan sonra, transferi tamamlamak için X-Chain’s [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) yöntemini aramanız gerekir.

#### **İmzalanma**

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

* `NAVAX` miktarı gönderilir.
* `...` on adres.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` AVAX gönderen ve işlem ücretini ödemektedir.
* `Şifre` `kullanıcı adı` şifresidir.
* `Bu` işlemin kimliği.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

### platform. platform.exportKey

Verilen adresi kontrol eden özel anahtarı al.   Geri dönen özel anahtar [`with`](platform-chain-p-chain-api.md#platform-importkey) olan bir kullanıcıya eklenebilir.

#### **İmzalanma**

```cpp
platform.exportKey({
    username: string,
    password: string,
    address: string
}) -> {privateKey: string}
```

* `Kullanıcı adı` `adresi` kontrol eden kullanıcı.
* `Şifre` `kullanıcı adı` şifresidir.
* `Özel` anahtar, `adresi` kontrol eden özel anahtarın sicim temsilidir.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "privateKey":"PrivateKey-Lf49kAJw3CbaL783vmbeAJvhscJqC7vi5yBYLxw2XfbzNS5RS"
    }
}
```

### Platform. platform.getBalance in New York USA

Verilen bir adres ile AVAX dengesini kontrol ettir.

#### **İmzalanma**

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

* `Adres` dengeyi elde etmek için adres.
* `Denge` tam dengedir, in
* `Kilitlenmemiş` denge, in
* `Kilitlenebilir bir` denge ve in kilitlenebilir.
* `Kilitlenebilir` kilitlidir ve stakeable kontrol edilemez denge değildir.
* `utxoIDs` kimlik numaraları referans `adresi` olan UTXOs kimlikleridir.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

Tüm blok zincirlerini alın\ (P-Chain\ hariç)

#### **İmzalanma**

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

* `blockchains` Avalanche şebekesinde bulunan tüm blok zincirleridir.
* `Bu` blok zincirinin insan adı adı olarak okunabilir.
* `id` kimliği.
* `SubnetID` bu blok zincirini onaylayan of kimliği.
* `VmID` virtüel makinenin bir parçasıdır. Blok zinciri koşuları.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBlockchains",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

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

### platform.getBlockchainStatus Statüsü

Bir blok zincirinin durumunu öğren.

#### **İmzalanma**

```cpp
platform.getBlockchainStatus(
    {
        blockchainID: string
    }
) -> {status: string}
```

`Durum` şu:

* `Validating`: Blok zinciri bu düğümle onaylanıyor.
* `Bu` dizinin bir parçası vardır ancak bu düğümle onaylanmamıştır.
* `Tercihim`: Blok zinciri oluşturulması önerildi ve muhtemelen oluşturulması beklenmesine karşın, işlem henüz kabul edilmedi.
* `Bilinmiyor`: Blok zinciri ya da oluşturma teklifi önerilmedi. Teklif yeniden sunulabilir.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Created"
    },
    "id": 1
}
```

### platform.getCurrentSupply i

Bu durum AVAX sayısına bir üst bağlanma noktasına dönüşür. Bu bir üst bağ, çünkü işlem ücretleri de dahil olmak üzere yanık jeton hesaba katılmaz.

#### **İmzalanma**

```cpp
platform.getCurrentSupply() -> {supply: int}
```

* NAVAX sayısının üst sınırlarından biri `olan` tedarik, nAVAX ile belirlenir.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "supply": "365865167637779183"
    },
    "id": 1
}
```

Bu örnekte yanıt AVAX’s arzının en fazla 365.865 milyon olduğunu göstermektedir.

### Platform. platform.getCurrentValidators in Incelemesi

Verilen of geçerli validators listele.

Üst seviye alan `delegators` v1.0.1 itibariyle [reddedildi](deprecated-api-calls.md#getcurrentvalidators) ve v1.0.6 olarak kaldırıldı. Bunun yerine, `of` her unsuru şu anda bu onaylayıcı için delege listesini içerir.

#### **İmzalanma**

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

* `SubnetID` geçerli onaylayıcıları geri dönen alt ağdır. Eğer reddedilirse, ana ağın geçerli validators gönderir.
* `nodeIDs,` geçerli nodeIDs nodeIDs listesidir. Eğer reddedilirse, tüm geçerli validators geri döner. Eğer belirtilen bir nodeID mevcut doğrulayıcılar kümesinde değilse, bu yanıtta yer almayacaktır.
* `Doğrulayıcılar`:
   * `TxID` doğrulama işlemidir.
   * `Başlangıç` Zamanı, the the onaylamaya başladığı Unix zamanıdır.
   * `Son,` Unix zamanı geçerliliğini onaylamayı bırakan süredir.
   * `Bu` validator kazık olduğu nAVAX miktarı. Eğer `subnetID` Ana Ağ değilse, bozulmuş.
   * `NodeID` validator’s nod kimliğidir.
   * Doğrulayıcılar örnek verirken `validator’s` ağırlığı. Eğer `subnetID` Ana Ağ ise bozulmuş.
   * `Ödül Sahibi` `kilit`, `eşik` ve `adreslerin` dizisini içeren bir `OutputOwners` çıktıdır.
   * `Potansiyel` Ödül, kazıklanmaktan kazanılan potansiyel ödüldür.
   * Delege `delegationFeeRate` diğerleri onlara hisse dağıttığında bu doğrulama ücreti yüzde ücrettir.
   * `Yukarı,` sorgulanan düğümün çevrimiçi olarak bildirdiği zamanların %'sidir.
   * `Bağlantı` düğüm, ağa bağlandığında
   * `Delegeler, bu` the delegelerinin listesidir:
      * `TxID` delege işlemidir.
      * `Başlangıç` Zamanı, delege kurulunun başladığı zaman Unix zamanıdır.
      * Delege durduğunda son `zaman,` Unix zamanıdır.
      * `Bu` delege için kazık kazan nAVAX miktarı. Eğer `subnetID` Ana Ağ değilse, bozulmuş.
      * `NodeID` geçerli düğümün kimlik numarasıdır.
      * `Ödül Sahibi` `kilit`, `eşik` ve `adreslerin` dizisini içeren bir `OutputOwners` çıktıdır.
      * `Potansiyel` Ödül, kazıklanmaktan kazanılan potansiyel ödüldür.
* `Delegeler`: **\(v1.0.1 itibariyle reddedildi. Metot belgesinin en üst kısmında not alın.** \)

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

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

### Platform. Getir Yüksekliği@ info: status

Kabul edilen son bloğun yüksekliğini geri getiriyor.

#### **İmzalanma**

```cpp
platform.getHeight() ->
{
    height: int,
}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "height": "56"
    },
    "id": 1
}
```

### platform. getin

Ana Ağı onaylamak için gerekli en az AVAX miktarını ve en az AVAX ile that en minimum miktarı elde edin.

#### **İmzalanma**

```cpp
platform.getMinStake() ->
{
    minValidatorStake : uint64,
    minDelegatorStake : uint64
}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getMinStake"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

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

### Platform. get' Geçerli Geçerli Geçerli

Belirtilmiş of geçerli doğrulama kümesini List listele. Her doğrulayıcı şu anda Subnet onaylamıyor, gelecekte iradeyi onaylıyor.

#### **İmzalanma**

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

* `SubnetID` geçerli onaylayıcıları geri dönen alt ağdır. Eğer reddedilirse, ana ağın geçerli validators gönderir.
* `nodeIDs,` başvuru için bekleyen nodeIDs nodeIDs listesidir. Eğer reddedilirse, tüm pending geri döner. Eğer belirtilmiş bir nodeID bekleyen a setinde değilse, bu yanıtta yer almayacaktır.
* `Doğrulayıcılar`:
   * `TxID` doğrulama işlemidir.
   * `Başlangıç` Zamanı, the the onaylamaya başladığı Unix zamanıdır.
   * `Son,` Unix zamanı geçerliliğini onaylamayı bırakan süredir.
   * `Bu` validator kazık olduğu nAVAX miktarı. Eğer `subnetID` Ana Ağ değilse, bozulmuş.
   * `NodeID` validator’s nod kimliğidir.
   * Eğer düğüm bağlantılıysa, `bağlanır.`
   * Doğrulayıcılar örnek verirken `validator’s` ağırlığı. Eğer `subnetID` Ana Ağ ise bozulmuş.
* `Delegeler`:
   * `TxID` delege işlemidir.
   * `Başlangıç` zamanı, delege kurulunun başladığı Unix zamanıdır.
   * Delege durduğunda son `zaman,` Unix zamanıdır.
   * `Bu` delege için kazık kazan nAVAX miktarı. Eğer `subnetID` Ana Ağ değilse, bozulmuş.
   * `NodeID` geçerli düğümün kimlik numarasıdır.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

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

### platform. platform.getRewardUTXOs XOs

Verilen işlemlerin gözetim veya delege dönemi bittikten sonra ödüllendirilen UTXOs geri getirir.

#### **İmzalanma**

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

* `txID` gözetleme veya aktarma işleminin kimliği.
* `Uyumsuz` UTXOs sayısıdır
* `utxos` kodlanmış bir ödül dizisi.
* `Kodlama,` geri dönen UTXOs. için biçimi belirler. "cb58" veya "hek" ve "cb58" olarak varsayılan olarak kullanılabilir.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

### platform. get... platform.getStakingAssetID Kimliği.

Bir alt ağ varlığı için bir varlık elde edin. Bu durum sadece ana ağ gözetleme cihazını geri verir.

#### **İmzalanma**

```cpp
platform.getStakingAssetID({
    subnetID: string //optional
}) -> {
    assetID: string
}
```

* `SubnetID` özet kimliği talep edilen alt ağdır.
* `Bir` alt ağ varlığının varlığı için assetID assetID bir varlık varlığıdır.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "assetID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"
    },
    "id": 1
}
```

### platform. platform.getSubnets platform.getSubnets

Subnetler hakkında bilgi edin.

#### **İmzalanma**

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

* `Kimlikler,` bilgi almak için alt ağların kimlikleridir. Eğer reddedilirse, tüm alt ağlar hakkında bilgi alır.
* `Kimlik` Subnet’s kimliğidir.
* `Kontrol` addresses adreslerden `eşik` imzalar, alt ağa bir doğrulayıcı eklemek için ihtiyaç duyar.

to bir doğrulayıcı ekleme konusunda bilgi için [burada](../tutorials/nodes-and-staking/add-a-validator.md) bakın.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {"ids":["hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ"]},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

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

### platform. gets

NAVAX miktarını bir dizi adresle kazık olarak alın. Geri dönen miktarın ödülleri eklemek içermiyor.

#### **İmzalanma**

```cpp
platform.getStake({addresses: []string}) -> {staked: int}
```

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "staked": "5000000"
    },
    "id": 1
}
```

### platform. platform.getTotalStake Stake

Ana Ağ'a toplam nAVAX kazığı alın.

#### **İmzalanma**

```cpp
platform.getTotalStake() -> {stake: int}
```

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "stake": "279825917679866811"
    },
    "id": 1
}
```

### platform. platform.getTx

Kimliği ile bir işlem alır.

Dönen işlem için biçimi belirlemek için seçmeli `kodlama` parametresi. "cb58" veya "hece" olabilir. "Cb58" için Defaults

#### **İmzalanma**

```cpp
platform.getTx({
    txID: string,
    encoding: string //optional
}) -> {
    tx: string,
    encoding: string,
}
```

#### **Örnek Example**

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

#### **Örnek Tepki**

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

Kimliği ile işlem durumunu alır. Eğer işlem düşürülürse, cevap işlemlerin neden düşürüldüğünü daha fazla bilgi içeren `bir sebep` alanı içerecektir.

Önceki davranışlar hakkında notlar için [buraya](deprecated-api-calls.md#gettxstatus) bakın.

#### **İmzalanma**

```cpp
platform.getTxStatus({
    txID: string
}) -> {status: string}
```

`Durum` şu:

* `İşlem`: işlem her düğümle kabul edilir\ (veya olacak)
* `İşlem`: işlem bu düğümle oylanıyor
* `Düşürüldü`: Aktarım hiçbir düğümle kabul edilmeyecek daha fazla bilgi için `mantık` alanını kontrol edin.
* `Bilinmiyor`: Bu düğümle işlem görülmedi.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

Verilen adresler için UTXOs gönderilir.

#### **İmzalanma**

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

* `UTXos,` UTXO referansları en az bir adres `olarak` adlandırılan UTXOs listesidir.
* En `çok sınırda` UTXOs geri döner. `Eğer sınır` 1024'ten daha büyük veya ihmal edilirse, 1024'e ayarlanır.
* Bu yöntem pagination. destekler. `endIndex` son UTXO geri döndüğü anlamına gelir. Bir sonraki UTXOs setini almak için, bir sonraki çağrıda `endIndex` olarak `endIndex` değerini kullanın.
* Eğer `startIndex` atılırsa, tüm UTXOs `sınıra` kadar getirecektir.
* Eğer `başlangıç Endeksi` sağlanırsa, UTXOs birden fazla arama arasında eşsiz olmak garantisi yoktur. Bu da ilk çağrının sonucu olarak UTXO görünebilir, sonra ikinci çağrıda da görünebilir.
* pagination, kullanırken tutarlılık birden fazla arama arasında garanti edilmez. Bu da UTXO adresleri aramalar arasında değişmiş olabilir.
* `Kodlama,` geri dönen UTXOs. için biçimi belirler. "cb58" veya "hek" ve "cb58" olarak varsayılan olarak kullanılabilir.

#### **Örnek olarak**

Tüm UTXOs bu referans `P-avax1s994jad0rtwvlfpp2yyyau9nxt60qqfv023qx` ve `P-avax1fjj7ma5srtayfvx7kn7um3ym73ztydr`.

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

Bu cevap verir:

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

`Uyuşmuş` `limitle` aynı olduğu için daha fazla UTXOs alınmadığını söyleyebiliriz. Bu sefer `başlangıç` endeksiyle yöntemi tekrar ararız:

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

Bu cevap verir:

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

`Uyuşmuş` `bir` sınırdan az olduğundan UTXOs getirmeyi bitirdiğimizi ve bu yöntemi tekrar aramamıza gerek olmadığını biliyoruz.

Bir ImportTx yapmak için X Zincirinden P Zincirine aktarılan UTXOs almak istediğimizi varsayalım. O zaman kaynak Chain argümanıyla GetUTXOs aramalıyız. Atom GetUTXOs geri almak için:

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

Bu cevap verir:

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

### platform. platform.importAVAX

from to bir of aktarımını tamamlayın.

Bu yöntem çağrılmadan önce, transferi başlatmak için X-Chain’s [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) yöntemini aramanız gerekir.

#### **İmzalanma**

```cpp
platform.importAVAX(
    {
        from: []string, //optional
        to: string,
        changeAddr: string, //optional
        sourceChain: string,
        username: string,
        password: string
    }
) ->
{
    tx: string,
    changeAddr: string
}
```

* `...bu` adresinin kimliği of aktarıldığı adresdir. Bu X-Chain’s `ihracatına` `karşılık` gelen çağrıda tartışmayla aynı olmalıdır.
* `Kaynak zinciri` of ithal edildiği zincirin kimliği, kimliktir. from fonları aktarmak için `"X"` kullanın.
* Bu operasyon için kullanmak istediğiniz `adresler.` Eğer reddedilirse, gerekli olan adreslerinizi kullanın.
* `Değişiklik Addr` herhangi bir değişikliğin gönderileceği adres. Eğer reddedilirse, değişim kullanıcının kontrol ettiği adreslerden birine gönderilir.
* `Kullanıcı adı` belirtildiği adresi kontrol eden `kullanıcıdır`.
* `Şifre` `kullanıcı adı` şifresidir.

#### **Örnek Example**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "sourceChain": "X",
        "to": "P-avax1apzq2zt0uaaatum3wdz83u4z7dv4st7l5m5n2a",
        "from": ["P-avax1gss39m5sx6jn7wlyzeqzm086yfq2l02xkvmecy"],
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username": "myUsername",
        "password": "myPassword"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

#### **Örnek Tepki**

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

### platform. ithalat Key

Adresi kontrol eden özel anahtarı sağlayarak bir kullanıcı adresi kontrol ettir.

#### **İmzalanma**

```cpp
platform.importKey({
    username: string,
    password: string,
    privateKey:string
}) -> {address: string}
```

* `Özel` `anahtarları kullanıcı adı` ile özel anahtar setine özel anahtarları ekleyin. `Adres` artık özel anahtar ile kontrol eden adres `kullanıcı` adıdır.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc":"2.0",
    "id": 1,
    "result": {
        "address":"P-avax19hwpvkx2p5q99w87dlpfhqpt3czyh8ywasfaym"
    }
}
```

### platform.

Platform Zincirine bir işlem yapın.

#### **İmzalanma**

```cpp
platform.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {txID: string}
```

* `tx` bir işlemin byte temsilidir.
* `Şifreleme` işlemler için kodlama biçimini belirler. "cb58" veya "hece" olabilir. "Cb58" için Defaults
* `TxID` işlemlerin kimliği.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "G3BuH6ytQ2averrLxJJugjWZHTRubzCrUZEXoheG5JMqL5ccY"
    },
    "id": 1
}
```

### platform.listAddresses Adresleri

Verilen kullanıcı tarafından kontrol edilen adresler listelenir.

#### **İmzalanma**

```cpp
platform.listAddresses({
    username: string,
    password: string
}) -> {addresses: []string}
```

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "addresses": ["P-avax1ffksh2m592yjzwfp2xmdxe3z4ushln9s09z5p0"]
    },
    "id": 1
}
```

### platform. Örneklendirici

Belirtilmiş from örnek doğrulayıcılar.

#### **İmzalanma**

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

* Örnek için doğrulama `sayısı.`
* `SubnetID` sürtündüğü is Eğer reddedilirse, Primary Network'e varsayılan olarak varsayılır.
* `of` her bir öğesi bir validator. kimliğidir.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

### Platform. Doğrulanarak

Subnet bağlama zincirini Get

#### **İmzalanma**

```cpp
platform.validatedBy(
    {
        blockchainID: string
    }
) -> {subnetID: string}
```

* `blockchainID` kimlik, blok zincirinin kimliğidir.
* `SubnetID` blok zincirini doğrulayan of kimliğidir.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnetID": "2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r"
    },
    "id": 1
}
```

### Platform. Doğrulanan

the kimliklerini Subnet onaylat.

#### **İmzalanma**

```cpp
platform.validates(
    {
        subnetID: string
    }
) -> {blockchainIDs: []string}
```

* `SubnetID` Subnet’s kimliğidir.
* `Her blok` zincir element doğruladığı bir blok zincirinin kimliği.

#### **Örnek Example**

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

#### **Örnek Tepki**

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

