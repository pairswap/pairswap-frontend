import { InjectedConnector } from '@web3-react/injected-connector';

import * as Connectors from 'constants/connectors';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 189985, 189986],
});

const connectors = {
  [Connectors.Injected]: injected,
};

export default connectors;
