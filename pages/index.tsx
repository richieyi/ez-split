import type { NextPage } from 'next';
import {
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
  CheckIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/Button';
import Input from '../components/Input';
// import styles from '../styles/Home.module.css';

const item1 = {
  name: 'Hot Dog',
  price: 1.5,
};
const item2 = {
  name: 'Waffle',
  price: 2.25,
};
const item3 = {
  name: 'Pizza',
  price: 3.5,
};
const exampleItems = [item1, item2, item3];

interface Item {
  name: string;
  price: number;
}

interface People {
  name: string;
  // percentage: number;
}

/*
TODO:
- Allow editing and deleting of items
- Display sub total
- Names of people
  - Allow assigning of people to items
  - Display percentage per person
*/

const Home: NextPage = () => {
  const [newItemName, setNewItemName] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isAddingNewItem, setIsAddingNewItem] =
    useState<boolean>(false);
  const [items, setItems] = useState<Item[]>(exampleItems);
  const [isEditingItem, setIsEditingItem] = useState<number>(-1);

  const [newPerson, setNewPerson] = useState<string>('');
  const [isAddingNewPerson, setIsAddingNewPerson] =
    useState<boolean>(false);
  const [people, setPeople] = useState<People[]>([]);

  function renderItems() {
    return items.map((item, idx) => (
      <div key={idx} className="flex w-full">
        <div className="flex justify-between border rounded border-slate-500 mt-2 mb-2 p-2 hover:bg-slate-100 w-5/6">
          <form onSubmit={handleUpdate}>
            {isEditingItem === idx ? (
              <input
                type="text"
                name="item"
                className="border-2 border-black rounded p-2 w-1/2"
                placeholder="Ex: Pizza"
                onChange={handleNameChange}
                value={newItemName}
              />
            ) : (
              <span>{item.name}</span>
            )}
            {isEditingItem === idx ? (
              <input
                type="text"
                name="price"
                className="border-2 border-black rounded p-2 w-1/2"
                placeholder="Ex: $3.50"
                onChange={handlePriceChange}
                value={newPrice}
              />
            ) : (
              <span>{`$${item.price}`}</span>
            )}
            <button type="submit" className="hidden" />
          </form>
        </div>
        <div className="flex align-middle w-1/6">
          <button
            type="button"
            onClick={() => handleEdit(idx, item.name, item.price)}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => handleDelete(idx)}>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    ));
  }

  function handleAddNewItem() {
    setIsAddingNewItem(true);
  }

  function handleSave() {
    if (newItemName.length > 0 && newPrice.length > 0) {
      setItems([
        ...items,
        { name: newItemName, price: Number(newPrice) },
      ]);
      setIsAddingNewItem(false);
      setHasError(false);
    } else {
      setHasError(true);
    }
  }

  function handleUpdate(e: any) {
    e.preventDefault();
    console.log('testing');
    let newArr = [...items];
    newArr[isEditingItem] = {
      name: newItemName,
      price: Number(newPrice),
    };
    setItems(newArr);
    setIsEditingItem(-1);
  }

  function handleCancel() {
    setIsAddingNewItem(false);
  }

  function handleEdit(idx: number, name: string, price: number) {
    setIsEditingItem(idx);
    setNewItemName(name);
    setNewPrice(String(price));
  }

  function handleDelete(idx: number) {
    setItems(items.filter((_, i) => i !== idx));
  }

  function handleNameChange(e: any) {
    setNewItemName(e.target.value);
  }

  function handlePriceChange(e: any) {
    setNewPrice(e.target.value);
  }

  function displayTotal() {
    return items.reduce(
      (prevVal, currVal) => prevVal + currVal.price,
      0
    );
  }

  function handlePersonNameChange(e: any) {
    setNewPerson(e.target.value);
  }

  function handleAddNewPerson() {
    setIsAddingNewPerson(true);
  }

  function handleSavePerson() {
    setPeople([...people, { name: newPerson }]);
    setIsAddingNewPerson(false);
  }

  function handleCancelPerson() {
    setNewPerson('');
    setIsAddingNewPerson(false);
  }

  function displayPeople() {
    return people.map((person, idx) => (
      <div key={idx}>{person.name}</div>
    ));
  }

  console.log('here', people);

  return (
    <div>
      <Head>
        <title>EZ Split</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="justify-center w-1/2">
        <h1 className="font-bold text-4xl">EZ Split</h1>
        <div className="flex-col justify-start">
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl">Items</h1>
              {!isAddingNewItem ? (
                <button
                  type="button"
                  // className="border-2 border-black rounded-full p-2"
                  onClick={handleAddNewItem}
                >
                  <PlusCircleIcon className="h-5 w-5" />
                </button>
              ) : null}
            </div>
            {renderItems()}
            {isAddingNewItem ? (
              <form className="flex">
                {/* <label htmlFor="first">Item</label> */}
                <input
                  type="text"
                  name="item"
                  className="border-2 border-black rounded p-2 w-1/2"
                  placeholder="Ex: Pizza"
                  onChange={handleNameChange}
                />
                {/* <label htmlFor="second">Price</label> */}
                <input
                  type="text"
                  name="price"
                  className="border-2 border-black rounded p-2 w-1/4"
                  placeholder="Ex: $10.00"
                  onChange={handlePriceChange}
                />
              </form>
            ) : null}
            <div className="flex">
              {isAddingNewItem ? (
                <button
                  type="button"
                  className="border-2 border-black rounded-full p-2"
                  onClick={handleSave}
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
              ) : null}
              {isAddingNewItem ? (
                <button
                  type="button"
                  className="border-2 border-black rounded-full p-2"
                  onClick={handleCancel}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              ) : null}
              {isAddingNewItem && hasError ? (
                <span>Error! Enter item and price.</span>
              ) : null}
            </div>
            <div className="flex justify-between p-2 font-bold">
              <span>Total</span>
              <span>{`$${displayTotal()}`}</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl">People</h1>
              {!isAddingNewPerson ? (
                <button
                  type="button"
                  // className="border-2 border-black rounded-full p-2"
                  onClick={handleAddNewPerson}
                >
                  <PlusCircleIcon className="h-5 w-5" />
                </button>
              ) : null}
            </div>
            <div>{displayPeople()}</div>
            {isAddingNewPerson ? (
              <form>
                {/* <label htmlFor="name">Name</label> */}
                <input
                  type="text"
                  name="name"
                  className="border-2 border-black rounded p-2"
                  placeholder="Ex: John"
                  onChange={handlePersonNameChange}
                />
              </form>
            ) : null}
            <div className="flex">
              {isAddingNewPerson ? (
                <button
                  type="button"
                  className="border-2 border-black rounded-full p-2"
                  onClick={handleSavePerson}
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
              ) : null}
              {isAddingNewPerson ? (
                <button
                  type="button"
                  className="border-2 border-black rounded-full p-2"
                  onClick={handleCancelPerson}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <footer>
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
