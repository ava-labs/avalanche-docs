---
description: 'Tutorial generado por la comunidad Miembro: Seq'

---

# Ejecute un Nodo Avalanche con Microsoft Azure

El funcionamiento de un validador y de un soporte con Avalanche proporciona recompensas extremadamente competitivas entre el 9,69% y el 11,54% dependiendo de la longitud que estaca. La tasa máxima se obtiene por un año, mientras que la tasa más baja durante 14 días. Tampoco hay desplomes, por lo que no es necesario preocuparse por un fallo de hardware o error en el cliente que le hace perder parte o toda su hoguera. En lugar de ello, con Avalanche solo necesita mantener al menos el 60% de tiempo de actividad para recibir recompensas. Si no cumple este requisito no te deshonra, pero no recibes las recompensas. **Tampoco es necesario poner sus teclas privadas en un nodo para comenzar a validar ese nodo.** Incluso si alguien rompe en su entorno de nube y obtiene acceso al nodo, lo peor que puede hacer es apagar el nodo.

No solo el funcionamiento de un nodo de validación le permite recibir recompensas en AVAX, sino que más tarde también podrá validar otras subredes en el ecosistema así como recibir recompensas en la muestra nativa de sus subredes.

Solo necesita requisitos de hardware modestos de 2 núcleos de CPU, 4 GB de memoria y 200 GB SSD para ejecutar un validador y no utiliza enormes cantidades de energía. El [mecanismo revolucionario](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656) de consenso de Avalanche puede escalar a millones de validadores que participan en el consenso de una vez, ofreciendo una descentralización inigualable.

