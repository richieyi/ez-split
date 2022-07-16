function ExpensesListItemText(props: any) {
  const {
    expense,
    isAssignedToActiveDiner,
    activeDiner,
    handleSetAsignee,
    idx,
    assigneeName,
  } = props;

  return (
    <div
      className={`flex justify-between border-2 rounded w-5/6 shadow-md ${
        isAssignedToActiveDiner
          ? 'border-green-400'
          : 'border-slate-300'
      } mt-2 mb-2 p-3 hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg"`}
      // onClick={
      //   activeDiner !== -1
      //     ? () =>
      //         handleSetAsignee(
      //           idx,
      //           expense.cost,
      //           expense.assignee,
      //           isAssignedToActiveDiner
      //         )
      //     : () => {}
      // }
    >
      {assigneeName ? (
        <span>
          {expense.name}{' '}
          <span className="text-sm italic text-stone-400">
            ({assigneeName})
          </span>
        </span>
      ) : (
        <span>{expense.name}</span>
      )}
      <span>{`$${expense.cost.toFixed(2)}`}</span>
    </div>
  );
}

export default ExpensesListItemText;
