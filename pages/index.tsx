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
const examplePeople = [
  { name: 'John' },
  { name: 'Jane' },
  { name: 'Bob' },
];

interface Item {
  name: string;
  price: number;
}

interface People {
  name: string;
}

/*
TODO:
- Names of people
  - Allow assigning of people to items
  - Display total per person
- CSS/UX
  - Style line items
  - UX for adding items
    - Autofocus on input when adding
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
  const [people, setPeople] = useState<People[]>(examplePeople);

  function renderItems() {
    return items.map((item, idx) => (
      <div key={idx} className="flex w-full">
        <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 hover:bg-slate-200 w-5/6">
          <form
            onSubmit={handleUpdate}
            className="flex justify-between w-full"
          >
            {isEditingItem === idx ? (
              <>
                <Input
                  name="item"
                  placeholder="Ex: Pizza"
                  onChange={handleNameChange}
                  value={newItemName}
                />
                <Input
                  name="price"
                  placeholder="Ex: $3.50"
                  onChange={handlePriceChange}
                  value={newPrice}
                />
              </>
            ) : (
              <>
                <span>{item.name}</span>
                <span>{`$${item.price}`}</span>
              </>
            )}
            <button type="submit" className="hidden" />
          </form>
        </div>
        <div className="flex justify-around w-1/6 p2">
          {isEditingItem === idx ? (
            <IconButton
              name="check"
              color="green"
              onClick={(e: any) => handleUpdate(e)}
            />
          ) : (
            <IconButton
              name="pencil"
              color="blue"
              onClick={() => handleEdit(idx, item.name, item.price)}
            />
          )}
          {isEditingItem === idx ? (
            <IconButton
              name="x"
              color="red"
              onClick={handleCancelUpdate}
            />
          ) : (
            <IconButton
              name="trash"
              color="red"
              onClick={() => handleDelete(idx)}
            />
          )}
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

  function handleCancelUpdate() {
    setIsEditingItem(-1);
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

  function renderPeople() {
    return people.map((person, idx) => (
      <div
        key={idx}
        className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 hover:bg-slate-200"
      >
        <span>{person.name}</span>
      </div>
    ));
  }

  console.log('here', people);

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
                {!isAddingNewItem ? (
                  <IconButton
                    name="plus"
                    color="blue"
                    onClick={handleAddNewItem}
                  />
                ) : null}
              </div>
              {renderItems()}
              {isAddingNewItem ? (
                <div className="flex">
                  <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 hover:bg-slate-200 w-5/6">
                    <form className="flex" onSubmit={handleSave}>
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
                      onClick={handleSave}
                    />
                    <IconButton
                      name="trash"
                      color="red"
                      onClick={handleCancel}
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
                {!isAddingNewPerson ? (
                  <IconButton
                    name="plus"
                    color="blue"
                    onClick={handleAddNewPerson}
                  />
                ) : null}
              </div>
              <div>{renderPeople()}</div>
              {isAddingNewPerson ? (
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
                      onClick={handleCancelPerson}
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
