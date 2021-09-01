---
description: 'Tutorial generado por la comunidad Miembro: Seq'
---

# Ejecuta un Nodo de Avalanche con Microsoft Azure

Ejecutar un validador y hacer stake con Avalanche proporciona recompensas extremadamente competitivas de entre el 9,69% y el 11,54% dependiendo de la duración de el stake. La tasa máxima se gana haciendo stake por un año, mientras que la tasa más baja por 14 días. Tampoco hay reducciones, así que no tienes que preocuparte por un fallo de hardware o un error en el cliente que te haga perder parte o todo tu stake. En cambio, con Avalanche sólo necesitas mantener al menos un 60% de tiempo de actividad para recibir recompensas. Si no cumples este requisito no te hagas recortar, pero no recibes las recompensas.** Tampoco necesitas poner tus claves privadas en un nodo para empezar a validar en ese nodo.** Incluso si alguien irrumpe en tu cloud environment y obtiene acceso al nodo, lo peor que puede hacer es apagar el nodo.

La ejecución de un nodo validador no sólo te permite recibir recompensas en AVAX, sino que más adelante también podrás validar otras subnets en el ecosistema y recibir recompensas en el token nativo de sus subnets.

Sólo se necesitan unos modestos requisitos de hardware, 2 núcleos de CPU, 4 GB de memoria y 40 GB de SSD para ejecutar un validador y no utiliza enormes cantidades de energía. El [mecanismo](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656) de consenso revolucionario de Avalanche es capaz de escalar a millones de validadores que participan en consenso al mismo tiempo, ofreciendo descentralización sin precedentes.

