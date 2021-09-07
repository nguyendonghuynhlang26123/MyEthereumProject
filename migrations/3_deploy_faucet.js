const Faucet = artifacts.require('./EtherFaucet/Faucet.sol');

module.exports = async function (deployer) {
  await deployer.deploy(Faucet);
  const contract = await Faucet.deployed();
  contract.sendTransaction({ from: '0xB75B39AeD12e1DAE8323AB4E9E5af07f65059f3f', value: web3.utils.toWei('10000', 'ether') });
};
