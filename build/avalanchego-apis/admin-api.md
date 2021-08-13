# API yönetir

Bu API şifre ölçümü ve hata hattını ölçmek için kullanılabilir. Admin API'nin güvenlik nedenleri yüzünden varsayılan olarak devre dışı bırakıldığını unutmayın. Admin API etkinleştirilebilir bir düğüm çalıştırmak için, [komut satırı argümanı](../references/command-line-interface.md) `use =doğru`.

## Format

Bu API, `json 2.0` RPC formatını kullanır.

{% page-ref page="issuing-api-calls.md" page="issuing-api-calls.md" }

## Sonucu noktası

```text
/ext/admin
```

## API Yöntemleri

### admin.alias

API sonlu bir isim belirleyin, API için farklı bir son. Orijinal sonumuz hala işe yarayacak. Bu değişim, sadece bu düğümleri etkiler; diğer düğümler bu takma isimlerden haberdar olmayacaktır.

#### **İmzalanma**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `Sonucu` API'nin orijinal `sonucudur.` Sonucu sadece sonunun `/ext/sonrası` kısmını içermelidir.
* API takma adı artık `soy/takma adıyla` adlandırılabilir.
* `Takma` isimler en çok 512 karakterden oluşabilir.

#### **Örnek Example**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.alias",
    "params": {
        "alias":"myAlias",
        "endpoint":"bc/X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Tepki**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

to yapılan çağrılar ya `/ext/bc/X` ya da benzer şekilde, `/ext/bc/X` yapılabilir.

### admin.aliasChain

Bir blok zinciri takma isim ver, blok zincirinin kimlik kullandıkları herhangi bir yerde kullanılabilecek farklı bir isim ver.

#### **İmzalanma**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `Zincir` blok zincirinin kimliğidir.
* `Takma` isimler şu anda blok zincirinin kimlik (API sonları olarak kullanılabilir) \)

#### **Örnek Example**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.aliasChain",
    "params": {
        "chain":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM",
        "alias":"myBlockchainAlias"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Tepki**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Şimdi, kimliği `sV6o671RtkGBcno1FiaDbVcc2sG5aVXMZYZ4VQAWmJQNM'yi` API çağrıları `yaparak` /ext/bc/sV6o671RtkGBcno1FiaDbccv2sG5aVXMMM, bir kişi de ApI çağrıları yaparak `API` ile etkileşim yapabilir.

### admin.getChainAliases admin.getChainAliases lar

Zincirin takma isimlerini geri getiriyor

#### **İmzalanma**

```text
admin.getChainAliases(
    {
        chain:string
    }
) -> {aliases:string[]}
```

* `Zincir` blok zincirinin kimliğidir.

#### **Örnek Example**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.getChainAliases",
    "params": {
        "chain":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Tepki**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "aliases": [
            "X",
            "avm",
            "2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed"
        ]
    },
    "id": 1
}
```

### Admin. admin.lockProfile

`Profili` kilitlemek için muteks istatistikleri profili yazar.

#### **İmzalanma**

```text
admin.lockProfile() -> {success:bool}
```

#### **Örnek Example**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Tepki**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### Admin. Bellek Profili

`Profilin` bir bellek profilini yazar.

#### **İmzalanma**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Örnek Example**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Tepki**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### Admin. admin.startCPUProfiler

Düğümün CPU kullanımını profiling başla. Durmak için, `yöneticiyi` ara. Durakta, profili `cpu.profile` yazarak yazıyor.

#### **İmzalanma**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Örnek Example**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Tepki**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### Admin. admin.stopCPUProfiler

Daha önce başlatılan CPU profilini durdurun.

#### **İmzalanma**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Örnek Example**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Tepki**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

