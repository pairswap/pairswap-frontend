const baseUrl = 'http://localhost:4000';

export async function getGasFeeInToken(transferName, symbol) {
  try {
    const res = await fetch(`${baseUrl}/getGasFeeInToken?chain=${transferName}&token_id=${symbol}`);

    if (!res.ok) {
      throw new Error(`Fetch error: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
