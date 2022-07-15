import IconButton from '../IconButton';

function EditDeleteButtons(props: any) {
  const { handleUpdate, handleDelete } = props;

  return (
    <div className="flex justify-around w-1/6 p2">
      <IconButton name="pencil" color="blue" onClick={handleUpdate} />
      <IconButton name="trash" color="red" onClick={handleDelete} />
    </div>
  );
}

export default EditDeleteButtons;
