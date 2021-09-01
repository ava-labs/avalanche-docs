# Doğrulayıcı Sitesi için bir düğüm ekle

## Tanıştırma

[Ana Ağ](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction) Avalanche platformuna bağlı olup Avalanche [yerleşik blok zincirlerini](https://avalanche.gitbook.io/avalanche/learn/platform-overview) onaylar. Bu özel derslerde, Primary ana ağa bir düğüm ve [bir alt ağ](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets) ekleyeceğiz.

P-Chain on metadata yönetiyor. Bu da hangi düğümlerin hangi alt ağların var olduğu ve hangi alt ağların hangi blok zincirlerini doğruladığını içerir. Bir doğrulama eklemek için, to [işlemler](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) yayınlayacağız.

{% hint style="danger" %}Bir kere bir geçiş kartı eklemek için işlem yapınca parametreleri değiştirmenin yolu olmadığını unutmayın.** your erken kaldıramazsınız, ya da kazık miktarını, düğümünü veya ödül adresi değiştiremezsiniz.** Lütfen aşağıdaki API çağrılarında doğru değerleri kullandığınızdan emin olun. Emin değilseniz, [Geliştirici FAQ's](http://support.avalabs.org/en/collections/2618154-developer-faq) kontrol edin veya [Discord](https://chat.avalabs.org/) için yardım isteyin.{% endhint %}

## Gereklilik

[Bir Avalanche](run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz. Bu özel ders için, API çağrıları yapmak için [Avalanche’s Postacı koleksiyonunu](https://github.com/ava-labs/avalanche-postman-collection) kullanıyoruz.

Düğününüzün iyi bağlantılı olduğundan emin olmak için, your hata portuna TCP trafiğini \(varsayılan `9651`olarak\) gönderip komut satırı argümanına başladığınızdan emin `--public-ip=[YOUR NODE'S PUBLIC IP HERE]`olun. Bunlardan birini yapamayınca ödül kazanmanı tehlikeye atabilir.

## Avalanche Cüzdan ile bir doğrulayıcı ekle

Önce [Avalanche Cüzdan](https://wallet.avax.network) kullanarak bir onaylayıcı olarak düğümünü nasıl ekleyeceğini göstereceğiz.

Düğümünün kimliğini çağırarak [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)alın:

![getNodeID postman kap](../../../.gitbook/assets/getNodeID-postman.png)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Cevap düğümünün kimliğine sahip:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

[Cüzdanı](https://wallet.avax.network/) aç ve `Earn`hesabı aç.`Add Validator`

![Web cüzdanı hak ediyor.](../../../.gitbook/assets/web-wallet-earn-tab.png)

Parametreleri doldurun. Aşağıda daha detaylı olarak açıklanır. `Confirm`Tüm işaretleme parametrelerini doldurduğunuzda ve onları iki kez kontrol ettiğinizde tıklayın. İzleme süresi en az 2 hafta olduğundan, delege ücret oranı % 2 ve en az 2,000 AVAX gözetliyorsunuz.

{% page-ref page="../../../learn/platform-overview/staking.md" %}

![Geçerli kazan.](../../../.gitbook/assets/earn-validate.png)

Bu başarı mesajını görmeniz gerek. Denge güncellenmeli.

![Doğrulama işleminiz gönderildi](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

Aramak işlemimizin kabul edildiğini [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)doğruluyor.

![Geçerli Geçerli Postacı](../../../.gitbook/assets/getPendingValidators-postman.png)

`Earn`Hesaba geri dön ve tıkla.`Estimated Rewards`

![Kazan, onayla, delege](../../../.gitbook/assets/earn-validate-delegate.png)

Geçerli bir başlangıç süresi geçtikten sonra, kazanabileceği ödülleri görebilirsiniz, başlangıç zamanı, son zamanı ve geçerlilik süresi yüzdesi.

![Tahmini ödüller](../../../.gitbook/assets/estimated-rewards.png)

İşte böyle!

## API çağrıları ile bir doğrulayıcı ekle

Ayrıca API çağrıları yaparak the bir düğüm ekleyebiliriz. Ana Ağ düğümünü eklemek için [`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator)arayacağız.

Bu yöntemin imzası:

```cpp
platform.addValidator(
    {
        nodeID: string,
        startTime: int,
        endTime: int,
        stakeAmount: int,
        rewardAddress: string,
        changeAddr: string, (optional)
        delegationFeeRate: float,
        username: string,
        password: string
    }
) -> {txID: string}
```

Hadi gidip bu tartışmaları inceleyelim.

`nodeID`

Bu validator giriş numarası. Düğününün kimliğini almak için şöyle [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)seslen:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Cevap düğümünün kimliğine sahip:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji"
    },
    "id": 1
}
```

`startTime`Ve`endTime`

Birincil Ağa katılmak için bir işlem yayınladığında, girdikleri zamanı belirlerler \(onaylamaya başlar\) ve ayrılırlar \(onaylanmayı durdurun\). Birincil Ağ'ı onaylayabilecek en düşük süre, en fazla 24 saat ve en fazla süresi bir yıldır. `endTime``startTime`Biriniz ayrıldıktan sonra birincil Ağa tekrar girebilir, sadece maksimum __süreklilik bir yıl olduğundandır. `startTime`Ve your sırasıyla Primary Network'ü onaylamayı bırakıp geçmeyi bırakacağı Unix zamanıdır. İşlem yapıldığı zamana göre gelecekte göreceli olmalıdır.

`stakeAmount`

Ana Ağ'ı onaylamak için, the kazık must Bu parametre of çarptığı miktarı tanımlar.

`rewardAddress`

Bir onaylayıcı Primary Network'ü onaylamayı bıraktığında, eğer yeterince tepki verdikleri ve doğru olan bir ödül alırlar. Bu işaretler `rewardAddress`gönderiliyor. Orijinal kazık kontrol edilen bir adrese geri `username`gönderilecek.

Bir validator’s kazığı asla kesilmez, davranışları ne olursa olsun, onlar her zaman onaylandıktan sonra hisselerini geri alırlar.

`changeAddr`

Bu işlem sonucunda meydana gelen herhangi bir değişiklik bu adrese gönderilecek. Bu alanı boş bırakabilirsiniz; eğer bırakırsanız, kullanıcı denetlediğiniz adreslerden birine değişim gönderilecektir.

`delegationFeeRate`

Avalanche kazık delegeleri için izin verir. Bu parametre diğer kişiler onlara kazığı verirken bu doğrulayıcı ücretin yüzde ücretidir. `delegationFeeRate``1.2345`Örneğin, eğer biri bu validator, delege yaparsa o zaman heyet süresi bittiğinde, ödülün %1.235'i the gider ve geri kalanı delege olur.

`username`Ve`password`

Bu parametreler, işlem ücretini ödeyen kullanıcının kullanıcı adı ve parolası olan ve parolası olan of sağlar.

Şimdi alışverişi yapalım. Unix saatini hesaplamak `date`için kabuk komutunu kullanıyoruz. Gelecekte sırasıyla `startTime`ve değerleri olarak kullanmak için 10 dakika 30 gün süreyi `endTime`hesaplıyoruz. `$(date`\(Not: Eğer bir you’re yerine geçin.`$(gdate` Eğer `gdate`kurmadıysanız, `brew install coreutils`yapın.\) Bu örnekte 2,000 AVAX \(2 x 1012 nAVAX\) kazığa çıkarız.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "stakeAmount":2000000000000,
        "rewardAddress":"P-avax1d4wfwrfgu4dkkyq7dlhx0lt69y2hjkjeejnhca",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "delegationFeeRate":10,
        "username":"USERNAME",
        "password":"PASSWORD"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Cevap işlem kimliği ve değişimin gittiği adres ile birlikte işlem kimliğine sahiptir.

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

İşlemin durumunu arayarak kontrol [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus)edebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"6pb3mthunogehapzqmubmx6n38ii3lzytvdrxumovwkqftzls"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

`Committed`Bu durum da başarılı olduğu anlamına gelir. [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)Düğümün şu anda birincil Ağ için bekleyen geçerli doğrulama setinde olduğunu görebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Tepki de eklediğimiz düğümleri içermeli:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime": "1584021450",
                "endtime": "1584121156",
                "stakeAmount": "2000000000000",
            }
        ]
    },
    "id": 1
}
```

Zaman ulaştığında, bu `1584021450`düğüm, birincil Ağ'ı onaylamaya başlayacak. Bu `1584121156`düğüm, ana ağ'ın onaylanmasını durduracak. `rewardAddress`Uzatılmış AVAX kontrol edilen bir adrese geri verilecek ve eğer herhangi bir ödül `username`verilecekse.

## Subnet Doğrulayıcı Ekle

### Subnet Doğrulayıcı İşletme Başlatılıyor

Şimdi aynı düğümü bir alt ağa ekleyelim. Eğer bir [Subnet yaratma üzerine](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/create-a-subnet) bu ders verdiyseniz aşağıdaki anlamlı olacaktır. Şu anda sadece API çağrılarına onay verenleri ekleyebilirsiniz, Avalanche Cüzdan ile değil.

`nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`Subnet kimlik ve 2 eşiği olduğunu ve en az 2 kontrol anahtarı `username`olduğunu varsayalım.

Doğrulayıcı eklemek için API yöntemi [`platform.addSubnetValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator)arayacağız. İmzası :

```cpp
platform.addSubnetValidator(
    {
        nodeID: string,
        subnetID: string,
        startTime: int,
        endTime: int,
        weight: int,
        changeAddr: string, (optional)
        username: string,
        password: string
    }
) -> {txID: string}
```

Parametreleri inceleyelim:

`nodeID`

Bu dosya alt ağa eklenecek validator düğümü.** Bu doğrulayıcı, for geçerli kılacak tüm süreç için birincil Ağ'ı onaylamak zorundadır.**

`subnetID`

Bu alt ağ kimlik the eklediğimiz bir kimlik

`startTime`Ve`endTime`

`endTime`Yukarıya göre bunlar geçerli olan Unix saatleri, geçerli olan alt ağı onaylamayı bırakıp duracaktır. validator birincil Ağ'ı onaylamaya başladığı zaman veya sonrasında olması `startTime`gerekir.

`weight`

Bu validator’s uzlaşma için örnek ağırlığı. Eğer validator’s ağırlığı 1 ve subnet içindeki tüm of kümülatif ağırlığı 100 ise, bu doğrulayıcı consensus. sırasında her 100 örnekte yaklaşık 1 tane dahil edilir. Alt ağ içindeki tüm validators kümülatif ağırlığı en azından `snow-sample-size`olmalıdır. Örneğin, alt ağda sadece bir doğrulayıcı varsa, ağırlığı en az `snow-sample-size`\(varsayılan 20\) olmalıdır. Bir validator's ağırlığı doğrulayıcı iken değiştirilemez o yüzden uygun bir değer kullanın.

`changeAddr`

Bu işlem sonucunda meydana gelen herhangi bir değişiklik bu adrese gönderilecek. Bu alanı boş bırakabilirsiniz; eğer bırakırsanız, kullanıcı denetlediğiniz adreslerden birine değişim gönderilecektir.

`username`Ve`password`

Bu parametreler, işlem ücretini ödeyen kullanıcının kullanıcı adı ve parolası olarak kullanılır. Bu kullanıcı, Subnet’s bir doğrulayıcı eklemek için Subnet’s kontrol anahtarlarının yeterli sayıda bulundurmalıdır.

Unix saatini hesaplamak `date`için kabuk komutunu kullanıyoruz. Gelecekte sırasıyla `startTime`ve değerleri olarak kullanmak için 10 dakika 30 gün süreyi `endTime`hesaplıyoruz. `$(date`\(Not: Eğer bir you’re yerine geçin.`$(gdate` Eğer `gdate`kurmadıysanız, `brew install coreutils`yapın.\)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME",
        "password":"PASSWORD"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Cevap işlem kimliği ve değişimin gittiği adres ile birlikte işlem kimliğine sahiptir.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

İşlemin durumunu arayarak kontrol [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus)edebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"2exafyvRNSE5ehwjhafBVt6CTntot7DFjsZNcZ54GSxBbVLcCm"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

`Committed`Bu durum da başarılı olduğu anlamına gelir. [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators)Düğümün şu anda Birincil Ağ'ın bekleme onaylayıcı setinde olduğunu görebiliriz. Bu kez alt ağ kimliğini belirleyeceğiz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Tepki de eklediğimiz düğümleri içermeli:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "validators": [
            {
                "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "30"
            }
        ]
    },
    "id": 1
}
```

Zaman geldiğinde, bu `1584042912`düğüm, Subnet. onaylamaya başlayacak. Bu `1584121156`düğüm, Subnet. onaylamayı kesecek.

### Whitelisting Whitelisting

Şimdi düğüm, alt ağın doğrulayıcısı olarak eklendiğine göre alt ağların the ekleyebiliriz. Beyaz bilimci düğümün kasıtsız olarak geçerli olmasını engeller.

`--whitelisted-subnets`subnet, beyazlatmak için düğmeyi yeniden başlatır ve parametreyi beyaz ağlara ayıran alt ağların listesini ekle.

Tam komut:

`./build/avalanchego --whitelisted-subnets=nTd2Q2nTLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7yJHbcWvr`

