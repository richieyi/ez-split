import { useState } from 'react';
import IconButton from '../IconButton';
import ItemsList from '../ItemsList';
import NewItemForm from '../NewItemForm';
import PeopleList from '../PeopleList';
import NewPersonForm from '../NewPersonForm';
import { exampleItems, examplePeople } from './examples';

interface Item {
  name: string;
  price: number;
  assignee: number | null;
}

interface People {
  name: string;
  total: number;
}

/*
TODO:
- Names of people
  - Allow updating/deleting of person
- CSS/UX
  - UX for adding items
    - Autofocus on input when adding
- Other
  - Limit chars of names and items
  - Regex for price input handling
  - Display error message when adding item or person
*/

function EZSplit() {
  const [showInstructions, setShowInstructions] = useState(false);

  const [itemName, setItemName] = useState<string>('');
  const [itemPrice, setItemPrice] = useState<string>('');
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>(exampleItems);
  const [updatingItemIdx, setUpdatingItemIdx] = useState<number>(-1);

  const [personName, setPersonName] = useState<string>('');
  const [isAddingPerson, setIsAddingPerson] =
    useState<boolean>(false);
  const [people, setPeople] = useState<People[]>(examplePeople);

  const [activePerson, setActivePerson] = useState<number>(-1);
  console.log('items', items);

  function handleSetAsignee(
    itemIdx: number,
    itemPrice: number,
    itemAssignee: number | null,
    isAssignedToActivePerson: boolean
  ) {
    const newItems = [...items];
    const newPeople = [...people];
    const currentlyAssignedPerson = items[itemIdx].assignee;

    if (itemAssignee === null) {
      // Item is not assigned at all => assign item to active person
      newItems[itemIdx].assignee = activePerson;
      newPeople[activePerson].total += itemPrice;
    } else if (itemAssignee !== null && isAssignedToActivePerson) {
      // Item is assigned to active person => unassign item from active person
      newItems[itemIdx].assignee = null;
      newPeople[activePerson].total -= itemPrice;
    } else if (itemAssignee !== null && !isAssignedToActivePerson) {
      // Item is assigned, but not assigned to active person => re-assign item to active person
      newItems[itemIdx].assignee = activePerson;
      newPeople[activePerson].total += itemPrice;

      if (currentlyAssignedPerson !== null) {
        newPeople[currentlyAssignedPerson].total -= itemPrice;
      }
    }

    setItems(newItems);
    setPeople(newPeople);
  }

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

    setItems(items.filter((_, i) => i !== idx));
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
    const regex =
      /"^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$"/;

    /*
    Regex found here: https://stackoverflow.com/a/354276
    Prevent dollar sign and input limit of 6 chars (max: $999,999)
    */
    if (
      val === '' ||
      (val !== '$' && !val.search(regex) && val.length < 7)
    ) {
      setItemPrice(e.target.value);
    }
  }

  function handleCancelUpdateItem() {
    setUpdatingItemIdx(-1);
  }

  function displayTotal() {
    return items.reduce(
      (prevVal, currVal) => prevVal + currVal.price,
      0
    );
  }

  function handlePersonNameChange(e: any) {
    setPersonName(e.target.value);
  }

  function handleAddNewPerson() {
    setIsAddingPerson(true);
  }

  function handleSavePerson() {
    setPeople([...people, { name: personName, total: 0 }]);
    setIsAddingPerson(false);
  }

  function handleCancelSavePerson() {
    setPersonName('');
    setIsAddingPerson(false);
  }

  function renderInstructions() {
    if (showInstructions) {
      return (
        <div>
          <div className="mb-2">
            <span>Want to split a bill with no frills?</span>
          </div>
          <div className="mb-8">
            <span>
              Add items and names. Click a name and then click an item
              to assign. EZ.
            </span>
          </div>
        </div>
      );
    }
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
  const peopleProps = { people, activePerson, setActivePerson };
  const newPersonFormProps = {
    handleSavePerson,
    handlePersonNameChange,
    handleCancelSavePerson,
  };

  return (
    <>
      <div className="flex justify-between ">
        <h1 className="font-bold text-4xl mb-8">EZ Split</h1>
        <IconButton
          name="question"
          color="yellow"
          onClick={() => setShowInstructions(!showInstructions)}
        />
      </div>
      {renderInstructions()}
      <div className="flex-col justify-start">
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
          {isAddingItem ? (
            <NewItemForm {...newItemFormProps} />
          ) : null}
          <div className="flex justify-between p-2 font-bold">
            <span>Total</span>
            <span>{`$${displayTotal()}`}</span>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl">
              People ({people.length})
            </h1>
            {!isAddingPerson ? (
              <IconButton
                name="plus"
                color="green"
                onClick={handleAddNewPerson}
              />
            ) : null}
          </div>
          <PeopleList {...peopleProps} />
          {isAddingPerson ? (
            <NewPersonForm {...newPersonFormProps} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default EZSplit;
