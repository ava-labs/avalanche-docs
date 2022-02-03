---
description: 'Bu eğitim makalesini yazan topluluk Üyesi: Seq '
---

# Microsoft Azure ile Bir Avalanche Düğümünü Çalıştırın

Avalanche ile bir doğrulayıcı çalıştırma ve staking yapma, stake etme sürenize bağlı olarak %9,69 ile %11,54 arasında son derece rekabetçi ödüller sağlar. En yüksek oran bir yıl boyunca, en düşük oran ise 14 gün boyunca stake yapılarak kazanılır. Slashing \(ceza\) de yoktur, dolayısıyla stake'inizin bir kısmını veya tamamını kaybetmenize sebep olacak bir donanım arızasından veya istemcideki bir hatadan \(bug\) endişelenmenize gerek yoktur. Bunun yerine, Avalanche'la çalıştığınızda, ödül kazanmak için tek ihtiyacınız olan şey, şu an itibarıyla en az %80 oranında "uptime"ı \(makinenizin fiilen çalışır durumda olduğu süre\) korumanızdır. Bu gerekliliği karşılamazsanız kesinti cezası \(slashing\) almazsınız ama ödül de kazanmazsınız. **Ayrıca bir düğümde doğrulama yapmaya başlamak için özel anahtarlarınızı o düğüme koymanıza da gerek yoktur.** Birileri bulut ortamınıza sızmayı başarsa ve düğümünüze erişse bile, yapabilecekleri en kötü şey düğümünüzü kapatmak olur.

Bir doğrulayıcı düğümü çalıştırmanız yalnızca AVAX cinsinden ödüller kazanmanızı sağlamakla kalmaz, aynı zamanda bir süre sonra ekosistemdeki diğer subnet'lerde de doğrulama yapabilir ve o subnet'lerin yerli tokenlarını ödül olarak kazanabilirsiniz.

Bir doğrulayıcı çalıştırmak için tek ihtiyacınız olan şey 2 CPU çekirdekli, 4 GB Bellek ve 200 GB SSD kapasiteli mütevazı bir donanım; böyle bir donanım muazzam miktarlarda enerji de harcamaz. Avalanche'ın [devrim niteliğindeki konsensüs mekanizması](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656) konsensüse iştirak eden milyonlarca doğrulayıcıya aynı anda yetişebilmekte, benzeri olmayan bir merkeziyetsizlik sunabilmektedir.

