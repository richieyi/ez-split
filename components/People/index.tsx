import { useState } from 'react';
import SectionHeader from '../SectionHeader';
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
    const total = newPeople[updatingPersonIdx].total;
    newPeople[updatingPersonIdx] = {
      name: personName,
      total,
    };
    setPeople(newPeople);
    setUpdatingPersonIdx(-1);
  }

  function handleCancelUpdatePerson() {
    setPersonName('');
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
    handleCancelUpdatePerson,
    handleDeletePerson,
  };
  const newPersonFormProps = {
    handleSaveNewPerson,
    handlePersonNameChange,
    handleCancelSavePerson,
  };

  return (
    <div className="mb-8">
      <SectionHeader
        headerTitle={`People (${people.length})`}
        isAdding={isAddingPerson}
        handleAddNew={handleAddNewPerson}
      />
      <PeopleList {...peopleListProps} />
      {isAddingPerson ? (
        <NewPersonForm {...newPersonFormProps} />
      ) : null}
    </div>
  );
}

export default People;
