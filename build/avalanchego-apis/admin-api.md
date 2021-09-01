# API yönetir

Bu API şifre ölçümü ve hata hattını ölçmek için kullanılabilir. Admin API'nin güvenlik nedenleri yüzünden varsayılan olarak devre dışı bırakıldığını unutmayın. Admin API etkinleştirilebilir bir düğüm çalıştırmak için [komut satırı argümanı](../references/command-line-interface.md) `--api-admin-enabled=true`kullanın.

## Format

Bu API, `json 2.0`RPC formatını kullanır.

{% page-ref page="issuing-api-calls.md" %}

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

* `endpoint`API'nin orijinal sonucudur. Sadece sonun sonrasını `endpoint`içermelidir.`/ext/`
* API takma adıyla adlandırılabilir `ext/alias`artık.
* `alias`En fazla 512 karakter olabilir.

#### **Örnek Example**

```bash
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

to yapılan aramalar ya `/ext/bc/X`da eşdeğer olarak yapılabilir.`/ext/myAlias`

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

* `chain`blockchain’s kimliği.
* `alias`Bu nedenle bu sistem \(API sonları olarak\) olarak kullanılabilir \(örneğin API sonları olarak\)

#### **Örnek Example**

```bash
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

`sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`Kimliği API aramakla olan blok zinciriyle etkileşime girmek yerine, `/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`aynı zamanda telefon görüşmesi yapabilir.`ext/bc/myBlockchainAlias`

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

* `chain`blockchain’s kimliği.

#### **Örnek Example**

```bash
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

### Admin. admin.getLoggerLevel

Günlük ve görüntü seviyeleri kaydedicileri geri getiriyor.

#### **İmzalanma**

```text
admin.getLoggerLevel(
    {
        loggerName:string // optional
    }
) -> {
        loggerLevels: {
            loggerName: {
                    logLevel: string,
                    displayLevel: string
            }
        }
    }
```

* `loggerName`Kayıtlara geri dönecek kişinin adı bu. Bu isteğe bağlı bir tartışma. Eğer belirtilmemişse, tüm olası loggers. geri getirir.

#### **Örnek Example**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.getLoggerLevel",
    "params": {
        "loggerName": "C"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Tepki**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "loggerLevels": {
            "C": {
                "logLevel": "DEBUG",
                "displayLevel": "INFO"
            }
        }
    },
    "id": 1
}
```

### Admin. admin.lockProfile

Muteks istatistiklerinin profilini `lock.profile`yazıyordu.

#### **İmzalanma**

```text
admin.lockProfile() -> {success:bool}
```

#### **Örnek Example**

```bash
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

Bir bellek profili `mem.profile`yazıyor.

#### **İmzalanma**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Örnek Example**

```bash
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

### Admin.setLoggerLevel

Günlük ve görüntü seviyeleri belirler.

#### **İmzalanma**

```text
admin.setLoggerLevel(
    {
        loggerName: string, // optional
        logLevel: string, // optional
        displayLevel: string, // optional
    }
) -> {success:bool}
```

* `loggerName`the adı değiştirilecek. Bu bir seçeneği işareti. Eğer belirtilmediyse, tüm olası loggers. değiştirir.
* `logLevel`Yazılı günlüklerin günlük seviyesi, atılabilir.
* `displayLevel`Görüntülenen kütüklerin kütük seviyesi, atılabilir.

`logLevel`Aynı anda da `displayLevel`atılamaz.

#### **Örnek Example**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLoggerLevel",
    "params": {
        "loggerName": "C",
        "logLevel": "DEBUG",
        "displayLevel": "INFO"
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

### Admin. admin.startCPUProfiler

Düğümün CPU kullanımını profiling başla. Durmak için, `admin.stopCPUProfiler`ara. Durakta, profili `cpu.profile`yazacak.

#### **İmzalanma**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Örnek Example**

```bash
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

```bash
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

