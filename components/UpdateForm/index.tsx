import Input from '../Input';

function UpdateForm(props: any) {
  const {
    type,
    handleSaveUpdated,
    handleNameChange,
    name,
    handleCostChange,
    cost,
  } = props;

  function renderInputs() {
    if (type === 'diner') {
      return (
        <Input
          name="expense"
          placeholder="Nickname (Ex: John)"
          onChange={handleNameChange}
          value={name}
        />
      );
    } else {
      return (
        <>
          <Input
            name="expense"
            placeholder="Ex: Pizza"
            onChange={handleNameChange}
            value={name}
          />
          <Input
            name="cost"
            placeholder="Ex: $3.50"
            onChange={handleCostChange}
            value={cost}
          />
        </>
      );
    }
  }

  return (
    <div className="flex justify-between border-2 rounded border-slate-300 mt-2 mb-2 p-2 w-5/6">
      <form
        onSubmit={handleSaveUpdated}
        className="flex justify-between w-full"
      >
        {renderInputs()}
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
}

export default UpdateForm;
