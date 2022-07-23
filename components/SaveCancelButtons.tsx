import IconButton from './IconButton';

interface Props {
  handleSave: (e: any) => void;
  handleCancel: () => void;
}

function SaveCancelButtons(props: Props) {
  const { handleSave, handleCancel } = props;

  return (
    <div className="flex justify-center">
      <IconButton name="check" color="green" onClick={handleSave} />
      <IconButton name="x" color="red" onClick={handleCancel} />
    </div>
  );
}

export default SaveCancelButtons;
