import { ChangeEvent } from 'react';
import IconButton from './IconButton';

interface SaveCancelButtonsProps {
  handleSave: (e: ChangeEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

function SaveCancelButtons(props: SaveCancelButtonsProps) {
  const { handleSave, handleCancel } = props;

  return (
    <div className="flex justify-center">
      <IconButton name="check" color="green" onClick={handleSave} />
      <IconButton name="x" color="red" onClick={handleCancel} />
    </div>
  );
}

export default SaveCancelButtons;
