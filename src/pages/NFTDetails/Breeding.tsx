import React from 'react';
import { PenguunImg } from '../../components';
import NotFound from '../../assets/notfound.png';
import { BreedingChoosingModal } from './BreedingChoosingModal';
import { HeartIcon } from '@heroicons/react/solid';
import { Context } from '../../components/contexts/ContractDataContext';

export const Breeding = ({ penguun }) => {
  const { web3, nftContract, account, setLoading } = React.useContext(Context);
  const [matePenguun, setPenguun] = React.useState(null);
  const [modal, showModal] = React.useState(false);
  const [childName, setChildName] = React.useState('');

  const breedingHandle = async () => {
    // setLoading(true);
    let childNameInAscii = web3.utils.asciiToHex(childName, 32);
    const nonce = await web3.eth.getTransactionCount(account);
    return nftContract.methods.breedWithAuto(penguun.id, matePenguun.id, childNameInAscii).send({ from: account, nonce: nonce, value: 2000000000000000 });
  };

  return (
    <div className="grid grid-cols-5 gap-16 ">
      <div className="col-span-2">
        <div className="">
          <span className="bg-main rounded-lg text-white px-4 text-sm z-2">#{penguun.id}</span>
          <h1 className="text-2xl font-bold truncate">{penguun.name}</h1>
          <div className="relative group border border-gray-300 rounded-md my-2">
            <PenguunImg className=" flip object-cover rounded-md group-hover:opacity-90 border border-gray-300" dna={penguun.dna} />
          </div>
        </div>
      </div>
      {matePenguun ? (
        <div className={`mt-36 justify-center flex flex-col`}>
          <div className="breading_symbol motion-safe:animate-pulse">
            <HeartIcon className="text-pink-500 " />
          </div>
          <div className="flex flex-col justify-center text-center bg-white  border border-pink-500 my-4 px-2 py-1 text-sm">
            <p className="font-bold">Choose a name</p>
            <input
              value={childName}
              onChange={(ev) => setChildName(ev.target.value)}
              type="text"
              className="my-2 text-center focus-within:text-sm border-b border-pink-500 focus:outline-none px-0"
              placeholder="Penguun name"
            />
          </div>
          <p className="text-xs italic text-center mt-4">Fee: </p>
          <button
            onClick={() => {
              breedingHandle().then((result) => {
                console.log(result);
                alert('Breeding successfully');
              });
            }}
            className=" py-2 px-4 bg-pink-600 text-white rounded-md "
          >
            Let's breed ❤
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="col-span-2">
        {modal && (
          <BreedingChoosingModal
            gender={penguun.gender}
            onConfirm={(penguun) => {
              setPenguun(penguun);
              showModal(false);
            }}
            onClose={() => showModal(false)}
          />
        )}
        {matePenguun ? (
          <div className="">
            <span className="bg-main rounded-lg text-white px-4 text-sm ">#{matePenguun.id}</span>
            <h1 className="text-2xl font-bold truncate">{matePenguun.name}</h1>
            <div className="relative group border border-gray-300 hover:border-red-500 rounded-md my-2">
              <PenguunImg className="z-2 object-cover rounded-md group-hover:opacity-90 filter group-hover:blur border border-gray-300" dna={matePenguun.dna} />
              <button
                onClick={() => showModal(true)}
                className="absolute flex justify-center items-center w-40 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-red-500 text-white opacity-0 hover:opacity-100 group-hover:opacity-100 rounded-lg py-1"
              >
                Change mate
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 z-2">
            <h1 className="text-2xl font-bold truncate">Choose mate for this penguun</h1>
            <div className="relative group p-2 border border-gray-300 hover:border-red-500">
              <img src={NotFound} className="filter blur object-cover rounded-md group-hover:opacity-90 my-2  top-0 left-0" />
              <button
                onClick={() => showModal(true)}
                className="absolute flex justify-center items-center w-24 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-red-500 text-white opacity-0 hover:opacity-100 group-hover:opacity-100 rounded-lg py-1"
              >
                Choose penguun
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
