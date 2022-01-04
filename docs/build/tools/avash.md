# Avash

Avash, Avalanche ağları üzerinde kurulum ve test yapmak için kullanılan geçici bir kabuk yürütme ortamıdır. Avash tarafından kurulmuş Avalanche düğümleri, Avash kapatılınca durdurulur.

Avash, üzerinde kabuk komut dizileri yürütebilen Lua betiklerini çalıştırma olanağı sağlar. Bu şekilde görevlerin otomasyonuna olanak tanır. Örneğin, her düğümün belirli yapılandırmalara sahip olduğu Avalanche düğümlerinden oluşan bir ağ kurulumu gerçekleştirmek için bir Lua komut dizisi oluşturulabilir. Test yapmak bu şekilde daha kolay hale gelir.

## Kurulum {#installation}

### Gereksinimler {#requirements}

* Golang 1.16.8 veya yeni
* AvalancheGo

### Hızlı Kurulum {#quick-setup}

Avash'ı indirmek ve kurmak için:

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Avash'ı çalıştırmak ve 5 düğümlü staking ağı kurmak için:

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## Yapılandırma {#configuration}

Her ne kadar Avash önceden oluşturulmuş bir yapılandırma dosyası olmadan kurulabilir ise de, bu seçenek kabuğun genel ayarlarıyla oynamak için sunulur. Avash varsayılanda `$HOME` dizininde `.avash.yaml` dosyasını arayacaktır; ancak `--config` bayrağı özel bir yapılandırma dosya dizinini belirlemek için kullanılabilir.

Aşağıda bir Avash yapılandırma dosyası biçimini bulabilirsiniz:

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

Alan değişkenleri şu şekilde tanımlanmaktadır:

* `<filepath>` - Bir dosya yolunun tam adresi Örnek: `/home/username/file.txt`
* `<directory>` - Bir dizin yolunun tam adresi Örnek: `/home/username/folder`
* `<log-level>` - Günlüğe kaydedilmiş mesajları filtrelemek için geçerli bir günlük kayıt seviyesi. Şunlardan biri olmalıdır: `{verbo, debug, info, warn, error, fatal, off}`

### Alanlar {#fields}

**avalancheLocation**

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

**log.terminal**

```text
Log level for messages logged to terminal.

Type:
  optional, <log-level>

Default:
  info
```

**log.logfile**

```text
Log level for messages logged to log files.

Type:
  optional, <log-level>

Default:
  info
```

**log.dir**

```text
Path to put log directory at.

Type:
  optional, <directory>

Default:
  <datadir>/logs
```

## Avash'ı Kullanma {#using-avash}

### Bir shell açma {#opening-a-shell}

`./avash` ile yeni bir Avash oturumu başlatın.

Uygun komutları görmek için `help` komutunu çalıştırın.

Bu komut için mevcut seçenekler listesini görmek için `help [command]` komutunu çalıştırın.

Örn.:

```text
help procmanager
help procmanager start
```

### Komutlar {#commands}

Avash aşağıdaki kök komutları destekler:

* `avawallet` - Ağ üzerindeki Avalanche Ödemeleri ile etkileşim kurmaya yarayan araçlar.
* `callrpc` - Bir düğüme RPC çağrısı yayınlar.
* `exit` - Kabuktan çıkar.
* `help` - Yardım metnini görüntüler.
* `network` - Uzak sistemlerle arayüz oluşturma araçları.
* `procmanager` - Avash işlem yöneticisi ile etkileşime geçer.
* `runscript` - Verilen komut dizisini çalıştırır.
* `setoutput` - Kabuk günlüğü çıktısını belirler.
* `startnode` - Bir düğüm başlatır.
* `varstore` - Çeşitli depolar oluşturma ve içindeki değişkenlere yazmaya yarayan araçlar.

Bunlar sekme tuşu kullanılarak numaralandırılabilir veya otomatik doldurulabilir. Aşağıda detaylı olarak anlatılmıştır.

**avawallet**

**Uyarı**: Bu cüzdan önbellekte tutulur ve tüm veriler çıkışta silinir. Bu sadece test amacıyla kullanılmalıdır.

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

**callrpc**

```text
Issues an RPC call to a node endpoint for the specified method and params.
    Response is saved to the local varstore.

Usage:
  callrpc [node name] [endpoint] [method] [JSON params] [var scope] [var name]
```

**çıkış**

```text
Exit the shell, attempting to gracefully stop all processes first.

Usage:
  avash exit
```

**yardım**

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

**Yapılandırma**

Ağ kurulumu ve kaldırılması için bir `.yaml` ağ yapılandırma dosyası gereklidir. Avash kod kütüphanesindeki [`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml) içinde bir örnek temin edilmiştir ve şu biçime sahip olmalıdır:

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

Bu, birden fazla sunucu üzerinde aynı anda birden fazla düğüm kurulumu yapmak için kullanılabilir. CLI bayraklarının tam bir listesi [burada](https://docs.avax.network/build/references/command-line-interface) bulunabilir.

**procmanager**

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

**runscript**

```text
Runs the script provided in the argument, relative to the present working directory.

Usage:
  avash runscript [script file] [flags]
```

**setoutput**

```text
Sets the log level of a specific log output type.

Usage:
  avash setoutput [log output] [log level]
```

**startnode**

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

## Scriptler Yazma {#writing-scripts}

Avash, Lua komut dizilerini çalıştırmak için [gopher-lua](https://github.com/yuin/gopher-lua) kullanır. Komut dizileri, kullanıcının mevcut Avash ortamını çalıştıran kodlar yazmasına olanak tanıyan kancalar \(hook\) kullanabilir.

Lua için kullanıma sunulan fonksiyonlar şunlardır:

* `avash_call` - Bir dizgiyi alır ve Avash komutu olarak çalıştırır, çıktısını getirir.
* `avash_sleepmicro` - Mikrosaniye birimini temsil eden bir işaretsiz tamsayıyı alır ve o kadar bir süre boyunca uyku moduna geçer.
* `avash_setvar` - Bir değişken kapsamı \(string\), değişken adı \(string\) ve değişken \(string\) alır, bunları değişken deposuna yerleştirir. Kapsam zaten oluşturulmuş olmalıdır.

Lua komut dizileri yazarken, Avash komut serilerinin çalıştırılmasını otomatikleştirmek için standart Lua işlevselliği kullanılabilir. Bu sayede geliştirici şunları otomatikleştirebilir:

* Yerel ağ kurulumları
* İşlem gönderimleri
* İşlem test vakalarının getirilmesi
* UTXO kümeleri ve test sonuçlarının değerlerinin disk üzerinde kaydedilmesi
* İki düğüm için UTXO kümelerinin değerlerinin karşılaştırılması
* Beklenen sonuçların takip edilmesi ve gerçek düğümlerle karşılaştırılması

Örnek Lua komut dizileri [`scripts`klasöründe](https://github.com/ava-labs/avash/tree/master/scripts) bulunur.

