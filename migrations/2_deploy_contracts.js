const Penguun = artifacts.require('./Penguun/Penguun.sol');
const BreedingScience = artifacts.require('./Penguun/BreedingScience.sol');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const breedingContract = await deployProxy(BreedingScience, { deployer });
  console.log('log ~ file: 2_deploy_contracts.js ~ line 7 ~ breedingContract', breedingContract);
  await deployProxy(Penguun, breedingContract.address, { deployer });
};
