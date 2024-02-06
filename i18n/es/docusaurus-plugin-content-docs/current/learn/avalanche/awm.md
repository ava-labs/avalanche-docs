---
tags: [Avalanche Warp Messaging, Comunicación entre Subnets]
description: AWM permite una comunicación fluida entre diferentes Subnets  en Avalanche, permitiendo a los desarrolladores establecer protocolos de comunicación personalizados.
keywords:
  [
    docs,
    documentación,
    avalanche,
    avalanche warp messaging,
    awm,
    comunicación entre Subnets,
    cross-chain,
  ]
sidebar_label: Avalanche Warp Messaging
---

# Avalanche Warp Messaging

Avalanche Warp Messaging (AWM) permite la comunicación nativa entre Subnets y permite a los desarrolladores de Máquinas Virtuales (VM) implementar protocolos de comunicación arbitrarios entre cualquier par de Subnets .

## Casos de Uso

Los casos de uso para AWM pueden incluir, pero no se limitan a:

- Redes de Oráculos: Conectar una Subnet a una red de oráculos es un proceso costoso. AWM facilita que las redes de oráculos transmitan sus datos desde su cadena de origen a otras Subnets .
- Transferencias de tokens entre Subnets
- Shardización de estado entre múltiples Subnets

## Elementos de la Comunicación entre Subnets

La comunicación consta de los siguientes cuatro pasos:

![imagen que muestra los cuatro pasos de la comunicación entre Subnets : Firma, agregación, entrega y verificación](/img/cross-subnet-communication.png)

### Firma de Mensajes en la Subnet de Origen

AWM es un protocolo de mensajería de bajo nivel. Cualquier tipo de datos codificados en un arreglo de bytes puede incluirse en el mensaje enviado a otra Subnet . AWM utiliza el esquema de firma BLS, que permite a los destinatarios del mensaje verificar la autenticidad de estos mensajes. Por lo tanto, cada validador en la red Avalanche tiene un par de claves BLS, que consiste en una clave privada para firmar mensajes y una clave pública que otros pueden usar para verificar la firma.

### Agregación de Firmas en la Subnet de Origen

Si el conjunto de validadores de una Subnet es muy grande, esto resultaría en que los validadores de la Subnet envíen muchas firmas entre ellos. Una de las características poderosas de BLS es la capacidad de agregar muchas firmas de diferentes firmantes en una sola firma múltiple. Por lo tanto, los validadores de una Subnet ahora pueden firmar individualmente un mensaje y estas firmas se agregan en una firma múltiple corta que se puede verificar rápidamente.

### Entrega de Mensajes a la Subnet de Destino

Los mensajes no pasan a través de un protocolo central o una entidad de confianza, y no hay registro de los mensajes enviados entre Subnets en la red primaria. Esto evita un cuello de botella en la comunicación de Subnet a Subnet , y las Subnets no públicas pueden comunicarse de forma privada.

Depende de las Subnets y sus usuarios determinar cómo quieren transportar los datos desde los validadores de la Subnet de origen a los validadores de la Subnet de destino y qué garantías quieren proporcionar para el transporte.

### Verificación de Mensajes en la Subnet de Destino

Cuando una Subnet quiere procesar el mensaje de otra Subnet , buscará tanto las Claves Públicas BLS como la participación de la Subnet de origen. La autenticidad del mensaje se puede verificar utilizando estas claves públicas y la firma.

El peso combinado de los validadores que deben formar parte de la firma múltiple BLS para considerarse válida se puede establecer de acuerdo con los requisitos individuales de cada comunicación de Subnet a Subnet . La Subnet A puede aceptar mensajes de la Subnet B que estén firmados por al menos el 70% de la participación. Los mensajes de la Subnet C solo se aceptan si han sido firmados por validadores que representan el 90% de la participación.

Dado que todas las claves públicas de los validadores y sus pesos de participación se registran en la cadena P de la red primaria, son fácilmente accesibles para cualquier máquina virtual ejecutada por los validadores. Por lo tanto, las Subnets no necesitan comunicarse entre sí sobre cambios en sus respectivos conjuntos de validadores, sino que pueden confiar simplemente en la información más reciente en la Cadena P. Por lo tanto, AWM no introduce ninguna suposición de confianza adicional aparte de que los validadores de la Subnet de origen están participando honestamente.

## Implementación de Referencia

Se creó una VM de prueba de concepto llamada [XSVM](https://github.com/ava-labs/xsvm) para demostrar el poder de AWM. XSVM permite transferencias simples de AWM entre cualquier par de Subnets si se ejecuta tal como está.
