const Penguun = artifacts.require('./Penguun/Penguun.sol');
const BreedingScience = artifacts.require('./Penguun/BreedingScience.sol');
const Marketplace = artifacts.require('./Marketplace/Marketplace.sol');
const Faucet = artifacts.require('./EtherFaucet/Faucet.sol');

module.exports = function (deployer) {
  // Output to console or a configuration file
  console.log('----------------------------------------------\n');
  console.log({
    Penguun: Penguun.address,
    BreedingScience: BreedingScience.address,
    Marketplace: Marketplace.address,
    Faucet: Faucet.address,
  });
  console.log('----------------------------------------------\n');
};
