# API

Bir düğümü çalıştırdığınızda, API çağrılarının bir yetki işaretine sahip olması gerekebilir. Bu API yetki işaretlerinin oluşturulmasını ve kaldırılmasını yönetir.

Bir yetki işareti bir veya daha fazla API uç noktalarına erişim sağlar. Bu bir node’s node’s erişimi için kullanışlıdır. Tokatların süresi 12 saat sonra doluyor.

Bir API çağrısının başında bir yetki işareti bulunur. Başlık değer `Bearer TOKEN.GOES.HERE`\(burada işaretle `Authorization``TOKEN.GOES.HERE`değiştirilir\).

Bu API sadece [komut satırı](../references/command-line-interface.md) argümanıyla başlaması halinde `--api-auth-required`erişilebilir. Eğer düğüm bu without başlatılırsa, API çağrıları izin işaretlerine ihtiyaç duymaz, bu API erişilebilir değildir. Bu API'ye ulaşılması için izin verilmesi gerekmez.

İzinli gösterge oluşturulması izin verilmelidir. Eğer your `--api-auth-required`çalıştırırsanız, argüman ile bir yetki işaretli parolası `--api-auth-password`belirtmelisiniz. Bu parolayı oluşturmak için vermelisiniz.

Eğer your o `--api-auth-required`zaman MetaMask gibi bazı araçlar sizin your API çağrıları that dikkat edin, çünkü onlarda doğrulama işareti yok.

## Format

Bu API, `json 2.0`RPC formatını kullanır. JSON RPC arama yapmak için daha fazla bilgi için, [buraya](issuing-api-calls.md) bakın.

## Sonucu noktası

```text
/ext/auth
```

## Yöntemler

### - auth.newToken

Bir veya daha fazla API uç noktalarına erişimi sağlayan yeni bir yetki işareti oluşturur.

#### **İmzalanma**

```cpp
auth.newToken(
    {
        password: string,
        endpoints: []string
    }
) -> {token: string}
```

* `password`Bu düğümün izin işaretleme parolası.
* `endpoints`Bu liste oluşturulan token. kullanılarak erişilebilir olan son noktalar listesidir. Eğer bir element `endpoints`içeriyorsa, üretilen token herhangi API uç `"*"`noktasına erişebilir.
* `token`Bu izin işareti.

#### **Örnek Example**

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

`/ext/info`Bu arama [API](info-api.md) uç noktalarına \(X zincirini ie ie `/ext/bc/X`the X-Chain\) erişimi sağlayan bir yetki işareti oluşturacaktır.

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps"
    },
    "id": 1
}
```

Bu yetki işareti, başlık `Authorization`değeri vererek API çağrılarına dahil edilmelidir.`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps`

Örneğin, bu [`info.peers`](info-api.md#info-peers)işaretle çağırmak:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' 127.0.0.1:9650/ext/info \
-H 'content-type:application/json;' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbmRwb2ludHMiOlsiKiJdLCJleHAiOjE1OTM0NzU4OTR9.Cqo7TraN_CFN13q3ae4GRJCMgd8ZOlQwBzyC29M6Aps'
```

### - ...geri auth.revokeToken

Daha önce üretilen bir jetonu kaldırın. Verilen token artık hiçbir uç noktasına erişim izni vermeyecek. Eğer işaret geçersizse, hiçbir şey yapmaz.

#### **İmzalanma**

```cpp
auth.revokeToken(
    {
        password: string,
        token: string
    }
) -> {success: bool}
```

* `password`Bu düğümün izin işaretleme parolası.
* `token`Bu izin işaretinin iptal edilmesi.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

### - auth.changePassword

Bu düğümün izin işaretleme parolasını değiştir. Eski bir parola altında oluşturulan herhangi bir yetki işaretleri geçersiz olacaktır.

#### **İmzalanma**

```cpp
auth.changePassword(
    {
        oldPassword: string,
        newPassword: string
    }
) -> {success: bool}
```

* `oldPassword`Bu düğümün geçerli yetki işaretleme parolası.
* `newPassword`Bu API çağrısından sonra düğümün yeni yetki işaretleme parolası 1 ile 1024 arasında olmalı.

#### **Örnek Example**

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

#### **Örnek Tepki**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "success": true
    },
    "id": 1
}
```

