import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { hexValue } from '@ethersproject/bytes';

import { injected } from 'config/connectors';
import supportedChains from 'config/chains';
import useNotification from 'utils/useNotification';
import useWeb3 from 'utils/useWeb3';

function filterChains(chains, chainId) {
  return chains.filter((chain) => chain.chainId !== chainId);
}

function findChain(chains, chainId) {
  return chains.find((chain) => chain.chainId === chainId);
}

export const ChainContext = createContext();
export const ChainUpdateContext = createContext();

function ChainProvider({ children }) {
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
              rpcUrls: selectedChain.rpcUrls,
            },
          ],
        });
      } catch (error) {
        // User rejected the request
        console.error(error);
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
        setDestChains(filterChains(supportedChains, selectedChain.chainId));
      } else {
        const provider = await injected.getProvider();

        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexValue(selectedChain.chainId) }],
          });
        } catch (error) {
          // User rejected the request
          console.error(error.code);
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
    setSourceChains(filterChains(supportedChains, selectedChain.chainId));
  }, []);

  useEffect(() => {
    const _chainId = chainId ?? supportedChains[0].chainId;

    const _selectedSourceChain = findChain(supportedChains, _chainId);
    setSelectedSourceChain(_selectedSourceChain);

    const _destChains = filterChains(supportedChains, _selectedSourceChain.chainId);
    setDestChains(_destChains);

    const _selectedDestChain = _destChains[0];
    setSelectedDestChain(_selectedDestChain);

    const _sourceChains = filterChains(supportedChains, _selectedDestChain.chainId);
    setSourceChains(_sourceChains);
  }, [chainId]);

  return (
    <ChainContext.Provider
      value={{ sourceChains, selectedSourceChain, destChains, selectedDestChain }}
    >
      <ChainUpdateContext.Provider
        value={{ setSelectedSourceChain: changeSourceChain, setSelectedDestChain: changeDestChain }}
      >
        {children}
      </ChainUpdateContext.Provider>
    </ChainContext.Provider>
  );
}

ChainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChainProvider;
