const baseURL = 'http://localhost:8080';

export async function getGasFeeInToken({ chain, tokenId }) {
  return fetch(`${baseURL}/getGasFeeInToken?chain=${chain}&token_id=${tokenId}`).then(
    (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }
  );
}

export async function support({ name, email, txURL, comment }) {
  return fetch(`${baseURL}/support`, {
    method: 'POST',
    body: JSON.stringify({ name, email, tx_url: txURL, comment }),
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  });
}
