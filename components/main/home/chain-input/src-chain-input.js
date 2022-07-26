import BaseInput from './base-input';
import useChain from 'hooks/useChain';
import useChainUpdate from 'hooks/useChainUpdate';

function SrcChainInput() {
  const { srcChain, destChain } = useChain();
  const { setSrcChain } = useChainUpdate();

  return (
    <BaseInput label="From" chain={srcChain} setChain={setSrcChain} excludedChain={destChain} />
  );
}

export default SrcChainInput;
