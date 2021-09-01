# Avash

Avash, Avalanche ağları üzerinde çalışmakta ve test etmek için kullanılan geçici bir kabuk yürütme ortamıdır. Avash tarafından yerel olarak konuşlandırılan Avalanche düğümleri Avash çıkışında çıkarılır.

Avash, in bir dizi kabuk komutu çalıştırabilen Lua senaryolarını çalıştırma yeteneğini sağlar. Bu durum görevlerin otomasyon yapılmasına olanak sağlar. Örneğin, her düğümün belirli bir yapılandırma olduğu Avalanche düğümlerinden oluşan bir ağ açmak için bir Lua betiği yaratabilir. Bu testleri kolaylaştırır.

## Kurum<a id="installation"></a>

### Gereklilik<a id="requirements"></a>

* Golang 1. 15.5 veya daha sonra
* AvalancheGo

### Hızlı Setup<a id="quick-setup"></a>

Avash: indirmek ve inşa etmek için:

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Avash çalıştırmak ve 5 nod izleme ağı çalıştırmak için:

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## Yapılandırma<a id="configuration"></a>

Avash önceden yapılmış bir yapılandırma dosyası olmadan While kabuğun küresel ayarlarını tweaking atmak için bir seçenek olarak kullanılabilir. `$HOME`Avash `.avash.yaml`dizinde öntanımlı olarak arayacaktır, ancak `--config`bayrak aramak için özel yapılandırma a ayarlamak için kullanılabilir.

Aşağıda bir Avash yapılandırma dosyası biçimi vardır:

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

Alan argümanları şöyle tanımlanır:

* `<filepath>`- Dosya için tam bir yol. Örnek Olarak:`/home/username/file.txt`
* `<directory>`- Bir dizine tam bir yol. Örnek Olarak:`/home/username/folder`
* `<log-level>`- Kayıtlı mesajları filtrelemek için geçerli bir kayıt seviyesi. Birinden biri olmalı:`{verbo, debug, info, warn, error, fatal, off}`

### - Tarlalar<a id="fields"></a>

**Çığlık konumu**

```text
Path to AvalancheGo binary.

Type:
  optional, <filepath>

Default:
  $GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego
```

**datadir**

```text
Path to store Avash data at.

Type:
  optional, <directory>

Default:
  $GOPATH/src/github.com/ava-labs/avash/stash
```

**log. terminal**

```text
Log level for messages logged to terminal.

Type:
  optional, <log-level>

Default:
  info
```

**log. logfile**

```text
Log level for messages logged to log files.

Type:
  optional, <log-level>

Default:
  info
```

**log. dir**

```text
Path to put log directory at.

Type:
  optional, <directory>

Default:
  <datadir>/logs
```

## Avash kullanıyor<a id="using-avash"></a>

### Bir kabuk açıyor<a id="opening-a-shell"></a>

`./avash`of yeni bir örneğini başlat.

Mevcut komutları görmek `help`için koşun.

`help [command]`Bu komutun seçenekleri için başvurun.

Eski :

```text
help procmanager
help procmanager start
```

### Emirler<a id="commands"></a>

Avash şu kök komutlarıyla geliyor:

* `avawallet`- Ağ üzerindeki Avalanche ödemeleriyle etkileşime girme araçları.
* `callrpc`- Bir RPC çağrısı bir düğüme ulaştı.
* `exit`- Kabuğu çıkar.
* `help`- Metin yardımcı görüntüler.
* `network`- Uzaktan kumandayla bağlantı kurmak için araçlar.
* `procmanager`- Avash işlem yöneticisiyle etkileşim.
* `runscript`- Yazılı senaryoyu çalıştırıyor.
* `setoutput`- Kabuk kütük çıkışını ayarlar.
* `startnode`- Düğmeye başlıyor.
* `varstore`- Değişken mağazalar oluşturmak ve onların içinde basım değişkenleri oluşturmak için araçlar.

Bu tablo anahtarını kullanarak enumerated edilebilir veya otomatik olarak tamamlanabilir ve aşağıda detaylı olarak açıklanabilir.

**Avawallet**

****Bu cüzdan belleğe tutulur ve tüm veriler çıkışta silinir. Bu sadece test için kullanılmalı.

```text
Tools for interacting with Avalanche Payments over the network. Using this
    command we can create, send, and get the status of a transaction.

Usage:
  avash avawallet [command] [flags]

Available Commands:
  addkey      Adds a private key to a wallet.
  balance     Checks the balance of an address from a node.
  compare     Compares the UTXO set between two wallets.
  create      Creates a wallet.
  maketx      Creates a signed transaction.
  newkey      Creates a random private key.
  refresh     Refreshes UTXO set from node.
  remove      Removes a transaction from a wallet's UTXO set.
  send        Sends a transaction to a node.
  spend       Spends a transaction from a wallet's UTXO set.
  status      Checks the status of a transaction on a node.
  writeutxo   Writes the UTXO set to a file.
```

