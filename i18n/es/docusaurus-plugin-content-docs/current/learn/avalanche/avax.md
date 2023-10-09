---
tags: [Avax, Tokenómica]
description: AVAX es el token de suministro limitado de la red Avalanche, utilizado para cubrir tarifas, mejorar la seguridad a través del staking y facilitar transacciones en sus diversas Subnets.
keywords: [documentación, avalanche, token AVAX, tokenómica, utilidad AVAX]
sidebar_label: Token AVAX
---

# AVAX

AVAX es el token de utilidad nativo de Avalanche. Es un activo de suministro limitado y escaso que se utiliza para pagar tarifas, asegurar la plataforma a través del staking y proporcionar una unidad básica de cuenta entre las múltiples Subnets creadas en Avalanche.

:::info

- `1 nAVAX` es igual a `0.000000001 AVAX`.

:::

## Utilidad

AVAX es un recurso de suministro limitado (hasta 720M) en el ecosistema de Avalanche que se utiliza para alimentar la red. AVAX se utiliza para asegurar el ecosistema a través del staking y para operaciones diarias como emitir transacciones.

AVAX representa el peso que cada nodo tiene en las decisiones de la red. Ningún actor único es dueño de la Red Avalanche, por lo que a cada validador en la red se le asigna un peso proporcional en las decisiones de la red correspondiente a la proporción de la participación total que poseen a través de la prueba de participación (PoS).

Cualquier entidad que intente ejecutar una transacción en Avalanche paga una tarifa correspondiente (comúnmente conocida como "gas") para ejecutarla en la red. Las tarifas utilizadas para ejecutar una transacción en Avalanche se queman o se eliminan permanentemente del suministro circulante.

## Tokenómica

Se acuñó una cantidad fija de 360M de AVAX en el génesis, pero constantemente se acuña una pequeña cantidad de AVAX como recompensa para los validadores. El protocolo recompensa a los validadores por su buen comportamiento al acuñarles recompensas de AVAX al final de su período de staking. El proceso de acuñación compensa el AVAX quemado por las tarifas de transacción. Si bien AVAX todavía está lejos de alcanzar su límite de suministro, casi siempre seguirá siendo un activo inflacionario.

Avalanche no retira ninguna parte de los tokens ya apostados de un validador (comúnmente conocido como "slashing") por períodos de staking negligentes/maliciosos, sin embargo, este comportamiento no se incentiva ya que los validadores que intenten dañar la red gastarían los recursos informáticos de su nodo sin ninguna recompensa.

<!-- vale off -->

AVAX se acuña de acuerdo con la siguiente fórmula, donde $R_j$ es el número total de tokens en el año $j$, con $R_1 = 360M$, y $R_l$ representa el último año en que se cambiaron los valores de $\gamma,\lambda \in \R$; $c_j$ es el suministro de monedas aún no acuñadas para alcanzar $720M$ en el año $j$ de manera que $c_j \leq 360M$; $u$ representa un apostador, con $u.s_{amount}$ que representa la cantidad total de participación que posee $u$, y $u.s_{time}$ la duración de la participación de $u$.

AVAX se acuña de acuerdo con la siguiente fórmula, donde $R_j$ es el número total de tokens en:

<!-- markdownlint-disable MD013 -->

$$
R_j = R_l + \sum_{\forall u} \rho(u.s_{amount}, u.s_{time}) \times \frac{c_j}{L} \times \left( \sum_{i=0}^{j}\frac{1}{\left(\gamma + \frac{1}{1 + i^\lambda}\right)^i} \right)
$$

<!-- markdownlint-enable MD013 -->

donde

$$
L = \left(\sum_{i=0}^{\infty} \frac{1}{\left(\gamma + \frac{1}{1 + i^\lambda} \right)^i} \right)
$$

En el génesis, $c_1 = 360M$. Los valores de $\gamma$ y $\lambda$ son gobernables, y si se cambian, la función se recalcula con el nuevo valor de $c_*$. Tenemos que $\sum_{*}\rho(*) \le 1$. $\rho(*)$ es una función lineal que se puede calcular de la siguiente manera ($u.s_{time}$ se mide en semanas, y $u.s_{amount}$ se mide en tokens AVAX):

$$
\rho(u.s_{amount}, u.s_{time}) = (0.002 \times u.s_{time} + 0.896) \times \frac{u.s_{amount}}{R_j}
$$

Si todo el suministro de tokens en el año $j$ se apuesta durante el máximo tiempo de participación (un año, o 52 semanas), entonces $\sum_{\forall u}\rho(u.s_{amount}, u.s_{time}) = 1$. Si, en cambio, cada token se apuesta continuamente durante la duración mínima de participación de dos semanas, entonces $\sum_{\forall u}\rho(u.s_{amount}, u.s_{time}) = 0.9$. Por lo tanto, apostar durante el máximo tiempo de participación conlleva una cantidad adicional del 11.11% de tokens acuñados, incentivando a los apostadores a apostar durante períodos más largos.

Debido al suministro limitado, la función anterior garantiza que, independientemente de los cambios de gobernanza, AVAX nunca superará un total de $720M$ tokens, o $\lim_{j \to \infty} R(j) = 720M$.

<!-- vale on -->