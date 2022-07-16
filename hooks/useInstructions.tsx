import { useState } from 'react';

function useInstructions() {
  const [showInstructions, setShowInstructions] = useState(false);

  return {
    showInstructions,
    setShowInstructions,
  };
}

export default useInstructions;
