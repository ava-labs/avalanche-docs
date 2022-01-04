# Avalanche Cüzdan'la NFT'ler Yaratın

## Avalanche'ta Değiştirilemez Tokenlar

[Avalanche](../platform/README.md) sabit arz limitli varlıklar, değişken arz limitli varlıklar ve değiştirilemez tokenlar \(NFT'ler\) gibi dijital varlıkların yaratılmasını yerel olarak destekler.

Bazı varlıklar değiştirilebilir varlıklardır, yani değiştirilebilir bir varlığın tüm birimleri tam olarak birbiriyle değiştirilebilir. Bir para biriminin banknotları birbiriyle değiştirilebilir; mesela 5 $'lık bir banknot, 5 $'lık diğer bir banknotla aynı kabul edilir. Bunun tersine bazı varlıklar değiştirilemez. Yani, elemanlar benzersizdir ve birbirleriyle tam olarak değiştirilemezler. Mesela bir gayrimenkul değiştirilemez bir varlıktır, çünkü her toprak parçası farklıdır.

Değiştirilemez tokenlar, benzersiz bir varlığın mülkiyetinin kanıtını temsil etmenin kullanışlı bir yoludur.

## Avalanche Cüzdan'da NFT Studio

[Avalanche Cüzdan](https://wallet.avax.network/)'daki **NFT Studio** NFT'ler yaratmak için kullanılabilir. Bu eğitim makalesinde bir **Collectible**, yani koleksiyonu yapılabilir bir varlık yaratacağız: bu varlık bir görseli ve bir açıklaması, ya da kişiselleştirilmiş bir payload'ı olan jenerik bir NFT olacak. Bu varlıkları basit bir üzerine-gel-ve-tıkla arayüzü kullanarak yaratabiliriz; bunu yapmak için hiçbir teknik bilgi gerekmez.

**NFT Studio**'ya girmek için Avalanche Cüzdan'da oturum açın. Sol tarafta **Studio** ögesini seçin:

![NFT Studio](/img/nft-studio-01-select.png)

Bunu yaptığınızda NFT Studio açılır. Burada iki seçeneğiniz var: **New Family**, yeni bir NFT ailesi yaratmak içindir, **Mint Collectible** ise, mevcut ailelerde yeni varlıklar yaratmak içindir. İlk NFT ailemizi yaratmak istiyoruz, öyleyse **New Family** seçeneğini tıklayalım.

### NFT Ailesi Yaratın

Burada sizden koleksiyonu yapılabilir ailenizin adını ve sembolünü \(kısaltılmış ad\) girmeniz istenecektir. Adların benzersiz olması gerekmez.

![Yeni aile yaratın](/img/nft-studio-02-family.png)

Ayrıca yeni yaratılan ailede kaç farklı koleksiyonu yapılabilir varlık bulunduğunu belirten **Number of Groups** alanına bir değer girmeniz gerekir. Bu değeri dikkatli belirleyin, çünkü bir kez yaratıldıktan sonra koleksiyon varlıkları ailesinin parametreleri değiştirilemez.

Bu işlemi bitirdiğinizde **Create** düğmesini tıklayarak koleksiyon varlıkları ailesini yaratın. İşlem ücreti cüzdan bakiyenizden kesilecektir. Aile yaratıldığında, işlem kimliğini \(TxID\) ve ailenin parametrelerini göreceksiniz. TxID'yi [tarayıcıda](https://explorer.avax.network/) işlemi aramak için kullanabilirsiniz ama bu kimliği bir yere yazmanıza gerek yok.

**Back to Studio** düğmesini tıklayarak sayfadan çıkın; şimdi ilk koleksiyon varlığımızı yaratmaya hazırız. **Mint Collectible** düğmesini tıklayın.

### NFT'ler Mint Edin

**Mint Collectible** düğmesini tıkladıktan sonra karşınıza henüz yaratılmamış Koleksiyon Varlıkları grupları olan tüm Koleksiyon Varlıkları ailelerinin bir listesi gelecek.

![Bir aile seçin](/img/nft-studio-03-select-family.png)

Daha önce yarattığınız aileyi seçin. Ekrana bir form gelecek ve sizden bu formu yeni koleksiyon varlığının parametreleriyle doldurmanız istenecektir.

![Bir Koleksiyon Varlığı Mint Edin](/img/nft-studio-04-mint.png)

Varsayılan olarak **Generic** tipi bir koleksiyon varlığı seçilecektir. Bu varlık, bir **Title**'ı, görseli için bir **URL**'si ve bir **Description**'ı olan bir NFT'dir. Gerekli bilgileri ve koleksiyon varlığından kaç kopya yaratılacağını belirleyecek **Quantity**'yi \(miktar\) girin. Daha önce olduğu gibi, bu bilgileri dikkatli bir şekilde girin; tokenlar bir kez mint edildikten sonra hiçbir şeyi değiştiremezsiniz. Bilgilerin bir önizlemesini göreceksiniz; burada koleksiyon varlığınızın nasıl göründüğünü kontrol edebilirsiniz.

Koleksiyon varlığı olarak bir resim dışında başka bir şey yaratmak isterseniz **Custom** düğmesini tıklayın.

![Custom Collectible](/img/nft-studio-05-custom.png)

Kişiselleştirilmiş \(custom\) bir koleksiyon varlığı, **UTF-8** kodlu bir string, bir **URL** veya bir **JSON** payload içerebilir. Verilerin boyutu 1024 baytı aşamaz.

İşlemi tamamladığınızda, **Mint** düğmesini tıklayarak koleksiyon varlığını yaratın. İşlem ücreti cüzdanınızdan kesilecek ve yeni yaratılan koleksiyon varlığı cüzdanınıza yerleştirilecektir.

### Koleksiyon varlıklarınızı görün

Koleksiyon varlıklarınızın genel bir görüntüsü ekranın üst tarafında bakiyelerinizle birlikte her zaman görünür durumdadır.

![Genel Bakış](/img/nft-studio-06-overview.png)

Koleksiyon varlıklarınızı daha ayrıntılı görmek için sol taraftaki menüden **Portfolio** ögesini seçin. Karşınıza varlıklarınızın tümünü varsayılan olarak seçilen tokenlarla birlikte gösteren bir ekran gelecek. İlgili sekmeyi tıklayarak **Collectibles** ögesini seçin.

![Koleksiyon varlıkları listesi](/img/nft-studio-07-collectibles.png)

Her bir Generic koleksiyon varlığının bir resmi, varlığın adıyla ve portföyünüzde o varlıktan kaç kopya bulunduğunu gösteren sayıyla birlikte gösterilecektir. Farenin imlecini koleksiyon varlığının üzerine getirdiğinizde varlığın ayrıntılı açıklaması gösterilecektir:

![Koleksiyon varlığının bilgileri](/img/nft-studio-08-detail.png)

Bir koleksiyon varlığını üzerini tıklayarak seçerseniz, varlığın hangi gruba ait olduğunu, miktarını ve **Send** \(gönder\) düğmesini göreceksiniz.

## NFT'ler gönderin

Koleksiyon varlığınızı birine göndermek için, Portföyde seçtiğiniz koleksiyon varlığının üzerindeki **Send** düğmesini tıklayın ya da sol taraftaki menüde bulunan **Send** ögesini seçerek **Add Collectible** ögesini tıklayın:

![Koleksiyon varlıklarının seçilmesi](/img/nft-studio-09-send.png)

Ekrana göndermek istediğiniz bir koleksiyon varlığını seçebileceğiniz bir menü gelecektir.

![Çoklu koleksiyon varlıkları](/img/nft-studio-10-multiple.png)

Tek bir işlemle birden fazla koleksiyon varlığı gönderebilirsiniz. Koleksiyon varlığının üzerindeki etiketi tıklayarak göndermek istediğiniz kopyaların sayısını belirleyebilirsiniz. Tek bir işlemle birden fazla aile ve koleksiyon varlığı tipi gönderebilirsiniz.

Hedef adresi girdikten sonra **Confirm** düğmesini tıklayarak işlemi başlatabilirsiniz.

![İşlem](/img/nft-studio-11-send-transaction.png)

**Send Transaction** düğmesini tıkladığınızda varlığınız ağda yayınlanacak ve işlem ücreti bakiyenizden tahsil edilecektir. Koleksiyon varlıkları kısa bir süre sonra hedef adrese yatırılmış olacaktır.

## Özet

Şimdi NFT aileleri yaratabilir, NFT grupları mint edebilir ve NFT'ler gönderebilirsiniz. İyi eğlenceler! Yaratılarınızı [sosyal medya kanallarımızda](https://www.avalabs.org/social) bizimle paylaşmayı ihmal etmeyin!

NFT'lerin Avalanche ağında nasıl çalıştığı hakkında teknik bilgiler edinmek isterseniz ya da NFT'leri kullanarak ürünler kurmak isterseniz, bu [NFT eğitim materyaline](creating-a-nft-part-1.md) lütfen bir göz atın. Teknik sorularınız olursa [Discord](https://chat.avalabs.org/) sunucumuz üzerinden bize ulaşın.

