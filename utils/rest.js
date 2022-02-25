const baseUrl = 'http://localhost:4000';

export async function getGasFeeInToken(transferName, symbol) {
  const response = await fetch(
    `${baseUrl}/getGasFeeInToken?chain=${transferName}&token_id=${symbol}`
  );
  return response.json();
}
