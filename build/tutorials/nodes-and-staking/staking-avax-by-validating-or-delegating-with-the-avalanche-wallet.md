# Avalanche Cüzdan ile onaylanarak veya Delegation ile Stake AVAX,

## **Tanıştırma**<a id="001f"></a>

Avalanche Cüzdanı, bir aracı, herhangi bir sunucu iletişimi olmayan web tabanlı bir uygulamadır. Avalanche Cüzdanı Vue JS ile yazılır ve ya çevrimiçi olarak erişilebilir, derlenebilir ve yerel olarak çalıştırılabilir.

Avalanche Cüzdan [buraya](https://wallet.avax.network/) erişilebilir.   Avalanche Cüzdan kaynak kodu [burada](https://github.com/ava-labs/avalanche-wallet) bulunabilir.

**Hadi kazığa çıkalım!**

### **Adım 1 - Çığ Cüzdanını Aç**<a id="552d"></a>

![Posta için resim](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

Anahtarlık cümlelerinizi kullanarak, anahtar dosyalarınızı ya da Ledger Nano S \(yakında geliyor\) kullanarak cüzdanınıza erişebilirsiniz.

### **Adım 2 - "Kazan" bölümüne Yönlendirme**<a id="dc5a"></a>

![Posta için resim](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**Para kazanmak için **[**Platform Zincirine \(P-Chain\)**](../../../learn/platform-overview/#platform-chain-p-chain) ulaşmanız **gerekiyor! Eğer paranız **[**Exchange Zincirine \(X-Chain\)**](../../../learn/platform-overview/#exchange-chain-x-chain) aitse, onları zincir zinciri transferi başlatarak **\(X-Chain\), nakletmemiz gerekecek. Eğer işaretleriniz kilitliyse zaten on P-Chain, P-Chain, Cross Chain Transfer'i gerçekleştirmenize gerek yok.**

![Posta için resim](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

to transfer etmek istediğiniz miktarı girin. Ve transferi aşağıdaki "Transfer" düğmesine tıklayarak tamamlayın.

![Posta için resim](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Voila!

![Posta için resim](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Şimdi, on gözetlemek için paramızı hazırladık. Sonra cüzdanına bir onaylayıcı ya da bir delege ekleyebilirsin.

### **3A: Geçerli bir kişi ol!**<a id="60f0"></a>

Bir onaylayıcı ekleyebilmek için bir node olmalı. Serbest bırakılan [ikilileri](https://github.com/ava-labs/avalanchego/releases/) kullanarak bir tane kurabiliriz ya da [AvalancheGo kaynak](https://github.com/ava-labs/avalanchego) kodundan inşa edebiliriz.

İkili harfleri kullanmak kolay ve uygun ve seni 4 adımdan bir doğrulama için ayarlar:

* [Burada](https://github.com/ava-labs/avalanchego/releases) bulunan en son sürüm tar.gz \(osx ve pencereler için fermuar\) indirin
* Seçtiğimiz bir klasöre yerleş:

\* Linux: tar - xvf avalanchego-linux-<VERSION>.tar.gz

\* OSX: unzip avalanchego-macos-<VERSION>.zip

\* Pencereler: unzip avalanchego-win-<VERSION>.zip

* İkili dizin cd avalanchego-<VERSION>
* Linux ve OSX ve Avalanchego üzerinde ./avalanchego ile çalıştır

Düğüm çizme bağımızı ve diğerleriyle aynı ağa koyacağız. Ve gitmeye hazırız.

Node kimliğimize ihtiyacımız olacak. [Bunu API](../../avalanchego-apis/info-api.md) kullanarak bulalım!

Düğününü hazırlamak için yardıma ihtiyacın olursa [on](https://chat.avax.network/) bize katıl.

![Posta için resim](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

Tarlaları doldurun ve doğrulayın!

![Posta için resim](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Ayrıntıları dikkatlice kontrol et ve "Doğrulan" tuşuna bas.

![Posta için resim](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Tebrikler. Tebrikler. Avalanche Ana Ağı'nı onaylıyorsun!

### **Adım 3B: Bir a ekle!**<a id="59bd"></a>

![Posta için resim](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Etkin ağ validators. listesinden işaretlerinizi delege etmek istediğiniz bir doğrulayıcı seçin.

![Posta için resim](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Dikiz süresi ve kazık miktarını belirtin. Seçilen the sonuna dikkat edin. Delege dönemi the belirlediği son tarihten geçmeye karar veremez.

![Posta için resim](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Detayları doğrula!

![Posta için resim](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Tebrikler. Tebrikler. Şimdi Avalanche Ana Ağı'nı görevlendiriyorsun!

