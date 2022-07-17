import { useState } from 'react';
import useActiveItem from '../../hooks/useActiveItem';
import useDiners from '../../hooks/useDiners';
import EditDeleteButtons from '../EditDeleteButtons';
import NewDinerForm from '../NewDinerForm';

function NewDinersList() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { diners, addDiner, removeDiner } = useDiners();
  const { activeDiner, updateActiveDiner } = useActiveItem();
  console.log('active diner', activeDiner);
  console.log('din', diners);

  function renderDiners() {
    return diners.map((diner: any) => {
      const isActiveDiner = diner.id === activeDiner?.id;
      return (
        <div
          key={diner.id}
          className="border p-2 my-4 flex justify-between"
        >
          <div
            className={isActiveDiner ? 'text-red-500' : ''}
            onClick={() =>
              updateActiveDiner(isActiveDiner ? null : diner)
            }
          >
            {diner.name} {diner.cost}
          </div>
          <EditDeleteButtons
            handleDelete={() => removeDiner(diner.id)}
          />
        </div>
      );
    });
  }

  return (
    <div>
      <h1>--Diners--</h1>
      <div>{renderDiners()}</div>
      {!showForm ? (
        <button onClick={() => setShowForm(true)}>
          Add New Diner
        </button>
      ) : (
        <NewDinerForm
          addDiner={addDiner}
          handleHideForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default NewDinersList;
