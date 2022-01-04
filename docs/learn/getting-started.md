---
sidebar\_position: 1
---

# Başlarken

Bu eğitimin amacı, Avalanche hakkında genel bir bakış sunmak ve Avalanche ekosistemiyle yeni tanışan kullanıcılar için bir başlangıç noktası olarak hizmet vermektir. Kripto para hakkında bilgi sahibi olunduğu, özellikle de Ethereum ekosistemi ile aşina olunduğu varsayılır. Bir konuyu ilk bakışta anlamadıysanız bu çok normal. Cevabı çevrimiçi olarak arayın, bulamazsınız [Discord](https://chat.avax.network) üzerinde bize sorun.

Herkesin yaşadığı güçlüklerden ve yeni kullanıcıların karşılaştığı sorunlardan kaçınmanız için, Avalanche'ı kullanmaya başlamadan önce bu dokümanı tümüyle okumanızı öneriyoruz. Avalanche'ın pek çok özelliği var, bu yüzden kendinizi kafa karışıklığından korumak için büyük resmi görmek en iyisi. Ayrıca bu rehber, sahtekarlar tarafından dolandırılmamanız için faydalı ipuçları ve uyarılar içerir.

Avalanche'ın genel bir görünümünü [burada](https://support.avax.network/en/articles/4135427-avalanche-platform-overview) bulabilirsiniz. Avalanche ve diğer platformlar arasındaki benzerlikleri ve farklılıkları anlamak için yararlı olacaktır.

## AVAX Token ve Ücretler

Avalanche'da tüm ücretler yerel token olan AVAX ile ödenir, dolayısıyla Avalanche ağıyla etkileşimde bulunmak için biraz AVAX'a ihtiyacınız olacak. AVAX'ınızı [borsalar](https://ecosystem.avax.network/marketplace?tag=exchange) yoluyla edinebilirsiniz. AVAX edinmenin bir diğer yolu, [Pangolin](https://app.pangolin.exchange/#/buy)'den kredi kartı ile satın almaktır. Diğer yollar aşağıda açıklanmıştır.

Avalanche'a varlıklar transfer etmek için [Avalanche Bridge](https://bridge.avax.network) kullanıyorsanız, varlıklarınızı taşımak/swap yapmak için biraz AVAX'a ihtiyacınız olacak. Avalanche Bridge, Avalanche'a belli bir tutardan daha fazla varlık transferi yapan kullanıcılara bir AVAX [airdrop](https://support.avax.network/en/articles/5462264-is-there-an-airdrop)'u \(havadan gelen\) verir. Bu havadan gelen AVAX'ı, köprüyle transfer ettiğiniz varlıkların bir kısmını AVAX'la swap etmek için kullanın, böylece gelecekteki işlem ücretlerini ödeyebilirsiniz.

## Cüzdan

Bir _adres_, bir kripto para bakiyesini tutabilir. Bir _cüzdan_, bir adresler kümesini kontrol eder. Adresi kilitli bir kutu, cüzdanı da birden çok kilitli kutu için bir anahtar olarak düşünün. Bir cüzdana, benzersiz, gizli, 24 sözcükten oluşan bir passphrase girilerek erişilebilir. **Bu anahtar parolayı kaybederseniz cüzdanınıza erişemezsiniz ve varlıklarınızı kurtarmanızın hiçbir yolu kalmaz!** Bu nedenle cüzdanınızın gizli passphrase'ini güvenli bir şekilde saklamanız çok önemlidir. Aynı zamanda, **passphrase'inize sahip olan biri varlıklarınızın tamamına erişip bunları alabilir**, bu yüzden hiç kimsenin anahtar parolanızı başka hiç kimsenin bilmediğinden emin olmak çok önemlidir. **Anahtar parolanızı bir bilgisayara kaydetmemek** en iyi uygulamadır.

Cüzdanınıza [Avalanche Cüzdan](https://wallet.avax.network/) web sitesinden erişebilirsiniz. [Bu](https://support.avax.network/en/articles/5315160-creating-a-new-wallet-with-the-avalanche-wallet) kılavuzu takip eder kendinize yeni bir cüzdan kurabilirsiniz.

Cüzdanınızda oturum açmak için bir [donanım Ledger'ı](https://docs.avax.network/build/tutorials/platform/setup-your-ledger-nano-s-with-avalanche) kullanabilirsiniz ve kullanmalısınız. **Bir donanım cüzdanı kullanmak token'larınıza erişmenin en güvenli yoludur**, çünkü özel anahtarlarınız ve anahtar parolanız daima cihazınızda bulunur.

Cüzdanınızı edindikten sonra, bir borsadan cüzdanınıza bir miktar AVAX göndermek isteyebilirsiniz. Bunu nasıl yapacağınızı öğrenmek için [buraya](https://support.avax.network/en/articles/5315157-how-to-send-avax-from-an-exchange-to-the-avalanche-wallet) bakın.

Avalanche'ın Birincil Ağı \(Primary Network\), yukarıda bağlantısı verilen genel bakış makalesinde açıklandığı gibi üç farklı zincirden oluşur. Fonlarınızı bir zincirden diğerine taşımak için [çapraz zincir transferleri](https://support.avax.network/en/articles/4840306-how-do-i-transfer-my-avax-between-avalanche-x-p-and-c-chains) \(cross-chain transfer\) yapmanız gerekecek.

## MetaMask

Avalanche ağındaki faaliyetlerin çoğu çeşitli dapp'ler \(merkeziyetsiz uygulamalar\) üzerinde gerçekleşir. Bunlarla etkileşimde bulunmak için, cüzdanınızı dapp'le bağlayacak bir internet tarayıcısı uzantısı kullanabilirsiniz. [Metamask](http://metamask.io/) bu türden bir popüler cüzdan uzantısıdır.

Metamask varsayılan olarak Ethereum'a bağlanır. Avalanche'a bağlamak için, [Avalanche'ı bir custom network](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche) \(özel ağ\) olarak eklemeniz gerekir.

Metamask'da yeni bir hesap yaratabilir ve bu hesaba ana Avalanche cüzdanınızdan fonlar gönderebilir ya da mevcut Avalanche Cüzdan hesabınızı içe aktarabilirsiniz. Hesabı ya gizli passphrase'i kullanarak ya da C-Chain özel anahtarını cüzdandan dışa aktararak \(`Manage Keys` ögesini, sonra `View C Chain Private Key` ögesini seçin\) içe aktarabilirsiniz. Ledger donanım cüzdanını kullanıyorsanız, onu Metamask'ta da kullanabilirsiniz. Metamask cüzdanınıza bağlanacak ve orada cüzdanınıza sanki web sitesinden erişmişsiniz gibi aynı bakiyeleri/adresleri bulacaksınız.

Metamask'ta fonlarınızı görmek için \(Avalanche Cüzdan'ı içe aktardıysanız\), ya da Cüzdan hesabından Metamask hesabına fonlar gönderebilmek için, fonlarınızı C-Chain üzerinde tutmanız gerekir. Fonları bir borsadan transfer ettiyseniz, fonlarınız genelde X-Chain'de olacaktır, dolayısıyla önceki bölümde açıklandığı gibi bir çapraz zincir transferi yapmanız gerekecektir.

## İşlemler

Avalanche Cüzdan'dan veya Metamask'tan token'lar gönderebilirsiniz. Tüm işlemlerin kesin ve geri döndürülemez olduğunu aklınızda bulundurmanız önemlidir. Bir hata yapıp yanlış bir adrese fon gönderirseniz, işlemi geri çevirecek ve fonları size geri gönderecek hiçbir mekanizma yoktur. Bu nedenle, token'ları gönderdiğiniz adresin doğru olduğundan ve başka bir ağda değil de Avalanche'daki bir adrese göndermek istediğinizden emin olmak kritik önem taşır \(bir sonraki bölüme göz atın\).

### Diğer Ağlara Gönderme

Diğer ağlar Avalanche'taki adres formatlarıyla aynı adres formatlarına sahip olabilir. Fakat bu, **Avalanche'dan örneğin Ethereum veya BSC \(Binance Smart Chain\) gibi diğer blok zincir ağlarına fon gönderebileceğiniz anlamına gelmez**. Örneğin, Avalanche'a \(`0x12345`\) adresine fon göndermesini söylerseniz, bu adres başka bir ağda mevcut olsa veya geçerli olsa bile, bunu başka bir ağda değil **Avalanche'da** yapar. Fonlarınız diğer ağa gitmeyecektir. Fonlar gönderildiğinde, yalnızca hedef adresi kontrol eden özel anahtarlara sahip olan kişi bu fonlara erişebilir. Hedef adresi _siz_ kontrol ediyorsanız, bu adresi kontrol eden özel anahtarı Metamask'a aktararak fonlarınızı muhtemelen geri getirebilirsiniz. Ama fonları başka birinin adresine gönderdiyseniz, fonları geri almak için o kişinin işbirliğine ihtiyacınız olacaktır, ki bu da zor olabilir.

Yukarıdaki durumun tersi de söz konusu olabilir. Bir Avalanche adresine Ethereum, BSC vb. ağlardan doğrudan fon gönderemezsiniz. Adresler birbiriyle aynı ve kabul edilmiş olabilir; ancak bu fonların cüzdanınıza geleceği anlamına gelmez. Ethereum'a fonlar göndermek ve oradan fonlar almak isterseniz, aşağıdaki [Avalanche Bridge](getting-started.md#avalanche-bridge) \(#Avalanche Bridge\) bölümüne bakın.

Yapmaya çalıştığınız şeyden emin değilseniz ya da ilk kez yapıyorsanız, önce küçük bir miktar \('toz'\) göndererek belirlenen hedefe ulaştığını kontrol etmek iyi bir yöntemdir.

### Tokenlar Ekleme

Yerel token olan AVAX'ın yanı sıra, ağda birçok başka token mevcuttur. Avalanche Cüzdan'ın en popüler tokenlar için entegre desteği vardır ama Metamask'ın yoktur. Diğer tokenlardan edinirseniz, bunlar cüzdanınızda veya Metamask'ta anında görünmeyebilir. Bunları manuel olarak eklemeniz gerekebilir; bunu yapmak için 'Add token' \(token ekle\) düğmesini tıklayın. Bir token eklemek için token sözleşme adresini bilmeniz gerekecektir. Metamask'ta arama fonksiyonunu kullanmayın, bu fonksiyon sadece Ethereum'da doğru çalışır. En popüler token'ların adreslerini, Ethereum'dan gelen varlıklar için [burada](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json), ya da Avalanche varlıkları için [burada](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json) bulabilirsiniz.

Adresi eklediğinizde verilerin geri kalanı otomatik olarak doldurulacak ve bakiyeniz görünecektir. Metamask'a [burada](https://bridge.avax.network/proof-of-assets) otomatik olarak tokenlar ekleyebilirsiniz; bunu yapmak için eklemek istediğiniz `Wrapped token`'da Metamask simgesini tıklayın.

## Dapp'ler

### Avalanche Bridge

İnternet tarayıcınızın uzantısını \(örneğin Metamask\) kurduktan sonra, Avalanche'daki dapp'lerle etkileşimde bulunmaya hazırsınız. Yapmak isteyebileceğiniz işlemlerin çoğu, örneğin _yield farming_, AVAX dışında tokenlarınızın olmasını gerektirebilir. Bu token'ları Ethereum'da \(veya onları Ethereum'a gönderebilecek bir borsada\) tutuyorsanız, onları hesabınıza geçirmenin en ucuz ve en hızlı yollarından biri [Avalanche Bridge](https://bridge.avax.network/)'dir.

Avalanche Bridge'in kullanımıyla ilgili temel bilgiler veren eğitim videolarını [burada](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP) bulabilirsiniz. Ayrıca köprü hakkında en çok sorulan sorulara ve dikkat edilmesi gereken önemli noktalara değinen [SSS](https://docs.avax.network/learn/avalanche-bridge-faq) bölümünü mutlaka okuyun.

Varlıklarınızın en az 75 $'lık bir kısmını köprü yoluyla transfer ederseniz, ilk swaplarınızın işlem ücretini ödemenize yardımcı olacak bir miktar AVAX da hesabınıza bonus olarak gelecektir; buna "airdrop" \(havadan gelen\) deniyor. Bu fonları sadece ilave AVAX edinmek için kullanın, çünkü kullandığınız diğer dapp'lerde ücretleri ödemek için AVAX'a ihtiyacınız olacak! Ücretleri ödemek için yeterli AVAX'ınız olmazsa karaya oturursunuz, hiçbir şey yapamazsınız, bu yüzden cüzdanınızda her zaman bir miktar AVAX bulunduğundan emin olun. [Pangolin](https://app.pangolin.exchange) üzerinde AVAX için swap yapabilirsiniz.

### Ekosistem

Avalanche'da kullanıma sunulmuş sürekli büyüyen bir dapp'ler koleksiyonu vardır. Resmi [ekosistem web sitemize](https://ecosystem.avax.network/marketplace) giderek bu uygulamaları bulabilirsiniz. İlginizi çeken alanların etiketlerini seçerek projeleri filtre edebilirsiniz. Ayrıca [topluluk tarafından yayınlanan](https://www.avax-projects.com/) bir projeler listesi de var. \(Bir projenin bu listelerde yer alması, o projenin topluluk tarafından onaylandığı anlamına gelmez.\)

Her şeyi tarayın, iyice inceleyin, sonra deneyin. Oralarda bir yerlerde birçok değerli taşlar var.

## Güvenlik

Kripto para dünyasının diğer yerlerinde olduğu gibi, burada da tehlikelere karşı pürdikkat uyanık olmanız gerekiyor. Tüm işlemler kesindir ve geri döndürülemez; bir hilenin tuzağına düşerseniz, hiç kimse fonlarınızı kurtarıp size geri veremez.

### Cüzdan Passphrase'i

**Gizli passphrase'inizin sizin cüzdanınız olduğunu** anlamanız çok önemlidir. 24 sözcükten oluşan bu gizli passphrase'e her kim sahip olursa, cüzdandaki her şey üzerinde tam erişime ve kontrole sahip olur. Birine anahtar parolanızı verirseniz, ona cüzdanınızdaki her şeyi de vermiş olursunuz. Bu nedenle, **passphrase'inizi asla hiç kimseye vermeyin**. Passphrase'i hiçbir yere göndermeyin. Passphrase'inizi internette bulduğunuz ya da birinin size bağlantısını gönderdiği web sitelerine yazmayın. Passphrase'inizi herhangi bir bilgisayarda kaydetmemek en iyi uygulamadır.

Passphrase'inizi girebileceğiniz tek yer [resmi Avalanche Cüzdan](https://wallet.avax.network) web sitesidir ve bu durumda bile güvenli bir ağda olduğunuzdan ve `https://wallet.avax.network` adresini kendiniz yazarak doğru web sitesine girdiğinizden emin olmanız gerekir. İnternet tarayıcınızdaki kilit simgesini kontrol ederek bağlantınızın güvenli olduğundan emin olun. Passphrase'inizi girmekle ilgili bir şüpheniz varsa, girmeyin.

Tutarları yabana atılmayacak tokenlarla \(diğer bir deyişle, kaybetmeyi kolayca göze alamayacağınız bir parayla\) çalışıyorsanız, fonlarınıza erişmek için mutlaka bir [Ledger donanım cüzdanı](https://www.ledger.com/) kullanmanızı öneririz.

### DYOR

Bunun açılımı "Do Your Own Research"dür, yani "kendi araştırmanı yap". Diğer bir deyişle, internette okuduğunuz bir şeye körü körüne güvenmeyin.  Başka kaynaklara bakın, ikinci bir görüş alın. Tek bir kaynaktan gelen haberleri doğru kabul etmeden önce çok dikkatli ve akılcı olun.

Özellikle özel kanaldan size ulaşan, açık kanallarda paylaştığınız sorunlar konusunda yardım teklif eden kişilere karşı şüpheci olun. Bu kişiler hemen her durumda sizi bir şekilde ikna ederek passphrase'inizi, özel anahtarlarınızı veya tokenlarınızı ele geçirmeye çalışan dolandırıcılardır.

Çok büyük getiriler vaadeden bilinmeyen projelere gözü kapalı girmeyin. Fonlarınızı yatırdığınız herhangi bir merkeziyetsiz uygulamanın fonlarınıza erişimi vardır. Projeyi internette arayın ve onu kimin yönettiğine bakın. Sözleşmelerin doğrulandığını ve denetlendiğini kontrol edin. Proje hakkında uyarı ve şikayet mesajları yayınlanıp yayınlanmadığını araştırın.

### Sahte token'lar

Herkes yeni bir token yaratabilir ve bunu yapmak Avalanche'ta oldukça ucuzdur.  Ayrıca, DEX'lerde likidite havuzu yaratmak izin gerektirmez, dolayısıyla herkes gerçek bir tokenla aynı ada ve aynı görüntüye sahip sahte bir tokenla yeni bir çift yaratabilir. Bu tür bir dolandırıcılığın kurbanı olmamak için tokenları mutlaka DEX'lerdeki resmi token listelerinden seçin, başka yerlerden gelen linkleri kullanmayın.

## Tarayıcılar \(Explorer\)

Explorer denen tarayıcılar, ağdaki aktiviteyi indeksleyip sunan web siteleridir; bu web sitelerinde bireysel işlemlere bakabilir, ağda neler olup bittiği hakkında daha ayrıntılı bilgiler bulabilirsiniz.

### Resmi tarayıcı

[explorer.avax.network](https://explorer.avax.network/) Ava Labs tarafından yönetilen resmi ağ tarayıcısıdır.

### Avascan

[Avascan](https://avascan.info/), derli toplu sunumu ve geniş kapsamlı gözden geçirmeleriyle bilinen, bireysel ağ doğrulayıcıları hakkında çok sayıda ilginç bilgiler verdiği için [doğrulayıcıların ve yetkilendirenlerin](https://avascan.info/staking/validators) izlenmesi bakımından ilgi çekici olan bağımsız bir tarayıcı web sitesidir.

### Vscout

[VScout](https://vscout.io/), Avalanche'ı takip etmek için kullanılabilecek diğer bir tarayıcıdır. Bu tarayıcıda, diğer şeylerin yanında, doğrulayıcıların tüm gezegendeki dağılımını görebilirsiniz.

## Çevrimiçi destek

Destek almanın çeşitli yollarını sunuyoruz. Bunlardan bazıları şunlardır:

* [Destek sitesi](https://support.avax.network/en/)
* [Twitter teknik destek](https://twitter.com/avaxtechsupport).
* [Telegram](https://t.me/avalancheavax)
* [Discord sunucusu](http://chat.avax.network/) \(en popüler ve en yüksek trafiğin olduğu kanal.\)

Yukarıdaki [DYOR](getting-started.md#dyor) bölümünü burada biraz daha genişletelim: Herkese açık destek kanallarından birini kullanırken, size doğrudan mesajlaşma, e-posta veya benzeri araçlarla özelden iletişim kuran kişilere karşı şüpheyle yaklaşın. Bu kişiler kendilerini admin, moderatör veya ekip üyesi olarak tanıtabilirler. **Meşru hesaplar sizinle hiçbir zaman ilk olarak doğrudan mesajlar aracılığıyla iletişime geçmez!** Gerçek adminler ve ekip üyeleri her zaman önce herkese açık ortamda iletişim kurarlar, daha sonra gerekirse sizden kendileriyle doğrudan mesajlaşma yoluyla _iletişim kurmanızı_ isterler.

Dolandırıcılar yardım isteyen insanları bulmak için herkese açık kanalları takip ederler ve onlarla özel hatlardan iletişime geçerek yardım teklif ederler. Bir dolandırıcı size cüzdanınızı 'senkronize etmeniz' gerektiğini veya buna benzer bir şeyi söyleyebilir ve işlemi tamamlamak için şifrenizi girmenizin gerektiği bir link gönderebilir. Sorunu çözecek bir uygulama teklif edebilirler. Her iki senaryoda biri fonlarınızı çalmanın peşindedir.

Tekrarlamakta fayda var: Hiç kimseye 24 sözcükten oluşan passphrase'inizi veya özel anahtarlarınızı vermeyin!

## Sonuç

Avalanche genç bir platform ama bu yeni blok zincirler cephesinde yer almak ve orada işlemler yapmak için birçok ilginç ve heyecan verici fırsatlar sunar. İşe koyulmak gözünüzü korkutabilir ama bu dokümanın sistemi tanımanızı ve sisteme katılmanızı kolaylaştıracağını umuyoruz.

Sorunuz veya şüpheniz varsa, ya da bir konuyu açıklığa kavuşturmak veya sadece sohbet ihtiyacınız varsa, lütfen bize [Discord sunucumuz](http://chat.avax.network/) üzerinde katılın. Sizi dinlemeyi çok isteriz.
