---
tags: [Nodos]
description: Si experimentas algún problema al construir tu nodo, aquí tienes algunos errores comunes y posibles soluciones.
sidebar_label: Errores Comunes
pagination_label: Errores Comunes al Construir un Nodo
sidebar_position: 5
---

# Errores Comunes al Construir un Nodo

## Introducción

Si experimentas algún problema al construir tu nodo, aquí tienes algunos errores comunes y posibles soluciones.

### Fallo al Conectar con Nodos de Inicio Rápido

Error: `WARN node/node.go:291 fallo al conectar con nodos de inicio rápido`

Este error puede ocurrir cuando el nodo no tiene acceso a Internet o si el NodeID ya está siendo utilizado por un nodo diferente en la red. Esto puede ocurrir cuando una instancia antigua está en ejecución y no se ha terminado.

### No se Puede Consultar Datos no Finalizados

Error: `err="no se pueden consultar datos no finalizados"`

Puede haber varias razones para este problema, pero es probable que el nodo no esté conectado correctamente a otros validadores, lo cual suele ser causado por una configuración de red incorrecta (IP pública incorrecta, puerto p2p 9651 cerrado).
