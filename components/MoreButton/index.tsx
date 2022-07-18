import { useState } from 'react';
import IconButton from '../IconButton';

function MoreButton(props: any) {
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
