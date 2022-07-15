import Input from '../Input';

function UpdateForm(props: any) {
  const {
    type,
    handleSaveUpdated,
    handleNameChange,
    name,
    handlePriceChange,
    price,
  } = props;

  function renderInputs() {
    if (type === 'person') {
      return (
        <Input
          name="item"
          placeholder="Nickname (Ex: John)"
          onChange={handleNameChange}
          value={name}
        />
      );
    } else {
      return (
        <>
          <Input
            name="item"
            placeholder="Ex: Pizza"
            onChange={handleNameChange}
            value={name}
          />
          <Input
            name="price"
            placeholder="Ex: $3.50"
            onChange={handlePriceChange}
            value={price}
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
