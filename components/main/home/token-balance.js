import { useMemo } from 'react';

import { CARDANO } from 'constants/wallet';
import useChain from 'hooks/useChain';
import useToken from 'hooks/useToken';
import useWeb3 from 'hooks/useWeb3';
import { shortenBalance } from 'utils/transform';

function TokenBalance() {
  const { chainInfos, srcChain, destChain } = useChain();
  const { tokenInfos, token } = useToken();
  const { tokenBalance } = useWeb3();

  const assetName = useMemo(() => {
    if (chainInfos && tokenInfos && srcChain && destChain && token) {
      const { addresses } = tokenInfos[token];
      const { type: srcType } = chainInfos[srcChain];
      const { type: destType } = chainInfos[destChain];

      if (srcType === CARDANO) {
        const srcToken = addresses[srcChain];

        const [_, assetName] = srcToken.split(':');

        return assetName;
      }

      if (destType === CARDANO) {
        const destToken = addresses[destChain];

        const [_, assetName] = destToken.split(':');

        return assetName;
      }

      return null;
    }

    return null;
  }, [chainInfos, tokenInfos, srcChain, destChain, token]);

  if (tokenBalance) {
    return (
      <div>
        <span>
          Balance: <strong>{`${shortenBalance(tokenBalance)} ${token}`}</strong>
        </span>
        <br />
        {assetName ? (
          <span className="additional-text">{`1 ${token} = 1000000 ${assetName}`}</span>
        ) : null}
      </div>
    );
  }

  return null;
}

export default TokenBalance;
