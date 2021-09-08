const Penguun = artifacts.require('./Penguun/Penguun.sol');
const BreedingScience = artifacts.require('./Penguun/BreedingScience.sol');
const Marketplace = artifacts.require('./Marketplace/Marketplace.sol');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const penguunReceiver = '0xf2527506c1F44aD22Ec62e6f5F91D83E7C31aF17';

  const breedingContract = await deployProxy(BreedingScience, [4], { deployer });
  console.log('Deployed breedingContract: ', breedingContract.address);

  const penguunContract = await deployProxy(Penguun, [breedingContract.address, penguunReceiver], { deployer });
  console.log('Deployed penguunContract: ', penguunContract.address);

  const marketplaceContract = await deployProxy(Marketplace, [penguunContract.address], { deployer });
  console.log('Deployed marketplaceContract: ', marketplaceContract.address);

  await penguunContract.setMarketplaceContract(marketplaceContract.address);

  await marketplaceContract.createMarketItem(6, '40000000000000000');
  await marketplaceContract.createMarketItem(7, '50000000000000000');
  await marketplaceContract.createMarketItem(8, '60000000000000000');
  await marketplaceContract.createMarketItem(9, '70000000000000000');
};
