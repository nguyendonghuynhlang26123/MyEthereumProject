const FlappyBird = artifacts.require('./FlappyBird.sol');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = function (deployer) {
  await deployProxy(FlappyBird, [42], { deployer });
};
