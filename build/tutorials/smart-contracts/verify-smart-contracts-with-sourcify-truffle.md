# 创建项目

_本教程包含了 truffle [快速启动文件](https://www.trufflesuite.com/docs/truffle/quickstart)的项目，并受到 [blockscout 文件](https://docs.blockscout.com/for-users/smart-contract-interaction/verifying-a-smart-contract/contracts-verification-via-sourcify)的启发_

确保您已安装 truffle：
```
npm install -g truffle
```

为您的 Truffle 项目创建一个新目录：

```zsh
mkdir MetaCoin
cd MetaCoin
```

下载 ("开箱")  MetaCoin 箱子：
```
truffle unbox metacoin
```


操作完成后，您现在将有一个项目结构，包含以下内容：

* ``contracts/``： Solidity 合约的目录
* ``migrations/``：脚本部署文件的目录
* ``test/``：测试文件（测试您的应用程序和合约）的目录
* ``truffle.js``： Truffle 配置文件

## 编译
设置环境：

```zsh
yarn add @truffle/hdwallet-provider
```


在项目根目录中创建  ``.env.json``文件：

```json
{"mnemonic": "your-wallet-seed-phrase"}
```

适当地配置您的  ``truffle-config.js``文件：


```js
/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 const HDWalletProvider = require("@truffle/hdwallet-provider");

 //
 const { mnemonic } = require('./.env.json');

 module.exports = {
   /**
    * Networks define how you connect to your ethereum client and let you set the
    * defaults web3 uses to send transactions. If you don't specify one truffle
    * will spin up a development blockchain for you on port 9545 when you
    * run `develop` or `test`. You can ask a truffle command to use a specific
    * network from the command line, e.g
    *
    * $ truffle test --network <network-name>
    */

   networks: {

    fuji: {
      provider: () => new HDWalletProvider(mnemonic, `https://api.avax-test.network/ext/bc/C/rpc`),
      network_id: "*",
      timeoutBlocks: 200,
      skipDryRun: true
    }
   },
 };
```
_可以配置网络以进行主网部署（请参阅[替代方案](verify-smart-contracts-with-sourcify-truffle.md#alternatives)）_

运行以下命令：

```zsh
truffle compile
```


一旦操作完成，您的  ``./build/contracts``文件夹应该包含以下内容：


* ``ConvertLib.json``
* ``MetaCoin.json``
* ``Migrations.json``

_您需要 ``MetaCoin.json`` 以供今后使用_

## 迁移

运行以下命令：
```zsh
truffle migrate --network fuji
```

您应该查看您的终端的 txn 活动

![第一步](https://user-images.githubusercontent.com/73849597/128948790-654fc0dc-25d5-4713-9058-dfc4101a8366.png)<br>![第二步](https://user-images.githubusercontent.com/73849597/128949004-c63d366f-3c0e-42e0-92f5-cb86da62bcba.png)<br>![第三步](https://user-images.githubusercontent.com/73849597/128948793-3cb1beda-00c3-47e2-ab43-7b4712b1cf1d.png)


_您需要您的 MetaCoin 合约地址以供今后使用_


# 在 C-Chain 浏览器上验证智能合约

C-Chain 浏览器支持验证智能合约，允许用户对其进行审查。

主网 C-Chain 浏览器[在此处](https://cchain.explorer.avax.network/)，Fuji 测试网浏览器[在此处](https://cchain.explorer.avax-test.network/)。

如果您有任何问题，请在 [Discord](https://chat.avalabs.org) 上与我们联系。

## 步骤
* 导航到合约地址的浏览器页面的_代码_选项卡。

![CodeTab2](https://user-images.githubusercontent.com/73849597/128950386-35d89fe5-c61f-41b0-badf-87a487bf422c.png)


* 点击_验证和发布_，进入智能合约验证页面

![SourcifyVerify](https://user-images.githubusercontent.com/73849597/128950515-cc74c92f-6da3-485f-bb7f-a033eb59bd2e.png)


* 点击 _Sourcify：源和 metadataJSON 文件_

* 点击_下一步_

![JSONSourcify](https://user-images.githubusercontent.com/73849597/128950634-55bdd46e-885b-437e-84d2-534bd1801df0.png)

* 上传  ``MetaCoin.sol````ConvertLib.sol`` 和 ``MetaCoin.json``（在构建文件夹中找到）

* 点击_验证和发布_



![MetaCoin](https://user-images.githubusercontent.com/73849597/128950810-b1b5c280-267b-47ce-9922-edd36a157cd6.png)

* 查看已验证的合约：[MetaCoin](https://cchain.explorer.avax-test.network/address/0xf1201EA651Ed5F968920c8bC62Fd76ea4CBfd9C2/contracts)


# 替代方案

## 用于验证的 Flatten 文件
```zsh
yarn add truffle-flattener
```

运行以下命令：

```zsh
npx truffle-flattener contracts/MetaCoin.sol > contracts/MetaCoin_flat.sol
```

重复编译、迁移和验证步骤

## 主网部署

适当地配置您的  ``truffle-config.js``文件：

```js
module.exports = {
...
   networks: {

    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://api.avax.network/ext/bc/C/rpc`),
      network_id: "*",
      timeoutBlocks: 200,
      skipDryRun: true
    }
   },
 };
```
运行以下命令：
```zsh
truffle migrate --network mainnet
```

