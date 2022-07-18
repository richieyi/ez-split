import Input from '../Input';
import IconButton from '../IconButton';
import SaveCancelButtons from '../SaveCancelButtons';

function NewDinerForm(props: any) {
  const { handleAddNewDiner, diner, setDiner, resetNewDiner } = props;

  return (
    <div className="border rounded p-4">
      <form onSubmit={handleAddNewDiner}>
        <Input
          name="dinerName"
          placeholder="Diner Name"
          value={diner}
          onChange={(e: any) => setDiner(e.target.value)}
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
