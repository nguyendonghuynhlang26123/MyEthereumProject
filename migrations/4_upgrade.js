const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Penguun1 = artifacts.require('Penguun');
const Penguun2 = artifacts.require('Penguun');

module.exports = async function (deployer) {
  const existing = await Penguun1.deployed();
  const instance = await upgradeProxy(existing.address, Penguun2, { deployer });
  console.log('Upgraded', instance.address);
};
