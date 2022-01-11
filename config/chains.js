import * as Balances from 'constants/balances';
import * as Chains from 'constants/chains';

export const chainNames = {
  1: Chains.ETH,
  3: Chains.ROPSTEN,
  4: Chains.RINKEBY,
  5: Chains.GOERLI,
  42: Chains.KOVAN,
  56: Chains.BSC,
  189985: Chains.SRC,
};

export const balanceNames = {
  1: Balances.ETH,
  3: Balances.ETH,
  4: Balances.ETH,
  5: Balances.ETH,
  42: Balances.ETH,
  56: Balances.BNB,
  189985: Chains.ETH,
};
