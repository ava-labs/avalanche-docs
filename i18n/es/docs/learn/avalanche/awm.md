---
tags: [Avalanche Warp Messaging, Comunicación entre subredes]
description: AWM permite una comunicación fluida entre diferentes subredes en Avalanche, lo que permite a los desarrolladores establecer protocolos de comunicación personalizados.
keywords: [documentación, avalanche, avalanche warp messaging, awm, comunicación entre subredes, cross-chain]
sidebar_label: Avalanche Warp Messaging
---

# Avalanche Warp Messaging

Avalanche Warp Messaging (AWM) permite una comunicación nativa entre subredes y permite a los desarrolladores de Máquinas Virtuales (VM) implementar protocolos de comunicación arbitrarios entre cualquier par de subredes.

## Casos de uso

Los casos de uso para AWM pueden incluir, pero no se limitan a:

- Redes de Oracle: Conectar una subred a una red de oracle es un proceso costoso. AWM facilita que las redes de oracle transmitan sus datos desde su cadena de origen a otras subredes.
- Transferencias de tokens entre subredes
- Fragmentación de estado entre múltiples subredes

## Elementos de la comunicación entre subredes

La comunicación consta de los siguientes cuatro pasos:

![imagen que muestra los cuatro pasos de la comunicación entre subredes: Firma, agregación, entrega y verificación](/img/cross-subnet-communication.png)

### Firma de mensajes en la subred de origen

AWM es un protocolo de mensajería de bajo nivel. Cualquier tipo de datos codificados en una matriz de bytes puede incluirse en el mensaje enviado a otra subred. AWM utiliza el esquema de firma BLS, que permite a los destinatarios del mensaje verificar la autenticidad de estos mensajes. Por lo tanto, cada validador en la red Avalanche tiene un par de claves BLS, que consiste en una clave privada para firmar mensajes y una clave pública que otros pueden usar para verificar la firma.

### Agregación de firmas en la subred de origen

Si el conjunto de validadores de una subred es muy grande, esto resultaría en que los validadores de la subred envíen muchas firmas entre ellos. Una de las características poderosas de BLS es la capacidad de agregar muchas firmas de diferentes firmantes en una sola firma múltiple. Por lo tanto, los validadores de una subred ahora pueden firmar individualmente un mensaje y estas firmas se agregan en una firma múltiple corta que se puede verificar rápidamente.

### Entrega de mensajes a la subred de destino

Los mensajes no pasan por un protocolo central o una entidad de confianza, y no hay registro de los mensajes enviados entre subredes en la red principal. Esto evita un cuello de botella en la comunicación entre subredes y las subredes no públicas pueden comunicarse de forma privada.

Depende de las subredes y sus usuarios determinar cómo desean transportar los datos desde los validadores de la subred de origen a los validadores de la subred de destino y qué garantías desean proporcionar para el transporte.

### Verificación de mensajes en la subred de destino

Cuando una subred desea procesar el mensaje de otra subred, buscará tanto las claves públicas BLS como la participación de la subred de origen. La autenticidad del mensaje se puede verificar utilizando estas claves públicas y la firma.

El peso combinado de los validadores que deben formar parte de la firma múltiple BLS para considerarse válida se puede establecer de acuerdo con los requisitos individuales de cada comunicación entre subredes. La subred A puede aceptar mensajes de la subred B que estén firmados por al menos el 70% de la participación. Los mensajes de la subred C solo se aceptan si han sido firmados por validadores que representan el 90% de la participación.

Dado que las claves públicas de todos los validadores y sus pesos de participación se registran en la cadena P de la red principal, están fácilmente accesibles para cualquier máquina virtual ejecutada por los validadores. Por lo tanto, las subredes no necesitan comunicarse entre sí sobre los cambios en sus respectivos conjuntos de validadores, sino que pueden confiar en la información más reciente en la cadena P. Por lo tanto, AWM no introduce ninguna suposición de confianza adicional aparte de que los validadores de la subred de origen están participando honestamente.

## Implementación de referencia

Se creó una Máquina Virtual de prueba de concepto llamada [XSVM](https://github.com/ava-labs/xsvm) para demostrar el poder de AWM. XSVM permite transferencias sencillas de AWM entre cualquier par de subredes si se ejecuta tal como está.