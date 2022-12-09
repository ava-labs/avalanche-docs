# HardhatConfigAfterDeploy.js

```javascript
require("@nomicfoundation/hardhat-toolbox")
/* Import task from hardhat config */
const { task } = require("hardhat/config")

/* Import deploy function */
require("./scripts/deploy")

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

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
}
```
