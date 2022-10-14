import { ChangeEvent, useState } from 'react';
import Input from '@/components/Input';
import SaveCancelButtons from '@/components/SaveCancelButtons';

interface DinerFormProps {
  name?: string;
  handleSaveDiner: (
    e: ChangeEvent<HTMLFormElement>,
    dinerName: string
  ) => void;
  handleCancelDiner: () => void;
}

function DinerForm(props: DinerFormProps) {
  const { name, handleSaveDiner, handleCancelDiner } = props;

  const [dinerName, setDiner] = useState<string>(name || '');

  function onSaveDiner(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSaveDiner(e, dinerName);
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
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
          autoFocus
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
