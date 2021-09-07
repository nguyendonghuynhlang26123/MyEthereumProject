import React from 'react';
import { Modal, PenguunCard } from '../../components';
import { Context } from '../../components/contexts/ContractDataContext';

export const BreedingChoosingModal = ({ onConfirm, onClose, gender }) => {
  const { web3, nftContract, account, setLoading } = React.useContext(Context);
  const [selection, setSelection] = React.useState(null);
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

            //filtering
            if (penguun.gender != gender && Number(penguun.nextBreedTime) * 1000 < Date.now())
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
    <Modal
      title={'Choose mate'}
      buttons={[
        {
          label: 'OK',
          action: () => {
            onConfirm(penguuns[selection]);
          },
        },
      ]}
      cancelAction={onClose}
    >
      <div className="flex flex-row flex-wrap items-center gap-2 h-80 overflow-auto">
        {penguuns.map((penguun, i) => (
          <PenguunCard
            onClick={(ev) => {
              ev.preventDefault();
              setSelection(i);
            }}
            className={`w-1/5 ${selection == i ? 'border-main' : ''}`}
            penguun={penguun}
            key={i}
          />
        ))}
      </div>
    </Modal>
  );
};
