import useWalletModal from 'hooks/useWalletModal';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { shortenAccount, shortenBalance } from 'utils/transform';
import Dropdown from './dropdown';

function WalletButton() {
  const { chainInfos, srcChain } = useChain();
  const { setIsOpen } = useWalletModal();
  const { account, balance, chainId, wallet } = useWeb3();

  if (wallet) {
    return (
      <div className="account">
        <div className="account-detail">
          {Number.isInteger(chainId) ? (
            <>
              <div className="account-balance">
                {balance ? (
                  `${shortenBalance(balance)} ${chainInfos?.[srcChain]?.nativeCurrency?.symbol}`
                ) : (
                  <div className="spiner" />
                )}
              </div>
              <div className="account-detail__provider" />
            </>
          ) : null}
          <div className="account-address">{shortenAccount(account)}</div>
        </div>
        <Dropdown />
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-connect">
        Connect Wallet
      </button>
    </>
  );
}

export default WalletButton;
