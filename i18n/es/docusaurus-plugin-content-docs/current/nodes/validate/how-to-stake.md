---
tags: [Nodos]
description: Esta sección proporciona documentos sobre cómo apostar AVAX en la Red Avalanche.
sidebar_label: Cómo Apostar
pagination_label: Cómo Apostar AVAX
sidebar_position: 2
---

# Cómo Apostar en Avalanche

## Parámetros de Apostar en Avalanche

Cuando un validador ha terminado de validar la [Red Primaria](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), recibe de vuelta los tokens AVAX que apostó. Puede recibir una recompensa por ayudar a asegurar la red. Un validador solo recibe una [recompensa de validación](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) si es suficientemente receptivo y correcto durante el tiempo en el que valida. Lee el [white paper](https://www.avalabs.org/whitepapers) del token Avalanche para aprender más sobre AVAX y los mecanismos de apostar.

:::caution

Las recompensas de apostar se envían a tu dirección de billetera al final del período de apostar **si se cumplen todos estos parámetros**.

:::

### Mainnet

- La cantidad mínima que un validador debe apostar es de 2,000 AVAX
- La cantidad mínima que un delegador debe delegar es de 25 AVAX
- El tiempo mínimo en el que se pueden apostar fondos para validación es de 2 semanas
- El tiempo máximo en el que se pueden apostar fondos para validación es de 1 año
- El tiempo mínimo en el que se pueden apostar fondos para delegación es de 2 semanas
- El tiempo máximo en el que se pueden apostar fondos para delegación es de 1 año
- La tasa mínima de tarifa de delegación es del 2%
- El peso máximo de un validador (su propia apuesta + apuesta delegada a ellos) es el mínimo de 3 millones de AVAX y 5 veces la cantidad que el validador apostó. Por ejemplo, si apostaste 2,000 AVAX para convertirte en un validador, solo 8,000 AVAX pueden ser delegados a tu nodo en total (no por delegador).

Un validador recibirá una recompensa de apostar si está en línea y responde durante más del 80% de su período de validación, según lo medido por la mayoría de los validadores, ponderado por la apuesta. **Deberías apuntar a que tu validador esté en línea y sea receptivo el 100% del tiempo**.

Puedes llamar al método de API `info.uptime` en tu nodo para aprender su tiempo de actividad ponderado y qué porcentaje de la red piensa actualmente que tu nodo tiene un tiempo de actividad suficientemente alto para recibir una recompensa de apostar. Ver [aquí](/reference/avalanchego/info-api.md#infouptime). Puedes obtener otra opinión sobre el tiempo de actividad de tu nodo desde el [tablero de salud del validador](https://stats.avax.network/dashboard/validator-health-check/) de Avalanche. Si tu tiempo de actividad reportado no está cerca del 100%, puede haber algo mal con la configuración de tu nodo, lo que podría poner en peligro tu recompensa de apostar. Si este es el caso, por favor ve [aquí](#por-qué-está-bajo-mi-tiempo-de-actividad) o contáctanos en [Discord](https://chat.avax.network) para que podamos ayudarte a encontrar el problema. Ten en cuenta que solo verificar el tiempo de actividad de tu validador según lo medido por nodos que no están apostando, validadores con una pequeña apuesta o validadores que no han estado en línea durante toda la duración de tu período de validación puede proporcionar una vista inexacta del verdadero tiempo de actividad de tu nodo.

### Fuji Testnet

En Fuji Testnet, todos los parámetros de apostar son iguales que en Mainnet, excepto los siguientes:

- La cantidad mínima que un validador debe apostar es de 1 AVAX
- La cantidad mínima que un delegador debe delegar es de 1 AVAX
- El tiempo mínimo en el que se pueden apostar fondos para validación es de 24 horas
- El tiempo mínimo en el que se pueden apostar fondos para delegación es de 24 horas

## Validadores

**Validadores** aseguran Avalanche, crean nuevos bloques y procesan transacciones. Para lograr consenso, los validadores muestrean repetidamente a los demás. La probabilidad de que se muestree a un validador dado es proporcional a su apuesta.

Cuando agregas un nodo al conjunto de validadores, especificas:

- La ID de tu nodo
- La clave BLS de tu nodo y la firma BLS
- Cuándo quieres comenzar y dejar de validar
- Cuántos AVAX estás apostando
- La dirección a la que enviar cualquier recompensa
- Tu tasa de tarifa de delegación (ver más abajo)

:::info
La cantidad mínima que un validador debe apostar es de 2,000 AVAX.
:::

:::warning

Ten en cuenta que una vez que emites la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros. **No puedes quitar tu apuesta temprano o cambiar la cantidad de apuesta, la ID del nodo o la dirección de recompensa.** Asegúrate de usar los valores correctos en las llamadas de API a continuación. Si no estás seguro, pide ayuda en [Discord](https://chat.avax.network). Si quieres agregar más tokens a tu propio validador, puedes delegar los tokens a este nodo, pero no puedes aumentar la cantidad de validación base (así que delegar a ti mismo va en contra de tu límite de delegación).

:::

### Ejecutando un Validador

Si estás ejecutando un validador, es importante que tu nodo esté bien conectado para asegurarte de recibir una recompensa.

Cuando emites la transacción para agregar un validador, los tokens apostados y la tarifa de transacción (que es 0) se deducen de las direcciones que controlas. Cuando terminas de validar, los fondos apostados se devuelven a las direcciones de las que vinieron. Si ganaste una recompensa, se envía a la dirección que especificaste cuando te agregaste como validador.

#### Permitir Llamadas de API

Para hacer llamadas de API a tu nodo desde máquinas remotas, permite el tráfico en el puerto de la API (`9650` de forma predeterminada) y ejecuta tu nodo con el argumento `--http-host=`

Deberías deshabilitar todas las API que no vayas a usar a través de argumentos de línea de comandos. Deberías configurar tu red para permitir el acceso al puerto de la API solo desde máquinas de confianza (por ejemplo, tu computadora personal).

#### ¿Por qué está bajo mi tiempo de actividad?

Cada validador en Avalanche lleva un registro del tiempo de actividad de los otros validadores. Cada validador tiene un peso (que es la cantidad apostada en él). Cuanto más peso tenga un validador, más influencia tendrá cuando los validadores voten si tu nodo debe recibir una recompensa de apostar. Puedes llamar al método de API `info.uptime` en tu nodo para aprender su tiempo de actividad ponderado y qué porcentaje de la red de apuestas piensa actualmente que tu nodo tiene un tiempo de actividad suficientemente alto para recibir una recompensa de apostar.

También puedes ver las conexiones que tiene un nodo llamando a `info.peers`, así como el tiempo de actividad de cada conexión. **Esta es solo la perspectiva de un nodo**. Otros nodos pueden percibir el tiempo de actividad de tu nodo de manera diferente. Solo porque un nodo perciba que tu tiempo de actividad es bajo no significa que no recibirás recompensas de apostar.

Si el tiempo de actividad de tu nodo es bajo, asegúrate de establecer la opción de configuración `--public-ip=[IP PÚBLICA DEL NODO]` y de que tu nodo pueda recibir tráfico TCP entrante en el puerto 9651.

#### Gestión de Secretos

El único secreto que necesitas en tu nodo validador es su Clave de Apostar, la clave TLS que determina la ID de tu nodo. La primera vez que inicias un nodo, se crea la Clave de Apostar y se coloca en `$HOME/.avalanchego/staking/staker.key`. Deberías hacer una copia de seguridad de este archivo (y `staker.crt`) en algún lugar seguro. Perder tu Clave de Apostar podría poner en peligro tu recompensa de validación, ya que tu nodo tendrá una nueva ID.

No necesitas tener fondos AVAX en tu nodo validador. De hecho, es una buena práctica **no** tener muchos fondos en tu nodo. Casi todos tus fondos deberían estar en direcciones "frías" cuya clave privada no está en ninguna computadora.

#### Monitoreo

Sigue este [tutorial](/nodes/maintain/setting-up-node-monitoring.md) para aprender cómo monitorear el tiempo de actividad de tu nodo, su salud general, etc.

### Fórmula de Recompensa

Considera un validador que apuesta una cantidad de $Stake$ dólares de Avax durante $StakingPeriod$ segundos.

Supongamos que al comienzo del período de apuesta hay una cantidad de $Supply$ dólares de Avax en la Red Primaria.
La cantidad máxima de Avax es $MaximumSupply$.

Entonces, al final de su período de apuesta, un validador receptivo recibe una recompensa calculada de la siguiente manera:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
Recompensa = \left(SuministroMaximo - Suministro \right) \times \frac{Participacion}{Suministro} \times \frac{PeriodoDeStaking}{PeriodoDeMinting} \times TasaDeConsumoEfectiva
$$
donde
$$
TasaDeConsumoEfectiva = 
$$
$$
\frac{TasaDeConsumoMinima}{DenominadorDePorcentaje} \times \left(1- \frac{PeriodoDeStaking}{PeriodoDeMinting}\right) + \frac{TasaDeConsumoMaxima}{DenominadorDePorcentaje} \times \frac{PeriodoDeStaking}{PeriodoDeMinting}
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

Ten en cuenta que $PeriodoDeStaking$ es el período completo de staking del staker, no solo el tiempo de actividad del staker, es decir, el tiempo agregado durante el cual el staker ha sido receptivo. El tiempo de actividad entra en juego solo para decidir si un staker debe ser recompensado; para calcular la recompensa real, solo se tiene en cuenta la duración del período de staking.

$TasaDeConsumoEfectiva$ es una combinación lineal de $TasaDeConsumoMinima$ y $TasaDeConsumoMaxima$.
$TasaDeConsumoMinima$ y $TasaDeConsumoMaxima$ acotan $TasaDeConsumoEfectiva$ porque

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
TasaDeConsumoMinima \leq TasaDeConsumoEfectiva \leq TasaDeConsumoMaxima
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->

Cuanto mayor sea $PeriodoDeStaking$, más cerca estará $TasaDeConsumoEfectiva$ de $TasaDeConsumoMaxima$.

Un staker alcanza la recompensa máxima por su participación si $PeriodoDeStaking$ = $PeriodoDeMinting$.
La recompensa es:

<!-- markdownlint-disable MD013 -->
<!-- vale off -->
$$
RecompensaMaxima = \left(SuministroMaximo - Suministro \right) \times \frac{Participacion}{Suministro} \times \frac{TasaDeConsumoMaxima}{DenominadorDePorcentaje}
$$
<!-- vale on -->
<!-- markdownlint-enable MD013 -->



## Delegadores

Un delegador es un titular de tokens que desea participar en el staking, pero elige confiar en un nodo validador existente a través de la delegación.

Cuando delegas participación a un validador, especificas:

- El ID del nodo al que estás delegando
- Cuándo quieres comenzar / dejar de delegar participación (debe ser mientras el validador está validando)
- Cuántos AVAX estás apostando
- La dirección a la que enviar cualquier recompensa

:::info
La cantidad mínima que un delegador debe delegar son 25 AVAX.
:::

:::warning

Ten en cuenta que una vez que emites la transacción para agregar tu participación a un delegador, no hay forma de cambiar los parámetros. **No puedes quitar tu participación antes de tiempo o cambiar la cantidad de participación, el ID del nodo o la dirección de recompensa.** Si no estás seguro, pide ayuda en [Discord](https://chat.avax.network).

:::

### Recompensas del Delegador

Si el validador al que delegas tokens es suficientemente correcto y receptivo, recibirás una recompensa cuando hayas terminado de delegar. Los delegadores son recompensados según la misma función que los validadores. Sin embargo, el validador al que delegas mantiene una parte de tu recompensa especificada por la tasa de tarifa de delegación del validador.

Cuando emites la transacción para delegar tokens, los tokens apostados y la tarifa de transacción se deducen de las direcciones que controlas. Cuando hayas terminado de delegar, los tokens apostados se devuelven a tu dirección. Si ganaste una recompensa, se envía a la dirección que especificaste cuando delegaste los tokens. Las recompensas se envían a los delegadores justo después de que la delegación termine con la devolución de los tokens apostados, y antes de que el período de validación del nodo al que están delegando esté completo.

## Preguntas frecuentes

### ¿Hay una herramienta para verificar la salud de un validador?

Sí, simplemente ingresa el ID de tu nodo en el Avalanche Stats 
[Panel de control de salud del validador](https://stats.avax.network/dashboard/validator-health-check/?nodeid=NodeID-Jp4dLMTHd6huttS1jZhqNnBN9ZMNmTmWC).

### ¿Cómo se determina si un validador recibe una recompensa de staking?

Cuando un nodo sale del conjunto de validadores, los validadores votan si el nodo que sale debe recibir una recompensa de staking o no. Si un validador calcula que el nodo que sale fue receptivo durante más del tiempo de actividad requerido (actualmente 80%), el validador votará para que el nodo que sale reciba una recompensa de staking. De lo contrario, el validador votará que el nodo que sale no debe recibir una recompensa de staking. El resultado de esta votación, que está ponderada por la participación, determina si el nodo que sale recibe una recompensa o no.

Cada validador solo vota "sí" o "no". No comparte sus datos como el tiempo de actividad del nodo que sale.

Cada período de validación se considera por separado. Es decir, supongamos que un nodo se une al conjunto de validadores y luego sale. Luego se une y sale de nuevo. El tiempo de actividad del nodo durante su primer período en el conjunto de validadores no afecta el cálculo del tiempo de actividad en el segundo período, por lo tanto, no tiene ningún impacto en si el nodo recibe una recompensa de staking por su segundo período en el conjunto de validadores.

### ¿Cómo se distribuyen las tarifas de delegación a los validadores?

Si un validador está en línea durante el 80% de un período de delegación, 
recibe un % de la recompensa (la tarifa) ganada por el delegador. 
La P-Chain solía distribuir esta tarifa como una salida UTXO separada por período de delegación. 
Después de la 
[Activación de Cortina](https://medium.com/avalancheavax/cortina-x-chain-linearization-a1d9305553f6), 
en lugar de enviar una salida UTXO de tarifa por cada período de delegación exitoso, 
las tarifas ahora se agrupan durante todo el período de validación de un nodo y se distribuyen cuando se desapuesta.

### Error: No se pudo emitir TX: el validador estaría sobredelegado

Este error ocurre siempre que el delegador no puede delegar al validador mencionado. 
Esto puede ser causado por lo siguiente.

- El `startTime` del delegador es antes del `startTime` del validador
- El `endTime` del delegador es después del `endTime` del validador
- El peso del delegador haría que el peso total del validador exceda su peso máximo.
