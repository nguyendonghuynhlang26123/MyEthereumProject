import React from 'react';
import * as ContractContext from '../../components/contexts/ContractDataContext';
import { PenguunCard } from '../../components';

export const NFTPage = () => {
  const { web3, nftContract, account, setLoading } = React.useContext(ContractContext.Context);
  const [penguuns, setPenguuns] = React.useState([]);

  React.useEffect(() => {
    if (setLoading) setLoading(true);
    loadDataState();
  }, []);

  const loadDataState = () => {
    if (nftContract)
      nftContract.methods
        .getMyPenguunIds()
        .call({ from: account })
        .then(async (ids) => {
          const myNfts = [];
          for (const id of ids) {
            const penguun = await nftContract.methods.getPenguun(id).call({ from: account });
            if (penguun.dna.length == 17) penguun.dna = '0' + penguun.dna;

            //Image getting
            myNfts.push({
              ...penguun,
              id: id,
              name: web3.utils.hexToAscii(penguun.name),
            });
          }
          setPenguuns(myNfts);
          setLoading(false);
        });
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">My Collection ({penguuns.length} penguuns) </h1>
      <h2 className="text-md text-gray-400">Here&#x27;s are your NFT collections</h2>
      <div className="flex flex-row flex-wrap items-center gap-2">
        {penguuns.map((penguun, i) => (
          <PenguunCard penguun={penguun} key={i} />
        ))}
      </div>
    </div>
  );
};
