import { v4 as uuid } from 'uuid';
import SaveCancelButtons from '../SaveCancelButtons';
import EditDeleteButtons from '../EditDeleteButtons';
import UpdateForm from '../UpdateForm';
import PeopleListItemText from '../PeopleListItemText';

function PeopleList(props: any) {
  const {
    people,
    activePerson,
    setActivePerson,
    updatingPersonIdx,
    handleUpdatePerson,
    handleSaveUpdatedPerson,
    handleCancelUpdatePerson,
    handleDeletePerson,
    handlePersonNameChange,
    personName,
  } = props;

  return people.map((person: any, idx: number) => {
    const id = uuid();
    const isUpdatingPerson = updatingPersonIdx === idx;
    const isActivePerson = activePerson === idx;
    const listItemTextProps = {
      isActivePerson,
      setActivePerson,
      idx,
      person,
    };

    return (
      <div key={id} className="flex">
        {!isUpdatingPerson ? (
          <PeopleListItemText {...listItemTextProps} />
        ) : null}
        {isUpdatingPerson ? (
          <UpdateForm
            type="item"
            handleSaveUpdated={handleSaveUpdatedPerson}
            handleNameChange={handlePersonNameChange}
            name={personName}
          />
        ) : null}
        {isUpdatingPerson ? (
          <SaveCancelButtons
            handleSave={handleSaveUpdatedPerson}
            handleCancelSave={handleCancelUpdatePerson}
          />
        ) : (
          <EditDeleteButtons
            handleUpdate={() => handleUpdatePerson(idx, person.name)}
            handleDelete={() => handleDeletePerson(idx)}
          />
        )}
      </div>
    );
  });
}

export default PeopleList;
