import React from 'react';
import { PenguunImg, PenguunCard } from '../../components';
import { dnaToParts } from '../../img-gen/penguun-generator';
import MaleGender from '../../assets/male.svg';
import FemaleGender from '../../assets/female.svg';
import BisexGender from '../../assets/bisex.svg';
import { Context } from '../../components/contexts/ContractDataContext';
import Countdown from 'react-countdown';

const partIcons = {
  'bg': require('../../assets/bodyparts/bg.png').default,
  'tail': require('../../assets/bodyparts/tail.svg').default,
  'back': require('../../assets/bodyparts/back.svg').default,
  'fur': require('../../assets/bodyparts/fur.png').default,
  'belly': require('../../assets/bodyparts/belly.png').default,
  'eyes': require('../../assets/bodyparts/eyes.svg').default,
  'mouth': require('../../assets/bodyparts/mouth.svg').default,
  'bow': require('../../assets/bodyparts/bow.png').default,
  'horn': require('../../assets/bodyparts/horn.svg').default,
};
const partDisplayOrder = ['back', 'eyes', 'horn', 'mouth', 'tail', 'bow', 'fur', 'belly', 'bg'];

export const NftInfo = ({ penguun }) => {
  const { setLoading, nftContract, account, web3 } = React.useContext(Context);
  const [parts, setParts] = React.useState(null);
  const [parents, setParents] = React.useState({
    papa: null,
    mama: null,
  });

  React.useEffect(() => {
    if (penguun) {
      //Load Body parts
      dnaToParts(penguun.dna).then((data) => {
        setParts(data);
        console.log('log ~ file: NftInfo.tsx ~ line 36 ~ dnaToParts ~ data', data);
      });

      console.log('Can breed at ' + Number(penguun.nextBreedTime) * 1000);
      console.log('Hatch at ' + Number(penguun.hatchedAt) * 1000);

      //Load parents
      if (penguun.papaId != '0' && penguun.mamaId != '0') {
        nftContract.methods
          .getPenguun(penguun.papaId)
          .call({ from: account })
          .then((papa) => {
            setParents((prv) => ({
              ...prv,
              papa: {
                ...papa,
                id: penguun.papaId,
                name: web3.utils.toAscii(papa.name),
              },
            }));
          });
        nftContract.methods
          .getPenguun(penguun.mamaId)
          .call({ from: account })
          .then((mama) => {
            setParents((prv) => ({
              ...prv,
              mama: {
                ...mama,
                id: penguun.mamaId,
                name: web3.utils.toAscii(mama.name),
              },
            }));
          });
      }
    }
  }, []);

  const getGenderImg = (gender) => {
    if (gender == '0') return MaleGender;
    else if (gender == '1') return FemaleGender;
    else return BisexGender;
  };

  const getStyleByRarity = (rarity) => {
    return rarity === 'legendary'
      ? 'bg-yellow-500 text-white'
      : rarity === 'epic'
      ? 'bg-purple-500 text-white'
      : rarity == 'rare'
      ? 'bg-blue-500 text-white'
      : 'bg-gray-500 text-white';
  };

  // Renderer callback with condition
  const breedStatus = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <p>Breedable</p>;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const hatchAtStatus = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <p>Breedable</p>;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
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
          <h1 className="text-lg font-bold mb-1">About</h1>
          <div className="border border-grey-600 rounded-md py-2">
            <div className="flex flex-row py-2 px-6 justify-start gap-20">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-wide text-gray-400">Gender</p>
                <span className="flex text-lg items-center gap-1 font-bold">
                  {penguun.gender === '0' ? 'Male' : penguun.gender === '1' ? 'Female' : 'Bisex'}
                  <img src={getGenderImg(penguun.gender)} className="w-6 h-6" />
                </span>
              </div>
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-wide text-gray-400">Breed count</p>
                <span className="flex text-lg items-center font-bold">{penguun.breedCount}</span>
              </div>
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-wide text-gray-400">Generation</p>
                <span className="flex text-lg items-center font-bold">{penguun.generation}</span>
              </div>
            </div>

            <div className="flex flex-row py-2 px-6 gap-20">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-wide text-gray-400">Breeding status</p>
                <div className="text-lg font-bold">
                  <Countdown date={Number(penguun.nextBreedTime) * 1000} renderer={breedStatus} />
                </div>
              </div>
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-wide text-gray-400">Hatched at</p>
                <span className="flex text-lg items-center font-bold">{new Date(Number(penguun.hatchedAt) * 1000).toLocaleDateString()}</span>
              </div>
            </div>
            <div className=" py-2 px-6">
              <p className="font-mono text-sm font-bold uppercase tracking-wide text-gray-400">DNA</p>
              <p className="text-lg font-bold tracking-widest">{penguun.dna}</p>
            </div>
            <div className="flex flex-row py-2 px-6 justify-between">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-wide text-gray-400">Owner</p>
                <span className="flex items-center gap-2 ">
                  <p className="text-lg font-bold">{penguun.owner.toLocaleLowerCase() === account.toLocaleLowerCase() ? 'Me' : ''}</p>
                  <p className="italic text-sm text-gray-500">({penguun.owner})</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-lg font-bold mb-1">Experience</h1>
          <div className="border border-grey-600 rounded-md py-2">
            <div className="py-2 px-6 ">
              <p className="font-mono text-sm font-bold uppercase tracking-wide text-gray-400">{penguun.exp} / 10000000</p>
              <div className=" rounded-full overflow-hidden w-full h-4 my-2 bg-white border border-gray-200">
                <div style={{ width: `${(penguun.exp / 10000000) * 100 + 1}%` }} className="h-full text-center text-xs text-white bg-main"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-lg font-bold mb-1">Gene analytics</h1>
          <div className="border border-grey-600 rounded-md grid grid-cols-2 gap-x-2 gap-y-3 px-6 py-4 items-center justify-center">
            {parts &&
              partDisplayOrder.map((p, i) => (
                <div key={p} className="flex flex-row items-center gap-2 overflow-clip">
                  <img className="h-12 w-12 rounded-md" src={partIcons[p]} alt="" />
                  <span className="w-full">
                    <p className="text-md font-bold capitalize truncate ">{p == 'bg' ? 'Background' : p == 'belly' ? 'Belly' : parts[p]?.partName}</p>
                    <p className={`text-sm capitalize inline px-3 rounded-md ${getStyleByRarity(parts[p]?.rarity)}`}>{parts[p]?.rarity}</p>
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-lg font-bold mb-1">Parents</h1>
          <div className="border border-grey-600 rounded-md grid grid-cols-2 gap-x-2 gap-y-3 px-6 py-4 items-center justify-center">
            {parents.papa && <PenguunCard penguun={parents.papa} />}
            {parents.mama && <PenguunCard penguun={parents.mama} />}
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-lg font-bold mb-1">Trading history</h1>
          <div className="border border-grey-600 rounded-md py-2"></div>
        </div>
      </div>
    </div>
  );
};
