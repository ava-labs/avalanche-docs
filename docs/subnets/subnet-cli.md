# Subnet CLI

The [`subnet-cli`](https://github.com/ava-labs/subnet-cli) is a command-line interface to manage Avalanche Subnets.

## Install

### Source

```bash
git clone https://github.com/ava-labs/subnet-cli.git;
cd subnet-cli;
go install -v .;
```

Once you have installed `subnet-cli`, run command `subnet-cli` to confirm it is
working as expected (_make sure your $GOBIN is in your $PATH_):

### Pre-Built Binaries

You can also download binary directly from [here](https://github.com/ava-labs/subnet-cli/releases). Make sure you pick the correct version for your OS.

## Usage

```bash
> subnet-cli 
subnet-cli CLI

Usage:
  subnet-cli [command]

Available Commands:
  add         Sub-commands for creating resources
  completion  Generate the autocompletion script for the specified shell
  create      Sub-commands for creating resources
  help        Help about any command
  status      status commands
  wizard      A magical command for creating an entire subnet

Flags:
      --enable-prompt              'true' to enable prompt mode (default true)
  -h, --help                       help for subnet-cli
      --log-level string           log level (default "info")
      --poll-interval duration     interval to poll tx/blockchain status (default 1s)
      --request-timeout duration   request timeout (default 2m0s)

Use "subnet-cli [command] --help" for more information about a command.
```

It **DOES NOT** need to be run on the same host where you are running your validator. By default, it interfaces exclusively with the public Avalanche API Endpoints.

### Network Selection

Should a `subnet-cli` command call an API end point, `--public-uri` is used to specify where the end point is.
* The default value is `https://api.avax-test.network` which points to the Fuji Testnet. If you run a local node on Fuji Testnet, you can use the URI from your local node too. 
* For Mainnet, please use `https://api.avax.network`. If you run a local node on Mainnet, you can use the URI from your local node too. 
* For local network, please use `http://127.0.0.1:port` or `http://localhost:port` where port is the actual port number of local AvalancheGo. To create a 5-node local network, please follow [this](../quickstart/create-a-local-test-network.md#avalanche-network-runner) and get the [correct port number for use](../quickstart/create-a-local-test-network.md#retrieve-all-nodes).

### Ledger Support

To use your [ledger](https://www.ledger.com) with `subnet-cli`, just add the
`-l`/`--ledger` flag to any command.

For example, to create 4 node network on Fuji Testnet with Ledger, you would run:

```bash
subnet-cli wizard \
--ledger \
--node-ids=NodeID-741aqvs6R4iuHDyd1qT1NrFTmsgu78dc4,NodeID-K7Y79oAmBntAcdkyY1CLxCim8QuqcZbBp,NodeID-C3EY6u4v7DDi6YEbYf1wmXdvkEFXYuXNW,NodeID-AiLGeqQfh9gZY3Y8wLMD15tuJtsJHq5Qi \
--vm-genesis-path=fake-genesis.json \
--vm-id=tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH \
--chain-name=test
```

_Make sure you've downloaded the latest version of the
[Avalanche Ledger App](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche)!_

### `subnet-cli create VMID`

This command is used to generate a valid VMID based on some string to uniquely
identify a VM. This should stay the same for all versions of the VM, so it
should be based on a word rather than the hash of some code.

```bash
subnet-cli create VMID <identifier> [--hash]
```

Example
```bash
> subnet-cli create VMID subnetevm
created a new VMID srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy from subnetevm
```

### `subnet-cli create key`

```bash
> subnet-cli create key
created a new key ".subnet-cli.pk"
```

This creates a file `.subnet-cli.pk` under the current directory with a private key. By default, 
`subnet-cli` uses the key specified in file `.subnet-cli.pk` on the P-Chain to pay for the transaction fee, unless `--private-key-path` is used to overwrite. Please make sure that you have enough fund on this P-Chain address to pay for transactions. 

#### Fuji TestNet
To get fund on this key on Fuji TestNet, follow these steps:

1. User your private key in the `.subnet-cli.pk` file on the [Avalanche web wallet](https://wallet.avax.network) to access this wallet. (Private Key is the first option on the [web wallet](https://wallet.avax.network)). And pick **Fuji** on the top right corner as the network.
2. Request funds from the [faucet](https://faucet.avax-test.network).
3. Move the test funds (faucet sends avax token on either the X or C-Chain) to the P-Chain ([tutorial between X/P chains](../quickstart/transfer-avax-between-x-chain-and-p-chain.md) or [tutorial between C/P chains](../quickstart/transfer-avax-between-p-chain-and-c-chain.md)).    

After following these 3 steps, your test key should now have a balance on the P-Chain on Fuji Testnet.

#### Local

For local testing, you can use the key in [.insecure.ewoq.key](https://github.com/ava-labs/subnet-cli/blob/main/.insecure.ewoq.key) which is pre-funded. 

#### Mainnet
For Mainnet, we strongly recommend to use an account associated with a [ledger](#ledger-support) for all your operations. 


### `subnet-cli wizard`

`wizard` is a magical command that:

* Adds all NodeIDs as validators to the primary network (skipping any that
  already exist)
* Creates a subnet
* Adds all NodeIDs as validators on the subnet
* Creates a new blockchain

Here is a command to create a subnet on Fuji Testnet:

```bash
> subnet-cli wizard \
--node-ids=NodeID-nBwT3MfSHA4es5o3iB5cMtkPng4eC861 \
--vm-genesis-path=networks/11111/genesis.json \
--vm-id=kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG \
--chain-name=bayysubnet
```
And its full printed log on the console:
```text
2022-05-20T15:20:15.431-0600	info	client/client.go:81	fetching X-Chain id
2022-05-20T15:20:15.766-0600	info	client/client.go:87	fetched X-Chain id	{"id": "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm"}
2022-05-20T15:20:15.766-0600	info	client/client.go:96	fetching AVAX asset id	{"uri": "https://api.avax-test.network"}
2022-05-20T15:20:15.788-0600	info	client/client.go:105	fetched AVAX asset id	{"id": "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK"}
2022-05-20T15:20:15.788-0600	info	client/client.go:107	fetching network information
2022-05-20T15:20:15.822-0600	info	client/client.go:116	fetched network information	{"networkId": 5, "networkName": "fuji"}

nBwT3MfSHA4es5o3iB5cMtkPng4eC861 is already a validator on 11111111111111111111111111111111LpoYY

Ready to run wizard, should we continue?
*--------------------------*---------------------------------------------------*
| PRIMARY P-CHAIN ADDRESS  | P-fuji1ulhfug84kc4x2ezvurqkevnk676sd9n8d05j0g     |
*--------------------------*---------------------------------------------------*
| TOTAL P-CHAIN BALANCE    | 9.8990000 $AVAX                                   |
*--------------------------*---------------------------------------------------*
| TX FEE                   | 0.201 $AVAX                                       |
*--------------------------*---------------------------------------------------*
| EACH STAKE AMOUNT        | 1.000 $AVAX                                       |
*--------------------------*---------------------------------------------------*
| REQUIRED BALANCE         | 1.201 $AVAX                                       |
*--------------------------*---------------------------------------------------*
| URI                      | https://api.avax-test.network                     |
*--------------------------*---------------------------------------------------*
| NETWORK NAME             | fuji                                              |
*--------------------------*---------------------------------------------------*
| NEW SUBNET VALIDATORS    | [nBwT3MfSHA4es5o3iB5cMtkPng4eC861]                |
*--------------------------*---------------------------------------------------*
| SUBNET VALIDATION WEIGHT | 1,000                                             |
*--------------------------*---------------------------------------------------*
| CHAIN NAME               | bayysubnet                                        |
*--------------------------*---------------------------------------------------*
| VM ID                    | kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG |
*--------------------------*---------------------------------------------------*
| VM GENESIS PATH          | networks/11111/genesis.json                       |
*--------------------------*---------------------------------------------------*
✔ Yes, let's create! I agree to pay the fee!


2022-05-20T15:20:19.820-0600	info	client/p.go:131	creating subnet	{"dryMode": false, "assetId": "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK", "createSubnetTxFee": 100000000}
2022-05-20T15:20:19.996-0600	info	platformvm/checker.go:74	polling subnet	{"subnetId": "2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW"}
2022-05-20T15:20:19.997-0600	info	platformvm/checker.go:48	polling P-Chain tx	{"txId": "2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW", "expectedStatus": "Committed"}
2022-05-20T15:20:19.997-0600	info	poll/poll.go:42	start polling	{"internal": "1s"}
2022-05-20T15:20:22.075-0600	info	poll/poll.go:66	poll confirmed	{"took": "2.077636191s"}
2022-05-20T15:20:22.075-0600	info	platformvm/checker.go:88	finding subnets	{"subnetId": "2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW"}
2022-05-20T15:20:22.075-0600	info	poll/poll.go:42	start polling	{"internal": "1s"}
2022-05-20T15:20:22.274-0600	info	poll/poll.go:66	poll confirmed	{"took": "199.097562ms"}
created subnet "2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW" (took 2.276733753s)



Now, time for some config changes on your node(s).
Set --whitelisted-subnets=2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW and move the compiled VM kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG to <build-dir>/plugins/kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG.
When you're finished, restart your node.
✔ Yes, let's continue! I've updated --whitelisted-subnets, built my VM, and restarted my node(s)!


2022-05-20T15:21:48.203-0600	info	client/p.go:299	adding subnet validator	{"subnetId": "2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW", "txFee": 1000000, "start": "2022-05-20T15:22:17.781-0600", "end": "2023-03-16T14:52:49.000-0600", "weight": 1000}
2022-05-20T15:21:48.457-0600	info	platformvm/checker.go:48	polling P-Chain tx	{"txId": "fHt8L9EHx1UJiEYmEZ3zVCpYssKirRvkQmPfufdvUMhueXRK5", "expectedStatus": "Committed"}
2022-05-20T15:21:48.457-0600	info	poll/poll.go:42	start polling	{"internal": "1s"}
2022-05-20T15:21:50.670-0600	info	poll/poll.go:66	poll confirmed	{"took": "2.213119396s"}
added nBwT3MfSHA4es5o3iB5cMtkPng4eC861 to subnet 2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW validator set (took 2.213119396s)

waiting for validator nBwT3MfSHA4es5o3iB5cMtkPng4eC861 to start validating 2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW...(could take a few minutes)


2022-05-20T15:24:51.521-0600	info	client/p.go:497	creating blockchain	{"subnetId": "2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW", "chainName": "bayysubnet", "vmId": "kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG", "createBlockchainTxFee": 100000000}
created blockchain "2eKMpwdnMS1ebx3FDa6Axr8GTLFvKytwjWvKawXj37Nf65mq3Q" (took 214.712453ms)

*-------------------------*----------------------------------------------------*
| PRIMARY P-CHAIN ADDRESS | P-fuji1ulhfug84kc4x2ezvurqkevnk676sd9n8d05j0g      |
*-------------------------*----------------------------------------------------*
| TOTAL P-CHAIN BALANCE   | 9.7980000 $AVAX                                    |
*-------------------------*----------------------------------------------------*
| URI                     | https://api.avax-test.network                      |
*-------------------------*----------------------------------------------------*
| NETWORK NAME            | fuji                                               |
*-------------------------*----------------------------------------------------*
| SUBNET VALIDATORS       | [nBwT3MfSHA4es5o3iB5cMtkPng4eC861]                 |
*-------------------------*----------------------------------------------------*
| SUBNET ID               | 2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW |
*-------------------------*----------------------------------------------------*
| BLOCKCHAIN ID           | 2eKMpwdnMS1ebx3FDa6Axr8GTLFvKytwjWvKawXj37Nf65mq3Q |
*-------------------------*----------------------------------------------------*
| CHAIN NAME              | bayysubnet                                         |
*-------------------------*----------------------------------------------------*
| VM ID                   | kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG  |
*-------------------------*----------------------------------------------------*
| VM GENESIS PATH         | networks/11111/genesis.json                        |
*-------------------------*----------------------------------------------------*
```

The following are created successfully:
* Subnet: 2RRgV44HPUQWLWLTpfSPMUcfpCfG4HpKKHV3KgwLccyDzqaoeW
* Blockchain: 2eKMpwdnMS1ebx3FDa6Axr8GTLFvKytwjWvKawXj37Nf65mq3Q


You can check this url [https://explorer-xp.avax-test.network/blockchain/2eKMpwdnMS1ebx3FDa6Axr8GTLFvKytwjWvKawXj37Nf65mq3Q](https://explorer-xp.avax-test.network/blockchain/2eKMpwdnMS1ebx3FDa6Axr8GTLFvKytwjWvKawXj37Nf65mq3Q) to see the blockchain and subnet:

![bayysubnet](/img/bayysubnet.png)



### `subnet-cli create subnet`

```bash
subnet-cli create subnet
```

To create a subnet on the local network:

```bash
subnet-cli create subnet \
--private-key-path=.insecure.ewoq.key \
--public-uri=http://127.0.0.1:12913
```

And its console log:

```text
2022-05-20T16:00:48.583-0600	info	client/client.go:81	fetching X-Chain id
2022-05-20T16:00:48.585-0600	info	client/client.go:87	fetched X-Chain id	{"id": "qzfF3A11KzpcHkkqznEyQgupQrCNS6WV6fTUTwZpEKqhj1QE7"}
2022-05-20T16:00:48.585-0600	info	client/client.go:96	fetching AVAX asset id	{"uri": "http://127.0.0.1:12913"}
2022-05-20T16:00:48.585-0600	info	client/client.go:105	fetched AVAX asset id	{"id": "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC"}
2022-05-20T16:00:48.585-0600	info	client/client.go:107	fetching network information
2022-05-20T16:00:48.585-0600	info	client/client.go:116	fetched network information	{"networkId": 1337, "networkName": "network-1337"}
2022-05-20T16:00:48.604-0600	info	client/p.go:131	creating subnet	{"dryMode": true, "assetId": "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC", "createSubnetTxFee": 100000000}

Ready to create subnet resources, should we continue?
*-------------------------*----------------------------------------------------*
| PRIMARY P-CHAIN ADDRESS | P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p    |
*-------------------------*----------------------------------------------------*
| TOTAL P-CHAIN BALANCE   | 30,000,000.0000000 $AVAX                           |
*-------------------------*----------------------------------------------------*
| TX FEE                  | 0.100 $AVAX                                        |
*-------------------------*----------------------------------------------------*
| URI                     | http://127.0.0.1:12913                             |
*-------------------------*----------------------------------------------------*
| NETWORK NAME            | network-1337                                       |
*-------------------------*----------------------------------------------------*
| EXPECTED SUBNET ID      | 24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1 |
*-------------------------*----------------------------------------------------*
✔ Yes, let's create! I agree to pay the fee!



2022-05-20T16:00:53.753-0600	info	client/p.go:131	creating subnet	{"dryMode": false, "assetId": "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC", "createSubnetTxFee": 100000000}
2022-05-20T16:00:53.776-0600	info	platformvm/checker.go:74	polling subnet	{"subnetId": "24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1"}
2022-05-20T16:00:53.776-0600	info	platformvm/checker.go:48	polling P-Chain tx	{"txId": "24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1", "expectedStatus": "Committed"}
2022-05-20T16:00:53.776-0600	info	poll/poll.go:42	start polling	{"internal": "1s"}
2022-05-20T16:00:54.776-0600	info	poll/poll.go:66	poll confirmed	{"took": "1.000622527s"}
2022-05-20T16:00:54.776-0600	info	platformvm/checker.go:88	finding subnets	{"subnetId": "24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1"}
2022-05-20T16:00:54.776-0600	info	poll/poll.go:42	start polling	{"internal": "1s"}
2022-05-20T16:00:54.777-0600	info	poll/poll.go:66	poll confirmed	{"took": "486.234µs"}
created subnet "24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1" (took 1.001108761s)
(subnet must be whitelisted beforehand via --whitelisted-subnets flag!)

*-------------------------*----------------------------------------------------*
| PRIMARY P-CHAIN ADDRESS | P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p    |
*-------------------------*----------------------------------------------------*
| TOTAL P-CHAIN BALANCE   | 29,999,999.9000000 $AVAX                           |
*-------------------------*----------------------------------------------------*
| URI                     | http://127.0.0.1:12913                             |
*-------------------------*----------------------------------------------------*
| NETWORK NAME            | network-1337                                       |
*-------------------------*----------------------------------------------------*
| CREATED SUBNET ID       | 24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1 |
*-------------------------*----------------------------------------------------*

```


### `subnet-cli add validator`

```bash
subnet-cli add validator \
--node-ids="[YOUR-NODE-ID]" \
--stake-amount=[STAKE-AMOUNT-IN-NANO-AVAX] \
--validate-reward-fee-percent=2
```

To add a validator to the local network:

```bash
subnet-cli add validator \
--private-key-path=.insecure.ewoq.key \
--public-uri=http://localhost:57786 \
--node-ids="NodeID-4B4rc5vdD1758JSBYL1xyvE5NHGzz6xzH" \
--stake-amount=2000000000000 \
--validate-reward-fee-percent=3
```

![add-validator-local-1](/img/add-validator-local-1.png)
![add-validator-local-2](/img/add-validator-local-2.png)


### `subnet-cli add subnet-validator`

```bash
subnet-cli add subnet-validator \
--node-ids="[YOUR-NODE-ID]" \
--subnet-id="[YOUR-SUBNET-ID]"
```

To add a subnet validator to the local network:


```text
> subnet-cli add subnet-validator \
--private-key-path=.insecure.ewoq.key \
--public-uri=http://127.0.0.1:12913 \
--node-ids="NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5" \
--subnet-id="24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1"
```
And its console log:


```text
2022-05-20T16:10:22.980-0600	info	client/client.go:81	fetching X-Chain id
2022-05-20T16:10:22.981-0600	info	client/client.go:87	fetched X-Chain id	{"id": "qzfF3A11KzpcHkkqznEyQgupQrCNS6WV6fTUTwZpEKqhj1QE7"}
2022-05-20T16:10:22.981-0600	info	client/client.go:96	fetching AVAX asset id	{"uri": "http://127.0.0.1:12913"}
2022-05-20T16:10:22.981-0600	info	client/client.go:105	fetched AVAX asset id	{"id": "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC"}
2022-05-20T16:10:22.981-0600	info	client/client.go:107	fetching network information
2022-05-20T16:10:22.982-0600	info	client/client.go:116	fetched network information	{"networkId": 1337, "networkName": "network-1337"}

Ready to add subnet validator, should we continue?
*-------------------------*----------------------------------------------------*
| PRIMARY P-CHAIN ADDRESS | P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p    |
*-------------------------*----------------------------------------------------*
| TOTAL P-CHAIN BALANCE   | 29,999,999.9000000 $AVAX                           |
*-------------------------*----------------------------------------------------*
| TX FEE                  | 0.001 $AVAX                                        |
*-------------------------*----------------------------------------------------*
| REQUIRED BALANCE        | 0.001 $AVAX                                        |
*-------------------------*----------------------------------------------------*
| URI                     | http://127.0.0.1:12913                             |
*-------------------------*----------------------------------------------------*
| NETWORK NAME            | network-1337                                       |
*-------------------------*----------------------------------------------------*
| NODE IDs                | [P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5]                |
*-------------------------*----------------------------------------------------*
| SUBNET ID               | 24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1 |
*-------------------------*----------------------------------------------------*
| VALIDATE WEIGHT         | 1,000                                              |
*-------------------------*----------------------------------------------------*
✔ Yes, let's create! I agree to pay the fee!



2022-05-20T16:10:28.853-0600	info	client/p.go:299	adding subnet validator	{"subnetId": "24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1", "txFee": 1000000, "start": "2022-05-20T16:10:58.852-0600", "end": "2022-09-06T16:00:00.000-0600", "weight": 1000}
2022-05-20T16:10:28.857-0600	info	platformvm/checker.go:48	polling P-Chain tx	{"txId": "gmrRTRK6671pBVopxHoPRx77hcvEvc5UKER1fFNgaRiFPY5Qh", "expectedStatus": "Committed"}
2022-05-20T16:10:28.859-0600	info	poll/poll.go:42	start polling	{"internal": "1s"}
2022-05-20T16:10:29.861-0600	info	poll/poll.go:66	poll confirmed	{"took": "1.002120951s"}
added P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5 to subnet 24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1 validator set (took 1.002120951s)

waiting for validator P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5 to start validating 24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1...(could take a few minutes)
*-------------------------*----------------------------------------------------*
| PRIMARY P-CHAIN ADDRESS | P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p    |
*-------------------------*----------------------------------------------------*
| TOTAL P-CHAIN BALANCE   | 29,999,999.8990000 $AVAX                           |
*-------------------------*----------------------------------------------------*
| URI                     | http://127.0.0.1:12913                             |
*-------------------------*----------------------------------------------------*
| NETWORK NAME            | network-1337                                       |
*-------------------------*----------------------------------------------------*
| NODE IDs                | [P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5]                |
*-------------------------*----------------------------------------------------*
| SUBNET ID               | 24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1 |
*-------------------------*----------------------------------------------------*
| VALIDATE START          | 2022-05-20T16:10:58-06:00                          |
*-------------------------*----------------------------------------------------*
| VALIDATE END            | 2022-09-06T16:00:00-06:00                          |
*-------------------------*----------------------------------------------------*
| VALIDATE WEIGHT         | 1,000                                              |
*-------------------------*----------------------------------------------------*
```


### `subnet-cli create blockchain`

```bash
subnet-cli create blockchain \
--subnet-id="[YOUR-SUBNET-ID]" \
--chain-name="[YOUR-CHAIN-NAME]" \
--vm-id="[YOUR-VM-ID]" \
--vm-genesis-path="[YOUR-VM-GENESIS-PATH]"
```

To create a blockchain with the local cluster:

```bash
subnet-cli create blockchain \
--private-key-path=.insecure.ewoq.key \
--public-uri=http://127.0.0.1:12913 \
--subnet-id="24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1" \
--chain-name=bayysubnet \
--vm-id= kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG \
--vm-genesis-path=bayysubnet.genesis
```


```text
2022-05-20T16:19:33.652-0600	info	client/client.go:81	fetching X-Chain id
2022-05-20T16:19:33.653-0600	info	client/client.go:87	fetched X-Chain id	{"id": "qzfF3A11KzpcHkkqznEyQgupQrCNS6WV6fTUTwZpEKqhj1QE7"}
2022-05-20T16:19:33.653-0600	info	client/client.go:96	fetching AVAX asset id	{"uri": "http://127.0.0.1:12913"}
2022-05-20T16:19:33.653-0600	info	client/client.go:105	fetched AVAX asset id	{"id": "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC"}
2022-05-20T16:19:33.653-0600	info	client/client.go:107	fetching network information
2022-05-20T16:19:33.653-0600	info	client/client.go:116	fetched network information	{"networkId": 1337, "networkName": "network-1337"}

Ready to create blockchain resources, should we continue?
*-------------------------*----------------------------------------------------*
| PRIMARY P-CHAIN ADDRESS | P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p    |
*-------------------------*----------------------------------------------------*
| TOTAL P-CHAIN BALANCE   | 29,999,999.8990000 $AVAX                           |
*-------------------------*----------------------------------------------------*
| TX FEE                  | 0.100 $AVAX                                        |
*-------------------------*----------------------------------------------------*
| REQUIRED BALANCE        | 0.100 $AVAX                                        |
*-------------------------*----------------------------------------------------*
| URI                     | http://127.0.0.1:12913                             |
*-------------------------*----------------------------------------------------*
| NETWORK NAME            | network-1337                                       |
*-------------------------*----------------------------------------------------*
| SUBNET ID               | 24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1 |
*-------------------------*----------------------------------------------------*
| CHAIN NAME              | bayysubnet                                         |
*-------------------------*----------------------------------------------------*
| VM ID                   | kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG  |
*-------------------------*----------------------------------------------------*
| VM GENESIS PATH         | bayysubnet.genesis                                 |
*-------------------------*----------------------------------------------------*
✔ Yes, let's create! I agree to pay the fee!



2022-05-20T16:19:36.072-0600	info	client/p.go:497	creating blockchain	{"subnetId": "24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1", "chainName": "bayysubnet", "vmId": "kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG", "createBlockchainTxFee": 100000000}
created blockchain "2HxSBTxcRK6iZFftghTBW66HjSYfAEkvwtkX3e8EDWabiGEG4M" (took 2.65577ms)

*-------------------------*----------------------------------------------------*
| PRIMARY P-CHAIN ADDRESS | P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p    |
*-------------------------*----------------------------------------------------*
| TOTAL P-CHAIN BALANCE   | 29,999,999.8990000 $AVAX                           |
*-------------------------*----------------------------------------------------*
| URI                     | http://127.0.0.1:12913                             |
*-------------------------*----------------------------------------------------*
| NETWORK NAME            | network-1337                                       |
*-------------------------*----------------------------------------------------*
| SUBNET ID               | 24tZhrm8j8GCJRE9PomW8FaeqbgGS4UAQjJnqqn8pq5NwYSYV1 |
*-------------------------*----------------------------------------------------*
| CREATED BLOCKCHAIN ID   | 2HxSBTxcRK6iZFftghTBW66HjSYfAEkvwtkX3e8EDWabiGEG4M |
*-------------------------*----------------------------------------------------*
| CHAIN NAME              | bayysubnet                                         |
*-------------------------*----------------------------------------------------*
| VM ID                   | kL1G2oVE8BVXCBFQrwS2QkDnW4SBG86X5NoMSsiLidwyj3itG  |
*-------------------------*----------------------------------------------------*
| VM GENESIS PATH         | bayysubnet.genesis                                 |
*-------------------------*----------------------------------------------------*
```



### `subnet-cli status blockchain`

To check the status of the blockchain `2HxSBTxcRK6iZFftghTBW66HjSYfAEkvwtkX3e8EDWabiGEG4M` from a **private URI**:

```bash
subnet-cli status blockchain \
--private-uri=http://127.0.0.1:12913  \
--blockchain-id="2HxSBTxcRK6iZFftghTBW66HjSYfAEkvwtkX3e8EDWabiGEG4M" \
--check-bootstrapped

2022-05-20T16:20:55.362-0600	info	client/client.go:81	fetching X-Chain id
2022-05-20T16:20:55.363-0600	info	client/client.go:87	fetched X-Chain id	{"id": "qzfF3A11KzpcHkkqznEyQgupQrCNS6WV6fTUTwZpEKqhj1QE7"}
2022-05-20T16:20:55.363-0600	info	client/client.go:96	fetching AVAX asset id	{"uri": "http://127.0.0.1:12913"}
2022-05-20T16:20:55.363-0600	info	client/client.go:105	fetched AVAX asset id	{"id": "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC"}
2022-05-20T16:20:55.363-0600	info	client/client.go:107	fetching network information
2022-05-20T16:20:55.363-0600	info	client/client.go:116	fetched network information	{"networkId": 1337, "networkName": "network-1337"}

Checking blockchain...
2022-05-20T16:20:55.364-0600	info	platformvm/checker.go:127	polling blockchain	{"blockchainId": "2HxSBTxcRK6iZFftghTBW66HjSYfAEkvwtkX3e8EDWabiGEG4M", "expectedBlockchainStatus": "Validating"}
2022-05-20T16:20:55.365-0600	info	platformvm/checker.go:48	polling P-Chain tx	{"txId": "2HxSBTxcRK6iZFftghTBW66HjSYfAEkvwtkX3e8EDWabiGEG4M", "expectedStatus": "Committed"}
2022-05-20T16:20:55.365-0600	info	poll/poll.go:42	start polling	{"internal": "1s"}
2022-05-20T16:20:55.365-0600	info	poll/poll.go:66	poll confirmed	{"took": "211.231µs"}
2022-05-20T16:20:55.365-0600	info	poll/poll.go:42	start polling	{"internal": "1s"}
2022-05-20T16:20:55.365-0600	info	platformvm/checker.go:148	waiting for blockchain status	{"current": "Created"}
2022-05-20T16:20:56.367-0600	info	platformvm/checker.go:148	waiting for blockchain status	{"current": "Created"}
2022-05-20T16:20:57.367-0600	info	platformvm/checker.go:148	waiting for blockchain status	{"current": "Created"}
2022-05-20T16:20:58.368-0600	info	platformvm/checker.go:148	waiting for blockchain status	{"current": "Created"}
......
```