Actualmente la cantidad mínima requerida para ser validador es de 2.000 AVAX \(que puede reducirse con el tiempo a medida que aumenta el precio). Alternativamente, los validadores también pueden cobrar una pequeña cuota para permitir a los usuarios delegar su participación con ellos para ayudar a ejecutar los costos. Puede utilizar una calculadora [aquí](https://vscout.io/) para ver cuánto recompensas ganaría al ejecutar un nodo, en comparación con delegar.

Animo a todos a dirigir sus propios validadores cuando sea posible, pero para aquellos que no cumplen con los requisitos mínimos de fijación y quieren delegar Actualmente estoy ejecutando un nodo que usted puede encontrar [aquí](https://avascan.info/staking/validator/NodeID-MGrikMRTmooL1j7uawPHjaMS1cXkbewdb).

En este artículo pasaremos por el proceso de configurar un nodo en Microsoft Azure. Este tutorial no asume experiencia previa con Microsoft Azure y pasará por cada paso con el menor número de suposiciones posibles.

En el momento de este artículo, el precio de spot para una máquina virtual con 2 núcleos y 8 GB de memoria cuesta tan poco como $0.01060 por hora que funciona en aproximadamente $113.44 al año, **¡un ahorro de** 83.76%! comparada con el pago normal mientras vas a los precios. En comparación una máquina virtual en AWS con 2 núcleos y 4 GB de memoria con precios al contado es de alrededor de $462 al año.

## Configuración de suscripción inicial<a id="6e8d"></a>

### Configurar 2 Factor<a id="b9d0"></a>

Primero necesitará una cuenta de Microsoft, si no tiene ya una verá una opción para crear una en el siguiente enlace. Si ya tiene uno, asegúrese de configurar la autenticación de 2 Factores para asegurar su nodo yendo al siguiente enlace y luego seleccionando "Verificación de dos pasos" y siguiendo los pasos proporcionados.

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![Imagen para post](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

Una vez que dos factores se han configurado inicie sesión en el portal Azure yendo a [https://portal.azure.com](https://portal.azure.com/) y iniciando sesión con su cuenta de Microsoft. Cuando se inicie sesión no tendrá una suscripción, por lo que necesitamos crear uno primero. Seleccione "Suscripciones" como se destaca a continuación:

![Imagen para post](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Luego seleccione "+ Añadir" para añadir una nueva suscripción

![Imagen para post](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

Si desea utilizar Spot Instance VM Precios \(que será considerablemente más barato\) no puede utilizar una cuenta de prueba gratuita \(y recibirá un error al validación\), así que **asegúrese de seleccionar Pay-As-You-Go.**

![Imagen para post](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Introduzca sus detalles de facturación y confirme la identidad como parte del proceso de registro, cuando llegue a Añadir soporte técnico seleccione la opción sin soporte \(a menos que desee pagar extra por el soporte \) y presione Next.

![Imagen para post](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Crear una máquina virtual<a id="41ac"></a>

Ahora que tenemos una suscripción, podemos crear la Máquina Virtual Ubuntu para nuestro Node Avalanche. Seleccione el icono en la parte superior izquierda para el menú y elija "+ Crear un recurso".

![Imagen para post](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Seleccione Ubuntu Server 18.04 LTS \(esto normalmente estará bajo la sección popular o alternativamente buscarlo en el mercado\)

![Imagen para post](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Esto te llevará a la página Crear una máquina virtual como se muestra a continuación:

![Imagen para post](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

Primero, introduzca una máquina virtual un nombre, esto puede ser cualquier cosa menos en mi ejemplo, lo he llamado Avalanche \(Esto también cambiará automáticamente el nombre del grupo de recursos para coincidir \)

Luego seleccione una región de la lista desplegable. Seleccione uno de los recomendados en una región que prefiera ya que éstos tienden a ser los más grandes con la mayoría de las características habilitadas y precios más baratos. En este ejemplo he seleccionado Europa del Norte.

![Imagen para post](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

Usted tiene la opción de utilizar precios al contado para ahorrar cantidades significativas en los costos de ejecución. Los casos de puntos utilizan una estructura de precios de mercado de oferta y demanda. A medida que la demanda de instancias sube, el precio de la instancia de lugar sube. Si no hay suficiente capacidad, entonces su VM se apagará. Las posibilidades de que esto suceda son increíblemente bajas, especialmente si selecciona la opción Capacidad solamente. Incluso en el improbable caso de que se apague temporalmente solo necesita mantener al menos el 60% de tiempo de espera para recibir las recompensas de grapado y no hay una caída implementada en Avalanche.

Seleccione Sí para la instancia de Azure Spot, seleccione Tipo de desvío a Capacidad Solo y asegúrese de **establecer la política de desalojo para Parar / Desasignar — Esto es muy importante de lo contrario se eliminará el VM**

![Imagen para post](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Elija "Seleccionar tamaño" para cambiar el tamaño de la máquina virtual, y en el menú seleccione D2s\_v4 bajo la selección v4 de la serie D \(Este tamaño tiene 2 núcleos, 8 GB de memoria y permite SSD Premium). Puede utilizar instancias F2s\_v2 en su lugar, con 2 núcleos, 4 GB de memoria y permite SSDs\) Premium, pero el precio al lugar realmente funciona más barato para el VM más grande actualmente con precios de instancia al spot . Puede utilizar [este enlace](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) para ver los precios en las diferentes regiones.

![Imagen para post](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Una vez que haya seleccionado el tamaño de la Máquina Virtual, seleccione "Ver el historial de precios y comparar precios en las regiones cercanas" para ver cómo el precio al contado ha cambiado en los últimos 3 meses, y si es más barato utilizar una región cercana que puede tener más capacidad de repuesto.

![Imagen para post](https://miro.medium.com/max/763/1*UQYmhtL8JMhrOkaWk8cloA.png)

En el momento de este artículo, el precio por spot para D2s\_v4 en Europa del Norte cuesta $0.07975 por hora, o alrededor de $698.61 al año. Con el precio al contado el precio cae a $0.01295 por hora, que funciona a unos $113.44 al año, **¡un ahorro de** 83.76%!

Hay algunas regiones que son incluso más baratas, este de Estados Unidos por ejemplo es de $0.01060 por hora o alrededor de $92.86 al año!

![Imagen para post](https://miro.medium.com/max/677/1*Th5aDwLS6_IoM0LidRbH6g.png)

A continuación puede ver la historia de precios de la VM durante los últimos 3 meses para Europa del Norte y regiones ![nearby.Image para post](https://miro.medium.com/max/30/1*OJ4monpMy8DhWw_HWycMjg.png?q=20)

![Imagen para post](https://miro.medium.com/max/968/1*OJ4monpMy8DhWw_HWycMjg.png)

### Más barato que Amazon AWS<a id="45e9"></a>

Como comparación un c5.grande de instancia cuesta $0.085 USD por hora en AWS. Esto es de ~$745 USD por año. Las instancias de puntos pueden ahorrar 62%, con lo que el total se reduce a $462.

El siguiente paso es cambiar el nombre de usuario para el VM, para alinearse con otros tutoriales de Avalanche cambiar el nombre de usuario a ubuntu. De lo contrario tendrá que cambiar varios comandos más tarde en este artículo y cambiar de usuario con su nuevo nombre de usuario.

![Imagen para post](https://miro.medium.com/max/780/1*CNmFTz056EUmahfi5zG3JQ.png)

### Discos<a id="ed2e"></a>

Seleccione Siguiente: Discos para configurar los discos por ejemplo. Hay 2 opciones para discos, ya sea SSD Premium que ofrecen un mayor rendimiento con un costo de disco de 64 GB alrededor de $10 al mes, o hay el SSD estándar que ofrece un rendimiento más bajo y es de alrededor de $5 al mes. También tienes que pagar $0.002 por cada 10.000 unidades de transacción \(lee / escribe y borra\) con el SSD estándar, mientras que con SSD Premium todo está incluido. Personalmente, elegí la SSD Premium para un mayor rendimiento, pero también porque es probable que los discos sean muy utilizados y así incluso pueden funcionar más baratos a largo plazo.

Seleccione Siguiente: Redes para pasar a la configuración de la red

![Imagen para post](https://miro.medium.com/max/763/1*Oqv9nA8KoSIyq95DuPDN4g.png)

### Config de red<a id="bc5d"></a>

Desea utilizar una IP estática para que la IP pública asignada al nodo no cambie en el caso de que se detiene. Bajo IP pública seleccione "Crear nuevo"

![Imagen para post](https://miro.medium.com/max/774/1*2wsz1_OG7DpLA7jmTJfm0A.png)

Luego seleccione "Estático" como el tipo de asignación

![Imagen para post](https://miro.medium.com/max/347/1*y-JbYlRNN3GNNXtZDP-UXQ.png)

Entonces necesitamos configurar el grupo de seguridad de red para controlar el acceso entrante al nodo Avalanche. Seleccione "Avanzado" como el tipo de grupo de seguridad de red NIC y seleccione "Crear nuevo"

![Imagen para post](https://miro.medium.com/max/763/1*e5Y-mHGkn42A-mJx6o3J0g.png)

Para fines de seguridad desea restringir quién es capaz de conectarse remotamente a su nodo. Para ello, primero querrá averiguar cuál es su IP pública existente. Esto se puede hacer al ir a google y buscar "cuál es mi ip".

![Imagen para post](https://miro.medium.com/max/450/1*-aV-AdrABCUmludxXUPV6Q.png)

Es probable que se le haya asignado una IP pública dinámica para su hogar, a menos que lo haya solicitado específicamente, y por lo que su IP pública asignada puede cambiar en el futuro. Aún se recomienda restringir el acceso a su IP actual, sin embargo, y luego en el caso de que su IP doméstica cambie y ya no sea capaz de conectarse remotamente con el VM, solo puede actualizar las reglas de seguridad de red con su nueva IP pública para que pueda conectarse de nuevo.

NOTA: Si necesita cambiar las reglas del grupo de seguridad de red después de la implementación si su IP de inicio ha cambiado, busque "avalanche-nsg" y puede modificar la regla de SSH y Port 9650 con el nuevo IP. **El Puerto 9651 debe permanecer abierto a todos** aunque así es como se comunica con otros nodos Avalanche.

![Imagen para post](https://miro.medium.com/max/481/1*fR6SrKhTSTQ4cS3PoFrQfQ.png)

Ahora que tiene su IP pública seleccione la regla predeterminada permite que ssh en la izquierda bajo reglas de entrada para modificarla. Cambiar Fuente de "Any" a "direcciones IP" y luego ingrese en su dirección IP pública que encontró desde google en el campo de dirección IP Source. Cambie la prioridad hacia el fondo a 100 y luego presione Save.

![Imagen para post](https://miro.medium.com/max/1039/1*iLP9gUH4weTfsPcmeUbXLw.png)

Luego seleccione "+ Añadir una regla de entrada" para añadir otra regla para el acceso RPC, esto también debe restringirse a solo su IP. Cambiar Fuente a "direcciones IP" e introducir en su IP pública devuelta de Google al campo IP Source. Esta vez cambia el campo "Ranges de destino" a 9650 y selecciona "TCP" como protocolo. Cambie la prioridad a 110 y dle un nombre de "Avalanche\_RPC" y presione Add.

![Imagen para post](https://miro.medium.com/max/914/1*Zg9mHCkU7G5BoinN0EWZAg.png)

Seleccione "+ Añadir una regla de entrada" para añadir una regla final para el Protocolo de Avalanche para que otros nodos puedan comunicarse con su nodo. Esta regla debe estar abierta a todos así que mantenga "Fuente" configurada en "Any". Cambie el rango de puerto de destino a "9651" y cambie el protocolo a "TCP". Ingrese una prioridad de 120 y un nombre de Avalanche\_Protocol y presione Add.

![Imagen para post](https://miro.medium.com/max/662/1*tIMEp7O83NIUitWwlcHAxw.png)

El grupo de seguridad de red debe parecer la siguiente \(aunque su dirección IP pública será diferente\) y presione OK.

![Imagen para post](https://miro.medium.com/max/363/1*7rAR3C_UrX94iXxL4sdV9g.png)

Deja la otra configuración como predeterminada y presiona "Revisar + crear" para crear la máquina virtual.

![Imagen para post](https://miro.medium.com/max/828/1*01yGser7qYjiXDngemqClQ.png)

Primero realizará una prueba de validación. Si recibe un error aquí, asegúrese de seleccionar el modelo de suscripción de Pay-As-You-Go y no está utilizando la suscripción de prueba gratuita ya que no están disponibles las instancias de Spot. Verificar todo se ve correcto y presione "Crear"

![Imagen para post](https://miro.medium.com/max/751/1*HyQP7HJCiVQPPiWodRj6aQ.png)

A continuación, debe recibir un aviso pidiéndole que genere un par de teclas nuevo para conectar su máquina virtual. Seleccione "Descargar la clave privada y crear recursos" para descargar la clave privada en su PC.

![Imagen para post](https://miro.medium.com/max/456/1*FCAVco29fcianH4TjxVGzQ.png)

Una vez que su despliegue haya terminado, seleccione "Ir al recurso"

![Imagen para post](https://miro.medium.com/max/608/1*dXl1RkH6xZvHkdI1d-XsOQ.png)

## Cambiar el tamaño del disco previsto<a id="00dc"></a>

De forma predeterminada, el UVM Ubuntu se aprovisionará con una SSD Premium de 30 GB. Debe aumentar esto a 250 GB, para permitir el crecimiento de la base de datos.

![Imagen para post](https://miro.medium.com/max/880/1*2uJoRLC586qLEhr1RNNeTg.png)

Para cambiar el tamaño del disco, el VM debe ser detenido y deallocated. Seleccione "Parar" y espere a que el estado se muestre deallocated. Luego selecciona "Disks" a la izquierda.

![Imagen para post](https://miro.medium.com/max/976/1*eUCBMgyQtEukvCyi3pm48g.png)

Seleccione el nombre de disco que está disponible para modificarlo

![Imagen para post](https://miro.medium.com/max/696/1*faady6O9ZyS2AvKotRFFWA.png)

Seleccione "Tamaño + rendimiento" en la izquierda bajo la configuración y cambie el tamaño a 250 GB y presione "Cambiar el tamaño".

![Imagen para post](https://miro.medium.com/max/850/1*zZhh27myfdBcEhf3QMhs3A.png)

Hacer esto ahora también extenderá la partición automáticamente dentro de ubuntu. Para volver a la página de vista general de la máquina virtual, seleccione Avalanche en la configuración de navegación.

![Imagen para post](https://miro.medium.com/max/946/1*RGlKMhmlZ1__6u3RjFSDMA.png)

Entonces comience el VM

![Imagen para post](https://miro.medium.com/max/929/1*vgVR-3sRejyBcXrMn65v5g.png)

## Conecte al Nodo Avalanche<a id="8bb7"></a>

Las siguientes instrucciones muestran cómo conectarse a la máquina virtual desde una máquina Windows 10. Para obtener instrucciones sobre cómo conectarse desde una máquina ubuntu vea el [tutorial AWS](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

En su PC local, cree una carpeta en la raíz de la unidad C: llamada Avalanche y luego mueva el archivo Avalanche\_key.pem que descargado antes en la carpeta. Luego haga clic derecho en el archivo y seleccione Propiedades. Ve a la pestaña de seguridad y selecciona "Avanzado" en la parte inferior

![Imagen para post](https://miro.medium.com/max/719/1*KlzhuVcn5Vt0imxDPblBtA.png)

Seleccione "Desactivar herencia" y luego "Eliminar todos los permisos heredados de este objeto" para eliminar todos los permisos existentes en ese archivo.

![Imagen para post](https://miro.medium.com/max/740/1*VxuomVeWbhYquRynA8hP4Q.png)

Luego seleccione "Añadir" para añadir un nuevo permiso y elija "Seleccionar un director" en la parte superior. Desde el cuadro emergente ingrese en su cuenta de usuario que utiliza para iniciar sesión en su máquina. En este ejemplo me conecté con un usuario local llamado Seq, puede tener una cuenta de Microsoft que utiliza para iniciar sesión, así que utilice cualquier cuenta que inicie sesión en su PC con y presione "Nombres de verificación" y debe subrayarlo para verificar y presionar OK.

![Imagen para post](https://miro.medium.com/max/758/1*sMxk7zaRHVTqA0UyHTKwzQ.png)

Luego de la sección de permisos asegúrese de que solo "Leer y Ejecutar" y "Leer" se seleccionen y presionen OK.

![Imagen para post](https://miro.medium.com/max/903/1*5Fkh3FJQuNeWQyEd0irjtA.png)

Debe parecer algo como lo siguiente, excepto con un nombre de PC / cuenta de usuario diferente. Esto solo significa que el archivo clave no puede ser modificado o accedido por ninguna otra cuenta de esta máquina con fines de seguridad para que no puedan acceder a su Node Avalanche.

![Imagen para post](https://miro.medium.com/max/736/1*F-YK0xdB92cIweCQFGGRvA.png)

### Encuentra tu IP pública de Avalanche Node<a id="4687"></a>

Desde el Portal Azure haga una nota de su dirección IP pública estática que ha sido asignada a su nodo.

![Imagen para post](https://miro.medium.com/max/1082/1*5cf1dAAO0G7Dzu2s0Xxh-Q.png)

Para iniciar sesión en el nodo Avalanche, abra el símbolo de comando buscando "cmd" y seleccionando "Command Prompt" en su máquina Windows 10.

![Imagen para post](https://miro.medium.com/max/384/1*NlYlg9of5O9fQtiroqMFZw.png)

Luego utilice el siguiente comando y reemplace el EnterYourAzureIPHere con la dirección IP estática mostrada en el portal Azure.

ssh -i C: C:\Avalanche\Avalanche\_key.pem ubuntu@EnterYourAzureIPHere

para mi ejemplo es:

ssh -i C:\Avalanche\Avalanche\_key.pem ubuntu@13.74.10.81

La primera vez que te conectes recibirá un aviso pidiendo continuar, ingrese sí.

![Imagen para post](https://miro.medium.com/max/651/1*Hp1AF-03TbO-eRUvuKvZcA.png)

Ahora deberías estar conectado a tu Node.

![Imagen para post](https://miro.medium.com/max/967/1*Kc3rna-3SQV3tnMMLkMi6A.png)

La siguiente sección se toma del excelente tutorial de Colin para [configurar un Nodo Avalanche en el AWS de Amazon](setting-up-an-avalanche-node-with-amazon-web-services-aws.md).

### Actualizar Linux con parches de seguridad<a id="8a1c"></a>

Ahora que estamos en nuestro nodo, es una buena idea actualizarlo a los últimos paquetes. Para hacer esto, ejecute las siguientes órdenes, uno en un momento, en orden:

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

![Imagen para post](https://miro.medium.com/max/793/1*_2UmPN6vabjGe6aihX9KqA.png)

Esto hará que nuestra instancia esté al día con los últimos parches de seguridad para nuestro sistema operativo. Esto también reiniciará el nodo. Daremos al nodo un minuto o dos para arrancar de nuevo, luego iniciaremos sesión de nuevo, igual que antes.

### Configure el Nodo Avalanche<a id="5688"></a>

Ahora tendremos que configurar nuestro nodo Avalanche. Para ello, siga el tutorial [Configurar el Nodo Avalanche con Instalador](set-up-node-with-installer.md) que automatiza el proceso de instalación. Necesitará el "IPv4 Public IP" copiado del portal Azure que hemos creado antes.

Una vez que la instalación esté completa, nuestro nodo debería ser ahora el arranque de la secuencia! Podemos ejecutar el siguiente comando para echar un vistazo al estado más reciente del nodo avalanchego:

```text
sudo systemctl status avalanchego
```

Para comprobar el estado de la correa de arranque, necesitaremos hacer una solicitud al RPC local usando "curl". Esta solicitud es la siguiente:

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

El nodo puede tomar algún tiempo \(hacia arriba de una hora en este momento escribiendo \) para arrancar. El arranque significa que el nodo descarga y verifica la historia de las cadenas. Dale un poco de tiempo. Una vez que el nodo haya terminado de arrancar, la respuesta será:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Siempre podemos utilizar "sudo systemctl status avalanchego" para echar un vistazo al estado más reciente de nuestro servicio como antes, también.

### Consigue tu NodeID<a id="20a7"></a>

Debemos obtener nuestro NodeID si planeamos hacer cualquier validación en este nodo. Esto también se recupera del RPC. Llamamos al siguiente comando curl para obtener nuestro NodeID.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si todo está bien, la respuesta debería parecer algo como:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

Esa porción que dice, "NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR" es nuestro NodeID, todo el asunto. Copiar eso y guardar eso en nuestras notas. No hay nada confidencial o seguro sobre este valor, pero es un imperativo absoluto para cuando enviamos este nodo para ser un validador.

### Copia de seguridad de sus teclas de toma<a id="ef3e"></a>

Lo último que se debe hacer es respaldar nuestras llaves de seguridad en el evento prematura que nuestra instancia está dañada o terminada. Es solo una buena práctica para nosotros mantener estas llaves. Para respaldarlos, utilizamos el siguiente comando:

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Como antes, necesitaremos sustituir "EnterYourAzureIPHere" por el valor apropiado que hemos recuperado. Esto respalda nuestra clave de fijación y certificado de grapado en la carpeta C:\Avalanche que hemos creado antes.

![Imagen para post](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)

