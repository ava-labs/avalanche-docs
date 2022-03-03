# Amazon Web Services \(AWS\) ile bir Avalanche Düğümünün Çalıştırılması

## Giriş

Bu eğitim makalesinde [Amazon Web Services \(AWS\)](https://aws.amazon.com/) üzerinde bir Avalanche düğümünün nasıl kurulacağı açıklanmaktadır. AWS gibi bulut hizmetleri, düğümünüzün yüksek derecede güvenli, kullanılabilir ve erişilebilir olmasını sağlamanın iyi bir yoludur.

Başlamak için şunlara ihtiyacınız var:

* Bir AWS hesabı
* AWS makinenize SSH \(güvenli kabuk\) yoluyla bağlanacak bir terminal
* Dosyaların güvenli bir şekilde saklanacağı ve yedekleneceği bir yer

Bu eğitim makalesinde yerel makinenizin Unix tarzı bir terminali olduğu varsayılır. Windows kullanıyorsanız burada kullanılan komutlardan bazılarını uyarlamanız gerekecektir.

## AWS'ye Giriş Yapın {#ff31}

AWS'ye kaydolmak bu makalenin kapsamı dışındadır ama Amazon'un talimatlarına [buradan](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account) ulaşabilirsiniz.

AWS kök kullanıcı hesabınızı korumak için Çok Faktörlü Kimlik Doğrulaması \(Multi-Factor Authentication\) kurulumu yapmanız _önemle_ tavsiye edilir. Amazon'un bu konudaki dokümantasyonuna  [buradan](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root) ulaşabilirsiniz.

Hesabınızı oluşturduktan sonra yeni bir EC2 bulut sunucusu yaratmanız gerekir. EC2, AWS bulutunda bulunan bir sanal makine sunucusudur. [AWS Yönetim Konsolu](https://console.aws.amazon.com/)'na giderek EC2 gösterge paneline girin.

![AWS Management Console.png](/img/image(35).png)

EC2 bulut sunucusuna giriş yapmak için yerel makinenizde bulut sunucusuna giriş izni veren bir anahtara ihtiyacınız olacaktır. Daha sonra EC2 bulut sunucusuna atanabilmesi için önce bu anahtarı yaratın. Sol taraftaki çubuk üzerinde bulunan **Network & Security** \(Ağ ve Güvenlik\) ögesi altındaki **Key Pairs** \(Anahtar Çiftleri\) ögesini seçin.

!["Network & Security" açılır menüsü altındaki "Key Pairs" ögesini seçin.](/img/image(38).png)

Anahtar çifti yaratma sihirbazını başlatmak için **Create key pair** \(Anahtar çifti yarat\) ögesini seçin.

!["Create key pair" ögesini seçin.](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

Anahtarınıza `avalanche` adını verin. Yerel makinenizde MacOS veya Linux işletim sistemi varsa, `pem` dosya biçimini seçin. Windows ise `ppk` dosya biçimini kullanın. İsteğe bağlı olarak, takibe yardımcı olmak için anahtar çiftine etiketler ekleyebilirsiniz.

Daha sonra ![EC2 bulut sunucunuza atanacak bir anahtar çifti yaratın.](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

`Create key pair` ögesini tıklayın. İşlemin başarılı olduğunu belirten bir mesaj almanız ve anahtar dosyasının yerel makinenize indirilmesi gerekir. Bu dosya olmadan EC2 bulut sunucunuza giriş yapamazsınız. **Bu dosyanın bir kopyasını oluşturarak harici sabit disk gibi ayrı bir depolama ortamına yerleştirin. Bu dosyayı gizli tutun ve başkalarıyla paylaşmayın.**

![Anahtar çifti yaratıldıktan sonra gelen işlem başarılı mesajı.](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Bir Güvenlik Grubu Yaratın {#f8df}

Bir AWS Güvenlik Grubu, EC2 bulut sunucunuza hangi internet trafiğinin giriş ve çıkış yapabileceğini tanımlar. Bunu bir güvenlik duvarı gibi düşünebilirsiniz. **Network & Security** açılır menüsü altındaki **Security Groups** \(Güvenlik Grupları\) ögesini seçerek yeni bir Güvenlik Grubu yaratın.

!["Network & Security" altındaki "Security Groups" ögesini seçin.](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Güvenlik Grupları paneli açılacaktır. Security Groups panelinin üst sağ tarafındaki **Create security group** seçeneğini tıklayın.

!["Create security group" ögesini seçin.](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Hangi gelen trafiğe izin verildiğini belirlemeniz gerekecek. EC2 bulut sunucunuza giriş yapabilmeniz için IP adresinizden SSH trafiğine izin verin. \(İnternet hizmet sağlayıcınız IP adresinizi her değiştirdiğinde sizin bu kuralı değiştirmeniz gerekecek. İnternet hizmet sağlayıcınız düzenli olarak değiştiriyorsa, bu kuralı sık sık değiştirmek zorunda kalmamak için herhangi bir yerden SSH trafiğine izin verebilirsiniz.\) Düğümünüzün ağdaki diğer düğümlerle iletişim kurabilmesi için 9651 bağlantı noktası üzerinden TCP trafiğine izin verin. Düğümünüze API çağrıları yapabilmeniz için IP'nizden 9650 bağlantı noktasında TCP trafiğine izin verin. **Bu bağlantı noktasında yalnızca sizin IP'nizden gelen trafiğe izin vermeniz önemlidir.** Herhangi bir yerden gelen trafiğe izin verirseniz, bu, hizmet aksatma saldırısı vektörü olarak kullanılabilir. Son olarak tüm çıkış trafiğine izin verin.

![Gelen ve giden kurallarınız böyle görünmeli.](/img/inbound-rules.png)

Yeni güvenlik grubuna `Name` anahtarı ve `Avalanche Security Group` değeri ile bir etiket ekleyin. Bu, güvenlik grupları listesinde bu güvenlik grubunu gördüğümüzde bu güvenlik grubunun ne olduğunu bilmemizi sağlayacaktır.

![Daha sonra tanıyabilmeniz için bu güvenlik grubunu etiketleyin.](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

`Create security group` ögesini tıklayın. Bu yeni güvenlik grubunu güvenlik grupları listesinde görüyor olmanız gerekir.

## Bir EC2 Sunucusu Oturumu Başlatın {#0682}

Şimdi bir EC2 bulut sunucusu başlatmaya hazırsınız. EC2 Gösterge Paneline gidin ve **Launch instance** \(Sunucuyu başlat\) ögesini seçin.

!["Launch Instance" ögesini seçin.](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

İşletim sistemi olarak **Ubuntu 20.04 LTS \(HVM\), SSD Volume Type** ögesini seçin.

![Ubuntu 20.04 LTS ögesini seçin.](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

Sonra bulut sunucusu türünü seçin. Bu, bulut sunucusunun donanım özelliklerini belirler. Bu eğitim makalesinde bir **c5.2xlarge** kuracağız. Avalanche hafif bir konsensüs protokolü olduğu için bu kurulumun yeterince güçlü olması beklenir. Bir c5.2xlarge sunucusu yaratmak için filtre açılır menüsünden **Compute-optimized** \(İşlem için optimize edilmiş\) ögesini seçin.

![İşlem için optimize edilmiş ögesiyle filtreleyin.](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

Tablodaki c5.2xlarge bulut sunucusunun yanındaki seçim kutucuğunu işaretleyin.

![c5.2xlarge ögesini seçin.](/img/c5-2xlarge.png)

Sağ alt köşedeki **Next: Configure Instance Details** \(İleri: Sunucu Ayrıntılarını Yapılandır\) düğmesini tıklayın.

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

Sunucu ayrıntıları varsayılan olarak kalabilir.

### İsteğe Bağlı: Spot Sunucuları veya Rezerve Edilmiş Sunucuları Kullanma {#c99a}

Varsayılan seçenekte, EC2 bulut sunucunuzun işletilmesi için saatlik ücret uygulanır. EC2 için daha az ücret ödemenizin iki yolu vardır.

Birinci yol, EC2 sunucunuzu bir **Spot Instance** \(Spot Sunucu\) olarak başlatmaktır. Spot sunucular, her zaman çalışır olacağı garanti edilmeyen ama sürekli çalışır olan sunuculardan daha düşük maliyetli sunuculardır. Spot sunucular arz ve talebe bağlı bir fiyat mekanizmasına göre hizmet verir. Bulut sunucularına olan talep arttıkça, spot sunucunun fiyatı yükselir. Spot sunucu için ödemeye hazır olduğunuz en yüksek fiyatı belirleyebilirsiniz. Bu yolla önemli miktarda para tasarruf edebilirsiniz ama fiyatların yükselmesi halinde EC2 sunucunuzun çalışmayabileceği aklınızda bulunsun. Bu seçeneği seçmeden önce kendi araştırmanızı yaparak belirlediğiniz en yüksek fiyata karşılık gelen servis kesintisi sıklığının maliyet tasarrufuna değip değmeyeceğini saptamanız gerekir. Bir spot sunucu kullanmayı seçerseniz, kesinti davranışını **Terminate** \(Sonlandır\) olarak değil, **Stop** \(Durdur\) olarak seçin ve **Persistent Request** \(Israrlı İstek\) seçeneğini işaretleyin.

Paradan tasarruf etmenizin diğer yolu, **Reserved Instance** \(Rezerve Edilmiş Sunucu\) kullanmaktır. Rezerve edilmiş bir sunucu kullanmayı seçtiğinizde, EC2 sunucusunun bir tam yıllık kullanımı için bir ön ödeme yaparsınız ve bu rezervasyon karşılığında daha düşük bir saatlik ücretten yararlanırsınız. Niyetiniz bir düğümü uzun süre çalıştırmaksa ve servis kesintileri riskini göze almak istemiyorsanız bu seçenek maliyetten tasarruf etmek için iyi bir seçenektir. Tekrar söyleyelim, bu seçeneği seçmeden önce kendi araştırmanızı yapın.

### Depolama Alanı, Etiketler, Güvenlik Grubu Ekleyin {#dbf5}

Ekranın sağ alt köşesindeki **Next: Add Storage** \(İleri: Depolama Alanı Ekle\) düğmesini tıklayın.

Sunucunuzun diskine boş alan eklemeniz gerekir. Bu örnekte 100 GB kullanıyoruz. Avalanche veri tabanı budama işlemi yapılana kadar sürekli büyüyecektir, bu nedenle şimdiden daha büyük bir sabit sürücü tahsisi yapmak daha güvenlidir.

![Disk boyutu olarak 100 GB'yi seçin.](/img/add-storage.png)

Ekranın sağ alt köşesindeki **Next: Add Tags** \(İleri: Etiketler Ekle\) seçeneğini tıklayarak sunucuya etiketler ekleyin. Etiketler, metaveriyi sunucumuzla ilişkilendirmemizi sağlar. `Name` \(Ad\) anahtarı ve `My Avalanche Node` \(Avalanche Düğümüm\) değeri ile bir etiket ekleyin. Bu, bu sunucunun EC2 sunucuları listenizde olduğunu gösterecektir.

![Anahtarı "Ad" ve değeri "Avalanche Düğümüm" olan bir etiket ekleyin.](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Şimdi daha önce yaratılmış olan güvenlik grubunu bu sunucuya atayın. **Select an existing security group** \(Mevcut bir güvenlik grubu seç\) ögesini seçerek önceden yaratılmış olan güvenlik grubunu seçin.

![Daha önce yaratılmış olan güvenlik grubunu seçin.](/img/configure-security-group.png)

Son olarak, sağ alttaki **Review and Launch** \(Gözden Geçir ve Başlat\) ögesini tıklayın. Başlatmak üzere olduğunuz sunucunun bilgilerini gösteren bir gözden geçirme sayfası açılacaktır. Bu bilgileri gözden geçirin; her şey iyi görünüyorsa ekranın alt sağ tarafındaki mavi renkli **Launch** \(Başlat\) düğmesini tıklayın.

Sizden bu sunucu için bir anahtar çifti seçmeniz istenecektir. **Choose an existing key pair** \(Mevcut bir anahtar çiftini seç\) ögesini seçin, ardından bu eğitim makalesinde daha önce yarattığınız `avalanche` anahtar çiftini seçin. Daha önce yaratılmış `.pem` veya `.ppk` dosyasına erişiminiz olduğunu onaylayan kutuyu işaretleyin \(dosyayı yedeklediğinizden emin olun!\) ve ardından **Launch Instances** \(Sunucuları Başlat\) seçeneğini tıklayın.

![Daha önce yaratılmış olan anahtar çiftini kullanın.](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

Sunucunun başlatıldığını doğrulayan bir açılır pencere görmeniz gerekir!

![Sunucunuz başlatılıyor!](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Bir Elastik IP Atanması

Varsayılan olarak, sunucunuz sabit bir IP'ye sahip olmayacaktır. Sunucunuza AWS'nin Elastik IP hizmeti yoluyla sabit bir IP atayalım. EC2 gösterge paneline dönün. **Network & Security** ögesi altında **Elastic IPs** \(Elastik IP'ler\) ögesini seçin.

!["Network & Security" altındaki "Elastic IPs" ögesini seçin.](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

**Allocate Elastic IP address** \(Elastik IP adresi tahsis et\) ögesini seçin.

!["Allocate Elastic IP address"
 ögesini seçin.](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Sunucunuzun çalıştığı bölgeyi seçin ve Amazon'un IPv4 adresleri havuzunu kullanmayı seçin. **Allocate** \(Tahsis Et\) ögesini tıklayın.

![Elastik IP Ayarları.](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Az önce Elastik IP yöneticisinden yarattığınız Elastik IP'yi seçin. **Actions** \(Eylemler\) açılır menüsünden **Associate Elastic IP address** \(Elastik IP adresini ilişkilendir\) ögesini seçin.

!["Actions" menüsünden "Associate Elastic IP address" ögesini seçin.](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Az önce yarattığınız sunucuyu seçin. Bu işlem, yeni Elastik IP'yi sunucuyla ilişkilendirecek ve sunucuya değişmeyecek bir genel IP adresi verecektir.

![Elastik IP'yi EC2 bulut sunucunuza atayın.](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## AvalancheGo'yu Kurun {#829e}

EC2 Gösterge Paneline dönün ve `Running Instances` \(çalışan sunucular\) ögesini seçin.

![Çalışan sunucularınıza gidin.](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Yeni yaratılan EC2 bulut sunucusunu seçin. Bunu yaptığınızda, sunucu hakkında bilgiler içeren bir bilgi paneli açılır.

![Yeni sunucunuz hakkında bilgiler.](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

Daha sonra kullanmak üzere `IPv4 Public IP` alanını kopyalayın. Bundan sonra bu değere `PUBLICIP` adını vereceğiz.

**Unutmayın: Aşağıdaki terminal komutları sizin Linux çalıştırdığınızı varsayar. Komutlar MacOS veya diğer işletim sistemlerinde farklı olabilir. Bir kod blokundan bir komutu kopyala-yapıştır yaparken, bloktaki metnin tamamını kopyalayıp yapıştırın.**

Yerel makinenizden AWS bulut sunucusuna giriş yapın. Bir terminal açın \(`CTRL + ALT + T` kısayolunu deneyin\) ve önceden indirdiğiniz `.pem` dosyasını içeren dizine gidin.

`.pem`dosyasını şununla `$HOME/.ssh` konumuna \(genellikle `.pem` dosyalarının bulunduğu yer\) taşıyın:

```bash
mv avalanche.pem ~/.ssh
```

Dosyayı EC2 bulut sunucunuza SSH \(uzaktan güvenli giriş\) yapmakta kullanabilmek için dosyayı SSH agent programına ekleyin ve salt okunur olarak işaretleyin.

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

Sunucuya SSH yoluyla bağlanın. \(`PUBLICIP` alanını daha önce alınan genel IP alanı ile değiştirmeyi unutmayın.\)

```text
ssh ubuntu@PUBLICIP
```

İzinler doğru **ayarlanmadıysa**, şu hata mesajını göreceksiniz.

![İzinleri doğru ayarladığınızdan emin olun.](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

Şimdi EC2 sunucusuna giriş yaptınız.

![EC2 sunucusundasınız.](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Henüz yapmadıysanız, sunucunun en son işletim sistemine ve güvenlik güncellemelerine sahip olduğundan emin olmak için sunucuyu güncelleyin:

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

Bunu yaptığınızda sunucu yeniden yüklenir. 5 dakika bekleyin, ardından yerel makinenizde şu komutu çalıştırarak tekrar giriş yapın:

```bash
ssh ubuntu@PUBLICIP
```

EC2 sunucusuna tekrar giriş yaptınız. Şimdi Avalanche düğümümüzü kurmamız gerekiyor. Bunu yapmak için, kurulum sürecini otomatikleştiren [Avalanche Düğümünü Installer İle Kurma](set-up-node-with-installer.md) eğitimini takip edin. Daha önce kurduğumuz `PUBLICIP` değerine ihtiyacınız olacak.

AvalancheGo düğümünüz şu anda çalışıyor ve önyükleme yapıyor olmalı; bu işlem birkaç saat alabilir. İşlemin bitip bitmediğini kontrol etmek için `curl` kullanarak bir API çağrısı yapabilirsiniz. Bu isteği EC2 sunucusundan yapıyorsanız, istek şudur:

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

Düğüm önyüklemeyi tamamladıktan sonra yanıt şu olacaktır:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

AvalancheGo önyüklemeyi bitirmemiş olsa bile devam edebilirsiniz.

Düğümünüzü bir doğrulayıcı yapmak için bunun düğüm kimliğine ihtiyacınız olacak. Kimliği almak için şunu çalıştırın:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Yanıt düğüm kimliğini içerir.

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

Yukarıdaki örnekte düğüm kimliği `NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`'dir. Düğüm kimliğinizi daha sonra kullanmak üzere kopyalayın. Düğüm kimliğiniz gizli değildir, bu yüzden bunu bir metin editörüne yapıştırabilirsiniz.

AvalancheGo'nun düğümle etkileşimde bulunmak için kullanılabilecek  [Health API](../../avalanchego-apis/health-api.md) gibi diğer API'leri vardır. Bazı API'ler varsayılan olarak devre dışıdır. Bu API'leri etkinleştirmek için, bu son noktaları etkinleştiren bayraklar dahil etmek için \(kurulum işlemi sırasında oluşturulmuş olan\) `/etc/systemd/system/avalanchego.service` komutunun ExecStart bölümünü değiştirin. Bunu yapmak için bir nedeniniz olmadıkça herhangi bir API'yi manuel olarak etkinleştirmeyin.

![Bazı API'ler varsayılan olarak devre dışıdır.](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

EC2 sunucusunun bozulması veya başka bir nedenle kullanılamaz olması durumuna karşı bir önlem olarak düğümün staking anahtarını ve sertifikasını yedekleyin. Düğümün kimliği, düğümün staking anahtarından ve sertifikasından türetilir. Staking anahtarınızı veya sertifikanızı kaybederseniz, o zaman düğümünüz yeni bir düğüm kimliği alacaktır, ki bu da düğümünüz bir doğrulayıcı ise bir staking ödülü için uygun bulunmamanıza sebep olabilir. **Düğümünüzün staking anahtarını ve sertifikasını kopyalamanız şiddetle tavsiye edilir**. Bir düğümü ilk çalıştırdığınızda o düğüm yeni bir staking anahtarı/sertifika çifti üretecek ve bunları `/home/ubuntu/.avalanchego/staking` dizininde saklayacaktır.

SSH sunucusundan çıkmak için şunu çalıştırın:

```bash
exit
```

Artık EC2 bulut sunucusuna bağlı değilsiniz; yerel makinenize dönmüş bulunuyorsunuz.

Staking anahtarını ve sertifikayı makinenize kopyalamak için aşağıdaki komutu çalıştırın. Her zamanki gibi `PUBLICIP`'i yerine koyun.

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

Artık staking anahtarınız ve sertifikanız `~/aws_avalanche_backup` dizinindedir. **Bu dizinin içeriği gizlidir.** Bu dizini \(harici bir disk sürücüsü gibi\) internete bağlı olmayan bir depolama aygıtında tutmalısınız.

### Düğümünüzü Yükseltme {#9ac7}

AvalancheGo devam eden bir proje ve düzenli olarak sürüm yükseltmeleri yapılıyor. Çoğu yükseltmeler tavsiye edilir ancak zorunlu değildir. Geriye dönük uyumlu olmayan yükseltmeler için önceden bildirim yapılacaktır. Düğümünüzü en son sürüme güncellemek için AWS bulut sunucunuza SSH girişi yapın ve installer script'ini tekrar çalıştırın.

```text
./avalanchego-installer.sh
```

Makineniz şimdi en son AvalancheGo sürümünü çalıştırıyor. AvalancheGo hizmetinin durumunu görmek için `sudo systemctl status avalanchego.` komutunu çalıştırın

## Özet

Bu kadar! Şimdi bir AWS EC2 bulut sunucusunda çalışan bir AvalancheGo düğümünüz var. AvalancheGo düğümünüz için [düğüm izleme](setting-up-node-monitoring.md) aracını kurmanızı tavsiye ederiz. Fatura geldiğinde zor durumda kalmamak için AWS fatura alarmlarını kurmanızı da tavsiye ederiz. Bu eğitim makalesi hakkında ya da başka bir konuda geri bildirim vermek isterseniz bize [Discord](https://chat.avalabs.org) üzerinden bir mesaj gönderin.