Actualmente, la cantidad mínima requerida para ser validador es de 2 000 AVAX. \(que puede reducirse con el tiempo a medida que aumenta el precio\). Como alternativa, los validadores también pueden cobrar una pequeña cuota para permitir a los usuarios delegar su participación en ellos para ayudar a sufragar los gastos de funcionamiento. Puedes usar una calculadora [aquí](https://vscout.io/) para ver cuánto recompensas ganas al ejecutar un nodo comparada con la delegación.

Animo a todos a ejecutar sus propios validadores cuando sea posible, pero para aquellos que no cumplen los requisitos de participación mínimos y quieren delegar Actualmente estoy ejecutando un nodo que puedes encontrar [aquí](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb).

En este artículo daremos un paso adelante en el proceso de configuración de un nodo en Microsoft Azure. Este tutorial asume que no hay experiencia previa con Microsoft Azure y pasará por cada paso con el menor número de suposiciones posibles.

En el momento de este artículo, la fijación de precios para una máquina virtual de 2 núcleos y 8 GB de memoria es tan poco como 0.01060 dólares por hora que se prepara en aproximadamente 113,44 dólares al año, **un ahorro de 83,76 %! comparada con el pago normal al ir a los precios.** En comparación, una máquina virtual en AWS con 2 núcleos y 4 GB de memoria tiene un precio de alrededor de 462 dólares al año.

## Configuración de suscripción inicial<a id="6e8d"></a>

### Configurar 2 factor<a id="b9d0"></a>

Primero necesitarás una cuenta de Microsoft, si no tienes una ya verás una opción para crear una en el siguiente enlace. Si ya tienes uno, asegúrate de crear la autenticación de 2 Factores para asegurar tu nodo al ir al siguiente enlace y luego seleccionar la "verificación de dos pasos" y siguiendo los pasos proporcionados.

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![Imagen para correo](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

Una vez que se ha configurado dos factores de inicio de sesión en el portal de Azure al ir a [https://portal.azure.com](https://portal.azure.com/) y iniciar sesión con tu cuenta de Microsoft. Cuando inicies sesión no tendrás una suscripción, así que primero tenemos que crear una. Selecciona "Suscripciones" como se destaca a continuación:

![Imagen para correo](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Luego selecciona "\+ Add" para agregar una nueva suscripción

![Imagen para correo](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

**Si quieres usar precios VM de Spot \(que será considerablemente más barato\) no puedes usar una cuenta de prueba gratuita \(y recibirás un error al la validación\), así que asegúrate de seleccionar Pay-As-You-Go.**

![Imagen para correo](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Introduce tus datos de facturación y confirma tu identidad como parte del proceso de registro, cuando llegues a Agregar soporte técnico selecciona la opción sin soporte \(a menos que quieras pagar extra por soporte\) y presiona siguiente.

![Imagen para correo](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Crea una máquina virtual<a id="41ac"></a>

Ahora que tenemos una suscripción, podemos crear la Máquina Virtual Ubuntu para nuestro Nodo de Avalanche. Selecciona el icono en la parte superior izquierda para el menú y elige "\+ Crea un recurso".

![Imagen para correo](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Selecciona el Servidor Ubuntu 18.04 LTS \(normalmente estará en la sección popular o alternativamente búscalo en el marketplace\)

![Imagen para correo](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Esto te llevará a la página de Crear una máquina virtual como se muestra a continuación:

![Imagen para correo](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

Primero, introduce un nombre en la máquina virtual, puede ser cualquier cosa, pero en mi ejemplo, la he llamado Avalanche. \(Esto también cambiará automáticamente el nombre del grupo de recursos para que coincida\)

Luego seleccione una región de la lista desplegable. Selecciona una de las recomendadas en la región que prefieras, ya que estas tienden a ser las más grandes con la mayoría de las características habilitadas y precios más baratos. En este ejemplo he seleccionado el norte de Europa.

![Imagen para correo](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

Tiene la opción de usar una spot instance para ahorrar cantidades significativas en los costos de funcionamiento. Las spot instances utilizan una estructura de precios de mercado de oferta y demanda. A medida que la demanda de instancias sube, el precio de la spot instance sube. Si no hay suficiente capacidad, entonces su VM se apagará. Sin embargo, las posibilidades de que esto ocurra son increíblemente bajas, especialmente si selecciona la opción de sólo capacidad. Incluso en el improbable caso de que se apague temporalmente, sólo necesita mantener al menos un 60% de tiempo encendida para recibir las recompensas del stake y además no hay reducción implementada en Avalanche.

Selecciona Sí para la instancia de punto de Azure y selecciona el tipo de desalojo a la capacidad solo y **asegúrate de establecer la política de desahucio para Parar / Spot Esto es muy importante de lo contrario se eliminará la VM**

![Imagen para correo](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Elige "Seleccionar tamaño" para cambiar el tamaño de la máquina virtual, y desde el menú selecciona D2s\_v4 bajo la selección de D-Series v4 \(Este tamaño tiene 2 núcleos, 8 GB de memoria y permite Premium Puedes usar las instancias F2s\_v2 en su lugar, con son 2 Núcleos, 4 GB de memoria y permite SSD's Premium\) pero el precio al contado es más barato para las VM más grandes que actualmente tienen precios al contado. Puedes usar [este enlace](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) para ver los precios en las diferentes regiones.

![Imagen para correo](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Una vez que has seleccionado el tamaño de la máquina virtual, selecciona "Ver la historia de precios y comparar los precios en las regiones cercanas" para ver cómo el precio por spot ha cambiado en los últimos 3 meses, y si es más barato usar una región cercana que puede tener más capacidad de repuesto.

![Imagen para correo](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

En el momento de este artículo, el precio spot para D2s\_v4 en el norte de Europa cuesta 0,07975 dólares por hora, o alrededor de 698,61 dólares al año. **Con precios spot**

Hay algunas regiones que son aún más baratas, el este de EE.UU. por ejemplo es de 0,01060 dólares por hora o alrededor de 92,86 dólares al año!

![Imagen para correo](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

A continuación puedes ver la historia de precios de la VM en los últimos 3 meses para Europa del Norte y las regiones ![you para la publicación](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)

![Imagen para correo](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Más barato que Amazon<a id="45e9"></a>

En comparación, una instancia c5. grande cuesta $0.085 USD por hora en AWS. Esto suma ~$745 USD por año. Las Spot instances pueden ahorrar un 62%, lo que hace que el total baje a 462 dólares.

El siguiente paso es cambiar el nombre de usuario para la VM, para alinearse con otros tutoriales de Avalanche cambie el nombre de usuario a ubuntu. De lo contrario, tendrás que cambiar varios comandos más adelante en este artículo y cambiar ubuntu con tu nuevo nombre de usuario.

![Imagen para correo](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Discos<a id="ed2e"></a>

Selecciona Next: Discos para entonces configurar los discos para la ejemplo. Existen dos opciones de discos: el SSD Premium, que ofrece un mayor rendimiento con un disco de 64 GB y cuesta alrededor de 10 dólares al mes, o el SSD estándar, que ofrece un rendimiento menor y cuesta alrededor de 5 dólares al mes. También hay que pagar 0,002 dólares por cada 10 000 unidades de transacción \(lecturas / escrituras y borrado\) con el SSD estándar, mientras que con los SSD premium todo está incluido. Personalmente, elegí la SSD Premium por su mayor rendimiento, pero también porque es probable que los discos se utilicen mucho y por lo tanto pueden resultar más baratos a largo plazo.

Seleccionar siguiente: la red para moverse en la configuración de la red

![Imagen para correo](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### Config de red<a id="bc5d"></a>

Quieres usar una IP estática para que la IP pública asignada al nodo no cambie en caso de que se detenga. Bajo IP pública selecciona "Crea nuevo"

![Imagen para correo](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

Luego selecciona "Static" como el tipo de asignación

![Imagen para correo](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

Entonces necesitamos configurar el grupo de seguridad de la red para controlar el acceso entrante al nodo Avalanche. Selecciona "Avanzado" como el grupo de seguridad de la red de NIC y selecciona "Crea nuevo"

![Imagen para correo](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

Por motivos de seguridad, desea restringir quién puede conectarse remotamente a su nodo. Para hacer esto, primero querrás averiguar cuál es tu IP pública existente. Esto puede hacerse al ir a Google y buscar "cuál es mi ip".

![Imagen para correo](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

Es probable que se le haya asignado una IP pública dinámica para su casa, a menos que usted lo haya solicitado específicamente, y por lo tanto su IP pública asignada puede cambiar en el futuro. Sin embargo, se recomienda restringir el acceso a su IP actual, y luego, en caso de que la IP de su casa cambie y ya no pueda conectarse remotamente a la máquina virtual, puede actualizar las reglas de seguridad de la red con su nueva IP pública para poder conectarse nuevamente.

NOTA: Si necesitas cambiar las reglas de grupo de seguridad de la red después de implementarlo si tu IP de casa ha cambiado, busca "avalanche-nsg" y puedes modificar la regla para SSH y el puerto 9650 con la nueva IP.** El puerto 9651 necesita permanecer abierto a todos los países, **aunque así es como se comunica con otros nodos de Avalanche.

![Imagen para correo](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

Ahora que tienes tu IP pública selecciona la regla por defecto permite sh en la izquierda bajo reglas de entrada para modificarla. Cambia Fuente de "Any" a "direcciones IP" y luego introduce tu dirección IP pública que encontraste desde Google en el campo de dirección IP de origen IP. Cambie la prioridad hacia abajo a 100 y luego presione Save.

![Imagen para correo](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

Luego selecciona "\+ Añadir una regla de entrada" para agregar otra regla para el acceso RPC, esto también debería restringirse a solo tu IP. Cambiar fuente a las "direcciones IP" e introducir en tu IP pública devuelta de Google en el campo de IP de origen. Esta vez cambia el campo de "Destination de puerto de destino" a 9650 y selecciona "TCP" como el protocolo. Cambia la prioridad a 110 y dale un nombre de "Avalanche\_RPC" y presiona Añadir.

![Imagen para correo](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

Selecciona "\+ Añadir una regla de entrada" para agregar una regla final para el protocolo de Avalanche de modo que otros nodos puedan comunicarse con tu nodo. Esta regla necesita ser abierta a todos así que mantiene la "fuente" establecida en "Any". Cambia el rango de puerto de destino a "9651" y cambia el protocolo a "TCP". Introduce una prioridad de 120 y un nombre de Avalanche\_Protocol y pulsa Add.

![Imagen para correo](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

El grupo de seguridad de la red debe tener el siguiente aspecto \(aunque su dirección IP pública será diferente\) y pulse OK.

![Imagen para correo](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

Deja las otras configuraciones como predeterminada y luego presiona "Revisión \+ crear" para crear la máquina virtual.

![Imagen para correo](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

Primero realizará una prueba de validación. Si recibe un error aquí, asegúrese de haber seleccionado el modelo de suscripción de pago por uso y que no esté utilizando la suscripción de prueba gratuita, ya que para las Spot instances no está disponible. Verificar todo se ve correcto y presiona "Crear"

![Imagen para correo](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

A continuación, recibirá un mensaje que le pedirá que genere un nuevo key pair para conectar su máquina virtual. Selecciona "Descargar la clave privada y crear el recurso" para descargar la clave privada a tu PC.

![Imagen para correo](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

Una vez que tu despliegue haya terminado, selecciona "Ir al recurso"

![Imagen para correo](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Cambia el tamaño de disco proyectado<a id="00dc"></a>

Por defecto, la VM de Ubuntu estará provista de un SSD Premium de 30 GB, aunque esto debería ser suficiente, personalmente no quería la molestia de tener que extender esto más tarde en el período de staking. Deberías aumentar esto a 250 GB, para permitir el crecimiento de la base.

![Imagen para correo](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

Para cambiar el tamaño del disco, el VM necesita ser parado y colocado. Selecciona "Parar" y espera el estado para mostrar deallocated. Luego selecciona "Disks" en la izquierda.

![Imagen para correo](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

Selecciona el nombre del disco que está provisto actualmente para modificarlo

![Imagen para correo](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

Selecciona "Tamaño \+ rendimiento" en la izquierda bajo la configuración y cambia el tamaño a 250 GB y presiona "Resize".

![Imagen para correo](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

Hacer esto ahora también extenderá la partición automáticamente dentro de ubuntu. Para volver a la página de visión general de la máquina virtual, selecciona Avalanche en la configuración de navegación.

![Imagen para correo](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

Entonces inicia la VM

![Imagen para correo](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Conectar con el nodo de Avalanche<a id="8bb7"></a>

Las siguientes instrucciones muestran cómo conectarse a la Máquina Virtual desde una máquina de Windows 10. Para instrucciones de cómo conectarse desde una máquina de ubuntu mira el [tutorial](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) de AWS

En tu PC local, crea una carpeta en la raíz de la unidad C: llamada Avalanche y luego mueve el archivo Avalanche\_key.pem que descargaste antes a la carpeta. Luego haz clic con el botón derecho del ratón en el archivo y selecciona Propiedades. Ve a la pestaña de seguridad y selecciona "Avanzado" en la parte inferior

![Imagen para correo](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

Selecciona "Desactivar herencia" y luego "Eliminar todos los permisos heredados de este objeto" para eliminar todos los permisos existentes en ese archivo.

![Imagen para correo](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

Luego selecciona "Añadir" para agregar un nuevo permiso y elige "Selecciona un director" en la parte superior. En el cuadro emergente, introduce la cuenta de usuario que utilizas para iniciar sesión en tu máquina. En este ejemplo me conectaré con un usuario local llamado Seq, puedes tener una cuenta de Microsoft que usas para iniciar sesión, así que usa cualquier cuenta que te conectes a tu PC y presione "Check Names" y debería subrayarlo para verificar y presionar OK.

![Imagen para correo](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

Luego de la sección de permisos asegurarnos de que solo se seleccionen "Leer y Ejecutar" y "leer" y presione OK.

![Imagen para correo](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

Debería ser algo parecido a lo de abajo, excepto que con un nombre de PC / cuenta de usuario diferente. Esto sólo significa que el archivo clave no puede ser modificado o accedido por ninguna otra cuenta de esta máquina por razones de seguridad, por lo que no pueden acceder a su Nodo de Avalanche.

![Imagen para correo](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Encuentra tu nodo de Avalanche IP pública<a id="4687"></a>

Desde el Portal de Azure toma nota de la dirección IP pública estática que ha sido asignada a tu nodo.

![Imagen para correo](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Para iniciar sesión en el nodo de Avalanche, abre el símbolo de comando al buscar "cmd" y seleccionando "Comando Prompt " en tu máquina de Windows 10.

![Imagen para correo](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

Entonces usa el siguiente comando y reemplaza el EnterYourAzureIPHere con la dirección IP estática que se muestra en el portal de Azure.

sssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@EnterYourAzureIPHere

para mi ejemplo es:

sssh -i C:\Avalanche\Avalanche\_key.pem

La primera vez que te conectes recibirás un mensaje pidiéndote que continúes, escribe "yes".

![Imagen para correo](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

Ahora deberías estar conectado a tu Nodo.

![Imagen para correo](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

La siguiente sección se toma del tutorial excelente de Colin para [configurar un nodo de Avalanche en los Avalanche AWS de Amazon](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

### Actualiza Linux con parches de seguridad<a id="8a1c"></a>

Ahora que estamos en nuestro nodo, es una buena idea actualizarlo con los últimos paquetes. Para ello, ejecute los siguientes comandos, uno a uno, en orden:

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![Imagen para correo](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

Esto hará que nuestra instancia esté al día con los últimos parches de seguridad para nuestro sistema operativo. Esto también reiniciará el nodo. Le daremos al nodo un minuto o dos para que se reinicie, y luego se conectará de nuevo, igual que antes.

### Configurar el nodo de Avalanche<a id="5688"></a>

Ahora necesitaremos configurar nuestro nodo de Avalanche. Para ello, sigue el [nodo de Avalanche con tutorial de Instalador](set-up-node-with-installer.md) que automatiza el proceso de instalación. Necesitarás la "IP pública de IPv4 " copiada del portal de Azure que creamos antes.

Una vez que la instalación esté completa, nuestro nodo debería estar ahora en marcha. Podemos ejecutar el siguiente comando para echar un vistazo al último estado del nodo de avalanchego:

```text
sudo systemctl status avalanchego
```

Para comprobar el estado de la correa de arranque, necesitaremos hacer una solicitud al RPC local usando "curl". Esta petición es la siguiente:

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

El nodo puede tomar algún tiempo \(más de una hora mientras escribo\) en arrancar. Arrancar significa que el nodo descarga y verifica la historia de las chains. Dale a esto un poco de tiempo. Una vez que el nodo termine el arrranque, la respuesta será:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Siempre podemos usar "sudo systemctl status avalanchego" para mirar el estado más reciente de nuestro servicio como antes, también.

### Obtén tu NodeID<a id="20a7"></a>

Debemos obtener el ID de nuestro nodo si planeamos hacer alguna validación en este nodo. Esto también se recupera de la RPC. Llamamos al siguiente comando curl para obtener el ID de nuestro nodo.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si todo va bien, la respuesta debería ser algo como esto:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

Esa porción que dice, "NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR" es nuestro NodeID, todo lo Cópialo y guárdalo en tus notas. No hay nada confidencial o seguro sobre este valor, pero es una necesidad absoluta para cuando enviemos este nodo para ser un validador.

### Copia de seguridad de tus claves de participación<a id="ef3e"></a>

Lo último que deberíamos hacer es respaldar nuestras staking keys en el caso inoportuno de que nuestra instancia se corrompa o se termine. Es una buena práctica para nosotros guardar estas llaves. Para respaldarlas, usamos el siguiente comando:

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Como antes, necesitaremos reemplazar "EnterYourAzureIPHere" con el valor apropiado que recuperamos. Esto respalda nuestra clave de participación y el certificado de participación en la carpeta C:\Avalanche que hemos creado antes.

![Imagen para correo](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

