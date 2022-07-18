import Diner from '../../toolkit/Diner';
import Input from '../Input';
import MoreButton from '../MoreButton';
import SaveCancelButtons from '../SaveCancelButtons';

function DinersList(props: any) {
  const {
    diners,
    selectedDiner,
    dinerToUpdate,
    handleSaveUpdatedDiner,
    dinerNewName,
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
          isUpdating ? '' : 'hover:bg-slate-300'
        } bg-white hover:cursor-pointer`}
        onClick={() => setSelectedDiner(isSelected ? null : diner)}
      >
        {isUpdating ? (
          <div className="w-full">
            <form onSubmit={handleSaveUpdatedDiner}>
              <Input
                name="dinerNewName"
                placeholder="John"
                value={dinerNewName}
                onChange={handleDinerNameChange}
              />
            </form>
            <SaveCancelButtons
              handleSave={handleSaveUpdatedDiner}
              handleCancel={resetDinerToUpdate}
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
