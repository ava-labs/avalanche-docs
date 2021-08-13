---
description: 'Toplum üyesi tarafından üretilen dersler: Seq'

---

# Microsoft Azure ile bir Avalanche Node çalıştır

Bir doğrulama uygulaması ve Avalanche ile takılırken kazandığınız uzunluğa göre %9,69 ile %11,54 arasında rekabetçi ödüller sağlar. En düşük oran 14 gün boyunca bir yıl boyunca kazınarak kazanılır. Ayrıca kesme de yok, bu yüzden bir donanım arızası ya da istemcinin bir parçası veya tüm kazıklarınızı kaybetmenize neden olan hata hakkında endişelenmenize gerek yok. Avalanche yerine ödül almak için sadece %60 daha yüksek bir süre devam etmeniz gerekir. Bu şartı yerine getiremezseniz kesilmez, ancak ödülleri alamazsınız. **Bu düğümle geçerli olmak için özel anahtarlarınızı bir düğüme koymanıza da gerek yok.** Biri senin bulut ortamına girip düğüme erişse bile en kötü şey düğümü kapatmaktır.

Sadece bir doğrulama düğümünü çalıştırmak in ödüller almanızı sağlamaz, ayrıca daha sonra in diğer alt ağları da onaylayabilir ve alt ağlarına verilen token the ödül alabilirsiniz.

Sadece 2 CPU çekirdeği, 4 GB Hafıza ve 200 GB SSD ile bir doğrulayıcı çalıştırmak için mütevazı donanım gereksinimlerine ihtiyacınız var ve çok miktarda enerji kullanmıyor. Avalanche’s [devrimci uzlaşma mekanizması](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656) aynı anda uzlaşmaya katılan milyonlarca onaylayıcı scale ve eşsiz bir ademi merkeziyete maruz kalabilmektedir.

