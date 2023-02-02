# Elastic Subnets Parameters

Avalanche Permissioned Subnets turn into Elastic Subnet via the `TransformSubnetTx` transaction.
`TransformSubnetTx` specifies a set of structural parameters for the Elastic Subnet.
This reference describes these structural parameters and illustrates the constraints they must satisfy.

## Elastic Subnet Parameters

### `Subnet`

`Subnet` has type `ids.ID` and it's the Subnet ID.
`Subnet` is the ID of the `CreateSubnetTx` transaction that created the Subnet in the first place. 
The following constraints apply:

* `Subnet` must be different from `PrimaryNetworkID`.

### `AssetID`

`AssetID` has type `ids.ID` and it's the ID of the asset to use when staking on the Subnet.
The following constraints apply:
  
* `AssetID` must not be the `Empty ID`.
* `AssetID` must not be `AVAX ID`, the Primary Network asset.

### `InitialSupply`

`InitialSupply` has type `uint64` and it's the initial amount of `AssetID` in the Subnet.
The following constraints apply:

* `InitialSupply` must be larger than zero.

### `MaximumSupply`

`MaximumSupply` has type `uint64` and it's the maximum amount of `AssetID` that
Subnet can hold at any time. The following constraints apply:

* `MaximumSupply` must be larger or equal to `InitialSupply`.

A Subnet supply can vary in time. The constraint above only makes sure that Subnet
supply and can become larger (and smaller) than `InitialSupply` at any time.

### `MinConsumptionRate`

