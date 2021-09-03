import React from 'react';
import wallet from '../assets/walleticon.svg';
import { SideOver } from './SideOver';
import { MyPopover } from './PopOver';

export const Navbar = ({ openSidebar, account }) => {
  const [sideOver, showSideOver] = React.useState(false);
  return (
    <header className="w-full flex items-center justify-between border-b border-gray-200  ">
      <div className="block lg:hidden ml-6">
        <button
          className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md"
          onClick={openSidebar}
        >
          <svg
            width="20"
            height="20"
            className="text-gray-400"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
          </svg>
        </button>
      </div>
      <div className="relative flex flex-col justify-end h-full px-4 md:w-full">
        <div className="relative flex items-center dark:text-white w-full space-x-4 justify-end">
          <button className="flex items-center text-md p-4 border-b-2 border-transparent hover:border-main ">
            <svg
              width="24"
              height="24"
              className=""
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"></path>
            </svg>
          </button>
          {/* <MyPopover> Copy</MyPopover> */}
          <button
            className="flex items-center text-gray-500 dark:text-white text-md p-4 border-b-2 border-transparent hover:border-main "
            onClick={() => showSideOver(true)}
          >
            <img src={wallet} width="24" />
            <SideOver open={sideOver} setOpen={showSideOver}>
              Test
            </SideOver>
          </button>
        </div>
      </div>
    </header>
  );
};
