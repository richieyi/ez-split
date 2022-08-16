interface NewItemButtonProps {
  setIsAddingNewItem: () => void;
  itemType: string;
}

function NewItemButton(props: NewItemButtonProps) {
  const { setIsAddingNewItem, itemType } = props;

  return (
    <div className="flex justify-center">
      <button
        onClick={setIsAddingNewItem}
        className="border rounded p-2 hover:bg-slate-300 bg-white"
      >
        Add New {itemType}
      </button>
    </div>
  );
}

export default NewItemButton;
