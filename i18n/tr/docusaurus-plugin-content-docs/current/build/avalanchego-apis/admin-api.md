---
sidebar\_position: 7
---
# Admin API

Bu API, düğüm sağlığını ölçmek ve hata ayıklamak için kullanılabilir. Güvenlik nedenleriyle Admin API'nin varsayılan olarak devre dışı bırakıldığını aklınızda bulundurun. Admin API etkinleştirilmiş durumdayken bir düğümü çalıştırmak için [komut satırı argümanı](../references/command-line-interface.md) `--api-admin-enabled=true`'yi kullanın.

## Format

Bu API `json 2.0`RPC formatını kullanmaktadır. Ayrıntılar için [buraya](issuing-api-calls.md) bakın.

## Son Nokta

```text
/ext/admin
```

## API Metotları

### admin.alias

Bir API son noktasına, o API için farklı bir son nokta olacak bir alias atayın. Orijinal son nokta yine de çalışacaktır. Bu değişiklik yalnızca bu düğümü etkiler; diğer düğümler bu alias'ı bilmeyecektir.

#### **İmza**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint`, API'nin orijinal son noktasıdır. `endpoint`, son noktanın sadece `/ext/`'den sonraki kısmını içermelidir.
* Alias verilen API şimdi `ext/alias`'ta çağrılabilir.
* `alias` en fazla 512 karakter olabilir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Şimdi, X-Chain'e yapılan çağrılar ya `/ext/bc/X`'e ya da, onun eşdeğeri olarak, `/ext/myAlias`'a yapılabilir.

### admin.aliasChain

Bir blok zincire, o blok zincirin kimliğinin kullanıldığı herhangi bir yerde kullanılabilecek farklı bir ad olan bir alias verin.

#### **İmza**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chain`, blok zincirin kimliğidir.
* `alias`, şimdi blok zincirin kimliği yerine kullanılabilir \(mesela API son noktalarında\).

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Şimdi, kimliği `sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM` olan blok zincirle `/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`'ye API çağrıları yapmak suretiyle etkileşimde bulunmak yerine, `ext/bc/myBlockchainAlias`'ye de çağrılar yapılabilir.

### admin.getChainAliases

Zincirin alias'larını döndürür

#### **İmza**

```text
admin.getChainAliases(
    {
        chain:string
    }
) -> {aliases:string[]}
```

* `chain`, blok zincirin kimliğidir.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### admin.getLoggerLevel

Günlük kayıtçılarının \(logger\) günlük ve görüntüleme düzeylerini döndürür.

#### **İmza**

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

* `loggerName`, döndürülecek günlük kayıtçısının adıdır. Bu, isteğe bağlı bir argümandır. Belirtilmezse, olası tüm günlük kayıtçılarını döndürür.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

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

### admin.lockProfile

Mutex istatistiklerinin bir profilini `lock.profile`'a yazar.

#### **İmza**

```text
admin.lockProfile() -> {success:bool}
```

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.memoryProfile

`mem.profile`'a bir bellek profili yazar.

#### **İmza**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.setLoggerLevel

Günlük kayıtçılarının günlük ve görüntüleme düzeylerini ayarlar.

#### **İmza**

```text
admin.setLoggerLevel(
    {
        loggerName: string, // optional
        logLevel: string, // optional
        displayLevel: string, // optional
    }
) -> {success:bool}
```

* `loggerName`, değiştirilecek günlük kayıtçısı adıdır. Bu, isteğe bağlı bir parametredir. Belirtilmezse, olası tüm günlük kayıtçılarını değiştirir.
* `logLevel`, yazılı günlüklerin günlük düzeyidir, atlanabilir.
* `displayLevel`, görüntülenen günlüklerin günlük düzeyidir, atlanabilir.

`logLevel` ve `displayLevel` aynı anda atlanamaz.

#### **Örnek Çağrı**

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

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.startCPUProfiler

Düğümün CPU kullanımının profilini oluşturmaya başlayın. Durdurmak için `admin.stopCPUProfiler` komutunu çağırın. Durduğunda, profili `cpu.profile`'a yazar.

#### **İmza**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.StopCPUProfiler

Daha önce başlatılan CPU profilini durdurun.

#### **İmza**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Örnek Çağrı**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Örnek Yanıt**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

