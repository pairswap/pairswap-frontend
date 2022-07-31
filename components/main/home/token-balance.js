import useToken from 'hooks/useToken';
import useWeb3 from 'hooks/useWeb3';
import { shortenBalance } from 'utils/transform';

function TokenBalance() {
  const { token } = useToken();
  const { tokenBalance } = useWeb3();

  return (
    <div>
      {tokenBalance ? (
        <span>
          Balance: <strong>{`${shortenBalance(tokenBalance)} ${token}`}</strong>
        </span>
      ) : null}
    </div>
  );
}

export default TokenBalance;
