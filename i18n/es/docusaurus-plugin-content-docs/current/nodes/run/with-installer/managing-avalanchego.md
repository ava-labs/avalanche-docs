---
etiquetas: [Nodos]
descripción: En este tutorial, aprenderás cómo gestionar tu nodo AvalancheGo.
sidebar_label: Gestión de AvalancheGo
sidebar_position: 2
---

# Gestión de AvalancheGo

## Detener y iniciar el nodo

Para detener AvalancheGo, ejecuta:

```bash
sudo systemctl stop avalanchego
```

Para iniciarlo nuevamente, ejecuta:

```bash
sudo systemctl start avalanchego
```

## Actualiza tu nodo

AvalancheGo es un proyecto en curso y hay actualizaciones regulares de versión. La mayoría de las actualizaciones son recomendadas pero no obligatorias. Se dará aviso previo para las actualizaciones que no sean compatibles con versiones anteriores. Cuando se lanza una nueva versión del nodo, notarás líneas de registro como estas:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 intentando conectarse con una versión más nueva avalanche/1.1.1. Es posible que desees actualizar tu cliente
```

Se recomienda siempre actualizar a la última versión, porque las nuevas versiones traen correcciones de errores, nuevas características y mejoras.

Para actualizar tu nodo, simplemente ejecuta el script de instalación nuevamente:

```bash
./avalanchego-installer.sh
```

Detectará que ya tienes AvalancheGo instalado:

```text
Instalador de AvalancheGo
---------------------
Preparando el entorno...
Se encontró una arquitectura Intel/AMD de 64 bits...
Se encontró el servicio systemd de AvalancheGo ya instalado, cambiando a modo de actualización.
Deteniendo el servicio...
```

Luego actualizará tu nodo a la última versión, y una vez que haya terminado, iniciará el nodo nuevamente y mostrará la información sobre la última versión:

```text
Nodo actualizado, iniciando el servicio...
Nueva versión del nodo:
avalanche/1.1.1 [red=mainnet, base de datos=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
¡Hecho!
```