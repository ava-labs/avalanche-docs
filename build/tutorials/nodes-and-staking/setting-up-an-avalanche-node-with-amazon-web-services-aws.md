# Ejecuta un Nodo de Avalanche con los Servicios Web de Amazon \(AWS\)

## Introducción

Este tutorial te guiará a través de la creación de un nodo de Avalanche en [los servicios web de Amazon \(AWS \)](https://aws.amazon.com/). Los cloud services como AWS son una buena manera de garantizar que su nodo sea altamente seguro, disponible y accesible.

Para empezar, necesitarás:

* Una cuenta de AWS
* Un terminal para SSH en su máquina AWS
* Un lugar para almacenar de forma segura y reespaldar sus archivos

Este tutorial asume que su máquina local tiene un terminal de estilo Unix. Si estás en Windows, tendrás que adaptar algunos de los comandos utilizados aquí.

## Inicia sesión en AWS<a id="ff31"></a>

La suscripción para AWS está fuera del alcance de este artículo, pero Amazon tiene instrucciones [aquí](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account).

Es _altamente _recomendable que configures la autenticación de múltiples factores en tu cuenta de usuario de AWS root para protegerla. Amazon tiene documentación para esto [aquí](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root).

Una vez que tu cuenta esté configurada, deberías crear una nueva instancia EC2. Un EC2 es una instancia de máquina virtual en la nube de AWS. Ve a la [consola de gestión de AWS](https://console.aws.amazon.com/) e introduce el tablero de control EC2.

![Administración de AWS Console.png](../../../.gitbook/assets/image%20%2835%29.png)

Para acceder a la instancia EC2, necesitarás una llave en tu máquina local que te permita acceder a la instancia. Primero, crea esa clave para que pueda ser asignada a la instancia EC2 más adelante. En la barra del lado izquierdo, bajo la **red y la **seguridad, selecciona Pares **clave.**

![Selecciona &quot;Key clave y quot; bajo el &quot;Network &amp; Seguridad y cita previa;](../../../.gitbook/assets/image%20%2838%29.png)

Selecciona **Crea un par de clave para lanzar el asistente de creación **de pares de clave.

![Selecciona &quot;Create un par de key](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

`avalanche`Nombre tu clave Si tu máquina local tiene MacOS o Linux, selecciona el formato de `pem`archivo. Si es Windows, usa el formato de `ppk`archivo. Opcionalmente, puedes agregar etiquetas a el key pair para ayudar con el seguimiento.

![Crea un par de clave que más tarde se asignará a tu instancia de EC2.](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

Haz clic `Create key pair`. Deberías ver un mensaje de éxito, y el archivo de claves debería ser descargado a su máquina local. Sin este archivo, no podrás acceder a tu instancia de EC2.** Haz una copia de este archivo y ponlo en un medio de almacenamiento separado, como un disco duro externo. Mantén este archivo secreto; no lo compartas con otros.**

![Mensaje de éxito después de crear un par de clave.](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Crea un grupo de seguridad<a id="f8df"></a>

Un Grupo de Seguridad AWS define qué tráfico de Internet puede entrar y salir de su instancia EC2. Piensa en ello como un firewall. **Crea un nuevo grupo de seguridad seleccionando grupos de seguridad **bajo el menú desplegable de **Red y **Seguridad.

![Selecciona &quot;Security de &quot;Security debajo de &quot;Network &amp; Security.&quot;](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Esto abre el panel de Grupos de Seguridad. Haz clic en **Crear grupo de seguridad **en la parte superior derecha del panel de grupos de seguridad.

![Selecciona &quot; Crea un grupo de security](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Tendrás que especificar qué tráfico de entrada está permitido. Permite el tráfico SSH desde tu dirección IP para que puedas acceder a tu instancia EC2. \(Cada vez que tu ISP cambia tu dirección IP, necesitarás modificar esta regla. Si tu ISP cambia regularmente, puedes permitir el tráfico de SSH desde cualquier lugar para evitar tener que modificar esta regla frecuentemente.\) Permite el tráfico de TCP en el puerto 9651 para que tu nodo pueda comunicarse con otros nodos en la red. Permite el tráfico de TCP en el puerto 9650 de tu IP para que puedas hacer llamadas de API a tu nodo.** Es importante que solo permitas el tráfico en este puerto desde tu IP.** Si permites el tráfico entrante desde cualquier lugar, esto podría ser usado como un vector de ataque de denegación de servicio. Finalmente, permite todo el tráfico saliente.

![Tus reglas de entrada y de salida deberían parecer así.](../../../.gitbook/assets/inbound-rules.png)

Añade una etiqueta al nuevo grupo de seguridad con clave `Name`y valor.`Avalanche Security Group` Esto nos permitirá saber qué es este grupo de seguridad cuando lo veamos en la lista de grupos de seguridad.

![Etiqueta el grupo de seguridad para que puedas identificarlo más tarde.](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

Haz clic `Create security group`. Deberías ver el nuevo grupo de seguridad en la lista de grupos de seguridad.

## Inicia una instancia de EC2<a id="0682"></a>

Ahora estás listo para iniciar una instancia de EC2. Ve al panel de Dashboard de EC2 y selecciona la instancia de ****lanzamiento.

![Selecciona &quot;Launch &quot;Launch](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

Selecciona **Ubuntu 20.04 LTS \(HVM\), Tipo de volumen SSD **para el sistema operativo.

![Selecciona Ubuntu 20.04 LTS.](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

A continuación, elige el tipo de instancia. Esto define las especificaciones de hardware de la instancia en la nube. En este tutorial creamos un ****c5.large. Esto debería ser más que poderoso ya que Avalanche es un protocolo de consenso ligero. Para crear una instancia c5.large, selecciona la **opción optimizada de **Compute desde el menú desplegable de filtro

![Filtra por compute optimizado.](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

Selecciona la casilla de verificación junto a la instancia c5.large en la tabla.

![Selecciona c5.large.](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

**Haz clic en el **siguiente: Configurar los detalles de la instancia en la esquina de abajo de la derecha.

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

Los detalles de la instancia pueden permanecer como sus predeterminados.

### Opcional: usando instancias de Spot o instancias reservadas<a id="c99a"></a>

Por defecto, se te cobrará por hora por ejecutar tu instancia de EC2. Hay dos maneras en las que puedes pagar menos por tu EC2.

El primero es lanzar tu EC2 como una **instancia de **Spot Las Spot instances son instancias que no están garantizadas para estar siempre encendidas, pero que cuestan menos en promedio que las instancias persistentes. Las spot instances utilizan una estructura de precios de mercado de oferta y demanda. A medida que la demanda de instancias sube, el precio de una spot instance sube. Puedes establecer un precio máximo que estés dispuesto a pagar por la spot instance. Es posible que puedas ahorrar una cantidad significativa de dinero, con la salvedad de que tu instancia EC2 puede detenerse si el precio aumenta. Haz tu propia investigación antes de seleccionar esta opción para determinar si la frecuencia de interrupción a su precio máximo justifica el ahorro de costos. Si decides usar una instancia de spot y asegúrate de establecer el comportamiento de interrupción para ****Parar, no **Terminar **y comprobar la solicitud ****persistente.

La otra forma de ahorrar dinero es usando una instancia ****reservada. Con una reserved instance, pagas por adelantado un año entero de uso de EC2, y recibes una tarifa por hora más baja a cambio del bloqueo. Si tienes la intención de ejecutar un nodo por un largo tiempo y no quieres arriesgarte a interrupciones del servicio, esta es una buena opción para ahorrar dinero. Una vez más, haz tu propia investigación antes de seleccionar esta opción.

### Añadir almacenamiento, Etiquetas, Grupo de seguridad<a id="dbf5"></a>

Haz clic en el **siguiente: Añade el **botón de almacenamiento en la esquina inferior derecha de la pantalla.

Necesitas añadir espacio al disco de tu instancia. Usamos 100 GB en este ejemplo. La base de datos de Avalanche crecerá continuamente hasta que se implemente el pruning, por lo que es más seguro tener una mayor asignación de disco duro por ahora.

![Selecciona 100 GB para el tamaño de disco.](../../../.gitbook/assets/add-storage.png)

Haz clic en **Siguiente: Añade etiquetas **en la esquina inferior derecha de la pantalla para agregar etiquetas a la instancia. Las etiquetas nos permiten asociar metadatos con nuestra instancia. Añade una etiqueta con una clave `Name`y un valor .`My Avalanche Node` Esto aclarará que esta instancia está en su lista de instancias EC2.

![Añade una etiqueta con clave &quot;Name&quot; y valora &quot;Mi Avalanche Node.&quot;](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Ahora asigna el grupo de seguridad creado anteriormente a la instancia. Elige **Seleccionar un grupo de seguridad existente **y elige el grupo de seguridad creado antes.

![Elige el grupo de seguridad creado antes.](../../../.gitbook/assets/configure-security-group.png)

Finalmente, haz clic de **revisión e lanzamiento **en la parte inferior derecha. Una página de revisión mostrará los detalles de la instancia que estás a punto de iniciar. Repasa ésos, y si todo se ve bien, haz clic en el **botón de **lanzamiento azul en la esquina inferior derecha de la pantalla.

Se te pedirá que selecciones un key pair para esta instancia. **Selecciona Elige un par de claves existente **y luego selecciona el par de `avalanche`claves que hiciste anteriormente en el tutorial. Marque la casilla que reconoce que tienes acceso al archivo `.pem`o al `.ppk`archivo creado anteriormente \(asegúrate de que la has respaldado en una copia de seguridad!\) y luego haz clic en Instances de ****lanzamiento.

![Usa el par de clave creado antes.](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

¡Deberías ver un nuevo pop-up que confirma que la instancia se está iniciando!

![¡Tu instancia está lanzando!](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Asignar una IP elástica

Por defecto, tu instancia no tendrá una IP fija. Démosle una IP fija a través del servicio de IP Elástica de AWS. Vuelve al tablero del EC2. Bajo la **red y la seguridad, **selecciona IPs ****Elásticos.

![Selecciona &quot; IPs&quot; bajo &quot; en &quot;](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

Selecciona **Asignar la dirección IP **Elástica.

![Selecciona &quot;Allocate la dirección IP &quot;Allocate](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Selecciona la región en la que se ejecuta tu instancia y elige usar el conjunto de direcciones IPv4 de Amazon. Haz clic en ****Allocate.

![Configuración para la IP Elástica.](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Selecciona la IP Elástica que acabas de crear desde el Elastic IP manager. Desde el menú de inicio de ****acciones, elige la dirección IP Elástica ****Asociada.

![Bajo &quot;Actions&quot;, &quot;Actions&quot;, IP de &quot;Actions&quot;,](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Selecciona la instancia que acabas de crear. Esto asociará la nueva IP elástica con la instancia y le dará una dirección IP pública que no cambiará.

![Asignar la IP Elástica a tu instancia de EC2.](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## Up AvalancheGo<a id="829e"></a>

Vuelve al tablero de EC2 y selecciona `Running Instances`.

![Ve a tus instancias de ejecución.](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Selecciona la instancia de EC2 recién creada. Esto abre un panel de detalles con información sobre la instancia.

![Detalles sobre tu nueva instancia.](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

Copiar el `IPv4 Public IP`campo para usar más tarde. A partir de ahora llamamos este `PUBLICIP`valor.

**Recuerde: los comandos de terminal asumen que estás ejecutando Linux. Los comandos pueden ser diferentes para MacOS u otros sistemas operativos. Cuando copia-pega un comando desde un bloque de código, copie y pega la totalidad del texto en el bloque.**

Entra en la instancia AWS desde tu máquina local. Abre un terminal \(prueba de acceso `CTRL + ALT + T`directo\) y navega al directorio que contiene el `.pem`archivo que descargó antes.

Mueve el `.pem`archivo a `$HOME/.ssh`\(donde los `.pem`archivos generalmente viven\) con:

```bash
mv avalanche.pem ~/.ssh
```

Añádelo al agente de SSH para que podamos usarlo en tu instancia de EC2, y márcalo como read-only.

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

Haz SSH en la instancia. \(Recuerda reemplazar `PUBLICIP`con el campo IP público desde antes.\)

```text
ssh ubuntu@PUBLICIP
```

Si los permisos **no se **establecen correctamente, verás el siguiente error.

![Asegúrate de establecer los permisos correctamente.](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

Ahora estás conectado a la instancia EC2.

![You&apos;re en la instancia de EC2.](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Si aún no lo haz hecho, actualiza la instancia para asegurarte de que tiene el sistema operativo y las actualizaciones de seguridad más recientes:

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

Esto también reinicia la instancia. Espera 5 minutos, y luego vuelve a iniciar sesión ejecutando este comando en tu máquina local:

```bash
ssh ubuntu@PUBLICIP
```

Estás conectado a la instancia del EC2 de nuevo. Ahora necesitaremos configurar nuestro nodo de Avalanche. Para ello, sigue el [nodo de Avalanche con tutorial de Instalador](set-up-node-with-installer.md) que automatiza el proceso de instalación. Necesitarás el que `PUBLICIP`configuramos antes.

Tu nodo AvalancheGo debería estar funcionando y en proceso de arranque, lo que puede llevar unas horas. Para comprobar si se hace, puedes emitir una llamada de API usando `curl`. Si estás haciendo la solicitud desde la instancia EC2, la solicitud es:

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

Una vez que el nodo termine el arrranque, la respuesta será:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Puedes continuar, aunque AvalancheGo no haya terminado de hacer el arranque.

Para que tu nodo sea un validador, necesitarás su ID de nodo. Para conseguirlo, ejecuta:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta contiene el ID del nodo:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

En el ejemplo anterior el ID de nodo `NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM`es. Copia la ID de tu nodo para más tarde. El ID de tu nodo no es un secreto, así que puedes pegarlo en un editor de texto.

AvalancheGo tiene otras API, como la [API](../../avalanchego-apis/health-api.md) de Salud, que pueden ser utilizadas para interactuar con el nodo. Algunas API se están desactivando de forma predeterminada. Para permitir estas API, modifican la sección de ExecStart `/etc/systemd/system/avalanchego.service`\(creada durante el proceso de instalación\) para incluir banderas que permiten estos puntos. No habilites manualmente ninguna API a menos que tengas una razón para hacerlo.

![Algunas API se están desactivando de forma predeterminada.](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

Haz una copia de seguridad de la clave y el certificado del nodo en caso de que la instancia EC2 esté corrupta o no esté disponible. El ID del nodo se deriva de su staking key y certificado. Si pierdes tu clave de participación o tu certificado entonces tu nodo obtendrá un nuevo ID de nodo, que podría hacer que te conviertas en inelegibles para una recompensa de participación si tu nodo es un validador** Se aconseja muy fuertemente que copias la clave de participación y el certificado de tu **nodo. La primera vez que ejecutes un nodo que generará un nuevo par de claves de staking/certificado y los guardará en el `/home/ubuntu/.avalanchego/staking`directorio.

Sal de la instancia SSH ejecutando:

```bash
exit
```

Ahora ya no estás conectado a la instancia EC2; estás de vuelta en tu máquina local.

Para copiar el staking key y el certificado a su máquina, ejecuta el siguiente comando. Como siempre, reemplaza `PUBLICIP`.

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

Ahora tu clave de participación y certificado están en el directorio `~/aws_avalanche_backup`.** El contenido de este directorio es secreto.** Deberías mantener este directorio en un lugar de almacenamiento no conectado a Internet \(como un disco duro externo\).

### Actualizacion de tu nodo<a id="9ac7"></a>

AvalancheGo es un proyecto en curso y hay actualizaciones regulares de la versión. La mayoría de las actualizaciones se recomiendan pero no se requieren. Se avisará con antelación para las actualizaciones que no sean compatibles con las versiones anteriores. Para actualizar tu nodo a la última versión, introduce SSH en tu instancia AWS como antes y ejecuta el script de instalación de nuevo.

```text
./avalanchego-installer.sh
```

Tu máquina está ejecutando la nueva versión de AvalancheGo. Para ver el estado del servicio de AvalancheGo, ejecuta.`sudo systemctl status avalanchego.`

## Terminamos!

¡Eso es todo! Ahora tienes un nodo de AvalancheGo funcionando en una instancia de AWS EC2. Recomendamos crear [monitorización de nodo para](setting-up-node-monitoring.md) tu nodo de AvalancheGo. También recomendamos configurar las alertas de facturación de AWS para que no te sorprendas cuando llegue la factura. Si tienes retroalimentación en este tutorial, o cualquier otra cosa, envíanos un mensaje en [Discord](https://chat.avalabs.org).

