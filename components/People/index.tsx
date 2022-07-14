import { useState } from 'react';
import IconButton from '../IconButton';
import PeopleList from '../PeopleList';
import NewPersonForm from '../NewPersonForm';

function People(props: any) {
  const { people, setPeople, activePerson, setActivePerson } = props;

  const [personName, setPersonName] = useState<string>('');
  const [isAddingPerson, setIsAddingPerson] =
    useState<boolean>(false);
  const [updatingPersonIdx, setUpdatingPersonIdx] =
    useState<number>(-1);

  function handleAddNewPerson() {
    setUpdatingPersonIdx(-1);
    setPersonName('');
    setIsAddingPerson(true);
  }

  function handlePersonNameChange(e: any) {
    setPersonName(e.target.value);
  }

  function handleSaveNewPerson() {
    setPeople([...people, { name: personName, total: 0 }]);
    setIsAddingPerson(false);
    setUpdatingPersonIdx(-1);
  }

  function handleSaveUpdatedPerson(e: any) {
    e.preventDefault();

    const newPeople = [...people];
    newPeople[updatingPersonIdx] = {
      name: personName,
      // TODO: FIX total
      total: 0,
    };
    setPeople(newPeople);
    setUpdatingPersonIdx(-1);
  }

  function handleCancelSavePerson() {
    setPersonName('');
    setIsAddingPerson(false);
  }

  function handleUpdatePerson(idx: number, name: string) {
    setIsAddingPerson(false);
    setUpdatingPersonIdx(idx);
    setPersonName(name);
  }

  function handleDeletePerson(idx: number) {
    setPeople(people.filter((_: any, i: number) => i !== idx));
  }

  const peopleListProps = {
    people,
    activePerson,
    setActivePerson,
    updatingPersonIdx,
    handlePersonNameChange,
    personName,
    handleUpdatePerson,
    handleSaveUpdatedPerson,
    handleDeletePerson,
  };
  const newPersonFormProps = {
    handleSaveNewPerson,
    handlePersonNameChange,
    handleCancelSavePerson,
  };

  return (
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
      <PeopleList {...peopleListProps} />
      {isAddingPerson ? (
        <NewPersonForm {...newPersonFormProps} />
      ) : null}
    </div>
  );
}

export default People;
