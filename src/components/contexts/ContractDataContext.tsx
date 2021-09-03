import React from 'react';
import Web3 from 'web3';
import { Loading, Modal } from '..';
import { networkId } from '../../utils/constants';

export type PropsType = {
  web3: Web3;
  account: string;
  balance: any;
  nftContract: any;
  erc20Contract: any;
};

const defaultData: PropsType = {
  web3: null,
  nftContract: null,
  account: null,
  balance: null,
  erc20Contract: null,
};
const ethereum = window.ethereum;

export const Context = React.createContext(defaultData);

export const Provider = ({ children }) => {
  const [state, setState]: [PropsType, any] = React.useState(defaultData);
  const [loading, showLoading] = React.useState(true);
  const [loginModal, showLoginModal] = React.useState(false);
  const [networkModal, showNetworkModal] = React.useState(false);

  React.useEffect(() => {
    let web3: Web3;

    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    window.web3 = web3;

    web3.eth.getAccounts(function (err, accounts) {
      if (err != null) console.error('An error occurred: ' + err);
      else if (accounts.length == 0) {
        console.log('User is not logged in');
        showLoginModal(true);
      } else {
        loadData().then((result) => {
          if (!result)
            alert(
              'Connect to wallet failed! \nPlease switch your networkid to localhost:8545, netid = 6464. Then resfresh the page'
            );
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
    const myBalance = web3.utils.fromWei(
      await web3.eth.getBalance(accounts[0]),
      'ether'
    );
    //Load contract
    //const networkData = ContractBuild.networks;
    setState((prev) => ({ ...prev, account: accounts[0], balance: myBalance }));
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
                  if (!result)
                    alert(
                      'Connect to wallet failed! Please switch your networkid to 6464'
                    );
                  else showLoginModal(false);
                });
              },
            },
          ]}
        >
          <p className="pb-4">
            You need to connect to metamask to use this page
          </p>
        </Modal>
      )}
      {loading && <Loading />}
      {children}
    </Context.Provider>
  );
};
