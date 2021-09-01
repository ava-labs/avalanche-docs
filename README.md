---
description: >-
  Crea en Avalanche. Crea sin límites. Los desarrolladores que crean en Avalanche pueden crear fácilmente aplicaciones poderosas, confiables y seguras.
---

# Documentación para desarrolladores

## Avalanche

[Avalanche](https://avax.network) es una plataforma de código abierto para lanzar [aplicaciones descentralizadas](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp) e implementar [blockchain](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain) empresarial en un ecosistema interoperable y altamente escalable. Avalanche es la primera plataforma descentralizada de contratos inteligentes desarrollada para la escala de finanzas globales, con finalización de transacciones casi instantáneas. Los desarrolladores de Ethereum pueden crear rápidamente en Avalanche ya que Solidity funciona fuera de la caja.

Una diferencia clave entre Avalanche y otras redes descentralizadas es el protocolo de consenso. Con el tiempo, la gente ha llegado a un falso entendimiento de que las blockchains tienen que ser lentas y no escalables. El protocolo de Avalanche emplea un novedoso enfoque de consenso para lograr sus sólidas garantías de seguridad, su rápida finalidad y su alto rendimiento, sin comprometer la descentralización.

## C-AVAX

AVAX es el token nativo de Avalanche. Es un activo de capital duro y escaso que se utiliza para pagar por las tasas, asegurar la plataforma a través de la staking, y proporcionar una unidad de cuenta básica entre las múltiples subredes creadas en Avalanche. `1 nAVAX`es igual a la misma.`0.000000001 AVAX`

## Protocolo de Consenso de Avalanche

![Comparación de Consenso](.gitbook/assets/image%20%2810%29%20%281%29%20%281%29%20%281%29.png)

Los protocolos en la familia Avalanche operan a través de repetidas votaciones sub-muestreadas. Cuando un [validador](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) está determinando si una transacción debe ser aceptada o rechazada, [pide](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) un pequeño subconjunto aleatorio de validadores si piensan que la transacción debe ser aceptada o rechazada. Si el validador consultado piensa que la transacción no es válida, ya la ha rechazado o prefiere una transacción conflictiva, responde que piensa que la transacción debe ser rechazada. En caso contrario, responde que cree que la transacción debería ser aceptada.

Si una porción suficientemente grande _\(alfa $α${ _$α$\) de los validadores muestra la respuesta de que piensan que la transacción debe ser aceptada, el validador prefiere aceptar la transacción. Es decir, cuando se le pregunte sobre la transacción en el futuro, responderá que cree que la transacción debe ser aceptada. Del mismo modo, el validador preferirá rechazar la transacción si una parte suficientemente grande de los validadores responde que cree que la transacción debería ser rechazada.

El validador retoma este proceso de muestreo hasta que la _alfa de los validadores preguntó contestación de la misma forma _\(acepten o rechazan\) para _las rondas consecutivas _$β$.

En el caso común de que una transacción no tenga conflictos, la finalización se produce muy rápidamente. Cuando existen conflictos, los validadores honestos se agrupan rápidamente en torno a las transacciones conflictivas, entrando en un bucle de retroalimentación positiva hasta que todos los validadores correctos prefieran esa transacción. Esto lleva a la aceptación de transacciones no conflictivas y al rechazo de las transacciones conflictivas.

![Cómo funciona el consenso de Avalanche](.gitbook/assets/howavalancheconsensusworks.png)

Se garantiza \(con una alta probabilidad basada en los parámetros del sistema\) que si cualquier validador honesto acepta o rechaza una transacción, todos los validadores honestos aceptarán o rechazarán esa transacción.

Más información componentes técnicos del protocolo de consenso de Avalanche al leer el [libro blanco](https://arxiv.org/pdf/1906.08936.pdf).

## Protocolo de Consenso Snowman

Snowman es un protocolo de consenso optimizado en cadena de alto rendimiento, totalmente ordenado, y genial para smart contracts. Snowman está impulsado por el protocolo de [consenso de Avalanche](./#avalanche-consensus-protocol). Tanto la [P-Chain](learn/platform-overview/#platform-chain-p-chain) como la [C-Chain](learn/platform-overview/#contract-chain-c-chain) implementan el protocolo de consenso Snowman.

## Características principales

### Velocidad

Utiliza un novedoso protocolo de consenso, desarrollado por un equipo de informáticos de Cornell, y es capaz de confirmar permanentemente las transacciones en menos de 1 segundo.

### Escalabilidad

Con capacidad para 4 500 transacciones por segundo, un orden de magnitud mayor que las blockchains existentes.

### Seguridad

Asegura garantías de seguridad más fuertes, muy por encima del estándar del 51% de otras redes.

### Flexibilidad

Crea fácilmente blockchains personalizadas y aplicaciones descentralizadas que contengan casi cualquier lógica arbitraria.

### Sostenibilidad

Utiliza el algoritmo de consenso de eficiencia energética proof-of-stake en lugar de proof-of-work.

### Soporte de Smart Contracts

Permite la creación de smart contracts en Solidity y tus herramientas favoritas de Ethereum como Remix, Metamask, Truffle, y más.

### Blockchains Públicas y Privadas

Crea tus propias blockchains públicas o privadas.

### Diseñado para las finanzas

Soporte nativo para crear e intercambiar fácilmente activos digitales inteligentes con reglas complejas y personalizadas.

