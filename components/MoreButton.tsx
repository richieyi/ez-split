import { useState } from 'react';
import Diner from '../toolkit/Diner';
import Expense from '../toolkit/Expense';
import IconButton from './IconButton';

interface MoreButtonProps {
  handleUpdate: (item: Diner | Expense) => void;
  handleRemove: (item: Diner | Expense) => void;
}

function MoreButton(props: MoreButtonProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { handleUpdate, handleRemove } = props;

  function renderButtons() {
    return (
      <>
        <IconButton
          name="pencil"
          color="blue"
          onClick={handleUpdate}
        />
        <IconButton name="trash" color="red" onClick={handleRemove} />
      </>
    );
  }

  return (
    <div className="flex items-center">
      {showMore ? renderButtons() : null}
      <IconButton
        name="dots"
        color="black"
        onClick={() => setShowMore(!showMore)}
      />
    </div>
  );
}

export default MoreButton;
