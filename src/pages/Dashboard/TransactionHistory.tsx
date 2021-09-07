import React from 'react';
import { Context } from '../../components/contexts/ContractDataContext';

export const TransactionHistory = () => {
  const { web3, account } = React.useContext(Context);

  console.log('log ~ file: TransactionHistory.tsx ~ line 17 ~ React.useEffect ~ account', account);
  React.useEffect(() => {
    if (account != null) getTransactionsByAccount(account).then(() => console.log('DONE'));
  }, []);
  const getTransactionsByAccount = async (myaccount) => {
    const eth = web3.eth;
    const endBlockNumber = await web3.eth.getBlockNumber();
    const startBlockNumber = 0;

    console.log('Searching for transactions to/from account "' + myaccount + '" within blocks ' + startBlockNumber + ' and ' + endBlockNumber);
    for (let i = startBlockNumber; i <= endBlockNumber; i++) {
      console.log('Searching block ' + i);
      const block = await eth.getBlock(i, true);
      if (block != null && block.transactions != null) {
        block.transactions.forEach(function (e) {
          if (myaccount == '*' || myaccount == e.from || myaccount == e.to) {
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
        });
      }
    }
  };
  return <div></div>;
};
