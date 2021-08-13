# Ejecute un Nodo Avalanche con Amazon Web Services \(AWS\)

## Introducción

Este tutorial le guiará a través de la configuración de un nodo Avalanche en [Amazon Web Services \(AWS\)](https://aws.amazon.com/). Los servicios de nube como AWS son una buena manera de garantizar que su nodo sea altamente seguro, disponible y accesible.

Para empezar, necesitarás:

* Una cuenta AWS
* Un terminal con el que SSH en su máquina AWS
* Un lugar para almacenar y respaldar archivos de forma segura

Este tutorial asume que su máquina local tiene una terminal de estilo Unix. Si estás en Windows, tendrás que adaptar algunos de los comandos utilizados aquí.

## Inicia sesión en AWS<a id="ff31"></a>

La inscripción para AWS está fuera del ámbito de aplicación de este artículo, pero Amazon tiene instrucciones [aquí](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account).

Es _muy_ recomendable que configure Autenticación Multi-Factor en su cuenta de usuario de raíz AWS para protegerla. Amazon tiene documentación para esto [aquí](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root).

Una vez que se configure su cuenta, debe crear una nueva instancia EC2. Un EC2 es una instancia de máquina virtual en la nube de AWS. Ve a la [Consola de Gestión de AWS](https://console.aws.amazon.com/) y ingrese el tablero EC2.

![Consola de gestión de AWS](../../../.gitbook/assets/image%20%2835%29.png)

Para iniciar sesión en la instancia EC2, necesitará una clave en su máquina local que permita acceder a la instancia. Primero, cree esa clave para que pueda asignarse a la instancia EC2 más adelante. En la barra del lado izquierdo, bajo **Red y Seguridad**, seleccione **Pares de clave.**

![Seleccione &quot;Key bajo el &quot;Network &amp; Security&quot; desplegable.](../../../.gitbook/assets/image%20%2838%29.png)

Seleccione **Crear par de teclas** para lanzar el asistente de creación de par de clave.

![Seleccione &quot;Create par de key](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

Llama tu `avalancha` clave. Si su máquina local tiene MacOS o Linux, seleccione el formato de archivo `pem`. Si es Windows, utilice el formato de archivo `ppk`. Opcionalmente, puede agregar etiquetas para el par de teclas para ayudar con el seguimiento.

![Crea un par de claves que más tarde se asignará a tu instancia EC2.](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

Haga clic `en Crear par de clave`. Debe ver un mensaje de éxito, y el archivo clave debe ser descargado en su máquina local. Sin este archivo, no podrá acceder a su instancia EC2. **Haga una copia de este archivo y ponlo en un medio de almacenamiento separado, como un disco duro externo. Mantenga este archivo en secreto; no lo compartas con otros.**

![Mensaje de éxito después de crear un par de clave.](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

## Crear un grupo de seguridad<a id="f8df"></a>

Un Grupo de Seguridad AWS define lo que el tráfico de Internet puede entrar y salir de su instancia EC2. Piensa en ello como un firewall. Crear un nuevo Grupo de Seguridad seleccionando **Grupos** de Seguridad bajo el desplegable **Red y** Seguridad.

![Seleccione &quot;Security de &quot;Security debajo de &quot;Security &amp; Groups&quot;](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Esto abre el panel de Grupos de Seguridad. Haga clic en **Crear grupo de seguridad** en la parte superior derecha del panel Grupos de Seguridad.

![Seleccione &quot;Create grupo de security](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Necesitará especificar qué tráfico entrante está permitido. Permita el tráfico SSH desde su dirección IP para que pueda iniciar sesión en su instancia EC2. \(Cada vez que su ISP cambie su dirección IP, tendrá que modificar esta regla. Si su ISP cambia regularmente, puede permitir el tráfico SSH desde cualquier lugar para evitar tener que modificar esta regla con frecuencia. \) Permitir el tráfico TCP en el puerto 9651 para que su nodo pueda comunicarse con otros nodos en la red. Permita el tráfico TCP en el puerto 9650 desde su IP para que pueda hacer llamadas API a su nodo. **Es importante que solo permita el tráfico en este puerto desde su IP.** Si permite el tráfico entrante desde cualquier lugar, esto podría ser utilizado como vector de ataque de denegación de servicio. Finalmente, permita todo el tráfico saliente.

![Tus reglas entrantes y salientes deberían parecer así.](../../../.gitbook/assets/inbound-rules.png)

Añada una etiqueta al nuevo grupo de seguridad con `nombre` y `valor key Security Group`. Esto nos permitirá saber cuál es este grupo de seguridad cuando lo vemos en la lista de grupos de seguridad.

![Etiqueta el grupo de seguridad para que pueda identificarlo más tarde.](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

Haga clic `en Crear grupo de seguridad`. Usted debe ver el nuevo grupo de seguridad en la lista de grupos de seguridad.

## Lanzar una instancia EC2<a id="0682"></a>

Ahora estás listo para lanzar una instancia EC2. Ve al tablero EC2 y selecciona **la instancia de lanzamiento**.

![Seleccione &quot;Launch Instance.&quot;](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

Seleccione **Ubuntu 20.04 LTS \(HVM\), SSD Volumen Tipo** para el sistema operativo.

![Seleccione Ubuntu 20.04 LTS.](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

A continuación, elija su tipo de instancia. Esto define las especificaciones de hardware de la instancia de la nube. En este tutorial hemos creado un **c5.large**. Esto debería ser más que potente ya que Avalanche es un protocolo de consenso ligero. Para crear una instancia c5.large, seleccione la opción **optimizada de Computar** desde el menú desplegable del filtro.

![Filtrar por computa optimizada.](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

Seleccione la casilla de verificación junto a la instancia c5.large en la tabla.

![Seleccione c5.large.](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

Haga clic en **el Siguiente: Configurar los detalles de la instancia** en la esquina inferior derecha.

![](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

Los detalles de la instancia pueden permanecer como sus defectos.

### Opcional: Usar casos de spot o casos reservados<a id="c99a"></a>

De forma predeterminada, se le cobrará por hora para ejecutar su instancia EC2. Hay dos maneras en las que puede ser capaz de pagar menos por su EC2.

La primera es lanzando tu EC2 como una **serie de spot**. Las instancias de punto son casos que no están garantizados para siempre aumentar, pero que costan menos en promedio que los casos persistentes. Los casos de puntos utilizan una estructura de precios de mercado de oferta y demanda. A medida que la demanda de instancias sube, el precio de una instancia de punto sube. Puede establecer un precio máximo que está dispuesto a pagar por la instancia de lugar. Puede ser capaz de ahorrar una cantidad significativa de dinero, con la advertencia de que su instancia EC2 puede parar si el precio aumenta. Haga su propia investigación antes de seleccionar esta opción para determinar si la frecuencia de interrupción a su precio máximo justifica el ahorro de costes. Si decide usar una instancia de lugar, asegúrese de configurar el comportamiento de interrupción para **Parar**, no **Terminar** y revisar la opción **Solicitud** persistente.

La otra forma de ahorrar dinero es mediante el uso de una **instancia reservada**. Con un ejemplo reservado, usted paga por adelantado durante todo un año de uso de EC2, y recibe un tipo de cambio de bloqueo por hora. Si tiene la intención de ejecutar un nodo durante mucho tiempo y no quiere arriesgar interrupciones del servicio, esta es una buena opción para ahorrar dinero. Otra vez, haga su propia investigación antes de seleccionar esta opción.

### Añadir almacenamiento, Etiquetas, Grupo de Seguridad<a id="dbf5"></a>

Haga clic en **Siguiente: Añadir** el botón de almacenamiento en la esquina inferior derecha de la pantalla.

Necesitas añadir espacio al disco de tu instancia. Utilizamos 100 GB en este ejemplo. La base de datos de Avalanche crecerá continuamente hasta que se implemente la poda, por lo que es más seguro tener una asignación de disco duro más grande por ahora.

![Seleccione 100 GB para el tamaño del disco.](../../../.gitbook/assets/add-storage.png)

Haga clic en **Siguiente: Añadir etiquetas** en la esquina inferior derecha de la pantalla para añadir etiquetas a la instancia. Las etiquetas nos permiten asociar metadatos con nuestra instancia. Añada una etiqueta con `nombre` y valor `Mi Node`. Esto dejará claro cuál es esta instancia en su lista de instancias EC2.

![Añada una etiqueta con clave &quot;Name&quot; y valor &quot;Mi Avalanche Node.&quot;](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Ahora asigne al grupo de seguridad creado antes a la instancia. Elija **Seleccione Seleccione un grupo de seguridad existente** y elija el grupo de seguridad creado antes.

![Elija el grupo de seguridad creado antes.](../../../.gitbook/assets/configure-security-group.png)

Finalmente, haga clic en **Revisar y lanzar** en la parte inferior derecha. Una página de revisión mostrará los detalles de la instancia que está a punto de lanzar. Revise eso, y si todo se ve bien, haga clic en el botón **de lanzamiento** azul en la esquina inferior derecha de la pantalla.

Se le pedirá que seleccione un par de claves para este caso. Seleccione **Elija un** par de teclas existente y luego seleccione el par de teclas `de avalancha` que hizo antes en el tutorial. Marque la casilla reconociendo que tiene acceso al archivo `.pem` o `.ppk` creado anteriormente \(asegúrese de que lo ha respaldado! \) y luego haga clic en **Instances de Lanzamiento**.

![Usa el par de teclas creado antes.](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

¡Deberías ver un nuevo pop-up que confirma que la instancia está lanzando!

![¡Tu instancia está lanzando!](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

### Asignar una IP elástica

De forma predeterminada, su instancia no tendrá una IP fija. Vamos a darle una IP fija a través del servicio IP Elástico de AWS. Vuelve al tablero EC2. Bajo **Red y Seguridad,** seleccione **IPs elásticos**.

![Seleccione &quot;Elastic IPs&quot; bajo &quot;Elastic &amp; Security.&quot;](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

Seleccione **Asignar dirección IP Elástica**.

![Seleccione &quot;Allocate dirección IP &quot;Allocate](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Seleccione la región en la que se está ejecutando su instancia y elija utilizar la piscina de direcciones IPv4 de Amazon. Haga clic en **Allocate**.

![Configuración para el IP elástico.](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

Seleccione la IP Elastic que acaba de crear desde el administrador de IP Elastic . En el desplegable **Acciones** seleccione **la dirección IP Elástica Asociada**.

![En &quot;Actions&quot;, seleccione &quot;Actions&quot;, IP Elástica &quot;Associate](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Seleccione la instancia que acaba de crear. Esto asociará la nueva IP Elastic con la instancia y le dará una dirección IP pública que no cambiará.

![Asignar la IP Elástica a su instancia EC2.](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## Configurar AvalancheGo<a id="829e"></a>

Vuelve al tablero EC2 y selecciona `Running Instances`.

![Ve a tus instancias de ejecución.](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Seleccione la instancia EC2 recientemente creada. Esto abre un panel de detalles con información sobre la instancia.

![Detalles sobre su nueva instancia.](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

Copiar el campo `IP público IPv4` para usar más adelante. A partir de ahora llamamos este valor `PUBLICIP`.

**Recuerde: los comandos de terminal a continuación asumirán que está ejecutando Linux. Los comandos pueden diferir para MacOS u otros sistemas operativos. Cuando copie un comando desde un bloque de código, copie y pegue todo el texto en el bloque.**

Inicie sesión en la instancia AWS desde su máquina local. Abra un terminal \(prueba el acceso directo `CTRL + ALT + T`\) y navegue al directorio que contiene el archivo `.pem` que descargado antes.

Mueva el archivo `.pem` a `$HOME/.ssh` \(donde los archivos `.pem` generalmente viven \) con:

```bash
mv avalanche.pem ~/.ssh
```

Agregue al agente SSH para que podamos usarlo a SSH en su instancia EC2, y marcarlo como solo lectura.

```bash
ssh-add ~/.ssh/avalanche.pem; chmod 400 ~/.ssh/avalanche.pem
```

SSH en el caso. \(Recuerde reemplazar `PUBLICIP` por el campo IP público desde antes. \)

```text
ssh ubuntu@PUBLICIP
```

Si los permisos **no** están configurados correctamente, verá el siguiente error.

![Asegúrate de configurar los permisos correctamente.](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

Ahora estás conectado en la instancia EC2.

![You&apos;re en la instancia EC2.](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Si no lo ha hecho ya, actualiza la instancia para asegurarse de que tiene las últimas actualizaciones del sistema operativo y de seguridad:

```text
sudo apt update; sudo apt upgrade -y; sudo reboot
```

Esto también reinicia la instancia. Espera 5 minutos, luego inicia sesión de nuevo ejecutando este comando en su máquina local:

```bash
ssh ubuntu@PUBLICIP
```

Has iniciado sesión en la instancia EC2 otra vez. Ahora tendremos que configurar nuestro nodo Avalanche. Para ello, siga el tutorial [Configurar el Nodo Avalanche con Instalador](set-up-node-with-installer.md) que automatiza el proceso de instalación. Necesitará el `PUBLICIP` que hemos creado antes.

Su nodo AvalancheGo debería estar funcionando y en el proceso de secuestro, que puede tomar unas horas. Para comprobar si se hace, puede emitir una llamada API usando `curl`. Si usted está haciendo la solicitud de la instancia EC2, la solicitud es:

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

Puedes continuar aunque AvalancheGo no haya terminado de arrancar.

Para hacer que su nodo sea un validador, necesitará su ID de nodo. Para conseguirlo, corra:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta contiene el ID del nodo.

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

En el ejemplo anterior el nodo ID `isNodeID-DznHH3o7RkmpLkWMn9NqafH66mqunXbM`. Copiar su identificación de nodo para después. Su ID de nodo no es un secreto, por lo que solo puede pegarlo en un editor de texto.

AvalancheGo tiene otras API, como la [API de salud](../../avalanchego-apis/health-api.md), que pueden utilizarse para interactuar con el nodo. Algunas API están desactivadas de forma predeterminada. Para habilitar dichas API, modifique la sección Ejecutar de `/etc/systemd/system/avalanchego.service` \(creado durante el proceso de instalación\) para incluir banderas que permiten estos puntos finales. No active manualmente ninguna API a menos que tenga una razón.

![Algunas API están desactivadas de forma predeterminada.](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

Copia de seguridad de la clave y el certificado de seguridad del nodo en caso de que la instancia EC2 esté dañada o no esté disponible. El ID del nodo se deriva de su clave y certificado de base. Si pierdes tu llave o certificado de grapado, tu nodo obtendrá una nueva identificación de nodo, lo que podría hacer que te conviertas en inelegible para una recompensa gratificante si tu nodo es un validador. **Es muy recomendable que copies la clave y el certificado de su nodo**. La primera vez que ejecutes un nodo, generará un nuevo par de teclas / certificado de grapado y los almacenará en el directorio `/home/ubuntu/.avalanchego/staking`.

Salga de la instancia SSH ejecutando:

```bash
exit
```

Ahora ya no estás conectado con la instancia EC2; estás de vuelta en tu máquina local.

Para copiar la tecla de grapado y el certificado a su máquina, ejecute el siguiente comando. Como siempre, reemplace a `PUBLICIP`.

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

Ahora su clave de fijación y certificado están en el directorio `~/aws_avalanche_backup` . **El contenido de este directorio es secreto.** Debe mantener este directorio en el almacenamiento no conectado a Internet \(como un disco duro externo. \)

### Actualizar su nodo<a id="9ac7"></a>

AvalancheGo es un proyecto en curso y hay actualizaciones de versiones regulares. La mayoría de las actualizaciones se recomiendan pero no se requieren. Se dará aviso previo para las mejoras que no sean compatibles hacia atrás. Para actualizar su nodo a la última versión, SSH en su instancia AWS como antes y volver a ejecutar el script de instalación.

```text
./avalanchego-installer.sh
```

Su máquina ahora está ejecutando la versión más reciente de AvalancheGo. Para ver el estado del servicio AvalancheGo ejecute `sudo systemctl status avalanchego.`

## Envuelva

¡Eso es! Ahora tienes un nodo AvalancheGo corriendo en una instancia de AWS EC2. Recomendamos configurar [el monitoreo de nodo para](setting-up-node-monitoring.md) su nodo AvalancheGo. También recomendamos configurar alertas de facturación de AWS para que no te sorprenda cuando llegue la ley. Si tienes comentarios sobre este tutorial, o cualquier otra cosa, envíanos un mensaje sobre [Discord](https://chat.avalabs.org).

