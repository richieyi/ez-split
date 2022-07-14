import { useState } from 'react';
import IconButton from '../IconButton';
import ItemsList from '../ItemsList';
import NewItemForm from '../NewItemForm';
import { isValidAmount } from '../../utils';

interface Item {
  name: string;
  price: number;
  assignee: number | null;
}

function Items(props: any) {
  const {
    items,
    setItems,
    people,
    setPeople,
    activePerson,
    handleSetAsignee,
  } = props;

  const [itemName, setItemName] = useState<string>('');
  const [itemPrice, setItemPrice] = useState<string>('');
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [updatingItemIdx, setUpdatingItemIdx] = useState<number>(-1);

  function handleAddNewItem() {
    setUpdatingItemIdx(-1);
    setItemName('');
    setItemPrice('');
    setIsAddingItem(true);
  }

  function isValidItem(): boolean {
    return (
      itemName.length > 0 &&
      itemPrice.length > 0 &&
      Number(itemPrice) > 0
    );
  }

  function handleSaveNewItem() {
    if (isValidItem()) {
      setItems([
        ...items,
        {
          name: itemName,
          price: Number(itemPrice),
          assignee: null,
        },
      ]);
      setIsAddingItem(false);
    }
  }

  function handleSaveUpdatedItem(e: any) {
    e.preventDefault();

    if (isValidItem()) {
      let newArr = [...items];
      newArr[updatingItemIdx] = {
        name: itemName,
        price: Number(itemPrice),
        assignee: null,
      };
      setItems(newArr);
      setUpdatingItemIdx(-1);
    }
  }

  function handleCancelSaveItem() {
    setIsAddingItem(false);
  }

  function handleUpdateItem(
    idx: number,
    name: string,
    price: number
  ) {
    setIsAddingItem(false);
    setUpdatingItemIdx(idx);
    setItemName(name);
    setItemPrice(String(price));
  }

  function handleDeleteItem(item: Item, idx: number) {
    const newPeople = [...people];
    if (item.assignee !== null) {
      newPeople[item.assignee].total -= item.price;
    }

    setItems(items.filter((_: any, i: number) => i !== idx));
    setPeople(newPeople);
  }

  function handleNameChange(e: any) {
    const val = e.target.value;

    if (val.length <= 16) {
      setItemName(e.target.value);
    }
  }

  function handlePriceChange(e: any) {
    const val = e.target.value;

    if (
      val === '' ||
      (val !== '$' && isValidAmount(val) && val.length < 7)
    ) {
      setItemPrice(e.target.value);
    }
  }

  function handleCancelUpdateItem() {
    setUpdatingItemIdx(-1);
  }

  function displayTotal() {
    return items.reduce(
      (prevVal: any, currVal: any) => prevVal + currVal.price,
      0
    );
  }

  const itemsProps = {
    items,
    updatingItemIdx,
    activePerson,
    people,
    handleSetAsignee,
    handleSaveUpdatedItem,
    handleNameChange,
    itemName,
    itemPrice,
    handlePriceChange,
    handleCancelUpdateItem,
    handleUpdateItem,
    handleDeleteItem,
  };
  const newItemFormProps = {
    handleSaveNewItem,
    handleNameChange,
    itemName,
    handlePriceChange,
    itemPrice,
    handleCancelSaveItem,
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl mb-2">
          Items ({items.length})
        </h1>
        {!isAddingItem ? (
          <IconButton
            name="plus"
            color="green"
            onClick={handleAddNewItem}
          />
        ) : null}
      </div>
      {<ItemsList {...itemsProps} />}
      {isAddingItem ? <NewItemForm {...newItemFormProps} /> : null}
      <div className="flex justify-between p-2 font-bold">
        <span>Total</span>
        <span>{`$${displayTotal()}`}</span>
      </div>
    </div>
  );
}

export default Items;
