import create from 'zustand';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';

import SampleERC20 from 'abis/SampleERC20.json';
import ERC20Gateway from 'abis/ERC20Gateway.json';
import supportedChains from 'config/chains';
import errorStore from 'hooks/useError';
import successStore from 'hooks/useSuccess';
import {
  convertBigNumberToString,
  convertHexStringToNumber,
  convertHexStringToString,
  converNumberToHexString,
} from 'utils/transform';

const supportedChainIds = supportedChains.map((chain) => chain.chainId);

const setError = errorStore.getState().setError;

let provider = null;

const available = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

if (available) {
  provider = new Web3Provider(window.ethereum);
}

const initialStates = {
  available,
  connected: false,
  account: null,
  balance: null,
  tokenBalance: null,
  chainId: null,
  provider,
};

const useWeb3 = create((set, get) => ({
  ...initialStates,
  reset: () => set(initialStates),
  getBalance: (account) =>
    ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => set({ balance: convertHexStringToString(balance) }))
      .catch((error) => setError(error, { silent: true })),
  connect: () =>
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        set({ connected: true, account: accounts[0] });
        get().getBalance(accounts[0]);
      })
      .catch((error) => setError(error, { silent: true })),
  addChain: (chain) =>
    ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: converNumberToHexString(chain.chainId),
          chainName: chain.chainName,
          nativeCurrency: chain.nativeCurrency,
          rpcUrls: chain.rpcUrls,
        },
      ],
    }),
  changeChain: (chain) =>
    ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: converNumberToHexString(chain.chainId) }],
    }),
  addListerner: () => {
    ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts[0]) {
          set({ connected: true, account: accounts[0] });
          get().getBalance(accounts[0]);
        }
      })
      .catch((error) => setError(error, { silent: true }));

    ethereum
      .request({ method: 'eth_chainId' })
      .then((chainId) => onChainChanged(chainId))
      .catch((error) => setError(error, { silent: true }));

    function onChainChanged(chainId) {
      const convertedChainId = convertHexStringToNumber(chainId);
      if (supportedChainIds.includes(convertedChainId)) {
        set({ chainId: convertedChainId });

        const account = get().account;
        if (account) {
          get().getBalance(account);
        }
      } else {
        if (get().connected) {
          setError(new Error('Unsupported chain'));
          get()
            .changeChain(supportedChains[0])
            .catch((error) => {
              if (error.code === 4902) {
                get()
                  .addChain(supportedChains[0])
                  .catch((error) => setError(error));
              } else {
                setError(error);
              }
            });
        }
      }
    }

    function onAccountsChanged(accounts) {
      if (accounts.length > 0) {
        set({ connected: true, account: accounts[0] });
        get().getBalance(accounts[0]);

        if (!supportedChainIds.includes(get().chainId)) {
          get()
            .changeChain(supportedChains[0])
            .catch((error) => {
              if (error.code === 4902) {
                get()
                  .addChain(supportedChains[0])
                  .catch((error) => setError(error, { silent: true }));
              } else {
                setError(error, { silent: true });
              }
            });
        }
      } else {
        get().reset();
      }
    }

    if (ethereum.on && ethereum.removeListener) {
      ethereum.on('chainChanged', onChainChanged);
      ethereum.on('accountsChanged', onAccountsChanged);

      return () => {
        ethereum.removeListener('chainChanged', onChainChanged);
        ethereum.removeListener('accountsChanged', onAccountsChanged);
      };
    }
  },
  getTokenBalance: (tokenAddress) => {
    const account = get().account;
    const contract = new Contract(tokenAddress, SampleERC20.abi, provider);

    return contract
      .balanceOf(account)
      .then((balance) => set({ tokenBalance: convertBigNumberToString(balance) }))
      .catch((error) => setError(error, { silent: true }));
  },
  transfer: ({ contractAddress, destChain, tokenOut, tokenIn, amount }) => {
    const recipient = get().account;
    const signer = provider.getSigner(recipient);
    const contract = new Contract(contractAddress, ERC20Gateway.abi, signer);

    console.log({ contractAddress, destChain, recipient, tokenOut, tokenIn, amount });
    return contract.transferOut(destChain, recipient, tokenOut, tokenIn, amount);
  },
}));

export default useWeb3;