Geçerli olmak için kazık kazığı gereken asgari miktar, 2,000 AVAX (fiyat arttıkça zaman içinde azaltılabilir). Alternatif olarak, doğrulayıcılar ayrıca kullanıcıların maliyetleri çalıştırmak için kendilerine hissesini sunmalarını sağlamak için küçük bir ücret ödeyebilirler. Bir hesap makinesini [kullanarak](https://vscout.io/) bir düğümle çalıştırdığınızda ne kadar kazanacağınızı görebilirsiniz.

Herkesi mümkün olduğunca kendi onaylayıcıları çalıştırmaya teşvik ediyorum, ama asgari para şartlarını yerine getirmeyenler için şu anda [burada](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb) bulabileceğiniz bir düğüm işletiyorum.

Bu makalede Microsoft Azure üzerinde bir düğüm yapılandırma sürecini aşacağız. Bu özel ders Microsoft Azure ile önceki deneyimlerden bahsetmiyor ve mümkün olduğunca az varsayımla her adımı atacak.

Bu makalenin zamanında sanal makinenin fiyatlandırılması, 2 Cores ve 8 GB bellek değeri olan sanal bir makine, yılda 113.44 dolar ile çalışan sanal bir saat başına 0.01060 dolar **değerinde, %83.76 tasarruf! Normal ücretle karşılaşırsan fiyata gidersin.** in 2 Cores ve 4 GB Memory ile bir sanal makine ile karşılaştırıldığında her yıl 462 dolar değerindedir.

## İlk Üyelik Yapılandırması<a id="6e8d"></a>

### 2 Faktör ayarla<a id="b9d0"></a>

Önce bir Microsoft Hesap gerek, eğer zaten yoksa, aşağıdaki bağlantıda oluşturma seçeneğini göreceksiniz. Eğer zaten bir tane varsa, your aşağıdaki bağlantıya geçip "İki adımlı doğrulama seçip" seçerek ve verilen adımları takip ederek 2 Factor kimlik doğrulaması ayarlayın.

[https:// account, https://account.microsoft.com/security](https://account.microsoft.com/security)

![Posta için resim](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

İki faktör [to](https://portal.azure.com/) gidip Microsoft hesabınıza girerek Azure portalına yapılandırıldıktan sonra. Giriş yaptığınızda aboneliğiniz olmayacaktır, bu yüzden önce bir tane yaratmamız gerekiyor. Aşağıda vurgulandığı gibi "Subscriptions" seçin:

![Posta için resim](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Sonra yeni bir abonelik eklemek için "+ Ekle" seçin.

![Posta için resim](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

Eğer Spot Instance VM Price \ (ki bu oldukça daha ucuz olacak\ ) kullanacaksanız ücretsiz bir deneme hesabı kullanamazsınız\ (ve onaylandığında bir hata alacaksınız\  (ve size bir hata alacaksınız) bu yüzden **Pay-As-You-Go. seçtiğinizden emin olun.**

![Posta için resim](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Bileşen detaylarını girin ve kimlik kimlik işleminin bir parçası olarak kimlik doğrulayın, destek seçeneğini ekleyiniz\ (destek için ekstra ödeme yapmak istemiyorsanız) ve Next'e basın.

![Posta için resim](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Sanal Makine oluştur<a id="41ac"></a>

Artık abonemiz olduğuna göre Avalanche our için Ubuntu Sanal Makine'yi yaratabiliriz. Menü için sol üst kattaki simgeyi seçin ve "+ oluşturun" seçin.

![Posta için resim](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Ubuntu Sunucusunu 18.04 LTS \(Bu normalde popüler bölüm altında olacak veya pazarda alternatif olarak arama yapılacaktır

![Posta için resim](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Bu sizi aşağıda gösterilen gibi sanal bir makine sayfası oluşturmaya götürecek:

![Posta için resim](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

İlk olarak, sanal makineye bir isim gir, bu herhangi bir şey olabilir. Ama benim name, Avalanche (bu da kaynak grubu adını otomatik olarak eşleştirecek

O zaman indirme listesinden bir bölge seç. Bu özelliklerin en büyük özelliklerine sahip ve daha ucuz fiyatlara sahip olan daha büyük olanlardan birini seçin. Bu örnekte Kuzey Avrupa'yı seçtim.

![Posta için resim](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

Çalışan maliyetler için önemli miktarları kaydetmek için spot fiyatlarını kullanma seçeneğiniz var. Spot örnekleri pazarlama ve talep edilen fiyat yapısını kullanır. Örneklerin talebi arttıkça, spot örneğinin fiyatı artacak. Yetersiz kapasitemiz varsa, your kapatılacaktır. Bunun olma ihtimali inanılmaz derecede düşük, özellikle de Kapasitelik seçeneği seçiyorsanız. Olasılık dışı durumda bile geçici olarak kapatılsa bile bu kazık ödüllerini almak için sadece %60 kadar yüksek bir süre sürdürmeniz gerekir.

Azure Spot örneğine evet seç Capacity için tahliye türünü sadece seçin ve **tahliye politikasını durdurma / Deallocate için ayarladığınızdan emin olun. Bu çok önemlidir aksi takdirde VM silinecektir.**

![Posta için resim](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Sanal Makine boyutunu değiştirmek için "Seçin boyutu" seçin ve D-Series v4 seçimi altında D2s\_v4 (Bu boyutta 2 Çekir, 8 GB Bellek ve Premium SSDs\   etkinleştirir). Bunun yerine 2 Cores, 4 GB Memory ve Premium SSD\ sunan F2s\ v2 örneklerini kullanabilirsiniz, ancak spot fiyatı şu anda spot instance fiyatları olan daha büyük VM için daha ucuza gider. [Bu](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) bağlantıyı farklı bölgeler üzerindeki fiyatları görmek için kullanabilirsiniz.

![Posta için resim](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Sanal Makine'nin boyutunu seçtiğinizde, son üç ay içinde spot fiyatının nasıl değiştiğini ve daha fazla yedek kapasiteye sahip bir bölgeyi kullanmak daha ucuz olup olmadığını görmek için "fiyat tarihini gör" ve yakınlardaki bölgeleri karşılaştırın.

![Posta için resim](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

Bu makalenin zamanında Kuzey Avrupa'da D2s\ v4 için spot fiyatları saat başına 0.07975 dolar veya yılda 698.61 dolar tutar. Fiyat fiyatıyla saatte 0.01295 dolara düşüyor ve bu da yılda 113.44 dolar ve **%83.76 tasarruf ediyor!**

Hatta daha ucuz bölgelerde var, örneğin Doğu Amerika saatte 0.01060 dolar veya yılda 92.86 dolar civarında.

![Posta için resim](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

Aşağıda, Kuzey Avrupa ve yakınlardaki bölgelerde geçen 3 ay boyunca of fiyat tarihini ![görebilirsiniz. Posta için görüntüler.](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)

![Posta için resim](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Amazon than daha ucuz.<a id="45e9"></a>

Bir karşılaştırma olarak c5.büyük bir örnek on saat başına 0.085 USD maliyetine mal olur. Bu yılda 745 ABD doları gelir. Spot örnekleri %62 tasarruf ederek, toplam 462 dolara indirilir.

Sonraki adım VM için kullanıcı adını değiştirmek, diğer Avalanche tutorials aynı hizaya gelmek için ubuntu'ya kullanıcı adını değiştirmektir. Aksi takdirde bu makalede birkaç komutu değiştirip ubuntu ile yeni kullanıcı adınızı değiştirmeniz gerekecek.

![Posta için resim](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Diskler<a id="ed2e"></a>

Sonraki Seç: Diskleri dize almak için diskleri seçin. Diskler için iki seçenek vardır, ya Premium SSD ya da ayda 64 GB disk maliyetleri ile daha fazla performans sunan ya da düşük performans sunan ve ayda 5 dolar civarında olan standart SSD vardır. Ayrıca Standart SSD ile 10.000 işlem birimi başına 0.002 dolar ödemeniz gerekirken, Premium SSD'ler ile her şey dahil edilir. Şahsen, daha iyi performans için Premium SSD'yi seçtim ama ayrıca disklerin büyük ihtimalle kullanılması ve uzun vadede daha ucuza da çalışabilmesi nedeniyle.

Sonraki seçin: Ağ yapılandırması için hareket edecek ağ

![Posta için resim](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### Ağ Yapılandırması<a id="bc5d"></a>

Bu durumda halka verilen IP IP kullanmak, bu durum durduğunda değişmez. Kamu İP'si altında "Yeni Oluştur" seçin

![Posta için resim](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

O zaman "Statik" olarak görev tipi olarak seçin

![Posta için resim](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

O zaman Avalanche düğümüne girişi kontrol etmek için ağ güvenlik grubunu ayarlamalıyız. NIC ağ güvenlik grubu türü olarak "Gelişmiş" yı seçin ve "Yeni Oluşturun"

![Posta için resim](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

Güvenlik amaçları için your uzaktan bağlanabilecek kişileri kısıtlamak istiyorsunuz. Bunu yapmak için önce mevcut halka açık IP neyin ne olduğunu öğrenmek isteyeceksiniz. Bu iş Google'a gidip "benim my ne" diye araştırarak yapılabilir.

![Posta için resim](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

Özellikle istemediğiniz sürece eviniz için dinamik bir halka IP olarak atanmış olmanız muhtemeldir, bu yüzden atanan halka açık IP gelecekte değişebilir. Yine de mevcut IP erişimini kısıtlaması önerilir, ve sonra ev IP değişmesi durumunda ve artık to uzaktan are durumlarda, ağ güvenlik kurallarını yeni halka açık IP ile güncelleyebilirsiniz.

Not: Eğer ev IP değişmişse ağ güvenlik kurallarını değiştirmeniz gerekiyorsa "avalanche-nsg" arayın ve SSH ve Port 9650 için yeni with değiştirebilirsiniz. **9651 limanı herkese açık kalması** gerekir, ancak diğer Avalanche düğümleriyle bu şekilde iletişim kurabilir.

![Posta için resim](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

Şimdi kamu IP ipinizi seçtiğinize göre, öntanımlı olarak sol üzerindeki ssh kuralını değiştirme izin verir. Kaynağı from "IP Adresler" e değiştir ve sonra Kaynak IP adres alanındaki Google'dan bulduğunuz Public IP adresinize girin. Önceliği en altta 100'e çevirin ve sonra to basın.

![Posta için resim](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

O zaman RPC erişimi için başka bir kural daha eklemek için "+ Ekle bir bağlanma kuralı" seçin, bu da sadece your sınırlanmalıdır. Kaynağı "IP Adresleri" olarak değiştirin ve halka açık IP sitenize giriniz. Google'dan Kaynak IP alanına girdi. Bu sefer "Hedef bağlantı alanı" alanını 9650'ye değiştirir ve protokolü olarak "TCP" seçin. Önceliği 110'a değiştir ve ona "Avalanche\_RPC" adını ver, to bas.

![Posta için resim](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

Diğer düğümler sizin your iletişim kurabilsin diye Avalanche Protokolü için son bir kural eklemek için "+ Ekle bir bağlanma kuralı seçin" Bu kuralın herkese açık olması gerekiyor bu yüzden "Kaynağı" "Herkes" programına ayarlansın. Hedef bağlantı aralığını "9651" olarak değiştirin ve protokolü "TCP" olarak değiştirin. 120 kişilik öncelik ve Avalanche\ Protocol adı ile of bas.

![Posta için resim](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

Ağ güvenlik grubu aşağıdaki gibi görünmeli (her ne kadar halka açık adresiniz farklı olacak ) ve tamama basın.

![Posta için resim](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

Diğer ayarları öntanımlı olarak bırak, sonra Sanal makine oluşturmak için "İnceleme + yaratılma" tuşuna bas.

![Posta için resim](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

Önce onaylama testi yapacak. Eğer burada bir hata alırsanız, Pay-As-You-Go abonelik modelini seçtiğinizden emin olun ve Spot örnekleri mevcut olmadığı için Özgür Mahkeme aboneliğini kullanmıyorsunuz. Her şeyin doğru göründüğünü doğrulat ve "Yaradılış" tuşuna bas.

![Posta için resim](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

Sonra sanal makineni bağlamak için yeni bir anahtar çifti oluşturmanızı isteyen bir acele almalısınız. Özel anahtarı PC'nize indirmek için "özel anahtarı indirmek ve kaynak oluşturmak" seçin.

![Posta için resim](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

Göreviniz bittiğinde, "Kaynağa git" seçin.

![Posta için resim](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Öngörülen Disk boyutunu Değiştir<a id="00dc"></a>

Varsayılan olarak, Ubuntu VM, 30 GB Premium SSD ile sağlanacaktır. Veritabanı büyümesine izin vermek için bunu 250 GB'a çıkarmalısınız.

![Posta için resim](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

Disk boyutunu değiştirmek için Disk durdurulması ve boşaltılması gerekir. "Dur" seçin ve tahribatın yapılmasını bekleyin. Sonra soldan "Disk" seçin.

![Posta için resim](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

Değiştirmek için mevcut olan Disk adını seçin

![Posta için resim](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

Ayarlar altında sol üzerinde "Boyut + performansı" seçin ve boyutu 250 GB'a değiştir ve "Yeniden Düzen"e basın.

![Posta için resim](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

Bunu şimdi yapmak da Ubuntu'da bölünmeyi otomatik olarak genişletecek. Sanal makine genel bakış sayfasına geri dönmek için, navigasyon ayarında Avalanche seçin.

![Posta için resim](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

O zaman VM'yi başlat.

![Posta için resim](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Çığ Düğününe bağlan<a id="8bb7"></a>

Aşağıdaki talimatlar bir Windows 10 makinesinden Sanal Makineye nasıl bağlanacağını gösterir. Ubuntu makinesinden nasıl bağlanılacağı konusunda talimatlar için [AWS özel ders](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) verimini gör.

Yerel PC'nizde Avalanche denilen sürücünün kökünde bir dizin oluşturun ve daha önce dizine indirdiğiniz Avalanche\ Avalanche\_key.pem dosyasını kaldırın. Sonra dosyanın sağ tıklayın ve Özellikleri seçin. Güvenlik sekmesine git ve alt tabaktan "Gelişmiş" seç.

![Posta için resim](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

Bu dosyadaki tüm izinleri kaldırmak için "mirası devre dışı bırak" ve "bu nesneden miras kalan tüm izinleri kaldırın" adını seçin.

![Posta için resim](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

Sonra yeni bir izin eklemek için "Ekle" seçin ve üstte "bir müdür seçin" Makinene giriş yapmak için kullanıcı hesabındaki açılma kutusu girişinden Bu örnekte, Seq adında yerel bir kullanıcı ile bağlantı kurduğum, giriş yapmak için kullandığınız bir Microsoft hesabınız olabilir, bu yüzden bilgisayarınıza giriş yapacağınız her hesabı kullanın ve "İsimleri Kontrol Edin" ile "Kontrol Edin" tuşuna basın ve onaylamak ve OK'a basmanız için alttan çizer.

![Posta için resim](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

Daha sonra izin bölümünden sadece "Oku & Uygulama" ve "Okun" seçildiğinden ve "Okunun" tuşuna bas.

![Posta için resim](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

Aşağıdaki gibi görünmeli, farklı bir PC adı / kullanıcı hesabı hariç. Bu sadece anahtar dosyası güvenlik amacıyla bu makinedeki diğer hesaplar tarafından değiştirilemez veya erişilemez yani Avalanche your erişemezler.

![Posta için resim](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Çığ Noelde Kamu IP adresini bul<a id="4687"></a>

Azure Portal'dan statik halka açık IP adresinizi not edin.

![Posta için resim](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Avalanche düğümüne girmek için, "cmd" ararken ve Windows 10 makinenizde "Komuta Sırası" seçerek açılır komutu açılır.

![Posta için resim](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

Sonra aşağıdaki komutu kullanın ve Azure portalında gösterilen statik IP adresi ile EnterYourAzureIPHere yerine geç.

Ssh -i C:\Avalanche\Avalanche\_key.pem key.. pem ubuntu@EnterYourAzureIPHere

Örnek olarak:

ssh -i C:\Avalanche\Avalanche\_key.pem C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

İlk bağlandığınızda devam etmek isteyen bir acele alacaksınız, evet.

![Posta için resim](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

Şimdi düğümle bağlantın olmalı.

![Posta için resim](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

Aşağıdaki bölüm [Colin'in Amazon'un Amazon’s Avalanche Node yapılandırmak](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) için mükemmel özel ders vermesinden alınmıştır.

### Linux'u güvenlik yamalarıyla güncelle<a id="8a1c"></a>

Artık on için en son paketlere güncellemek iyi bir fikir. Bunu yapmak için, aşağıdaki komutları uygula, sırayla tek tek sıra:

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![Posta için resim](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

Bu durum, işletim sistemimizin en son güvenlik şeridini ile ilgili olarak günümüze ulaşacaktır. Bu düğümleri yeniden başlatacak. Düğünlere bir iki dakika veririz, sonra tekrar gireceğiz, eskisi gibi.

### Çığ Düğümünü kur<a id="5688"></a>

Şimdi Avalanche düğümümüzü kurmamız gerekecek. Bunu yapmak için, kurulum sürecini otomatik olarak ayarlayan İnstaller öğretisi [ile Set Up Avalanche](set-up-node-with-installer.md) the takip edin. Daha önce kurduğumuz Azure Portal'dan "IPv4 Kamu IP" kopyalanmasına ihtiyacınız olacak.

Kurulum tamamlandıktan sonra our artık kaydırma olacak! Çığ düğümünün son durumuna bakmak için aşağıdaki komutu çalıştırabiliriz:

```text
sudo systemctl status avalanchego
```

Çizme kayışının durumunu kontrol etmek için "kıvrım" kullanarak yerel to bir ricada bulunmamız gerekecek. Bu talep şöyle:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Düğün, bu anda bir saat daha uzun sürebilir\ (bu anda yazma \) bot kaydırma için zaman alabilir. Bootstrap, düğümlerin indirildiği ve zincirlerin tarihini doğruladığı anlamına gelir. Biraz zaman ver. Düğüm bot kayışı bittiğinde, cevap şöyle olacak:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Her zaman "sudo systemctl statü avalanchego" kullanabiliriz.

### NodeID alın.<a id="20a7"></a>

Bu düğümle ilgili herhangi bir doğrulama yapacaksak kesinlikle NodeID almamız gerekiyor. Bu da from alınmıştır. our almak için aşağıdaki eğri komutunu çağırıyoruz.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Eğer her şey yolunda ise, cevap şöyle olmalı:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

"NodeID-Lve2PzuCvXrqn8Stqwy9vWux6VyGUCR" yazan bu bölüm bizim our Bunu kopyala ve notlarımıza yaz. Bu değerin gizli veya güvenli bir tarafı yoktur, ancak bu düğümü onaylayıcı olarak sunmak için mutlak bir zorunluluktur.

### Stake Keylerini Destekle.<a id="ef3e"></a>

Yapılması gereken son şey vaktimizin bozulması ya da sonlandırılması durumunda gizli anahtarlarımızı desteklemek. Bu anahtarları saklamamız için iyi bir uygulama. Onları desteklemek için şu komutu kullanıyoruz:

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Daha önce olduğu gibi, "EnterYourAzureIPHere" yerine getirdiğimiz uygun değer ile değiştirmemiz gerekecek. Bu bizim gizli anahtarımızı destekliyor ve sertifikamızı önceden yarattığımız C:\Avalanche dizinine yerleştiriyor.

![Posta için resim](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

