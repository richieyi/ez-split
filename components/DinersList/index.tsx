import Diner from '../../toolkit/Diner';
import Input from '../Input';
import IconButton from '../IconButton';
import MoreButton from '../MoreButton';
import SaveCancelButtons from '../SaveCancelButtons';

function DinersList(props: any) {
  const {
    diners,
    selectedDiner,
    dinerToUpdate,
    handleSaveUpdatedDiner,
    dinerNewName,
    setDinerNewName,
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
        className="flex justify-between items-center border rounded p-2 my-2 hover:bg-slate-200"
      >
        {isUpdating ? (
          <div className="w-full">
            <form onSubmit={handleSaveUpdatedDiner}>
              <Input
                name="dinerNewName"
                placeholder="John"
                value={dinerNewName}
                onChange={(e: any) => setDinerNewName(e.target.value)}
              />
            </form>
            <SaveCancelButtons
              handleSave={handleSaveUpdatedDiner}
              handleCancel={resetDinerToUpdate}
            />
          </div>
        ) : (
          <div
            className={`flex justify-between hover:cursor-pointer w-full ${
              isSelected ? 'text-green-500' : ''
            }`}
            onClick={() => setSelectedDiner(diner)}
          >
            <span className="font-bold">{diner.getName()}</span>{' '}
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
