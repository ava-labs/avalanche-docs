
# ReactJS kullanarak Avalanche'ta bir Oylama dApp'i oluşturun

## Giriş

`create-react-app` kullanarak [ReactJS](https://reactjs.org) boilerplate kodu üretip dApp frontend'imiz \(önyüz\) için modifiye edeceğiz. React, verimli, geliştirici dostu blok zincir etkileşimleri için iyi bir seçenektir. Backend için [Solidity](https://docs.soliditylang.org/en/v0.8.4/) akıllı sözleşmeleri [Truffle Suite](https://www.trufflesuite.com) kullanılarak Avalanche blok zincirine deploy edilecektir.

Truffle Suite, Avalanche gibi Ethereum Sanal Makine \(EVM\) uyumlu blok zincirlerde merkeziyetsiz uygulamaları \(dApp\) kullanıma sunmaya yönelik bir araç kitidir. Truffle ile akıllı sözleşmeler yazabilir ve derleyebilir, yapıtlar oluşturabilir, taşımaları çalıştırabilir ve deploy edilmiş sözleşmeler ile etkileşimde bulunabilirsiniz. Bu eğitim makalesinde Truffle'ın bir EVM instance'ı olan Avalanche C-Chain ile nasıl kullanılabileceği açıklanmaktadır.

## Ön gereklilikler

* [NodeJS](https://nodejs.org/en) ve [npm](https://www.npmjs.com/) hakkındaki temel bilgilere sahip olmak.
* [ReactJS](https://reactjs.org/) hakkındaki temel bilgilere sahip olmak.
* [Avalanche](https://avax.network) ağı, [Solidity](https://docs.soliditylang.org/en/v0.8.6/) ve [Truffle](https://www.trufflesuite.com/truffle) hakkındaki temel bilgilere sahip olmak.

## Gereklilikler

* [NodeJS](https://nodejs.org/en) >= 10.16 ve [npm](https://www.npmjs.com/) >= 5.6 yüklü olmalıdır.
* [Truffle](https://www.trufflesuite.com/truffle), ki `npm install -g truffle` kullanılarak global olarak yüklenebilir
* İnternet tarayıcısına eklenmiş [Metamask](https://metamask.io) uzantısı.

## Çalışma dizininin initialize edilmesi \(ilklendirme\)

dApp'imizin istemci tarafı **ReactJS** kullanılarak oluşturulur. Akıllı sözleşmeler **Solidity** dili kullanılarak oluşturulacak ve **Truffle Suite** ile **Avalanche** ağında deploy edilecektir. Bu nedenle, geliştirme sürecinin sorunsuz olması için çalışma dizinimizi ReactJS ve Truffle'la uyumlu olarak ayarlamamız gerekir.

Bir terminal açın ve uygulamayı oluşturacağımız dizine gidin. Bu dizin normalde kullanıcı ana dizininde \(home directory\) bulunur ama kullanışlı olan herhangi bir konuma da yerleştirilebilir. Çoğu Linux dağıtımlarında bu dizin /home/ olarak değişecektir. macOS'te ise /Users/ olacaktır. Windows'ta kullanıcı dizinleri C:\Users içinde yer alır.

```bash
cd ~
```

### **ReactJS projesinin kurulması**

npx kullanarak yeni bir react uygulaması oluşturun. npx, bir npm paketi runner'ıdır \(x muhtemelen yürütme anlamını taşır\). Tipik kullanım, bir paketi geçici olarak veya denemeler için indirip çalıştırmaktır. create-react-app için paket binary'lerini yürütmek için npx kullanmak, belirtilen dizinde yeni bir React uygulaması iskeleti oluşturacaktır.

```bash
npx create-react-app avalanche-voting
```

Yeni oluşturulan dizine gidin ve temel bağımlılıkları yükleyin.

```bash
cd avalanche-voting
npm install --save dotenv web3 @truffle/contract @truffle/hdwallet-provider
```

`public` dizininde `index.html` dosyasını açın ve mevcut kodu aşağıdaki HTML ile değiştirin:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Avalanche Elections</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    />
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

`src` dizininde `App.js` dosyasını açın ve mevcut kodu aşağıdaki kodla değiştirin:

```javascript
import React from "react";

// 1. Importing other modules

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      account: null,
      mainInstance: null,
    };
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    // 2. Load web3
    // 3. Load Account
    // 4. Load Smart-Contract instance
  }

  render() {
    return <div>Avalanche evoting application</div>;
  }
}
export default App;
```

Bu `App` bileşeninde, state property'lerini deklare ve initialize edecek bir constructor vardır. `web3`, `Metamask` provider'ın Avalanche ağı ile etkileşim kurmaya yönelik bir instance'ıdır; `account`, bir kullanıcı adresidir; `mainInstance`, akıllı sözleşmemizin instance'ıdır.

`src` dizininde `index.js` dosyasını açın ve mevcut kodu aşağıdaki kodla değiştirin:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

React proje kurulumu artık tamamlandı.

### **Truffle projesinin kurulması**

Truffle projesi için bir boilerplate oluşturmak için proje kök dizininde aşağıdaki komutu çalıştırın.

```bash
truffle init
```

Bu, başlangıç proje yapısını kuracaktır. Solidity kodu `contracts` dizininde depolanacaktır. JavaScript ile yazılmış deployment fonksiyonları `migrations` klasöründe depolanacaktır. Varsayılan olarak, `/build/contracts` klasörü, compile ve deploy edilen sözleşme bilgilerini \(örneğin ABI\) JSON formatında içerir. Bu meta dosyalar genelde `artifacts` olarak anılır.

Ayrıca, yukarıdaki komut vasıtasıyla oluşturulan bir **config** \(yapılandırma\) dosyası -**truffle-config.js**- da mevcuttur. Bu dosyada, sözleşmelerin nasıl deploy edileceği, bunların deploy edileceği bir ağın nasıl seçileceği gibi birçok konuda pek çok bilgi vardır. Bu nedenle, bu dosyayı bir başvuru kaynağı olarak saklamamız gerekir. Bu yüzden, aşağıdaki komutu kullanarak bu dosyanın bir kopyasını oluşturun. Bunu yaptığınızda `truffle-config-default.js` adında bir kopya oluşacaktır.

```bash
cp truffle-config.js truffle-config-default.js
```

Şimdi `truffle-config.js` dosyasını akıllı sözleşmeyi Fuji test ağında deploy etmek için gerekli bilgilerle güncelleyeceğiz. Bu dosya Avalanche düğümüne bağlanmamıza yardımcı olur; sözleşmeyi ağda deploy etmek için bir Avalanche cüzdan mnemonic'ine ihtiyacımız olacak.

```javascript
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

// Account credentials from which our contract will be deployed
const MNEMONIC = process.env.MNEMONIC;

module.exports = {
  contracts_build_directory: "./src/build/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    fuji: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: MNEMONIC,
          providerOrUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
        });
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 470000000000,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
```

`gasPrice` ve `gas` parametrelerini uygun Avalanche C-Chain değerlerine ayarladığımızı unutmayın. Burada, `artifacts`'nin varsayılan konumunu proje kök dizininden `src` klasörüne değiştirmek için `contracts_build_directory` kullandığımızı görebilirsiniz. Bunun nedeni, React'in `src` klasörü dışındaki dosyalara erişememesidir.

### **Avalanche kimlik bilgilerini alın**

Akıllı sözleşmeleri deploy etmek için iki şeye ihtiyacımız var: Avalanche ağına bağlı bir düğüm ve içinde bir miktar AVAX bulunan bir hesap. RPC \(Remote Procedure Call\) yoluyla Avalanche'a bağlı düğüm, Avalanche Ağları tarafından ücretsiz olarak sağlanır.

Şimdi ağdaki tüm işlemler için gerekli olan fonlarımızı tutacağımız bir Avalanche cüzdanına ihtiyacımız var. Bu nedenle, [buraya](https://wallet.avax.network) gidin ve bir hesap oluşturun. Mnemonic'i güvenli bir yere kaydedin \(buna daha sonra ihtiyacımız olacak\). Fonlar ekleme talimatları bu eğitim makalesinin ilerleyen bölümlerinde verilmiştir.

### **.env dosyasını ekleyin**

Şimdi ağdaki tüm işlemler için gerekli olan fonlarımızı tutacağımız bir **Avalanche** cüzdanına ihtiyacımız var. [Avalanche Cüzdan](https://wallet.avax.network/)'a gidin ve bir hesap oluşturun. Hesabınızı oluştururken public adresinizi ve mnemonic'inizi göreceksiniz. Bu public adres fonları transfer etmek için gerekecektir. **Mnemonic**'i güvenli bir yere kaydedin, buna daha sonra ihtiyacımız olacak. Fonlar ekleme talimatları bu eğitim makalesinin ilerleyen bölümlerinde verilmiştir.

Proje kök klasöründe bir `.env` dosyası oluşturun. `.env` dosya adı için noktanın \(.\) gerekli olduğunu lütfen unutmayın. Şimdi aşağıda gösterilen şekilde Avalanche cüzdanınızın mnemonic'ini .env dosyasında kopyalayın. .env dosyasında **MNEMONIC** tırnak \(" "\) içine alınmalıdır.

```bash
MNEMONIC="<avalanche-wallet-mnemonic>"
```

> `.env` dosyanızı asla paylaşmayın veya emanete bırakmayın. Bu dosya, `mnemonics` gibi kimlik bilgilerinizi içerir. Bu nedenle, `.env`'yi `.gitignore` dosyanıza eklemeniz akıllıca olur.

Proje kurulumumuz artık tamamlandı.

Kurulumun doğru yapıldığını doğrulamak için proje kök klasöründe aşağıdaki komutu çalıştırın.

```bash
npm start
```

Aşağıdaki ekran görüntüsündeki çıktının gösterilmesi birkaç saniye sürebilir.

![](./assets/evoting-dapp-00-localhost-react-server.png)

Bir internet tarayıcısında, çalışmakta olan dApp'imizin URL'sine gidin: [http://localhost:3000](http://localhost:3000). Yukarıdaki adımları takip ettiyseniz, aşağıda gösterilen sayfayı göreceksiniz.

![](./assets/evoting-dapp-01-localhost-frontend.png)

## **Election \(Seçim\) akıllı sözleşmesi yaratın**

`contracts` dizininde `Election.sol` dosyası \(`.sol` Solidity anlamına gelir\) oluşturun ve bu [dosyada](./contracts/Election.sol) verilen kodu kullanın.

`Election`, bir seçime katılan adayların adını ve açıklamasını ve onlara verilen oyu görüntülememizi sağlayan bir Solidity sözleşmesidir. Bu dApp'te, deploy edilen Seçim sözleşmelerine, sözleşmelerin `address` ve `ABI` bilgilerini kullanarak erişeceğiz. Bu Solidity kodu, yeni bir seçim yarattığımız her seferinde blok zincire deploy edilecek koddur.

**Bu akıllı sözleşmeyi anlayalım**

Akıllı sözleşmenin kodu, `contract Election { }` içerisindeki her şeydir.

**Seçimle ilgili temel alanlar** - Bu kod bloku, her bir `Election` sözleşmesinin temel alanlarını depolayacaktır. Alanlar arasında `name` ve `description` yer alır.

```solidity
// Election details will be stored in these variables
string public name;
string public description;
```

**Aday bilgilerinin depolanması** - `Candidate` struct'ı, `id`,  `name`, ve `voteCount` veri alanlarından oluşur. Bir imzasız tamsayı \(`uint`\) ile bir Adayın her bir instance'ı arasında bir mapping tanımlayacağız. Bu, her bir adaya, o adayın mapping içindeki indeksiyle -`candidates[n]`, burada `n`, karşılık gelen `uint` değeridir- referans yapmamıza imkan verecektir.

```solidity
// Structure of candidate standing in the election
struct Candidate {
  uint256 id;
  string name;
  uint256 voteCount;
}

// Storing candidates in a map
mapping(uint256 => Candidate) public candidates;
```

**Halihazırda oy kullanmış olan seçmenler adresinin ve adayların sayısının depolanması** - `voters`, seçmenin adresi ile bir boolean arasındaki bir mapping'dir. Solidity'de varsayılan boolean değeri `false`'dır, dolayısıyla `voters(address)`'in döndürülen değeri `false` ise, bu adresin oy kullanmadığını anlayabiliriz. `true`, hesabın halihazırda oy kullanmış olduğunu gösterir.

```solidity
// Storing address of those voters who already voted
mapping(address => bool) public voters;

// Number of candidates in standing in the election
uint public candidatesCount = 0;
```

**Constructor çağrısı ve seçime adaylar eklenmesi** - Avalanche'ta bir akıllı sözleşme deploy edildiğinde, çağrılacak ilk fonksiyon `constructor()` fonksiyonudur. Solidity akıllı sözleşmemizde her ne initialize etmek istiyorsak, bunu `constructor()` fonksiyonu içinde yaparız. Seçime bir ad, açıklama ve adaylar ekleyeceğiz. Burada `addCandidate()`, kişiye özel bir fonksiyondur, bu yüzden herkese açık olarak \(publicly\) çağrılamaz. Bu fonksiyon, ilk argümanında `_nda` adı verilen tek bir dizilim olarak  `name` ve `description` ögelerini ve ikinci argümanında bir dizilim olarak adayların adını alır.

```solidity
// Setting of variables and data, during the creation of election contract
constructor (string[] memory _nda, string[] memory _candidates) public {
  require(_candidates.length > 0, "There should be atleast 1 candidate.");
  name = _nda[0];
  description = _nda[1];
  for(uint i = 0; i < _candidates.length; i++) {
    addCandidate(_candidates[i]);
  }
}

// Private function to add a candidate
function addCandidate (string memory _name) private {
  candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  candidatesCount ++;
}
```

**Bir seçimde adaylara oy verilmesi** - Bir `vote()` fonksiyonu oluşturduk. Bu fonksiyon bir argüman olarak `candidateId` alır ve ilgili adayın oyunu birer birer artırır. Bu fonksiyon iki şey gerektirir: bir seçmen ilgili seçimde oy kullanmamış olmalıdır \(bu gereklilik `voters` mapping'indeki boolean kontrol edilerek yerine getirilir\) ve `candidateId` geçerli olmalıdır, yani `0 <= candidateId < candiatesCount` olmalıdır.

```solidity
// Public vote function for voting a candidate
function vote (uint _candidate) public {
  require(!voters[msg.sender], "Voter has already Voted!");
  require(_candidate < candidatesCount && _candidate >= 0, "Invalid candidate to Vote!");
  voters[msg.sender] = true;
  candidates[_candidate].voteCount++;
}
```

## **MainContract akıllı sözleşmesi yaratın**

`contracts` dizininde `MainContract.sol` dosyasını oluşturun ve dosyaya aşağıdaki kodu yapıştırın:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import './Election.sol';

contract MainContract {
  uint public electionId = 0;
  mapping (uint => address) public Elections;

  function createElection (string[] memory _nda, string[] memory _candidates) public {
    Election election = new Election(_nda, _candidates);
    Elections[electionId] = address(election);
    electionId++;
  }
}
```

`MainContract.sol`, dApp'imizin giriş noktasıdır. Yeni bir seçim yaratmak için, bu deploy edilen sözleşmeden `createElection()` fonksiyonunu çağırmamız gerekir. Bu fonksiyon, deploy edilen seçim sözleşmelerinin toplam sayısını ve sözleşmelerin ağdaki adresini depolayacak ve ayrıca sözleşmelerin deploy edilmesine yardımcı olacaktır. Ayrıca `Elections.sol` dosyasını da [içe aktarıyoruz](https://docs.soliditylang.org/en/v0.8.4/layout-of-source-files.html?highlight=import#syntax-and-semantics).

Burada `electionId`, bir kullanıcının yarattığı her bir seçime bir kimlik numarası atamak için kullanılır ve bir sonraki seçim yaratılırken bu kimlik numarası bir birim arttırılarak kullanılır. `Elections` aynı zamanda `electionId` ve deploy edilen seçim sözleşmesinin adresi arasındaki bir public mapping'dir.

```solidity
uint public electionId = 0;
mapping (uint => address) public Elections;
```

`Election` akıllı sözleşmemizi deploy etmek için kullanılacak bir `createElection()` fonksiyonu oluşturduk. Bu fonksiyon, ilk argümanında `_nda` adı verilen tek bir dizilim olarak  `name` ve `description` ögelerini ve ikinci argümanında bir dizilim olarak adayların adını alır.

```solidity
function createElection (string[] memory _nda, string[] memory _candidates) public {
  Election election = new Election(_nda, _candidates);
  Elections[electionId] = address(election);
  electionId++;
}
```

`Election` sözleşmesi, sözleşmeyi deploy eden, sözleşmenin değişkenlerini initialize eden \(ilklendiren\), `constructor()` fonksiyonunu çalıştıran ve yeni deploy edilen sözleşmenin **adresini** çağrıyı yapana döndüren `new` anahtar sözcüğü kullanarak ağda deploy edilir. Bunun ardından bu adres `Elections` mapping'inde depolanır. Seçim sözleşmesi başarılı bir şekilde deploy edildikten sonra, `electionId` bir birim artar.

## **Akıllı sözleşmeleri taşımak için bir dosya oluşturun**

`migrations` dizininde `2_deploy_contracts.js` adıyla yeni bir dosya oluşturun ve aşağıdaki kod blokunu ekleyin. Bu dosya, `MainContract` ve `Election` akıllı sözleşmesinin blok zincire deploy edilmesini gerçekleştirir.

```javascript
const MainContract = artifacts.require("MainContract");

module.exports = function(deployer) {
  deployer.deploy(MainContract);
};
```

Yalnızca `MainContract` sözleşmesini deploy ediyoruz, çünkü `Election` sözleşmesi bizzat `MainContract` tarafından runtime sırasında `createElection()` fonksiyonu kullanılarak deploy edilecektir.

## **Sözleşmeleri Truffle ile Compile Edin**

Solidity kaynak dosyalarımızdaki kodu değiştirdiysek veya yenilerini \(`Elections.sol` gibi\) oluşturduysak, terminalde proje kök dizininden `truffle compile` komutunu çalıştırmamız gerekir.

Beklenen çıktı şuna benzer olacaktır:

```bash
Compiling your contracts...
===========================
> Compiling ./contracts/Election.sol
> Compiling ./contracts/MainContract.sol
> Compiling ./contracts/Migrations.sol

> Artifacts written to /home/guest/blockchain/avalanche-voting/build/contracts
> Compiled successfully using:
   - solc: 0.8.0+commit.c7dfd78e.Emscripten.clang
```

Compile edilen akıllı sözleşmeler /src/build/contracts dizininde JSON dosyaları olarak yazılır. Bunlar depolanan ABI ve diğer gerekli meta verilerdir - artifact'lerdir.

> `ABI`, akıllı sözleşmelerle blok zincir dışından etkileşimde bulunmak, bunun yanı sıra sözleşmeden sözleşmeye etkileşimde bulunmak için bir standart olan Application Binary Interface'i \(Uygulama İkili Arayüzü\) ifade eder. Solidity'nin ABI'ler hakkındaki dokümanlarına [burada](https://docs.soliditylang.org/en/v0.5.3/abi-spec.html#:~:text=The%20Contract%20Application%20Binary%20Interface,contract%2Dto%2Dcontract%20interaction.&text=This%20specification%20does%20not%20address,known%20only%20at%20run%2Dtime) başvurarak daha fazla bilgi edinebilirsiniz.

## **C-Chain'de hesabı fonlayın ve taşımaları \(migration\) çalıştırın**

C-Chain'e akıllı sözleşmeler deploy ederken bir miktar deployment bedeli ödemek gerekecektir. `truffle-config.js` dosyasında görebileceğiniz gibi, HDWallet Provider, Fuji C-chain'de deploy etmekte bize yardımcı olacak ve deployment bedeli, mnemonic'i `.env` dosyasında depolanmış olan hesap tarafından yönetilecektir. Bu nedenle hesabı fonlamamız gerekiyor.

### **Hesabınızı fonlayın**

C-Chain adresimizde fonlar olması gerekiyor, çünkü akıllı sözleşmeler C-Chain'de, yani Kontrat Zincirinde deploy edilir. Bu adresi [Avalanche Cüzdan](https://wallet.avax.network) gösterge panelinde kolayca bulabilirsiniz. Avalanche ağında 3 zincir vardır: X-Chain, P-Chain ve C-Chain. Bu üç zincirin adresini, bölmenin alt kısmında, bir QR kodu göreceğiniz alanda bulunan sekmeler arasında geçiş yaparak bulabilirsiniz. C-Chain'e geçiş yaparak adresi kopyalayın. Şimdi [buradaki](https://faucet.avax-test.network/) musluk linkini kullanarak hesabınızı fonlayın ve C-Chain adresinizi input alanına yapıştırın. Adres bölümünü bulmak için aşağıdaki görsele bakın.

![](./assets/evoting-dapp-02-wallet-c-chain-address.png)

> Sözleşme deploymentlarının bedelini karşılamak için hesaba en az `135422040` nAVAX göndermeniz gerekecek. Burada `nAVAX`, nano-AVAX'tır, yani bir `AVAX`'ın bir milyarda biridir, ya da 1 `nAVAX` = \(1/1000.000.000\) `AVAX`'tır. Musluk yoluyla fonlama yaptığınızda ağda defalarca deploymentlar ve işlemler yapmanıza yetecek miktarda `AVAX`'ınız olur.

### **Taşımaları \(migration\) çalıştırın**

Şimdi taşımaları yapmak ve `MainContract`'ı deploy etmek için her şey hazır:

```bash
truffle migrate --network fuji
```

Bu, internet bağlantınıza veya ağdaki trafiğe bağlı olarak biraz zaman alabilir.

Not - Geliştirme amacıyla, Ganache'ı \(Truffle'ın yerel blok zincir simülasyonu\) çalıştırarak ve aşağıdaki komutu kullanarak sözleşmelerimizi yerel ağda deploy edebiliriz.

```bash
truffle migrate --network development
```

Bu komutu başarıyla yürüttüğümüzde aşağıdakini görmemiz gerekir:

```bash
Starting migrations...
======================
> Network name:    'fuji'
> Network id:      1
> Block gas limit: 8000000 (0x7a1200)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x094a9c0f12ff3158bcb40e266859cb4f34a274ea492707f673b93790af40e9e9
   > Blocks: 0            Seconds: 0
   > contract address:    0x0b1f00d0Af6d5c864f86E6b96216e0a2Da111055
   > block number:        40
   > block timestamp:     1620393171
   > account:             0x80599dd7F8c5426096FD189dcC6C40f47e8e3714
   > balance:             39.71499696
   > gas used:            173118 (0x2a43e)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00346236 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00346236 ETH


2_deploy_contracts.js
=====================

   Deploying 'MainContract'
   ------------------------
   > transaction hash:    0xbeb13fc6bbee250eea9151faf02bfe247ec497294acc84c9b8319ed609ced086
   > Blocks: 0            Seconds: 0
   > contract address:    0xf30D372A6911CCF6BBa1e84c3CEd51cC0F3D7769
   > block number:        42
   > block timestamp:     1620393172
   > account:             0x80599dd7F8c5426096FD189dcC6C40f47e8e3714
   > balance:             39.69235442
   > gas used:            1090212 (0x10a2a4)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02180424 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.02180424 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.0252666 ETH
```

C-Chain'de bir hesap yaratmadıysanız şu hatayı görürsünüz:

```bash
Error: Expected parameter 'from' not passed to function.
```

Hesabı fonlamadıysanız şu hatayı görürsünüz:

```bash
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

Deploy edilen sözleşmenin bilgileri ve ABI'si `src/build/contract` dizininde `Election.json` olarak mevcuttur. Sözleşme adresi, ağ bilgileri vb. bilgiler burada bulunabilir.

## **Kullanıcı arayüzünün oluşturulması**

React proje dizinimizi önceden kurmuştuk. Avalanche blok zinciri ile etkileşim kuracak istemci tarafı dosyaları `src` dizininde bulunur. İlk olarak, tarayıcımızı Avalanche ağına bağlamak için birkaç fonksiyona sahip bir ReactJS bileşeni yapacağız. Bu fonksiyonlar `BlockchainUtil.js` adında ayrı bir dosyada tutulur.

### BlockchainUtils Bileşeni

`src` dizininde `BlockchainUtil.js` dosyasını oluşturun ve aşağıdaki kodu yapıştırın:

```javascript
import React from "react";
import Web3 from "web3";
import TruffleContract from "@truffle/contract";

export class GetWeb3 extends React.Component {
  async getWeb3() {
    let web3 = window.web3;

    if (typeof web3 !== "undefined") {
      // Setup Web3 Provider
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
      return this.web3;
    } else {
      this.isWeb3 = false;
    }
  }
}

export class GetContract extends React.Component {
  async getContract(web3, contractJson) {
    // Setup Contract
    this.contract = await TruffleContract(contractJson);
    this.contract.setProvider(web3.currentProvider);
    return await this.contract.deployed();
  }
}

export class GetAccount extends React.Component {
  async getAccount(web3) {
    return await web3.eth.getAccounts();
  }
}
```

### App.js'nin güncellenmesi

`App.js`, React uygulamamızın giriş noktasıdır. Bu nedenle, `App.js`'yi uygulamamızda göstermek istediğimiz bileşenlerle güncellememiz gerekecek. İlerlerken ve bileşenleri oluştururken, `App.js`'i güncelleyecek ve bileşenleri içe aktaracağız, böylece bu bileşenlerin işlevlerinden yararlanabileceğiz.

Şimdi `BlockchainUtil.js` modülünü içe aktarmak için `App.js`'nin `//Importing...` bölümünün altına aşağıdaki satırı ekleyin.

```javascript
// 1. Importing other modules
import {GetWeb3, GetContract, GetAccount} from './BlockchainUtil';
```

Aşağıdaki kodu `App.js`'nin `init()` fonksiyonunun içine yapıştırın

```javascript
// 2. Load web3
const Web3 = new GetWeb3();
this.web3 = await Web3.getWeb3();
this.setState({web3: this.web3});

// 3. Load Account
const Account = new GetAccount();
this.account = await Account.getAccount(this.web3);
this.setState({account: this.account[0]});

// 4. Load Contract
const Contract = new GetContract();
this.mainInstance = await Contract.getContract(this.web3, contractJson);
this.setState({mainInstance: this.mainInstance});
```

### CreateElection Bileşeni

Şimdi deploy ettiğimiz akıllı sözleşmemizi kullanarak yeni seçimler yaratmamızı sağlayacak bir bileşen oluşturalım. Projenin `src` dizininde `CreateElection.js` dosyasını oluşturun ve bu [dosyada](./frontend/CreateElection.js) verilen kodu kullanın. Önemli kısımlara dikkat çekmek için koda yorum satırları eklenmiştir.

### ActiveElections Bileşeni

Projenin `src` dizininde `ActiveElections.js` dosyasını oluşturun ve bu [dosyada](./frontend/ActiveElections.js.md) verilen kodu kullanın.

### VoteModal Bileşeni

Yukarıdaki `ActiveElections.js` bileşeninde, aday bilgilerini ve oy vermek için bir düğme içeren `VoteModal` adında bir bileşen kullandık. Şimdi `src` dizininde `VoteModal.js` adında bir dosya oluşturarak bu bileşeni kullanıma sunacağız. Bu [dosyada](./frontend/VoteModal.js.md) bulunan kodu kullanın.

### Bileşenlerin App.js'ye Entegre Edilmesi

Şimdi `App.js` dosyamızı buraya kadar oluşturduğumuz tüm bileşenlerle güncellememiz gerekiyor.

**Modülleri içe aktarın** - Önce `// 1. Importing other modules` bölümünün altına aşağıdaki kodu ekleyerek tüm modülleri ve bileşenleri `App.js` dosyasına aktarın.

```javascript
// 1. Importing other modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import CreateElection from "./CreateElection"
import ActiveElections from "./ActiveElections";
import contractJson from './build/contracts/MainContract.json';
```

**Bileşenleri yükleyin** - `App.js`'deki `return()` fonksiyonunun `<div>` etiketinin içinde, örnek metni \(`Avalanche evoting`\) aşağıdaki bileşenlerin koduyla değiştirin.

```javascript
// For routing through the react application
<Router>
  {/* Default route to ActiveElections component */}
  <Route path="/" exact>
    <Redirect to="/active"/>
  </Route>

  {/* Navbar */}
  <nav className="navbar navbar-dark shadow" style={{backgroundColor: "#1b2021", height: "60px", color: "white", marginBottom: "50px"}}>
    {/* Link to Active election page (nav-header) */}
    <Link to = "/active"><b style = {{cursor: "pointer", color: "white"}}>Avalanche Elections</b></Link>

    {/* Account address on the right side of the navbar  */}
    <span style={{float: "right"}}>{this.state.account}</span>
  </nav>

  {/* Route to CreateElection page */}
  {<Route path="/createElection" exact component={() => <CreateElection account={this.state.account}/>}/>}

  {/* Route to Active election page */}
  {<Route path="/active" exact component={() => <ActiveElections account={this.state.account}/>}/>}
</Router>
```

> Daha önce yüklemediğimiz birkaç bağımlılık daha kullandık. Bu nedenle proje dizininizin terminalinde aşağıdaki komutu çalıştırın.
>
> ```bash
> npm install --save rimble-ui react-router-dom --force
> ```

> Rimble UI kitaplığı, React'in şu anda kullandığımız en son sürümü \(`react@16.9.0`\) olmayan bir eş bağımlılığıyla \(`react@17.0.2`\) birlikte gelir. `npm install` komutunu `--force` etiketi olmadan çalıştırmak, bir `unable to resolve dependency tree` çatışmasına yol açar. Bu nedenle, `--force` etiketi çatışmaları override ederek yüklemeye devam etmek için kullanılır. Bu çatışmayı çözmenin diğer bir yolu, yukarıda belirtilen etiket yerine `--legacy-peer-deps` etiketini kullanmaktır, ama bu etiket tüm eş bağımlılıklarını yok sayabilir, bunu istemeyiz, çünkü çatışma yalnızca `react` ve `rimble-ui` arasındadır.

Şimdi proje kök dizinine, yani `avalanche-voting` dizinine gidin ve `npm start` komutunu çalıştırın. ReactJS sunucusu otomatik olarak başlar. dApp'in önyüzüyle \(frontend\) etkileşimde bulunmak için bir internet tarayıcısında [http://localhost:3000](http://localhost:3000) adresine gidin.

Avalanche Fuji test ağı ile Metamask'i kurmayı ve ayrıca oylama için Fuji C-Chain test token'ları ile hesaba fonlamayı unutmayın. Metamask uzantısında, sayfanın ortasındaki ağ menüsünü tıklayarak bir custom RPC ekleyin. Bilgileri aşağıda gösterilen şekilde girin

| Bilgiler | Değer |
| :--- | :--- |
| Network Name \(Ağ Adı\) | Avalanche Fuji |
| New RPC URL \(Yeni RPC URL'si\) | [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) |
| Chain ID \(Zincir kimliği\) | 43113 |
| Currency Symbol \(Para Sembolü\) | AVAX-C |
| Block Explorer URL \(Blok Tarayıcı URL'si\) | [https://testnet.snowtrace.io](https://testnet.snowtrace.io) |

## Sonuç

Kişiselleştirilmiş seçimler yaratılması, bu seçimlerde oy kullanılması gibi ileri özellikleri bulunan dört başı mamur bir elektronik oylama dApp'ini başarılı bir şekilde oluşturdunuz ve akıllı sözleşmeyi Truffle Suite kullanarak Fuji test ağında deploy ettiniz. Bunun yanı sıra, ağla etkileşimde bulunmak için ReactJS kullanarak istemci tarafı uygulamasını da oluşturduk. Bu eğitim makalesinden akıllı sözleşmeleri nasıl oluşturacağınızı ve deploy edeceğinizi, bunun yanı sıra ReactJS'yi Truffle Suite kullanarak blok zincirle nasıl entegre edeceğinizi öğrendiniz.

![](./assets/evoting-dapp-03-evoting-demo.gif)

## Sırada ne var?

Şimdi bir oylama dApp'i oluşturup deploy ettiğimize göre, bir adı ve açıklaması olan yeni seçimler oluşturabilir ve bu seçimlerde ayrı ayrı oy kullanabiliriz. Eklenmesi önerilen bazı özellikler, bir seçim için başlangıç ve bitiş tarihleri ekleme imkanı, seçim sona erdikten sonra kazananı ilan etme, ya da modal pencereler ve stilize edilmiş düğmeler gibi kullanıcı arayüzü güçlendirmeleri olabilir.

## Yazar hakkında

Bu eğitim makalesi [Raj Ranjan](https://www.linkedin.com/in/iamrajranjan) tarafından hazırlanmıştır.