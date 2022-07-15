function ItemsListItemText(props: any) {
  const {
    item,
    isAssignedToActivePerson,
    activePerson,
    handleSetAsignee,
    idx,
    assigneeName,
  } = props;

  return (
    <div
      className={`flex justify-between border-2 rounded w-5/6 shadow-md ${
        isAssignedToActivePerson
          ? 'border-green-400'
          : 'border-slate-300'
      } mt-2 mb-2 p-3 hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg"`}
      onClick={
        activePerson !== -1
          ? () =>
              handleSetAsignee(
                idx,
                item.price,
                item.assignee,
                isAssignedToActivePerson
              )
          : () => {}
      }
    >
      {assigneeName ? (
        <span>
          {item.name}{' '}
          <span className="text-sm italic text-stone-400">
            ({assigneeName})
          </span>
        </span>
      ) : (
        <span>{item.name}</span>
      )}
      <span>{`$${item.price.toFixed(2)}`}</span>
    </div>
  );
}

export default ItemsListItemText;
