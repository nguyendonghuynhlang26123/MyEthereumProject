import React from 'react';
import './App.css';
import { Dashboard, NFTPage } from './pages';
import { Navbar, Sidebar } from './components';
import { HomeIcon, InboxInIcon, LibraryIcon } from '@heroicons/react/outline';
import * as ContractContext from './components/contexts/ContractDataContext';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { NFTDetails } from './pages/NFTDetails';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

export const App = () => {
  const [index, setIndex] = React.useState(0);
  const [open, showSidebar] = React.useState(false);
  const state = React.useContext(ContractContext.Context);

  const navitems = [
    {
      label: 'Home',
      icon: <HomeIcon width="20" />,
      href: '/',
      action: () => {
        setIndex(0);
      },
    },
    {
      label: 'My NFT',
      icon: <InboxInIcon width="20" />,
      href: '/my-nft',
      action: () => {
        setIndex(1);
      },
    },
    {
      label: 'Buy NFT',
      icon: <LibraryIcon width="20" />,
      href: '/marketplace',
      action: () => {
        setIndex(2);
      },
    },
  ];

  return (
    <Router>
      <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <Sidebar items={navitems} currentIndex={index} open={open} />
          <div className="flex flex-col w-full md:space-y-4">
            <Navbar openSidebar={() => showSidebar((prv) => !prv)} account={state.account} />
            <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
              <Switch>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/my-nft">
                  <NFTPage />
                </Route>
                <Route path="/penguuns/:penguunId">
                  <NFTDetails />
                </Route>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </main>
    </Router>
  );
};
export default App;
