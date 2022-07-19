import Diner from '../../toolkit/Diner';
import DinerForm from '../DinerForm';
import MoreButton from '../MoreButton';

function DinersList(props: any) {
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
  } = props;

  return diners.map((diner: Diner) => {
    const isSelected = selectedDiner === diner;
    const isUpdating = dinerToUpdate === diner;

    return (
      <div
        key={diner.getID()}
        className={`flex justify-between items-center border rounded p-2 my-2 ${
          isUpdating ? '' : 'hover:cursor-pointer hover:bg-slate-300'
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
            <span>${diner.getTotalExpenses()}</span>
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

export default DinersList;
