import Input from '../Input';
import SaveCancelButtons from '../SaveCancelButtons';

function NewPersonForm(props: any) {
  const {
    handleSaveNewPerson,
    handlePersonNameChange,
    handleCancelSavePerson,
  } = props;

  return (
    <div className="flex">
      <div className="flex justify-between border-2 rounded border-slate-300 mt-2 mb-2 p-2 hover:bg-slate-100 w-5/6">
        <form onSubmit={handleSaveNewPerson}>
          <Input
            name="name"
            placeholder="Nickname (Ex: John)"
            onChange={handlePersonNameChange}
          />
        </form>
      </div>
      <SaveCancelButtons
        handleSave={handleSaveNewPerson}
        handleCancelSave={handleCancelSavePerson}
      />
    </div>
  );
}

export default NewPersonForm;
