---
sidebar_position: 4
description: This tutorial will guide you through spinning up an Avalanche node via the one-click validator node through the AWS Marketplace. This includes subscribing to the software, launching it on EC2, connecting to the node over ssh, calling curl commands, adding the node as a validator on the Fuji network using the Avalanche Web wallet, and confirming the node is a pending validator.
---

# Launch an Avalanche Validator on AWS with One Click

## Avalanche Node and AWS Marketplace Video

<iframe src="https://www.youtube.com/watch?v=f5wlq08FcOY"
        width="100%"
        height="480px"
        title="Avalanche Node and AWS Marketplace"
        className="video-container"
        display="initial"
        position="relative"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>

## Deep Dive on the Avalanche Protocol Video

<iframe src="https://www.youtube.com/watch?v=McwrrTq-kTY"
        width="100%"
        height="480px"
        title="Deep Dive on the Avalanche Protocol"
        className="video-container"
        display="initial"
        position="relative"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>


## Introduction

Avalanche is an open-source platform for launching decentralized applications
and enterprise blockchain deployments in one interoperable, highly scalable
ecosystem. Avalanche is the first decentralized smart contracts platform built
for the scale of global finance, with near-instant transaction finality.

With the intention of enabling developers and entrepreneurs to onramp into the
Avalanche ecosystem with as little friction as possible, Ava Labs recently
launched an offering to deploy an Avalanche Validator node via the AWS
Marketplace. This tutorial will show the main steps required to get this node up
and running and validating on the Avalanche Fuji testnet.

## Product Overview

