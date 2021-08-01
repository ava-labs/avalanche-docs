# Fuji Chainlink Node Deployment

Many projects need access to real-world data, like token prices, for their smart contracts to properly function. Services that provide such data on chain are called [Oracles](https://en.wikipedia.org/wiki/Blockchain_oracle). One of the most popular oracle providers is [Chainlink](https://chain.link/).

In this tutorial, we'll explain the requirements and basics for running your own Chainlink node using AWS and Docker.

It's important to note that nodes can fulfill requests for open APIs out-of-the-box using ChainLink's core [Adapters](https://docs.chain.link/docs/adapters/) without needing any additional configuration.

If you would like to provide data from an authenticated API, you can add an [external adapter](https://docs.chain.link/docs/external-adapters/) to enable connectivity through the Chainlink node.

Hardware requirements are light. The only heavy part is you'll need a blockchain node connection. If you use a 3rd party (defined below), you can use a machine with as little as 10GB of storage and 2GB of RAM.

## **Running From Source**

To run a Chainlink node from source, use the [following instructions](https://github.com/smartcontractkit/chainlink#install).

## Getting started with AWS

We will be using both the EC2 and RDS services available on AWS

If you have not already, create an AWS account. Personally I am using some of their free tier options.

### Database

Use the search bar to navigate to the **RDS** service page. Once in the RDS Dashboard, click on the **Create database** button. Scroll down and select the **PostgreSQL** option and select the version. We'll use `PostgreSQL 12.5-R1`. Next, choose your template. We'll use **Free tier** which will be ok for our needs. In the Settings section, give your database an Identifier, choose a Master username, and Master password.

![Settings](../../.github/chainlinkp1-01-Screen_Shot_2021-07-15_at_6.13.44_AM.png)

Note: Please follow security best practices when configuring your DB, VPC, and Security groups.

In the `Connectivity` section choose **Create new VPC** in the Virtual private cloud (VPC) dropdown. Make sure public access is enabled. In VPC security group, select **Create new** to create a new VPC security group. Name your new security group and make sure that your database port is 5432.

![Connectivity](../../.github/chainlinkp1-02-Screen_Shot_2021-07-15_at_6.28.09_AM.png)

Scroll down to Additional configuration, and in Database options, assign an Initial database name. In production you will need to carefully select additional configuration options, but for testing purposes you can just deselect them.

Finally, click **Create database!** Your database will begin initializing, and we can move on to the next step!

### Security Configuration

In Connectivity & Security, select the security group in the VPC security groups list, and select the security group (in our case `sg-00234c32348c8b0a6`).

![Security group](../../.github/chainlinkp1-03-Screen_Shot_2021-07-15_at_6.59.14_AM.png)

Once selected, scroll to inbound rules and select Edit inbound rules by selecting **Add rule**, entering `SSH` for type, and `0.0.0.0/0`for source, allowing inbound SSH connections to our server. When done, select **Save rules!**

Note: If you have problems connecting later or your instance is timing out, Revisit your VPC security group settings and make sure the rules look as the following:

![Inbound rules](../../.github/chainlinkp1-04-Screen_Shot_2021-07-15_at_9.14.05_AM.png)

Now that our security group is configured, we can deploy our EC2 instance!

### Virtual Server

In a new tab, go to AWS console and navigate to the EC2 Service dashboard:

![EC2](../../.github/chainlinkp1-05-Screen_Shot_2021-07-15_at_6.38.25_AM.png)

Click on the **Launch instance** button and select **Launch instance**. This will take you through instance configuraiton steps. In Step 1, select **Amazon Linux 2 AMI**, in Step 2, select `t2.small` instance type.

Note: you may incur a small charge (around $0.0464 per On Demand Instance Hour) to your AWS account

Next, in Step 3 match your instance's network to your Database's VPC by selecting it from the `Network` dropdown. 

![Network](../../.github/chainlinkp1-06-Screen_Shot_2021-07-15_at_9.38.15_AM.png)

You can click through Steps 4 and 5 leaving the default options selected. On Step 6, the `Configure Security Group` page, select an existing security group and choose the group we configured earlier. Click the `Review and Launch` button. A window will pop up where we will create a new key pair. Name your private key file and download it.

![SSH keys](../../.github/chainlinkp1-07-Screen_Shot_2021-07-15_at_9.45.53_AM.png)

Make sure you save the key files securely, as you will need them to access the server. If you lose them you won't be able to download them later!

# **Launch Instances!**

## **Using Docker**

It's recommended to run the Chainlink node with [Docker](https://www.docker.com/). This is because they continuously build and deploy the code from their [repository on Github](https://github.com/smartcontractkit/chainlink), which means you don't need a complete development environment to run a node.

When your instance is initialized, Click on the **Connect** button and then choose your connection method. We will be using the browser terminal by selecting **Connect**, but you can use any SSH client if you configure it with the SSH keys you downloaded earlier.

![Connecting to instance](../../.github/chainlinkp1-08-Screen_Shot_2021-07-15_at_7.12.00_AM.png)

Run the Commands

```bash
sudo amazon-linux-extras install -y docker
sudo systemctl start docker
sudo gpasswd -a $USER docker
exit
```

Note: The last command will log you out of the instance. When this happens, simply reconnect.

Make a directory and create and Environment file:

```bash
mkdir ~/.chainlink-fuji
echo \"ROOT=/chainlink
LOG_LEVEL=debug
ETH_CHAIN_ID=43113
MIN_OUTGOING_CONFIRMATIONS=2
LINK_CONTRACT_ADDRESS=0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846
CHAINLINK_TLS_PORT=0
SECURE_COOKIES=false
GAS_UPDATER_ENABLED=true
ALLOW_ORIGINS=*\" > ~/.chainlink-fuji/.env
ETH_URL=wss://api.avax-test.network/ext/bc/C/ws
```

Note: echo may not work on AWS, so you may have to create the .env parameters file in an editor. For example by using `nano`, enter `nano ~/.chainlink-fuji/.env`. When started, copy and paste:

```bash
ROOT=/chainlink
LOG_LEVEL=debug
ETH_CHAIN_ID=43113
MIN_OUTGOING_CONFIRMATIONS=2
LINK_CONTRACT_ADDRESS=0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846
CHAINLINK_TLS_PORT=0
SECURE_COOKIES=false
GAS_UPDATER_ENABLED=true
ALLOW_ORIGINS=*
ETH_URL=wss://api.avax-test.network/ext/bc/C/ws
DATABASE_URL=postgresql://$USERNAME:$PASSWORD@$SERVER:$PORT/$DATABASE
DATABASE_TIMEOUT=0
```

into the editor, and press `ctrl-x` and `y` to save.

Note: Run the command:

```bash
cat ~/.chainlink-fuji/.env
```

to ensure that contents of the file are correct.

Note: Chain IDs and Chainlink Token contract addresses on Fuji testnet can be found on the [official Chainlink website](https://docs.chain.link/docs/link-token-contracts/#fuji-testnet).

Next, we will configure our Database parameters in our .env file. Navigate to your RDS dashboard and select your Database instance. Find your database endpoint under Connectivity & security (this will be your "SERVER" parameter):

![Server](../../.github/chainlinkp1-09-Screen_Shot_2021-07-15_at_7.37.22_AM.png)

Find your DB name in Configuration:

![DB name](../../.github/chainlinkp1-10-Screen_Shot_2021-07-15_at_7.38.24_AM.png)

Reconnect to your terminal instance and edit your .env file to enter your actual database connection string in the DATABASE_URL section. Using the parameters like in the above screenshots, it would be:

```bash
DATABASE_URL=postgresql://postgres:notmyrealpassword@fuji1-db.cyovstjp94og.us-east-2.rds.amazonaws.com:5432/fuji1
```

Save the file and double-check that the environment file looks correct. Now that our Environment file is configured we can start our Chainlink node!

### Start the Chainlink Node

Navigate to the [Chainlink docker hub](https://hub.docker.com/r/smartcontract/chainlink/tags) and copy the pull command for the Chainlink smart contract image. We will be using version 0.10.9:

![Docker image](../../.github/chainlinkp1-11-Screen_Shot_2021-07-15_at_7.51.41_AM.png)

Paste the copied the command into your EC2 instance terminal. Then, to start the node run the command

```bash
cd ~/.chainlink-fuji && docker run -p 6688:6688 -v ~/.chainlink-fuji:/chainlink -it --env-file=.env smartcontract/chainlink:0.10.9 local n
```

Note: set your chainlink package version here > smartcontract/chainlink:<version>

You will be prompted to enter and confirm a new Keystore password, API email, and API Password.

Note: Keystore password must be at least 12 characters and have 3 Uppercase Letters

Once you assign your credentials, your node will start, and you will see network activity occur in your terminal!

![Node output](../../.github/chainlinkp1-12-Screen_Shot_2021-07-15_at_8.48.55_AM.png)

### Chainlink operator GUI

Now that we have our node up and running, we can access the Chainlink node operator GUI. Open a new terminal on your local device and CD into the directory containing your Keyfile we downloaded earlier (`.pem` file). Next, Run the command `chmod 400 <your key file>` to set the correct permissions.

Next, run the command:

```bash
ssh -i $KEY $USER@$REMOTE-IP -L 6688:localhost:6688 -N
```

To create an SSH tunnel for your node.

Note: Parameters for your instance can be found in the ssh tab of your "connect to instance" tab. For example:

![SSH tunnel](../../.github/chainlinkp1-13-Screen_Shot_2021-07-15_at_9.09.47_AM.png)

You may not see activity in your chainlink server terminal, this is ok! Open [http://localhost:6688/](http://localhost:6688/) in a new browser tab and sign in to the node operator GUI using the API credentials you provided during node deployment. Once you are logged in, you will see your node operator dashboard:

![Operator dashboard](../../.github/chainlinkp1-14-Screen_Shot_2021-07-15_at_10.06.29_AM.png)

Here is where you will create jobs for your Node!

Closing Notes:

This process should translate to google cloud. One issue I found on that end was identifying the port number and DB name.

If you don't plan on running the node long term,  you should stop your EC2 Instance to prevent usage when you are away

You may have to re-initiate docker when you log back into or restart to your instance

```bash
sudo amazon-linux-extras install -y docker
sudo systemctl start docker
sudo gpasswd -a $USER docker
exit
```

Your instance public DNS may change when you re-start your instance so check that you are using the right DNS before you run the command

```bash
ssh -i $KEY $USER@$REMOTE-IP -L 6688:localhost:6688 -N
```

This can be found in the **SSH client** tab of your **Connect to instance** page

RECORD YOUR PASSWORDS ACCURATELY!

[PT 2 here!](https://www.notion.so/Fulfilling-Requests-d0a2a4813f6f48f1866c9754d5984453)

You can reference Chainlink's docs on the subject here : [https://docs.chain.link/docs/fulfilling-requests/](https://docs.chain.link/docs/fulfilling-requests/)

