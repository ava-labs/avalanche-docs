# Amazon Web Hizmetleri ile bir Avalanche Node çalıştır \(AWS\)

## Tanıştırma

Bu ders size [Amazon Web Hizmetleri \(AWS\)](https://aws.amazon.com/) için bir Avalanche düğümü kurma konusunda rehberlik edecek. AWS gibi bulut hizmetleri your çok güvenli, müsait ve erişilebilir olduğundan emin olmak için iyi bir yoldur.

Başlamak için ihtiyacın var:

* AWS hesabı
* AWS makinene to giden bir terminal.
* Güvenle depolanıp dosyaları destekleyecek bir yer

Bu ders yerel makinenizin Unix tarzı terminali olduğunu varsayıyor. you're buradaki bazı komutları uyarlamak zorundasınız.

## AWS & Ghost<a id="ff31"></a>

AWS için kayıt yapmak bu makalenin dışında ama Amazon'da talimatlar [var](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account).

Bunu korumak için AWS kök kullanıcı hesabınıza Çoklu Faktör Doğrulama ayarlamanızı _çok _tavsiye [eder](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root). Amazon'da bunun için belgeler var.

Hesabınız kurulduğunda, yeni bir EC2 örneği oluşturmalısınız. EC2 AWS'nin bulutunda sanal bir makine örneğidir. [AWS Yönetim Konsoluna](https://console.aws.amazon.com/) git ve EC2 işaretleme panosuna gir.

![AWS Yönetim Console.png](../../../.gitbook/assets/image%20%2835%29.png)

EC2 örneğine girmek için yerel makinenizin anahtarına ihtiyacınız olacak. Bu örnekte erişim izni sağlayan bir anahtar. İlk olarak, bu anahtarı oluştur, böylece daha sonra EC2 örneğine atanabilir. Sol taraftaki barda, **Network & **Security altında **Key Pairs. seçin.**

![& quot;Key Pairs&quot; & quot;Network & amp; Security & quot; drop-down.](../../../.gitbook/assets/image%20%2838%29.png)

Anahtar çift yaratma büyücüsünü başlatmak **için anahtar çifti **oluşturun.

![& alıntıyı Select pair.&quot;](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

Anahtarını `avalanche`söyle. Eğer yerel makineniz MacOS veya Linux varsa `pem`dosya biçimini seçin. it's `ppk`dosya biçimini kullan. Seçenekli olarak, anahtar eşleşme için etiketler ekleyebilirsiniz.

![Daha sonra EC2 örneğinize atanacak anahtar bir çift oluşturun.](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

`Create key pair`Tıklayın. Bir başarı mesajı görmelisiniz, ve anahtar dosyası yerel makinene indirilmelidir. Bu dosya olmadan EC2 örneğinize erişemeyeceksiniz.** Bu dosyanın bir kopyasını yap ve harici sabit disk gibi ayrı bir depolama ortamına koy. Bu dosyayı gizli tut; diğerleriyle paylaşmayın.**

![Bir anahtar çift oluşturduktan sonra başarı mesajı](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Bir Güvenlik Grubu oluştur<a id="f8df"></a>

AWS Güvenlik Grubu internet trafiğinin size hangi şekilde girebileceğini ve EC2 örneğini bırakabileceğini belirler. Güvenlik duvarı gibi düşün. **Ağ & Güvenlik indirimi **altındaki **Güvenlik Gruplarını seçerek yeni bir Güvenlik Grubu **oluşturun.

![& alıntı; Güvenlik Grupları & alıntı; & quot;Network & amp; &quot;Security](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Bu da Güvenlik Grupları panelini açar. **Güvenlik Grupları panelinin sağındaki güvenlik grubunu **oluştur.

![& alıntı Select grubunu oluşturun. & alıntı yapın;](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Hangi trafiğe girildiğini belirtmeniz gerekiyor. IP adresinden SSH trafiğine izin ver böylece EC2 örneğinize girebilirsiniz. \(ISP adresiniz her değiştiğinde bu kuralı değiştirmeniz gerekecek. ISP düzenli olarak değişirse, SSH trafiğinin bu kuralı sık değiştirmekten kaçınmasına izin verebilirsiniz.\) 9651 numaralı port TCP trafiğine izin verin böylece düğümünüz ağdaki diğer düğümlerle iletişim kurabilsin. from 9650 numaralı port TCP trafiğine izin verin böylece API çağrılarını your gönderebilirsiniz.** Bu limanda sadece from trafiğe izin vermen önemli.** Herhangi bir yerden gelen trafiğe izin verirseniz, bu saldırı vektörünü reddetmek için kullanılabilir. Sonunda tüm trafiğe izin verin.

![Senin iç ve dış kuralların böyle olmalı.](../../../.gitbook/assets/inbound-rules.png)

Yeni güvenlik grubuna anahtar `Name`ve değerli bir etiket ekleyin.`Avalanche Security Group` Bu güvenlik gruplarının listesindeki görüntüleri gördüğümüzde bu güvenlik grubunun ne olduğunu bilmemizi sağlayacak.

![Güvenlik grubunu daha sonra teşhis edebilmeniz için etiketle.](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

`Create security group`Tıklayın. Güvenlik gruplarının listesindeki yeni güvenlik grubunu görmelisin.

## Bir EC2 Instance Başlat<a id="0682"></a>

Şimdi EC2 örneğini başlatmaya hazırsın. EC2 Dashboard ile birlikte **fırlatma örneğini **seç.

![& &quot;Launch Instance.&quot;](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

**Ubuntu 20.04 LTS \(HVM\), SSD Ses Türünü işletim sistemi **için seçin.

![Ubuntu 20.04 LTS. seçin.](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

Sıradaki, örnek tipini seç. Bu da bulut örneğinin donanım özelliklerini tanımlar. Bu özel derslerde bir c5.büyük bir şey ****ayarladık. Avalanche hafif bir uzlaşma protokolü olduğundan bu yeterince güçlü olmalı. C5.büyük bir örnek oluşturmak için, filtre indirme menüsünden Bilgisayar **optimize **seçeneğini seçin.

![Hesapla filtrelenen bir filtreleme](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

Masadaki c5.büyük örneklerin yanında checkbox seç

![C5.büyük seçin.](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

**Sonraki **tıklayın: Temel Detayları sağ köşede yapılandırın.

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

Örnek ayrıntıları varsayılan olarak kalabilir.

### Seçenek: Nokta Kurumları veya Ayrıntılı Örnekleri Kullanılıyor<a id="c99a"></a>

Öntanımlı olarak, EC2 örneğinizi çalıştırdığınız için saat başı ücret alınacaksınız. EC2 için daha az ödeme yapabilmenin iki yolu var.

İlki EC2'yi bir **Spot Instance olarak **fırlatmak. Spot örnekleri her zaman ayakta kalacağı garantili olmayan ama sürekli olarak ortalama olarak daha az maliyetli durumlardır. Spot örnekleri pazarlama ve talep edilen fiyat yapısını kullanır. Örnek talep arttıkça, bir nokta için fiyat artacak. Bu durum için ödemeye hazır olduğunuz maksimum bir fiyat belirleyebilirsiniz. Eğer fiyat artarsa EC2 örneğinin durması için önemli miktarda para biriktirebilirsiniz. Maksimum at kesinti frekansının maliyet tasarruflarını haklı çıkarıp çıkarmadığını belirlemek için bu seçeneği seçmeden önce kendi araştırmanızı yapın. ******Eğer bir nokta örneği kullanmayı seçerseniz, kesintiyi durdurun, sonlandırma yerine ******durdurun.

Para biriktirmenin diğer yolu **Reserved **Kullanmak. Ayrıntılı bir örnekle, tüm bir EC2 kullanımına ön ödeme yaparsınız ve kilitlemek karşılığında saat başına daha düşük bir oran alırsınız. Eğer uzun bir süre bir düğüm işletirsen ve hizmet kesintilerini riske atmak istemiyorsan bu para biriktirmek için iyi bir seçenek. Bu seçeneği seçmeden önce kendi araştırmanı yap.

### Depolama Etiketleri, Güvenlik Grubu Ekle<a id="dbf5"></a>

Sonraki tuşa **bas: Ekranın sağ köşesine depolama **düğmesine tıklayın.

Örnek diskine yer eklemen gerekiyor. Bu örnekte 100 GB kullanıyoruz. Avalanche veritabanı pruning uygulanana kadar sürekli olarak büyüyecek, bu yüzden şimdilik daha büyük bir sabit disk tahsis edilmesi daha güvenli.

![Disk boyutu için 100 GB seçin.](../../../.gitbook/assets/add-storage.png)

**Sonraki **tıklayın: Etiketleri eklemek için eklemek için ekrana sağ köşe etiketleri ekleyin. Etiketler bize metadata ile ilgili bir şey sağlar. Anahtarı `Name`ve değer olan bir etiket ekleyin.`My Avalanche Node` Bu durum EC2 örneğinin listesindeki bu örneklerin ne olduğunu açıkça gösterecektir.

![Anahtar & alıntı; isim/ alıntı ile bir etiket ekleyin; ve değer &quot;My Avalanche Node.&quot;](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Şimdi daha önce yaratılan güvenlik grubunu görevlendirin. **Varolan bir güvenlik grubunu seçin **ve daha önce oluşturulan güvenlik grubunu seçin.

![Daha önce oluşturulan güvenlik grubunu seçin.](../../../.gitbook/assets/configure-security-group.png)

**Sonunda, alt tabana **tıklayın ve fırlatın. Bir gözden geçirme sayfası fırlatmak üzere olduğunuz olayın detaylarını gösterecek. Şunları gözden geçirin ve her şey iyi görünürse ekranın sağ köşesindeki mavi **fırlatma **düğmesine tıklayın.

Bu örnek için anahtar bir çift seçmeniz istenecek. **Mevcut bir anahtar çifti seçin **ve daha önce özel ders sırasında yaptığınız `avalanche`anahtar çifti seçin. Daha önce oluşturulan ya `.pem`da `.ppk`dosyaya erişimin olduğunu kabul eden kutuyu kontrol edin \(yedeklediğinizden emin olun!\) Sonra da fırlatma **fırlatma Instances. **tıklayın.

![Daha önce oluşturulan anahtar çifti kullan.](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

Bu olayın açıldığını doğrulayan yeni bir çıkış görmelisin!

![Örnek alınıyor!](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Elastik IP atla

Varsayılan olarak, örneğinizin sabit IP bulunmayacağı belirtilmiştir. AWS's Elastik IP servisinden sabit IP verelim. EC2 paneline geri dön. Ağ **& Güvenlik altında, **Elastik IPleri ****seçin.

![& &quot;Elastic IPs&quot; & quot;Network & amp; Security.&quot;](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

Elastik IP adresini **Select **seçin.

![& alıntı; Elastik IP adresini &quot;Allocate](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Örneklerinizin girdiği bölgeyi seçin ve Amazon'un IPv4 adresleri havuzunu kullanmayı seçin. Sokağa ****tıklayın.

![Elastik IP'nin ayarları.](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Elastik IP yöneticisinden oluşturduğunuz Elastik IP adresini seçin. **Eylemler **düşüşünden **Elastik IP adresini **seç.

![& &quot;Actions&quot;, Elastic IP address.&quot;.](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Az önce yarattığınız olayı seçin. Bu yeni Elastik IP ile bu örnekle ilişkilendirilecek ve değişmeyecek bir halka açık IP adresi verecek.

![Elastik IP örneğinize atayın.](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## Çığ Hazırla<a id="829e"></a>

EC2 Dashboard ile geri dön ve `Running Instances`seç.

![Koşma durumlarına git.](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Yeni oluşturulan EC2 örneğini seçin. Bu olay olay hakkında bilgi içeren bir detay paneli açar.

![Yeni your ilgili detaylar.](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

Daha sonra kullanacak `IPv4 Public IP`alanı kopyala. Bundan sonra bu değer `PUBLICIP`diyoruz.

**Unutmayın: aşağıdaki terminal komutları Linux'u yönettiğini varsayıyor. Komutlar MacOS veya diğer işletim sistemleri için farklı olabilir. Bir koddan bir komut kopyaladığında, in metin tümünü kopyalayıp yapıştır.**

Yerel makinenizden AWS örneğine gir. Bir terminal aç \(kestirme yolu `CTRL + ALT + T`dene\) ve daha önce indirdiğiniz `.pem`dosyayı içeren dizine doğru yol göster.

`.pem`Dosyayı `$HOME/.ssh`\(genellikle `.pem`dosyalar nerede yaşarsa\) ile birlikte kaydır:

```bash
mv avalanche.pem ~/.ssh
```

SSH ajanına ekle ki SSH ile EC2 örneğine girebilelim.

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

SSH örneği. `PUBLICIP`\(Daha önceki halka açık IP alanının yerini almayı unutmayın.\)

```text
ssh ubuntu@PUBLICIP
```

Eğer izinler doğru ****ayarlanmazsa, aşağıdaki hatayı göreceksiniz.

![İzinleri doğru ayarladığınızdan emin olun.](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

EC2 örneğine girdiniz.

![Siz & apos; EC2 You&apos;re](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Eğer bunu yapmamışsanız, en son işletim sistemi ve güvenlik güncellemelerinin olduğundan emin olmak için durumu güncelleyin:

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

Bu da örnekleri yeniden başlatır. 5 dakika bekle, sonra yerel makinene bu komutu çalıştırarak tekrar içeri gir.

```bash
ssh ubuntu@PUBLICIP
```

EC2 örneğine tekrar girdiniz. Şimdi Avalanche düğümümüzü kurmamız gerekecek. Bunu yapmak için, kurulum sürecini otomatik olarak ayarlayan İnstaller öğretisi [ile Set Up Avalanche](set-up-node-with-installer.md) the takip edin. `PUBLICIP`Daha önce hazırladığımız şeye ihtiyacın olacak.

AvalancheGo düğümünüz şu anda çalışıyor olmalı ve bir kaç saat sürebilir. Yapıldı mı diye kontrol etmek için API araması `curl`yapabilirsiniz. Eğer EC2 örneğinden istek yapıyorsanız, istek şu:

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

Düğüm bot kayışı bittiğinde, cevap şöyle olacak:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

AvalancheGo kayma işini yapmamış olsa bile devam edebilirsin.

Düğününü onaylayıcı yapmak için node kimliğine ihtiyacın olacak. Alabilmek için, koş.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Cevap düğümlü kimlik içerir.

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

Örnek olarak düğümlü kimlik örnekleri `NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`vardır. Sonrası için düğümlü kimliğinizi kopyalayın. Kimliğin bir sır değil, bu yüzden onu bir metin editörüne yapıştırabilirsin.

[AvalancheGo sağlığa açık API](../../avalanchego-apis/health-api.md) gibi diğer API'leri vardır, düğümle etkileşimde kullanılabilir. Bazı API'ler varsayılan olarak devre dışı bırakılır. Bu tür API'leri etkinleştirmek için, bu uç noktalarını sağlayan bayrakları içeren \(kurulum süreci sırasında `/etc/systemd/system/avalanchego.service`oluşturulur\) ExecStart bölümünün düzenlemesini düzenle. Bir sebebin yoksa API'leri elle etkinleştirme.

![Bazı API'ler varsayılan olarak devre dışı bırakılır.](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

EC2 örneğinin bozulması veya başka bir şekilde kullanılamaz olması durumunda düğümün anahtar ve sertifikasını geri çek. Düğünün kimliği gizlenme anahtarı ve sertifikasından türetilmiştir. Eğer anahtar ya da sertifikanızı kaybederseniz düğümünüz yeni bir düğümlü kimlik alır, bu da düğümünüz bir doğrulayıcı ise, bir ödül için uygun olmayabilirsiniz.** Düğününüzün anahtar ve sertifikasını kopyalamanız çok şiddetle tavsiye **edilir. İlk düğümünü çalıştırdığınızda, yeni bir anahtar / sertifika çifti oluşturacak ve dizine `/home/ubuntu/.avalanchego/staking`koyacak.

SSH örneğinden çık:

```bash
exit
```

Artık EC2 ile bağlantın yok, yerel makinene geri döndün.

İzleme anahtarı ve sertifikayı makinene kopyalamak için şu komutu çalıştır. Her zamanki gibi yenisini `PUBLICIP`al.

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

Şimdi de anahtar ve sertifikan `~/aws_avalanche_backup`dizinde.** Bu dizinin içeriği gizlidir.** Bu dizini internete bağlı olmayan depolama üzerinde tutmalısınız. \(harici bir sabit disk gibi\)

### Düğününü Güncelleştiriyor<a id="9ac7"></a>

AvalancheGo devam eden bir proje ve düzenli sürüm güncellemeleri var. Çoğu güncelleme tavsiye edilir ama gerekli değildir. Geri uyumlu olmayan güncelleme için öncü bildiri verilecek. Son sürümüne your güncellemek için SSH AWS örneğinize önceki gibi ve installer senaryosunu tekrar çalıştırın.

```text
./avalanchego-installer.sh
```

Makinen şimdi en yeni AvalancheGo versiyonunu çalıştırıyor. AvalancheGo servisinin durumunu görmek için, koş`sudo systemctl status avalanchego.`

## Toparlanın

İşte böyle! AWS EC2 örneğinde çalışan bir AvalancheGo düğümünüz var. AvalancheGo your [takibe](setting-up-node-monitoring.md) almanızı öneriyoruz. Ayrıca AWS fatura uyarısı ayarlamasını öneriyoruz. Böylece fatura geldiğinde şaşırmazsın. Bu özel ders hakkında bir bilgi varsa, [on](https://chat.avalabs.org) bir mesaj gönder.

