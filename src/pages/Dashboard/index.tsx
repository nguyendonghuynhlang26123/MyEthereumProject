import React from 'react';
import { GeneralInfo } from './GeneralInfo';
import { TxHistoryCard } from '../../components/TxHistoryCard';
import { ClockIcon } from '@heroicons/react/outline';
import * as ContractContext from '../../components/contexts/ContractDataContext';
import { TransactionHistory } from './TransactionHistory';

export const Dashboard = () => {
  const { balance, nftContract, account, web3 } = React.useContext(ContractContext.Context);
  const [state, setState] = React.useState({
    myBalance: 0,
    myNFTs: 0,
    myLHC: 0,
  });

  React.useEffect(() => {
    if (nftContract)
      nftContract.methods
        .getMyPenguunIds()
        .call({ from: account })
        .then((res) => {
          setState((prv) => ({
            ...prv,
            myBalance: balance,
            myNFTs: res,
          }));
        });
  }, [web3]);
  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">Hello Long</h1>
      <h2 className="text-md text-gray-400">Here&#x27;s are your side projects statistic</h2>
      <GeneralInfo {...state} />
      <div className="flex items-center space-x-4">
        <button className="flex items-center gap-2 text-gray-400 text-md border-gray-300 border px-4 py-2 rounded-tl-sm rounded-bl-full rounded-r-full">
          <ClockIcon width="24" />
          Transaction history
        </button>
        <span className="text-sm text-gray-400"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
        <TxHistoryCard
          txHash="0x12da5c6664fdf24797d4d1fe0db5cf3329f61d3e7bbcdb42d14412089566b9f6 "
          amount="0.02"
          time="Now"
          from="0x67baa466eacf6d60cc822749acdef115470f219c"
          to="0xdac17f958d2ee523a2206206994597c13d831ec7"
        />
        <TransactionHistory />
      </div>
    </>
  );
};