`MinConsumptionRate` has type `uint64` and it's the minimal rate to allocate funds.
You can find more details about it in the [Reward Formula section](#reward-formula).
The following constraints apply:

* `MinConsumptionRate` must be smaller or equal to `PercentDenominator`.

See [Notes on Percentages](#notes-on-percentages) section to understand `PercentDenominator` role.

### `MaxConsumptionRate`

`MaxConsumptionRate` has type `uint64`. It's the maximal rate to allocate funds.
You can find more details about it in the [Reward Formula section](#reward-formula).
The following constraints apply:

* `MaxConsumptionRate` must be larger or equal to `MinConsumptionRate`.
* `MaxConsumptionRate` must be smaller or equal to `PercentDenominator`.

See [Notes on Percentages](#notes-on-percentages) section to understand `PercentDenominator` role.

### `MinValidatorStake`

`MinValidatorStake` has type `uint64`. It's the minimum amount of funds required to become a validator.
The following constraints apply:

* `MinValidatorStake` must be larger than zero
* `MinValidatorStake` must be smaller or equal to `InitialSupply`

### `MaxValidatorStake`

`MaxValidatorStake` has type `uint64`. It's the maximum amount of funds a single
validator can be allocated, including delegated funds.
The following constraints apply:

* `MaxValidatorStake` must be larger or equal to `MinValidatorStake`
* `MaxValidatorStake` must be smaller or equal to `MaximumSupply`

### `MinStakeDuration`

`MinStakeDuration` has type `uint32` and it's the minimum number of seconds a staker can stake for.
The following constraints apply:

* `MinStakeDuration` must be larger than zero.

### `MaxStakeDuration`

`MaxStakeDuration` has type `uint32` and it's the maximum number of seconds a staker can stake for.
The following constraints apply:

* `MaxStakeDuration` must be larger or equal to `MinStakeDuration`.
* `MaxStakeDuration` must be smaller or equal to `GlobalMaxStakeDuration`.

`GlobalMaxStakeDuration` is defined in genesis and applies to both the Primary Network and all Subnets.
<!-- markdownlint-disable MD013 -->
<!-- vale off -->
Its Mainnet value is $365 \times 24 \times time.Hour$.
<!-- vale on -->
<!-- markdownlint-enable MD013 -->
### `MinDelegationFee`

`MinDelegationFee` has type `uint32` and it's the minimum fee rate a delegator
must pay to its validator for delegating. `MinDelegationFee` is a percentage; the
actual fee is calculated multiplying the fee rate for the delegator reward.
The following constraints apply:

* `MinDelegationFee` must be smaller or equal to `PercentDenominator`.

The `MinDelegationFee` rate applies to Primary Network as well. Its Mainnet value is $2\%$.

### `MinDelegatorStake`

`MinDelegatorStake` has type `uint64` and it's the minimum amount of funds required to become a delegator.
The following constraints apply:

* `MinDelegatorStake` must be larger than zero.

### `MaxValidatorWeightFactor`

`MaxValidatorWeightFactor` has type `uint8` and it's the factor which calculates
the maximum amount of delegation a validator can receive. A value of 1
effectively disables delegation. You can find more details about it in the
[Delegators Weight Checks section](#delegators-weight-checks).
The following constraints apply:

* `MaxValidatorWeightFactor` must be larger than zero.

### `UptimeRequirement`

`UptimeRequirement` has type `uint32` and it's the minimum percentage of its
staking time that a validator must be online and responsive for to receive a
reward.
The following constraints apply:

* `UptimeRequirement` must be smaller or equal `PercentDenominator`.

See [Notes on Percentages](#notes-on-percentages) section to understand `PercentDenominator` role.


## Reward Formula

Consider an Elastic Subnet validator which stakes a $Stake$ amount `AssetID` for $Staking\:Period$ seconds.

Assume that at the start of the staking period there is a $Supply$ amount of `AssetID` in the Subnet.
The maximum amount of Subnet asset is $MaximumSupply$ `AssetID`.

Then at the end of its staking period, a responsive Elastic Subnet validator
receives a reward calculated as follows:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
Reward = \left(MaximumSupply - Supply \right) \times \frac{Stake}{Supply} \times \frac{Staking Period}{Minting Period} \times EffectiveRate
$$
where
$$
EffectiveRate = \frac{MinConsumptionRate}{PercentDenominator} \times \left(1- \frac{Staking Period}{Minting Period}\right) + \frac{MaxConsumptionRate}{PercentDenominator} \times \frac{Staking Period}{Minting Period}
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

Note that $Staking\:Period$ is the staker's entire staking period, not just the
staker's uptime, that is the aggregated time during which the staker has been
responsive. The uptime comes into play only to decide whether a staker should be
rewarded; to calculate the actual reward only the staking period duration is
taken into account.

$Effective\:Period$ is a linear combination of $MinConsumptionRate$ and
$MaxConsumptionRate$.
$MinConsumptionRate$ and $MaxConsumptionRate$ bound $Effective\:Period$ because 

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
MinConsumptionRate \leq EffectiveRate \leq MaxConsumptionRate
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

The larger $Staking\:Period$ is, the closer $Effective\:Period$ is to $MaxConsumptionRate$.

A staker achieves the maximum reward for its stake if $Staking\:Period$ = $Minting Period$.
The reward is:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
Max Reward = \left(MaximumSupply - Supply \right) \times \frac{Stake}{Supply} \times \frac{MaxConsumptionRate}{PercentDenominator}
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

## Delegators Weight Checks

There are bounds set of the maximum amount of delegators' stake that a validator can receive.

The maximum weight $Max\;Weight$ a validator $Validator$ can have is:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
    Max\;Weight = \min(Validator.Weight \times MaxValidatorWeightFactor, MaxValidatorStake)
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

where $MaxValidatorWeightFactor$ and $MaxValidatorStake$ are the Elastic Subnet
Parameters described above.

A delegator won't be added to a validator if the combination of their weights
and all other validator's delegators' weight is larger than $Max\;Weight$. Note
that this must be true at any point in time.

<!-- vale off -->
Note that setting $MaxValidatorWeightFactor$ to 1 disables delegation since the $Max\;Weight = Validator.Weight$.
<!-- vale on -->

## Notes on Percentages

`PercentDenominator = 1_000_000` is the denominator used to calculate percentages.

It allows you to specify percentages up to 4 digital positions.
To denominate your percentage in `PercentDenominator` just multiply it by `10_000`.
For example:

* `100%` corresponds to `100 * 10_000 = 1_000_000`
* `1%` corresponds to `1* 10_000 = 10_000`
* `0.02%` corresponds to `0.002 * 10_000 = 200`
* `0.0007%` corresponds to `0.0007 * 10_000 = 7`
