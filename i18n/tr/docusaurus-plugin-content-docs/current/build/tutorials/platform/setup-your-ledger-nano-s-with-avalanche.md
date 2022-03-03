# Avalanche ile Ledger Nano S veya Nano X Kullanma

Kripto paraları güvenli bir şekilde korumada sektör standardı, bilgisayarınız ile özel anahtarlarınız arasında tam izolasyon sağlayan özel cihazlar olan donanım cüzdanlarıdır.

Önceden oluşturduğunuz Avalanche adresini kullanmak istiyorsanız, Avalanche cüzdanından aldığınız anımsatıcı ifadenin kullanıldığı [kurtarma ifadesinden geri yükleme](https://support.ledger.com/hc/en-us/articles/4404382560913-Restore-from-recovery-phrase) prosedürünü uygulamanız gerekir. Yeni bir adres ayarlıyorsanız normal [yeni cihaz olarak ayarla](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device) prosedürünü izlemeniz yeterlidir.

Avalanche Ledger cüzdan uygulamasını [Ledger Live](https://www.ledger.com/ledger-live) aracılığıyla edinebilirsiniz.

## Avalanche, Ledger Live'da Nasıl Kurulur {#1c80}

Öncelikle [Ledger Live](https://www.ledger.com/ledger-live) uygulamasını yüklemeniz gerekir. Uygulamanın MacOS, Windows ve Linux masaüstü sürümlerinin yanı sıra iOS ve Android mobil sürümlerini indirebilirsiniz.

:::tehlike
Devam etmeden önce Ledger Live uygulamasının en son sürümünü kullandığınızdan emin olun. Eski sürümlerde en son aygıt yazılımı ve Avalanche uygulama sürümü gösterilmeyebilir. Bu makalenin yazıldığı sırada Ledger Live uygulamasının en son sürümü 2.26.1 sürümüdür.
 :::

Uygulama başarıyla yüklendikten sonra uygulamayı çalıştırın. "Manager" \(Yönetici\) sekmesine gidin ve cihaz üzerindeki her iki düğmeye basarak cihaz yönetimine izin verin. Uygulama Kataloğu arama alanına "Avalanche" yazın. Avalanche uygulaması sürümünün v0.5.2 \(veya üzeri\) olduğunu doğrulayın ve "Install" \(Yükle\) düğmesine tıklayın.

![Avalanche Ledger uygulaması yükle düğmesi](/img/ledger-06-live-install.png)

"Apps installed" \(Yüklü uygulamalar\) sekmesine gidin, Avalanche v0.5.2 ifadesini görüyorsanız yükleme başarıyla tamamlanmış demektir.

![Avalanche Ledger uygulaması yükle düğmesi](/img/ledger-07-live-version.png)

## Avalanche Cüzdan'ı Ledger {#48a3} ile Kullanın

Avalanche uygulamasını yükledikten sonra Ledger aracılığıyla [Avalanche Cüzdan](https://wallet.avax.network/) ile etkileşim kurabilirsiniz. AVAX, token, NFT, zincirler arası takas emirleri göndermenin yanı sıra staking ve delegasyon işlemleri yapabilirsiniz.

Öncelikle, cüzdana erişmek için Ledger cihazını bilgisayarınıza takın ve PIn kodunuzu girin.

![PIN kodu ekranı](/img/ledger-03-pin.png)

Cihazda birden fazla uygulama yüklüyse sol ve sağ ok düğmelerini kullanarak Avalanche uygulamasını seçin:

![Avalanche uygulaması](/img/ledger-04-app-start.png)

Uygulamayı başlatmak için her iki düğmeye basın. Bu eylem sizi "Avalanche" uygulama ekranına götürecektir. Burada uygulama sürümünün 0.5.2 \(veya üzeri\) olup olmadığını doğrulayabilirsiniz.

![Uygulama sürümü](/img/ledger-05-app-version.png)

Avalanche uygulamasının çalıştığını onayladıktan sonra cüzdan giriş sayfasında "Access Wallet" \(Cüzdana Eriş\) düğmesine tıklayın.

![Cüzdana eriş düğmesi](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

Sonra açılan"How do you want to access your wallet?" \("Cüzdanınıza nasıl erişmek istersiniz?"\) iletişim kutusunda "Ledger" seçeneğine tıklayın.

![Ledger Erişimi](/img/ledger-01-wallet-access.png)

Şimdi sizden Ledger cihazınızda bulunan genel anahtarlara erişimi onaylamanız istenecektir. Cihazdaki istemleri takip ederek sağ ok düğmesine tıklayın ve son açılan ekranda her iki düğmeye basarak onaylayın.

![](/img/ledger-02-confirm-access.png)

Farklı zincirler için farklı anahtarlar kullanıldığından bu işlemi iki kez yapmanız gerekir. İşlemin başarı olması durumunda, cüzdan oturumunuz açılır ve varsa önceki bakiyeler görüntülenir.

![Web Cüzdanı Portföy Sekmesi](/img/web-wallet-portfolio-tab.png)

Fon transfer etmek için "Send" \(Gönder\) sekmesine gidin ve bir X-Adresini "To Address" \(Alıcı Adresi\) alanına yapıştırın. Tutar belirleyin ve isteğe bağlı olarak bir bilgi notu yazın. "Confirm" \(Onayla\) ve ardından "Send Transaction" \(İşlemi Gönder\) düğmesine basın.

![İşlemi Gönder](/img/send-transaction.png)

Sizden bu işlemi Ledger cihazınızda onaylamanız istenir. Web cüzdanında gösterilen hash'in Ledger cihazınızda görüntülenen hash ile eşleşip eşleşmediğini kontrol edin. Tüm değerler eşleşiyorsa son açılan ekranda yer alan her iki düğmeye basarak işlemi gönderme isteğinizi onaylayın.

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

Bakiyenizi yenilemek için simgeye tıklayabilirsiniz. Bu durumda, az önce gönderdiğiniz tutar ve işlem ücretinin bakiyeden düşüldüğünü görürsünüz.

![Cüzdan bakiyesini yenile](/img/refresh-wallet-balance.png)

Sağdaki sütunda yaptığınız en son işlemi görürsünüz. Büyüteç simgesine tıkladığınızda bu işlem tarayıcımızda açılır.

![Büyüteç](/img/magnifying-glass.png)

Son olarak, işlem bilgilerini tarayıcımızda görebilirsiniz. Burada, işlem kimliği, durum, işlemin gerçekleştiği zaman dahil işlemle ilgili her şeyin yanı sıra girdi ve çıktılara ilişkin tüm bilgiler listelenir.

![İşlem bilgileri](/img/transaction-details.png)

## Daha Fazla Araç Gelecek {#135b}

Ava Labs Finans İnterneti'ni inşa ediyor. İnsanların finans uygulamalarını oluşturma ve kullanma şeklini yeniden tanımlayarak zahmetsiz bir dünya oluşturmaya yönelik çözümler geliştiriyoruz. Donanım cüzdanı bu altyapının kritik parçalarından biridir, böylece kullanıcılar özel anahtarlarının ve kripto paralarının kötü amaçlı aktörlerden tamamen izole edildiğinden kesinlikle emin olabilirler. Yeni yayınlanan Ledger uygulamamız kullanıcıların ve kripto paraların güvenliğini ve emniyetini sağlamak için sektördeki en iyi yöntemleri uygulayarak bunu gerçekleştirir.

