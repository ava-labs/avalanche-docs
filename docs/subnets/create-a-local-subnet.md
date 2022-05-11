# Create a Local Subnet

To learn how to develope a subnet, the first step is to create a local subnet so that you can experience it freely without too much constraints. [Subnet-evm](https://github.com/ava-labs/subnet-evm) provides such a utility. 

## Clone Subnet-evm 

First install Go 1.17.9 or later. Follow the instructions [here](https://golang.org/doc/install).

Run `go version`. **It should be 1.17.9 or above.** Run `echo $GOPATH`. **It should not be empty.**

Download the `subnet-evm` repository into your `$GOPATH`:

```sh
cd $GOPATH
mkdir -p src/github.com/ava-labs
git clone git@github.com:ava-labs/subnet-evm.git
cd subnet-evm
```

This will clone and checkout to `master` branch.

:::info

Please always check [subnet-evem repo](https://github.com/ava-labs/subnet-evm) for the latest updates.
 
::: 

## Run Local Network

[`scripts/run.sh`](https://github.com/ava-labs/subnet-evm/blob/master/scripts/run.sh) automatically installs `avalanchego`, sets up a local network,
and creates a `subnet-evm` genesis file. The usage of this script is

```bash
./scripts/run.sh [AVALANCHEGO VERSION] [GENESIS_ADDRESS]
```

```bash
# to startup a local cluster (good for development)
cd ${HOME}/go/src/github.com/ava-labs/subnet-evm
./scripts/run.sh 1.7.10 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
```

_This ewoq address (`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`) is a prefunded address on the local network, see [here](../quickstart/fund-a-local-test-network) for more info. The private key for this address is
`0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`._


With this command, `avalanchego`, `avalanche-network-runner` and GoLang packages will be downloaded and installed on a `/tmp` directory. Note: please make sure that your have fast internet connection to download these packages, otherwise, it will take a long time.

Once the the network is started up, the following info will be printed to the
console:

```bash
cluster is ready!

Logs Directory: /var/folders/0h/v4nrbbsn1vvbr5h2wfrh5h500000gn/T/network-runner-root-data2328077371

EVM Chain ID: 99999
Funded Address: 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
RPC Endpoints:
- http://127.0.0.1:14463/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/rpc
- http://127.0.0.1:23930/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/rpc
- http://127.0.0.1:31984/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/rpc
- http://127.0.0.1:41274/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/rpc
- http://127.0.0.1:57529/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/rpc

WS Endpoints:
- ws://127.0.0.1:14463/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/ws
- ws://127.0.0.1:23930/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/ws
- ws://127.0.0.1:31984/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/ws
- ws://127.0.0.1:41274/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/ws
- ws://127.0.0.1:57529/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/ws

MetaMask Quick Start:
Funded Address: 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
Network Name: Local EVM
RPC URL: http://127.0.0.1:14463/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/rpc
Chain ID: 99999
Curreny Symbol: LEVM
network-runner RPC server is running on PID 79100...

use the following command to terminate:

pkill -P 79100
kill -2 79100
pkill -9 -f srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```

You can then ping the local cluster or add the network to MetaMask:

```bash
curl --location --request POST 'http://127.0.0.1:14463/ext/bc/28N1Tv5CZziQ3FKCaXmo8xtxoFtuoVA6NvZykAT5MtGjF4JkGs/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params":[],
    "id": 1
}'
```

Response:

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0"
}
```

To terminate the cluster, run the following commands:

```bash
pkill -P 79100
kill -2 79100
pkill -9 -f srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```

## Load Simulator

When building developing your own blockchain using `subnet-evm`, you may want
to analyze how your fee paramterization behaves and/or how many resources your VM
uses under different load patterns. For this reason, we developed `cmd/simulator`.
`cmd/simulator` lets your drive arbitrary load across any number of [endpoints]
with a user-specified `concurrency`, `base-fee`, and `priority-fee`.

To get started, open the directory `cmd/simulator` and add your network's endpoints to
the file at `.simulator/config.yml` (these will be provided after running
`./scripts/run.sh`):

```yaml
endpoints:
  - http://localhost:9650/ext/bc/my-chain/rpc
base-fee: 25
priority-fee: 1
concurrency: 10
```

Once your config is specified, you can run the tool by either invoking `go run main.go` or by installing the tool (`go install -v .`) and running the binary
(`simulator`).

To make getting started easier, the ewoq key `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`
has been pre-added to the simulator key directory and can be added to genesis during local network
creation (`./scripts/run.sh 1.7.10 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`).
If you do not add this key to genesis, you'll need to manually fund the
`master` account when prompted in the terminal.

_The private key for the ewoq address (`0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`) is
`0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`._

If you followed the directions successfully, you should see the following:

```bash
2022/03/14 08:13:32 loaded config (endpoints=[http://localhost:53120/ext/bc/367dTowpd77GrwTsxcnw7EPPzkAQVnFqga4EQxHPUxcBBNjCQ/rpc http://localhost:53122/ext/bc/367dTowpd77GrwTsxcnw7EPPzkAQVnFqga4EQxHPUxcBBNjCQ/rpc http://localhost:53124/ext/bc/367dTowpd77GrwTsxcnw7EPPzkAQVnFqga4EQxHPUxcBBNjCQ/rpc http://localhost:53126/ext/bc/367dTowpd77GrwTsxcnw7EPPzkAQVnFqga4EQxHPUxcBBNjCQ/rpc http://localhost:53128/ext/bc/367dTowpd77GrwTsxcnw7EPPzkAQVnFqga4EQxHPUxcBBNjCQ/rpc] concurrency=1000 base fee=1 priority fee=250)
2022/03/14 08:13:32 loaded worker 0x27a0D44AC25233652c02b1a92dD2C7D46059b053 (balance=100000000000000000000000000 nonce=0)
2022/03/14 08:13:32 loaded worker 0xdea66C24b333E0aAfD1fFA828976D8C666D73d77 (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xe15BCae0612A6fbf3f7dF99dD4Ab3FE88A33b759 (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xe2848eF46c89d235d66021d82d80DeBB009Ee787 (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xeAB317a6525298c862A07EE66A9Ea772C549834D (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xeAfA0Aa4e5f2F55C55dc32E41b87C11fBFF8770C (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xf4ee33ABa173E95179D48A0b3D52623d8b239Ba9 (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xf7C811A6563eb527e2AfF6026A11EE17994eF9F5 (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xfD27a32854e612D62858a5ac520a5f17A4d223c7 (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xfD757bc4966BB48321928a8c64A3113B682AEADa (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xfE8458B6cFA844B55331511b785cED82EBF56630 (balance=0 nonce=0)
2022/03/14 08:13:32 loaded worker 0xfc5649FE1FC631d6B8e1D48B21300F2E8F3508E5 (balance=0 nonce=0)
2022/03/14 08:13:32 [block created] index: 0 base fee: 1 block gas cost: <nil> block txs: 0
2022/03/14 08:13:34 [block created] index: 1 base fee: 1 block gas cost: 0 block txs: 1
2022/03/14 08:13:34 [block created] index: 2 base fee: 1 block gas cost: 0 block txs: 1
2022/03/14 08:13:34 [stats] historical TPS: 1.000000 last 10s TPS: 0.100000 total txs: 2 total time(s): 2
2022/03/14 08:13:36 [block created] index: 3 base fee: 1 block gas cost: 0 block txs: 1
2022/03/14 08:13:36 [stats] historical TPS: 0.750000 last 10s TPS: 0.200000 total txs: 3 total time(s): 4
.....
2022/03/14 08:17:36 [block created] index: 125 base fee: 1 block gas cost: 2000000 block txs: 101
2022/03/14 08:17:36 [stats] historical TPS: 30.409836 last 10s TPS: 49.900000 total txs: 7420 total time(s): 244
2022/03/14 08:17:38 0x7A3Bba23Db6247E4474D9bFF4C11bB755137276d requesting funds from master
2022/03/14 08:17:38 [block created] index: 126 base fee: 1 block gas cost: 2000000 block txs: 101
2022/03/14 08:17:38 [stats] historical TPS: 30.573171 last 10s TPS: 50.000000 total txs: 7521 total time(s): 246
2022/03/14 08:17:40 0x44461F32FeCa6c5a0De1DEF46FD170325464e0fE requesting funds from master
2022/03/14 08:17:40 [block created] index: 127 base fee: 1 block gas cost: 2000000 block txs: 101
2022/03/14 08:17:40 [stats] historical TPS: 30.733871 last 10s TPS: 50.100000 total txs: 7622 total time(s): 248
2022/03/14 08:17:40 0x77d027fA9E6B4a217247398abDdDA93bDeE38d30 requesting funds from master
2022/03/14 08:17:42 [block created] index: 128 base fee: 1 block gas cost: 2000000 block txs: 99
2022/03/14 08:17:42 [stats] historical TPS: 30.884000 last 10s TPS: 50.300000 total txs: 7721 total time(s): 250
2022/03/14 08:17:44 0x5f46A3E9D0A94351CE60e0205A9C4028eD9474c2 requesting funds from master
2022/03/14 08:17:44 0x7C51Ca57Ab8a3BbfE4C13a25683Ca0756eDb7f0A requesting funds from master
2022/03/14 08:17:44 [block created] index: 129 base fee: 1 block gas cost: 2000000 block txs: 101
2022/03/14 08:17:44 [stats] historical TPS: 31.039683 last 10s TPS: 50.200000 total txs: 7822 total time(s): 252
2022/03/14 08:17:46 [block created] index: 130 base fee: 1 block gas cost: 2000000 block txs: 99
2022/03/14 08:17:46 [stats] historical TPS: 31.185039 last 10s TPS: 50.300000 total txs: 7921 total time(s): 254
2022/03/14 08:17:48 0x6e0BdcdD7813A5eb2C2767D5FD5535a4358081ed requesting funds from master
2022/03/14 08:17:48 0x19499a0FdE9eAe40df7dd4108e174168a920499F requesting funds from master
2022/03/14 08:17:48 [block created] index: 131 base fee: 1 block gas cost: 2000000 block txs: 100
2022/03/14 08:17:48 [stats] historical TPS: 31.332031 last 10s TPS: 50.100000 total txs: 8021 total time(s): 256
2022/03/14 08:17:50 [block created] index: 132 base fee: 1 block gas cost: 2000000 block txs: 99
2022/03/14 08:17:50 [stats] historical TPS: 31.472868 last 10s TPS: 50.000000 total txs: 8120 total time(s): 258
```
