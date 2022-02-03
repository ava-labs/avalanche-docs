---
sidebar\_position: 8
---
# Auth API

Bir düğüm çalıştırdığınızda, API çağrılarına bir yetkilendirme token'ının iliştirilmesini zorunlu kılabilirsiniz. Bu API, yetkilendirme token'ının yaratılmasını ve iptal edilmesini yönetir.

Bir yetkilendirme token'ı, bir veya birden fazla API son noktasına erişim verir. Bu, bir düğümün API'lerine erişimi yetkilendirmek için kullanışlı bir uygulamadır. Token'ların geçerliliği 12 saat sonra sona erer.

Bir yetkilendirme token'ı bir API çağrısının başlığında belirtilir. Spesifik olarak, `Authorization` başlığında `Bearer TOKEN.GOES.HERE` değeri bulunmalıdır \(burada `TOKEN.GOES.HERE` ibaresi token'la değiştirilir\).

Bu API'ye yalnızca o düğüm [komut satırı argümanı](../references/command-line-interface.md) `--api-auth-required` ile başlıyorsa ulaşılabilir. Eğer düğüm bu CLI olmadan başlıyorsa, API çağrıları yetkilendirme token'ları talep etmez, dolayısıyla bu API'ye ulaşılamaz. Bu API kendisine ulaşılması için hiçbir zaman bir yetkilendirme token'ı talep etmez.

Yetkilendirme token'ı yaratılmasına izin verilmiş olmalıdır. Düğümünüzü `--api-auth-required` ile çalıştırıyorsanız, `--api-auth-password` argümanıyla bir yetkilendirme token'ı parolası da belirtmeniz gerekir. Bu parolayı yetkilendirme token'larını yaratmak/iptal etmek için belirtmek zorundasınız.

Düğümünüzü `--api-auth-required` ile çalıştırıyorsanız, o takdirde MetaMask gibi bazı araçlar düğümünüze API çağrıları yapamayabilirler, çünkü bu araçların bir yetkilendirme token'ı yoktur.

## Format

Bu API `json 2.0`RPC formatını kullanmaktadır. JSON RPC çağrıları yapma hakkında daha fazla bilgi için [buraya](issuing-api-calls.md) bakın.

## Son Nokta

```text
/ext/auth
```

## Metotlar

### auth.newToken

Bir veya birden fazla API son noktasına erişim veren yeni bir yetkilendirme token'ı yaratır.

#### **İmza**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `password`, bu düğümün yetkilendirme token'ı parolasıdır.
* `endpoints`, üretilen token kullanılarak erişilebilen son noktaların bir listesidir. Eğer `endpoints` bir `"*"` elemanı içeriyorsa, üretilen token herhangi bir API son noktasına erişebilir.
* `token`, yetkilendirme token'ıdır.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.newToken",
    "params":{
        "password":"YOUR PASSWORD GOES HERE",
        "endpoints":["/ext/bc/X", "/ext/info"]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

Bu çağrı, API son noktaları `/ext/bc/X`'ya \(örn. X-Chain\) ve `/ext/info`'ya \(örn. [info API\)](info-api.md) erişime imkan veren bir yetkilendirme token'ı üretir.

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

Bu yetkilendirme token'ı, `Authorization` başlığına `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps` değeri verilerek API çağrılarına dahil edilmiş olmalıdır.

Örneğin, bu token ile [`info.peers`](info-api.md#info-peers)'i çağırmak için:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' 127.0.0.1:9650/ext/info \
-H 'content-type:application/json;' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps'
```

### auth.revokeToken

Daha önce üretilmiş bir token'ı iptal edin. İlgili token artık herhangi bir son noktaya erişim vermeyecektir. Token geçersiz ise, hiçbir şey yapmaz.

#### **İmza**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `password`, bu düğümün yetkilendirme token'ı parolasıdır.
* `token`, iptal edilen yetkilendirme token'ıdır.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.revokeToken",
    "params":{
        "password":"123",
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTMxNzIzMjh9.qZVNhH6AMQ_LpbXnPbTFEL6Vm5EM5FLU-VEKpYBH3k4"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

### auth.changePassword

Bu düğümün yetkilendirme token'ı parolasını değiştirin. Eski bir parola altında yaratılmış yetkilendirme token'ları geçersiz hale gelecektir.

#### **İmza**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword`, bu düğümün güncel yetkilendirme token'ı parolasıdır.
* `newPassword`, bu düğümün bu API çağrısından sonraki yeni yetkilendirme token'ı parolasıdır. 1 ile 1024 karakter arasında olmalıdır.

#### **Örnek Çağrı**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "auth.changePassword",
    "params":{
        "oldPassword":"OLD PASSWORD HERE",
        "newPassword":"NEW PASSWORD HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/auth
```

#### **Örnek Yanıt**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

