# MetaMask Programlamalı Olarak Çığ Ekle

to yeni ağlar eklemek teknik olarak somut olmayan insanlar için önemsiz bir görev değildir ve hata eğilimi olabilir. Kullanıcıların uygulamanıza daha kolay yüklenmesine yardımcı olmak için bu süreci mümkün olduğunca basitleştirmek yararlıdır. Bu özel ders ön uç uygulamasında nasıl basit bir düğme inşa edileceğini gösterecektir. Böylece Avalanche ağı to ekleme sürecini otomatik olarak ayarlayacak.

## EIP-3038 & MetaMask

[EIP-3038](https://eips.ethereum.org/EIPS/eip-3085), Cüzdan uygulamalarına Ethereum uyumlu zincirler eklemek için bir RPC metodu tanımlayan [Ethereum Geliştirme](https://eips.ethereum.org/) Teklifidir.

Mart 2021'den beri Metamask Metamask [Custom Networks API](https://consensys.net/blog/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api/)'nin bir parçası olarak EIP uyguladı.

Bakalım nasıl olacak.

## Veri yapıları

Avalanche ağını to eklemek için gerekli tüm verileri içerecek veri yapılarını hazırlamalıyız.

Ana ağ verileri:

```javascript
export const AVALANCHE_MAINNET_PARAMS = {
    chainId: '43114',
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/']
}
```

Test ağ verileri:

```javascript
export const AVALANCHE_TESTNET_PARAMS = {
    chainId: '43113',
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
}
```

## Ağ ekliyor

Ağı to eklemek için web3 sağlayıcısı tarafından açığa çıkan `wallet_addEthereumChain` yöntemini çağırmalıyız.

```javascript
  function addAvalancheNetwork() {
    injected.getProvider().then(provider => {
      provider
        .request({
          method: 'wallet_addEthereumChain',
          params: [AVALANCHE_MAINNET_PARAMS]
        })
        .catch((error: any) => {
          console.log(error)
        })
    })
  }
```

`Enjekte edilen` yerde MetaMask API'leri arayüze sokmak için kullanılan `bir web3 reaksiyon/enjekte edilmiş konektör` olarak başlatılır. Diğer popüler web çerçeveleri için kullanım benzerdir. `AVALANCHE_MAINNET_PARAMS` test ağını eklemek istiyorsanız `AVALANCHE_TESTNET_PARAMS` ile değiştirin.

Tipik kullanım deseni, to bağlantı kurmaya çalışırken yanlış `Ağ` veya hata `bağlanması` durumunda bu metodu arayan bir düğmeyi ortaya çıkarmak olacaktır.

## Kullanıcı deneyimi

Kullanıcılar dapp's web sitesine ilk geldiğinde to bağlantıyı onaylamak zorundalar. Bunu yaptıktan sonra, başarılı bir web ağ bağlantısı tespit edemezseniz yeni bir ağa geçişi onaylamalarını isteyen bir diyalog ile sunabilirsiniz:

![Yanlış ağ](../../../.gitbook/assets/add-avalanche-to-metamask-01-wrong-network.png)

Düğmeye basarlarsa, from yeni ağ eklemek için onay isteyen bir diyalog gösterilir:

![Bir ağ ekle](../../../.gitbook/assets/add-avalanche-to-metamask-02-add-network.png)

Eğer onaylarlarsa, uygulamanız Avalanche ağına bağlanacaktır. Çok kolay, herhangi bir veri girişi veya yanlış veri girişi için hiç bir şeye gerek yok. Ve bu kadar, kullanıcılar your etkileşime girmeye hazır!

## Sonuç

Dapps kullanıcıları genellikle teknik olarak çok sofistike değildir ve onlara binmek mümkün olduğunca dikişsiz ve kolay olmalıdır. to yeni bir ağ eklemek potansiyel kullanıcılarının belli bir yüzdesinden daha büyük bir engeldir. Bu gereksinimi kaldırmak, deneyimlerini artıracak ve daha fazla kullanıcının your kullanmasını sağlayacak basit bir adımdır.

Eğer herhangi bir sorunuz varsa, sorununuz ya da geliştirici topluluğumuza katılmak istiyorsanız [Discord](https://chat.avalabs.org/) sunucumuzla iletişime geçebilirsiniz.

