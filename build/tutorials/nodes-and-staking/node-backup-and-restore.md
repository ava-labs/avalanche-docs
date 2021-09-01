# Düğüm yedekleme ve geri getir

Düğününü bir kez çalıştırır açmaz felaket iyileşmesi için hazırlanma zamanı geldi. Makinenizin donanım veya yazılım sorunları yüzünden felaket bir arızası olursa ya da doğal bir felaket vakası olsa bile böyle bir duruma destek yaparak hazırlanmak en iyisi.

Çalışırken veritabanı ile birlikte tam bir düğüm kurulumu çoklu gigabayt boyutu olarak büyüyebilir. Bu kadar büyük bir veri hacmi geri almak pahalıdır, karmaşık ve zaman alıcıdır. Neyse ki daha iyi bir yol var.

Geri dönüp her şeyi geri vermek yerine sadece gerekli olan şeyleri desteklemeliyiz. Bu dosyalar senin düğümüne benzersiz oldukları için yeniden yapılandırılamaz. Avalanchego düğümü, benzersiz dosyalar ağ üzerindeki your those diğer bir deyişle your tanımlayan dosyalar Kurulumun kendisi yeni bir makineye düğümü yerleştirerek kolayca yeniden oluşturulabilir ve blok zinciri verilerinin geri kalan tüm gigabytes diğer ağ from gelen verileri kopyalayan bootstrapping süreci ile kolayca yeniden oluşturulabilir.

Düğününüz ağdaki bir doğrulayıcı olsa ve üzerinde birden fazla delege varsa bile, başka bir şeyi desteklemekten endişe etmenize gerek yok, çünkü onaylama ve delegasyon işlemleri blok zincirinde de saklanıyor ve blok zincirinin geri kalanı ile birlikte geri getirilecek.

## NodeID

