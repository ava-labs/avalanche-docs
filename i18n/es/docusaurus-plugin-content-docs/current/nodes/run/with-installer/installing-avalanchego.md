---
tags: [Nodos]
description: En este tutorial, aprenderás cómo descargar e instalar AvalancheGo utilizando el script de instalación.
sidebar_label: Instalando AvalancheGo
sidebar_position: 1
---

# Instalando AvalancheGo Usando el Script

## Ejecutando el Script

Ahora que has preparado tu sistema y tienes la información lista, vamos a hacerlo.

Para descargar y ejecutar el script, ingresa lo siguiente en la terminal:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

¡Y comenzamos! La salida debería verse algo así:

<details>
<summary><b>Haz clic para ver la salida en la Terminal</b></summary>

```text
Instalador de AvalancheGo
---------------------
Preparando el entorno...
Se encontró arquitectura arm64...
Buscando la última versión para arm64...
Se intentará descargar:
 https://github.com/ava-labs/avalanchego/releases/download/v1.1.1/avalanchego-linux-arm64-v1.1.1.tar.gz
avalanchego-linux-arm64-v1.1.1.tar.gz 100%[=========================================================================>]  29.83M  75.8MB/s    in 0.4s
2020-12-28 14:57:47 URL:https://github-production-release-asset-2e65be.s3.amazonaws.com/246387644/f4d27b00-4161-11eb-8fb2-156a992fd2c8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201228%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201228T145747Z&X-Amz-Expires=300&X-Amz-Signature=ea838877f39ae940a37a076137c4c2689494c7e683cb95a5a4714c062e6ba018&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=246387644&response-content-disposition=attachment%3B%20filename%3Davalanchego-linux-arm64-v1.1.1.tar.gz&response-content-type=application%2Foctet-stream [31283052/31283052] -> "avalanchego-linux-arm64-v1.1.1.tar.gz" [1]
Desempaquetando archivos del nodo...
avalanchego-v1.1.1/plugins/
avalanchego-v1.1.1/plugins/evm
avalanchego-v1.1.1/avalanchego
Archivos del nodo desempaquetados en /home/ubuntu/avalanche-node
```

</details>

Luego, el script te pedirá información sobre el entorno de red:

```text
Para completar la configuración, se necesita información de red.
¿Dónde está instalado el nodo:
1) red residencial (IP dinámica)
2) proveedor de nube (IP estática)
Ingresa el tipo de conexión [1,2]:
```

ingresa `1` si tienes una IP dinámica y `2` si tienes una IP estática. Si estás en
una IP estática, intentará detectar automáticamente la IP y pedirá confirmación.

```text
Se detectó '3.15.152.14' como tu IP pública. ¿Es esto correcto? [s,n]:
```

Confirma con `s`, o `n` si la IP detectada es incorrecta (o está vacía), y luego ingresa
la IP correcta en el siguiente prompt.

Luego, debes configurar el acceso al puerto RPC para tu nodo. Estos se utilizan para consultar
el estado interno del nodo, enviar comandos al nodo o interactuar
con la plataforma y sus cadenas (enviar transacciones, por ejemplo). Se te
pedirá:

```text
¿El puerto RPC debe ser público (este es un nodo de API pública) o privado (este es un validador)? [público, privado]:
```

- `privado`: esta configuración solo permite solicitudes RPC desde la máquina del nodo.
- `público`: esta configuración expone el puerto RPC a todas las interfaces de red.

Como esta es una configuración sensible, se te pedirá que confirmes si eliges
`público`. Lee atentamente la siguiente nota:

:::note

Si eliges permitir solicitudes RPC en cualquier interfaz de red, deberás
configurar un firewall para permitir solo las solicitudes RPC desde direcciones IP conocidas,
¡de lo contrario, tu nodo será accesible para cualquiera y podría ser abrumado por
llamadas RPC de actores malintencionados! Si no planeas usar tu nodo para enviar
llamadas RPC de forma remota, ingresa `privado`.

:::

Luego, el script te pedirá que elijas si habilitar o no la configuración de sincronización de estado:

```text
¿Quieres que la sincronización de estado esté activada o desactivada? [activada, desactivada]:
```

Activar la sincronización de estado aumentará en gran medida la velocidad de arranque,
pero sincronizará solo el estado de red actual. Si tienes la intención de usar tu nodo para
acceder a datos históricos (nodo de archivo), debes seleccionar `desactivada`. De lo contrario,
selecciona `activada`. Los validadores pueden arrancar con la sincronización de estado activada.

Luego, el script continuará con la creación del servicio del sistema y finalizará
con el inicio del servicio.

<details>
<summary><b>Haz clic para ver la salida final</b></summary>

```text
Se creó el enlace simbólico /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

¡Listo!

Tu nodo ahora debería estar en proceso de arranque.
El archivo de configuración del nodo es /home/ubuntu/.avalanchego/configs/node.json
El archivo de configuración de la cadena C es /home/ubuntu/.avalanchego/configs/chains/C/config.json
El directorio de complementos, para almacenar binarios de VM de subred, es /home/ubuntu/.avalanchego/plugins
Para verificar que el servicio esté en ejecución, usa el siguiente comando (q para salir):
sudo systemctl status avalanchego
Para seguir el registro, usa (ctrl-c para detener):
sudo journalctl -u avalanchego -f

Encuéntranos en https://chat.avax.network si tienes problemas.
```

</details>

El script ha terminado y deberías ver el indicador del sistema nuevamente.

## Post Instalación

AvalancheGo debería estar ejecutándose en segundo plano como un servicio. Puedes verificar que esté en ejecución con:

```bash
sudo systemctl status avalanchego
```

A continuación, se muestra un ejemplo de cómo deberían verse los últimos registros del nodo:

<details>
<summary><b>Haz clic para expandir y ver los registros</b></summary>

```text
● avalanchego.service - Servicio de systemd de AvalancheGo
Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2021-01-05 10:38:21 UTC; 51s ago
Main PID: 2142 (avalanchego)
Tasks: 8 (limit: 4495)
Memory: 223.0M
CGroup: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --public-ip-resolution-service=opendns --http-host=



05 de enero 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/vms/platformvm/vm.go#322: inicializando el último bloque aceptado como 2FUFPVPxbTpKNn39moGSzsmGroYES4NZRdw3mJgNvMkMiMHJ9e
05 de enero 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/snow/engine/snowman/transitive.go#58: inicializando el motor de consenso
05 de enero 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#143: agregando ruta /ext/bc/11111111111111111111111111111111LpoYY
05 de enero 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#88: servidor de API HTTP escuchando en ":9650"
05 de enero 10:38:58 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:58] <P Chain> avalanchego/snow/engine/common/bootstrapper.go#185: el arranque de la sincronización ha comenzado con 1 vértice en la frontera aceptada
05 de enero 10:39:02 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:02] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 2500 bloques
05 de enero 10:39:04 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:04] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 5000 bloques
05 de enero 10:39:06 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:06] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 7500 bloques
05 de enero 10:39:09 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:09] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 10000 bloques
05 de enero 10:39:11 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:11] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 12500 bloques