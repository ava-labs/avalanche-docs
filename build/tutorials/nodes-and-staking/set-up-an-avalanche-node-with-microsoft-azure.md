---
descripción: 'Tutorial generado por Miembo de la Comunidad: Seq'
---

# Ejecutar un Nodo de Avalanche con Microsoft Azure

Ejecutar un validador y hacer stake con Avalanche proporciona recompensas extremadamente competitivas de entre el 9,69% y el 11,54% dependiendo de la duración de el stake. La tasa máxima se gana haciendo stake por un año, mientras que la tasa más baja por 14 días. Tampoco hay reducciones, así que no tienes que preocuparte por un fallo de hardware o un error en el cliente que te haga perder parte o todo tu stake. En cambio, con Avalanche sólo necesitas mantener al menos un 60% de tiempo de actividad para recibir recompensas. Si no cumples con este requisito, no te reducirán, pero no recibirás las recompensas. **Tampoco es necesario que pongas tus private keys en un nodo para empezar a validar en ese nodo.** Incluso si alguien irrumpe en tu cloud environment y obtiene acceso al nodo, lo peor que puede hacer es apagar el nodo.

La ejecución de un nodo validador no sólo te permite recibir recompensas en AVAX, sino que más adelante también podrás validar otras subnets en el ecosistema y recibir recompensas en el token nativo de sus subnets.

Sólo se necesitan unos modestos requisitos de hardware, 2 núcleos de CPU, 4 GB de memoria y 40 GB de SSD para ejecutar un validador y no utiliza enormes cantidades de energía. El  [mecanismo revolucionario de consenso](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656) de Avalanche es capaz de escalar a millones de validadores participando en el consenso a la vez, ofreciendo una descentralización sin precedentes.

