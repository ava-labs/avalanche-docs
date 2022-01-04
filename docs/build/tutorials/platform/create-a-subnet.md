# Bir Subnet Yaratın

## Giriş

[Subnet](../../../learn/platform-overview/README.md#subnets), bir doğrulayıcılar \(validator\) kümesidir. Bir subnet, bir blok zincir kümesini doğrular. Her bir blok zincir, blok zincirin yaratılması sırasında belirlenen sadece bir subnet tarafından doğrulanır. Subnetler, izin verilmiş blok zincirler yaratılmasına imkan veren güçlü bir primitiftir.

Bir subnet yaratıldığında, bir eşik ve bir anahtarlar kümesi belirtilir. \(Aslında anahtarların adresleri belirtilir, anahtarların kendisi değil.\) O subnet'e bir doğrulayıcı eklemek için, o anahtarlardan gelen _threshold_ \(eşik\) imzalarına ihtiyaç vardır. Bu anahtarlara subnet'in **kontrol anahtarları** diyoruz ve bir kontrol anahtarının bir subnet'e bir doğrulayıcı ekleyen bir işlemdeki imzasına ise **kontrol imzası** diyoruz. Sonuç olarak, bir subnet kendi üyeleri üzerinde kontrole sahiptir.

Bu eğitim makalesinde 2 kontrol anahtarı ve 2'li bir eşiği olan yeni bir subnet yaratacağız.

_Not: Blok Zincirlerin, Subnet'lerin, İşlemlerin ve Adreslerin kimlikleri her çalıştırma/ağ için değişik olabilir. Diğer bir deyişle, bu eğitim makalesindeki bazı girdiler, son noktalar vb. siz denediğinizde değişik olabilir._

### Kontrol Anahtarlarını üretin {#generate-the-control-keys}

Önce 2 kontrol anahtarını üretelim. Bunu yapmak için [`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress)'i çağırıyoruz. Bu, yeni bir özel anahtar üretir ve bu anahtarı bir kullanıcı için saklar.

Birinci anahtarı üretmek için:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Bu, birinci kontrol anahtarını \(tekrar belirtelim, aslında birinci kontrol anahtarının _adresini_\) verir. Bu anahtar, az önce belirlediğimiz kullanıcıda kalır.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

İkinci anahtarın üretilmesi:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Gelen yanıt ikinci kontrol anahtarını içerir; bu anahtar az önce belirlediğimiz kullanıcıda kalır:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### Subnet'i yaratın {#create-the-subnet}

Bir subnet yaratmak için [`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet)'i çağırıyoruz.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg",
            "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
        ],
        "threshold":2,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Gelen yanıt bize işlemin kimliğini \(ID\) verir, bu kimlik aynı zamanda yeni yaratılan Subnet'in de kimliğidir.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### İşlem Başarısını Doğrulama {#verifying-success}

[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)'i çağırarak mevcut tüm Subnet'leri getirebiliriz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Gelen yanıt subnet'imizin yaratıldığını doğrular:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

### Subnet Doğrulayıcıları Ekleme {#adding-subnet-validators}

### Bir Subnet Doğrulayıcı İşleminin Yayınlanması

Şimdi bir subnet'e bir doğrulayıcı ekleyelim. Şu anda subnet'lere sadece API çağrıları ile doğrulayıcı ekleyebilirsiniz, Avalanche Cüzdan ile değil.

Diyelim ki Subnet'te `3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g` kimliği, eşik 2 var ve `username` üzerinde 2 kontrol anahtarı mevcut.

