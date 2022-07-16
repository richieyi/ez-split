import { v4 as uuid } from 'uuid';
import SaveCancelButtons from '../SaveCancelButtons';
import EditDeleteButtons from '../EditDeleteButtons';
import UpdateForm from '../UpdateForm';
import DinersListItemText from '../DinersListItemText';

function DinersList(props: any) {
  const {
    diners,
    activeDiner,
    setActiveDiner,
    updatingDinerIdx,
    handleUpdateDiner,
    handleSaveUpdatedDiner,
    handleCancelUpdateDiner,
    handleDeleteDiner,
    handleDinerNameChange,
    dinerName,
  } = props;

  return diners.map((diner: any, idx: number) => {
    const id = uuid();
    const isUpdatingDiner = updatingDinerIdx === idx;
    const isActiveDiner = activeDiner === idx;
    const listExpenseTextProps = {
      isActiveDiner,
      setActiveDiner,
      idx,
      diner,
    };

    return (
      <div key={id} className="flex">
        {!isUpdatingDiner ? (
          <DinersListItemText {...listExpenseTextProps} />
        ) : null}
        {isUpdatingDiner ? (
          <UpdateForm
            type="expense"
            handleSaveUpdated={handleSaveUpdatedDiner}
            handleNameChange={handleDinerNameChange}
            name={dinerName}
          />
        ) : null}
        {isUpdatingDiner ? (
          <SaveCancelButtons
            handleSave={handleSaveUpdatedDiner}
            handleCancelSave={handleCancelUpdateDiner}
          />
        ) : (
          <EditDeleteButtons
            handleUpdate={() => handleUpdateDiner(idx, diner.name)}
            handleDelete={() => handleDeleteDiner(idx)}
          />
        )}
      </div>
    );
  });
}

export default DinersList;
