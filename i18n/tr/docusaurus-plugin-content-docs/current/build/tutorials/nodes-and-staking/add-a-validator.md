# Doğrulayıcı Kümesine bir düğüm ekleyin

## Giriş

[Birincil Ağ](https://support.avax.network/en/articles/4135650-what-is-the-primary-network), Avalanche platformunun yapısında mevcuttur ve Avalanche'ın [yerleşik blok zincirlerini](../../../learn/platform-overview/README.md) doğrular. Bu eğitim makalesinde Birincil Ağ'a bir düğüm ve Avalanche'a bir [subnet](../../../learn/platform-overview/README.md#subnets) ekleyeceğiz.

P-Chain, Avalanche'daki meta veriyi yönetir. Buna, hangi düğümlerin hangi subnet'lerde olduğu, hangi blok zincirlerin var olduğu ve hangi subnet'lerin hangi blok zincirleri doğruladığı dahildir. Bir doğrulayıcı eklemek için P-Chain'e [işlemler](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) göndereceğiz.

:::tehlike Bir doğrulayıcı olarak bir düğüm eklemek için işlem yayınladığınızda, parametreleri değiştirmenin hiçbir yolunun olmadığını aklınızda bulundurun. **Stake'inizi erken kaldırmak veya stake miktarını, düğüm kimliğini veya ödül adresini değiştirmek mümkün olmayacaktır.** Aşağıdaki API çağrılarında doğru değerleri kullandığınızdan emin olun. Emin değilseniz, [Geliştirici SSS](http://support.avalabs.org/en/collections/2618154-developer-faq) bölümüne bakın veya [Discord](https://chat.avalabs.org/) üzerinden yardım isteyin. :::

## Gereklilikler

[Bir Avalanche Düğümü Çalıştırın](run-avalanche-node.md) eğitimini tamamlamış ve [Avalanche mimarisini](../../../learn/platform-overview/README.md) öğrenmiş olmanız. Bu eğitim makalesinde, API çağrıları yapmamıza yardımcı olacak [Avalanche Postman koleksiyonu](https://github.com/ava-labs/avalanche-postman-collection)'nu kullanıyoruz.

Düğümünüzün bağlantısının iyi olduğundan emin olmak için, düğümün staking port \(varsayılan olarak `9651`\) üzerinden TCP trafiği alabildiğinden ve düğümünüzü `--public-ip=[YOUR NODE'S PUBLIC IP HERE]` komut satırı argümanı ile başlattığınızdan emin olmanız gerekir. Bunların birini yapmadığınızda staking ödülünüz tehlikeye girebilir.

## Avalanche Cüzdan ile bir doğrulayıcı ekleyin

İlk olarak, [Avalanche Cüzdan](https://wallet.avax.network)'ı kullanarak düğümünüzü bir doğrulayıcı olarak nasıl ekleyeceğinizi gösteriyoruz.

Düğümünüzün kimlik bilgisini [`info.getNodeID`](../../avalanchego-apis/info-api.md#infogetnodeid) komutunu çağırarak alın:

![getNodeID postman](/img/getNodeID-postman.png)

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Gelen yanıt düğümünüzün kimliğini içerir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

[Cüzdan](https://wallet.avax.network/)'ı açın ve `Earn` sekmesine gidin. `Add Validator` ögesini seçin.

![Web cüzdan earn \(kazan\) sekmesi](/img/web-wallet-earn-tab.png)

Staking parametrelerini doldurun. Bu parametreler [bu dokümanda](../../../learn/platform-overview/staking.md) daha ayrıntılı olarak açıklanmaktadır. Tüm staking parametrelerini doldurup dikkatli bir şekilde kontrol ettikten sonra `Confirm` ögesini tıklayın. Staking döneminin en az 2 hafta olduğundan, yetkilendirme \(delegation\) ücretinin en az %2 olduğundan ve en az 2.000 AVAX stake ettiğinizden emin olun.

![Kazan doğrula](/img/earn-validate.png)

Bu işlem başarılı mesajını görmeniz ve bakiyenizin güncellenmiş olması gerekir.

![Doğrulama işleminiz gönderildi](/img/your-validation-transaction-is-sent.png)

[`platform.getPendingValidators`](../../avalanchego-apis/platform-chain-p-chain-api.md#platformgetpendingvalidators) komutu çağrılarak işlemin kabul edildiği doğrulanır.

![getPendingValidators postman](/img/getPendingValidators-postman.png)

`Earn` sekmesine dönün ve `Estimated Rewards` ögesini tıklayın.

![Kazan, doğrula, yetkilendir](/img/earn-validate-delegate.png)

Doğrulayıcınızın başlangıç zamanı geçtiğinde, doğrulayıcınızın kazanabileceği ödülleri, yanı sıra doğrulayıcının başlangıç zamanını, bitiş zamanını ve geride bıraktığı doğrulama döneminin yüzdesini görebilirsiniz.

![Tahmini ödüller](/img/estimated-rewards.png)

Bu kadar!

## API çağrıları ile bir doğrulayıcı ekleyin

Düğümümüze API çağrıları yaparak da doğrulayıcı kümesine bir düğüm ekleyebiliriz. Birincil Ağ'a bir düğüm eklemek için [`platform.addValidator`](../../avalanchego-apis/platform-chain-p-chain-api.md#platformaddvalidator) çağrısı yapacağız.

Bu metodun imzası şudur:

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

Bu argümanları sırasıyla inceleyelim.

`nodeID`

Bu, eklenen doğrulayıcının düğüm kimliğidir. Düğümünüzün kimliğini almak için [`info.getNodeID`](../../avalanchego-apis/info-api.md#infogetnodeid) çağrısı yapın:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "info.getNodeID",
    "params":{},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Gelen yanıt düğümünüzün kimliğini içerir:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji"
    },
    "id": 1
}
```

`startTime` ve `endTime`

Kişiler Birincil Ağ'a katılmak için bir işlem gönderirken, girecekleri zamanı \(doğrulamaya başlama\) ve çıkacakları zamanı \(doğrulamayı durdurma\) belirlerler. Kişilerin Birincil Ağ'da doğrulama yapabilecekleri en kısa dönem 24 saat, en uzun dönem 1 yıldır. Birincil Ağ'dan çıkan biri ağa tekrar girebilir, sadece maksimum _aralıksız_ süre bir yıldır. `startTime` ve `endTime`, doğrulayıcınızın Birincil Ağ'ı doğrulamaya ne zaman başlayacağını ve doğrulamayı ne zaman sonlandıracağını sırasıyla gösteren Unix zamanlarıdır. `startTime`, işlemin gönderildiği zamana göre gelecekteki bir zaman olmalıdır.

`stakeAmount`

Birincil Ağ'ı doğrulamak için AVAX stake edilmelidir. Bu parametre, stake edilen AVAX miktarını belirler.

`rewardAddress`

Bir doğrulayıcı Birincil Ağ'ı doğrulamayı durdurduğunda, Birincil Ağ'ı doğruladığı dönemde yeterli derecede aktif ve dürüst doğrulama yaptıysa bir ödül alacaktır. Bu tokenlar `rewardAddress`'e \(ödül adresi\) gönderilir. Asıl stake, `username` tarafından kontrol edilen bir adrese geri gönderilir.

Bir doğrulayıcı, davranışı ne olursa olsun, asla slashing cezası almaz, yani stake'inde bir kesinti uygulanmaz; doğrulama dönemi sona erdiğinde stake'ini mutlaka geri alır.

`changeAddr`

Bu işlemin para üstü bu adrese gönderilecektir. Bu alanı boş bırakabilirsiniz; bu durumda para üstü kullanıcınızın kontrol ettiği adreslerden birine gönderilecektir.

`delegationFeeRate`

Avalanche stake yetkilendirmesine \(delegation\) imkan verir. Bu parametre, bu doğrulayıcının başkaları tarafından kendisine stake delege edildiğinde onlardan aldığı yüzdelik ücrettir. Örneğin, `delegationFeeRate` \(yetkilendirme ücreti oranı\) `1.2345` ise ve birisi bu doğrulayıcıyı yetkilendirdiyse, yetkilendirme dönemi sona erdiğinde, ödülün %1,2345'i doğrulayıcıya, kalanı yetkilendirene \(delegator\) gider.

`username` ve `password`

Bu parametreler, işlem ücretini ödeyen, stake edilen AVAX'ı sağlayan ve stake edilen AVAX'ın iade edileceği kullanıcının kullanıcı adı ve şifresidir.

Şimdi işlemi gönderelim. Unix zamanını sırasıyla `endTime` ve `startTime` değerleri olarak kullanmak için Unix zamanını gelecekte 10 dakika ve 30 gün olarak hesaplayacak `date` kabuk komutunu kullanıyoruz. \(Not: Mac kullanıcısıysanız `$(date` yerine `$(gdate` kullanın. `gdate` kurulu değilse, `brew install coreutils` kullanın.\) Bu örnekte 2.000 AVAX \(2 x 1012 nAVAX\) stake ediyoruz.

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

Gelen yanıtta işlem kimliği ve para üstünün gönderildiği adres bulunur.

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

İşlemin durumunu [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platformgettxstatus) komutunu çağırarak kontrol edebiliriz:

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

İşlem başarılı olduğunda durum `Committed` göstermelidir. [`platform.getPendingValidators`](../../avalanchego-apis/platform-chain-p-chain-api.md#platformgetpendingvalidators) komutunu çağırabilir ve düğümün şimdi Birincil Ağ'da beklemedeki doğrulayıcı kümesinde olduğunu görebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Gelen yanıtta az önce eklediğimiz düğüm bulunmalıdır:

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

Zaman `1584021450`'ye ulaştığında, bu düğüm Birincil Ağ'ı doğrulamaya başlayacaktır. Zaman `1584121156`'ye ulaştığında, bu düğüm Birincil Ağ'ı doğrulamayı durduracaktır. Stake edilen AVAX `username` tarafından kontrol edilen adrese geri gönderilecek ve varsa ödüller `rewardAddress` adresine verilecektir.

## Bir Subnet'e Doğrulayıcılar Eklemek

Bu [eğitim makalesinde](../platform/create-a-subnet.md#adding-subnet-validators) bir subnet'e doğrulayıcıların nasıl ekleneceği gösterilecektir.
