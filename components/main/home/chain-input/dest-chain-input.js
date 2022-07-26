import React from 'react';

import BaseInput from './base-input';
import useChain from 'hooks/useChain';
import useChainUpdate from 'hooks/useChainUpdate';

function DestChainInput() {
  const { srcChain, destChain } = useChain();
  const { setDestChain } = useChainUpdate();

  return (
    <BaseInput label="To" chain={destChain} setChain={setDestChain} excludedChain={srcChain} />
  );
}

export default DestChainInput;
