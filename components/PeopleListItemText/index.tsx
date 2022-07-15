function PeopleListItemText(props: any) {
  const { isActivePerson, setActivePerson, idx, person } = props;

  return (
    <div
      className={`flex justify-between border-2 rounded w-5/6 shadow-md ${
        isActivePerson ? 'border-green-400' : 'border-slate-300'
      } mt-2 mb-2 p-3 hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg shadow-cyan-500/50"`}
      onClick={() => setActivePerson(isActivePerson ? -1 : idx)}
    >
      <span>{person.name}</span>
      <span>
        {person.total ? `$${person.total.toFixed(2)}` : `$0`}
      </span>
    </div>
  );
}

export default PeopleListItemText;
