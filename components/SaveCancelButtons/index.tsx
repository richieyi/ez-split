import IconButton from '../IconButton';

function SaveCancelButtons(props: any) {
  const { handleSave, handleCancel } = props;

  return (
    <div className="flex justify-center">
      <IconButton name="check" color="green" onClick={handleSave} />
      <IconButton name="x" color="red" onClick={handleCancel} />
    </div>
  );
}

export default SaveCancelButtons;
