const FlappyBird = artifacts.require('./FlappyBird');

require('chai').use(require('chai-as-promised')).should();

contract('FlappyBird', async (accounts) => {
  let contract;

  before(async () => {
    contract = await FlappyBird.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address;
      assert.notEqual(address, '');
    });

    it('has correct token name', async () => {
      const name = await contract.name();
      assert.equal(name, 'FlappyBirdNFT');
    });

    it('has correct token symbol', async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, 'FPB');
    });
  });

  describe('minting', async () => {
    it('create a new token', async () => {
      await contract.mint(123);
      const balance = await contract.balanceOf(accounts[0]);

      assert.equal(balance, 1);
    });

    it('should be rejected: Token existed', async () => {
      await contract.mint(123).should.be.rejected;
    });

    it('indexing', async () => {
      await contract.mint(456);
      await contract.mint(789);
      const result = await contract.getBirds();
      assert.equal(result.length, 3);
      assert.equal(
        result.map((r) => r.words[0]),
        [123, 456, 789]
      );
    });
  });
});
