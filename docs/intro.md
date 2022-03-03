---
sidebar\_position: 1
slug: /
---

# Avalanche nedir?

## Giriş

[Avalanche](https://avax.network), [merkeziyetsiz uygulamaları](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp) ve kurumsal [blok zincir](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain) konuşlanmalarını karşılıklı işletilebilir, yüksek düzeyde ölçeklenebilir tek bir ekosistemde kullanıma sunmak için tasarlanmış açık kaynaklı bir platformdur. Avalanche, neredeyse anında işlem kesinleştirme hızıyla küresel finans ölçeğinde geliştirilmiş ilk merkeziyetsiz akıllı sözleşmeler platformudur. Ethereum geliştiricileri Avalanche'da hızlı bir şekilde kurulum yapabilirler, çünkü Solidity mükemmel çalışır.

Avalanche ve diğer merkeziyetsiz ağlar arasındaki temel farklardan biri konsensüs protokolüdür. Zamanla insanlar blok zincirlerin yavaş olması ve ölçeklenebilir olmaması gerektiği şeklinde yanlış bir anlayış edindiler. Avalanche protokolü, merkeziyetsizlikten ödün vermeden güçlü güvenlik garantileri, hızlı işlem kesinleştirme ve yüksek iş çıkarma yeteneği sağlamak için konsensüse yeni bir yaklaşım kullanır.

## AVAX

AVAX, Avalanche platformunun yerel tokenıdır. Bu token, ücretler ödemek, staking yoluyla platformun güvenliğini sağlamak ve güvenceye almak ve Avalanche üzerinde yaratılan birden çok subnet arasında temel bir hesap birimi sağlamak için kullanılan sıkı bir arz limitine bağlanmış, nadir bir varlıktır. `1 nAVAX` eşittir `0.000000001 AVAX`.

## Avalanche Konsensüs Protokolü

![Konsensüs Karşılaştırması](/img/Consensus-protocol-comparison.png)

Avalanche ailesindeki protokoller, alt örneklere ayrılmış tekrarlayan oylama yoluyla işler. Bir [doğrulayıcı](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) bir [işlemin](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) kabul edilmesine veya reddedilmesine karar verirken, küçük ve rastgele seçilen bir doğrulayıcı alt kümesine işlemin kabul edilmesi veya reddedilmesi konusunda ne düşündüklerini sorar. Sorgulanan doğrulayıcı işlemin geçersiz olduğunu düşünüyorsa, zaten işlemi reddetmişse veya çatışan bir işleme öncelik tanıyorsa, işlemin reddedilmesi gerektiği kanısında olduğunu belirten bir yanıt gönderir. Aksi takdirde, işlemin kabul edilmesi gerektiği kanısında olduğunu belirten bir yanıt gönderir.

Eğer örneklenen doğrulayıcıların yeterince büyük bir bölümü \(_alfa_ α\) işlemin kabul edilmesi kanısında olduklarını belirten bir yanıt gönderirse, doğrulayıcı işlemi kabul etmeyi tercih eder. Yani, gelecekte işlem hakkında sorgulandığında işlemin kabul edilmesi kanısında olduğunu belirten bir yanıt gönderecektir. Aynı şekilde, doğrulayıcıların yeterince büyük bir bölümü işlemin reddedilmesi kanısında olduklarını belirten bir yanıt gönderirse, doğrulayıcı işlemi reddetmeyi tercih edecektir.

Doğrulayıcı bu örnekleme sürecini, sorgulanan doğrulayıcıların _alfa_ bölümü birbirini izleyen _beta_ β turunda aynı şekilde \(kabul veya ret\) yanıt gönderene kadar tekrarlar.

Yaygın senaryoda, bir işlemin hiçbir çatışması yoksa, işlemin kesinleştirilmesi çok çabuk gerçekleşir. Çatışan işlemler mevcut olduğunda, dürüst doğrulayıcılar hızla çatışan işlemlerin etrafında kümelenerek olumlu geri bildirim döngüsü başlatırlar, ta ki tüm doğru doğrulayıcılar o işlemi tercih edene kadar. Bu, çatışmayan işlemlerin kabul edilmesiyle ve çatışan işlemlerin reddedilmesiyle sonuçlanır.

![Avalanche Konsensüsü Nasıl İşler](/img/howavalancheconsensusworks.png)

Eğer dürüst bir doğrulayıcı bir işlemi kabul veya ret ederse, tüm dürüst doğrulayıcıların o işlemi kabul veya ret etmesi \(sistem parametreleri gereğince yüksek bir olasılıkla\) garanti edilir.

[Teknik dokümanı](https://arxiv.org/pdf/1906.08936.pdf) okuyarak Avalanche konsensüs protokolünün teknik bileşenleri hakkında daha fazla bilgi edinin.

## Snowman Konsensüs Protokolü

Snowman, zincir için optimize edilmiş bir konsensüs protokolüdür -yüksek iş çıkarma yeteneğine sahiptir, tamamen sıralıdır ve zincir ve akıllı sözleşmeler için idealdir. Snowman, [Avalanche konsensüs protokolü](./#avalanche-consensus-protocol) ile desteklenir. Hem [P-Chain](learn/platform-overview/README.md#platform-chain-p-chain) hem de [C-Chain](learn/platform-overview/README.md#contract-chain-c-chain) platformları Snowman konsensüs protokolünü kullanır.

## Önemli Özellikleri

### Hız

Cornell bilgisayar bilimcilerinden oluşan bir ekip tarafından geliştirilmiş yeni bir konsensüs protokolü kullanır ve işlemleri sürekli olarak 1 saniyenin altındaki sürelerde onaylayabilir.

### Ölçeklenebilirlik

Saniyede 4.500 işlem kapasitesine sahiptir -mevcut blok zincirlerden daha büyük bir işlem hacmi.

### Güvenlik

Diğer ağlardaki %51 standardının oldukça üzerinde daha güçlü güvenlik garantileri sağlar.

### Esneklik

Neredeyse her türlü gelişigüzel \(arbitrary\) mantığı içeren kişiselleştirilmiş blok zincirleri ve merkeziyetsiz uygulamaları kolayca oluşturur.

### Sürdürülebilirlik

İş ispatı yerine enerji verimliliği sağlayan pay ispatı konsensüs algoritması kullanır.

### Akıllı Sözleşme Desteği

Solidity tabanlı akıllı sözleşmeler oluşturmayı ve Remix, Metamask, Truffle gibi sevdiğiniz birçok Ethereum aracını destekler.

### Özel ve Genel Blok Zincirler

Kendi genel veya özel blok zincirlerinizi oluşturun.

### Finans için tasarlanmıştır

Dijital akıllı varlıkların kompleks, kişiselleştirilmiş kurallarla kolayca oluşturulması ve alınıp satılması için yerel destek.

