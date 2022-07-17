import { useState } from 'react';
import useDiners from '../../hooks/useDiners';
import NewDinerForm from '../NewDinerForm';

function NewDinersList() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { diners, addDiner, removeDiner } = useDiners();

  function renderDiners() {
    return diners.map((diner: any) => {
      return (
        <div key={diner.id}>
          <div>
            {diner.name} {diner.cost}
          </div>
          <button onClick={() => removeDiner(diner.id)}>
            Remove
          </button>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>--Diners--</h1>
      <div>{renderDiners()}</div>
      {!showForm ? (
        <div onClick={() => setShowForm(true)}>Add New Diner</div>
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
