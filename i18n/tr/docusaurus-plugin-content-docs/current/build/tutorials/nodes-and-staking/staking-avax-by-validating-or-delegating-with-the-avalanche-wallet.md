# Avalanche Cüzdan ile Doğrulama veya Yetkilendirme Yaparak AVAX Stake Etme

## **Giriş** {#001f}

Avalanche Cüzdan, herhangi bir ara katman yazılımı veya herhangi bir sunucu iletişimi olmayan web tabanlı bir aplikasyondur. Avalanche Cüzdan Vue JS'de yazılmıştır ve çevrimiçi erişilebilir veya yerel olarak derlenip çalıştırılabilir.

Avalanche Cüzdan'a [buradan](https://wallet.avax.network/) ulaşabilirsiniz.   Avalanche Cüzdan'in kaynak kodunu [burada](https://github.com/ava-labs/avalanche-wallet) bulunabilirsiniz.

**Şimdi stake edelim!**

### **1. Adım — Avalanche Cüzdan'ı Açın** {#552d}

![Yayınlanacak görsel](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

Cüzdanınıza key phrase'inizi \(anahtar söz öbeği\), keystore dosyasını veya Ledger Nano S'i \(yakında geliyor!\) kullanarak giriş yapabilirsiniz

### **2. Adım — "Earn" \(Kazan\) bölümüne gidin** {#dc5a}

![Yayınlanacak görsel](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**Stake etmek için**[**Platform Zincirinde \(P-Chain\)**](../../../learn/platform-overview/README.md#platform-chain-p-chain) fonlarınızın bulunması gerekir**! Fonlarınız** [**Exchange Zincirinde \(X-Chain\)**](../../../learn/platform-overview/README.md#exchange-chain-x-chain)**ise, bu fonları zincirler arası transfer başlatarak P-Chain'e aktarmamız gerekecektir. Tokenlarınız kilitli ise bunlar zaten P-Chain'dedir, dolayısıyla X-Chain'den P-Chain'e Zincirler Arası Transfer yapmanıza gerek yoktur.**

![Yayınlanan görsel](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

P-Chain'inize aktarmak istediğiniz miktarı girin ve aşağıdaki "Aktar" butonuna tıklayarak transferi tamamlayın.

![Yayınlanan görsel](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Bu kadar!

![Yayınlanan görsel](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Şimdi P-Chain'de stake etmeye hazır fonlarımız mevcut. Bir sonraki adımda cüzdanınıza bir doğrulayıcı \(validator\) veya bir yetkilendirici \(delegator\) ekleyebilirsiniz.

### **Adım 3A: Bir doğrulayıcı olun!** {#60f0}

Bir doğrulayıcı eklemek için çalışır bir düğüme ihtiyacımız var. Önceden oluşturulmuş [binary'leri](https://github.com/ava-labs/avalanchego/releases/) kullanarak ya da bunları [AvalancheGo kaynak kodu](https://github.com/ava-labs/avalanchego)'ndan yazarak bir doğrulayıcı kurabiliriz.

Binary'leri kullanmak kolay ve pratiktir, 4 adımda sizi bir doğrulayıcı olarak kurar:

* [Burada](https://github.com/ava-labs/avalanchego/releases) bulunan en son sürüm tar.gz \(osx ve windows için sıkıştırılmış\) dosyasını indirin
* Seçtiğimiz bir klasöre açın:

\* Linux: tar -xvf avalanchego-linux-<VERSION>.tar.gz

\* OSX: unzip avalanchego-macos-<VERSION>.zip

\* Windows: unzip avalanchego-win-<VERSION>.zip

* Binary'ler dizini cd avalanchego-<VERSION>'a gidin
* Binary'yi Linux ve OSX'da ./avalanchego ile, Windows'da AvalancheGo ile çalıştırın

Düğümümüzün önyüklemesini ve ağın geri kalanıyla senkronize olmasını bekleyeceğiz; bu iş bittikten sonra başlamaya hazırız.

Düğüm Kimliğimize \(Node ID\) ihtiyacımız olacak. Bu kimliği [info API](../../avalanchego-apis/info-api.md)'yi kullanarak bulalım!

Düğümünüzü kurarken herhangi bir konuda yardıma ihtiyacınız olursa [Discord](https://chat.avax.network/)'da bize katılın.

![Yayınlanan görsel](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

Alanları doldurup onaylayın!

![Yayınlanan görsel](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Bilgileri dikkatlice kontrol edip "Onayla" düğmesini tekrar tıklayın!

![Yayınlanan görsel](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Tebrikler. Şu an itibariyle Avalanche Birincil Ağ'ında \(Primary Network\) doğrulayıcı oldunuz!

### **Adım 3B: Bir Yetkilendirici \(Delegator\) ekleyin!** {#59bd}

![Yayınlanacak görsel](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Etkin ağ doğrulayıcıları listesinden tokenlarınız için yetkilendirmek istediğiniz bir doğrulayıcı seçin.

![Yayınlanan görsel](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Stake etme döneminizi ve stake miktarınızı belirleyin. Seçilen doğrulayıcının sona erme zamanına dikkat edin. Yetkilendirme döneminiz, doğrulayıcının belirlediği sona erme zamanı geçtikten sonra sona erecek şekilde ayarlanamaz.

![Yayınlanan görsel](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Bilgileri onaylayın!

![Yayınlanan görsel](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Tebrikler. Şu an itibarıyla Avalanche Birincil Ağ'ında \(Primary Network\) yetkilendirici \(delegator\) oldunuz!

