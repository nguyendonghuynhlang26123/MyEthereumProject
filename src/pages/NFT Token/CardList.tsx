import {
  PlusIcon,
  ShoppingBagIcon,
  ViewGridAddIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { Context } from '../../components/contexts/ContractDataContext';

export default function Cardlist() {
  const { nftContract } = React.useContext(Context);
  const [data, setData] = React.useState([]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:py-8 sm:px-6 lg:max-w-full lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a className="group">
          <div className="py-6 w-full aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 flex flex-col items-center justify-center group-hover:shadow-md cursor-pointer">
            <PlusIcon width="48" className="text-gray-400 py-2" />
            <p className="font-bold">Buy a new NFT</p>
            <input
              className="py-2 mt-4 text-center border-b border-gray-300 focus:outline-none"
              placeholder="#Mint ..."
            />
            <button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 rounded-lg my-4">
              Mint
            </button>
          </div>
        </a>
        {data.map((e, i) => (
          <a key={i} href={e.href} className="group">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={e.imageSrc}
                alt={e.imageAlt}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{e.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{e.price}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
