---
etiquetas: [Nodos]
descripción: En este tutorial, aprenderás cómo preparar tu entorno para la instalación de AvalancheGo y configurar tus ajustes de red.
sidebar_label: Preparando tu Entorno
sidebar_position: 0
---

# Ejecutar un Nodo Avalanche Usando el Script de Instalación

Tenemos un script de shell (bash) que instala AvalancheGo en tu computadora. Este
script configura un nodo completo y en funcionamiento en cuestión de minutos con una entrada de usuario mínima
requerida. El script también se puede utilizar para instalaciones desatendidas y automatizadas.

## Requisitos del Sistema

Avalanche es un protocolo increíblemente liviano, por lo que los nodos pueden funcionar en hardware de consumo
con las siguientes especificaciones mínimas.

- CPU: Equivalente a 8 vCPU de AWS
- RAM: 16 GiB
- Almacenamiento: 1 TiB
- SO: Ubuntu 20.04 o MacOS >= 12
- Red: ancho de banda sostenido de 5Mbps de subida/bajada

:::caution

Usar un HDD puede resultar en latencias de lectura/escritura pobres y aleatorias,
lo que reduce el rendimiento y la confiabilidad.

:::

:::note

Los requisitos de hardware escalarán con la cantidad de AVAX en juego en
el nodo y/o la actividad de la red. Los nodos con grandes apuestas (100k+ AVAX) necesitarán
máquinas más potentes que las enumeradas, y también usarán más ancho de banda.

:::

Este script de instalación asume:

- AvalancheGo no está en funcionamiento y no está instalado como un servicio
- El usuario que ejecuta el script tiene privilegios de superusuario (puede ejecutar `sudo`)

## Consideraciones del Entorno

Si ejecutas una versión diferente de Linux, es posible que el script no funcione como se espera.
Supone que se utiliza `systemd` para ejecutar servicios del sistema. Otras versiones de Linux podrían
usar algo diferente, o podrían tener archivos en lugares diferentes a los asumidos por
el script. Probablemente funcionará en cualquier distribución que use `systemd` pero se
ha desarrollado y probado en Ubuntu.

Si ya tienes un nodo en funcionamiento en la computadora, detenlo antes de ejecutar el
script. El script no tocará el directorio de trabajo del nodo, por lo que no necesitarás
iniciar el nodo desde cero.

### Nodo en Ejecución desde la Terminal

Si tu nodo está en ejecución en una terminal, detenlo presionando `ctrl+C`.

### Nodo en Ejecución como un Servicio

Si tu nodo ya está en ejecución como un servicio, entonces probablemente no necesites este
script. Estás listo para continuar.

### Nodo en Ejecución en Segundo Plano

Si tu nodo está en ejecución en segundo plano (por ejemplo, ejecutándose con `nohup`)
entonces encuentra el proceso que ejecuta el nodo ejecutando `ps aux | grep avalanche`.
Esto producirá una salida como esta:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Busca la línea que no tenga `grep`. En este ejemplo, esa es la
segunda línea. Muestra información sobre tu nodo. Toma nota del ID de proceso, en este
caso, `2630`. Detén el nodo ejecutando `kill -2 2630`.

### Archivos de Trabajo del Nodo

Si anteriormente ejecutaste un nodo AvalancheGo en esta computadora, tendrás archivos de nodo locales
almacenados en el directorio `$HOME/.avalanchego`. Esos archivos no se verán afectados y el nodo configurado por el script continuará su operación con la misma identidad y estado que tenía antes. Dicho esto, para la seguridad de tu nodo, haz una copia de seguridad de los archivos `staker.crt` y `staker.key`, que se encuentran en
`$HOME/.avalanchego/staking`, y guárdalos en un lugar seguro. Puedes usar esos
archivos para recrear tu nodo en una computadora diferente si alguna vez es necesario. Consulta este [tutorial](/nodes/maintain/node-backup-and-restore.md) para obtener el procedimiento de copia de seguridad y restauración.

## Consideraciones de Red

Para funcionar correctamente, AvalancheGo necesita aceptar conexiones desde Internet
en el puerto de red `9651`. Antes de continuar con la instalación, necesitas
determinar el entorno de red en el que se ejecutará tu nodo.

### Ejecutándose en un Proveedor de Nube

Si tu nodo se está ejecutando en una instancia de computadora de un proveedor de nube, tendrá una
IP estática. Descubre cuál es esa IP estática, o configúrala si aún no lo has hecho.
El script intentará averiguar la IP por sí mismo, pero eso puede no funcionar en todos
los entornos, por lo que deberás verificar la IP o ingresarla tú mismo.

### Ejecutándose en una Conexión Doméstica

Si estás ejecutando un nodo en una computadora que está en una conexión de internet residencial,
tienes una IP dinámica; es decir, tu IP cambiará periódicamente. El script de instalación configurará el nodo adecuadamente para esa situación.
Pero, para una conexión doméstica, deberás configurar el reenvío de puertos de entrada del
puerto `9651` desde Internet hacia la computadora en la que se instala el nodo.

Dado que hay demasiados modelos y configuraciones de enrutadores, no podemos proporcionar
instrucciones sobre qué hacer exactamente, pero hay guías en línea que se pueden encontrar
(como
[esta](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/),
o [esta](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)
), y el soporte de tu proveedor de servicios también podría ayudar.

:::warning

Ten en cuenta que un nodo Avalanche completamente conectado mantiene y comunica
más de un par de miles de conexiones TCP en vivo. Para algunos enrutadores domésticos de baja potencia y
antiguos, eso podría ser demasiado para manejar. Si ese es el caso, es posible que
experimentes retrasos en otras computadoras conectadas al mismo enrutador, el nodo se
ralentiza, falla al sincronizar y problemas similares.

:::
