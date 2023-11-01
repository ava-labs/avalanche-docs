---
tags: [Tooling, AvalancheGo APIs]
description: The AvalancheGo Postman collection includes all the public API calls that are available on AvalancheGo instance, allowing you to quickly issue commands to your node and see the response, without having to copy and paste long and complicated `curl` commands.
pagination_label: AvalancheGo Install Script
sidebar_position: 3
---

# Variables

## Variable Types

Variables at different scopes are supported by Postman,
as it follows:

* **Global variables :** A global variable can be used with every collection. Basically,
it allows user to access data between collections. 

* **Collection variables:** They are available for a certain collection
 and are independent of an environment.

* **Environment variables:** An environment allows you to use a set of variables,
which are called environment variables.
Every collection can use an environment at a time,
but the same environment can be used with multiple collections.
This type of variables make the most sense to use with
the Avalanche Postman collection,
therefore an environment file with preset variables is provided

* **Data variables:** Provided by external CSV and JSON files.

* **Local variables:** Temporary variables that can be used in a script. 
For example, the returned block number from querying a transaction
can be a local variable. It exists only for that request,
and it will change when fetching data for another transaction
hash.

![Variables Scope](/img/postman/postman-9-variables.png)

There are two types of variables:

* **Default type :** Every variable is automatically assigned this type when created.

* **Secret type:** Masks variable's value. It is used to store sensitive data. 

:::info
Only default variables are used in the Avalanche Environment file. To learn more about 
using the secret type of variables, please checkout the
[Postman documentation](https://learning.postman.com/docs/sending-requests/variables/#variable-types).
:::



The [environment variables](../avalanchego-postman-collection/setup#environment-import) can be 
used to ease the process of making an API call. A variable contains the preset value of an API
parameter, therefore it can be used in multiple places without having to add the value manually. 

## How to Use Variables

Let's say we want to use both `eth_getTransactionByHash` and `eth_getTransctionReceipt` for a
transaction with the following hash: `0x631dc45342a47d360915ea0d193fc317777f8061fe57b4a3e790e49d26960202`.
We can set a variable which contains the transaction hash, and then use it on both API calls.
Then, when wanting to fetch data about another transaction, the variable can be updated and
the new transaction hash will be used again on both calls.

Below are examples on how to set the transaction hash as variable of each scope.

### Set a Global Variable

Go to Environments

![Variables Scope](/img/postman/postman-10-set-global-var.png)

<!-- vale off -->

Select Globals

<!-- vale on -->

![Variables Scope](/img/postman/postman-11-set-global-var.png)

Click on the Add a new variable area

![Variables Scope](/img/postman/postman-12-set-global-var.png)

Add the variable name and value. Make sure to use quotes.

![Variables Scope](/img/postman/postman-13-set-global-var.png)

Click Save

![Variables Scope](/img/postman/postman-14-set-global-var.png)

Now it can be used on any call from any collection



### Set a Collection Variable

Click on the three dots next to the Avalanche collection and select Edit

![Variables Scope](/img/postman/postman-15-set-collection-var.png)

Go to the Variables tab

![Variables Scope](/img/postman/postman-16-set-collection-var.png)

Click on the Add a new variable area

![Variables Scope](/img/postman/postman-17-set-collection-var.png)

Add the variable name and value. Make sure to use quotes.

![Variables Scope](/img/postman/postman-18-set-collection-var.png)

Click Save

![Variables Scope](/img/postman/postman-19-set-collection-var.png)

Now it can be used on any call from this collection




<!-- vale off -->

### Set an Environment Variable

<!-- vale on -->

Go to Environments

![Variables Scope](/img/postman/postman-10-set-global-var.png)


Select an environment. In this case, it is Example-Avalanche-Environment.

![Variables Scope](/img/postman/postman-20-set-env-var.png)

Scroll down until you find the Add a new variable area and click on it.

![Variables Scope](/img/postman/postman-21-set-env-var.png)

Add the variable name and value. Make sure to use quotes.

![Variables Scope](/img/postman/postman-22-set-env-var.png)

Click Save.

![Variables Scope](/img/postman/postman-23-set-env-var.png)

The variable is available now for any call collection that uses this environment.


### Set a Data Variable

Please check out [this guide](https://www.softwaretestinghelp.com/postman-variables/#5_Data)
and [this video](https://www.youtube.com/watch?v=9wl_UQtRLw4) on how to use data variables.

### Set a Local Variable

Please check out [this guide](https://www.softwaretestinghelp.com/postman-variables/#4_Local)
and [this video](https://www.youtube.com/watch?v=gOF7Oc0sXmE) on how to use local variables.













