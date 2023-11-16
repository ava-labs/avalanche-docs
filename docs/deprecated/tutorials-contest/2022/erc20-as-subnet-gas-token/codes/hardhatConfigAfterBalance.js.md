# HardhatConfigAfterBalance.js

```javascript
require("@nomicfoundation/hardhat-toolbox")
/* Import task from hardhat config */
const { task } = require("hardhat/config")

/* Import deploy function */
require("./scripts/deploy")
/* Import balance function */
require("./scripts/balance")

/* Create deploy task */
task(
  "deploy",
  "Deploy bridges on both networks and deploy AvaxToken, also update the admins"
).setAction(async (taskArgs, hre) => {
  await deploy().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
})

/* Create balance task  */
task("balance", "Get token balance from a network")
  /* Add `from` parameter indication the used network which is either avax or subnet */
  .addParam("from", "Network to get balance from")
  .setAction(async (taskArgs, hre) => {
    await balance(taskArgs.from).catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
  })

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
}
```
