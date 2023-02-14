# AVAX

AVAX is the native utility token of Avalanche. It’s a hard-capped, scarce asset that is used to
pay for fees, secure the platform through staking, and provide a basic unit of account between the
multiple Subnets created on Avalanche. `1 nAVAX` is equal to `0.000000001 AVAX`.

## Utility

AVAX is a capped-supply resource in the Avalanche ecosystem that's used to power the network.
AVAX is used to secure the ecosystem through staking and for day-to-day operations like issuing
transactions.

AVAX represents the weight that each node has in network decisions. No single actor owns
the Avalanche Network, so each validator in the network is given a proportional weight in the
network's decisions corresponding to the proportion of total stake that they own through proof
of stake (PoS).

Any entity trying to execute a transaction on Avalanche pays a corresponding fee (commonly known as
"gas") to run it on the network. The fees used to execute a transaction on Avalanche is burned,
or permanently removed from circulating supply.

## Tokenomics

A fixed amount of 360M AVAX was minted at genesis, but a small amount of AVAX is constantly minted
through rewards that are given to validators for completing their staking periods with good
behavior.

AVAX is minted according to the following formula, where $R_j$ is the total number of tokens at 
year $j$, with $R_1 = 360M$, and $R_l$ representing the last year that the values of
$\gamma,\lambda \in \R$ were changed; $c_j$ is the yet un-minted
supply of coins to reach $720M$ at year $j$ such that $c_j \leq 360M$; $u$ represents a staker,
with $u.s_{amount}$ representing the total amount of stake that $u$ possesses, and $u.s_{time}$
the length of staking for $u$.

$$
R_j = R_l + \sum_{\forall u} \rho(u.s_{amount}, u.s_{time}) \times \frac{c_j}{L} \times \left( \sum_{i=0}^{j}\frac{1}{\left(\gamma + \frac{1}{1 + i^\lambda}\right)^i} \right)
$$

where,

$$
L = \left( \sum_{i=0}^{\infinity}{\frac{1}{\left( \gamma + \frac{1}{1 + i^\lambda}\right)^i} \right)
$$

The minting process offsets the process of burning, so there's never any danger of the network
slowly grinding to a halt due to a lack of supply of AVAX to power it.

A small portion of burnt transaction fees are used to reward validators at the end of their staking
periods. Validators are rewarded for virtuous (e.g not attempting lie, steal, or oterwise
cause harm the Avalanche network) behavior by receiving validator rewards at the end of their
staking periods. Avalanche does not take away any portion of a validator's already staked tokens
(commonly known as "slashing") for negligent/malicious staking periods, however this behavior is
disincentivized as validators who attempt to do harm to the network would expend their node's
computing resources for no reward.
