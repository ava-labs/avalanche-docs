# Posta koleksiyonu

## Postacı nedir?

Postacı, geliştiriciler tarafından hızlı ve kolayca dinlenme, SOAP ve GraphQL isteklerini ve API'leri test etmek için kullanılan ücretsiz bir araçtır. Linux, MacOS ve Windows'un bir online araç ve bir uygulama olarak kullanılabilir. Postacı hızlı bir şekilde API çağrılarını yayınlamanızı ve cevapları iyi biçimlendirilmiş ve aranabilir bir formda görmenizi sağlıyor.

[Avalanche](https://docs.avax.network)[](../release-notes/avalanchego.md), bir Postacı koleksiyonu yaptık. Avalanchego örneğinde mevcut tüm API çağrılarını da içeren bir postane koleksiyonu yaptık. Bu da kısa sürede kodlarınızı alıp uzun ve karmaşık `kıvrık` komutları kopyalamak zorunda kalmadan yanıtları görmenizi sağlıyor.

API koleksiyonu ile birlikte, Postacı için Avalanche ortamı da vardır, düğümün IP adresi gibi ortak değişkenleri tanımlar, Avalanche adresleriniz ve sorgunun benzer ortak unsurları gibi ortak değişkenleri tanımlar, bu yüzden onlara birden fazla kez girmek zorunda kalmazsınız.

Birleştikçe, kolayca şifrenizi takip etmenize izin verecekler. Durumunu kontrol edin ve operasyonu hakkında detayları öğrenmek için hızlı sorular sorun.

## Hazırlanın

### Postacı kurulumu

Postacı yerel olarak kurulabilir veya web uygulaması olarak kullanılabilir. Uygulamanın kurulmasını öneriyoruz, çünkü operasyonu basitleştiriyor. Postman [web sitesinden](https://www.postman.com/downloads/) indirebilirsin. Çalışma alanınız kolayca desteklenebilir ve web uygulaması ile bilgisayarınıza yüklenmiş uygulama arasında paylaşılabilir ve e-posta adresinizi kullanarak kayıt yaptırmanız tavsiye edilir.

![Postacı İndir](../../.gitbook/assets/postman_01_download.png)

Başvuruyu yükledikten sonra çalıştır. Bu sizi bir hesap oluşturmaya veya giriş yapmaya teşvik edecek. Öyle yap. Yine gerek yok ama önerildi.

### Koleksiyon içeriye aktarma

Workspace sekmesinden yeni `çalışma` alanını seçin ve yeni bir çalışma alanı the için gerekli şartları takip edin. Bu işin geri kalanının yapılacağı yer olacak.

![Yeni çalışma alanı](../../.gitbook/assets/postman_02_workspace.png)

Koleksiyonu ithal etmeye hazırız. Worskspaces sekmesinin başlığında `Yeni` seçin ve `Link` sekmesini geçin.

![Koleksiyonu içeriye aktar.](../../.gitbook/assets/postman_03_import.png)

Burada, URL giriş alanı içinde koleksiyona bağlanıyor:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postacı dosya içeriğinin biçimini tanıyacak ve dosyayı bir koleksiyon olarak aktarmayı teklif edecek. İthalatı tamamla. Şimdi Avalanche koleksiyonu çalışma alanınızda olacak.

![Koleksiyon içeriği](../../.gitbook/assets/postman_04_collection.png)

### Çevre aktarımı

Sonra da çevre değişkenlerini aktarmalıyız. of başlığı `Yeni` sekmeyi seçer ve `Link` sekmesini geç. Bu sefer to bağlanın:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postacı dosyanın biçimini tanıyacak:

![Çevre aktarımı](../../.gitbook/assets/postman_05_environment.png)

Çalışma alanına aktar. Şimdi, bu çevreyi düzenlememiz gerekiyor. Özel kurulumunuzun gerçek parametrelerine uygun olarak. Bunlar aktarılan dosyanın öntanımlı parametrelerinden farklı parametrelerdir.

Çevre indiriminin yanına göz simgesini tıklayın:

![Çevre içeriği](../../.gitbook/assets/postman_06_variables.png)

Öntanımlı ayarları değiştirmek için `Düzenleme` düğmesini seçin. En az olarak, `sunucunun` değişkeninin değeri olan düğümünün IP adresini değiştirmeniz gerekiyor. Bunu of IP olarak değiştirin (hem `başlangıç` hem de `mevcut` değerleri değiştirin). Ayrıca, düğümünüz Postacı yüklediğiniz makine üzerinde çalışmıyorsa your uygun [komut satırı](../references/command-line-interface.md#http-server) seçeneğini kontrol ederek API limanındaki bağlantıları dışarıdan kabul ettiğinden emin olun.

Şimdi her şeyi çözdük ve düğümleri sorgulamaya hazırız.

## API araması yapıyorum.

API çağrısı gruplarından birini aç, örneğin `Sağlık`. Çift tıklama `getLiveness` çağrısı:

![API çağrısı](../../.gitbook/assets/postman_07_making_calls.png)

Bu çağrının biçimi `http`, `ev sahibi` ve `port` çevre değişkenlerini kullanır. `Tıklayın`. İstek gönderilecek ve yakında cevabı görebilirsiniz. `Ceset``` sekmesinde:

![Yanıt](../../.gitbook/assets/postman_08_response.png)

Gerçek çağrıyı ve düğüme gönderilen değişkenleri görmek için, API arama sekmelerinde `Vücut` Sekme geçimini sağlar. Farklı sorulara yanıt vermek için değişkenleri çabucak değiştirebilirsiniz.

## Sonuç

Eğer özel ders tamamladıysanız, hemen API çağrılarını terminaldeki kıvırcık komutları ile uğraşmadan iletebilirsiniz. Bu your durumunu çabucak görmenizi sağlar, değişimlerinizi takip edin, ya da of sağlığını veya yaşam durumunu iki kez kontrol edin.

## Katkılar

Bu koleksiyonu [Avalanche](https://docs.avax.network/build/avalanchego-apis) API'lerle sürekli olarak sürdürmeyi ve [veri görüntüleri](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data) eklemek istiyoruz. Eğer Avalanche Postacı Koleksiyonunu geliştirmeye herhangi bir şekilde yardım edebilirseniz, önce `ustadan` ayrılarak bir özellik dalı oluşturun, sonra da özellikli dalınızda iyileştirmeler yapın ve son olarak çalışmanızı `yeniden yeniden` birleştirmek için [bir çekme isteği](https://github.com/ava-labs/avalanche-docs/pulls) yaratın.

Başka bir sorunuz ya da öneriniz varsa gelin [bizimle konuşun](https://chat.avalabs.org/).

