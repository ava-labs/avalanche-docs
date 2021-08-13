# Doğrulayıcı Sitesi için bir düğüm ekle

## Tanıştırma

[Ana Ağ](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/add-a-validator#introduction) Avalanche platformuna bağlı olup Avalanche [yerleşik blok zincirlerini](https://avalanche.gitbook.io/avalanche/learn/platform-overview) onaylar. Bu özel derslerde, Primary ana ağa bir düğüm ve [bir alt ağ](https://avalanche.gitbook.io/avalanche/learn/platform-overview#subnets) ekleyeceğiz.

P-Chain on metadata yönetiyor. Bu da hangi düğümlerin hangi alt ağların var olduğu ve hangi alt ağların hangi blok zincirlerini doğruladığını içerir. Bir doğrulama eklemek için, to [işlemler](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) yayınlayacağız.

{% ipuçları style="danger" % } Bir kere bir geçiş kartı eklemek için işlem yapınca parametreleri değiştirmenin yolu olmadığını unutmayın. **your erken kaldıramazsınız, ya da kazık miktarını, düğümünü veya ödül adresi değiştiremezsiniz.** Lütfen aşağıdaki API çağrılarında doğru değerleri kullandığınızdan emin olun. Emin değilseniz, [Geliştirici FAQ's](http://support.avalabs.org/en/collections/2618154-developer-faq) kontrol edin veya [Discord](https://chat.avalabs.org/) için yardım isteyin. {% endhint }

## Gereklilik

[Bir Avalanche](run-avalanche-node.md) an tamamladınız. [Avalanche's mimarisini](../../../learn/platform-overview/) biliyorsunuz. Bu özel ders için, API çağrıları yapmak için [Avalanche’s Postacı koleksiyonunu](https://github.com/ava-labs/avalanche-postman-collection) kullanıyoruz.

Düğününüzün iyi bağlantılı olduğundan emin olmak için, your hata portuna TCP trafiğini öntanımlı `olarak` gönderebileceğinden emin olun ve komut satırı argümanı `well-connected, PUBLIC IP` here] ile started başlattığınızdan emin olun. Bunlardan birini yapamayınca ödül kazanmanı tehlikeye atabilir.

## Avalanche Cüzdan ile bir doğrulayıcı ekle

Önce [Avalanche Cüzdan](https://wallet.avax.network) kullanarak bir onaylayıcı olarak düğümünü nasıl ekleyeceğini göstereceğiz.

[`node’s`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid)

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

[Cüzdanı](https://wallet.avax.network/) aç ve `Earn` hesabını kullan. `Doğrulama` Eklemeyi seç.

![Web cüzdanı hak ediyor.](../../../.gitbook/assets/web-wallet-earn-tab.png)

Parametreleri doldurun. Aşağıda daha detaylı olarak açıklanır. Tüm eklenti parametrelerini doldurup onları iki kez kontrol ettiğinizde `Tıklayın`. İzleme süresi en az 2 hafta olduğundan, delege ücret oranı % 2 ve en az 2,000 AVAX gözetliyorsunuz.

{% page-ref page="... /.. /../learn/platform-overview/staking.md" }

![Geçerli kazan.](../../../.gitbook/assets/earn-validate.png)

Bu başarı mesajını görmeniz gerek. Denge güncellenmeli.

![Doğrulama işleminiz gönderildi](../../../.gitbook/assets/your-validation-transaction-is-sent.png)

Platformu çağırmak [`için onay verenler`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) işlemimizin kabul edildiğini doğruluyor.

![Geçerli Geçerli Postacı](../../../.gitbook/assets/getPendingValidators-postman.png)

`Earn` hesabına geri dön ve `Tahmini Ödülleri` tıkla.

![Kazan, onayla, delege](../../../.gitbook/assets/earn-validate-delegate.png)

Geçerli bir başlangıç süresi geçtikten sonra, kazanabileceği ödülleri görebilirsiniz, başlangıç zamanı, son zamanı ve geçerlilik süresi yüzdesi.

![Tahmini ödüller](../../../.gitbook/assets/estimated-rewards.png)

İşte böyle!

## API çağrıları ile bir doğrulayıcı ekle

Ayrıca API çağrıları yaparak the bir düğüm ekleyebiliriz. Birincil Ağ düğümünü eklemek için [`platform.addValidator`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addvalidator). Verici arayacağız.

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

`NodeID`

Bu validator giriş numarası. Düğününün kimliğini almak için bilgiyi ara. [`info.getNodeID`](https://avalanche.gitbook.io/avalanche/build/apis/info-api#info-getnodeid):

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

`Başlangıç zamanı` ve `son zamanı`

Birincil Ağa katılmak için bir işlem yayınladığında, \(onaylamaya başlayacaklar\ (onaylamaya başlayacaklar) ve \(onaylanmayı bırakacaklar) \) Birincil Ağı onaylayabilecek en düşük süre, 24 saat ve maksimum süresi bir yıldır. İlk Ağ'a ayrıldıktan sonra tekrar girebilir, sadece maksimum _süreklilik_ bir yıldır. `Başlangıç ve` `son,` birincil Ağ'ı onaylamayı bırakan Unix zamanıdır. `Başlangıç` zamanı işlemlerin yapıldığı zamana göre gelecekte de bir eş zamanlı olmalıdır.

`Kazık Miktarı`

Ana Ağ'ı onaylamak için, the kazık must Bu parametre of çarptığı miktarı tanımlar.

`Ödül ödülü`

Bir onaylayıcı Primary Network'ü onaylamayı bıraktığında, eğer yeterince tepki verdikleri ve doğru olan bir ödül alırlar. Bu işaretler `ödül için` gönderiliyor. Orijinal kazık `kullanıcı adı` tarafından kontrol edilen bir adrese geri gönderilecek.

Bir validator’s kazığı asla kesilmez, davranışları ne olursa olsun, onlar her zaman onaylandıktan sonra hisselerini geri alırlar.

`Addr`

Bu işlem sonucunda meydana gelen herhangi bir değişiklik bu adrese gönderilecek. Bu alanı boş bırakabilirsiniz; eğer bırakırsanız, kullanıcı denetlediğiniz adreslerden birine değişim gönderilecektir.

`Delege delegationFeeRate`

Avalanche kazık delegeleri için izin verir. Bu parametre diğer kişiler onlara kazığı verirken bu doğrulayıcı ücretin yüzde ücretidir. Örneğin, eğer delege `delegationFeeRate` `1.2345` ise ve birisi bu onaylama sürecine delege devresinin bittiği zaman, ödülün %1.2345'i the gider ve geri kalanı delege olur.

`Kullanıcı adı` ve `parola`

Bu parametreler, işlem ücretini ödeyen kullanıcının kullanıcı adı ve parolası olan ve parolası olan of sağlar.

Şimdi alışverişi yapalım. Unix saatini hesaplamak için kabuk komuta `tarihini` kullanıyoruz. Gelecekte sırasıyla `başlangıç zamanı` ve `son` zamanların değerleri olarak kullanacağız. \\ (Not: Eğer bir you’re `$($'la tarih ile tarih``` ile tarih ile değiştirin. `Gdate` yüklenmemişse, `çekirdek` kullanım yapınız. \) Bu örnekte 2,000 AVAX \(2 x 1012 nAVAX\) kazığa çıkarız.

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

Alışveriş durumunu [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus):

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

Bu durum `işlemin` başarılı olduğu anlamına gelir. Platformu çağırabiliriz. [`platform.getPendingValidators`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) çağırabilir ve düğümün şu anda ana ağın beklemekte olan geçerli olan setinde olduğunu görebiliriz:

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

Zaman `1584021450`'ye ulaştığında, bu düğüm, birincil Ağ'ı onaylamaya başlayacak. `1584121156` yılına ulaştığında bu düğüm, birincil Ağ'ın onaylanmasını durduracaktır. Uzatılmış AVAX `kullanıcı adı` tarafından kontrol edilen bir adrese geri verilecek ve eğer ödül `verilecekse, ödüller ödül adrese` verilecek.

## Subnet Doğrulayıcı Ekle

### Subnet Doğrulayıcı İşletme Başlatılıyor

Şimdi aynı düğümü bir alt ağa ekleyelim. Eğer bir [Subnet yaratma üzerine](https://avalanche.gitbook.io/avalanche/build/tutorials/platform/create-a-subnet) bu ders verdiyseniz aşağıdaki anlamlı olacaktır. Şu anda sadece API çağrılarına onay verenleri ekleyebilirsiniz, Avalanche Cüzdan ile değil.

Subnet nTd2Q2nTLp8M9qv2VKHMvYhtNWXX7aTPa4SMEK7x7yJHbccWvr, eşik `2` ve `kullanıcı adı` en az 2 kontrol anahtarı olduğunu varsayalım.

Doğrulayıcı eklemek için, API Yöntemi [`API`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-addsubnetvalidator) the arayacağız. İmzası :

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

`NodeID`

Bu dosya alt ağa eklenecek validator düğümü. **Bu doğrulayıcı, for geçerli kılacak tüm süreç için birincil Ağ'ı onaylamak zorundadır.**

`subnetID`

Bu alt ağ kimlik the eklediğimiz bir kimlik

`Başlangıç zamanı` ve `son zamanı`

Yukarıya göre bunlar geçerli olan Unix saatleri, subnetin geçersiz sayılmasını durduracaktır. `Başlangıç zamanı` birincil Ağ'ı onaylamaya başladığı zaman veya sonra olmalıdır, ve `son zaman` geçerli olan geçerli olan birincil Ağ'ı onaylamayı durdurmadan önce veya zaman zaman olmalıdır.

`Kilo olsun`

Bu validator’s uzlaşma için örnek ağırlığı. Eğer validator’s ağırlığı 1 ve subnet içindeki tüm of kümülatif ağırlığı 100 ise, bu doğrulayıcı consensus. sırasında her 100 örnekte yaklaşık 1 tane dahil edilir. Alt ağ içindeki tüm of kümülatif ağırlığı en azından `kar örnekleri olmalıdır`. Örneğin, alt ağda sadece bir doğrulayıcı varsa, ağırlığı en az kar `snow-sample-size` (varsayılan 20\) olmalıdır. Bir validator's ağırlığı doğrulayıcı iken değiştirilemez o yüzden uygun bir değer kullanın.

`Addr`

Bu işlem sonucunda meydana gelen herhangi bir değişiklik bu adrese gönderilecek. Bu alanı boş bırakabilirsiniz; eğer bırakırsanız, kullanıcı denetlediğiniz adreslerden birine değişim gönderilecektir.

`Kullanıcı adı` ve `parola`

Bu parametreler, işlem ücretini ödeyen kullanıcının kullanıcı adı ve parolası olarak kullanılır. Bu kullanıcı, Subnet’s bir doğrulayıcı eklemek için Subnet’s kontrol anahtarlarının yeterli sayıda bulundurmalıdır.

Unix saatini hesaplamak için kabuk komuta `tarihini` kullanıyoruz. Gelecekte sırasıyla `başlangıç zamanı` ve `son` zamanların değerleri olarak kullanacağız. \\ (Not: Eğer bir you’re `$($'la tarih ile tarih``` ile tarih ile değiştirin. `Gdate` yüklenmemişse, `çekirdek` kullanım yapınız. \)

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

Alışveriş durumunu [`platform.getTxStatus`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-gettxstatus):

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

Bu durum `işlemin` başarılı olduğu anlamına gelir. [`Platformu`](https://avalanche.gitbook.io/avalanche/build/apis/platform-chain-p-chain-api#platform-getpendingvalidators) çağırabiliriz ve düğümün şu anda Birincil Ağ için bekleyen geçerli doğrulama setinde olduğunu görebiliriz. Bu kez alt ağ kimliğini belirleyeceğiz:

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

Zaman `1584042912'ye` ulaştığında, bu düğüm, 1584042912, onaylamaya başlayacak. `1584121156` yılına ulaştığında bu düğüm, 1584121156, onaylamayı bırakacaktır.

### Whitelisting Whitelisting

Şimdi düğüm, alt ağın doğrulayıcısı olarak eklendiğine göre alt ağların the ekleyebiliriz. Beyaz bilimci düğümün kasıtsız olarak geçerli olmasını engeller.

subnet, beyazlatmak için düğümü yeniden başlatıp parametreyi eklemek, beyaz `--whitelisted-subnets` eklemek.

Tam komut:

`./build/avalanchego --whitelisted-subnets=nTd2Q2TLp8M9qv2VKHMdvYhtNWX7aTPa4SMEK7x7xcWvvs=nTTTLp8M9qv2Q2nTLp8M9qv2V2V2`

