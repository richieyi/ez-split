import { ChangeEvent, useState } from 'react';
import Diner from '../toolkit/Diner';
import DinerForm from './DinerForm';
import DinersListItem from './DinersListItem';
import NewItemButton from './NewItemButton';

interface DinersListProps {
  diners: Diner[];
  selectedDiner: Diner | null;
  setSelectedDiner: (diner: Diner) => void;
  handleRemoveDiner: (diner: Diner) => void;
  setDiners: (diners: Diner[]) => void;
  tipTaxTotal: number;
  subtotal: number;
}

function DinersList(props: DinersListProps) {
  const {
    diners,
    selectedDiner,
    setSelectedDiner,
    handleRemoveDiner,
    setDiners,
    tipTaxTotal,
    subtotal,
  } = props;

  const [isAddingNewDiner, setIsAddingNewDiner] =
    useState<boolean>(false);
  const [dinerToUpdate, setDinerToUpdate] = useState<Diner | null>(
    null
  );

  const newDinerFormProps = {
    handleSaveDiner: handleAddNewDiner,
    handleCancelDiner: resetNewDiner,
  };

  function handleUpdateDiner(diner: Diner) {
    setDinerToUpdate(diner);
  }

  function resetDinerToUpdate() {
    setDinerToUpdate(null);
  }

  function handleSaveUpdatedDiner(
    e: ChangeEvent<HTMLFormElement>,
    dinerName: string
  ) {
    e.preventDefault();

    if (dinerToUpdate && dinerName.length > 0) {
      dinerToUpdate.updateDiner(dinerName);

      const newDiners = [...diners];
      const idx = newDiners.findIndex(
        (diner) => diner.getID() === dinerToUpdate.getID()
      );
      newDiners.splice(idx, 1, dinerToUpdate);
      setDiners(newDiners);
      resetDinerToUpdate();
    }
  }

  function resetNewDiner() {
    setIsAddingNewDiner(false);
  }

  function handleAddNewDiner(
    e: ChangeEvent<HTMLFormElement>,
    dinerName: string
  ) {
    e.preventDefault();

    if (dinerName.length > 0) {
      const newDiners = [...diners];
      const newDiner = new Diner(dinerName);
      newDiners.push(newDiner);
      setDiners(newDiners);
      resetNewDiner();
    }
  }

  const dinerListItemProps = {
    selectedDiner,
    dinerToUpdate,
    setSelectedDiner,
    handleSaveUpdatedDiner,
    resetDinerToUpdate,
    handleUpdateDiner,
    handleRemoveDiner,
    subtotal,
    tipTaxTotal,
  };

  function renderDiners() {
    return diners.map((diner: Diner) => (
      <DinersListItem
        key={diner.getID()}
        diner={diner}
        {...dinerListItemProps}
      />
    ));
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold my-4 lg:text-center text-left">
        Diners 🧑‍🍳
      </h1>
      {renderDiners()}
      {isAddingNewDiner ? (
        <div className="border rounded p-2 bg-white">
          <DinerForm {...newDinerFormProps} />
        </div>
      ) : (
        <NewItemButton
          setIsAddingNewItem={() => setIsAddingNewDiner(true)}
          itemType="Diner"
        />
      )}
    </div>
  );
}

export default DinersList;
