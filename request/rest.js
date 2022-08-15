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
