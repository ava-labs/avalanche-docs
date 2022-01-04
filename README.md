<div align="center">
  <img src="static/AvalancheLogoRed.png?raw=true">
</div>

---
# Avalanche Dokümanları

## Genel Bakış
Bu yazılım havuzunda, [burada](https://docs.avax.network) kullanıma sunulan belgelerimizin içerikleri mevcuttur.

Bu web sitesi, [Docusaurus 2](https://docusaurus.io/) kullanılarak kurulmuştur.

## Katkı sağlama

Dokümanlar sitesine katkıda bulunmak, Avalanche geliştirici topluluğuna katılmanın harika bir yoludur! İşte başlamak için bilmeniz gereken bazı şeyler.

### İçindekiler
* Tüm dokümanlar [docs](docs) dizininde bulunur.
* Sayfanın sol tarafındaki çubuk, [sidebars.js](sidebars.js) vasıtasıyla kontrol edilir.
* Docusaurus'la ilgili geniş kapsamlı dokümanları [burada](https://docusaurus.io/docs) bulabilirsiniz.

### Pull Request \(PR\) \(Çekme İsteği\)
* Bütün PR'ler \(çekme istekleri\) `master` dalına yapılmalıdır.
* Başarılı bir kurmanın ardından, Cloudflare Pages'de PR hakkında bir açıklama belirecek ve \*.avalanche-docs.pages.dev adresine bir link verilecektir; değişikliklerinizi orada doğrulayabilirsiniz.
* PR'niz `master`'a eklendiğinde,
    [https://docs.avax.network/](https://docs.avax.network/) yaptığınız değişikliklerle güncellenecektir.

### Kurulum

```
$ yarn
```

### Yerel Geliştirme

```
$ yarn start
```

Bu komut yerel bir geliştirme sunucusu başlatır ve bir tarayıcı penceresi açar. Çoğu değişiklik sunucuyu yeniden başlatmaya gerek kalmadan canlı olarak yansıtılır.

### Build \(Oluştur\)

```
$ yarn build
```

Bu komut `build` dizininde statik içerik üretir ve herhangi bir statik içerik barındırma hizmeti kullanılarak sunulabilir.

**Lütfen paketi oluştururken herhangi bir hata olup olmadığını görmek için bu komutu çalıştırdığınızdan emin olun ve değişikliklerinizi göndermeden önce bunları düzeltin.**

## Search \(Ara\)
Arama aracı \(search\), Algolia tarafından desteklenir ve yapılandırma dosyası [burada](https://github.com/algolia/docsearch-configs/blob/master/configs/avax.json) bulunur.