The Avalanche Validator node is available via [the AWS
Marketplace](https://aws.amazon.com/marketplace/pp/prodview-nd6wgi2bhhslg).
There you'll find a high level product overview. This includes a product
description, pricing information, usage instructions, support information and
customer reviews. After reviewing this information you want to click the "Continue to Subscribe" button.

## Subscribe to this Software

Once on the "Subscribe to this Software" page you will see a button which
enables you to subscribe to this AWS Marketplace offering. In addition you'll
see Terms of service including the seller's [End User License
Agreement](https://awsmp-offer-legal-documents-prod-iad.s3.us-east-1.amazonaws.com/prod/arn%3Aaws%3Acatalog%3Aus-east-1%3A%3Aoffer/f2norleeteb3ui74y2aypa0r2/00be9c1c-b4bc-41fa-bef8-2c77d8b28639?X-Amz-Security-Token=FwoGZXIvYXdzEFkaDF2Wax%2F6GPKJo5NMfCKIAmGr6m4cdM0bZ9eenwTY9xri8lgWonpiIqABvO3tfAOTJhA%2B5m979V9JitosI3I%2BCb7A95OGiSet9UecTvkseLyQr%2FALfG78KY%2BmHn3wiO%2FKFapCeyvygxZNYtNOH6hIJivYQ4agK262tU707kHLDXwHFZR42BPSKZXpB6vtDxmD3yu%2BO6lwc3B0qqyRyDKyJlKwsiPIahdxO90HMvYQZx5OMWpM0ZqH2Htr%2B43UR8hHov9h2CJKVJ4L1PlQgbvlIyxCXBbyjEpiNL8BNy9K%2FzLip%2FAjoyBtl7FASvGikQ4WLwa4NcHHZzh1BoTcHNH2z6boRDgGVR0Rmwu4cshml2GxYoHPKeL77SiyyfmdBjJPQ8jPLez0%2B%2Fd41mp8JshMsIYXHuNFM%2B2hSazwrPcEWre8xA%2FxlL2IDx2Lm0n3LEjYmjqJc6NZFHcuXo2LLi9Kf0jvretBj3dHOADL2Y4oXA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230111T072642Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86399&X-Amz-Credential=ASIASPPEMYX2LJWCIFGD%2F20230111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e441c3fd4a801666587b7cde4868f92025d265879f8a0955f4c7040b1f771f53)
and the [AWS Privacy Notice](https://aws.amazon.com/privacy/). After reviewing
these you want to click on the "Continue to Configuration" button.

## Configure this Software

This page lets you choose a fulfillment option and software version to launch
this software. No changes are needed as the default settings are sufficient.
Leave the `Fulfillment Option` as `64-bit (x86) Amazon Machine Image (AMI)`. The
software version is the latest build of [the AvalancheGo full
node](https://github.com/ava-labs/avalanchego/releases), `v1.9.5 (Dec 22, 2022)`, AKA `Banff.5`. 
Also, the Region to deploy in can be left as `US East (N.  Virginia)`. On the right you'll 
see the software and infrastructure pricing. Lastly, click the "Continue to Launch" button.

## Launch this Software

Here you can review the launch configuration details and follow the instructions
to launch the Avalanche Validator Node. The changes are very minor. Leave the
  action as "Launch from Website." The EC2 Instance Type should remain
`c5.2xlarge`. The primary change you'll need to make is to choose a keypair
which will enable you to `ssh` into the newly created EC2 instance to run `curl`
commands on the Validator node. You can search for existing keypairs or you can
create a new keypair and download it to your local machine. If you create a new
keypair you'll need to move the keypair to the appropriate location, change the
permissions and add it to the OpenSSH authentication agent. For example, on
MacOS it would look similar to the following: 

```zsh
# In this example we have a keypair called avalanche.pem which was downloaded from AWS to ~/Downloads/avalanche.pem
# Confirm the file exists with the following command
test -f ~/Downloads/avalanche.pem && echo "avalance.pem exists."

# Running the above command will output the following:
# avalance.pem exists.

# Move the avalanche.pem keypair from the ~/Downloads directory to the hidden ~/.ssh directory
mv ~/Downloads/avalanche.pem ~/.ssh
  
# Next add the private key identity to the OpenSSH authentication agent
ssh-add ~/.ssh/avalanche.pem; 

# Change file modes or Access Control Lists
sudo chmod 600 ~/.ssh/avalanche.pem
```

Once these steps are complete you are ready to launch the Validator node on EC2.
To make that happen click the "Launch" button 

![launch successful](/img/one-click-validator-node/launch-successful.png)

You now have an Avalanche Validator node deployed on an AWS EC2 instance! Copy
the `AMI ID` and click on the `EC2 Console` link for the next step.

## EC2 Console

Now take the `AMI ID`  from the previous step and input it into the search bar
on the EC2 Console. This will bring you to the dashboard where you can find the
EC2 instances public IP address. 

![AMI instance](/img/one-click-validator-node/ami-instance.png)

Copy that public IP address and open a Terminal or command line prompt. Once you
have the new Terminal open `ssh` into the EC2 instance with the following
command. 

```zsh
ssh username@ip.address.of.ec2.instance
```

Now that you are `ssh`ed into the EC2 instance you can run the
`info.isBoostrapped` command to confirm if the Avalanche Validator node has
finished bootstrapping.

### `info.isBootstrapped` Request

```zsh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Once the node is finished bootstrapping, the response will be:

### `info.isBootstrapped` Response

```zsh
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": false
    },
    "id": 1
}
```

**Note** that initially the response is `false`. This is because it takes time
for the node to sync the Avalanche Fuji testnet. When you are adding your node
as a Validator on the Avalanche mainnet you will want to wait for this response
to return `true` so that you don't suffer from any downtime while validating.
For this tutorial we're not going to wait for it to finish syncing as it's not
strictly necessary.

### `info.getNodeID` Request

Next, you want to get the nodeID which will be used to add the node as a
Validator. To get the node's ID you call the `info.getNodeID` jsonrpc endpoint.

```zsh
curl --location --request POST 'http://127.0.0.1:9650/ext/info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID",
    "params" :{
    }
}'
```

### `info.getNodeID` Response

Take a note of the `nodeID` value which is returned as you'll need to use it in
the next step when adding a validator via the Avalanche Web Wallet. In this case
the `nodeID` is `NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5`

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "nodeID": "NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5",
    "nodePOP": {
      "publicKey": "0x85675db18b326a9585bfd43892b25b71bf01b18587dc5fac136dc5343a9e8892cd6c49b0615ce928d53ff5dc7fd8945d",
      "proofOfPossession": "0x98a56f092830161243c1f1a613ad68a7f1fb25d2462ecf85065f22eaebb4e93a60e9e29649a32252392365d8f628b2571174f520331ee0063a94473f8db6888fc3a722be330d5c51e67d0d1075549cb55376e1f21d1b48f859ef807b978f65d9"
    }
  },
  "id": 1
}
```

## Add Node as Validator on Fuji via the Web Wallet

