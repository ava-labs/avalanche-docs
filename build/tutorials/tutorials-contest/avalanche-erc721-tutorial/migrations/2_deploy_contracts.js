const Collectible = artifacts.require('Collectible')
const Marketplace = artifacts.require('Marketplace')

module.exports = async (deployer, network, [owner]) => {
    await deployer.deploy(Collectible)
    await deployer.deploy(Marketplace)
}