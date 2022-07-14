import IconButton from '../IconButton';
import Input from '../Input';

function NewItemForm(props: any) {
  const {
    handleSaveNewItem,
    handleNameChange,
    itemName,
    handlePriceChange,
    itemPrice,
    handleCancelSaveItem,
  } = props;

  return (
    <div className="flex">
      <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 hover:bg-slate-100 w-5/6">
        <form className="flex" onSubmit={handleSaveNewItem}>
          <Input
            name="item"
            placeholder="Item (Ex: Pizza)"
            onChange={handleNameChange}
            value={itemName}
          />
          <Input
            name="item"
            placeholder="Price (Ex: 3.50)"
            onChange={handlePriceChange}
            value={itemPrice}
          />
          <button type="submit" className="hidden" />
        </form>
      </div>
      <div className="flex justify-around w-1/6 p2">
        <IconButton
          name="check"
          color="green"
          onClick={handleSaveNewItem}
        />
        <IconButton
          name="trash"
          color="red"
          onClick={handleCancelSaveItem}
        />
      </div>
    </div>
  );
}

export default NewItemForm;
