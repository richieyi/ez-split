import IconButton from '../IconButton';
import Input from '../Input';

function NewPersonForm(props: any) {
  const {
    handleSavePerson,
    handlePersonNameChange,
    handleCancelSavePerson,
  } = props;

  return (
    <div className="flex">
      <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 hover:bg-slate-100 w-5/6">
        <form onSubmit={handleSavePerson}>
          <Input
            name="name"
            placeholder="Ex: John"
            onChange={handlePersonNameChange}
          />
        </form>
      </div>
      <div className="flex justify-around w-1/6 p2">
        <IconButton
          name="check"
          color="green"
          onClick={handleSavePerson}
        />
        <IconButton
          name="trash"
          color="red"
          onClick={handleCancelSavePerson}
        />
      </div>
    </div>
  );
}

export default NewPersonForm;
