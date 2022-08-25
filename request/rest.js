export async function getGasFeeInToken({ chain, tokenId }) {
  return fetch(
    `${window.config.proxyAPI}/getGasFeeInToken?chain=${chain}&token_id=${tokenId}`
  ).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  });
}

export async function support({ name, email, txURL, comment }) {
  return fetch(`${window.config.proxyAPI}/support`, {
    method: 'POST',
    body: JSON.stringify({ name, email, tx_url: txURL, comment }),
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  });
}

export async function createHistory({
  address,
  recipient,
  tokenSymbol,
  srcChain,
  destChain,
  amount,
  srcHash,
  srcLink,
}) {
  return fetch(`${window.config.proxyAPI}/history`, {
    method: 'POST',
    body: JSON.stringify({
      address,
      recipient,
      token_symbol: tokenSymbol,
      src_chain: srcChain,
      dest_chain: destChain,
      amount,
      src_hash: srcHash,
      src_link: srcLink,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  });
}

export async function getHistory({ address }) {
  return fetch(`${window.config.proxyAPI}/histories?address=${address}`).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  });
}
