import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { CARDANO, ETHEREUM } from 'constants/wallet';
import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useWalletModal from 'hooks/useWalletModal';
import useToken from 'hooks/useToken';
import useWeb3 from 'hooks/useWeb3';
import useWeb3Update from 'hooks/useWeb3Update';

function generateLinks({ chainInfos, srcChain, destChain, recipient, txHash }) {
  const { explorers: srcExplorers, type: srcType } = chainInfos[srcChain];
  const { explorers: destExplorers, type: destType } = chainInfos[destChain];

  let srcLink, destLink;

  if (srcType === CARDANO) {
    srcLink = `${srcExplorers[0]}/transaction/${txHash}`;
  }

  if (srcType === ETHEREUM) {
    srcLink = `${srcExplorers[0]}/tx/${txHash}`;
  }

  if (destType === CARDANO) {
    destLink = `${destExplorers[0]}/address/${recipient}`;
  }

  if (destType === ETHEREUM) {
    destLink = `${destExplorers[0]}/address/${recipient}#tokentxns`;
  }

  return { srcLink, destLink };
}

function SubmitButton({
  isSameChainType,
  onSubmit,
  onSuccess,
  setIsPending,
  setIsSuccess,
  setTxHash,
  setLinks,
}) {
  const [isApproved, setIsApproved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpen } = useWalletModal();
  const { account, chainId, library, wallet } = useWeb3();
  const { reloadBalance } = useWeb3Update();
  const { tokenInfos, token } = useToken();
  const { chainInfos, srcChain, destChain } = useChain();
  const setError = useError();

  async function submit(data) {
    setIsLoading(true);
    try {
      const { gatewayAddress } = chainInfos[srcChain];
      const { addresses } = tokenInfos[token];
      const srcToken = addresses[srcChain];
      const destToken = addresses[destChain];
      const recipient = isSameChainType ? account : data.recipient;

      const txHash = await library.transfer({
        gatewayAddress,
        account,
        recipient,
        destChain,
        srcToken,
        // gatewayAddress as destToken to bypass type cast
        destToken: isSameChainType ? destToken : gatewayAddress,
        amount: data.amount,
      });

      const links = generateLinks({
        chainInfos,
        srcChain,
        destChain,
        recipient,
        txHash,
      });

      setLinks(links);
      setIsSuccess(true);
      onSuccess();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function switchChain() {
    const { id, name, rpcs, explorers, nativeCurrency } = chainInfos[srcChain];

    try {
      await library.changeChain({ id });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await library.addChain({ id, name, rpcs, explorers, nativeCurrency });
        } catch (error) {
          setError(error);
        }
      } else {
        setError(error);
      }
    }
  }

  async function handleApprove() {
    setIsLoading(true);
    try {
      const { gatewayAddress } = chainInfos[srcChain];
      const { addresses } = tokenInfos[token];
      const tokenAddress = addresses[srcChain];

      const tx = await library.approve({
        gatewayAddress,
        tokenAddress,
        account,
      });
      setTxHash(tx.hash);
      setIsPending(true);
      await tx.wait();
      await reloadBalance();
      setIsPending(false);
      setIsApproved(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (
      account &&
      Number.isInteger(chainId) &&
      chainInfos &&
      library &&
      srcChain &&
      token &&
      tokenInfos &&
      wallet
    ) {
      if (chainInfos[srcChain].id === chainId && !!library.checkApproval) {
        const { gatewayAddress } = chainInfos[srcChain];
        const { addresses } = tokenInfos[token];
        const tokenAddress = addresses[srcChain];

        setIsLoading(true);
        library
          .checkApproval({ gatewayAddress, tokenAddress, account })
          .then(setIsApproved)
          .catch((error) => {
            setIsFailed(true);
            setError(error, { slient: true });
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsApproved(true);
      }
    }
  }, [account, chainId, chainInfos, library, srcChain, tokenInfos, token, wallet, setError]);

  if (isLoading) {
    return (
      <div className="btn-swap">
        <div className="spiner" />
      </div>
    );
  }

  if (wallet) {
    if (
      chainInfos &&
      srcChain &&
      Number.isInteger(chainId) &&
      chainInfos[srcChain].id === chainId
    ) {
      if (isFailed) {
        return (
          <button onClick={() => window.location.reload()} className="btn-swap">
            Reload
          </button>
        );
      } else {
        if (isApproved) {
          return (
            <button onClick={onSubmit(submit)} className="btn-swap">
              Swap
            </button>
          );
        } else {
          return (
            <button onClick={() => handleApprove()} className="btn-swap">
              Give permission
            </button>
          );
        }
      }
    } else {
      if (chainInfos && srcChain && chainInfos[srcChain].type === ETHEREUM) {
        return (
          <button onClick={() => switchChain()} className="btn-swap">
            Switch to the correct chain
          </button>
        );
      } else {
        return (
          <button disabled className="btn-swap">
            Unsupported chain
          </button>
        );
      }
    }
  } else {
    return (
      <button onClick={() => setIsOpen(true)} className="btn-swap">
        Connect
      </button>
    );
  }
}

SubmitButton.propTypes = {
  isSameChainType: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setIsPending: PropTypes.func,
  setIsSuccess: PropTypes.func,
  setTxHash: PropTypes.func,
  setLinks: PropTypes.func,
};

export default SubmitButton;
