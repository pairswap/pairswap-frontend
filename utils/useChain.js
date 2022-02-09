import { useCallback, useEffect, useState } from 'react';
import { hexValue } from '@ethersproject/bytes';

import { injected } from 'config/connectors';
import data from 'data';
import useNotification from 'utils/useNotification';
import useWeb3 from 'utils/useWeb3';

function filterChains(chains, chainId) {
  return chains.filter((chain) => chain.chainId !== chainId);
}

function findChain(chains, chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

function useChain() {
  const { showMessage } = useNotification();
  const { chainId } = useWeb3();
  const [sourceChains, setSourceChains] = useState([]);
  const [selectedSourceChain, setSelectedSourceChain] = useState();
  const [destChains, setDestChains] = useState([]);
  const [selectedDestChain, setSelectedDestChain] = useState();

  const addChain = useCallback(
    async (selectedChain) => {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: hexValue(selectedChain.chainId),
              chainName: selectedChain.chainName,
              nativeCurrency: selectedChain.nativeCurrency,
              rpcUrls: [selectedChain.rpcUrls],
            },
          ],
        });
      } catch (error) {
        // User rejected the request
        console.log(error.code);
        if (error.code === 4001) {
          showMessage({
            message: 'Please confirm to add chain',
            type: 'error',
          });
        } else {
          showMessage({
            message: 'An unknown error occurred. Check the console for more details',
            type: 'error',
          });
        }
      }
    },
    [showMessage]
  );

  const changeSourceChain = useCallback(
    async (selectedChain) => {
      if (!chainId) {
        setSelectedSourceChain(selectedChain);
        setDestChains(filterChains(data, selectedChain.chainId));
      } else {
        const provider = await injected.getProvider();

        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexValue(selectedChain.chainId) }],
          });
        } catch (error) {
          // User rejected the request
          console.log(error.code);
          if (error.code === 4001) {
            showMessage({
              message: 'Please confirm to change chain',
              type: 'error',
            });
          } else if (error.code === 4902) {
            addChain(selectedChain);
          } else {
            showMessage({
              message: 'An unknown error occurred. Check the console for more details',
              type: 'error',
            });
          }
        }
      }
    },
    [chainId, addChain, showMessage]
  );

  const changeDestChain = useCallback((selectedChain) => {
    setSelectedDestChain(selectedChain);
    setSourceChains(filterChains(data, selectedChain.chainId));
  }, []);

  useEffect(() => {
    const _chainId = chainId ?? data[0].chainId;

    const _selectedSourceChain = findChain(data, _chainId);
    setSelectedSourceChain(_selectedSourceChain);

    const _destChains = filterChains(data, _selectedSourceChain.chainId);
    setDestChains(_destChains);

    const _selectedDestChain = _destChains[0];
    setSelectedDestChain(_selectedDestChain);

    const _sourceChains = filterChains(data, _selectedDestChain.chainId);
    setSourceChains(_sourceChains);
  }, [chainId]);

  return {
    sourceChains,
    selectedSourceChain,
    selectedDestChain,
    destChains,
    setSelectedSourceChain: changeSourceChain,
    setSelectedDestChain: changeDestChain,
  };
}

export default useChain;
