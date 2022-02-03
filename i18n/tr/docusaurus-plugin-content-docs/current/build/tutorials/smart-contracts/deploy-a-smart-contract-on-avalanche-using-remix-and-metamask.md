# Avalanche üzerinde Remix ve MetaMask Kullanarak Akıllı Sözleşme Sunun

## Giriş

![Birincil Ağ](/img/image(21).png)

Avalanche'ın Birinci Ağı, üç zincire sahip bir subnet'tir: P-Chain \(Platform Zinciri\), X-Chain \(Exchange Zinciri\) ve C-Chain \(Kontrat Zinciri\). C-Chain \(Kontrat Zinciri\), Avalanche'ın Snowman konsensüs protokolü tarafından desteklenen bir Ethereum Sanal Makinesi instance'ıdır \(oturum\). [C-Chain RPC](../../avalanchego-apis/contract-chain-c-chain-api.md), Ethereum standardı RPC çağrılarını kullanarak tipik bir Ethereum istemcisinin yapabileceği her şeyi yapabilir. Ethereum yerine C-Chain kullanmanın sağladığı doğrudan avantajlar Avalanche kullanmanın sağladığı tüm avantajlardır. Bu özellikler DApp'lerin performansını ve kullanıcı deneyimini önemli ölçüde iyileştirebilir.

Bugün Avalanche üzerinde Remix ve MetaMask kullanarak bir akıllı sözleşme sunacağız \(deploy\) ve bu sözleşmeyi test edeceğiz.

## 1. Adım: MetaMask'ı Ayarlama

MetaMask oturumunu açın -> Network açılır menüsünü tıklayın -> Custom RPC ögesini seçin

![metamask network açılır menüsü](/img/image(60).png)

#### **Avalanche Mainnet \(Ana Ağ\) Ayarları:**

* **Ağ Adı**: Avalanche Mainnet C-Chain
* **Yeni RPC URL'si**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **Zincir Kimliği**: `43114`
* **Sembol**: `AVAX`
* **Tarayıcı**: [https://snowtrace.io/](https://snowtrace.io/)

#### **FUJI Testnet Ayarları:**

* **Ağ Adı**: Avalanche FUJI C-Chain
* **Yeni RPC URL'si**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **Zincir Kimliği**: `43113`
* **Sembol**: `AVAX`
* **Tarayıcı**: [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/)

#### **Yerel Testnet \(AVASH\) Ayarları:** [\(Avash Eğitim Materyali\)](../../tools/avash.md)

* **Ağ Adı**: Avalanche Yerel
* **Yeni RPC URL'si**: [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **Zincir Kimliği**: `43112`
* **Sembol**: `AVAX`
* **Tarayıcı**: Yok

## 2. Adım: C-Chain adresinizi fonlama

### **Avalanche Cüzdan'ı Kullanma**

Ana ağda X-Chain'den C-Chain adresinize fon transfer etmek için [Avalanche Cüzdan](https://wallet.avax.network/)'ı kullanabilirsiniz. Bu işlem, bu [eğitim makalesinde](../platform/transfer-avax-between-x-chain-and-c-chain.md) açıklandığı gibi, basittir. Cüzdan test ağlarında ve yerel ağlarda da kullanılabilir.

### **Test Ağı Musluğunu Kullanmak**

Test ağında fonlama yapmak için Test Ağı Musluğunu \(Test Network Faucet\) kullanabilirsiniz. [https://faucet.avax-test.network/](https://faucet.avax-test.network/) adresine gidin ve C-Chain adresinizi yapıştırın. Musluk, test AVAX'ını C-Chain'e göndermesi gerektiğini otomatik olarak bilecektir. Captcha onay kutusuna tıklayın ve 'Request AVAX' düğmesini tıklayın. Adresinize birkaç saniye içinde test AVAX'ı gelir.

### Yerel test ağında fonlama yapma

Bir yerel ağda [bunu](../platform/create-a-local-test-network.md#getting-avax) takip ederek adreslerinizi kolayca fonlayabilirsiniz.

## 3. Adım: MetaMask'a bağlanma ve Remix aracılığıyla akıllı sözleşme deploy etme

[Remix](https://remix.ethereum.org/)'i açın -> Solidity'yi seçin

![remix dosya tarayıcı](/img/remix-file-explorer.png)

Remix dosya tarayıcısını kullanarak derlemek ve deploy etmek istediğimiz akıllı sözleşmeleri yükleyin veya yaratın.

Bu örnekte [OpenZeppelin](https://openzeppelin.com/contracts) kaynağından bir ERC20 sözleşmesi deploy edeceğiz.

![ERC20 Sözleşmesi](/img/erc20-contract.png)

Deploy Sekmesine gidin -> "ENVIRONMENT" açılır menüsünü açın ve Injected Web3 ögesini seçin \(MetaMask'ın yüklü olduğunu kontrol edin\)

![İşlemleri deploy edip çalıştırın](/img/deploy-and-run-transactions.png)

Web3 eklendikten sonra-> Derleyiciye geri dönün ve seçilen sözleşmeyi derleyin -> Deploy Sekmesine gidin

![Solidity compiler](/img/solidity-compiler.png)

Şimdi akıllı sözleşme derlenmiş ve MetaMask eklenmiş oldu, şimdi ERC20 sözleşmemizi deploy etmeye hazırız. "Deploy" düğmesini tıklayın.

![Deploy erc20](/img/deploy-erc20.png)

MetaMask pop up penceresinde işlemi onaylayın.

![Confirm ERC20](/img/confirm-erc20.png)

Sözleşmemiz başarılı bir şekilde deploy edildi!

![Yayımlanan meta veri](/img/published-metadata.png)

Şimdi "Deployed Contracts" sekmesinden bu sözleşmeyi seçerek genişletebilir ve test edebiliriz.

![Sözleşme ile etkileşim kurun](/img/interact-with-contract.png)

Sözleşme ABI ve Bytecode değerleri derleyici sekmesinde bulunabilir.

![ABI bytecode](/img/abi-bytecode.png)

Bu eğitim makalesini takip etmekte zorluk yaşadıysanız veya sadece Avalanche hakkında bizimle görüşmek istiyorsanız [Discord](https://chat.avalabs.org/)'taki topluluğumuza katılabilirsiniz!

