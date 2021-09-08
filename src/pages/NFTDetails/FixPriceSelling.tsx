import React from 'react';
import { Context } from '../../components/contexts/ContractDataContext';
import { useHistory } from 'react-router-dom';

export const FixPriceSellingBox = ({ penguunId, min, max, fee }) => {
  const history = useHistory();
  const [confirmation, setConfirm] = React.useState(false);
  const [fixPrice, setFixPrice] = React.useState(min);
  const { marketContract, account, web3, nftContract } = React.useContext(Context);
  const [priceAfterFee, setPriceAfterFee] = React.useState(0.001);

  React.useEffect(() => {
    setPriceAfterFee(fixPrice - fixPrice * fee);
  }, [fixPrice]);

  const handleSellFixedPrice = async () => {
    if (fixPrice < min && fixPrice > max) {
      alert('Price too low or too high');
      return;
    }
    //Approve first
    await nftContract.methods.approve(marketContract._address, penguunId).send({ from: account });

    return marketContract.methods.createMarketItem(penguunId, web3.utils.toWei(fixPrice.toString(), 'ether')).send({ from: account });
  };

  return (
    <div>
      <p className="text-sm py-2 px-4">
        Your asset will be listed on the Martketplace with the fixed price. You will not be able to play with this penguun until you got it back by canceling
        the sale!
      </p>
      <div className="mt-4 px-4 flex flex-row items-center gap-2">
        <input
          className="checked:bg-main checked:border-transparent"
          id="confirmation"
          type="checkbox"
          checked={confirmation}
          onChange={(ev) => setConfirm(ev.target.checked)}
        />
        <label htmlFor="confirmation" className="cursor-pointer text-sm">
          I understand and agree with the process!
        </label>
      </div>
      <div className={`py-1 px-4 flex  ${!confirmation && 'cursor-not-allowed opacity-20'}`}>
        <input
          type="number"
          value={fixPrice}
          onChange={(ev) => {
            if (confirmation) setFixPrice(Number(ev.target.value));
          }}
          min={min}
          max={max}
          className="w-full py-1 px-5 border -mr-14 border-gray-400 rounded-l focus:outline-none"
        />
        <button
          className={`bg-main rounded-r py-1 px-4 text-white font-bold`}
          onClick={() => {
            if (confirmation)
              handleSellFixedPrice()
                .then(() => {
                  alert('Your penguun now is on sale!');
                  history.reload();
                })
                .catch((err) => alert('Operation rejected'));
          }}
        >
          Sell
        </button>
      </div>
      <p className=" mb-4 px-4 text-xs">{`You'll receive ${priceAfterFee} ETH after selling this penguun`} </p>
    </div>
  );
};
