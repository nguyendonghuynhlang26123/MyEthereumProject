const LHCToken = artifacts.require('./ERC20/LHCToken.sol');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const erc20Receiver = '0xf2527506c1F44aD22Ec62e6f5F91D83E7C31aF17';

  const erc20Token = await deployProxy(LHCToken, [erc20Receiver], { deployer });
  console.log('Deployed erc20Token: ', erc20Token.address);
};
