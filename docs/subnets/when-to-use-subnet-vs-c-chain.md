# When to Use Subnet (vs. C-Chain)

Subnet is a subset of Avalanche Primary Network validators agreeing to run the same [Virtual Machines (VM)](../subnets/README.md#virtual-machines) with its own rules. Subnet enables extra dimensions of reliability, efficiency, and data sovereignty. It provides the ability to create custom blockchains for different use cases, while isolating high-traffic applications from congesting activity on the Primary Network. But such flexibility comes with its own set of tradeoffs. In this article, we discuss often-overlooked differentiating characteristics of Subnet, with primary focus on EVM-based applications (e.g., C-Chain, [Subnet-EVM](https://github.com/ava-labs/subnet-evm)). The goal is to identify pros and cons of building an app on C-Chain versus [Subnet-EVM](https://github.com/ava-labs/subnet-evm), and help developers make more informed decisions.

## We Want Our Own Gas Token

C-Chain is an Ethereum Virtual Machine (EVM) chain; it requires the gas fees to be paid in its native token. That is, the application may create its own utility tokens (ERC-20) on the C-Chain, but the gas must be paid in AVAX. In the meantime, [Subnet-EVM](https://github.com/ava-labs/subnet-evm) effectively creates an application-specific EVM-chain with full control over native(gas) coins. The operator can pre-allocate the native tokens in the chain genesis, and mint more using the [Subnet-EVM](https://github.com/ava-labs/subnet-evm) precompile contract. And these fees can be either burned (as AVAX burns in C-Chain) or configured to be sent to an address which can be a smart contract.

Note that the Subnet gas token is specific to the application in the chain, thus unknown to the external parties. Moving assets to other chains requires trusted bridge contracts (or upcoming cross Subnet communication feature).

## We Want Higher Throughput

The primary goal of the gas limit on C-Chain is to restrict the block size and therefore prevent network saturation. If a block can be arbitrarily large, it takes longer to propagate, potentially degrading the network performance. The C-Chain gas limit acts as a deterrent against any system abuse but can be quite limiting for high throughput applications. Unlike C-Chain, Subnet can be single-tenant, dedicated to the specific application, and thus host its own set of validators with higher bandwidth requirements, which allows for a higher gas limit thus higher transaction throughputs. Plus, [Subnet-EVM](https://github.com/ava-labs/subnet-evm) supports fee configuration upgrades that can be adaptive to the surge in application traffic.

Subnet workloads are isolated from the Primary Network; which means, the noisy neighbor effect of one workload (e.g., NFT mint on C-Chain) cannot destabilize the Subnet or surge its gas price. This failure isolation model in the Subnet can provide higher application reliability.

## We Want Strict Access Control

The C-Chain is open and permissionless where anyone can deploy and interact with contracts. However, for regulatory reasons, some applications may need a consistent access control mechanism for all on-chain transactions. With [Subnet-EVM](https://github.com/ava-labs/subnet-evm), an application can require that “only authorized users may deploy contracts or make transactions.” Allow-lists are only updated by the administrators, and the upgradability itself is implemented with the precompile contract, thus more transparent and auditable for compliance matters.

## We Want High Composability with C-Chain Assets

C-Chain is a better option for seamless integration with existing C-Chain assets and contracts. It is easier to build a DeFi application on C-Chain, as it provides larger liquidity pools and thus allows for efficient exchange between popular assets. A DeFi Subnet can still support composability of contracts on C-Chain assets but requires some sort of oﬀ-chain system via the bridge contract. In other words, a Subnet can be a better choice if the application does not need high composability with the existing C-Chain assets. Plus, the upcoming support for cross Subnet communication will greatly simplify the bridging process.

## We Want High Security

The security of Avalanche Primary Network is a function of the security of the underlying validators and stake delegators. Some choose C-Chain in order to achieve maximum security by utilizing thousands of Avalanche Primary Network validators. Some may choose to not rely on the entire security of the base chain.

The better approach is to scale up the security as the application accrues more values and adoption from its users. And Subnet can provide elastic, on-demand security to take such organic growth into account.

## We Want Low Initial Cost

C-Chain has economic advantages of low-cost deployment, whereas each Subnet validator is required to validate the Primary Network by staking AVAX (minimum 2,000 AVAX for Mainnet). For fault tolerance, we recommend at least five validators for a Subnet, even though there is no requirement that the Subnet owner should own all these 5 validators, it still further increases the operational overhead. If an application has relatively low transaction count, it can start with C-Chain deployment to leverage existing technical infrastructure, and later expand to a Subnet (see [Crabada Subnet migration](https://medium.com/@PlayCrabada/introducing-crabadas-subnet-on-the-avalanche-network-18cb310ddb8c) for an example). 
