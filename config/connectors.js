import { InjectedConnector } from '@web3-react/injected-connector';

import * as Connectors from 'constants/connectors';
import supportedChains from 'config/chains';

export const injected = new InjectedConnector({
  supportedChainIds: supportedChains.map((chain) => chain.chainId),
});

const connectors = {
  [Connectors.Injected]: injected,
};

export default connectors;
