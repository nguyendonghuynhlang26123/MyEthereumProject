import { TagIcon } from '@heroicons/react/outline';
import React from 'react';
import { PenguunImg } from '../../components';
import { Context } from '../../components/contexts/ContractDataContext';
import { FixPriceSellingBox } from './FixPriceSelling';

export const Selling = ({ penguun }) => {
  const [modeSelected, setMode] = React.useState(0);
  const [limit, setPriceLimit] = React.useState({ min: 0.01, max: 1000, fee: 0 });
  const { marketContract, nftContract, account, web3 } = React.useContext(Context);
  React.useEffect(() => {
    if (marketContract) {
      handleLoadMarketLimits().then((res) => {
        console.log('log ~ file: Selling.tsx ~ line 16 ~ handleLoadMarketLimits ~ res', res);
        setPriceLimit(res);
      });
    }
  }, []);

  const handleLoadMarketLimits = async () => {
    const returnValue = {
      fee: await marketContract.methods.marketFeeInPercent().call({ from: account }),
      min: await marketContract.methods.minPrice().call({ from: account }),
      max: await marketContract.methods.maxPrice().call({ from: account }),
    };
    returnValue.fee = Number(returnValue.fee) / 10000;
    returnValue.max = Number(web3.utils.fromWei(returnValue.max, 'ether'));
    returnValue.min = Number(web3.utils.fromWei(returnValue.min, 'ether'));
    // returnValue.min = Number(returnValue.min) / Number(web3.utils.toWei('1', 'ether'));
    return returnValue;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="">
          <span className="bg-main rounded-lg text-white px-4 text-sm">#{penguun.id}</span>
          <h1 className="text-2xl font-bold truncate">{penguun.name}</h1>
          <PenguunImg className=" flip object-cover rounded-md group-hover:opacity-90 my-2 border border-gray-300 w-3/4" dna={penguun.dna} />
        </div>
      </div>
      <div>
        <div className="mt-1">
          <p className="text-sm italic">
            <TagIcon className="h-4 inline mx-1" />
            Market Fee: {limit.fee}%
          </p>
          <h1 className="text-2xl font-bold mb-1 inline">Sell your Penguun</h1>
          <div className="border border-grey-600 rounded-md py-2 px-6 my-2 bg-white">
            <div>
              <div className="text-gray-600">
                <p className="text-center"> {`Choose sale method for ${penguun.name.trim()}`} </p>
              </div>

              <div className="mb-2 mt-4 grid grid-cols-2 gap-6 w-full px-2">
                <button
                  className={`border w-full flex justify-center items-center rounded py-2  font-bold hover:opacity-50 ${
                    modeSelected == 0 ? 'bg-main text-white' : 'text-main border-main  text-md '
                  }`}
                  onClick={() => {
                    setMode(0);
                  }}
                >
                  Fixed price
                </button>
                <button
                  className={`border w-full flex justify-center items-center rounded py-2  font-bold hover:opacity-50 ${
                    modeSelected == 1 ? 'bg-main text-white' : 'text-main border-main  text-md '
                  }`}
                  onClick={() => {
                    setMode(1);
                  }}
                >
                  Auction
                </button>
              </div>
              {modeSelected == 0 ? <FixPriceSellingBox {...limit} penguunId={penguun.id} /> : <div></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
