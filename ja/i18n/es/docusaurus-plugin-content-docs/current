const Collectible = artifacts.require('Collectible');

const Marketplace = artifacts.require('Marketplace');

module.exports = (function (deployer) {
  deployer.deploy(Collectible);
  deployer.deploy(Marketplace);
} as Truffle.Migration); // because of https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files

export {};