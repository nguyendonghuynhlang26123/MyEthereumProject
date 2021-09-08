import React from 'react';
import { PenguunCard } from '../../components';
import { Context } from '../../components/contexts/ContractDataContext';

export const Market = () => {
  const { marketContract, account, web3, nftContract, setLoading } = React.useContext(Context);

  const [penguuns, setPenguuns] = React.useState([]);

  React.useEffect(() => {
    if (setLoading) setLoading(true);
    loadDataState();
  }, []);

  const loadDataState = async () => {
    if (nftContract && marketContract) {
      const list = await marketContract.methods.fetchItems().call({ from: account });
      console.log('log ~ file: index.tsx ~ line 18 ~ loadDataState ~ list', list);
      const myNfts = [];
      for (const item of list) {
        const penguun = await nftContract.methods.getPenguun(item.tokenId).call({ from: account });
        if (penguun.dna.length == 17) penguun.dna = '0' + penguun.dna;

        //Image getting
        myNfts.push({
          ...penguun,
          id: item.tokenId,
          price: web3.utils.fromWei(item.price, 'ether'),
          name: web3.utils.hexToAscii(penguun.name),
        });
      }
      setPenguuns(myNfts);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{penguuns.length} results </h1>

      <div className="flex flex-row flex-wrap items-center gap-2">
        {penguuns.map((penguun, i) => (
          <PenguunCard penguun={penguun} key={i} />
        ))}
      </div>
    </div>
  );
};
