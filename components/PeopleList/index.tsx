import { v4 as uuid } from 'uuid';

function PeopleList(props: any) {
  const { people, activePerson, setActivePerson } = props;

  return people.map((person: any, idx: number) => {
    const id = uuid();
    const isActivePerson = activePerson === idx;

    return (
      <div
        key={id}
        className={`flex justify-between border rounded shadow-md ${
          isActivePerson ? 'border-green-400' : 'border-slate-400'
        } mt-2 mb-2 p-2 hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg shadow-cyan-500/50"`}
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

export default PeopleList;
