import React from 'react';
import Web3 from 'web3';
import { Loading, Modal } from '..';
import { networkId } from '../../utils/constants';
import { penguunAbi, penguunAddress } from '../contracts/Penguun.contract';
import { faucetAbi, faucetAddress } from '../contracts/Faucet.contract';
import { marketAbi, marketAddress } from '../contracts/Marketplace.contract';

export type PropsType = {
  web3: Web3;
  account: string;
  balance: any;
  nftContract: any;
  faucetContract: any;
  erc20Contract: any;
  marketContract: any;
  setLoading: (boolean) => void;
  reloadAccount: () => void;
};

const defaultData: PropsType = {
  web3: null,
  nftContract: null,
  faucetContract: null,
  account: null,
  balance: null,
  erc20Contract: null,
  marketContract: null,
  setLoading: null,
  reloadAccount: null,
};
const ethereum = window.ethereum;

export const Context = React.createContext(defaultData);

export const Provider = ({ children }) => {
  const [state, setState]: [PropsType, any] = React.useState(defaultData);
  const [loading, showLoading] = React.useState(true);
  const [loginModal, showLoginModal] = React.useState(false);
  React.useEffect(() => {
    let web3: Web3;

    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert('Please install metamask to continue!');
      return;
    }
    window.web3 = web3;

    //setState((value) => showLoading(value));

    web3.eth.getAccounts(function (err, accounts) {
      if (err != null) console.error('An error occurred: ' + err);
      else if (accounts.length == 0) {
        console.log('User is not logged in');
        showLoginModal(true);
      } else {
        loadData().then((result) => {
          if (!result) alert('Connect to wallet failed! \nPlease switch your networkid to localhost:8545, netid = 6464. Then resfresh the page');
          else showLoginModal(false);
        });
      }
    });
  }, []);

  const loadData = async () => {
    const web3 = window.web3;

    //Load account:
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    //Verify network!
    const netId = await web3.eth.net.getId();
    if (netId != networkId) return false;

    //Load balance
    const myBalance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');

    //Load contract
    const contract = new web3.eth.Contract(penguunAbi, penguunAddress);
    const faucet = new web3.eth.Contract(faucetAbi, faucetAddress);
    const market = new web3.eth.Contract(marketAbi, marketAddress);

    setState((prev) => ({
      ...prev,
      setLoading: showLoading,
      account: accounts[0],
      balance: myBalance,
      web3: web3,
      nftContract: contract,
      faucetContract: faucet,
      marketContract: market,
      reloadAccount: () => {
        web3.eth.getBalance(accounts[0]).then((result) => {
          setState((prevState) => ({ ...prevState, balance: web3.utils.fromWei(result, 'ether') }));
        });
      },
    }));
    showLoading(false);
    return true;
  };

  return (
    <Context.Provider value={state}>
      {loginModal && (
        <Modal
          cancelAction={() => {
            showLoginModal(false);
            setTimeout(() => showLoginModal(true), 3000);
          }}
          title="Require wallet connection"
          buttons={[
            {
              label: 'Connect to wallet client',
              action: () => {
                console.log('Connect');
                loadData().then((result) => {
                  if (!result) alert('Connect to wallet failed! Please switch your networkid to 6464');
                  else showLoginModal(false);
                });
              },
            },
          ]}
        >
          <p className="pb-4">You need to connect to metamask to use this page</p>
        </Modal>
      )}
      {loading && <Loading />}
      {children}
    </Context.Provider>
  );
};
