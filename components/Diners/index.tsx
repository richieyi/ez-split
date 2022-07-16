import { useState } from 'react';
import SectionHeader from '../SectionHeader';
import DinersList from '../DinersList';
import NewDinerForm from '../NewDinerForm';

function Diners(props: any) {
  const { diners, setDiners, activeDiner, setActiveDiner } = props;

  const [dinerName, setDinerName] = useState<string>('');
  const [isAddingDiner, setIsAddingDiner] = useState<boolean>(false);
  const [updatingDinerIdx, setUpdatingDinerIdx] =
    useState<number>(-1);

  function handleAddNewDiner() {
    setUpdatingDinerIdx(-1);
    setDinerName('');
    setIsAddingDiner(true);
  }

  function handleDinerNameChange(e: any) {
    setDinerName(e.target.value);
  }

  function handleSaveNewDiner() {
    setDiners([...diners, { name: dinerName, total: 0 }]);
    setIsAddingDiner(false);
    setUpdatingDinerIdx(-1);
  }

  function handleSaveUpdatedDiner(e: any) {
    e.preventDefault();

    const newDiners = [...diners];
    const total = newDiners[updatingDinerIdx].total;
    newDiners[updatingDinerIdx] = {
      name: dinerName,
      total,
    };
    setDiners(newDiners);
    setUpdatingDinerIdx(-1);
  }

  function handleCancelUpdateDiner() {
    setDinerName('');
    setUpdatingDinerIdx(-1);
  }

  function handleCancelSaveDiner() {
    setDinerName('');
    setIsAddingDiner(false);
  }

  function handleUpdateDiner(idx: number, name: string) {
    setIsAddingDiner(false);
    setUpdatingDinerIdx(idx);
    setDinerName(name);
  }

  function handleDeleteDiner(idx: number) {
    setDiners(diners.filter((_: any, i: number) => i !== idx));
  }

  const dinersListProps = {
    diners,
    activeDiner,
    setActiveDiner,
    updatingDinerIdx,
    handleDinerNameChange,
    dinerName,
    handleUpdateDiner,
    handleSaveUpdatedDiner,
    handleCancelUpdateDiner,
    handleDeleteDiner,
  };
  const newDinerFormProps = {
    handleSaveNewDiner,
    handleDinerNameChange,
    handleCancelSaveDiner,
  };

  return (
    <div className="mb-8">
      <SectionHeader
        headerTitle={`Diners (${diners.length})`}
        isAdding={isAddingDiner}
        handleAddNew={handleAddNewDiner}
      />
      <DinersList {...dinersListProps} />
      {isAddingDiner ? <NewDinerForm {...newDinerFormProps} /> : null}
    </div>
  );
}

export default Diners;
