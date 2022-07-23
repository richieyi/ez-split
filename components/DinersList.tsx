import { useState } from 'react';
import Diner from '../toolkit/Diner';
import DinerForm from './DinerForm';
import MoreButton from './MoreButton';
import NewItemButton from './NewItemButton';

interface Props {
  diners: Diner[];
  selectedDiner: Diner | null;
  setSelectedDiner: (diner: Diner) => void;
  handleRemoveDiner: (diner: Diner) => void;
  setDiners: (diners: Diner[]) => void;
  tipTaxTotal: number;
  subtotal: number;
}

function DinersList(props: Props) {
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

  const dinerFormProps = {
    name: dinerToUpdate?.getName(),
    handleSaveDiner: handleSaveUpdatedDiner,
    handleCancelDiner: resetDinerToUpdate,
  };
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

  function handleSaveUpdatedDiner(e: any, dinerName: string) {
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

  function handleAddNewDiner(e: any, dinerName: string) {
    e.preventDefault();

    if (dinerName.length > 0) {
      const newDiners = [...diners];
      const newDiner = new Diner(dinerName);
      newDiners.push(newDiner);
      setDiners(newDiners);
      resetNewDiner();
    }
  }

  function renderDinerFinalTotal(dinerTotalExpenses: number): number {
    const percentage = dinerTotalExpenses / subtotal;
    return percentage * tipTaxTotal;
  }

  function renderDiners() {
    return diners.map((diner: Diner) => {
      const isSelected = selectedDiner === diner;
      const isUpdating = dinerToUpdate === diner;
      const dinerTotalExpenses = diner.getTotalExpenses();

      return (
        <div
          key={diner.getID()}
          className={`flex justify-between items-center border rounded p-2 my-2 ${
            isUpdating
              ? ''
              : 'hover:cursor-pointer hover:bg-slate-300'
          } bg-white`}
          onClick={
            isUpdating ? () => {} : () => setSelectedDiner(diner)
          }
        >
          {!isUpdating ? (
            <>
              <div
                className={`flex justify-between w-full ${
                  isSelected ? 'text-green-500' : ''
                }`}
              >
                <span className="font-bold">
                  🧑‍🍳 {diner.getName()}
                </span>
                <span>
                  $
                  {dinerTotalExpenses +
                    renderDinerFinalTotal(dinerTotalExpenses)}
                </span>
              </div>
              <MoreButton
                handleUpdate={() => handleUpdateDiner(diner)}
                handleRemove={() => handleRemoveDiner(diner)}
              />
            </>
          ) : (
            <div className="w-full">
              <DinerForm {...dinerFormProps} />
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold my-4 md:text-center text-left">
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
