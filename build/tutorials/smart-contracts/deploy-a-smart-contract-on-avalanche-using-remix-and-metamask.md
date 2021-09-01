# Avalanche ve MetaMask Kullanılarak Akıllı Bir Sözleşme Gönder

## Tanıştırma

![Ana Ağ](../../../.gitbook/assets/image%20%2821%29.png)

Avalanche's Primary Network, üç zincir içeren bir alt ağdır: P-Chain, X-Chain ve C-Chain. C-Chain, Avalanche’s Snowman uzlaşma protokolü tarafından çalışan Ethereum Sanal Makinesi'nin bir örneğidir. [C-Chain RPC](../../avalanchego-apis/contract-chain-c-chain-api.md) tipik bir Ethereum istemcisinin Ethereum standart RPC aramalarını kullanarak yapabildiği her şeyi yapabilir. Ethereum yerine C-Chain kullanmanın hemen faydaları C-Chain kullanımına yararlar. Bu özellikler DApps performansını ve kullanıcı deneyimini önemli ölçüde artırabilir.

Bugün, Remix ve on kullanarak Avalanche hakkında akıllı bir anlaşma yapacağız.

## Adım 1: MetaMask Ayarlanıyor@ info: whatsthis

MetaMask - > Ağ Düşürme - > Özel RPC Seçin

![Metamask ağı düşüşü](../../../.gitbook/assets/image%20%2860%29.png)

#### **Avalanche Mainnet Ayarları:**

* **Ağ **Adı: Avalanche Mainnet C-Chain
* **Yeni RPC **URL: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* ****ZincirI:`43114`
* ****Sembol:`AVAX`
* **Explorer: **[Explorer:](https://cchain.explorer.avax.network/)

#### **FUJI Testnet Ayarları:**

* **Ağ **Adı: Avalanche FUJI C-Chain
* **Yeni RPC **[URL:](https://api.avax-test.network/ext/bc/C/rpc)
* ****ZincirI:`43113`
* ****Sembol:`AVAX`
* **Explorer: **[Explorer:](https://cchain.explorer.avax-test.network/)

#### **Yerel Testnet \(AVASH\) Ayarları: **[\(Avash Özel Özel](../../tools/avash.md) Bölüm\)

* **Ağ **Adı: Avalanche Yerel
* **Yeni RPC URL:[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc) **9650/ext/bc/C/rpc
* ****ZincirI:`43112`
* ****Sembol:`AVAX`
* ****Kaşif: N/A

## Adım 2: C-Chain adresinizi finanse ediyor.

### **Çalınca Cüzdanı Kullanıyor**

Ana ağda, from C-Chain adresinize para aktarmak için [Avalanche Cüzdan](https://wallet.avax.network/) kullanabilirsiniz. Bu [özel ders](../platform/transfer-avax-between-x-chain-and-c-chain.md) için de açıklandığı gibi işlem basittir. Cüzdan test ve yerel ağlarda da kullanılabilir.

### **Test Ağı Faucet Kullanıyor**

Test ağındaki finansman için, Test Ağı the kullanabilirsiniz. [https://faucet.avax-test.network/](https://faucet.avax-test.network/) / ve C-Chain adresinizi yapıştırın. Faucet test AVAX to göndermesi gerektiğini otomatik olarak bilecek. captcha kontrol kutusuna tıklayın ve 'İstek AVAX' düğmesini seçin. Adresiniz birkaç saniye içinde test AVAX alacak.

### Yerel testnet fonunu

Yerel bir ağda, adreslerinizi takip ederek kolayca finanse [edebilirsiniz](../platform/create-a-local-test-network.md#getting-avax).

## Adım 3: MetaMask bağla ve Remix kullanarak akıllı bir sözleşme gönder.

[Remix](https://remix.ethereum.org/) -> Katı Seçin

![Remix dosya kaşifi](../../../.gitbook/assets/remix-file-explorer.png)

Remix dosya kaşifi kullanarak derlemek ve dağıtmak istediğimiz akıllı sözleşmeleri yükle.

Bu örnekle, [from](https://openzeppelin.com/contracts) bir ERC20 sözleşmesi yayınlayacağız.

![ERC20 Sözleşmesi](../../../.gitbook/assets/erc20-contract.png)

Sekme -> Göndermek için Yönlendirme "ÇEVRE" indirilmesini aç ve Enjekte Web3'ü seçin \(make yüklendiğinden emin olun\)

![İşlemleri çalıştır ve çalıştır](../../../.gitbook/assets/deploy-and-run-transactions.png)

Web 3-> enjekte ettiğimizde derleyiciye geri dön ve seçili kontratı -> compiler, Tab Gönderme

![Katı derleyici](../../../.gitbook/assets/solidity-compiler.png)

Akıllı kontrat derlenmiştir, MetaMask enjekte edildi ve ERC20'yi yerleştirmeye hazırız. "Deploy." tıklayın.

![erc20 gönderin](../../../.gitbook/assets/deploy-erc20.png)

MetaMask ile ilgili işlemleri doğrula.

![ERC20 doğrulama](../../../.gitbook/assets/confirm-erc20.png)

Sözleşmemiz başarılı bir şekilde yapıldı!

![Yayın metadata](../../../.gitbook/assets/published-metadata.png)

Şimdi, "Deployed Contracts" sekmesinden seçerek genişletip test edebiliriz.

![Sözleşmeyle etkileşim](../../../.gitbook/assets/interact-with-contract.png)

ABI ve Bytecode sözleşmesi derleyici sekmesinde mevcuttur.

![ABI bytecode](../../../.gitbook/assets/abi-bytecode.png)

Bu dersi takip etmek ya da sadece Avalanche bizimle konuşmak istersen [at](https://chat.avalabs.org/) topluluğumuza katılabilirsin!

