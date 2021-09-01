# Tableros de Grafana

Estos son tablas de dashboards de Grafana configuradas que funcionan con la configuración como se muestra en la configuración de la [monitorización de nodos](../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md).

Para importar dashboards preconfigurados:

* Abre la interfaz web de Grafana
* Haz clic en la barra `+`de herramientas izquierda
* Selecciona `Import JSON`y luego sube el archivo JSON o pega el contenido en la `Import via panel json`zona
* Selecciona como fuente `Prometheus`de datos

| Enlace | Descripción |
| :--- | :--- |
| [Red](network.json) | Dashboard con información de redes |
| [Base](database.json) | Dashboard información en profundidad sobre las operaciones de la base de datos |
| [Máquina](machine.json) | Información sobre el nodo de computadora |
| [X-Chain](x_chain.json) | Dashboard, que muestra información en profundidad sobre la operación de X-Chain |
| [P-Chain](p_chain.json) | Dashboard, que muestra información en profundidad sobre la operación de P-Chain |
| [C-Chain](c_chain.json) | Dashboard, que muestra información en profundidad sobre la operación de C-Chain |
| [Dashboard principal](main.json) | Panel de dashboard, mostrando la información más importante, con enlaces a otros tableros, útiles como punto de partida |

