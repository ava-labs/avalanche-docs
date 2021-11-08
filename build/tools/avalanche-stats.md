# Estadísticas de Avalanche

## Introducción

Hemos creado un sitio web de [estadísticas](https://stats.avax.network) desde el cual puedes aprender muchas cosas sobre las estadísticas actuales de avalanche.

## ¿Qué se incluye?

Tenemos tres áreas principales en nuestras estadísticas: [Participación](avalanche-stats.md#staking), [Chequeo de la Salud del Validador](avalanche-stats.md#validator-health-check) y [Actividad de la C-Chain](avalanche-stats.md#c-chain-activity).

## Staking

Puedes acceder a esta parte desde [este](https://stats.avax.network/dashboard/staking) enlace, donde obtendrás la siguiente información:

* Conteo de validadores activos
* Conteo de delegaciones activas
* Participación total
* Peso promedio de los validadores
* Participación fuera de línea
* Participación puesta en espera
* Conteo de validadores o delegadores (gráficamente)
* Participación de validadores o delegadores (gráficamente)
* Peso promedio de validadores (gráficamente)
* Distribución de la versión de participación
* Distribución de la comisión de delegación
* Distribución del peso de los validadores (gráficamente)
* Distribución de la participación de los validadores (gráficamente)
* Distribución de la participación de la delegación
* Validadores receptivos
* Tendencia a responder
* Validadores no receptivos
* Tendencia a no responder
* Nodos fuera de línea
* Nodos puestos en espera
* Participación no receptiva (últimas 48 horas, gráficamente)
* Participaciones puestas en espera para cada cadena
* Tabla de nodos fuera de línea
* Tabla de nodos inaccesibles
* Tabla de nodos puestos en espera

## Verificación de la salud de los validadores

Cuando ingresas el ID de un nodo en [este](https://stats.avax.network/dashboard/validator-health-check) enlace, puedes ver la siguiente información sobre ese nodo:

### ¿Mi validador está bien?

Atención, esto no es para el estado fuera de línea.

### ¿Mi validador está respondiendo (no está "puesto en espera")?

Cuando un nodo no responda a las consultas de otros nodos durante cinco minutos, otros nodos considerarán que está temporalmente fuera de línea (a esto se le llama "poner en espera" o "benching"). Un nodo puesto en espera se puede reparar actualizando tu hardware a la especificación recomendada.

### ¿Mi validador está en línea?

Ningún nodo se puede conectar con un nodo que esté fuera de línea (participante o no participante). Un nodo fuera de línea se puede reparar reiniciándolo o abriendo su puerto de par (9651) al tráfico entrante.

### ¿Mi validador es accesible?

Se considera que un nodo es inaccesible si otro nodo no puede conectarse a él en su ip:port anunciado, pero el nodo todavía intenta conectarse a otros nodos (a diferencia del modo fuera de línea). Un nodo inaccesible se puede reparar abriendo el puerto 9651 (puerto de par) para las conexiones entrantes.

### Peso de tu nodo

El peso es la suma de todas las participaciones y las participaciones delegadas (en AVAX).

### Tiempo de disponibilidad de respuesta (%)

Una gráfica que muestra la disposición de respuesta del nodo durante dos semanas.

### Versión del nodo

Muestra cuál versión de Avalanchego está usando el nodo.

### Disponibilidad para responder histórica

Una gráfica que muestra la disponibilidad de respuesta del nodo durante dos semanas.

### Cantidad de participación

Cantidad de las participaciones de tu nodo (en AVAX).

### Comisión de la delegación (%)

Puedes aprender más sobre esto desde [aquí](https://docs.avax.network/learn/platform-overview/staking#delegator-rewards)

### Delegadores

Muestra cuántos delegados tiene el nodo.

### Delegaciones

Muestra la cantidad de delegados que han hecho participaciones en tu nodo.

### Puesto en espera, fuera de línea e inaccesible (últimas 48 horas)

Esas son gráficas que muestran el estado de tu nodo: puesto en espera, fuera de línea o inaccesible.

## Actividad de la C-Chain

Puedes ver nuestras estadísticas de la C-Chain desde [aquí](https://stats.avax.network/dashboard/c-chain-activity/).

### TPS máximo observado (todo el tiempo, últimos siete días, últimos 30 minutos)

No pienses que este es el límite para Avalanche. Tuvimos más de 11 000 tps según las pruebas que hicimos en servidores de amazon ubicados en diferentes puntos alrededor del mundo.

### Tamaño del bloque (últimos 2000)

En esta gráfica puedes ver el tamaño (KB) de los últimos 2000 bloques.

### Conteo de Tx (últimas 2000)

En esta gráfica puedes ver cuántas transacciones hubo en los últimos 2000 bloques.

### Precio mínimo de gas (últimos 2000)

Precio mínimo de gas para los últimos 2000 bloques.

### Precio mínimo de gas (últimas ocho horas)

Precio mínimo de gas para las últimas ocho horas.

### Comisiones quemadas diarias

Muestra cuánto gas se quema cada día.

### Gas diario utilizado

Muestra cuánto gas se usa cada día.

### Conteo diario de Tx

Muestra cuántas transacciones se hicieron cada día.

### Conteo cumulativo de direcciones

Muestra cuántas direcciones hay desde el comienzo.

### Conteo cumulativo de bloques

Muestra cuántos bloques hay desde el comienzo.

### Conteo cumulativo de Tx

Muestra cuántas transacciones hay desde el comienzo.

### TPS máximas

Muestra el máximo de TPS por día.

### Promedio de TPS

Muestra el promedio de TPS por día.

### Cantidad de importaciones o exportaciones

Muestra cuántos AVAX fueron importados o exportados por día.

### Contratos de la C-Chain desplegados

Muestra cuántos contratos fueron desplegados por día.

### Contratos desplegados acumulados

Muestra la cantidad total de contratos por día.

### Direcciones activas mensuales

Muestra cuántas cuentas hicieron al menos una transacción por mes.

