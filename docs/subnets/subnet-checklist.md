# Subnet Checklist

This article aims to provide a practical and opinionated guide to the development and management of early versions of a protocol for Avalanche Blockchain subnets. It is not intended to be comprehensive but focuses on key areas that will be useful to partners and others in the ecosystem.

## General Security

When developing a subnet, it is crucial to prioritize security. Consider incorporating [precompile templates](https://docs.avax.network/subnets/customize-a-subnet#precompiles) and taking into account DOS and firewall measures. Furthermore, develop a robust incident response plan to address potential security breaches.

## Third-Party Audits

Third-party audits are essential to ensure the security of your virtual machine (VM), operations, and tooling setup. Audits will also cover the protocol itself. Engage reputable audit firms like [Entersoft Security](https://entersoftsecurity.com) to evaluate your subnet thoroughly.

## Bridging Approach

Choose a bridging approach that best suits your subnet, considering options such as Avalanche Wallet Manager (AWM), native liquidity on the subnet, or LayerZero.

## Mainnet Validator Set

Determine the number of required validators, their regional locations, providers, VM sizing, and whether you'll use a permissioned or permissionless model.

## Monitoring and Alerting Tools

Select and implement monitoring and alerting tools to track your subnet's performance. Establish relevant KPIs, such as monitoring the percentage of stake weight offline, and utilize services like PagerDuty to ensure swift responses to issues.

## RPC Network Set

Decide on the regional locations, number, sizing, and providers for your RPC network. Assess whether utilizing Avalanche's provided RPC is a viable option for your subnet.

## Custom Testnet

Launch a custom testnet on Fuji or a private testnet to iterate on tooling and networking faster. Perform scalability stress tests and hardware benchmarking to ensure optimal performance.

## Native Token Scheme and Deployment

Develop a native token scheme, including distribution, Token Generation Event (TGE), and deployment. Decide whether the token will be minted on the C-Chain or the subnet, and set up a [faucet](https://github.com/ava-labs/avalanche-faucet) if needed.

## Flagship Wallet

Choose a flagship wallet for your subnet, either by integrating it with [Avalanche's Core](https://core.app/) or by creating your own.

## Customer Support Channel

Select an appropriate customer support channel for your users, such as Twitter or Discord, and consider adding Intercom, ZenHub, or HubSpot on your website.

## Additional Considerations

- Research the regulatory implications of your entity holding native tokens and user funds. Determine whether you need a [Money Transmitter License](https://www.dfs.ny.gov/apps_and_licensing/money_transmitters/) to operate in certain regions.
- Decide on a custodial, non-custodial, or hybrid wallet experience for users.
- Evaluate the regulatory implications for your validator set, such as potential regional restrictions.
- Consider the on- and off-ramp experiences for user liquidity into the subnet or game.

By addressing these key areas, your subnet development process should be streamlined and more efficient. Keep in mind that this guide is not exhaustive, and it is essential to adapt it to your specific project and requirements.
