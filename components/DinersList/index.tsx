import { useState } from 'react';
import Diner from '../../toolkit/Diner';
import DinerForm from '../DinerForm';
import MoreButton from '../MoreButton';
import NewItemButton from '../NewItemButton';

function DinersList(props: any) {
  const [isAddingNewDiner, setIsAddingNewDiner] =
    useState<boolean>(false);
  const [diner, setDiner] = useState<string>('');

  const {
    diners,
    selectedDiner,
    dinerToUpdate,
    handleSaveUpdatedDiner,
    dinerUpdatedName,
    handleDinerNameChange,
    resetDinerToUpdate,
    setSelectedDiner,
    handleUpdateDiner,
    handleRemoveDiner,
    setDiners,
  } = props;

  const newDinerFormProps = {
    handleSaveDiner: handleAddNewDiner,
    diner,
    handleDinerNameChange: setDiner,
    handleCancelDiner: resetNewDiner,
  };

  function resetNewDiner() {
    setDiner('');
    setIsAddingNewDiner(false);
  }

  function handleAddNewDiner(e: any) {
    e.preventDefault();

    if (diner.length > 0) {
      const newDiners = [...diners];
      const newDiner = new Diner(diner);
      newDiners.push(newDiner);
      setDiners(newDiners);
      resetNewDiner();
    }
  }

  function renderDiners() {
    return diners.map((diner: Diner) => {
      const isSelected = selectedDiner === diner;
      const isUpdating = dinerToUpdate === diner;

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
          {isUpdating ? (
            <div className="w-full">
              <DinerForm
                handleSaveDiner={handleSaveUpdatedDiner}
                diner={dinerUpdatedName}
                handleDinerNameChange={handleDinerNameChange}
                handleCancelDiner={resetDinerToUpdate}
              />
            </div>
          ) : (
            <div
              className={`flex justify-between w-full ${
                isSelected ? 'text-green-500' : ''
              }`}
            >
              <span className="font-bold">🧑‍🍳 {diner.getName()}</span>
              <span>${diner.getTotalExpenses().toFixed(2)}</span>
            </div>
          )}
          {dinerToUpdate === diner ? null : (
            <MoreButton
              handleUpdate={() => handleUpdateDiner(diner)}
              handleRemove={() => handleRemoveDiner(diner)}
            />
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
