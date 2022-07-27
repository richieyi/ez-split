import { useState } from 'react';
import Input from './Input';
import SaveCancelButtons from './SaveCancelButtons';

interface Props {
  name?: string;
  handleSaveDiner: (e: any, dinerName: string) => void;
  handleCancelDiner: () => void;
}

function DinerForm(props: Props) {
  const { name, handleSaveDiner, handleCancelDiner } = props;

  const [dinerName, setDiner] = useState<string>(name || '');

  function onSaveDiner(e: any) {
    e.preventDefault();
    handleSaveDiner(e, dinerName);
  }

  function handleNameChange(e: any) {
    const val = e.target.value;
    if (val.length <= 10) {
      setDiner(val);
    }
  }

  return (
    <>
      <form onSubmit={onSaveDiner}>
        <Input
          name="dinerName"
          placeholder="Diner's nickname"
          value={dinerName}
          onChange={handleNameChange}
        />
        <button type="submit" className="hidden" />
      </form>
      <SaveCancelButtons
        handleSave={onSaveDiner}
        handleCancel={handleCancelDiner}
      />
    </>
  );
}

export default DinerForm;
