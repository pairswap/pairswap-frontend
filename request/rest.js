let proxyAPI;

if (typeof window !== 'undefined' && typeof window.config !== 'undefined') {
  proxyAPI = window.config.proxyAPI;
}

export async function getGasFeeInToken({ chain, tokenId }) {
  if (!proxyAPI) return Promise.reject('No proxy API');

  try {
    const response = await fetch(`${proxyAPI}/getGasFeeInToken?chain=${chain}&token_id=${tokenId}`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function support({ name, email, txURL, comment }) {
  if (!proxyAPI) return Promise.reject('No proxy API');

  return fetch(`${proxyAPI}/support`, {
    method: 'POST',
    body: JSON.stringify({ name, email, tx_url: txURL, comment }),
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  });
}
