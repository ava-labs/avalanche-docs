# Avalanche Stats

## Introduction

We have created a [stats][https://stats.avax.network/] website from where you can learn a lot of things about avalanche's current stats.

## What are included?

We have 3 main areas in our stats: Staking, Validator Health Check and C-Chain Activity.

## Staking

You can access this part from [this][https://stats.avax.network/dashboard/staking/] link from which you will get following info:

* Active Validator Count
* Active Delegation Count
* Total Stake
* Average Validator Weight
* Stake Offline
* Stake Benched
* Validator/Delegator Count (graphically)
* Validator/Delegator Stake (graphically)
* Average Validator Weight (graphically)
* Stake Version Distribution 
* Delegationg Fee Distribution
* Validator Weight Distribution (graphically)
* Validator Stake Distribution (graphically)
* Delegation Stake Distribution
* Responsive Validators
* Trending Responsive
* Unresponsive Validators
* Trending Unresponsive
* Offline Nodes
* Benched Nodes
* Unresponsive Stake (last 48 hours, graphically)
* Benched Stakes for each Chain
* Offline Nodes Table
* Inaccessible Nodes Table
* Benched Nodes Table

## Validator Health Check

When you enter a node id to [this][https://stats.avax.network/dashboard/validator-health-check/] link, you can see these information about that node:

### Is my validator OK?

Attention, this is not for online-offline status.

### Is my validator responsive (not "benched")? 

When a node doesn't respond to queries from other nodes for 5 minutes, it will temporarily be considered offline by other nodes (called "benching"). A benched node can be fixed by upgrading your hardware to the recommended spec.

### Is my validator online?

Offline nodes cannot be connected to by any nodes (staking nor non-staking). An offline node can be fixed by restarting it and/or opening its peering port (9651) to inbound traffic.

### Is my validator accessible?

A node is considered inaccessible if another node cannot connect to it on its advertised ip:port but the node still attempts to connect to other nodes (unlike an offline mode). An inaccessible node can be fixed by opening up the 9651 port (peering port) for inbound connections.

### Weight of your node

Weight is the sum of all stake and delegated stake (in AVAX).

### Time responsive (%)

Time responsive is the percentage of observed time that a particular node was responsive (not offline nor benched).

### Node's version

Shows which version of Avalanchego the node is using.

### Historical Responsiveness

A graph showing the node's 2-week resposiveness.

### Stake amount

Amount of staked by your node (in AVAX).

### Delegation Fee (%)

You can learn more about this from [here][https://docs.avax.network/learn/platform-overview/staking#delegator-rewards]

### Delegators

Shows how many delegates the node has.

### Delegations

Shows the amount delegates have staked on your node.

### Benched, Offline and Inaccessible (last 48 hours)

Those are graphichs that shows your node's status for benched, offline and inaccessible status.

## C-Chain Activity

You can see our C-Chain stats from [here][https://stats.avax.network/dashboard/c-chain-activity/].

### Max TPS Observed (All-Time, last 7 days, last 30 minutes)

Don't think this is the limit for Avalanche. We got 11000+ tps according to the tests we made on amazon servers located in different points around the world. 

### Block Size (Last 2000)

You can see the last 2000 block's size (KB) in this graphic.

### Tx Count (Last 2000)

You can see how many transactions were in the last 2000 block in this graphic.

### Minumum Gas Price (Last 2000)

Minumum gas price for the last 2000 block.

### Minumum Gas Price (Last 8 hours)

Minumum gas price for the last 8 hours.

### Daily Fees Burned

Shows how much gas is burned in every day.

### Daily Gas Used

Shows how much gas is used in every day.

### Daily Tx Count

Shows how many transaction were made in every day.

### Cumulative Address Count

Shows how many addresses there are from the start.

### Cumulative Block Count

Shows how many blocks there are from the start.

### Cumulative Tx Count

Shows how many transactions there are from the start.

### Max TPS

Shows maximum TPS per day.

### Average TPS

Shows average TPS per day.

### Import/Export Amount

Shows how many AVAX imported/exported per day.

### C-Chain Contracts Deployed

Shows how many contracts deployed per day.

### Cumulative Contracts Deployed

Shows total contract amount per day.

### Monthly Active Addresses

Shows how many accounts made at least one transaction per month.
