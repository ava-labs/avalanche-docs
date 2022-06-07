---
sidebar_position: 4
---


# Grafana Dashboards

These are pre-configured Grafana dashboards that work with the setup as shown in [Setting up node monitoring](setting-up-node-monitoring.md). The script in the linked tutorial will automatically install them.

To manually import preconfigured dashboards:

* Open Grafana’s web interface
* Click `+` on the left toolbar
* Select `Import JSON` and then upload the JSON file or paste the contents into `Import via panel json` area
* Select `Prometheus` as Data Source

| Link | Description |
| :--- | :--- |
| [Network](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/network.json) | Dashboard with networking information |
| [Database](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/database.json) | Dashboard with in-depth info about the database operations |
| [Machine](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/machine.json) | Information about the computer node is running on |
| [X-Chain](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/x_chain.json) | Dashboard showing in-depth info about X-Chain operation |
| [P-Chain](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/p_chain.json) | Dashboard showing in-depth info about P-Chain operation |
| [C-Chain](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/c_chain.json) | Dashboard showing in-depth info about C-Chain operation |
| [Subnets](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/subnets.json) | Subnets dashboard, showing information about subnets running on the node |
| [Main Dashboard](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/main.json) | Main dashboard, showing most important info, with links to other dashboards, useful as a starting point |

