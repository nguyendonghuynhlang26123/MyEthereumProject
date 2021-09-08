import React from 'react';
import { Context } from '../../components/contexts/ContractDataContext';
import { useHistory } from 'react-router-dom';
import { PenguunImg } from '../../components';

export const Gifting = ({ penguun }) => {
  const history = useHistory();
  const [confirmation, setConfirm] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const { account, web3, nftContract } = React.useContext(Context);

  const handleGifting = async (_target) => {
    //Preprocess address
    if (!_target.startsWith('0x')) _target = '0x' + _target;
    if (!web3.utils.isAddress(_target)) {
      alert('Invalid address');
      return;
    }

    //Approve first
    await nftContract.methods.approve(_target, penguun.id).send({ from: account });
    return nftContract.methods.safeTransferFrom(account, _target, penguun.id).send({ from: account });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="">
          <span className="bg-main rounded-lg text-white px-4 text-sm">#{penguun.id}</span>
          <h1 className="text-2xl font-bold truncate">{penguun.name}</h1>
          <PenguunImg className=" flip object-cover rounded-md group-hover:opacity-90 my-2 border border-gray-300 w-3/4" dna={penguun.dna} />
        </div>
      </div>
      <div>
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-1 inline">
            Gift <b className="text-green-500">{penguun.name.trim()}</b> to a friend{' '}
          </h1>
          <div className="border border-grey-600 rounded-md py-2 px-6 my-2 bg-white">
            <div>
              <div>
                <div className="mt-4 px-4 flex flex-row items-center gap-2">
                  <input
                    className="checked:bg-main checked:border-transparent"
                    id="confirmation"
                    type="checkbox"
                    checked={confirmation}
                    onChange={(ev) => setConfirm(ev.target.checked)}
                  />
                  <label htmlFor="confirmation" className="cursor-pointer text-sm">
                    I agree that my asset will be permanently transfer to this address!
                  </label>
                </div>
                <div className={`py-3 px-4 flex  ${!confirmation && 'cursor-not-allowed opacity-20'}`}>
                  <input
                    type="text"
                    value={address}
                    onChange={(ev) => {
                      if (confirmation) setAddress(ev.target.value);
                    }}
                    className="w-full py-2 px-2 pr-16 border -mr-14 border-gray-400 rounded-l focus:outline-none text-sm"
                  />
                  <button
                    className={`bg-green-500 rounded-r py-1 px-4 text-white font-bold`}
                    onClick={() => {
                      if (confirmation)
                        handleGifting(address)
                          .then(() => {
                            alert('Your penguun now is transfered!');
                            history.push('/my-nft');
                          })
                          .catch((err) => alert('Operation rejected'));
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
