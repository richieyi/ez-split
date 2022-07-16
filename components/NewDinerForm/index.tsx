import Input from '../Input';
import SaveCancelButtons from '../SaveCancelButtons';

function NewDinerForm(props: any) {
  const {
    handleSaveNewDiner,
    handleDinerNameChange,
    handleCancelSaveDiner,
  } = props;

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
        handleCancelSave={handleCancelSaveDiner}
      />
    </div>
  );
}

export default NewDinerForm;
