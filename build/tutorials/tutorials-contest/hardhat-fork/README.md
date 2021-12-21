## Giriş

Bu eğitimde, güçlü bir EVM geliştirme aracı olan Hardhat'ın Avalanche ile birlikte kullanımını ele alacağız. Daha spesifik olarak, Hardhat'in Avalanche C-Chain ile çalışacak şekilde nasıl yapılandırılacağını ve DeFi dApp'lerinizi test etmek için Hardhat `fork` mekanizmasının nasıl kullanılacağını ele alacağız.

### Hardhat nedir?

Hardhat, **profesyonellere yönelik bir Ethereum geliştirme ortamıdır**. Ethereum için geliştirilmiştir, ancak diğer birçok blok zincir EVM'yi yeniden kullandığından, Hardhat'i bunlara da uygulayabilirsiniz!

Kısaca söylersek, Hardhat, akıllı sözleşme geliştirmenin tüm önemli adımlarında size yardımcı olur. Solidity kodunuzu derlerken, deploy ederken ve test ederken yardımcı olur. Hatta akıllı sözleşmenizin kodunda 'console.log' kullanmanıza imkan veren bir işleve bile sahiptir!

Bu eğitim makalesinin amacı tüm bu işlevleri incelemek değil (belki başka bir eğitim makalesinde yapılabilir bu, neden olmasın :) ), bu yüzden bu konuda daha fazla bilgi edinmek isterseniz buraya birkaç bağlantı bırakıyoruz:

* https://hardhat.org/getting-started/
* https://github.com/nomiclabs/hardhat

## "Çatal" işlevi nedir?

Şimdi bu eğitim makalesinin özüne dönelim: Hardhat çatal mekanizması.

Bu işlevin öneminin farkına varabilmeniz için size bir örnek vereyim:

Diyelim ki basit bir `Swapper.sol` sözleşmeniz var. Bunda bir `swap` işlevi var, uygun parametrelerle çağrıldığında bazı Wavax tokenlarını bir DEX'te listelenen diğer ERC20 tokenlarıyla swap eder. Bu eğitim makalesinde [Pangolin](https://pangolin.exchange/) kullanacağız.

Bunun akışı şu şekilde olacaktır:

```
1* Your send a call to Swapper's swap function
2* Swapper use Pangolin's router `swapExactTokensForTokens` function, it will find the appropriate Pair contract address to call
3* Pangolin's router call a Pair contract to make the swap
```

Harici sözleşmelere çağrılar yapılmasını gerektirdiğini fark etmişsinizdir.

Swapper aracınızın `swap` işlevini test etmek isterseniz, test ortamınızda şunları ayarlamanız gerekiyor:

* 2 ERC20 sözleşmesi
* Pangolin Factory
* Pangolin router sözleşmesi
* Daha önce yarattığınız 2 ERC20 sözleşmenizi kullanan bir Pair (çift) sözleşme (PGL).
* Bütün bunları constructor parametreleriyle yapabilir, hepsini birbirine bağlayabilirsiniz. Yapılabilir elbette, ama tüm bunları düzgün bir şekilde kurmak biraz zaman ister.

Şimdi tüyoyu vereyim: Tüm bunları atlayıp doğruca akıllı sözleşmeleriniz için testler yaratacağınız adıma geçebilirsiniz.

İşte 'Hardhat fork' burada yardıma geliyor.

Bu aracı kullanarak bir EVM zincirinin (bizim örneğimizde CChain) durumunun bir kopyasını çıkarabilir ve bunu testlerinizde doğrudan kullanabilirsiniz! Tüm sözleşme adreslerinin bakiyesini kullanabilirsiniz.

Dolayısıyla bizim örneğimizde, ilgili tüm Pangolin sözleşmelerini deploy etmek zorunda değiliz, sadece mainnet'te deploy edilmiş sözleşmeyi kullanıp akıllı sözleşmenizi zahmetsizce test edebilirsiniz.

