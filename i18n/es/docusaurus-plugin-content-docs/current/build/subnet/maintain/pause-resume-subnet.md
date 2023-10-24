---
tags: [Construir, Subnets]
description: Pausar y reanudar de manera elegante una Subnet  local mientras se preserva el estado.
sidebar_label: Pausar y Reanudar
pagination_label: Pausar y Reanudar Subnets Locales
sidebar_position: 1
---

# Cómo Pausar y Reanudar Subnets Locales

Si has desplegado una Subnet localmente, puedes preservar y restaurar el estado de tus Subnets desplegadas.

## Detener la Red Local

Para detener de manera elegante una red local en ejecución mientras se preserva el estado, ejecuta

```shell
avalanche network stop
```

Cuando se reinicie, todas tus Subnets desplegadas se reanudarán desde donde quedaron.

```text
> avalanche network stop
Red detenida exitosamente.
```

### Reanudar la Red Local

Para reanudar una red detenida, ejecuta

```shell
avalanche network start
```

La red se reanuda con el mismo estado con el que se pausó.

<!-- markdownlint-disable MD013 -->

```text
> avalanche network start
Iniciando instantánea previamente desplegada y detenida
Iniciando Red. Espera hasta que esté saludable...
...............
Red lista para usar. Puntos finales del nodo de red local:
+-------+----------+------------------------------------------------------------------------------------+
| NODO  |    VM    |                                        URL                                         |
+-------+----------+------------------------------------------------------------------------------------+
| nodo5 | miSubnet | http://127.0.0.1:9658/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo1 | miSubnet | http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo2 | miSubnet | http://127.0.0.1:9652/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo3 | miSubnet | http://127.0.0.1:9654/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo4 | miSubnet | http://127.0.0.1:9656/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
```

<!-- markdownlint-enable MD013 -->

## Verificar el Estado de la Red

Si deseas determinar si una red Avalanche local está en ejecución en tu máquina, ejecuta

```shell
avalanche network status
```

### Ejemplo de Llamada

Si la red local está en ejecución, el comando imprime algo como

```text
Solicitando estado de la red...
Red está activa. Información de la red:
==================================================================================================
Saludable: true
VMs personalizadas saludables: true
Número de nodos: 5
Número de VMs personalizadas: 1
======================================== Información del Nodo ========================================
nodo5 tiene ID NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5 y punto final http://127.0.0.1:9658:
nodo1 tiene ID NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg y punto final http://127.0.0.1:9650:
nodo2 tiene ID NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ y punto final http://127.0.0.1:9652:
nodo3 tiene ID NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN y punto final http://127.0.0.1:9654:
nodo4 tiene ID NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu y punto final http://127.0.0.1:9656:
==================================== Información de la VM Personalizada =======================================
Punto final en nodo4 para blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9656/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Punto final en nodo5 para blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9658/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Punto final en nodo1 para blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Punto final en nodo2 para blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9652/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Punto final en nodo3 para blockchain "SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz": http://127.0.0.1:9654/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
```

Si la red no está en ejecución, en cambio, el comando imprime

```text
Solicitando estado de la red...
No hay una red local en ejecución
```

o

```text
Solicitando estado de la red...
Error: tiempo de espera agotado al intentar contactar al controlador de backend, probablemente no está en ejecución
```
