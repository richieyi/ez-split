import React, { ChangeEvent } from 'react';
import Diner from '@/toolkit/Diner';
import MoreButton from '@/components/MoreButton';
import DinerForm from '@/components/DinerForm';

interface DinersListItemProps {
  diner: Diner;
  selectedDiner: Diner | null;
  dinerToUpdate: Diner | null;
  setSelectedDiner: (diner: Diner) => void;
  handleSaveUpdatedDiner: (
    e: ChangeEvent<HTMLFormElement>,
    dinerName: string
  ) => void;
  resetDinerToUpdate: () => void;
  handleUpdateDiner: (diner: Diner) => void;
  handleRemoveDiner: (diner: Diner) => void;
  subtotal: number;
  tipTaxTotal: number;
}

function DinersListItem(props: DinersListItemProps) {
  const {
    diner,
    selectedDiner,
    dinerToUpdate,
    setSelectedDiner,
    handleSaveUpdatedDiner,
    resetDinerToUpdate,
    handleUpdateDiner,
    handleRemoveDiner,
    subtotal,
    tipTaxTotal,
  } = props;

  const isSelected = selectedDiner === diner;
  const isUpdating = dinerToUpdate === diner;
  const dinerTotalExpenses = diner.getTotalExpenses();

  const dinerFormProps = {
    name: dinerToUpdate?.getName(),
    handleSaveDiner: handleSaveUpdatedDiner,
    handleCancelDiner: resetDinerToUpdate,
  };

  function renderDinerFinalTotal(): number {
    const percentage = dinerTotalExpenses / subtotal;
    return percentage * tipTaxTotal;
  }

  return (
    <div
      key={diner.getID()}
      className={`flex justify-between items-center border rounded p-2 my-2 ${
        isUpdating ? '' : 'hover:cursor-pointer hover:bg-slate-300'
      } bg-white`}
      onClick={isUpdating ? () => {} : () => setSelectedDiner(diner)}
    >
      {!isUpdating ? (
        <>
          <div
            className={`flex justify-between w-full ${
              isSelected ? 'text-green-500' : ''
            }`}
          >
            <span className="font-bold">🧑‍🍳 {diner.getName()}</span>
            <span>
              $
              {(dinerTotalExpenses + renderDinerFinalTotal()).toFixed(
                2
              )}
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
}

export default DinersListItem;
