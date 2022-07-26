import axios from 'axios';

let request;

if (typeof window !== 'undefined' && typeof window.config !== 'undefined') {
  request = axios.create({
    baseURL: window.config.proxyAPI,
  });
}

export async function getGasFeeInToken({ chain, tokenId }) {
  const { data } = await request.get(`/getGasFeeInToken?chain=${chain}&token_id=${tokenId}`);
  return data;
}

export async function support({ name, email, txURL, comment }) {
  const { data } = await request.post(`/support`, {
    name,
    email,
    tx_url: txURL,
    comment,
  });

  return data;
}
