---
tags: [Tooling, Avalanche-CLI]
description: This page demonstrates how to execute a SSH command on all nodes of a Cluster using the Avalanche-CLI.
pagination_label: Execute a SSH command on all nodes of a Cluster.
sidebar_label: Execute a SSH command on a Cluster
sidebar_position: 10
---

# Execute a SSH command on a Cluster

This page demonstrates how to execute a SSH command on a Cluster managed by Avalanche-CLI

:::warning

ALPHA WARNING: This command is currently in experimental mode. Proceed at your own risk.

:::

## Prerequisites

Before we begin, you will need to have:

- A Cluster managed by CLI, either a [Fuji Cluster using AWS](/tooling/cli-guides/create-a-validator-aws),
a [Fuji Cluster using GCP](/tooling/cli-guides/create-a-validator-gcp), or a [Devnet](/tooling/cli-guides/setup-a-devnet),

## SSH Warning

Note: An expected warning may be seen when executing the command on a given cluster for the first time:

```
Warning: Permanently added 'IP' (ED25519) to the list of known hosts.
```

## Get ssh instructions for all clusters managed by the local host

Just execute `node ssh`:

```
avalanche node ssh
Cluster "<clusterName>" (Devnet)
  [i-0cf58a280bf3ef9a1] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@44.219.113.190 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem 
  [i-0e2abd71a586e56b4] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@3.212.206.161 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem 
  [i-027417a4f2ca0a478] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@54.87.168.26 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem 
  [i-0360a867aa295d8a4] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@3.225.42.57 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem 
  [i-0759b102acfd5b585] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@107.21.158.224 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem 
```

## Get the avalanchego PID for all nodes in `<clusterName>`

```
avalanche node ssh <clusterName> pgrep avalanchego
[i-0cf58a280bf3ef9a1] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@44.219.113.190 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem pgrep avalanchego
14508

[i-0e2abd71a586e56b4] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@3.212.206.161 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem pgrep avalanchego
14555

[i-027417a4f2ca0a478] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@54.87.168.26 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem pgrep avalanchego
14545

[i-0360a867aa295d8a4] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@3.225.42.57 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem pgrep avalanchego
14531

[i-0759b102acfd5b585] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@107.21.158.224 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem pgrep avalanchego
14555
```

## Get the avalanchego configuration for all nodes in `<clusterName>`

```
avalanche node ssh <clusterName> cat /home/ubuntu/.avalanchego/configs/node.json
[i-0cf58a280bf3ef9a1] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@44.219.113.190 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem cat /home/ubuntu/.avalanchego/configs/node.json
{
  "bootstrap-ids": "",
  "bootstrap-ips": "",
  "genesis-file": "/home/ubuntu/.avalanchego/configs/genesis.json",
  "http-allowed-hosts": "*",
  "http-allowed-origins": "*",
  "http-host": "",
  "log-display-level": "info",
  "log-level": "info",
  "network-id": "network-1338",
  "public-ip": "44.219.113.190",
  "track-subnets": "giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML"
}
[i-0e2abd71a586e56b4] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@3.212.206.161 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem cat /home/ubuntu/.avalanchego/configs/node.json
{
  "bootstrap-ids": "NodeID-EzxsrhoumLsQSWxsohfMFrM1rJcaiaBK8",
  "bootstrap-ips": "44.219.113.190:9651",
  "genesis-file": "/home/ubuntu/.avalanchego/configs/genesis.json",
  "http-allowed-hosts": "*",
  "http-allowed-origins": "*",
  "http-host": "",
  "log-display-level": "info",
  "log-level": "info",
  "network-id": "network-1338",
  "public-ip": "3.212.206.161",
  "track-subnets": "giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML"
}
[i-027417a4f2ca0a478] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@54.87.168.26 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem cat /home/ubuntu/.avalanchego/configs/node.json
{
  "bootstrap-ids": "NodeID-EzxsrhoumLsQSWxsohfMFrM1rJcaiaBK8,NodeID-6veKG5dAz1uJvKc7qm7v6wAPDod8hctb9",
  "bootstrap-ips": "44.219.113.190:9651,3.212.206.161:9651",
  "genesis-file": "/home/ubuntu/.avalanchego/configs/genesis.json",
  "http-allowed-hosts": "*",
  "http-allowed-origins": "*",
  "http-host": "",
  "log-display-level": "info",
  "log-level": "info",
  "network-id": "network-1338",
  "public-ip": "54.87.168.26",
  "track-subnets": "giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML"
}
[i-0360a867aa295d8a4] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@3.225.42.57 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem cat /home/ubuntu/.avalanchego/configs/node.json
{
  "bootstrap-ids": "NodeID-EzxsrhoumLsQSWxsohfMFrM1rJcaiaBK8,NodeID-6veKG5dAz1uJvKc7qm7v6wAPDod8hctb9,NodeID-ASseyUweBT82XquiGpmUFjd9QfkUjxiAY",
  "bootstrap-ips": "44.219.113.190:9651,3.212.206.161:9651,54.87.168.26:9651",
  "genesis-file": "/home/ubuntu/.avalanchego/configs/genesis.json",
  "http-allowed-hosts": "*",
  "http-allowed-origins": "*",
  "http-host": "",
  "log-display-level": "info",
  "log-level": "info",
  "network-id": "network-1338",
  "public-ip": "3.225.42.57",
  "track-subnets": "giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML"
}
[i-0759b102acfd5b585] ssh -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@107.21.158.224 -i /home/fm/.ssh/fm-us-east-1-avalanche-cli-us-east-1-kp.pem cat /home/ubuntu/.avalanchego/configs/node.json
{
  "bootstrap-ids": "NodeID-EzxsrhoumLsQSWxsohfMFrM1rJcaiaBK8,NodeID-6veKG5dAz1uJvKc7qm7v6wAPDod8hctb9,NodeID-ASseyUweBT82XquiGpmUFjd9QfkUjxiAY,NodeID-LfwbUp9dkhmWTSGffer9kNWNzqUQc2TEJ",
  "bootstrap-ips": "44.219.113.190:9651,3.212.206.161:9651,54.87.168.26:9651,3.225.42.57:9651",
  "genesis-file": "/home/ubuntu/.avalanchego/configs/genesis.json",
  "http-allowed-hosts": "*",
  "http-allowed-origins": "*",
  "http-host": "",
  "log-display-level": "info",
  "log-level": "info",
  "network-id": "network-1338",
  "public-ip": "107.21.158.224",
  "track-subnets": "giY8tswWgZmcAWzPkoNrmjjrykited7GJ9799SsFzTiq5a1ML"
}
```

