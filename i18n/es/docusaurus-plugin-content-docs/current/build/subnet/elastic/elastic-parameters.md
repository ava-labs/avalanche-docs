---
etiquetas: [Construir, Subredes]
descripción: Esta referencia describe los parámetros estructurales de una Subred Elástica (sin permisos) e ilustra las restricciones que deben cumplir.
sidebar_label: Parámetros
pagination_label: Parámetros de las Subredes Elásticas
sidebar_position: 1
---

# Parámetros de las Subredes Elásticas

Las Subredes Permisionadas de Avalanche pueden convertirse en Subredes Elásticas a través de la transacción
[`TransformSubnetTx`](/reference/standards/guides/banff-changes.md#transformsubnettx).
`TransformSubnetTx` especifica un conjunto de parámetros estructurales para la Subred Elástica.
Esta referencia describe estos parámetros estructurales e
ilustra las restricciones que deben cumplir.

## Parámetros de la Subred Elástica

### `Subnet`

`Subnet` tiene tipo `ids.ID` y es el ID de la Subred.
`Subnet` es el ID de la transacción `CreateSubnetTx` que creó la Subred en primer lugar.
Se aplican las siguientes restricciones:

- `Subnet` debe ser diferente de `PrimaryNetworkID`.

### `AssetID`

`AssetID` tiene tipo `ids.ID` y es el ID del activo a utilizar cuando se apuesta en la Subred.
Se aplican las siguientes restricciones:

- `AssetID` no debe ser el `ID Vacío`.
- `AssetID` no debe ser el ID `AVAX`, el activo de la Red Primaria.

### `InitialSupply`

`InitialSupply` tiene tipo `uint64` y es la cantidad inicial de `AssetID`
transferidos en la Subred Elástica al momento de su transformación. Dicha cantidad está
disponible para distribuir recompensas de apuesta. Se aplican las siguientes restricciones:

- `InitialSupply` debe ser mayor que cero.

### `MaximumSupply`

`MaximumSupply` tiene tipo `uint64` y es la cantidad máxima de `AssetID` que
la Subred tiene disponible para apuesta y recompensas en cualquier momento. Se aplican las siguientes restricciones:

- `MaximumSupply` debe ser mayor o igual a `InitialSupply`.

El suministro de una Subred puede variar con el tiempo, pero no debe ser mayor que el máximo configurado en ningún momento, incluida la creación de la Subred.

### `MinConsumptionRate`

`MinConsumptionRate` tiene tipo `uint64` y es la tasa mínima que un validador puede ganar si se
satisface el `UptimeRequirement`. Si `StakingPeriod` == `MinStakeDuration`, el
validador ganará la `MinConsumptionRate`.
Puedes encontrar más detalles al respecto en la sección de la Fórmula de Recompensa.
Se aplican las siguientes restricciones:

- `MinConsumptionRate` debe ser menor o igual a `PercentDenominator`.

Ver la sección [Notas sobre Porcentajes](#notas-sobre-porcentajes) para entender el papel de `PercentDenominator`.

### `MaxConsumptionRate`

`MaxConsumptionRate` tiene tipo `uint64` y es la tasa máxima que un validador puede ganar si se
satisface el `UptimeRequirement`. Si `StakingPeriod` == `MaxStakeDuration` == `MintingPeriod`, el
validador ganará la `MaxConsumptionRate`.
Puedes encontrar más detalles al respecto en la sección de la Fórmula de Recompensa.
Se aplican las siguientes restricciones:

- `MaxConsumptionRate` debe ser mayor o igual a `MinConsumptionRate`.
- `MaxConsumptionRate` debe ser menor o igual a `PercentDenominator`.

Ver la sección [Notas sobre Porcentajes](#notas-sobre-porcentajes) para entender el papel de `PercentDenominator`.

### `MinValidatorStake`

`MinValidatorStake` tiene tipo `uint64` y es la cantidad mínima de fondos requeridos para convertirse en un validador.
Se aplican las siguientes restricciones:

- `MinValidatorStake` debe ser mayor que cero.
- `MinValidatorStake` debe ser menor o igual a `InitialSupply`.

### `MaxValidatorStake`

`MaxValidatorStake` tiene tipo `uint64` y es la cantidad máxima de fondos que un solo
validador puede recibir, incluidos los fondos delegados.
Se aplican las siguientes restricciones:

- `MaxValidatorStake` debe ser mayor o igual a `MinValidatorStake`.
- `MaxValidatorStake` debe ser menor o igual a `MaximumSupply`.

### `MinStakeDuration`

`MinStakeDuration` tiene tipo `uint32` y es el número mínimo de segundos que un apostador puede apostar.
Se aplican las siguientes restricciones:

- `MinStakeDuration` debe ser mayor que cero.

### `MaxStakeDuration`

`MaxStakeDuration` tiene tipo `uint32` y es el número máximo de segundos que un apostador puede apostar.
Se aplican las siguientes restricciones:

- `MaxStakeDuration` debe ser mayor o igual a `MinStakeDuration`.
- `MaxStakeDuration` debe ser menor o igual a `GlobalMaxStakeDuration`.

`GlobalMaxStakeDuration` está definido en el génesis y se aplica tanto a la Red Primaria como a todas las
Subredes.

<!-- markdownlint-disable MD013 -->
<!-- vale off -->

Su valor en Mainnet es $365 \times 24 \times time.Hour$.

<!-- vale on -->
<!-- markdownlint-enable MD013 -->

### `MinDelegationFee`

`MinDelegationFee` tiene tipo `uint32` y es la tasa mínima de tarifa que un delegador
debe pagar a su validador por la delegación. `MinDelegationFee` es un porcentaje; la
tarifa real se calcula multiplicando la tasa de tarifa por la recompensa del delegador.
Se aplican las siguientes restricciones:

- `MinDelegationFee` debe ser menor o igual a `PercentDenominator`.

La tasa `MinDelegationFee` también se aplica a la Red Primaria. Su valor en Mainnet es $2\%$.

### `MinDelegatorStake`

`MinDelegatorStake` tiene tipo `uint64` y es la cantidad mínima de fondos requeridos para convertirse en un delegador.
Se aplican las siguientes restricciones:

- `MinDelegatorStake` debe ser mayor que cero.

### `MaxValidatorWeightFactor`

`MaxValidatorWeightFactor` tiene tipo `uint8` y es el factor que calcula
la cantidad máxima de delegación que un validador puede recibir. Un valor de 1
deshabilita efectivamente la delegación. Puedes encontrar más detalles al respecto en la
sección de Verificaciones de Peso de Delegadores.
Se aplican las siguientes restricciones:

- `MaxValidatorWeightFactor` debe ser mayor que cero.

### `UptimeRequirement`

`UptimeRequirement` tiene tipo `uint32` y es el porcentaje mínimo de su
tiempo de apuesta que un validador debe estar en línea y ser receptivo para recibir una
recompensa.
Se aplican las siguientes restricciones:

- `UptimeRequirement` debe ser menor o igual a `PercentDenominator`.

Ver la sección [Notas sobre Porcentajes](#notas-sobre-porcentajes) para entender el papel de `PercentDenominator`.

## Fórmula de Recompensa

Considera un validador de una Subred Elástica que apuesta una cantidad de $Stake$ `AssetID` durante $StakingPeriod$ segundos.

Supongamos que al inicio del período de apuesta hay una cantidad de $Supply$ `AssetID` en la Subred.
La cantidad máxima de activos de la Subred es $MaximumSupply$ `AssetID`.

Entonces, al final de su período de apuesta, un validador elástico y receptivo de la Subred
recibe una recompensa calculada de la siguiente manera:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->

$$
Recompensa = \left(MaximumSupply - Supply \right) \times \frac{Stake}{Supply} \times \frac{Staking Period}{Minting Period} \times TasaDeConsumoEfectiva
$$

donde

$$
MaximumSupply - Supply = \text{la cantidad de tokens que quedan por emitir en la subred}
$$

$$
\frac{Stake}{Supply} = \text{la apuesta individual como porcentaje de todos los tokens disponibles en la red}
$$

$$
\frac{StakingPeriod}{MintingPeriod} = \text{tiempo que los tokens están bloqueados dividido por el $MintingPeriod$}
$$

$$
\text{$MintingPeriod$ es un año, configurado por la Red Primaria).}
$$

$$
TasaDeConsumoEfectiva =
$$

$$
\frac{MinConsumptionRate}{PercentDenominator} \times \left(1- \frac{Staking Period}{Minting Period}\right) + \frac{MaxConsumptionRate}{PercentDenominator} \times \frac{Staking Period}{Minting Period}
$$



<!-- vale on -->
<!-- markdownlint-enable MD013 -->

Ten en cuenta que $StakingPeriod$ es el período completo de staking del staker, no solo el tiempo de actividad del staker, es decir, el tiempo agregado durante el cual el staker ha estado receptivo. El tiempo de actividad solo entra en juego para decidir si se debe recompensar a un staker; para calcular la recompensa real, solo se tiene en cuenta la duración del período de staking.

$EffectiveConsumptionRate$ es la tasa a la que se recompensa al validador en función de la selección de $StakingPeriod$.

$MinConsumptionRate$ y $MaxConsumptionRate$ limitan $EffectiveConsumptionRate$:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->

$$
MinConsumptionRate \leq EffectiveConsumptionRate \leq MaxConsumptionRate
$$

<!-- vale on -->
<!-- markdownlint-enable MD013 -->

Cuanto mayor sea $StakingPeriod$, más cercano será $EffectiveConsumptionRate$ a $MaxConsumptionRate$.
Cuanto menor sea $StakingPeriod$, más cercano será $EffectiveConsumptionRate$ a $MinConsumptionRate$.

Un staker logra la recompensa máxima por su stake si $StakingPeriod$ = $Minting Period$.
La recompensa es:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->

$$
Max Reward = \left(MaximumSupply - Supply \right) \times \frac{Stake}{Supply} \times \frac{MaxConsumptionRate}{PercentDenominator}
$$

<!-- vale on -->
<!-- markdownlint-enable MD013 -->

Ten en cuenta que esta fórmula es la misma que la fórmula de recompensa en la parte superior de esta sección porque $EffectiveConsumptionRate$ = $MaxConsumptionRate$.

La fórmula de recompensa anterior se utiliza en la Red Primaria para calcular la recompensa de los stakers. Para referencia, puedes encontrar los parámetros de la red primaria en [la sección a continuación](#primary-network-parameters-on-mainnet).

## Verificaciones de peso de los delegadores

Existen límites establecidos para la cantidad máxima de stake de los delegadores que un validador puede recibir.

El peso máximo $MaxWeight$ que un validador $Validator$ puede tener es:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->

$$
    MaxWeight = \min(Validator.Weight \times MaxValidatorWeightFactor, MaxValidatorStake)
$$

<!-- vale on -->
<!-- markdownlint-enable MD013 -->

donde $MaxValidatorWeightFactor$ y $MaxValidatorStake$ son los parámetros de la Subred Elástica descritos anteriormente.

Un delegador no se agregará a un validador si la combinación de sus pesos y el peso de todos los otros delegadores del validador es mayor que $MaxWeight$. Ten en cuenta que esto debe ser cierto en cualquier momento.

<!-- vale off -->

Ten en cuenta que establecer $MaxValidatorWeightFactor$ en 1 deshabilita la delegación, ya que $MaxWeight = Validator.Weight$.

<!-- vale on -->

## Notas sobre Porcentajes

`PercentDenominator = 1_000_000` es el denominador utilizado para calcular porcentajes.

Te permite especificar porcentajes de hasta 4 posiciones decimales.
Para denominar tu porcentaje en `PercentDenominator`, simplemente multiplícalo por `10_000`.
Por ejemplo:

- `100%` corresponde a `100 * 10_000 = 1_000_000`
- `1%` corresponde a `1 * 10_000 = 10_000`
- `0.02%` corresponde a `0.002 * 10_000 = 200`
- `0.0007%` corresponde a `0.0007 * 10_000 = 7`

## Parámetros de la Red Primaria en Mainnet

Una Subred Elástica es libre de elegir cualquier parámetro que afecte las recompensas, dentro de las restricciones especificadas anteriormente. A continuación, enumeramos los parámetros de la Red Primaria en Mainnet:

- `AssetID = Avax`
- `InitialSupply = 240_000_000 Avax`
- `MaximumSupply = 720_000_000 Avax`.
- `MinConsumptionRate = 0.10 * reward.PercentDenominator`.
- `MaxConsumptionRate = 0.12 * reward.PercentDenominator`.
- `Minting Period = 365 * 24 * time.Hour`.
- `MinValidatorStake = 2_000 Avax`.
- `MaxValidatorStake = 3_000_000 Avax`.
- `MinStakeDuration = 2 * 7 * 24 * time.Hour`.
- `MaxStakeDuration = 365 * 24 * time.Hour`.
- `MinDelegationFee = 20000`, es decir, `2%`.
- `MinDelegatorStake = 25 Avax`.
- `MaxValidatorWeightFactor = 5`. Este es un parámetro de la plataformaVM en lugar de uno de génesis, por lo que se comparte entre redes.
- `UptimeRequirement = 0.8`, es decir, `80%`.