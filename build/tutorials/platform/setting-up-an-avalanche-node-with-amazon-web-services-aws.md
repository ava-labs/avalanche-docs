# Set Up an Avalanche Node with Amazon Web Services \(AWS\)

## Introduction

The Avalanche consensus protocol garnered a lot of attention from token fanatics. The decentralized protocol enables Proof of Stake rewards in a way that token holders have never seen before. With the network being green, requiring very low compute to run your staking node, and with the lack of a limit to the number of stakers on the network, many newcomers are interested in starting their node with high availability.

We will step through the process of setting up key pairs, security groups, and launching a node on [Amazon Web Services \(AWS\)](https://aws.amazon.com/). Then, we will log into this node and install the Avalanche software as a service to ensure that our node runs as long as the machine is running. This tutorial assumes absolutely nothing about our AWS hosting environment and will go through each step with as few assumptions possible.

## The Logistics of Cloud Hosting a Node <a id="211d"></a>

Cloud providers such as [DigitalOcean](https://www.digitalocean.com/), [Azure](https://azure.microsoft.com/en-us/), [Rackspace](https://www.rackspace.com/), and [AWS](https://aws.amazon.com/) provide high-availability environments. While at-home nodes are a solid option, these services are a good candidate for running a node that is guaranteed to reach [minimum uptime requirements \(60% at the time of writing\)](../../../learn/platform-overview/staking.md). With multiple regions and a wide variety of machines available, AWS is the most common choice for cloud providers in the U.S. today.

The best part? **You do not need to put your private keys onto a node to begin validating on that node.** Even if someone breaks into your cloud environment and gains access to the node, the worst they can do is turn off the node. It is, however, advisable that all staking certificates are backed up just in case a full node rebuild is necessary. This will only impact rewards when the machine itself is in such distress \(or terminated entirely\) that a complete rebuild is necessary.

To get started, we need:

* an Internet connection
* an AWS account
* the ability to SSH into a machine \(this tutorial uses Openssh and a command line, but PuTTy on Windows could work just as well\)
* a good place to store and back up staking certificates and \*.pem key pair files

## Step 1 — Log Into AWS <a id="ff31"></a>

We need an AWS account. This sign-up process is outside of the scope of this article, but Amazon has instructions [here](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account).

It is also _highly_ recommended that we set up Multi-Factor Authentication on our root user account to protect it. Again, Amazon has documentation for this, found [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root).

Once completed, we can begin creating our EC2 instance. EC2 is a service provided by AWS to enable AWS users to launch virtual machine instances in the cloud. These virtual machines are small computing environments running an Operating System of your choice. To enter the EC2 panel after logging into AWS, click the EC2 link on the management console.

![](../../../.gitbook/assets/image%20%2816%29.png)

## Step 2 — Create AWS Key Pairs <a id="d2a5"></a>

![](../../../.gitbook/assets/image%20%2819%29.png)

To log in to our node’s instance on AWS, we must download key pairs from AWS which will grant us access to our host. Key pair files are used by programs like OpenSSH or PuTTy to access our hosts. We’re going to first generate this key pair so that we can assign it to our AWS instance later in the tutorial. We begin by selecting the Key Pairs link on the sidebar of the EC2 console.

We’re going to click “Create key pair” to launch the key pair creation wizard.

![Image for post](https://miro.medium.com/max/847/1*UZ4L0DGUogCfBq-TZ5U3Kw.png)

We will name our key pair and select a file format. In this picture, we named our key pair “avalanche” and selected the “pem” file format as the rest of the tutorial will use OpenSSH. If we wanted to use PuTTy on Windows, the “ppk” file format would be the better option. If we want, we can optionally add tags for our key pair to assist with tracking. In the below key pair we gave it the tag “Name” and the value “Avalanche Key Pair”.

![Image for post](https://miro.medium.com/max/827/1*Bo30BXjwPTGpgFtoU9VDBA.png)

Next, we click “Create key pair” and if all is well, we’ll see the following success message.

![Image for post](https://miro.medium.com/max/534/1*RGpHRWWFjNKMZb7cQTyeWQ.png)

Tada! Now, we have a key pair we can use to log into our AWS instance later. In the process of creating this key pair, a file was downloaded. In the above example, we named our key pair “avalanche.pem”, but the name will reflect whatever we entered into the form.

This key pair file is highly important. It is the only way to log into our instance we create later. If we lose this, it will be very difficult to recover access to our machine. Anyone with this key pair file will have access to our host, so it is essential to back this key pair file up into a secure place.

## Step 3 — Create a Security Group <a id="f8df"></a>

![Image for post](https://miro.medium.com/max/214/1*pFOMpS0HhzcAYbl_VfyWlA.png)

Security Groups in AWS are templates used for locking down firewall permissions on a host. Since we want to enable some inbound traffic and disable all other traffic, we’ll need to create a custom security group of our own. To start, we’ll select “Security Groups” from the sidebar on the EC2 management page.

This should open the Security Groups panel on the page. Next, we’re going to begin the process of creating a new security group. To do that, we’ll click the “Create security group” button in the top right of the Security Groups panel.

![Image for post](https://miro.medium.com/max/772/1*B0JSYoMBplAtCz2Yb2e1sA.png)

Now we’ll need to open some essential ports to inbound traffic on AWS in our new security group. We’ll keep SSH open, though optionally we can restrict it to our IP address. This can only work if we have a static IP address. Since, like most people, do not have a static IP address, we’ll not go with that option and will leave “Source” open to everyone. We also must open traffic to 9651 so that our node can talk to other nodes on the network. This is what our final Inbound Rules looks like for our new Security Group.

![Image for post](https://miro.medium.com/max/1335/1*MMxwsAuoBNqw3h9UqSDgHA.png)

_**Optionally**_, we may do two more things to our node. If we want to open our API to our public consumption, we can add a rule which sets it to a fixed IP address of our choosing. The API runs on port 9650. In the above inbound rules, we left it closed off by default, but we can open that up if we want. If we add a rule that has port 9650 and “My IP” it’ll use our local IP \(**Warning**: if you’re on DHCP like most home routers are, your local IP can and will change\). We could also make it “Anywhere”, but be warned: that opens your node to anyone who hits its API. Further, we can block port 22 to a specific IP address of our choosing. As above, this comes with the DHCP warning in that your IP address can change, but in this case, you’ll be locked out of your node. **While they are best practices, use these options with caution.**

We’ll add a tag to our new security group. The key is “Name” and the value is “Avalanche Security Group”. This will enable us to know what this security group is when we see it in the list of security groups.

![Image for post](https://miro.medium.com/max/961/1*QehD3uyplkb4RPxddP1qkg.png)

We will click “Create security group”, and if all has gone well, we’ll see our security group in the list of security groups. If we select our security group, the details panel on the bottom will open up with its info. If we did everything right, the details of the Inbound tab will look like this:

![Image for post](https://miro.medium.com/max/750/1*vb2toLo74ZhQGlLCUUxLGA.png)

As a note, we didn’t do anything to modify the outbound rules. This is because the default outbound rules are that our machine can reach out to any other machine. We leave this as it is because we trust our machine and we also want to leave it open to talk to any other node on the network.

## Step 4 — Launching an AWS Instance <a id="0682"></a>

Finally! No more set up, now it’s all content! We’re ready to launch our AWS Instance to host our node. To start, from the EC2 Dashboard, we click the button that says “Launch instance”.

![Image for post](https://miro.medium.com/max/813/1*zsawPDMBFlonC_7kg060wQ.png)

Next, we select the Operating System. We’re going to use either “Ubuntu 20.04 LTS \(HVM\), SSD Volume Type” or “Ubuntu 18.04 LTS \(HVM\), SSD Volume Type”. AvalancheGo’s minimum requirements are for Ubuntu 18.04, but 20.04 works just as well. For this tutorial, we’re going with 18.04, but it should make no cosmetic difference in the procedures we’re going through.

![Image for post](https://miro.medium.com/max/1591/1*u438irkY1UoRGHO6v76jRw.png)

The next step is to select our instance type. AvalancheGo can run on a lot of hardware and has very low CPU requirements. However, the network goes as fast as the minimum machine, and Avalanche has always requested at least 2 vCPUs and 4GB of memory. This makes “c5.large” an ideal instance type for our node. To create a c5.large instance, we select the “Compute-optimized” option from the “Filter by All instance types” drop-down menu.

![Image for post](https://miro.medium.com/max/595/1*tLVhk8BUXVShgm8XHOzmCQ.png)

We then select the checkbox next to the c5.large instance in the table.

![Image for post](https://miro.medium.com/max/883/1*YSmQYAGvwJmKEFg0iA60aQ.png)

And finally, we click the “Next: Configure Instance Details” button in the bottom right-hand corner.

![Image for post](https://miro.medium.com/max/575/1*LdOFvctYF3HkFxmyNGDGSg.png)

In the next step, we’re going to set up our instance details. Almost everything on this page can remain the same. However, there’s a way to save a little money on this page that many people do not take advantage of. It’s called “Spot Instances”. Spot instances are instances that are not guaranteed to always be up, but the trade-off is that they cost much much less on average than persistent instances. At the time of this tutorial, a c5.large instance costs $0.085 USD per hour on AWS. This totals ~$745 USD per year. At the time of this article, spot instances can save 62%, bringing that total down to $462.

### Optional: Saving a Little Money with Spot Instances <a id="c99a"></a>

Spot instances use a supply-and-demand market price structure. As demand for instances goes up, the price for the spot instance goes up. We can set a maximum price we’re willing to pay for the spot instance to 0.08499, and set the instance to “Stop” instead of “Terminate”, and we get whatever the current market value of the computing power is for our instance by the hour. If the market value exceeds $0.08499 for an hour, our instance is stopped and we’ll have to restart it.

This sounds risky until we look at the numbers behind this scenario. There’s a very, very low chance of a shutdown. Much less than 5%, and since we require 60% uptime, we can handle the risk for 62% savings.

![Image for post](https://miro.medium.com/max/858/1*fGbUcMB2WpKSGZ6-xINErQ.png)

To set up a spot instance, we click the “Request Spot instances” box, set our maximum price to $0.08499, check the box next to “Persistent request”, and **very importantly**, change the “Interruption behavior” to “Stop”. Super!

### Continuing Onward, Adding Storage, Adding Tags, Wrapping Up! <a id="dbf5"></a>

Now we click the “Next: Add Storage” button in the bottom right corner of the screen to move on to adding storage.

We need to add additional space to our SD volume to have our node run smoothly on the SSD. We put in 40GB in this example, but that can be more if you feel safer with more space. Remember, the Avalanche database will continually grow until pruning is enabled, so it’s safer to have a larger hard drive allocation for now.

![Image for post](https://miro.medium.com/max/1583/1*02xw5D1P-Ypbf8-k6nS3HQ.png)

To continue, we click “Next: Add Tags” in the bottom right corner of the screen to add tags to our instance. Tags enable us to associate metadata with our instance. Since this instance needs a name, we’re going to give it the key “Name” and the value “My Avalanche Node”. This will make it clear what this node is on our list of EC2 instances.

![Image for post](https://miro.medium.com/max/1295/1*Ov1MfCZuHRzWl7YATKYDwg.png)

Now we’re going to assign the security group we created earlier with our instance. We choose “Select an **existing** security group” from the “Assign a security group” option. Now we choose the Avalanche security group we created in Step 3 of this tutorial.

![Image for post](https://miro.medium.com/max/1062/1*VVwevXxYTnhXMInpaOHV9g.png)

Finally, we click “Review and Launch” in the bottom right. A review page will pop up with the details of what we’re about to launch. We can review those, and if all looks good, we’ll click the blue “Launch” button in the bottom right corner of the screen.

Doing so will ask us to select a key pair for this instance. We’re going to select “Choose an existing key pair” and then select the “avalanche” key pair we made earlier in the tutorial. We check the box acknowledging that we have access to our “pem” or “ppk” file created earlier and then click “Launch Instances” in the bottom-right corner.

![Image for post](https://miro.medium.com/max/700/1*isN2Z7Y39JgoBAaDZ75x-g.png)

We should see a new page pop up that confirms our instance is launching!

![Image for post](https://miro.medium.com/max/727/1*QEmh9Kpn1RbHmoKLHRpTPQ.png)

![Image for post](https://miro.medium.com/max/192/1*BGm6pR_LV9QnZxoWJ7TgJw.png)

AWS uses dynamic IPs for each instance by default. This means our IP address can change for our node. It’s much nicer not to deal with that, so we’re going to use an Elastic IP instead. This is not a hard requirement, but if we want to keep your uptime, it’s important that our node scripts have the IP address. Rather than modify that every time our node restarts, and Elastic IP keeps it static going forward. First step is to enter the Elastic IPs manager and click “Allocate Elastic IP address” at the top right corner of the screen.

![Image for post](https://miro.medium.com/max/503/1*pjDWA9ybZBKnEr1JTg_Mmw.png)

Next, select the region we’re in, choose from Amazon’s pool of IPv4 addresses, and click the “Allocate” button”.

![Image for post](https://miro.medium.com/max/840/1*hL5TtBcD_kR71OGYLQnyBg.png)

This creates a new elastic IP address. We select the elastic IP we just created from the Elastic IP manager. From the “Actions” button in the top right, we choose “Associate Elastic IP address”.

![Image for post](https://miro.medium.com/max/490/1*Mj6N7CllYVJDl_-zcCl-gw.png)

Finally, we’re selecting the instance we just created, as seen below. This will associate the new Elastic IP with our instance and give it a static IP address that wont change.

![Image for post](https://miro.medium.com/max/834/1*NW-S4LzL3EC1q2_4AkIPUg.png)

## Step 5 — Setting Up the Node <a id="829e"></a>

To continue, we’re going to need to make sure our instance is running, and we’re going to need the Public DNS name of our instance to log into it via SSH. This can be seen on the EC2 Dashboard by clicking “Running Instances”. Also, when starting our node, we’ll need the “IPv4 Public IP” address, to get the instance running.

![Image for post](https://miro.medium.com/max/672/1*CHJZQ7piTCl_nsuEAeWpDw.png)

Next, we look through our list of running instances and select our newly created Avalanche node. This opens up the details panel on the bottom of the screen. We’re going to look for the “Public DNS” field and copy that address. That’s the address we can use to log into our AWS instance.

![Image for post](https://miro.medium.com/max/1125/1*3DNT5ecS-Dbf33I_gxKMlg.png)

We’ll copy this address now and continue onward.

**NOTE:** _This article was written by me, Collin Cusce, and I run a Ubuntu box. Logging into the host and copying files will be told from the perspective of a Ubuntu user. There are different steps for those procedures if using Mac OS or Windows, but they are fairly easy to translate to the operations we’re performing here. If anyone wants to provide instructions for those operating systems, I will gladly link to them in this article._

Using our Public DNS value that we copied earlier, we’re going to log into our AWS instance from our local computer. We now will open up a terminal in Ubuntu, navigate to the place we downloaded the “pem” file, and type the following commands:

```text
chmod 400 avalanche.pem
ssh -i avalanche.pem ubuntu@PUBLICDNS
```

We will need to replace the value “PUBLICDNS” with the Public DNS copied earlier.

The first line sets proper permission on our “pem” file. If the permissions are **not** set correctly, we will see the following error.

![Image for post](https://miro.medium.com/max/1065/1*Lfp8o3DTsGfoy2HOOLw3pg.png)

To fix this, we just follow our instructions exactly and change the permissions on the “pem” file.

![Image for post](https://miro.medium.com/max/648/1*G2ViNGO-sVEpouvJDdiUqQ.png)

We may optionally want to move the “pem” file. The ~/.ssh directory is always a popular choice, but for this tutorial, we’re going to assume that we’re working from the same directory as our “pem” file.

The second line logs us into the instance itself.

![Image for post](https://miro.medium.com/max/1030/1*XNdOvUznKbuuMF5pMf186w.png)

Now that we are on our node, it’s a good idea to update it to the latest packages. To do this, run the following commands, one-at-a-time, in order:

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

This will make our instance up-to-date with the latest security patches for our operating system. This will also reboot the node. We’ll give the node a minute or two to boot back up, then log in again, same as before.

Now we’ll need to set up our Avalanche node. To do this, we’ll need to fetch the node package from the latest releases on Github:

```text
cd ~
curl -s https://api.github.com/repos/ava-labs/avalanchego/releases/latest \
| grep "avalanchego-linux-.*tar\(.gz\)*\"" | cut -d : -f 2,3 | tr -d \" | wget -P ~/ -qi -
```

This will download the \*.tar.gz file for the latest release into our home directory \(/home/ubuntu\). Next, we’re going to extract the \*.tar.gz file into a directory called “avalanchego” in our home directory and remove the \*.tar.gz file since we no longer need it.

```text
mkdir -p ~/avalanchego
tar xvf ~/avalanchego-linux-*.tar.gz -C ~/avalanchego --strip-components=1
rm ~/avalanchego-linux-*.tar.gz
```

Our next step is to set up AvalancheGo as a service running on our machine under the “ubuntu” user. To do this, we’re going to create a services file for systemd to read.

```text
sudo nano /etc/systemd/system/avalanchego.service
```

This opens the “nano” text editor. We now copy and paste the following into the text editor. We edit the file in the place where it says, “IPv4PublicIPAddress” and put in our “IPv4 Public IP” copied from earlier in this step \(Step 5\), then hit Ctrl-x to save the file and exit.

```text
[Unit]
Description=AvalancheGo systemd service.
StartLimitIntervalSec=0[Service]
Type=simple
User=ubuntu
ExecStart=/home/ubuntu/avalanchego/avalanchego --plugin-dir=/home/ubuntu/avalanchego/plugins --public-ip=IPv4PublicIPAddress --http-host=
Restart=always
RestartSec=1[Install]
WantedBy=multi-user.target
```

**NOTE:** _By default, this IPv4 Public IP address can change every time this instance is started or stopped. In the event this happens, “/etc/systemd/system/avalanchego.service” must be edited again to add in the new IPv4PublicIPAddress that was generated. To avoid this issue, we could consider allocating an “Elastic IP” which will provide us with a permanent IP address to use. As those are a limited resource, we’re going to go with the generic option, but it would also be a very good idea for us to consider assigning an Elastic IPs instead. AWS’s tutorial on this begins_ [_here_](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)_._

**NOTE2:** _A super community member_ [_Patricio López_](https://medium.com/u/e0b46c913ed7?source=post_page-----1effec72c666--------------------------------) _pointed out that the original article was missing the “http-port” option._

> just a little addon… if you’re running your node with an elastic ip, you also need to set the http-port param to the private IP \(not the elastic\), if you want to connect the node with Postman or CURL

_That has now been added. Thanks Patricio!_

Finally, we run the following commands to give the service file the correct permissions and begin our AvalancheGo service.

```text
sudo chmod 644 /etc/systemd/system/avalanchego.service
sudo systemctl start avalanchego
sudo systemctl enable avalanchego
```

## Step 6 — Wrap It Up! <a id="7a97"></a>

Our node should now begin bootstrapping! We can run the following command to take a peek at the latest status of the avalanchego node:

```text
sudo systemctl status avalanchego
```

![Image for post](https://miro.medium.com/max/1834/1*FVEINyEfuOinqGAhneNGWA.png)

This begins the bootstrapping process on our node. To check the status of the bootstrap, we’ll need to make a request to the local RPC using “curl”. This request is as follows:

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

The node can take some time \(upward of an hour at this moment writing\) to bootstrap. Bootstrapping means that the node downloads and verifies the history of the chains. Give this some time. Once the node is finished bootstrapping, the response will be:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

We can always use “sudo systemctl status avalanchego” to peek at the latest status of our service as before, as well.

We absolutely must get our NodeID if we plan to do any validating on this node. This is retrieved from the RPC as well. We call the following curl command to get our NodeID.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

If all is well, the response should look something like:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM"},"id":1}
```

That portion that says, “NodeID-DznHmm3o7RkmpLkWMn9NqafH66mqunXbM” is our NodeID, the entire thing. Copy that and keep that in our notes. There’s nothing confidential or secure about this value, but it’s an absolute must for when we submit this node to be a validator.

There are other APIs, such as the [Health API](../../apis/health-api.md) available to our node. To enable these APIs, we must modify the ExecStart section of our “/etc/systemd/system/avalanchego.service” file created in Step 5 to include flags that enable these endpoints. Beware: this port is open to the world, so if we enable an RPC, then the world can query this data from our node, which could eat our bandwidth and computing resources.

![Image for post](https://miro.medium.com/max/881/1*Vm-Uh2yV0pDCVn8zqFw64A.png)

The last thing that should be done is backing up our staking keys in the untimely event that our instance is corrupted or terminated. It’s just good practice for us to keep these keys. To back them up, we use the following command:

```text
scp -i avalanche.pem -r ubuntu@PUBLICDNS:/home/ubuntu/.avalanchego/staking ~/aws_avalanche_backup
```

As before, we’ll need to replace “PUBLICDNS” with the appropriate value that we retrieved. This backs up our staking key and staking certificate into a folder called “aws\_avalanche\_backup” in our home directory.

### Upgrading Our Node <a id="9ac7"></a>

AvalancheGo is an ongoing project. Updates are regularly required and it’s essential to keep our node up to date. To update our node to the latest patch, we need to SSH into our AWS instance as before and use the following commands:

```text
cd ~
curl -s https://api.github.com/repos/ava-labs/avalanchego/releases/latest \
| grep "avalanchego-linux-.*tar\(.gz\)*\"" | cut -d : -f 2,3 | tr -d \" | wget -P ~/ -qi -
mkdir -p ~/avalanchego
tar xvf ~/avalanchego-linux-*.tar.gz -C ~/avalanchego --strip-components=1
rm ~/avalanchego-linux-*.tar.gz
sudo systemctl stop avalanchego
sudo systemctl start avalanchego
```