## Adım adım açıklama

### Akıllı sözleşmelere genel bakış

Öyleyse önce kullanacağımız solidity kodunu hızlıca ele alalım:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface IRouter {
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}

interface IERC20 {
    function transferFrom(address from, address to, uint value) external;

    function approve(address to, uint value) external returns (bool);

}

/**
* I would not recommend you to use this code as it is. It is really simple and stripped of some basic security checks.
*/
contract Swapper {

    address private wavax; // Address of the ERC20 Wrapped Avax
    address private router; // Address of the 'Uniswap-like' router contract

    constructor(address _wavax_address, address _router){
        wavax = _wavax_address;
        router = _router;
    }

    /**
    * This function will perform a swap on Pangolin. The pair must be a WAVAX-ERC20 pair.
    * @param amountOutMin Minimum amount of token that we want to get after our swap.
    * @param path Array of tokens' address
    * @param pair Address of the liquidity pair we will use in this swap
    * @param deadline Not relevant for avalanche, just pass timestamp that is in the future
    */
    function swap(uint256 amountOutMin, address[] calldata path, address pair, uint256 amountIn, uint256 deadline) external {
        // We transfer the wavax from the user (msg.sender) to this contract.
        IERC20(wavax).transferFrom(msg.sender, address(this), amountIn);
        // We approve the router as a spender for our Wavax.
        IERC20(wavax).approve(router, amountIn);
        // We do te swap using the router.
        IRouter(router).swapExactTokensForTokens(amountIn, amountOutMin, path, msg.sender, deadline);
    }
}
```

### Hardhat yapılandırması

Gördüğünüz gibi, bir harici sözleşme (Pangolin router) kullanıyoruz. Yani bu kodu test etmek istiyorsanız... bu router'ı ve bu router'ın kullandığı tüm sözleşmeleri taklit etmeniz/yeniden oluşturmanız gerekecek... Sinir bozucu, değil mi?

Hardhat sayesinde hayatımızı kolaylaştırabilir ve bu adımı tamamen atlayabiliriz.

Önce Hardhat'i yapılandırmamız gerekir. `hardhat.config.ts` adresine bakarsanız, şu mesajı görürsünüz:

```ts
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: "0.8.4",
    networks: {
        hardhat: {
            chainId: 43114,
            gasPrice: 225000000000,
            forking: {
                url: "https://api.avax.network/ext/bc/C/rpc",
                enabled: true,
            },
        },
        fuji: {
            chainId: 43113,
            gasPrice: 225000000000,
            url: "https://api.avax-test.network/ext/bc/C/rpc",
            accounts: [
                PK_TEST
            ]
        }
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
};
```

Burada kodun en ilginç bölümü `network` kısmı. Projenizde kullanmak istediğiniz ağları burada yapılandırırsınız. Yukarıda görebileceğiniz gibi, bu eğitim makalesi için iki ağ tanımladık:

* `hardhat`, ki aynı zamanda `defaultNetwork`, yani varsayılan ağdır
* `fuji`, ki fuji testnet'e yönlendirir.

Not: Birden fazla ağ tanımlayabilirsiniz, bunlardan biri 'varsayılan' olarak kabul edilir. Yani, `npx hardhat test` kullandığınızda, bu, varsayılan ağı kullanacaktır. Testi varsayılan ağdan başka bir ağda çalıştırmak isterseniz, bu komut varyasyonunu kullanabilirsiniz: `npx hardhat test --network fuji`

Şimdi `hardhat` ortamına odaklanalım.

```ts
hardhat: {
    chainId: 43114,
        gasPrice
:
    225000000000,
        forking
:
    {
        url: "https://api.avax.network/ext/bc/C/rpc",
            enabled
    :
        true,
            blockNumber
    :
        2975762
    }
,
}
,
```

* `chainId`, [burada](https://docs.avax.network/build/avalanchego-apis/contract-chain-c-chain-api) görüldüğü gibi mainnet değerine ayarlanır.
* `gasPrice`, Avalanche CChain'deki dinamik bir değerdir (daha fazla bilgi için bu [gönderiye](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60) bakın). Test için sabit bir değer (225 nAvax) kullanabiliriz.
* `forking`, çatalın parametresini yapılandırdığınız yerdir.
   * Buradaki `url`'de gördüğümüz gibi Ava labs api son noktasına yönlendirme yapıyoruz. Bu sizin yerel düğümünüz olabilir, yeter ki tam arşiv düğümü olarak çalışıyor olsun. Hardhat bu düğümden CChain'in durumunu alma işini üstlenecek ve kodunuzu deploy ve test edebileceğiniz bir yerel geliştirme ağı başlatacaktır.
   * `blockNumber` ögesinde, Hardhat'in hangi blokta bir çatal yaratacağını belirtin. Bu öge isteğe bağlıdır, bu nedenle bu ögeye bir değer girmezseniz, varsayılan davranış gereğince, CChain'in çatallanması bilinen en son blokta yapılacaktır. Şimdi testlerinizi deterministik bir şekilde çalıştırabilmek istediğinizden, belli bir blok numarası belirtmenizi tavsiye ederim.

Tüm yapılandırma seçeneklerini görmek isterseniz, bu özellikle ilgili [resmi dokümanlara](https://hardhat.org/hardhat-network/reference/) bir göz atın.

### Testlere genel bakış

Solidity kodunu, Hardhat konfigürasyonunu inceledik. Şimdi Hardhat'i kullanarak nasıl test oluşturulacağına bakalım.

Şimdi test koduna bir bakalım.

Hardhat ile test yapmak oldukça basittir, birçok şey soyutlanmış olur.

Önce Swapper sözleşmemiz için yazdığım teste bir göz atalım, merak etmeyin testi biraz sonra inceleyeceğiz.

```ts
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "hardhat-deploy-ethers/src/signers";
import { BigNumber } from "ethers";
import { Swapper, IWAVAX } from "../typechain";

