```javascript
const { ethers } = require("ethers")
const dotenv = require("dotenv")
dotenv.config()

module.exports = (providers) => {
  /* 
		Since we will have a bridge admin account to deploy and interact with bridges
   		and a user account that is using the bridge.
   		We have 2 different accounts to interact with bridges on 2 different chains
   		Therefore, we have to create 4 wallets
   */
  const avaxBridgeAdmin = new ethers.Wallet(
    process.env.BRIDGE_ADMIN_PRIVATE_KEY,
    providers.avax
  )
  const avaxBridgeUser = new ethers.Wallet(
    process.env.BRIDGE_USER_PRIVATE_KEY,
    providers.avax
  )
  const subnetBridgeAdmin = new ethers.Wallet(
    process.env.BRIDGE_ADMIN_PRIVATE_KEY,
    providers.subnet
  )
  const subnetBridgeUser = new ethers.Wallet(
    process.env.BRIDGE_USER_PRIVATE_KEY,
    providers.subnet
  )
  return {
    avax: { admin: avaxBridgeAdmin, user: avaxBridgeUser },
    subnet: { admin: subnetBridgeAdmin, user: subnetBridgeUser },
  }
}
```

:::info

As you see, we have used `process.env.<..._PRIVATE_KEY>`. Reason behind that is we do not want to expose our private keys inside our code. To install the related package run:

```bash
npm i dotenv
```

Then, at the root of the project create a file named `.env`. Afterwards put in the private keys of your accounts as follows:

```text
BRIDGE_ADMIN_PRIVATE_KEY=<private-key-for-admin>
BRIDGE_USER_PRIVATE_KEY=<private-key-for-user>
```

- Make sure that both accounts are funded on both chains so that they can send transactions.
- Make sure that `.env` file is included in your `.gitignore` file so that you do not upload this file to git.

:::