For adding the new node as a Validator on the Mainnet's Primary Subnet we can
use the [Avalanche Web Wallet](https://wallet.avax.network).

![Avalanche Web Wallet](/img/one-click-validator-node/web-wallet.png)

The Avalanche Web Wallet is a web-based application with no middleware or any
kind of server communication. It's written in Vue JS and can be either accessed
online or compiled and run locally. The Avalanche Web Wallet is a multi-faceted
jewel and offers validation/delegation, cross-chain transfers, reward
estimation, asset/key management, and more. 

### The Earn Tab

To add a node as a Validator, first select the "Earn" tab in the left hand nav
menu. Next click the "ADD VALIDATOR" button.

![Avalanche Web Wallet](/img/one-click-validator-node/earn-tab.png)

### The `Earn / Validate` form

Let's look at the input values for the `Earn / Validate` form.

- Node ID: A unique ID derived from each individual node’s staker certificate.
  Use the `NodeID` which was returned in the `info.getNodeID` response. In this
  example it's `NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5`
- Staking End Date: Your AVAX tokens will be locked until this date.
- Stake Amount: The amount of AVAX to lock for staking. On Mainnet the minimum
  required amount is 2,000 AVAX. On Testnet the minimum required amount is 1
  AVAAX.
- Delegation Fee: You will claim this % of the rewards from the delegators on your node.
- Reward Address: A reward address is the destination address of the accumulated staking rewards.

Fill the fields and confirm!  Carefully check the details, and click “Submit”!

![Avalanche Web Wallet](/img/one-click-validator-node/validate-form.png)

### The `AddValidatorTx` Transaction

Once the transaction is successfully issued to the Avalanche Network the list of
transactions in the right column will update with the new `AddValidatorTx`
pushed to the top of the list. Click the magnifying glass icon and a new browser
tab will open with the details of the `AddValidatorTx`. It will show details
such as the total value of AVAX transferred, any AVAX which were burned, the
blockchainID, the blockID, the nodeID of the validator, and the total time which
has elapsed from the entire Validation period.

![Validator transaction](/img/one-click-validator-node/validation-tx.png)

## Confirm that the Node is a Pending Validator on Fuij

As a last step you can call the `platform.getPendingvalidators` endpoint to
confirm that the Avalanche node which was recently spun up on AWS is no in the
pending validators queue where it will stay for 5 minutes.

### `platform.getPendingValidators` Request

```zsh
curl --location --request POST 'https://api.avax-test.network/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY",
        "nodeIDs": []
    },
    "id": 1
}'
```

### `platform.getPendingValidators` Response

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "validators": [
      {
        "txID": "4d7ZboCrND4FjnyNaF3qyosuGQsNeJ2R4KPJhHJ55VCU1Myjd",
        "startTime": "1673411918",
        "endTime": "1675313170",
        "stakeAmount": "1000000000",
        "nodeID": "NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5",
        "delegationFee": "2.0000",
        "connected": false,
        "delegators": null
      }
    ],
    "delegators": []
  },
  "id": 1
}
```

You can also pass in the `NodeID` as a string to the `nodeIDs` array in the request body. 

```zsh
curl --location --request POST 'https://api.avax-test.network/ext/bc/P' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {
        "subnetID": "11111111111111111111111111111111LpoYY",
        "nodeIDs": ["NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5"]
    },
    "id": 1
}'
```

This will filter the response by the `nodeIDs` array which will save you time by
no longer requiring you to search through the entire resonse body for the
nodeID(s).

```zsh
{
  "jsonrpc": "2.0",
  "result": {
    "validators": [
      {
        "txID": "4d7ZboCrND4FjnyNaF3qyosuGQsNeJ2R4KPJhHJ55VCU1Myjd",
        "startTime": "1673411918",
        "endTime": "1675313170",
        "stakeAmount": "1000000000",
        "nodeID": "NodeID-Q8Gfaaio9FAqCmZVEXDq9bFvNPvDi7rt5",
        "delegationFee": "2.0000",
        "connected": false,
        "delegators": null
      }
    ],
    "delegators": []
  },
  "id": 1
}
```

After 5 minutes the node will officially start validting the Avalanche Fuji
testnet and you will no longer see it in the response body for the
`platform.getPendingValidators` endpoint. Now you will access it via the
`platform.getCurrentValidators` endpoint.

## Summary

Avalanche is the first decentralized smart contracts platform built for the
scale of global finance, with near-instant transaction finality. Now with an
Avalanche Validator node available as a one-click install from the AWS
Marketplace developers and entreprenuers can  onramp into the Avalanche
ecosystem in a matter of minutes. If you have any questions or want to follow up
in any way please join our Discord server at <https://chat.avax.network>. For
more developer resources please check out our [Developer
Documentation](https://docs.avax.network).
