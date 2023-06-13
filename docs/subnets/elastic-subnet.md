# How to Create an Elastic Subnet 

#### Elastic subnets are permissionless subnets. More information can be found [here](https://docs.avax.network/subnets/reference-elastic-subnets-parameters).

This how-to guide focuses on taking an already created permissioned Subnet and transforming it to a
elastic (or permissionless) subnet.

## Prerequisites

- [Avalanche-CLI installed](install-avalanche-cli)
- You have deployed a permissioned Subnet on [local](create-a-local-subnet), on [Fuji](create-a-fuji-subnet) or on  [Mainnet](create-a-mainnet-subnet)

## Transforming a Subnet into Elastic Subnet

In the following commands, make sure to substitute the name of your Subnet configuration for
`<subnetName>`.

To transform your permissioned Subnet into an elastic subnet (NOTE: this action is irreversible), run

`avalanche subnet elastic <subnetName>`

and select the network that you want to transform the subnet on. Alternatively, you can bypass this prompt by providing
the `--local`, `--fuji`, or `--mainnet` flag. 

Provide the name and the symbol for the permissionless subnet's native token. You can also bypass this prompt by providing
the `--tokenName` and `--tokenSymbol` flags.

Next, select the elastic subnet config. You can choose to use the default values detailed [here](https://docs.avax.network/subnets/reference-elastic-subnets-parameters#primary-network-parameters-on-mainnet)
or customize the elastic subnet config. To bypass the prompt, you can use `--default` flag to use the default elastic subnet config.

The command may take a couple minutes to run.

### Elastic Subnet Transformation on Fuji and Mainnet

Elastic subnet transformation on public network requires private key loaded into the tool, or a connected ledger device.

Both stored key usage and ledger usage are enabled on Fuji (see more on creating keys [here](https://docs.avax.network/subnets/create-a-fuji-subnet#private-key)) while only ledger usage is enabled on Mainnet (see more on setting up your ledger [here](https://docs.avax.network/subnets/create-a-mainnet-subnet#setting-up-your-ledger)) .

To transform a permissioned subnet into elastic subnet on public networks, users are required to provide the keys that control the Subnet defined during the subnet deployment process (more info on keys in Fuji can be found [here](https://docs.avax.network/subnets/create-a-fuji-subnet#deploy-the-subnet), while more info on ledger signing in Mainnet can be found [here](https://docs.avax.network/subnets/create-a-mainnet-subnet#deploy-the-subnet)). 

### Results

If all works as expected, you then have the option to automatically transform all existing permissioned validators to permissionless validators. 

You can also to skip automatic transformation at this point and choose to manually add permissionless validators later.

You can use the output details such as the Asset ID and Elastic Subnet ID to connect to and interact with your elastic Subnet.

## Adding Permissionless Validators to Elastic Subnet

If you are running this command on local network, you will need to first remove permissioned validators (by running `avalanche subnet removeValidator <subnetName>`)
so that you can have a list of local nodes to choose from to be added as a permissionless validator in the elastic csubnet.

To add permissionless validators to an elastic subnet, run

`avalanche subnet join <subnetName> --elastic`

You will be prompted with which node you would like to add as a permissionless validator. You can skip this prompt by using `--nodeID` flag.

You will then be prompted with the amount of the subnet native token that you like to stake in the validator. Alternatively, you can bypass this prompt by providing
the `--stake-amount` flag. Note that choosing to add the maximum validator stake amount (defined during elastic subnet transformation step above) means that you effectively disable delegation in your validator.

Next, select when the validator will start validating and how long it will be validating for. You can also bypass these prompts by using `--start-time` and `--staking-period` flags.

## Adding Permissionless Delegator to a Permissionless Validator in Elastic Subnet

To add permissionless delegators, run

`avalanche subnet addPermissionlessDelegator <subnetName>`

You will be prompted with which subnet validator you would like to delegate to. You can skip this prompt by using `--nodeID` flag.

You will then be prompted with the amount of the subnet native token that you like to stake in the validator. Alternatively, you can bypass this prompt by providing
the `--stake-amount` flag. The amount that can be delegated to a validator is detailed [here](https://docs.avax.network/subnets/reference-elastic-subnets-parameters#delegators-weight-checks).

Next, select when you want to start delegating and how long you want to delegate for. You can also bypass these prompts by using `--start-time` and `--staking-period` flags.