Şu anda bir doğrulayıcı olmak için stake edilmesi gereken minimum miktar 2.000 AVAX'tır \(ki zaman içinde fiyat yükseldikçe azalabilir\). Alternatif olarak, doğrulayıcılar işletim maliyetlerinin karşılanmasına yardımcı olması için kullanıcıların stake'lerini kendilerine delege edebilmeleri için küçük bir ücret de alabilirler. [Burada](https://vscout.io/) verilen bir hesap makinesini kullanarak, bir düğüm çalıştırarak ne kadar ödül kazanabileceğinizi, delege etmeyle karşılaştırmalı olarak görebilirsiniz.

Ben herkesin mümkünse kendi doğrulayıcılarını çalıştırmalarını tavsiye ederim, ama minimum stake etme gerekliliklerini karşılayamayan ve delege etmek isteyenler için [burada](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb) bulabileceğiniz bir düğüm çalıştırıyorum.

Bu makalede Microsoft Azure'da bir düğümü yapılandırma sürecini adım adım inceleyeceğiz. Bu eğitim makalesinde daha önce Microsoft Azure kullanmadığınız varsayılır ve her adım mümkün olduğunca az varsayımla işlenir.

Bu makale yazıldığı sırada 2 Çekirdekli ve 8 GB bellekli bir sanal makinenin spot fiyatı saatte 0,01060 $ gibi küçük bir maliyet oluşturmakta, bu da bir yılda 113,44 $ ediyor, **yani kullandıkça öde fiyatları üzerinden ödeyeceğiniz normal ücretle karşılaştırıldığında %83,76 oranında tasarruf sağlıyor!.** Buna karşılık AWS'de 2 çekirdekli ve 4 GB bellekli bir sanal makinenin spot fiyat üzerinden maliyeti yılda yaklaşık 462 $.

## İlk Abonelik Yapılandırması {#6e8d}

### 2 Faktör kurun {#b9d0}

Önce bir Microsoft Hesabına ihtiyacınız olacak; Microsoft hesabınız yoksa, aşağıdaki bağlantıda hesap oluşturma seçeneğini göreceksiniz. Microsoft hesabınız varsa, düğümünüzü güvenli hale getirmek için aşağıdaki bağlantıya giderek 2 Faktörlü kimlik doğrulamasını kurun, sonra "İki adımlı doğrulama" seçeneğini seçin ve verilen adımları takip edin.

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![Yayınlanacak görsel](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

İki faktör yapılandırıldıktan sonra [https://portal.azure.com](https://portal.azure.com/) adresine gidip Microsoft hesabınız ile giriş yaparak Azure portalında oturum açın. Oturum açtığınızda henüz aboneliğiniz yoktur, bu yüzden önce abonelik oluşturmanız gerekiyor. Aşağıda sarı boyayla vurgulanan "Abonelikler" ögesini seçin:

![Yayınlanacak görsel](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Sonra yeni bir abonelik eklemek için "\+ Ekle" ögesini seçin

![Yayınlanacak görsel](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

Spot Bulut Sunucusu VM Fiyatından yararlanmak isterseniz \(ki önemli ölçüde daha ucuzdur\), Ücretsiz Deneme hesabını kullanamazsınız \(onaylama yaptığınızda hata mesajı alırsınız\), bu yüzden **Kullandıkça Öde \(Pay-As-You-Go\) seçeneğini seçtiğinizden emin olun.**

![Yayınlanacak görsel](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Fatura bilgilerinizi girin ve kayıt sürecinin bir parçası olarak kimliğinizi doğrulayın, Teknik destek ekle kısmına geldiğinizde desteksiz seçeneğini seçin \(destek için ekstra para ödemek istemiyorsanız\) ve İleri düğmesini tıklayın.

![Yayınlanacak görsel](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Bir Sanal Makine Yaratın {#41ac}

Şimdi bir aboneliğimiz olduğuna göre, Avalanche Düğümümüz için Ubuntu Sanal Makinesi yaratabiliriz. Sol üstteki Menü simgesini tıklayıp "\+ Bir kaynak yarat" ögesini seçin.

![Yayınlanacak görsel](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Ubuntu Server 18.04 LTS'yi seçin \(bu seçenek normalde popüler bölümü altında olacaktır veya alternatif olarak bunu market bölümünde arayın\)

![Yayınlanacak görsel](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Bu sizi aşağıda gösterdiği gibi Sanal makine yarat sayfasına yönlendirecek:

![Yayınlanacak görsel](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

Önce bir sanal makineye bir ad girin, herhangi bir ad olabilir bu ama ben bu örnekte Avalanche adını kullandım \(Bunu yaptığınızda kaynak grubunun adı da otomatik olarak kullandığınız adla değişir\)

Sonra açılır menüden bir bölge seçin. Tercih ettiğiniz bir bölgede önerilenlerden birini seçin, çünkü bunlar çoğu özelliğin etkin olduğu daha büyük ve daha düşük fiyatlı seçenekler olabilmektedir. Bu örnekte ben Kuzey Avrupa'yı seçtim.

![Yayınlanacak görsel](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

İşletim maliyetlerinden önemli miktarda tasarruf etmek için spot fiyatlandırmayı kullanma seçeneğiniz var. Spot sunucularda arz ve talebe dayalı bir piyasa fiyatı yapısı kullanılır. Sunuculara olan talep arttıkça spot sunucu fiyatı da yükselir. Yetersiz kapasite varsa, VM'niz kapatılacaktır. Ama bu durumun gerçekleşme ihtimali inanılmaz düşüktür, özellikle de "Sadece kapasite" seçeneğini seçerseniz. Bu çok düşük ihtimal gerçekleşse ve makineniz geçici olarak kapatılsa bile, staking ödülleri kazanmak için makinenizin zamanın en az %80'inde çalışır durumda olması \(80% uptime\) yeterlidir ve Avalanche'da kesinti cezası \(slashing\) uygulanmamaktadır.

Azure Spot sunucusu için Evet'i seçin, Eviction \(tahliye\) tipini "Capacity Only" \(sadece kapasite\) olarak seçin ve **tahliye politikasını Stop / Deallocate \(Durdur / Tahsisi Kaldır\) olarak belirlediğinizden emin olun — Bu çok önemli, aksi takdirde VM'niz silinecektir**

![Yayınlanacak görsel](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Sanal Makinenin boyutunu değiştirmek "Boyut Seç" ögesini seçin ve D-Series v4 seçeneklerinden D2s\_v4'ü seçin \(Bu boyutta 2 çekirdek, 8 GB bellek vardır ve Premium SSD'leri etkinleştirir\). Bunun yerine, 2 çekirdekli, 4 GB bellekli ve Premium SSD'leri etkinleştiren F2s\_v2 sunucularını kullanabilirsiniz kullanabilirsiniz, ancak spot fiyat aslında daha büyük VM için güncel spot sunucu fiyatlarıyla daha ucuza gelmektedir. Farklı bölgelerdeki fiyatları görmek için [bu bağlantıyı](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) kullanabilirsiniz.

![Yayınlanacak görsel](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Sanal Makinenin boyutunu seçtikten sonra, spot fiyatın son 3 ayda nasıl değiştiğini görmek ve daha fazla yedek kapasiteye sahip bir makinenin yakınlardaki bir bölgede daha ucuz olup olmadığını görmek için "Fiyat geçmişini görüntüle ve yakın bölgelerdeki fiyatlarla karşılaştır" ögesini seçin.

![Yayınlanacak görsel](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

Bu makalenin yazıldığı sırada D2s\_v4 sunucusunun Kuzey Avrupa'daki spot fiyatı saatlik 0,07975 $ veya yıllık yaklaşık 698,61 $ idi. Spot fiyatlandırma ile bu ücret saatlik 0,01295$, yıllık 113,44$ seviyesine düşer, yani **%83,76! tasarruf sağlar!**

Daha da ucuz olan bazı bölgeler var, örneğin Doğu ABD'de spot fiyat saatlik 0,01060 $ veya yıllık yaklaşık 92,86 $!

![Yayınlanacak görsel](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

Aşağıda VM'nin son 3 ayda Kuzey Avrupa'daki ve yakın bölgelerdeki fiyat geçmişini görebilirsiniz.![Yayınlanacak görsel](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)

![Yayınlanacak görsel](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Amazon AWS'den daha ucuz {#45e9}

Bir karşılaştırma olsun diye, bir c5.large sunucusunun maliyeti AWS'de saatlik 0,085 $. Yıllık maliyet yaklaşık 745 $ oluyor. Spot sunucularda %62 oranında tasarruf elde etmek mümkün, dolayısıyla toplam maliyet 462 $'a düşüyor.

Bir sonraki adım, VM'nin kullanıcı adını değiştirmektir; diğer Avalanche eğitim makaleleriyle uyum sağlamak için kullanıcı adını ubuntu olarak değiştirelim. Aksi takdirde bu makalenin devamındaki bazı komutları değiştirmeniz ve ubuntu'yu yeni kullanıcı adınızla değiştirmeniz gerekir.

![Yayınlanacak görsel](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Diskler {#ed2e}

Ardından bulut sunucusunun disklerini yapılandırmak İleri: Diskler ögesini seçin. Diskler için iki seçenek var; ya aylık 10 $ ücretli daha yüksek performans sunan 64 GB Premium SSD, ya da daha düşük performans sunan aylık 5 $ ücretli standart SSD. Ayrıca Standart SSD ile her 10.000 işlem birimi \(okuma/yazma ve silme\) başına 0,002 $ ödemeniz gerekirken, Premium SSD'lerde her şey fiyata dahildir. Şahsen ben daha yüksek performans için Premium SSD'yi seçtim; ancak bunda disklerin çok yoğun olarak kullanılmasında ve uzun vadede daha bile ucuza gelebilmesinin de payı var.

İleri: Ağ Kurma ögesini seçerek ağın yapılandırmasına ilerleyin

![Yayınlanacak görsel](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### Ağ Yapılandırması {#bc5d}

Düğüme atanan genel IP'nin düğümün durması durumunda değişmemesi için Statik IP seçmeniz iyi olur. Public IP altında "Yeni oluştur" ögesini seçin

![Yayınlanacak görsel](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

Ardından Assignment \(atama\) tipi olarak "Statik" ögesini seçin

![Yayınlanacak görsel](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

Ardından Avalanche düğümüne gelen erişimleri kontrol etmek için ağ güvenlik grubunu yapılandırmamız gerekiyor. NIC ağ güvenlik grubu tipi olarak "Gelişmiş" ögesini seçin ve "Yeni oluştur" ögesini seçin

![Yayınlanacak görsel](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

Güvenliği sağlamak için düğümünüze kimin uzaktan bağlanabileceğini sınırlamanız gerekiyor. Bunu yapmak için önce mevcut genel IP'nizin ne olduğunu bulmanız gerekiyor. Bunu google'a gidip "benim ip adresim ne" yazarak yapabilirsiniz.

![Yayınlanacak görsel](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

Eviniz için özellikle aksi yönde talepte bulunmadıysanız dinamik bir genel IP atanmış olması muhtemel, öyleyse atanmış IP'niz gelecekte değişebilir. Mevcut IP'nize erişimi kısıtlamak yine de tavsiye edilir. Ev IP'nizin değiştiği ve sanal makineye uzaktan bağlanamadığınız bir durumda, ağ güvenlik kurallarını yeni genel IP'niz ile değiştirip yine bağlantı kurabilirsiniz.

NOT: Ev IP'niz değiştiyse ve kurulum sonrasında ağ güvenlik grup kurallarını değiştirmeniz gerekiyorsa, "avalanche-nsg"yi arayıp yeni IP ile SSG ve Port 9650 kurallarını değiştirebilirsiniz. **Ama Port 9651 herkese açık olmaya devam etmelidir**, çünkü düğümünüz diğer Avalanche düğümleri ile bu yolla iletişim kurar.

![Yayınlanacak görsel](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

Genel IP'nizi öğrendiğinize göre, "inbound rules" \(gelen kuralları\) altında sol tarafta bulunan "default-allow ssh" \(varsayılan-ssh'ye izin ver\) kuralını seçerek gerekli değişikliği yapın. "Source" \(kaynak\) ögesini "Any" \(herhangi bir\) değerinden "IP Addresses" \(IP adresleri\) değerine değiştirin, ardından google'dan öğrendiğiniz Genel IP adresinizi "Source IP" \(kaynak IP\) adres alanına girin. "Priority" \(öncelik\) ögesini aşağıya doğru indirerek 100'e getirin, ardından "Save" \(kaydet\) ögesini tıklayın.

![Yayınlanacak görsel](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

Ardından PRC erişimi için başka bir kural eklemek için "\+ Add an inbound rule" \(bir gelen kuralı ekle\) ögesini seçin; bu da yalnızca sizin IP'nizle sınırlı olmalıdır. "Source" \(kaynak\) ögesini "IP Addresses" olarak değiştirin ve google'dan bulduğunuz genel IP'nizi "Source IP" \(kaynak IP'si\) alanına girin. Bu sefer "Destination port ranges" \(hedef port aralıkları\) alanını 9650 olarak değiştirin ve protokol olarak "TCP" ögesini seçin. Priority \(öncelik\) değerini 110 olarak değiştirin ve buna "Avalanche\_RPC" adını verip "Add" \(ekle\) düğmesini tıklayın.

![Yayınlanacak görsel](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

Diğer düğümlerin sizin düğümünüzle iletişim kurabilmeleri için Avalanche Protokolü için son bir kural eklemek amacıyla "\+ Add an inbound rule" \(bir gelen kuralı ekle\) ögesini seçin. Bu kural herkese açık olmalıdır, bu yüzden "Source" ögesini "Any" değerine ayarlı olarak bırakın. Hedef bağlantı noktası aralığını "9651" olarak değiştirin ve protokolü "TCP" olarak değiştirin. Priority değerini 120 olarak ve Avalanche\_Protocol adını girerek Add düğmesini tıklayın.

![Yayınlanacak görsel](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

Ağ güvenlik grubu aşağıdaki gibi görünmelidir \(tabii IP adresiniz farklı olacaktır\); OK düğmesini tıklayın.

![Yayınlanacak görsel](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

Diğer ayarları varsayılan olarak bırakın ve "Review \+ create" \(gözden geçir ve yarat\) düğmesini tıklayarak Sanal Makineyi yaratın.

![Yayınlanacak görsel](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

Sanal makineniz önce bir doğrulama testi yapacaktır. Burada bir hata alırsanız, Pay-As-You-Go \(kullandıkça öde\) abonelik modelini seçtiğinizden ve Free Trial \(ücretsiz deneme\) aboneliğini kullanmadığınızdan emin olmanız gerekir, çünkü Spot sunucular için ücretsiz deneme kullanılamaz. Her şeyin doğru göründüğünü belirledikten sonra "Create" \(yarat\) düğmesini tıklayın

![Yayınlanacak görsel](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

Şimdi sanal makinenize bağlanmak için sizden yeni bir anahtar çifti üretmenizi isteyen bir mesaj alacaksınız. Özel anahtarı bilgisayarınıza indirmek için "Download private key and create resource" \(özel anahtarı indir ve kaynağı yarat\) ögesini seçin.

![Yayınlanacak görsel](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

Kurulumunuz tamamladıktan sonra, "Kaynağa git" ögesini seçin

![Yayınlanacak görsel](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Sağlanan Disk Boyutunu Değiştirme {#00dc}

Varsayılan olarak Ubuntu VM'ye 30 GB Premium SSD sağlanacaktır. Bu kapasiteyi, veri tabanındaki büyümeyi karşılamak için 250 GB'ye çıkarmanız iyi olur.

![Yayınlanacak görsel](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

Disk boyutunu değiştirmek için sanal makinenin durdurulması ve tahsis dışına çıkarılması gerekir. "Stop" \(durdur\) ögesini seçin ve status'un "deallocated" \(tahsis dışına çıkarıldı\) ibaresini göstermesini bekleyin. Sonra sol taraftaki "Disks" \(diskler\) ögesini seçin.

![Yayınlanacak görsel](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

Değişikliği yapmak için şu anda sağlanan Diskin adını seçin

![Yayınlanacak görsel](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

Settings \(ayarlar\) altında sol tarafta bulunan "Size \+ performance" \(boyut \+ performans\) ögesini seçerek boyutu 250 GB olarak değiştirip "Resize" \(yeniden boyutlandır\) düğmesini tıklayın.

![Yayınlanacak görsel](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

Bu değişikliği şimdi yapmanız ayrıca ubuntu içindeki bölüntülemeyi otomatik olarak genişletecektir. Sanal makine genel görünüm sayfasına dönmek için gezinti ayarında Avalanche'ı seçin.

![Yayınlanacak görsel](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

Ardından sanal makineyi başlatın

![Yayınlanacak görsel](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Avalanche Düğümüne Bağlanma {#8bb7}

Aşağıdaki talimatlarda bir Windows 10 bilgisayarından Sanal Makineye nasıl bağlanılacağı gösteriliyor. Bir ubuntu makinesinden bağlanma talimatları için [AWS eğitim makalesine](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) bakın.

Yerel bilgisayarınızda, C: sürücüsünün kök dizininde Avalanche adında bir klasör oluşturun ve daha önce indirdiğiniz Avalanche\_key.pem dosyasını bu klasöre taşıyın. Sonra dosyayı sağ tıklayarak Özellikler'i seçin. Güvenlik sekmesine gidin ve alttaki "Gelişmiş" ögesini seçin

![Yayınlanacak görsel](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

"Disable inheritance" \(kalıtı devre dışı bırak\) ögesini, ardından "Remove all inherited permissions from this object" \(tüm kalıt izinleri bu nesneden kaldır\) ögesini seçerek o dosyadaki mevcut tüm izinleri kaldırın.

![Yayınlanacak görsel](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

Sonra yeni bir izin eklemek için "Add" \(ekle\) ögesini seçerek üstteki "Select a principal" \(bir amir seç\) ögesini seçin. Açılan kutuya makinenize giriş yapmak için kullandığınız kullanıcı hesabınızı girin. Bu örnekte ben Seq adlı yerel bir kullanıcı ile bağlandım. sizin oturum açmak için kullandığınız bir Microsoft hesabınız olabilir, bu yüzden bilgisayarınıza giriş yapmak için kullandığınız hesap hangisiyse onu kullanın ve "Check Names" \(adları kontrol et\) düğmesini tıklayın, doğrulamak için adın altı çizili olmalıdır, sonra OK düğmesini tıklayın.

![Yayınlanacak görsel](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

Sonra izinler bölümünde sadece "Oku ve Yürüt" ve "Oku" seçili olduğuna emin olduktan sonra Tamam'a basın.

![Yayınlanacak görsel](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

Farklı bir bilgisayar/kullanıcı adı haricinde aşağıdaki gibi görünmelidir. Bu, güvenlik nedeniyle makine üzerindeki herhangi başka bir hesabın Avalanche Düğümünüze erişememesi için anahtar dosyasının değiştirilemeyeceği veya erişime açık olmayacağı anlamına gelir.

![Yayınlanacak görsel](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Avalanche Düğümü Genel IP'nizi bulun {#4687}

Azure Portal üzerinden düğümünüze atanmış olan statik genel IP adresinizi not alın.

![Yayınlanacak görsel](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Avalanche düğümüne giriş yapmak Windows 10 makinenizde "cmd" araması yaparak "Komut İstemi" seçip komut istemi ekranını açın.

![Yayınlanacak görsel](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

Sonra aşağıdaki komutu kullanın ve EnterYourAzureIpHere yerine Azure portal üzerinde gösterilen statik IP adresini yazın.


ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@EnterYourAzureIPHere

benim örneğimde bu:

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

İlk bağlantınızda devam etmenizi isteyen bir sistem mesajı alacaksınız, evet deyin.

![Yayınlanacak görsel](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

Artık düğümünüze bağlı olmalısınız.

![Yayınlanacak görsel](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

Sıradaki bölüm Colin'in [Amazon'un AWS'si üzerinde bir Avalanche Düğümü oluşturmak](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) için oluşturduğu harika eğitimden alınmıştır.

### Güvenlik yamaları ile Linux Güncelleme {#8a1c}

Artık düğümümüzde olduğumuza göre, onu en yeni paketlerle güncellemek iyi bir fikir. Bunu yapmak için aşağıdaki komutları tek tek ve sırayla çalıştırın:

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![Yayınlanacak görsel](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

Bu, sunucumuzu işletim sistemimiz için en yeni güvenlik yamalarıyla güncelleştirecek. Ayrıca düğümü yeniden başlatacaktır. Düğümün tekrar başlaması için bir iki dakika bekleyeceğiz ve öncekinde olduğu gibi tekrar giriş yapacağız.

### Avalanche Düğümünü Kurun {#5688}

Şimdi Avalanche düğümümüzü kurmamız gerekiyor. Bunu yapmak için kurulum sürecini otomatikleştiren [Avalanche Düğümünü Yükleyici ile Kurma](set-up-node-with-installer.md) eğitimine göz atın. Daha önce kurduğumuz Azure Portal'dan "IPv4 Genel IP"yi kopyalamış olmanız gerekiyor.

Kurulum tamamlandıktan sonra düğümümüz artık önyükleme yapıyor olmalı! Avalanchego düğümünün en güncel durumuna göz atmak için şu komutu çalıştırabiliriz:

```text
sudo systemctl status avalanchego
```

Önyükleme durumunu kontrol etmek için "curl" kullanarak yerel RPC'ye bir talep göndermemiz gerekiyor. Talep şu şekildedir:

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

Düğüm, önyükleme yapmak için biraz süreye ihtiyaç duyar \(bunu yazarken bir saatin biraz üstünde\). Önyükleme düğümün zincir geçmişini indirip doğruladığı anlamına gelir. Buna biraz zaman tanıyın. Düğüm önyüklemeyi tamamladıktan sonra yanıt şu olacaktır:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Ayrıca, önceden olduğu gibi hizmetimizin en güncel durumuna göz atmak için her zaman "sudo systemctl status avalanchego" kullanabiliriz.

### NodeID'nizi alın {#20a7}

Bu düğüm üzerinde herhangi bir doğrulama yapmayı planlıyorsak kesinlikle NodeID'mizi almamız gerekiyor. Bu RPC'den de alınabilir. NodeID'mizi almak için aşağıdaki curl komutunu çağırıyoruz.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Her şey yolunda giderse yanıt şuna yakın bir şey olacaktır:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR" kısmı bizim NodeID'miz, yani hepsi. Bunu kopyalayın ve not alın. Bu değerin gizlilik veya güvenlik özelliği yok; ancak bu düğümü bir doğrulayıcı olmak için submit ederken mutlaka gerekiyor.

### Staking Anahtarlarınızı Yedekleyin {#ef3e}

Yapılması gereken son şey, sunucumuzun bozulması veya sonlandırılması gibi zamansız bir olaya karşı staking anahtarlarımızı yedeklemek. Bu anahtarları saklamak genel olarak iyi bir uygulama. Onları yedeklemek için şu komutu kullanıyoruz:

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Öncekinde olduğu gibi, "EnterYourAzureIPHere" kısmını edindiğimiz uygun değer ile değiştirmemiz gerekiyor. Bunu yapmak staking anahtarımızı ve staking sertifikamızı daha önce oluşturduğumuz C:\Avalanche klasörüne yedekler.

![Yayınlanacak görsel](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

