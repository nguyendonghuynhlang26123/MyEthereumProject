import React from 'react';
import { TxHistoryCard } from '../../components';
import { Context } from '../../components/contexts/ContractDataContext';
import { erc20Address } from '../../components/contracts/erc20.contract';
import { faucetAddress } from '../../components/contracts/Faucet.contract';
import { marketAddress } from '../../components/contracts/Marketplace.contract';
import { penguunAddress } from '../../components/contracts/Penguun.contract';
import { compare2Account } from '../../utils';

export const TransactionHistory = () => {
  const { web3, account } = React.useContext(Context);
  const [txs, setTxHistorys] = React.useState(null);

  console.log('log ~ file: TransactionHistory.tsx ~ line 17 ~ React.useEffect ~ account', account);
  React.useEffect(() => {
    if (account != null) getTransactionsByAccount(account).then(() => console.log('DONE'));
  }, []);
  const getContractName = (address) => {
    if (compare2Account(address, erc20Address)) return 'LHC Contract';
    if (compare2Account(address, faucetAddress)) return 'Faucet Contract';
    if (compare2Account(address, penguunAddress)) return 'Penguun Contract';
    if (compare2Account(address, marketAddress)) return 'Market Contract';
    if (compare2Account(address, account)) return 'You';
    return address;
  };
  const getTransactionsByAccount = async (myaccount) => {
    const eth = web3.eth;
    const endBlockNumber = await web3.eth.getBlockNumber();
    const startBlockNumber = endBlockNumber - 100 > 0 ? endBlockNumber - 100 : 0;
    //const startBlockNumber = 0;
    const blockTxs = [];

    console.log('Searching for transactions to/from account "' + myaccount + '" within blocks ' + startBlockNumber + ' and ' + endBlockNumber);
    for (let i = startBlockNumber; i <= endBlockNumber; i++) {
      const block = await eth.getBlock(i, true);
      if (i % 10 == 0) console.log('Searching block ' + i);
      if (block != null && block.transactions != null) {
        for (const e of block.transactions) {
          // blockTxs.push({
          //   ...e,
          //   time: block.timestamp,
          // });
          if (myaccount == '*' || compare2Account(myaccount, e.from) || compare2Account(myaccount, e.to)) {
            blockTxs.push({
              ...e,
              time: block.timestamp,
            });
            console.log(
              '  tx hash          : ' +
                e.hash +
                '\n' +
                '   nonce           : ' +
                e.nonce +
                '\n' +
                '   blockHash       : ' +
                e.blockHash +
                '\n' +
                '   blockNumber     : ' +
                e.blockNumber +
                '\n' +
                '   transactionIndex: ' +
                e.transactionIndex +
                '\n' +
                '   from            : ' +
                e.from +
                '\n' +
                '   to              : ' +
                e.to +
                '\n' +
                '   value           : ' +
                e.value +
                '\n' +
                '   time            : ' +
                block.timestamp +
                '\n' +
                '   gasPrice        : ' +
                e.gasPrice +
                '\n' +
                '   gas             : ' +
                e.gas +
                '\n' +
                '   input           : ' +
                e.input
            );
          }
        }
      }
    }
    setTxHistorys(blockTxs);
  };

  const calculateGasPriceInEth = (gas, gasPrice) => {
    const raw = web3.utils.fromWei((Number(gas) * Number(gasPrice)).toString(), 'ether');
    return Math.round((Number(raw) + Number.EPSILON) * 10000) / 10000;
  };
  return (
    <>
      {txs ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          {txs.map((data, i) => (
            <TxHistoryCard
              txHash={data.hash}
              amount={calculateGasPriceInEth(data.gas, data.gasPrice)}
              time="Now"
              from={getContractName(data.from)}
              to={getContractName(data.to)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-center">
          <p className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-main bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing
          </p>
        </div>
      )}
    </>
  );
};