Doğrulayıcıyı eklemek için [`platform.addSubnetValidator`](../../avalanchego-apis/platform-chain-p-chain-api.md#platformaddsubnetvalidator) API metodunu çağıracağız. Metodun imzası şudur:

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

Şimdi parametreleri inceleyelim:

`nodeID`

Bu, subnet'e eklenen doğrulayıcının düğüm kimliğidir. **Bu doğrulayıcı, bu Subnet'i doğruladığı zamanın tamamı boyunca Birincil Ağı doğrulamalıdır.**

`subnetID`

Bu, bir doğrulayıcı eklediğimiz subnet'in kimliğidir.

`startTime` ve `endTime`

Yukarıdakiyle aynı şekilde, bunlar doğrulayıcının subnet'i doğrulamaya başlayacağı ve doğrulamayı durduracağı Unix zamanlarıdır. `startTime` \(başlangıç zamanı\), doğrulayıcının Birincil Ağ'ı doğrulamaya başlayacağı zamanda veya sonrasında olmalıdır ve `endTime` \(bitiş zamanı\), doğrulayıcının Birincil Ağ'ı doğrulamayı durduracağı zamanda veya öncesinde olmalıdır.

`weight`

Bu, doğrulayıcının konsensüs için örnekleme ağırlığıdır. Doğrulayıcının ağırlığı 1 ve subnet'teki tüm doğrulayıcıların kümülatif ağırlığı 100 ise, o takdirde bu doğrulayıcı konsensüs sırasında her 100 örnek başına yaklaşık 1 kere doğrulayıcı kümesine dahil edilecektir. Subnet'teki tüm doğrulayıcıların kümülatif ağırlığı en az `snow-sample-size` \(snow örnek büyüklüğü\) olmalıdır. Örneğin, subnet'te sadece bir doğrulayıcı varsa, bu doğrulayıcının ağırlığı en az `snow-sample-size` \(varsayılan 20\) olmalıdır. Bir doğrulayıcının ağırlığının doğrulama sırasında değiştirilmeyeceğini hatırlayın, bu yüzden uygun bir değer kullanmaya dikkat edin.

`changeAddr`

Bu işlemin para üstü bu adrese gönderilecektir. Bu alanı boş bırakabilirsiniz; bu durumda para üstü kullanıcınızın kontrol ettiği adreslerden birine gönderilecektir.

`username` ve `password`

Bu parametreler, işlem ücretini ödeyen kullanıcının kullanıcı adı ve şifresidir. Bu kullanıcı, bu Subnet'e bir doğrulayıcı eklemek için bu Subnet'in yeterli sayıda kontrol anahtarına sahip olmalıdır.

Unix zamanını sırasıyla `endTime` ve `startTime` değerleri olarak kullanmak için Unix zamanını gelecekte 10 dakika ve 30 gün olarak hesaplayacak `date` kabuk komutunu kullanıyoruz. \(Not: Mac kullanıcısıysanız `$(date` yerine `$(gdate` kullanın.  `gdate`kurulu değilse, `brew install coreutils` kullanın.\)

örnek:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-LMUue2dBBRWdDbPL4Yx47Ps31noeewJji",
        "subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Gelen yanıtta işlem kimliği ve para üstünün gönderildiği adres bulunur.

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

İşlemin durumunu [`platform.getTxStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platformgettxstatus) komutunu çağırarak kontrol edebiliriz:

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

İşlem başarılı olduğunda durum `Committed` göstermelidir. [ `platform.getPendingValidators`](../../avalanchego-apis/platform-chain-p-chain-api.md#platformgetpendingvalidators) komutunu çağırabilir ve düğümün şimdi Birincil Ağ için beklemede olan doğrulayıcı kümesinde olduğunu görebiliriz. Bu kez subnet kimliğini belirtiyoruz:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g"},
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
                "startTime":1584042912,
                "endTime":1584121156,
                "weight": "30"
            }
        ]
    },
    "id": 1
}
```

Zaman `1584042912`'ye ulaştığında, bu düğüm bu Subnet'i doğrulamaya başlayacaktır. Zaman `1584121156`'ye ulaştığında, bu düğüm bu Subnet'i doğrulamayı durduracaktır.

### Private \(Özel\) Subnet'ler

Avalanche subnet'leri public'tir, yani herkese açıktır. Bu, her düğümün subnet'lerle senkronize olabileceği ve subnet'lerde devam eden işlemleri/blokları dinleyebileceği ve bunu, dinlediği subnet'i doğrulamadığında bile yapabileceği anlamına gelir.

Subnet doğrulayıcıları/beacon'ları, blok zincirlerin içeriklerini isteğe bağlı bir `validatorOnly` yapılandırması yoluyla yayınlamamayı seçebilir. Yapılandırma, [Subnet Configs](../../references/command-line-interface.md#subnet-configs) ile açılabilir. Eğer bir düğüm `validatorOnly` ögesini `true` olarak ayarlarsa, düğüm sadece bu subnet'in doğrulayıcıları ile mesajlaşır. Diğer eşler bu subnet'in içeriklerini bu düğümden öğrenemeyecektir.

Not: Bu, düğüme özgü bir yapılandırmadır. Bu subnet'teki her doğrulayıcı, tamamen private bir subnet oluşturmak için bu yapılandırmayı kullanmalıdır.

### Subnet'in Beyaz Listeye Alınması \(whitelisting\)

Bu düğüm subnet'in bir doğrulayıcısı olarak eklendiğine göre, şimdi bu düğümü subnet'ler beyaz listesine \(whitelist\) ekleyelim. Beyaz liste, düğümün bir subnet'i yanlışlıkla doğrulamasına engel olur.

Subnet'i beyaz listeye eklemek için, düğümü yeniden başlatın ve `--whitelisted-subnets` parametresine, bir virgülle ayrılmış beyaz listeye eklenecek subnet'ler listesini ekleyin.

Bu örnekte tam komut şudur:

`./build/avalanchego --whitelisted-subnets=3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g`

Komut hakkında daha fazla bilgi için şuraya bakın: [beyaz listeye alınmış subnet komut satırı argümanı](../../references/command-line-interface.md#whitelist).

