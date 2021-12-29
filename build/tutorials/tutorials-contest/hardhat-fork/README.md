## Introduction

Dans ce tutoriel, nous couvrirons l'utilisation de Hardhat, un outil de développement EVM puissant, avec Avalanche. Plus précisément, nous verrons comment le configurer pour qu'il fonctionne avec Avalanche CChain et comment utiliser le mécanisme `fork`Hardhat
  pour tester vos DeFi d4apps.

### Hardhat ?

Hardhat est un **environnement de développement Ethereum pour les professionnels**. Il a été développé pour Ethereum, mais depuis, de nombreuses autres blockchains réutilisent l'EVM, vous pouvez appliquer Hardhat sur celles-là aussi !

En bref, il vous aide dans toutes les étapes importantes du développement de contrats intelligents. De la compilation, du déploiement en passant par les tests de votre code Solidity. Il a même une fonctionnalité pour vous permettre d'utiliser 'console.log' dans le code de votre contrat intelligent »!

Ce n'est pas le but de ce tutoriel de passer en revue toutes ces fonctionnalités (peut-être dans un autre tutoriel, pourquoi pas :) ), donc
 voici quelques liens si vous souhaitez en savoir plus :

* https://hardhat.org/getting-started/
* https://github.com/nomiclabs/hardhat

## Qu'est-ce que la fonctionnalité « duplication »?

Alors retournons au noyau de ce tutoriel : mécanisme de duplication Hardhat.

Afin de vous faire réaliser l'importance de cette fonctionnalité, permettez-moi de vous donner un exemple :

Supposons que vous avez un contrat simple `Swapper.sol`. Il a une fonction  `swap`qui, une fois appelé avec les paramètres appropriés, échangera pour vous des jetons Wavax contre d'autres jetons ERC20 listés sur un DEX. Pour ce tutoriel nous utiliserons [Pangolin](https://pangolin.exchange/)

Le flux de celui-ci serait :

```
1* Your send a call to Swapper's swap function
2* Swapper use Pangolin's router `swapExactTokensForTokens` function, it will find the appropriate Pair contract address to call
3* Pangolin's router call a Pair contract to make the swap
```

Remarquez qu'il faut faire appel à des contrats externes.

Si vous souhaitez tester votre `swap`fonction  Swapper  , vous devez ensuite configurer dans votre environnement de test :

* 2 contrats ERC20
* Usine Pangolin
* Contrat du routeur de Pangolin
* Un contrat en paire (PGL) utilisant vos 2 ERC20 précédemment créés.
* Et tout cela avec les paramètres appropriés du constructeur, reliant tout cela ensemble. Faisable, mais il faudra du temps pour configurer tout ça correctement.

Et si je vous disais que nous pourrions éviter tout cela et passer directement à l'étape où vous créez des tests pour vos
 contrats intelligents.

C'est là que la « duplication Hardhat » s'avère utile.

Avec cette fonction, vous pouvez simplement faire une copie de l'état d'une chaîne EVM (dans notre cas, la CChain) et l'utiliser directement dans vos
 tests ! Avec tous les contrats, le solde des adresses disponible.

Ainsi, dans notre cas, nous n'aurions pas à déployer tous les contrats pertinents de Pangolin, nous pourrions simplement utiliser celui déployé sur
 le mainnet et tester votre contrat intelligent sans beaucoup de problèmes.

## Explication étape par étape

### Aperçu des contrats intelligents

Tout d'abord, passons rapidement en revue le code Solidity que nous allons utiliser :

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

### Configuration Hardhat

Comme vous pouvez le voir, nous utilisons certains contrats externes (routeur Pangolin ). Ce qui veut dire que si vous voulez tester ce code... vous devrez
 simuler/créer ce routeur et tous les contrats que ce routeur utilise ... Un peu ennuyeux, non ?

Grâce à Hardhat, nous pouvons nous faciliter la vie et nous en passer complètement.

D'abord, nous devons configurer Hardhat. Si vous cherchez dans `hardhat.config.ts`, vous verrez cela :

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

La partie la plus intéressante du code ici est la `network`partie . C'est là que vous configurez des réseaux que vous souhaitez utiliser avec votre projet. Comme vous pouvez le voir ci-dessus, nous avons défini deux réseaux pour ce tutoriel :

* `hardhat`, qui est également le `defaultNetwork`.
* `fuji`, qui pointe vers fuji testnet.

Notez que vous pouvez mettre plusieurs définitions de réseau, l'une d'entre elles étant considérée comme la définition par défaut. Ce qui signifie que lorsque vous utilisez
`npx hardhat test` , il utilisera le réseau par défaut. Si vous souhaitez exécuter le test sur un autre réseau que celui par défaut, vous
 pouvez utiliser cette variante de la commande :
`npx hardhat test --network fuji`

Maintenant, concentrons-nous sur ce `hardhat`.

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

