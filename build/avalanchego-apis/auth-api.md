# API

Bir düğümü çalıştırdığınızda, API çağrılarının bir yetki işaretine sahip olması gerekebilir. Bu API yetki işaretlerinin oluşturulmasını ve kaldırılmasını yönetir.

Bir yetki işareti bir veya daha fazla API uç noktalarına erişim sağlar. Bu bir node’s node’s erişimi için kullanışlıdır. Tokatların süresi 12 saat sonra doluyor.

Bir API çağrısının başında bir yetki işareti bulunur. Başlık `yetkilendirme` `Bearer TOKEN.GOES.HERE` (nerede `TOKEN.GOES.HERE` ile TOKEN.GOES.HERE

Bu API sadece [komut satırı](../references/command-line-interface.md) argümanıyla başlatılırsa `erişilebilir-- api--` Eğer düğüm bu without başlatılırsa, API çağrıları izin işaretlerine ihtiyaç duymaz, bu API erişilebilir değildir. Bu API'ye ulaşılması için izin verilmesi gerekmez.

İzinli gösterge oluşturulması izin verilmelidir. Eğer your `--api-auth-required`, `--api--` Bu parolayı oluşturmak için vermelisiniz.

Eğer your `--api-auth-required` i gerektiren ile çalıştırırsanız MetaMask gibi bazı araçlar sizin your API çağrıları may not edin. Çünkü onlarda doğrulama işareti yok.

## Format

Bu API, `json 2.0` RPC formatını kullanır. JSON RPC arama yapmak için daha fazla bilgi için, [buraya](issuing-api-calls.md) bakın.

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

* `Şifre` bu düğümün izin işaretleme parolasıdır.
* `Sonucu noktaları` oluşturulan token. kullanılarak erişilebilir olan son noktaları listesidir. `Eğer uç` noktalarında `bir` element içeriyorsa, üretilen token herhangi API uç noktasına erişebilir.
* `Geyik` izin işaretidir.

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

Bu çağrı, API sonları `/ ext/bc/X` \(ie the X-Chain\) ve `/ext/info` \(ie the [info API](info-api.md)'ye erişimi sağlayan bir yetki işareti oluşturacaktır. \)

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

Bu yetki işareti, `başlık yetki` değeri `Bearer eyJbGciOiJIUzI1NiISInR5cCI6IkpXCCJ9.eyJbbmRwb2ludHMiOlsiKiJdLCCJLEHAiOjE1OTM0NzU4OTR9` vererek API çağrılarına dahil edilmelidir. Cqo7TraN_CFN13q3ae4GRCMd8ZOlQwBzyC29M6Aps.

Örneğin, [`bu`](info-api.md#info-peers) simge ile bilgi paylaşımlarını çağırmak:

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

* `Şifre` bu düğümün izin işaretleme parolasıdır.
* `token` onaylama işaretinin iptal edilmesidir.

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

* `Bu` şifre bu düğümün geçerli yetki işaretleme parolasıdır.
* `Bu` API çağrısından sonra yeni izin işaretleme şifresidir. 1 ile 1024 arasında olmalı.

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

