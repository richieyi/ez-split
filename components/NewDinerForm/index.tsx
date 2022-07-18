import Input from '../Input';
import SaveCancelButtons from '../SaveCancelButtons';

function NewDinerForm(props: any) {
  const {
    handleAddNewDiner,
    diner,
    handleDinerNameChange,
    resetNewDiner,
  } = props;

  return (
    <div className="border rounded p-4">
      <form onSubmit={handleAddNewDiner}>
        <Input
          name="dinerName"
          placeholder="Diner's nickname"
          value={diner}
          onChange={handleDinerNameChange}
        />
      </form>
      <SaveCancelButtons
        handleSave={handleAddNewDiner}
        handleCancel={resetNewDiner}
      />
    </div>
  );
}

export default NewDinerForm;