* `chainId` est défini à la valeur du réseau principal, comme on peut le voir
    [ici](https://docs.avax.network/build/avalanchego-apis/contract-chain-c-chain-api).
* `gasPrice` est une valeur dynamique sur le CChain d'Avalanche (pour plus d'informations, voir ce [post](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60) ). Pour les besoins du test, nous pouvons utiliser une valeur fixe (225 nAvax)
* `forking` est l'endroit où vous configurez le paramètre de la duplication.
   * `url` ici nous voyons que nous pointons vers le point de terminaison de l'api d'Ava Labs. Il peut s'agir de votre nœud local, tant qu'il
       fonctionne comme nœud d'archive complet. Hardhat se chargera de récupérer l'état de la CChain à partir de ce nœud et de lancer un
       réseau de développement local sur lequel vous pourrez déployer et tester votre code.
   * `blockNumber`Spécifiez à quel bloc Hardhat créera une duplication. C'est facultatif, donc s'il n'est pas défini, le le comportement par défaut serait de dupliquer la CChain au dernier bloc connu. Maintenant, puisque vous souhaitez pouvoir exécuter vos tests de manière déterministe, je vous recommande d'indiquer un numéro de bloc spécifique.

Si vous souhaitez voir toutes les options de configurations, veuillez consulter la [documentation officielle](https://hardhat.org/hardhat-network/reference/) pour cette fonction.

### Aperçu des tests

Nous avons donc passé en revue le code Solidity, la configuration Hardhat. Regardons maintenant comment créer un test en utilisant Hardhat.

Maintenant, regardons le code de test.

Les tests avec Hardhat sont assez simples, beaucoup de choses sont abstraites.

Regardons d'abord le test que j'ai écrit pour notre contrat Swapper, pas d'inquiétude nous allons le disséquer un peu
 plus tard.

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

D'abord, nous avons toutes les importations.

```ts
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "hardhat-deploy-ethers/src/signers";
import { BigNumber } from "ethers";
import { Swapper, IWAVAX } from "../typechain";

dotenv.config();
```

Je ne vais pas plus en détails à ce sujet, il suffit de remarquer que nous utilisons , `typechain`qui est un outil qui génère automatiquement des liaisons typescript pour vos contrats Solidity. En gros, cela signifie que, lorsque nous instancions un objet correspondant à un
 contrat Solidity, nous aurons des saisies complètes et de la saisie semi-automatique.
 Cela vous fait gagner beaucoup de temps et vous aide à écrire un code meilleur et plus
 sûr. (Je ne répéterais jamais assez à quel point j'aime Typescript.)

Dans l'extrait ci-dessous, nous pouvons voir la `beforeEach`fonction (c'est un [hook](https://mochajs.org/#hooks) en fait) qui
 fonctionnera avant chaque cas de test que nous écrivons dans ce fichier.

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

Une ou deux choses à noter ici :

* `await ethers.provider.send(
   "hardhat_reset", ...`Il réinitialisera l'état de votre duplication CChain. Ce qui signifie que chacun de votre test fonctionnera sur une instance propre.
* `let accounts = await ethers.getSigners()`Ethers nous fournit un moyen d'accéder à certains « Signataires ». Ce qui est une manière de représenter le compte CChain que nous pouvons utiliser dans nos tests.
* `const swapperFactory = await ethers.getContractFactory("Swapper")` Nous obtenons ici, via Ethers, un ContractFactory qui est une
    abstraction utilisée pour déployer des contrats intelligents
* `swapper = await swapperFactory.deploy(process.env.WAVAX_ADDRES as string, "0x....");`
   Ici nous utilisons l'usine pour déployer réellement le contrat sur le réseau Hardhat, qui est une version dupliquée de cChain
    mainnet ! Le  résultant `swapper`est un objet (entièrement typé grâce à la chaîne de type) qui représente le `Swapper`contrat ,
    `swap`et sur lequel vous pourrez appeler des fonctions, comme ce  !

Donc, ici, nous voyons le code d'un test. Nous le décomposerons un peu plus et expliquerons chaque partie importante ci-dessous.

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

Dans le snippet suivant, nous voyons comment nous pouvons obtenir une instance de contrat à une adresse spécifique. Donc, ici ce que nous faisons, c'est demander aux ethers de nous donner un objet qui est une référence à un contrat déployé `WAVAX_ADDRESS`sur et `PNG_ADDRESS`, avec  `IWAVAX`comme ABI.

Ensuite, nous vérifions le solde du compte que nous allons utiliser, et si le solde est trop faible à notre goût, nous y déposons un peu
 d'Avax.

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

Maintenant nous nous attaquons à la partie intéressante de ce test, l'appel réel à nos `Swapper`contrats .

Nous pouvons voir que nous interagissons avec le contrat que nous n'avons pas déployé, grâce encore à la fonction de duplication. Par exemple, nous appelons ici. la fonction d'approbation du contrat WAVAX. Et nous vérifions également le solde de notre adresse avant le swap.

Ensuite, nous faisons l'appel réel à la fonction de swap du contrat Swapper. Passer dans les paramètres nécessaires. Voici un aperçu des paramètres :

* `100`, la quantité minimale de jeton que nous voulons recevoir pour ce swap. C'est intentionnellement mis bas car c'est juste un test.
* `[WAVAX_ADDRESS, PNG_ADDRESS]`un tableau d'adresse qui correspond au chemin que nous voulons prendre, en disant essentiellement que nous voulons aller de WAVAX au jeton PNG.
* `0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367`correspond à l'adresse de la paire de liquidités Pangolin pour WAVAX * PNG.
* `1000000000` la quantité de Wavax que nous sommes prêts à échanger contre du PNG.
* `1807909162115` ceci peut être ignoré car il correspond au paramètre de l'échéance. Ce qui est inutile sur Avalanche (afaik) parce que les transactions sont finalisées dans un délai très court (< d'une seconde la plupart du temps).

Ensuite, nous récupérons à nouveau le solde de notre adresse. Et nous vérifions si les soldes correspondent à nos suppositions. Si c'est le cas, cela signifie que notre code fonctionne comme nous l'attendons pour cette fonctionnalité.

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

Si vous souhaitez voir le code en action, vous devez exécuter cette commande dans le terminal :`npx hardhat test`  .

Cela devrait produire un résultat ressemblant à ceci :
 ![hardhat_tuto_img_01.png](hardhat_tuto_img_01.png)

Oui ! Nous avons testé notre contrat en utilisant une duplication du réseau CChain d'Avalanche.

## Bonus

### Voyage dans le temps

Maintenant, j'ai encore deux ou trois choses à vous présenter.

Supposons que vous souhaitez tester un contrat de compilation qui fonctionne sur la paire de PNG WAVAX. Ce qui vous intéresse le plus, c'est de
 voir si votre contrat de compilation peut réinvestir la récompense de l'exploitation dans la ferme. Le problème est que cette récompense est `time bound`, ce qui signifie que vous devez attendre un peu pour voir votre récompense. Hardhat fournit un moyen de tester facilement ce genre de situation.

Dans le snippet ci-dessous, vous voyez que nous appelons une fonction de la `HardhatRuntimeEnvironment`(hre) qui modifiera le temps. Ensuite, nous minons un nouveau bloc. Cela vous permettra d'obtenir « artificiellement » une semaine de récompense d'un élevage de pangolins et vous devriez pouvoir tester votre contrat de compilation ! C'est génial, non ?

```ts
// Advance the time to 1 week so we get some reward
await hre.ethers.provider.send('evm_increaseTime', [7 * 24 * 60 * 60]);
await network.provider.send("evm_mine");
```

### Emprunt d'identité

Il y a un autre fonctionnalité de Hardhat qui est assez utile : la  `impersonation`. Avec cette fonctionnalité, vous pouvez appeler le contrat comme si vous étiez quelqu'un d'autre, comme le propriétaire d'un contrat qui est déjà déployé par exemple.

`setCoverageAmount`Dans le snippet ci-dessous, nous voulons appeler la fonction du elkIlpStrategyV5. Qui ne peut être appelé que
 par le propriétaire du contrat. Donc, pas par une adresse dont nous avons le contrôle. Regardez le snippet suivant.

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

Vous voyez ici que nous commençons par

```ts
await ethers.provider.send('hardhat_impersonateAccount', ['0xcOffeexxxxxxxxxxxxxxxxxxxxxxx']);
const owner = await ethers.provider.getSigner('0xcOffeexxxxxxxxxxxxxxxxxxxxxxx')
```

Ce qui signifie que nous allons `impersonate` l'adresse `0xcOffeexxxxxxxxxxxxxxxxxxxxxxx`qui est le `owner` de la
`IStakingRewardsILPV2` du contrat.

Nous pouvons ensuite utiliser le `admin`signataire  pour interagir avec le contrat, comme nous le voyons dans la section suivante :

```ts
const stakingcontract = await ethers.getContractAt('IStakingRewardsILPV2', elpStakingRewardAddress, owner);
```

## Conclusion

Dans ce tutoriel, nous avons appris comment configurer notre environnement Hardhat pour utiliser une duplication du Cchain d'Avalanche et l'utiliser comme base pour nos tests. Si vous souhaitez en savoir plus sur Hardhat, je ne peux que vous recommander de consulter leur [documentation officielle](https://hardhat.org/getting-started/)

J'espère que vous avez appris quelque chose avec ce tutoriel, faites-moi savoir si vous repérer une erreur, une coquille ... Par ailleurs, si vous souhaitez un autre tutoriel sur l'utilisation de X avec Avalanche, faites-le moi savoir !

# Liens supplémentaires

Si vous souhaitez en savoir plus sur Avalanche, voici un tas de liens pour vous :

[Site](https://avax.network/) | [Livres blancs](https://avalabs.org/whitepapers)
 | [Twitter](https://twitter.com/avalancheavax) | [Discord](https://chat.avalabs.org/)
 | [GitHub](https://github.com/ava-labs) | [Documentation](https://docs.avax.network/)
 | [Forum](https://forum.avax.network/) | [Avalanche-X](https://avalabs.org/avalanche-x)
 | [Telegram](https://t.me/avalancheavax) | [Facebook](https://facebook.com/avalancheavax)
 | [LinkedIn](https://linkedin.com/company/avalancheavax) | [Reddit](https://reddit.com/r/avax)
 | [YouTube](http://www.youtube.com/c/AVALabsOfficial)
