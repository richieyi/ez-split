import { useState } from 'react';
import IconButton from '../IconButton';
import PeopleList from '../PeopleList';
import NewPersonForm from '../NewPersonForm';

function People(props: any) {
  const { people, setPeople, activePerson, setActivePerson } = props;

  const [personName, setPersonName] = useState<string>('');
  const [isAddingPerson, setIsAddingPerson] =
    useState<boolean>(false);

  function handleAddNewPerson() {
    setIsAddingPerson(true);
  }

  function handlePersonNameChange(e: any) {
    setPersonName(e.target.value);
  }

  function handleSavePerson() {
    setPeople([...people, { name: personName, total: 0 }]);
    setIsAddingPerson(false);
  }

  function handleCancelSavePerson() {
    setPersonName('');
    setIsAddingPerson(false);
  }

  const peopleListProps = {
    people,
    activePerson,
    setActivePerson,
  };
  const newPersonFormProps = {
    handleSavePerson,
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
