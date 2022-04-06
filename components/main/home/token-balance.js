import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { shortenBalance } from 'utils/transform';

function TokenBalance() {
  const { srcToken } = useChain();
  const { connected, tokenBalance } = useWeb3();

  return (
    <div>
      {connected && tokenBalance ? (
        <span>
          Balance: <strong>{`${shortenBalance(tokenBalance)} ${srcToken.symbol}`}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default TokenBalance;