**Callrpc**

```text
Issues an RPC call to a node endpoint for the specified method and params.
    Response is saved to the local varstore.

Usage:
  callrpc [node name] [endpoint] [method] [JSON params] [var scope] [var name]
```

**Çıkış**

```text
Exit the shell, attempting to gracefully stop all processes first.

Usage:
  avash exit
```

**Yardım edin**

```text
Help provides help for any command in the application.
Simply type avash help [path to command] for full details.

Usage:
  avash help [command] [flags]
```

**Ağ**

```text
Tools for interfacing with remote hosts. Using this command we can
  deploy and remove node networks via SSH and a configuration file.

Usage:
  avash network [command] [flags]

Available Commands:
  deploy      Deploys a remote network of nodes.
  remove      Removes a remote network of nodes.
```

**- YAPILANDIRMA**

Ağları yerleştirmek ve kaldırmak için bir `.yaml`ağ yapılandırma dosyası gereklidir. Avash kod tabanında bir örnek [`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml)sağlanır, aşağıdaki biçime sahip olmalıdır:

```text
# List of hosts
hosts:
  - user: <SSH-username>
    ip: <host-IP>
    # List of nodes
    nodes:
     - name: <node-name>
       # Set of node CLI flags
       flags:
        <CLI-flag>: <value>
        # ...
```

Bu durum birçok konakçıya eş zamanlı olarak birçok düğüm yerleştirmek için kullanılabilir. Burada CLI bayrakları listesi [bulunabilir](https://docs.avax.network/build/references/command-line-interface).

**Procmanager**

```text
Used to list, stop, and start nodes.

Usage:
  avash procmanager [command] [flags]

Available Commands:
  kill        Kills the process named if currently running.
  killall     Kills all processes if currently running.
  list        Lists the processes currently running.
  metadata    Prints the metadata associated with the node name.
  remove      Removes the process named.
  start       Starts the process named if not currently running.
  startall    Starts all processes if currently stopped.
  stop        Stops the process named if currently running.
  stopall     Stops all processes if currently running.
```

**Runscript**

```text
Runs the script provided in the argument, relative to the present working directory.

Usage:
  avash runscript [script file] [flags]
```

**- Setoutput**

```text
Sets the log level of a specific log output type.

Usage:
  avash setoutput [log output] [log level]
```

**Başla**

```text
Starts an Avalanche client node using procmanager and gives it a name. Example:

startnode MyNode1 --public-ip=127.0.0.1 --staking-port=9651 --http-port=9650 ...

Usage:
  avash startnode [node name] args... [flags]
```

**varstore**

```text
Tools for creating variable stores and printing variables within them.
Using this command we can create variable stores, list all variables they store, and print data placed into these stores.

Usage:
  avash varstore [command] [flags]

Available Commands:
  create      Creates a variable store.
  list        Lists all stores. If store provided, lists all variables in the store.
  print       Prints a variable that is within the store.
  set         Sets a simple variable that within the store.
  storedump   Writes the store to a file.
  vardump     Writes the variable to a file.
```

## Yazılım<a id="writing-scripts"></a>

Avash Lua senaryolarını çalıştırmak için [gopher-lua](https://github.com/yuin/gopher-lua) kullanıyor. Yazıtlar, kullanıcının mevcut Avash ortamını içeren kod yazmasına izin vermek için kancalar kullanabilir.

to ulaşabildiğimiz fonksiyonlar şunlardır:

* `avash_call`- Bir ipi alır ve Avash komutu olarak çalıştırır, çıkışı geri verir.
* `avash_sleepmicro`- İmzasız bir sayı alır microseconds temsil eder ve uzun süre uyur.
* `avash_setvar`- Değişken bir kapsamı \(dizi\), değişken bir isim \(dizi\) ve değişken \(dizi\) alır ve onu değişken mağazaya yerleştirir. Bu kapsama çoktan yaratılmış olmalı.

Lua metinlerini yazarken standart Lua işlevselliği Avash komutları serisinin uygulanmasını otomatikleştirmek için kullanılabilir. Bu, geliştiriciye otomatik olarak izin verir:

* Yerel ağ deployments
* Aktarımlar Gönderiliyor
* İşlem test dosyalarını ayarla
* UTXO setlerinin değerini diske kaydet ve test sonuçlarını
* İki düğümlü UTXO setinin değerlerini karşılaştır
* Beklenen sonuçlar ve onları gerçek düğümlerle karşılaştır.

Örnek Lua betikleri [`scripts`dizinde](https://github.com/ava-labs/avash/tree/master/scripts) bulunmaktadır.

