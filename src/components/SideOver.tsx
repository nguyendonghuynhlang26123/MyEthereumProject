/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, DocumentDuplicateIcon } from '@heroicons/react/outline';
import { Context } from './contexts/ContractDataContext';
import { addressTrimMiddle } from '../utils';

export function SideOver({ open, setOpen, children }) {
  const { account, balance } = useContext(Context);
  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }
  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Async: Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon
                        className="h-6 w-6 focus:outline-none"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="p-4 sm:px-6 flex justify-between items-center flex-row border-b border-gray-200">
                    <Dialog.Title className="text-lg font-medium text-gray-900 ">
                      My wallet
                    </Dialog.Title>
                    <button
                      className="text-gray-500 flex flex-row gap-1 items-center"
                      onClick={() => {}}
                    >
                      {account && addressTrimMiddle(account)}
                      <DocumentDuplicateIcon
                        width="16"
                        className="text-gray-600 "
                      />
                    </button>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div
                        className="border border-gray-300 flex flex-col  rounded-lg overflow-hidden"
                        aria-hidden="true"
                      >
                        <div className="py-3 flex flex-col justify-center items-center gap-0">
                          <p className="text-md font-semibold text-gray-400">
                            ETH Total balance
                          </p>
                          <p className="text-2xl font-bold text-gray-800">
                            {balance} ETH
                          </p>
                        </div>
                        <button className="text-lg bg-main text-white py-2 font-bold ">
                          Add funds
                        </button>
                      </div>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
