import React from 'react';

import BaseInput from './base-input';
import useChain from 'hooks/useChain';
import useChainUpdate from 'hooks/useChainUpdate';

function DestChainInput() {
  const { destChain, srcChainId } = useChain();
  const { setDestChainId } = useChainUpdate();

  return (
    <BaseInput
      label="To"
      chain={destChain}
      setChainId={setDestChainId}
      excludedChainId={srcChainId}
    />
  );
}

export default DestChainInput;
