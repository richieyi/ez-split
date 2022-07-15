import { v4 as uuid } from 'uuid';
import UpdateForm from '../UpdateForm';
import SaveCancelButtons from '../SaveCancelButtons';
import EditDeleteButtons from '../EditDeleteButtons';
import ItemsListItemText from '../ItemsListItemText';

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
    const listItemTextProps = {
      item,
      isAssignedToActivePerson,
      activePerson,
      handleSetAsignee,
      idx,
      assigneeName,
    };

    return (
      <div key={id} className="flex">
        {!isUpdatingItem ? (
          <ItemsListItemText {...listItemTextProps} />
        ) : null}
        {isUpdatingItem ? (
          <UpdateForm
            type="item"
            handleSaveUpdated={handleSaveUpdatedItem}
            handleNameChange={handleNameChange}
            name={itemName}
            handlePriceChange={handlePriceChange}
            price={itemPrice}
          />
        ) : null}
        {isUpdatingItem ? (
          <SaveCancelButtons
            handleSave={handleSaveUpdatedItem}
            handleCancelSave={handleCancelUpdateItem}
          />
        ) : (
          <EditDeleteButtons
            handleUpdate={() =>
              handleUpdateItem(idx, item.name, item.price)
            }
            handleDelete={() => handleDeleteItem(item, idx)}
          />
        )}
      </div>
    );
  });
}

export default ItemsList;
