import IconButton from '../IconButton';

function SaveCancelButtons(props: any) {
  const { handleSave, handleCancelSave } = props;

  return (
    <div className="flex justify-around w-1/6 p2">
      <IconButton name="check" color="green" onClick={handleSave} />
      <IconButton name="x" color="red" onClick={handleCancelSave} />
    </div>
  );
}

export default SaveCancelButtons;
