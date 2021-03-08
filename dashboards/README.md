# Grafana dashboards

These are pre-configured Grafana dashboards that work with the setup as shown in [Setting up node monitoring](../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md).

To import preconfigured dashboards:

* Open Grafana’s web interface
* Click `+` on the left toolbar
* Select `Import JSON` and then upload the JSON file or paste the contents into `Import via panel json` area
* Select `Prometheus` as Data Source

| Link | Description |
| :--- | :--- |
| [General](general.json) | Dashboard with basic panels showing high-level info |
| [Database](database.json) | Dashboard with in-depth info about the database operations |
| [Machine](machine.json) | Information about the computer node is running on |
| [X-Chain](x_chain.json) | Dashboard showing in-depth info about X-Chain operation |
| [P-Chain](p_chain.json) | Dashboard showing in-depth info about P-Chain operation |
| [C-Chain](c_chain.json) | Dashboard showing in-depth info about C-Chain operation |