dotenv.config();

const AVALANCHE_NODE_URL: string = process.env.AVALANCHE_MAINNET_URL as string;
const WAVAX_ADDRESS: string = process.env.WAVAX_ADDRESS as string;
const PNG_ADDRESS = "0x60781C2586D68229fde47564546784ab3fACA982"

describe("Swappity swap", function () {

    let swapper: Swapper;
    let account1: SignerWithAddress;

    beforeEach(async function () {
        await ethers.provider.send(
            "hardhat_reset",
            [
                {
                    forking: {
                        jsonRpcUrl: AVALANCHE_NODE_URL,
                        blockNumber: 2975762,
                    },
                },
            ],
        );

        let accounts = await ethers.getSigners()

        // @ts-ignore
        account1 = accounts[0]

        // Here we get the factory for our Swapper contrat and we deploy it on the forked network
        const swapperFactory = await ethers.getContractFactory("Swapper")
        swapper = await swapperFactory.deploy(process.env.WAVAX_ADDRES as string, "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106");
    });

    it("should swap wavax for png", async function () {

        // We get an instance of the wavax contract
        const wavaxTokenContract = await ethers.getContractAt("IWAVAX", WAVAX_ADDRESS)
        // @ts-ignore
        const pngTokenContract = await ethers.getContractAt("IWAVAX", PNG_ADDRESS)
        //makes sure owner has enough WAVAX balance
        if ((await wavaxTokenContract.balanceOf(account1.address)).lt("1000000000000000000000")) {
            await wavaxTokenContract.deposit({
                value: BigNumber.from("1000000000000000000000")
                    .sub(await wavaxTokenContract.balanceOf(account1.address))
            })
        }

        // We tell Wavax contract that we are cool with Swapper contract using our Wavax on our behalve
        await wavaxTokenContract.approve(swapper.address, ethers.constants.MaxUint256)

        // Check balance before the swap
        const wavaxBalanceBefore = await wavaxTokenContract.balanceOf(account1.address);
        const pngBalanceBefore = await pngTokenContract.balanceOf(account1.address)
        expect(wavaxBalanceBefore).eq("1000000000000000000000");
        expect(pngBalanceBefore).eq(0)

        // We call Swapper contract to make a swap from Wavax to Png. I chose some weird values for the swap cause it's just for the sack of this tutorial.
        await swapper.swap(100, [WAVAX_ADDRESS, PNG_ADDRESS], "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367", 1000000000, 1807909162115)
        // Check balance after

        const wavaxBalanceAfter = await wavaxTokenContract.balanceOf(account1.address);
        const pngBalanceAfter = await pngTokenContract.balanceOf(account1.address)

        // Since we have done the swap, we expect the balance to be slightly different now. Less Wavax and more Png.
        expect(wavaxBalanceBefore).lt(wavaxBalanceAfter);
        expect(pngBalanceBefore).gt(pngBalanceAfter);
    });
});

