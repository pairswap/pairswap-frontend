require('@nomiclabs/hardhat-ethers');

task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('balances', 'Prints the list of account balances', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    let balance = await ethers.provider.getBalance(account.address);
    let eth = ethers.utils.formatEther(balance);
    console.log(account.address, 'has', eth, 'ETH');
  }
});

task('balance', "Prints an account's balance")
  .addParam('account', "The account's address")
  .setAction(async (args) => {
    let account = ethers.utils.getAddress(args.account);
    let balance = await ethers.provider.getBalance(account);
    let eth = ethers.utils.formatEther(balance);
    console.log(account, 'has', eth, 'ETH');
  });

module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
