const Penguun = artifacts.require('./Penguun/Penguun.sol');
const BreedingScience = artifacts.require('./Penguun/BreedingScience.sol');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const breedingContract = await deployProxy(BreedingScience, [4], { deployer });
  console.log('Deployed breedingContract: ', breedingContract.address);
  await deployProxy(Penguun, [breedingContract.address], { deployer });
};
