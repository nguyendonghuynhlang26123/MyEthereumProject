import React from 'react';
import Web3 from 'web3';
import './App.css';
import { Dashboard, NFTPage } from './pages';
import { Modal, Loading, Navbar, Sidebar } from './components';
import { HomeIcon, InboxInIcon, LibraryIcon } from '@heroicons/react/outline';
import * as ContractContext from './components/contexts/ContractDataContext';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const address = '';

export const App = () => {
  const [index, setIndex] = React.useState(0);
  const [open, showSidebar] = React.useState(false);
  const state = React.useContext(ContractContext.Context);
  console.log('log ~ file: App.tsx ~ line 22 ~ App ~ state', state);

  const navitems = [
    {
      label: 'Home',
      icon: <HomeIcon width="20" />,
      action: () => {
        setIndex(0);
      },
    },
    {
      label: 'My NFT',
      icon: <InboxInIcon width="20" />,
      action: () => {
        setIndex(1);
      },
    },
    {
      label: 'Buy NFT',
      icon: <LibraryIcon width="20" />,
      action: () => {
        setIndex(2);
      },
    },
  ];

  const paging = (i, ...props) => {
    switch (i) {
      case 0:
        return <Dashboard />;
      case 1:
        return <NFTPage />;
    }
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <Sidebar items={navitems} currentIndex={index} open={open} />
        <div className="flex flex-col w-full md:space-y-4">
          <Navbar
            openSidebar={() => showSidebar((prv) => !prv)}
            account={state.account}
          />
          <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
            {paging(index)}
          </div>
        </div>
      </div>
    </main>
  );
};
export default App;
