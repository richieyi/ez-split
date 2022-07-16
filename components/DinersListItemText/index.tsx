function DinersListItemText(props: any) {
  const { isActiveDiner, setActiveDiner, idx, diner } = props;

  return (
    <div
      className={`flex justify-between border-2 rounded w-5/6 shadow-md ${
        isActiveDiner ? 'border-green-400' : 'border-slate-300'
      } mt-2 mb-2 p-3 hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg shadow-cyan-500/50"`}
      onClick={() => setActiveDiner(isActiveDiner ? -1 : idx)}
    >
      <span>{diner.name}</span>
      <span>{diner.total ? `$${diner.total.toFixed(2)}` : `$0`}</span>
    </div>
  );
}

export default DinersListItemText;
