import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import PendingModal from './pending-modal';
import SuccessModal from './success-modal';
import useChain from 'hooks/useChain';
import useWeb3 from 'hooks/useWeb3';
import { approve, checkApproval, transfer } from 'request/rpc';
import { convertStringToBigNumber } from 'utils/transform';

function SubmitButton({ onSubmit, onError, onSuccess }) {
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const { srcChain, destChain, srcToken, destToken } = useChain();
  const { account, available, connected } = useWeb3();

  const submitCallback = useCallback(
    async ({ amount }) => {
      if (available) {
        if (connected) {
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
            onError(error);
          } finally {
            setIsLoading(false);
          }
        } else {
          onError(new Error('No wallet connected'));
        }
      } else {
        onError(new Error('No metamask installed'));
      }
    },
    [account, available, connected, srcChain, destChain, srcToken, destToken, onError, onSuccess]
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
      onError(error);
    } finally {
      setIsLoading(false);
    }
  }, [account, srcChain, srcToken, onError]);

  useEffect(() => {
    if (account && connected && srcChain && srcToken) {
      setIsLoading(true);
      checkApproval({
        gatewayAddress: srcChain.gatewayAddress,
        tokenAddress: srcToken.address,
        account,
      })
        .then(setIsApproved)
        .finally(() => setIsLoading(false));
    }
  }, [account, connected, srcChain, srcToken]);

  return (
    <>
      {isLoading ? (
        <div className="btn-swap">
          <div className="spiner" />
        </div>
      ) : isApproved ? (
        <button onClick={onSubmit(submitCallback)} className="btn-swap">
          Swap
        </button>
      ) : (
        <button onClick={handleApprove} className="btn-swap">
          Give permission
        </button>
      )}
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
  onError: PropTypes.func.isRequired,
};

export default SubmitButton;
