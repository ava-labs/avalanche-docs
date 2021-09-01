# Posta koleksiyonu

## Postacı nedir?

Postacı, geliştiriciler tarafından hızlı ve kolayca dinlenme, SOAP ve GraphQL isteklerini ve API'leri test etmek için kullanılan ücretsiz bir araçtır. Linux, MacOS ve Windows'un bir online araç ve bir uygulama olarak kullanılabilir. Postacı hızlı bir şekilde API çağrılarını yayınlamanızı ve cevapları iyi biçimlendirilmiş ve aranabilir bir formda görmenizi sağlıyor.

[Avalanche](https://docs.avax.network)[](../release-notes/avalanchego.md), bir Postacı koleksiyonu yaptık. Avalanchego örneğinde mevcut tüm API çağrılarını da içeren bir postacı koleksiyonu yaptık. Bu da kısa sürede kodlarınızı alıp uzun ve karmaşık komutları kopyalamak zorunda kalmadan yanıtları görmenizi `curl`sağlıyor.

API koleksiyonu ile birlikte, Postacı için Avalanche ortamı da vardır, düğümün IP adresi gibi ortak değişkenleri tanımlar, Avalanche adresleriniz ve sorgunun benzer ortak unsurları gibi ortak değişkenleri tanımlar, bu yüzden onlara birden fazla kez girmek zorunda kalmazsınız.

Birleştikçe, kolayca şifrenizi takip etmenize izin verecekler. Durumunu kontrol edin ve operasyonu hakkında detayları öğrenmek için hızlı sorular sorun.

## Hazırlanın

### Postacı kurulumu

Postacı yerel olarak kurulabilir veya web uygulaması olarak kullanılabilir. Uygulamanın kurulmasını öneriyoruz, çünkü operasyonu basitleştiriyor. Postman [web sitesinden](https://www.postman.com/downloads/) indirebilirsin. Çalışma alanınız kolayca desteklenebilir ve web uygulaması ile bilgisayarınıza yüklenmiş uygulama arasında paylaşılabilir ve e-posta adresinizi kullanarak kayıt yaptırmanız tavsiye edilir.

![Postacı İndir](../../.gitbook/assets/postman_01_download.png)

Başvuruyu yükledikten sonra çalıştır. Bu sizi bir hesap oluşturmaya veya giriş yapmaya teşvik edecek. Öyle yap. Yine gerek yok ama önerildi.

### Koleksiyon içeriye aktarma

`New workspace`İşletme alanları sekmesini seçin ve yeni bir çalışma alanı the için gerekli şartları takip edin. Bu işin geri kalanının yapılacağı yer olacak.

![Yeni çalışma alanı](../../.gitbook/assets/postman_02_workspace.png)

Koleksiyonu ithal etmeye hazırız. Worskspaces sekmesinin başlığında sekme seçin `New`ve sekmeye `Link`geçin.

![Koleksiyonu içeriye aktar.](../../.gitbook/assets/postman_03_import.png)

Burada, URL giriş alanı içinde koleksiyona bağlanıyor:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postacı dosya içeriğinin biçimini tanıyacak ve dosyayı bir koleksiyon olarak aktarmayı teklif edecek. İthalatı tamamla. Şimdi Avalanche koleksiyonu çalışma alanınızda olacak.

![Koleksiyon içeriği](../../.gitbook/assets/postman_04_collection.png)

### Çevre aktarımı

Sonra da çevre değişkenlerini aktarmalıyız. of başlığı sekmeyi seçer `New`ve sekmeye `Link`geç. Bu sefer the bağlanın:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postacı dosyanın biçimini tanıyacak:

![Çevre aktarımı](../../.gitbook/assets/postman_05_environment.png)

Çalışma alanına aktar. Şimdi, bu çevreyi düzenlememiz gerekiyor. Özel kurulumunuzun gerçek parametrelerine uygun olarak. Bunlar aktarılan dosyanın öntanımlı parametrelerinden farklı parametrelerdir.

Çevre indiriminin yanına göz simgesini tıklayın:

![Çevre içeriği](../../.gitbook/assets/postman_06_variables.png)

Öntanımlı olanları değiştirmek için `Edit`düğmeyi seçin. Bir minimum olarak, of IP adresini değiştirmeniz gerekiyor, ki bu değişkenin değeri `host`olur. Düğününüz IP olarak değiştirin \(hem `initial`de değerleri `current`değiştirin\). Ayrıca, düğümünüz Postacı yüklediğiniz makine üzerinde çalışmıyorsa your uygun [komut satırı](../references/command-line-interface.md#http-server) seçeneğini kontrol ederek API limanındaki bağlantıları dışarıdan kabul ettiğinden emin olun.

Şimdi her şeyi çözdük ve düğümleri sorgulamaya hazırız.

## API araması yapıyorum.

API çağrısı gruplarından birini açın, `Health`örneğin. Çift tıklama `getLiveness`çağrısı:

![API çağrısı](../../.gitbook/assets/postman_07_making_calls.png)

`http`Bu arayışın biçiminin `host`ve `port`çevre değişkenlerini kullandığını göreceksiniz. `Send`Tıklayın. İstek gönderilecek ve yakında cevabı göreceksiniz. Hesabın `Body`içinde:`Response`

![Yanıt](../../.gitbook/assets/postman_08_response.png)

Gerçek çağrıyı ve düğüme gönderilen değişkenleri görmek için, API arama sekmelerinde `Body`sekmeye geç. Farklı sorulara yanıt vermek için değişkenleri çabucak değiştirebilirsiniz.

## Sonuç

Eğer özel ders tamamladıysanız, hemen API çağrılarını terminaldeki kıvırcık komutları ile uğraşmadan iletebilirsiniz. Bu your durumunu çabucak görmenizi sağlar, değişimlerinizi takip edin, ya da of sağlığını veya yaşam durumunu iki kez kontrol edin.

## Katkılar

Bu koleksiyonu [Avalanche](https://docs.avax.network/build/avalanchego-apis) API'lerle sürekli olarak sürdürmeyi ve [veri görüntüleri](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data) eklemek istiyoruz. Avalanche Postacı Koleksiyonunu herhangi bir şekilde geliştirebilirseniz, öncelikle bir özellik dalı oluşturun, sonra da özellikli şubeleri `master`geliştirin, ve son olarak çalışmanızı birleştirmek için [bir çekiş isteği](https://github.com/ava-labs/avalanche-docs/pulls) `master`yaratın.

Başka bir sorunuz ya da öneriniz varsa gelin [bizimle konuşun](https://chat.avalabs.org/).

