import { useState } from 'react';
import Header from '../Header';
import { default as ItemsSection } from '../Items';
import { default as PeopleSection } from '../People';
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
- Bugs
  - Input bug when editing an item
  - Updating item price doesn't update price for the person
*/

function EZSplit() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [items, setItems] = useState<Item[]>(exampleItems);
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

  const itemsProps = {
    items,
    setItems,
    people,
    setPeople,
    activePerson,
    handleSetAsignee,
  };
  const peopleProps = {
    people,
    setPeople,
    activePerson,
    setActivePerson,
  };
  const headerProps = {
    showInstructions,
    setShowInstructions,
  };

  return (
    <>
      <Header {...headerProps} />
      <div className="flex-col justify-start">
        <ItemsSection {...itemsProps} />
        <PeopleSection {...peopleProps} />
      </div>
    </>
  );
}

export default EZSplit;
