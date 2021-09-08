import React from 'react';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';

export const TxHistoryCard = ({ txHash, amount, time, from, to }) => {
  return (
    <div className="w-full">
      <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative overflow-ellipsis ">
        <p className="text-sm w-max text-gray-400 dark:text-white font-semibold border-b border-gray-200 italic">{time}</p>
        <div className="flex items-end space-x-2 my-6">
          <p className="text-5xl text-black dark:text-white font-bold">{amount} ETH</p>
          {/* <span className="text-green-500 text-xl font-bold flex items-center">($54)</span> */}
        </div>
        <div className="dark:text-white truncate">
          <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12 sm:gap-4 justify-between border-b border-gray-200">
            <p className="w-32">Transaction Hash</p>
            <div className="flex items-end text-xs ">{txHash}</div>
          </div>
          <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12 sm:gap-4 justify-between border-b border-gray-200">
            <p>From</p>
            <div className="flex items-end text-xs">
              {from}
              <span className="flex items-center">
                <ArrowCircleRightIcon width="16" className="text-green-500" />
              </span>
            </div>
          </div>
          <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
            <p>To</p>
            <div className="flex items-end text-xs">
              <span className="flex items-center">
                <ArrowCircleRightIcon width="16" className=" text-red-500" />
                {to}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
