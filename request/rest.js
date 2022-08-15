export async function getGasFeeInToken({ chain, tokenId }) {
  try {
    const response = await fetch(
      `${window.config.proxyAPI}/getGasFeeInToken?chain=${chain}&token_id=${tokenId}`
    );

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
