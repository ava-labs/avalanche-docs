# Düğüm yedekleme ve geri getir

Düğününü bir kez çalıştırır açmaz felaket iyileşmesi için hazırlanma zamanı geldi. Makinenizin donanım veya yazılım sorunları yüzünden felaket bir arızası olursa ya da doğal bir felaket vakası olsa bile böyle bir duruma destek yaparak hazırlanmak en iyisi.

Çalışırken veritabanı ile birlikte tam bir düğüm kurulumu çoklu gigabayt boyutu olarak büyüyebilir. Bu kadar büyük bir veri hacmi geri almak pahalıdır, karmaşık ve zaman alıcıdır. Neyse ki daha iyi bir yol var.

Geri dönüp her şeyi geri vermek yerine sadece gerekli olan şeyleri desteklemeliyiz. Bu dosyalar senin düğümüne benzersiz oldukları için yeniden yapılandırılamaz. Avalanchego düğümü, benzersiz dosyalar ağ üzerindeki your those diğer bir deyişle your tanımlayan dosyalar Kurulumun kendisi yeni bir makineye düğümü yerleştirerek kolayca yeniden oluşturulabilir ve blok zinciri verilerinin geri kalan tüm gigabytes diğer ağ from gelen verileri kopyalayan bootstrapping süreci ile kolayca yeniden oluşturulabilir.

Düğününüz ağdaki bir doğrulayıcı olsa ve üzerinde birden fazla delege varsa bile, başka bir şeyi desteklemekten endişe etmenize gerek yok, çünkü onaylama ve delegasyon işlemleri blok zincirinde de saklanıyor ve blok zincirinin geri kalanı ile birlikte geri getirilecek.

## NodeID

