import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import IconButton from '../components/IconButton';
import Input from '../components/Input';
// import Button from '../components/Button';
// import styles from '../styles/Home.module.css';

const item1 = {
  name: 'Hot Dog',
  price: 1.5,
  assignee: null,
};
const item2 = {
  name: 'Waffle',
  price: 2.25,
  assignee: null,
};
const item3 = {
  name: 'Pizza',
  price: 3.5,
  assignee: null,
};
const exampleItems = [item1, item2, item3];
const examplePeople = [
  { name: 'John', total: 0 },
  { name: 'Jane', total: 0 },
  { name: 'Bob', total: 0 },
];

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
  - Allow editing/deleting of person
- CSS/UX
  - UX for adding items
    - Autofocus on input when adding
- Other
  - Limit chars of names and items
  - Regex for price input handling
  - Display error message when adding item or person
*/

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>('');
  const [itemPrice, setItemPrice] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>(exampleItems);
  const [editingItemIdx, setEditingItemIdx] = useState<number>(-1);

  const [personName, setPersonName] = useState<string>('');
  const [isAddingPerson, setIsAddingPerson] =
    useState<boolean>(false);
  const [people, setPeople] = useState<People[]>(examplePeople);

  const [activePerson, setActivePerson] = useState<number>(-1);
  console.log('active', activePerson);
  console.log('items', items);
  console.log('peeps', people);

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
      // Item is not assigned at all => give item to active person
      newItems[itemIdx].assignee = activePerson;
      newPeople[activePerson].total += itemPrice;
    } else if (itemAssignee !== null && isAssignedToActivePerson) {
      // Item is assigned to active person => memove item from active person
      newItems[itemIdx].assignee = null;
      newPeople[activePerson].total -= itemPrice;
    } else if (itemAssignee !== null && !isAssignedToActivePerson) {
      // Remove item from non-active person and assign to active person
      newItems[itemIdx].assignee = activePerson;
      newPeople[activePerson].total += itemPrice;

      if (currentlyAssignedPerson) {
        newPeople[currentlyAssignedPerson].total -= itemPrice;
      }
    }

    setItems(newItems);
    setPeople(newPeople);
  }

  function renderItems() {
    return items.map((item, idx) => {
      const isEditingItem = editingItemIdx === idx;
      const isAssignedToActivePerson = item.assignee === activePerson;
      const assigneeName =
        item.assignee !== null ? people[item.assignee].name : '';

      return (
        <div key={idx} className="flex w-full">
          {!isEditingItem ? (
            <div
              className={`flex justify-between border rounded w-5/6 ${
                isAssignedToActivePerson
                  ? 'border-yellow-400'
                  : 'border-slate-400'
              } mt-2 mb-2 p-2 hover:cursor-pointer hover:bg-slate-200 hover:shadow-lg shadow-cyan-500/50"`}
              onClick={
                activePerson !== -1
                  ? () =>
                      handleSetAsignee(
                        idx,
                        item.price,
                        item.assignee,
                        isAssignedToActivePerson
                      )
                  : () => {}
              }
            >
              {assigneeName ? (
                <span>{`${item.name} (${assigneeName})`}</span>
              ) : (
                <span>{item.name}</span>
              )}
              <span>{`$${item.price.toFixed(2)}`}</span>
            </div>
          ) : null}
          {isEditingItem ? (
            <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 w-5/6">
              <form
                onSubmit={handleUpdateItem}
                className="flex justify-between w-full"
              >
                <Input
                  name="item"
                  placeholder="Ex: Pizza"
                  onChange={handleNameChange}
                  value={itemName}
                />
                <Input
                  name="price"
                  placeholder="Ex: $3.50"
                  onChange={handlePriceChange}
                  value={itemPrice}
                />
                <button type="submit" className="hidden" />
              </form>
            </div>
          ) : null}
          <div className="flex justify-around w-1/6 p2">
            {isEditingItem ? (
              <>
                <IconButton
                  name="check"
                  color="green"
                  onClick={(e: any) => handleUpdateItem(e)}
                />
                <IconButton
                  name="x"
                  color="red"
                  onClick={handleCancelUpdate}
                />
              </>
            ) : (
              <>
                <IconButton
                  name="pencil"
                  color="blue"
                  onClick={() =>
                    handleEditItem(idx, item.name, item.price)
                  }
                />
                <IconButton
                  name="trash"
                  color="red"
                  onClick={() => handleDeleteItem(idx)}
                />
              </>
            )}
          </div>
        </div>
      );
    });
  }

  function handleAddNewItem() {
    setIsAddingItem(true);
  }

  function handleSaveItem() {
    if (itemName.length > 0 && itemPrice.length > 0) {
      setItems([
        ...items,
        {
          name: itemName,
          price: Number(itemPrice),
          assignee: null,
        },
      ]);
      setIsAddingItem(false);
      setHasError(false);
    } else {
      setHasError(true);
    }
  }

  function handleUpdateItem(e: any) {
    e.preventDefault();
    let newArr = [...items];
    newArr[editingItemIdx] = {
      name: itemName,
      price: Number(itemPrice),
      assignee: null,
    };
    setItems(newArr);
    setEditingItemIdx(-1);
  }

  function handleCancelUpdateItem() {
    setIsAddingItem(false);
  }

  function handleEditItem(idx: number, name: string, price: number) {
    setEditingItemIdx(idx);
    setItemName(name);
    setItemPrice(String(price));
  }

  function handleDeleteItem(idx: number) {
    setItems(items.filter((_, i) => i !== idx));
  }

  function handleNameChange(e: any) {
    setItemName(e.target.value);
  }

  function handlePriceChange(e: any) {
    setItemPrice(e.target.value);
  }

  function handleCancelUpdate() {
    setEditingItemIdx(-1);
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

  // function getPersonsTotal(personIdx: number) {
  //   return items.reduce((prev, curr) => {
  //     if (personIdx === curr.assignee) {
  //       console.log('curr', curr);
  //       return prev + curr.price;
  //     } else {
  //       return 0;
  //     }
  //   }, 0);
  // }

  function renderPeople() {
    return people.map((person, idx) => {
      const isActivePerson = activePerson === idx;

      return (
        <div
          key={idx}
          className={`flex justify-between border rounded ${
            isActivePerson ? 'border-green-400' : 'border-slate-400'
          } mt-2 mb-2 p-2 hover:cursor-pointer hover:bg-slate-200 hover:shadow-lg shadow-cyan-500/50"`}
          onClick={() => setActivePerson(isActivePerson ? -1 : idx)}
        >
          <span>{person.name}</span>
          <span>
            {person.total ? `$${person.total.toFixed(2)}` : `$0`}
          </span>
        </div>
      );
    });
  }

  return (
    <div>
      <Head>
        <title>EZ Split</title>
        <meta
          name="description"
          content="Easily split up your bill with friends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container w-1/2 ml-auto mr-auto">
          <div>
            <h1 className="font-bold text-4xl">EZ Split</h1>
          </div>
          <div className="flex-col justify-start">
            <div>
              <div className="flex justify-between">
                <h1 className="font-bold text-2xl">Items</h1>
                {!isAddingItem ? (
                  <IconButton
                    name="plus"
                    color="blue"
                    onClick={handleAddNewItem}
                  />
                ) : null}
              </div>
              {renderItems()}
              {isAddingItem ? (
                <div className="flex">
                  <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 hover:bg-slate-200 w-5/6">
                    <form className="flex" onSubmit={handleSaveItem}>
                      <Input
                        name="item"
                        placeholder="Ex: Pizza"
                        onChange={handleNameChange}
                      />
                      <Input
                        name="item"
                        placeholder="Ex: $3.50"
                        onChange={handlePriceChange}
                      />
                      <button type="submit" className="hidden" />
                    </form>
                  </div>
                  <div className="flex justify-around w-1/6 p2">
                    <IconButton
                      name="check"
                      color="green"
                      onClick={handleSaveItem}
                    />
                    <IconButton
                      name="trash"
                      color="red"
                      onClick={handleCancelUpdateItem}
                    />
                    {/* {hasError ? (
                      <span>Error! Enter item and price.</span>
                    ) : null} */}
                  </div>
                </div>
              ) : null}
              <div className="flex justify-between p-2 font-bold">
                <span>Total</span>
                <span>{`$${displayTotal()}`}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <h1 className="font-bold text-2xl">People</h1>
                {!isAddingPerson ? (
                  <IconButton
                    name="plus"
                    color="blue"
                    onClick={handleAddNewPerson}
                  />
                ) : null}
              </div>
              <div>{renderPeople()}</div>
              {isAddingPerson ? (
                <div className="flex">
                  <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 hover:bg-slate-200 w-5/6">
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
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <footer className="justify-center w-1/2 ml-auto mr-auto">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
