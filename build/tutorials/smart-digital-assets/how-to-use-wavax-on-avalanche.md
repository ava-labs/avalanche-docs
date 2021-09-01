# Avalanche üzerinde Sarılı AVAX \(WAVAX\) kullan

## WAVAX nedir?

[AVAX](../../../#avalanche-avax-token)[, Avalanche](../../../learn/platform-overview/) platformunda yer alan bir işaret. Ethereum Sanal Makinesi'nin bir örneğidir ve [Contract Chain \(C-Chain\)](../../../learn/platform-overview/#contract-chain-c-chain) üzerinde birçok akıllı sözleşme, Ethereum's ERC-20 Ethereum's çalışmak üzere tasarlanmıştır. AVAX bu tür sözleşmelerde kullanmak için ERC-20 uyumlu olan paketlenmiş AVAX \(WAVAX\) kullanmalısınız.

## Gözden geçirme

AVAX to dönüştürmek için to akıllı bir sözleşme olarak kullanacaksınız. WAVAX to dönüştürmek için, WAVAX akıllı bir kontrata geri vereceksiniz.

Bu özel ders için şöyle yapacaksın:

* Metamask to Bağla
* Metamask hesabını fonla
* WAVAX sözleşmesini Remix içine yükle
* Önceden konuşlandırılmış WAVAX sözleşmesine bağlan
* AVAX to dönüştür ve geri dönün
* to özel bir işaret olarak WAVAX ekle

## Metamask Bağla

[Metamask](https://metamask.io/) yaygın bir web tarayıcısı uzantısıdır ve Avalanche's C-Chain gibi Ethereum ve uyumlu blok zincirleriyle etkileşimi kolaylaştırır. Metamask ayarlamak ve üzerine bir hesap yaratmak bu özel ders için çok fazla şey ama internette size bunu anlatacak bir sürü kaynak var.

Metamask hesabınıza girdikten sonra Avalanche ağına bağlayın. Ağ Düşürme - > **Özel RPC: **Seç:

![Metamask ağı düşüşü](../../../.gitbook/assets/image%20%2860%29.png)

Seçtiğiniz ağ için bilgiyi girin:

### Avalanche Mainnet Ayarları:

* **Ağ **Adı: Avalanche Mainnet C-Chain
* **Yeni RPC **URL: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* ****ZincirI:`43114`
* ****Sembol:`AVAX`
* **Explorer: **[Explorer:](https://cchain.explorer.avax.network/)

### Fuji Testnet Ayarları:

* **Ağ **Adı: Avalanche Fuji C-Chain
* **Yeni RPC **[URL:](https://api.avax-test.network/ext/bc/C/rpc)
* ****ZincirI:`43113`
* ****Sembol:`AVAX`
* **Explorer: **[Explorer:](https://cchain.explorer.avax-test.network/)

Değişiklikleri kaydettikten sonra, belirttiğiniz Avalanche ağını seçin. AVAX dengesini görmelisin, ki muhtemelen 0 olacak.

## C-Chain Hesabını Fon Et.

Hesabınıza biraz AVAX koymanız gerekiyor.

### **Çığ Cüzdanını kullanıyor**

Eğer zaten AVAX varsa onları Metamask hesabına [Avalanche Cüzdan](https://wallet.avax.network/) kullanarak transfer edebilirsiniz. **Cüzdandaki **dizinin çöküşünü seçerek paranızın nerede olduğunu görebilirsiniz. Eğer C-Chain için yeterli paran yoksa C-Chain X-Chain taşınmak için bir [Cross Chain Transfer](../platform/transfer-avax-between-x-chain-and-c-chain.md)'e ihtiyacın var.

**C-Chain, paranız bulunduktan sonra Cüzdan sol taraftaki menüyü **gönderin ve kaynak zinciri **C to **geçin. **Adres **alanında, Metamask adresinizi yapıştırın. Göndermek için miktarı girin, **doğrulama **ve sonra ****gönderin.

![to gönder](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

Fonlar yakında Metamask hesabınızda görünür olacak.

### **Test Ağı Faucet Kullanıyor**

Test ağına you're Metamask hesabınızı finanse etmek için musluğunu kullanabilirsiniz. [Musluğa](https://faucet.avax-test.network/) doğru yol göster ve Ethereum adresinizi yapıştırın, in \(örn.\) hesap adı altında `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`gösterilir. Hesap adını tıkladığınızda hesap panoya kopyalayacaktır.

![Faucet fonunu](../../../.gitbook/assets/wavax2avax-02-faucet.png)

O adresi musluğa yapıştır, robot olmadığını kanıtla ve sonra da AVAX testi talep et. Kısa süre içinde your görünecekler.

## Remix için WAVAX sözleşmesini yükle

Remix, yazma, konuşlandırma ve akıllı sözleşmelerle etkileşim için popüler bir tarayıcı tabanlı araçtır. [Remix'in web sitesine](https://remix.ethereum.org/) Naviate. Kontratların girişini görene kadar aşağıya in.

![from içeriye aktarma](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

`https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol`GitHub, ****seçin ve giriş alanı yapıştırıcısından ve tamamı **seçin.** Bu kontratı into yükler.

![Dosya Explorer](../../../.gitbook/assets/wavax2avax-04-contract.png)

Soldaki Dosya Explorer sekmesine `WAVAX.sol`geçiliyor. Bu da az önce yüklediğimiz sözleşme.

Sol taraftaki menüde, Derleme sekmesine geç:

![Derle](../../../.gitbook/assets/wavax2avax-05-compile.png)

Gösterilen gibi derleyici sürümü sözleşmeyle uyumlu olup olmadığını kontrol edin. **Compile WAVAX.sol, basın, ve **WAVAX sözleşmesinin aşağıdaki `CONTRACT`alanda göründüğünden emin olun. Avalanche ağına çoktan yerleştirilmiş olan WAVAX sözleşmesine bağlanmaya hazırsın.

## WAVAX sözleşmesine bağlan

Sol taraftaki **İşlem & Çalıştırma **sekmesini çalıştır.

![Bağlan](../../../.gitbook/assets/wavax2avax-06-deploy.png)

your giriş yaptığından emin ol. `Injected Web3`Çevre ****indirme menüsünde seçin. Metamask ortaya çıkıp hesabı seçmenizi isteyecek. Avalanche ile bağlantılı olanı seçin ve bağlantı kurmasına izin verin. Bu **hesap alanını önceden **dolduracak. **Kontrat **alanının sözleşmeye hazır olduğundan emin `WAVAX`ol. Artık contract, yayınlanmış olan sözleşmeye bağlanabiliriz. **At Adres **düzenleme alanında anlaşıldı:

* Mainnet Için:`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Fuji For Göre:`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

**Adresi yapıştırdıktan sonra Adres düğmesine **bas.

Remix konuşlandırılmış sözleşmeyi bulmalı:

![Bağlan](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

Kontratla etkileşime geçmeye hazırız. Kontrat arayüzünü vurgulanmış oka basarak aç.

## WAVAX Sözleşmesine Sorum Komutları

Biraz AVAX saralım!

`wei`ETH 10^18 küçük birim \(wei\) olarak belirlendiğinden ve AVAX 10^9 değerinde değerler seçicisini \(gigawei\). 1 `gwei`gwei = 10^9 wei = 1 nAVAX.

![Etkileşim](../../../.gitbook/assets/wavax2avax-08-interact.png)

### WAVAX Oluşturmak için AVAX Paket

10 AVAX, paketlemek için, **Değer alanına `10000000000`gir\(10^10\) gwei **gir. Paketi başlatmak için, Depoya ****tıklayın. Remix tarafından işlem için bir an önce will **Teyit **Metamask ortaya çıkacaktır, doğrulama da isteyecektir. **in da basın **bildirisi. AVAX dengenizin 10 seviyesinde düştüğünü fark etmelisiniz. Ayrıca ücret miktarı da. in your görmek için bir sonraki bölüme geç.

## to WAVAX Ekle

WAVAX dengesini görmek için to özel bir işaret olarak WAVAX eklemelisiniz. In hesabınızın yanındaki üç noktaları seçin ve `Expand View`seçin. Bu yeni bir tarayıcı sekmesi açar. İndir ve işaretini ****seç. **Özel Token **sekmesini geç.

![Özel Token](../../../.gitbook/assets/wavax2avax-10-add-token.png)

**Token Sözleşmeli Adres the daha önce kullandığımız sözleşmeli adresi **yapıştırır:

* Ana ağ için:`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Fuji test ağı için:`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

**Sonraki Tıklayın **ve Tokens ****Ekleyin. Your in hesabında görünür olmalı.

### WAVAX to bağla

**WAVAX, açmak için ok düğmesinin yanındaki **düğmeyi genişlet:

![Geri çekil](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

Ne yazık ki, geri çekilme alanı wei içinde belirlenmiş bu yüzden 10 AVAX geri çekilme miktarı için `10000000000000000000`\(10^19\) olarak temsil edilir. ****İlk önce in ve sonra in aynı doğrulamayı tetikleyecek. AVAX hesabına geri dönmeli, ücret miktarı hariç.

## Sonuç

Avalanche's Avalanche's ile WAVAX ile smart ERC-20 sürümüyle etkileşime girebilirsiniz. Gelecekte, AVAX ve WAVAX arasında dönüşüm önemli ölçüde daha basit olacak, Cüzdan ve değişimlerden oluşan dahili desteği ile, ancak bu süre zarfında hala DeX, köprüler ve Avalanche Platformu üzerindeki diğer Dayanıklılık tabanlı sözleşmelere erişebilirsiniz.

