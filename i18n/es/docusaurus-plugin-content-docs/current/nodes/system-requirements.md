---
etiquetas: [Nodos]
descripción: Avalanche es un protocolo increíblemente ligero, por lo que los nodos pueden funcionar en hardware de consumo. Ten en cuenta que a medida que aumenta el uso de la red, los requisitos de hardware pueden cambiar.
sidebar_label: Requisitos del sistema
pagination_label: Requisitos del sistema para ejecutar un nodo Avalanche
---

# Requisitos del sistema para ejecutar un nodo Avalanche

## Hardware y sistemas operativos

Avalanche es un protocolo increíblemente ligero, por lo que los nodos pueden funcionar en hardware de consumo. Ten en cuenta que a medida que aumenta el uso de la red, los requisitos de hardware pueden cambiar.

- CPU: Equivalente a 8 vCPU de AWS
- RAM: 16 GiB
- Almacenamiento: 1 TiB SSD
- SO: Ubuntu 20.04 o MacOS >= 12

:::precaución

Los nodos que eligen usar un HDD pueden tener latencias de lectura/escritura pobres y aleatorias, lo que reduce el rendimiento y la confiabilidad. Se recomienda encarecidamente un SSD.

:::

## Redes

Para funcionar correctamente, AvalancheGo necesita aceptar conexiones desde Internet en el puerto de red `9651`. Antes de continuar con la instalación, debes determinar el entorno de red en el que se ejecutará tu nodo.

### Ejecución en un proveedor de nube

Si tu nodo se está ejecutando en una instancia de computadora de un proveedor de nube, tendrá una IP estática. Descubre cuál es esa IP estática o configúrala si aún no lo has hecho.

### Ejecución en una conexión residencial

Si estás ejecutando un nodo en una computadora que está en una conexión de internet residencial, tienes una IP dinámica; es decir, tu IP cambiará periódicamente. Deberás configurar el reenvío de puertos de entrada del puerto `9651` desde Internet hacia la computadora en la que se instala el nodo.

Dado que hay demasiados modelos y configuraciones de enrutadores, no podemos proporcionar instrucciones sobre qué hacer exactamente, pero hay guías en línea que se pueden encontrar (como [esta](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), o [esta](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)), y el soporte de tu proveedor de servicios también podría ayudar.

:::advertencia

Un nodo Avalanche completamente conectado mantiene y comunica más de un par de miles de conexiones TCP en vivo. Para algunos enrutadores residenciales de baja potencia y más antiguos, eso puede ser demasiado para manejar. Si ese es el caso, es posible que experimentes retrasos en otras computadoras conectadas al mismo enrutador, que el nodo se quede en espera, falle al sincronizar y problemas similares.

:::