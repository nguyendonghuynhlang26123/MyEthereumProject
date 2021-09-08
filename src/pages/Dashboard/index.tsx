import React from 'react';
import { GeneralInfo } from './GeneralInfo';
import { TxHistoryCard } from '../../components/TxHistoryCard';
import { ClockIcon } from '@heroicons/react/outline';
import * as ContractContext from '../../components/contexts/ContractDataContext';
import { TransactionHistory } from './TransactionHistory';

export const Dashboard = () => {
  const { balance, nftContract, erc20Contract, account, web3 } = React.useContext(ContractContext.Context);
  const [state, setState] = React.useState({
    myBalance: 0,
    myNFTs: 0,
    myLHC: 0,
  });

  React.useEffect(() => {
    if (nftContract) {
      loadData().then((res) => {
        setState((prv) => ({
          ...prv,
          myBalance: balance,
          myNFTs: res.nftBalance,
          myLHC: res.erc20Balance,
        }));
      });
    }
  }, [web3]);

  const loadData = async () => {
    const nftBalance = await nftContract.methods.balanceOf(account).call({ from: account });
    const erc20Balance = await nftContract.methods.balanceOf(account).call({ from: account });
    return { nftBalance, erc20Balance };
  };
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
      <TransactionHistory />
    </>
  );
};
