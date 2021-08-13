---
description: >-
  Construye sobre Avalanche. Construir sin límites. Los desarrolladores que se basan en Avalanche pueden crear aplicaciones poderosas, confiables y seguras.

---

# Documentación para desarrolladores

## Avalanche

[Avalanche](https://avax.network) es una plataforma de código abierto para lanzar [aplicaciones descentralizadas](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp) y despliegues de [blockchain](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain) empresarial en un ecosistema interoperable y altamente escalable. Avalanche es la primera plataforma descentralizada de contratos inteligentes construida para la escala de finanzas mundiales, con la finalización de transacciones casi instantáneas. Los desarrolladores de Ethereum pueden construir rápidamente en Avalanche mientras Solidity funciona fuera de la caja.

Una diferencia clave entre Avalanche y otras redes descentralizadas es el protocolo de consenso. Con el tiempo, la gente ha llegado a una falsa comprensión de que las cadenas de bloqueo deben ser lentas y no escalables. El protocolo Avalanche emplea un nuevo enfoque de consenso para lograr sus fuertes garantías de seguridad, su rápida finalización y su alto rendimiento sin comprometer la descentralización.

## AVAX

AVAX es la muestra nativa de Avalanche. Es un activo difícil y escaso, que se utiliza para pagar por las tasas, asegurar la plataforma a través de la acumulación y proporcionar una unidad de cuenta básica entre las múltiples subredes creadas en Avalanche. `1 nAVAX` es igual a `0.001 AVAX`.

## Protocolo de Consenso de Avalanche

![Comparación de Consenso](.gitbook/assets/image%20%2810%29%20%281%29%20%281%29%20%281%29.png)

Los Protocolos de la familia Avalanche operan mediante votación repetida de submuestreo. Cuando un [validador](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) está determinando si una transacción debe ser aceptada o rechazada, [pregunta](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) a un pequeño subconjunto aleatorio de validadores si piensan que la transacción debe ser aceptada o rechazada. Si el validador consultado considera que la transacción es inválida, ya ha rechazado la transacción o prefiere una transacción conflictiva, responde a que cree que la transacción debe ser rechazada. De lo contrario, responde que cree que la transacción debe ser aceptada.

Si una porción suficientemente grande _\(alfa_ $$α$\) de los validadores muestra la respuesta que piensan que la transacción debe ser aceptada, el validador prefiere aceptar la transacción. Es decir, cuando se pregunte sobre la transacción en el futuro, responderá que cree que la transacción debe ser aceptada. De igual manera, el validador preferirá rechazar la transacción si una parte suficientemente grande de los validadores responde que creen que la transacción debe ser rechazada.

El validador repite este proceso de muestreo hasta que _alfa_ de los validadores se preguntó respuesta de la misma manera \(aceptar o rechazar\) para _beta_ $β$$ rondas consecutivas.

En el caso común cuando una transacción no tiene conflictos, la finalización ocurre muy rápidamente. Cuando existen conflictos, los validadores honestos rápidamente se agrupan alrededor de transacciones conflictivas, introduciendo un bucle de retroalimentación positivo hasta que todos los validadores correctos prefieren esa transacción. Esto conduce a la aceptación de transacciones no conflictivas y al rechazo de transacciones conflictivas.

![Cómo funciona el Consenso de Avalanche](.gitbook/assets/howavalancheconsensusworks.png)

Se garantiza \(con alta probabilidad basada en parámetros del sistema) que si cualquier validador honesto acepta o rechaza una transacción, todos los validadores honestos aceptarán o rechazarán esa transacción.

Más información componentes técnicos del protocolo de consenso de Avalanche leyendo el [whitepaper](https://arxiv.org/pdf/1906.08936.pdf).

## Protocolo de Consenso de Snowman

Snowman es un protocolo de consenso optimizado por cadena, de alto rendimiento, totalmente ordenado y ideal para contratos inteligentes. El Snowman está impulsado por el [protocolo de consenso de Avalanche](./#avalanche-consensus-protocol). Tanto [la cadena P](learn/platform-overview/#platform-chain-p-chain) como la cadena [C](learn/platform-overview/#contract-chain-c-chain) implementan el protocolo de consenso de Snowman.

## Características principales

### Velocidad de transmisión

Utiliza un nuevo protocolo de consenso, desarrollado por un equipo de científicos de la informática de Cornell, y es capaz de confirmar permanentemente las transacciones en menos de 1 segundo.

### Escalabilidad

Capaz de 4.500 transacciones por segundo, un orden de magnitud mayor que las cadenas de bloqueo existentes.

### Seguridad

Garantiza una seguridad más fuerte que garantiza muy por encima del estándar del 51% de otras redes.

### Flexibilidad

Cree fácilmente blockchains personalizados y aplicaciones descentralizadas que contienen casi cualquier lógica arbitraria.

### Sostenibilidad

Utiliza un algoritmo de consenso de prueba de interés eficiente en energía en lugar de prueba de trabajo.

### Soporte de contrato inteligente

Soporta la creación de contratos inteligentes de Solidez y tus herramientas favoritas de Ethereum como Remix, Metamask, Trufa y más.

### Bloquees privados y públicos

Crea tus propias cadenas de bloqueo públicas o privadas.

### Diseñado para Finanzas

Soporte nativo para crear y comerciar fácilmente activos inteligentes digitales con reglas complejas y personalizadas.