```

Önce tüm içe aktarımları alıyoruz.

```ts
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "hardhat-deploy-ethers/src/signers";
import { BigNumber } from "ethers";
import { Swapper, IWAVAX } from "../typechain";

dotenv.config();
```

Bunlarla ilgili ayrıntılara girmeyeceğim, sadece solidity sözleşmeleriniz için otomatik olarak typescript bindingleri oluşturan `typechain` aracını kullandığımızı görün yeter. Bunun anlamı, en basitinden, bir Solidity sözleşmesine karşılık gelen bir nesneyi instante ettiğimizde, tam typingler ve otomatik tamamlama elde edeceğiz, demektir. Bu size bir hayli zaman kazandırır ve daha iyi ve daha güvenli kod yazmanıza yardımcı olur. (Typescript'i ne kadar sevdiğimi anlatamam)

Aşağıdaki snippet'te bu dosyaya yazdığımız her test senaryosundan önce çalışacak olan `beforeEach` işlevini (aslında bir [kancadır](https://mochajs.org/#hooks)) görebiliriz.

```ts
describe("Swappity swap", function () {

    let swapper: Swapper;
    let account1: SignerWithAddress;

    beforeEach(async function () {
        await ethers.provider.send(
            "hardhat_reset",
            [
                {
                    forking: {
                        jsonRpcUrl: AVALANCHE_NODE_URL,
                        blockNumber: 2975762,
                    },
                },
            ],
        );

        let accounts = await ethers.getSigners()

        account1 = accounts[0]

        // Here we get the factory for our Swapper contrat and we deploy it on the forked network
        const swapperFactory = await ethers.getContractFactory("Swapper")
        swapper = await swapperFactory.deploy(process.env.WAVAX_ADDRES as string, "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106");
    });
...
```

Burada dikkate alınması gereken birkaç husus var:

* `await ethers.provider.send(
   "hardhat_reset", ...` Bu işlev, CChain çatalınızın durumunu reset edecektir. Yani, her bir testiniz temiz bir instance'da çalışır.
* `let accounts = await ethers.getSigners()`Ethers bize bazı ``İmzacılara' erişmemizin bir yolunu sağlar. Bu da, testlerimizde kullanabileceğimiz CChain hesabını temsil etmenin bir yoludur.
* `const swapperFactory = await ethers.getContractFactory("Swapper")` Burada, Ethers yoluyla, akıllı sözleşmeleri deploy etmek için kullanılan bir abstraction olan bir ContractFactory getiririz.
* `swapper = await swapperFactory.deploy(process.env.WAVAX_ADDRES as string, "0x....");`Burada, sözleşmeyi hardhat ağında -ki cchain mainnet'in çatallanmış bir versiyonudur- deploy etmek için factory'yi kullanıyoruz! Elde ettiğimiz `swapper`, `Swapper` sözleşmesini temsil eden ve üzerinde `swap` gibi işlevleri çağırabileceğiniz bir nesnedir (typechain sayesinde tam olarak type edilmiştir).

Dolayısıyla burada bir testin kodunu görüyoruz. Bunu biraz daha detaylandırıp her bir önemli kısmı aşağıda açıklayacağız.

```ts
it("should swap wavax for png", async function () {

    // We get an instance of the wavax contract
    const wavaxTokenContract = await ethers.getContractAt("IWAVAX", WAVAX_ADDRESS)
    // @ts-ignore
    const pngTokenContract = await ethers.getContractAt("IWAVAX", PNG_ADDRESS)
    //makes sure owner has enough WAVAX balance
    if ((await wavaxTokenContract.balanceOf(account1.address)).lt("1000000000000000000000")) {
        await wavaxTokenContract.deposit({
            value: BigNumber.from("1000000000000000000000")
                .sub(await wavaxTokenContract.balanceOf(account1.address))
        })
    }

    // We tell Wavax contract that we are cool with Swapper contract using our Wavax on our behalve
    await wavaxTokenContract.approve(swapper.address, ethers.constants.MaxUint256);

    // Check balance before the swap
    const wavaxBalanceBefore = await wavaxTokenContract.balanceOf(account1.address);
    const pngBalanceBefore = await pngTokenContract.balanceOf(account1.address);

    expect(wavaxBalanceBefore).eq("1000000000000000000000");
    expect(pngBalanceBefore).eq(0);

    // We call Swapper contract to make a swap from Wavax to Png. I chose some weird values for the swap cause it's just for the sack of this tutorial.
    await swapper.swap(100, [WAVAX_ADDRESS, PNG_ADDRESS], "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367", 1000000000, 1807909162115);

    // Check balance after
    const wavaxBalanceAfter = await wavaxTokenContract.balanceOf(account1.address);
    const pngBalanceAfter = await pngTokenContract.balanceOf(account1.address);

    expect(wavaxBalanceBefore).lt(wavaxBalanceAfter);
    expect(pngBalanceBefore).gt(pngBalanceAfter);
});
```

Aşağıdaki snippet'te belli bir adresteki bir sözleşmenin instance'ını nasıl getirebileceğimizi görüyoruz. Burada yaptığımız şey, ethers'den bize `WAVAX_ADDRESS` ve `PNG_ADDRESS`'te, ABI olarak `IWAVAX` ile deploy edilmiş bir sözleşmeye referans yapan bir nesne vermesini istemektir.

Ardından, kullanacağımız hesabın bakiyesini kontrol ediyoruz ve eğer bakiye bize az gibi görünürse, hesaba bir miktar Avax yatırıyoruz.

```ts
    // We get an instance of the wavax contract
const wavaxTokenContract = await ethers.getContractAt("IWAVAX", WAVAX_ADDRESS)
// @ts-ignore
const pngTokenContract = await ethers.getContractAt("IWAVAX", PNG_ADDRESS)
//makes sure owner has enough WAVAX balance
if ((await wavaxTokenContract.balanceOf(account1.address)).lt("1000000000000000000000")) {
    await wavaxTokenContract.deposit({
        value: BigNumber.from("1000000000000000000000")
            .sub(await wavaxTokenContract.balanceOf(account1.address))
    })
}
```

Şimdi bu testin ilginç kısmına geçiyoruz, yani `Swapper` sözleşmemize gerçek bir çağrı yapıyoruz.

Deploy etmediğimiz sözleşmeyle etkileşimde bulunduğumuzu görebiliyoruz, yine çatal özelliği sayesinde. Örneğin burada WAVAX sözleşmesinin onay işlevini çağırıyoruz. Ve swap işleminden önce adresimizin bakiyesini de kontrol ediyoruz.

Sonra Swapper sözleşmesinin swap işlevine gerçek çağrıyı yapıyoruz. Gerekli parametreleri iletiyoruz. Burada parametrelere genel bir bakış yer alıyor:

* `100`, bu swap için almak istediğimiz minimum token tutarıdır. Bu bir test olduğu için miktar kasten düşük tutuldu.
* `[WAVAX_ADDRESS, PNG_ADDRESS]`, girmek istediğimiz yolu belirten bir adres dizilimidir, en basit ifadeyle, WAVAX tokenından PNG tokenına gitmek istiyoruz demektir.
* `0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367`, WAVAX * PNG için Pangolin Likidite Çiftinin adresine karşılık gelir.
* `1000000000` PNG için swap yapmaya hazır olduğumuz wavax tutarıdır.
* `1807909162115` son tarih parametresine karşılık geldiği için göz ardı edilebilir. Avalanche'da (bildiğim kadarıyla) işe yaramaz çünkü işlemler çok kısa bir zaman diliminde (çoğu zaman bir saniyeden daha kısa sürede) kesinleştirilir.

Daha sonra adresimizin bakiyesini tekrar getiriyoruz. Ve bakiyelerin varsayımlarımıza denk gelip gelmediğini kontrol ediyoruz. Denk geliyorsa, bunun anlamı, kodumuz bu işlev için umduğumuz gibi çalışıyor, demektir.

```ts
// We tell Wavax contract that we are cool with Swapper contract using our Wavax on our behalve
await wavaxTokenContract.approve(swapper.address, ethers.constants.MaxUint256);

// Check balance before the swap
const wavaxBalanceBefore = await wavaxTokenContract.balanceOf(account1.address);
const pngBalanceBefore = await pngTokenContract.balanceOf(account1.address);

expect(wavaxBalanceBefore).eq("1000000000000000000000");
expect(pngBalanceBefore).eq(0);

// We call Swapper contract to make a swap from Wavax to Png. I chose some weird values for the swap cause it's just for the sack of this tutorial.
await swapper.swap(100, [WAVAX_ADDRESS, PNG_ADDRESS], "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367", 1000000000, 1807909162115);

// Check balance after
const wavaxBalanceAfter = await wavaxTokenContract.balanceOf(account1.address);
const pngBalanceAfter = await pngTokenContract.balanceOf(account1.address);

expect(wavaxBalanceAfter).lt(wavaxBalanceBefore);
expect(pngBalanceAfter).gt(pngBalanceBefore);
```

Kodu uygulamada görmek isterseniz, bu komutu terminalde çalıştırmanız gerekir: `npx hardhat test`.

Bunu yaptığınızda şöyle bir çıktı üretilir: ![hardhat_tuto_img_01.png](hardhat_tuto_img_01.png)

Harika! Avalanche CChain mainnet'inin bir çatalını kullanarak sözleşmemizi başarıyla test ettik.

## Bonus

### Zamanda yolculuk

Şimdi size tanıtacağım birkaç şey daha var.

Diyelim ki WAVAX PNG çiftinde çalışan bir compounder sözleşmesi test etmek istiyorsunuz. En çok ilgilendiğiniz şey, compounder sözleşmenizin farm ödülünü farm'a yeniden yatırıp yatıramayacağını görmektir. Sorun şu ki, bu ödül süreye bağımlıdır (`time bound`), yani ödülünüzün arttığını görmek için biraz beklemeniz gerekiyor. Hardhat, bu tür bir durumu kolayca test etmenin bir yolunu sağlar.

Aşağıdaki snippet'te, `HardhatRuntimeEnvironment` ortamından süreyi değiştirecek bir fonksiyon çağırdığımızı görüyorsunuz. Ardından yeni bir blok mine ediyoruz. Bu, bir pangolin farm'ından 'yapay olarak' bir haftalık ödül almanıza imkan verecektir ve de compounder sözleşmenizi test edebiliyor olmanız gerekir! Harika, değil mi?

```ts
// Advance the time to 1 week so we get some reward
await hre.ethers.provider.send('evm_increaseTime', [7 * 24 * 60 * 60]);
await network.provider.send("evm_mine");
```

### Impersonation

Hardhat'in oldukça kullanışlı bir başka özelliği daha var: `impersonation`. Bu özelliği kullanarak, başka biriymişsiniz gibi, örneğin halihazırda deploy edilmiş bir sözleşmenin sahibiymişsiniz gibi sözleşme çağrısı yapabilirsiniz.

Aşağıdaki snippet'te, elkIlpStrategyV5'ten `setCoverageAmount` fonksiyonunu çağırmak istiyoruz. Bu fonksiyon yalnızca sözleşmenin sahibi tarafından çağrılabilir. Dolayısıyla bizim kontrol ettiğimiz bir adres tarafından çağrılamaz. Aşağıdaki snippet'e bakın.

```ts
// We impersonate the 'owner' of the WAVAX-ELK StakingRewardsILP contract
await ethers.provider.send('hardhat_impersonateAccount', ['0xcOffeexxxxxxxxxxxxxxxxxxxxxxx']);
const admin = await ethers.provider.getSigner('0xcOffeexxxxxxxxxxxxxxxxxxxxxxx')

const stakingcontract = await ethers.getContractAt('IStakingRewardsILPV2', elpStakingRewardAddress, admin);
// We set the coverage elpBalanceAccount1 for our Strategy
await stakingcontract.setCoverageAmount(elkIlpStrategyV5.address, 1000000000000);

await hre.network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: ["0xba49776326A1ca54EB4F406C94Ae4e1ebE458E19"],
});
```

Burada gördüğünüz gibi şununla başlıyoruz

```ts
await ethers.provider.send('hardhat_impersonateAccount', ['0xcOffeexxxxxxxxxxxxxxxxxxxxxxx']);
const owner = await ethers.provider.getSigner('0xcOffeexxxxxxxxxxxxxxxxxxxxxxx')
```

Yani, `IStakingRewardsILPV2` sözleşmesinin sahibi (`owner`) olan `0xcOffeexxxxxxxxxxxxxxxxxxxxxxx` adresini `impersonate` edeceğiz.

Bunun ardından, sözleşmeyle etkileşimde bulunmak için, bir sonraki bölümde göreceğimiz gibi, `admin` imzacısını (signer) kullanabiliriz:

```ts
const stakingcontract = await ethers.getContractAt('IStakingRewardsILPV2', elpStakingRewardAddress, owner);
```

## Sonuç

Bu eğitim makalesinde, Avalanche'ın CChain'inin bir çatalını kullanmak ve bunu testlerimizde bir temel olarak kullanmak için Hardhat ortamımızı nasıl kuracağımızı öğrendik. Hardhat hakkında daha fazla bilgi edinmek isterseniz, şirketin [resmi dokümanlarına](https://hardhat.org/getting-started/) mutlaka bir bakın derim.

Umarım bu eğitim makalesinden bir şeyler öğrenmişsinizdir; bir yanlışlık ya da yazım hatası bulursanız lütfen bana bildirin. Ayrıca, X'i Avalanche'la nasıl kullanılacağına dair başka bir eğitim almak isterseniz bana haber verin!

# Ek bağlantılar

Avalanche hakkında daha fazla bilgi edinmek isterseniz, buraya sizin için birkaç bağlantı ekliyorum:

[Web sitesi](https://avax.network/) | [Teknik Dokümanlar](https://avalabs.org/whitepapers)
 | [Twitter](https://twitter.com/avalancheavax) | [Discord](https://chat.avalabs.org/)
 | [GitHub](https://github.com/ava-labs) | [Dokümanlar](https://docs.avax.network/)
 | [Forum](https://forum.avax.network/) | [Avalanche-X](https://avalabs.org/avalanche-x)
 | [Telegram](https://t.me/avalancheavax) | [Facebook](https://facebook.com/avalancheavax)
 | [LinkedIn](https://linkedin.com/company/avalancheavax) | [Reddit](https://reddit.com/r/avax)
 | [YouTube](http://www.youtube.com/c/AVALabsOfficial)
