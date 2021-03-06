import React from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../components/contexts/ContractDataContext';
import { Switch, Route, Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { ArrowLeftIcon, CurrencyDollarIcon, GiftIcon, HeartIcon, InformationCircleIcon } from '@heroicons/react/solid';
import EthereumCurrencyIcon from '../../assets/ethereum-currency.svg';
import { NftInfo } from './NftInfo';
import { Breeding } from './Breeding';
import { Selling } from './Selling';
import { compare2Account } from '../../utils';
import { TagIcon } from '@heroicons/react/outline';
import { Gifting } from './Gifting';

export const NFTDetails = () => {
  const { penguunId } = useParams();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const { setLoading, nftContract, account, web3, marketContract } = React.useContext(Context);
  const [penguun, setPenguun] = React.useState(null);
  const [isOwner, setIsOwner] = React.useState(false);
  console.log('log ~ file: index.tsx ~ line 19 ~ NFTDetails ~ penguun', penguun);

  React.useEffect(() => {
    if (web3) {
      setLoading(true);
      loadPenguunData().then(() => {
        setLoading(false);
      });
    }
  }, []);

  const loadPenguunData = async () => {
    if (penguunId != null) {
      const data = await nftContract.methods.getPenguun(penguunId).call({ from: account });
      const owner = await nftContract.methods.ownerOf(penguunId).call({ from: account });

      //Since id is uint, solidity may truncate the leading zero
      if (data.dna.length == 17) data.dna = '0' + data.dna;

      //check if this person is owner of the penguun  => we should fetch the price from market
      if (compare2Account(account, owner)) setIsOwner(true);
      let marketItem = await marketContract.methods.getMarketItem(penguunId).call({ from: account });
      if (marketItem.itemId == '0') marketItem = {};

      setPenguun({
        ...data,
        ...marketItem,
        id: penguunId,
        name: web3.utils.hexToUtf8(data.name),
        owner: owner,
      });
      return data;
    }
    return null;
  };

  const ownerOptionPane = () => {
    return (
      <div className="flex flex-row gap-4">
        <Link
          to={`/penguuns/${penguunId}/info`}
          className={`border rounded-md flex justify-center items-center w-28 gap-1 py-1 ${
            page == 0
              ? 'bg-blue-500 text-white scale-150 ring-4 ring-opacity-50 shadow ring-blue-500 '
              : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
          }`}
          onClick={() => {
            setPage(0);
          }}
        >
          <InformationCircleIcon className="h-6" />
          Info
        </Link>
        <Link
          to={`/penguuns/${penguunId}/selling`}
          className={`border rounded-md flex justify-center items-center w-28 gap-1 py-1 ${
            page == 1
              ? 'bg-yellow-500 text-white scale-150 ring-4 ring-opacity-50 ring-yellow-500 shadow '
              : 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
          }`}
          onClick={() => {
            setPage(1);
          }}
        >
          <CurrencyDollarIcon className="h-6" />
          Sell
        </Link>
        <Link
          to={`/penguuns/${penguunId}/breeding`}
          className={`border rounded-md flex justify-center items-center w-28 gap-1 py-1 ${
            page == 2
              ? 'bg-red-500 text-white scale-150 ring-4 ring-opacity-50 ring-red-500 shadow '
              : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
          } ${Number(penguun.nextBreedTime) * 1000 > Date.now() ? 'opacity-10 cursor-not-allowed' : ''}
          `}
          onClick={() => {
            setPage(2);
          }}
        >
          <HeartIcon className="h-6" />
          Breed
        </Link>
        <Link
          to={`/penguuns/${penguunId}/gifting`}
          className={`border rounded-md flex justify-center items-center w-28 gap-1 py-1 ${
            page == 3
              ? 'bg-green-500 text-white scale-150 ring-4 ring-opacity-50 ring-green-500 shadow '
              : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
          }`}
          onClick={() => {
            setPage(3);
          }}
        >
          <GiftIcon className="h-6" />
          Gift
        </Link>
      </div>
    );
  };

  const handleBuy = () => {
    marketContract.methods
      .buyMarketItem(penguun.itemId)
      .send({ from: account, value: penguun.price })
      .then(() => {
        alert('Buy successfully');
        history.push('/my-nft');
      });
  };

  return (
    penguun && (
      <div className="max-w-5xl mx-auto ">
        <div className="grid grid-cols-2 gap-20 items-center ">
          <button
            onClick={() => {
              history.goBack();
            }}
            className="my-4 font-bold text-lg flex flex-row items-center hover:text-gray-500"
          >
            <ArrowLeftIcon className="h-4 w-4 inline mr-1" />
            Back
          </button>
          {isOwner ? (
            ownerOptionPane()
          ) : (
            <div className="flex flex-row gap-4 ml-auto px-6 justify-end items-center font-bold">
              <p className="text-2xl font-bold font-mono">{web3.utils.fromWei(penguun.price, 'ether')} ??</p>
              <button
                className={` rounded-md flex justify-center items-center w-28 gap-1 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white `}
                onClick={() => {
                  handleBuy();
                }}
              >
                <TagIcon className="h-6" />
                Buy now
              </button>
            </div>
          )}
        </div>
        {penguun && (
          <>
            <Route exact path={`/penguuns/${penguunId}/info`}>
              <NftInfo penguun={penguun} />
            </Route>
            <Route exact path={`/penguuns/${penguunId}/breeding`}>
              <Breeding penguun={penguun} />
            </Route>
            <Route exact path={`/penguuns/${penguunId}/selling`}>
              <Selling penguun={penguun} />
            </Route>
            <Route exact path={`/penguuns/${penguunId}/gifting`}>
              <Gifting penguun={penguun} />
            </Route>
            <Route exact path={`/penguuns/${penguunId}`}>
              <Redirect to={`/penguuns/${penguunId}/info`} />
            </Route>
          </>
        )}
      </div>
    )
  );
};
