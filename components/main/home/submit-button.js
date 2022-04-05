import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import PendingModal from './pending-modal';
import SuccessModal from './success-modal';
import SelectWalletModal from 'components/modal/select-wallet';
import useChain from 'hooks/useChain';
import useError from 'hooks/useError';
import useWeb3 from 'hooks/useWeb3';
import { approve, checkApproval, transfer } from 'request/rpc';
import { convertStringToBigNumber } from 'utils/transform';

function SubmitButton({ onSubmit, onSuccess }) {
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const { srcChain, destChain, srcToken, destToken } = useChain();
  const setError = useError();
  const { account, available, connected } = useWeb3();

  const submitCallback = useCallback(
    async ({ amount }) => {
      setIsLoading(true);
      try {
        const tx = await transfer({
          gatewayAddress: srcChain.gatewayAddress,
          recipient: account,
          destChain: destChain.transferName,
          tokenOut: srcToken.address,
          tokenIn: destToken.address,
          amount: convertStringToBigNumber(amount),
        });
        setTxHash(tx.hash);
        setIsPending(true);
        await tx.wait();
        setIsPending(false);
        setIsSuccess(true);
        onSuccess();
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [account, srcChain, destChain, srcToken, destToken, onSuccess, setError]
  );

  const handleApprove = useCallback(async () => {
    setIsLoading(true);
    try {
      const tx = await approve({
        gatewayAddress: srcChain.gatewayAddress,
        tokenAddress: srcToken.address,
        account,
      });
      setTxHash(tx.hash);
      setIsPending(true);
      await tx.wait();
      setIsPending(false);
      setIsApproved(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [account, srcChain, srcToken, setError]);

  const handleConnect = useCallback(() => {
    if (!connected) {
      if (available) {
        setIsOpenWallet(true);
      } else {
        setError(new Error('No metamask installed'));
      }
    }
  }, [available, connected, setError]);

  const renderButton = useCallback(() => {
    if (isLoading) {
      return (
        <div className="btn-swap">
          <div className="spiner" />
        </div>
      );
    }

    if (connected) {
      if (isApproved) {
        return (
          <button onClick={onSubmit(submitCallback)} className="btn-swap">
            Swap
          </button>
        );
      }
      return (
        <button onClick={handleApprove} className="btn-swap">
          Give permission
        </button>
      );
    }

    return (
      <button onClick={handleConnect} className="btn-swap">
        Connect
      </button>
    );
  }, [connected, isApproved, isLoading, handleApprove, handleConnect, onSubmit, submitCallback]);

  useEffect(() => {
    if (account && connected && srcChain && srcToken) {
      setIsLoading(true);
      checkApproval({
        gatewayAddress: srcChain.gatewayAddress,
        tokenAddress: srcToken.address,
        account,
      })
        .then(setIsApproved)
        .catch((error) => setError(error, { silent: true }))
        .finally(() => setIsLoading(false));
    }
  }, [account, connected, srcChain, srcToken, setError]);

  return (
    <>
      {renderButton()}
      <SelectWalletModal open={isOpenWallet} onClose={() => setIsOpenWallet(false)} />
      <PendingModal open={isPending} txHash={txHash} />
      <SuccessModal
        open={isSuccess}
        txHash={txHash}
        onClose={() => {
          setIsSuccess(false);
          setTxHash(null);
        }}
      />
    </>
  );
}

SubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default SubmitButton;
