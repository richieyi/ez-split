import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Input from '../Input';
import SaveCancelButtons from '../SaveCancelButtons';

function NewDinerForm(props: any) {
  const { addDiner, handleHideForm } = props;

  const [dinerName, setDinerName] = useState<string>('');

  function handleSaveNewDiner() {
    addDiner({
      id: uuid(),
      name: dinerName,
      expenses: [],
    });
    handleHideForm();
  }

  function handleDinerNameChange(e: any) {
    setDinerName(e.target.value);
  }

  return (
    <div className="flex">
      <div className="flex justify-between border-2 rounded border-slate-300 mt-2 mb-2 p-2 hover:bg-slate-100 w-5/6">
        <form onSubmit={handleSaveNewDiner}>
          <Input
            name="name"
            placeholder="Nickname (Ex: John)"
            onChange={handleDinerNameChange}
          />
        </form>
      </div>
      <SaveCancelButtons
        handleSave={handleSaveNewDiner}
        handleCancelSave={handleHideForm}
      />
    </div>
  );
}

export default NewDinerForm;
