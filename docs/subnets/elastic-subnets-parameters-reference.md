# Elastic Subnets Parameters Reference

All Avalanche Subnets are created permissioned; later they can be turned into elastic Subnets.

In this reference we list the structural parameters defining Permissioned and Elastic Subnets.
We also illustrate the constraints that these parameters must satisfy when we create or transform Subnets.

## Elastic Subnet Parameters

Note: `PercentDenominator = 1_000_000` is the denominator used to calculate percentages

`Subnet ids.ID`: the Subnet ID. Constraints:

* `Subnet` must be different from `PrimaryNetworkID`.

`AssetID ids.ID`: the asset to use when Staking on the Subnet. Constraints:
  
* `AssetID` must not be the Empty ID.
* `AssetID` must not be AVAX ID.

`InitialSupply uint64`: the initial amount of Subnet assets. Constraints:

* `InitialSupply` must be larger than zero.

`MaximumSupply uint64`: the maximum amount of Subnet assets. Constraints:

* `MaximumSupply` must be larger or equal to `InitialSupply`.

`MinConsumptionRate uint64`: the minimal rate to allocate funds. See Reward formula for details.

`MaxConsumptionRate uint64`: the maximal rate to allocate funds. See Reward formula for details. Constraints:

* `MaxConsumptionRate` must be larger or equal to `MinConsumptionRate`.
* `MaxConsumptionRate` must be smaller or equal to `PercentDenominator`.

`MinStakeDuration uint32`: the minimum number of seconds a staker can stake for. Constraints:

* `MinStakeDuration` must be larger than zero.

`MaxStakeDuration uint32`: the maximum number of seconds a staker can stake for. Constraints:

* `MaxStakeDuration` must be larger or equal to `MinStakeDuration`.
* `MaxStakeDuration` must be smaller or equal to `GlobalMaxStakeDuration`.

`MinDelegationFee uint32`: the minimum percentage a validator must charge a delegator for delegating. Constraints:

* `MinDelegationFee` must be smaller or equal to `PercentDenominator`.

`MinDelegatorStake uint64`: the minimum amount of funds required to become a delegator. Constraints:

* `MinDelegatorStake` must be larger than zero.

`MaxValidatorWeightFactor byte`: the factor which calculates the maximum amount of delegation a validator can receive. A value of 1 effectively disables delegation. Constraints:

* `MaxValidatorWeightFactor` must be larger than zero.

`UptimeRequirement uint32`: the minimum percentage a validator must be online and responsive to receive a reward. Constraints:

* `UptimeRequirement` must be <= `PercentDenominator`.

### Reward Formula

Consider an elastic Subnet validator which stakes $Staked Amount$ for $Staking Duration$ time.

Assume at the start of the staking period the amount of asset in Subnet is $Existing Supply$.

The maximum amount of asset in Subnet is $MaximumSupply$.
The validator will receive a reward calculated as follows:

$$
Reward = \left(MaximumSupply - ExistingSupply \right) \times \frac{Staked Amount}{Existing Supply} \times \frac{Staking Duration}{Minting Period} \times \left( \frac{MinConsumptionRate}{PercentDenominator} \times \left(1- \frac{Stake Duration}{Minting Period}\right) + \frac{MaxConsumptionRate}{PercentDenominator} \times \frac{Stake Duration}{Minting Period}  \right)
$$
