const Penguun = artifacts.require('./Penguun');

require('chai').use(require('chai-as-promised')).should();

contract('Penguun', async (accounts) => {
  let contract;

  before(async () => {
    contract = await Penguun.deployed('0x5ed8028d2DEbEa22Dd21d6f21d907f2EaFdb947E');
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address;
      assert.notEqual(address, '');
    });

    it('has correct token name', async () => {
      const name = await contract.name();
      assert.equal(name, 'Penguun the penguin');
    });

    it('has correct token symbol', async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, 'PENGUUN');
    });
  });

  describe('get ids', async () => {
    it('should return 4 penguun ids', async () => {
      const result = await contract.getMyPenguunIds({ from: accounts[0] });
      console.log(accounts[0]);
      assert.equal(result.length, 4);
    });
  });

  describe('minting', async () => {
    it('create a new token', async () => {});

    it('should be rejected: Token existed', async () => {});

    it('indexing', async () => {});
  });
});
