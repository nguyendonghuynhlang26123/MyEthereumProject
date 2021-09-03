import React from 'react';
import Cardlist from './CardList';

export const NFTPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        My Collection
      </h1>
      <h2 className="text-md text-gray-400">
        Here&#x27;s are your NFT collections
      </h2>
      <Cardlist />
    </div>
  );
};
