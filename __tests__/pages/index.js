import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';
import { WalletModal, WalletModalContext } from 'components/modal/select-wallet';
import ChainProvider from 'contexts/chain';
import TokenProvider from 'contexts/token';
import ErrorProvider from 'contexts/error';
import Web3Provider from 'contexts/web3';
import Home from 'pages/index';

jest.mock('@emurgo/cardano-serialization-lib-asmjs/cardano_serialization_lib', () => jest.fn());

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

it('should render', () => {
  render(
    <TokenProvider>
      <ChainProvider>
        <Web3Provider>
          <Home />
        </Web3Provider>
      </ChainProvider>
    </TokenProvider>
  );

  const main = screen.getByRole('main');
  expect(main).toBeInTheDocument();
});
