# Set up your development environment for local subnet development

If you are not familiar with subnets, virtual machines or similar terminology you can refer to [Subnet Overview](https://docs.avax.network/subnets).

## Introduction

This tutorial's goal is to deploy and start a basic subnet in your local machine. So that you can interact with the subnet using [Remix](https://remix.ethereum.org/) and [Hardhat](https://hardhat.org/). In this tutorial we will be using [avalanche-cli](https://github.com/ava-labs/avalanche-cli) to create and deploy the subnet. If you ever encounter an error, refer to [Troubleshoot Common Issues](#troubleshoot-common-issues) section.

:::info avalanche-cli is in beta version. So it might get updated fairly frequently. It is best to refer to the latest version from its [github page](https://github.com/ava-labs/avalanche-cli). :::

If you want to customize your subnet you can refer to the optional [Customize the Subnet](#customize-the-subnet) section, while creating your subnet.

Steps to follow:

1. Install avalanche-cli
2. Create the subnet
3. Deploy the subnet
4. Interact with the subnet

   4.1 Using Remix

   4.2 Using Hardhat

5. Interact with precompiles (Optional)

## Requirements

- Mac or Linux environment

## Step 1: Install avalanche-cli

To build avalanche-cli you have to first install golang. Follow the instructions here: [https://go.dev/doc/install](https://go.dev/doc/install).

After downloading golang, to download avalanche-cli's latest version, run:

```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

:::note This command will download the bin to the `./` (relative to where the command has run). To download in a custom location refer to [Installing in Custom Location](#installing-in-custom-location). :::

To add avalanche to PATH, run:

```bash
cd bin;\
export PATH=$PWD:$PATH
```

:::note This command will add avalanche-cli to the PATH temporarily, which means that, when you reopen your terminal you would not be able to run 'avalanche' command. So, to add it permanantly refer to [Add Avalanche Command Permanently](#add-avalanche-command-permanently) section. :::

#### Installing in Custom Location

To download the binary to a specific directory, run:

```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s -- -b <relative-directory>
```

#### Add Avalanche Command Permanently

To add avalanche command to your path:

##### MacOS

1. Open shell config file.
   - If you are using `zsh` shell, open `${HOME}/.zprofile` in a text editor.
   - If you are suing `bash` shell, open `${HOME}/.bash_profile` in a text editor.
2. Add this line, ` export PATH="<path-of-avalanche-bin-directory>:${PATH}"` to the file.
3. Restart the terminal and run `avalanche`.

##### Linux

1. Open shell config file, `${HOME}/.bashrc` in a text editor.
2. Add this line, `export PATH="<path-of-avalanche-bin-directory>:${PATH}"` to the file.
3. Restart the terminal and run `avalanche`.

:::note If you have run the installation command at `$HOME` directory. `<path-of-avalanche-bin-directory>` would be `${HOME}/bin`. :::

## Step 2: Create the subnet

To create the subnet, run:

```bash
avalanche subnet create <subnetName>
```

When you run this command you will be walked through the customization of the subnet. You can learn more about the configuration details at [Customize the Subnet](#customize-the-subnet) section.

Example walk through:

- `Choose your VM`: SubnetEVM
- `ChainId`: 676767
- `Select a symbol for your subnet's native token`: SUB
- `How would you like to set the fees`: Low disk use...
- `How would you like to distribute the funds`: Airdrop 1 million tokens to the default address
- `Advanced: Would you like to add a custom precompile to modify the EVM?`: No

You have successfully created the genesis file for your subnet. You can read more about genesis [here](https://docs.avax.network/subnets/customize-a-subnet#genesis).

To see details about the subnet, run:

```bash
avalanche subnet describe <subnetName>
```

To see the genesis file directly, run:

```bash
avalanche subnet describe <subnetName> --genesis
```

## Step 3: Deploy the subnet

To deploy the subnet locally, run:

```bash
avalanche subnet deploy <subnetName> -l
```

After a successful deployment, an example of what you would see:

```text
Network ready to use. Local network node endpoints:
Endpoint at node node4 for blockchain "2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf" with VM ID "srEXiWaHq58RK6uZMmUNaMF2FzG7vPzREsiXsptAHk9gsZNvN": http://127.0.0.1:37868/ext/bc/2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf/rpc
Endpoint at node node5 for blockchain "2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf" with VM ID "srEXiWaHq58RK6uZMmUNaMF2FzG7vPzREsiXsptAHk9gsZNvN": http://127.0.0.1:61314/ext/bc/2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf/rpc
Endpoint at node node1 for blockchain "2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf" with VM ID "srEXiWaHq58RK6uZMmUNaMF2FzG7vPzREsiXsptAHk9gsZNvN": http://127.0.0.1:29281/ext/bc/2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf/rpc
Endpoint at node node2 for blockchain "2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf" with VM ID "srEXiWaHq58RK6uZMmUNaMF2FzG7vPzREsiXsptAHk9gsZNvN": http://127.0.0.1:56438/ext/bc/2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf/rpc
Endpoint at node node3 for blockchain "2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf" with VM ID "srEXiWaHq58RK6uZMmUNaMF2FzG7vPzREsiXsptAHk9gsZNvN": http://127.0.0.1:51473/ext/bc/2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf/rpc

Metamask connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:37868/ext/bc/2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Network name:     subnetName
Chain ID:         676767
Currency Symbol:  SUB
```

Make sure to save `Metamask connection details`. You will need the relevant information (RPC URL, Funded address, etc.) to interact with your subnet

Important thing to keep in mind is that, now that you have deployed your subnet it has started running in your local machine. So, after you are done interacting with your subnet you can stop running it and when you want to interact with it again, you can start running it.

To stop running the subnet, you could run:

```bash
avalanche network stop
```

:::info Do not worry, when you stop running the subnet it will save the state of the subnet and when it starts again it will continue from that state. :::

To start running the subnet, you could run:

```bash
avalanche network start
```

:::info Do not worry, when you restart the subnet rpc urls will not change. Therefore, you do not have to adjust the network in your metamask or anywhere else. :::

## Step 4: Interact with the Subnet

This tutorial will cover interacting with the subnet through [Remix](https://remix.ethereum.org/) and [Hardhat](https://hardhat.org/).

### Step 4.1: Using Remix

Firstly, we will be adding our subnet to [metamask](https://metamask.io/). To add the subnet, refer to [Deploy a Smart Contract on Your Subnet EVM Using Remix and Metamask](https://docs.avax.network/subnets/deploy-a-smart-contract-on-your-evm#step-1-setting-up-metamask) you should replace the values with your subnet values that are printed out after you have created it. If your balance is zero after you add subnet to the metamask, refer to [Access Funded Accounts](#access-funded-accounts).

Example Values:

```text
Network Name: <subnetName>
New RPC URL: http://127.0.0.1:37868/ext/bc/2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf/rpc
ChainID: 676767
Symbol: SUB
```

#### Access Funded Accounts

If you followed the exact steps in this tutorial, you would see that your balance on metamask is zero. That is because we have only airdropped to the default account which is `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`. Therefore, your account on metamask has zero tokens and cannot send any transactions. So, to interact with the chain we have to use the address that is airdropped.

- Steps to import the airdropped account
  1. Open your metamask extension
  2. Click on the account image
  3. Click "Import Account"
  4. Select type: Private Key
  5. Enter private key of the default airdrop account, which is `56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`
  6. Click "Import"

### Step 4.2: Using Hardhat

To interact with the subnet using Hardhat, refer to [Using Hardhat with the Avalanche C-Chain](https://docs.avax.network/dapps/smart-contracts/using-hardhat-with-the-avalanche-c-chain). It is very similar to interacting with C-Chain. You only have to change `hardhat.config.ts` file. Inside that file, find the exported js object and inside of it find `networks`. Add a new network which will be your subnet.

```typescript
subnet: {
  url: "<yourRpcUrl>",
  chainId: <yourChainId>,
  accounts: ["<accounts-private-key>"]
}
```

Example Values:

```typescript
subnet: {
  url: "http://127.0.0.1:37868/ext/bc/2ALrMJ74YHrq6gRXzZkmYaAx6tJhshybkWr8m71r56E7Cv25Qf/rpc",
  chainId: 676767,
  accounts: ["56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"]
}
```

Example Updated File: [hardhat.config.ts](./hardhat.config.ts.md)

Now you can run any commands ran in the tutorial with `--network subnet` parameter

Example command:

```bash
yarn deploy --network subnet
```

### Step 5: Interact with precompiles (Optional)

If you have followed the tutorial as it is, you do not need this part. Since, in this tutorial we did not add any precompiles to the subnet. Therefore, this step is optional and helpful only if you are trying to extend your subnet with precompiles.

To checkout current precompiles provided by Ava Labs refer to [this](https://docs.avax.network/subnets/customize-a-subnet#precompiles). There are 3 precompiles shared by Ava Labs at the time this documentation is written.

- [Contract Deployer Allow List](https://docs.avax.network/subnets/customize-a-subnet#restricting-smart-contract-deployers): restricts the addresses who can deploy contracts
- [Transaction Allow List](https://docs.avax.network/subnets/customize-a-subnet#restricting-who-can-submit-transactions): restricts the addresses who can send transactions
- [Native Minter](https://docs.avax.network/subnets/customize-a-subnet#minting-native-coins): allows given addresses to mint native token

This tutorial will show how to interact with them using Remix.

:::caution Before trying to interact with any of the precompiles make sure to add them while [creating the subnet](#step-2-create-the-subnet). You can not add them afterwards. :::

#### General steps to interact with precompiles

1. While creating the subnet you will be prompted `Advanced: Would you like to add a custom precompile to modify the EVM?:` answer `Yes` then choose the precompile you would like to add. Make sure to add your address as admin by following `Add admin` and entering your address. Do not forget that you can always get more details by selecting `More info` inside the command line.

   :::warning If you are adding the `Transaction allow list` precompile, make sure to add the airdrop reciever address as admin so that the address with funds could send transactions. :::

2. Open [remix](https://remix.ethereum.org) and make sure that your metamask is using your subnet and the remix's environment is using `Injected Web3`. Then, create a solidity file with respective recommended file name and add the respective precompile interface, refer to specific precompile to see details.

3. Load precompile to the respective address, refer to specific precompile to see their addresses.
4. Call precompile functions

##### Interact with Contract Deployer Allow List

Recommended file name: `IContractDeployerAllowList.sol`

Precompile Interface: [Contract Deployer Allow List](./precompiles/AllowList.md)

Precompile address: `0x0200000000000000000000000000000000000000`

There are 2 main roles for Contract Deployer Allow List precompile; `Admin` and `Deployer`.

- `Admin`
  - Can add new admins and deployers
  - Can deploy contracts
- `Deployer`
  - Can deploy contracts

To check the role of an address run `readAllowList` function. It returns 0, 1 or 2, corresponding to the roles `None`, `Deployer`, and `Admin` respectively.

##### Interact with Transaction Allow List

Recommended file name: `ITxAllowList.sol`

Precompile interface: [Transaction Allow List](./precompiles/AllowList.md)

Precompile address: `0x0200000000000000000000000000000000000002`

There are 2 main roles for Transaction Deployer Allow List precompile; `Admin` and `Allowed`.

- `Admin`
  - Can add new admins and alloweds
  - Can send transactions
- `Allowed`
  - Can send transactions

To check the role of an address run `readAllowList` function. It returns 0, 1 or 2, corresponding to the roles `None`, `Allowed`, and `Admin` respectively.

##### Interact with Native Minter

Recommended file name: `INativeMinter.sol`

Precompile interface: [Native Minter](./precompiles//NativeMinter.md)

Precompile address: `0x0200000000000000000000000000000000000001`

There are 2 main roles for NativeMinter precompile; `Admin` and `Minter`.

- `Admin`
  - Can add new admins and minters
  - Can mint native token
- `Minter`
  - Can mint native token

To check the role of an address run `readAllowList` function. It returns 0, 1 or 2, corresponding to the roles `None`, `Minter`, and `Admin` respectively.

## Customize the Subnet

- `VM`: To understand and create your custom VM you can refer to [this](https://docs.avax.network/subnets/create-a-virtual-machine-vm).
- `ChainId`: You want your `ChainId` parameter to be unique. To make sure that your subnet is secure against replay attacks. To see registered `ChainIds` you can check [chainlist.org](https://chainlist.org/). At the top right of the site make sure to turn on the button to include testnets.
- `Gas Parameters`: Ava Labs recommends the low-low option and C-Chain currently uses this option. But, if you know what you are doing you are free to customize. Note that higher disk usage has some trade offs, it would require more processing power and cause it to be more expensive to maintain.
- `Airdrop Address`: You would not like to use the default address in production, that is recieving the 1 million tokens. Because, it is a compromised wallet, which means that its private key is well known by others. If you add a custom address to recieve airdrop. Avalanche-cli will ask you to give an amount in AVAX, in that case do not enter the value thinking as in `ether` but in `gwei` to correctly airdrop the amount you want. As an example, to airdrop `1` whole token, as in one ether, you would enter the value `1000000000`.
- `Precompiles`: You can learn what precompiles are by refering to [this](https://docs.avax.network/subnets/customize-a-subnet#precompiles).

## Troubleshoot Common Issues

### Step 1: Install avalanche-cli

- `avalanche`, `avalanche subnet`
  - `"command not found: avalanche"`
    It means that `avalanche` command is not added to the PATH environment variable. It could be caused by following reasons;
    - You have added the wrong `bin` directory to your environment variables.
      - Make sure to find where the `bin` directory is and run `export PATH=$PWD:$PATH` inside the `bin` directory.
    - You have added it to the PATH environment variable temporarily and restarted your terminal.
      - You can either add the `bin` directory to the PATH environment variable again by running `export PATH=$PWD:$PATH` inside the downloaded `bin` directory or you can refer to [Add Avalanche Command Permanently](#add-avalanche-command-permanently)

### Step 2: Create the Subnet

- `avalanche subnet create <subnetName>`

  - `"Error: Configuration already exists..."`
    It means that you have already created a subnet with the same name. To check if that is the case, you can run `avalanche subnet list` which would list the subnets you have. If you have a subnet with the same name, you can try to create with a different name, delete the existing subnet by running `avalanche subnet delete <subnetName>` or overwrite the existing one by running `avalanche subnet create <subnetName> --force`

### Step 3: Deploy the subnet

- `avalanche subnet deploy <subnetName> -l`

  - `"Error: failed to query network health: ..."`
    You can check logs which are located at `$HOME/.avalanche-cli/logs` or try to run the command once more.

  - `"Error: failed to start network : ..."`
    It means that you have deployed a subnet before and are trying to deploy another one without stopping the initial one. To solve this issue, run:
    `avalanche network stop` and try to deploy your subnet again.

### Step 4: Interact with the subnet

- Errors are generally covered in the linked tutorials. Be sure to check them out.
- When you try to interact with the subnet you might try to interact with an account that has no balance. Make sure that you have followed [Access Funded Accounts](#access-funded-accounts). If you are having a problem interacting using Hardhat, make sure that the private key corresponds to an account which has balance.

### Step 5: Interact with precompiles (Optional)

- Common issues are troubleshooted at the official avalanche docs, to check them out refer to [this](https://docs.avax.network/subnets/customize-a-subnet#precompiles).
  - For `Contract Deployer Allow List`, refer to [this](https://docs.avax.network/subnets/customize-a-subnet#restricting-smart-contract-deployers).
  - For `Transaction Allow List`, refer to [this](https://docs.avax.network/subnets/customize-a-subnet#restricting-who-can-submit-transactions).
  - For `Native Minter`, refer to [this](https://docs.avax.network/subnets/customize-a-subnet#minting-native-coins).

## Conclusion

That is it! That is how you could create and deploy your local subnet from scratch.

In this tutorial, we learned:

- Installing and using avalanche-cli.
- Creating a subnet and customizing it.
- Deploying the subnet locally for local development.
- Interacting with locally deployed subnet using Remix and Hardhat.
- Optionally, we learned how to interact with precompiles.
