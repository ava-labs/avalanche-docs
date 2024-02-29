---
tags: [Nodos]
description: Este tutorial te guiará en la configuración de un nodo Avalanche en Amazon Web Services (AWS). Los servicios en la nube como AWS son una buena manera de asegurar que tu nodo sea altamente seguro, disponible y accesible.
sidebar_label: Amazon Web Services
pagination_label: Ejecutar un Nodo Avalanche con Amazon Web Services
sidebar_position: 0
---

# Ejecutar un Nodo Avalanche con Amazon Web Services (AWS)

## Introducción

Este tutorial te guiará en la configuración de un nodo Avalanche en [Amazon Web
Services (AWS)](https://aws.amazon.com/). Los servicios en la nube como AWS son una buena manera
de asegurar que tu nodo sea altamente seguro, disponible y accesible.

Para empezar, necesitarás:

- Una cuenta de AWS
- Una terminal desde la cual hacer SSH a tu máquina de AWS
- Un lugar para almacenar y hacer copias de seguridad de archivos de manera segura

Este tutorial asume que tu máquina local tiene una terminal de estilo Unix. Si estás en
Windows, tendrás que adaptar algunos de los comandos utilizados aquí.

## Iniciar sesión en AWS

Registrarse en AWS está fuera del alcance de este artículo, pero Amazon tiene instrucciones [aquí](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account).

Es _altamente_ recomendable que configures la Autenticación de Múltiples Factores en tu
cuenta de usuario raíz de AWS para protegerla. Amazon tiene documentación para esto
[aquí](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root).

Una vez que tu cuenta esté configurada, debes crear una nueva instancia EC2. Una EC2 es una
instancia de máquina virtual en la nube de AWS. Ve al [AWS Management
Console](https://console.aws.amazon.com/) e ingresa al panel de control de EC2.

![AWS Management Console.png](</img/image(35).png>)

Para iniciar sesión en la instancia EC2, necesitarás una llave en tu máquina local que
conceda acceso a la instancia. Primero, crea esa llave para que luego pueda ser asignada
a la instancia EC2. En la barra lateral izquierda, debajo de **Red y seguridad**, selecciona **Pares de claves.**

![Selecciona "Pares de claves" debajo del desplegable "Red y seguridad".](</img/image(38).png>)

Selecciona **Crear par de claves** para lanzar el asistente de creación de pares de claves.

![Selecciona "Crear par de claves."](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

Nombra tu llave `avalanche`. Si tu máquina local tiene MacOS o Linux, selecciona el
formato de archivo `pem`. Si es Windows, usa el formato de archivo `ppk`. Opcionalmente, puedes
agregar etiquetas para el par de claves para ayudar con el seguimiento.

![Crea un par de claves que luego se asignará a tu instancia EC2.](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

Haz clic en `Crear par de claves`. Deberías ver un mensaje de éxito y el archivo de la llave
debería descargarse a tu máquina local. Sin este archivo, no podrás
acceder a tu instancia EC2. **Haz una copia de este archivo y colócalo en un
medio de almacenamiento separado, como un disco duro externo. Mantén este archivo en secreto;
no lo compartas con otros.**

![Mensaje de éxito después de crear un par de claves.](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Crear un Grupo de Seguridad

Un Grupo de Seguridad de AWS define qué tráfico de internet puede entrar y salir de tu instancia EC2.
Piensa en ello como un cortafuegos. Crea un nuevo Grupo de Seguridad seleccionando
**Grupos de seguridad** bajo el desplegable **Red y seguridad**.

![Selecciona "Grupos de seguridad" debajo de "Red y seguridad".](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Esto abre el panel de Grupos de Seguridad. Haz clic en **Crear grupo de seguridad** en la parte superior
derecha del panel de Grupos de Seguridad.

![Selecciona "Crear grupo de seguridad."](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Necesitarás especificar qué tráfico entrante se permite. Permite el tráfico SSH desde
tu dirección IP para que puedas iniciar sesión en tu instancia EC2 (cada vez que tu ISP
cambia tu dirección IP, deberás modificar esta regla). Permite tráfico TCP en
el puerto 9651 para que tu nodo pueda comunicarse con otros nodos en la red. Permite tráfico TCP
en el puerto 9650 desde tu IP para que puedas hacer llamadas de API a tu nodo.
**Es importante que solo permitas tráfico en el puerto SSH y de la API desde tu IP.**
Si permites tráfico entrante desde cualquier lugar, esto podría usarse para forzar la entrada a tu
nodo (puerto SSH) o como un vector de ataque de denegación de servicio (puerto de la API). Finalmente, permite todo el
tráfico saliente.

![Tus reglas de tráfico entrante y saliente deberían verse así.](/img/inbound-rules.png)

Agrega una etiqueta al nuevo grupo de seguridad con la clave `Name` y el valor `Grupo de Seguridad Avalanche`.
Esto nos permitirá saber qué grupo de seguridad es cuando lo veamos
en la lista de grupos de seguridad.

![Etiqueta el grupo de seguridad para que puedas identificarlo más tarde.](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

Haz clic en `Crear grupo de seguridad`. Deberías ver el nuevo grupo de seguridad en la lista de grupos de seguridad.

## Lanzar una Instancia EC2

Ahora estás listo para lanzar una instancia EC2. Ve al Panel de Control de EC2 y selecciona **Lanzar instancia**.

![Selecciona "Lanzar instancia."](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

Selecciona **Ubuntu 20.04 LTS (HVM), Tipo de Volumen SSD** para el sistema operativo.

![Selecciona Ubuntu 20.04 LTS.](/img/Ubuntu-20.04-LTS.png)

A continuación, elige tu tipo de instancia. Esto define las especificaciones de hardware de la
instancia en la nube. En este tutorial configuramos una **c5.2xlarge**. Esto debería ser más
que suficientemente poderoso ya que Avalanche es un protocolo de consenso liviano. Para
crear una instancia c5.2xlarge, selecciona la opción **Optimizado para cómputo** del
menú desplegable de filtros.

![Filtra por optimizado para cómputo.](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

Selecciona la casilla junto a la instancia c5.2xlarge en la tabla.

![Selecciona c5.2xlarge.](/img/c5-2xlarge.png)

Haz clic en el botón **Siguiente: Configurar detalles de la instancia** en la esquina inferior derecha.

![Configurar detalles de la instancia](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

Los detalles de la instancia pueden mantenerse en sus valores predeterminados.

:::info

Al configurar un nodo como validador, es crucial seleccionar el tipo de instancia AWS apropiado para asegurar que el nodo pueda procesar transacciones de manera eficiente y manejar la carga de la red. Los tipos de instancia recomendados son los siguientes:

- Para una participación mínima, comience con una instancia optimizada para cómputo como c6, c6i, c6a, c7 y similares.
- Utilice un tamaño de instancia 2xlarge para la configuración con participación mínima.
- A medida que aumenta la cantidad apostada, elija tamaños de instancia más grandes para acomodar la carga de trabajo adicional. Por cada orden de magnitud de aumento en la participación, suba un tamaño de instancia. Por ejemplo, para una participación de 20k AVAX, una instancia 4xlarge es adecuada.

:::

### Opcional: Usar Instancias Reservadas

De forma predeterminada, se te cobrará por hora por ejecutar tu instancia EC2. Para un uso a largo
plazo, eso no es óptimo.

Podrías ahorrar dinero usando una **Instancia Reservada**. Con una instancia reservada,
pagas por adelantado un año completo de uso de EC2 y recibes una tarifa más baja por hora
a cambio de bloquearlo. Si tienes la intención de ejecutar un nodo durante mucho tiempo y
no quieres arriesgar interrupciones del servicio, esta es una buena opción para ahorrar dinero.
Nuevamente, investiga por tu cuenta antes de seleccionar esta opción.

### Agregar Almacenamiento, Etiquetas, Grupo de Seguridad

Haz clic en el botón **Siguiente: Agregar almacenamiento** en la esquina inferior derecha de la pantalla.

Necesitas agregar espacio al disco de tu instancia. Deberías comenzar con al menos
700GB de espacio en disco. Aunque las actualizaciones para reducir el uso de disco están siempre en
desarrollo, en promedio la base de datos crecerá continuamente, por lo que necesitas
monitorear constantemente el uso de disco en el nodo e incrementar el espacio en disco si es necesario.

Ten en cuenta que la imagen a continuación muestra 100GB como tamaño de disco, lo cual era apropiado en ese momento
en que se tomó la captura de pantalla. Debes verificar el [tamaño actual recomendado de espacio en disco](https://github.com/ava-labs/avalanchego#installation) antes de
ingresar el valor real aquí.

![Selecciona el tamaño del disco.](/img/add-storage.png)

Haz clic en **Siguiente: Agregar etiquetas** en la esquina inferior derecha de la pantalla para agregar etiquetas a la instancia. Las etiquetas nos permiten asociar metadatos con nuestra instancia. Agrega una etiqueta con clave `Name` y valor `Mi Nodo Avalanche`. Esto hará claro qué es esta instancia en tu lista de instancias de EC2.

![Agrega una etiqueta con clave "Name" y valor "Mi Nodo Avalanche".](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Ahora asigna el grupo de seguridad creado anteriormente a la instancia. Elige **Seleccionar un grupo de seguridad existente** y elige el grupo de seguridad creado anteriormente.

![Elige el grupo de seguridad creado anteriormente.](/img/configure-security-group.png)

Finalmente, haz clic en **Revisar y lanzar** en la esquina inferior derecha. Una página de revisión mostrará los detalles de la instancia que estás a punto de lanzar. Revísalos y, si todo parece correcto, haz clic en el botón azul **Lanzar** en la esquina inferior derecha de la pantalla.

Se te pedirá que selecciones un par de claves para esta instancia. Selecciona **Elegir un par de claves existente** y luego selecciona el par de claves `avalanche` que hiciste anteriormente en el tutorial. Marca la casilla reconociendo que tienes acceso al archivo `.pem` o `.ppk` creado anteriormente (¡asegúrate de haberlo respaldado!) y luego haz clic en **Lanzar instancias**.

![Usa el par de claves creado anteriormente.](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

¡Deberías ver una nueva ventana emergente que confirma que la instancia se está lanzando!

![¡Tu instancia se está lanzando!](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Asignar una IP Elástica

Por defecto, tu instancia no tendrá una IP fija. Vamos a darle una IP fija a través del servicio de IP Elástica de AWS. Vuelve al panel de control de EC2. Bajo **Red y seguridad**, selecciona **IPs Elásticas**.

![Selecciona "IPs Elásticas" bajo "Red y seguridad".](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

Selecciona **Asignar dirección IP elástica**.

![Selecciona "Asignar dirección IP elástica".](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Selecciona la región en la que se está ejecutando tu instancia y elige usar el pool de direcciones IPv4 de Amazon. Haz clic en **Asignar**.

![Configuración para la IP Elástica.](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Selecciona la IP Elástica que acabas de crear en el administrador de IP Elásticas. Desde el menú desplegable **Acciones**, elige **Asociar dirección IP elástica**.

![Bajo "Acciones" selecciona "Asociar dirección IP elástica".](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Selecciona la instancia que acabas de crear. Esto asociará la nueva IP Elástica con la instancia y le dará una dirección IP pública que no cambiará.

![Asigna la IP Elástica a tu instancia de EC2.](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## Configurar AvalancheGo

Vuelve al panel de control de EC2 y selecciona `Instancias en ejecución`.

![Ve a tus instancias en ejecución.](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Selecciona la instancia de EC2 recién creada. Esto abre un panel de detalles con información sobre la instancia.

![Detalles sobre tu nueva instancia.](/img/ec2-description.png)

Copia el campo `IPv4 Public IP` para usarlo más adelante. A partir de ahora llamaremos a este valor `PUBLICIP`.

**Recuerda: los comandos de terminal a continuación asumen que estás ejecutando Linux. Los comandos pueden ser diferentes para MacOS u otros sistemas operativos. Al copiar y pegar un comando desde un bloque de código, copia y pega la totalidad del texto en el bloque.**

Inicia sesión en la instancia de AWS desde tu máquina local. Abre una terminal (prueba el atajo `CTRL + ALT + T`) y navega al directorio que contiene el archivo `.pem` que descargaste anteriormente.

Mueve el archivo `.pem` a `$HOME/.ssh` (donde generalmente residen los archivos `.pem`) con:

```bash
mv avalanche.pem ~/.ssh
```

Agrégalo al agente SSH para que podamos usarlo para SSH en tu instancia de EC2, y márcalo como de solo lectura.

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

Haz SSH a la instancia. (Recuerda reemplazar `PUBLICIP` con el campo de IP pública de antes.)

```text
ssh ubuntu@PUBLICIP
```

Si los permisos **no** están configurados correctamente, verás el siguiente error.

![Asegúrate de configurar los permisos correctamente.](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

Ahora estás conectado a la instancia de EC2.

![Estás en la instancia de EC2.](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Si aún no lo has hecho, actualiza la instancia para asegurarte de que tenga el sistema operativo y las actualizaciones de seguridad más recientes:

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

Esto también reinicia la instancia. Espera 5 minutos, luego inicia sesión nuevamente ejecutando este comando en tu máquina local:

```bash
ssh ubuntu@PUBLICIP
```

Estás conectado nuevamente a la instancia de EC2. Ahora necesitaremos configurar nuestro nodo Avalanche. Para hacer esto, sigue el tutorial [Configurar un Nodo Avalanche con el Instalador](/nodes/run/with-installer/installing-avalanchego.md) que automatiza el proceso de instalación. Necesitarás la `PUBLICIP` que configuramos antes.

Tu nodo AvalancheGo debería estar funcionando ahora y en proceso de arranque, lo cual puede llevar algunas horas. Para verificar si ha terminado, puedes hacer una llamada de API usando `curl`. Si estás haciendo la solicitud desde la instancia de EC2, la solicitud es:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Una vez que el nodo haya terminado de arrancar, la respuesta será:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Puedes continuar, incluso si AvalancheGo no ha terminado de arrancar.

Para hacer que tu nodo sea un validador, necesitarás su ID de nodo. Para obtenerlo, ejecuta:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta contiene el ID de nodo.

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

En el ejemplo anterior, el ID del nodo es `NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`.
Copia tu ID de nodo para más adelante. Tu ID de nodo no es un secreto, así que puedes simplemente pegarlo en un editor de texto.

AvalancheGo tiene otras APIs, como la [API de Salud](/reference/avalanchego/health-api.md), que se pueden usar para interactuar con el nodo. Algunas APIs están deshabilitadas de forma predeterminada. Para habilitar estas APIs, modifica la sección ExecStart de `/etc/systemd/system/avalanchego.service` (creado durante el proceso de instalación) para incluir banderas que habiliten estos puntos finales. No habilites manualmente ninguna API a menos que tengas una razón para hacerlo.

![Algunas APIs están deshabilitadas de forma predeterminada.](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

Haz una copia de seguridad de la clave de staking y el certificado del nodo en caso de que la instancia de EC2 se corrompa o no esté disponible. El ID del nodo se deriva de su clave de staking y certificado. Si pierdes tu clave de staking o certificado, entonces tu nodo obtendrá un nuevo ID de nodo, lo que podría hacer que seas inelegible para una recompensa de staking si tu nodo es un validador. **Se recomienda encarecidamente que copies la clave de staking y el certificado de tu nodo**. La primera vez que ejecutas un nodo, generará un nuevo par de clave/certificado de staking y los almacenará en el directorio `/home/ubuntu/.avalanchego/staking`.

Sal de la instancia de SSH ejecutando:

```bash
exit
```

Ahora ya no estás conectado a la instancia de EC2; estás de vuelta en tu máquina local.

Para copiar la clave de staking y el certificado a tu máquina, ejecuta el siguiente comando. Como siempre, reemplaza `PUBLICIP`.

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

Ahora tu clave de staking y certificado están en el directorio `~/aws_avalanche_backup`. **El contenido de este directorio es secreto**. Deberías guardar este directorio en un almacenamiento no conectado a internet (como un disco duro externo).

### Actualizando tu Nodo

AvalancheGo es un proyecto en curso y hay actualizaciones regulares de versión. La mayoría de las actualizaciones son recomendadas pero no requeridas. Se dará aviso previo para las actualizaciones que no sean compatibles con versiones anteriores. Para actualizar tu nodo a la última versión, SSH en tu instancia de AWS como antes y ejecuta el script de instalación nuevamente.

```text
./avalanchego-installer.sh
```

Tu máquina ahora está ejecutando la versión más nueva de AvalancheGo. Para ver el estado del servicio AvalancheGo, ejecuta `sudo systemctl status avalanchego.`

## Aumentar el Tamaño del Volumen

Si necesitas aumentar el tamaño del volumen, sigue estas instrucciones de AWS:

- [Solicitar modificaciones a tus volúmenes EBS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/requesting-ebs-volume-modifications.html)
- [Extender un sistema de archivos Linux después de redimensionar un volumen](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html)

## Conclusión

¡Eso es todo! Ahora tienes un nodo AvalancheGo ejecutándose en una instancia AWS EC2. Recomendamos configurar [monitoreo de nodo](/nodes/maintain/setting-up-node-monitoring.md) para tu nodo AvalancheGo. También recomendamos configurar alertas de facturación de AWS para que no te lleves sorpresas cuando llegue la factura. Si tienes comentarios sobre este tutorial, o cualquier otra cosa, envíanos un mensaje en [Discord](https://chat.avalabs.org).