Actualmente, la cantidad mínima requerida para ser validador es de 2 000 AVAX. \(que puede reducirse con el tiempo a medida que aumenta el precio\). Como alternativa, los validadores también pueden cobrar una pequeña cuota para permitir a los usuarios delegar su participación en ellos para ayudar a sufragar los gastos de funcionamiento. Se puede utilizar una calculadora [aquí](https://vscout.io/) para ver cuántas recompensas ganarías al operar un nodo, en comparación con delegar.

Aliento a todos a ejecutar sus propios validadores cuando sea posible, pero para aquellos que no cumplen con los requisitos mínimos de staking y quieren delegar estoy actualmente ejecutando un nodo que se puede encontrar [aquí](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb).

En este artículo daremos un paso adelante en el proceso de configuración de un nodo en Microsoft Azure. Este tutorial asume que no hay experiencia previa con Microsoft Azure y pasará por cada paso con el menor número de suposiciones posibles.

En el momento de este artículo, el precio al contado de una máquina virtual con 2 núcleos y 8 GB de memoria cuesta tan sólo 0,01060 dólares por hora, lo que equivale a unos 113,44 dólares al año, **¡un ahorro del 83,76%! comparado con los precios normales de lo que se paga normalmente.** En comparación, una máquina virtual en AWS con 2 núcleos y 4 GB de memoria tiene un precio de alrededor de 462 dólares al año.

## Configuración de la suscripción inicial <a id="6e8d"></a>

### Configura 2Factor <a id="b9d0"></a>

Primero necesitarás una cuenta de Microsoft, si no tienes una ya verás una opción para crear una en el siguiente enlace. Si ya tienes una, asegúrate de configurar la autenticación de 2 Factores para asegurar tu nodo yendo al siguiente enlace y seleccionando "Verificación de dos pasos" y siguiendo los pasos provistos.

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![Image for post](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

Una vez que la verificación de dos pasos ha sido configurada, entra en el portal de Azure yendo a [https://portal.azure.com](https://portal.azure.com/) e iniciando sesión con tu cuenta de Microsoft. Cuando inicies sesión no tendrás una suscripción, así que primero tenemos que crear una. Selecciona "Suscripciones" como se indica a continuación:

![Image for post](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Luego seleccione "+ Agregar" para agregar una nueva suscripción.

![Image for post](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

Si quieres usar el precio de Spot Instance VM \(que será considerablemente más barato\) no puedes usar una cuenta de prueba gratuita \(y recibirá un error en la validación\), así que **asegúrate de seleccionar Pay-As-You-Go.**

![Image for post](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Introduce tus datos de facturación y confirma tu identidad como parte del proceso de registro, cuando llegues a Agregar soporte técnico selecciona la opción sin soporte \(a menos que quieras pagar extra por soporte\) y presiona siguiente.

![Image for post](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Crea una Virtual Machine <a id="41ac"></a>

Ahora que tenemos una suscripción, podemos crear la Máquina Virtual Ubuntu para nuestro Nodo de Avalanche. Selecciona el icono en la parte superior izquierda para el menú y elige "+ Crear un recurso".

![Image for post](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Selecciona el Servidor Ubuntu 18.04 LTS \(normalmente estará en la sección popular o alternativamente búscalo en el marketplace\)

![Image for post](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Esto te llevará a la página de Crear una máquina virtual como se muestra a continuación:

![Image for post](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

Primero, introduce un nombre en la máquina virtual, puede ser cualquier cosa, pero en mi ejemplo, la he llamado Avalanche. \(Esto también cambiará automáticamente el nombre del grupo de recursos para que coincida\)

Luego seleccione una región de la lista desplegable. Selecciona una de las recomendadas en la región que prefieras, ya que estas tienden a ser las más grandes con la mayoría de las características habilitadas y precios más baratos. En este ejemplo he seleccionado el norte de Europa.

![Image for post](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

Tiene la opción de usar una spot instance para ahorrar cantidades significativas en los costos de funcionamiento. Las spot instances utilizan una estructura de precios de mercado de oferta y demanda. A medida que la demanda de instancias sube, el precio de la spot instance sube. Si no hay suficiente capacidad, entonces su VM se apagará. Sin embargo, las posibilidades de que esto ocurra son increíblemente bajas, especialmente si selecciona la opción de sólo capacidad. Incluso en el improbable caso de que se apague temporalmente, sólo necesita mantener al menos un 60% de tiempo encendida para recibir las recompensas del stake y además no hay reducción implementada en Avalanche.


Selecciona Sí para una Spot Instance, selecciona Eviction type en Capacity Only y **Asegúrate de establecer la política de desalojo en Stop / Deallocate - Esto es muy importante, de lo contrario el VM será eliminado.**

![Image for post](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Elige "Seleccionar tamaño" para cambiar el tamaño de la Máquina Virtual, y en el menú selecciona D2s\_v4 bajo la selección D-Series v4 \(Este tamaño tiene 2 núcleos, 8 GB de memoria y permite SSD's Premium\). Puedes usar las instancias F2s\_v2 en su lugar, con son 2 Núcleos, 4 GB de memoria y permite SSD's Premium\) pero el precio al contado es más barato para las VM más grandes que actualmente tienen precios al contado. Puedes usar [este link](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) para ver los precios en las diferentes regiones.

![Image for post](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Una vez que haya seleccionado el tamaño de la Máquina Virtual, seleccione "Ver historial de precios y comparar precios en regiones cercanas" para ver cómo ha cambiado el precio spot en los últimos 3 meses, y si es más barato utilizar una región cercana que puede tener más capacidad libre.

![Image for post](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

En el momento de este artículo, el precio spot para D2s\_v4 en el norte de Europa cuesta 0,07975 dólares por hora, o alrededor de 698,61 dólares al año. Con el precio spot, el precio cae a 0,01295 dólares por hora, lo que resulta en unos 113,44 dólares al año, **un ahorro del 83.76%!**

Hay algunas regiones que son aún más baratas, el este de EE.UU. por ejemplo es de 0,01060 dólares por hora o alrededor de 92,86 dólares al año!

![Image for post](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

A continuación puede ver el historial de precios de la VM en los últimos 3 meses para el norte de Europa y regiones cercanas.![Image for post](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)

![Image for post](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Más Barato que Amazon AWS <a id="45e9"></a>


En comparación, una instancia c5. grande cuesta $0.085 USD por hora en AWS. Esto suma ~$745 USD por año. Las Spot instances pueden ahorrar un 62%, lo que hace que el total baje a 462 dólares.

El siguiente paso es cambiar el nombre de usuario para la VM, para alinearse con otros tutoriales de Avalanche cambie el nombre de usuario a ubuntu. De lo contrario, tendrás que cambiar varios comandos más adelante en este artículo y cambiar ubuntu con tu nuevo nombre de usuario.

![Image for post](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Discos <a id="ed2e"></a>

Seleccione Siguiente: Discos para luego configurar los discos para la VM. Existen dos opciones de discos: el SSD Premium, que ofrece un mayor rendimiento con un disco de 64 GB y cuesta alrededor de 10 dólares al mes, o el SSD estándar, que ofrece un rendimiento menor y cuesta alrededor de 5 dólares al mes. También hay que pagar 0,002 dólares por cada 10 000 unidades de transacción \(lecturas / escrituras y borrado\) 
con el SSD estándar, mientras que con los SSD premium todo está incluido. Personalmente, elegí la SSD Premium por su mayor rendimiento, pero también porque es probable que los discos se utilicen mucho y por lo tanto pueden resultar más baratos a largo plazo.

Selecciona Luego: Networking para pasar a la configuración de red

![Image for post](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### Configuración de Red <a id="bc5d"></a>

Quieres usar una IP estática para que la IP pública asignada al nodo no cambie en caso de que se detenga. En IP Pública selecciona "Crear nuevo"

![Image for post](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

A continuación, selecciona "Estático" como el tipo de asignación

![Image for post](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

Entonces necesitamos configurar el grupo de seguridad de la red para controlar el acceso entrante al nodo Avalanche. Selecciona "Avanzado" como el tipo de grupo de seguridad de red NIC y selecciona "Crear nuevo"

![Image for post](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

Por motivos de seguridad, desea restringir quién puede conectarse remotamente a su nodo. Para hacer esto, primero querrás averiguar cuál es tu IP pública existente. Esto se puede hacer yendo a Google y buscando "cuál es mi IP".

![Image for post](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

Es probable que se le haya asignado una IP pública dinámica para su casa, a menos que usted lo haya solicitado específicamente, y por lo tanto su IP pública asignada puede cambiar en el futuro. Sin embargo, se recomienda restringir el acceso a su IP actual, y luego, en caso de que la IP de su casa cambie y ya no pueda conectarse remotamente a la máquina virtual, puede actualizar las reglas de seguridad de la red con su nueva IP pública para poder conectarse nuevamente.

NOTA: Si necesita cambiar las reglas del grupo de seguridad de la red después del despliegue, si la IP de su casa ha cambiado, busque "avalanche-nsg" y puede modificar la regla para SSH y el Puerto 9650 con la nueva IP. **El puerto 9651 debe permanecer abierto a todo el mundo** ya que así es como se comunica con otros nodos de Avalanche.

![Image for post](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

Ahora que tienes tu IP pública selecciona la regla por defecto de permitir ssh a la izquierda bajo reglas de entrada para modificarla. Cambia el origen de "Any" a "IP Addresses" y luego ingresa en tu dirección IP pública que encontraste en Google en el campo de dirección IP del origen. Cambie la prioridad hacia abajo a 100 y luego presione Save.

![Image for post](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

Luego seleccione "+ Add an inbound rule" para agregar otra regla para el acceso a RPC, esto también debe ser restringido sólo a su IP. Cambie la Fuente a "IP Addresses" e introduzca en su IP pública devuelta de google en el campo IP de la Fuente. Esta vez cambie el campo "Destination Port Ranges" a 9650 y seleccione "TCP" como protocolo. Cambia la prioridad a 110 y ponle como nombre "Avalanche\_RPC" y presiona Add
![Image for post](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

Selecciona "+ Add an inbound rule" para añadir una regla final para el Protocolo de Avalanche para que otros nodos puedan comunicarse con tu nodo. Esta regla debe estar abierta a todos, así que mantén "Source" en "Any". Cambia el rango del puerto de destino a "9651" y cambia el protocolo a "TCP". Introduce una prioridad de 120 y un nombre de Avalanche\_Protocol y pulsa Add.

![Image for post](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

El grupo de seguridad de la red debe tener el siguiente aspecto \(aunque su dirección IP pública será diferente\) y pulse OK.

![Image for post](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

Deje los otros ajustes como predeterminados y luego presione "Review + create" para crear la máquina virtual.

![Image for post](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

Primero realizará una prueba de validación. Si recibe un error aquí, asegúrese de haber seleccionado el modelo de suscripción de pago por uso y que no esté utilizando la suscripción de prueba gratuita, ya que para las Spot instances no está disponible. Verifique que todo se vea correcto y presione "Create"

![Image for post](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

A continuación, recibirá un mensaje que le pedirá que genere un nuevo par de claves para conectar su máquina virtual. Seleccione "Download private key and create resource" para descargar la private key a su PC.

![Image for post](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)
Una vez que su instalación haya terminado, seleccione "Go to resource"

![Image for post](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Cambiar el Tamaño del Disco Provisto <a id="00dc"></a>

Por defecto, la VM de Ubuntu estará provista de un SSD Premium de 30 GB, aunque esto debería ser suficiente, personalmente no quería la molestia de tener que extender esto más tarde en el período de staking. He incluido los pasos a continuación si desea aumentarlo a 64 GB o si alguna vez necesita aumentarlo en una fecha posterior.

![Image for post](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

Para cambiar el tamaño del disco, el VM necesita ser parado y colocado. Seleccione "Stop" y espere a que el estado muestre "deallocated". Luego seleccione "Disks" a la izquierda.

![Image for post](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

Seleccione el nombre del disco que está provisto actualmente para modificarlo

![Image for post](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

Seleccione "Size + performance" a la izquierda en la configuración y cambie el tamaño a 64 GB y pulse "Resize".

![Image for post](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

Hacer esto ahora también extenderá la partición automáticamente dentro de ubuntu. Para volver a la página de visión general de la máquina virtual, selecciona Avalanche en la configuración de navegación.

![Image for post](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

Entonces inicia la VM

![Image for post](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Conectar al Nodo de Avalanche <a id="8bb7"></a>

Las siguientes instrucciones muestran cómo conectarse a la Máquina Virtual desde una máquina de Windows 10. Para las instrucciones sobre cómo conectarse desde una máquina ubuntu ver el [Tutorial en AWS](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

En tu PC local, crea una carpeta en la raíz de la unidad C: llamada Avalanche y luego mueve el archivo Avalanche\_key.pem que descargaste antes a la carpeta. Luego haz clic con el botón derecho del ratón en el archivo y selecciona Propiedades. Ve a la pestaña de seguridad y selecciona "Advanced" en la parte inferior

![Image for post](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

Seleccione "Disable inheritance" y luego "Remove all inherited permissions from this object" para eliminar todos los permisos existentes en ese archivo.

![Image for post](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

Luego seleccione "Add" para agregar un nuevo permiso y elija "Select a principal" en la parte superior. En el cuadro emergente, introduzca la cuenta de usuario que utiliza para iniciar sesión en su máquina. En este ejemplo me conecto con un usuario local llamado Seq, es posible que tengas una cuenta de Microsoft que uses para conectarte, así que usa cualquier cuenta con la que te conectes a tu PC y presiona "Check Names" y debería subrayarlo para verificar y presionar OK.

![Image for post](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

Entonces desde la sección de permisos asegúrate de que sólo "Read & Execute" y "Read" estén seleccionados y presiona OK.

![Image for post](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

Debería ser algo parecido a lo de abajo, excepto que con un nombre de PC / cuenta de usuario diferente. Esto sólo significa que el archivo clave no puede ser modificado o accedido por ninguna otra cuenta de esta máquina por razones de seguridad, por lo que no pueden acceder a su Nodo de Avalanche.

![Image for post](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Encuentra tu IP Pública del Nodo de Avalanche <a id="4687"></a>

Desde el Portal de Azure toma nota de la dirección IP pública estática que ha sido asignada a tu nodo.

![Image for post](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Para entrar en el nodo Avalanche, abre la línea de comandos buscando "cmd" y seleccionando "Command Prompt" en tu máquina de Windows 10.

![Image for post](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

Entonces usa el siguiente comando y reemplaza el EnterYourAzureIPHere con la dirección IP estática que se muestra en el portal de Azure.

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@EnterYourAzureIPHere

para mi ejemplo es:

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

La primera vez que te conectes recibirás un mensaje pidiéndote que continúes, escribe "yes".

![Image for post](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

Ahora deberías estar conectado a tu Nodo.

![Image for post](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

La siguiente sección está tomada del excelente tutorial de Collin para [configurar un Nodo de Avalanche en Amazon AWS](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

### Actualiza Linux con parches de seguridad <a id="8a1c"></a>

Ahora que estamos en nuestro nodo, es una buena idea actualizarlo con los últimos paquetes. Para ello, ejecute los siguientes comandos, uno a uno, en orden:

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![Image for post](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

Esto hará que nuestra instancia esté al día con los últimos parches de seguridad para nuestro sistema operativo. Esto también reiniciará el nodo. Le daremos al nodo un minuto o dos para que se reinicie, y luego se conectará de nuevo, igual que antes.

### Configura el Nodo de Avalanche <a id="5688"></a>

Ahora necesitaremos configurar nuestro nodo de Avalanche. Para hacerlo, sigue el tutorial de como [Configurar el Nodo de Avalanche con Instalador](set-up-node-with-installer.md) que automatiza el proceso de instalación. Necesitarás la "IPv4 Public IP" copiada del Portal de Azure que instalamos antes.

Una vez que la instalación esté completa, nuestro nodo debería estar ahora en marcha. Podemos ejecutar el siguiente comando para echar un vistazo al último estado del nodo de avalanchego:

```text
sudo systemctl status avalanchego
```

Para comprobar el estado del bootstrap, tendremos que hacer una petición a la RPC local usando "curl". Esta petición es la siguiente:

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

Siempre podemos usar "sudo systemctl status avalanchego" para ver el último estado de nuestro servicio como antes, también.

### Consigue el ID de Tu Nodo <a id="20a7"></a>

Debemos obtener el ID de nuestro nodo si planeamos hacer alguna validación en este nodo. Esto también se recupera de la RPC. Llamamos al siguiente comando curl para obtener  el ID de nuestro nodo.

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

Esa parte que dice, “NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR” es el ID de nuestro Nodo, todo completo. Cópialo y guárdalo en tus notas. No hay nada confidencial o seguro sobre este valor, pero es una necesidad absoluta para cuando enviemos este nodo para ser un validador.

### Haga una copia de seguridad de las Staking Keys<a id="ef3e"></a>

Lo último que deberíamos hacer es respaldar nuestras staking keys en el caso inoportuno de que nuestra instancia se corrompa o se termine. Es una buena práctica para nosotros guardar estas llaves. Para respaldarlas, usamos el siguiente comando:

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Como antes, necesitaremos reemplazar "EnterYourAzureIPHere" con el valor apropiado que recuperamos. Esto respalda nuestra staking key y staking certificate en la carpeta C:\Avalanche que creamos antes.

![Image for post](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIxMzc4MjkxNzIsMTA0Mzk1NDM1MCw4Nz
c0NjQzOTIsMTkwODA1MzY5Miw1MzgzNjM0NjQsLTg1MzY2NjMw
NywtMTI0NzY5OTQ1OSwtMTc1ODc4MDk5OCwtMjU4NTAxOTM3LD
IyMjE3ODY5NF19
-->