NodeID your ağdaki diğer diğer arkadaşlardan ayıran eşsiz bir tanımlayıcıdır. Bu bir dizgi `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD`biçimi. NodeID [nasıl](../../references/cryptographic-primitives.md#tls-addresses) yapıldığına dair teknik geçmişe bakabilirsiniz. Özünde, NodeID iki dosya tarafından tanımlanır:

* `staker.crt`
* `staker.key`

Öntanımlı kurulumda, çalışma dizininde özellikle de içinde `~/.avalanchego/staking/`bulunabilir. Başka bir makinenin düğümünü yeniden oluşturmak için tek yapmamız gereken o iki dosyayla yeni bir kurulum çalıştırmak.

{% hint style="warning" %}Eğer of anahtar mağazasında tanımlanmış kullanıcılar varsa, o zaman geri dönüp bunları da geri getirmeniz gerekir. [Keystore API](../../avalanchego-apis/keystore-api.md), kullanıcı anahtarlarını aktarmak ve aktarmak için kullanılabilecek yöntemler vardır. Keystore API'nin sadece geliştiriciler tarafından kullanıldığını ve üretim düğümlerinde kullanılmaya not not edin. Eğer bir anahtar mağazası API'nin ne olduğunu bilmiyorsan ve kullanmadıysan endişelenmene gerek yok.{% endhint %}

## Yedek

`staker.crt``staker.key`Düğününüzü desteklemek için gizli ve güvenli bir yerde depolamamız gerekiyor. tercihen farklı bir bilgisayara, buluttaki özel depolanan USB sopası veya benzer bir şey. Birkaç farklı yere saklamak, güvenli yerlerin güvenliği artırır.

{% hint style="warning" %}Eğer biri senin mühür dosyalarını ele geçirirse, cüzdanın özel anahtarları tarafından kontrol edildiği için hala your ulaşamazlar. Ama düğümünü başka bir yerde yeniden yaratabilirler. Şartlara bağlı olarak bu ödülleri kaybetmene neden olur. O yüzden kıç dosyalarının güvenli olduğundan emin ol.{% endhint %}

Düğümü çalıştıran makinenin kapak dosyalarını alalım.

### Yerel düğümden

Eğer düğümü yerel olarak işletiyorsan, masaüstü bilgisayarında sadece dosyanın nerede olduğunu bul ve güvenli bir yerde kopyala.

`/home/USERNAME/.avalanchego/staking/`Öntanımlı bir Linux kurulumunda onlara giden yol düğümü çalıştıran gerçek kullanıcı adı ile değiştirilmesi `USERNAME`gereken yer olacaktır. Dosyaları oradan yedek bir yere seçin ve kopyalayın. Bunu yapmak için düğümleri durdurmana gerek yok.

### Uzak düğümden`scp`

`scp`Linux ve MacOS bilgisayarlarında yerleşik olarak kullanılabilen 'güvenli bir kopya' komut satırı programıdır. `pscp`Ayrıca [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) paketinin bir parçası olarak Windows sürümleri de vardır. `scp`Eğer `pscp`kullanmaksa, aşağıdaki komutlar kullanılarak her kullanımını değiştirir.`pscp -scp`

Dosyaları düğümden kopyalamak için makineye uzaktan giriş yapabilmeniz gerekiyor. Hesap parolasını kullanabilirsiniz, ama güvenli ve tavsiye edilen yol SSH anahtarlarını kullanmaktır. SSH anahtarlarını satın almak ve ayarlamak için kullanılan prosedür, bulut sağlayıcınız ve makine yapılandırmanıza oldukça bağlıdır. [Amazon Web Hizmetleri](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) ve [Microsoft Azure](set-up-an-avalanche-node-with-microsoft-azure.md) bu sağlayıcılar için kurma rehberlerine başvurabilirsiniz. Diğer sağlayıcılar da benzer prosedürlere sahip olacak.

Makineye uzaktan giriş araçlarınız olduğu zaman dosyaları aşağıdaki komutla kopyalayabilirsiniz:

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Bu makinedeki kullanıcı adının farklı `ubuntu`ise, her iki yerde de doğru kullanıcı adı ile değiştirildiğini varsayar. `PUBLICIP`Ayrıca makinenin gerçek IP ile değiştir. Eğer otomatik olarak indirilen SSH anahtarını `scp`kullanmazsa, onu elle gösterebilirsiniz:

```text
scp -i /path/to/the/key.pem -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Çalıştırıldığında, bu komut evinizin `avalanche_backup`dizini oluşturacak ve içine yedek dosya yerleştireceksiniz. Onları güvenli bir yere depolamalısınız.

## Yeniden düzenle

`staker.key``staker.crt`Düğününüzü yedekten geri çevirmeliyiz: yedek ve düğümün çalışma dizinine dönüştüreceğiz.

Önce [düğümün](set-up-node-with-installer.md) her zamanki kurulumunu yapmalıyız. Bu yeni bir NodeID yaratacak, ki bu da bizim değiştirmemiz gerek. Düğüm doğru yüklendiğinde, düğümün çalıştığı makineye girin ve durdurun:

```text
sudo systemctl stop avalanchego
```

Düğümü onarmaya hazırız.

### Yerel düğümlere

`staker.key`Eğer düğümü yerel olarak çalıştırıyorsanız, yedek konumdan `staker.crt`dosyayı çalıştır ve işletim dizine kopyalayın, ki bu Linux kurulumu öntanımlı olacak.`/home/USERNAME/.avalanchego/staking/` Düğümü çalıştırmak için kullanılan gerçek kullanıcı adı `USERNAME`ile değiştir.

### Uzak düğümle kullanılacak`scp`

Yine söylüyorum, bu işlem sadece ters bir operasyon. `staker.key`Yedek konumdan gelen `staker.crt`dosyaları uzaktan çalışma dizinine `scp`kopyalamak zorundayız. Yedek dosyaların üst yedek prosedürün onları yerleştirdiği dizinde olduğunu varsayarsak:

```text
scp ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Ya da SSH anahtarına giden yolu belirtmek istiyorsanız:

```text
scp -i /path/to/the/key.pem ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Ve eğer farklı ise, doğru kullanıcı adı `ubuntu`ile değiştir, ve makinenin gerçek IP ile düğümleri çalıştıran ve kullanıldığı SSH anahtarına giden yol `PUBLICIP`ile değiştir.

### Düğümü yeniden başlatın ve doğrulayın.

Dosyalar değiştirildikten sonra makineye girin ve düğümleri kullanın:

```text
sudo systemctl start avalanchego
```

Şimdi düğümün doğru NodeID ile yeniden yapılandırıldığına emin olabilirsiniz. Önceki komutu işlediğiniz konsolda [getNodeID](https://docs.avax.network/build/avalanchego-apis/info-api#info-getnodeid) API çağrısını yayınlayarak önceki konsolda kullanabilirsiniz:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Orijinal your görmelisin. Yeniden düzenleme işlemi tamamlandı.

## Özetle

Düğününüzü güvence altına almanın en önemli kısmı of tam ve acısız yenilenmesini sağlayan yedek kuvvet. Bu öğretmenin ardından kolayca dinlenebileceğinizi bildiğiniz gibi your sıfırdan yeniden kurmanız gereken bir durumda kendinizi bulunca kolayca ve hızlı şekilde bunu yapabiliyorsunuz.

Eğer bu özel dersi takip etmekte bir sorununuz varsa, bizimle paylaşmak istediğiniz yorumlar ya da sadece sohbet etmek istiyorsanız, [Discord](https://chat.avalabs.org/) sunucumuzla bize ulaşabilirsiniz.

