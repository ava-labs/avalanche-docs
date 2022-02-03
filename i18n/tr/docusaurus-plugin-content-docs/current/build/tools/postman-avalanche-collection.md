# Postman koleksiyonu

## Postman nedir?

Postman, geliştiricilerin hızlıca ve kolayca REST, SOAP ve GraphQL isteklerini göndermek ve API'leri test etmek için kullandığı ücretsiz bir araçtır. Hem çevrimiçi bir araç hem de Linux, MacOS ve Windows için bir uygulama olarak sunulur. Postman, API çağrılarını hızlı bir şekilde yayınlamanıza ve yanıtları güzelce biçimlendirilebilir, aranabilir bir formda görüntülemenize yarar.

[Avalanche](https://docs.avax.network) için [AvalancheGo instance'ında](../release-notes/avalanchego.md) mevcut tüm genel API çağrılarını içeren, uzun ve karmaşık `curl` komutlar kopyalayıp yapıştırmanıza gerek kalmadan düğümünüze komutlar yayınlayıp yanıtları görmenize olanak veren bir Postman koleksiyonu yaptık.

API koleksiyonu ile birlikte, birden fazla kere girdi yapmanıza gerek kalmaması için düğümün IP adresi, Avalanche adresiniz ve sorgulardaki diğer benzer sık kullanılan öğeleri tanımlayan Postman için örnek Avalanche ortamı da bulunmaktadır.

Hepsi birlikte düğümlerinizi kolayca takip etmenize, durumunu kontrol etmenize ve faaliyeti ile ilgili ayrıntıları öğrenmek için hızlı sorgular yapmanıza olanak tanır.

## Kurulum

### Postman kurulumu

Postman yerel olarak kurulabilir veya web uygulaması olarak kullanılabilir. Operasyonu kolaylaştırdığı için aplikasyon olarak kurulmasını öneriyoruz. Postman'ı [web sitesinden](https://www.postman.com/downloads/) indirebilirsiniz. İş alanınızın web uygulaması ve bilgisayarınızdaki uygulama arasında kolayca paylaşılması ve yedeğinin alınabilmesi için e-posta adresinizi kullanarak kayıt yapmanızı tavsiye ediyoruz.

![Postman'ı İndirin](/img/postman_01_download.png)

Uygulamayı kurduktan sonra çalıştırın. Bir hesap oluşturmanızı veya giriş yapmanızı istenecektir. Öyle yapabilirsiniz. Tekrarlamak gerekirse, zorunlu değildir; ancak tavsiye edilir.

### Koleksiyonu içe aktarma

İş alanları sekmesinden `New workspace` seçin ve yeni bir iş alanı oluşturmak için iletileri takip edin. İşin geri kalanının yapılacağı yer burasıdır.

![Yeni iş alanı](/img/postman_02_workspace.png)

Koleksiyonu içe aktarmaya hazırız. İş alanları sekmesinin başlığında `New` seçin ve `Link` sekmesine geçin.

![Koleksiyonu içe aktar](/img/postman_03_import.png)

Buradaki URL giriş alanına koleksiyonun bağlantısını kopyalayın:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postman, dosya içeriğinin biçimini tanıyacak ve dosyayı koleksiyon olarak içe aktarmayı teklif edecektir. İçe aktarımı tamamlayın. Artık iş alanınızda Avalanche koleksiyonu olacak.

![Koleksiyon içeriği](/img/postman_04_collection.png)

### Ortamı içe aktarma

Şimdi, ortam değişkenlerini içe aktarmamız gerekiyor. Yine İş Alanları sekmesi başlığında `New` seçin ve `Link` sekmesine geçin. Bu sefer JSON ortamının bağlantısını yapıştırın:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postman, dosyaların biçimini tanıyacaktır:

![Ortamı içe aktarma](/img/postman_05_environment.png)

İş alanınıza aktarın. Şimdi, o ortamı özgün kurulumunuzun gerçek parametrelerine uyacak şekilde düzenlememiz gerekiyor. Bunlar içe aktarılan dosyadaki varsayılan değerlerden farklı parametrelerdir.

Ortam açılır menüsünün yanındaki göz simgesine tıklayın:

![Ortam içeriği](/img/postman_06_variables.png)

Varsayılan değerleri değiştirmek için `Edit` düğmesini seçin. En azından düğümünüzün `host` değişkeninin değeri olan IP adresini değiştirmeniz gerekiyor. Düğümünüzün IP adresi olarak değiştirin \(hem `initial` hem de `current` değerlerini değiştirin\). Ayrıca düğümünüz Postman kurulumunu yaptığınız makine üzerinde çalışmıyorsa, uygun [komut satırı seçeneğini](../references/command-line-interface.md#http-server) işaretleyerek düğümün dışarıdan API port bağlantılarını kabul ettiğinden emin olun.

Tüm aşamaları tamamladığımıza göre, artık düğüme sorgu göndermeye hazırız.

## API çağrıları oluşturma

API çağrı gruplarından birini açın, mesela `Health`. `health` çağrısına çift tıklayın:

![API çağrısı](/img/postman_07_making_calls.png)

Çağrı biçiminin, `http`, `host`ve `port` ortam değişkenlerini kullandığını göreceksiniz. `Send` üzerine tıklayın. Çağrı gönderilecektir ve kısa süre içinde yanıtı `Body` sekmesinde `Response` kısmında göreceksiniz:

![Yanıt](/img/postman_08_response.png)

Düğüme gönderilen güncel çağrıyı ve değişkenleri görmek için API çağrı sekmelerindeki `Body` sekmesine geçin. Buradan farklı sorgulara verilen yanıtı görmek için gerekli değişkeni hızla değiştirebilirsiniz.

## Sonuç

Başlangıç örneklerini tamamladıysanız, terminaldeki istemci URL komutlarıyla uğraşmadan düğümünüze hızlıca API çağrıları gönderebiliyor olmalısınız. Bu size düğümünüzün durumunu görmeye, değişikliklerini takip etmeye veya sağlığı ya da çalışma durumunu kontrol etmeye olanak tanır.

## Katkı sağlama

Bu koleksiyonu [Avalanche API'leri](https://docs.avax.network/build/avalanchego-apis) ile sürekli güncel tutmanın yanında, [veri görselleştirmeleri](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data) de eklemeyi umuyoruz. Avalanche Postman Koleksiyonunun geliştirilmesine herhangi bir şekilde yardımcı olabileceğinizi düşünüyorsanız; önce `master` üzerinden dallandırarak bir özellik branşı oluşturun, sonra özellik branşınızda geliştirmeleri yapın ve son olarak ç[ekme talebi](https://github.com/ava-labs/avalanche-docs/pulls) yaparak işinizi `master` içerisine geri kaynaştırın.

Başka sorunuz ya da öneriniz varsa [bizimle konuşabilirsiniz](https://chat.avalabs.org/).