NodeID your ağdaki diğer diğer arkadaşlardan ayıran eşsiz bir tanımlayıcıdır. `NodeID-5mb46qkSBB81k9g9e4VJGGSbaaSLzD` gibi bir dizi. NodeID [nasıl](../../references/cryptographic-primitives.md#tls-addresses) yapıldığına dair teknik geçmişe bakabilirsiniz. Özünde, NodeID iki dosya tarafından tanımlanır:

* `Staker. crt`
* `Staker. key`

Öntanımlı kurulumda, özellikle `~/.avalanchego/staking/`. çalışma dizinde bulunabilirler. Başka bir makinenin düğümünü yeniden oluşturmak için tek yapmamız gereken o iki dosyayla yeni bir kurulum çalıştırmak.

{% ipuçları style="warning" } Eğer of anahtar mağazasında tanımlanmış kullanıcılar varsa, o zaman geri dönüp bunları da geri getirmeniz gerekir. [Keystore API](../../avalanchego-apis/keystore-api.md), kullanıcı anahtarlarını aktarmak ve aktarmak için kullanılabilecek yöntemler vardır. Keystore API'nin sadece geliştiriciler tarafından kullanıldığını ve üretim düğümlerinde kullanılmaya not not edin. Eğer bir anahtar mağazası API'nin ne olduğunu bilmiyorsanız ve kullanmamışsanız, endişelenmenize gerek yok. {% endhint %}

## Yedek

Düğününüzü desteklemek için `özel` ve güvenli ve güvenli bir yerde saklamamız gerekiyor. tercihen `farklı` bir bilgisayara, buluttaki özel your USB çubuğu veya benzer bir şekilde. Birkaç farklı yere saklamak, güvenli yerlerin güvenliği artırır.

{% ipuçları style="warning" } Eğer biri senin mühür dosyalarını ele geçirirse, cüzdanın özel anahtarları tarafından kontrol edildiği için hala your ulaşamazlar. Ama düğümünü başka bir yerde yeniden yaratabilirler. Şartlara bağlı olarak bu ödülleri kaybetmene neden olur. O yüzden kıç dosyalarının güvenli olduğundan emin ol. {% endhint }

Düğümü çalıştıran makinenin kapak dosyalarını alalım.

### Yerel düğümden

Eğer düğümü yerel olarak işletiyorsan, masaüstü bilgisayarında sadece dosyanın nerede olduğunu bul ve güvenli bir yerde kopyala.

Öntanımlı bir Linux kurulumunda, onlara giden yol `düğümü` çalıştıran gerçek kullanıcı adı ile `değiştirilmesi` gereken be Dosyaları oradan yedek bir yere seçin ve kopyalayın. Bunu yapmak için düğümleri durdurmana gerek yok.

### Uzaktan düğümden `scp` kullanarak

`Scp` Linux ve MacOS bilgisayarlarında yerleşik olarak bulunan 'güvenli bir kopya' komut satırı programıdır. `Pscp`, [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) paketinin bir parçası olarak Windows sürümleri de vardır. Eğer `pscp` kullanımı, aşağıdaki komutlarda `her bir` `scp -scp` ile değiştirilir.

Dosyaları düğümden kopyalamak için makineye uzaktan giriş yapabilmeniz gerekiyor. Hesap parolasını kullanabilirsiniz, ama güvenli ve tavsiye edilen yol SSH anahtarlarını kullanmaktır. SSH anahtarlarını satın almak ve ayarlamak için kullanılan prosedür, bulut sağlayıcınız ve makine yapılandırmanıza oldukça bağlıdır. [Amazon Web Hizmetleri](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) ve [Microsoft Azure](set-up-an-avalanche-node-with-microsoft-azure.md) bu sağlayıcılar için kurma rehberlerine başvurabilirsiniz. Diğer sağlayıcılar da benzer prosedürlere sahip olacak.

Makineye uzaktan giriş araçlarınız olduğu zaman dosyaları aşağıdaki komutla kopyalayabilirsiniz:

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Bu, makinedeki kullanıcı adının `ubuntu` olduğunu varsayar ve farklı olduğu takdirde her iki yerde de doğru kullanıcı adı ile değiştirilir. Ayrıca, kamuoyu IP makinenin gerçek IP ile `PUBLICIP` değiştir. `Eğer Scp` indirilen SSH anahtarını otomatik olarak kullanmazsa, onu elle gösterebilirsiniz:

```text
scp -i /path/to/the/key.pem -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Çalıştırıldığında, bu komut evinizin dizininde `avalanche_backup` dizini oluşturacak ve içine yedek dosyaları yerleştireceksiniz. Onları güvenli bir yere depolamanız gerek.

## Yeniden düzenle

Düğününüzü bir yedekten geri çevirmek için geri çevirmeliyiz: yedek odadan düğünün çalışma dizine kadar `staker.key` ve `staker.crt`.

Önce [düğümün](set-up-node-with-installer.md) her zamanki kurulumunu yapmalıyız. Bu yeni bir NodeID yaratacak, ki bu da bizim değiştirmemiz gerek. Düğüm doğru yüklendiğinde, düğümün çalıştığı makineye girin ve durdurun:

```text
sudo systemctl stop avalanchego
```

Düğümü onarmaya hazırız.

### Yerel düğümlere

Eğer düğümü yerel olarak çalıştırıyorsanız, yedek konumdan çalışma dizine yedek konumdan `kalkan` dosyalarını `kopyalayın,` ki bu Linux kurulumu öntanımlı olarak `be` Düğümü çalıştırmak için kullanılan gerçek kullanıcı adı ile `kullanıcı` adını değiştir.

### Uzaktan düğümle `scp` kullanarak

Yine söylüyorum, bu işlem sadece ters bir operasyon. `Scp` kullanarak `yedek` konumdan gelen `konumdaki` konumdaki dosyaları uzaktan çalışma dizine kopyalamak gerekir. Yedek dosyaların üst yedek prosedürün onları yerleştirdiği dizinde olduğunu varsayarsak:

```text
scp ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Ya da SSH anahtarına giden yolu belirtmek istiyorsanız:

```text
scp -i /path/to/the/key.pem ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Ve tekrar tekrar, eğer farklı ise `ubuntu`'yu doğru kullanıcı adı ile değiştir, ve `kullanıldığı` SSH anahtarına giden gerçek IP ile different, değiştir.

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

