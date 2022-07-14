import { v4 as uuid } from 'uuid';
import IconButton from '../IconButton';
import Input from '../Input';

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

    return (
      <div key={id} className="flex">
        {!isUpdatingPerson ? (
          <div
            className={`flex justify-between border rounded w-5/6 shadow-md ${
              isActivePerson ? 'border-green-400' : 'border-slate-400'
            } mt-2 mb-2 p-2 hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg shadow-cyan-500/50"`}
            onClick={() => setActivePerson(isActivePerson ? -1 : idx)}
          >
            <span>{person.name}</span>
            <span>
              {person.total ? `$${person.total.toFixed(2)}` : `$0`}
            </span>
          </div>
        ) : null}
        {isUpdatingPerson ? (
          <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 w-5/6">
            <form
              onSubmit={handleSaveUpdatedPerson}
              className="flex justify-between w-full"
            >
              <Input
                name="item"
                placeholder="Nickname (Ex: John)"
                onChange={handlePersonNameChange}
                value={personName}
              />
              <button type="submit" className="hidden" />
            </form>
          </div>
        ) : null}
        <div className="flex justify-around w-1/6 p2">
          {isUpdatingPerson ? (
            <>
              <IconButton
                name="check"
                color="green"
                onClick={(e: any) => handleSaveUpdatedPerson(e)}
              />
              <IconButton
                name="x"
                color="red"
                onClick={handleCancelUpdatePerson}
              />
            </>
          ) : (
            <>
              <IconButton
                name="pencil"
                color="blue"
                onClick={() => handleUpdatePerson(idx, person.name)}
              />
              <IconButton
                name="trash"
                color="red"
                onClick={() => handleDeletePerson(idx)}
              />
            </>
          )}
        </div>
      </div>
    );
  });
}

export default PeopleList;
