import { v4 as uuid } from 'uuid';
import IconButton from '../IconButton';
import Input from '../Input';

function ItemsList(props: any) {
  const {
    items,
    updatingItemIdx,
    activePerson,
    people,
    handleSetAsignee,
    handleSaveUpdatedItem,
    handleNameChange,
    itemName,
    itemPrice,
    handlePriceChange,
    handleCancelUpdateItem,
    handleUpdateItem,
    handleDeleteItem,
  } = props;

  return items.map((item: any, idx: number) => {
    const id = uuid();
    const isUpdatingItem = updatingItemIdx === idx;
    const isAssignedToActivePerson = item.assignee === activePerson;
    const assigneeName =
      item.assignee !== null ? people[item.assignee].name : '';

    return (
      <div key={id} className="flex">
        {!isUpdatingItem ? (
          <div
            className={`flex justify-between border rounded w-5/6 shadow-md ${
              isAssignedToActivePerson
                ? 'border-green-400'
                : 'border-slate-400'
            } mt-2 mb-2 p-2 hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg"`}
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
              <span>{`${item.name} (${assigneeName})`}</span>
            ) : (
              <span>{item.name}</span>
            )}
            <span>{`$${item.price.toFixed(2)}`}</span>
          </div>
        ) : null}
        {isUpdatingItem ? (
          <div className="flex justify-between border rounded border-slate-400 mt-2 mb-2 p-2 w-5/6">
            <form
              onSubmit={handleSaveUpdatedItem}
              className="flex justify-between w-full"
            >
              <Input
                name="item"
                placeholder="Ex: Pizza"
                onChange={handleNameChange}
                value={itemName}
              />
              <Input
                name="price"
                placeholder="Ex: $3.50"
                onChange={handlePriceChange}
                value={itemPrice}
              />
              <button type="submit" className="hidden" />
            </form>
          </div>
        ) : null}
        <div className="flex justify-around w-1/6 p2">
          {isUpdatingItem ? (
            <>
              <IconButton
                name="check"
                color="green"
                onClick={(e: any) => handleSaveUpdatedItem(e)}
              />
              <IconButton
                name="x"
                color="red"
                onClick={handleCancelUpdateItem}
              />
            </>
          ) : (
            <>
              <IconButton
                name="pencil"
                color="blue"
                onClick={() =>
                  handleUpdateItem(idx, item.name, item.price)
                }
              />
              <IconButton
                name="trash"
                color="red"
                onClick={() => handleDeleteItem(item, idx)}
              />
            </>
          )}
        </div>
      </div>
    );
  });
}

export default ItemsList;
