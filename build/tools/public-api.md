# Kamu API

Geliştiricilerin kendi başlarına bir düğüm çalıştırmadan Avalanche ağına erişmelerine izin veren bir halka açık API sunucusu vardır. Kamu API sunucusu aslında yüksek bulunabilirlik ve yüksek talep sağlamak için bir yük dengeleyicisinin arkasında birkaç [AvalancheGo](https://github.com/ava-labs/avalanchego) düğümüdür.

## Kamu API düğümlerini kullanıyor

Kamu API sunucusu Avalanche Mainnet ve `https://api.avax.network/``` Avalanche Testnet için https://api.avax.network/ için https://api.avax.network/ Belirli bir API'ye erişmek için, [sadece](../avalanchego-apis/issuing-api-calls.md) burada belgelendiği gibi ilgili API uç noktasını uygula. Örneğin, X-Chain API çağrılarını gönderecek URL `https://api.avax.network/ext/bc/X`.

## Desteklenen API' ler

API sunucusu [X-Chain](../avalanchego-apis/exchange-chain-x-chain-api.md), [P-Chain](../avalanchego-apis/platform-chain-p-chain-api.md) ve [C-Chain](../avalanchego-apis/contract-chain-c-chain-api.md) için API'ler de dahil olmak üzere halka açık bir hizmet üzerinde makul olan tüm API uç noktalarını destekler. Uygun APIs tam listesi [için burada](../avalanchego-apis/) görüntülenir.

## Yapışkan oturumlar

API sunucusu API'ye yönelik istekler bir yük balancer tarafından bireysel bir düğüme dağıtılır. Sonuç olarak, art arda gelen istekler farklı düğümlere gidebilir. Bu bazı kullanım davaları için sorun yaratabilir. Örneğin, bir düğüm, verilen işlemlerin kabul edildiğini düşünebilir, başka bir düğüm için işlem hala işleme devam ediyor. Bunun üzerinde çalışmak için [burada](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) belgelendiği gibi "yapışkan oturumlar" kullanabilirsiniz. Bu da aynı düğümle yönlendirilmesini sağlar.

Eğer Kamu API'ye ulaşmak için [AvalancheJS](avalanchejs/) kullanıyorsanız, basitçe kodunuzu belirleyin:

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## - Müsaitlik

Kamu API düğümlerinin kullanımı ücretsiz ve kimlik doğrulama veya yetki olmadan herkese açıktır. Oranın sınırlaması mevcut ama API çağrılarının çoğu bağlantılıdır ve oran sınırları oldukça yüksektir. Eğer başvurunuz sınırlara karşı ilerliyorsa [lütfen bizimle iletişime geçin](https://chat.avalabs.org).

## Destek

Sorularınız varsa, sorunlarınız ya da önerileriniz varsa gelin [bizimle konuşun](https://chat.avalabs.org/).

