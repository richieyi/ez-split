import { useState } from 'react';
import IconButton from '../IconButton';
import Instructions from '../Instructions';

function Header() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <div className="flex justify-between ">
        <h1 className="font-bold text-4xl mb-8">EZ Split</h1>
        <IconButton
          name="question"
          color="yellow"
          onClick={() => setShowInstructions(!showInstructions)}
        />
      </div>
      {showInstructions ? <Instructions /> : null}
    </>
  );
}

export default Header;
